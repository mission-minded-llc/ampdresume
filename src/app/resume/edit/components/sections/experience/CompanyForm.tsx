import { Box, Button, TextField } from "@mui/material";
import { CompanyGraphql, CompanyGraphqlGeneric } from "@/graphql/getCompanies";
import React, { useState } from "react";

export const CompanyForm = ({
  company,
  handler,
  onCancel = null,
}: {
  company?: CompanyGraphql | null;
  handler: (company: CompanyGraphqlGeneric | CompanyGraphql) => void;
  onCancel?: (() => void) | null;
}) => {
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
          justifyContent: "flex-end",
          gap: 2,
          mt: 2,
        }}
      >
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={saveHandler}>
          Save
        </Button>
      </Box>
    </>
  );
};
