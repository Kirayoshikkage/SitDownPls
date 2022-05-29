describe("Tестирование модального окна", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/d31.html");
    cy.viewport(1920, 1080);
  });

  it("Открытие модального окна", () => {
    cy.get("[data-test=slider-modal-trigger]").click();
    cy.get("[data-test=modal-slider]").should("be.visible");
  });

  it("Закрытие модального окна", () => {
    cy.get("[data-test=slider-modal-trigger]").click();
    cy.get("[data-test=modal-slider]").should("be.visible");
    cy.get("[data-test=modal-slider-close]").wait(500).click();
    cy.get("[data-test=modal-slider]").should("not.be.visible");
  });

  it("Клик вне модального окна когда оно открыто", () => {
    cy.get("[data-test=slider-modal-trigger]").click();
    cy.get("[data-test=modal-slider]").should("be.visible");
    cy.get("[data-test=modal-slider]").wait(500).click("topRight");
    cy.get("[data-test=modal-slider]").should("not.be.visible");
  });
});
