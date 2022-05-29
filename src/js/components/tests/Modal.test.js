/**
 * @jest-environment jsdom
 */

import { ModalWithTrigger } from "../Modal";

describe("Проверка конструктора", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let modal = `
      <div class="modal">
        <div class="modal__body">
          <div class="container">
            <div class="modal__content">
              Lorem
              <button class="btn-reset modal__close">
                <svg class="modal__icon">
                  <use xlink:href="img/sprite.svg#modal_close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    let trigger = '<button class="modal-trigger">Click</button>';

    document.body.insertAdjacentHTML("beforeend", modal);
    document.body.insertAdjacentHTML("beforeend", trigger);
  });

  it("Переданные данные не валидны", () => {
    let sut = new ModalWithTrigger({
      selector: [],
      openBtn: {},
      closeBtn: 12,
      selectorActive: 343,
      apiAnimation: [],
      apiBlockFocus: {},
    });

    expect(() => sut.init()).toThrow();
  });

  it("Данные не переданы", () => {
    let sut = new ModalWithTrigger();

    expect(() => sut.init()).toThrow();
  });

  it("Переданные данные корректны", () => {
    let sut = new ModalWithTrigger({
      selector: ".modal",
      openBtn: ".modal-trigger",
      closeBtn: ".modal__close",
    });

    expect(() => sut.init()).not.toThrow();
  });
});

describe("Проверка состояния модального окна", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let modal = `
      <div class="modal">
        <div class="modal__body">
          <div class="container">
            <div class="modal__content">
              Lorem
              <button class="btn-reset modal__close">
                <svg class="modal__icon">
                  <use xlink:href="img/sprite.svg#modal_close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    let trigger = '<button class="modal-trigger">Click</button>';

    document.body.insertAdjacentHTML("beforeend", modal);
    document.body.insertAdjacentHTML("beforeend", trigger);
  });

  it("Проверка состояния при открытом модальном окне", () => {
    let sut = new ModalWithTrigger({
      selector: ".modal",
      openBtn: ".modal-trigger",
      closeBtn: ".modal__close",
      selectorActive: "modal_active",
    });
    sut.init();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeTruthy();
  });

  it("Проверка состояния при закрытом модальном окне", () => {
    let sut = new ModalWithTrigger({
      selector: ".modal",
      openBtn: ".modal-trigger",
      closeBtn: ".modal__close",
      selectorActive: "modal_active",
    });
    sut.init();
    sut.toggleState();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeFalsy();
  });
});
