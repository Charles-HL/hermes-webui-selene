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
