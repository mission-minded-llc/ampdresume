import { Education } from "@ampdresume/theme";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

import { EducationGeneric } from "@/graphql/getEducation";
import { formatLongDate, timestampToDate } from "@/lib/format";


import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";


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
      <Box
        sx={{ mb: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}
      >
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
      <Box
        sx={{
          mb: 2,
          mt: { xs: 3, sm: 0 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
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
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
          mt: 2,
        }}
      >
        {education && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Education"
            onConfirmDelete={() => deleteHandler(education)}
            dialogMessage="Are you sure you want to delete this education? (No undo!)"
          />
        )}
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={saveHandler}
          disabled={!isChanged || !school.trim() || !degree.trim() || !dateAwarded?.isValid()}
        >
          Save Education
        </Button>
      </Box>
    </>
  );
};
