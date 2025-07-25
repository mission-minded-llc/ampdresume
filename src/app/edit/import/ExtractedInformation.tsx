import { Box, Typography } from "@mui/material";
import { ExtractedDataProvider, useExtractedData } from "./ExtractedDataContext";

import { ExtractedEducation } from "./education/ExtractedEducation";
import { ExtractedSkills } from "./ExtractedSkills";
import { ExtractedUser } from "./ExtractedUser";
import { ExtractedWorkExperience } from "./experience/ExtractedWorkExperience";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ParsedResumeData } from "./types";
import { UpdateWithConfirmation } from "../components/UpdateWithConfirmation";
import { saveExtractedResumeData } from "@/graphql/saveExtractedResumeData";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

/**
 * The main component for the extracted information page. This component
 * relies on the wrapping context provider to provide the extracted data,
 * hence its extraction from the component hierarchy.
 *
 * @returns The extracted information page.
 */
const ExtractedInformationContent = () => {
  const { data: session } = useSession();

  const {
    user,
    skills,
    companies,
    education,
    error,
    setUser,
    setSkills,
    setCompanies,
    setEducation,
  } = useExtractedData();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateRequiredFields = () => {
    if (!user) return null; // No user, no validation errors.

    for (const edu of education) {
      if (!edu.dateAwarded) {
        return "All education entries must have a Date Awarded.";
      }
    }

    for (const company of companies) {
      if (!company.startDate) {
        return `Company '${company.name || "(Unnamed)"}' is missing a Start Date.`;
      }

      for (const position of company.positions) {
        if (!position.startDate) {
          return `Position '${position.title || "(Untitled)"}' at '${company.name || "(Unnamed)"}' is missing a Start Date.`;
        }
      }
    }

    return null; // No validation errors.
  };

  /**
   * Save the extracted information to the database.
   */
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user || !session?.user.id) return;

      const validationMsg = validateRequiredFields();
      if (validationMsg) {
        setValidationError(validationMsg);
        throw new Error(validationMsg);
      }

      setValidationError(null);

      await saveExtractedResumeData({
        userId: session.user.id,
        user: {
          name: user.name,
          displayEmail: user.displayEmail,
          location: user.location,
          title: user.title,
        },
        skillIds: skills.map((skill) => skill.id),
        companies: companies,
        education: education,
      });

      // Redirect to the experience page on successful save.
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
      <LoadingOverlay open={saveMutation.isPending} message="Saving Resume..." />
      {!user && <Typography variant="h6">Extracted Information</Typography>}
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          padding: { xs: 1, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          boxShadow: 1,
        })}
      >
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : user ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ExtractedUser user={user} setUser={setUser} />
            <ExtractedWorkExperience companies={companies} setCompanies={setCompanies} />
            <ExtractedEducation education={education} setEducation={setEducation} />
            <ExtractedSkills skills={skills} setSkills={setSkills} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {validationError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {validationError}
                </Typography>
              )}
              <UpdateWithConfirmation
                onConfirmUpdate={() => saveMutation.mutate()}
                buttonLabel={saveMutation.isPending ? "Saving..." : "Save All"}
                dialogTitle="Confirm Save"
                dialogMessage="Are you sure you want to save? This will update your resume with the extracted information."
                disabled={saveMutation.isPending}
              />
            </Box>
          </Box>
        ) : (
          <Typography>No data available yet. Please upload a PDF file.</Typography>
        )}
      </Box>
    </Box>
  );
};

/**
 * The main component for the extracted information page.
 *
 * @returns The extracted information page.
 */
export const ExtractedInformation = ({
  data,
  error,
}: {
  data: ParsedResumeData | null;
  error: string | null;
}) => {
  return (
    <ExtractedDataProvider initialData={data} initialError={error}>
      <ExtractedInformationContent />
    </ExtractedDataProvider>
  );
};
