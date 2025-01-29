import { Box, Button, TextField } from "@mui/material";
import { Company, CompanyGeneric } from "@/graphql/getCompanies";
import React, { useContext, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { ResumeContext } from "@/components/resume/ResumeContext";
// @ts-expect-error
import dayjs from "dayjs";

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

  const formattedStartDate = company?.startDate ? new Date(parseInt(company.startDate, 10)) : "";
  const formattedEndDate = company?.endDate ? new Date(parseInt(company.endDate, 10)) : "";

  const [companyName, setCompanyName] = useState(company?.name || "");
  const [location, setLocation] = useState(company?.location || "");
  const [startDate, setStartDate] = useState(dayjs(formattedStartDate));
  const [endDate, setEndDate] = useState(dayjs(formattedEndDate));
  const [dateError, setDateError] = useState("");

  const validateDates = (start: string | null, end: string | null) => {
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (endDate && startDate && endDate < startDate) {
      setDateError("WARNING: End date is before start date!");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleStartDateChange = (newStartDate: Object): void => {
    setStartDate(newStartDate);
    validateDates(newStartDate.toString(), endDate);
  };

  const handleEndDateChange = (newEndDate: Object) => {
    setEndDate(newEndDate);
    validateDates(startDate, newEndDate.toString());
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
    dayjs(new Date(startDate.toString())).$d.toString() != formattedStartDate ||
    dayjs(new Date(endDate.toString())).$d.toString() != formattedEndDate;

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
          onChange={handleStartDateChange}
          views={["month", "year"]}
          sx={{ flex: 1 }}
          disableFuture
          maxDate={endDate || new Date()}
        />
        <DatePicker
          label="Date Ended"
          value={endDate}
          onChange={handleEndDateChange}
          views={["month", "year"]}
          sx={{ flex: 1 }}
          disableFuture
          slotProps={{
            textField: {
              helperText: dateError,
            },
          }}
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
