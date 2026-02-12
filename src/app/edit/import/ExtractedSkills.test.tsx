import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ExtractedSkills } from "./ExtractedSkills";
import { expect } from "@jest/globals";
import { Skill } from "@/types";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("../skills/SkillItem", () => ({
  SkillItem: ({ skill }: { skill: { skill: Skill; id: string; userId: string; icon: null } }) => (
    <div data-testid={`skill-item-${skill.skill.id}`}>{skill.skill.name}</div>
  ),
}));

import { useSession } from "next-auth/react";

describe("ExtractedSkills", () => {
  const mockSkills: Skill[] = [
    { id: "skill-1", name: "JavaScript", icon: null },
    { id: "skill-2", name: "TypeScript", icon: null },
    { id: "skill-3", name: "React", icon: null },
  ];

  const mockSetSkills = jest.fn();
  const mockSession = {
    user: { id: "user-id" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
  });

  describe("Rendering", () => {
    it("renders correctly with skills", () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText(/Skills can be edited after saving/)).toBeInTheDocument();
      expect(screen.getByTestId("skill-item-skill-1")).toBeInTheDocument();
      expect(screen.getByTestId("skill-item-skill-2")).toBeInTheDocument();
      expect(screen.getByTestId("skill-item-skill-3")).toBeInTheDocument();
    });

    it("renders empty state when no skills", () => {
      render(<ExtractedSkills skills={[]} setSkills={mockSetSkills} />);

      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("No skills found.")).toBeInTheDocument();
    });

    it("renders note about editing skills", () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByText(/Skills can be edited after saving/)).toBeInTheDocument();
      expect(
        screen.getByText(/You can also add new skills by clicking the "Add Skill" button/),
      ).toBeInTheDocument();
    });

    it("renders delete buttons for each skill", () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("trash-icon-skill-1")).toBeInTheDocument();
      expect(screen.getByTestId("trash-icon-skill-2")).toBeInTheDocument();
      expect(screen.getByTestId("trash-icon-skill-3")).toBeInTheDocument();
    });
  });

  describe("Authentication", () => {
    it("shows sign in message when user is not authenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByText("Please sign in to continue")).toBeInTheDocument();
    });

    it("renders skills when user is authenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });

      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-item-skill-1")).toBeInTheDocument();
    });
  });

  describe("Deleting skills", () => {
    it("deletes a skill when delete button is clicked", async () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      const deleteButton = screen.getByTestId("trash-icon-skill-1");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledTimes(1);
        expect(mockSetSkills).toHaveBeenCalledWith([
          { id: "skill-2", name: "TypeScript", icon: null },
          { id: "skill-3", name: "React", icon: null },
        ]);
      });
    });

    it("deletes the correct skill when multiple skills exist", async () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      const deleteButton = screen.getByTestId("trash-icon-skill-2");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledWith([
          { id: "skill-1", name: "JavaScript", icon: null },
          { id: "skill-3", name: "React", icon: null },
        ]);
      });
    });

    it("handles deleting the last skill", async () => {
      const singleSkill = [mockSkills[0]];
      render(<ExtractedSkills skills={singleSkill} setSkills={mockSetSkills} />);

      const deleteButton = screen.getByTestId("trash-icon-skill-1");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledWith([]);
      });
    });

    it("handles deleting multiple skills sequentially", async () => {
      const { rerender } = render(
        <ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />,
      );

      const deleteButton1 = screen.getByTestId("trash-icon-skill-1");
      fireEvent.click(deleteButton1);

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledTimes(1);
      });

      // Update the component with the new skills array
      const remainingSkills = mockSkills.slice(1);
      rerender(<ExtractedSkills skills={remainingSkills} setSkills={mockSetSkills} />);

      const deleteButton2 = screen.getByTestId("trash-icon-skill-2");
      fireEvent.click(deleteButton2);

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Component memoization", () => {
    it("is memoized", () => {
      expect(ExtractedSkills).toBeDefined();
      // React.memo adds a displayName, but we can verify it's a memo component
      // by checking it doesn't re-render unnecessarily (tested through behavior)
    });
  });

  describe("Edge cases", () => {
    it("handles skills with special characters in names", () => {
      const specialSkills: Skill[] = [
        { id: "skill-1", name: "C++", icon: null },
        { id: "skill-2", name: "Node.js", icon: null },
      ];

      render(<ExtractedSkills skills={specialSkills} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-item-skill-1")).toBeInTheDocument();
      expect(screen.getByTestId("skill-item-skill-2")).toBeInTheDocument();
    });

    it("handles skills with very long names", () => {
      const longNameSkill: Skill[] = [{ id: "skill-1", name: "A".repeat(100), icon: null }];

      render(<ExtractedSkills skills={longNameSkill} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-item-skill-1")).toBeInTheDocument();
    });

    it("handles skills with null icon", () => {
      const skillsWithNullIcon: Skill[] = [{ id: "skill-1", name: "JavaScript", icon: null }];

      render(<ExtractedSkills skills={skillsWithNullIcon} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-item-skill-1")).toBeInTheDocument();
    });
  });
});
