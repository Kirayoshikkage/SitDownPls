describe("Тестирование валидации формы", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("[data-test=form]").as("form");
  });

  it("Если форма не валидна показываются сообщения об ошибке", () => {
    cy.get("@form").submit();
    cy.get(".validate-error-message_show").should("be.visible");
  });

  it("Если заполнить форму правильно то сообщения об ошибках исчезнут после повторной попытки отправки", () => {
    cy.get("@form").submit();
    cy.get(".validate-error-message").should("be.visible");
    cy.get("[data-test=name]").type("Matviei");
    cy.get("[data-test=tel]").type("87846799640");
    cy.get("[data-test=email]").type("test@mail.ru");
    cy.get("[data-test=checkbox]").check({ force: true });
    cy.get("@form").submit();
    cy.get(".validate-error-message").should("not.be.visible");
  });

  it("При успешной отправки формы будет показано модальное окно", () => {
    cy.get("@form").submit();
    cy.get(".validate-error-message").should("be.visible");
    cy.get("[data-test=name]").type("Matviei");
    cy.get("[data-test=tel]").type("87846799640");
    cy.get("[data-test=email]").type("test@mail.ru");
    cy.get("[data-test=checkbox]").check({ force: true });
    cy.get("@form").submit();
    cy.get(".validate-error-message").should("not.be.visible");
    cy.get("[data-test=modal]").should("be.visible");
  });

  it("После показа модальное окно через 3 секунды будет закрыто", () => {
    cy.get("@form").submit();
    cy.get(".validate-error-message").should("be.visible");
    cy.get("[data-test=name]").type("Matviei");
    cy.get("[data-test=tel]").type("87846799640");
    cy.get("[data-test=email]").type("test@mail.ru");
    cy.get("[data-test=checkbox]").check({ force: true });
    cy.get("@form").submit();
    cy.get(".validate-error-message").should("not.be.visible");
    cy.get("[data-test=modal]").wait(3000).should("not.be.visible");
  });
});
