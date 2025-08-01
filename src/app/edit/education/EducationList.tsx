import { Education } from "@ampdresume/theme";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { addEducation } from "@/graphql/addEducation";
import { EducationGeneric } from "@/graphql/getEducation";

import { EducationForm } from "./EducationForm";
import { EducationItem } from "./EducationItem";



export const EducationList = ({ education }: { education: Education[] }) => {
  const { data: session } = useSession();
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
      {education.map((edu) => (
        <EducationItem key={edu.id} education={edu} expanded={expanded} setExpanded={setExpanded} />
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
