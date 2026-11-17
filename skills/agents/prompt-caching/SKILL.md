---
name: prompt-caching
description: "Design, measure or debug prompt caching in an LLM app, agent harness or extension: stable prefixes, cache breakpoints, low hit rates, unexpected cache writes, rising token cost or latency after a prompt, tool or history change."
---

A prompt cache stores the processed form of a request prefix. The next request
gets a hit only if its beginning is byte-for-byte identical up to a cached point.
The first differing byte ends the reusable part, and everything after it is
processed and billed again.

## Confirm the provider's rules

These vary by provider, model and endpoint, and they change. Read the current docs
rather than relying on memory, and don't assume a proxy or cloud marketplace behaves
like the provider's own API.

| Question | Why it matters |
| --- | --- |
| In what order is the request rendered (tools, system, messages, schemas, reasoning settings)? | Earlier parts invalidate everything after them. |
| Is caching automatic, or do you mark breakpoints? How many? | Decides where to put markers. |
| What is the minimum cacheable length? | Below it, nothing caches and nothing errors. |
| How long do entries live, and does a hit extend them? | Gaps between requests longer than the TTL look like misses. |
| Which parameter changes invalidate which parts? | Some settings changes are cheap, others reset everything. |
| Which usage fields report cache reads and writes? | The only reliable evidence. |

For orientation, Anthropic's Messages API currently renders `tools`, then `system`,
then `messages`; you mark up to four `cache_control` breakpoints; entries last 5
minutes by default, with a 1-hour option; the minimum length depends on the model;
caches don't carry across models; and responses report
`cache_creation_input_tokens` and `cache_read_input_tokens`. Check these against
the current docs before relying on them.

## Build for hits

Order content from least to most likely to change:

```text
tool definitions -> fixed system prompt -> long reference material -> conversation so far -> new turn
```

- Keep anything that changes per request out of the early parts. A date, request
  ID, username or "current mode" line in the system prompt makes every request a
  miss. Send it in the latest message instead.
- Make rendering deterministic. Sort tools by name, serialise JSON with a fixed key
  order, and never put generated IDs or hash-set iteration order into prompt text.
- Fix the tool list and model for the whole conversation. To switch behaviour, send
  the change as a message or record it through a tool call instead of swapping tools.
- If the provider supports loading tool schemas on demand, use it to keep the fixed
  prefix short instead of shipping every schema in every request.
- New instructions mid-conversation go at the end: a mid-conversation system or
  developer message where supported, otherwise a user message or tool result.
- Treat sent history as read-only. Rewriting an earlier tool result, reordering
  turns, or adding a reminder and removing it on the next turn all break the cache
  from that point. Store exactly what was sent and resend that after resume or
  compaction.

Cache hits are not worth wrong behaviour. When instructions or tools really need to
change, change them and accept one cold request.

## When the hit rate drops

1. Read cache reads and writes from the provider's usage fields. Fast responses,
   a warm-up call that succeeded, or a cache key you sent prove nothing.
2. Find the specific request where reads fell, and compare it with the request
   just before it. An agent turn often makes several requests, so go by request,
   not by turn.
3. Check the expected causes first: model or reasoning setting changed, tools
   changed, system prompt edited, history compacted, the gap exceeded the TTL, or
   the prefix is under the minimum length.
4. If none apply, log the two request bodies exactly as they were sent over the
   wire. Remove cache markers, which move every turn, and diff the bodies in the
   provider's rendering order. The first difference in the shared portion is
   the cause. Some providers offer a cache diagnostic that does this comparison
   for you.
5. Find the code that produced the difference and fix it there. Then rerun a
   multi-turn session with all of the user's extensions loaded and confirm reads
   recover.

## Harness and extension pitfalls

- A hook that copies the prompt before the final version is prepared, then writes
  that stale copy back.
- An async task that finishes late and overwrites a newer request's prompt.
- Two extensions each editing the same prompt section, in an order that differs
  between turns.
- A UI-only note (a banner, a collapsed message) that leaks into the provider
  request, or a "hidden" flag that is assumed to keep content away from the model
  without anyone checking the request.
- Search-and-replace edits on the prompt that silently do nothing, or match twice,
  when the anchor text changes. Make edits idempotent and raise an error when the
  anchor is missing or appears more than once.

## Report

State which request missed and why, the code responsible, and cache reads and writes
before and after the fix. If you couldn't prove the cause, say which two requests
diverge, where, and what evidence would settle it. Don't propose a fix without that.
