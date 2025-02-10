import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import { CustomDialogTitle } from "@/components/DialogTitle";
import { Icon } from "@iconify/react";
import { SkillForProjectWithSkill } from "@/graphql/getSkillsForProject";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItemEdit } from "@/app/edit/skills/SkillItemEdit";
import { SkillItemView } from "./SkillItemView";
import { SkillsContext } from "./Skills";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const SkillItem = ({
  skill,
}: {
  skill: SkillForUserWithSkill | SkillForProjectWithSkill;
}) => {
  const { skillType } = useContext(SkillsContext);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const projectSkill = skill as SkillForProjectWithSkill;
  const skillData =
    skillType === "project"
      ? { ...projectSkill.skillForUser, description: projectSkill.description }
      : (skill as SkillForUserWithSkill);

  const userCanEdit =
    skillData?.userId &&
    pathname.startsWith("/edit/skills") &&
    status === "authenticated" &&
    session?.user?.id === skillData.userId;

  const buttonDisabled = !(skill?.description || userCanEdit);

  const SkillIcon = () =>
    skillData?.icon ? (
      <Icon icon={skillData.icon} />
    ) : skillData?.skill?.icon ? (
      <Icon icon={skillData.skill.icon} />
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
        {skillData?.icon ? (
          <Icon icon={skillData.icon} />
        ) : skillData?.skill?.icon ? (
          <Icon icon={skillData.skill.icon} />
        ) : null}
        {skillData.skill.name}
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="md">
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <SkillIcon />
            {skillData.skill.name}
          </Box>
        </CustomDialogTitle>
        <DialogContent>
          {userCanEdit ? (
            <SkillItemEdit skill={skillData} handleClose={() => setIsOpen(false)} />
          ) : (
            <SkillItemView skill={skillData} />
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
