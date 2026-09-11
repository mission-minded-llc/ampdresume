"use client";

import { Box, Typography } from "@mui/material";
import { MuiLink } from "@/components/MuiLink";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";
import { getBaseUrl } from "@/util/url";

export const Footer = () => {
  const baseUrl = getBaseUrl();
  const isDesktop = useIsDesktop();
  const isResumePage = useIsResumePage();

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: isResumePage ? "fixed" : "relative",
        marginTop: "auto",
        height: "auto",
        overflow: "auto",
        zIndex: 2,
        bottom: 0,
        left: 0,
        width: "100%",
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 -8px 28px rgba(42, 36, 48, 0.06)",
      })}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          padding: "0.5em",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <MuiLink href={baseUrl}>ampdresume.com</MuiLink>
        <Box>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            {isDesktop ? (
              <>&copy; {new Date().getFullYear()} Amp&apos;d Resume. All rights reserved. | </>
            ) : null}
            <MuiLink href="/about/privacy-policy">Privacy Policy</MuiLink> |{" "}
            <MuiLink href="/about/terms-of-service">Terms of Service</MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
