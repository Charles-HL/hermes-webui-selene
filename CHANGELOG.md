# Changelog

## 1.1.5 — 2026-10-07

- Keep native toast notifications above the theme header, mobile drawer and profile menu.

## 1.1.4 — 2026-10-07

- Keep the native Kanban, Skills and Settings search fields visible; only the chat list's search sits behind the toggle.
- Apply the rounded menu shell to Core's conversation action menu (`.session-action-menu`).
- Size the desktop reasoning chip for its icon and label, with ellipsis instead of clipping.
- Collapse the reasoning chip to its icon when a narrow desktop composer would squeeze the model picker.
- Round and reweight the conversation action menu's rows to match Selene's other menus.
- Keep the fixed Provider quota caption when Core updates the chip's tooltip.
- Replace the mobile dark screenshot with a demo-only capture.
- Run the virtual-list regression behind the shared HTTP/WebSocket network guards with service workers blocked.

## 1.1.3 — 2026-10-07

- Restore native conversation-list scrolling for virtualized histories while keeping the profile pinned.
- Reserve both mobile header actions and preserve native row action padding.
- Hide absent quota data, align its caption/value, and keep context compression at intrinsic width.
- Restore the native header plus and desktop brain icon; focus add-menu items only for keyboard opens.
- Adapt the composer to a narrow desktop chat column with both panels open.
- Move review evidence out of the installable package.

## 1.1.2 — 2026-10-07

- Replace the main desktop/mobile screenshots with a real rendered demo conversation, including user/assistant messages, a checklist and code.
- Add Mobile Light and refresh populated review captures with native message markup. Runtime JavaScript and CSS are unchanged.

## 1.1.1 — 2026-10-07

- Apply the 44 px mobile minimum to the pinned profile button and add-menu rows as well as the composer controls.

## 1.1.0 — 2026-10-07

- Respect composer controls hidden in native settings.
- Pin the profile switcher outside the sidebar scroll area.
- Restore title interaction and replace the details popover with a global Reload icon.
- Use 44 px mobile composer touch targets and expose native context usage in the add menu.
- Preserve quota values, project chips, active-tab collapse and collapsed-sidebar rail navigation.
- Widen the mobile drawer and remove the duplicate desktop New conversation action.
- Lead installation documentation with Settings → Extensions; describe the gallery entry independently of other products.

## 1.0.2 — 2026-10-06

- Size desktop composer controls to their visible contents, eliminating unused space before Send when reasoning is hidden or short.
- Use consistent 4 px control gaps and let model labels use their natural width up to 196 px.
- Allow the model picker to shrink with ellipsis in narrow tablet columns; preserve the mobile control row.

## 1.0.1 — 2026-10-06

- Place transcription status beneath composer controls, matching the listening status on desktop and mobile.
- Show a localized processing label and a reduced-motion-aware progress indicator.
- Dismiss the microphone tooltip after clicking and while dictation is active.
- Restore the native status placement, label and accessibility attributes when switching skins.

## 1.0.0 — 2026-10-06

First public release as Selene.

- Paired Light/Dark palettes and responsive desktop/mobile composition.
- Native skin registration with reversible navigation and composer presentation.
- Unified sidebar, Explore submenus, active profile access, conversation search toggle and shared scrolling beneath a fixed header.
- Rounded picker rows, compact mobile reasoning control and reduced-motion support.
- Installation instructions, compatibility notes, permission metadata and real UI screenshots.
