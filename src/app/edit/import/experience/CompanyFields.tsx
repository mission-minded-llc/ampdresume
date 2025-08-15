import dayjs from "dayjs";
import { memo, useState } from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { validateAndConvertDate } from "@/lib/dateUtils";
import { DeleteWithConfirmation } from "../../components/DeleteWithConfirmation";
import { Company } from "./types";

export const CompanyFields = memo(
  ({
    company,
    companyIndex,
    onFieldChange,
    onDateChange,
    onDelete,
  }: {
    company: Company;
    companyIndex: number;
    onFieldChange: (companyIndex: number, field: string, value: string) => void;
    onDateChange: (
      companyIndex: number,
      positionIndex: number | undefined,
      field: "startDate" | "endDate",
      date: string
    ) => void;
    onDelete: (companyIndex: number) => void;
  }) => {
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
        onFieldChange(companyIndex, "name", localName);
      }
    };

    const handleLocationBlur = () => {
      if (localLocation !== company.location) {
        onFieldChange(companyIndex, "location", localLocation);
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 2,
            width: "100%",
          }}
        >
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
          <DatePicker
            label="Start Date"
            value={company.startDate ? dayjs(company.startDate) : null}
            onChange={(date) =>
              onDateChange(
                companyIndex,
                undefined,
                "startDate",
                validateAndConvertDate(date)
              )
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
              onDateChange(
                companyIndex,
                undefined,
                "endDate",
                validateAndConvertDate(date)
              )
            }
            sx={{ flex: 1 }}
          />
          <DeleteWithConfirmation
            onConfirmDelete={() => onDelete(companyIndex)}
            buttonLabel="Delete Company"
            dialogTitle="Delete Company?"
            dialogMessage="Are you sure you want to delete this company? This will also delete all positions under this company. (No undo!)"
          />
        </Box>
      </Box>
    );
  }
);

CompanyFields.displayName = "CompanyFields";
