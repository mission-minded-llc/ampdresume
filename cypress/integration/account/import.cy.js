import getParsedResumeAiResponse from "./data/getParsedResumeAiResponse.json";

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
    cy.intercept("POST", "/api/graphql", (req) => {
      // Log the request body to the Cypress runner
      Cypress.log({
        name: "GraphQL Request",
        message: JSON.stringify(req.body, null, 2),
      });

      // Also log to the browser console for convenience
      // eslint-disable-next-line no-console
      console.log("GraphQL request body:", req.body);
      // eslint-disable-next-line no-console
      console.log("Mocked response:", getParsedResumeAiResponse);

      if (req.body.operationName === "getParsedResumeAi") {
        req.reply(getParsedResumeAiResponse);
      }
    }).as("getParsedResumeAi");

    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/import`);

    // Wait for the page to load, including PDF.js worker.
    cy.wait(1000);

    // Upload a PDF file
    cy.get('input[type="file"]').selectFile("cypress/fixtures/test-resume-1.pdf");

    // Wait for the intercepted request to complete
    cy.wait("@getParsedResumeAi");

    // Check that the import was successful and the page rendered correctly
    cy.contains("Personal Information", { timeout: 60000 }).should("be.visible");
    cy.contains("Work Experience", { timeout: 60000 }).should("be.visible");
    cy.contains("Education", { timeout: 60000 }).should("be.visible");
    cy.contains("Skills", { timeout: 60000 }).should("be.visible");
  });
});
