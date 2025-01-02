import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { deleteSkillForUser, updateSkillForUser } from "@/server/skills";
import { useContext, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EditorState } from "lexical";
import { Icon } from "@iconify/react";
import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillsContext } from "./Skills";
import { Tooltip } from "@/components/Tooltip";
import { useSession } from "next-auth/react";

export const SkillItemEdit = ({
  skill,
  successCallback,
}: {
  skill: SkillForUserWithSkill;
  successCallback?: () => void;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { skillType } = useContext(SkillsContext);

  const editorStateRef = useRef<EditorState | null>(null);

  const [yearStarted, setYearStarted] = useState(skill?.yearStarted ?? new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(skill?.totalYears ?? 0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    handleDelete();
  };

  const updateSkillForUserMutation = useMutation({
    mutationFn: async ({
      id,
      description,
      yearStarted,
      totalYears,
    }: {
      id: string;
      description: string;
      yearStarted: number;
      totalYears: number;
    }) => {
      if (!session?.user?.id) return;

      await updateSkillForUser({
        id,
        userId: session.user.id,
        description,
        yearStarted,
        totalYears,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;
      // Refetch skills after adding a new one
      queryClient.invalidateQueries({ queryKey: ["skills", session.user.id] });
    },
  });

  const deleteSkillForUserMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user?.id) return;

      await deleteSkillForUser({
        id,
        userId: session.user.id,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;
      // Refetch skills after deleting one
      queryClient.invalidateQueries({ queryKey: ["skills", session.user.id] });
    },
  });

  const handleSave = () => {
    if (!editorStateRef.current) return;

    updateSkillForUserMutation.mutate({
      id: skill.id,
      description: JSON.stringify(editorStateRef.current.toJSON()),
      yearStarted,
      totalYears,
    });
    if (successCallback) successCallback();
  };

  const handleDelete = () => {
    deleteSkillForUserMutation.mutate({ id: skill.id });

    if (successCallback) successCallback();
  };

  return (
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          type="number"
          label="Year Started"
          value={yearStarted}
          onChange={(e) => setYearStarted(Number(e.target.value))}
          slotProps={{ htmlInput: { min: 1900, max: new Date().getFullYear() } }}
        />
        <Box sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
          <TextField
            type="number"
            label="Total Years"
            value={totalYears}
            onChange={(e) => setTotalYears(Number(e.target.value))}
            slotProps={{ htmlInput: { min: 0, max: 100 } }}
          />
          <Tooltip
            message="Enter the year you started using this skill 
            or the total years of experience. If you enter the 
            year started, the total years will be calculated 
            for you automatically. If you enter a total years
            value, it will override the calculated value. Leave 0
            for none."
          />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2 }}>
        <RichTextEditor
          name={skillType}
          editorStateRef={editorStateRef}
          value={skill?.description ?? ""}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="secondary" onClick={handleOpenConfirm}>
          <Icon icon="dashicons:trash" />
          Delete
        </Button>
        <Dialog open={confirmOpen} onClose={handleCloseConfirm} maxWidth="xs" fullWidth>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>This cannot be undone!</DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCloseConfirm} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
