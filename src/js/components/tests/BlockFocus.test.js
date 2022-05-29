/**
 * @jest-environment jsdom
 */

import { BlockFocus } from "../blockFocus";

describe("Тестирование блокировки фокуса", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    BlockFocus._blocked = false;
    BlockFocus._listBlockedElements = new Set();

    let sutDOM = `
      <div class="not-blocked">
        <a href="#" class="not-blocked__link">link</a>
      </div>
      <a href="#" class="blocked-link">link</a>
      <a href="#" class="single-not-blocked">link</a>
      <div class="not-interactive-element">loh</div>
      <button>btn</button>
    `;

    document.body.insertAdjacentHTML("beforeend", sutDOM);
  });

  it("Проверка блокировки элементов, кеширование выключено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        caching: false,
        single: [document.querySelector(".single-not-blocked")],
      }),
      notBlockedElement = document.querySelector(".not-blocked__link"),
      blockedElement = document.querySelector(".blocked-link"),
      notBlockedElementSingle = document.querySelector(".single-not-blocked"),
      elementNotHaveTabindex = document.querySelector(
        ".not-interactive-element"
      );

    sut.toggleBlock();

    expect(notBlockedElement.getAttribute("tabindex")).not.toBe("-1");
    expect(blockedElement.getAttribute("tabindex")).toBe("-1");
    expect(notBlockedElementSingle.getAttribute("tabindex")).not.toBe("-1");
    expect(elementNotHaveTabindex.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка разблокировки элементов, кеширование выключено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        caching: false,
        single: [document.querySelector(".single-not-blocked")],
      }),
      notBlockedElement = document.querySelector(".not-blocked__link"),
      blockedElement = document.querySelector(".blocked-link"),
      notBlockedElementSingle = document.querySelector(".single-not-blocked"),
      elementNotHaveTabindex = document.querySelector(
        ".not-interactive-element"
      );
    sut.toggleBlock();

    sut.toggleBlock();

    expect(notBlockedElement.getAttribute("tabindex")).not.toBe("-1");
    expect(blockedElement.getAttribute("tabindex")).not.toBe("-1");
    expect(notBlockedElementSingle.getAttribute("tabindex")).not.toBe("-1");
    expect(elementNotHaveTabindex.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка блокировки элементов, кеширование включено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        single: [document.querySelector(".single-not-blocked")],
      }),
      notBlockedElement = document.querySelector(".not-blocked__link"),
      blockedElement = document.querySelector(".blocked-link"),
      notBlockedElementSingle = document.querySelector(".single-not-blocked"),
      elementNotHaveTabindex = document.querySelector(
        ".not-interactive-element"
      );

    sut.toggleBlock();

    expect(notBlockedElement.getAttribute("tabindex")).not.toBe("-1");
    expect(blockedElement.getAttribute("tabindex")).toBe("-1");
    expect(notBlockedElementSingle.getAttribute("tabindex")).not.toBe("-1");
    expect(elementNotHaveTabindex.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка разблокировки элементов, кеширование включено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        single: [document.querySelector(".single-not-blocked")],
      }),
      notBlockedElement = document.querySelector(".not-blocked__link"),
      blockedElement = document.querySelector(".blocked-link"),
      notBlockedElementSingle = document.querySelector(".single-not-blocked"),
      elementNotHaveTabindex = document.querySelector(
        ".not-interactive-element"
      );
    sut.toggleBlock();

    sut.toggleBlock();

    expect(notBlockedElement.getAttribute("tabindex")).not.toBe("-1");
    expect(blockedElement.getAttribute("tabindex")).not.toBe("-1");
    expect(notBlockedElementSingle.getAttribute("tabindex")).not.toBe("-1");
    expect(elementNotHaveTabindex.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка блокировки элементов, переданы некорректные значения", () => {
    let sut = new BlockFocus({
        exceptionContainer: 8278,
        caching: "loh",
        single: true,
      }),
      notBlockedElement = document.querySelector(".not-blocked__link"),
      blockedElement = document.querySelector(".blocked-link"),
      notBlockedElementSingle = document.querySelector(".single-not-blocked"),
      elementNotHaveTabindex = document.querySelector(
        ".not-interactive-element"
      );

    sut.toggleBlock();

    expect(notBlockedElement.getAttribute("tabindex")).toBe("-1");
    expect(blockedElement.getAttribute("tabindex")).toBe("-1");
    expect(notBlockedElementSingle.getAttribute("tabindex")).toBe("-1");
    expect(elementNotHaveTabindex.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка блокировки элементов, ничего не передано", () => {
    let sut = new BlockFocus(),
      notBlockedElement = document.querySelector(".not-blocked__link"),
      blockedElement = document.querySelector(".blocked-link"),
      notBlockedElementSingle = document.querySelector(".single-not-blocked"),
      elementNotHaveTabindex = document.querySelector(
        ".not-interactive-element"
      );

    sut.toggleBlock();

    expect(notBlockedElement.getAttribute("tabindex")).toBe("-1");
    expect(blockedElement.getAttribute("tabindex")).toBe("-1");
    expect(notBlockedElementSingle.getAttribute("tabindex")).toBe("-1");
    expect(elementNotHaveTabindex.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка состояния при блокировке", () => {
    let sut = new BlockFocus({
      exceptionContainer: ".not-blocked",
      single: [document.querySelector(".single-not-blocked")],
    });

    sut.toggleBlock();

    expect(sut.blocked()).toBe(true);
  });

  it("Проверка состояния при разблокировке", () => {
    let sut = new BlockFocus({
      exceptionContainer: ".not-blocked",
      single: [document.querySelector(".single-not-blocked")],
    });
    sut.toggleBlock();

    sut.toggleBlock();

    expect(sut.blocked()).toBe(false);
  });

  it("Проверка добавления функции блокировки, добавляется до каких-либо блокировок, кеширование выключено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        caching: false,
        single: [document.querySelector(".single-not-blocked")],
      }),
      elementNotBlocked = document.querySelector("button");

    sut.addBlockingFunction((element) => {
      return element.tagName !== "BUTTON";
    });
    sut.toggleBlock();

    expect(elementNotBlocked.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка добавления функции блокировки, добавляется динамически, кеширование выключено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        caching: false,
        single: [document.querySelector(".single-not-blocked")],
      }),
      elementNotBlocked = document.querySelector("button");
    sut.toggleBlock();
    sut.toggleBlock();

    sut.addBlockingFunction((element) => {
      return element.tagName !== "BUTTON";
    });
    sut.toggleBlock();

    expect(elementNotBlocked.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка добавления функции блокировки, добавляется до каких-либо блокировок, кеширование включено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        single: [document.querySelector(".single-not-blocked")],
      }),
      elementNotBlocked = document.querySelector("button");

    sut.addBlockingFunction((element) => {
      return element.tagName !== "BUTTON";
    });
    sut.toggleBlock();

    expect(elementNotBlocked.getAttribute("tabindex")).not.toBe("-1");
  });

  it("Проверка добавления функции блокировки, добавляется динамически, кеширование включено", () => {
    let sut = new BlockFocus({
        exceptionContainer: ".not-blocked",
        single: [document.querySelector(".single-not-blocked")],
      }),
      elementNotBlocked = document.querySelector("button");
    sut.toggleBlock();
    sut.toggleBlock();

    sut.addBlockingFunction((element) => {
      return element.tagName !== "BUTTON";
    });
    sut.toggleBlock();

    expect(elementNotBlocked.getAttribute("tabindex")).toBe("-1");
  });
});
