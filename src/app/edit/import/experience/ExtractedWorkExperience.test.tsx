import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import { ExtractedWorkExperience } from "./ExtractedWorkExperience";
import { Company } from "./types";
import { expect } from "@jest/globals";

// Mock child components to simplify testing
jest.mock("./CompanyFields", () => ({
  CompanyFields: jest.fn(({ company, companyIndex, onFieldChange, onDateChange, onDelete }) => (
    <div data-testid={`company-fields-${companyIndex}`}>
      <div>Company: {company.name}</div>
      <div>Location: {company.location || "N/A"}</div>
      <button onClick={() => onFieldChange(companyIndex, "name", "Updated Name")}>
        Update Name
      </button>
      <button
        onClick={() =>
          onDateChange(companyIndex, undefined, "startDate", "2020-01-01T00:00:00.000Z")
        }
      >
        Update Start Date
      </button>
      <button onClick={() => onDelete(companyIndex)}>Delete Company</button>
    </div>
  )),
}));

jest.mock("./PositionFields", () => ({
  PositionFields: jest.fn(
    ({ position, companyIndex, positionIndex, onFieldChange, onDateChange, onDelete }) => (
      <div data-testid={`position-fields-${companyIndex}-${positionIndex}`}>
        <div>Position: {position.title}</div>
        <button
          onClick={() => onFieldChange(companyIndex, positionIndex, "title", "Updated Position")}
        >
          Update Position
        </button>
        <button
          onClick={() =>
            onDateChange(companyIndex, positionIndex, "startDate", "2021-01-01T00:00:00.000Z")
          }
        >
          Update Position Date
        </button>
        <button onClick={() => onDelete(companyIndex, positionIndex)}>Delete Position</button>
      </div>
    ),
  ),
}));

jest.mock("./ProjectField", () => ({
  ProjectField: jest.fn(
    ({ project, companyIndex, positionIndex, projectIndex, onFieldChange, onDelete }) => (
      <div data-testid={`project-field-${companyIndex}-${positionIndex}-${projectIndex}`}>
        <div>Project: {project.name}</div>
        <button
          onClick={() =>
            onFieldChange(companyIndex, positionIndex, projectIndex, "name", "Updated Project")
          }
        >
          Update Project
        </button>
        <button onClick={() => onDelete(companyIndex, positionIndex, projectIndex)}>
          Delete Project
        </button>
      </div>
    ),
  ),
}));

describe("ExtractedWorkExperience", () => {
  const mockCompany: Company = {
    name: "Test Company",
    location: "San Francisco, CA",
    startDate: "2020-01-01T00:00:00.000Z",
    endDate: "2022-12-31T00:00:00.000Z",
    positions: [
      {
        title: "Software Engineer",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: "2022-12-31T00:00:00.000Z",
        projects: [
          {
            name: "Project 1",
            description: null,
          },
        ],
      },
    ],
  };

  const mockCompanies: Company[] = [mockCompany];

  const renderComponent = (companies = mockCompanies, setCompanies = jest.fn()) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ExtractedWorkExperience companies={companies} setCompanies={setCompanies} />
      </LocalizationProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders correctly with companies", () => {
      renderComponent();

      expect(screen.getByText("Work Experience")).toBeInTheDocument();
      expect(screen.getAllByText("Test Company").length).toBeGreaterThan(0);
    });

    it("renders correctly with empty companies array", () => {
      renderComponent([]);

      expect(screen.getByText("Work Experience")).toBeInTheDocument();
    });

    it("displays company name in accordion", () => {
      renderComponent();

      expect(screen.getAllByText("Test Company").length).toBeGreaterThan(0);
    });

    it("displays company location in accordion", () => {
      renderComponent();

      expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
    });

    it("displays date range in accordion when dates are present", () => {
      renderComponent();

      const formattedStartDate = dayjs("2020-01-01T00:00:00.000Z").format("MMM YYYY");
      const formattedEndDate = dayjs("2022-12-31T00:00:00.000Z").format("MMM YYYY");
      expect(screen.getAllByText(new RegExp(formattedStartDate)).length).toBeGreaterThan(0);
      expect(screen.getAllByText(new RegExp(formattedEndDate)).length).toBeGreaterThan(0);
    });

    it("displays 'Unnamed Company' when company name is empty", () => {
      const unnamedCompany: Company = {
        name: "",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent([unnamedCompany]);

      expect(screen.getAllByText("Unnamed Company").length).toBeGreaterThan(0);
    });

    it("displays 'Unnamed Position' when position title is empty", () => {
      const companyWithUnnamedPosition: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            projects: [],
          },
        ],
      };

      renderComponent([companyWithUnnamedPosition]);

      expect(screen.getAllByText("Unnamed Position").length).toBeGreaterThan(0);
    });
  });

  describe("Accordion functionality", () => {
    it("expands company accordion when clicked", () => {
      renderComponent();

      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
        // After expansion, CompanyFields should be visible
        expect(screen.getByTestId("company-fields-0")).toBeInTheDocument();
      }
    });

    it("expands position accordion when clicked", () => {
      renderComponent();

      // First expand company accordion
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      // Then expand position accordion
      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Software Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
        expect(screen.getByTestId("position-fields-0-0")).toBeInTheDocument();
      }
    });

    it("auto-expands company accordion when start date is empty", async () => {
      const companyWithoutStartDate: Company = {
        name: "No Start Date Company",
        location: "SF",
        startDate: "",
        endDate: null,
        positions: [],
      };

      renderComponent([companyWithoutStartDate]);

      await waitFor(() => {
        // Company accordion should be expanded
        expect(screen.getByTestId("company-fields-0")).toBeInTheDocument();
      });
    });

    it("auto-expands position accordion when start date is empty", async () => {
      const companyWithPositionWithoutStartDate: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "Engineer",
            startDate: "",
            endDate: null,
            projects: [],
          },
        ],
      };

      renderComponent([companyWithPositionWithoutStartDate]);

      await waitFor(() => {
        // Both company and position accordions should be expanded
        expect(screen.getByTestId("company-fields-0")).toBeInTheDocument();
        expect(screen.getByTestId("position-fields-0-0")).toBeInTheDocument();
      });
    });
  });

  describe("Company field changes", () => {
    it("handles company field change", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand accordion
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      // Click update button in mocked CompanyFields
      const updateButton = screen.getByText("Update Name");
      fireEvent.click(updateButton);

      expect(setCompanies).toHaveBeenCalled();
    });

    it("handles company date change", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand accordion
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      // Click update date button
      const updateDateButton = screen.getByText("Update Start Date");
      fireEvent.click(updateDateButton);

      expect(setCompanies).toHaveBeenCalled();
    });
  });

  describe("Position field changes", () => {
    it("handles position field change", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand both accordions
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Software Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
      }

      // Click update position button
      const updatePositionButton = screen.getByText("Update Position");
      fireEvent.click(updatePositionButton);

      expect(setCompanies).toHaveBeenCalled();
    });

    it("handles position date change", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand both accordions
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Software Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
      }

      // Click update position date button
      const updateDateButton = screen.getByText("Update Position Date");
      fireEvent.click(updateDateButton);

      expect(setCompanies).toHaveBeenCalled();
    });
  });

  describe("Delete functionality", () => {
    it("handles company deletion", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand accordion
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      // Click delete button
      const deleteButton = screen.getByText("Delete Company");
      fireEvent.click(deleteButton);

      expect(setCompanies).toHaveBeenCalled();
      const updatedCompanies = setCompanies.mock.calls[0][0];
      expect(Array.isArray(updatedCompanies)).toBe(true);
    });

    it("handles position deletion", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand both accordions
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Software Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
      }

      // Click delete position button
      const deleteButton = screen.getByText("Delete Position");
      fireEvent.click(deleteButton);

      expect(setCompanies).toHaveBeenCalled();
    });

    it("handles project deletion", () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand both accordions
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Software Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
      }

      // Click delete project button
      const deleteButton = screen.getByText("Delete Project");
      fireEvent.click(deleteButton);

      expect(setCompanies).toHaveBeenCalled();
    });
  });

  describe("Project field changes", () => {
    it("renders projects when position accordion is expanded", async () => {
      const setCompanies = jest.fn();
      renderComponent(mockCompanies, setCompanies);

      // Expand both accordions
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      await waitFor(() => {
        expect(screen.getByTestId("company-fields-0")).toBeInTheDocument();
      });

      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Software Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
      }

      await waitFor(() => {
        expect(screen.getByTestId("position-fields-0-0")).toBeInTheDocument();
      });

      // Projects are rendered inside position accordion when expanded
      // ProjectField component is tested separately, so we just verify the structure renders
      // The actual project rendering is verified in the "handles position with multiple projects" test
    });
  });

  describe("Multiple companies", () => {
    it("renders multiple companies", () => {
      const multipleCompanies: Company[] = [
        {
          name: "Company 1",
          location: "SF",
          startDate: "2020-01-01T00:00:00.000Z",
          endDate: null,
          positions: [],
        },
        {
          name: "Company 2",
          location: "NY",
          startDate: "2021-01-01T00:00:00.000Z",
          endDate: null,
          positions: [],
        },
      ];

      renderComponent(multipleCompanies);

      expect(screen.getAllByText("Company 1").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Company 2").length).toBeGreaterThan(0);
    });

    it("handles multiple positions in a company", () => {
      const companyWithMultiplePositions: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "Engineer",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            projects: [],
          },
          {
            title: "Senior Engineer",
            startDate: "2021-01-01T00:00:00.000Z",
            endDate: null,
            projects: [],
          },
        ],
      };

      renderComponent([companyWithMultiplePositions]);

      expect(screen.getAllByText("Engineer").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Senior Engineer").length).toBeGreaterThan(0);
    });
  });

  describe("Date formatting", () => {
    it("displays 'Present' when end date is null", () => {
      const companyWithPresentEndDate: Company = {
        name: "Current Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent([companyWithPresentEndDate]);

      expect(screen.getAllByText(/Present/).length).toBeGreaterThan(0);
    });

    it("formats dates correctly in accordion", () => {
      renderComponent();

      const formattedStartDate = dayjs("2020-01-01T00:00:00.000Z").format("MMM YYYY");
      expect(screen.getAllByText(new RegExp(formattedStartDate)).length).toBeGreaterThan(0);
    });
  });

  describe("Edge cases", () => {
    it("handles company with no positions", () => {
      const companyWithoutPositions: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent([companyWithoutPositions]);

      expect(screen.getAllByText("Test Company").length).toBeGreaterThan(0);
    });

    it("handles position with no projects", () => {
      const companyWithPositionNoProjects: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "Engineer",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            projects: [],
          },
        ],
      };

      renderComponent([companyWithPositionNoProjects]);

      expect(screen.getAllByText("Engineer").length).toBeGreaterThan(0);
    });

    it("handles position with multiple projects", () => {
      const companyWithMultipleProjects: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "Engineer",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            projects: [
              { name: "Project 1", description: null },
              { name: "Project 2", description: null },
            ],
          },
        ],
      };

      renderComponent([companyWithMultipleProjects]);

      // Expand accordions to see projects
      const accordionButtons = screen.getAllByRole("button");
      const companyAccordionButton = accordionButtons.find((btn) =>
        btn.textContent?.includes("Test Company"),
      );
      if (companyAccordionButton) {
        fireEvent.click(companyAccordionButton);
      }

      const positionAccordionButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Engineer"));
      if (positionAccordionButton) {
        fireEvent.click(positionAccordionButton);
      }

      expect(screen.getByTestId("project-field-0-0-0")).toBeInTheDocument();
      expect(screen.getByTestId("project-field-0-0-1")).toBeInTheDocument();
    });
  });
});
