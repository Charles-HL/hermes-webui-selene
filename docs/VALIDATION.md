# Validation

Tested against Hermes WebUI `exp-v0.52.404` through its native extension loader.

- Desktop and mobile geometry, including 390 px and 320 px widths.
- Light and Dark palettes; final release screenshots show both.
- Single mobile composer control row and a multiline draft, cleared without sending.
- Native model search, profile/model/effort menus and model-list scrolling. No profile, model or effort changes were made for these visual checks.
- Rounded menu shells and internal selected/hover states, workspace actions and slash-command suggestions.
- Stable Explore label, indented submenus, collapse on navigation/sidebar closure, search toggle and outside-click mobile dismissal.
- Native conversation-list scrolling with a fixed profile footer.
- Switching to Default restores original element parents and removes temporary containers; reactivation creates no duplicate controls.
- Source inspection for saved-prompt, skill-suggestion and settings-search menu selectors. Populated content in those menus was not exhaustively exercised.

## Dictation presentation (1.0.1)

A local fixture used the installed native composer markup and stylesheet, with Selene assets and controls that simulated native listening, transcription and completion state changes. Desktop, 390 px and 320 px layouts kept status text below the controls without horizontal overflow; multiline drafts, microphone click dismissal, idle recovery and Default/Selene cleanup were checked. Default restored the native status parent and label. Processing uses a polite live status and disables its spinner animation when reduced motion is requested.

No microphone access, audio recording or speech-to-text service was exercised in this visual regression check. The extension does not change capture or transcription logic.

## Composer spacing (1.0.2)

The native-composer fixture verified 4 px gaps between desktop model, visible reasoning, microphone and Send controls, with reasoning shown and hidden and with a multiline draft. Short model labels use their natural width; long labels are bounded to 196 px. A 284 px tablet composer column shrank the model label without overlapping other controls. The 320 px mobile row retained its compact reasoning icon. Installed assets were checked in a fresh browser view after deployment.

## Limits

Testing used a browser viewport, not an exhaustive matrix of physical Android/iOS devices, software keyboards or installed PWA versions. Theme animation durations were compared visually and through computed styles; every native interaction and streaming state has not been measured. Hermes updates may require selector adjustments.

Main screenshots are captured from an intentionally created public demo conversation in the installed WebUI, with private sidebar history hidden. Navigation crops and synthetic review fixtures contain no private history, credentials or installation-specific endpoints. They are UI evidence, not generated mockups.

## Distribution checks

JavaScript syntax checks passed. The official extension-library validator and safety scan passed with Selene added alongside 21 existing entries (22 entries total), using library revision `9e08e3bd5e13ca3ff5479d5bf6263f0e6b116be1`. These automated checks are a packaging/safety baseline, not a substitute for maintainer review. Final public screenshots were inspected individually before publication.

## Review regressions (1.1.0)

A populated local fixture used the installed `exp-v0.52.404` native template and stylesheet, with 24 synthetic conversations, project chips, context usage and quota values. Native session/audio/profile services were replaced by local fixture controls; these checks validate presentation and DOM restoration, not those services.

- Hidden model wrapper/chip, reasoning, saved prompts and workspace controls stay hidden on desktop and mobile, including the compact stage.
- Profile parent is the sidebar, outside the scroll container. Its position remains unchanged after scrolling to the last conversation on desktop and mobile. The profile menu fits above it.
- Native title double-click receives input. Global Reload stays in the header, and the empty details popover is removed.
- At 390 px and 320 px, add, reasoning, microphone and Send measure 44 by 44 px without overlap.
- Context usage is accessible in the mobile add menu. Quota values and project chips remain visible.
- Desktop collapsed navigation rail remains visible; header New conversation is hidden while the sidebar is open. Active-tab collapse is no longer intercepted.
- A Default switch restored every original ID-bearing element to its original parent and child index (zero differences). Reactivation produced no duplicate controls.
- Historical screenshots in the standalone repository `review-evidence/round-1/` show synthetic data and simulated listening/transcribing states. They contain no private conversation history. They complement the original installed welcome screenshots.

Current upstream core master was independently tested by the maintainer on the previous PR head. This revision still requires their gates to be rerun; local fixture checks do not claim that those remote checks have passed.

Installed follow-up: the real sidebar scroll area contained 10,024 px of content. Scrolling to 9,412.5 px left the profile footer at y=663 in a 720 px viewport. At 390 by 844, the footer stayed at y=783, the drawer measured 360 px and microphone/add targets measured 44 px. The native profile dropdown stayed inside the viewport; no profile was changed. No browser errors were recorded.

## Conversation captures (1.1.2)

The public demo was sent through the actual installed Hermes chat UI and renamed through the native header interaction. Desktop Light/Dark and 390 px mobile Light/Dark show its native user/assistant rows, numbered checklist, JavaScript block and message actions. No application tools were needed for the demo response. Review fixtures reuse this benign native message markup while sidebar data, context/quota and dictation remain seeded or simulated. Welcome captures are intentionally empty. The original Dark mode and open desktop sidebar preferences were restored after capture. No runtime assets changed in this release.

## Second review regressions (1.1.3)

The native-template fixture verified `sessionList` as an overflow-auto bounded scroller, with the profile pinned. A 200-row fixture using core `_sessionVirtualWindow` (38 px measured fixture rows) reached window 173–200 and the final conversation; the full backend/core renderer was not exercised by this fixture. Native row markup keeps 40 px reserved on mobile and hover/focus, with timestamps clear of the action trigger.

At 320/390 px, the header's New conversation receives the center-point hit with a long title. Absent quota data computes to display none; present data shows a fixed caption and value. Mobile context text stays 12 px clear of the intrinsic-width Compress button (85 px in the English fixture). Mouse opens retain focus on +; Enter opens focus Attach and Escape returns focus to +. Five Default/Selene round trips restored original parents/indexes with zero differences. No browser errors. At 1024 and 1200 px with both panels open, the draft occupies a separate row above the control row without composer overflow.

[Second-review screenshots](https://github.com/Charles-HL/hermes-webui-selene/tree/main/review-evidence) are linked from the PR, excluded from the release ZIP and absent from the gallery package. Main installed conversation previews remain in the package.

Installed follow-up on 1.1.3: `sessionList` computed to overflow auto with a bounded 393 px height, and the profile parent remained the sidebar. Core's absent quota data stayed hidden inside the add menu, with the translated fixed caption available when needed. Pointer opening left focus on + and no console errors were observed. Runtime hashes matched between the canonical source and the installation; the WebUI remained healthy. Package validation/safety (22 entries) and the 15 behavior suites passed on this revision.
