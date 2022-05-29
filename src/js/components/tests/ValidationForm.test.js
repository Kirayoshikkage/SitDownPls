/**
 * @jest-environment jsdom
 */

import { ValidationForm } from "../ValidationForm";

describe("Тестирование валидации формы", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let form = `
      <form action="#" class="form">
        <label>
          <input type="text" class="text" name="name" />
          <span class="validate-error-message"></span>
        </label>
        <label>
          <input type="tel" class="phone" name="phone" />
          <span class="validate-error-message"></span>
        </label>
        <label>
          <input type="text" class="email" name="email" />
          <span class="validate-error-message"></span>
        </label>
        <label>
          <input type="text" class="ru" name="ru" />
          <span class="validate-error-message"></span>
        </label>
        <button class="submit" type="submit">
          Отправить
        </button>
        <label>
          <input name="agreement" type="checkbox" class="checkbox" />
          <span class="validate-error-message"></span>
        </label>
      </form>
    `;

    document.body.insertAdjacentHTML("beforeend", form);
  });

  it("Переданы корректные значения", () => {
    let sut = new ValidationForm(".form");

    expect(() => sut.init()).not.toThrow();
  });

  it("Переданы некорректные значения", () => {
    let sut = new ValidationForm({}, 123, 59);

    expect(() => sut.init()).toThrow();
  });

  it("Ввод корректных значений в текстовое поле", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form"),
      testList = ["MaxGraph cool dev", "Ya loh", "Бу", "Дааа"];
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
    ]);

    for (let test of testList) {
      text.value = test;

      expect(sut.validation()).toBe(true);
    }
  });

  it("Ввод некорректных значений в текстовое поле", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form"),
      testList = ["ba123", "ba!@#$%", "by()", "by_&#$", "ру_329"];
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
    ]);

    for (let test of testList) {
      text.value = test;

      expect(sut.validation()).toBe(false);
    }
  });

  it("Ввод корректных значений в поле для телефона", () => {
    let phone = document.querySelector(".phone"),
      sut = new ValidationForm(".form"),
      testList = [
        "+79261234567",
        "89261234567",
        "79261234567",
        "+7 926 123 45 67",
        "8(926)123-45-67",
        "123-45-67",
        "9261234567",
        "79261234567",
        "(495)1234567",
        "(495) 123 45 67",
        "89261234567",
        "8-926-123-45-67",
        "8 927 1234 234",
        "8 927 12 12 888",
        "8 927 12 555 12",
        "8 927 123 8 123",
      ];
    sut.init();
    sut.addRules(".phone", [
      {
        rule: "phone",
        errorMessage: "Введите корректный номер телефона!",
      },
    ]);

    for (let test of testList) {
      phone.value = test;

      expect(sut.validation()).toBe(true);
    }
  });

  it("Ввод некорректных значений в поле для телефона", () => {
    let phone = document.querySelector(".phone"),
      sut = new ValidationForm(".form"),
      testList = [
        "+79f261234567",
        "89ав2612fddf34567",
        "7926#!@@#1234567",
        "7926#!@@#123_!@4567",
      ];
    sut.init();
    sut.addRules(".phone", [
      {
        rule: "phone",
        errorMessage: "Введите корректный номер телефона!",
      },
    ]);

    for (let test of testList) {
      phone.value = test;

      expect(sut.validation()).toBe(false);
    }
  });

  it("Ввод корректных значений в поле для почты", () => {
    let email = document.querySelector(".email"),
      sut = new ValidationForm(".form"),
      testList = [
        "andrew4uni@yandex.ru",
        "andrey@lionnet.pp.ua",
        "ohnsmith@lionnet.pp.ua",
        "sergey777@mail.ry",
        "validtest7@gmail.co",
        "test@example.org ",
        "btiusembassy@bti-sitaindia.com",
        "norwegenkoch@hugin-versand.de",
        "zeydodetro@enayu.com",
      ];
    sut.init();
    sut.addRules(".email", [
      {
        rule: "email",
        errorMessage: "Введите корректный e-mail!",
      },
    ]);

    for (let test of testList) {
      email.value = test;

      expect(sut.validation()).toBe(true);
    }
  });

  it("Ввод некорректных значений в поле для почты", () => {
    let email = document.querySelector(".email"),
      sut = new ValidationForm(".form"),
      testList = [
        "@mail.ru",
        "te#!@()(@)(ВВВВst@mail.ru",
        "пппппппВВВВ@mail.ru",
        "te#st@mail.ru",
        "te#s))_)_)В''t@mail.ru",
        "te#аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааst@mail.ru",
      ];
    sut.init();
    sut.addRules(".email", [
      {
        rule: "email",
        errorMessage: "Введите корректный e-mail!",
      },
    ]);

    for (let test of testList) {
      email.value = test;

      expect(sut.validation()).toBe(false);
    }
  });

  it("Нажатие на чекбокс", () => {
    let checkbox = document.querySelector(".checkbox"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".checkbox", [
      {
        rule: "checkbox",
        errorMessage: "Необходимо отметить чекбокс!",
      },
    ]);

    checkbox.checked = true;

    expect(sut.validation()).toBe(true);
  });

  it("Ввод максимально допустимого значения", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "maxLength",
        value: 6,
        errorMessage: "Максимальное значениe - 6 символов!",
      },
    ]);

    text.value = "Ya loh";

    expect(sut.validation()).toBe(true);
  });

  it("Ввод значения превышающего максимальное значение", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "maxLength",
        value: 3,
        errorMessage: "Максимальное значениe - 3 символа!",
      },
    ]);

    text.value = "Ya loh";

    expect(sut.validation()).toBe(false);
  });

  it("Ввод значения не достигшего порога минимума", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Минимальное значениe - 3 символа!",
      },
    ]);

    text.value = "Ya";

    expect(sut.validation()).toBe(false);
  });

  it("Ввод минимально допустимого значения", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "Минимальное значениe - 6 символов!",
      },
    ]);

    text.value = "Ya loh";

    expect(sut.validation()).toBe(true);
  });

  it("Ввод промежуточного значения между максимальным и минимальным", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "maxLength",
        value: 12,
        errorMessage: "Максимальное значениe - 12 символов!",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "Минимальное значениe - 6 символов!",
      },
    ]);

    text.value = "Ya loh boo";

    expect(sut.validation()).toBe(true);
  });

  it("Ввод обязательного значения", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "requered",
        errorMessage: "Необходимо заполнить это поле!",
      },
    ]);

    text.value = "Ya loh";

    expect(sut.validation()).toBe(true);
  });

  it("Игнорирование обязательного значения", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form");
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "requered",
        errorMessage: "Необходимо заполнить это поле!",
      },
    ]);

    expect(sut.validation()).toBe(false);
  });

  it("Отправка формы если она валидна", () => {
    let text = document.querySelector(".text"),
      sut = new ValidationForm(".form"),
      eventSubmit = new Event("submit"),
      flag = false;
    sut.init();
    sut.addRules(".text", [
      {
        rule: "text",
        errorMessage: "Поле может содержать только буквы!",
      },
      {
        rule: "maxLength",
        value: 12,
        errorMessage: "Максимальное значениe - 12 символов!",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "Минимальное значениe - 6 символов!",
      },
    ]);
    text.value = "Ya loh boo";

    sut.submit(() => {
      flag = true;
    });
    sut.getForm().dispatchEvent(eventSubmit);

    expect(flag).toBe(true);
  });

  it("Переданы некорректные значения в добавлении валидируемого поля", () => {
    let sut = new ValidationForm({}, 123, 59);

    expect(() => sut.addRules(62176, "loh123")).toThrow();
  });

  it("Добавление кастомного валидатора", () => {
    let sut = new ValidationForm(".form");
    sut.init();

    sut.addCustomValidate("ru", ({ element, errorMessage }) => {
      let inputValue = element.value.trim(),
        regexp = /[^А-Яа-я\s]/;

      if (regexp.test(inputValue) && inputValue !== "")
        return {
          validate: false,
          errorMessage,
        };

      return {
        validate: true,
      };
    });

    expect(() => {
      sut.addRules(".ru", [
        {
          rule: "ru",
          errorMessage: "Доступны только русские буквы",
        },
      ]);
    }).not.toThrow();
  });

  it("Добавление кастомного валидатора, ввод корректных значений", () => {
    let ru = document.querySelector(".ru"),
      sut = new ValidationForm(".form"),
      testList = ["Да", "Нет", "йцукенгшщзхъфывапролджэячсмитьбю"];
    sut.init();
    sut.addCustomValidate("ru", ({ element, errorMessage }) => {
      let inputValue = element.value.trim(),
        regexp = /[^А-Яа-я\s]/;

      if (regexp.test(inputValue) && inputValue !== "")
        return {
          validate: false,
          errorMessage,
        };

      return {
        validate: true,
      };
    });
    sut.addRules(".ru", [
      {
        rule: "ru",
        errorMessage: "Доступны только русские буквы",
      },
    ]);

    for (let test of testList) {
      ru.value = test;

      expect(sut.validation()).toBe(true);
    }
  });

  it("Добавление кастомного валидатора, ввод некорректных значений", () => {
    let ru = document.querySelector(".ru"),
      sut = new ValidationForm(".form"),
      testList = ["Da", "123", "Ned", "Да1", "nВ", "q#@wertyuioR$#pasdghjkvn"];
    sut.init();
    sut.addCustomValidate("ru", ({ element, errorMessage }) => {
      let inputValue = element.value.trim(),
        regexp = /[^А-Яа-я\s]/;

      if (regexp.test(inputValue) && inputValue !== "")
        return {
          validate: false,
          errorMessage,
        };

      return {
        validate: true,
      };
    });
    sut.addRules(".ru", [
      {
        rule: "ru",
        errorMessage: "Доступны только русские буквы",
      },
    ]);

    for (let test of testList) {
      ru.value = test;

      expect(sut.validation()).toBe(false);
    }
  });
});
