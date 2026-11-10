# Packages, services and permissions

## Homebrew without accidental maintenance

Inspect the selected brew, its prefix, installed formula/cask and relevant
receipt before proposing a transaction. Homebrew package definitions can execute
code; a Brewfile is Ruby, not inert data. Do not evaluate an unfamiliar Brewfile
merely to inventory it. Read repository policy and installed brew help first.

Separate update, install, upgrade, cleanup and bundle operations. An install or
bundle operation can update metadata, upgrade dependencies, run application
installers or clean artifacts depending on the command and environment.
For a scoped transaction, inspect supported auto-update/cleanup controls and the
planned dependencies; do not claim complete isolation from an environment flag.
No blanket brew upgrade, bundle cleanup or sudo brew as a diagnostic fix.

Preserve Apple's tools and the user's selected login shell unless replacement is
the requested operation. Package installation is not permission to authorize a
cask's security dialogs or launch its login items.

## launchd scope and activation

Identify the job label, plist owner, execution user and intended domain first:
system, user/<uid> and gui/<uid> are different contexts. A GUI session may not
exist over SSH. Consult installed launchctl help and the launchd.plist manual
for the actual OS before choosing bootstrap, bootout, enable or kickstart.

Apple-owned /System/Library jobs are not personal configuration. User
~/Library/LaunchAgents, local /Library/LaunchAgents and /Library/LaunchDaemons
have different ownership and session expectations. Homebrew-managed jobs should
normally stay with brew services rather than a competing handwritten plist.
Using sudo with brew services changes service scope; it is not just a way to
avoid a permission error.

Validate a candidate plist with plutil -lint. This checks plist syntax, not
executable existence, permissions, domain selection or successful behavior.
ProgramArguments is an argument vector, not an implicit shell command; do not
expect shell expansion, pipes or the interactive PATH. Use explicit paths or a
reviewed wrapper. Keep secrets out of plists and logs.

Editing a plist does not update a running job. Review the exact stop/reload/start
sequence and restart policy, preserve rollback and check the targeted job's
exit status plus its actual function afterward. Do not unload a whole domain.

## Preferences, access and evidence

Read app-owned preferences through supported interfaces. Record the precise key,
domain, type and prior existence before an authorized preference change; restoring
an absent key differs from setting a guessed default. Do not overwrite a domain
while its application is writing it. Avoid bulk preference exports.

Use the narrow failing path to investigate permissions. Do not recursively chmod
or chown a home, Homebrew prefix or application tree, remove quarantine globally,
or reset all privacy permissions. Observe privacy/MDM boundaries and report missing
access instead of promising a shell-only workaround.

## Primary references

- [Homebrew manual](https://docs.brew.sh/Manpage)
- [Apple launchd guidance](https://support.apple.com/guide/terminal/script-management-with-launchd-apdc6c1077b-5d5d-4d35-9c19-60f2397b2369/mac)

Use installed launchctl, launchd.plist and plutil manuals for version-sensitive
interfaces. Generic online examples do not establish the current target domain.
