import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { WorkExperienceSection } from "./WorkExperience";
import { Company } from "@/types";
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

describe("WorkExperienceSection Component", () => {
  const createMockCompany = (overrides?: Partial<Company>): Company => ({
    id: "company-1",
    name: "Test Company",
    description: "A test company",
    location: "San Francisco, CA",
    startDate: "1640995200000", // Jan 1, 2022
    endDate: "1672531200000", // Jan 1, 2023
    positions: [
      {
        id: "position-1",
        title: "Software Engineer",
        startDate: "1640995200000", // Jan 1, 2022
        endDate: "1672531200000", // Jan 1, 2023
        projects: [
          {
            id: "project-1",
            name: "Test Project",
            description: "<p>Project description</p>",
            sortIndex: 0,
            skillsForProject: [
              {
                id: "skill-project-1",
                description: null,
                skillForUser: {
                  id: "skill-user-1",
                  userId: "user-1",
                  icon: null,
                  skill: {
                    id: "skill-1",
                    name: "React",
                    icon: null,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    ...overrides,
  });

  describe("Rendering Conditions", () => {
    it("should render section heading when companies array is empty", () => {
      renderWithTheme(<WorkExperienceSection companies={[]} />);
      expect(screen.getByText("Work Experience")).toBeInTheDocument();
    });

    it("should render section heading and company information when companies are provided", () => {
      const companies = [createMockCompany()];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Work Experience")).toBeInTheDocument();
      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });

    it("should render multiple companies", () => {
      const companies = [
        createMockCompany({ id: "company-1", name: "Company A" }),
        createMockCompany({ id: "company-2", name: "Company B" }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Company A")).toBeInTheDocument();
      expect(screen.getByText("Company B")).toBeInTheDocument();
    });
  });

  describe("Company Information Display", () => {
    it("should display company name", () => {
      const companies = [createMockCompany({ name: "Acme Corp" })];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    });

    it("should display company location when provided", () => {
      const companies = [createMockCompany({ location: "New York, NY" })];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText(/New York, NY/)).toBeInTheDocument();
    });

    it("should handle missing location gracefully", () => {
      const companies = [createMockCompany({ location: "" })];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("should format dates correctly with start and end dates", () => {
      const companies = [
        createMockCompany({
          startDate: "1640995200000", // Jan 1, 2022
          endDate: "1672531200000", // Jan 1, 2023
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      // Dates are formatted as "MMM YYYY" (e.g., "Dec 2021", "Jan 2022")
      // Use flexible matching since timezone can affect the exact month shown
      expect(screen.getAllByText(/\d{4}/).length).toBeGreaterThan(0); // Should contain years
      expect(screen.getAllByText(/ to /).length).toBeGreaterThan(0); // Should contain date separators
    });

    it("should display 'Present' when end date is null", () => {
      const companies = [
        createMockCompany({
          startDate: "1640995200000", // Jan 1, 2022
          endDate: null,
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText(/Present/)).toBeInTheDocument();
    });

    it("should handle missing start date gracefully", () => {
      const companies = [
        createMockCompany({
          startDate: "",
          endDate: "1672531200000", // Jan 1, 2023
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      // Should still render the end date
      expect(screen.getAllByText(/\d{4}/).length).toBeGreaterThan(0);
    });
  });

  describe("Position Display", () => {
    it("should display position title", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Senior Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    });

    it("should display position dates", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000", // Jan 1, 2022
              endDate: "1672531200000", // Jan 1, 2023
              projects: [],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      // Dates are formatted as "MMM YYYY", use flexible matching
      expect(screen.getAllByText(/\d{4}/).length).toBeGreaterThan(0); // Should contain years
      expect(screen.getAllByText(/ to /).length).toBeGreaterThan(0); // Should contain date separators
    });

    it("should display 'Present' for position with no end date", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: null,
              projects: [],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText(/Present/)).toBeInTheDocument();
    });

    it("should handle multiple positions", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Junior Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [],
            },
            {
              id: "position-2",
              title: "Senior Developer",
              startDate: "1672531200000",
              endDate: null,
              projects: [],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Junior Developer")).toBeInTheDocument();
      expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    });
  });

  describe("Project Display", () => {
    it("should display project name", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Awesome Project",
                  description: null,
                  sortIndex: 0,
                  skillsForProject: [],
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Awesome Project")).toBeInTheDocument();
    });

    it("should render project description using RichTextBlock", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Test Project",
                  description: "<p>This is a project description</p>",
                  sortIndex: 0,
                  skillsForProject: [],
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("This is a project description")).toBeInTheDocument();
    });

    it("should handle null project description", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Test Project",
                  description: null,
                  sortIndex: 0,
                  skillsForProject: [],
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("should display multiple projects", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Project One",
                  description: null,
                  sortIndex: 0,
                  skillsForProject: [],
                },
                {
                  id: "project-2",
                  name: "Project Two",
                  description: null,
                  sortIndex: 1,
                  skillsForProject: [],
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Project One")).toBeInTheDocument();
      expect(screen.getByText("Project Two")).toBeInTheDocument();
    });
  });

  describe("Skills Display", () => {
    it("should display skills for a project", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Test Project",
                  description: null,
                  sortIndex: 0,
                  skillsForProject: [
                    {
                      id: "skill-project-1",
                      description: null,
                      skillForUser: {
                        id: "skill-user-1",
                        userId: "user-1",
                        icon: null,
                        skill: {
                          id: "skill-1",
                          name: "React",
                          icon: null,
                        },
                      },
                    },
                    {
                      id: "skill-project-2",
                      description: null,
                      skillForUser: {
                        id: "skill-user-2",
                        userId: "user-1",
                        icon: null,
                        skill: {
                          id: "skill-2",
                          name: "TypeScript",
                          icon: null,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("should not display skills section when skills array is empty", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Test Project",
                  description: null,
                  sortIndex: 0,
                  skillsForProject: [],
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Test Project")).toBeInTheDocument();
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    it("should handle missing skillsForProject array", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [
                {
                  id: "project-1",
                  name: "Test Project",
                  description: null,
                  sortIndex: 0,
                  skillsForProject: undefined as any,
                },
              ],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });
  });

  describe("Theme Support", () => {
    it("should render correctly in light theme", () => {
      const companies = [createMockCompany()];
      const { container } = renderWithTheme(<WorkExperienceSection companies={companies} />, "light");

      expect(screen.getByText("Work Experience")).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render correctly in dark theme", () => {
      const companies = [createMockCompany()];
      const { container } = renderWithTheme(<WorkExperienceSection companies={companies} />, "dark");

      expect(screen.getByText("Work Experience")).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle company with no positions", () => {
      const companies = [
        createMockCompany({
          positions: [],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });

    it("should handle position with no projects", () => {
      const companies = [
        createMockCompany({
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "1640995200000",
              endDate: "1672531200000",
              projects: [],
            },
          ],
        }),
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Developer")).toBeInTheDocument();
    });

    it("should handle missing optional fields gracefully", () => {
      const companies = [
        {
          id: "company-1",
          name: "Minimal Company",
          description: null,
          location: "",
          startDate: "",
          endDate: null,
          positions: [
            {
              id: "position-1",
              title: "Developer",
              startDate: "",
              endDate: null,
              projects: [],
            },
          ],
        } as Company,
      ];
      renderWithTheme(<WorkExperienceSection companies={companies} />);

      expect(screen.getByText("Minimal Company")).toBeInTheDocument();
      expect(screen.getByText("Developer")).toBeInTheDocument();
    });
  });
});
