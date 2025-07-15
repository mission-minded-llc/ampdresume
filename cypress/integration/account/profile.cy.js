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
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);

    cy.contains("Profile").should("be.visible");
    cy.contains("General Information").should("be.visible");

    cy.closeMessageDialog();

    cy.contains("Danger Zone").should("be.visible");

    cy.get("button")
      .contains("Delete Account")
      .should("not.be.disabled")
      .should("be.visible")
      .click({ force: true });

    // Check all the required checkboxes to delete the account.
    cy.get("input[type='checkbox']").check({ force: true });

    cy.get("button").contains("Yes, Delete My Account").should("not.be.disabled").click();

    cy.contains("Deleting account...").should("be.visible");

    // Deleting the account will redirect to the homepage.
    cy.url().should("eq", `${Cypress.env("BASE_URL") || ""}/`);

    // Verify the user is no longer authenticated by trying to access a protected route.
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);
    cy.url().should("not.include", "/edit/profile");
  });
});
