/**
 * @jest-environment jsdom
 */

import { Select, SelectWithSingleChoice } from "../Select";

describe("Проверка конструктора", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let select = `
      <div class="select">
        <button type="button" class="btn-reset select__trigger">
          <span class="select__current-item"> Lorem </span>
        </button>
        <div class="select__body">
          <div class="select__content">Lorem</div>
          <button
              type="button"
              class="btn-reset select__more-btn"
            >
              + ещё
            </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", select);
  });

  it("Переданы некорректные значения", () => {
    let sut = new Select({
      selector: [],
      apiAnimation: "stink",
      output: {},
      breakpoints: [],
    });

    expect(() => sut.init()).toThrow();
  });

  it("Значения не переданы", () => {
    let sut = new Select();

    expect(() => sut.init()).toThrow();
  });

  it("Переданы корректные значения", () => {
    let sut = new SelectWithSingleChoice({
      selector: ".select",
      initialValue: "Категория",
      output: 5,
      breakpoints: {
        1024: {
          output: 10,
        },
        0: {
          output: 5,
        },
      },
    });

    expect(() => sut.init()).not.toThrow();
  });
});

describe("Проверка состояния", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let select = `
      <div class="select">
        <button type="button" class="btn-reset select__trigger">
          <span class="select__current-item"> Lorem </span>
        </button>
        <div class="select__body">
          <div class="select__content">Lorem</div>
          <button
              type="button"
              class="btn-reset select__more-btn"
            >
              + ещё
            </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", select);
  });

  it("Проверка состояния при открытом селекте", () => {
    let sut = new Select({
      selector: ".select",
    });
    sut.init();
    sut.toggle();

    let rezult = sut.isOpen();

    expect(rezult).toBeTruthy();
  });

  it("Проверка состояния при закрытом селекте", () => {
    let sut = new Select({
      selector: ".select",
    });
    sut.init();
    sut.toggle();
    sut.toggle();

    let rezult = sut.isOpen();

    expect(rezult).toBeFalsy();
  });
});

describe("Проверка получения выбранного элемента", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let select = `
      <div class="select">
        <button type="button" class="btn-reset select__trigger">
          <span class="select__current-item"> Lorem </span>
        </button>
        <div class="select__body">
          <div class="select__content">
            <div class="select__content">
              <button data-key="Диваны" type="button" class="btn-reset select__item">Диваны</button>
              <button data-key="Кресла" type="button" class="btn-reset select__item">Кресла</button>
            </div>
          </div>
          <button type="button" class="btn-reset select__more-btn"> + ещё</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", select);
  });

  it("Получение выбранного элемента", () => {
    let sut = new SelectWithSingleChoice({
      selector: ".select",
      initialValue: "Диваны",
    });
    sut.init();

    let rezult = sut.getCurrentValue();

    expect(rezult).toBe("Диваны");
  });
});

describe("Проверка уничтожения селекта", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let select = `
      <div class="select">
        <button type="button" class="btn-reset select__trigger">
          <span class="select__current-item"> Lorem </span>
        </button>
        <div class="select__body">
          <div class="select__content">
            <div class="select__content">
              <button data-key="Диваны" type="button" class="btn-reset select__item">Диваны</button>
              <button data-key="Кресла" type="button" class="btn-reset select__item">Кресла</button>
            </div>
          </div>
          <button type="button" class="btn-reset select__more-btn"> + ещё</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", select);
  });

  it("Клик по триггеру после уничтожения селекта", () => {
    let sut = new SelectWithSingleChoice({
        selector: ".select",
      }),
      event = new Event("click"),
      trigger = document.querySelector(".select__trigger");
    sut.init();
    sut.destroy();

    trigger.dispatchEvent(event);

    expect(sut.isOpen()).toBeFalsy();
  });

  it("Удаление селекторов активности у элементов", () => {
    let sut = new SelectWithSingleChoice({
        selector: ".select",
        initialValue: "Диваны",
      }),
      item = document.querySelector("[data-key=Диваны]");
    sut.init();
    sut.destroy();

    let rezult = item.classList.contains("select__item_selected");

    expect(rezult).toBeFalsy();
  });
});
