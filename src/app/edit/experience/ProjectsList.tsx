import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PositionWithProjects } from "@/graphql/getPositionsWithProjects";
import { ProjectItem } from "./ProjectItem";
import { Tooltip } from "@/components/Tooltip";
import { addProject } from "@/graphql/addProject";
import { updateProjectSortIndexes } from "@/graphql/updateProjectSortIndexes";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const ProjectsList = ({
  position,
  expanded = false,
}: {
  position: PositionWithProjects;
  expanded?: boolean;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [projectValue, setProjectValue] = useState("");

  const mutationAddProject = useMutation({
    mutationFn: async ({ name, positionId }: { name: string; positionId: string }) => {
      if (!session?.user?.id) return;

      await addProject({
        userId: session.user.id,
        name,
        positionId,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const mutationUpdateSortIndex = useMutation({
    mutationFn: async ({ projects }: { projects: { id: string; sortIndex: number }[] }) => {
      if (!session?.user?.id) return;

      await updateProjectSortIndexes({
        userId: session.user.id,
        positionId: position.id,
        projectSortIndexes: projects,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const handleAddProject = () => {
    if (!projectValue) return;

    const trimmedValue = projectValue.trim();

    if (!trimmedValue) return;

    mutationAddProject.mutate({
      name: trimmedValue,
      positionId: position.id,
    });

    setProjectValue("");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <TextField
          label="Project"
          fullWidth
          sx={{ mt: 2 }}
          value={projectValue}
          onChange={(e) => setProjectValue(e.target.value)}
        />
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleAddProject}
          disabled={projectValue.trim().length < 10}
        >
          Add
        </Button>
        <Tooltip message="Project name must be at least 10 characters long. Drag and drop to reorder." />
      </Box>

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          mt: 2,
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {[...position.projects]
          .sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0))
          .map((project) => (
            <Box
              key={project.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("projectId", project.id);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData("projectId");
                const draggedProject = position.projects.find((p) => p.id === draggedId);
                const targetProject = project;

                if (draggedProject && draggedProject.id !== targetProject.id) {
                  const updatedProjects = [...position.projects].sort(
                    (a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0),
                  );

                  const draggedIndex = updatedProjects.findIndex((p) => p.id === draggedId);
                  const targetIndex = updatedProjects.findIndex((p) => p.id === targetProject.id);

                  // Reorder array
                  updatedProjects.splice(draggedIndex, 1);
                  updatedProjects.splice(targetIndex, 0, draggedProject);

                  // Update sortIndex values
                  updatedProjects.forEach((p, idx) => {
                    p.sortIndex = idx;
                  });

                  const projectSortIndexes = updatedProjects.map((p) => ({
                    id: p.id,
                    sortIndex: p.sortIndex,
                  }));

                  mutationUpdateSortIndex.mutate({
                    projects: projectSortIndexes,
                  });
                }
              }}
            >
              <ProjectItem project={project} expanded={expanded} />
            </Box>
          ))}
      </Box>
    </>
  );
};
