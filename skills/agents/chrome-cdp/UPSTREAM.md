# Upstream

Adapted from [IgorWarzocha/howaboua-pi-stuff](https://github.com/IgorWarzocha/howaboua-pi-stuff)
at commit `56275de34e9094cc5124f4a185a71b46b25a7f17`:

- `packages/pi-skill-chrome-cdp/skills/chrome-cdp`

Taha Bakhit maintains this local version independently. There is no package
dependency or automatic upstream refresh. The original MIT notice is retained
in [LICENSE](LICENSE). Local adaptations narrow task routing, remove upstream
personal policy and defer permissions, workflow and deployment to this setup.
Local contributions carry the MIT notice in [LICENSE.local](LICENSE.local).

CLI entrypoint deploys as executable cdp.mjs. Local hardening rejects insecure or
symlinked runtime directories and unsafe socket IDs, fails closed for explicit
endpoint selection, limits opened URL schemes, bounds bridge/connect waits,
rejects pending protocol calls on disconnect, isolates caches/bridges by explicit
endpoint selection and limits socket cleanup to verified stale/owned inodes.
Fixed scrolled screenshot clip translation and caller-relative output paths;
validated loadall intervals. Removed upstream sync instructions. Tests use only
private rendered trees and controlled fakes, not the user's browser.
