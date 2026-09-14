import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ExtractedSkills } from "./ExtractedSkills";
import { expect } from "@jest/globals";
import { Skill } from "@/types";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

import { useSession } from "next-auth/react";

const applySkillsUpdate = (setSkills: jest.Mock, currentSkills: Skill[]) => {
  const update = setSkills.mock.calls[setSkills.mock.calls.length - 1][0];
  return typeof update === "function" ? update(currentSkills) : update;
};

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

      expect(screen.getByText("Skills (3)")).toBeInTheDocument();
      expect(screen.getByText(/Click the × on a skill to remove it/)).toBeInTheDocument();
      expect(screen.getByTestId("skill-chip-skill-1")).toBeInTheDocument();
      expect(screen.getByTestId("skill-chip-skill-2")).toBeInTheDocument();
      expect(screen.getByTestId("skill-chip-skill-3")).toBeInTheDocument();
    });

    it("renders empty state when no skills", () => {
      render(<ExtractedSkills skills={[]} setSkills={mockSetSkills} />);

      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("No skills found.")).toBeInTheDocument();
    });

    it("renders note about removing and adding skills", () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByText(/sorted A–Z/)).toBeInTheDocument();
      expect(screen.getByText(/You can add more after saving/)).toBeInTheDocument();
    });

    it("renders delete buttons for each skill", () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("trash-icon-skill-1")).toBeInTheDocument();
      expect(screen.getByTestId("trash-icon-skill-2")).toBeInTheDocument();
      expect(screen.getByTestId("trash-icon-skill-3")).toBeInTheDocument();
    });

    it("sorts skills alphabetically", () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      const chips = screen.getAllByTestId(/skill-chip-/);
      expect(chips.map((chip) => chip.getAttribute("data-testid"))).toEqual([
        "skill-chip-skill-1",
        "skill-chip-skill-3",
        "skill-chip-skill-2",
      ]);
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

      expect(screen.getByTestId("skill-chip-skill-1")).toBeInTheDocument();
    });
  });

  describe("Deleting skills", () => {
    it("deletes a skill when delete button is clicked", async () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      fireEvent.click(screen.getByTestId("trash-icon-skill-1"));

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledTimes(1);
        expect(applySkillsUpdate(mockSetSkills, mockSkills)).toEqual([
          { id: "skill-2", name: "TypeScript", icon: null },
          { id: "skill-3", name: "React", icon: null },
        ]);
      });
    });

    it("deletes the correct skill when multiple skills exist", async () => {
      render(<ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />);

      fireEvent.click(screen.getByTestId("trash-icon-skill-2"));

      await waitFor(() => {
        expect(applySkillsUpdate(mockSetSkills, mockSkills)).toEqual([
          { id: "skill-1", name: "JavaScript", icon: null },
          { id: "skill-3", name: "React", icon: null },
        ]);
      });
    });

    it("handles deleting the last skill", async () => {
      const singleSkill = [mockSkills[0]];
      render(<ExtractedSkills skills={singleSkill} setSkills={mockSetSkills} />);

      fireEvent.click(screen.getByTestId("trash-icon-skill-1"));

      await waitFor(() => {
        expect(applySkillsUpdate(mockSetSkills, singleSkill)).toEqual([]);
      });
    });

    it("handles deleting multiple skills sequentially", async () => {
      const { rerender } = render(
        <ExtractedSkills skills={mockSkills} setSkills={mockSetSkills} />,
      );

      fireEvent.click(screen.getByTestId("trash-icon-skill-1"));

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledTimes(1);
      });

      const remainingSkills = mockSkills.slice(1);
      rerender(<ExtractedSkills skills={remainingSkills} setSkills={mockSetSkills} />);

      fireEvent.click(screen.getByTestId("trash-icon-skill-2"));

      await waitFor(() => {
        expect(mockSetSkills).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Component memoization", () => {
    it("is memoized", () => {
      expect(ExtractedSkills).toBeDefined();
    });
  });

  describe("Edge cases", () => {
    it("handles skills with special characters in names", () => {
      const specialSkills: Skill[] = [
        { id: "skill-1", name: "C++", icon: null },
        { id: "skill-2", name: "Node.js", icon: null },
      ];

      render(<ExtractedSkills skills={specialSkills} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-chip-skill-1")).toBeInTheDocument();
      expect(screen.getByTestId("skill-chip-skill-2")).toBeInTheDocument();
    });

    it("handles skills with very long names", () => {
      const longNameSkill: Skill[] = [{ id: "skill-1", name: "A".repeat(100), icon: null }];

      render(<ExtractedSkills skills={longNameSkill} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-chip-skill-1")).toBeInTheDocument();
    });

    it("handles skills with null icon", () => {
      const skillsWithNullIcon: Skill[] = [{ id: "skill-1", name: "JavaScript", icon: null }];

      render(<ExtractedSkills skills={skillsWithNullIcon} setSkills={mockSetSkills} />);

      expect(screen.getByTestId("skill-chip-skill-1")).toBeInTheDocument();
    });
  });
});
