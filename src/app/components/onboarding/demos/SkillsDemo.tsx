"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SkillItemEdit } from "@/app/edit/skills/SkillItemEdit";
import { EditSkillsSearch } from "@/app/edit/skills/EditSkillsSearch";
import { SkillsExperience } from "@/app/edit/skills/SkillsExperience";
import { Skill, SkillForUser } from "@/types";
import { DEMO_SKILL_CATALOG, DEMO_SKILLS_FOR_USER, DEMO_USER_ID } from "../demoData";
import { DemoModeContext } from "../DemoModeContext";

const SEARCH_TARGET = "React";

const catalogSkillToUserSkill = (skill: Skill, yearStarted: number): SkillForUser => ({
  id: `demo-added-${skill.id}`,
  userId: DEMO_USER_ID,
  skill,
  icon: skill.icon,
  description: null,
  yearStarted,
  totalYears: null,
});

/**
 * Live skills editor with sample data. Types a search, then shows the
 * real skill detail form so new users see how descriptions work.
 */
export const SkillsDemo = ({ autoPlay = true }: { autoPlay?: boolean }) => {
  const [skills, setSkills] = useState<SkillForUser[]>(DEMO_SKILLS_FOR_USER);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetail, setShowDetail] = useState(!autoPlay);
  const typed = useRef(false);

  useEffect(() => {
    if (!autoPlay || typed.current) return;
    typed.current = true;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setSearchTerm(SEARCH_TARGET.slice(0, index));
      if (index >= SEARCH_TARGET.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setShowDetail(true), 700);
      }
    }, 90);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const featuredSkill = skills.find((skill) => skill.skill.name === "TypeScript") ?? skills[0];

  return (
    <DemoModeContext.Provider value={true}>
      <Box data-testid="OnboardingSkillsDemo">
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          This is the real skills editor with sample data. Nothing here is saved to your account.
        </Typography>
        <EditSkillsSearch
          demoSkills={DEMO_SKILL_CATALOG}
          demoSearchTerm={searchTerm}
          onDemoAdd={(skill, yearStarted) => {
            setSkills((current) => {
              if (current.some((item) => item.skill.id === skill.id)) return current;
              return [...current, catalogSkillToUserSkill(skill, yearStarted)];
            });
            setSearchTerm("");
          }}
        />
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Your Skills
        </Typography>
        <SkillsExperience skills={skills} />
        {showDetail ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
              Click a skill later to add a short story — like this TypeScript example:
            </Typography>
            <SkillItemEdit
              skill={featuredSkill}
              handleClose={() => setShowDetail(false)}
              setIconCallback={() => {}}
              defaultDescriptionOpen
            />
          </Box>
        ) : null}
      </Box>
    </DemoModeContext.Provider>
  );
};
