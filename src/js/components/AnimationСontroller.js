class AnimationСontroller {
  constructor({
    selector = null,
    duration = 3000,
    apiAnimation = null,
    loop = false,
  } = {}) {
    this._elements =
      typeof selector === "string" ? document.querySelectorAll(selector) : null;

    this._duration = typeof duration === "number" ? duration : 3000;

    this._apiAnimation =
      Object.prototype.toString.call(apiAnimation) === "[object Object]"
        ? apiAnimation
        : null;

    this._loop = Boolean(loop);
  }

  _listAnimationElements = [];
  _currentElement = 0;
  _stop;
  _end = false;

  _afterEach = new Set();

  init() {
    if (!this._elements) throw new Error("Invalid type passed");

    this._elements.forEach((element) => {
      this._listAnimationElements.push({
        domElement: element,
        status: "wait",
        progress: 0,
        duration: this._duration / 100,
      });

      this._initAnimation(element, 0);
    });
  }

  _initAnimation(element, initialValue) {
    if (!this._apiAnimation) return;

    this._apiAnimation.initAnimation(element, initialValue);
  }

  _animation(element, progress) {
    if (!this._apiAnimation) return;

    this._apiAnimation.animation(element, progress);
  }

  start() {
    this._stop = false;

    let animationElement = this._listAnimationElements[this._currentElement];

    if (animationElement.status === "in-progress") return;

    animationElement.status = "in-progress";

    this._progress(animationElement, animationElement.duration)
      .then(() => {
        this._iterationOnHook(this._afterEach);

        animationElement.status = "done";

        this._currentElement++;

        if (
          this._loop &&
          this._currentElement === this._listAnimationElements.length
        ) {
          this._currentElement = 0;

          this.rollbackAll();
        }

        if (this._currentElement === this._listAnimationElements.length) {
          this._end = true;

          return;
        }

        this.start();
      })
      .catch(() => {
        animationElement.status = "stop";
      });
  }

  _progress(element, duration) {
    return new Promise((resolve, reject) => {
      if (element.progress === 100) return resolve();

      if (this._stop) return reject();

      element.progress += 1;

      this._animation(element.domElement, element.progress);

      setTimeout(() => {
        this._progress(element, duration).then(resolve).catch(reject);
      }, duration);
    });
  }

  _regression(element) {
    return new Promise((resolve, reject) => {
      if (element.progress === 0) return resolve();

      if (!this._stop) return reject();

      element.progress -= 1;

      this._animation(element.domElement, element.progress);

      setTimeout(() => {
        this._regression(element).then(resolve).catch(reject);
      }, 10);
    });
  }

  stop() {
    this._stop = true;
  }

  rollbackCurrent() {
    let element = this._listAnimationElements[this._currentElement];

    this._regression(element)
      .then(() => {
        element.status = "wait";
      })
      .catch(() => {
        element.status = "in-progress";
      });
  }

  rollbackAll() {
    for (let element of this._listAnimationElements) {
      element.status = "wait";

      element.progress = 0;

      this._initAnimation(element.domElement, element.progress);
    }
  }

  isEnd() {
    return this._end;
  }

  isStop() {
    return this._stop;
  }

  _iterationOnHook(hook) {
    for (let func of hook) {
      func();
    }
  }

  afterEach(cb) {
    this._afterEach.add(cb);
  }
}

export { AnimationСontroller };
