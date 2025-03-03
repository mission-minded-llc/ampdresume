import { Box, Button, Divider, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { IconSelector } from "@/components/IconSelector";
import { MuiLink } from "@/components/MuiLink";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { SkillForUser } from "@openresume/theme";
import { Tooltip } from "@/components/Tooltip";
import { TooltipTotalYears } from "@/components/tooltips";
import { deleteSkillForUser } from "@/graphql/deleteSkillForUser";
import { removeLeadingZero } from "@/lib/format";
import { updateSkillForUser } from "@/graphql/updateSkillForUser";
import { useSession } from "next-auth/react";

export const SkillItemEdit = ({
  skill,
  handleClose,
}: {
  skill: SkillForUser;
  handleClose: VoidFunction;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

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
      icon: string | null | undefined;
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

  const handleSave = (saveAndClose = false) => {
    updateSkillForUserMutation.mutate({
      id: skill.id,
      description: editorStateRef.current,
      yearStarted,
      totalYears,
      icon,
    });
    if (saveAndClose) handleClose();
  };

  const handleDelete = () => deleteSkillForUserMutation.mutate({ id: skill.id });

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        <TextField
          type="number"
          label="Year Started"
          value={yearStarted}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = removeLeadingZero(target.value);
          }}
          onChange={(e) => setYearStarted(Number(e.target.value))}
          slotProps={{ htmlInput: { min: 1900, max: new Date().getFullYear() } }}
        />
        <Box sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
          <TextField
            type="number"
            label="Total Years"
            value={totalYears}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = Math.max(
                0,
                Math.min(parseInt(removeLeadingZero(target.value)), 100),
              ).toString();
            }}
            onChange={(e) => setTotalYears(Number(e.target.value))}
            slotProps={{ htmlInput: { min: 0, max: 100 } }}
          />
          <Tooltip message={<TooltipTotalYears />} />
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
          <IconSelector setIcon={setIcon} />
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
          name="user"
          editorStateRef={editorStateRef}
          value={skill?.description ?? ""}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DeleteWithConfirmation
          buttonLabel="Delete Skill"
          onConfirmDelete={handleDelete}
          tooltip="Deleting this skill will also remove it from all projects! (No undo!)"
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => handleSave()}>
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave(true);
            }}
          >
            Save &amp; Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
