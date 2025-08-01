import { SkillForUser } from "@ampdresume/theme";
import { Icon } from "@iconify/react";
import { Box, Dialog, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { SkillItemEdit } from "@/app/edit/skills/SkillItemEdit";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";

export const SkillItem = ({ skill }: { skill: SkillForUser }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState<string | null | undefined>(
    skill?.icon || skill?.skill?.icon || null,
  );

  const userCanEdit =
    skill?.userId &&
    pathname.startsWith("/edit/skills") &&
    status === "authenticated" &&
    session?.user?.id === skill.userId;

  const buttonDisabled = !(skill?.description || userCanEdit);

  const SkillIcon = () => (icon ? <Icon icon={icon} /> : null);

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
        <DialogContent sx={{ padding: { xs: 2, sm: 3 } }}>
          <SkillItemEdit
            skill={skill}
            handleClose={() => setIsOpen(false)}
            setIconCallback={setIcon}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
