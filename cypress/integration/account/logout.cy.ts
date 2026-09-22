/// <reference types="cypress" />

/**
 * Signed-in users can sign out from the primary nav.
 */
describe("Logout", () => {
  it("should sign out from the nav and hide protected links", () => {
    cy.loginWithMagicLink();
    cy.visit("/");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog({ required: false });

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuLogout]")
      .should("be.visible")
      .parent("a")
      .should("have.attr", "href", "/api/auth/signout");
    cy.visit("/logout");

    cy.location("pathname", { timeout: 15000 }).should("eq", "/");

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuLogin]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuEditResume]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuLogout]").should("not.exist");
  });
});
