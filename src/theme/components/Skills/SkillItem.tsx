import React, { useContext, useState } from "react";
import { Box, Dialog, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { SkillForProject, SkillForUser } from "@/types";
import { SkillItemView } from "./SkillItemView";
import { SkillsContext } from "./Skills";

export const SkillItem = ({ skill }: { skill: SkillForUser | SkillForProject }) => {
  const { skillType } = useContext(SkillsContext);
  const [isOpen, setIsOpen] = useState(false);

  const projectSkill = skill as SkillForProject;
  const skillData =
    skillType === "project"
      ? { ...projectSkill.skillForUser, description: projectSkill.description }
      : (skill as SkillForUser);

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
        component="div"
        variant="outlined"
        color="primary"
        onClick={() => setIsOpen(true)}
        data-interactive={Boolean(skill?.description)}
        sx={(theme) => {
          const color = theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main;
          const backgroundColor =
            theme.palette.mode === "dark" ? "#2C2733" : theme.palette.background.paper;
          const hasDescription = Boolean(skill?.description);

          return {
            padding: "4px 12px !important",
            minHeight: 32,
            color,
            backgroundColor,
            borderRadius: 999,
            boxShadow: "none",
            border: `1px solid ${
              hasDescription ? theme.palette.secondary.main : theme.palette.divider
            }`,
            "&.Mui-disabled": {
              color,
              backgroundColor,
              borderColor: `${theme.palette.divider} !important`,
              boxShadow: "none !important",
              opacity: 1,
            },
            textTransform: "none",
            fontWeight: 600,
            gap: "8px",
          };
        }}
      >
        {skillData?.icon ? (
          <Icon icon={skillData.icon} />
        ) : skillData?.skill?.icon ? (
          <Icon icon={skillData.skill.icon} />
        ) : null}
        {skillData.skill.name}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onTransitionExited={() => setIsOpen(false)}
        fullWidth
        maxWidth="md"
      >
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
