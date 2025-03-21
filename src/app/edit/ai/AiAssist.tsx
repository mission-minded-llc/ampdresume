"use client";

import { Box, Button, Typography } from "@mui/material";

import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { SectionTitle } from "../components/SectionTitle";
import { getResume } from "@/graphql/getResume";
import { parseResumeToText } from "./util";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const AiAssist = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser =
    status === "authenticated" && !!session?.user.id && !!session?.user.slug;

  const {
    isPending,
    error,
    data: resume,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["resume"],
    queryFn: async () => await getResume(session?.user?.slug ?? ""),
  });

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading resume data: {error.message}</Box>;

  return (
    <>
      <SectionTitle title="Your Text Resume" />

      <Box
        sx={(theme) => {
          return {
            mb: 4,
            p: 2,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.primary.light,
          };
        }}
      >
        <Typography sx={{ mb: 2 }}>
          Below is a text-only version of your work experience. You can use this text to copy and
          paste into a job application.
        </Typography>
        <Typography>
          If you would like to have an LLM take a pass at your resume text in tandem with a job
          description, please click below to see what the LLM can do for you!
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get AI Assistance
        </Button>
      </Box>

      {resume ? (
        <Box>
          <pre style={{ whiteSpace: "pre-wrap" }}>{parseResumeToText(resume)}</pre>
        </Box>
      ) : null}
    </>
  );
};
