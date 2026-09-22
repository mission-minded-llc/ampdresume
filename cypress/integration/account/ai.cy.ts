/// <reference types="cypress" />

import { cypressSpecSlug } from "../../../src/lib/cypressTestAccount";

const originalProject = "Built the original search service";
const revisedProject = "Led search service work for a high-traffic marketplace";

const resumeWithProject = {
  data: {
    resume: {
      user: {
        id: "user-ai",
        name: "AI Tester",
        location: "Remote",
        title: "Engineer",
        siteTitle: null,
        siteDescription: null,
        summary: null,
        summaryTitle: null,
        webThemeName: "default",
      },
      socials: [],
      skillsForUser: [],
      companies: [
        {
          id: "company-1",
          name: "Northwind Labs",
          description: null,
          location: "Remote",
          startDate: "2020-01-01",
          endDate: null,
          positions: [
            {
              id: "position-1",
              title: "Engineer",
              startDate: "2020-01-01",
              endDate: null,
              projects: [
                {
                  id: "project-1",
                  name: originalProject,
                  description: null,
                  sortIndex: 0,
                  skillsForProject: [],
                },
              ],
            },
          ],
        },
      ],
      education: [],
      certifications: [],
      featuredProjects: [],
    },
  },
};

const companiesAiResponse = {
  data: {
    companiesAi: [
      {
        id: "company-1",
        name: "Northwind Labs",
        positions: [
          {
            id: "position-1",
            title: "Engineer",
            projects: [
              {
                id: "project-1",
                sortIndex: 0,
                name: revisedProject,
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * AI Assist is feature-flagged. The disabled state is always available; the
 * revision flow is exercised with GraphQL stubs after the flag is enabled.
 */
describe("AI Assist", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();
  });

  it("should explain that AI Assist is disabled by default", () => {
    cy.disableFeatureFlag("ai_assist");
    cy.visit("/edit/ai");
    cy.contains("AI Assist is not enabled for your account").should("be.visible");
  });

  it("should revise project bullets and save the AI changes", () => {
    const slug = cypressSpecSlug(Cypress.spec.relative);

    cy.get("input[name='name']").filter(":visible").first().clear().type("AI Tester");
    cy.get("input[name='slug']").filter(":visible").first().clear().type(slug);
    cy.intercept("POST", "/api/account").as("saveAccount");
    cy.get("[data-testid='AccountFormSaveButton']").click();
    cy.wait("@saveAccount").its("response.statusCode").should("eq", 200);

    cy.enableFeatureFlag("ai_assist");

    cy.intercept("POST", "/api/graphql", (req) => {
      if (req.body.operationName === "getResume") {
        req.reply(resumeWithProject);
      }
      if (req.body.operationName === "getCompaniesAi") {
        req.reply(companiesAiResponse);
      }
      if (req.body.operationName === "updateProject") {
        req.reply({ data: { updateProject: { id: "project-1" } } });
      }
      if (req.body.operationName === "updateProjectSortIndexes") {
        req.reply({ data: { updateProjectSortIndexes: true } });
      }
    });

    cy.visit("/edit/ai");
    cy.contains("Tweak Your Resume with AI Assist").should("be.visible");
    cy.contains("Northwind Labs").should("be.visible");
    // AnimatedTextTransition splits words into spans, so the full sentence is
    // not a single text node. Compare collapsed body text instead.
    cy.get("body", { timeout: 10000 })
      .invoke("text")
      .should((text) => {
        expect(text.replace(/\s+/g, "")).to.include(originalProject.replace(/\s+/g, ""));
      });

    cy.contains("button", "Get AI Assistance").click();
    cy.get(".MuiDialog-container textarea:visible")
      .first()
      .type("Senior engineer role focused on search and reliability.");
    cy.contains("button", "Run it!").click();

    cy.get("body", { timeout: 10000 })
      .invoke("text")
      .should((text) => {
        expect(text.replace(/\s+/g, "")).to.include(revisedProject.replace(/\s+/g, ""));
      });

    cy.aliasGraphql("updateProject");
    cy.contains("button", "Save AI changes").should("not.be.disabled").click();
    cy.wait("@updateProject");
  });
});
