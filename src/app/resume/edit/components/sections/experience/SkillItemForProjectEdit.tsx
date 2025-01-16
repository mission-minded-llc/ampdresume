import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteWithConfirmation } from "@/app/resume/edit/components/DeleteWithConfirmation";
import { Icon } from "@iconify/react";
import { Project } from "@prisma/client";
import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
import { SkillForProjectWithSkill } from "@/graphql/getPositions";
import { deleteSkillForProject } from "@/graphql/deleteSkillForProject";
import { updateSkillForProject } from "@/graphql/updateSkillForProject";
import { useSession } from "next-auth/react";

export const SkillItemForProjectEdit = ({
  skillForProject,
  project,
}: {
  skillForProject: SkillForProjectWithSkill;
  project: Project;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const editorStateRef = useRef<string | null>(null);

  const [open, setOpen] = useState(false);

  const updateSkillForProjectMutation = useMutation({
    mutationFn: async ({ id, description }: { id: string; description: string | null }) => {
      if (!session?.user?.id) return;

      await updateSkillForProject({
        id,
        userId: session.user.id,
        description,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForProject", project.id] }),
  });

  const deleteSkillForProjectMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;

      await deleteSkillForProject({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForProject", project.id] }),
  });

  const handleSave = () =>
    updateSkillForProjectMutation.mutate({
      id: skillForProject.id,
      description: editorStateRef.current,
    });

  const handleDelete = () => deleteSkillForProjectMutation.mutate({ id: skillForProject.id });

  const SkillIcon = () =>
    skillForProject?.skillForUser?.icon ? (
      <Icon icon={skillForProject.skillForUser.icon} />
    ) : skillForProject?.skillForUser?.skill?.icon ? (
      <Icon icon={skillForProject.skillForUser.skill.icon} />
    ) : null;

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
          },
          textTransform: "none",
          gap: "8px",
        })}
      >
        <SkillIcon />
        {skillForProject.skillForUser.skill.name}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: "1em", padding: "16px 48px" }}
        >
          <SkillIcon />
          {skillForProject.skillForUser.skill.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          X
        </IconButton>
        <DialogContent>
          <Box>
            <Box sx={{ mb: 2 }}>
              <RichTextEditor
                name="skill-description"
                editorStateRef={editorStateRef}
                value={skillForProject?.description ?? ""}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <DeleteWithConfirmation onConfirmDelete={handleDelete} />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
