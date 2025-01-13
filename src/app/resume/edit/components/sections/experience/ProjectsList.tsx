import { Box, Button } from "@mui/material";

import { PositionWithProjects } from "@/graphql/getPositions";
import { ProjectItem } from "./ProjectItem";

export const ProjectsList = ({ position }: { position: PositionWithProjects }) => {
  // const { data: session } = useSession();
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: async ({
  //     title,
  //     startDate,
  //     endDate,
  //     companyId,
  //   }: {
  //     title: string;
  //     startDate: string;
  //     endDate: string;
  //     companyId: string;
  //   }) => {
  //     if (!session?.user?.id) return;

  //     await addPosition({
  //       userId: session.user.id,
  //       title,
  //       startDate,
  //       endDate,
  //       companyId,
  //     });
  //   },
  //   onSuccess: () => {
  //     if (!session?.user?.id) return;

  //     queryClient.invalidateQueries({ queryKey: ["positions"] });
  //   },
  // });

  // const handleAddPosition = (position: PositionGeneric) => {
  //   mutation.mutate({
  //     title: position.title,
  //     startDate: position.startDate,
  //     endDate: position?.endDate || "",
  //     companyId: company.id,
  //   });

  //   setOpenDialog(false);
  // };

  return (
    <>
      {position.projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}

      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" color="secondary" onClick={() => {}}>
          Add Project
        </Button>
      </Box>
    </>
  );
};
