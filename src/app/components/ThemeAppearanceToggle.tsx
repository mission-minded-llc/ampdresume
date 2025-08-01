
import { Icon } from "@iconify/react";
import { Box, Switch } from "@mui/material";
import { useContext } from "react";

import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";

import { ThemeAppearanceContext } from "./ThemeContext";

export const ThemeAppearanceToggle = () => {
  const { themeAppearance, setThemeAppearance } = useContext(ThemeAppearanceContext);
  const isDesktop = useIsDesktop();
  const isResumePage = useIsResumePage();

  const toggleThemeAppearance = () => {
    setThemeAppearance(themeAppearance === "light" ? "dark" : "light");
  };

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        height: "50px",
        backgroundColor: isResumePage ? "transparent" : theme.palette.background.default,
        marginRight: isDesktop && !isResumePage ? "1em" : 0,
        padding: "0 1em",
        borderRadius: "1em",
      })}
    >
      <Icon icon="solar:sun-bold" />
      <Switch checked={themeAppearance === "dark"} onChange={toggleThemeAppearance} />
      <Icon icon="solar:moon-bold" />
    </Box>
  );
};
