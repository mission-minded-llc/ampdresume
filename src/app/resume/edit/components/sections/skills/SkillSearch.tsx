import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { addSkillForUser, getSkills } from "@/server/skills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Icon } from "@iconify/react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useSession } from "next-auth/react";

export const SkillSearch = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [yearValue, setYearValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // When the search term is at least this length, the search will trigger
  // and show the list of skills. Pressing "Esc" will clear the search term.
  const minCharsForSearch = 3;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchTerm.length >= minCharsForSearch) {
        setSearchTerm("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchTerm]);

  // Load all available skills for search/selector
  const { isPending, error, data } = useQuery({
    enabled: status === "authenticated" && !!session?.user?.id,
    queryKey: ["skills"],
    queryFn: async () => {
      const data = await getSkills();

      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ skillId, yearValue }: { skillId: string; yearValue: number }) => {
      if (!session?.user?.id) return;
      await addSkillForUser({ userId: session.user.id, skillId, yearValue });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;
      // Refetch skills after adding a new one
      queryClient.invalidateQueries({ queryKey: ["skills", session.user.id] });
    },
  });

  // Filter skills based on search term
  const filteredSkills = useMemo(() => {
    if (!data?.skills || searchTerm.length < minCharsForSearch) return [];

    // Sort skills by closest match and limit to top 10
    return data.skills
      .filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        // Basic sorting by how close the match is to the start of the name
        const aIndex = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
        const bIndex = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
        return aIndex - bIndex;
      })
      .slice(0, 10); // Limit to top 10 matches
  }, [data?.skills, searchTerm]);

  if (isPending) return <LoadingOverlay message="Loading skills..." />;
  if (error) return <Box>Error loading skills: {error.message}</Box>;

  const handleSkillSelection = (skillId: string) => {
    // Open dialog to get proficiency level
    setSelectedSkillId(skillId);
    setOpenDialog(true);
  };

  const handleAddSkill = () => {
    if (selectedSkillId && yearValue) {
      mutation.mutate({
        skillId: selectedSkillId,
        yearValue: Number(yearValue),
      });

      // Close dialog and reset states
      setOpenDialog(false);
      setSelectedSkillId(null);
      setYearValue("");
      setSearchTerm("");
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Skills to Add"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        placeholder="Type at least 3 characters to search"
      />
      {searchTerm.length >= minCharsForSearch && (
        <Paper elevation={3}>
          <List>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <ListItem
                  key={skill.id}
                  sx={(theme) => ({
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  })}
                  onClick={() => handleSkillSelection(skill.id)}
                >
                  <ListItemIcon>
                    {skill?.icon ? <Icon icon={skill.icon} width={24} height={24} /> : null}
                  </ListItemIcon>
                  <ListItemText primary={skill.name} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No matching skills found" />
              </ListItem>
            )}
          </List>
        </Paper>
      )}

      {/* Proficiency Level Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Enter Proficiency Level
          <Tooltip
            title="Enter the year you started using this skill or the total years of experience. If you enter the year started, the total years will be calculated for you automatically."
            placement="right"
          >
            <IconButton size="small" sx={{ ml: 1 }}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <DialogContent>
          <Typography>Enter year started, or total years experience below.</Typography>
          <TextField
            autoFocus
            margin="dense"
            type="number"
            fullWidth
            variant="outlined"
            value={yearValue}
            onChange={(e) => setYearValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSkill}>Add Skill</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
