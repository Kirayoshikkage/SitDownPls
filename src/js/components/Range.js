class Range {
  constructor(range = null, lineProgress = false) {
    this._range =
      typeof range === "string" ? document.querySelector(range) : null;

    this._lineProgress = Boolean(lineProgress);

    this._storages = this._range?.querySelectorAll(
      ".range__inputs [data-storage]"
    );
    this._mutators = this._range?.querySelectorAll(".range__mutator");
    this._rangeLine = this._range?.querySelector(".range__line");
    this._rangeSliderWidth =
      this._range?.querySelector(".range__slider").offsetWidth;
  }

  _listStorages = new Map();
  _mutatorFunctions = new Map([
    ["input", [this._getterInput, this._setterInput]],
    ["slider", [this._getterSlider, this._setterSlider]],
  ]);
  _mutatorInit = new Map([
    ["input", this._initInput],
    ["slider", this._initSlider],
  ]);
  _mutatorsList = new Map();
  _min = 0;
  _max = 0;

  init() {
    if (!this._range) throw new Error("Invalid type passed");

    this._storages.forEach((item, index) => {
      this._setStorage(item, index);
    });

    this._iterationOnStorages((storage) => {
      this._initStorage(storage);

      this._setInitialValue(storage);

      this._wrappingStorageInProxy(storage);

      this._initLineProgress(storage);
    });

    this._mutators.forEach((mutator) => {
      let mutatorData = mutator.dataset.mutator,
        mutatorType = mutator.dataset.type,
        mutatorStorage = mutator.dataset.storage,
        [mutationGetter, mutationSetter] = this._initFunctions(
          mutator,
          mutatorStorage,
          mutatorType
        ),
        mutatorInit = this._initMutator(mutator, mutatorData, mutatorType);

      this._mutatorsList.set(mutatorData, mutationSetter);
      this._addWatcher(mutatorStorage, mutationGetter);

      mutatorInit();
    });

    this._iterationOnStorages(([key, { watchers }]) => {
      for (let func of watchers) {
        func();
      }
    });

    this.resize(() => {
      this._rangeLine = this._range.querySelector(".range__line");

      this._iterationOnStorages(([key, { watchers }]) => {
        for (let func of watchers) {
          func();
        }
      });
    });
  }

  getData() {
    let rezult = [];

    this._iterationOnStorages(([key, { value }]) => {
      rezult.push([key, value]);
    });

    return rezult;
  }

  _initFunctions(mutator, storage, type) {
    let [getter, setter] = this._mutatorFunctions.get(type);

    return [
      getter.bind(this, mutator, storage),
      setter.bind(this, mutator, storage),
    ];
  }

  _initMutator(mutator, mutatorData, type) {
    let initFunc = this._mutatorInit.get(type);

    return initFunc.bind(this, mutator, mutatorData);
  }

  _initInput(input, mutatorData) {
    input.addEventListener("change", (e) => {
      let value = Number(input.value);

      if (isNaN(value)) {
        input.value = "";

        return;
      }

      let validate = this._validateMutator(input, value);

      if (typeof validate !== "undefined") {
        input.value = validate;

        value = input.value;
      }

      this._mutatorsList.get(mutatorData)(value);
    });
  }

  _initStorage([key, value]) {
    let [prevKey, prevValue] = this._getPrevStorage(value.index),
      [nextKey, nextValue] = this._getNextStorage(value.index);

    if (value.index == 1) {
      value.max = nextValue.value;

      this._addWatcher(nextKey, () => {
        this._listStorages.get(key).max = this._listStorages.get(nextKey).value;
      });

      return;
    }

    if (value.index == this._listStorages.size) {
      value.min = prevValue.value;

      this._addWatcher(prevKey, () => {
        this._listStorages.get(key).min = this._listStorages.get(prevKey).value;
      });

      return;
    }

    value.min = prevValue.value;
    value.max = nextValue.value;

    this._addWatcher(prevKey, () => {
      this._listStorages.get(key).min = this._listStorages.get(prevKey).value;
    });

    this._addWatcher(nextKey, () => {
      this._listStorages.get(key).max = this._listStorages.get(nextKey).value;
    });
  }

  _initSlider(slider, mutatorData) {
    slider.addEventListener("pointerdown", (e) => {
      slider.setPointerCapture(e.pointerId);

      let bindMoveSlider = this._moveSlider.bind(this, e.layerX);

      this._rangeLine.addEventListener("pointermove", bindMoveSlider);

      slider.addEventListener("pointerup", () => {
        this._rangeLine.removeEventListener("pointermove", bindMoveSlider);
      });
    });

    slider.addEventListener("keydown", this._moveSliderKeys.bind(this));
  }

  _wrappingStorageInProxy([key, value]) {
    this._listStorages.set(
      key,
      new Proxy(value, {
        set(target, prop, value, context) {
          let state = Reflect.set(target, prop, value, context);

          if (prop === "value") {
            for (let func of target.watchers) {
              func();
            }
          }

          return state;
        },
      })
    );
  }

  _setStorage(input, index) {
    let nameStorage = input.dataset.storage,
      min = Number(input.min ?? 0),
      max = Number(input.max ?? 0),
      initialValue = Number(input.value ?? 0);

    if (min) {
      this._min = min;
    }

    if (max) {
      this._max = max;
    }

    this._listStorages.set(nameStorage, {
      value: initialValue,
      min,
      max,
      index: index + 1,
      watchers: [],
    });
  }

  _setInitialValue([key, { index, min, value, max }]) {
    if (value) return;

    let initialValue;

    if (index === 1) {
      initialValue = min;
    } else if (index == this._listStorages.size) {
      initialValue = max;
    } else {
      initialValue = (index * 10 * this._max) / 100;
    }

    this._listStorages.get(key).value = initialValue;
  }

  _moveSlider(startCoord, e) {
    let slider = e.target,
      sliderData = slider.dataset.mutator,
      coord =
        e.pageX -
        (this._rangeLine.offsetLeft
          ? this._rangeLine.offsetLeft
          : this._range.offsetParent.offsetLeft) -
        startCoord,
      convertCoord = this._convertFromCoord(coord),
      validate = this._validateMutator(slider, convertCoord);

    if (typeof validate !== "undefined") {
      coord = this._сonvertToCoord(validate);
    }

    slider.style.left = `${coord}px`;

    this._mutatorsList.get(sliderData)(coord);
  }

  _moveSliderKeys(e) {
    if (e.code !== "ArrowRight" && e.code !== "ArrowLeft") return;

    let slider = e.target,
      sliderData = slider.dataset.mutator,
      sliderPos = slider.style.left,
      coord;

    if (e.code === "ArrowRight") {
      coord = parseFloat(sliderPos) + 1;
    }

    if (e.code === "ArrowLeft") {
      coord = parseFloat(sliderPos) - 1;
    }

    let validate = this._validateMutator(slider, this._convertFromCoord(coord));

    if (typeof validate !== "undefined") {
      coord = this._сonvertToCoord(validate);
    }

    slider.style.left = `${coord}px`;

    this._mutatorsList.get(sliderData)(coord);
  }

  _validateMutator(input, value) {
    let storage = input.dataset.storage,
      min = this._minValidate(storage, value),
      max = this._maxValidate(storage, value);

    if (!min.validate) {
      return min.value;
    }

    if (!max.validate) {
      return max.value;
    }

    return;
  }

  _getterInput(input, storage) {
    input.value = this._listStorages.get(storage).value;
  }

  _setterInput(input, storage, value) {
    this._listStorages.get(storage).value = value;
  }

  _getterSlider(slider, storage) {
    let value = this._getValueFromStorage(storage, "value");

    slider.style.left = `${this._сonvertToCoord(value)}px`;
  }

  _setterSlider(slider, storage, value) {
    this._setValueInStorage(storage, "value", this._convertFromCoord(value));
  }

  _initLineProgress([key, { index }]) {
    if (index === this._listStorages.size) return;

    let line = this._createLineProgress(key),
      [nextKey] = this._getNextStorage(index);

    this._addWatcher(key, () => {
      let { value, max } = this._listStorages.get(key);

      line.style.left = `${this._сonvertToCoord(value)}px`;
      line.style.width = `${this._сonvertToCoord(max - value)}px`;
    });

    this._addWatcher(nextKey, () => {
      let { min, value } = this._listStorages.get(nextKey);

      line.style.width = `${this._сonvertToCoord(value - min)}px`;
    });

    this._rangeLine.append(line);
  }

  _createLineProgress(storage) {
    let element = document.createElement("div");

    element.classList.add(
      `range__line-progress`,
      `range__line-progress_${storage}`
    );

    return element;
  }

  _minValidate(storage, value) {
    let min = this._getValueFromStorage(storage, "min");

    return value < min
      ? {
          validate: false,
          value: min,
        }
      : {
          validate: true,
        };
  }

  _maxValidate(storage, value) {
    let max = this._getValueFromStorage(storage, "max");

    return value > max
      ? {
          validate: false,
          value: max,
        }
      : {
          validate: true,
        };
  }

  _сonvertToCoord(value) {
    let percent = ((value - this._min) / (this._max - this._min)) * 100;

    return (
      ((this._rangeLine.offsetWidth - this._rangeSliderWidth) * percent) / 100
    );
  }

  _convertFromCoord(value) {
    let percent =
      (value / (this._rangeLine.offsetWidth - this._rangeSliderWidth)) * 100;

    return Math.round(((this._max - this._min) * percent) / 100 + this._min);
  }

  _addWatcher(key, func) {
    this._listStorages.get(key).watchers.push(func);
  }

  _iterationOnStorages(cb) {
    for (let storage of this._listStorages) {
      cb(storage);
    }
  }

  _getNextStorage(index) {
    let rezult;

    this._iterationOnStorages(([key, value]) => {
      if (value.index === index + 1) {
        rezult = [key, value];
      }
    });

    return rezult ?? [];
  }

  _getPrevStorage(index) {
    let rezult;

    this._iterationOnStorages(([key, value]) => {
      if (value.index === index - 1) {
        rezult = [key, value];
      }
    });

    return rezult ?? [];
  }

  _getValueFromStorage(key, prop) {
    return this._listStorages.get(key)[prop];
  }

  _setValueInStorage(key, prop, value) {
    this._listStorages.get(key)[prop] = value;
  }

  resize(cb) {
    window.addEventListener("resize", () => {
      cb();
    });
  }
}

export { Range };
