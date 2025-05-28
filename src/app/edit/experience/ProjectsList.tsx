import { Box, Button, TextField } from "@mui/material";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Position, Project } from "@ampdresume/theme";
import React, { useEffect, useState } from "react";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CSS } from "@dnd-kit/utilities";
import { ProjectItem } from "./ProjectItem";
import { Tooltip } from "@/components/Tooltip";
import { addProject } from "@/graphql/addProject";
import { updateProjectSortIndexes } from "@/graphql/updateProjectSortIndexes";
import { useSession } from "next-auth/react";

const MemoizedProjectItem = React.memo(ProjectItem);

// Sortable wrapper component for ProjectItem
const SortableProjectItem = ({
  project,
  positionId,
  expanded,
}: {
  project: Project;
  positionId: string;
  expanded?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 1 : 0,
    marginBottom: 1,
    backgroundColor: isDragging ? "rgba(0, 0, 0, 0.05)" : "transparent",
    borderRadius: 1,
    outline: isDragging ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MemoizedProjectItem
        positionId={positionId}
        project={project}
        expanded={expanded}
        setIsEditing={setIsEditing}
      />
    </Box>
  );
};

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

  // Keep a local state of projects that we can update immediately
  // This ensures the UI is consistent even before backend updates
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  // Initialize local projects from props when they change
  useEffect(() => {
    const sorted = [...projects].sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0));
    setLocalProjects(sorted);
  }, [projects]);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Return if dropped outside list or not moved
    if (!over || active.id === over.id) {
      return;
    }

    // Find the indices in our local state array
    const activeIndex = localProjects.findIndex((project) => project.id === active.id);
    const overIndex = localProjects.findIndex((project) => project.id === over.id);

    if (activeIndex === -1 || overIndex === -1) {
      return; // Safety check
    }

    const reorderedProjects = arrayMove(localProjects, activeIndex, overIndex);

    // Update local state immediately for a responsive UI
    setLocalProjects(reorderedProjects);

    // Create the sort index updates
    const projectSortIndexes = reorderedProjects.map((p, sortIndex) => ({
      id: p.id,
      sortIndex,
    }));

    // Update the backend
    mutationUpdateSortIndex.mutate({ projectSortIndexes });
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

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={localProjects.map((project) => project.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              mt: 2,
            }}
          >
            {localProjects.map((project) => (
              <SortableProjectItem
                key={project.id}
                project={project}
                positionId={position.id}
                expanded={expanded}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </>
  );
};
