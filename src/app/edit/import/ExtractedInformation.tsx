import { Box, Typography } from "@mui/material";

import { ExtractedEducation } from "./ExtractedEducation";
import { ExtractedSkills } from "./ExtractedSkills";
import { ExtractedUser } from "./ExtractedUser";
import { ExtractedWorkExperience } from "./ExtractedWorkExperience";
import { ParsedResumeData } from "./types";

interface ExtractedInformationProps {
  data: ParsedResumeData | null;
  error: string | null;
}

export const ExtractedInformation = ({ data, error }: ExtractedInformationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 4,
      }}
    >
      {!data && <Typography variant="h6">Extracted Information</Typography>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          padding: 3,
          backgroundColor: "background.paper",
          boxShadow: 1,
        }}
      >
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : data ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ExtractedUser user={data.user} />
            <ExtractedWorkExperience companies={data.companies} />
            <ExtractedEducation education={data.education} />
            <ExtractedSkills skills={data.skills} />
          </Box>
        ) : (
          <Typography>No data available yet. Please upload a PDF file.</Typography>
        )}
      </Box>
    </Box>
  );
};
