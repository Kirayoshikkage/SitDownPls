class Breakpoints {
  constructor(breakpoints = null) {
    this._breakpoints =
      Object.prototype.toString.call(breakpoints) === "[object Object]"
        ? breakpoints
        : null;
  }

  _currentBreakpoint;

  init() {
    if (!this._breakpoints)
      throw new Error("The transmitted data is not correct");

    this._currentBreakpoint = this._getActualBreakpoint();

    this._iterationOnFunc(
      this._getDataFromBreakpointList(this._currentBreakpoint)
    );

    this._resize((e) => {
      let breakpoint = this._getActualBreakpoint();

      if (this._currentBreakpoint === breakpoint) return;

      this._currentBreakpoint = breakpoint;

      this._iterationOnFunc(this._getDataFromBreakpointList(breakpoint));
    });
  }

  _iterationOnFunc(functions) {
    if (!functions) return;

    if (typeof functions === "function") {
      functions();

      return;
    }

    if (!Array.isArray(functions)) return;

    for (let func of functions) {
      if (typeof func !== "function") continue;

      func();
    }
  }

  _getActualBreakpoint() {
    let width = document.body.offsetWidth;

    return Object.keys(this._breakpoints).reduce((acc, current) => {
      if (width >= current) {
        acc = current;
      }

      return acc;
    }, 0);
  }

  _getDataFromBreakpointList(breakpoint) {
    return this._breakpoints[breakpoint];
  }

  _resize(cb) {
    window.addEventListener("resize", (e) => {
      cb(e);
    });
  }
}

export { Breakpoints };
