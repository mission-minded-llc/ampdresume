import { Box, IconButton, TextField, Typography } from "@mui/material";

import { Company } from "@openresume/theme";
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useState } from "react";

interface ExtractedWorkExperienceProps {
  companies: Company[];
}

export const ExtractedWorkExperience = ({ companies }: ExtractedWorkExperienceProps) => {
  const [localCompanies, setLocalCompanies] = useState<Company[]>(companies);

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
        <Box
          key={index}
          sx={{
            mb: 3,
            p: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            backgroundColor: "background.default",
          }}
        >
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
            <Box
              key={positionIndex}
              sx={{
                mb: 1,
                p: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.default",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
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
                        handleDateChange(index, positionIndex, "endDate", date?.toISOString() || "")
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
                <Box key={projectIndex} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                  <TextField
                    fullWidth
                    label="Project"
                    value={project.name || ""}
                    sx={{ mb: 2, border: "none" }}
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
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
