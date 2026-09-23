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
    cy.contains("PDF Theme").should("not.exist");

    cy.visit(`/r/${testSlug}/pdf`);
    cy.contains("Generate PDF").should("be.visible");
    cy.contains(displayName).should("be.visible");
    cy.get("[data-testid=owner-theme-picker]").should("be.visible");
    cy.contains("PDF Theme").should("be.visible");
  });

  it("should save a web theme change and persist it after reload", () => {
    const selectTheme = (label: string) => {
      cy.get("[data-testid=owner-theme-picker] [role=combobox]").click();
      cy.get('[role="listbox"]').should("be.visible").contains(label).click();
    };

    const saveTheme = (webThemeName: string) => {
      cy.aliasGraphql("updateUser");
      cy.get("[data-testid=owner-theme-picker]").contains("button", "Save").click();
      cy.wait("@updateUser").then((interception) => {
        expect(interception.request.body.variables.webThemeName).to.eq(webThemeName);
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.data.updateUser.webThemeName).to.eq(webThemeName);
      });
    };

    cy.visit(`/r/${testSlug}`);
    cy.get("[data-testid=owner-theme-picker]").should("be.visible");

    selectTheme("Classic");
    cy.get("[data-testid=resume-theme-default]").should("exist");
    cy.contains("Insert Coin").should("not.exist");
    cy.contains("Share Your Resume").should("not.exist");

    selectTheme("Retro 80s");
    cy.get("[data-testid=resume-theme-retro-80s]").should("exist");
    cy.contains("Insert Coin").should("be.visible");

    saveTheme("retro-80s");
    cy.reload();
    cy.get("[data-testid=owner-theme-picker] [role=combobox]").should("contain", "Retro 80s");
    cy.get("[data-testid=resume-theme-retro-80s]").should("exist");
    cy.contains("Insert Coin").should("be.visible");

    selectTheme("David's Theme");
    cy.get("[data-testid=resume-theme-davids]").should("exist");
    cy.contains("Share Your Resume").should("be.visible");
    cy.contains("Insert Coin").should("not.exist");

    saveTheme("davids");
    cy.reload();
    cy.get("[data-testid=owner-theme-picker] [role=combobox]").should("contain", "David's Theme");
    cy.get("[data-testid=resume-theme-davids]").should("exist");
    cy.contains("Share Your Resume").should("be.visible");
  });
});
