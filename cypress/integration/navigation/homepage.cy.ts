/// <reference types="cypress" />

/**
 * Homepage hero and primary calls to action.
 */
describe("Homepage", () => {
  it("should load the homepage", () => {
    cy.visit(Cypress.expose("BASE_URL") || "/");
    cy.wait(1000);
    cy.contains("h1", "Amp'd Resume").should("be.visible");
    cy.contains("a", "Start building free").should("be.visible");
  });
});
