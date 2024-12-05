"use client";

import React from "react";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { getBaseUrl } from "@/util/url";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MuiLink } from "../MuiLink";

export const Header = () => {
  const baseUrl = getBaseUrl();
  const pathname = usePathname();
  const session = useSession();

  // Hide this header on the resume page.
  if (pathname.startsWith("/r/")) return null;

  return (
    <Box
      component="header"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        zIndex: 1,
        top: 0,
        left: 0,
        width: "100vw",
        boxShadow: "0 0 35px rgba(0, 0, 0, 0.1)",
        mb: "2em",
      })}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.35em",
          }}
        >
          <Typography component={Link} href={baseUrl}>
            OpenResume
          </Typography>
        </Box>
        <Box component="nav">
          <Box
            sx={{
              display: "flex",
              gap: "1em",
            }}
          >
            {session?.data?.user ? (
              <>
                {session.data.user.slug ? (
                  <>
                    <MuiLink href={`/r/${session.data.user.slug}`}>Resume</MuiLink> |{" "}
                  </>
                ) : null}
                <MuiLink href="/account">Account</MuiLink> |
                <MuiLink href="/api/auth/signout">Logout</MuiLink>
              </>
            ) : pathname.includes("login") !== true ? (
              <Typography component={Link} href="/login">
                Login
              </Typography>
            ) : null}
          </Box>
        </Box>
        <ThemeAppearanceToggle />
      </Box>
    </Box>
  );
};
