import { ThemeDavidsPage } from "../../../pages/themeDavidsPage.cy";

const davidsPage = new ThemeDavidsPage();

describe("Theme Davids", () => {
  beforeEach(() => {
    davidsPage.getDavidsThemePage();
    cy.url().should("include", `/demo/davids`);
  });

  // https://github.com/mission-minded-llc/ampdresume-theme/issues/40
  it.skip("should clear test input when filter change", () => {
    const testValue = "Test Skill";

    davidsPage.selectFilter("Years of Experience");
    davidsPage.getSkillFilter().type(testValue).should("have.value", testValue);

    davidsPage.selectFilter("Skill");

    davidsPage.getSkillFilter().should("have.value", "");
  });
});
