describe("LAB", () => {
  it(`Check existence of label`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_LAB) 4(;;S01)");
    cy.get('*[class*="label"]');
  });
});
