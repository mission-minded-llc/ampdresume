import { FeaturedProject } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { addFeaturedProject } from "@/graphql/addFeaturedProject";
import { FeaturedProjectGeneric } from "@/graphql/getFeaturedProjects";
import { FeaturedProjectForm } from "./FeaturedProjectForm";
import { FeaturedProjectItem } from "./FeaturedProjectItem";

export const FeaturedProjectList = ({
  featuredProjects,
}: {
  featuredProjects: FeaturedProject[];
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  const mutation = useMutation({
    mutationFn: async ({
      name,
      description,
      links,
    }: {
      name: string;
      description?: string | null;
      links: Array<{ label: string; url: string }>;
    }) => {
      if (!session?.user?.id) return;

      await addFeaturedProject({
        userId: session.user.id,
        name,
        description,
        links,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["featuredProjects"] });
    },
  });

  const handleAddFeaturedProject = (featuredProject: FeaturedProjectGeneric) => {
    mutation.mutate({
      name: featuredProject.name,
      description: featuredProject.description,
      links: featuredProject.links,
    });

    setIsOpen(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {featuredProjects.map((project) => (
        <FeaturedProjectItem
          key={project.id}
          featuredProject={project}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}

      {expanded === false ? (
        <>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
              Add Featured Project
            </Button>
          </Box>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
            <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
              Add New Featured Project
            </CustomDialogTitle>
            <DialogContent>
              <FeaturedProjectForm
                handler={handleAddFeaturedProject}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </Box>
  );
};
