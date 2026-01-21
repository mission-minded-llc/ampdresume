/// <reference types="cypress" />

/**
 * The Certifications section allows users to add, edit, and delete certifications.
 */
describe("Certifications Section", () => {
  before(() => {
    cy.loginWithMagicLink();
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
  });

  it("should access protected certifications section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/certifications`);
    cy.contains("Your Certifications").should("be.visible");
  });

  it("should add a certification", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/certifications`);

    const certificationName = "AWS Certified Solutions Architect";
    const issuer = "Amazon Web Services";
    const credentialUrl = "https://www.credly.com/badges/abc123";
    const credentialId = "ABC-123-XYZ";

    cy.get("button").contains("Add Certification").click();
    cy.get(".MuiDialog-container input[name='name']").type(certificationName);
    cy.get(".MuiDialog-container input[name='issuer']").type(issuer);
    cy.get(".MuiDialog-container input[name='credentialUrl']").type(credentialUrl);
    cy.get(".MuiDialog-container input[name='credentialId']").type(credentialId);

    // Select the date awarded.
    cy.get(".MuiDialog-container input[name='dateAwarded']")
      .parent()
      .find('[role="spinbutton"][aria-label="Month"]')
      .click()
      .clear()
      .type("March");
    cy.get(".MuiDialog-container input[name='dateAwarded']")
      .parent()
      .find('[role="spinbutton"][aria-label="Year"]')
      .click()
      .clear()
      .type("2023");

    cy.get(".MuiDialog-container button").contains("Save Certification").click();
    cy.contains(certificationName).should("be.visible");
    cy.contains(issuer).should("be.visible");
    cy.contains("March 2023").should("be.visible");
  });

  it("should add a certification without optional fields", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/certifications`);

    const certificationName = "Google Cloud Professional";
    const issuer = "Google Cloud Platform";

    cy.get("button").contains("Add Certification").click();
    cy.get(".MuiDialog-container input[name='name']").type(certificationName);
    cy.get(".MuiDialog-container input[name='issuer']").type(issuer);

    // Select the date awarded.
    cy.get(".MuiDialog-container input[name='dateAwarded']")
      .parent()
      .find('[role="spinbutton"][aria-label="Month"]')
      .click()
      .clear()
      .type("June");
    cy.get(".MuiDialog-container input[name='dateAwarded']")
      .parent()
      .find('[role="spinbutton"][aria-label="Year"]')
      .click()
      .clear()
      .type("2022");

    cy.get(".MuiDialog-container button").contains("Save Certification").click();
    cy.contains(certificationName).should("be.visible");
    cy.contains(issuer).should("be.visible");
    cy.contains("June 2022").should("be.visible");
  });

  it("should edit a certification", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/certifications`);

    const certificationName = "AWS Certified Solutions Architect";
    const updatedIssuer = "Amazon Web Services Inc.";
    const updatedCredentialUrl = "https://www.credly.com/badges/xyz789";
    const updatedCredentialId = "XYZ-789-ABC";

    cy.contains(certificationName).click();
    cy.get(".Mui-expanded input[name='issuer']").clear().type(updatedIssuer);
    cy.get(".Mui-expanded input[name='credentialUrl']").clear().type(updatedCredentialUrl);
    cy.get(".Mui-expanded input[name='credentialId']").clear().type(updatedCredentialId);

    // Select the date awarded.
    cy.get(".Mui-expanded input[name='dateAwarded']")
      .parent()
      .find('[role="spinbutton"][aria-label="Month"]')
      .click()
      .clear()
      .type("April");
    cy.get(".Mui-expanded input[name='dateAwarded']")
      .parent()
      .find('[role="spinbutton"][aria-label="Year"]')
      .click()
      .clear()
      .type("2024");

    cy.get(".Mui-expanded button").contains("Save Certification").click();

    cy.contains(updatedIssuer).should("be.visible");
    cy.contains("April 2024").should("be.visible");
  });

  it("should delete a certification", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/certifications`);

    const certificationName = "AWS Certified Solutions Architect";

    cy.contains(certificationName).click();
    cy.get(".Mui-expanded button").contains("Delete Certification").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.contains(certificationName).should("not.exist");
  });

  it("should delete a certification without optional fields", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/certifications`);

    const certificationName = "Google Cloud Professional";

    cy.contains(certificationName).click();
    cy.get(".Mui-expanded button").contains("Delete Certification").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.contains(certificationName).should("not.exist");
  });
});
