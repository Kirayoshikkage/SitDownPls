/**
 * @jest-environment jsdom
 */

import { Tooltip } from "../Tooltip";

describe("Тестирование тултипа", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let tooltip = `
      <button type="button" class="tooltip" data-content="Lorem ipsum">
        Click
      </button>;
    `;

    document.body.insertAdjacentHTML("beforeend", tooltip);
  });

  describe("Тестирование конструктора", () => {
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
    it("Девайс передан в неверном формате", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.init();

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
      sut.init();

      expect(() => sut.addEvents("desctop", "")).toThrow();
    });

    it("Такого девайса нету в списке доступных", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.init();

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
      sut.init();

      sut.addDevice("test", {
        mouseenter: () => {},
      });

      expect(() =>
        sut.addDevice("test", {
          click: (e) => {},
        })
      ).toThrow();
    });

    it("Добавление нового девайса", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.init();

      expect(() => {
        sut.addDevice("test", {
          click: () => {},
        });
      }).not.toThrow();
    });
  });

  describe("Тестирование добавления нового события для девайса", () => {
    it("В качестве девайса передан неверный формат данных", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.init();

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
      sut.init();

      expect(() => sut.addEvents("desctop", "")).toThrow();
    });

    it("Такой девайс еще не был добавлен", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.init();

      expect(() =>
        sut.addEvents("test", {
          click: (e) => {},
        })
      ).toThrow();
    });

    it("Добавление нового события", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.addDevice("test", {
        mouseenter: () => {},
      });
      sut.init();

      expect(() => {
        sut.addEvents("test", {
          click: (e) => {},
        });
      }).not.toThrow();
    });
  });

  describe("Тестирование получения списка доступных девайсов", () => {
    it("Получение списка", () => {
      let sut = new Tooltip({
        selectors: ".tooltip",
      });
      sut.init();

      expect(sut.getListAvailableDevices()).not.toBe([]);
    });
  });
});
