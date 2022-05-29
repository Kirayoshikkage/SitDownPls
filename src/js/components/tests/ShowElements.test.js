/**
 * @jest-environment jsdom
 */

import { ShowElements } from "../ShowElements";

describe("Проверка конструктора", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let elements = `
       <div class="elements">
        <div class="element">Lorem</div>
        <div class="element">Lorem ipsum set dolar</div>
       </div>
      <button type="button" class="trigger">click</button>
    `;

    document.body.insertAdjacentHTML("beforeend", elements);
  });

  it("Переданы некорректные значения", () => {
    let sut = new ShowElements({
      hiddenElements: [],
      trigger: {},
      output: "12",
      breakpoints: [],
    });

    expect(() => sut.init()).toThrow();
  });

  it("Значения не переданы", () => {
    let sut = new ShowElements();

    expect(() => sut.init()).toThrow();
  });

  it("Переданы корректные значения", () => {
    let sut = new ShowElements({
      hiddenElements: ".element",
      trigger: ".trigger",
      output: 1,
      breakpoints: {
        768: {
          output: 3,
        },
        1440: {
          output: 6,
        },
      },
    });

    expect(() => sut.init()).not.toThrow();
  });
});

describe("Тестирование добавления нового обновляемого значения", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let elements = `
       <div class="elements">
        <div class="element">Lorem</div>
        <div class="element">Lorem ipsum set dolar</div>
       </div>
      <button type="button" class="trigger">click</button>
    `;

    document.body.insertAdjacentHTML("beforeend", elements);

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return 1920;
        },
      },
    });
  });

  it("В качестве имени переданы невалидные данные", () => {
    let sut = new ShowElements({
      hiddenElements: ".element",
      trigger: ".trigger",
      output: 1,
      breakpoints: {
        768: {
          color: "red",
        },
        1440: {
          color: "green",
        },
      },
    });

    expect(() =>
      sut.addUpdateProperties([], (value) => {
        sut.iterateOverHiddenElements((item) => {
          item.style.color = value;
        });
      })
    ).toThrow();
  });

  it("Вторым аргументом передена не функция и не массив функций", () => {
    let sut = new ShowElements({
      hiddenElements: ".element",
      trigger: ".trigger",
      output: 1,
      breakpoints: {
        768: {
          color: "red",
        },
        1440: {
          color: "green",
        },
      },
    });

    expect(() =>
      sut.addUpdateProperties("color", {
        color: "red",
      })
    ).toThrow();
  });

  it("Обновления цвета текста на десктопном размере экрана", () => {
    let sut = new ShowElements({
      hiddenElements: ".element",
      trigger: ".trigger",
      output: 1,
      breakpoints: {
        768: {
          color: "red",
        },
        1440: {
          color: "green",
        },
      },
    });
    sut.addUpdateProperties("color", (value) => {
      sut.iterateOverHiddenElements((item) => {
        item.style.color = value;
      });
    });
    sut.init();

    let rezult = document.querySelector(".element").style.color;

    expect(rezult).toMatch("green");
  });

  it("Обновления цвета при изменения размера экрана", () => {
    let sut = new ShowElements({
        hiddenElements: ".element",
        trigger: ".trigger",
        output: 1,
        breakpoints: {
          768: {
            color: "red",
          },
          1440: {
            color: "green",
          },
        },
      }),
      resize = new Event("resize");
    sut.addUpdateProperties("color", (value) => {
      sut.iterateOverHiddenElements((item) => {
        item.style.color = value;
      });
    });
    sut.init();
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return 1024;
        },
      },
    });
    window.dispatchEvent(resize);

    let rezult = document.querySelector(".element").style.color;

    expect(rezult).toMatch("red");
  });
});
