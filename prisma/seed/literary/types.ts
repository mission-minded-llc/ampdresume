export type LiteraryAffiliation = "hero" | "villain" | "antihero";

export type LiterarySocial = {
  platform: string;
  ref: string;
};

export type LiterarySkill = {
  name: string;
  description: string;
  yearStarted?: number;
  totalYears?: number;
};

export type LiteraryProject = {
  name: string;
  description: string;
  skills?: string[];
};

export type LiteraryPosition = {
  title: string;
  startDate: string;
  endDate?: string | null;
  projects: LiteraryProject[];
};

export type LiteraryCompany = {
  name: string;
  description?: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  positions: LiteraryPosition[];
};

export type LiteraryEducation = {
  school: string;
  degree: string;
  dateAwarded?: string;
};

export type LiteraryCertification = {
  name: string;
  issuer: string;
  dateAwarded: string;
  credentialUrl?: string;
  credentialId?: string;
};

export type LiteraryFeaturedProject = {
  name: string;
  description: string;
  links: Array<{ label: string; url: string }>;
  skills?: string[];
};

export type LiteraryCharacter = {
  slug: string;
  name: string;
  title: string;
  location: string;
  siteTitle: string;
  siteDescription: string;
  affiliation: LiteraryAffiliation;
  socials: LiterarySocial[];
  companies: LiteraryCompany[];
  education: LiteraryEducation[];
  certifications: LiteraryCertification[];
  skills: LiterarySkill[];
  featuredProjects: LiteraryFeaturedProject[];
};

export type LiteraryCharacterInput = Omit<LiteraryCharacter, "siteTitle" | "socials"> & {
  siteTitle?: string;
  socials?: LiterarySocial[];
  /** Year of death, or last year of the source text if the character survives. */
  died?: number;
};
