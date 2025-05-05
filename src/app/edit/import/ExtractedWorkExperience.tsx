import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Box, IconButton, TextField, Typography } from "@mui/material";

import { Company } from "@openresume/theme";
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useState } from "react";

interface ExtractedWorkExperienceProps {
  companies: Company[];
}

export const ExtractedWorkExperience = ({ companies }: ExtractedWorkExperienceProps) => {
  const [localCompanies, setLocalCompanies] = useState<Company[]>(companies);
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
    const updatedCompanies = [...localCompanies];
    if (positionIndex !== undefined) {
      updatedCompanies[companyIndex].positions![positionIndex] = {
        ...updatedCompanies[companyIndex].positions![positionIndex],
        [field]: date,
      };
    } else {
      updatedCompanies[companyIndex] = {
        ...updatedCompanies[companyIndex],
        [field]: date,
      };
    }
    setLocalCompanies(updatedCompanies);
  };

  const handleDeleteProject = (
    companyIndex: number,
    positionIndex: number,
    projectIndex: number,
  ) => {
    const updatedCompanies = [...localCompanies];
    const updatedPosition = {
      ...updatedCompanies[companyIndex].positions![positionIndex],
      projects: updatedCompanies[companyIndex].positions![positionIndex].projects?.filter(
        (_, i) => i !== projectIndex,
      ),
    };
    const updatedPositions = [...updatedCompanies[companyIndex].positions!];
    updatedPositions[positionIndex] = updatedPosition;
    updatedCompanies[companyIndex] = {
      ...updatedCompanies[companyIndex],
      positions: updatedPositions,
    };
    setLocalCompanies(updatedCompanies);
  };

  const handleDeleteCompany = (companyIndex: number) => {
    const updatedCompanies = localCompanies.filter((_, i) => i !== companyIndex);
    setLocalCompanies(updatedCompanies);
  };

  const handleDeletePosition = (companyIndex: number, positionIndex: number) => {
    const updatedCompanies = [...localCompanies];
    const updatedPositions = updatedCompanies[companyIndex].positions?.filter(
      (_, i) => i !== positionIndex,
    );
    updatedCompanies[companyIndex] = {
      ...updatedCompanies[companyIndex],
      positions: updatedPositions,
    };
    setLocalCompanies(updatedCompanies);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Work Experience
      </Typography>
      {localCompanies?.map((company, index) => (
        <Accordion
          key={index}
          expanded={expandedCompany === `company-${index}`}
          onChange={handleCompanyChange(`company-${index}`)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: "background.default",
              mb: expandedCompany === `company-${index}` ? 2 : 0,
            }}
          >
            <Typography
              sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <strong>{company.name || "Unnamed Company"}</strong>
              <span
                style={{
                  opacity: expandedCompany !== `company-${index}` ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <span>{company.location ? company.location : ""}</span>
                <em style={{ marginLeft: "auto", display: "flex", flexDirection: "row", gap: 2 }}>
                  {company.startDate ? `${dayjs(company.startDate).format("MMM YYYY")}` : ""}
                  {company.endDate
                    ? ` - ${dayjs(company.endDate).format("MMM YYYY")}`
                    : company.startDate
                      ? " - Present"
                      : ""}
                </em>
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
                  <TextField fullWidth label="Company" value={company.name || ""} sx={{ mb: 1 }} />
                  <TextField
                    fullWidth
                    label="Location"
                    value={company.location || ""}
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
            {company.positions?.map((position, positionIndex) => (
              <Accordion
                key={positionIndex}
                expanded={expandedPosition === `position-${index}-${positionIndex}`}
                onChange={handlePositionChange(`position-${index}-${positionIndex}`)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: "background.default",
                    mb: expandedPosition === `position-${index}-${positionIndex}` ? 2 : 0,
                  }}
                >
                  <Typography>
                    {position.title || "Unnamed Position"}
                    <span
                      style={{
                        opacity: expandedPosition !== `position-${index}-${positionIndex}` ? 1 : 0,
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
                  {position?.projects?.map((project, projectIndex) => (
                    <Box
                      key={projectIndex}
                      sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}
                    >
                      <TextField
                        fullWidth
                        value={project.name || ""}
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
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
