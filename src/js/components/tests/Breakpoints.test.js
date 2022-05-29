/**
 * @jest-environment jsdom
 */

import { Breakpoints } from "../Breakpoints";

function changeColor(element, color) {
  element.style.color = color;
}

describe("Тестирование вызова функций на определенных размерах экрана", () => {
  beforeEach(() => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return 1920;
        },
      },
    });

    document.body.innerHTML = "";

    let element = document.createElement("div");

    document.body.append(element);
  });

  it("Переданные данные не валидны", () => {
    let sut = new Breakpoints(1232, "fdfd");

    expect(() => sut.init()).toThrow();
  });

  it("Переданные данные не валидны, в значении брейкпоинта передан не массив и не функция", () => {
    let sut = new Breakpoints({
      320: 12343,
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Переданные данные валидны, в значении брейкпоинта передана функция", () => {
    let element = document.querySelector("div"),
      sut = new Breakpoints({
        320: () => changeColor(element, "red"),
      });

    sut.init();

    expect(element.style.color).toMatch("red");
  });

  it("Переданные данные валидны, происходит изменение цвета текста элемента при размере экрана больше 320", () => {
    let element = document.querySelector("div"),
      sut = new Breakpoints({
        320: [() => changeColor(element, "red")],
      });

    sut.init();

    expect(element.style.color).toMatch("red");
  });

  it("Переданные данные валидны, происходит изменение цвета текста при уменьшении размера экрана", () => {
    let element = document.querySelector("div"),
      sut = new Breakpoints({
        320: () => changeColor(element, "red"),
        1440: () => changeColor(element, "green"),
      }),
      resize = new Event("resize");
    sut.init();

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return 768;
        },
      },
    });
    window.dispatchEvent(resize);

    expect(element.style.color).toMatch("red");
  });

  it("Переданные данные валидны, происходит изменение цвета текста при увеличении размера экрана", () => {
    let element = document.querySelector("div"),
      sut = new Breakpoints({
        1920: () => changeColor(element, "green"),
        2000: () => changeColor(element, "red"),
      }),
      resize = new Event("resize");
    sut.init();

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return 2000;
        },
      },
    });
    window.dispatchEvent(resize);

    expect(element.style.color).toMatch("red");
  });

  it("Переданные данные валидны, но на данный размер экрана отсутсвуют брейкпоинты", () => {
    let element = document.querySelector("div"),
      sut = new Breakpoints({
        2000: [() => changeColor(element, "red")],
      });

    sut.init();

    expect(element.style.color).not.toMatch("red");
  });
});
