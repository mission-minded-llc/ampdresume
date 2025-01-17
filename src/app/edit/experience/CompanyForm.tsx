import { Box, Button, TextField } from "@mui/material";
import { Company, CompanyGeneric } from "@/graphql/getCompanies";
import React, { useContext, useState } from "react";

import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { ResumeContext } from "@/components/resume/ResumeContext";

export const CompanyForm = ({
  company,
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  company?: Company | null;
  handler: (company: CompanyGeneric | Company) => void;
  deleteHandler?: ((company: Company) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const { positions } = useContext(ResumeContext);

  const positionsInCompany = positions.filter((position) => position.company.id === company?.id);

  const formattedStartDate = company?.startDate
    ? new Date(parseInt(company.startDate, 10)).toISOString().split("T")[0].substring(0, 7)
    : "";
  const formattedEndDate = company?.endDate
    ? new Date(parseInt(company.endDate, 10)).toISOString().split("T")[0].substring(0, 7)
    : "";

  const [companyName, setCompanyName] = useState(company?.name || "");
  const [location, setLocation] = useState(company?.location || "");
  const [startDate, setStartDate] = useState(formattedStartDate);
  const [endDate, setEndDate] = useState(formattedEndDate);
  const [dateError, setDateError] = useState("");

  const validateDates = (start: string | null, end: string | null) => {
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    const currentDate = new Date();

    if (endDate && startDate && endDate < startDate) {
      setDateError("End date cannot be before start date");
      return false;
    }

    if ((startDate && startDate > currentDate) || (endDate && endDate > currentDate)) {
      setDateError("Dates cannot be in the future");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    validateDates(newStartDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    validateDates(startDate, newEndDate);
  };

  const saveHandler = () => {
    if (!validateDates(startDate, endDate)) return;
    if (!startDate) return;

    handler({
      name: companyName,
      location,
      startDate,
      endDate,
    });
  };

  const isChanged =
    companyName !== company?.name ||
    location !== company?.location ||
    startDate !== formattedStartDate ||
    endDate !== formattedEndDate;

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
        <TextField
          autoFocus
          margin="dense"
          type="month"
          fullWidth
          variant="outlined"
          value={startDate}
          label="Date Started"
          onChange={handleStartDateChange}
          slotProps={{
            htmlInput: {
              max: new Date().toISOString().split("T")[0].substring(0, 7),
            },
            inputLabel: {
              shrink: true,
              sx: {
                visibility: endDate ? "visible" : "hidden",
                "&.Mui-focused": {
                  visibility: "visible",
                },
              },
            },
          }}
          error={!!dateError}
          required
        />
        <TextField
          margin="dense"
          type="month"
          fullWidth
          variant="outlined"
          value={endDate}
          label="Date Ended"
          onChange={handleEndDateChange}
          slotProps={{
            htmlInput: {
              min: startDate,
              max: new Date().toISOString().split("T")[0].substring(0, 7),
            },
            inputLabel: {
              shrink: true,
              sx: {
                visibility: endDate ? "visible" : "hidden",
                "&.Mui-focused": {
                  visibility: "visible",
                },
              },
            },
          }}
          error={!!dateError}
          helperText={dateError}
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
              positionsInCompany.length > 0
                ? "To delete this company, first delete all positions."
                : ""
            }
            onConfirmDelete={() => deleteHandler(company)}
            disabled={positionsInCompany.length > 0}
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
