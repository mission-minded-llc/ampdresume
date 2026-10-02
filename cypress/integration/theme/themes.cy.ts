/// <reference types="cypress" />

describe("Demo themes", () => {
  const themes = ["default", "davids", "retro-80s", "legal"] as const;

  themes.forEach((theme) => {
    it(`should visit '${theme}' theme from the nav`, () => {
      cy.visit("/");
      cy.get("[data-testid=NavPrimaryMenuIcon]").click();
      cy.get("[data-testid=NavPrimaryMenuDemoThemes]").should("be.visible");
      // Expanding the submenu re-renders this ListItem (ExpandMore → ExpandLess),
      // so force the click instead of waiting for the original node to stay attached.
      cy.get("[data-testid=NavPrimaryMenuDemoThemes]").click({ force: true });
      cy.get(`a[href='/demo/${theme}']`).should("be.visible");
      cy.get(`a[href='/demo/${theme}']`).click();
      cy.url().should("include", `/demo/${theme}`);
    });
  });

  it("should show the route sample and switch layouts from the page", () => {
    cy.visit("/demo/default");
    cy.contains("Taylor Everglow").should("be.visible");
    cy.contains("Insert Coin").should("not.exist");

    cy.get("[data-testid=owner-theme-picker] [role=combobox]").click();
    cy.get('[role="listbox"]').contains("Retro 80s").click();
    cy.url().should("include", "/demo/default");
    cy.contains("Taylor Everglow").should("be.visible");
    cy.contains("Insert Coin").should("be.visible");

    cy.visit("/demo/legal");
    cy.get("[data-testid=theme-legal]").should("exist");
    cy.contains("Danielle Okoye").should("be.visible");
    cy.contains("Corporate Associate").should("be.visible");

    cy.visit("/demo/retro-80s");
    cy.contains("Taylor Everglow").should("be.visible");
    cy.contains("Insert Coin").should("be.visible");
  });
});
