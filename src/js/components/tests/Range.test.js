/**
 * @jest-environment jsdom
 */

import { Range } from "../Range";

describe("Тестирование прогресбара", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let range = `
      <div class="range">
        <div class="range__inputs">
          <input
            data-mutator="input_from"
            data-storage="from"
            data-type="input"
            class="input-reset range__mutator range__input"
            type="text"
            step="100"
            min="0"
            value="2000"
          />
          <input
            data-mutator="input_before"
            data-storage="before"
            data-type="input"
            class="input-reset range__mutator range__input"
            type="text"
            step="100"
            value="150000"
            max="250000"
          />
        </div>
        <div role="progressbar" aria-label="Прогрессбар для цены" class="range__line">
          <button
            type="button"
            aria-label="Ползунок начальной цены"
            data-mutator="slider_from"
            data-storage="from"
            data-type="slider"
            class="btn-reset range__mutator range__slider"
          >
          </button>
          <button
            type="button"
            aria-label="Ползунок конеченой цены"
            data-mutator="slider_before"
            data-storage="before"
            data-type="slider"
            class="btn-reset range__mutator range__slider"
          >
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", range);
  });

  describe("Тестирование конструктора", () => {
    it("Переданные данные не валидны", () => {
      let sut = new Range([]);

      expect(() => sut.init()).toThrow();
    });

    it("Данные не переданы", () => {
      let sut = new Range();

      expect(() => sut.init()).toThrow();
    });

    it("Переданные данные валидны", () => {
      let sut = new Range(".range");

      expect(() => sut.init()).not.toThrow();
    });
  });

  describe("Проверка ввода данных", () => {
    it("В первом инпуте значение не может быть больше чем значение во втором инпуте", () => {
      let sut = new Range(".range"),
        first = document.querySelector("[data-mutator='input_from'"),
        last = document.querySelector("[data-mutator='input_before'"),
        event = new Event("change");
      sut.init();
      first.value = Number(last.value) * 2;

      first.dispatchEvent(event);
      let rezult = first.value;

      expect(rezult).toBe(last.value);
    });

    it("Вo втором инпуте значение не может быть меньше чем значение в первом инпуте", () => {
      let sut = new Range(".range"),
        first = document.querySelector("[data-mutator='input_from'"),
        last = document.querySelector("[data-mutator='input_before'"),
        event = new Event("change");
      sut.init();
      last.value = Number(first.value) - Number(first.value);

      last.dispatchEvent(event);
      let rezult = last.value;

      expect(rezult).toBe(first.value);
    });

    it("Инпут принимает только числа", () => {
      let sut = new Range(".range"),
        first = document.querySelector("[data-mutator='input_from'"),
        event = new Event("change");
      sut.init();
      first.value = "l_!@oh";

      first.dispatchEvent(event);
      let rezult = first.value;

      expect(rezult).toBe("");
    });
  });

  it("Получение данных", () => {
    let sut = new Range(".range");
    sut.init();

    let rezult = sut.getData();

    expect(rezult).toEqual([
      ["from", 2000],
      ["before", 150000],
    ]);
  });
});
