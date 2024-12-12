import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import styles from "./SkillItem.module.scss";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const SkillItem = ({ skill }: { skill: SkillForUserWithSkill }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        disabled={!skill?.description}
        variant="outlined"
        color="primary"
        className={styles.item}
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
          },
        })}
      >
        {skill?.icon ? (
          <Icon icon={skill.icon} className={styles.icon} />
        ) : skill?.skill?.icon ? (
          <Icon icon={skill.skill.icon} className={styles.icon} />
        ) : null}
        {skill.skill.name}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: "1em", padding: "16px 48px" }}
        >
          {skill?.icon ? <Icon icon={skill.icon} className={styles.icon} /> : null}
          {skill.skill.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          X
        </IconButton>
        <DialogContent>{skill.description}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
