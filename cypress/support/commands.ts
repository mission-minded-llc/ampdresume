Cypress.Commands.add("loginWithMagicLink", () => {
  cy.task("cleanupMagicLinks");

  cy.visit(`${Cypress.env("BASE_URL") || ""}/login`);
  const testEmail = Cypress.env("TEST_EMAIL") as string;

  cy.get("input[type='email']").type(testEmail);
  cy.contains("button", "Sign in with Email").click();
  cy.contains("Check Your Email").should("be.visible");
  cy.wait(100);

  cy.task<string>("getMagicLink", { email: testEmail }).then((magicLink) => {
    cy.visit(magicLink);
    cy.url().should("include", "/edit/profile");
  });
});
