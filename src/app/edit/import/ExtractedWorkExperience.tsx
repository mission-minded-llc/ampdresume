import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useCallback, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useExtractedData } from "./ExtractedDataContext";

interface Project {
  name: string;
  description: string | null;
}

interface Position {
  title: string;
  startDate: string;
  endDate: string | null;
  projects: Project[];
}

interface Company {
  name: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  positions: Position[];
}

interface ExtractedWorkExperienceProps {
  companies: Company[];
}

const ProjectField = memo(
  ({
    project,
    companyIndex,
    positionIndex,
    projectIndex,
    onFieldChange,
  }: {
    project: Project;
    companyIndex: number;
    positionIndex: number;
    projectIndex: number;
    onFieldChange: (
      companyIndex: number,
      positionIndex: number,
      projectIndex: number,
      field: string,
      value: string,
    ) => void;
  }) => {
    const [localValue, setLocalValue] = useState(project.name || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      if (localValue !== project.name) {
        onFieldChange(companyIndex, positionIndex, projectIndex, "name", localValue);
      }
    };

    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          sx={{
            boxShadow: "none",
            bgcolor: "background.default",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              borderBottom: "1px solid #e0e0e0",
            },
          }}
        />
      </Box>
    );
  },
);
ProjectField.displayName = "ProjectField";

const PositionFields = memo(
  ({
    position,
    companyIndex,
    positionIndex,
    onFieldChange,
    onDateChange,
    onDelete,
  }: {
    position: Position;
    companyIndex: number;
    positionIndex: number;
    onFieldChange: (
      companyIndex: number,
      positionIndex: number,
      projectIndex: number | undefined,
      field: string,
      value: string,
    ) => void;
    onDateChange: (
      companyIndex: number,
      positionIndex: number,
      field: "startDate" | "endDate",
      date: string,
    ) => void;
    onDelete: (companyIndex: number, positionIndex: number) => void;
  }) => {
    const [localTitle, setLocalTitle] = useState(position.title || "");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalTitle(e.target.value);
    };

    const handleTitleBlur = () => {
      if (localTitle !== position.title) {
        onFieldChange(companyIndex, positionIndex, undefined, "title", localTitle);
      }
    };

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <TextField
            fullWidth
            label="Position"
            value={localTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={position.startDate ? dayjs(position.startDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, positionIndex, "startDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
            />
            <DatePicker
              label="End Date"
              value={position.endDate ? dayjs(position.endDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, positionIndex, "endDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        <IconButton
          onClick={() => onDelete(companyIndex, positionIndex)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  },
);
PositionFields.displayName = "PositionFields";

const CompanyFields = memo(
  ({
    company,
    companyIndex,
    onFieldChange,
    onDateChange,
    onDelete,
  }: {
    company: Company;
    companyIndex: number;
    onFieldChange: (
      companyIndex: number,
      positionIndex: number | undefined,
      projectIndex: number | undefined,
      field: string,
      value: string,
    ) => void;
    onDateChange: (
      companyIndex: number,
      positionIndex: number | undefined,
      field: "startDate" | "endDate",
      date: string,
    ) => void;
    onDelete: (companyIndex: number) => void;
  }) => {
    const [localName, setLocalName] = useState(company.name || "");
    const [localLocation, setLocalLocation] = useState(company.location || "");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalName(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalLocation(e.target.value);
    };

    const handleNameBlur = () => {
      if (localName !== company.name) {
        onFieldChange(companyIndex, undefined, undefined, "name", localName);
      }
    };

    const handleLocationBlur = () => {
      if (localLocation !== company.location) {
        onFieldChange(companyIndex, undefined, undefined, "location", localLocation);
      }
    };

    return (
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Company"
              value={localName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={localLocation}
              onChange={handleLocationChange}
              onBlur={handleLocationBlur}
              sx={{ mb: 1 }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={company.startDate ? dayjs(company.startDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, undefined, "startDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
            />
            <DatePicker
              label="End Date"
              value={company.endDate ? dayjs(company.endDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, undefined, "endDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        <IconButton onClick={() => onDelete(companyIndex)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  },
);
CompanyFields.displayName = "CompanyFields";

export const ExtractedWorkExperience = ({ companies }: ExtractedWorkExperienceProps) => {
  const { updateCompanies } = useExtractedData();
  const [expandedCompany, setExpandedCompany] = useState<string | false>(false);
  const [expandedPosition, setExpandedPosition] = useState<string | false>(false);

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
      updateCompanies(updatedCompanies);
    },
    [companies, updateCompanies],
  );

  const handleDeleteCompany = useCallback(
    (companyIndex: number) => {
      const updatedCompanies = companies.filter((_, i) => i !== companyIndex);
      updateCompanies(updatedCompanies);
    },
    [companies, updateCompanies],
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
      updateCompanies(updatedCompanies);
    },
    [companies, updateCompanies],
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
      updateCompanies(updatedCompanies);
    },
    [companies, updateCompanies],
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
