/**
 * @jest-environment jsdom
 */

import { Tooltip } from "../Tooltip";

describe("Тестирование конструктора", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let tooltip = `
      <button type="button" class="tooltip" data-content="Lorem ipsum">
        Click
      </button>;
    `;

    document.body.insertAdjacentHTML("beforeend", tooltip);
  });

  it("Переданы невалидные данные", () => {
    let sut = new Tooltip({
      selectors: ["tooltips"],
      apiAnimation: "string",
    });

    expect(() => sut.init()).toThrow();
  });

  it("Данные не переданы", () => {
    let sut = new Tooltip();

    expect(() => sut.init()).toThrow();
  });

  it("Переданы валидные данные", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() => sut.init()).not.toThrow();
  });
});

describe("Тестирование добавления нового девайса с событиями", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let tooltip = `
      <button type="button" class="tooltip" data-content="Lorem ipsum">
        Click
      </button>;
    `;

    document.body.insertAdjacentHTML("beforeend", tooltip);
  });

  it("Девайса передан в неверном формате", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() =>
      sut.addDevice([], {
        click: (e) => {
          sut.getTooltip(e).style.color = "red";
        },
      })
    ).toThrow();
  });

  it("Список событий передан неверном форматом", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() => sut.addEvents("desctop", "")).toThrow();
  });

  it("Такого девайса нету в списке доступных", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() =>
      sut.addDevice("watch", {
        click: (e) => {
          sut.getTooltip(e).style.color = "red";
        },
      })
    ).toThrow();
  });

  it("Такой девайс уже существует", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() =>
      sut.addDevice("desctop", {
        click: (e) => {
          sut.getTooltip(e).style.color = "red";
        },
      })
    ).toThrow();
  });

  it("Добавление нового девайса", () => {
    Object.defineProperty(
      window.navigator,
      "userAgent",
      ((value) => ({
        get() {
          return "iPhone";
        },
      }))(window.navigator.userAgent)
    );
    let sut = new Tooltip({
        selectors: ".tooltip",
      }),
      event = new Event("touchstart");
    sut.addDevice("mobile", {
      touchstart: (e) => {
        sut.getTooltip(e).style.color = "red";
      },
    });
    sut.init();
    document.querySelector(".tooltip").dispatchEvent(event);

    let rezult = document.querySelector(".tooltip").style.color;

    expect(rezult).toBe("red");
  });
});

describe("Тестирование добавления нового события для девайса", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let tooltip = `
      <button type="button" class="tooltip" data-content="Lorem ipsum">
        Click
      </button>;
    `;

    document.body.insertAdjacentHTML("beforeend", tooltip);
  });

  it("В качестве девайса передан неверный формат данных", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() =>
      sut.addEvents([], {
        click: (e) => {
          sut.getTooltip(e).style.color = "red";
        },
      })
    ).toThrow();
  });

  it("Список событий передан неверном форматом", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() => sut.addEvents("desctop", "")).toThrow();
  });

  it("Такой девайс еще не был добавлен", () => {
    let sut = new Tooltip({
      selectors: ".tooltip",
    });

    expect(() =>
      sut.addEvents("mobile", {
        click: (e) => {
          sut.getTooltip(e).style.color = "red";
        },
      })
    ).toThrow();
  });

  it("Добавление нового события", () => {
    let sut = new Tooltip({
        selectors: ".tooltip",
      }),
      event = new Event("click");
    sut.addEvents("desctop", {
      click: (e) => {
        sut.getTooltip(e).style.color = "red";
      },
    });
    sut.init();
    document.querySelector(".tooltip").dispatchEvent(event);

    let rezult = document.querySelector(".tooltip").style.color;

    expect(rezult).toBe("red");
  });
});
