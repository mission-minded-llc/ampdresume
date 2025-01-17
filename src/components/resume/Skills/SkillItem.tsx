import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { CustomDialogTitle } from "@/components/DialogTitle";
import { Icon } from "@iconify/react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItemEdit } from "./SkillItemEdit";
import { SkillItemView } from "./SkillItemView";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const SkillItem = ({ skill }: { skill: SkillForUserWithSkill }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const userCanEdit =
    pathname.startsWith("/edit/skills") &&
    status === "authenticated" &&
    session?.user?.id === skill.userId;

  const buttonDisabled = !(skill?.description || userCanEdit);

  return (
    <React.Fragment>
      <Button
        disabled={buttonDisabled}
        variant="outlined"
        color="primary"
        onClick={() => setIsOpen(true)}
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

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth={userCanEdit ? "xl" : "md"}
      >
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            {skill?.icon ? <Icon icon={skill.icon} /> : null}
            {skill.skill.name}
          </Box>
        </CustomDialogTitle>
        <DialogContent>
          {userCanEdit ? <SkillItemEdit skill={skill} /> : <SkillItemView skill={skill} />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
