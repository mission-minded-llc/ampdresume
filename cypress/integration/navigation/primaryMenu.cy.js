describe("Primary Nav Menu", () => {
  it("should navigate to login page from nav", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");

    cy.get("[data-test-id=NavPrimaryMenuLogin]").should("not.exist");
    cy.get("[data-test-id=NavPrimaryMenuIcon]").click();
    cy.get("[data-test-id=NavPrimaryMenuLogin]").should("be.visible");
    cy.get("[data-test-id=NavPrimaryMenuLogin]").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to homepage from nav", () => {
    cy.visit(Cypress.env("BASE_URL") + "/login" || "/login");

    cy.get("[data-test-id=NavPrimaryMenuHome]").should("not.exist");
    cy.get("[data-test-id=NavPrimaryMenuIcon]").click();
    cy.get("[data-test-id=NavPrimaryMenuHome]").should("be.visible");
    cy.get("[data-test-id=NavPrimaryMenuHome]").click();

    cy.url().should("eq", Cypress.env("BASE_URL") + "/");
  });

  it("should NOT show protected links when NOT logged in", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");

    cy.get("[data-test-id=NavPrimaryMenuIcon]").click();
    cy.get("[data-test-id=NavPrimaryMenuViewResume]").should("not.exist");
    cy.get("[data-test-id=NavPrimaryMenuEditResume]").should("not.exist");
    cy.get("[data-test-id=NavPrimaryMenuLogout]").should("not.exist");
  });

  it("should show protected links when logged in", () => {
    cy.loginWithMagicLink();

    // Wait for the menu icon to be visible and click it
    cy.get("[data-test-id=NavPrimaryMenuIcon]").should("be.visible").click();

    // Wait for the menu to be visible before checking for protected links
    cy.get("[data-test-id=NavPrimaryMenuEditResume]", { timeout: 10000 }).should("be.visible");
    cy.get("[data-test-id=NavPrimaryMenuLogout]", { timeout: 10000 }).should("be.visible");
  });
});
