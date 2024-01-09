describe("Home Page", () => {
  it("Check presence of some expected components", function () {
    cy.login();
    // TODO: try to use performant login
    // (see: https://docs.cypress.io/guides/end-to-end-testing/testing-your-app Logging In Improving performance)
    //cy.permlogin();
    cy.get("kup-card-list").should("have.length", 4);
  });
});
