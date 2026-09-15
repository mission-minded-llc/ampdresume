/// <reference types="cypress" />

import { cypressSpecSlug } from "../../src/lib/cypressTestAccount";

export const featuredProjectName = "Test Featured Project for Skills";
export const featuredSkill1 = "TypeScript";
export const featuredSkill2 = "React";
export const featuredSkill3 = "Node.js";

const catalogSkills = [featuredSkill1, featuredSkill2, featuredSkill3];

export function setupFeaturedProjectSkills(options?: { slug?: boolean }) {
  cy.loginWithMagicLink();

  if (options?.slug) {
    const slug = cypressSpecSlug(Cypress.spec.relative);
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();
    // Name is required; saving slug alone is a no-op and leaves /r/:slug empty.
    cy.get("input[name='name']").clear().type("Cypress Test User");
    cy.get("input[name='slug']").clear().type(slug);
    cy.intercept("POST", "/api/account").as("saveAccount");
    cy.get("[data-testid='AccountFormSaveButton']").click();
    cy.wait("@saveAccount").its("response.statusCode").should("eq", 200);
    cy.reload();
    cy.skipOnboardingIfPresent();
    cy.get("input[name='slug']").should("have.value", slug);
  }

  cy.visit("/edit/skills");
  cy.skipOnboardingIfPresent();
  for (const skill of catalogSkills) {
    cy.get("input[name='searchSkills']").clear().type(skill);
    cy.get("span").contains(skill).click();
    cy.get("h2").contains("Enter Proficiency Level").should("be.visible");
    cy.get("button").contains("Add Skill").click();
    cy.get("button").contains(skill).should("be.visible");
  }

  cy.visit("/edit/featured-projects");
  cy.skipOnboardingIfPresent();
  cy.get("button").contains("Add Featured Project").click();
  cy.get(".MuiDialog-container input[name='name']").type(featuredProjectName);
  cy.get(".MuiDialog-container button").contains("Save Featured Project").click();
  cy.contains(featuredProjectName).should("be.visible");
}

export function visitFeaturedProjects() {
  cy.loginWithMagicLink();
  cy.visit("/edit/featured-projects");
  cy.skipOnboardingIfPresent();
}

export function openFeaturedProject(name = featuredProjectName) {
  cy.contains(name).click();
  cy.contains("Add Your Skills to Featured Project").should("be.visible");
}

export function clearFeaturedProjectSkills() {
  for (const skill of catalogSkills) {
    cy.get(".Mui-expanded").then(($expanded) => {
      if (!$expanded.find("button").filter((_, el) => Cypress.$(el).text() === skill).length) {
        return;
      }
      cy.get(".Mui-expanded button").contains(skill).click();
      cy.get(".MuiDialog-container button").contains("Delete from Featured Project").click();
      cy.get("button").contains("Yes, Delete").click();
      cy.get(".Mui-expanded button").contains(skill).should("not.exist");
    });
  }
}

export function openSkillsCombobox() {
  cy.get(".Mui-expanded")
    .find('label:contains("Add Your Skills to Featured Project")')
    .parent()
    .find("div[role='combobox']")
    .click();
}

export function addFirstAvailableSkill() {
  openSkillsCombobox();
  cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
  cy.get("li[role='option']")
    .first()
    .then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap(skillText).as("addedSkill");
      cy.aliasGraphql("addSkillForFeaturedProject");
      cy.wrap($option).click();
      cy.wait("@addSkillForFeaturedProject");
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
    });
}

export function addCatalogSkill(skill: string) {
  openSkillsCombobox();
  cy.aliasGraphql("addSkillForFeaturedProject");
  cy.get("li[role='option']").contains(skill).click();
  cy.wait("@addSkillForFeaturedProject");
  cy.get(".Mui-expanded button").contains(skill).should("be.visible");
}
