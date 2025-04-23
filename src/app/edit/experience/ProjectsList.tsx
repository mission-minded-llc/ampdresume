import { Box, Button, TextField } from "@mui/material";
import { Position, Project } from "@openresume/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProjectItem } from "./ProjectItem";
import React from "react"; // Added for React.memo
import { Tooltip } from "@/components/Tooltip";
import { addProject } from "@/graphql/addProject";
import { updateProjectSortIndexes } from "@/graphql/updateProjectSortIndexes";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MemoizedProjectItem = React.memo(ProjectItem);

export const ProjectsList = ({
  position,
  projects,
  expanded = false,
}: {
  position: Position;
  projects: Project[];
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

      queryClient.invalidateQueries({ queryKey: ["projects", position.id] });
    },
  });

  const mutationUpdateSortIndex = useMutation({
    mutationFn: async ({
      projectSortIndexes,
    }: {
      projectSortIndexes: { id: string; sortIndex: number }[];
    }) => {
      if (!session?.user?.id) return;

      await updateProjectSortIndexes({
        userId: session.user.id,
        positionId: position.id,
        projectSortIndexes,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["projects", position.id] });
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
          name="project"
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
        {[...projects]
          .sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0))
          .map((project) => (
            <Box
              key={project.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("draggedProjectId", project.id); // Use a clear key name
              }}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData("draggedProjectId");
                const draggedProject = projects.find((p) => p.id === draggedId);
                const targetProject = project;

                if (draggedProject && draggedProject.id !== targetProject.id) {
                  const updatedProjects = [...projects];

                  // Find the indexes of the dragged and target projects
                  const draggedIndex = updatedProjects.findIndex((p) => p.id === draggedId);
                  const targetIndex = updatedProjects.findIndex((p) => p.id === targetProject.id);

                  // Remove the dragged project and insert it at the target index
                  updatedProjects.splice(draggedIndex, 1);
                  updatedProjects.splice(targetIndex, 0, draggedProject);

                  // Update sortIndex values to reflect the new order
                  const projectSortIndexes = updatedProjects.map((p, idx) => ({
                    id: p.id,
                    sortIndex: idx,
                  }));

                  // Trigger the mutation to update the backend
                  mutationUpdateSortIndex.mutate({
                    projectSortIndexes,
                  });
                }
              }}
              onDragOver={(e) => e.preventDefault()} // Allow drop
            >
              <MemoizedProjectItem positionId={position.id} project={project} expanded={expanded} />
            </Box>
          ))}
      </Box>
    </>
  );
};
