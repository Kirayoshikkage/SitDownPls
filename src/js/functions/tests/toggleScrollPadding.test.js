/**
 * @jest-environment jsdom
 */

import { toggleScrollPadding } from "../toggleScrollPadding";

describe("Тестирование добавление отступа когда убирается скролл", () => {
  beforeEach(() => (document.body.innerHTML = ""));

  it("Элемент существует и истина", () => {
    let element = document.body;
    element.style.padding = 0;

    toggleScrollPadding(element, true);

    expect(element.style.paddingRight).not.toMatch("0px");
  });

  it("Элемент существует и ложь", () => {
    let element = document.body;
    element.style.padding = "15px";

    toggleScrollPadding(element, false);

    expect(element.style.paddingRight).not.toMatch("15px");
  });

  it("Элемент не существует", () => {
    let element = document.querySelector("div");

    let rezult = toggleScrollPadding(element, false);

    expect(rezult).toBeUndefined();
  });

  it("Элемент не DOM сущность", () => {
    let element = 11;

    let rezult = toggleScrollPadding(element, false);

    expect(rezult).toBeUndefined();
  });

  it("Значение не переданы", () => {
    let rezult = toggleScrollPadding();

    expect(rezult).toBeUndefined();
  });
});
