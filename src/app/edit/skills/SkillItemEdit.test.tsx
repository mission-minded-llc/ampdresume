import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { SkillItemEdit } from "./SkillItemEdit";
import { deleteSkillForUser } from "@/graphql/deleteSkillForUser";
import { updateSkillForUser } from "@/graphql/updateSkillForUser";
import { useSession } from "next-auth/react";

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
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => ({
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
    }));
  });

  it("renders correctly", () => {
    const { container, getByLabelText, getByText } = render(
      <SkillItemEdit skill={mockSkill} handleClose={() => {}} />,
    );

    expect(getByLabelText("Year Started")).toBeInTheDocument();
    expect(getByLabelText("Total Years")).toBeInTheDocument();
    expect(getByText("RichTextEditor")).toBeInTheDocument();
    expect(getByText("IconSelector")).toBeInTheDocument();
    expect(getByText("Delete Skill")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
    expect(getByText("Save & Close")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("updates fields and handles save", async () => {
    const handleCloseMock = jest.fn();
    const { container, getByLabelText, getByText } = render(
      <SkillItemEdit skill={mockSkill} handleClose={handleCloseMock} />,
    );
    expect(container).toMatchSnapshot();

    const yearStartedInput = getByLabelText("Year Started");
    const totalYearsInput = getByLabelText("Total Years");

    fireEvent.change(yearStartedInput, { target: { value: "2021" } });
    fireEvent.change(totalYearsInput, { target: { value: "3" } });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(updateSkillForUser).toHaveBeenCalledWith({
        id: "1",
        userId: "user-id",
        description: "Skill description",
        yearStarted: 2021,
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
      <SkillItemEdit skill={mockSkill} handleClose={() => {}} />,
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
      <SkillItemEdit skill={mockSkill} handleClose={handleCloseMock} />,
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
