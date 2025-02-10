import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { CustomDialogTitle } from "@/components/DialogTitle";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Project } from "@prisma/client";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { SkillItemForProjectEdit } from "./SkillItemForProjectEdit";
import { addSkillForProject } from "@/graphql/addSkillForProject";
import { deleteProject } from "@/graphql/deleteProject";
import { getSkillsForProject } from "@/graphql/getSkillsForProject";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { updateProject } from "@/graphql/updateProject";
import { useSession } from "next-auth/react";

export const ProjectItem = ({
  project,
  expanded = false,
}: {
  project: Project;
  expanded?: boolean;
}) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const editorStateRef = useRef<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  // Load all available skills for the user
  const {
    isPending: isPendingSkillsForUser,
    error: errorSkillsForUser,
    data: skillsForUser,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["skillsForUser"],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      return await getSkillsForUser(session.user.id);
    },
  });

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
    mutationFn: async ({ id, description }: { id: string; description: string }) => {
      if (!session?.user?.id) return;
      await updateProject({
        id,
        userId: session.user.id,
        description,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["positions"] }),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;
      await deleteProject({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["positions"] }),
  });

  const handleSave = () => {
    updateProjectMutation.mutate({
      id: project.id,
      description: editorStateRef.current ?? "",
    });
  };

  const handleDelete = () => {
    deleteProjectMutation.mutate({ id: project.id });
  };

  const handleSkillSelection = (skillForUserId: string) => {
    addSkillForProjectMutation.mutate({ skillForUserId });
  };

  const isPending = isPendingSkillsForUser || isPendingSkillsForProject;

  if (isPending) return <LoadingOverlay message="Loading skills..." />;
  if (errorSkillsForUser) return <Box>Error loading skills: {errorSkillsForUser.message}</Box>;
  if (errorSkillsForProject)
    return <Box>Error loading project skills: {errorSkillsForProject.message}</Box>;

  // Filter out skills that are already added to the project
  const availableSkills = skillsForUser?.length
    ? skillsForUser?.filter(
        (skillForUser) =>
          !skillsForProject?.find(
            (skillForProject) => skillForProject.skillForUser.id === skillForUser.id,
          ),
      )
    : [];

  // Sort available skills by name
  availableSkills?.sort((a, b) => a.skill.name.localeCompare(b.skill.name));

  return (
    <>
      <Box
        sx={(theme) => ({
          position: "relative",
          width: "100%",
          textAlign: "left",
          display: "grid",
          gridTemplateColumns: "60% 1fr",
          alignItems: "center",
          gap: "20px",
          padding: "10px 40px 10px 20px",
          "@media screen and (max-width: 600px)": {
            gridTemplateColumns: "1fr",
            gap: "10px",
            padding: "10px",
          },
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

          {project.name}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "4px",
            "@media screen and (max-width: 600px)": {
              paddingBottom: "16px",
              borderBottom: "1px solid lightgray",
            },
          }}
        >
          {skillsForProject?.map((skillForProject) => (
            <SkillItemForProjectEdit
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
                {availableSkills.map((skillForUser) => (
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
                <SkillItemForProjectEdit
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
