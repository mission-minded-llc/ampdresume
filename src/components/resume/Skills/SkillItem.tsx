import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { useSession } from "next-auth/react";

export const SkillItem = ({ skill }: { skill: SkillForUserWithSkill }) => {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(skill?.description ? false : true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id === skill.userId) setButtonDisabled(false);
  }, [session?.user?.id, skill.userId, status]);

  return (
    <React.Fragment>
      <Button
        disabled={buttonDisabled}
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
          },
          textTransform: "none",
          gap: "8px",
        })}
      >
        {skill?.icon ? (
          <Icon icon={skill.icon} />
        ) : skill?.skill?.icon ? (
          <Icon icon={skill.skill.icon} />
        ) : null}
        {skill.skill.name}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: "1em", padding: "16px 48px" }}
        >
          {skill?.icon ? <Icon icon={skill.icon} /> : null}
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
