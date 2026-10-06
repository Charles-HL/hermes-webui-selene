/* SPDX-License-Identifier: MIT */
(() => {
  "use strict";
  // Core owns Light/Dark/System, local persistence and the native picker. This extension never
  // reads conversations or calls application APIs. The draft observer below
  // only selects the visual compact/expanded composer presentation.
  if (typeof window.registerHermesSkin !== "function") {
    console.warn("Selene requires Hermes WebUI theme registration support.");
    return;
  }
  const descriptor = {
    name: "Selene",
    value: "selene",
    colors: ["#ededed", "#1b1b1b", "#000000"],
    // The paired palettes live in CSS; this token satisfies the core contract.
    tokens: { "--accent": "#0d0d0d" }
  };
  window.registerHermesSkin(descriptor);

  document.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLTextAreaElement) || input.id !== "msg") return;
    if (document.documentElement.dataset.skin !== descriptor.value) return;
    const box = input.closest(".composer-box");
    if (!box) return;
    if (!input.value) {
      delete box.dataset.themeExpanded;
      return;
    }
    requestAnimationFrame(() => {
      if (input.value.includes("\n") || input.scrollHeight > 46) {
        box.dataset.themeExpanded = "true";
      }
    });
  });

  // Core preserves extension skin names in its browser-local preference during
  // settings hydration. Server normalization may still reject custom names;
  // that limits cross-device sync, but requires no interception or extra storage.
})();
