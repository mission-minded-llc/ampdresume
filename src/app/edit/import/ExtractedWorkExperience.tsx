import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteIconOutlined from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useExtractedData } from "./ExtractedDataContext";
import { useState } from "react";

interface ExtractedWorkExperienceProps {
  companies: {
    name: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    positions: {
      title: string;
      startDate: string;
      endDate: string | null;
      projects: {
        name: string;
        description: string | null;
      }[];
    }[];
  }[];
}

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

  const handleDateChange = (
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
  };

  const handleDeleteProject = (
    companyIndex: number,
    positionIndex: number,
    projectIndex: number,
  ) => {
    const updatedCompanies = [...companies];
    const updatedPosition = {
      ...updatedCompanies[companyIndex].positions[positionIndex],
      projects: updatedCompanies[companyIndex].positions[positionIndex].projects.filter(
        (_, i) => i !== projectIndex,
      ),
    };
    const updatedPositions = [...updatedCompanies[companyIndex].positions];
    updatedPositions[positionIndex] = updatedPosition;
    updatedCompanies[companyIndex] = {
      ...updatedCompanies[companyIndex],
      positions: updatedPositions,
    };
    updateCompanies(updatedCompanies);
  };

  const handleDeleteCompany = (companyIndex: number) => {
    const updatedCompanies = companies.filter((_, i) => i !== companyIndex);
    updateCompanies(updatedCompanies);
  };

  const handleDeletePosition = (companyIndex: number, positionIndex: number) => {
    const updatedCompanies = [...companies];
    const updatedPositions = updatedCompanies[companyIndex].positions.filter(
      (_, i) => i !== positionIndex,
    );
    updatedCompanies[companyIndex] = {
      ...updatedCompanies[companyIndex],
      positions: updatedPositions,
    };
    updateCompanies(updatedCompanies);
  };

  const handleFieldChange = (
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
  };

  return (
    <Box>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1, mr: 2 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={company.name || ""}
                      onChange={(e) =>
                        handleFieldChange(index, undefined, undefined, "name", e.target.value)
                      }
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Location"
                      value={company.location || ""}
                      onChange={(e) =>
                        handleFieldChange(index, undefined, undefined, "location", e.target.value)
                      }
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <DatePicker
                      label="Start Date"
                      value={company.startDate ? dayjs(company.startDate) : null}
                      onChange={(date) =>
                        handleDateChange(index, undefined, "startDate", date?.toISOString() || "")
                      }
                      sx={{ flex: 1 }}
                    />
                    <DatePicker
                      label="End Date"
                      value={company.endDate ? dayjs(company.endDate) : null}
                      onChange={(date) =>
                        handleDateChange(index, undefined, "endDate", date?.toISOString() || "")
                      }
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
                <IconButton onClick={() => handleDeleteCompany(index)} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ flex: 1, mr: 2 }}>
                          <TextField
                            fullWidth
                            label="Position"
                            value={position.title || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                positionIndex,
                                undefined,
                                "title",
                                e.target.value,
                              )
                            }
                            sx={{ mb: 2 }}
                          />
                          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <DatePicker
                              label="Start Date"
                              value={position.startDate ? dayjs(position.startDate) : null}
                              onChange={(date) =>
                                handleDateChange(
                                  index,
                                  positionIndex,
                                  "startDate",
                                  date?.toISOString() || "",
                                )
                              }
                              sx={{ flex: 1 }}
                            />
                            <DatePicker
                              label="End Date"
                              value={position.endDate ? dayjs(position.endDate) : null}
                              onChange={(date) =>
                                handleDateChange(
                                  index,
                                  positionIndex,
                                  "endDate",
                                  date?.toISOString() || "",
                                )
                              }
                              sx={{ flex: 1 }}
                            />
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => handleDeletePosition(index, positionIndex)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      {position.projects.map((project, projectIndex) => (
                        <Box
                          key={projectIndex}
                          sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}
                        >
                          <TextField
                            fullWidth
                            value={project.name || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                positionIndex,
                                projectIndex,
                                "name",
                                e.target.value,
                              )
                            }
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
                          <IconButton
                            onClick={() => handleDeleteProject(index, positionIndex, projectIndex)}
                            size="small"
                            sx={{ mt: 1 }}
                          >
                            <DeleteIconOutlined />
                          </IconButton>
                        </Box>
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
