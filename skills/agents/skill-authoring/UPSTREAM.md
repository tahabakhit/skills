# Upstream

Adapted from [IgorWarzocha/howaboua-pi-stuff](https://github.com/IgorWarzocha/howaboua-pi-stuff)
at commit `56275de34e9094cc5124f4a185a71b46b25a7f17`:

- `packages/pi-skill-foundations/skills/skill-creator`
- `packages/pi-skill-harness-and-agent-engineering/skills/instruction-calibration`

Taha Bakhit maintains this local version independently. There is no package
dependency or automatic upstream refresh. The original MIT notice is retained
in [LICENSE](LICENSE). Local adaptations narrow task routing, remove upstream
personal policy and defer permissions, workflow and deployment to this setup.
Local contributions carry the MIT notice in [LICENSE.local](LICENSE.local).

Renamed skill-creator, removed arbitrary description-length mandates, and folded
instruction-calibration into an optional reference. Removed fixed Pi launch flags
and autonomous session-runner assumptions. The trigger also covers prompt tuning.
