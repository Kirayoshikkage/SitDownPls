describe("Тестирование выпадающего меню", () => {
  describe("Выпадающее меню с одиночным выбором", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit("http://localhost:3000/");
    });

    it("Открытие выпадающего меню", () => {
      cy.get("[data-test=select-category-trigger]").click();
      cy.get("[data-test=select-category-body]").should("be.visible");
    });

    it("Выбор элемента в выпадающем меню", () => {
      cy.get("[data-test=select-category-trigger]").click();
      cy.get("[data-test=select-category-item").click();
      cy.get("[data-test=select-category-item").should(
        "have.class",
        "select__item_selected"
      );
      cy.get("[data-test=select-category-body]").should("not.be.visible");
      cy.get("[data-test=select-category-current-item").contains("Диваны");
    });

    it("Закрытие выпадающего меню", () => {
      cy.get("[data-test=select-category-trigger]").click();
      cy.get("[data-test=select-category-trigger]").click();
    });

    it("Скрытие элементов при ресайзе", () => {
      cy.get("[data-test=select-category-trigger]").click();
      cy.get(
        "[data-test=select-category] [data-test=select-category-hidden-item]"
      ).should("be.visible");
      cy.viewport(768, 768);
      cy.get(
        "[data-test=select-category] [data-test=select-category-hidden-item]"
      ).should("not.be.visible");
    });

    it("Показ скрытых элементов", () => {
      cy.viewport(768, 768);
      cy.get("[data-test=select-category-trigger]").click();
      cy.get("[data-test=select-category-more]").click();
      cy.get("[data-test=select-category] .select__item").should("be.visible");
    });

    it("Показ элементов при ресайзе", () => {
      cy.viewport(768, 768);
      cy.get("[data-test=select-category-trigger]").click();
      cy.get(
        "[data-test=select-category] [data-test=select-category-hidden-item]"
      ).should("not.be.visible");
      cy.viewport(1920, 1080);
      cy.get(
        "[data-test=select-category] [data-test=select-category-hidden-item]"
      ).should("be.visible");
    });
  });
});
