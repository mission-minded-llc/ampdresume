import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import { CustomDialogTitle } from "@/components/DialogTitle";
import { Icon } from "@iconify/react";
import { SkillForProjectWithSkill } from "@/graphql/getSkillsForProject";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItemEdit } from "./SkillItemEdit";
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
            {skillData?.icon ? <Icon icon={skillData.icon} /> : null}
            {skillData.skill.name}
          </Box>
        </CustomDialogTitle>
        <DialogContent>
          {userCanEdit ? <SkillItemEdit skill={skillData} /> : <SkillItemView skill={skillData} />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
