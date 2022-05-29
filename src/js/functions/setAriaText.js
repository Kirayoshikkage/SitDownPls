function setAriaText(item = null) {
  if (!item || !(item instanceof HTMLElement)) return;

  let initialAriaText = item.hasAttribute("aria-label")
      ? item.getAttribute("aria-label")
      : "",
    ariaText = `${initialAriaText} ${item.textContent}`;

  item.setAttribute("aria-label", ariaText.trim());
}

export { setAriaText };
