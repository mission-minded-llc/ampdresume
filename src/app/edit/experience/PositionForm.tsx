import { Box, Button, TextField } from "@mui/material";
import { Position, PositionGeneric, PositionWithProjects } from "@/graphql/getPositions";
import React, { useState } from "react";

import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";

export const PositionForm = ({
  position,
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  position?: PositionWithProjects | null;
  handler: (position: Position | PositionGeneric) => void;
  deleteHandler?: ((position: Position) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const formattedStartDate = position?.startDate
    ? new Date(parseInt(position.startDate, 10)).toISOString().split("T")[0].substring(0, 7)
    : "";
  const formattedEndDate = position?.endDate
    ? new Date(parseInt(position.endDate, 10)).toISOString().split("T")[0].substring(0, 7)
    : "";

  const [positionTitle, setPositionTitle] = useState(position?.title || "");
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
      title: positionTitle,
      startDate,
      endDate,
    });
  };

  const isChanged =
    positionTitle !== position?.title ||
    startDate !== formattedStartDate ||
    endDate !== formattedEndDate;

  return (
    <>
      <Box sx={{ mb: 2, display: "grid", gap: 2, gridTemplateColumns: "50% 1fr 1fr" }}>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Position Title"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
          required
        />
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
        {position && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Position"
            tooltip={
              position.projects.length > 0
                ? "To delete this position, first delete all projects."
                : ""
            }
            onConfirmDelete={() => {
              deleteHandler(position);
            }}
            disabled={position.projects.length > 0}
          />
        )}
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={saveHandler} disabled={!isChanged}>
          Save Position
        </Button>
      </Box>
    </>
  );
};
