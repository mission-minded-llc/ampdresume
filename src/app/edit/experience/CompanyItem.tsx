import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Company } from "openresume-theme";
import { CompanyForm } from "./CompanyForm";
import { CompanyGeneric } from "@/graphql/getCompanies";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PositionsList } from "./PositionsList";
import React from "react";
import { deleteCompany } from "@/graphql/deleteCompany";
import { formatLongDate } from "@/lib/format";
import { updateCompany } from "@/graphql/updateCompany";
import { useSession } from "next-auth/react";

export const CompanyItem = ({
  company,
  expanded,
  setExpanded,
}: {
  company: Company;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleExpandClick = () => {
    setExpanded(expanded === company.id ? false : company.id);
  };

  const saveMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      location,
      startDate,
      endDate,
    }: {
      id: string;
      name: string;
      location: string;
      startDate: string;
      endDate: string;
    }) => {
      if (!session?.user?.id) return;

      await updateCompany({
        id,
        userId: session.user.id,
        name,
        location,
        startDate,
        endDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deleteCompany({ id, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const handleEditCompany = (companyGeneric: CompanyGeneric) => {
    company.name = companyGeneric.name;
    company.location = companyGeneric.location;
    company.startDate = companyGeneric.startDate;
    company.endDate = companyGeneric.endDate;

    saveMutation.mutate({
      id: company.id,
      name: company.name,
      location: company.location,
      startDate: company.startDate,
      endDate: company.endDate || "",
    });
  };

  const handleDeleteCompany = (company: Company) => {
    if (!session?.user?.id) return;

    deleteMutation.mutate({ userId: session.user.id, id: company.id });
  };

  return (
    <Accordion expanded={expanded === company.id} sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
        sx={(theme) => ({
          cursor: "pointer",
          pt: 1,
          pb: 1,
          "&:hover": { backgroundColor: theme.palette.primary.light },
        })}
      >
        <Typography component="p" variant="body1">
          <strong>{company.name}&nbsp;-&nbsp;</strong>
          {company?.location ? ` (${company.location}) ` : " "}
          {formatLongDate(company.startDate)} to{" "}
          {company.endDate ? formatLongDate(company?.endDate) : "present"}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <CompanyForm
          company={company}
          handler={handleEditCompany}
          deleteHandler={handleDeleteCompany}
        />
        <PositionsList company={company} />
      </AccordionDetails>
    </Accordion>
  );
};
