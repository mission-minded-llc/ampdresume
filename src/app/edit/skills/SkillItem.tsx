import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { CustomDialogTitle } from "@/components/DialogTitle";
import { Icon } from "@iconify/react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItemEdit } from "@/app/edit/skills/SkillItemEdit";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const SkillItem = ({ skill }: { skill: SkillForUserWithSkill }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const userCanEdit =
    skill?.userId &&
    pathname.startsWith("/edit/skills") &&
    status === "authenticated" &&
    session?.user?.id === skill.userId;

  const buttonDisabled = !(skill?.description || userCanEdit);

  const SkillIcon = () =>
    skill?.icon ? (
      <Icon icon={skill.icon} />
    ) : skill?.skill?.icon ? (
      <Icon icon={skill.skill.icon} />
    ) : null;

  return (
    <React.Fragment>
      <Button
        disabled={buttonDisabled}
        variant="outlined"
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={(theme) => ({
          padding: "2px 10px",
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          boxShadow: `2px 2px 3px 0px ${theme.palette.primary.dark}`,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
            boxShadow: "none",
          },
          textTransform: "none",
          gap: "8px",
          borderColor: userCanEdit && skill?.description ? "lawngreen" : theme.palette.primary.dark,
        })}
      >
        <SkillIcon />
        {skill.skill.name}
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="md">
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <SkillIcon />
            {skill.skill.name}
          </Box>
        </CustomDialogTitle>
        <DialogContent>
          <SkillItemEdit skill={skill} handleClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
