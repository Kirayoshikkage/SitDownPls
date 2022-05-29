/**
 * @jest-environment jsdom
 */

import { getTransitionDuration } from "../getTransitionDuration";

describe("Тестирование получения длительности анимации из css", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("Элемент существует на странице и у него есть в css длительность анимации", () => {
    let element = document.createElement("div");
    element.style.transitionDuration = "0.6s";
    document.body.append(element);

    let rezult = getTransitionDuration(document.querySelector("div"));

    expect(rezult).toBe(600);
  });

  it("Элемент существует на странице, но у него нету длительности анимации", () => {
    let element = document.createElement("div");
    document.body.append(element);

    let rezult = getTransitionDuration(document.querySelector("div"));

    expect(rezult).toBe(0);
  });

  it("Элемент не существует на странице", () => {
    let element = document.querySelector("div");

    let rezult = getTransitionDuration(element);

    expect(rezult).toBeNull();
  });

  it("Элемент не является DOM сущностью", () => {
    let element = 10;

    let rezult = getTransitionDuration(element);

    expect(rezult).toBeNull();
  });

  it("Элемент не передан", () => {
    expect(getTransitionDuration()).toBeNull();
  });
});
