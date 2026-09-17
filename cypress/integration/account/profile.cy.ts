/// <reference types="cypress" />

import { cypressSpecEmail, cypressSpecSlug } from "../../../src/lib/cypressTestAccount";

/**
 * The Profile section is a simple section that allows users to edit their personal information
 * including their name, slug, email, title, location, professional summary, site title, and site
 * description.
 */
describe("Profile Section", () => {
  const testEmail = cypressSpecEmail(Cypress.spec.relative);
  const testSlug = cypressSpecSlug(Cypress.spec.relative);
  const saveButton = "[data-testid='AccountFormSaveButton']";

  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();
  });

  it("should access protected profile section", () => {
    cy.contains("Profile").should("be.visible");
  });

  it("should populate profile data and save", () => {
    const fields = [
      { name: "name", value: " Test User" },
      { name: "slug", value: testSlug },
      { name: "displayEmail", value: testEmail },
      { name: "title", value: "Professional Tester " },
      { name: "location", value: " Test City, Test State " },
      { name: "siteTitle", value: " Test SEO Site Title" },
      { name: "siteDescription", value: " Test SEO Site Description   " },
      { name: "summaryTitle", value: " About Me " },
    ];

    fields.forEach((field) => {
      cy.get(`input[name='${field.name}']`).clear().type(field.value, { delay: 25 });
    });

    cy.get("[data-testid='ProfessionalSummaryEditor'] [contenteditable='true']")
      .click()
      .type("A concise professional summary for testing.");

    cy.intercept("POST", "/api/account").as("saveAccount");
    cy.get(saveButton).click();
    cy.wait("@saveAccount").its("response.statusCode").should("eq", 200);
    cy.reload();
    cy.closeMessageDialog();

    fields.forEach((field) => {
      cy.get(`input[name='${field.name}']`).should("have.value", field.value.trim());
    });
    cy.get("[data-testid='ProfessionalSummaryEditor']").should(
      "contain",
      "A concise professional summary for testing.",
    );
  });

  it("should encounter slug validation error", () => {
    const slugErrorMessage = "Slug must be alphanumeric and lowercase. Hyphens allowed.";

    cy.contains(slugErrorMessage).should("not.exist");
    cy.get("input[name='slug']").clear().type("test user");
    cy.get(saveButton).click();

    cy.contains(slugErrorMessage).should("be.visible");

    cy.get("input[name='slug']").clear().type(testSlug);
    cy.contains(slugErrorMessage).should("not.exist");

    cy.get(saveButton).click();
  });

  it("should encounter email validation error", () => {
    cy.contains("Invalid email address").should("not.exist");
    cy.get("input[name='displayEmail']")
      .clear()
      .type(testEmail.substring(0, testEmail.length - 4));

    cy.get(saveButton).click();
    cy.contains("Invalid email address").should("be.visible");

    cy.get("input[name=displayEmail]").type(".org");
    cy.get(saveButton).click();
    cy.contains("Invalid email address").should("not.exist");
  });

  it("should successfully delete account and redirect to homepage", () => {
    cy.contains("Profile").should("be.visible");
    cy.contains("General Information").should("be.visible");
    cy.contains("Danger Zone").should("be.visible");

    cy.get("button")
      .contains("Delete Account")
      .should("not.be.disabled")
      .should("be.visible")
      .click();

    cy.contains('[role="dialog"]', "Delete Account").within(() => {
      cy.get("input[type='checkbox']").check();
      cy.contains("button", "Yes, Delete My Account").should("not.be.disabled").click();
    });

    cy.location("pathname").should("eq", "/");

    cy.visit("/edit/profile");
    cy.url().should("not.include", "/edit/profile");
  });
});
