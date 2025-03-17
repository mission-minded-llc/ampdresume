describe("Skills Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should access protected skills section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);
    cy.contains("Add a Skill").should("be.visible");
  });
});
