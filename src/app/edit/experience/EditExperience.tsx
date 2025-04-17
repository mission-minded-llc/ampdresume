"use client";

import { Box, Typography } from "@mui/material";

import { CompanyList } from "./CompanyList";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { getExperience } from "@/graphql/getExperience";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const EditExperience = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending: isPendingExperience,
    error: errorExperience,
    data: experience,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["experience"],
    queryFn: async () => await getExperience(session?.user.id),
  });

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (isPendingExperience) return <LoadingOverlay message="Loading resume data..." />;
  if (errorExperience) return <Box>Error loading experience: {errorExperience.message}</Box>;

  return (
    <>
      <SectionTitle title="Edit Professional Experience" />
      <Typography variant="body1" sx={{ mb: 4 }}>
        Add your professional experience to your resume. You can add multiple companies and
        positions. To begin, add a company. Positions can be added within a company, and from there
        you can add projects (e.g. bullet points) to positions.
      </Typography>

      {experience ? (
        <CompanyList companies={experience} />
      ) : (
        <Typography>No companies found.</Typography>
      )}
    </>
  );
};
