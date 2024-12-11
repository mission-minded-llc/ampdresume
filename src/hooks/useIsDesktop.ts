import { useMediaQuery, useTheme } from "@mui/material";

export const useIsDesktop = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop;
};
