/// <reference types="cypress" />

/**
 * Homepage hero and primary calls to action.
 */
describe("Homepage", () => {
  it("should load the homepage", () => {
    cy.visit("/");
    cy.contains("h1", "Amp'd Resume").should("be.visible");
    cy.contains("a", "Start building free").should("be.visible");
  });
});
