/// <reference types="cypress" />

const nextStep = () => {
  cy.get("[data-testid=OnboardingNext]").should("be.visible").click();
};

const startOnboarding = () => {
  cy.request("POST", "/api/onboarding", { pending: true });
  cy.reload();
  cy.get("[data-testid=OnboardingNext]").should("be.visible");
};

/**
 * First-run tutorial: menu locations, live editor demos, PDF import, tips, skip, and restart.
 */
describe("Onboarding", () => {
  beforeEach(() => {
    cy.loginWithMagicLink({ skipOnboarding: false });
    cy.visit("/edit/profile");
  });

  it("walks through the full tutorial including demos, PDF import skip, and tips", () => {
    startOnboarding();

    cy.contains("Welcome to Amp'd Resume").should("be.visible");
    cy.get("[data-testid=OnboardingSkip]").should("contain", "Skip tutorial");
    nextStep();

    cy.contains("Your main menu").should("be.visible");
    cy.get("[data-tour-id=nav-menu-button]").should("exist");
    cy.get("[data-testid=OnboardingSpotlight]").should("exist");
    nextStep();

    cy.contains("h2", "Edit Resume").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuEditResume]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuEditSkills]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuEditExperience]").should("be.visible");
    nextStep();

    cy.get("[data-testid=OnboardingSkillsDemo]").should("be.visible");
    cy.get("[data-testid=OnboardingSkillsDemo]").contains("TypeScript").should("be.visible");
    cy.get("[data-testid=OnboardingSkillsDemo]")
      .find("input[name='searchSkills']")
      .should("be.visible");
    nextStep();

    cy.get("[data-testid=OnboardingExperienceDemo]").should("be.visible");
    cy.get("[data-testid=OnboardingExperienceDemo]")
      .find("input[name='companyName']")
      .should("have.value", "Northwind Labs");
    nextStep();

    cy.contains("h2", "Tools").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuEditImport]").should("be.visible");
    nextStep();

    cy.url().should("include", "/edit/import");
    cy.contains("Start from a PDF").should("be.visible");
    cy.contains("Import from PDF").should("be.visible");
    cy.get("[data-testid=OnboardingNext]").should("contain", "Skip for now");
    nextStep();

    cy.contains("Import anytime").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuEditImport]").should("be.visible");
    nextStep();

    cy.get("[data-testid=OnboardingTips]").should("be.visible");
    cy.contains("Claim a clean URL").should("be.visible");
    cy.contains("Replay this tour anytime").should("be.visible");
    nextStep();

    cy.get("[data-testid=OnboardingRoot]").should("not.exist");
  });

  it("skips the tutorial from the welcome step", () => {
    startOnboarding();

    cy.contains("Welcome to Amp'd Resume").should("be.visible");
    cy.get("[data-testid=OnboardingSkip]").click();
    cy.get("[data-testid=OnboardingRoot]").should("not.exist");
    cy.contains("Profile").should("be.visible");
  });

  it("restarts from the profile page and from the menu", () => {
    cy.request("POST", "/api/onboarding", { pending: false });
    cy.reload();
    cy.skipOnboardingIfPresent();
    // New accounts have no slug; the URL reminder appears once the tour is off.
    cy.closeMessageDialog({ required: true });

    cy.get("[data-testid=RestartOnboardingButton]").scrollIntoView().click();
    cy.get("[data-testid=OnboardingNext]").should("be.visible");
    cy.contains("Welcome to Amp'd Resume").should("be.visible");
    cy.get("[data-testid=OnboardingSkip]").click();
    cy.closeMessageDialog({ required: true });

    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuRestartTutorial]").scrollIntoView().click();
    cy.get("[data-testid=OnboardingNext]").should("be.visible");
    cy.contains("Welcome to Amp'd Resume").should("be.visible");
  });
});
