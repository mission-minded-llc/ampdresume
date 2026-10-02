/// <reference types="cypress" />

describe("Demo PDF views", () => {
  const themes = ["default", "davids", "retro-80s", "times", "legal"] as const;

  themes.forEach((theme) => {
    it(`should load the '${theme}' demo PDF page`, () => {
      cy.visit(`/demo/${theme}/pdf`);
      cy.contains("Generate PDF").should("be.visible");
    });
  });

  it("should switch the Times print layout and start generating a PDF", () => {
    cy.visit("/demo/times/pdf");
    cy.get("[data-testid=pdf-theme-times]").should("exist");
    cy.contains("Taylor Everglow").should("be.visible");

    cy.visit("/demo/default/pdf", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("pdfWindow");
      },
    });
    cy.get("[data-testid=owner-theme-picker] [role=combobox]").click();
    cy.get('[role="listbox"]').contains("Times").click();
    cy.get("[data-testid=pdf-theme-times]").should("exist");
    cy.get('[role="listbox"]').should("not.exist");

    cy.get("[data-testid=owner-theme-picker] [role=combobox]").click();
    cy.get('[role="listbox"]').contains("Legal").click();
    cy.get("[data-testid=pdf-theme-legal]").should("exist");

    cy.contains("button", "Generate PDF").should("be.enabled");
    cy.contains("button", "Generate PDF").click();
    cy.get("@pdfWindow", { timeout: 30000 }).should("have.been.called");
  });
});
