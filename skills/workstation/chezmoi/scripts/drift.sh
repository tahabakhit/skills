#!/usr/bin/env bash
# Prints one row per drifted chezmoi target. Reads state only: no apply, add,
# git fetch or script execution. Rendering targets still evaluates templates.
set -euo pipefail

command -v chezmoi >/dev/null || { echo "chezmoi not found" >&2; exit 2; }
command -v jq >/dev/null || { echo "jq not found" >&2; exit 2; }
if command -v sha256sum >/dev/null; then sha() { sha256sum | cut -d' ' -f1; }
else sha() { shasum -a 256 | cut -d' ' -f1; }; fi

src=$(chezmoi source-path)
echo "source  $src"
if git -C "$src" rev-parse --git-dir >/dev/null 2>&1; then
  echo "git     $(git -C "$src" status -sb | head -1)"
  echo "dirty   $(git -C "$src" status --porcelain | wc -l | tr -d ' ') uncommitted source paths"
fi
echo

kind_of() {
  case "${1##*/}" in
    *.tmpl) echo template ;;
    modify_*) echo modify ;;
    encrypted_*) echo encrypted ;;
    symlink_*) echo symlink ;;
    *) [ -d "$1" ] && echo dir || echo plain ;;
  esac
}

# The two status columns say who moved since chezmoi last wrote the target:
# column 1 is the live side, column 2 is what apply would change.
classify() {
  local live=$1 apply=$2 target=$3
  case "$live$apply" in
    ?R) echo script; return ;;
    " "?) echo apply; return ;;
    D?) echo live-deleted; return ;;
  esac
  local last rendered
  last=$(chezmoi state get --bucket=entryState --key="$target" 2>/dev/null \
    | jq -r '.contentsSHA256 // empty' 2>/dev/null || true)
  rendered=$(chezmoi cat "$target" 2>/dev/null | sha || true)
  if [ -n "$last" ] && [ "$last" = "$rendered" ]; then echo re-add; else echo merge; fi
}

printf '%-13s %-6s %-10s %s\n' CLASS STATUS SOURCE TARGET
chezmoi status --path-style absolute | while IFS= read -r line; do
  live=${line:0:1} apply=${line:1:1} target=${line:3}
  class=$(classify "$live" "$apply" "$target")
  kind=script
  [ "$class" = script ] || kind=$(kind_of "$(chezmoi source-path "$target" 2>/dev/null || echo "$target")")
  printf '%-13s %-6s %-10s %s\n' "$class" "${live/ /.}${apply/ /.}" "$kind" "$target"
done
