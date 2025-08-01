import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { memo } from "react";

import { validateAndConvertDate } from "@/lib/dateUtils";

export const EducationDateField = memo(
  ({
    value,
    onChange,
    hasError,
  }: {
    value: string;
    onChange: (date: string) => void;
    hasError: boolean;
  }) => {
    return (
      <DatePicker
        label="Date Awarded"
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(validateAndConvertDate(date))}
        slotProps={{
          textField: {
            error: hasError,
            helperText: hasError ? "Date awarded is required" : "",
          },
        }}
        sx={{ width: "100%" }}
      />
    );
  },
);

EducationDateField.displayName = "EducationDateField";
