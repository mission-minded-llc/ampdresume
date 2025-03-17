describe("Profile Section", () => {
  before(() => {
    cy.loginWithMagicLink();

    cy.getCookie("next-auth.session-token").then((cookie) => {
      Cypress.env("sessionToken", cookie?.value || "");
    });

    cy.getCookie("next-auth.csrf-token").then((cookie) => {
      Cypress.env("csrfToken", cookie?.value || "");
    });
  });

  it("should access protected profile section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);
    cy.contains("Profile").should("be.visible");
  });

  it("should populate profile data and save", () => {
    cy.setCookie("next-auth.session-token", Cypress.env("sessionToken") || "");
    cy.setCookie("next-auth.csrf-token", Cypress.env("csrfToken") || "");

    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);

    const fields = [
      { name: "name", value: " Test User" },
      { name: "slug", value: "test-user" },
      { name: "displayEmail", value: "test@openresume.org" },
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

    cy.get("[data-test-id=AccountFormSaveButton]").click();

    // Ensure the LoadingOverlay shows up until save is completed.
    cy.contains("Saving...").should("be.visible");
    cy.contains("Saving...", { timeout: 8000 }).should("not.be.visible");

    // Reload the page.
    cy.reload();

    // Ensure that the fields are populated with the saved data, minus extra leading or trailing spaces.
    fields.forEach((field) => {
      cy.get(`input[name='${field.name}']`).should("have.value", field.value.trim());
    });
  });
});
