class Tooltip {
  constructor({ selectors = null, apiAnimation = null } = {}) {
    this._tooltips =
      typeof selectors === "string"
        ? document.querySelectorAll(selectors)
        : null;
    this._apiAnimation =
      Object.prototype.toString.call(apiAnimation) === "[object Object]"
        ? apiAnimation
        : null;
  }

  _listEvents = {
    desctop: {
      mouseenter: (e) => {
        if (this.checkFocus(this.getTooltip(e))) return;

        this.show(e);
      },
      mouseleave: (e) => {
        if (this.checkFocus(this.getTooltip(e))) return;

        this.hide(e);
      },
    },
    all: {
      focus: (e) => {
        this.show(e);

        this.getTooltip(e).dataset.focus = "true";
      },
      blur: (e) => {
        this.hide(e);

        this.getTooltip(e).dataset.focus = "false";
      },
    }
  };

  _listAvailableDevices = ["desctop", "mobile", "all", "test"];

  _currentDevice;

  init() {
    if (!this._tooltips) throw new Error("Invalid type passed");

    this._currentDevice = this._checkDevice();

    this._setEvents(this.getEventsOnDevice(this._currentDevice));

    this._setAriaLabel();
  }

  _checkDevice() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return "mobile";
    } else {
      return "desctop";
    }
  }

  getEventsOnDevice(device) {
    return this._listEvents[device]
      ? Object.assign(this._listEvents["all"] ?? {}, this._listEvents[device])
      : this._listEvents["all"];
  }

  _setEvents(events) {
    for (let key in events) {
      this._tooltips.forEach((tooltip) => {
        tooltip.addEventListener(key, events[key]);
      });
    }
  }

  _setAriaLabel() {
    this._tooltips.forEach((item) => {
      let ariaText = item.dataset.content;

      item.setAttribute("aria-label", ariaText);
    });
  }

  _insertContent(tooltip) {
    tooltip.insertAdjacentHTML(
      "beforeend",
      this._createContent(tooltip.dataset.content)
    );
  }

  _createContent(content) {
    return `<span class="tooltip__content">${content}</span>`;
  }

  _removeContent(tooltip) {
    this.getTooltipContent(tooltip)?.remove();
  }

  show(e) {
    let tooltip = this.getTooltip(e);

    if (tooltip.dataset.open === "true") return;

    this._insertContent(tooltip);

    let tooltipContent = this.getTooltipContent(tooltip);

    tooltip.dataset.open = "true";

    if (this._apiAnimation) {
      this._apiAnimation.show(tooltipContent);
    } else {
      tooltipContent.style.display = "block";
    }

    tooltipContent.classList.add(this._getPosition(tooltip, tooltipContent));
  }

  hide(e) {
    let tooltip = this.getTooltip(e),
      tooltipContent = this.getTooltipContent(tooltip),
      removeClass =
        tooltipContent.classList[tooltipContent.classList.length - 1];

    tooltip.dataset.open = "false";

    tooltipContent.classList.remove(removeClass);

    if (this._apiAnimation) {
      this._apiAnimation.hide(tooltipContent);
    } else {
      tooltipContent.style.display = "none";
    }

    this._removeContent(tooltip);
  }

  getTooltip(e) {
    return e.target.closest(".tooltip");
  }

  getTooltipContent(tooltip) {
    return tooltip.querySelector(".tooltip__content");
  }

  checkFocus(tooltip) {
    return tooltip.dataset.focus === "true";
  }

  _getPosition(tooltip, textContent) {
    let coord = tooltip.getBoundingClientRect(),
      textContentStyle = window.getComputedStyle(textContent),
      textContentWidth = parseFloat(textContentStyle.width),
      textContentHeight = textContent.scrollHeight,
      tooltipWidth = coord.width,
      tooltipHeight = coord.height,
      topCoord = coord.top,
      bottomCoord = document.documentElement.clientHeight - coord.bottom,
      leftCoord = coord.left,
      rightCoord = document.documentElement.clientWidth - coord.right;

    return this._checkPosition(
      textContentWidth,
      textContentHeight,
      tooltipWidth,
      tooltipHeight,
      leftCoord,
      rightCoord,
      topCoord,
      bottomCoord
    );
  }

  _checkPosition(
    textContentWidth,
    textContentHeight,
    tooltipWidth,
    tooltipHeight,
    leftCoord,
    rightCoord,
    topCoord,
    bottomCoord
  ) {
    let arr = [
      this._top(
        topCoord,
        tooltipHeight,
        textContentHeight,
        textContentWidth,
        tooltipWidth,
        leftCoord,
        rightCoord
      ),
      this._bottom(
        bottomCoord,
        tooltipHeight,
        textContentHeight,
        textContentWidth,
        tooltipWidth,
        leftCoord,
        rightCoord
      ),
      this._right(
        rightCoord,
        textContentWidth,
        tooltipWidth,
        textContentHeight,
        tooltipHeight,
        bottomCoord,
        topCoord
      ),
      this._left(
        leftCoord,
        textContentWidth,
        tooltipWidth,
        textContentHeight,
        tooltipHeight,
        bottomCoord,
        topCoord
      ),
    ];

    return arr.find((item) => item);
  }

  _top(
    topCoord,
    tooltipHeight,
    textContentHeight,
    textContentWidth,
    tooltipWidth,
    leftCoord,
    rightCoord
  ) {
    if (topCoord > tooltipHeight + textContentHeight) {
      let aside = (textContentWidth - tooltipWidth) / 2;

      if (aside < leftCoord && aside < rightCoord) {
        return "tooltip__content_top-center";
      }

      return false;
    }

    return false;
  }

  _bottom(
    bottomCoord,
    tooltipHeight,
    textContentHeight,
    textContentWidth,
    tooltipWidth,
    leftCoord,
    rightCoord
  ) {
    if (bottomCoord > tooltipHeight + textContentHeight) {
      let aside = (textContentWidth - tooltipWidth) / 2;

      if (aside < leftCoord && aside < rightCoord) {
        return "tooltip__content_bottom-center";
      }

      return false;
    }

    return false;
  }

  _right(
    rightCoord,
    textContentWidth,
    tooltipWidth,
    textContentHeight,
    tooltipHeight,
    bottomCoord,
    topCoord
  ) {
    if (rightCoord > textContentWidth + tooltipWidth) {
      let aside = (textContentHeight - tooltipHeight) / 2;

      if (aside < bottomCoord && aside < topCoord) {
        return "tooltip__content_right-center";
      }

      return false;
    }

    return false;
  }

  _left(
    leftCoord,
    textContentWidth,
    tooltipWidth,
    textContentHeight,
    tooltipHeight,
    bottomCoord,
    topCoord
  ) {
    if (leftCoord > textContentWidth + tooltipWidth) {
      let aside = (textContentHeight - tooltipHeight) / 2;

      if (aside < bottomCoord && aside < topCoord) {
        return "tooltip__content_left-center";
      }

      return false;
    }

    return false;
  }

  getListAvailableDevices() {
    return this._listAvailableDevices.filter((item) => item !== "test");
  }

  addDevice(device, events) {
    if (typeof device !== "string") throw new Error("Invalid type passed");

    if (Object.prototype.toString.call(events) !== "[object Object]")
      throw new Error("Invalid type passed");

    if (!this._listAvailableDevices.find((item) => item === device))
      throw new Error("This value is not in the list of devices");

    if (this._listEvents[device])
      throw new Error("This device has already been added.");

    this._listEvents[device] = events;

    this._setEvents(events);
  }

  addEvents(device, events) {
    if (typeof device !== "string") throw new Error("Invalid type passed");

    if (Object.prototype.toString.call(events) !== "[object Object]")
      throw new Error("Invalid type passed");

    if (!this._listEvents[device])
      throw new Error("This device has not been added");

    Object.assign(this._listEvents[device], events);

    this._setEvents(events);
  }
}

export { Tooltip };
