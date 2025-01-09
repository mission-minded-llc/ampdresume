"use client";

import { Box, Container } from "@mui/material";

import { EditPageProvider } from "./components/EditContext";
import { EditSection } from "./components/EditSection";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { ResumeProvider } from "@/components/resume/ResumeContext";
import { SidebarLeft } from "./components/SidebarLeft";
import { getCompanies } from "@/graphql/getCompanies";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const EditPage = () => {
  const { data: session, status } = useSession();

  const {
    isPending: isPendingSkillsForUser,
    error: errorSkillsForUser,
    data: skillsForUser,
  } = useQuery({
    // Only enable the query when the session is loaded and has a user ID
    enabled: status === "authenticated" && !!session?.user?.id,
    queryKey: ["skillsForUser"],
    queryFn: async () => await getSkillsForUser(session?.user.id),
  });

  const {
    isPending: isPendingCompanies,
    error: errorCompanies,
    data: companies,
  } = useQuery({
    enabled: status === "authenticated" && !!session?.user?.id,
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

  const isPending = isPendingSkillsForUser || isPendingCompanies;

  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (errorSkillsForUser) return <Box>Error loading skills: {errorSkillsForUser.message}</Box>;
  if (errorCompanies) return <Box>Error loading companies: {errorCompanies.message}</Box>;

  const sidebarWidth = 200;

  return (
    <ResumeProvider
      skillsForUser={skillsForUser ?? []}
      companies={companies ?? []}
      positions={[]}
      education={[]}
    >
      <EditPageProvider>
        <Container
          sx={{
            display: "grid",
            height: "100%",
            gridTemplateColumns: `${sidebarWidth}px 1fr`,
          }}
        >
          <SidebarLeft width={sidebarWidth} />
          <EditSection />
        </Container>
      </EditPageProvider>
    </ResumeProvider>
  );
};
