import { AnimationHeight } from "./components/AnimationHeight";
import { FadeAnimation } from "./components/FadeAnimation";
import { BlockFocus } from "./components/blockFocus";
import { ModalNoTrigger } from "./components/Modal";
import { ValidationForm } from "./components/ValidationForm";

let page = document.body.dataset.page;

/**
 *
 * All page
 *
 */

import { setAriaText } from "./functions/setAriaText";
import { setEventKeydown } from "./functions/setEventKeydown";
import { Tooltip } from "./components/Tooltip";

document.querySelectorAll(".text-aria").forEach((item) => setAriaText(item));

setEventKeydown(".custom-checkbox", "Enter", (item) => {
  let element = item.querySelector("input");
  element.checked = !element.checked;
});

const tooltips = new Tooltip({
  selectors: ".tooltip",
});

tooltips.init();

/**
 *
 * Header
 *
 */

import { SelectWithSingleChoice } from "./components/Select";
import { BurgerMenu } from "./components/Burger-menu";

let selectRegion = new SelectWithSingleChoice({
  selector: ".select-region",
  initialValue: "moscow",
  apiAnimation: new AnimationHeight(),
  output: 5,
});

selectRegion.init();

let selectCategory = new SelectWithSingleChoice({
  selector: ".select-category",
  initialValue: "Категория",
  apiAnimation: new AnimationHeight(),
  breakpoints: {
    1024: {
      output: 10,
    },
    0: {
      output: 5,
    },
  },
});

selectCategory.init();

const burgerMenu = new BurgerMenu({
  selector: ".burger-menu",
  trigger: ".burger-trigger",
  selectorActive: "burger-menu_active",
  triggerActive: "burger-trigger_active",
  apiAnimation: new FadeAnimation({
    display: "block",
    duration: 400,
  }),
  apiBlockFocus: new BlockFocus({
    exceptionContainer: ".burger-menu",
    single: [document.querySelector(".burger-trigger")],
  }),
});

burgerMenu.init();

/**
 *
 * Main page
 *
 */

import {
  heroSlider,
  specialOffersSlider,
  usefulSlider,
} from "./functions/settingsSliders";
import { ShowElements } from "./components/ShowElements";

/*import { ValidationForm } from "./components/ValidationForm"; */
/* import { ModalNoTrigger } from "./components/Modal"; */

if (page === "main") {
  heroSlider();

  specialOffersSlider();

  usefulSlider();

  const modalFeedback = new ModalNoTrigger({
    selector: ".feedback__modal",
    selectorActive: "modal_active",
    closeBtn: ".feedback__modal .modal__close",
    apiAnimation: new FadeAnimation({
      display: "flex",
      duration: 400,
    }),
    apiBlockFocus: new BlockFocus({
      exceptionContainer: ".feedback__modal",
    }),
  });

  modalFeedback.init();

  const validateFeedback = new ValidationForm(".feedback__user-form");

  validateFeedback.init();

  validateFeedback.addRules(".feedback__user-form .user-form__input_text", [
    {
      rule: "text",
      errorMessage: "Поле может содержать только буквы!",
    },
    {
      rule: "maxLength",
      value: 21,
      errorMessage: "Максимальное значениe - 21 символ!",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимальное значениe - 2 символа!",
    },
    {
      rule: "requered",
      errorMessage: "Необходимо заполнить это поле!",
    },
  ]);

  validateFeedback.addRules(".feedback__user-form .user-form__input_phone", [
    {
      rule: "phone",
      errorMessage: "Введите корректный номер телефона!",
    },
    {
      rule: "requered",
      errorMessage: "Необходимо заполнить это поле!",
    },
  ]);

  validateFeedback.addRules(".feedback__user-form .user-form__input_email", [
    {
      rule: "email",
      errorMessage: "Введите корректный e-mail!",
    },
    {
      rule: "maxLength",
      value: 40,
      errorMessage: "Максимальное значениe - 40 символов!",
    },
    {
      rule: "minLength",
      value: 12,
      errorMessage: "Минимальное значениe - 12 символов!",
    },
    {
      rule: "requered",
      errorMessage: "Необходимо заполнить это поле!",
    },
  ]);

  validateFeedback.addRules(".feedback__user-form .custom-checkbox__field", [
    {
      rule: "checkbox",
      errorMessage: "Необходимо принять пользовательское соглашение!",
    },
  ]);

  validateFeedback.submit((e) => {
    modalFeedback.toggleState();

    let closeModal = new Promise((resolve) => {
      setTimeout(() => resolve(), 3000);
    }).then(() => {
      if (modalFeedback.isOpen()) modalFeedback.toggleState();
    });

    e.target.reset();
  });

  const ratingShowElements = new ShowElements({
    hiddenElements: ".rating__item",
    trigger: ".rating__button",
    breakpoints: {
      0: {
        output: 6,
      },
      1440: {
        output: 8,
      },
    },
  });

  ratingShowElements.init();
}

/**
 *
 * D31 page
 *
 */

/*import { ValidationForm } from "./components/ValidationForm"; */
/* import { ModalNoTrigger } from "./components/Modal"; */

import {
  similarProductsSlide,
  productDescriptionSlider,
  productDescriptionModalSlider,
} from "./functions/settingsSliders";

import { ModalWithTrigger } from "./components/Modal";

if (page === "d31") {
  productDescriptionSlider();

  similarProductsSlide();

  let orderingModal = new ModalWithTrigger({
    selector: ".product-description__modal-ordering",
    openBtn: ".product-description__button",
    closeBtn: ".product-description__modal-ordering .modal__close",
    selectorActive: "modal_active",
    apiAnimation: new FadeAnimation({
      display: "flex",
      duration: 400,
    }),
    apiBlockFocus: new BlockFocus({
      exceptionContainer: ".product-description__modal-ordering",
    }),
  });

  orderingModal.init();

  const modalCallback = new ModalNoTrigger({
    selector: ".product-description__modal-callback",
    selectorActive: "modal_active",
    closeBtn: ".product-description__modal-callback .modal__close",
    apiAnimation: new FadeAnimation({
      display: "flex",
      duration: 400,
    }),
    apiBlockFocus: new BlockFocus({
      exceptionContainer: ".product-description__modal-callback",
    }),
  });

  modalCallback.init();

  const validateOrdering = new ValidationForm(
    ".product-description__user-form"
  );

  validateOrdering.init();

  validateOrdering.addRules(
    ".product-description__user-form .user-form__input_text",
    [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "maxLength",
        value: 21,
        errorMessage: "Максимальное значениe - 21 символ!",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Минимальное значениe - 2 символа!",
      },
      {
        rule: "requered",
        errorMessage: "Необходимо заполнить это поле!",
      },
    ]
  );

  validateOrdering.addRules(
    ".product-description__user-form .user-form__input_phone",
    [
      {
        rule: "phone",
        errorMessage: "Введите корректный номер телефона!",
      },
      {
        rule: "requered",
        errorMessage: "Необходимо заполнить это поле!",
      },
    ]
  );

  validateOrdering.addRules(
    ".product-description__user-form .custom-checkbox__field",
    [
      {
        rule: "checkbox",
        errorMessage: "Необходимо принять пользовательское соглашение!",
      },
    ]
  );

  validateOrdering.submit((e) => {
    orderingModal.toggleState();

    modalCallback.toggleState();

    let closeModal = new Promise((resolve) => {
      setTimeout(() => resolve(), 3000);
    }).then(() => {
      if (modalCallback.isOpen()) modalCallback.toggleState();
    });

    e.target.reset();
  });

  let modalSlider = new ModalWithTrigger({
    selector: ".product-description__modal-slider",
    openBtn: ".product-description__slider",
    closeBtn: ".product-description__modal-slider .modal__close",
    selectorActive: "modal_active",
    apiAnimation: new FadeAnimation({
      display: "flex",
      duration: 400,
    }),
    apiBlockFocus: new BlockFocus({
      exceptionContainer: ".product-description__modal-slider",
    }),
  });

  modalSlider.init();

  modalSlider.eventFirstDiscovery(() => {
    productDescriptionModalSlider();
  });
}

/**
 *
 * Catalog page
 *
 */

import { catalogSlider } from "./functions/settingsSliders";
import { Filters } from "./components/Filters";
import { Select } from "./components/Select";
import { Breakpoints } from "./components/Breakpoints";
import { Range } from "./components/Range";

if (page === "catalog") {
  catalogSlider();

  let selectFilterColor = new Select({
    selector: ".select-filter-color",
    apiAnimation: new AnimationHeight(),
    output: 5,
  });

  let selectFilterPrice = new Select({
    selector: ".select-filter-price",
    apiAnimation: new AnimationHeight(),
  });

  let selectFilterCategory = new Select({
    selector: ".select-filter-category",
    apiAnimation: new AnimationHeight(),
    output: 5,
  });

  let selectFilterdiscountDiscount = new Select({
    selector: ".select-filter-discount",
    apiAnimation: new AnimationHeight(),
    output: 5,
  });

  let rangePrice = new Range(".range_price"),
    rangePriceGetData = rangePrice.getData.bind(rangePrice);

  rangePrice.init();

  let catalogFilters = new Filters({
    color: {
      selector: "[data-page='catalog'] .filters__filter_color",
    },
    price: {
      selector: "[data-page='catalog'] .range_price",
      getter: rangePriceGetData,
    },
    category: {
      selector: "[data-page='catalog'] .filters__filter_category",
    },
    discount: {
      selector: "[data-page='catalog'] .filters__filter_discount",
    },
  });

  catalogFilters.init();

  let filtersBreakpoint = new Breakpoints({
    1440: [
      () => selectFilterColor.destroy(),
      () => selectFilterPrice.destroy(),
      () => selectFilterCategory.destroy(),
      () => selectFilterdiscountDiscount.destroy(),
    ],
    0: [
      () => selectFilterColor.init(),
      () => selectFilterPrice.init(),
      () => selectFilterCategory.init(),
      () => selectFilterdiscountDiscount.init(),
    ],
  });

  filtersBreakpoint.init();
}
