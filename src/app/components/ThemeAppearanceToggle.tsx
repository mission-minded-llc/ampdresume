import { Icon } from "@iconify/react";

import { Box, Switch } from "@mui/material";
import { ThemeAppearanceContext } from "./ThemeContext";
import { useContext } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";

export const ThemeAppearanceToggle = () => {
  const { themeAppearance, setThemeAppearance } = useContext(ThemeAppearanceContext);
  const isDesktop = useIsDesktop();
  const isResumePage = useIsResumePage();

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
        marginRight: isDesktop && !isResumePage ? "1em" : 0,
      }}
    >
      <Icon icon="solar:sun-bold" />
      <Switch checked={themeAppearance === "dark"} onChange={toggleThemeAppearance} />
      <Icon icon="solar:moon-bold" />
    </Box>
  );
};
