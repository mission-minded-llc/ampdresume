import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EducationItem } from "./EducationItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { updateEducation } from "@/graphql/updateEducation";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/updateEducation", () => ({
  updateEducation: jest.fn(),
}));

jest.mock("@/graphql/deleteEducation", () => ({
  deleteEducation: jest.fn(),
}));

describe("EducationItem", () => {
  const mockEducation = {
    id: "1",
    userId: "user-id",
    school: "Test University",
    degree: "Bachelor of Science",
    dateAwarded: "2022-01-01T00:00:00.000Z",
  };

  const mockSession = {
    user: { id: "user-id" },
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  const mockSetExpanded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders correctly", async () => {
    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationItem education={mockEducation} expanded={false} setExpanded={mockSetExpanded} />
      </LocalizationProvider>,
    );

    await waitFor(() => {
      const schoolText = getByText((content, element) => {
        return element?.textContent === "Test University - (Bachelor of Science) January 2022";
      });
      expect(schoolText).toBeInTheDocument();
    });
  });

  it("expands the accordion when clicked", async () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationItem education={mockEducation} expanded={false} setExpanded={mockSetExpanded} />
      </LocalizationProvider>,
    );

    fireEvent.click(getByTestId("ExpandMoreIcon"));
    await waitFor(() => expect(mockSetExpanded).toHaveBeenCalledWith(mockEducation.id));
  });

  it("collapses the accordion when clicked again", async () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationItem
          education={mockEducation}
          expanded={mockEducation.id}
          setExpanded={mockSetExpanded}
        />
      </LocalizationProvider>,
    );

    fireEvent.click(getByTestId("ExpandMoreIcon"));
    await waitFor(() => expect(mockSetExpanded).toHaveBeenCalledWith(false));
  });

  it("handles editing education", async () => {
    const mockMutate = jest.fn();
    mockMutate.mockResolvedValue(true);
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    (updateEducation as jest.Mock).mockReturnValue(mockMutate);

    const { getByText, getByLabelText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationItem
          education={mockEducation}
          expanded={mockEducation.id}
          setExpanded={mockSetExpanded}
        />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(getByText("Save Education")).toBeInTheDocument());

    // Change a value in the school name.
    fireEvent.change(getByLabelText("School *"), { target: { value: "New University" } });

    // Expect the Save Education button to be enabled.
    expect(getByText("Save Education")).not.toBeDisabled();

    fireEvent.click(getByText("Save Education"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        id: mockEducation.id,
        school: mockEducation.school,
        degree: mockEducation.degree,
        dateAwarded: mockEducation.dateAwarded,
      });
    });
  });

  it("handles deleting education", async () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);

    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationItem
          education={mockEducation}
          expanded={mockEducation.id}
          setExpanded={mockSetExpanded}
        />
      </LocalizationProvider>,
    );

    fireEvent.click(getByText("Delete Education"));
    fireEvent.click(getByText("Yes, Delete")); // There's a confirmation dialog.

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        userId: mockSession.user.id,
        id: mockEducation.id,
      });
    });
  });
});
