import { FeaturedProject } from "@/types";
import { useSession } from "next-auth/react";
import React, { useContext, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { addSkillForFeaturedProject } from "@/graphql/addSkillForFeaturedProject";
import { deleteFeaturedProject } from "@/graphql/deleteFeaturedProject";
import { FeaturedProjectGeneric } from "@/graphql/getFeaturedProjects";
import { getSkillsForFeaturedProject } from "@/graphql/getSkillsForFeaturedProject";
import { updateFeaturedProject } from "@/graphql/updateFeaturedProject";
import { AccordionSummaryContent } from "../components/AccordionSummaryContent";
import { FeaturedProjectForm } from "./FeaturedProjectForm";
import { EditFeaturedProjectsContext } from "./EditFeaturedProjects";
import { SkillItemForFeaturedProjectEdit } from "./SkillItemForFeaturedProjectEdit";

// Memoized version of SkillItemForFeaturedProjectEdit
const MemoizedSkillItemForFeaturedProjectEdit = React.memo(SkillItemForFeaturedProjectEdit);

export const FeaturedProjectItem = ({
  featuredProject,
  expanded,
  setExpanded,
}: {
  featuredProject: FeaturedProject;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { skillsForUser } = useContext(EditFeaturedProjectsContext);

  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const isExpanded = expanded === featuredProject.id;
  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending: isPendingSkillsForFeaturedProject,
    error: errorSkillsForFeaturedProject,
    data: skillsForFeaturedProject,
  } = useQuery({
    enabled: isAuthenticatedUser && isExpanded, // Only fetch skills if the featured project is expanded.
    queryKey: ["skillsForFeaturedProject", featuredProject.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      return await getSkillsForFeaturedProject(featuredProject.id);
    },
  });

  const addSkillForFeaturedProjectMutation = useMutation({
    mutationFn: async ({ skillForUserId }: { skillForUserId: string }) => {
      if (!session?.user?.id) return;
      await addSkillForFeaturedProject({
        userId: session.user.id,
        featuredProjectId: featuredProject.id,
        skillForUserId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["skillsForFeaturedProject", featuredProject.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["featuredProjects"],
      });
      setSelectedSkillId("");
    },
  });

  const handleExpandClick = () => {
    setExpanded(isExpanded ? false : featuredProject.id);
  };

  // Memoize the filtered and sorted available skills
  const memoizedAvailableSkills = useMemo(() => {
    const filteredSkills = skillsForUser?.length
      ? skillsForUser?.filter(
          (skillForUser) =>
            !skillsForFeaturedProject?.find(
              (skillForFeaturedProject) =>
                skillForFeaturedProject.skillForUser.id === skillForUser.id,
            ),
        )
      : [];
    return filteredSkills.sort((a, b) => a.skill.name.localeCompare(b.skill.name));
  }, [skillsForUser, skillsForFeaturedProject]);

  const handleSkillSelection = (skillForUserId: string) => {
    addSkillForFeaturedProjectMutation.mutate({ skillForUserId });
  };

  const saveMutation = useMutation({
    mutationFn: async ({
      id,
      userId: _userId,
      name,
      description,
      links,
    }: {
      id: string;
      userId: string;
      name: string;
      description?: string | null;
      links: Array<{ label: string; url: string }>;
    }) => {
      if (!session?.user?.id) return;

      await updateFeaturedProject({
        id,
        userId: session.user.id,
        name,
        description,
        links,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["featuredProjects"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deleteFeaturedProject({ id, userId });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["featuredProjects"] }),
  });

  const handleEditFeaturedProject = (featuredProjectGeneric: FeaturedProjectGeneric) => {
    featuredProject.name = featuredProjectGeneric.name;
    featuredProject.description = featuredProjectGeneric.description;
    featuredProject.links = featuredProjectGeneric.links;

    saveMutation.mutate({
      id: featuredProject.id,
      userId: session?.user?.id || "",
      name: featuredProject.name,
      description: featuredProject.description,
      links: featuredProject.links,
    });
  };

  const handleDeleteFeaturedProject = (featuredProject: FeaturedProject) => {
    if (!session?.user?.id) return;

    deleteMutation.mutate({ userId: session.user.id, id: featuredProject.id });
  };

  return (
    <Accordion expanded={expanded === featuredProject.id} sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
        sx={(theme) => ({
          cursor: "pointer",
          pt: 1,
          pb: 1,
          "&:hover": { backgroundColor: theme.palette.primary.light },
        })}
        data-testid={`featured-project-accordion-${featuredProject.id}`}
      >
        <div
          style={{
            width: "90%",
            display: expanded === featuredProject.id ? "none" : "flex",
          }}
        >
          <AccordionSummaryContent primary={featuredProject.name} secondary="" />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        {isPendingSkillsForFeaturedProject ? (
          <LoadingOverlay message="Loading skills..." />
        ) : errorSkillsForFeaturedProject ? (
          <Box>Error loading featured project skills: {errorSkillsForFeaturedProject.message}</Box>
        ) : (
          <>
            <FeaturedProjectForm
              featuredProject={featuredProject}
              handler={handleEditFeaturedProject}
              deleteHandler={handleDeleteFeaturedProject}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mt: 3,
              }}
            >
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: "1rem" }}>
                  Add Your Skills to Featured Project
                </InputLabel>
                <Select
                  value={selectedSkillId}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      handleSkillSelection(value);
                    }
                    setSelectedSkillId("");
                  }}
                  label="Add Your Skills to Featured Project"
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
                {skillsForFeaturedProject?.map((skillForFeaturedProject) => (
                  <MemoizedSkillItemForFeaturedProjectEdit
                    key={skillForFeaturedProject.id}
                    featuredProject={featuredProject}
                    skillForFeaturedProject={skillForFeaturedProject}
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
