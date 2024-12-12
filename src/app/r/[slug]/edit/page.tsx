"use client";

import { Box, Container } from "@mui/material";
import { SidebarLeft } from "./components/SidebarLeft";
import { EditSection } from "./components/EditSection";
import { EditPageProvider } from "./components/EditContext";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getSkillsForUser } from "@/server/skills";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ResumeProvider } from "../components/ResumeContext";

const EditPage = () => {
  const { data: session, status } = useSession();

  const { isPending, error, data } = useQuery({
    // Only enable the query when the session is loaded and has a user ID
    enabled: status === "authenticated" && !!session?.user?.id,
    queryKey: ["skills", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("No user ID available");
      }
      return await getSkillsForUser({ userId: session.user.id });
    },
  });

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated") return <Box>Please log in.</Box>;
  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading skills: {error.message}</Box>;

  const sidebarWidth = 200;

  return (
    <ResumeProvider
      skillsForUser={data?.skillsForUser ?? []}
      companies={[]}
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

export default EditPage;
