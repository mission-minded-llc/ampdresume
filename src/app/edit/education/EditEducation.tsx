"use client";

import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { getEducation } from "@/graphql/getEducation";
import { SectionTitle } from "../components/SectionTitle";
import { EducationList } from "./EducationList";

export const EditEducation = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending,
    error,
    data: education,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["education"],
    queryFn: async () => await getEducation(session?.user.id),
  });

  if (status === "loading")
    return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading education: {error.message}</Box>;

  return (
    <>
      <SectionTitle title="Your Education" />

      <Box sx={{ mb: 4 }}>
        <Typography>
          Your education is important to show on your resume. It helps potential
          employers understand your background and qualifications.
        </Typography>
      </Box>

      {education?.length ? (
        <EducationList education={education} />
      ) : (
        <Typography>No education found.</Typography>
      )}
    </>
  );
};
