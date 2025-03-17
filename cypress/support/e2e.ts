Cypress.Commands.add("loginWithMagicLink", (email: string = Cypress.env("TEST_EMAIL")) => {
  cy.log(`Logging in with email: ${email}`);
  cy.visit(`${Cypress.env("BASE_URL") || ""}/login`);

  cy.get("input[type='email']").type(email);
  cy.contains("button", "Sign in with Email").click();

  cy.contains("Check Your Email").should("be.visible");
  cy.wait(100); // Wait for magic link to be "sent" (writing to file).

  cy.task<string>("getMagicLink", { email }).then((magicLink) => {
    cy.visit(magicLink);
    cy.url().should("include", "/edit/profile");
    cy.contains("Profile").should("be.visible");
    cy.contains("General Information").should("be.visible");
  });
});
