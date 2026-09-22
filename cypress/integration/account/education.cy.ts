/// <reference types="cypress" />

/**
 * The Education section allows users to add, edit, and delete schools and degrees.
 */
describe("Education Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/education");
    cy.skipOnboardingIfPresent();
  });

  it("should access the protected education section", () => {
    cy.contains("Your Education").should("be.visible");
  });

  it("should add education", () => {
    cy.get("button").contains("Add Education").click();
    cy.get(".MuiDialog-container input[name='school']").type("Springfield University");
    cy.get(".MuiDialog-container input[name='degree']").type("B.S. Computer Science");
    cy.fillMonthYear(".MuiDialog-container", "dateAwarded", "May", "2018");
    cy.get(".MuiDialog-container button").contains("Save Education").click();

    cy.contains("Springfield University").should("be.visible");
    cy.contains("B.S. Computer Science").should("be.visible");
    cy.contains("May 2018").should("be.visible");
  });

  it("should edit education", () => {
    cy.contains("Springfield University").click();
    cy.get(".Mui-expanded input[name='degree']").clear().type("M.S. Computer Science");
    cy.fillMonthYear(".Mui-expanded", "dateAwarded", "June", "2020");
    cy.get(".Mui-expanded button").contains("Save Education").click();

    cy.contains("M.S. Computer Science").should("be.visible");
    cy.contains("June 2020").should("be.visible");
  });

  it("should delete education", () => {
    cy.contains("Springfield University").click();
    cy.get(".Mui-expanded button").contains("Delete Education").click();
    cy.get("button").contains("Yes, Delete").click();

    cy.contains("Springfield University").should("not.exist");
  });
});
