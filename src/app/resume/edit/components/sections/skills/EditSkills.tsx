"use client";

import { Box, Container, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";

import { InfoOutlined } from "@mui/icons-material";
import { SkillSearch } from "./SkillSearch";
import { Skills } from "@/components/resume/Skills/Skills";
import { updateSkillForUser } from "@/server/skills";
import { useSession } from "next-auth/react";

export type EditSkillMutation = UseMutationResult<
  void,
  Error,
  { id: string; description: string; yearStarted: number; totalYears: number },
  unknown
>;

export const EditSkills = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      description,
      yearStarted,
      totalYears,
    }: {
      id: string;
      description: string;
      yearStarted: number;
      totalYears: number;
    }) => {
      if (!session?.user?.id) return;
      await updateSkillForUser({
        id,
        userId: session.user.id,
        description,
        yearStarted,
        totalYears,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;
      // Refetch skills after adding a new one
      queryClient.invalidateQueries({ queryKey: ["skills", session.user.id] });
    },
  });

  return (
    <Container>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add a skill
        </Typography>
        <Typography sx={{ mb: 2 }}>Search for a skill to add to your profile:</Typography>
        <SkillSearch />
      </Box>
      <Divider sx={{ mb: 6, mt: 4 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your skills{" "}
        <Tooltip title="Click on a skill to edit or remove it.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Skills skillType="user" editMutation={mutation} />
    </Container>
  );
};
