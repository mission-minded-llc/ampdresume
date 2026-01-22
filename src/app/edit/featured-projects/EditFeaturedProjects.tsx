"use client";

import { SkillForUser } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { getFeaturedProjects } from "@/graphql/getFeaturedProjects";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { SectionTitle } from "../components/SectionTitle";
import { FeaturedProjectList } from "./FeaturedProjectList";

export const EditFeaturedProjectsContext = React.createContext<{
  skillsForUser: SkillForUser[];
}>({
  skillsForUser: [],
});

const EditFeaturedProjectsProvider = ({
  children,
  skillsForUser,
}: {
  children: React.ReactNode;
  skillsForUser: SkillForUser[];
}) => {
  return (
    <EditFeaturedProjectsContext.Provider value={{ skillsForUser }}>
      {children}
    </EditFeaturedProjectsContext.Provider>
  );
};

export const EditFeaturedProjects = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending,
    error,
    data: featuredProjects,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["featuredProjects"],
    queryFn: async () => await getFeaturedProjects(session?.user.id),
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
  if (error) return <Box>Error loading featured projects: {error.message}</Box>;

  return (
    <>
      <SectionTitle title="Your Featured Projects" />

      <Box sx={{ mb: 4 }}>
        <Typography>
          Featured projects are standalone projects you want to highlight on your resume. These are
          separate from projects associated with your work experience and allow you to showcase
          personal projects, open-source contributions, or other notable work.
        </Typography>
      </Box>

      <EditFeaturedProjectsProvider skillsForUser={skillsForUser || []}>
        <FeaturedProjectList featuredProjects={featuredProjects || []} />
      </EditFeaturedProjectsProvider>
    </>
  );
};
