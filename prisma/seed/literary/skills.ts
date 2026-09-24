export type LiterarySkillDefinition = {
  name: string;
  icon: string;
};

/**
 * Shared skill catalog for public-domain literary resumes. Names are unique and
 * reused across characters via Skill / SkillForUser. Icons are Iconify identifiers.
 * Only skills referenced by a character resume are listed here.
 */
export const LITERARY_SKILLS: LiterarySkillDefinition[] = [
  { name: "Archery", icon: "mdi:bow-arrow" },
  { name: "Boxing", icon: "mdi:boxing-glove" },
  { name: "Cryptography", icon: "mdi:lock" },
  { name: "Curiosity", icon: "mdi:magnify-plus" },
  { name: "Debate", icon: "mdi:forum" },
  { name: "Deduction", icon: "mdi:brain" },
  { name: "Disguise", icon: "mdi:incognito" },
  { name: "Forensic Chemistry", icon: "mdi:test-tube" },
  { name: "Forestry", icon: "mdi:forest" },
  { name: "Investigation", icon: "mdi:magnify" },
  { name: "Languages", icon: "mdi:translate" },
  { name: "Leadership", icon: "mdi:account-group" },
  { name: "Logic", icon: "mdi:sitemap" },
  { name: "Military Strategy", icon: "mdi:chess-king" },
  { name: "Music", icon: "mdi:violin" },
  { name: "Observation", icon: "mdi:eye" },
  { name: "Outlaw Leadership", icon: "mdi:shield-account" },
  { name: "Quest Leadership", icon: "mdi:shield-sword" },
  { name: "Statecraft", icon: "mdi:crown" },
  { name: "Survival", icon: "mdi:campfire" },
  { name: "Swordsmanship", icon: "mdi:sword" },
];
