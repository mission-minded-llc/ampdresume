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

  it("should browse literary and industry sample resumes", () => {
    cy.visit("/");
    cy.contains("h2", "Example resumes").scrollIntoView();
    cy.contains("Maya Chen").should("be.visible");
    cy.contains("a", "Maya Chen").should("have.attr", "href", "/r/maya-chen");

    cy.contains('[role="tab"]', "Literary").click();
    cy.contains("Sherlock Holmes").should("be.visible");
    cy.contains("a", "Sherlock Holmes").should("have.attr", "href", "/r/sherlock-holmes");
    cy.contains("Maya Chen").should("not.exist");

    cy.contains('[role="tab"]', "Investment Banking").click();
    cy.contains("Helena Voss").should("be.visible");
    cy.contains("a", "Helena Voss").should("have.attr", "href", "/r/helena-voss");
  });
});
