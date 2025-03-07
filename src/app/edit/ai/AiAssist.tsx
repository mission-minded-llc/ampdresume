"use client";

import { Box, Typography } from "@mui/material";

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
      <SectionTitle title="Your Resume" />

      <Box sx={{ mb: 4 }}>
        <Typography>
          Below is a text-only outline of your skills and work experience as it might appear in a
          PDF.
        </Typography>
      </Box>

      {resume ? (
        <Box>
          <pre style={{ whiteSpace: "pre-wrap" }}>{parseResumeToText(resume)}</pre>
        </Box>
      ) : null}

      {/* <Box>
        <pre>{JSON.stringify(resume, null, 2)}</pre>
      </Box> */}
    </>
  );
};
