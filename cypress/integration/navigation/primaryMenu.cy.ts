describe("Primary Nav Menu", () => {
  it("should navigate to login page from nav", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");

    cy.get("[data-test-id=primary-menu-login]").should("not.exist");
    cy.get("[data-test-id=primary-menu-toggle]").click();
    cy.get("[data-test-id=primary-menu-login]").should("be.visible");
    cy.get("[data-test-id=primary-menu-login]").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to homepage from nav", () => {
    cy.visit(Cypress.env("BASE_URL") + "/login" || "/login");

    cy.get("[data-test-id=primary-menu-home]").should("not.exist");
    cy.get("[data-test-id=primary-menu-toggle]").click();
    cy.get("[data-test-id=primary-menu-home]").should("be.visible");
    cy.get("[data-test-id=primary-menu-home]").click();

    cy.url().should("eq", Cypress.env("BASE_URL") + "/");
  });

  it("should NOT show protected links when NOT logged in", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");

    cy.get("[data-test-id=primary-menu-toggle]").click();
    cy.get("[data-test-id=primary-menu-view-resume]").should("not.exist");
    cy.get("[data-test-id=primary-menu-edit-resume]").should("not.exist");
    cy.get("[data-test-id=primary-menu-logout]").should("not.exist");
  });

  it("should show protected links when logged in", () => {
    cy.loginWithMagicLink();

    cy.get("[data-test-id=primary-menu-toggle]").click();
    cy.get("[data-test-id=primary-menu-view-resume]").should("be.visible");
    cy.get("[data-test-id=primary-menu-edit-resume]").should("be.visible");
    cy.get("[data-test-id=primary-menu-logout]").should("be.visible");
  });
});
