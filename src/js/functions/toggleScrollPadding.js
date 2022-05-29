function toggleScrollPadding(element = null, boolean = false) {
  if (!element || !(element instanceof HTMLElement)) return;

  if (!boolean) {
    element.style.paddingRight = 0;

    return;
  }

  let padding = `${window.innerWidth - document.body.offsetWidth}px`;

  element.style.paddingRight = padding;
}

export { toggleScrollPadding };
