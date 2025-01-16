import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Project } from "@prisma/client";
import { addSkillForProject } from "@/graphql/addSkillForProject";
import { getSkillsForProject } from "@/graphql/getSkillsForProject";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { useSession } from "next-auth/react";

export const ProjectItem = ({ project }: { project: Project }) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  // const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const minCharsForSearch = 3;

  // Load all available skills for the user for search/selector
  const {
    isPending: isPendingSkillsForUser,
    error: errorSkillsForUser,
    data: skillsForUser,
  } = useQuery({
    enabled: status === "authenticated" && !!session?.user?.id,
    queryKey: ["skills"],
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
    enabled: status === "authenticated" && !!session?.user?.id,
    queryKey: ["skillsForProject", project.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      return await getSkillsForProject(project.id);
    },
  });

  // Filter skills based on search term
  const filteredSkillsForUser = useMemo(() => {
    if (!skillsForUser || searchTerm.length < minCharsForSearch) return [];

    // Sort skills by closest match and limit to top 10
    return skillsForUser
      .filter((skillForUser) =>
        skillForUser.skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        // Basic sorting by how close the match is to the start of the name
        const aIndex = a.skill.name.toLowerCase().indexOf(searchTerm.toLowerCase());
        const bIndex = b.skill.name.toLowerCase().indexOf(searchTerm.toLowerCase());
        return aIndex - bIndex;
      })
      .slice(0, 10); // Limit to top 10 matches
  }, [skillsForUser, searchTerm]);

  const skillForProjectMutation = useMutation({
    mutationFn: async ({ skillForUserId }: { skillForUserId: string }) => {
      if (!session?.user?.id) return;

      await addSkillForProject({
        userId: session.user.id,
        projectId: project.id,
        skillForUserId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skillsForProject"] });
    },
  });

  const handleSkillSelection = (skillForUserId: string) => {
    skillForProjectMutation.mutate({ skillForUserId });
  };

  const isPending = isPendingSkillsForUser || isPendingSkillsForProject;

  if (isPending) return <LoadingOverlay message="Loading skills..." />;
  if (errorSkillsForUser) return <Box>Error loading skills: {errorSkillsForUser.message}</Box>;
  if (errorSkillsForProject)
    return <Box>Error loading project skills: {errorSkillsForProject.message}</Box>;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          textAlign: "left",
          display: "grid",
          gridTemplateColumns: "70% 1fr",
          alignItems: "center",
          gap: "20px",
          padding: "10px 40px 10px 20px",
          "@media screen and (max-width: 600px)": {
            gridTemplateColumns: "1fr",
            gap: "10px",
            padding: "10px",
          },
        }}
        onDoubleClick={() => setIsOpen(true)}
      >
        <Box>{project.name}</Box>
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
            <Box key={skillForProject.id}>{skillForProject.skillForUser.skill.name}</Box>
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
            height: "80vh", // Set the height to 80% of the viewport height
          },
        }}
      >
        <DialogTitle>Edit Project</DialogTitle>
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
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Your Skills to Add to Project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="Type at least 3 characters to search"
            />
            {searchTerm.length >= minCharsForSearch && (
              <Paper elevation={3}>
                <List>
                  {filteredSkillsForUser.length > 0 ? (
                    filteredSkillsForUser.map((skillForUser) => (
                      <ListItem
                        key={skillForUser.id}
                        sx={(theme) => ({
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        })}
                        onClick={() => handleSkillSelection(skillForUser.id)}
                      >
                        <ListItemIcon>
                          {skillForUser?.icon ? (
                            <Icon icon={skillForUser.icon} width={24} height={24} />
                          ) : skillForUser?.skill?.icon ? (
                            <Icon icon={skillForUser.skill.icon} width={24} height={24} />
                          ) : null}
                        </ListItemIcon>
                        <ListItemText primary={skillForUser.skill.name} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No matching skills found" />
                    </ListItem>
                  )}
                </List>
              </Paper>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
