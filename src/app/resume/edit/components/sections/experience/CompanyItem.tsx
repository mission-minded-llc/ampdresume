import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Company, CompanyGeneric } from "@/graphql/getCompanies";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompanyForm } from "./CompanyForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deleteCompany } from "@/graphql/deleteCompany";
import { formatDate } from "@/lib/format";
import { updateCompany } from "@/graphql/updateCompany";
import { useSession } from "next-auth/react";

export const CompanyItem = ({ company }: { company: Company }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
      >
        <p>
          <strong>{company.name}&nbsp;-&nbsp;</strong>
          {company?.location ? ` (${company.location}) ` : " "}
          {formatDate(company.startDate)} to{" "}
          {company.endDate ? formatDate(company?.endDate?.toString()) : "present"}
        </p>
      </AccordionSummary>
      <AccordionDetails>
        <CompanyForm
          company={company}
          handler={handleEditCompany}
          deleteHandler={handleDeleteCompany}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default CompanyItem;
