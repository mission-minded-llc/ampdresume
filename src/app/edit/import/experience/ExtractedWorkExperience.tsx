import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Company } from "./types";
import { CompanyFields } from "./CompanyFields";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PositionFields } from "./PositionFields";
import { ProjectField } from "./ProjectField";
import dayjs from "dayjs";

interface ExtractedWorkExperienceProps {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}

export const ExtractedWorkExperience = ({
  companies,
  setCompanies,
}: ExtractedWorkExperienceProps) => {
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

  const handleFieldChange = useCallback(
    (
      companyIndex: number,
      positionIndex: number | undefined,
      projectIndex: number | undefined,
      field: string,
      value: string,
    ) => {
      const updatedCompanies = [...companies];
      if (projectIndex !== undefined) {
        updatedCompanies[companyIndex].positions[positionIndex!].projects[projectIndex] = {
          ...updatedCompanies[companyIndex].positions[positionIndex!].projects[projectIndex],
          [field]: value,
        };
      } else if (positionIndex !== undefined) {
        updatedCompanies[companyIndex].positions[positionIndex] = {
          ...updatedCompanies[companyIndex].positions[positionIndex],
          [field]: value,
        };
      } else {
        updatedCompanies[companyIndex] = {
          ...updatedCompanies[companyIndex],
          [field]: value,
        };
      }
      setCompanies(updatedCompanies);
    },
    [companies, setCompanies],
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
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
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: "background.default",
                mb: isCompanyExpanded ? 2 : 0,
              }}
            >
              <Typography sx={{ display: "flex", width: "100%" }}>
                <strong>{company.name || "Unnamed Company"}</strong>
                <span
                  style={{
                    opacity: !isCompanyExpanded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    marginLeft: 24,
                  }}
                >
                  <span>{company.location ? company.location : ""}</span>
                  <span style={{ marginRight: 24 }}>
                    {company.startDate ? `${dayjs(company.startDate).format("MMM YYYY")}` : ""}
                    {company.endDate
                      ? ` - ${dayjs(company.endDate).format("MMM YYYY")}`
                      : company.startDate
                        ? " - Present"
                        : ""}
                  </span>
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CompanyFields
                company={company}
                companyIndex={index}
                onFieldChange={handleFieldChange}
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
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: "background.default",
                        mb: isPositionExpanded ? 2 : 0,
                      }}
                    >
                      <Typography>
                        {position.title || "Unnamed Position"}
                        <span
                          style={{
                            opacity: !isPositionExpanded ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out",
                          }}
                        >
                          {position.startDate && position.endDate && (
                            <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                              ({dayjs(position.startDate).format("MMM YYYY")} -{" "}
                              {position.endDate
                                ? dayjs(position.endDate).format("MMM YYYY")
                                : "Present"}
                              )
                            </Typography>
                          )}
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <PositionFields
                        position={position}
                        companyIndex={index}
                        positionIndex={positionIndex}
                        onFieldChange={handleFieldChange}
                        onDateChange={handleDateChange}
                        onDelete={handleDeletePosition}
                      />
                      {position.projects.map((project, projectIndex) => (
                        <ProjectField
                          key={projectIndex}
                          project={project}
                          companyIndex={index}
                          positionIndex={positionIndex}
                          projectIndex={projectIndex}
                          onFieldChange={handleFieldChange}
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
