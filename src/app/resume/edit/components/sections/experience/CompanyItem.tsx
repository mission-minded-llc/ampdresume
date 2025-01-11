import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Company, CompanyGeneric } from "@/graphql/getCompanies";
import React, { useState } from "react";

import { CompanyForm } from "./CompanyForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDate } from "@/lib/format";

export const CompanyItem = ({ company }: { company: Company }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditCompany = (companyGeneric: CompanyGeneric) => {
    company.name = companyGeneric.name;
    company.location = companyGeneric.location;
    company.startDate = companyGeneric.startDate;
    company.endDate = companyGeneric.endDate;

    // console.log({ company });
    // Send update mutation here.
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
