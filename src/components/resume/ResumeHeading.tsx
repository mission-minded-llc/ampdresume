"use client";

import { Typography } from "@mui/material";
import { User } from "@prisma/client";

export const ResumeHeading = ({ user }: { user: User }) => {
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={(theme) => ({
        marginTop: "16px",
        marginBottom: "0",
        textAlign: "center",
        lineHeight: "100%",
        [theme.breakpoints.down("sm")]: {
          textAlign: "left",
        },
      })}
    >
      {user?.name}
      <Typography
        component="span"
        variant="h5"
        sx={{
          display: "block",
          mt: 1,
          pt: 1,
        }}
      >
        {user?.title}
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{
          fontSize: "1rem",
        }}
      >
        {user?.displayEmail}
        {user?.displayEmail && user?.location ? (
          <Typography
            component="span"
            sx={{ margin: "0 1rem", fontSize: "2rem", fontWeight: "lighter", opacity: 0.5 }}
          >
            |
          </Typography>
        ) : null}
        {user?.location}
      </Typography>
    </Typography>
  );
};
