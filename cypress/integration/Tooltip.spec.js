describe("Тестирование тултипа", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("[data-test=tooltip]").as("tooltip");
  });

  it("При наведении тултип появляется", () => {
    cy.get("@tooltip").trigger("mouseenter");
    cy.get("[data-test=tooltip] .tooltip__content").should("be.visible");
  });

  it("Когда мышь уходит с элемента он исчезает", () => {
    cy.get("@tooltip").trigger("mouseenter");
    cy.get("@tooltip").trigger("mouseleave");
    cy.get("[data-test=tooltip] .tooltip__content").should("not.exist");
  });

  it("Когда на тултип попадает фокус он появляется", () => {
    cy.get("@tooltip").trigger("focus");
    cy.get("[data-test=tooltip] .tooltip__content").should("be.visible");
  });

  it("Когда фокус пропадает тултип исчезает", () => {
    cy.get("@tooltip").trigger("focus");
    cy.get("@tooltip").trigger("blur");
    cy.get("[data-test=tooltip] .tooltip__content").should("not.exist");
  });

  it("Проверка содержимого тултип", () => {
    cy.get("@tooltip").trigger("mouseenter");
    cy.get(".tooltip__content").should("not.have.value", " ");
  });
});
