import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSkillForUser } from "@/graphql/deleteSkillForUser";
import { updateSkillForUser } from "@/graphql/updateSkillForUser";
import { SkillItemEdit } from "./SkillItemEdit";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/deleteSkillForUser", () => ({
  deleteSkillForUser: jest.fn(),
}));

jest.mock("@/graphql/updateSkillForUser", () => ({
  updateSkillForUser: jest.fn(),
}));

jest.mock("@/components/IconSelector", () => ({
  IconSelector: ({ setIcon }: { setIcon: (icon: string) => void }) => (
    <div data-testid="icon-selector" onClick={() => setIcon("new-icon")}>
      IconSelector
    </div>
  ),
}));

jest.mock("@/components/Tooltip", () => ({
  Tooltip: ({ message }: { message: React.ReactNode }) => <div>{message}</div>,
}));

jest.mock("@/app/edit/components/RichTextEditor/RichTextEditor", () => ({
  RichTextEditor: ({
    editorStateRef,
    value,
  }: {
    editorStateRef: React.RefObject<string | null>;
    value: string;
  }) => {
    (editorStateRef as React.MutableRefObject<string | null>).current = value;
    return <div>RichTextEditor</div>;
  },
}));

describe("SkillItemEdit", () => {
  const mockSkill = {
    id: "1",
    userId: "user-id",
    skillId: "skill-id",
    yearStarted: 2020,
    totalYears: 2,
    icon: "icon-name",
    description: "Skill description",
    skill: { id: "skill-id", name: "Skill", icon: "default-icon" },
  };

  const mockSession = {
    user: { id: "user-id" },
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(
      ({ mutationFn, onSuccess }) => ({
        mutate: async (variables: {
          id: string;
          userId: string;
          description: string;
          yearStarted: number;
          totalYears: number;
          icon: string;
        }) => {
          await mutationFn(variables);
          onSuccess();
        },
      })
    );
  });

  it("renders correctly", () => {
    const { container, getByLabelText, getByText } = render(
      <SkillItemEdit
        skill={mockSkill}
        handleClose={() => {}}
        setIconCallback={() => {}}
      />
    );

    // By default, autoCalculate is false if totalYears > 0, so only 'Total Years' is shown
    expect(getByLabelText("Total Years")).toBeInTheDocument();
    expect(() => getByLabelText("Year Started")).toThrow();
    expect(getByText("RichTextEditor")).toBeInTheDocument();
    expect(getByText("IconSelector")).toBeInTheDocument();
    expect(getByText("Delete Skill")).toBeInTheDocument();
    expect(getByText("Save & Close")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("shows 'Save Changes' when the accordion is expanded", async () => {
    const { getByText } = render(
      <SkillItemEdit
        skill={mockSkill}
        handleClose={() => {}}
        setIconCallback={() => {}}
      />
    );

    fireEvent.click(
      getByText("Click to describe your experience with this skill...")
    );
    await waitFor(() => {
      expect(getByText("Save Changes")).toBeInTheDocument();
    });
  });

  it("shows 'Year Started' when auto-calculate is enabled", () => {
    const { getByLabelText, getByText } = render(
      <SkillItemEdit
        skill={{ ...mockSkill, totalYears: 0 }}
        handleClose={() => {}}
        setIconCallback={() => {}}
      />
    );
    // With totalYears 0, autoCalculate defaults to true
    expect(getByLabelText("Year Started")).toBeInTheDocument();
    expect(() => getByLabelText("Total Years")).toThrow();
    expect(getByText("RichTextEditor")).toBeInTheDocument();
    expect(getByText("IconSelector")).toBeInTheDocument();
  });

  it("toggles auto-calculate and switches between fields", () => {
    const { getByLabelText } = render(
      <SkillItemEdit
        skill={{ ...mockSkill, totalYears: 0 }}
        handleClose={() => {}}
        setIconCallback={() => {}}
      />
    );
    // Initially, autoCalculate is true, so 'Year Started' is shown
    expect(getByLabelText("Year Started")).toBeInTheDocument();
    // Toggle auto-calculate off
    const autoCalcCheckbox = getByLabelText(/auto-calculate/i);
    act(() => {
      fireEvent.click(autoCalcCheckbox);
    });
    expect(getByLabelText("Total Years")).toBeInTheDocument();
    expect(() => getByLabelText("Year Started")).toThrow();
    // Toggle auto-calculate on again
    act(() => {
      fireEvent.click(autoCalcCheckbox);
    });
    expect(getByLabelText("Year Started")).toBeInTheDocument();
    expect(() => getByLabelText("Total Years")).toThrow();
  });

  it("updates fields and handles save", async () => {
    const handleCloseMock = jest.fn();
    const { container, getByLabelText, getByText } = render(
      <SkillItemEdit
        skill={mockSkill}
        handleClose={handleCloseMock}
        setIconCallback={() => {}}
      /> // autoCalculate false, so 'Total Years' is shown
    );
    expect(container).toMatchSnapshot();

    const totalYearsInput = getByLabelText("Total Years");
    act(() => {
      fireEvent.change(totalYearsInput, { target: { value: "3" } });
    });

    fireEvent.click(
      getByText("Click to describe your experience with this skill...")
    );
    fireEvent.click(getByText("Save Changes"));

    await waitFor(() => {
      expect(updateSkillForUser).toHaveBeenCalledWith({
        id: "1",
        userId: "user-id",
        description: "Skill description",
        yearStarted: 2020,
        totalYears: 3,
        icon: "icon-name",
      });
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["skillsForUser"],
      });
      expect(container).toMatchSnapshot();
    });
  });

  it("handles delete", async () => {
    const { container, getByText } = render(
      <SkillItemEdit
        skill={mockSkill}
        handleClose={() => {}}
        setIconCallback={() => {}}
      />
    );
    expect(container).toMatchSnapshot();

    fireEvent.click(getByText("Delete Skill"));
    fireEvent.click(getByText("Yes, Delete")); // There's a confirmation dialog.

    await waitFor(() => {
      expect(deleteSkillForUser).toHaveBeenCalledWith({
        id: "1",
        userId: "user-id",
      });
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["skillsForUser"],
      });
      expect(container).toMatchSnapshot();
    });
  });

  it("handles save and close", async () => {
    const handleCloseMock = jest.fn();
    const { container, getByText } = render(
      <SkillItemEdit
        skill={mockSkill}
        handleClose={handleCloseMock}
        setIconCallback={() => {}}
      />
    );
    expect(container).toMatchSnapshot();

    fireEvent.click(getByText("Save & Close"));

    await waitFor(() => {
      expect(updateSkillForUser).toHaveBeenCalledWith({
        id: "1",
        userId: "user-id",
        description: "Skill description",
        yearStarted: 2020,
        totalYears: 2,
        icon: "icon-name",
      });
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["skillsForUser"],
      });
      expect(handleCloseMock).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
    });
  });
});
