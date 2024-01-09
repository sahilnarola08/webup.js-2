describe("PLN", () => {
  it(`Check existence of kup-planner with valid data`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_PLN) 4(;;ES1)");
    cy.get("kup-planner").should("have.prop", "data");
  });
});
