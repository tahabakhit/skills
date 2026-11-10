#!/bin/sh
# These are validator fixtures, not model-behavior tests.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' 0
trap 'exit 130' INT
trap 'exit 143' TERM
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }
copy_case() {
  case_root="$scratch/$1"
  mkdir -p "$case_root/test"
  cp -R -- "$root/skills" "$case_root/skills"
  cp -- "$root/catalog.json" "$case_root/catalog.json"
  cp -- "$root/test/standalone.sh" "$case_root/test/standalone.sh"
}
reject() {
  if sh "$case_root/test/standalone.sh" > "$scratch/result" 2>&1; then fail "accepted damaged fixture: $1"; fi
  grep -Fq "$2" "$scratch/result" || fail "unexpected failure in fixture: $1"
}
refresh_file() {
  relative=$1
  folder="$case_root/skills/workstation/shell-scripting"
  sha=$(sha256sum "$folder/$relative" | cut -d ' ' -f1)
  blob=$(git hash-object "$folder/$relative")
  jq --arg path "$relative" --arg sha "$sha" --arg blob "$blob" '.files |= map(if .path==$path then .sha256=$sha|.gitBlob=$blob else . end)' "$folder/PROVENANCE.json" > "$scratch/record"
  cp -- "$scratch/record" "$folder/PROVENANCE.json"
}
copy_case baseline
sh "$case_root/test/standalone.sh" > "$scratch/result"
copy_case incomplete-notice
printf 'MIT License\nCopyright (c) Taha Bakhit\n' > "$case_root/skills/workstation/shell-scripting/LICENSE"
refresh_file LICENSE
reject incomplete-notice 'MIT grant incomplete'
copy_case tampered-content
printf '\nUnrecorded change.\n' >> "$case_root/skills/workstation/shell-scripting/SKILL.md"
reject tampered-content 'SHA-256 mismatch'
copy_case hidden-sibling
printf '\nRead [required sibling](../../engineering/ci-maintenance/SKILL.md).\n' >> "$case_root/skills/workstation/shell-scripting/SKILL.md"
refresh_file SKILL.md
# The isolated copy has no sibling tree to satisfy this hidden dependency.
reject hidden-sibling 'missing isolated Markdown target'
copy_case symlink
ln -s ../../engineering/ci-maintenance/SKILL.md "$case_root/skills/workstation/shell-scripting/escape.md"
reject symlink 'symlink in selectable folder'
copy_case extra-payload
printf 'Not recorded.\n' > "$case_root/skills/workstation/shell-scripting/extra.txt"
reject extra-payload 'unrecorded/missing payload'
printf '6 selectable-folder fixtures passed: baseline and five independently damaged payloads.\n'
