describe("Profile Section", () => {
  const testEmail = "test@ampdresume.com";
  const saveButton = "[data-testid='AccountFormSaveButton']";

  before(() => {
    cy.loginWithMagicLink();
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
  });

  it("should access protected profile section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);
    cy.contains("Profile").should("be.visible");
  });

  it("should populate profile data and save", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);

    cy.closeMessageDialog({ required: true });

    const fields = [
      { name: "name", value: " Test User" },
      { name: "slug", value: "test-user" },
      { name: "displayEmail", value: testEmail },
      { name: "title", value: "Professional Tester " },
      { name: "location", value: " Test City, Test State " },
      { name: "siteTitle", value: " Test SEO Site Title" },
      { name: "siteDescription", value: " Test SEO Site Description   " },
    ];

    fields.forEach((field) => {
      cy.get(`input[name='${field.name}']`)
        .clear({ force: true })
        .type(field.value, { force: true, delay: 25 });
    });

    const saveButton = "[data-testid='AccountFormSaveButton']";
    cy.get(saveButton).click();

    cy.wait(1000); // Give it a second to save.
    cy.reload();

    // Ensure that the fields are populated with the saved data, minus extra leading or trailing spaces.
    fields.forEach((field) => {
      cy.get(`input[name='${field.name}']`).should("have.value", field.value.trim());
    });
  });

  it("should encounter slug validation error", () => {
    const slugErrorMessage = "Slug must be alphanumeric and lowercase. Hyphens allowed.";

    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);

    cy.contains(slugErrorMessage).should("not.exist");
    cy.get("input[name='slug']").clear({ force: true }).type("test user");
    cy.get(saveButton).click();

    cy.get("[id='alert-dialog-description']").contains(slugErrorMessage).should("be.visible");
    cy.get("button").contains("OK").click();

    cy.get("input[name=slug]").clear({ force: true }).type("test-user");
    cy.contains(slugErrorMessage).should("not.exist");

    cy.get(saveButton).click();
  });

  it("should encounter email validation error", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);

    cy.contains("Invalid email address").should("not.exist");
    cy.get("input[name='displayEmail']")
      .clear({ force: true })
      .type(testEmail.substring(0, testEmail.length - 4)); // Remove the ".org" suffix.

    cy.get(saveButton).click();
    cy.contains("Invalid email address").should("be.visible");

    cy.get("input[name=displayEmail]").type(".org"); // Adds missing suffix.
    cy.get(saveButton).click();
    cy.contains("Invalid email address").should("not.exist");
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
    cy.get("button").contains("Delete Account").click();

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
