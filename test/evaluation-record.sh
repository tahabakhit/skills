#!/bin/sh
# Verify recorded evidence integrity. Does not re-run models or certify judgments.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$root"
base=evaluations/entrypoint-pilot
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' 0
trap 'exit 130' INT
trap 'exit 143' TERM
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }
(cd "$base" && sha256sum -c SHA256SUMS > /dev/null) || fail 'pilot payload digest mismatch'
jq -e '.schemaVersion==1 and .plannedAnswerSessions==32 and (.taskIds|length)==8
  and (.candidateSnapshots|length)==7
  and .modelIds==["gpt-6.1-sol","gpt-6.1-terra"]' "$base/manifest.json" > /dev/null
jq -r '[.sourceTaskBanks[],.candidateSnapshots[],.commonSystem][]|[.path,.sha256]|@tsv' "$base/manifest.json" | while IFS="$(printf '\t')" read -r path expected; do
  case "$path" in ../development-bank.json|../content-cases.json|common-system.md|candidates/*.md) ;; *) fail 'unexpected snapshot path' ;; esac
  case "$path" in candidates/*/../*|candidates/../*) fail 'snapshot path escapes candidate folder' ;; esac
  [ "$(sha256sum "$base/$path" | cut -d ' ' -f1)" = "$expected" ] || fail "manifest digest mismatch: $path"
done
[ "$(sha256sum "$base/grades.json" | cut -d ' ' -f1)" = "$(jq -r '.grading.scoreFreezeSha256' "$base/manifest.json")" ] || fail 'final grades differ from scoring freeze'
jq -e 'length==32 and ([.[].runId]|unique|length)==32
  and ([.[].answerId]|unique|length)==32
  and all(.[]; .replicate==1 and .thinking=="medium"
    and .observed.thinkingLevel=="medium" and .observed.provider=="openai"
    and .model==.observed.model and .observed.stopReason=="stop"
    and .harness.singleUser and .harness.singleAssistant
    and .harness.systemMatchesFrozenInput and .harness.noAdditionalSections
    and .harness.noToolCalls and .harness.noToolResults
    and .harness.noRetryOrErrorEntries and .harness.matchesFrozenTask)
  and (group_by(.model,.taskId)|length)==16
  and all(group_by(.model,.taskId)[]; length==2 and ([.[].condition]|sort)==["baseline","skill"])' "$base/records.json" > /dev/null || fail 'invalid pilot assignments or recorded harness audit'
jq -e 'length==8 and ([.[].id]|unique|length)==8' "$base/tasks.json" > /dev/null
jq -e 'length==24' evaluations/development-bank.json > /dev/null
jq -e '.tasks|length==2' evaluations/content-cases.json > /dev/null
jq -e '.schemaVersion==1 and (.repositories|length)==20 and (.cachedArtifacts|length)==2
  and all(.repositories[]; (.revision|test("^[0-9a-f]{40}$")) and (.inspections|length)>0)' research/collections.json > /dev/null
jq -n --slurpfile records "$base/records.json" --slurpfile tasks "$base/tasks.json" '[ $records[0][] as $r | ($tasks[0][]|select(.id==$r.taskId)) as $t | {answerId:$r.answerId,answer:$r.answer,expected_observations:$t.expected_observations,failure_checks:$t.failure_checks} ]' > "$scratch/packet.json"
jq -n --slurpfile packet "$scratch/packet.json" --slurpfile grades "$base/grades.json" -f test/evaluation-quotes.jq > "$scratch/quotes.json"
jq -e 'length==32 and all(.[]; .validShape and (.badQuotes|length)==0)' "$scratch/quotes.json" > /dev/null || fail 'invalid final quote evidence'
jq -n -e --slurpfile records "$base/records.json" --slurpfile grades "$base/grades.json" 'all($records[0][]; . as $r | ($grades[0][]|select(.id==$r.answerId)) as $g | .score=={pass:(all($g.met[];.) and all($g.failure[];not)),observationsMet:([$g.met[]|select(.)]|length),observationsTotal:($g.met|length),failures:([$g.failure[]|select(.)]|length)})' > /dev/null || fail 'scores differ from frozen judgments'
jq '[group_by(.model,.taskId)[] | . as $pair | ($pair[]|select(.condition=="baseline")) as $a | ($pair[]|select(.condition=="skill")) as $b | {model:$a.model,taskId:$a.taskId,candidate:$a.candidate,baseline:$a.score,skill:$b.score,outcome:(if $a.score.pass and $b.score.pass then "both-pass" elif $a.score.pass then "baseline-only" elif $b.score.pass then "skill-only" else "neither-pass" end)}]' "$base/records.json" > "$scratch/paired.json"
jq -S -c . "$scratch/paired.json" > "$scratch/actual"
jq -S -c . "$base/paired.json" > "$scratch/expected"
cmp "$scratch/actual" "$scratch/expected" > /dev/null || fail 'paired report differs from records'
printf '32 recorded answers, 16 paired outcomes, 7 snapshots and final quote evidence passed offline integrity checks.\n'
