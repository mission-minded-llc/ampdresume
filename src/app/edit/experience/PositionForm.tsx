import { Box, Button, TextField } from "@mui/material";
import { Position, PositionGeneric, PositionWithProjects } from "@/graphql/getPositions";
import React, { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
// @ts-expect-error
import dayjs from "dayjs";

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
  const formattedStartDate = position?.startDate ? new Date(parseInt(position.startDate, 10)) : "";
  const formattedEndDate = position?.endDate ? new Date(parseInt(position.endDate, 10)) : "";

  const [positionTitle, setPositionTitle] = useState(position?.title || "");
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
      title: positionTitle,
      startDate,
      endDate,
    });
  };

  const isChanged =
    positionTitle !== position?.title ||
    dayjs(new Date(startDate.toString())).$d.toString() != formattedStartDate ||
    dayjs(new Date(endDate.toString())).$d.toString() != formattedEndDate;

  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "grid",
          gap: 2,
          gridTemplateColumns: "50% 1fr 1fr",
          alignItems: "center",
        }}
      >
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Position Title"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
          required
        />
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
