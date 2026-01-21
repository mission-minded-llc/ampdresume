"use client";

import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { getFeaturedProjects } from "@/graphql/getFeaturedProjects";
import { SectionTitle } from "../components/SectionTitle";
import { FeaturedProjectList } from "./FeaturedProjectList";

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

      <FeaturedProjectList featuredProjects={featuredProjects || []} />
    </>
  );
};
