import { Box, Button, TextField } from "@mui/material";
import {
  Position,
  PositionGeneric,
  PositionWithProjects,
} from "@/graphql/getPositionsWithProjects";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { formatLongDate, timestampToDate } from "@/lib/format";

import { DatePicker } from "@mui/x-date-pickers";
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
  const [positionTitle, setPositionTitle] = useState(position?.title || "");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(timestampToDate(position?.startDate)),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(timestampToDate(position?.endDate)));

  const saveHandler = () => {
    if (!startDate) return;

    handler({
      title: positionTitle,
      startDate: startDate.toString(),
      endDate: endDate?.toString() || "",
    });
  };

  const isChanged =
    positionTitle !== position?.title ||
    formatLongDate(startDate) !== formatLongDate(position?.startDate) ||
    formatLongDate(endDate) !== formatLongDate(position?.endDate);

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
          onChange={(value) => setStartDate(value)}
          views={["month", "year"]}
          sx={{ flex: 1 }}
          disableFuture
          maxDate={endDate || dayjs(new Date())}
        />
        <DatePicker
          label="Date Ended"
          value={endDate}
          onChange={(value) => setEndDate(value)}
          views={["month", "year"]}
          sx={{ flex: 1 }}
          disableFuture
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
