"use client";

import { SkillForUser } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { getCompanies } from "@/graphql/getCompanies";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { SectionTitle } from "../components/SectionTitle";
import { CompanyList } from "./CompanyList";

export const EditExperienceContext = React.createContext<{
  skillsForUser: SkillForUser[];
}>({
  skillsForUser: [],
});

const EditExperienceProvider = ({
  children,
  skillsForUser,
}: {
  children: React.ReactNode;
  skillsForUser: SkillForUser[];
}) => {
  return (
    <EditExperienceContext.Provider value={{ skillsForUser }}>
      {children}
    </EditExperienceContext.Provider>
  );
};

export const EditExperience = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending,
    error,
    data: companies,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["companies"],
    queryFn: async () => {
      if (!session?.user.id) return null;

      return await getCompanies(session.user.id);
    },
  });

  const { data: skillsForUser } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["skillsForUser"],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      return (await getSkillsForUser(session.user.id)) || [];
    },
  });

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading experience: {error.message}</Box>;

  return (
    <>
      <SectionTitle title="Edit Professional Experience" />
      <Typography variant="body1" sx={{ mb: 4 }}>
        Add your professional experience to your resume. You can add multiple companies and
        positions. To begin, add a company. Positions can be added within a company, and from there
        you can add projects (e.g. bullet points) to positions.
      </Typography>

      {companies ? (
        <EditExperienceProvider skillsForUser={skillsForUser || []}>
          <CompanyList companies={companies} />
        </EditExperienceProvider>
      ) : (
        <Typography>No companies found.</Typography>
      )}
    </>
  );
};
