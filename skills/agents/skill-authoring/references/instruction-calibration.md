# Testing whether an instruction works

Read this when someone asks you to compare versions of a skill or prompt with real
agent runs, or when a skill keeps being skipped or misapplied. Each run costs money
and time, so agree the number of runs with the user before you start.

## Pick the tasks

Write three short tasks:

1. A request the instruction is meant for, worded the way a user would word it.
2. A similar request where the instruction shouldn't apply.
3. An unrelated request, to catch the instruction applying everywhere.

Don't hint at the expected behaviour in the task text. Give the agent the files and
docs it would normally have; an agent cut off from them tells you about its memory,
not about your instruction.

## Keep the comparison fair

- Start each run in a fresh session. Keep model, reasoning level, tools, working
  directory and files the same, and change only the instruction.
- Many harnesses load instruction files and skills automatically. Find out from the
  current help how to switch that off, then check the transcript: the agent may still
  read the files with its own tools. Discard runs where that happened.
- Score the first answer. If you nudge the agent afterwards, the improvement is
  yours, not the instruction's.
- Finish with a run in the user's normal setup, everything loaded, to see whether
  other skills compete for the same request. Treat it as a sanity check rather than
  part of the comparison.
- Leave the user's own sessions alone. Don't close or edit them while cleaning up.

## Read the results

- Score what the agent decided and did, what it skipped, and whether the result is
  correct. Run any code it wrote. Ignore differences in wording or polish.
- When behaviour is wrong, check whether the cause is the instruction, the model's
  default habits, a missing file, or a vague task. Fix a vague task by rewriting the
  task, not by adding rules to the instruction.
- Don't act on a single run. Repeat when the decision hinges on whether a result is
  consistent.
- Change one thing per round and make the smallest edit that could work. Add an
  example only when runs show the agent misreading the rule.
- After shortening an instruction, rerun all three tasks. Watch the near-miss task
  most closely: trimming often makes a skill trigger too eagerly.

## Report

Cover how the agent behaved before and after, the final wording change, how much
shorter or longer the instruction got, and how much the runs varied. If you claim a
cost saving, compare whole-task token use including retries and subagents. A
shorter instruction alone doesn't prove that. Don't add these runs to the
repository's automated tests.
