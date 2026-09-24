import type {
  LiteraryCharacter,
  LiteraryCharacterInput,
  LiteraryCompany,
  LiterarySkill,
} from "./types";

function skillThroughDeath(skill: LiterarySkill, died?: number): LiterarySkill {
  if (skill.totalYears != null || died == null || skill.yearStarted == null) {
    return skill;
  }

  return {
    ...skill,
    totalYears: Math.max(1, died - skill.yearStarted),
  };
}

function deathDate(died: number): string {
  return `${String(died).padStart(4, "0")}-12-31`;
}

function clampEndDate(endDate: string | null | undefined, cap: string): string {
  if (!endDate) return cap;
  return endDate > cap ? cap : endDate;
}

function employmentThroughDeath(companies: LiteraryCompany[], died?: number): LiteraryCompany[] {
  if (died == null) return companies;

  const cap = deathDate(died);

  return companies.map((company) => {
    const companyEnd = clampEndDate(company.endDate, cap);

    return {
      ...company,
      endDate: companyEnd,
      positions: company.positions.map((position) => ({
        ...position,
        endDate: clampEndDate(position.endDate, companyEnd),
      })),
    };
  });
}

export function defineCharacter(input: LiteraryCharacterInput): LiteraryCharacter {
  const siteTitle = input.siteTitle ?? `${input.name} — ${input.title}`;

  return {
    slug: input.slug,
    name: input.name,
    title: input.title,
    location: input.location,
    siteTitle,
    siteDescription: input.siteDescription,
    summary: input.summary ?? `<p>${input.siteDescription}</p>`,
    summaryTitle: input.summaryTitle,
    isDemo: true,
    affiliation: input.affiliation,
    socials: [],
    companies: employmentThroughDeath(input.companies, input.died),
    education: input.education,
    certifications: input.certifications,
    skills: input.skills.map((skill) => skillThroughDeath(skill, input.died)),
    featuredProjects: input.featuredProjects,
  };
}
