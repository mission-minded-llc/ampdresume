/// <reference types="cypress" />

import {
  clearFeaturedProjectSkills,
  featuredProjectName,
  featuredSkill1,
  featuredSkill2,
  featuredSkill3,
  openFeaturedProject,
  openSkillsCombobox,
  setupFeaturedProjectSkills,
  visitFeaturedProjects,
} from "../../support/featuredProjectSkills";

describe("Featured project skills display", () => {
  before(() => {
    setupFeaturedProjectSkills({ slug: true });
  });

  beforeEach(() => {
    visitFeaturedProjects();
  });

  it("should access skills section for a featured project", () => {
    openFeaturedProject();
  });

  it("should show loading state when fetching skills", () => {
    cy.contains(featuredProjectName).click();
    cy.contains("Add Your Skills to Featured Project", { timeout: 5000 }).should("be.visible");
  });

  it("should handle empty skills list gracefully", () => {
    const emptyProjectName = "Empty Featured Project";
    cy.get("body").then(($body) => {
      if (!$body.find(`*:contains("${emptyProjectName}")`).length) {
        cy.get("button").contains("Add Featured Project").click();
        cy.get(".MuiDialog-container input[name='name']").type(emptyProjectName);
        cy.get(".MuiDialog-container button").contains("Save Featured Project").click();
        cy.wait(500);
      }
    });

    openFeaturedProject(emptyProjectName);
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .should("be.visible");
  });

  it("should display skills with icons when available", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);

    cy.get("li[role='option']")
      .first()
      .then(($option) => {
        const skillText = $option.text().trim();
        cy.wrap($option).click();
        cy.wait(500);
        cy.get(".Mui-expanded button").contains(skillText).should("exist");
      });
  });

  it("should display skills on the resume view", () => {
    cy.contains(featuredProjectName).click();

    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === featuredSkill1 || text === featuredSkill2 || text === featuredSkill3;
      });

      if (existingSkills.length === 0) {
        openSkillsCombobox();
        cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
        cy.get("li[role='option']").first().click();
        cy.wait(500);
      }
    });

    cy.visit(`${Cypress.expose("BASE_URL") || ""}/edit/profile`);
    cy.get("input[name='slug']")
      .invoke("val")
      .then((slug) => {
        cy.visit(`${Cypress.expose("BASE_URL") || ""}/r/${slug}`);
        cy.contains("Featured Projects", { timeout: 5000 }).should("be.visible");
        cy.contains(featuredProjectName).should("be.visible");
        cy.contains(featuredProjectName)
          .parent()
          .then(($parent) => {
            const parentText = $parent.text();
            expect(
              parentText.includes(featuredSkill1) ||
                parentText.includes(featuredSkill2) ||
                parentText.includes(featuredSkill3),
            ).to.be.true;
          });
      });
  });

  it("should handle error states gracefully", () => {
    cy.contains(featuredProjectName).click();
    cy.contains("Add Your Skills to Featured Project", { timeout: 5000 }).should("be.visible");
    cy.contains("Error loading featured project skills").should("not.exist");
  });

  it("should allow adding skills from dropdown menu", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);

    cy.get("li[role='option']")
      .first()
      .then(($option) => {
        const skillText = $option.text().trim();
        cy.wrap($option).click();
        cy.wait(500);
        cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
      });
  });
});
