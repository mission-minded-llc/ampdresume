"use client";

import { getSkillsForUser } from "@/server/skills";
import { useQuery } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const EditSkills = () => {
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

  if (status === "loading") {
    return <LoadingOverlay message="Loading session..." />;
  }

  if (status === "unauthenticated") {
    return <Box>Please log in to view skills</Box>;
  }

  if (isPending) return <LoadingOverlay message="Loading skills..." />;

  if (error) {
    return <Box>Error loading skills: {error.message}</Box>;
  }

  return (
    <Container>
      <Box>
        <h1>Edit Skills</h1>
      </Box>
      <Box>{/* This is a placeholder for a form to add new skills */}</Box>
      {data?.skills?.map((skill: SkillForUserWithSkill) => (
        <Box key={skill.id}>{skill.skill.name}</Box>
      ))}
    </Container>
  );
};
