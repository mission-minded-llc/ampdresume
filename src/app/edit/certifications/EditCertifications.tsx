"use client";

import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { getCertifications } from "@/graphql/getCertifications";
import { SectionTitle } from "../components/SectionTitle";
import { CertificationList } from "./CertificationList";

export const EditCertifications = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending,
    error,
    data: certifications,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["certifications"],
    queryFn: async () => await getCertifications(session?.user.id),
  });

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading certifications: {error.message}</Box>;

  return (
    <>
      <SectionTitle title="Your Certifications" />

      <Box sx={{ mb: 4 }}>
        <Typography>
          Certifications demonstrate your professional qualifications and expertise. They help
          potential employers understand your credentials and specialized knowledge.
        </Typography>
      </Box>

      <CertificationList certifications={certifications || []} />
    </>
  );
};
