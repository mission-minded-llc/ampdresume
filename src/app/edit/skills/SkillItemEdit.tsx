import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { IconSelector } from "@/components/IconSelector";
import { MuiLink } from "@/components/MuiLink";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { SkillForUser } from "@ampdresume/theme";
import { Tooltip } from "@/components/Tooltip";
import { deleteSkillForUser } from "@/graphql/deleteSkillForUser";
import { removeLeadingZero } from "@/lib/format";
import { updateSkillForUser } from "@/graphql/updateSkillForUser";
import { useSession } from "next-auth/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SkillItemEdit = ({
  skill,
  handleClose,
}: {
  skill: SkillForUser;
  handleClose: VoidFunction;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const editorStateRef = useRef<string | null>(null);

  // Determine if we should auto-calculate total years based on existing data
  const hasTotalYears = skill?.totalYears && skill.totalYears > 0;
  const defaultAutoCalculate = !hasTotalYears; // Auto-calculate if no total years set

  const [yearStarted, setYearStarted] = useState(skill?.yearStarted ?? new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(skill?.totalYears ?? 0);
  const [icon, setIcon] = useState(skill?.icon ? skill.icon : skill?.skill?.icon);
  const [autoCalculate, setAutoCalculate] = useState(defaultAutoCalculate);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const updateSkillForUserMutation = useMutation({
    mutationFn: async ({
      id,
      description,
      yearStarted,
      totalYears,
    }: {
      id: string;
      description: string | null;
      yearStarted: number;
      totalYears: number;
      icon: string | null | undefined;
    }) => {
      if (!session?.user?.id) return;

      await updateSkillForUser({
        id,
        userId: session.user.id,
        description,
        yearStarted,
        totalYears,
        icon,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForUser"] }),
  });

  const deleteSkillForUserMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;

      await deleteSkillForUser({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skillsForUser"] }),
  });

  const handleDelete = () => deleteSkillForUserMutation.mutate({ id: skill.id });

  const handleAutoCalculateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setAutoCalculate(checked);

    if (checked) {
      // When enabling auto-calculate, clear the total years
      setTotalYears(totalYears ?? 0);
    }
  };

  const handleSave = (saveAndClose = false) => {
    // If auto-calculate is enabled, set total years to 0, because
    // we'll save 0 in the database and the frontend will calculate
    // the total years based on the year started.
    const calculatedTotalYears = autoCalculate ? 0 : totalYears;

    updateSkillForUserMutation.mutate({
      id: skill.id,
      description: editorStateRef.current,
      yearStarted,
      totalYears: calculatedTotalYears,
      icon,
    });
    if (saveAndClose) handleClose();
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {autoCalculate ? (
            <TextField
              type="number"
              label="Year Started"
              value={yearStarted}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = removeLeadingZero(target.value);
              }}
              onChange={(e) => setYearStarted(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1900, max: new Date().getFullYear() } }}
              name="yearStarted"
            />
          ) : (
            <TextField
              type="number"
              label="Total Years"
              value={autoCalculate ? "" : totalYears}
              disabled={autoCalculate}
              onChange={(e) => setTotalYears(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              name="totalYears"
            />
          )}
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
          <IconSelector setIcon={setIcon} value={icon} />
          <Box sx={{ mt: 2 }}>
            <Tooltip
              message={
                <>
                  Enter a valid icon name from{" "}
                  <MuiLink href="https://icon-sets.iconify.design/" target="_blank">
                    iconify
                  </MuiLink>
                  .
                </>
              }
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: 1, mt: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={autoCalculate}
              onChange={handleAutoCalculateChange}
              name="autoCalculate"
            />
          }
          label={
            <Typography variant="body2" sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
              Auto-calculate <strong>years of experience</strong> based on year started.
            </Typography>
          }
        />
      </Box>

      <Accordion
        sx={{ mb: 4 }}
        expanded={isAccordionExpanded}
        onChange={(event, expanded) => setIsAccordionExpanded(expanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {isAccordionExpanded ? (
            <Typography>Write a description of your experience with this skill below.</Typography>
          ) : (
            <Typography sx={{ textDecoration: "underline" }}>
              Click to describe your experience with this skill...
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <RichTextEditor
            name="user"
            editorStateRef={editorStateRef}
            value={skill?.description ?? ""}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DeleteWithConfirmation
          buttonLabel="Delete Skill"
          onConfirmDelete={handleDelete}
          tooltip="Deleting this skill will also remove it from all projects! (No undo!)"
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAccordionExpanded && (
            <Button variant="outlined" color="primary" onClick={() => handleSave()}>
              Save Changes
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave(true);
            }}
          >
            Save &amp; Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
