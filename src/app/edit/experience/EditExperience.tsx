"use client";

import { Box, Typography } from "@mui/material";

import { CompanyList } from "./CompanyList";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { ResumeProvider } from "@/components/resume/ResumeContext";
import { SectionTitle } from "../components/SectionTitle";
import { getCompanies } from "@/graphql/getCompanies";
import { getPositions } from "@/graphql/getPositions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const EditExperience = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending: isPendingCompanies,
    error: errorCompanies,
    data: companies,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["companies"],
    queryFn: async () => await getCompanies(session?.user.id),
  });

  const {
    isPending: isPendingPositions,
    error: errorPositions,
    data: positions,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["positions", companies],
    queryFn: async () => {
      if (!companies) return [];

      return await getPositions(companies.map((company) => company.id));
    },
  });

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  const isPending = isPendingCompanies || isPendingPositions;

  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (errorCompanies) return <Box>Error loading companies: {errorCompanies.message}</Box>;
  if (errorPositions) return <Box>Error loading positions: {errorPositions.message}</Box>;

  return (
    <ResumeProvider
      companies={companies ?? []}
      positions={positions ?? []}
      education={[]}
      skillsForUser={[]}
    >
      <SectionTitle title="Edit Professional Experience" />
      <Typography variant="body1" sx={{ mb: 4 }}>
        Add your professional experience to your resume. You can add multiple companies and
        positions. To begin, add a company. Positions can be added within a company, and from there
        you can add projects (e.g. bullet points) to positions.
      </Typography>

      <CompanyList />
    </ResumeProvider>
  );
};
