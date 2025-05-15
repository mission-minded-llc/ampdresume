describe("Primary Nav Menu", () => {
  it("should navigate to login page from nav", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");

    cy.get("[data-testid=NavPrimaryMenuLogin]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuLogin]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuLogin]").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to homepage from nav", () => {
    cy.visit(Cypress.env("BASE_URL") + "/login" || "/login");

    cy.get("[data-testid=NavPrimaryMenuHome]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuHome]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuHome]").click();

    cy.url().should("eq", Cypress.env("BASE_URL") + "/");
  });

  it("should NOT show protected links when NOT logged in", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuViewResume]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuEditResume]").should("not.exist");
    cy.get("[data-testid=NavPrimaryMenuLogout]").should("not.exist");
  });

  it("should show protected links when logged in", () => {
    cy.loginWithMagicLink();

    cy.wait(1000); // It can take a second for the dialog to appear.

    // If this runs brefore the user populated a slug, this popup will appear.
    cy.closeMessageDialog({ required: false });

    // Wait for the menu icon to be visible and click it
    cy.get("[data-testid=NavPrimaryMenuIcon]").should("be.visible").click();

    // Wait for the menu to be visible before checking for protected links
    cy.get("[data-testid=NavPrimaryMenuEditResume]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuLogout]").should("be.visible");
  });
});
