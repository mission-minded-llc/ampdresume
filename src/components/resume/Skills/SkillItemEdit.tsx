import { Box, Button, Divider, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteWithConfirmation } from "@/app/resume/edit/components/DeleteWithConfirmation";
import { MuiLink } from "@/components/MuiLink";
import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillsContext } from "./Skills";
import { Tooltip } from "@/components/Tooltip";
import { TooltipTotalYears } from "@/components/tooltips";
import { deleteSkillForUser } from "@/graphql/deleteSkillForUser";
import { updateSkillForUser } from "@/graphql/updateSkillForUser";
import { useSession } from "next-auth/react";

export const SkillItemEdit = ({ skill }: { skill: SkillForUserWithSkill }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { skillType } = useContext(SkillsContext);

  const editorStateRef = useRef<string | null>(null);

  const [yearStarted, setYearStarted] = useState(skill?.yearStarted ?? new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(skill?.totalYears ?? 0);
  const [icon, setIcon] = useState(skill?.icon ? skill.icon : skill?.skill?.icon);

  const updateSkillForUserMutation = useMutation({
    mutationFn: async ({
      id,
      description,
      yearStarted,
      totalYears,
    }: {
      id: string;
      description: string | null;
      yearStarted: number;
      totalYears: number;
      icon: string | null;
    }) => {
      if (!session?.user?.id) return;

      await updateSkillForUser({
        id,
        userId: session.user.id,
        description,
        yearStarted,
        totalYears,
        icon,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForUser"] }),
  });

  const deleteSkillForUserMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;

      await deleteSkillForUser({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForUser"] }),
  });

  const handleSave = () =>
    updateSkillForUserMutation.mutate({
      id: skill.id,
      description: editorStateRef.current,
      yearStarted,
      totalYears,
      icon,
    });

  const handleDelete = () => deleteSkillForUserMutation.mutate({ id: skill.id });

  return (
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        <TextField
          type="number"
          label="Year Started"
          value={yearStarted}
          onChange={(e) => setYearStarted(Number(e.target.value))}
          slotProps={{ htmlInput: { min: 1900, max: new Date().getFullYear() } }}
        />
        <Box sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
          <TextField
            type="number"
            label="Total Years"
            value={totalYears}
            onChange={(e) => setTotalYears(Number(e.target.value))}
            slotProps={{ htmlInput: { min: 0, max: 100 } }}
          />
          <Tooltip message={<TooltipTotalYears />} />
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
          <TextField
            label="Icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            slotProps={{ htmlInput: { placeholder: "dashicons:icon-name" } }}
          />
          <Tooltip
            message={
              <>
                Enter a valid icon name from{" "}
                <MuiLink href="https://icon-sets.iconify.design/" target="_blank">
                  iconify
                </MuiLink>
                .
              </>
            }
          />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2 }}>
        <RichTextEditor
          name={skillType}
          editorStateRef={editorStateRef}
          value={skill?.description ?? ""}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DeleteWithConfirmation onConfirmDelete={handleDelete} />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
