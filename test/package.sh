#!/bin/sh
# Structural checks only. Model behavior is evaluated using scenarios.md.
set -eu
cd "$(dirname "$0")/.."

checks=0
pass() { checks=$((checks + 1)); printf 'ok %s - %s\n' "$checks" "$1"; }
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }

jq -e '.name == "@tahabakhit/skills" and .version == "0.1.0"
  and .private != true and .publishConfig.access == "public"
  and .pi.skills == ["./skills"]' package.json >/dev/null
pass 'npm identity and optional Pi manifest'

jq -e '(.dependencies // {} | length) == 0
  and (.scripts | keys) == ["test"]
  and (has("bin") | not)
  and (.pi | keys) == ["skills"]' package.json >/dev/null
pass 'no runtime dependencies, install hooks or extensions'

names=$(find skills -name SKILL.md -type f | sort)
count=$(printf '%s\n' "$names" | wc -l | tr -d ' ')
[ "$count" = 2 ] || fail 'expected exactly two skills'
for skill in discover-work define-work; do
  file="skills/$skill/SKILL.md"
  [ -f "$file" ] || fail "missing $file"
  awk -v expected="$skill" '
    NR == 1 && $0 != "---" { exit 1 }
    NR > 1 && $0 == "---" { closed = 1; exit }
    /^name: / { if ($2 == expected) named = 1 }
    /^description: / { if (length($0) > 13 && length($0) <= 1037) described = 1 }
    END { if (!closed || !named || !described) exit 1 }
  ' "$file" || fail "invalid frontmatter in $file"
  [ "$(wc -w < "$file")" -lt 1300 ] || fail "oversized instructions: $file"
done
pass 'two named, described and bounded skills'

for file in README.md SOURCES.md skills/define-work/SKILL.md; do
  # Links in these authored documents have simple relative targets, no spaces.
  links=$(grep -oE '\]\([^)]*\)' "$file" | cut -c 3- | tr -d ')' || true)
  for link in $links; do
    case "$link" in http:*|https:*|'#'*) continue ;; esac
    [ -f "$(dirname "$file")/$link" ] || fail "broken link in $file: $link"
  done
done
pass 'local Markdown reference targets exist'

for skill in discover-work define-work; do
  file="skills/$skill/SKILL.md"
  grep -Fq 'Treat' "$file" || fail "missing evidence boundary: $skill"
  grep -Fq 'Do not launch workers unless authorized' "$file" || fail "missing worker boundary: $skill"
  grep -Fq 'existing' "$file" || fail "missing existing-work guidance: $skill"
done
grep -Fq 'Spec approval is not implementation' skills/define-work/SKILL.md
grep -Fq 'Do not invoke it here.' skills/define-work/SKILL.md
pass 'written authority and handoff boundaries remain present'

grep -Fq 'Readiness: draft' skills/define-work/SKILL.md
grep -Fq 'later material change returns' skills/define-work/SKILL.md
grep -Fq 'Do not turn proposed answers into confirmed requirements.' skills/define-work/SKILL.md
grep -Fq 'Do not demand tracker publishing' skills/define-work/SKILL.md
pass 'draft, correction and local-spec contracts remain present'

jq -r '.files[]' package.json | while IFS= read -r path; do
  [ -e "$path" ] || fail "missing npm allowlist entry: $path"
done
pass 'all npm allowlist entries exist'

printf '%s structural checks passed; model behavior not evaluated.\n' "$checks"
