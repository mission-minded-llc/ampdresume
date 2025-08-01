import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";

import { ExtractedDataProvider } from "../ExtractedDataContext";

import { ExtractedEducation } from "./ExtractedEducation";

// Mock the ExtractedDataContext
jest.mock("../ExtractedDataContext", () => ({
  ...jest.requireActual("../ExtractedDataContext"),
  useExtractedData: () => ({
    updateEducation: jest.fn(),
  }),
}));

describe("ExtractedEducation", () => {
  const mockEducation = [
    {
      school: "Test University",
      degree: "Bachelor of Science",
      dateAwarded: "2020-05-15T00:00:00.000Z",
    },
    {
      school: "Another University",
      degree: "Master of Arts",
      dateAwarded: "2022-06-20T00:00:00.000Z",
    },
  ];

  const mockInitialData = {
    user: {
      name: "",
      displayEmail: "",
      location: "",
      title: "",
    },
    skills: [],
    companies: [],
    education: mockEducation,
  };

  const renderComponent = (education = mockEducation) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ExtractedDataProvider initialData={mockInitialData} initialError={null}>
          <ExtractedEducation education={education} setEducation={jest.fn()} />
        </ExtractedDataProvider>
      </LocalizationProvider>,
    );
  };

  it("renders education entries", () => {
    renderComponent();

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getAllByTestId("education-accordion-0")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("education-accordion-1")[0]).toBeInTheDocument();
  });

  it("displays education details in accordion", () => {
    renderComponent();

    const firstAccordion = screen.getAllByTestId("education-accordion-0")[0];
    expect(firstAccordion).toBeInTheDocument();

    // Check if degree and date are visible in collapsed state
    expect(screen.getByText("Bachelor of Science")).toBeInTheDocument();
    expect(screen.getByText(dayjs("2020-05-15").format("MMM YYYY"))).toBeInTheDocument();
  });

  it("expands accordion when clicked", () => {
    renderComponent();

    const accordion = screen.getAllByTestId("education-accordion-0")[0];
    fireEvent.click(accordion!);

    // After expansion, we should see the input fields
    expect(screen.getByRole("textbox", { name: "Institution" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Degree" })).toBeInTheDocument();
  });

  it("handles empty education array", () => {
    renderComponent([]);

    expect(screen.getByText("Education")).toBeInTheDocument();
    // Should not render any accordions
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("displays 'Unnamed School' for education entries without school name", () => {
    renderComponent([{ school: "", degree: "Test Degree", dateAwarded: "" }]);

    expect(screen.getAllByText("Unnamed School").length).toBeGreaterThan(0);
  });
});
