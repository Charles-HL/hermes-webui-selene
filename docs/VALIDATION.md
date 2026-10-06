# Validation

Tested against Hermes WebUI `exp-v0.52.404` through its native extension loader.

- Desktop and mobile geometry, including 390 px and 320 px widths.
- Light and Dark palettes; final release screenshots show both.
- Single mobile composer control row and a multiline draft, cleared without sending.
- Native model search, profile/model/effort menus and model-list scrolling. No profile, model or effort changes were made for these visual checks.
- Rounded menu shells and internal selected/hover states, workspace actions and slash-command suggestions.
- Stable Explore label, indented submenus, collapse on navigation/sidebar closure, search toggle and outside-click mobile dismissal.
- Sidebar navigation/list scrolling with a fixed header.
- Switching to Default restores original element parents and removes temporary containers; reactivation creates no duplicate controls.
- Source inspection for saved-prompt, skill-suggestion and settings-search menu selectors. Populated content in those menus was not exhaustively exercised.

## Dictation presentation (1.0.1)

A local fixture used the installed native composer markup and stylesheet, with Selene assets and controls that simulated native listening, transcription and completion state changes. Desktop, 390 px and 320 px layouts kept status text below the controls without horizontal overflow; multiline drafts, microphone click dismissal, idle recovery and Default/Selene cleanup were checked. Default restored the native status parent and label. Processing uses a polite live status and disables its spinner animation when reduced motion is requested.

No microphone access, audio recording or speech-to-text service was exercised in this visual regression check. The extension does not change capture or transcription logic.

## Composer spacing (1.0.2)

The native-composer fixture verified 4 px gaps between desktop model, visible reasoning, microphone and Send controls, with reasoning shown and hidden and with a multiline draft. Short model labels use their natural width; long labels are bounded to 196 px. A 284 px tablet composer column shrank the model label without overlapping other controls. The 320 px mobile row retained its compact reasoning icon. Installed assets were checked in a fresh browser view after deployment.

## Limits

Testing used a browser viewport, not an exhaustive matrix of physical Android/iOS devices, software keyboards or installed PWA versions. Theme animation durations were compared visually and through computed styles; every native interaction and streaming state has not been measured. Hermes updates may require selector adjustments.

Screenshots are captured from a neutral welcome screen or cropped navigation, without conversation history, credentials or installation-specific endpoints. They are UI evidence, not generated mockups.

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
- Screenshots in `screenshots/review/` show synthetic data and simulated listening/transcribing states. They contain no private conversation history. They complement the original installed welcome screenshots.

Current upstream core master was independently tested by the maintainer on the previous PR head. This revision still requires their gates to be rerun; local fixture checks do not claim that those remote checks have passed.

Installed follow-up: the real sidebar scroll area contained 10,024 px of content. Scrolling to 9,412.5 px left the profile footer at y=663 in a 720 px viewport. At 390 by 844, the footer stayed at y=783, the drawer measured 360 px and microphone/add targets measured 44 px. The native profile dropdown stayed inside the viewport; no profile was changed. No browser errors were recorded.
