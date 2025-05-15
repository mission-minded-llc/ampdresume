Cypress.Commands.add("loginWithMagicLink", (email = Cypress.env("TEST_EMAIL")) => {
  cy.log(`Logging in with email: ${email}`);
  cy.visit(`${Cypress.env("BASE_URL") || ""}/login`);

  cy.get("input[type='email']").type(email);
  cy.contains("button", "Sign in with Email").click();

  cy.contains("Check Your Email").should("be.visible");
  cy.wait(100); // Wait for magic link to be "sent" (writing to file).

  cy.task("getMagicLink", { email }).then((magicLink) => {
    cy.visit(magicLink);
    cy.url().should("include", "/edit/profile");
    cy.contains("Profile").should("be.visible");
    cy.contains("General Information").should("be.visible");

    // Set session and CSRF token cookies for future requests.
    cy.getCookie("next-auth.session-token").then((cookie) => {
      Cypress.env("sessionToken", cookie?.value || "");
    });

    cy.getCookie("next-auth.csrf-token").then((cookie) => {
      Cypress.env("csrfToken", cookie?.value || "");
    });
  });
});

Cypress.Commands.add("setNextAuthCookies", () => {
  cy.setCookie("next-auth.session-token", Cypress.env("sessionToken") || "");
  cy.setCookie("next-auth.csrf-token", Cypress.env("csrfToken") || "");
});

Cypress.Commands.add("closeMessageDialog", ({ required = false } = {}) => {
  if (required) {
    cy.get("[data-testid=MessageDialog]").should("be.visible");
    cy.get("[data-testid=MessageDialog]").contains("OK").click();
  } else {
    cy.get("body", { timeout: 1000 }).then(($body) => {
      const $dialog = $body.find("[data-testid=MessageDialog]");
      if ($dialog.length) {
        cy.wrap($dialog).should("be.visible");
        cy.wrap($dialog).contains("OK").click();
      } else {
        cy.log("Message dialog not found — continuing");
      }
    });
  }
});
