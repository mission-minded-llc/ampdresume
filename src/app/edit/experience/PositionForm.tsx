import { Box, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { formatLongDate, timestampToDate } from "@/lib/format";

import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { Position } from "@openresume/theme";
import { PositionGeneric } from "@/graphql/getPositionsWithProjects";

export const PositionForm = ({
  position,
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  position?: Position | null;
  handler: (position: Position | PositionGeneric) => void;
  deleteHandler?: ((position: Position) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const [positionTitle, setPositionTitle] = useState(position?.title || "");
  const [positionTitleValid, setPositionTitleValid] = useState(true);

  const [startDate, setStartDate] = useState<Dayjs | null>(
    position?.startDate ? dayjs(timestampToDate(position?.startDate)) : null,
  );
  const [startDateValid, setStartDateValid] = useState(true);

  const [endDate, setEndDate] = useState<Dayjs | null>(
    position?.endDate ? dayjs(timestampToDate(position?.endDate)) : null,
  );

  const saveHandler = () => {
    if (!startDate) setStartDateValid(false);
    if (!positionTitle) setPositionTitleValid(false);
    if (!startDate || !positionTitle) return;

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
          gridTemplateColumns: "50% 50%",
          alignItems: "center",
        }}
        className="position-form"
      >
        <FormControl error={!positionTitleValid} sx={{ gridColumn: "span 2" }}>
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            label="Position Title"
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
            required
            name="positionTitle"
          />
          {!positionTitleValid && <FormHelperText>Position title is required.</FormHelperText>}
        </FormControl>
        <FormControl error={!startDateValid}>
          <DatePicker
            label="Date Started"
            value={startDate}
            onChange={(value) => setStartDate(value)}
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
        {position && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Position"
            tooltip={
              position?.projects?.length && position.projects.length > 0
                ? "To delete this position, first delete all projects in the position."
                : ""
            }
            onConfirmDelete={() => {
              deleteHandler(position);
            }}
            disabled={position?.projects?.length ? position.projects.length > 0 : false}
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
