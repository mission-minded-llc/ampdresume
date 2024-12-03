import { Icon } from "@iconify/react";

import { Box, Switch } from "@mui/material";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import { useContext } from "react";

export const ThemeAppearanceToggle = () => {
  const { themeAppearance, setThemeAppearance } = useContext(ThemeAppearanceContext);

  const toggleThemeAppearance = () => {
    setThemeAppearance(themeAppearance === "light" ? "dark" : "light");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "50px",
        backgroundColor: "transparent",
      }}
    >
      <Icon icon="solar:sun-bold" />
      <Switch
        checked={themeAppearance === "dark"}
        onChange={toggleThemeAppearance}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
        })}
      />
      <Icon icon="solar:moon-bold" />
    </Box>
  );
};
