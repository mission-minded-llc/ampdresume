import { Box, Button, Typography } from "@mui/material";
import { ExtractedDataProvider, useExtractedData } from "./ExtractedDataContext";

import { ExtractedEducation } from "./ExtractedEducation";
import { ExtractedSkills } from "./ExtractedSkills";
import { ExtractedUser } from "./ExtractedUser";
import { ExtractedWorkExperience } from "./ExtractedWorkExperience";
import { ParsedResumeData } from "./types";
import { saveExtractedResumeData } from "@/graphql/saveExtractedResumeData";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ExtractedInformationProps {
  data: ParsedResumeData | null;
  error: string | null;
}

const ExtractedInformationContent = () => {
  const { data: session } = useSession();
  const { data, error } = useExtractedData();

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!data || !session?.user.id) return;
      await saveExtractedResumeData({
        userId: session.user.id,
        user: data.user,
        skills: data.skills,
        companies: data.companies,
        education: data.education,
      });
    },
  });

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
          borderRadius: 2,
          padding: 3,
          backgroundColor: "#f3f3f3",
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              sx={{ mt: 2 }}
            >
              {saveMutation.isPending ? "Saving..." : "Save All"}
            </Button>
          </Box>
        ) : (
          <Typography>No data available yet. Please upload a PDF file.</Typography>
        )}
      </Box>
    </Box>
  );
};

export const ExtractedInformation = ({ data, error }: ExtractedInformationProps) => {
  return (
    <ExtractedDataProvider initialData={data} initialError={error}>
      <ExtractedInformationContent />
    </ExtractedDataProvider>
  );
};
