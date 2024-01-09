import { cyEnterKey, getBaseUrl } from "../e2e/utils/e2eUtils";

declare global {
  namespace Cypress {
    interface Chainable {
      login(sFun?: string): Chainable<void>;
      permlogin(): Chainable<void>;
      spotlightCommand(command: string): Chainable<void>;
    }
  }
}

export function login(sFun?: string) {
  const baseUrl = getBaseUrl();
  cy.visit(sFun ? `${baseUrl}/login?fun=${sFun}` : baseUrl);
  const username = Cypress.env("test_user_name");
  const password = Cypress.env("test_user_password");
  const env = Cypress.env("test_user_env");

  cy.get('*[class^="login-modules_form"]').find("input").eq(0).type(username);
  cy.get('*[class^="login-modules_form"]').find("input").eq(1).type(password);
  cy.get('*[class^="login-modules_form"]').find("input").eq(2).type(env);

  cy.get("#login-button").find(".button__label").click();

  cy.url({ timeout: 30000 }).should("include", "/home");

  cy.get("#navbarImage").find("img").should("have.attr", "src");
}

Cypress.Commands.add("login", (sFun: string) => {
  login(sFun);
});

Cypress.Commands.add("permlogin", () => {
  const username = Cypress.env("test_user_name");
  cy.session(
    username,
    () => {
      login();
    },
    {
      validate: () => {
        cy.getCookie("authData").should("exist");
      },
    },
  );
});

export function spotlightCommand(command: string) {
  cy.get("#searchbar")
    .find("input")
    .type(command + cyEnterKey);
}

Cypress.Commands.add("spotlightCommand", command => {
  spotlightCommand(command);
});
