#!/bin/sh
# Verify each imported skill with no sibling skills or repository-root notices.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$root"
command -v git >/dev/null || { printf 'Git is required for import identity checks\n' >&2; exit 1; }
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' 0
trap 'exit 130' INT
trap 'exit 143' TERM
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }
check_folder() {
  folder=$1
  name=$2
  record="$folder/PROVENANCE.json"
  jq -e --arg name "$name" '.schemaVersion == 1 and .name == $name
    and .source.repository == "https://github.com/bolens/agent-skills"
    and .source.revision == "e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d"
    and (.upstreamFiles | length) > 0 and (.files | length) > 0
    and (.licenses | length) == 2
    and all(.files[]; (.path | startswith("/") | not)
      and (.path | split("/") | index("..") | not)
      and (.gitBlob | test("^[0-9a-f]{40}$")))' "$record" >/dev/null || fail "invalid provenance: $name"
  [ -z "$(find "$folder" -type l -print)" ] || fail "symlink escapes independent folder: $name"
  jq -r '.files[].path' "$record" | sort > "$scratch/recorded"
  find "$folder" -type f | while IFS= read -r file; do
    path=${file#"$folder/"}
    [ "$path" = PROVENANCE.json ] || printf '%s\n' "$path"
  done | sort > "$scratch/actual"
  cmp "$scratch/recorded" "$scratch/actual" || fail "file set differs from provenance: $name"
  jq -r '.files[] | [.path,.gitBlob] | @tsv' "$record" | while IFS="$(printf '\t')" read -r path expected; do
    [ "$(git hash-object "$folder/$path")" = "$expected" ] || fail "recorded digest differs: $name/$path"
  done
  jq -r '.licenses[] | [.file,.copyright] | @tsv' "$record" | while IFS="$(printf '\t')" read -r file copyright; do
    grep -Fq "$copyright" "$folder/$file" || fail "missing copyright: $name/$file"
    grep -Fq 'Permission is hereby granted, free of charge' "$folder/$file" || fail "incomplete license: $name/$file"
    grep -Fq 'THE SOFTWARE IS PROVIDED "AS IS"' "$folder/$file" || fail "missing disclaimer: $name/$file"
  done
  find "$folder" -name '*.md' -type f | while IFS= read -r file; do
    links=$(grep -oE '\]\([^)]*\)' "$file" | cut -c 3- | tr -d ')' || true)
    for link in $links; do
      case "$link" in http:*|https:*|'#'*) continue ;; esac
      link=${link%%#*}
      [ -f "$(dirname "$file")/$link" ] || fail "standalone link missing in $name: $link"
    done
  done
}
for name in codebase-design systematic-debugging verify-and-stop; do
  folder="$root/$(jq -r --arg name "$name" '.skills[] | select(.name==$name) | .path' catalog.json)"
  check_folder "$folder" "$name"
  mkdir -p "$scratch/$name/skills"
  cp -R -- "$folder" "$scratch/$name/skills/"
  check_folder "$scratch/$name/skills/$name" "$name"
done
[ -x skills/engineering/systematic-debugging/find-polluter.sh ] || fail 'polluter shell entrypoint must be executable'
[ -x skills/engineering/systematic-debugging/find-polluter.py ] || fail 'polluter Python executable mode was lost'
for file in find-polluter.py find-polluter.sh; do
  [ "$(git hash-object "skills/engineering/systematic-debugging/$file")" = "$(jq -r --arg file "$file" '.upstreamFiles[] | select(.path==$file) | .gitBlob' skills/engineering/systematic-debugging/PROVENANCE.json)" ] || fail "polluter $file differs from reviewed source"
done
if grep -Fq 'normalized.startsWith(tmpDir)' skills/engineering/systematic-debugging/defense-in-depth.md; then
  fail 'unsafe prefix-only containment example remains'
fi
printf '3 imported skills passed isolated folder, notice, identity and link checks.\n'
