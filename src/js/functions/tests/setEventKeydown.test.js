/**
 * @jest-environment jsdom
 */

import { setEventKeydown } from "../setEventKeydown";

describe("Тестирование установки обработчика события нажатия клавиши", () => {
  beforeEach(() => (document.body.innerHTML = ""));

  it("Элемент существует и при нажатии на клавишу enter ему добавляется зеленый фон", () => {
    let element = document.createElement("button"),
      event = new KeyboardEvent("keydown", {
        key: "Enter",
      });
    document.body.append(element);

    setEventKeydown("button", "Enter", () => {
      element.style.backgroundColor = "green";
    });
    element.dispatchEvent(event);

    expect(element.style.backgroundColor).toMatch("green");
  });

  it("Элемент существует и при нажатии на любую другую кнопку кроме enter ему не добавится зеленый фон", () => {
    let element = document.createElement("button"),
      event = new KeyboardEvent("keydown", {
        key: "Esc",
      });
    document.body.append(element);

    setEventKeydown("button", "Enter", () => {
      element.style.backgroundColor = "green";
    });
    element.dispatchEvent(event);

    expect(element.style.backgroundColor).toMatch("");
  });

  it("Элемент не существует", () => {
    let rezult = setEventKeydown("loh123", "Enter", () => {
      element.style.backgroundColor = "green";
    });

    expect(rezult).toBeNull();
  });

  it("Переданы не все значения", () => {
    let rezult = setEventKeydown("loh123", "Enter");

    expect(rezult).toBeNull();
  });
});
