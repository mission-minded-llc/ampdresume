import { Box, Button, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Company } from "@openresume/theme";
import { CompanyForm } from "./CompanyForm";
import { CompanyGeneric } from "@/graphql/getCompanies";
import { CompanyItem } from "./CompanyItem";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { addCompany } from "@/graphql/addCompany";
import { useSession } from "next-auth/react";

export const CompanyList = ({ companies }: { companies: Company[] }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

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

    setIsOpen(false);
    setExpanded(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {companies.map((company) => (
        <CompanyItem
          key={company.id}
          company={company}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}

      {expanded === false ? (
        <>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
              Add New Company
            </Button>
          </Box>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
            <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
              Add New Company
            </CustomDialogTitle>
            <DialogContent>
              <CompanyForm handler={handleAddCompany} onCancel={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </Box>
  );
};
