import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Company, CompanyGeneric } from "@/graphql/getCompanies";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompanyForm } from "./CompanyForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDate } from "@/lib/format";
import { updateCompany } from "@/graphql/updateCompany";
import { useSession } from "next-auth/react";

export const CompanyItem = ({ company }: { company: Company }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  const mutation = useMutation({
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
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditCompany = (companyGeneric: CompanyGeneric) => {
    company.name = companyGeneric.name;
    company.location = companyGeneric.location;
    company.startDate = companyGeneric.startDate;
    company.endDate = companyGeneric.endDate;

    mutation.mutate({
      id: company.id,
      name: company.name,
      location: company.location,
      startDate: company.startDate,
      endDate: company.endDate || "",
    });
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
        <CompanyForm company={company} handler={handleEditCompany} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CompanyItem;
