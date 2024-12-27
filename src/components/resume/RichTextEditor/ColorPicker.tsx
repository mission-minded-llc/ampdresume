import { Box, IconButton } from "@mui/material";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { SketchPicker } from "react-color";
import { useState } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  icon: React.ReactElement;
}

export const ColorPicker = ({ color, onChange, icon }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton onClick={() => setIsOpen(!isOpen)} aria-label="Change Color">
        {icon}
      </IconButton>
      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              zIndex: 10,
              top: "30px",
              left: "30px",
              userSelect: "none",
            }}
          >
            <SketchPicker
              color={color}
              onChangeComplete={(color) => {
                onChange(color.hex);
              }}
            />
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};
