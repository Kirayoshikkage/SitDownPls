/**
 * @jest-environment jsdom
 */

import { setAriaText } from "../setAriaText";

describe("Тестирование добавления текста для скринридеров", () => {
  beforeEach(() => (document.body.innerHTML = ""));

  it("Элемент существует и у него есть тег aria-label", () => {
    let element = document.createElement("div");
    document.body.append(element);
    element.setAttribute("aria-label", "Hello");
    element.textContent = "Loh";

    setAriaText(document.querySelector("div"));

    expect(element.getAttribute("aria-label")).toMatch("Hello Loh");
  });

  it("Элемент существует, но у него нету тега aria-label", () => {
    let element = document.createElement("div");
    document.body.append(element);
    element.textContent = "Loh";

    setAriaText(document.querySelector("div"));

    expect(element.getAttribute("aria-label")).toMatch("Loh");
  });

  it("Элемент не существует на странице", () => {
    let element = document.querySelector("div");

    let rezult = setAriaText(element);

    expect(rezult).toBeUndefined();
  });

  it("Элемент не является DOM сущностью", () => {
    let element = 11;

    let rezult = setAriaText(element);

    expect(rezult).toBeUndefined();
  });

  it("Элемент не передан", () => {
    let rezult = setAriaText();

    expect(rezult).toBeUndefined();
  });
});
