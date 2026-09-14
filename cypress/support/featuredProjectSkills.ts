/// <reference types="cypress" />

import { cypressSpecSlug } from "../../src/lib/cypressTestAccount";

export const featuredProjectName = "Test Featured Project for Skills";
export const featuredSkill1 = "TypeScript";
export const featuredSkill2 = "React";
export const featuredSkill3 = "Node.js";

const catalogSkills = [featuredSkill1, featuredSkill2, featuredSkill3];

function baseUrl() {
  return Cypress.expose("BASE_URL") || "";
}

export function setupFeaturedProjectSkills(options?: { slug?: boolean }) {
  cy.loginWithMagicLink();

  if (options?.slug) {
    const slug = cypressSpecSlug(Cypress.spec.relative);
    cy.visit(`${baseUrl()}/edit/profile`);
    cy.closeMessageDialog({ required: true });
    // Name is required; saving slug alone is a no-op and leaves /r/:slug empty.
    cy.get("input[name='name']").clear({ force: true }).type("Cypress Test User", { force: true });
    cy.get("input[name='slug']").clear({ force: true }).type(slug, { force: true });
    cy.get("[data-testid='AccountFormSaveButton']").click();
    cy.get("[data-testid=LoadingOverlay]").should("not.exist");
    cy.reload();
    cy.get("input[name='slug']").should("have.value", slug);
  }

  cy.visit(`${baseUrl()}/edit/skills`);
  for (const skill of catalogSkills) {
    cy.get("body").then(($body) => {
      if (!$body.find(`button:contains("${skill}")`).length) {
        cy.get("input[name='searchSkills']").type(skill);
        cy.get("span").contains(skill).click();
        cy.get("button").contains("Add Skill").click();
        cy.wait(500);
      }
    });
  }

  cy.visit(`${baseUrl()}/edit/featured-projects`);
  cy.get("body").then(($body) => {
    if (!$body.find(`*:contains("${featuredProjectName}")`).length) {
      cy.get("button").contains("Add Featured Project").click();
      cy.get(".MuiDialog-container input[name='name']").type(featuredProjectName);
      cy.get(".MuiDialog-container button").contains("Save Featured Project").click();
      cy.wait(500);
    }
  });
}

export function visitFeaturedProjects() {
  cy.setNextAuthCookies();
  cy.visit(`${baseUrl()}/edit/featured-projects`);
}

export function openFeaturedProject(name = featuredProjectName) {
  cy.contains(name).click();
  cy.contains("Add Your Skills to Featured Project").should("be.visible");
}

export function clearFeaturedProjectSkills() {
  cy.get("body").then(($body) => {
    const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
      const text = Cypress.$(el).text();
      return catalogSkills.includes(text);
    });

    if (existingSkills.length > 0) {
      existingSkills.each((_, el) => {
        cy.wrap(el).click();
        cy.get(".MuiDialog-container button").contains("Delete from Featured Project").click();
        cy.get("button").contains("Yes, Delete").click();
        cy.wait(500);
      });
    }
  });
}

export function openSkillsCombobox() {
  cy.get(".Mui-expanded")
    .find('label:contains("Add Your Skills to Featured Project")')
    .parent()
    .find("div[role='combobox']")
    .click();
}
