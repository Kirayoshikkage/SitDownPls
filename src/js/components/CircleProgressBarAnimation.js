class CircleProgressBarAnimation {
  initAnimation(element, initialValue) {
    this.animation(element, initialValue);
  }

  animation(element, progress) {
    let progressbar = element.querySelector(
        ".circle-progress-bar-animation__progress"
      ),
      radius = progressbar.getAttribute("r"),
      circleLength = 2 * Math.PI * radius;

    progressbar.setAttribute("stroke-dasharray", circleLength);
    progressbar.setAttribute(
      "stroke-dashoffset",
      circleLength - (circleLength * progress) / 100
    );
  }
}

export { CircleProgressBarAnimation };
