"use client";

import { Box } from "@mui/material";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { NavPrimary } from "./NavPrimary";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";

export const Header = () => {
  const isDesktop = useIsDesktop();

  return (
    <Box
      component="header"
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(20, 17, 24, 0.72)" : "rgba(255, 248, 243, 0.78)",
        backdropFilter: "blur(16px)",
        position: "sticky",
        zIndex: 9,
        top: 0,
        left: 0,
        width: "100%",
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: isDesktop ? 2 : 0,
        [theme.breakpoints.down("sm")]: {
          mb: 0,
          flexDirection: "row-reverse",
        },
      })}
    >
      <NavPrimary />
      {isDesktop ? <ThemeAppearanceToggle /> : null}
    </Box>
  );
};
