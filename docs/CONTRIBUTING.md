# Contributing

Keep styling and DOM changes scoped to the `selene` skin. Preserve native controls, handlers and IDs, and make every moved node reversible when a different skin is selected.

Before proposing changes, check Light and Dark, desktop and narrow mobile viewports, reduced motion, keyboard focus, menu positioning and the switch back to the native theme. Do not add conversation reads, application API calls or remote assets without documenting the new behavior and permissions.

## Community extension library

Selene can be proposed under `extensions/selene/` in [hermes-webui-extensions](https://github.com/hermes-webui/hermes-webui-extensions). Include README, extension metadata, manifest, assets, license and screenshots. Follow the library's current [entry contract](https://github.com/hermes-webui/hermes-webui-extensions/blob/main/docs/extension-entry.md) and [contribution instructions](https://github.com/hermes-webui/hermes-webui-extensions/blob/main/CONTRIBUTING.md); use the repository's actual default branch if those links move.

Disclose native DOM mutation and navigation in `extension.json`. Run the library's validators and safety scan before submitting. Gallery availability requires maintainer review and registry publication; this standalone repository cannot grant it.

A built-in skin PR to Hermes WebUI is an alternative, but Selene includes JavaScript presentation changes as well as CSS. Discuss that scope with maintainers first. The extension library is the simpler distribution route.
