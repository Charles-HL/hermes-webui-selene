/* SPDX-License-Identifier: MIT */
(() => {
  "use strict";
  const skin = "selene";
  let cleanup;
  let pending;

  // Move original controls, retaining their handlers, IDs and core state.
  // Comment anchors make switching to any other skin exactly reversible.
  function mount() {
    const nav = document.querySelector(".sidebar-nav");
    const box = document.querySelector(".composer-box");
    const left = box?.querySelector(".composer-left");
    const newChat = document.getElementById("btnNewChat");
    if (!nav || !left || !newChat) return false;
    const undo = [];
    const text = (english, french) => document.documentElement.lang.startsWith("fr") ? french : english;
    const labels = new Map();
    const labelObserver = new MutationObserver((changes) => {
      for (const { target } of changes) {
        const span = labels.get(target);
        if (span) span.textContent = target.dataset.tooltip || target.getAttribute("aria-label") || target.title || span.textContent;
      }
    });
    undo.push(() => labelObserver.disconnect());
    const move = (node, parent, before = null) => {
      if (!node) return;
      const anchor = document.createComment("theme-control-home");
      node.before(anchor);
      parent.insertBefore(node, before);
      undo.push(() => { anchor.replaceWith(node); });
    };
    const label = (node, text, live = true) => {
      const span = document.createElement("span");
      span.className = "theme-control-label";
      span.textContent = text;
      node.append(span);
      if (live) {
        labels.set(node, span);
        labelObserver.observe(node, { attributes: true, attributeFilter: ["data-tooltip", "aria-label", "title"] });
      }
      undo.push(() => span.remove());
    };
    const makeBrand = (className) => {
      const brand = document.createElement("span");
      brand.className = className;
      const mark = document.querySelector(".app-titlebar-icon")?.cloneNode(true);
      if (mark) {
        mark.className = "theme-brand-mark";
        // Two presentations of the native mark must not duplicate SVG IDs.
        for (const node of mark.querySelectorAll("[id]")) {
          const old = node.id, next = `${className}-${old}`;
          node.id = next;
          for (const element of mark.querySelectorAll("*")) {
            for (const attr of [...element.attributes]) {
              if (attr.value.includes(`url(#${old})`)) element.setAttribute(attr.name, attr.value.replaceAll(`url(#${old})`, `url(#${next})`));
            }
          }
        }
        brand.append(mark);
      }
      const wordmark = document.createElement("span");
      wordmark.textContent = "Hermes";
      brand.append(wordmark);
      return brand;
    };
    const sidebarBrand = makeBrand("theme-sidebar-brand");
    nav.before(sidebarBrand);
    undo.push(() => sidebarBrand.remove());
    const more = document.createElement("button");
    more.type = "button";
    more.className = "theme-nav-more";
    const moreIcon = document.createElement("span");
    moreIcon.className = "theme-nav-more-icon";
    moreIcon.setAttribute("aria-hidden", "true");
    moreIcon.textContent = "•••";
    const moreLabel = document.createElement("span");
    moreLabel.textContent = text("Explore Hermes", "Explorer Hermes");
    more.append(moreIcon, moreLabel);
    const closeExplorer = () => {
      more.setAttribute("aria-expanded", "false");
      nav.classList.remove("theme-nav-expanded");
    };
    more.setAttribute("aria-expanded", "false");
    more.addEventListener("click", () => {
      const open = more.getAttribute("aria-expanded") !== "true";
      more.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("theme-nav-expanded", open);
    });
    // Core inserts action mirrors before its direct logs/dashboard anchors.
    // Keep those native tabs in place; presentation uses order and visibility.
    nav.append(more);
    undo.push(() => { more.remove(); nav.classList.remove("theme-nav-expanded"); });
    for (const tab of [...nav.querySelectorAll(":scope > .nav-tab")]) {
      label(tab, tab.dataset.tooltip || tab.dataset.label || "Hermes");
      if (!["chat", "settings"].includes(tab.dataset.panel)) {
        tab.classList.add("theme-nav-secondary");
        undo.push(() => tab.classList.remove("theme-nav-secondary"));
      }
    }
    const closeAfterNavigation = (event) => {
      const tab = event.target.closest(".theme-nav-secondary,[data-nav-action-mirror]");
      if (!tab) return;
      requestAnimationFrame(() => {
        if (!tab.dataset.panel || tab.classList.contains("active")) {
          closeExplorer();
          more.focus({ preventScroll: true });
        }
      });
    };
    nav.addEventListener("click", closeAfterNavigation);
    undo.push(() => nav.removeEventListener("click", closeAfterNavigation));
    move(newChat, nav, nav.firstChild);
    label(newChat, newChat.dataset.tooltip || "New conversation");
    let searchToggle;
    const setSearchVisible = (open) => {
      document.documentElement.dataset.themeSearch = open ? "open" : "closed";
      searchToggle?.setAttribute("aria-expanded", String(open));
    };
    const openSearch = () => {
      if (document.documentElement.dataset.themeSearch === "open") {
        setSearchVisible(false);
        return;
      }
      setSearchVisible(true);
      const chat = nav.querySelector('[data-panel="chat"]');
      if (chat && !chat.classList.contains("active")) chat.click();
      if (document.querySelector(".layout")?.classList.contains("sidebar-collapsed")) document.getElementById("btnHamburger")?.click();
      requestAnimationFrame(() => document.getElementById("sessionSearch")?.focus());
    };

    const header = document.querySelector(".app-titlebar");
    if (header) {
      const brand = makeBrand("theme-header-brand");
      const heading = document.createElement("div");
      heading.className = "theme-header-conversation";
      const layout = document.querySelector(".layout");
      const updateSidebar = () => {
        document.documentElement.dataset.themeSidebar = layout?.classList.contains("sidebar-collapsed") ? "collapsed" : "open";
        document.documentElement.dataset.themeDrawer = nav.closest(".sidebar")?.classList.contains("mobile-open") ? "open" : "closed";
        const hidden = window.matchMedia("(max-width:640px)").matches
          ? document.documentElement.dataset.themeDrawer === "closed"
          : document.documentElement.dataset.themeSidebar === "collapsed";
        if (hidden) closeExplorer();
      };
      const sidebarMedia = window.matchMedia("(max-width:640px)");
      sidebarMedia.addEventListener("change", updateSidebar);
      undo.push(() => sidebarMedia.removeEventListener("change", updateSidebar));
      const sidebarObserver = new MutationObserver(updateSidebar);
      if (layout) sidebarObserver.observe(layout, { attributes: true, attributeFilter: ["class"] });
      updateSidebar();
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) sidebarObserver.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
      const originalWidth = document.documentElement.style.getPropertyValue("--theme-sidebar-width");
      const resizeObserver = new ResizeObserver(() => {
        const width = sidebar?.getBoundingClientRect().width;
        if (width > 0) document.documentElement.style.setProperty("--theme-sidebar-width", `${width}px`);
      });
      if (sidebar) resizeObserver.observe(sidebar);
      undo.push(() => {
        resizeObserver.disconnect();
        if (originalWidth) document.documentElement.style.setProperty("--theme-sidebar-width", originalWidth);
        else document.documentElement.style.removeProperty("--theme-sidebar-width");
      });
      undo.push(() => { sidebarObserver.disconnect(); delete document.documentElement.dataset.themeSidebar; delete document.documentElement.dataset.themeDrawer; });
      header.append(brand, heading);
      undo.push(() => { brand.remove(); heading.remove(); });
      move(header.querySelector(".app-titlebar-title"), heading);
      // Keep the global reload action in the header, not in a conversation menu.
      move(document.getElementById("btnReload"), header);

    }
    const list = document.getElementById("sessionList");
    const listScrollTop = list?.scrollTop || 0;
    if (list) {
      const heading = document.createElement("div");
      heading.className = "theme-session-heading";
      const caption = document.createElement("span");
      caption.textContent = "Conversations";
      const filters = document.createElement("button");
      filters.type = "button";
      filters.textContent = text("Filters", "Filtres");
      filters.setAttribute("aria-pressed", "false");
      filters.addEventListener("click", () => {
        const open = filters.getAttribute("aria-pressed") !== "true";
        filters.setAttribute("aria-pressed", String(open));
        document.documentElement.dataset.themeFilters = open ? "open" : "closed";
        if (open) setSearchVisible(true);
      });
      const actions = document.createElement("div");
      actions.className = "theme-session-actions";
      const search = document.createElement("button");
      search.type = "button";
      search.className = "theme-list-search";
      searchToggle = search;
      search.setAttribute("aria-expanded", "false");
      search.setAttribute("aria-controls", "sessionSearch");
      search.setAttribute("aria-label", text("Search conversations", "Rechercher les conversations"));
      search.addEventListener("click", openSearch);
      actions.append(search, filters);
      heading.append(caption, actions);
      list.before(heading);
      undo.push(() => { heading.remove(); delete document.documentElement.dataset.themeFilters; delete document.documentElement.dataset.themeSearch; });
    }

    const plus = document.createElement("button");
    plus.type = "button";
    plus.id = "themeComposerPlus";
    plus.className = "icon-btn";
    plus.textContent = "+";
    plus.setAttribute("aria-label", document.documentElement.lang.startsWith("fr") ? "Ajouter des fichiers et des outils" : "Add files and tools");
    plus.setAttribute("aria-haspopup", "true");
    plus.setAttribute("aria-expanded", "false");
    plus.setAttribute("aria-controls", "themeComposerMenu");
    const menu = document.createElement("div");
    menu.id = "themeComposerMenu";
    menu.className = "theme-composer-menu";
    menu.setAttribute("role", "group");
    menu.setAttribute("aria-label", text("Hermes files and tools", "Fichiers et outils Hermes"));
    menu.hidden = true;
    // Core toggles this popup using its inline display state, whereas its
    // initial template only hides it through CSS. Initialize that closed state.
    const prompts = document.getElementById("savedPromptsPopup");
    if (prompts && !prompts.style.display) {
      prompts.style.display = "none";
      undo.push(() => { if (prompts.style.display === "none") prompts.style.display = ""; });
    }
    left.prepend(plus);
    box.append(menu);
    undo.push(() => { plus.remove(); menu.remove(); });
    const extras = ["#btnAttach", "#btnSavedPrompts", ".composer-ws-wrap",
      "#yoloPill", "#providerQuotaChip", "#composerToolsetsWrap"];
    for (const selector of extras) {
      const node = left.querySelector(selector);
      move(node, menu);
      if (node?.tagName === "BUTTON") {
        const quota = node.id === "providerQuotaChip";
        label(node, quota ? text("Provider quota", "Quota du fournisseur") : node.dataset.tooltip || node.getAttribute("aria-label") || node.title || "Options", !quota);
      }
    }
    // Core owns and updates this context row, including compression actions.
    // Moving the existing row gives mobile users access through the + menu.
    move(document.getElementById("composerMobileContextAction"), menu);
    const sidebar = nav.closest(".sidebar");
    const profile = left.querySelector("#profileChipWrap");
    if (profile && sidebar) {
      profile.classList.add("theme-sidebar-profile");
      undo.push(() => profile.classList.remove("theme-sidebar-profile"));
      move(profile, sidebar);
    }
    // Native dictation uses two status nodes. Keep both below the controls,
    // rather than squeezing asynchronous transcription beside Send.
    const composerStatus = document.getElementById("composerStatus");
    const mic = document.getElementById("btnMic");
    if (composerStatus && mic) {
      move(composerStatus, box);
      const originalRole = composerStatus.getAttribute("role");
      const originalLive = composerStatus.getAttribute("aria-live");
      composerStatus.setAttribute("role", "status");
      composerStatus.setAttribute("aria-live", "polite");
      let translatedStatus;
      const updateDictation = () => {
        const current = composerStatus.textContent.trim();
        const processing = composerStatus.style.display !== "none" &&
          (current === "Transcribing…" || current === "Transcribing..." || current === translatedStatus);
        if (processing) {
          translatedStatus = text("Transcribing…", "Transcription en cours…");
          if (composerStatus.textContent !== translatedStatus) composerStatus.textContent = translatedStatus;
        } else translatedStatus = undefined;
        if (mic.classList.contains("recording")) box.dataset.themeDictation = "recording";
        else if (processing) box.dataset.themeDictation = "processing";
        else delete box.dataset.themeDictation;
      };
      const dictationObserver = new MutationObserver(updateDictation);
      dictationObserver.observe(composerStatus, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["style"] });
      dictationObserver.observe(mic, { attributes: true, attributeFilter: ["class"] });
      const dismissTooltip = () => { mic.dataset.themeTooltipDismissed = "true"; };
      const resetTooltip = () => { delete mic.dataset.themeTooltipDismissed; };
      mic.addEventListener("click", dismissTooltip);
      mic.addEventListener("pointerleave", resetTooltip);
      mic.addEventListener("blur", resetTooltip);
      updateDictation();
      undo.push(() => {
        dictationObserver.disconnect();
        mic.removeEventListener("click", dismissTooltip);
        mic.removeEventListener("pointerleave", resetTooltip);
        mic.removeEventListener("blur", resetTooltip);
        delete box.dataset.themeDictation;
        delete mic.dataset.themeTooltipDismissed;
        if (translatedStatus && composerStatus.textContent === translatedStatus) composerStatus.textContent = "Transcribing…";
        if (originalRole === null) composerStatus.removeAttribute("role");
        else composerStatus.setAttribute("role", originalRole);
        if (originalLive === null) composerStatus.removeAttribute("aria-live");
        else composerStatus.setAttribute("aria-live", originalLive);
      });
    }
    // Separate the two native workspace actions into consistently sized rows.
    const workspaceFiles = document.getElementById("btnWorkspacePanelToggle");
    if (workspaceFiles) label(workspaceFiles, text("Workspace files", "Fichiers de l’espace"), false);
    const workspaceChip = document.getElementById("composerWorkspaceChip");
    const workspaceIcon = workspaceFiles?.querySelector(".composer-workspace-icon")?.cloneNode(true);
    if (workspaceChip && workspaceIcon) {
      workspaceChip.prepend(workspaceIcon);
      undo.push(() => workspaceIcon.remove());
    }
    // Keep native reasoning directly after the model; core still controls
    // its availability and caption for each selected model.
    const reasoning = document.getElementById("composerReasoningWrap");
    const model = left.querySelector(".composer-model-wrap");
    if (reasoning && model) move(reasoning, left, model.nextSibling);
    // Main row follows model → reasoning → microphone → send order.
    move(left.querySelector("#btnMic"), left);
    const close = (restoreFocus = false) => {
      menu.hidden = true;
      plus.setAttribute("aria-expanded", "false");
      if (restoreFocus) plus.focus();
    };
    plus.addEventListener("click", (event) => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      plus.setAttribute("aria-expanded", String(opening));
      if (opening && event.detail === 0) menu.querySelector("button:not([disabled])")?.focus();
    });
    const outside = (event) => {
      if (!box.contains(event.target) && !event.target.closest(".profile-dropdown,.ws-dropdown,.model-dropdown,.composer-toolsets-dropdown,.composer-reasoning-dropdown,.saved-prompts-popup")) close();
    };
    const escape = (event) => {
      if (event.key === "Escape" && !menu.hidden) close(true);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    undo.push(() => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); });
    if (sidebar) {
      // Navigation can scroll, while the native conversation list keeps its
      // own scroller for core virtualization. The profile remains pinned.
      const scroll = document.createElement("div");
      scroll.className = "theme-sidebar-scroll";
      scroll.tabIndex = 0;
      scroll.setAttribute("aria-label", text("Sidebar navigation and conversations", "Navigation et conversations"));
      sidebar.insertBefore(scroll, nav);
      undo.push(() => scroll.remove());
      for (const node of [nav, ...sidebar.querySelectorAll(":scope > .panel-view")]) {
        if (node) move(node, scroll);
      }
    }
    // Reparenting can reset the native scroller without a final scroll event.
    // Let Core recompute its real virtual window after layout/viewport changes;
    // do not reproduce its row-height calculation in this theme.
    let listFrame;
    if (list) {
      const notifyList = () => list.dispatchEvent(new Event("scroll"));
      const listResize = new ResizeObserver(notifyList);
      listResize.observe(list);
      listFrame = requestAnimationFrame(() => {
        list.scrollTop = listScrollTop;
        notifyList();
      });
      undo.push(() => { listResize.disconnect(); cancelAnimationFrame(listFrame); });
    }
    cleanup = () => {
      // Restore moved nodes before removing their temporary containers.
      for (const fn of undo.slice().reverse()) fn();
      list?.dispatchEvent(new Event("scroll"));
      cleanup = undefined;
    };
    return true;
  }

  function reconcile() {
    if (!document.body) return;
    if (document.documentElement.dataset.skin !== skin) {
      pending?.disconnect(); pending = undefined;
      cleanup?.();
    } else if (!cleanup && !mount() && !pending) {
      pending = new MutationObserver(() => {
        if (mount()) { pending.disconnect(); pending = undefined; }
      });
      pending.observe(document.body, { childList: true, subtree: true });
    }
  }
  new MutationObserver(reconcile).observe(document.documentElement, { attributes: true, attributeFilter: ["data-skin"] });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", reconcile, { once: true });
  else reconcile();
})();
