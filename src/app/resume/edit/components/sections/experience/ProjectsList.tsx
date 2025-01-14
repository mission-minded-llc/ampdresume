import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PositionWithProjects } from "@/graphql/getPositions";
import { ProjectItem } from "./ProjectItem";
import { addProject } from "@/graphql/addProject";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const ProjectsList = ({ position }: { position: PositionWithProjects }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [projectValue, setProjectValue] = useState("");

  const mutation = useMutation({
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

  const handleAddProject = () => {
    if (!projectValue) return;

    const trimmedValue = projectValue.trim();

    if (!trimmedValue) return;

    mutation.mutate({
      name: trimmedValue,
      positionId: position.id,
    });

    setProjectValue("");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Bullet Point"
          fullWidth
          sx={{ mt: 2 }}
          value={projectValue}
          onChange={(e) => setProjectValue(e.target.value)}
        />
        <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleAddProject}>
          Add
        </Button>
      </Box>

      {position.projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </>
  );
};
