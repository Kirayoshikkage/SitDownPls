class Filters {
  constructor(filters = null) {
    this._filters =
      Object.prototype.toString.call(filters) === "[object Object]"
        ? filters
        : null;
  }

  _listFilters = new Map();

  init() {
    if (!this._filters) throw new Error("The transmitted data is not correct");

    this._setListFilters(this._filters);
  }

  _setListFilters(data) {
    for (let filter in data) {
      this._listFilters.set(filter, data[filter]);
    }
  }

  getFilterData() {
    let rezult = {};

    for (let filter of this._listFilters) {
      let [key] = filter;

      let selectedValue = this._getSelectedValue(filter);

      if (!selectedValue) continue;

      rezult[key] = selectedValue;
    }

    return rezult;
  }

  _getSelectedValue([key, obj]) {
    if (obj["getter"]) {
      if (typeof obj["getter"] !== "function") return;

      return obj.getter();
    }

    let { selector } = obj,
      selectedValue = [],
      element =
        typeof selector === "string" ? document.querySelector(selector) : "";

    if (!element) return;

    let formData = new FormData(element);

    for (let [key, data] of formData) {
      selectedValue.push([key, data]);
    }

    return selectedValue;
  }
}

export { Filters };
