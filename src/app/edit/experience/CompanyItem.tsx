import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Company } from "@ampdresume/theme";
import { CompanyForm } from "./CompanyForm";
import { CompanyGeneric } from "@/graphql/getExperience";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PositionsList } from "./PositionsList";
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
  const companyRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleExpandClick = () => {
    const isExpanding = expanded !== company.id;
    setExpanded(isExpanding ? company.id : false);

    if (isExpanding) {
      companyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      setExpanded(false);
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

  const SummaryContentDesktop = () => (
    <Typography
      component="p"
      variant="body1"
      sx={{ display: { xs: "none", sm: "block" }, fontSize: { xs: "1rem", sm: "1.25rem" } }}
    >
      <strong>{company.name}&nbsp;-&nbsp;</strong>
      {company?.location ? ` (${company.location}) ` : " "}
      {formatLongDate(company.startDate)} to{" "}
      {company.endDate ? formatLongDate(company?.endDate) : "present"}
    </Typography>
  );

  const SummaryContentMobile = () => (
    <Typography
      component="p"
      variant="body1"
      sx={{
        display: { xs: "block", sm: "none" },
        fontSize: { xs: "1rem", sm: "1.25rem" },
        width: "100%",
      }}
    >
      <strong>{company.name}</strong>
      <Divider sx={{ width: "100%", margin: "10px 0" }} />
      {company?.location ? company.location : ""}
      <br />
      <em>
        {formatLongDate(company.startDate)} to{" "}
        {company.endDate ? formatLongDate(company?.endDate) : "present"}
      </em>
    </Typography>
  );

  return (
    <Accordion
      expanded={expanded === company.id}
      sx={{ mb: 2 }}
      ref={companyRef}
      slotProps={{ transition: { unmountOnExit: false, timeout: 200 } }}
    >
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
        <Box sx={{ display: expanded === company.id ? "none" : "flex" }}>
          <SummaryContentDesktop />
          <SummaryContentMobile />
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: { xs: 1, sm: 2 }, border: "none" }}>
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
