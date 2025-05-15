import { ExtractedDataProvider, useExtractedData } from "./ExtractedDataContext";
import { act, render, screen } from "@testing-library/react";

import { ParsedResumeData } from "./types";
import React from "react";

// Test component that uses the context
const TestComponent = () => {
  const { user, skills, companies, education, setUser, setSkills, setCompanies, setEducation } =
    useExtractedData();
  return (
    <div>
      <div data-testid="user-name">{user?.name}</div>
      <div data-testid="skills-count">{skills.length}</div>
      <div data-testid="companies-count">{companies.length}</div>
      <div data-testid="education-count">{education.length}</div>
      <button
        onClick={() =>
          setUser({
            name: "John Doe",
            displayEmail: "john@example.com",
            location: "New York",
            title: "Software Engineer",
          })
        }
      >
        Update User
      </button>
      <button
        onClick={() =>
          setSkills([
            {
              id: "1",
              name: "React",
              icon: "logos:react",
            },
          ])
        }
      >
        Update Skills
      </button>
      <button
        onClick={() =>
          setCompanies([
            {
              name: "Test Company",
              location: "Test Location",
              startDate: "2020-01",
              endDate: "2021-01",
              positions: [
                {
                  title: "Developer",
                  startDate: "2020-01",
                  endDate: "2021-01",
                  projects: [],
                },
              ],
            },
          ])
        }
      >
        Update Companies
      </button>
      <button
        onClick={() =>
          setEducation([
            {
              school: "Test University",
              degree: "Bachelor",
              dateAwarded: "2020-01",
            },
          ])
        }
      >
        Update Education
      </button>
    </div>
  );
};

describe("ExtractedDataContext", () => {
  const mockInitialData: ParsedResumeData = {
    user: {
      name: "Initial User",
      displayEmail: "",
      location: "",
      title: "",
    },
    skills: [],
    companies: [],
    education: [],
  };

  it("provides initial data to children", () => {
    render(
      <ExtractedDataProvider initialData={mockInitialData} initialError={null}>
        <TestComponent />
      </ExtractedDataProvider>,
    );

    expect(screen.getByTestId("user-name")).toHaveTextContent("Initial User");
    expect(screen.getByTestId("skills-count")).toHaveTextContent("0");
    expect(screen.getByTestId("companies-count")).toHaveTextContent("0");
    expect(screen.getByTestId("education-count")).toHaveTextContent("0");
  });

  it("updates user data when updateUser is called", () => {
    render(
      <ExtractedDataProvider initialData={mockInitialData} initialError={null}>
        <TestComponent />
      </ExtractedDataProvider>,
    );

    act(() => {
      screen.getByText("Update User").click();
    });

    expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe");
  });

  it("updates skills when updateSkills is called", () => {
    render(
      <ExtractedDataProvider initialData={mockInitialData} initialError={null}>
        <TestComponent />
      </ExtractedDataProvider>,
    );

    act(() => {
      screen.getByText("Update Skills").click();
    });

    expect(screen.getByTestId("skills-count")).toHaveTextContent("1");
  });

  it("updates companies when updateCompanies is called", () => {
    render(
      <ExtractedDataProvider initialData={mockInitialData} initialError={null}>
        <TestComponent />
      </ExtractedDataProvider>,
    );

    act(() => {
      screen.getByText("Update Companies").click();
    });

    expect(screen.getByTestId("companies-count")).toHaveTextContent("1");
  });

  it("updates education when updateEducation is called", () => {
    render(
      <ExtractedDataProvider initialData={mockInitialData} initialError={null}>
        <TestComponent />
      </ExtractedDataProvider>,
    );

    act(() => {
      screen.getByText("Update Education").click();
    });

    expect(screen.getByTestId("education-count")).toHaveTextContent("1");
  });

  it("throws error when useExtractedData is used outside provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useExtractedData must be used within an ExtractedDataProvider");
    jest.restoreAllMocks();
  });
});
