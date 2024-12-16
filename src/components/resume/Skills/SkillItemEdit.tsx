import { Box, Button, Divider, TextField } from "@mui/material";
import { useContext, useState } from "react";

import { Icon } from "@iconify/react";
import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillsContext } from "./Skills";
import { Tooltip } from "@/components/Tooltip";

export const SkillItemEdit = ({
  skill,
  successCallback,
}: {
  skill: SkillForUserWithSkill;
  successCallback?: () => void;
}) => {
  const { skillType, updateSkillForUserMutation } = useContext(SkillsContext);

  const [value, setValue] = useState(skill?.description ?? "");
  const [yearStarted, setYearStarted] = useState(skill?.yearStarted ?? new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(skill?.totalYears ?? 1);

  const handleSave = () => {
    if (updateSkillForUserMutation) {
      updateSkillForUserMutation.mutate({
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
        <>
          <TextField
            type="number"
            label="Total Years"
            value={totalYears}
            onChange={(e) => setTotalYears(Number(e.target.value))}
          />
          <Tooltip
            message="Enter the year you started using this skill 
            or the total years of experience. If you enter the 
            year started, the total years will be calculated 
            for you automatically. If you enter a total years
            value, it will override the calculated value. Leave 0
            for none."
          />
        </>
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
