import { Box, IconButton, TextField } from "@mui/material";
import { memo, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import { Position } from "./types";
import dayjs from "dayjs";

interface PositionFieldsProps {
  position: Position;
  companyIndex: number;
  positionIndex: number;
  onFieldChange: (
    companyIndex: number,
    positionIndex: number,
    projectIndex: number | undefined,
    field: string,
    value: string,
  ) => void;
  onDateChange: (
    companyIndex: number,
    positionIndex: number,
    field: "startDate" | "endDate",
    date: string,
  ) => void;
  onDelete: (companyIndex: number, positionIndex: number) => void;
}

export const PositionFields = memo(
  ({
    position,
    companyIndex,
    positionIndex,
    onFieldChange,
    onDateChange,
    onDelete,
  }: PositionFieldsProps) => {
    const [localTitle, setLocalTitle] = useState(position.title || "");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalTitle(e.target.value);
    };

    const handleTitleBlur = () => {
      if (localTitle !== position.title) {
        onFieldChange(companyIndex, positionIndex, undefined, "title", localTitle);
      }
    };

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <TextField
            fullWidth
            label="Position"
            value={localTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={position.startDate ? dayjs(position.startDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, positionIndex, "startDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
              slotProps={{
                textField: {
                  required: true,
                  error: !position.startDate,
                  helperText: !position.startDate ? "Start date is required" : "",
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={position.endDate ? dayjs(position.endDate) : null}
              onChange={(date) =>
                onDateChange(companyIndex, positionIndex, "endDate", date?.toISOString() || "")
              }
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        <IconButton
          onClick={() => onDelete(companyIndex, positionIndex)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  },
);

PositionFields.displayName = "PositionFields";
