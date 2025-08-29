/// <reference types="cypress" />

describe("Primary Nav Menu", () => {
  it(`should visit 'default' theme`, () => {
    cy.visit("/");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuDemoThemes]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuDemoThemes]").click();
    cy.get(`a[href='/demo/default']`).click();
    cy.url().should("include", `/demo/default`);
  });
});
