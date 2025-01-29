import { Box, Button, TextField } from "@mui/material";
import { Education, EducationGeneric } from "@/graphql/getEducation";
import React, { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
// @ts-expect-error
import dayjs from "dayjs";

export const EducationForm = ({
  education,
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  education?: Education | null;
  handler: (education: EducationGeneric | Education) => void;
  deleteHandler?: ((education: Education) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const formattedDateAwarded = education?.dateAwarded
    ? new Date(parseInt(education.dateAwarded, 10))
    : "";

  const [school, setSchool] = useState(education?.school || "");
  const [degree, setDegree] = useState(education?.degree || "");
  const [dateAwarded, setDateAwarded] = useState(dayjs(formattedDateAwarded));

  const saveHandler = () => {
    handler({
      school,
      degree,
      dateAwarded,
    });
  };

  const isChanged =
    school !== education?.school ||
    degree !== education?.degree ||
    dayjs(new Date(dateAwarded.toString())).$d.toString() != formattedDateAwarded;

  return (
    <>
      <Box sx={{ mb: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Degree / Award"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <div></div>
        <DatePicker
          label="Date Awarded"
          value={dateAwarded}
          onChange={(newValue) => setDateAwarded(newValue)}
          views={["month", "year"]}
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
        {education && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Education"
            tooltip="No undo!"
            onConfirmDelete={() => deleteHandler(education)}
          />
        )}
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={saveHandler} disabled={!isChanged}>
          Save Education
        </Button>
      </Box>
    </>
  );
};
