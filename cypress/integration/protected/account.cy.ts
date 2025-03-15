describe("Account Sections", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should access protected account area", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);
    cy.contains("Add a Skill").should("be.visible");
  });
});
