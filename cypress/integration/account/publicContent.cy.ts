/// <reference types="cypress" />

import { cypressSpecEmail, cypressSpecSlug } from "../../../src/lib/cypressTestAccount";

/**
 * A filled-in resume shows on the public page, the JSON export, and the PDF theme picker.
 */
describe("Public resume content", () => {
  const testEmail = cypressSpecEmail(Cypress.spec.relative);
  const testSlug = cypressSpecSlug(Cypress.spec.relative);
  const displayName = "Cypress Public Content";
  const summary = "Public summary for the Cypress resume.";
  const companyName = "Public Content Labs";
  const positionTitle = "Public Engineer";
  const school = "Public University";
  const certificationName = "Public Certification";

  before(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("input[name='name']").clear().type(displayName);
    cy.get("input[name='slug']").clear().type(testSlug);
    cy.get("input[name='displayEmail']").clear().type(testEmail);
    cy.get("input[name='title']").clear().type("Content Tester");
    cy.get("input[name='location']").clear().type("Public City");
    cy.get("[data-testid='ProfessionalSummaryEditor'] [contenteditable='true']")
      .click()
      .type(summary);
    cy.intercept("POST", "/api/account").as("saveAccount");
    cy.get("[data-testid='AccountFormSaveButton']").click();
    cy.wait("@saveAccount").its("response.statusCode").should("eq", 200);

    cy.visit("/edit/skills");
    cy.skipOnboardingIfPresent();
    cy.get("input[name='searchSkills']").type("JavaScript");
    cy.get("span").contains("JavaScript").click();
    cy.get("input[name='autoCalculate']").uncheck();
    cy.get("input[name='totalYears']").clear().type("4");
    cy.get("button").contains("Add Skill").click();
    cy.get("button").contains("JavaScript").should("be.visible");

    cy.visit("/edit/experience");
    cy.skipOnboardingIfPresent();
    cy.get("button").contains("Add New Company").click();
    cy.get(".MuiDialog-container input[name='companyName']").type(companyName);
    cy.get(".MuiDialog-container input[name='location']").type("Public City");
    cy.fillMonthYear(".MuiDialog-container", "dateStarted", "January", "2022");
    cy.fillMonthYear(".MuiDialog-container", "dateEnded", "June", "2024");
    cy.get(".MuiDialog-container button").contains("Save Company").click();
    cy.get("h3").contains(companyName).click();
    cy.get("button").contains("Add New Position").click();
    cy.get(".position-form input[name='positionTitle']").type(positionTitle);
    cy.fillMonthYear(".position-form", "dateStarted", "January", "2022");
    cy.fillMonthYear(".position-form", "dateEnded", "June", "2024");
    cy.get("button").contains("Save Position").click();
    cy.get("h3").contains(positionTitle).should("be.visible");

    cy.visit("/edit/education");
    cy.skipOnboardingIfPresent();
    cy.get("button").contains("Add Education").click();
    cy.get(".MuiDialog-container input[name='school']").type(school);
    cy.get(".MuiDialog-container input[name='degree']").type("B.S. Testing");
    cy.fillMonthYear(".MuiDialog-container", "dateAwarded", "May", "2018");
    cy.get(".MuiDialog-container button").contains("Save Education").click();
    cy.contains(school).should("be.visible");

    cy.visit("/edit/certifications");
    cy.skipOnboardingIfPresent();
    cy.get("button").contains("Add Certification").click();
    cy.get(".MuiDialog-container input[name='name']").type(certificationName);
    cy.get(".MuiDialog-container input[name='issuer']").type("Cypress Institute");
    cy.fillMonthYear(".MuiDialog-container", "dateAwarded", "March", "2023");
    cy.get(".MuiDialog-container button").contains("Save Certification").click();
    cy.contains(certificationName).should("be.visible");

    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();
    cy.get("input[name='newSocialUrl']").clear().type("github.com/cypress-public-content");
    cy.contains("button", "Add Social").click();
    cy.get("[data-testid^='social-icon-']").should("have.length", 1);
  });

  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should render the saved resume on the public page", () => {
    cy.visit(`/r/${testSlug}`);
    cy.contains(displayName).should("be.visible");
    cy.contains("Content Tester").should("be.visible");
    cy.contains("Public City").should("be.visible");
    cy.contains(summary).should("be.visible");
    cy.contains("JavaScript").should("be.visible");
    cy.contains(companyName).should("be.visible");
    cy.contains(positionTitle).should("be.visible");
    cy.contains(school).should("be.visible");
    cy.contains(certificationName).should("be.visible");
    cy.get("a[aria-label^='GitHub profile']")
      .should("have.attr", "href")
      .and("include", "cypress-public-content");
  });

  it("should publish a JSON resume without the login email", () => {
    cy.request(`/r/${testSlug}/json`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user.name).to.eq(displayName);
      expect(response.body.user.email).to.eq(undefined);
      expect(response.body.user.displayEmail).to.eq(undefined);
      expect(JSON.stringify(response.body.experience)).to.include(companyName);
      expect(JSON.stringify(response.body.education)).to.include(school);
    });

    cy.request({ url: "/r/not-a-real-resume-slug/json", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });

  it("should save a PDF theme without changing the public page", () => {
    const selectPdfTheme = (label: string) => {
      cy.get("[data-testid=owner-theme-picker] [role=combobox]").click();
      cy.get('[role="listbox"]').should("be.visible").contains(label).click();
    };

    cy.visit(`/r/${testSlug}/pdf`);
    cy.contains(displayName).should("be.visible");

    selectPdfTheme("Times");
    cy.get("[data-testid=pdf-theme-times]").should("exist");
    cy.aliasGraphql("updateUser");
    cy.get("[data-testid=owner-theme-picker]").contains("button", "Save").click();
    cy.wait("@updateUser").then((interception) => {
      expect(interception.request.body.variables.pdfThemeName).to.eq("times");
      expect(interception.response?.statusCode).to.eq(200);
    });

    cy.reload();
    cy.get("[data-testid=owner-theme-picker] [role=combobox]").should("contain", "Times");
    cy.get("[data-testid=pdf-theme-times]").should("exist");

    selectPdfTheme("Legal");
    cy.get("[data-testid=pdf-theme-legal]").should("exist");

    cy.visit(`/r/${testSlug}`);
    cy.get("[data-testid=resume-theme-default]").should("exist");
    cy.contains("Share Your Resume").should("not.exist");
  });

  it("should show a share code on David's theme", () => {
    cy.visit(`/r/${testSlug}`);
    cy.get("[data-testid=owner-theme-picker] [role=combobox]").click();
    cy.get('[role="listbox"]').contains("David's Theme").click();
    cy.get("img[alt='QR Code to share resume']").should("be.visible");
    cy.contains("button", "Download QR Code").should("be.visible");
    cy.contains("Scan with your phone to view this resume").should("be.visible");
  });
});
