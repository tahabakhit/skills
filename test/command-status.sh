#!/bin/sh
# Execute the documented status example with fake producer and renderer commands.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' 0
trap 'exit 130' INT
trap 'exit 143' TERM
mkdir "$scratch/bin"
awk '
  /^```sh$/ { capture = 1; next }
  capture && /^```$/ { exit }
  capture { print }
' "$root/skills/systematic-debugging/root-cause-tracing.md" > "$scratch/example.sh"
[ -s "$scratch/example.sh" ]
cat > "$scratch/bin/npm" <<'FIXTURE'
#!/bin/sh
printf 'DEBUG git init: synthetic fixture\n'
exit "$PRODUCER_STATUS"
FIXTURE
cat > "$scratch/bin/grep" <<'FIXTURE'
#!/bin/sh
exit "$RENDER_STATUS"
FIXTURE
chmod +x "$scratch/bin/npm" "$scratch/bin/grep"
cd "$scratch"
run() {
  producer=$1
  renderer=$2
  expected=$3
  status=0
  PATH="$scratch/bin:$PATH" PRODUCER_STATUS="$producer" RENDER_STATUS="$renderer" \
    sh "$scratch/example.sh" > "$scratch/output" 2>&1 || status=$?
  [ "$status" -eq "$expected" ] || {
    printf 'FAIL: producer %s renderer %s: expected %s, got %s\n' "$producer" "$renderer" "$expected" "$status" >&2
    exit 1
  }
}
run 0 0 0
run 7 0 7
run 0 9 9
run 7 9 7
run 0 1 0
printf '5 command-status fixture cases passed; the documented outer status is preserved.\n'
