/// <reference types="cypress" />

import { cypressSpecEmail, cypressSpecSlug } from "../../../src/lib/cypressTestAccount";

/**
 * Public resume and PDF routes after the owner claims a slug.
 */
describe("Public resume", () => {
  const testEmail = cypressSpecEmail(Cypress.spec.relative);
  const testSlug = cypressSpecSlug(Cypress.spec.relative);
  const displayName = "Cypress Public User";

  before(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("input[name='name']").clear().type(displayName);
    cy.get("input[name='slug']").clear().type(testSlug);
    cy.get("input[name='displayEmail']").clear().type(testEmail);
    cy.get("input[name='title']").clear().type("E2E Resume Tester");

    cy.intercept("POST", "/api/account").as("saveAccount");
    cy.get("[data-testid='AccountFormSaveButton']").click();
    cy.wait("@saveAccount").its("response.statusCode").should("eq", 200);
  });

  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should open the public resume from the nav", () => {
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuViewResume]").should("be.visible").click();
    cy.url().should("include", `/r/${testSlug}`);
    cy.contains(displayName).should("be.visible");
    cy.contains("E2E Resume Tester").should("be.visible");
  });

  it("should render the public resume and PDF pages", () => {
    cy.visit(`/r/${testSlug}`);
    cy.contains(displayName).should("be.visible");

    cy.visit(`/r/${testSlug}/pdf`);
    cy.contains("Generate PDF").should("be.visible");
    cy.contains(displayName).should("be.visible");
  });
});
