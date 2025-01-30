"use client";

import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import { PositionWithProjects } from "@/graphql/getPositions";
import { Projects } from "./Projects";
import Typography from "@mui/material/Typography";
import { formatLongDate } from "@/lib/format";

export const PositionSingle = ({
  position,
  showDates,
}: {
  position: PositionWithProjects;
  showDates: boolean;
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLHeadingElement | null>(null);

  const handleScroll = () => {
    if (!stickyRef.current) return;

    const { top } = stickyRef.current.getBoundingClientRect();
    setIsSticky(top <= 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startDate = formatLongDate(position?.startDate?.toString());
  const endDate = formatLongDate(position?.endDate?.toString());

  return (
    <Box
      sx={{
        marginTop: "10px",
        "@media screen and (max-width: 600px)": {
          marginTop: "16px",
          paddingTop: 0,
        },
        textAlign: "center",
      }}
    >
      <Typography
        component="h4"
        variant="h6"
        ref={stickyRef}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          boxShadow: isSticky ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
          textAlign: "center",
          padding: "1rem 0",
          marginTop: 0,
          marginBottom: "10px",
          zIndex: 1,
          borderBottom: "1px solid white",
          [theme.breakpoints.down("sm")]: {
            marginTop: "16px",
            textAlign: "left",
          },
        })}
      >
        {position.title}{" "}
        {showDates ? (
          <Typography component="span">
            &mdash; {startDate} to {endDate.length ? endDate : "Present"}
          </Typography>
        ) : null}
        <Typography
          component="span"
          sx={(theme) => ({
            opacity: isSticky ? 1 : 0,
            display: isSticky ? "block" : "none",
            transition: "opacity 500ms ease",
            [theme.breakpoints.down("sm")]: {
              opacity: 1,
            },
          })}
        >
          {position.company.name}
        </Typography>
      </Typography>
      {position?.projects ? <Projects projects={position.projects} /> : null}
    </Box>
  );
};
