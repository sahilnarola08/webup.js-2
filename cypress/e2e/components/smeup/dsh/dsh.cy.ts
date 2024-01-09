describe("DSH", () => {
  it(`Check existence of kup-card-list with valid data`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_DSH) 4(;;TYPLAY)");
    cy.get("kup-card-list")
      .should("have.length", "8")
      .first()
      .should("have.prop", "data");
  });
});
