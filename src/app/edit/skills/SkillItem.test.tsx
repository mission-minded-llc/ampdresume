import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";

import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItem } from "./SkillItem";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/app/edit/skills/SkillItemEdit", () => ({
  SkillItemEdit: ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    skill,
    handleClose,
  }: {
    skill: SkillForUserWithSkill;
    handleClose: () => void;
  }) => (
    <div>
      SkillItemEdit
      <button onClick={handleClose}>Close</button>
    </div>
  ),
}));

describe("SkillItem", () => {
  const mockSkill: SkillForUserWithSkill = {
    id: "1",
    userId: "user-id",
    skillId: "skill-id",
    yearStarted: 2020,
    totalYears: 2,
    skill: { id: "skill-id", name: "JavaScript", icon: "icon-js" },
    description: "Skill description",
    icon: "icon-js",
  };

  const mockSession = {
    user: { id: "user-id" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (usePathname as jest.Mock).mockReturnValue("/edit/skills");
  });

  it("renders correctly", () => {
    const { getByText } = render(<SkillItem skill={mockSkill} />);
    expect(getByText("JavaScript")).toBeInTheDocument();
  });

  it("opens the dialog when the button is clicked", async () => {
    const { getByText, getByRole } = render(<SkillItem skill={mockSkill} />);
    const button = getByText("JavaScript");

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(getByText("SkillItemEdit")).toBeInTheDocument();
    });
  });

  it("closes the dialog when the close button is clicked", async () => {
    const { container, getByText, getByRole, queryByRole } = render(
      <SkillItem skill={mockSkill} />,
    );
    const button = getByText("JavaScript");
    expect(container).toMatchSnapshot();

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    fireEvent.click(getByText("Close"));

    await waitFor(() => {
      expect(queryByRole("dialog")).not.toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
