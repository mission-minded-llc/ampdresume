describe("Delete Account", () => {
  before(() => {
    cy.loginWithMagicLink();
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
  });

  it("should successfully delete account and redirect to homepage", () => {
    // Visit the profile page
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);

    // Wait for the page to load and ensure we're on the profile page
    cy.contains("Profile").should("be.visible");
    cy.contains("General Information").should("be.visible");

    // Close any message dialogs that might appear
    cy.closeMessageDialog();

    // Scroll to the bottom to find the Danger Zone section
    cy.contains("Danger Zone").should("be.visible");

    // Find and click the Delete Account button
    cy.contains("button", "Delete Account").click();

    // Verify the confirmation dialog appears
    cy.contains("Delete Account").should("be.visible");

    // Check all the required checkboxes
    cy.contains("Your profile and all resume information")
      .parent()
      .find("input[type='checkbox']")
      .check();
    cy.contains("Your authentication history").parent().find("input[type='checkbox']").check();
    cy.contains("All associated data").parent().find("input[type='checkbox']").check();

    // Verify the confirm button is now enabled
    cy.contains("button", "Yes, Delete My Account").should("not.be.disabled");

    // Click the confirm button to delete the account
    cy.contains("button", "Yes, Delete My Account").click();

    // Wait for the deletion process to complete
    cy.contains("Deleting account...").should("be.visible");

    // Wait for the redirect to complete
    cy.url().should("eq", `${Cypress.env("BASE_URL") || ""}/`);

    // Verify we're on the homepage (should not be logged in anymore)
    cy.contains("Profile").should("not.exist");

    // Verify the user is no longer authenticated by trying to access a protected route
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);
    cy.url().should("not.include", "/edit/profile");
  });
});
