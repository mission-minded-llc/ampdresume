import { Box, Typography } from "@mui/material";
import { ExtractedDataProvider, useExtractedData } from "./ExtractedDataContext";

import { ExtractedEducation } from "./ExtractedEducation";
import { ExtractedSkills } from "./ExtractedSkills";
import { ExtractedUser } from "./ExtractedUser";
import { ExtractedWorkExperience } from "./ExtractedWorkExperience";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ParsedResumeData } from "./types";
import { UpdateWithConfirmation } from "../components/UpdateWithConfirmation";
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
        user: {
          name: data.user.name,
          email: data.user.email,
          location: data.user.location,
          title: data.user.title,
        },
        skillIds: data.skills.map((skill) => skill.id),
        companies: data.companies,
        education: data.education,
      });

      window.location.href = "/edit/experience";
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
      {saveMutation.isPending && <LoadingOverlay message="Saving Resume..." />}
      {!data && <Typography variant="h6">Extracted Information</Typography>}
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          padding: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: 1,
        })}
      >
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : data ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ExtractedUser user={data.user} />
            <ExtractedWorkExperience companies={data.companies} />
            <ExtractedEducation education={data.education} />
            <ExtractedSkills skills={data.skills} />
            <UpdateWithConfirmation
              onConfirmUpdate={() => saveMutation.mutate()}
              buttonLabel={saveMutation.isPending ? "Saving..." : "Save All"}
              dialogTitle="Confirm Save"
              dialogMessage="Are you sure you want to save? This will update your resume with the extracted information."
              disabled={saveMutation.isPending}
            />
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
