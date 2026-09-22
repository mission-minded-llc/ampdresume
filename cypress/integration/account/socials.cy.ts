/// <reference types="cypress" />

import { cypressSpecEmail } from "../../../src/lib/cypressTestAccount";

/**
 * Social links live on the profile page and appear on the public resume.
 */
describe("Social links", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.task("clearSocials", { email: cypressSpecEmail(Cypress.spec.relative) });
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();
  });

  it("should add, edit, and delete a social link", () => {
    cy.contains("Social Media Links").scrollIntoView().should("be.visible");
    cy.get("[data-testid^='social-icon-']").should("not.exist");

    cy.aliasGraphql("addSocial");
    cy.get("input[name='newSocialUrl']").clear().type("github.com/cypress-socials");
    cy.contains("button", "Add Social").click();
    cy.wait("@addSocial");

    cy.get("[data-testid^='social-icon-']").should("have.length", 1).click();
    cy.contains("Edit Social").should("be.visible");
    cy.contains("github.com/cypress-socials").should("be.visible");

    cy.aliasGraphql("updateSocial");
    cy.get(".MuiDialog-container input").clear().type("cypress-socials-updated");
    cy.get(".MuiDialog-container button").contains("Save").click();
    cy.wait("@updateSocial");

    cy.get("[data-testid^='social-icon-']").click();
    cy.contains("github.com/cypress-socials-updated").should("be.visible");

    cy.aliasGraphql("deleteSocial");
    cy.get(".MuiDialog-container").filter(":visible").contains("button", "Delete").click({
      force: true,
    });
    cy.contains("button", "Yes, Delete").click({ force: true });
    cy.wait("@deleteSocial");

    cy.get("[data-testid^='social-icon-']").should("not.exist");
  });

  it("should show a validation error for an invalid URL", () => {
    cy.get("input[name='newSocialUrl']").clear().type("github.com/");
    cy.contains("button", "Add Social").click();
    cy.contains("Error adding social, please check the URL.").should("be.visible");
  });
});
