# Durable decisions

- **Own name:** Selene. Standalone discovery text may describe ChatGPT inspiration; gallery entries describe Selene independently. No borrowed proprietary logos or fonts.
- **Native extension:** theme.js registers the skin; theme.css styles it; layout.js relocates native nodes reversibly. No core patch, custom image or backend change.
- **Fidelity:** desktop/mobile visual fidelity is authorized, including welcome composer positioning and navigation presentation. Native usability overrides purely visual imitation.
- **Composer:** add → model → reasoning → mic → send; mobile reasoning uses the brain icon. Narrow desktop columns adapt using container queries.
- **Sidebar:** header and profile stay fixed. Conversation history uses native sessionList scrolling because Core virtualizes beyond 80 rows. Preserve Core's right padding for timestamps/action columns. Reparenting and resizing notify native scroll listeners; do not duplicate Core's renderer.
- **Menus:** common rounded shells/rows, keyboard focus, viewport containment. Core controls hidden states, quota updates and reasoning availability. An absent quota stays hidden.
- **Voice:** recording/transcription presentation shares a status row; preserve native capture/STT. Visual fixtures simulate these states and do not validate audio services.
- **Distribution:** keep canonical and gallery runtime/versions synchronized, but preserve their intentionally different README descriptions. Review evidence belongs outside installable packages.
- **Privacy:** use benign demo conversations; never publish unrelated sidebar history, installation endpoints or raw chats. Ignored notes need private backup, not public Git.
