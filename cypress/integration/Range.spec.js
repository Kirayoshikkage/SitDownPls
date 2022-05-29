describe("Тестирование прогресбара", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/catalog.html");

    cy.get("[data-test=range-min-input]").as("min-input");
    cy.get("[data-test=range-min-slider]").as("min-slider");
  });

  it("При изменении положения слайдера меняется значение в инпуте", () => {
    cy.get("@min-input")
      .invoke("val")
      .then((initialValue) => {
        cy.get("@min-slider").type("{rightArrow}");

        cy.get("@min-input").should("not.have.value", initialValue);
      });
  });
});
