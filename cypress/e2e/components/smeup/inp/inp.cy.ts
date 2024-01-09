describe("INP", () => {
  it(`Check existence of kup-form with valid data`, function () {
    cy.login(
      "F(EXD;*SCO;) 1(;;) 2(MB;SCP_SCH;WETEST_I01) 4(;;SH1) 5(;;) 6(;;) P() INPUT()",
    );
    cy.get("kup-form").should("have.prop", "data");
  });
});
