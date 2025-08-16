import { Project } from "@/types";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { addSkillForProject } from "@/graphql/addSkillForProject";
import { deleteProject } from "@/graphql/deleteProject";
import { getSkillsForProject } from "@/graphql/getSkillsForProject";
import { updateProject } from "@/graphql/updateProject";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { EditExperienceContext } from "./EditExperience";
import { SkillItemForProjectEdit } from "./SkillItemForProjectEdit";

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
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

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
      await queryClient.invalidateQueries({
        queryKey: ["skillsForProject", project.id],
      });
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
            gap: "8px",
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

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>Edit Project</CustomDialogTitle>
        <DialogContent sx={{ padding: { xs: 1, sm: 3 } }}>
          <Box sx={{ mt: 2, mb: 4 }}>
            <TextField
              type="text"
              multiline
              rows={2}
              label="Project Summary"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-input": { fontSize: "1rem" },
                "& .MuiInputLabel-root": { fontSize: "1rem" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: "1rem" }}>Add Your Skills to Project</InputLabel>
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        padding: 1,
                      }}
                    >
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
            <Accordion
              sx={{ mb: 4 }}
              expanded={isAccordionExpanded}
              onChange={(event, expanded) => setIsAccordionExpanded(expanded)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {isAccordionExpanded ? (
                  <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                    Write a description below.
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "underline", fontSize: "1rem" }}
                  >
                    Write more about this project...
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails sx={{ padding: { xs: 0, sm: 2 }, border: "none" }}>
                <RichTextEditor
                  name="skill-description"
                  editorStateRef={editorStateRef}
                  value={project?.description ?? ""}
                />
              </AccordionDetails>
            </Accordion>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                justifyContent: "space-between",
                mt: { xs: 0, sm: 2 },
              }}
            >
              <DeleteWithConfirmation
                onConfirmDelete={handleDelete}
                buttonLabel="Delete Project"
                dialogTitle="Delete Project?"
                dialogMessage="Are you sure you want to delete this project? (No undo!)"
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
    </>
  );
};
