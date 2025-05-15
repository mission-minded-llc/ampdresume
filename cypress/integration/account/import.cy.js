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
    // Start by checking that the page has the correct content for Personal Information.
    cy.contains("Personal Information").should("be.visible");

    // Ensure the Personal Information section is visible and has the correct content
    cy.contains("Personal Information").should("be.visible");
    cy.contains("Name").should("be.visible");
    cy.contains("Email").should("be.visible");
    cy.contains("Location").should("be.visible");
    cy.contains("Title").should("be.visible");

    const user = getParsedResumeAiResponse.data.parsedResumeAi.user;
    cy.get('input[name="name"]').should("have.value", user.name);
    cy.get('input[name="display-email"]').should("have.value", user.displayEmail);
    cy.get('input[name="location"]').should("have.value", user.location);
    cy.get('input[name="title"]').should("have.value", user.title);

    // Check that the Work Experience section is visible and has the correct content
    cy.contains("Work Experience").should("be.visible");

    const companies = getParsedResumeAiResponse.data.parsedResumeAi.companies;
    companies.forEach((company) => {
      // Company info might be lower on page but should still be visible
      cy.contains(company.name).scrollIntoView().should("be.visible");
    });

    // Check that the Education section is visible and has the correct content
    cy.contains("Education").should("be.visible");

    const education = getParsedResumeAiResponse.data.parsedResumeAi.education;
    education.forEach((education) => {
      cy.contains(education.school).scrollIntoView().should("be.visible");
      cy.contains(education.degree).scrollIntoView().should("be.visible");
    });

    // Check that the Skills section is visible and has the correct content
    cy.contains("Skills").should("be.visible");

    const skills = getParsedResumeAiResponse.data.parsedResumeAi.skills;
    skills.forEach((skill) => {
      cy.contains(skill.name).scrollIntoView().should("be.visible");
    });

    // Get the last skill name.
    const lastSkill = skills[skills.length - 1];
    cy.contains(lastSkill.name).should("be.visible");
    // Click the trash icon next to the last skill.
    cy.get(`[data-test-id="trash-icon-${lastSkill.id}"]`).click();

    // Check that the skill is deleted.
    cy.contains(lastSkill.name).should("not.exist");
  });
});
