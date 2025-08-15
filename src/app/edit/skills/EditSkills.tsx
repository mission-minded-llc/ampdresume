"use client";

import { useSession } from "next-auth/react";
import { InfoOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { SectionTitle } from "../components/SectionTitle";
import { EditSkillsSearch } from "./EditSkillsSearch";
import { SkillsExperience } from "./SkillsExperience";

export const EditSkills = () => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending,
    error,
    data: skillsForUser,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["skillsForUser"],
    queryFn: async () => await getSkillsForUser(session?.user.id),
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
  if (error) return <Box>Error loading skills: {error.message}</Box>;

  return (
    <>
      <SectionTitle title="Add a Skill" />

      <Typography sx={{ mb: 2 }}>
        Search for a skill to add to your profile:
      </Typography>
      <EditSkillsSearch />

      {skillsForUser?.length ? (
        <>
          <Typography variant="h5" sx={{ mb: 2, mt: 6 }}>
            Your Skills{" "}
            <Tooltip title="Click on a skill to edit or remove it.">
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>

          <SkillsExperience skills={skillsForUser} />
        </>
      ) : (
        <Typography>No skills found.</Typography>
      )}
    </>
  );
};
