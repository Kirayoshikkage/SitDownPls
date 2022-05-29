/**
 * @jest-environment jsdom
 */

import { Filters } from "../Filters";

describe("Тестирование сбора выбранных данных из фильтров", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let form = `
      <form action="#" class="filter-color">
        <input class="checkbox-brown" name="brown" type="checkbox" />
        <input class="checkbox-cyan" name="cyan" type="checkbox" />
        <input class="checkbox-yellow" name="yellow" type="checkbox" />
        <input class="favorite-color" type="text" name="favorite-color" />
      </form>
      <form action="#" class="filter-category">
        <input class="checkbox-business" name="business" type="checkbox" />
        <input class="checkbox-it" name="it" type="checkbox" />
        <input class="checkbox-building" name="building" type="checkbox" />
      </form>
      <div class="custom-input">
        MaxGraph
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", form);
  });
  it("Переданные данные валидны", () => {
    let sut = new Filters({
      color: {
        selector: ".filter-color",
      },
      category: {
        selector: ".filter-category",
      },
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Переданные данные не валидны", () => {
    let sut = new Filters([
      ["color", ".filter-color"],
      ["category", ".filter-category"],
    ]);

    expect(() => sut.init()).toThrow();
  });

  it("Ничего не передано", () => {
    let sut = new Filters();

    expect(() => sut.init()).toThrow();
  });

  it("Получение данных из фильтров, элементы на странице существуют и они корректны", () => {
    let sut = new Filters({
      color: {
        selector: ".filter-color",
      },
      category: {
        selector: ".filter-category",
      },
    });
    document.querySelector(".checkbox-brown").checked = true;
    document.querySelector(".checkbox-it").checked = true;
    document.querySelector(".favorite-color").value = "black";
    sut.init();

    let rezult = sut.getFilterData();

    expect(rezult).toEqual({
      category: [["it", "on"]],
      color: [
        ["brown", "on"],
        ["favorite-color", "black"],
      ],
    });
  });

  it("Получение данных из фильтров, но только один элемент отмечен", () => {
    let sut = new Filters({
      color: {
        selector: ".filter-color",
      },
      category: {
        selector: ".filter-category",
      },
    });
    sut.init();
    document.querySelector(".favorite-color").value = "black";

    let rezult = sut.getFilterData();

    expect(rezult).toEqual({
      category: [],
      color: [["favorite-color", "black"]],
    });
  });

  it("Получение данных из фильтров, один из элементов не существует", () => {
    let sut = new Filters({
      color: {
        selector: "olor",
      },
      category: {
        selector: ".filter-category",
      },
    });
    document.querySelector(".checkbox-brown").checked = true;
    document.querySelector(".checkbox-it").checked = true;
    sut.init();

    let rezult = sut.getFilterData();

    expect(rezult).toEqual({
      category: [["it", "on"]],
    });
  });

  it("Получение данных из фильтров, элементы на странице не существуют", () => {
    let sut = new Filters({
      color: {
        selector: ".filter",
      },
      category: {
        selector: ".category",
      },
    });
    sut.init();

    let rezult = sut.getFilterData();

    expect(rezult).toEqual({});
  });

  it("Получение данных с помощью геттера, геттер валиден", () => {
    let sut = new Filters({
      youtuber: {
        selector: ".custom-input",
        getter() {
          return [document.querySelector(this.selector).textContent.trim()];
        },
      },
    });
    sut.init();

    let rezult = sut.getFilterData();

    expect(rezult).toEqual({
      youtuber: ["MaxGraph"],
    });
  });

  it("Получение данных с помощью геттера, геттер не валиден", () => {
    let sut = new Filters({
      youtuber: {
        selector: ".custom-input",
        getter: "MaxGraph",
      },
    });
    sut.init();

    let rezult = sut.getFilterData();

    expect(rezult).toEqual({});
  });
});
