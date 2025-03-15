describe("Homepage", () => {
  it("should load the homepage", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");
    cy.wait(1000);
    cy.contains("h1", "OpenResume").should("be.visible");
  });
});
