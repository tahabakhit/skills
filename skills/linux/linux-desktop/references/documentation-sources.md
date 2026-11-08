# Desktop documentation source map

These are starting points, not bundled product documentation or a claim that all
pages describe the installed release. Reviewed 2026-11-07. Follow the skill's
version and freshness procedure on each task. Fetch the relevant section directly;
search broadly only if the known sources are inadequate or have moved.

| Component | Authoritative starting points | Version and ownership cautions |
| --- | --- | --- |
| KDE Plasma / KWin | [User manuals](https://docs.kde.org/), [UserBase](https://userbase.kde.org/), [developer documentation](https://develop.kde.org/docs/), [upstream repositories](https://invent.kde.org/plasma) | Separate Plasma 5 from 6 and check the installed minor release. Use developer docs for KWin scripts/widgets and user docs for settings. D-Bus interfaces and configuration keys need release-specific evidence; writing a file does not guarantee a running service reloads it. |
| GNOME / GNOME Shell | [Versioned user help](https://help.gnome.org/), [system administration guide](https://help.gnome.org/system-admin-guide/), [developer documentation](https://developer.gnome.org/), [Shell source](https://gitlab.gnome.org/GNOME/gnome-shell) | Match the GNOME/Shell release and extension compatibility. Inspect installed GSettings schemas and existing values before proposing keys; do not guess paths from old examples. |
| XFCE | [Official documentation](https://docs.xfce.org/), [upstream repositories](https://gitlab.xfce.org/xfce) | Select the release and component (xfwm4, panel, settings). Check X11 versus experimental/version-dependent Wayland support rather than assuming identical behavior. |
| Cinnamon | [Official source and wiki](https://github.com/linuxmint/cinnamon) | Mint distribution instructions are not automatically appropriate for CachyOS. Match the Cinnamon version and installed schemas; separate Cinnamon from Muffin and applet/extension behavior. |
| COSMIC | [Official overview](https://system76.com/cosmic), [desktop source](https://github.com/pop-os/cosmic-epoch), [libcosmic](https://github.com/pop-os/libcosmic) | Distinguish the Rust COSMIC desktop from older GNOME-based Pop Shell/COSMIC guidance. libcosmic documentation is primarily for application development, not proof of supported desktop configuration APIs. Use the relevant component tag/examples. |
| Hyprland | [Official wiki](https://wiki.hypr.land/), [wiki source](https://github.com/hyprwm/hyprland-wiki), [compositor releases](https://github.com/hyprwm/Hyprland/releases) | The wiki can track development. Select matching release documentation where available; verify configuration language, rule syntax and plugin ABI before editing. Community AI wiki mirrors are secondary and need a source revision check. |
| Niri | [Official documentation](https://niri-wm.github.io/niri/), [upstream source/releases](https://github.com/niri-wm/niri) | Match installed release, KDL syntax and supported actions/rules. A separate desktop shell owns its own panel, launcher and settings. |
| Sway | [Official wiki/source](https://github.com/swaywm/sway), installed sway and sway-input/sway-output manual pages | Prefer shipped manuals for command/configuration syntax. Related wlroots tools and portal backends have their own versions and configuration. |
| Mango / mangowc | [Official source, wiki and releases](https://github.com/mangowm/mango) | Match the actual installed package/revision and its shipped example. Do not translate Hyprland/Niri rules into Mango by analogy. Separate the compositor from Noctalia or other shell components. |
| Noctalia | [Official documentation](https://docs.noctalia.dev/), [project repositories](https://github.com/noctalia-dev) | Select documentation for the installed generation/version; current docs may refer to a replacement architecture while older releases are archived. Keep generated settings, runtime state and theme outputs separate from user-owned source preferences. |
| CachyOS desktop defaults | [Desktop options](https://wiki.cachyos.org/installation/desktop_environments/), [CachyOS repositories](https://github.com/CachyOS) | Distribution defaults can differ from upstream and from the owner's dotfiles. Confirm the installed package and file owner; an installer preset is not proof of live configuration. |
| Portals | [xdg-desktop-portal documentation](https://flatpak.github.io/xdg-desktop-portal/docs/) plus the installed backend's official docs | Confirm the session, selected backend, versions and user-service environment. Do not blindly install competing backends or restart the graphical session. |

## When a source is missing

For an unlisted desktop or component, identify its installed package and upstream
project first, then locate official manuals, documentation, source tags and release
notes. Do not mistake a skills marketplace, generated index, AI summary, or a
personal dotfiles repository for upstream documentation. An upstream `AGENTS.md`
usually governs development in that repository, not administration of an installed
desktop. GUI computer-use skills likewise do not substitute for configuration
references.

If a fetch is blocked, try installed manuals or a known official source repository.
A successful HTTP response or recent repository push proves neither that the
relevant section is current nor that the commands work on the user's release.
Report source retrieval failures and unsupported gaps; never hide them by
presenting a search snippet as verified documentation.
