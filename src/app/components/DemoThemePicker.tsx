import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Icon } from "@iconify/react";
import { FloatingThemePicker } from "./FloatingThemePicker";

export type DemoThemeOption = {
  value: string;
  label: string;
  icon: string;
};

/**
 * Theme menu for a demo. Choosing an option changes the layout immediately
 * and does not write to an account.
 *
 * @param label Accessible name of the menu, such as "Theme" or "PDF Theme".
 * @param value Currently shown theme slug.
 * @param options Themes the visitor can try.
 * @param onChange Called with the newly selected theme slug.
 * @returns The floating menu.
 */
export const DemoThemePicker = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: DemoThemeOption[];
  onChange: (themeName: string) => void;
}) => {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-demo-select`;

  /**
   * Applies the visitor's selection to the demo.
   *
   * @param event Select change whose value is a theme slug.
   */
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FloatingThemePicker>
      <FormControl fullWidth size="small">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select labelId={labelId} value={value} label={label} onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Icon icon={option.icon} width={16} height={16} />
                {option.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FloatingThemePicker>
  );
};
