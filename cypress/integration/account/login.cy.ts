/// <reference types="cypress" />

/**
 * The sign-in screen. Completing the magic link is covered by loginWithMagicLink.
 */
describe("Sign in", () => {
  it("should offer email and social sign-in", () => {
    cy.visit("/login");
    cy.contains("h1", "Sign In").should("be.visible");
    cy.contains("button", "Sign in with Email").should("be.disabled");

    cy.get("input[type='email']").type("not-an-email");
    cy.contains("button", "Sign in with Email").should("be.disabled");

    cy.get("input[type='email']").clear().type("person@example.com");
    cy.contains("button", "Sign in with Email").should("not.be.disabled");
    cy.contains("button", "Google").should("be.visible");
    cy.contains("button", "LinkedIn").should("be.visible");
  });

  it("should explain a sign-in error from the query string", () => {
    cy.visit("/login?error=OAuthAccountNotLinked");
    cy.contains("OAuthAccountNotLinked").should("be.visible");
    cy.contains("An error occurred. Please try again later.").should("be.visible");
  });

  it("should show the check-your-email page", () => {
    cy.visit("/login/verify");
    cy.contains("h1", "Check Your Email").should("be.visible");
    cy.contains("We've sent you a sign in link").should("be.visible");
  });
});
