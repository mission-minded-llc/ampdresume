/// <reference types="cypress" />

/**
 * The primary navigation menu is the top navigation menu that appears on every page. It contains
 * links to the homepage, login, and logout, etc. Should be tested for all pages.
 */
describe("Primary Nav Menu", () => {
  it("should navigate to login page from nav", () => {
    cy.visit("/");

    cy.get("[data-testid=NavPrimaryMenuLogin]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuLogin]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuLogin]").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to homepage from nav", () => {
    cy.visit("/login");

    cy.get("[data-testid=NavPrimaryMenuHome]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuHome]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuHome]").click();

    cy.location("pathname").should("eq", "/");
  });

  it("should NOT show protected links when NOT logged in", () => {
    cy.visit("/");

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuViewResume]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuEditResume]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuLogout]").should("not.exist");
  });

  it("should show protected links when logged in", () => {
    cy.loginWithMagicLink();
    cy.visit("/");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog({ required: false });

    cy.get("[data-testid=NavPrimaryMenuIcon]").should("be.visible").click();
    cy.get("[data-testid=NavPrimaryMenuEditResume]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuLogout]").scrollIntoView().should("be.visible");
  });
});
