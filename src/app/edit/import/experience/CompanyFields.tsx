import { Box, IconButton, TextField } from "@mui/material";
import { memo, useState } from "react";

import { Company } from "./types";
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

interface CompanyFieldsProps {
  company: Company;
  companyIndex: number;
  onFieldChange: (
    companyIndex: number,
    positionIndex: number | undefined,
    projectIndex: number | undefined,
    field: string,
    value: string,
  ) => void;
  onDateChange: (
    companyIndex: number,
    positionIndex: number | undefined,
    field: "startDate" | "endDate",
    date: string,
  ) => void;
  onDelete: (companyIndex: number) => void;
}

export const CompanyFields = memo(
  ({ company, companyIndex, onFieldChange, onDateChange, onDelete }: CompanyFieldsProps) => {
    const [localName, setLocalName] = useState(company.name || "");
    const [localLocation, setLocalLocation] = useState(company.location || "");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalName(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalLocation(e.target.value);
    };

    const handleNameBlur = () => {
      if (localName !== company.name) {
        onFieldChange(companyIndex, undefined, undefined, "name", localName);
      }
    };

    const handleLocationBlur = () => {
      if (localLocation !== company.location) {
        onFieldChange(companyIndex, undefined, undefined, "location", localLocation);
      }
    };

    return (
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Company"
              value={localName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={localLocation}
              onChange={handleLocationChange}
              onBlur={handleLocationBlur}
              sx={{ mb: 1 }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={company.startDate ? dayjs(company.startDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, undefined, "startDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
              slotProps={{
                textField: {
                  required: true,
                  error: !company.startDate,
                  helperText: !company.startDate ? "Start date is required" : "",
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={company.endDate ? dayjs(company.endDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, undefined, "endDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        <IconButton onClick={() => onDelete(companyIndex)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  },
);

CompanyFields.displayName = "CompanyFields";
