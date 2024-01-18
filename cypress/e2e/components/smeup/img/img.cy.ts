describe("Image", () => {
  it(`Check existence of kup-image with valid data`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_BTN) 4(;;COLL01)");
    cy.get("kup-image").should("have.prop", "data");
  });
});
