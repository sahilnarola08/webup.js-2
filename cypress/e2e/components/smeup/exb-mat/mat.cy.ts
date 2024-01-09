describe("MAT", () => {
  it(`Check existence of kup-data-table with valid data`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCHESE;CMP_EXB) 4(;;002)");
    cy.get("kup-data-table").should("have.prop", "data");
  });
});
