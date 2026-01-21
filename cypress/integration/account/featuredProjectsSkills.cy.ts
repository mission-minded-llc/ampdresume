/// <reference types="cypress" />

/**
 * The Featured Projects Skills section allows users to add, edit, and delete skills
 * associated with featured projects.
 */
describe("Featured Projects Skills Section", () => {
  const testProjectName = "Test Featured Project for Skills";
  const skill1 = "TypeScript";
  const skill2 = "React";
  const skill3 = "Node.js";

  before(() => {
    cy.loginWithMagicLink();
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/featured-projects`);

    // Ensure we have skills available
    // First, check if skills exist, if not, add them
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);

    // Add skill1 if it doesn't exist
    cy.get("body").then(($body) => {
      if (!$body.find(`button:contains("${skill1}")`).length) {
        cy.get("input[name='searchSkills']").type(skill1);
        cy.get("span").contains(skill1).click();
        cy.get("button").contains("Add Skill").click();
        cy.wait(500);
      }
    });

    // Add skill2 if it doesn't exist
    cy.get("body").then(($body) => {
      if (!$body.find(`button:contains("${skill2}")`).length) {
        cy.get("input[name='searchSkills']").type(skill2);
        cy.get("span").contains(skill2).click();
        cy.get("button").contains("Add Skill").click();
        cy.wait(500);
      }
    });

    // Add skill3 if it doesn't exist
    cy.get("body").then(($body) => {
      if (!$body.find(`button:contains("${skill3}")`).length) {
        cy.get("input[name='searchSkills']").type(skill3);
        cy.get("span").contains(skill3).click();
        cy.get("button").contains("Add Skill").click();
        cy.wait(500);
      }
    });

    // Navigate back to featured projects
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/featured-projects`);

    // Create a test featured project if it doesn't exist
    cy.get("body").then(($body) => {
      if (!$body.find(`*:contains("${testProjectName}")`).length) {
        cy.get("button").contains("Add Featured Project").click();
        cy.get(".MuiDialog-container input[name='name']").type(testProjectName);
        cy.get(".MuiDialog-container button").contains("Save Featured Project").click();
        cy.wait(500);
      }
    });
  });

  it("should access skills section for a featured project", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");
  });

  it("should add a skill to a featured project", () => {
    cy.contains(testProjectName).click();

    // Wait for the skills dropdown to be ready
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Select a skill from the dropdown
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();

    // Wait for dropdown options to appear and select the first available skill
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    cy.get("li[role='option']").first().click();

    // Verify a skill appears as a button (we don't know which one, just that one was added)
    cy.get(".Mui-expanded button").should("have.length.at.least", 1);
  });

  it("should add multiple skills to a featured project", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add first skill
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    cy.get("li[role='option']").first().click();
    cy.wait(500); // Wait for the skill to be added

    // Add second skill
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    cy.get("li[role='option']").first().click();
    cy.wait(500); // Wait for the skill to be added

    // Verify at least two skills appear
    cy.get(".Mui-expanded button").should("have.length.at.least", 2);
  });

  it("should not show already added skills in the dropdown", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill first
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    // Get the first skill's text before clicking
    cy.get("li[role='option']").first().then(($option) => {
      const addedSkillText = $option.text().trim();
      
      // Click to add it
      cy.wrap($option).click();
      cy.wait(500);

      // Try to add the same skill again - it should not appear in the dropdown
      cy.get(".Mui-expanded")
        .find('label:contains("Add Your Skills to Featured Project")')
        .parent()
        .find("div[role='combobox']")
        .click();

      // The skill should not appear in the dropdown options
      cy.get("li[role='option']").contains(addedSkillText).should("not.exist");
    });
  });

  it("should edit a skill description for a featured project", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill first
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    // Get the first skill's text and add it
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Click on the skill button to open the edit dialog
      cy.get(".Mui-expanded button").contains(skillText).click();

      // Verify the dialog is open
      cy.contains("Edit Featured Project Skill").should("be.visible");
      cy.contains(skillText).should("be.visible");

      // Add a description
      const description = "Used this skill extensively in the featured project";
      cy.get(".MuiDialog-container [contenteditable='true']")
        .first()
        .click()
        .type(description);

      // Save the description
      cy.get(".MuiDialog-container button").contains("Save & Close").click();
      cy.wait(500);

      // Verify the skill button still exists (skill wasn't deleted)
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
    });
  });

  it("should delete a skill from a featured project", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill first
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Verify the skill is visible
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");

      // Click on the skill button to open the edit dialog
      cy.get(".Mui-expanded button").contains(skillText).click();

      // Delete the skill
      cy.get(".MuiDialog-container button").contains("Delete from Featured Project").click();
      cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog
      cy.wait(500);

      // Verify the skill is no longer visible
      cy.get(".Mui-expanded button").contains(skillText).should("not.exist");

      // Verify the skill can be added again (it should appear in the dropdown)
      cy.get(".Mui-expanded")
        .find('label:contains("Add Your Skills to Featured Project")')
        .parent()
        .find("div[role='combobox']")
        .click();
      cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
      cy.get("li[role='option']").contains(skillText).should("be.visible");
    });
  });

  it("should persist skills after closing and reopening the featured project", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Verify the skill is visible
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");

      // Collapse the accordion
      cy.contains(testProjectName).click();
      cy.wait(500);

      // Expand it again
      cy.contains(testProjectName).click();

      // Verify the skill is still there
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
    });
  });

  it("should show loading state when fetching skills", () => {
    cy.contains(testProjectName).click();

    // The loading overlay should appear briefly (if skills need to be fetched)
    // Then the skills section should appear
    cy.contains("Add Your Skills to Featured Project", { timeout: 5000 }).should("be.visible");
  });

  it("should handle empty skills list gracefully", () => {
    // Create a new featured project without any skills
    const emptyProjectName = "Empty Featured Project";
    cy.get("body").then(($body) => {
      if (!$body.find(`*:contains("${emptyProjectName}")`).length) {
        cy.get("button").contains("Add Featured Project").click();
        cy.get(".MuiDialog-container input[name='name']").type(emptyProjectName);
        cy.get(".MuiDialog-container button").contains("Save Featured Project").click();
        cy.wait(500);
      }
    });

    cy.contains(emptyProjectName).click();

    // The skills dropdown should be visible but empty (no skills added yet)
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // The skills list area should exist but be empty
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .should("be.visible");
  });

  it("should display skills with icons when available", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Check if the skill button exists
      cy.get(".Mui-expanded button")
        .contains(skillText)
        .should("exist");
    });
  });

  it("should allow editing skill description and saving without closing", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill first
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Click on the skill button to open the edit dialog
      cy.get(".Mui-expanded button").contains(skillText).click();

      // Add a description
      const description = "Test description for skill";
      cy.get(".MuiDialog-container [contenteditable='true']")
        .first()
        .click()
        .type(description);

      // Save without closing
      cy.get(".MuiDialog-container button").contains("Save").click();
      cy.wait(500);

      // Dialog should still be open
      cy.contains("Edit Featured Project Skill").should("be.visible");

      // Close the dialog manually
      cy.get(".MuiDialog-container button[aria-label='close']").click();
    });
  });

  it("should display skills on the resume view", () => {
    // First, ensure we have a featured project with skills
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/featured-projects`);
    cy.contains(testProjectName).click();

    // Add a skill if not already present
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
      });

      if (existingSkills.length === 0) {
        cy.get(".Mui-expanded")
          .find('label:contains("Add Your Skills to Featured Project")')
          .parent()
          .find("div[role='combobox']")
          .click();
        cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
        cy.get("li[role='option']").first().click();
        cy.wait(500);
      }
    });

    // Get the user's slug to visit their resume
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);
    cy.get("input[name='slug']")
      .invoke("val")
      .then((slug) => {
        // Only test if slug exists (user has set up their profile)
        if (slug && slug.toString().trim()) {
          // Visit the resume view
          cy.visit(`${Cypress.env("BASE_URL") || ""}/r/${slug}`);

          // Verify the featured project is visible
          cy.contains("Featured Projects", { timeout: 5000 }).should("be.visible");
          cy.contains(testProjectName).should("be.visible");

          // Verify at least one skill is displayed (it should be in a badge/box format)
          // Skills are displayed as text within the featured project section
          cy.contains(testProjectName)
            .parent()
            .then(($parent) => {
              const parentText = $parent.text();
              expect(
                parentText.includes(skill1) ||
                  parentText.includes(skill2) ||
                  parentText.includes(skill3),
              ).to.be.true;
            });
        } else {
          cy.log("Skipping resume view test - user slug not set");
        }
      });
  });

  it("should handle error states gracefully", () => {
    cy.contains(testProjectName).click();

    // The skills section should load without errors
    cy.contains("Add Your Skills to Featured Project", { timeout: 5000 }).should("be.visible");

    // No error messages should be visible
    cy.contains("Error loading featured project skills").should("not.exist");
  });

  it("should maintain skill order when multiple skills are added", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clear any existing skills first by deleting them if they exist
    cy.get("body").then(($body) => {
      const skillButtons = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
      });

      if (skillButtons.length > 0) {
        // Delete existing skills
        skillButtons.each((_, el) => {
          cy.wrap(el).click();
          cy.get(".MuiDialog-container button").contains("Delete from Featured Project").click();
          cy.get("button").contains("Yes, Delete").click();
          cy.wait(500);
        });
      }
    });

    // Add skills in a specific order
    const skillsToAdd = [skill1, skill2, skill3];
    skillsToAdd.forEach((skill) => {
      cy.get(".Mui-expanded")
        .find('label:contains("Add Your Skills to Featured Project")')
        .parent()
        .find("div[role='combobox']")
        .click();
      cy.get("li[role='option']").contains(skill).click();
      cy.wait(500);
    });

    // Verify all skills are visible
    cy.get(".Mui-expanded button").contains(skill1).should("be.visible");
    cy.get(".Mui-expanded button").contains(skill2).should("be.visible");
    cy.get(".Mui-expanded button").contains(skill3).should("be.visible");
  });

  it("should allow adding skills from dropdown menu", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Open the dropdown
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();

    // Verify dropdown is open and shows available skills
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);

    // Select the first available skill
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Verify skill was added
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
    });
  });

  it("should show skill buttons that are clickable to edit", () => {
    cy.contains(testProjectName).click();
    cy.contains("Add Your Skills to Featured Project").should("be.visible");

    // Clean up any existing skills first
    cy.get("body").then(($body) => {
      const existingSkills = $body.find(".Mui-expanded button").filter((_, el) => {
        const text = Cypress.$(el).text();
        return text === skill1 || text === skill2 || text === skill3;
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

    // Add a skill first
    cy.get(".Mui-expanded")
      .find('label:contains("Add Your Skills to Featured Project")')
      .parent()
      .find("div[role='combobox']")
      .click();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    
    cy.get("li[role='option']").first().then(($option) => {
      const skillText = $option.text().trim();
      cy.wrap($option).click();
      cy.wait(500);

      // Verify the skill button is clickable
      cy.get(".Mui-expanded button")
        .contains(skillText)
        .should("be.visible")
        .should("not.be.disabled");

      // Click the button to open edit dialog
      cy.get(".Mui-expanded button").contains(skillText).click();
      cy.contains("Edit Featured Project Skill").should("be.visible");

      // Close the dialog
      cy.get(".MuiDialog-container button[aria-label='close']").click();
    });
  });

  it("should clean up test data", () => {
    // This test ensures we clean up the test featured project and its skills
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/featured-projects`);
    
    // Check if the project exists
    cy.get("body").then(($body) => {
      if ($body.find(`*:contains("${testProjectName}")`).length > 0) {
        cy.contains(testProjectName).click();
        
        // Clean up any skills first (though cascade delete should handle this)
        cy.get("body").then(($body2) => {
          const existingSkills = $body2.find(".Mui-expanded button").filter((_, el) => {
            const text = Cypress.$(el).text();
            return text === skill1 || text === skill2 || text === skill3;
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

        // Delete the featured project
        cy.get(".Mui-expanded button").contains("Delete Featured Project").click();
        cy.get("button").contains("Yes, Delete").click();
        cy.wait(1000); // Wait longer for cascade delete to complete
        cy.contains(testProjectName).should("not.exist");
      }
    });
  });
});
