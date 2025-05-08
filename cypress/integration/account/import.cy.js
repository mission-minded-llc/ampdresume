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

  it("should import resume from PDF", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/import`);

    // Wait for the page to load, including PDF.js worker.
    cy.wait(1000);

    // Upload a PDF file
    cy.get('input[type="file"]').selectFile({
      contents: "cypress/fixtures/test-resume-1.pdf",
      fileName: "test-resume-1.pdf",
      mimeType: "application/pdf",
    });

    // Wait 20 seconds for the file to be uploaded
    cy.wait(20000);

    // Check that the import was successful
    cy.contains("Imported successfully").should("be.visible");
  });
});
