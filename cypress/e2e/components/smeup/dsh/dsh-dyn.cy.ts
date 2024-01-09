describe("DSH dynamisms", () => {
  it(`Check click of kup-card-list with dynamism`, function () {
    cy.login("F(EXD;*SCO;) 2(MB;SCP_SCH;WETEST_DSH) 4(;;DYNA)");
    cy.get("[data-cy='lab']").should("not.exist");

    cy.get("kup-card-list").should("have.length", "1").first().click();

    cy.get("[data-cy='lab']")
      .should("have.length", 1)
      .children()
      .should("have.length", "7");

    let decSeparator = "[not set]";
    cy.document().then(doc => {
      const kupManager = (doc.documentElement as any).ketchup;

      expect(kupManager).to.not.be.null;
      decSeparator = kupManager.math.decimalSeparator();
      cy.log(
        "current browser decimal separator is [" +
          decSeparator +
          "], from kupManager.math.decimalSeparator()",
      );

      /** using kup-card-list html children tag values... */
      cy.get("kup-card-list")
        .first()
        .find(".value-int")
        .should("have.length", "1")
        .first()
        .then(c => {
          /**
           * visible value is formatted by browser decimal separator
           * the value sent to label through the dynamism is the value contained in smeupObject,
           * which has ',' as decimal separator */
          const textWithDecSep = c.text().replace(decSeparator, ",");
          const testWithoutDecSep = textWithDecSep
            .replace(/\./, "")
            .replace(/,/, "");
          cy.get("[data-cy='lab']")
            .children()
            .first()
            .should("contain.text", textWithDecSep)
            .next()
            .should("contain.text", testWithoutDecSep);
        });

      cy.get("kup-card-list")
        .first()
        .find(".value-dec")
        .should("have.length", "1")
        .first()
        .then(c => {
          const text = c.text();
          cy.get("[data-cy='lab']")
            .children()
            .first()
            .next()
            .next()
            .should("contain.text", text);
        });

      cy.get("kup-card-list")
        .first()
        .find(".unit")
        .should("have.length", "1")
        .first()
        .then(c => {
          const text = c.text();
          cy.get("[data-cy='lab']")
            .children()
            .first()
            .next()
            .next()
            .next()
            .should("contain.text", text);
        });
    });

    /** using kup-card-list.data properties values... */
    cy.get("kup-card-list").then($el => {
      const data = $el.prop("data");

      const intValue = data.rows[0].cells[$el.prop("intvalueCol")].value;
      const decValue = data.rows[0].cells[$el.prop("decvalueCol")].value;
      const unitValue = data.rows[0].cells[$el.prop("measureCol")].value;
      const descrValue = data.rows[0].cells[$el.prop("descrCol")].value;
      const groupValue = "";
      const iconValue = data.rows[0].cells[$el.prop("iconCol")].obj.k;

      cy.get("[data-cy='lab']")
        .should("have.length", 1)
        .children()
        .should("have.length", "7")
        .first()
        .should("contain.text", intValue)
        .should("contain.text", decValue)
        .next()
        .should("contain.text", intValue)
        .next()
        .should("contain.text", decValue)
        .next()
        .should("contain.text", unitValue)
        .next()
        .should("contain.text", descrValue)
        .next()
        .should("contain.text", iconValue)
        .next()
        .should("contain.text", groupValue);
    });

    // cy.get("[data-cy='lab']")
    //   .should("have.length", 1)
    //   .children()
    //   .should("have.length", "7")
    //   .first()
    //   .should("contain.text", "Valore: 15,86")
    //   .next()
    //   .should("contain.text", "Valore intero: 15")
    //   .next()
    //   .should("contain.text", "Valore decimale: 86")
    //   .next()
    //   .should("contain.text", "Unità di misura: %")
    //   .next()
    //   .should("contain.text", "Descrizione: ")
    //   .next()
    //   .should("contain.text", "Icona: VO;COD_SOS;000163")
    //   .next()
    //   .should("contain.text", "Gruppo: ");
  });
});
