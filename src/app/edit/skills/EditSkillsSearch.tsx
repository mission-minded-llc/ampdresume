"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Tooltip } from "@/components/Tooltip";
import { TooltipTotalYears } from "@/components/tooltips";
import { addSkillForUser } from "@/graphql/addSkillForUser";
import { getSkills } from "@/graphql/getSkills";
import { removeLeadingZero } from "@/lib/format";
import { useSession } from "next-auth/react";

export const EditSkillsSearch = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [yearStarted, setYearStarted] = useState(new Date().getFullYear());
  const [totalYears, setTotalYears] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // When the search term is at least this length, the search will trigger
  // and show the list of skills. Pressing "Esc" will clear the search term.
  const minCharsForSearch = 2;

  useEffect(() => {
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

  const mutation = useMutation({
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

      await addSkillForUser({ userId: session.user.id, skillId, yearStarted, totalYears });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillsForUser"] });
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
    setIsOpen(true);
  };

  const handleAddSkill = () => {
    if (selectedSkillId) {
      mutation.mutate({
        skillId: selectedSkillId,
        yearStarted: yearStarted,
        totalYears: totalYears,
      });

      // Close dialog and reset states
      setIsOpen(false);
      setSelectedSkillId(null);
      setYearStarted(new Date().getFullYear());
      setTotalYears(0);
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

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          Enter Proficiency Level
          <Tooltip message={<TooltipTotalYears />} />
        </CustomDialogTitle>

        <DialogContent>
          <Typography>Enter year started, and/or total years experience below.</Typography>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              autoFocus
              margin="dense"
              type="number"
              fullWidth
              variant="outlined"
              value={yearStarted}
              label="Year Started"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = removeLeadingZero(target.value);
              }}
              onChange={(e) => setYearStarted(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1900, max: new Date().getFullYear() } }}
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              variant="outlined"
              value={totalYears}
              label="Total Years"
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSkill}>Add Skill</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
