/// <reference types="cypress" />

const themes = ["default", "davids", "retro-80s"] as const;

describe("Demo themes", () => {
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
});
