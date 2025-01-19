import { Box, Button, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomDialogTitle } from "@/components/DialogTitle";
import { EducationForm } from "./EducationForm";
import { EducationGeneric } from "@/graphql/getEducation";
import { EducationItem } from "./EducationItem";
import { ResumeContext } from "@/components/resume/ResumeContext";
import { addEducation } from "@/graphql/addEducation";
import { useSession } from "next-auth/react";

export const EducationList = () => {
  const { data: session } = useSession();
  const { education } = useContext(ResumeContext);
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  const mutation = useMutation({
    mutationFn: async ({
      school,
      degree,
      dateAwarded,
    }: {
      school: string;
      degree: string;
      dateAwarded: string;
    }) => {
      if (!session?.user?.id) return;

      await addEducation({
        userId: session.user.id,
        school,
        degree,
        dateAwarded,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  const handleAddEducation = (education: EducationGeneric) => {
    mutation.mutate({
      school: education.school,
      degree: education.degree,
      dateAwarded: education.dateAwarded,
    });

    setIsOpen(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {education.map((education) => (
        <EducationItem
          key={education.id}
          education={education}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}

      {expanded === false ? (
        <>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
              Add Education
            </Button>
          </Box>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
            <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
              Add New Education
            </CustomDialogTitle>
            <DialogContent>
              <EducationForm handler={handleAddEducation} onCancel={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </Box>
  );
};
