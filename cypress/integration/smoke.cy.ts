// cypress/e2e/smoke.cy.ts
describe("Smoke Test", () => {
  before(() => {
    cy.task("cleanupMagicLinks");
  });

  it("should load the homepage", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");
    cy.wait(1000);
    cy.contains("h1", "OpenResume").should("be.visible");
  });

  // it("should navigate to login page", () => {
  //   cy.visit(Cypress.env("BASE_URL") || "/");
  //   cy.get("[data-cy=login-button]").click();
  //   cy.url().should("include", "/login");
  // });

  // it("should sign in using magic link", () => {
  //   // Visit login page
  //   cy.visit(`${Cypress.env("BASE_URL") || ""}/login`);

  //   // Enter email for magic link
  //   const testEmail = Cypress.env("TEST_EMAIL") as string;
  //   cy.get("[data-cy=email-input]").type(testEmail);
  //   cy.get("[data-cy=submit-login]").click();

  //   // Wait for magic link email to be sent
  //   cy.contains("Check your email").should("be.visible");

  //   // Allow some time for the email to be sent and file to be written
  //   cy.wait(2000);

  //   // Retrieve magic link from the file system
  //   cy.task<string>("getMagicLink", { email: testEmail }).then((magicLink) => {
  //     // Visit the magic link to complete authentication
  //     cy.visit(magicLink);

  //     // Verify successful login
  //     cy.url().should("include", "/dashboard");
  //     cy.contains("Welcome back").should("be.visible");
  //   });
  // });

  // it("should access protected account area", () => {
  //   // Assuming we're already logged in from previous test
  //   cy.visit(`${Cypress.env("BASE_URL") || ""}/account`);
  //   cy.contains("Account settings").should("be.visible");

  //   // Add your account area tests here
  //   cy.get("[data-cy=profile-section]").should("exist");
  //   // More assertions...
  // });
});
