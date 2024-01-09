import { getBaseUrl } from "../utils/e2eUtils";

describe("Login Page", () => {
  it("Login page successfully loads", () => {
    cy.visit(getBaseUrl());
    cy.get('*[class^="login-modules_modules__title"]').should(
      "contain",
      "Moduli di accesso",
    );
    cy.get('*[class^="login-modules_form__title"]').should(
      "contain",
      "Free User Login",
    );
  });

  it("Login ok", () => {
    cy.login();
  });

  it("Invalid user", () => {
    cy.visit(getBaseUrl());

    const password = Cypress.env("test_user_password");
    const env = Cypress.env("test_user_env");
    cy.get('*[class^="login-modules_form"]')
      .find("input")
      .eq(0)
      .type("wronguser");
    cy.get('*[class^="login-modules_form"]').find("input").eq(1).type(password);
    cy.get('*[class^="login-modules_form"]').find("input").eq(2).type(env);
    cy.get("#login-button").find(".button__label").click();
    cy.get(".snackbar__text").should(
      "contain",
      "Request failed with status code 401",
    );
  });

  // TODO: invalid user/password....
});
