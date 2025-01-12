import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompanyForm } from "./CompanyForm";
import { CompanyGeneric } from "@/graphql/getCompanies";
import { CompanyItem } from "./CompanyItem";
import { ResumeContext } from "@/components/resume/ResumeContext";
import { SectionTitle } from "../SectionTitle";
import { addCompany } from "@/graphql/addCompany";
import { useSession } from "next-auth/react";

export const EditExperience = () => {
  const { data: session } = useSession();
  const { companies } = useContext(ResumeContext);
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      name,
      location,
      startDate,
      endDate,
    }: {
      name: string;
      location: string;
      startDate: string;
      endDate: string;
    }) => {
      if (!session?.user?.id) return;
      await addCompany({
        userId: session.user.id,
        name,
        location,
        startDate,
        endDate,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const handleAddCompany = (company: CompanyGeneric) => {
    mutation.mutate({
      name: company.name,
      location: company?.location,
      startDate: company.startDate,
      endDate: company?.endDate || "",
    });

    setOpenDialog(false);
  };

  return (
    <Container>
      <SectionTitle title="Edit Professional Experience" />

      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>
          Add Company
        </Button>
      </Box>

      {companies?.length > 0 ? (
        <>
          <SectionTitle title="Your Work Experience" />
          {companies.map((company) => (
            <CompanyItem key={company.id} company={company} />
          ))}
        </>
      ) : null}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <CompanyForm handler={handleAddCompany} onCancel={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};
