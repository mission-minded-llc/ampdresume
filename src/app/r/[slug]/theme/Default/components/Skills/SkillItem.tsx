import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { Icon } from "@iconify/react";
import { SkillForProjectWithSkill } from "@/graphql/getSkillsForProject";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItemView } from "./SkillItemView";
import { SkillsContext } from "./Skills";

export const SkillItem = ({
  skill,
}: {
  skill: SkillForUserWithSkill | SkillForProjectWithSkill;
}) => {
  const { skillType } = useContext(SkillsContext);
  const [isOpen, setIsOpen] = useState(false);

  const projectSkill = skill as SkillForProjectWithSkill;
  const skillData =
    skillType === "project"
      ? { ...projectSkill.skillForUser, description: projectSkill.description }
      : (skill as SkillForUserWithSkill);

  const SkillIcon = () =>
    skillData?.icon ? (
      <Icon icon={skillData.icon} />
    ) : skillData?.skill?.icon ? (
      <Icon icon={skillData.skill.icon} />
    ) : null;

  return (
    <React.Fragment>
      <Button
        disabled={!skill?.description}
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
          borderColor: skill?.description ? "lawngreen" : theme.palette.primary.dark,
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
          <SkillItemView skill={skillData} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
