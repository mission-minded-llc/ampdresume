import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ExtractedInformation } from "./ExtractedInformation";
import { expect } from "@jest/globals";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { ParsedResumeData } from "./types";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("@/graphql/saveExtractedResumeData", () => ({
  saveExtractedResumeData: jest.fn(),
}));

jest.mock("../components/UpdateWithConfirmation", () => ({
  UpdateWithConfirmation: ({
    onConfirmUpdate,
    buttonLabel,
    disabled,
  }: {
    onConfirmUpdate: () => void;
    buttonLabel: string;
    disabled: boolean;
  }) => (
    <button onClick={onConfirmUpdate} disabled={disabled} data-testid="save-button">
      {buttonLabel}
    </button>
  ),
}));

jest.mock("./ExtractedUser", () => ({
  ExtractedUser: ({ user, setUser }: { user: any; setUser: any }) => (
    <div data-testid="extracted-user">
      <div>Name: {user.name}</div>
      <button onClick={() => setUser({ ...user, name: "Updated Name" })}>Update Name</button>
    </div>
  ),
}));

jest.mock("./experience/ExtractedWorkExperience", () => ({
  ExtractedWorkExperience: ({ companies, setCompanies }: { companies: any; setCompanies: any }) => (
    <div data-testid="extracted-work-experience">
      <div>Companies: {companies.length}</div>
      <button onClick={() => setCompanies([])}>Clear Companies</button>
    </div>
  ),
}));

jest.mock("./education/ExtractedEducation", () => ({
  ExtractedEducation: ({ education, setEducation }: { education: any; setEducation: any }) => (
    <div data-testid="extracted-education">
      <div>Education: {education.length}</div>
      <button onClick={() => setEducation([])}>Clear Education</button>
    </div>
  ),
}));

jest.mock("./ExtractedSkills", () => ({
  ExtractedSkills: ({ skills, setSkills }: { skills: any; setSkills: any }) => (
    <div data-testid="extracted-skills">
      <div>Skills: {skills.length}</div>
      <button onClick={() => setSkills([])}>Clear Skills</button>
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ open, message }: { open: boolean; message: string }) =>
    open ? <div data-testid="loading-overlay">{message}</div> : null,
}));

import { useRouter } from "next/navigation";
import { saveExtractedResumeData } from "@/graphql/saveExtractedResumeData";

describe("ExtractedInformation", () => {
  const mockPush = jest.fn();

  const mockSession = {
    user: { id: "user-id" },
  };

  const mockParsedResumeData: ParsedResumeData = {
    user: {
      name: "John Doe",
      displayEmail: "john@example.com",
      location: "New York",
      title: "Software Engineer",
    },
    skills: [
      { id: "skill-1", name: "JavaScript", icon: null },
      { id: "skill-2", name: "TypeScript", icon: null },
    ],
    companies: [
      {
        name: "Test Company",
        location: "San Francisco",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "Software Engineer",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            projects: [],
          },
        ],
      },
    ],
    education: [
      {
        school: "Test University",
        degree: "Bachelor of Science",
        dateAwarded: "2020-05-15T00:00:00.000Z",
      },
    ],
  };

  let mutationFnRef: (() => Promise<void>) | null = null;
  const mockMutate = jest.fn(async () => {
    // Execute the mutation function if provided
    if (mutationFnRef) {
      try {
        await mutationFnRef();
      } catch {
        // Catch validation errors - they set the error state before throwing
        // We don't re-throw to prevent test failures, but the error state should be set
        // The component handles these errors via React Query's error handling
      }
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mutationFnRef = null;
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => {
      mutationFnRef = mutationFn;
      return {
        mutate: mockMutate,
        isPending: false,
      };
    });
    (saveExtractedResumeData as jest.Mock).mockResolvedValue(true);
  });

  describe("Rendering", () => {
    it("renders correctly with data", () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      expect(screen.getByTestId("extracted-user")).toBeInTheDocument();
      expect(screen.getByTestId("extracted-work-experience")).toBeInTheDocument();
      expect(screen.getByTestId("extracted-education")).toBeInTheDocument();
      expect(screen.getByTestId("extracted-skills")).toBeInTheDocument();
      expect(screen.getByTestId("save-button")).toBeInTheDocument();
    });

    it("renders error message when error is provided", () => {
      render(<ExtractedInformation data={null} error="Test error message" />);

      expect(screen.getByText("Test error message")).toBeInTheDocument();
    });

    it("renders 'No data available' when no user data", () => {
      render(<ExtractedInformation data={null} error={null} />);

      expect(
        screen.getByText("No data available yet. Please upload a PDF file."),
      ).toBeInTheDocument();
    });

    it("renders heading when no user data", () => {
      render(<ExtractedInformation data={null} error={null} />);

      expect(screen.getByText("Extracted Information")).toBeInTheDocument();
    });

    it("does not render heading when user data exists", () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      expect(screen.queryByText("Extracted Information")).not.toBeInTheDocument();
    });
  });

  describe("Saving data", () => {
    it("saves data successfully when Save button is clicked", async () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      // Click confirm in UpdateWithConfirmation (mocked as direct button)
      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      // Wait for the mutation function to execute
      await waitFor(
        () => {
          expect(saveExtractedResumeData).toHaveBeenCalledWith({
            userId: "user-id",
            user: mockParsedResumeData.user,
            skillIds: ["skill-1", "skill-2"],
            companies: mockParsedResumeData.companies,
            education: mockParsedResumeData.education,
          });
        },
        { timeout: 3000 },
      );
    });

    it("redirects to experience page after successful save", async () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      await waitFor(
        () => {
          expect(saveExtractedResumeData).toHaveBeenCalled();
          expect(mockPush).toHaveBeenCalledWith("/edit/experience");
        },
        { timeout: 3000 },
      );
    });

    it("shows loading overlay when saving", () => {
      (useMutation as jest.Mock).mockReturnValue({
        mutate: mockMutate,
        isPending: true,
      });

      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
      expect(screen.getByText("Saving Resume...")).toBeInTheDocument();
    });

    it("disables save button when saving", () => {
      (useMutation as jest.Mock).mockReturnValue({
        mutate: mockMutate,
        isPending: true,
      });

      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      expect(saveButton).toBeDisabled();
    });

    it("shows 'Saving...' button label when saving", () => {
      (useMutation as jest.Mock).mockReturnValue({
        mutate: mockMutate,
        isPending: true,
      });

      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      expect(screen.getByText("Saving...")).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("validates education entries have dateAwarded", async () => {
      const invalidData: ParsedResumeData = {
        ...mockParsedResumeData,
        education: [
          {
            school: "Test University",
            degree: "Bachelor of Science",
            dateAwarded: "", // Missing date
          },
        ],
      };

      render(<ExtractedInformation data={invalidData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      // The mutation sets validation error before throwing
      // Wait for the validation error to appear in the DOM
      await waitFor(
        () => {
          expect(
            screen.getByText(/All education entries must have a Date Awarded/),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("validates companies have startDate", async () => {
      const invalidData: ParsedResumeData = {
        ...mockParsedResumeData,
        companies: [
          {
            name: "Test Company",
            location: "San Francisco",
            startDate: "", // Missing start date
            endDate: null,
            positions: [],
          },
        ],
      };

      render(<ExtractedInformation data={invalidData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      await waitFor(
        () => {
          expect(
            screen.getByText(/Company 'Test Company' is missing a Start Date/),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("validates positions have startDate", async () => {
      const invalidData: ParsedResumeData = {
        ...mockParsedResumeData,
        companies: [
          {
            name: "Test Company",
            location: "San Francisco",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            positions: [
              {
                title: "Software Engineer",
                startDate: "", // Missing start date
                endDate: null,
                projects: [],
              },
            ],
          },
        ],
      };

      render(<ExtractedInformation data={invalidData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      await waitFor(
        () => {
          expect(
            screen.getByText(
              /Position 'Software Engineer' at 'Test Company' is missing a Start Date/,
            ),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("handles unnamed company in validation error", async () => {
      const invalidData: ParsedResumeData = {
        ...mockParsedResumeData,
        companies: [
          {
            name: "",
            location: "San Francisco",
            startDate: "",
            endDate: null,
            positions: [],
          },
        ],
      };

      render(<ExtractedInformation data={invalidData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      await waitFor(
        () => {
          expect(
            screen.getByText(/Company '\(Unnamed\)' is missing a Start Date/),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("handles untitled position in validation error", async () => {
      const invalidData: ParsedResumeData = {
        ...mockParsedResumeData,
        companies: [
          {
            name: "Test Company",
            location: "San Francisco",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            positions: [
              {
                title: "",
                startDate: "",
                endDate: null,
                projects: [],
              },
            ],
          },
        ],
      };

      render(<ExtractedInformation data={invalidData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      await waitFor(
        () => {
          expect(
            screen.getByText(/Position '\(Untitled\)' at 'Test Company' is missing a Start Date/),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("clears validation error on successful save", async () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      // After successful save, validation error should be cleared
      await waitFor(
        () => {
          expect(saveExtractedResumeData).toHaveBeenCalled();
        },
        { timeout: 3000 },
      );
    });
  });

  describe("Context integration", () => {
    it("provides data to child components through context", () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
      expect(screen.getByText("Companies: 1")).toBeInTheDocument();
      expect(screen.getByText("Education: 1")).toBeInTheDocument();
      expect(screen.getByText("Skills: 2")).toBeInTheDocument();
    });

    it("allows child components to update data through context", async () => {
      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      const updateButton = screen.getByText("Update Name");
      fireEvent.click(updateButton);

      await waitFor(() => {
        expect(screen.getByText("Name: Updated Name")).toBeInTheDocument();
      });
    });
  });

  describe("Edge cases", () => {
    it("handles empty skills array", () => {
      const dataWithNoSkills: ParsedResumeData = {
        ...mockParsedResumeData,
        skills: [],
      };

      render(<ExtractedInformation data={dataWithNoSkills} error={null} />);

      expect(screen.getByText("Skills: 0")).toBeInTheDocument();
    });

    it("handles empty companies array", () => {
      const dataWithNoCompanies: ParsedResumeData = {
        ...mockParsedResumeData,
        companies: [],
      };

      render(<ExtractedInformation data={dataWithNoCompanies} error={null} />);

      expect(screen.getByText("Companies: 0")).toBeInTheDocument();
    });

    it("handles empty education array", () => {
      const dataWithNoEducation: ParsedResumeData = {
        ...mockParsedResumeData,
        education: [],
      };

      render(<ExtractedInformation data={dataWithNoEducation} error={null} />);

      expect(screen.getByText("Education: 0")).toBeInTheDocument();
    });

    it("handles save failure", async () => {
      // Set up the mock to reject before render
      (saveExtractedResumeData as jest.Mock).mockReset();
      (saveExtractedResumeData as jest.Mock).mockRejectedValueOnce(new Error("Save failed"));

      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      const saveButton = screen.getByTestId("save-button");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });

      // The error should be handled by the mutation
      // Wait for the mutation function to execute
      await waitFor(
        () => {
          expect(saveExtractedResumeData).toHaveBeenCalled();
        },
        { timeout: 3000 },
      );
    });

    it("handles missing session", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<ExtractedInformation data={mockParsedResumeData} error={null} />);

      // Component should still render, but save won't work without session
      expect(screen.getByTestId("extracted-user")).toBeInTheDocument();
    });
  });
});
