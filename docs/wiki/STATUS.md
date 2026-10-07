# Status

Verified 2026-10-07. Refresh these facts before starting a new session.

- Canonical public source: [Charles-HL/hermes-webui-selene](https://github.com/Charles-HL/hermes-webui-selene), branch `main`.
- Latest runtime: **1.1.5**, source commit `7faae24`, [release](https://github.com/Charles-HL/hermes-webui-selene/releases/tag/v1.1.5).
- [Gallery PR100](https://github.com/hermes-webui/hermes-webui-extensions/pull/100) merged as `ab3d5be`. Maintainers released 1.1.4 with additional native-control/virtualization fixes; these are incorporated in standalone 1.1.5.
- [Toast PR101](https://github.com/hermes-webui/hermes-webui-extensions/pull/101) is open, head `a9182cd`, branch `fix-selene-toast-layer` in the maintainer fork. Both Validate extensions and Browser extension compatibility are green. No comments as of this check.
- Toasts now sit above the theme header. Last local checks: JS syntax, gallery validation/safety (22 entries), desktop/mobile fixture hit-testing and dismissal. See Validation for limits; this is not a full backend test.
- Review captures have no fixture watermark and are excluded from install archives. The gallery's demo-only mobile screenshot replaced the standalone preview.
- Maintainer installation/version/rollback details are recorded privately, not in this file.

## Next action

Check PR101 for feedback or merge. If merged, fetch upstream and compare `extensions/selene/` against standalone before making another change. Incorporate maintainer fixes selectively and retain the gallery's neutral README. A new bug should start a fresh branch from upstream's current default branch if no matching open PR exists.

This documentation/tooling change does not change runtime version or require a release/deployment.
