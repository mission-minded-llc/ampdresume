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

  it("updates the desk and can cancel an edit", () => {
    cy.request("POST", "/api/recruiter", {
      companyName,
      title: deskTitle,
    })
      .its("status")
      .should("eq", 200);

    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.contains("button", "Update desk").click();
    cy.get("[data-testid=recruiter-onboarding]").should("be.visible");
    cy.get("[data-testid=recruiter-company]").clear().type("Canceled Desk");
    cy.contains("button", "Cancel").click();
    cy.get("[data-testid=recruiter-search]").should("be.visible");
    cy.contains(companyName).should("be.visible");
    cy.contains("Canceled Desk").should("not.exist");

    cy.contains("button", "Update desk").click();
    cy.get("[data-testid=recruiter-company]").clear().type("Updated Cypress Desk");
    cy.intercept("POST", "/api/recruiter").as("saveDesk");
    cy.contains("button", "Save desk").click();
    cy.wait("@saveDesk").its("response.statusCode").should("eq", 200);
    cy.contains("Updated Cypress Desk").should("be.visible");
    cy.contains(deskTitle).should("be.visible");
  });

  it("rejects a search that is empty or too short", () => {
    cy.request("POST", "/api/recruiter", {
      companyName,
      title: deskTitle,
    })
      .its("status")
      .should("eq", 200);

    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.contains("button", "Search candidates").click();
    cy.contains("Enter a name, title, location, or skill").should("be.visible");

    cy.get("[data-testid=recruiter-query]").type("ab");
    cy.contains("button", "Search candidates").click();
    cy.contains("Use at least 3 characters in each search field").should("be.visible");
    cy.get("[data-testid=candidate-result]").should("not.exist");
  });

  it("searches by location", () => {
    const harbor = "Cypress Harbor";

    cy.task("resetRecruiterCandidate", {
      email: testEmail,
      name: candidateName,
      title: candidateTitle,
      location: harbor,
      slug: testSlug,
      discoverable: true,
    });
    cy.request("POST", "/api/recruiter", {
      companyName,
      title: deskTitle,
    })
      .its("status")
      .should("eq", 200);

    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("[data-testid=recruiter-location]").type(harbor);
    cy.intercept("POST", "/api/recruiter/search").as("locationSearch");
    cy.contains("button", "Search candidates").click();
    cy.wait("@locationSearch").its("response.statusCode").should("eq", 200);

    cy.get("[data-testid=candidate-result]").should("contain", candidateName);
    cy.get("[data-testid=candidate-result] mark").should("contain", harbor);
  });

  it("ranks candidates who match more skills first", () => {
    const broadName = "Cypress Broad Match";
    const narrowName = "Cypress Narrow Match";

    cy.request("POST", "/api/recruiter", {
      companyName,
      title: deskTitle,
    })
      .its("status")
      .should("eq", 200);
    cy.task("seedDiscoverablePeers", {
      peers: [
        {
          email: "cypress-rank-broad@ampdresume.com",
          name: broadName,
          title: "Staff Engineer",
          location: "Remote",
          slug: "cypress-rank-broad",
          skills: ["TypeScript", "React"],
        },
        {
          email: "cypress-rank-narrow@ampdresume.com",
          name: narrowName,
          title: "Engineer",
          location: "Remote",
          slug: "cypress-rank-narrow",
          skills: ["TypeScript"],
        },
      ],
    });

    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("[data-testid=recruiter-skill]").type("TypeScript, React");
    cy.intercept("POST", "/api/recruiter/search").as("skillSearch");
    cy.contains("button", "Search candidates").click();
    cy.wait("@skillSearch").its("response.statusCode").should("eq", 200);

    cy.get("[data-testid=candidate-result]").should("have.length.at.least", 2);
    cy.get("[data-testid=candidate-result]").then(($results) => {
      const names = [...$results].map((result) => result.innerText);
      const broadIndex = names.findIndex((text) => text.includes(broadName));
      const narrowIndex = names.findIndex((text) => text.includes(narrowName));
      expect(broadIndex).to.be.greaterThan(-1);
      expect(narrowIndex).to.be.greaterThan(-1);
      expect(broadIndex).to.be.lessThan(narrowIndex);
    });
    cy.contains("[data-testid=candidate-result]", broadName).within(() => {
      cy.contains(".MuiChip-root", "TypeScript").should("exist");
      cy.contains(".MuiChip-root", "React").should("exist");
    });
  });

  it("shows an error when the desk or the search cannot be saved", () => {
    cy.visit("/recruit");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.get("[data-testid=recruiter-company]").type(companyName);
    let deskSaveFailed = false;
    cy.intercept("POST", "/api/recruiter", (req) => {
      if (!deskSaveFailed) {
        deskSaveFailed = true;
        req.reply({ statusCode: 500, body: {} });
        return;
      }
      req.continue();
    }).as("saveDesk");
    cy.contains("button", "Enable recruiter workspace").click();
    cy.wait("@saveDesk");
    cy.contains("Could not save recruiter profile").should("be.visible");

    cy.request("POST", "/api/recruiter", {
      companyName,
      title: deskTitle,
    })
      .its("status")
      .should("eq", 200);
    cy.reload();
    cy.skipOnboardingIfPresent();

    cy.get("[data-testid=recruiter-query]").type(candidateName);
    cy.intercept("POST", "/api/recruiter/search", { statusCode: 500, body: {} }).as("failedSearch");
    cy.contains("button", "Search candidates").click();
    cy.wait("@failedSearch");
    cy.contains("Could not search candidates").should("be.visible");
  });

  it("opts into recruiter search from the profile switch", () => {
    cy.visit("/edit/profile");
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();

    cy.contains("label", "Recruiter search").find("input").should("not.be.checked");
    cy.intercept("POST", "/api/recruiter/discoverable").as("discoverable");
    cy.contains("label", "Recruiter search").find("input").click();
    cy.wait("@discoverable").its("response.statusCode").should("eq", 200);
    cy.contains("label", "Recruiter search").find("input").should("be.checked");

    cy.reload();
    cy.skipOnboardingIfPresent();
    cy.closeMessageDialog();
    cy.contains("label", "Recruiter search").find("input").should("be.checked");

    cy.intercept("POST", "/api/recruiter/discoverable", { statusCode: 500, body: {} }).as(
      "discoverableFailed",
    );
    cy.contains("label", "Recruiter search").find("input").click();
    cy.wait("@discoverableFailed");
    cy.contains("Could not update recruiter visibility").should("be.visible");
    cy.contains("label", "Recruiter search").find("input").should("be.checked");
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
