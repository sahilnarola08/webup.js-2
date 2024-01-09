describe("BTN", () => {
  it(`Check existence of kup-button-list with valid data`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_BTN) 4(;;COLL01)");
    cy.get("kup-button-list").should("have.prop", "data");
  });
});
