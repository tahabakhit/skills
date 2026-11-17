#!/usr/bin/env bash
# Static checks: skill frontmatter, marketplace/directory agreement, local links.
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0
err() { printf 'error: %s\n' "$*" >&2; fail=1; }

listed=$(jq -r '.plugins[] | .source as $s | .skills[] | "\($s)/\(.)" | sub("/\\./"; "/") | ltrimstr("./")' .claude-plugin/marketplace.json | sort)
found=$(find skills -mindepth 3 -maxdepth 3 -name SKILL.md -exec dirname {} \; | sort)
[ "$listed" = "$found" ] || err "marketplace skills differ from skills/*/*/SKILL.md:"$'\n'"$(diff <(echo "$listed") <(echo "$found") || true)"

for dir in $found; do
  file="$dir/SKILL.md"
  head -1 "$file" | grep -qx -- '---' || { err "$file: missing frontmatter"; continue; }
  front=$(awk 'NR>1 && /^---$/ {exit} NR>1' "$file")
  name=$(sed -n 's/^name: *//p' <<<"$front" | tr -d '"')
  [ "$name" = "$(basename "$dir")" ] || err "$file: name '$name' does not match directory"
  desc=$(sed -n 's/^description: *//p' <<<"$front")
  [ -n "$desc" ] || err "$file: missing description"
  [ "${#desc}" -le 1024 ] || err "$file: description over 1024 characters"
done

while IFS= read -r md; do
  base=$(dirname "$md")
  while IFS= read -r target; do
    target=${target%%#*}
    [ -z "$target" ] && continue
    [ -e "$base/$target" ] || err "$md: broken link $target"
  done < <(grep -oE '\]\([^)]+\)|`references/[^`]+`' "$md" | sed -E 's/^\]\(//; s/\)$//; s/`//g' | grep -vE '^(https?:|mailto:|#)' || true)
done < <(find . -name '*.md' -not -path './.git/*' -not -path './node_modules/*')

exit "$fail"
