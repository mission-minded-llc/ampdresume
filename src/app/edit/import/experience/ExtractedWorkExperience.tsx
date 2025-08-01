import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import { AccordionSummaryContent } from "../../components/AccordionSummaryContent";

import { CompanyFields } from "./CompanyFields";
import { PositionFields } from "./PositionFields";
import { ProjectField } from "./ProjectField";
import { Company } from "./types";

/**
 * The component for the extracted work experience.
 *
 * @param companies - The companies to display.
 * @param setCompanies - The function to set the companies.
 * @returns The extracted work experience component.
 */
export const ExtractedWorkExperience = ({
  companies,
  setCompanies,
}: {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}) => {
  const [expandedCompany, setExpandedCompany] = useState<string | false>(false);
  const [expandedPosition, setExpandedPosition] = useState<string | false>(false);

  // Add effect to expand accordion when start date is empty
  useEffect(() => {
    const companyWithEmptyStartDate = companies.findIndex((company) => !company.startDate);
    if (companyWithEmptyStartDate !== -1) {
      setExpandedCompany(`company-${companyWithEmptyStartDate}`);
    }
  }, [companies]);

  // Add effect to expand position accordion when start date is empty
  useEffect(() => {
    companies.forEach((company, companyIndex) => {
      const positionWithEmptyStartDate = company.positions.findIndex(
        (position) => !position.startDate,
      );
      if (positionWithEmptyStartDate !== -1) {
        setExpandedCompany(`company-${companyIndex}`);
        setExpandedPosition(`position-${companyIndex}-${positionWithEmptyStartDate}`);
      }
    });
  }, [companies]);

  const handleCompanyChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCompany(isExpanded ? panel : false);
    };

  const handlePositionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPosition(isExpanded ? panel : false);
    };

  const handleDateChange = useCallback(
    (
      companyIndex: number,
      positionIndex: number | undefined,
      field: "startDate" | "endDate",
      date: string,
    ) => {
      const updatedCompanies = [...companies];
      if (positionIndex !== undefined) {
        updatedCompanies[companyIndex].positions[positionIndex] = {
          ...updatedCompanies[companyIndex].positions[positionIndex],
          [field]: date,
        };
      } else {
        updatedCompanies[companyIndex] = {
          ...updatedCompanies[companyIndex],
          [field]: date,
        };
      }
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  const handleDeleteCompany = useCallback(
    (companyIndex: number) => {
      const updatedCompanies = companies.filter((_, i) => i !== companyIndex);
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  const handleDeletePosition = useCallback(
    (companyIndex: number, positionIndex: number) => {
      const updatedCompanies = [...companies];
      const updatedPositions = updatedCompanies[companyIndex].positions.filter(
        (_, i) => i !== positionIndex,
      );
      updatedCompanies[companyIndex] = {
        ...updatedCompanies[companyIndex],
        positions: updatedPositions,
      };
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  const handleDeleteProject = useCallback(
    (companyIndex: number, positionIndex: number, projectIndex: number) => {
      const updatedCompanies = [...companies];
      updatedCompanies[companyIndex].positions[positionIndex].projects = updatedCompanies[
        companyIndex
      ].positions[positionIndex].projects.filter((_, i) => i !== projectIndex);
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  const handleCompanyFieldChange = useCallback(
    (companyIndex: number, field: string, value: string) => {
      const updatedCompanies = [...companies];
      updatedCompanies[companyIndex] = {
        ...updatedCompanies[companyIndex],
        [field]: value,
      };
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  const handlePositionFieldChange = useCallback(
    (companyIndex: number, positionIndex: number, field: string, value: string) => {
      const updatedCompanies = [...companies];
      updatedCompanies[companyIndex].positions[positionIndex] = {
        ...updatedCompanies[companyIndex].positions[positionIndex],
        [field]: value,
      };
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  const handleProjectFieldChange = useCallback(
    (
      companyIndex: number,
      positionIndex: number,
      projectIndex: number,
      field: string,
      value: string,
    ) => {
      const updatedCompanies = [...companies];
      updatedCompanies[companyIndex].positions[positionIndex].projects[projectIndex] = {
        ...updatedCompanies[companyIndex].positions[positionIndex].projects[projectIndex],
        [field]: value,
      };
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mt: 0,
          mb: { xs: 1, sm: 2 },
          padding: { xs: 1, sm: 0 },
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
        Work Experience
      </Typography>
      {companies.map((company, index) => {
        const companyId = `company-${index}`;
        const isCompanyExpanded = expandedCompany === companyId;

        return (
          <Accordion
            key={companyId}
            expanded={isCompanyExpanded}
            onChange={handleCompanyChange(companyId)}
            sx={{ mb: 2, width: "100%", padding: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: "background.default",
                mb: isCompanyExpanded ? 2 : 0,
              }}
            >
              <AccordionSummaryContent
                primary={company.name || "Unnamed Company"}
                secondary={company.location || undefined}
                dateRange={
                  company.startDate
                    ? `${dayjs(company.startDate).format("MMM YYYY")}${company.endDate ? ` - ${dayjs(company.endDate).format("MMM YYYY")}` : " - Present"}`
                    : ""
                }
              />
            </AccordionSummary>
            <AccordionDetails sx={{ width: "100%", padding: 1 }}>
              <CompanyFields
                company={company}
                companyIndex={index}
                onFieldChange={(companyIndex, field, value) =>
                  handleCompanyFieldChange(companyIndex, field, value)
                }
                onDateChange={handleDateChange}
                onDelete={handleDeleteCompany}
              />

              {company.positions.map((position, positionIndex) => {
                const positionId = `position-${index}-${positionIndex}`;
                const isPositionExpanded = expandedPosition === positionId;

                return (
                  <Accordion
                    key={positionId}
                    expanded={isPositionExpanded}
                    onChange={handlePositionChange(positionId)}
                    sx={{ mb: 1, width: "100%" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: "background.default",
                        mb: isPositionExpanded ? 2 : 0,
                      }}
                    >
                      <AccordionSummaryContent
                        primary={position.title || "Unnamed Position"}
                        dateRange={
                          position.startDate && position.endDate
                            ? `${dayjs(position.startDate).format("MMM YYYY")}${position.endDate ? ` - ${dayjs(position.endDate).format("MMM YYYY")}` : " - Present"}`
                            : ""
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <PositionFields
                        position={position}
                        companyIndex={index}
                        positionIndex={positionIndex}
                        onFieldChange={(companyIndex, positionIndex, field, value) =>
                          handlePositionFieldChange(companyIndex, positionIndex, field, value)
                        }
                        onDateChange={handleDateChange}
                        onDelete={handleDeletePosition}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 2,
                          mb: 2,
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        <strong>Note:</strong> Projects can be reordered by dragging and dropping
                        after saving.
                      </Typography>
                      {position.projects.map((project, projectIndex) => (
                        <ProjectField
                          key={`${project.name}`}
                          project={project}
                          companyIndex={index}
                          positionIndex={positionIndex}
                          projectIndex={projectIndex}
                          onFieldChange={(
                            companyIndex,
                            positionIndex,
                            projectIndex,
                            field,
                            value,
                          ) =>
                            handleProjectFieldChange(
                              companyIndex,
                              positionIndex,
                              projectIndex,
                              field,
                              value,
                            )
                          }
                          onDelete={handleDeleteProject}
                        />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
