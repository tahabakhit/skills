#!/bin/sh
# Offline package/record checks and disposable fixtures; never calls a model.
set -eu
cd "$(dirname "$0")/.."

checks=0
pass() { checks=$((checks + 1)); printf 'ok %s - %s\n' "$checks" "$1"; }
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }

jq -e '.name == "@tahabakhit/skills" and .version == "0.2.0"
  and .private != true and .publishConfig.access == "public"
  and .pi.skills == ["./skills"]' package.json >/dev/null
pass 'npm identity and optional Pi manifest'

jq -e '(.dependencies // {} | length) == 0
  and (.scripts | keys) == ["build:packages", "lint", "pack:packages", "publish:dry-run", "publish:packages", "test"]
  and .bin == {"taha-skills":"bin/skills.mjs"}
  and (.pi | keys) == ["skills"]' package.json >/dev/null
pass 'selector bin has no runtime library dependencies, install hooks or extensions'

names=$(find skills -name SKILL.md -type f | sort)
count=$(printf '%s\n' "$names" | wc -l | tr -d ' ')
jq -e '.schemaVersion == 1 and
  ([.skills[].name] | sort) == (["discover-work", "define-work", "codebase-design", "systematic-debugging", "verify-and-stop", "deliver-work", "testing-work", "code-review", "change-safely", "git-hygiene", "ci-maintenance", "triage-dependency-updates", "release-packaging", "security-review", "research-work", "create-content", "document-review", "interface-review", "analyze-data", "data-pipelines", "operate-systems", "unslop", "arch-linux", "arch-package-maintenance", "arch-update-recovery", "cachyos", "rhel-fedora", "managed-config-drift", "workstation-health-triage"] | sort)
  and ([.skills[].name]|unique|length)==29
  and all(.skills[]; .requiredSkills == [] and (.optionalSkills | type) == "array"
    and .provenance == ("skills/"+.name+"/PROVENANCE.json"))
  and ([.skills[]|select(.maturity=="experimental")]|length)==16' catalog.json >/dev/null
[ "$count" = "$(jq '.skills | length' catalog.json)" ] || fail 'skill folders differ from the catalog'
for skill in $(jq -r '.skills[].name' catalog.json); do
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
pass '29 cataloged, named, described and bounded skills'

for file in README.md INSTALL.md CATALOG.md SOURCES.md ARCHITECTURE.md VERIFICATION.md THIRD-PARTY-NOTICES.md research/README.md audits/installed-skills.md skills/define-work/SKILL.md; do
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

jq -e '.schemaVersion == 1
  and .reference.repository == "bolens/agent-skills"
  and .reference.revision == "e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d"
  and (.skills | length) == 14 and (.files | length) == 67
  and ([.files[].path] | unique | length) == 67
  and ([.files[] | select(.comparison == "identical")] | length) == 50
  and all(.files[]; (.sha256 | test("^[0-9a-f]{64}$"))
    and (.gitBlob | test("^[0-9a-f]{40}$")))
  and (.additionalReferences | length) == 2
  and all(.additionalReferences[]; .localFiles == .sourceFiles
    and .matchingFiles == .localFiles and .truncated == false)
  and .linkScan.checked == 77 and (.linkScan.missing | length) == 34
  and .linkScan.distinctMissingTargets == 14
  and ([.linkScan.missing[].normalizedTarget] | unique | length) == 14' \
  audits/shared-inventory.json >/dev/null || fail 'invalid historical audit snapshot'
pass 'historical audit snapshot retains recorded counts and digests'

sh test/imports.sh
pass 'imported folders have local dependency closure, notices and recorded identities'
sh test/standalone.sh
pass 'all selected folders retain standalone notices, references and exact payload identities'
sh test/catalog-mutations.sh
pass 'damaged selectable-folder fixtures are rejected'
sh test/evaluation-record.sh
pass 'frozen pilot snapshots, assignments, quotes and paired calculations are internally consistent'
sh test/polluter.sh
pass 'optional diagnostic helper passes isolated executable fixtures'
sh test/command-status.sh
pass 'documented command-status example propagates producer and renderer failures'

printf '%s package checks passed; no model calls made by this command.\n' "$checks"
