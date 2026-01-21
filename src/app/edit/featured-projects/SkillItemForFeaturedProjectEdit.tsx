import { FeaturedProject, SkillForFeaturedProject } from "@/types";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { deleteSkillForFeaturedProject } from "@/graphql/deleteSkillForFeaturedProject";
import { updateSkillForFeaturedProject } from "@/graphql/updateSkillForFeaturedProject";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";

export const SkillItemForFeaturedProjectEdit = ({
  skillForFeaturedProject,
  featuredProject,
}: {
  skillForFeaturedProject: SkillForFeaturedProject;
  featuredProject: FeaturedProject;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const editorStateRef = useRef<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const updateSkillForFeaturedProjectMutation = useMutation({
    mutationFn: async ({ id, description }: { id: string; description: string | null }) => {
      if (!session?.user?.id) return;

      await updateSkillForFeaturedProject({
        id,
        userId: session.user.id,
        description,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["skillsForFeaturedProject", featuredProject.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["featuredProjects"],
      });
    },
  });

  const deleteSkillForFeaturedProjectMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;

      await deleteSkillForFeaturedProject({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["skillsForFeaturedProject", featuredProject.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["featuredProjects"],
      });
    },
  });

  const handleSave = () =>
    updateSkillForFeaturedProjectMutation.mutate({
      id: skillForFeaturedProject.id,
      description: editorStateRef.current,
    });

  const handleDelete = () =>
    deleteSkillForFeaturedProjectMutation.mutate({ id: skillForFeaturedProject.id });

  const SkillIcon = () =>
    skillForFeaturedProject?.skillForUser?.icon ? (
      <Icon icon={skillForFeaturedProject.skillForUser.icon} />
    ) : skillForFeaturedProject?.skillForUser?.skill?.icon ? (
      <Icon icon={skillForFeaturedProject.skillForUser.skill.icon} />
    ) : null;

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
          },
          textTransform: "none",
          gap: "8px",
          padding: { xs: "2px 8px" },
          fontSize: { xs: "0.85rem", sm: "1rem" },
        })}
      >
        <SkillIcon />
        {skillForFeaturedProject.skillForUser.skill.name}
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          <Typography sx={{ display: { xs: "none", sm: "block" }, fontWeight: "bolder" }}>
            Edit Featured Project Skill
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: { xs: "bold", sm: "normal" },
            }}
          >
            <SkillIcon />
            {skillForFeaturedProject.skillForUser.skill.name}
          </Box>
        </CustomDialogTitle>
        <DialogContent sx={{ padding: { xs: 2, sm: 3 } }}>
          <Box>
            <Box sx={{ mb: 2 }}>
              <RichTextEditor
                name="skill-description"
                editorStateRef={editorStateRef}
                value={skillForFeaturedProject?.description ?? ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <DeleteWithConfirmation
                buttonLabel="Delete from Featured Project"
                onConfirmDelete={handleDelete}
                dialogTitle="Delete Skill from Featured Project?"
                dialogMessage={
                  <>
                    Are you sure you want to delete this skill from the featured project?
                    <br />
                    This skill will remain in your resume under the Skills section, however this
                    custom featured project-specific description will be lost.
                  </>
                }
                tooltip={
                  <>
                    Deleting this skill will only remove it from this featured project. The skill
                    will still be available for other projects. (No undo!)
                  </>
                }
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <Button variant="outlined" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSave();
                    setIsOpen(false);
                  }}
                >
                  Save &amp; Close
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
