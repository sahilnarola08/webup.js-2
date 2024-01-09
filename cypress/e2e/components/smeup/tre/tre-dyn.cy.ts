describe("TRE", () => {
  it(`Checks label's value after clicking a node.`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_TRE) 4(;;SA)");
    cy.get("[data-cy='lab']").should("not.exist");

    /** Click on first node through data-row prop on the first row */
    cy.get(".kup-tree__node")
      .first()
      .then($el => {
        const value = $el.prop("data-row").obj.k;
        cy.get(".kup-tree__node").first().click();
        cy.get("[data-cy='lab-value']").should("include.text", value);
      });

    /** Multiple clicks */
    cy.get("kup-tree").then($el => {
      const data = $el.prop("data");
      data.forEach((n, index: number) => {
        const value = n.obj.k;
        cy.get(`.kup-tree__node:nth-child(${index + 1})`).click();
        cy.get("[data-cy='lab-value']").should("include.text", value);
      });
    });

    /** Click on first node through data prop */
    cy.get("kup-tree").then($el => {
      const data = $el.prop("data");
      const value = data[0].obj.k;
      cy.get(".kup-tree__node").first().click();
      cy.get("[data-cy='lab-value']").should("include.text", value);
    });
  });
});
