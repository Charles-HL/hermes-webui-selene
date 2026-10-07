# Development and distribution workflow

## Resume and edit

Read the index/status first and `.local/RESUME.md` if present. Verify dirty files before switching branches. Change scoped CSS or reversible layout code here, not Core. No build step is required. For browser testing, use the actual installed UI or a local native-template fixture with synthetic data. Never reuse a `/tmp` fixture blindly: rebuild it from the relevant native template/CSS and current theme assets; record its provenance and limits.

Start a local fixture with `python3 -m http.server 8770 --directory /path/to/fixture`. Inspect desktop, mobile320/390, narrow columns, menus, hidden controls, lossless Default round trips and the changed behavior. A fixture is not backend/STT evidence. Installed extension updates may need a browser reload. Real installation/rollback steps are private in `.local/DEPLOYMENT.md`.

## Gallery synchronization

The canonical source and gallery entry are separate repositories. First inspect current upstream and PR status:

```sh
gh pr view 101 --repo hermes-webui/hermes-webui-extensions --json state,comments,statusCheckRollup
# In the gallery checkout:
git status --short
git fetch upstream
git remote show upstream
```

Use the actual default branch, currently `main`. If a matching PR is open, continue its branch. After merge, make a fresh fix branch from the updated upstream default; avoid pushing new work to a merged branch.

Compare `extensions/selene/assets/` and metadata against standalone before overwriting: maintainers may have added fixes. Import them selectively, then copy only package files. Preserve gallery README's neutral naming and gallery-first install instructions. Never copy `.local/`, agent/wiki files, raw chat logs or `review-evidence/` into the gallery entry. Keep extension.json/manifest.json versions aligned; docs-only changes here do not require runtime bumps or gallery PRs.

From the gallery checkout, use the current repository's scripts:

```sh
# On the maintainer Mac, use nvm from the user's zshrc:
zsh -ic 'node scripts/validate-extensions.mjs && node scripts/scan-extension-safety.mjs'
# When behavior changes warrant it:
zsh -ic 'node scripts/run-behavior-tests.mjs'
```

Inspect the diff and stage explicit paths. Write English PR descriptions to a temporary body file, then use `gh pr create --body-file ...`. Do not claim old-head CI or simulated browser services as new-head validation. Attach newly created PRs to the task when that capability is available.

## Public packaging and release

```sh
python3 scripts/package-release.py
python3 scripts/check-public.py --staged
git diff --cached --check
git diff --cached
```

The builder writes ZIP, TAR, checksum and native file list to ignored `.artifacts/releases/` from explicit public files. It includes five metadata-listed previews and excludes this wiki, agent instructions, scripts, local notes and review evidence. Inspect archive members and metadata versions before uploading. Packaging never deploys or publishes automatically.

After authorized release publication, verify assets and their checksum. For deployment, use the private runbook, backup the installed extension first, update its native registry through the WebUI helper and verify hashes/health/browser behavior. Do not inspect or print compose/env/credential files to debug a theme.

## Local commit guard

The versioned `.githooks/pre-commit` runs the staged text/privacy check. After checking `git config --get core.hooksPath` and existing hooks, enable it with `git config core.hooksPath .githooks`. Do not overwrite a pre-existing hook setup. This setting is local to a checkout; a fresh clone needs activation. Hooks are an extra check, not permission to skip reviewing public images.

## Handoff and privacy

Update Status, History and affected decisions with dates, evidence, pending checks and next action. Update private installation notes separately. `check-public.py` catches common text patterns and optional local forbidden literals; it cannot detect every secret or read text in images. Inspect screenshots and staged diffs manually. Ignored files can still be force-added, and already tracked files remain tracked despite ignore rules. A detected leak requires removing it from the candidate commit and assessing prior exposure, not merely adding an ignore rule.
