"use client";

import React from "react";
import { SkillItem } from "./SkillItem";
import styles from "./SkillsCloud.module.scss";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const SkillsCloud = ({ skills }: { skills: SkillForUserWithSkill[] }) => (
  <div className={styles.skillsCloudContainer}>
    {skills.map((skill) =>
      skill?.skill?.name ? <SkillItem key={`skill-${skill.skill.name}`} skill={skill} /> : null,
    )}
  </div>
);
