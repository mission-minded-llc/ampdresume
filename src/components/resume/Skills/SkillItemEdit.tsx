import { Box, Button, Divider, TextField } from "@mui/material";

import { EditSkillMutation } from "@/app/resume/edit/components/sections/skills/EditSkills";
import { Icon } from "@iconify/react";
import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillType } from "@/graphql/getSkills";
import { useState } from "react";

export const SkillItemEdit = ({
  skill,
  skillType,
  editMutation,
  successCallback,
}: {
  skill: SkillForUserWithSkill;
  skillType: SkillType;
  editMutation?: EditSkillMutation;
  successCallback?: () => void;
}) => {
  const [value, setValue] = useState(skill?.description ?? "");
  const [yearStarted, setYearStarted] = useState(skill?.yearStarted ?? new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(skill?.totalYears ?? 1);

  const handleSave = () => {
    if (editMutation) {
      editMutation.mutate({
        id: skill.id,
        description: value,
        yearStarted,
        totalYears,
      });

      if (successCallback) {
        successCallback();
      }
    }
  };

  const handleDelete = () => {};

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <TextField
          type="number"
          label="Year Started"
          value={yearStarted}
          onChange={(e) => setYearStarted(Number(e.target.value))}
        />
        <TextField
          type="number"
          label="Total Years"
          value={totalYears}
          onChange={(e) => setTotalYears(Number(e.target.value))}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2 }}>
        <RichTextEditor
          name={skillType}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          <Icon icon="dashicons:trash" />
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
