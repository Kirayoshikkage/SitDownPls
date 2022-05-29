function setEventKeydown(selector, key, cb) {
  if (!document.querySelectorAll(selector).length) return null;

  if (arguments.length !== 3) return null;

  document.querySelectorAll(selector).forEach((item) => {
    item?.addEventListener("keydown", (e) => {
      if (e.key === key && e.target === e.currentTarget) {
        cb(e.currentTarget);
      }
    });
  });
}

export { setEventKeydown };
