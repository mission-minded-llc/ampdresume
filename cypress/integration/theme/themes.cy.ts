/// <reference types="cypress" />

const themes = ["default", "davids"] as const;

describe("Demo themes", () => {
  themes.forEach((theme) => {
    it(`should visit '${theme}' theme from the nav`, () => {
      cy.visit("/");
      cy.get("[data-testid=NavPrimaryMenuIcon]").click();
      cy.get("[data-testid=NavPrimaryMenuDemoThemes]").should("be.visible").click();
      cy.get(`a[href='/demo/${theme}']`).click();
      cy.url().should("include", `/demo/${theme}`);
    });
  });
});
