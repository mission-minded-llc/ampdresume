/// <reference types="cypress" />

import getParsedResumeAiResponse from "./data/getParsedResumeAiResponse.json";

/**
 * The Import section is a simple section that allows users to import a resume from a PDF file.
 */
describe("Import Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/import");
  });

  it("should access protected import section", () => {
    cy.contains("Import from PDF").should("be.visible");
  });

  it("should import resume from PDF", () => {
    cy.intercept("POST", "/api/graphql", (req) => {
      if (req.body.operationName === "getParsedResumeAi") {
        req.reply(getParsedResumeAiResponse);
      }
    }).as("getParsedResumeAi");

    cy.get('input[type="file"]:enabled', { timeout: 10000 }).selectFile(
      "cypress/fixtures/test-resume-1.pdf",
    );
    cy.wait("@getParsedResumeAi", { timeout: 10000 });

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

    cy.contains("Work Experience").should("be.visible");

    const companies = getParsedResumeAiResponse.data.parsedResumeAi.companies;
    companies.forEach((company) => {
      cy.contains(company.name).scrollIntoView().should("be.visible");
    });

    cy.contains("Education").should("be.visible");

    const education = getParsedResumeAiResponse.data.parsedResumeAi.education;
    education.forEach((item) => {
      cy.contains(item.school).scrollIntoView().should("be.visible");
      cy.contains(item.degree).scrollIntoView().should("be.visible");
    });

    cy.contains("Skills").should("be.visible");

    const skills = getParsedResumeAiResponse.data.parsedResumeAi.skills;
    skills.forEach((skill) => {
      cy.contains(skill.name).scrollIntoView().should("be.visible");
    });

    const lastSkill = skills[skills.length - 1];
    cy.contains(lastSkill.name).should("be.visible");
    cy.get(`[data-testid="trash-icon-${lastSkill.id}"]`).click();
    cy.contains(lastSkill.name).should("not.exist");
  });
});
