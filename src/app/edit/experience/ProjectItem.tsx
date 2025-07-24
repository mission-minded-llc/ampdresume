import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { EditExperienceContext } from "./EditExperience";
import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Project } from "@ampdresume/theme";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { SkillItemForProjectEdit } from "./SkillItemForProjectEdit";
import { addSkillForProject } from "@/graphql/addSkillForProject";
import { deleteProject } from "@/graphql/deleteProject";
import { getSkillsForProject } from "@/graphql/getSkillsForProject";
import { updateProject } from "@/graphql/updateProject";
import { useSession } from "next-auth/react";

// Memoized version of SkillItemForProjectEdit
const MemoizedSkillItemForProjectEdit = React.memo(SkillItemForProjectEdit);

export const ProjectItem = ({
  positionId,
  project,
  expanded = false,
  setIsEditing,
}: {
  positionId: string;
  project: Project;
  expanded?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const editorStateRef = useRef<string | null>(null);
  const { skillsForUser } = useContext(EditExperienceContext);

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  useEffect(() => {
    setIsEditing(isOpen);
  }, [isOpen, setIsEditing]);

  const {
    isPending: isPendingSkillsForProject,
    error: errorSkillsForProject,
    data: skillsForProject,
  } = useQuery({
    enabled: isAuthenticatedUser && expanded, // Only fetch skills if the project is expanded.
    queryKey: ["skillsForProject", project.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      return await getSkillsForProject(project.id);
    },
  });

  const addSkillForProjectMutation = useMutation({
    mutationFn: async ({ skillForUserId }: { skillForUserId: string }) => {
      if (!session?.user?.id) return;
      await addSkillForProject({
        userId: session.user.id,
        projectId: project.id,
        skillForUserId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skillsForProject", project.id] });
      setSelectedSkillId("");
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      projectName,
      description,
    }: {
      id: string;
      projectName: string;
      description: string;
    }) => {
      if (!session?.user?.id) return;

      await updateProject({
        id,
        userId: session.user.id,
        projectName,
        description,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects", positionId] }),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;
      await deleteProject({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects", positionId] }),
  });

  // Memoize the filtered and sorted available skills
  const memoizedAvailableSkills = useMemo(() => {
    const filteredSkills = skillsForUser?.length
      ? skillsForUser?.filter(
          (skillForUser) =>
            !skillsForProject?.find(
              (skillForProject) => skillForProject.skillForUser.id === skillForUser.id,
            ),
        )
      : [];
    return filteredSkills.sort((a, b) => a.skill.name.localeCompare(b.skill.name));
  }, [skillsForUser, skillsForProject]);

  const handleSave = () => {
    updateProjectMutation.mutate({
      id: project.id,
      projectName,
      description: editorStateRef.current ?? "",
    });
  };

  const handleDelete = () => {
    deleteProjectMutation.mutate({ id: project.id });
  };

  const handleSkillSelection = (skillForUserId: string) => {
    addSkillForProjectMutation.mutate({ skillForUserId });
  };

  if (isPendingSkillsForProject) return <LoadingOverlay message="Loading skills..." />;
  if (errorSkillsForProject)
    return <Box>Error loading project skills: {errorSkillsForProject.message}</Box>;

  return (
    <>
      <Box
        sx={(theme) => ({
          position: "relative",
          width: "100%",
          textAlign: "left",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "60% 1fr" },
          alignItems: "center",
          gap: { xs: "10px", sm: "20px" },
          padding: { xs: "10px", sm: "10px 40px 10px 20px" },
          backgroundColor: theme.palette.background.paper,
          borderLeft: "4px solid",
          borderBottom: "1px solid white",
          cursor: "grab",
        })}
        onDoubleClick={() => setIsOpen(true)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              opacity: 0.5,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Icon icon="mdi:pencil" />
          </IconButton>

          <Typography
            component="p"
            variant="body1"
            sx={{
              fontSize: "1rem",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {project.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "4px",
            paddingBottom: 0,
            borderBottom: "none",
            marginBottom: 0,
          }}
        >
          {skillsForProject?.map((skillForProject) => (
            <MemoizedSkillItemForProjectEdit
              key={skillForProject.id}
              project={project}
              skillForProject={skillForProject}
            />
          ))}
        </Box>
      </Box>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            height: "80vh",
          },
        }}
      >
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>Edit Project</CustomDialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, mb: 4 }}>
            <TextField
              type="text"
              multiline
              rows={2}
              label="Project Summary"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Add Your Skills to Project</InputLabel>
              <Select
                value={selectedSkillId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    handleSkillSelection(value);
                  }
                  setSelectedSkillId("");
                }}
                label="Add Your Skills to Project"
              >
                {memoizedAvailableSkills.map((skillForUser) => (
                  <MenuItem key={skillForUser.id} value={skillForUser.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: 1 }}>
                      {skillForUser?.icon ? (
                        <Icon icon={skillForUser.icon} width={24} height={24} />
                      ) : skillForUser?.skill?.icon ? (
                        <Icon icon={skillForUser.skill.icon} width={24} height={24} />
                      ) : null}
                      {skillForUser.skill.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {skillsForProject?.map((skillForProject) => (
                <MemoizedSkillItemForProjectEdit
                  key={skillForProject.id}
                  project={project}
                  skillForProject={skillForProject}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Box>
              <RichTextEditor
                name="skill-description"
                editorStateRef={editorStateRef}
                value={project?.description ?? ""}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <DeleteWithConfirmation onConfirmDelete={handleDelete} />
              <Box sx={{ display: "flex", gap: 2 }}>
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
    </>
  );
};
