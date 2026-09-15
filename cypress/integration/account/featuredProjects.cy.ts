/// <reference types="cypress" />

/**
 * The Featured Projects section allows users to add, edit, and delete featured projects.
 */
describe("Featured Projects Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/featured-projects");
    cy.skipOnboardingIfPresent();
  });

  it("should access protected featured projects section", () => {
    cy.contains("Your Featured Projects").should("be.visible");
  });

  it("should add a featured project", () => {
    const projectName = "E-Commerce Platform";
    const linkLabel = "GitHub";
    const linkUrl = "https://github.com/username/ecommerce-platform";

    cy.get("button").contains("Add Featured Project").click();
    cy.get(".MuiDialog-container input[name='name']").type(projectName);
    cy.get(".MuiDialog-container input[placeholder='e.g., GitHub']").type(linkLabel);
    cy.get(".MuiDialog-container input[placeholder='https://...']").type(linkUrl);
    cy.get(".MuiDialog-container button").contains("Add Link").click();
    cy.get(".MuiDialog-container [contenteditable='true']")
      .first()
      .click()
      .type("A full-stack e-commerce platform built with React and Node.js");
    cy.get(".MuiDialog-container button").contains("Save Featured Project").click();

    cy.contains(projectName).should("be.visible");
    cy.contains(projectName).click();
    cy.contains(linkLabel).should("be.visible");
  });

  it("should add a featured project without optional fields", () => {
    const projectName = "Portfolio Website";

    cy.get("button").contains("Add Featured Project").click();
    cy.get(".MuiDialog-container input[name='name']").type(projectName);
    cy.get(".MuiDialog-container button").contains("Save Featured Project").click();
    cy.contains(projectName).should("be.visible");
  });

  it("should edit a featured project", () => {
    const projectName = "E-Commerce Platform";
    const updatedProjectName = "E-Commerce Platform v2";
    const updatedLinkLabel = "Live Demo";
    const updatedLinkUrl = "https://ecommerce-platform-demo.com";

    cy.contains(projectName).click();
    cy.get(".Mui-expanded input[name='name']").clear().type(updatedProjectName);
    cy.get(".Mui-expanded button").contains("Remove").click();
    cy.get(".Mui-expanded input[placeholder='e.g., GitHub']").type(updatedLinkLabel);
    cy.get(".Mui-expanded input[placeholder='https://...']").type(updatedLinkUrl);
    cy.get(".Mui-expanded button").contains("Add Link").click();
    cy.get(".Mui-expanded button").contains("Save Featured Project").click();

    cy.contains(updatedProjectName).should("be.visible");
    cy.contains(updatedProjectName).click();
    cy.contains(updatedLinkLabel).should("be.visible");
  });

  it("should delete a featured project", () => {
    const projectName = "E-Commerce Platform v2";

    cy.contains(projectName).click();
    cy.get(".Mui-expanded button").contains("Delete Featured Project").click();
    cy.get("button").contains("Yes, Delete").click();

    cy.contains(projectName).should("not.exist");
  });
});
