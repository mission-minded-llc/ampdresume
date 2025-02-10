import { Box, Button, TextField } from "@mui/material";
import { Company, CompanyGeneric } from "@/graphql/getCompanies";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { formatLongDate, formatShortDate, timestampToDate } from "@/lib/format";

import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { PositionWithProjects } from "@/graphql/getPositionsWithProjects";

export const CompanyForm = ({
  company,
  positionsWithProjectsInCompany = [],
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  company?: Company | null;
  positionsWithProjectsInCompany?: PositionWithProjects[];
  handler: (company: CompanyGeneric | Company) => void;
  deleteHandler?: ((company: Company) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const [companyName, setCompanyName] = useState(company?.name || "");
  const [location, setLocation] = useState(company?.location || "");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(timestampToDate(company?.startDate)),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(timestampToDate(company?.endDate)));

  const saveHandler = () => {
    if (!startDate) return;

    handler({
      name: companyName,
      location,
      startDate: formatShortDate(startDate),
      endDate: formatShortDate(endDate),
    });
  };

  const isChanged =
    companyName !== company?.name ||
    location !== company?.location ||
    formatLongDate(startDate) !== formatLongDate(company?.startDate) ||
    formatLongDate(endDate) !== formatLongDate(company?.endDate);

  return (
    <>
      <Box sx={{ mb: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <DatePicker
          label="Date Started"
          value={startDate}
          onChange={(value) => setStartDate(value)}
          views={["month", "year"]}
          sx={{ flex: 1 }}
          disableFuture
          maxDate={endDate || dayjs(new Date())}
        />
        <DatePicker
          label="Date Ended (leave blank if current)"
          value={endDate}
          onChange={(value) => setEndDate(value)}
          views={["month", "year"]}
          sx={{ flex: 1 }}
          disableFuture
          maxDate={dayjs(new Date())}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mt: 2,
        }}
      >
        {company && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Company"
            tooltip={
              positionsWithProjectsInCompany.length > 0
                ? "To delete this company, first delete all positions in the company."
                : ""
            }
            onConfirmDelete={() => deleteHandler(company)}
            disabled={positionsWithProjectsInCompany.length > 0}
          />
        )}
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={saveHandler} disabled={!isChanged}>
          Save Company
        </Button>
      </Box>
    </>
  );
};
