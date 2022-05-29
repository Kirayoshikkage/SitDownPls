describe("Тестирование показа скрытых элементов", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
  });

  it("Показ скрытых элементов", () => {
    cy.get("[data-test=rating-hidden-item]").should("not.be.visible");
    cy.get("[data-test=rating-trigger]").click();
    cy.get("[data-test=rating-hidden-item]").should("be.visible");
  });

  it("Элементы после открытия при ресайзе не скрываются", () => {
    cy.get("[data-test=rating-trigger]").click();
    cy.viewport(320, 568);
    cy.get("[data-test=rating-hidden-item]").should("be.visible");
  });

  it("Количество скрытых элементов при ресайзе увеличивается, если элементы еще не показаны", () => {
    cy.get("[data-open=true]").should("have.length", 8);
    cy.viewport(320, 568);
    cy.get("[data-open=true]").should("have.length", 6);
  });
});
