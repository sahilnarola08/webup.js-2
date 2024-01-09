describe("TRE", () => {
  it(`Check existence of kup-tree with valid data`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_TRE) 4(;;SA)");
    cy.get("kup-tree").should("have.prop", "data");
  });
});
