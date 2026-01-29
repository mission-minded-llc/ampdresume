import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SkillsSection } from "./SkillsSection";
import { SkillForUser } from "@/types";
import { expect } from "@jest/globals";

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement, mode: "light" | "dark" = "light") => {
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Helper function to create mock SkillForUser
const createMockSkill = (overrides?: Partial<SkillForUser>): SkillForUser => ({
  id: "skill-user-1",
  userId: "user-1",
  skill: {
    id: "skill-1",
    name: "React",
    icon: null,
  },
  icon: null,
  description: null,
  yearStarted: 2020,
  totalYears: null,
  ...overrides,
});

describe("SkillsSection Component", () => {
  beforeAll(() => {
    // Mock the date to 2024 for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 0, 1)); // January 1, 2024
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("Rendering", () => {
    it("should render the filter TextField when skills array is empty", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      expect(textField).toBeInTheDocument();
    });

    it("should render the filter TextField and Skills component when skills are provided", () => {
      const skills = [createMockSkill({ skill: { id: "skill-1", name: "React", icon: null } })];
      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      expect(textField).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
    });

    it("should render the dropdown icon button", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).toBeInTheDocument();
    });
  });

  describe("Filter Type Dropdown", () => {
    it("should open dropdown menu when icon button is clicked", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);

      expect(screen.getByText("Skill")).toBeInTheDocument();
      expect(screen.getByText("Years of Experience")).toBeInTheDocument();
    });

    it("should close dropdown menu when menu item is selected", async () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);

      expect(screen.getByText("Skill")).toBeInTheDocument();

      // Selecting a menu item should close the menu
      const skillMenuItem = screen.getByText("Skill");
      fireEvent.click(skillMenuItem);

      // Menu should be closed after selection (wait for state update)
      await waitFor(() => {
        expect(screen.queryByText("Years of Experience")).not.toBeInTheDocument();
      });
    });

    it("should change filter type to 'skill' when 'Skill' menu item is clicked", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);

      const skillMenuItem = screen.getByText("Skill");
      fireEvent.click(skillMenuItem);

      const textField = screen.getByPlaceholderText("Enter Skill");
      expect(textField).toBeInTheDocument();
    });

    it("should change filter type to 'years' when 'Years of Experience' menu item is clicked", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);

      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      const textField = screen.getByPlaceholderText("Enter Years of Experience");
      expect(textField).toBeInTheDocument();
    });
  });

  describe("Skill Name Filtering", () => {
    it("should filter skills by name when filter type is 'skill'", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
        }),
        createMockSkill({
          id: "skill-3",
          skill: { id: "skill-3", name: "JavaScript", icon: null },
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "React" } });

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
      expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
    });

    it("should filter skills case-insensitively", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "react" } });

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
    });

    it("should filter skills by partial match", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
        }),
        createMockSkill({
          id: "skill-3",
          skill: { id: "skill-3", name: "JavaScript", icon: null },
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "Script" } });

      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    it("should show all skills when filter is cleared", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "React" } });
      fireEvent.change(textField, { target: { value: "" } });

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("should ignore whitespace-only filters", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "   " } });

      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  describe("Years of Experience Filtering", () => {
    it("should filter skills by years of experience when filter type is 'years'", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
          totalYears: 5,
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
          totalYears: 2,
        }),
        createMockSkill({
          id: "skill-3",
          skill: { id: "skill-3", name: "JavaScript", icon: null },
          totalYears: 8,
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      // Change filter type to years
      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      const textField = screen.getByPlaceholderText("Enter Years of Experience");
      fireEvent.change(textField, { target: { value: "5" } });

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
    });

    it("should calculate years from yearStarted when totalYears is null", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
          yearStarted: 2020, // 4 years from 2024
          totalYears: null,
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
          yearStarted: 2019, // 5 years from 2024
          totalYears: null,
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      // Change filter type to years
      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      const textField = screen.getByPlaceholderText("Enter Years of Experience");
      fireEvent.change(textField, { target: { value: "5" } });

      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    it("should prioritize totalYears over yearStarted when both are present", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
          yearStarted: 2020, // Would be 4 years
          totalYears: 10, // But totalYears is 10
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      // Change filter type to years
      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      const textField = screen.getByPlaceholderText("Enter Years of Experience");
      fireEvent.change(textField, { target: { value: "10" } });

      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("should exclude skills with null years when filtering by years", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
          yearStarted: null,
          totalYears: null,
        }),
        createMockSkill({
          id: "skill-2",
          skill: { id: "skill-2", name: "TypeScript", icon: null },
          totalYears: 5,
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      // Change filter type to years
      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      const textField = screen.getByPlaceholderText("Enter Years of Experience");
      fireEvent.change(textField, { target: { value: "3" } });

      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    it("should filter out all skills when non-numeric values are entered for years filter", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
          totalYears: 5,
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      // Change filter type to years
      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      const textField = screen.getByPlaceholderText("Enter Years of Experience");
      fireEvent.change(textField, { target: { value: "abc" } });

      // When filter is non-numeric, isNaN returns true, so no skills match
      // The Skills component may still render, but React skill should not be visible
      // since it doesn't match the filter criteria
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });
  });

  describe("Placeholder Text", () => {
    it("should show 'Enter Skill' placeholder when filter type is 'skill'", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      expect(screen.getByPlaceholderText("Enter Skill")).toBeInTheDocument();
    });

    it("should show 'Enter Years of Experience' placeholder when filter type is 'years'", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      expect(screen.getByPlaceholderText("Enter Years of Experience")).toBeInTheDocument();
    });
  });

  describe("Theme Support", () => {
    it("should render correctly in light theme", () => {
      const skills = [createMockSkill()];
      const { container } = renderWithTheme(<SkillsSection skillsForUser={skills} />, "light");

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter Skill")).toBeInTheDocument();
    });

    it("should render correctly in dark theme", () => {
      const skills = [createMockSkill()];
      const { container } = renderWithTheme(<SkillsSection skillsForUser={skills} />, "dark");

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter Skill")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty skills array", () => {
      renderWithTheme(<SkillsSection skillsForUser={[]} />);

      expect(screen.getByPlaceholderText("Enter Skill")).toBeInTheDocument();
    });

    it("should handle skills with missing skill name", () => {
      const skills = [
        createMockSkill({
          skill: { id: "skill-1", name: "", icon: null },
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "test" } });

      // Component should still render without crashing
      expect(textField).toBeInTheDocument();
    });

    it("should maintain filter value when switching filter types", () => {
      const skills = [
        createMockSkill({
          id: "skill-1",
          skill: { id: "skill-1", name: "React", icon: null },
          totalYears: 5,
        }),
      ];

      renderWithTheme(<SkillsSection skillsForUser={skills} />);

      const textField = screen.getByPlaceholderText("Enter Skill");
      fireEvent.change(textField, { target: { value: "React" } });

      // Switch to years filter
      const iconButton = screen.getByTestId("ArrowDropDownIcon").closest("button");
      expect(iconButton).not.toBeNull();
      fireEvent.click(iconButton!);
      const yearsMenuItem = screen.getByText("Years of Experience");
      fireEvent.click(yearsMenuItem);

      // Filter value should be maintained but placeholder should change
      const yearsTextField = screen.getByPlaceholderText("Enter Years of Experience");
      expect(yearsTextField).toHaveValue("React");
    });
  });
});
