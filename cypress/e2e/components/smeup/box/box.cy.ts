describe("BOX", () => {
  it(`Check existence of kup-box with valid data`, function () {
    cy.login(
      "F(EXD;*SCO;) 1(;;) 2(MB;SCP_SCH;WETEST_BOX) 4(;;LAY_A) 5(;;) 6(;;) P() INPUT()",
    );
    cy.get("kup-box").should("have.prop", "data");
  });
});
