describe("Тестирование бургер меню", () => {
  beforeEach(() => {
    cy.viewport(768, 768);
    cy.visit("http://localhost:3000/");
  });

  it("Открытие бургер меню", () => {
    cy.get(".burger-trigger").click();
    cy.get(".burger-menu").should("be.visible");
  });

  it("Закрытие бургер меню", () => {
    cy.get(".burger-trigger").click();
    cy.get(".burger-menu").should("be.visible");
    cy.get(".burger-trigger").wait(500).click();
    cy.get(".burger-menu").should("not.be.visible");
  });

  it("Клик на элемент бургер меню", () => {
    cy.get(".burger-trigger").click();
    cy.get(".burger-menu").should("be.visible");
    cy.get("[data-test=burger-link]").click();
    cy.get(".burger-menu").should("not.be.visible");
  });

  it("Тестирование бургер меню при ресайзе", () => {
    cy.get(".burger-trigger").click();
    cy.get(".burger-menu").should("be.visible");
    cy.viewport(1920, 1080);
    cy.get(".burger-menu").should("not.be.visible");
  });
});
