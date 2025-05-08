describe("Import Section", () => {
  before(() => {
    cy.loginWithMagicLink();
    cy.closeMessageDialog({ required: false });
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
  });

  it("should access protected import section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/import`);
    cy.contains("Import from PDF").should("be.visible");
  });

  // it("should import resume from PDF", () => {
  //   cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/import`);

  //   // Wait for the page to load, including PDF.js worker.
  //   cy.wait(1000);

  //   // Upload a PDF file
  //   cy.get('input[type="file"]').selectFile({
  //     contents: "cypress/fixtures/test-resume-1.pdf",
  //     fileName: "test-resume-1.pdf",
  //     mimeType: "application/pdf",
  //   });

  //   // Confirm that a graphql request was made
  //   cy.wait(1000);
  //   cy.get("body").then(($body) => {
  //     const bodyText = $body.text();
  //     expect(bodyText).to.include("getParsedResumeAi");
  //   });

  //   // Check that the import was successful
  //   cy.contains("Personal Information", { timeout: 60000 }).should("be.visible");
  //   cy.contains("Work Experience", { timeout: 60000 }).should("be.visible");
  //   cy.contains("Education", { timeout: 60000 }).should("be.visible");
  //   cy.contains("Skills", { timeout: 60000 }).should("be.visible");
  // });
});
