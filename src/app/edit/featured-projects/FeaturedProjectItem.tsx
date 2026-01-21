import { FeaturedProject } from "@/types";
import { useSession } from "next-auth/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeaturedProject } from "@/graphql/deleteFeaturedProject";
import { FeaturedProjectGeneric } from "@/graphql/getFeaturedProjects";
import { updateFeaturedProject } from "@/graphql/updateFeaturedProject";
import { AccordionSummaryContent } from "../components/AccordionSummaryContent";
import { FeaturedProjectForm } from "./FeaturedProjectForm";

export const FeaturedProjectItem = ({
  featuredProject,
  expanded,
  setExpanded,
}: {
  featuredProject: FeaturedProject;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleExpandClick = () => {
    setExpanded(expanded === featuredProject.id ? false : featuredProject.id);
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
        <FeaturedProjectForm
          featuredProject={featuredProject}
          handler={handleEditFeaturedProject}
          deleteHandler={handleDeleteFeaturedProject}
        />
      </AccordionDetails>
    </Accordion>
  );
};
