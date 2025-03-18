import { Box, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { formatLongDate, formatShortDate, timestampToDate } from "@/lib/format";

import { Company } from "@openresume/theme";
import { CompanyGeneric } from "@/graphql/getCompanies";
import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";

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
  const [companyName, setCompanyName] = useState(company?.name || "");
  const [companyNameValid, setCompanyNameValid] = useState(true);

  const [location, setLocation] = useState(company?.location || "");

  const [startDate, setStartDate] = useState<Dayjs | null>(
    company?.startDate ? dayjs(timestampToDate(company.startDate)) : null,
  );
  const [startDateValid, setStartDateValid] = useState(true);

  const [endDate, setEndDate] = useState<Dayjs | null>(
    company?.endDate ? dayjs(timestampToDate(company.endDate)) : null,
  );

  const saveHandler = () => {
    if (!startDate) setStartDateValid(false);
    if (!companyName) setCompanyNameValid(false);
    if (!startDate || !companyName) return;

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
        <FormControl error={!companyNameValid}>
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            label="Company Name"
            name="companyName"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setCompanyNameValid(true);
            }}
            required
          />
          {!companyNameValid && <FormHelperText>Company name is required.</FormHelperText>}
        </FormControl>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <FormControl error={!startDateValid} sx={{ flex: 1 }}>
          <DatePicker
            label="Date Started"
            value={startDate}
            onChange={(value) => {
              setStartDate(value);
              setStartDateValid(true);
            }}
            views={["month", "year"]}
            sx={{ flex: 1 }}
            disableFuture
            maxDate={endDate || dayjs(new Date())}
            name="dateStarted"
          />
          <FormHelperText>
            {startDateValid ? "Start date is required." : "Please select a valid date."}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <DatePicker
            label="Date Ended"
            value={endDate}
            onChange={(value) => setEndDate(value)}
            views={["month", "year"]}
            sx={{ flex: 1 }}
            disableFuture
            maxDate={dayjs(new Date())}
            name="dateEnded"
          />
          <FormHelperText>Leave blank if current.</FormHelperText>
        </FormControl>
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
              company?.positions?.length
                ? "To delete this company, first delete all positions in the company."
                : ""
            }
            onConfirmDelete={() => deleteHandler(company)}
            disabled={company?.positions?.length ? true : false}
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
