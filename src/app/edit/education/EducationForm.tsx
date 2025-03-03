import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { formatLongDate, timestampToDate } from "@/lib/format";

import { DatePicker } from "@mui/x-date-pickers";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { Education } from "@openresume/theme";
import { EducationGeneric } from "@/graphql/getEducation";

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
  const [school, setSchool] = useState(education?.school || "");
  const [degree, setDegree] = useState(education?.degree || "");
  const [dateAwarded, setDateAwarded] = useState<Dayjs | null>(
    dayjs(timestampToDate(education?.dateAwarded)),
  );

  const saveHandler = () => {
    handler({
      school,
      degree,
      dateAwarded: dateAwarded?.toString() || "",
    });
  };

  const isChanged =
    school !== education?.school ||
    degree !== education?.degree ||
    formatLongDate(dateAwarded) !== formatLongDate(education?.dateAwarded);

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
