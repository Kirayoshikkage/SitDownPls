/**
 * @jest-environment jsdom
 */

import { BurgerMenu } from "../Burger-menu";

describe("Проверка конструктора", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let menu = `
      <div class="burger-menu fade-animation">
        <div class="burger-menu__body">
          <div class="burger-menu__content">
              Lorem
          </div>
        </div>
      </div>;
    `;

    let trigger = '<button class="burger-trigger">Click</button>';

    document.body.insertAdjacentHTML("beforeend", menu);
    document.body.insertAdjacentHTML("beforeend", trigger);
  });

  it("Переданы данные в неверном формате", () => {
    let sut = new BurgerMenu({
      selector: {},
      trigger: 1,
      selectorActive: [],
      triggerActive: {},
    });

    expect(() => sut.init()).toThrow();
  });

  it("Данные не переданы", () => {
    let sut = new BurgerMenu();

    expect(() => sut.init()).toThrow();
  });

  it("Переданыe данные корректны", () => {
    let sut = new BurgerMenu({
      selector: ".burger-menu",
      trigger: ".burger-trigger",
    });

    expect(() => sut.init()).not.toThrow();
  });
});

describe("Проверка состояния бургер меню", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let menu = `
      <div class="burger-menu fade-animation">
        <div class="burger-menu__body">
          <div class="burger-menu__content">
              Lorem
          </div>
        </div>
      </div>;
    `;

    let trigger = '<button class="burger-trigger">Click</button>';

    document.body.insertAdjacentHTML("beforeend", menu);
    document.body.insertAdjacentHTML("beforeend", trigger);
  });

  it("Проверка состояния при открытом меню", () => {
    let sut = new BurgerMenu({
      selector: ".burger-menu",
      trigger: ".burger-trigger",
      selectorActive: "burger-menu_active",
      triggerActive: "burger-trigger_active",
    });
    sut.init();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeTruthy();
  });

  it("Проверка состояния при закрытом меню", () => {
    let sut = new BurgerMenu({
      selector: ".burger-menu",
      trigger: ".burger-trigger",
      selectorActive: "burger-menu_active",
      triggerActive: "burger-trigger_active",
    });
    sut.init();
    sut.toggleState();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeFalsy();
  });
});
