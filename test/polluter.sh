#!/bin/sh
# Exercise the imported helper only against an owned fixture and fake npm.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
helper="$root/skills/systematic-debugging/find-polluter.sh"
command -v python3 >/dev/null || { printf 'Python 3.9+ is required for helper fixtures\n' >&2; exit 1; }
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' 0
trap 'exit 130' INT
trap 'exit 143' TERM
mkdir "$scratch/bin" "$scratch/project" "$scratch/project/node_modules" "$scratch/project/.git"
: > "$scratch/project/a.test.ts"
: > "$scratch/project/b.test.ts"
: > "$scratch/project/node_modules/excluded.test.ts"
: > "$scratch/project/.git/excluded.test.ts"
ln -s a.test.ts "$scratch/project/linked.test.ts"
ln -s "$helper" "$scratch/wrapper.sh"
cat > "$scratch/bin/npm" <<'FIXTURE'
#!/bin/sh
set -eu
[ "$1" = test ] && [ "$2" = -- ]
printf '%s\n' "$3" >> "$POLLUTER_RUNS"
case "$POLLUTER_MODE:$3" in
  create:./b.test.ts) mkdir pollution ;;
  fail:*) exit 7 ;;
  timeout:*) printf '%s\n' "$$" > "$POLLUTER_PID"; exec sleep 10 ;;
esac
FIXTURE
chmod +x "$scratch/bin/npm"
PATH="$scratch/bin:$PATH"
POLLUTER_RUNS="$scratch/runs"
POLLUTER_PID="$scratch/child.pid"
export PATH POLLUTER_RUNS POLLUTER_PID POLLUTER_MODE
cd "$scratch/project"
run() {
  expected=$1
  POLLUTER_MODE=$2
  shift 2
  : > "$POLLUTER_RUNS"
  status=0
  "$scratch/wrapper.sh" pollution "$@" > "$scratch/output" 2>&1 || status=$?
  [ "$status" -eq "$expected" ] || {
    printf 'FAIL: polluter mode %s: expected exit %s, got %s\n' "$POLLUTER_MODE" "$expected" "$status" >&2
    exit 1
  }
}
run 0 clean '**/*.test.ts'
printf './a.test.ts\n./b.test.ts\n' > "$scratch/expected"
cmp "$scratch/expected" "$POLLUTER_RUNS"
grep -Fq 'No creator of the requested target was observed' "$scratch/output"
run 1 create '**/*.test.ts'
[ -d pollution ]
grep -Fq "FOUND POLLUTER: './b.test.ts'" "$scratch/output"
rmdir pollution
run 2 fail '**/*.test.ts'
grep -Fq 'a test failed; no creator' "$scratch/output"
run 2 clean '**/*.test.ts' --max-tests 1
[ ! -s "$POLLUTER_RUNS" ]
grep -Fq 'matching test limit reached' "$scratch/output"
run 2 clean 'absent/*.test.ts'
[ ! -s "$POLLUTER_RUNS" ]
grep -Fq 'no matching tests' "$scratch/output"
run 2 timeout '**/*.test.ts' --timeout 1 --total-timeout 5
[ -s "$POLLUTER_PID" ]
if kill -0 "$(head -n 1 "$POLLUTER_PID")" 2>/dev/null; then
  printf 'FAIL: owned helper child survived timeout cleanup\n' >&2
  exit 1
fi
mkdir pollution
printf 'keep\n' > pollution/marker
run 2 clean '**/*.test.ts'
[ ! -s "$POLLUTER_RUNS" ]
[ "$(head -n 1 pollution/marker)" = keep ]
grep -Fq 'target already exists' "$scratch/output"
printf '7 helper fixture cases passed; real project tests and network were not used.\n'
