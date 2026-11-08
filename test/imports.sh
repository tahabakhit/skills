#!/bin/sh
# Import-specific source pins and retained helper contracts; generic closure is in standalone.sh.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$root"
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }

for name in codebase-design systematic-debugging verify-and-stop; do
  folder=$(jq -r --arg name "$name" '.skills[] | select(.name==$name) | .path' catalog.json)
  jq -e --arg name "$name" '.schemaVersion == 1 and .name == $name
    and .source.repository == "https://github.com/bolens/agent-skills"
    and .source.revision == "e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d"
    and (.upstreamFiles | length) > 0
    and ([.licenses[].file] | sort) == (if $name == "systematic-debugging"
      then ["LICENSE", "LICENSE-DROO", "LICENSE-SUPERPOWERS", "LICENSE.local"]
      elif $name == "codebase-design" then ["LICENSE", "LICENSE-MATT"]
      else ["LICENSE", "LICENSE-BOLENS"] end)' "$folder/PROVENANCE.json" >/dev/null || fail "invalid import provenance: $name"
done

for name in systematic-debugging change-safely; do
  case "$name" in
    systematic-debugging) source=performance-profiler; reference=performance-profiling ;;
    change-safely) source=database-designer; reference=database-migrations ;;
  esac
  folder="skills/engineering/$name"
  record="$folder/PROVENANCE.json"
  jq -e --arg source "skills/$source" '
    [.imports[] | select(.source.directory == $source)] as $imports
    | ($imports | length) == 1
      and $imports[0].source.repository == "https://github.com/DROOdotFOO/agent-skills"
      and $imports[0].source.revision == "252cabcc930274ae32e131d67c354091c6ec651c"
      and any($imports[0].upstreamFiles[]; .path | startswith($source + "/"))
      and any(.licenses[]; .file == "LICENSE-DROO")' "$record" >/dev/null || fail "invalid DROO input pin: $name"
  expected=$(jq -r --arg source "skills/$source" '.imports[] | select(.source.directory==$source) | .upstreamFiles[] | select(.path=="LICENSE") | .sha256' "$record")
  [ "$(sha256sum "$folder/LICENSE-DROO" | cut -d ' ' -f1)" = "$expected" ] || fail "DROO license differs from pinned input: $name"
  grep -Fq "references/$reference.md" "$folder/SKILL.md" || fail "specialist reference is not routed: $name"
done

[ -x skills/engineering/systematic-debugging/find-polluter.sh ] || fail 'polluter shell entrypoint must be executable'
[ -x skills/engineering/systematic-debugging/find-polluter.py ] || fail 'polluter Python executable mode was lost'
for file in find-polluter.py find-polluter.sh; do
  [ "$(git hash-object "skills/engineering/systematic-debugging/$file")" = "$(jq -r --arg file "$file" '.upstreamFiles[] | select(.path==$file) | .gitBlob' skills/engineering/systematic-debugging/PROVENANCE.json)" ] || fail "polluter $file differs from reviewed source"
done
if grep -Fq 'normalized.startsWith(tmpDir)' skills/engineering/systematic-debugging/defense-in-depth.md; then
  fail 'unsafe prefix-only containment example remains'
fi
printf 'Reviewed import pins, notices, specialist routes and helper contracts passed.\n'
