import "@testing-library/jest-dom";

import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillsExperience } from "./SkillsExperience";
import { groupSkillsForUserByYearExperience } from "@/app/r/[slug]/pdf/pdf-theme/util";
import { render } from "@testing-library/react";

jest.mock("@/app/r/[slug]/pdf/pdf-theme/util", () => ({
  groupSkillsForUserByYearExperience: jest.fn(),
}));

jest.mock("./SkillItem", () => ({
  SkillItem: ({ skill }: { skill: SkillForUserWithSkill }) => <div>{skill.skill.name}</div>,
}));

describe("SkillsExperience", () => {
  const mockSkills = [
    {
      id: "1",
      userId: "user-id",
      skillId: "skill-js",
      skill: { id: "skill-js", name: "JavaScript", icon: "icon-js" },
      description: "Skill description",
      icon: "icon-js",
      yearStarted: 2015,
      totalYears: 6,
    },
    {
      id: "2",
      userId: "user-id",
      skillId: "skill-ts",
      skill: { id: "skill-ts", name: "TypeScript", icon: "icon-ts" },
      description: "Skill description",
      icon: "icon-ts",
      yearStarted: 2017,
      totalYears: 4,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with grouped skills", () => {
    (groupSkillsForUserByYearExperience as jest.Mock).mockReturnValue([
      ["6", [mockSkills[0]]],
      ["4", [mockSkills[1]]],
    ]);

    const { container, getByText } = render(<SkillsExperience skills={mockSkills} />);

    expect(getByText("6 years:")).toBeInTheDocument();
    expect(getByText("JavaScript")).toBeInTheDocument();
    expect(getByText("4 years:")).toBeInTheDocument();
    expect(getByText("TypeScript")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with no skills", () => {
    (groupSkillsForUserByYearExperience as jest.Mock).mockReturnValue([]);

    const { container } = render(<SkillsExperience skills={[]} />);

    // Expect the container to have an empty div.
    expect(container.firstChild).toBeEmptyDOMElement();
    expect(container).toMatchSnapshot();
  });
});
