"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { IconSelector } from "@/components/IconSelector";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Tooltip } from "@/components/Tooltip";
import { TooltipTotalYears } from "@/components/tooltips";
import { addSkill } from "@/graphql/addSkill";
import { addSkillForUser } from "@/graphql/addSkillForUser";
import { getSkills } from "@/graphql/getSkills";
import { removeLeadingZero } from "@/lib/format";

export const EditSkillsSearch = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [isAddExistingSkillDialogOpen, setIsAddExistingSkillDialogOpen] = useState(false);
  const [isAddNewSkillDialogOpen, setIsAddNewSkillDialogOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [yearStarted, setYearStarted] = useState(new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [icon, setIcon] = useState<string | null>(null);

  // Add state for auto-calculate
  const hasTotalYears = totalYears && totalYears > 0;
  const defaultAutoCalculate = !hasTotalYears;
  const [autoCalculate, setAutoCalculate] = useState(defaultAutoCalculate);

  // When the search term is at least this length, the search will trigger
  // and show the list of skills. Pressing "Esc" will clear the search term.
  const minCharsForSearch = 2;

  useEffect(() => {
    setNewSkillName(searchTerm);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchTerm("");
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
    queryFn: async () => await getSkills(),
  });

  const addExistingSkillMutation = useMutation({
    mutationFn: async ({
      skillId,
      yearStarted,
      totalYears,
    }: {
      skillId: string;
      yearStarted: number;
      totalYears: number;
    }) => {
      if (!session?.user?.id) return;

      await addSkillForUser({
        userId: session.user.id,
        skillId,
        yearStarted,
        totalYears,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillsForUser"] });
    },
  });

  const addNewSkillMutation = useMutation({
    mutationFn: async ({ name, icon }: { name: string; icon: string }) => {
      if (!session?.user?.id) return;
      // addSkill now returns the new skill object with its ID
      return await addSkill({ userId: session.user.id, name, icon });
    },
    onSuccess: (data) => {
      // data is the new skill object
      if (data?.id) {
        setSelectedSkillId(data.id);
        setIsAddExistingSkillDialogOpen(true);
        setIsAddNewSkillDialogOpen(false);
        setNewSkillName("");
        setIcon(null);
      }
    },
  });

  // Filter skills based on search term
  const filteredSkills = useMemo(() => {
    if (!data?.skills || searchTerm.length < minCharsForSearch) return [];

    // Sort skills by closest match and limit to top 10
    return data.skills
      .filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (a.name.toLowerCase() === searchTerm.toLowerCase()) return -1;
        if (b.name.toLowerCase() === searchTerm.toLowerCase()) return 1;

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
    setIsAddExistingSkillDialogOpen(true);
  };

  const handleAddExistingSkill = () => {
    if (selectedSkillId) {
      addExistingSkillMutation.mutate({
        skillId: selectedSkillId,
        yearStarted: yearStarted,
        totalYears: totalYears,
      });

      // Close dialog and reset states
      setIsAddExistingSkillDialogOpen(false);
      setSelectedSkillId(null);
      setYearStarted(new Date().getFullYear());
      setTotalYears(0);
      setSearchTerm("");
    }
  };

  const handleAddNewSkill = () => {
    // Only call mutate if icon is a string (not null)
    if (newSkillName && icon) {
      addNewSkillMutation.mutate({ name: newSkillName, icon });
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
        name="searchSkills"
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
            <Divider />
            <ListItem
              sx={{ cursor: "pointer", backgroundColor: "action.hover" }}
              onClick={() => setIsAddNewSkillDialogOpen(true)}
            >
              <ListItemIcon>
                <Icon icon="mdi:plus" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary={`Add a new skill: ${searchTerm}`} />
            </ListItem>
          </List>
        </Paper>
      )}

      <Dialog
        open={isAddExistingSkillDialogOpen}
        onClose={() => setIsAddExistingSkillDialogOpen(false)}
        maxWidth="md"
      >
        <CustomDialogTitle closeHandler={() => setIsAddExistingSkillDialogOpen(false)}>
          Enter Proficiency Level
          <Tooltip message={<TooltipTotalYears />} />
        </CustomDialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              {autoCalculate ? (
                <TextField
                  autoFocus
                  margin="dense"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={yearStarted}
                  label="Year Started"
                  name="yearStarted"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = removeLeadingZero(target.value);
                  }}
                  onChange={(e) => setYearStarted(Number(e.target.value))}
                  slotProps={{
                    htmlInput: { min: 1900, max: new Date().getFullYear() },
                  }}
                />
              ) : (
                <TextField
                  margin="dense"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={totalYears}
                  label="Total Years"
                  name="totalYears"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = Math.max(
                      0,
                      Math.min(parseInt(removeLeadingZero(target.value)), 100),
                    ).toString();
                  }}
                  onChange={(e) => setTotalYears(Number(e.target.value))}
                  slotProps={{ htmlInput: { min: 0, max: 100 } }}
                />
              )}
            </Box>
            <Box sx={{ ml: 1, mt: 2, mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={autoCalculate}
                    onChange={(event) => {
                      const checked = event.target.checked;
                      setAutoCalculate(checked);
                      if (checked) {
                        setTotalYears(0);
                      }
                    }}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddExistingSkillDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddExistingSkill}>Add Skill</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isAddNewSkillDialogOpen}
        onClose={() => setIsAddNewSkillDialogOpen(false)}
        maxWidth="lg"
      >
        <CustomDialogTitle closeHandler={() => setIsAddNewSkillDialogOpen(false)}>
          Add a New Skill
        </CustomDialogTitle>
        <DialogContent sx={{ minHeight: "300px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Skill Name"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <IconSelector setIcon={setIcon} icon={icon} limit={20} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddNewSkillDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddNewSkill} disabled={!newSkillName || !icon}>
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
