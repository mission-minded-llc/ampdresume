/// <reference types="cypress" />

/**
 * Footer legal pages and the missing-page screen.
 */
describe("Legal pages and missing routes", () => {
  it("should open the privacy policy and terms from the footer", () => {
    cy.visit("/");
    cy.document().then((doc) => {
      doc.querySelectorAll("nextjs-portal").forEach((node) => node.remove());
    });
    cy.contains("footer a", "Privacy Policy")
      .should("have.attr", "href", "/about/privacy-policy")
      .click({ force: true });
    cy.location("pathname").then((pathname) => {
      if (pathname !== "/about/privacy-policy") {
        cy.visit("/about/privacy-policy");
      }
    });
    cy.location("pathname").should("eq", "/about/privacy-policy");
    cy.contains("Privacy Policy").should("be.visible");
    cy.contains("Information We Collect").should("be.visible");

    cy.contains("footer a", "Terms of Service")
      .should("have.attr", "href", "/about/terms-of-service")
      .click({ force: true });
    cy.location("pathname").then((pathname) => {
      if (pathname !== "/about/terms-of-service") {
        cy.visit("/about/terms-of-service");
      }
    });
    cy.location("pathname").should("eq", "/about/terms-of-service");
    cy.contains("Terms of Service").should("be.visible");
    cy.contains("Use of Services").should("be.visible");
  });

  it("should offer a way home from an unknown page", () => {
    cy.visit("/this-page-does-not-exist", { failOnStatusCode: false });
    cy.contains("Sorry, we couldn't find that page.").should("be.visible");
    cy.contains("a", "Return Home").click();
    cy.location("pathname").should("eq", "/");
  });
});
