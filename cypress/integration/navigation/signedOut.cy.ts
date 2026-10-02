/// <reference types="cypress" />

/**
 * Resume and recruiter routes stay closed until someone signs in.
 */
describe("Signed-out access", () => {
  it("should send a visitor to sign in before editing a resume", () => {
    cy.visit("/edit/profile");
    cy.location("pathname").should("eq", "/login");
    cy.location("search").should("include", "callbackUrl").and("include", "profile");

    cy.visit("/edit/skills");
    cy.location("pathname").should("eq", "/login");
    cy.location("search").should("include", "skills");

    cy.visit("/edit/experience");
    cy.location("pathname").should("eq", "/login");
    cy.location("search").should("include", "experience");
  });

  it("should send a visitor from the recruiter link to login", () => {
    cy.visit("/");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuRecruiter]").click();
    cy.location("pathname").should("eq", "/login");
    cy.location("search").should("include", "callbackUrl").and("include", "recruit");
  });
});
