/// <reference types="cypress" />

import { cypressSpecEmail, cypressSpecSlug } from "../../../src/lib/cypressTestAccount";

const nextStep = () => {
  cy.get("[data-testid=OnboardingNext]").should("be.visible").click();
};

/**
 * A signed-in user can open a hiring desk and search resumes that opted in.
 */
describe("Recruiter workspace", () => {
  const testEmail = cypressSpecEmail(Cypress.spec.relative);
  const testSlug = cypressSpecSlug(Cypress.spec.relative);
  const candidateName = "Cypress Recruiter Candidate";
  const candidateTitle = "Cypress Search Title";
  const candidateLocation = "Cypress City";
  const companyName = "Northwind Cypress";
  const deskTitle = "Talent Partner";

  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.task("resetRecruiterCandidate", {
      email: testEmail,
      name: candidateName,
      title: candidateTitle,
      location: candidateLocation,
      slug: testSlug,
      discoverable: false,
    });
  });

  it("registers a recruiter desk", () => {
    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("[data-testid=recruiter-onboarding]").should("be.visible");
    cy.get("[data-testid=recruiter-search]").should("not.exist");

    cy.get("[data-testid=recruiter-company]").type(companyName);
    cy.get("[data-testid=recruiter-title]").type(deskTitle);
    cy.intercept("POST", "/api/recruiter").as("saveDesk");
    cy.contains("button", "Enable recruiter workspace").click();
    cy.wait("@saveDesk").its("response.statusCode").should("eq", 200);

    cy.get("[data-testid=recruiter-search]").should("be.visible");
    cy.contains(companyName).should("be.visible");
    cy.contains(deskTitle).should("be.visible");

    cy.reload();
    cy.skipOnboardingIfPresent();
    cy.get("[data-testid=recruiter-search]").should("be.visible");
    cy.contains(companyName).should("be.visible");
    cy.get("[data-testid=recruiter-onboarding]").should("not.exist");
  });

  it("searches only resumes that opted in", () => {
    cy.request("POST", "/api/recruiter", {
      companyName,
      title: deskTitle,
    })
      .its("status")
      .should("eq", 200);

    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("[data-testid=recruiter-query]").type(candidateName);
    cy.intercept("POST", "/api/recruiter/search").as("hiddenSearch");
    cy.contains("button", "Search candidates").click();
    cy.wait("@hiddenSearch").its("response.statusCode").should("eq", 200);
    cy.contains("No opted-in candidates match").should("be.visible");
    cy.get("[data-testid=candidate-result]").should("not.exist");

    cy.request("POST", "/api/recruiter/discoverable", { enabled: true })
      .its("status")
      .should("eq", 200);

    cy.intercept("POST", "/api/recruiter/search").as("visibleSearch");
    cy.contains("button", "Search candidates").click();
    cy.wait("@visibleSearch").its("response.statusCode").should("eq", 200);

    cy.get("[data-testid=candidate-result]").should("have.length", 1);
    cy.get("[data-testid=candidate-result] a")
      .should("have.attr", "href", `/r/${testSlug}`)
      .and("contain", candidateName);
    cy.get("[data-testid=candidate-result] mark").should("contain", candidateName);
    cy.get("[data-testid=candidate-result]").should("contain", candidateTitle);
    cy.get("[data-testid=candidate-result]").should("contain", candidateLocation);
  });
});

/**
 * A first visit to the hiring desk gets the recruiter tutorial, which can be replayed from this page.
 */
describe("Recruiter tutorial", () => {
  beforeEach(() => {
    cy.loginWithMagicLink({ skipOnboarding: false });
  });

  it("walks the recruiter tutorial and restarts it from the page and the menu", () => {
    cy.visit("/recruit");
    cy.request("POST", "/api/onboarding", { pending: true, recruiterPending: true });
    cy.reload();

    cy.contains("Welcome to the recruiter desk").should("be.visible");
    cy.contains("Welcome to Amp'd Resume").should("not.exist");
    cy.get("[data-testid=OnboardingSkip]").should("contain", "Skip tutorial");
    nextStep();

    cy.contains("Your main menu").should("be.visible");
    cy.get("[data-tour-id=nav-menu-button]").should("exist");
    nextStep();

    cy.contains("Two workspaces").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuRecruiter]").should("be.visible");
    nextStep();

    cy.contains("Your hiring desk").should("be.visible");
    cy.get("[data-tour-id=recruiter-desk]").should("exist");
    nextStep();

    cy.contains("Who can appear").should("be.visible");
    nextStep();

    cy.contains("Replay this tour").should("be.visible");
    nextStep();
    cy.get("[data-testid=OnboardingRoot]").should("not.exist");

    cy.get("[data-testid=RestartRecruiterTutorial]").scrollIntoView().click();
    cy.contains("Welcome to the recruiter desk").should("be.visible");
    cy.get("[data-testid=OnboardingSkip]").click();
    cy.get("[data-testid=OnboardingRoot]").should("not.exist");

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuRestartTutorial]").scrollIntoView().click();
    cy.contains("Welcome to the recruiter desk").should("be.visible");
  });
});
