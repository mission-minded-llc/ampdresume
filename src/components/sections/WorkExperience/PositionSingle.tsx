"use client";

import { useEffect, useRef, useState } from "react";

import { Projects } from "./Projects";
import Typography from "@mui/material/Typography";
import cx from "classnames";
import { formatDate } from "@/lib/format";
import styles from "./PositionSingle.module.scss";
import { PositionWithProjects } from "@/graphql/getPositions";

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

  const startDate = formatDate(position?.startDate?.toString());
  const endDate = formatDate(position?.endDate?.toString());

  return (
    <div className={styles.container}>
      <div key={`position-${position.id}`}>
        <Typography
          component="h4"
          variant="h6"
          className={cx(isSticky ? "stuck" : "", styles.position)}
          ref={stickyRef}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.default,
          })}
        >
          {position.title}{" "}
          {showDates ? (
            <span className="dates">
              &mdash; {startDate} to {endDate.length ? endDate : "Present"}
            </span>
          ) : null}
          <Typography
            component="span"
            className={styles.companyName}
            sx={{ opacity: isSticky ? 1 : 0 }}
          >
            {position.company.name}
          </Typography>
        </Typography>
        {position?.projects ? <Projects projects={position.projects} /> : null}
      </div>
    </div>
  );
};
