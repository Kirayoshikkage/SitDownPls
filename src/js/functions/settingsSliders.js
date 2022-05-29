import Swiper, {
  Navigation,
  Pagination,
  Grid,
  Thumbs,
  Keyboard,
  A11y,
} from "swiper";

import { AnimationСontroller } from "../components/AnimationСontroller";
import { CircleProgressBarAnimation } from "../components/CircleProgressBarAnimation";

function heroSlider() {
  let heroPaginationAnimation = new AnimationСontroller({
      selector: ".circle-progress-bar-animation__element",
      duration: 5000,
      loop: true,
      apiAnimation: new CircleProgressBarAnimation(),
    }),
    slider = document.querySelector(".hero__slider");

  const swiper = new Swiper(slider, {
    modules: [A11y],
    loop: true,
    allowTouchMove: false,
  });
  blockFocusChildren();

  heroPaginationAnimation.init();

  heroPaginationAnimation.afterEach(swiper.slideNext.bind(swiper));

  heroPaginationAnimation.start();

  swiper.on("slideChange", () => {
    blockFocusChildren();
  });

  slider.addEventListener("pointerenter", () => {
    heroPaginationAnimation.stop();
    heroPaginationAnimation.rollbackCurrent();
  });

  slider.addEventListener("pointerleave", () => {
    heroPaginationAnimation.start();
  });

  function blockFocusChildren() {
    let elementNotBlockFocus = swiper.activeIndex;

    swiper.slides.forEach((item, index) => {
      if (index !== elementNotBlockFocus) {
        item.querySelectorAll("*").forEach((child) => {
          if (child.tabIndex === 0) {
            child.setAttribute("tabIndex", -1);
          }
        });
      } else {
        item.querySelectorAll("*").forEach((child) => {
          if (child.getAttribute("tabIndex") === "-1") {
            child.setAttribute("tabIndex", 0);
          }
        });
      }
    });
  }
}

function specialOffersSlider() {
  let slider = document.querySelector(".special-offers__slider"),
    specialOffers = document.querySelector(".special-offers"),
    btns = specialOffers.querySelector(".special-offers__slide-buttons"),
    firstItem = specialOffers.querySelector(".special-offers__item_first");

  var swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    spaceBetween: 32,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: `.special-offers .swiper-button-next`,
      prevEl: `.special-offers .swiper-button-prev`,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      675: { slidesPerView: 2 },
      1024: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: "auto",
      },
    },
  });
  checkWidth();

  window.addEventListener("resize", () => {
    checkWidth();
  });

  function checkWidth() {
    let width = document.body.offsetWidth;

    if (
      width < 768 &&
      !slider.querySelector(".special-offers__slide-buttons")
    ) {
      toggleBtns(firstItem, slider);

      return;
    }

    if (
      width >= 768 &&
      !firstItem.querySelector(".special-offers__slide-buttons")
    ) {
      toggleBtns(slider, firstItem);

      return;
    }
  }

  function toggleBtns(from, to) {
    from.querySelector(".special-offers__slide-buttons").remove();
    to.appendChild(btns);
  }
}

function usefulSlider() {
  let slider = document.querySelector(".useful__slider"),
    specialOffers = document.querySelector(".useful"),
    btns = specialOffers.querySelector(".useful__slide-buttons"),
    firstItem = specialOffers.querySelector(".useful__item_first");

  var swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    spaceBetween: 32,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: `.useful .swiper-button-next`,
      prevEl: `.useful .swiper-button-prev`,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      675: { slidesPerView: 2 },
      1024: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 2,
      },
    },
  });

  checkWidth();

  window.addEventListener("resize", () => {
    checkWidth();
  });

  function checkWidth() {
    let width = document.body.offsetWidth;

    if (width < 768 && !slider.querySelector(".useful__slide-buttons")) {
      toggleBtns(firstItem, slider);

      return;
    }

    if (width >= 768 && !firstItem.querySelector(".useful__slide-buttons")) {
      toggleBtns(slider, firstItem);

      return;
    }
  }

  function toggleBtns(from, to) {
    from.querySelector(".useful__slide-buttons").remove();
    to.appendChild(btns);
  }
}

function similarProductsSlide() {
  let slider = document.querySelector(".similar-products__slider"),
    specialOffers = document.querySelector(".similar-products"),
    btns = specialOffers.querySelector(".similar-products__slide-buttons"),
    firstItem = specialOffers.querySelector(".similar-products__item_first");

  var swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    spaceBetween: 32,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: `.similar-products .swiper-button-next`,
      prevEl: `.similar-products .swiper-button-prev`,
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 32 },
      1024: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  });

  checkWidth();

  window.addEventListener("resize", () => {
    checkWidth();
  });

  function checkWidth() {
    let width = document.body.offsetWidth;

    if (
      width < 768 &&
      !slider.querySelector(".similar-products__slide-buttons")
    ) {
      toggleBtns(firstItem, slider);

      return;
    }

    if (
      width >= 768 &&
      !firstItem.querySelector(".similar-products__slide-buttons")
    ) {
      toggleBtns(slider, firstItem);

      return;
    }
  }

  function toggleBtns(from, to) {
    from.querySelector(".similar-products__slide-buttons").remove();
    to.appendChild(btns);
  }
}

function productDescriptionSlider() {
  let thumbs = document.querySelector(".product-description__thumb-slider"),
    slides = document.querySelector(".product-description__slider");

  var thumbsSlider = new Swiper(thumbs, {
    modules: [Thumbs, Keyboard, A11y],
    spaceBetween: 38,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    direction: "horizontal",
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      320: { direction: "horizontal", slidesPerView: "auto" },
      768: {
        direction: "vertical",
        spaceBetween: 18,
        slidesPerView: 4,
      },
      1024: {
        direction: "horizontal",
        spaceBetween: 38,
        slidesPerView: "auto",
      },
    },
  });
  var simpleSlider = new Swiper(slides, {
    modules: [Thumbs, Keyboard, A11y],
    spaceBetween: 10,
    thumbs: {
      swiper: thumbsSlider,
    },
  });

  productDescriptionHideActiveElement(thumbsSlider, simpleSlider, thumbs);

  productDescriptionAddKeydownEvent(thumbsSlider, simpleSlider);
}

function productDescriptionModalSlider() {
  let thumbs = document.querySelector(
      ".product-description__modal-slider .modal-slider__thumbs"
    ),
    slider = document.querySelector(
      ".product-description__modal-slider .modal-slider__slider"
    );

  var thumbsSlider = new Swiper(thumbs, {
    modules: [Thumbs, Keyboard, Navigation, A11y],
    spaceBetween: 78,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".product-description__modal-slider .swiper-button-next",
      prevEl: ".product-description__modal-slider .swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: "auto", spaceBetween: 78 },
    },
  });
  var simpleSlider = new Swiper(slider, {
    modules: [Thumbs],
    thumbs: {
      swiper: thumbsSlider,
    },
  });

  productDescriptionAddKeydownEvent(thumbsSlider, simpleSlider);

  productDescriptionHideActiveElement(thumbsSlider, simpleSlider, thumbs);
}

function catalogSlider() {
  var swiper = new Swiper(".catalog__slider", {
    modules: [Grid, Keyboard, Pagination, A11y],
    slidesPerView: 3,
    slidesPerGroup: 3,
    grid: {
      rows: 3,
    },
    spaceBetween: 32,
    pagination: {
      el: ".catalog__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 3,
        },
        spaceBetween: 16,
      },
      768: {
        spaceBetween: 32,
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 3,
        },
      },
      1024: {
        spaceBetween: 32,
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 3,
        },
      },
    },
  });
}

export {
  heroSlider,
  specialOffersSlider,
  usefulSlider,
  similarProductsSlide,
  productDescriptionSlider,
  productDescriptionModalSlider,
  catalogSlider,
};

function productDescriptionAddKeydownEvent(thumbsSlider, slider) {
  thumbsSlider.slides.forEach((slide, index) => {
    slide.addEventListener("keydown", (e) => {
      if (e.code !== "Enter" && e.code !== "Space") return;
      slider.slideTo(index);

      thumbsSlider.slides[index + 1]?.focus();
    });
  });
}

function productDescriptionHideActiveElement(
  thumbsSlider,
  simpleSlider,
  thumbs
) {
  let activeThumbs = thumbs.querySelector(".swiper-slide-thumb-active");

  if (activeThumbs) activeThumbs.style.display = "none";

  simpleSlider.on("slideChange", function () {
    toggleVisibleActiveThumbs();

    thumbsSlider.updateSlides();
  });

  function toggleVisibleActiveThumbs() {
    activeThumbs.style.display = "block";

    activeThumbs = thumbs.querySelector(".swiper-slide-thumb-active");

    activeThumbs.style.display = "none";
  }
}
