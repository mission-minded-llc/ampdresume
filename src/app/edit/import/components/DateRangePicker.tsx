import { Box, SxProps, Theme } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface DateRangePickerProps {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  startLabel?: string;
  endLabel?: string;
  sx?: SxProps<Theme>;
}

export const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startLabel = "Start Date",
  endLabel = "End Date",
  sx,
}: DateRangePickerProps) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, ...sx }}>
      <DatePicker
        label={startLabel}
        value={startDate ? dayjs(startDate) : null}
        onChange={(date) => onStartDateChange(date?.toISOString() || "")}
        sx={{ flex: 1 }}
      />
      <DatePicker
        label={endLabel}
        value={endDate ? dayjs(endDate) : null}
        onChange={(date) => onEndDateChange(date?.toISOString() || "")}
        sx={{ flex: 1 }}
      />
    </Box>
  );
};
