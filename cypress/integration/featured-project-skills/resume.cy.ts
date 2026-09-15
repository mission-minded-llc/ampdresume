/// <reference types="cypress" />

import { cypressSpecSlug } from "../../../src/lib/cypressTestAccount";
import {
  addFirstAvailableSkill,
  featuredProjectName,
  featuredSkill1,
  featuredSkill2,
  featuredSkill3,
  openFeaturedProject,
  setupFeaturedProjectSkills,
  visitFeaturedProjects,
} from "../../support/featuredProjectSkills";

describe("Featured project skills on the resume", () => {
  before(() => {
    setupFeaturedProjectSkills({ slug: true });
  });

  it("should display skills on the resume view", () => {
    visitFeaturedProjects();
    openFeaturedProject();
    addFirstAvailableSkill();

    cy.visit(`/r/${cypressSpecSlug(Cypress.spec.relative)}`);
    cy.contains("Featured Projects").should("be.visible");
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
