# Selene agent instructions

## Resume first

1. Read `docs/wiki/README.md`, then `STATUS.md` and `DECISIONS.md` there.
2. Check `git status`, recent commits, and the live status of linked PRs. Recorded status is a dated snapshot, not current truth.
3. If `.local/RESUME.md` exists, read it for installation details. It is private and must never be copied into public docs, code, screenshots or PRs.
4. Consult `WORKFLOW.md` for gallery changes, releases and verification. Read additional pages only as needed.

## Project boundaries

- This is a native Hermes skin extension, not a core fork. Keep selectors scoped to `data-skin="selene"`.
- Preserve native IDs, handlers, hidden states, scrolling and controls. DOM moves need lossless undo when changing skin.
- Core owns virtualization, profiles, models, reasoning availability and voice logic. Do not reproduce backend behavior in theme code.
- No runtime dependencies, remote assets, telemetry or application API calls. Permission changes must be explicit.
- Keep desktop/mobile, keyboard focus and reduced motion usable. See `docs/VALIDATION.md` for evidence and limits.

## Commands

No build/dependency installation is needed. On the maintainer Mac, Node commands must use the user's nvm-loaded zsh: `zsh -ic 'node --check assets/layout.js'`. Otherwise use the configured Node runtime.

```sh
python3 scripts/package-release.py
python3 scripts/check-public.py --staged
```

Enable the optional local commit guard with `git config core.hooksPath .githooks` only after checking for existing hooks. It runs the staged privacy check, but does not inspect image content.

The package uses an explicit file list; it excludes agent/wiki/private/review material. For official tests, use the separate gallery checkout and commands in `docs/wiki/WORKFLOW.md`. Run tests appropriate to changed behavior; do not claim fixture simulations validate backend services.

## Public versus private

- Public: code, generic instructions, product decisions, sanitized milestone history, public PR/release links.
- Private: hostnames/IPs, installation paths, account details, session URLs/transcripts, operational captures, backups and deployment notes belong in `.local/` or the maintainer's private operations workspace.
- Never store credentials even in notes. Use the existing credential store. Gitignore is not access control and does not untrack existing files.
- Stage explicit paths, inspect the staged diff, then run `check-public.py --staged`. Never force-add ignored files or copy a checkout wholesale into a gallery/package.
- Screenshots must show demo data and hide unrelated history. Keep fixture provenance in documentation, without labels drawn on screenshots.

## Leave a useful handoff

Before ending meaningful work, update the dated `STATUS.md` snapshot and `HISTORY.md`; update `DECISIONS.md` only for durable decisions. Record changed behavior, commits/PRs, checks actually run, limits, open work and the next concrete action. Update `.local/RESUME.md` separately for installed version/backups/private commands. Do not paste raw chats or duplicate the changelog. Resolve stale or contradictory notes and link evidence.

Do not deploy, merge or publish merely because a runbook describes how. Follow the user's current authorization. Ask before destructive operations.
