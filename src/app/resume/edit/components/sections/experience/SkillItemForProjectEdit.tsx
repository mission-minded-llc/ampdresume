// import { Box, Button, Divider, TextField } from "@mui/material";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRef, useState } from "react";

// import { DeleteWithConfirmation } from "@/app/resume/edit/components/DeleteWithConfirmation";
// import { MuiLink } from "@/components/MuiLink";
// import { Project } from "@prisma/client";
// import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
// import { SkillForProjectWithSkill } from "@/graphql/getPositions";
// import { Tooltip } from "@/components/Tooltip";
// import { TooltipTotalYears } from "@/components/tooltips";
// import { deleteSkillForUser } from "@/graphql/deleteSkillForUser";
// import { useSession } from "next-auth/react";

// export const SkillItemForProjectEdit = ({
//   skillForProject,
//   project,
//   successCallback,
// }: {
//   skillForProject: SkillForProjectWithSkill;
//   project: Project;
//   successCallback?: () => void;
// }) => {
//   const { data: session } = useSession();
//   const queryClient = useQueryClient();
//   const editorStateRef = useRef<string | null>(null);

//   // const updateSkillForProjectMutation = useMutation({
//   //   mutationFn: async ({
//   //     id,
//   //     description,
//   //   }: {
//   //     id: string;
//   //     description: string | null;
//   //   }) => {
//   //     if (!session?.user?.id) return;

//   //     await updateSkillForProject({
//   //       id,
//   //       userId: session.user.id,
//   //       description,
//   //     });
//   //   },
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForProject", project.id] }),
//   // });

//   // const deleteSkillForProjectMutation = useMutation({
//   //   mutationFn: async ({ id }: { id: string }) => {
//   //     if (!session?.user?.id) return;

//   //     // await deleteSkillForProject({
//   //     //   id,
//   //     //   userId: session.user.id,
//   //     // });
//   //   },
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForProject", project.id] }),
//   // });

//   const handleSave = () => {
//     // updateSkillForProjectMutation.mutate({
//     //   id: skillForProject.id,
//     //   description: editorStateRef.current,
//     // });
//     if (successCallback) successCallback();
//   };

//   const handleDelete = () => {
//     // deleteSkillForProjectMutation.mutate({ id: skillForProject.id });

//     if (successCallback) successCallback();
//   };

//   return (
//     <Box>
//       <Box sx={{ mb: 2 }}>
//         <RichTextEditor
//           name="skill-description"
//           editorStateRef={editorStateRef}
//           value={skillForProject?.description ?? ""}
//         />
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <DeleteWithConfirmation onConfirmDelete={handleDelete} />
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save &amp; Close
//         </Button>
//       </Box>
//     </Box>
//   );
// };
