"use client";

import { Box, Typography } from "@mui/material";

import { CompanyList } from "./CompanyList";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { getCompanies } from "@/graphql/getCompanies";
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

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (isPendingCompanies) return <LoadingOverlay message="Loading resume data..." />;
  if (errorCompanies) return <Box>Error loading companies: {errorCompanies.message}</Box>;

  return (
    <>
      <SectionTitle title="Edit Professional Experience" />
      <Typography variant="body1" sx={{ mb: 4 }}>
        Add your professional experience to your resume. You can add multiple companies and
        positions. To begin, add a company. Positions can be added within a company, and from there
        you can add projects (e.g. bullet points) to positions.
      </Typography>

      {companies ? (
        <CompanyList companies={companies} />
      ) : (
        <Typography>No companies found.</Typography>
      )}
    </>
  );
};
