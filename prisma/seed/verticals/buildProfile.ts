import type { VerticalProfile, VerticalProfileInput } from "./types";

export function slugifyName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function defineProfile(input: VerticalProfileInput): VerticalProfile {
  const slug = input.slug ?? slugifyName(input.name);
  const summary = /<[a-z]/i.test(input.summary) ? input.summary : `<p>${input.summary}</p>`;

  return {
    slug,
    name: input.name,
    title: input.title,
    location: input.location,
    siteTitle: `${input.name} — ${input.title}`,
    siteDescription: input.siteDescription,
    summary,
    summaryTitle: input.summaryTitle ?? "Professional Summary",
    displayEmail: input.displayEmail ?? `${slug.replace(/-/g, ".")}@example.com`,
    isDemo: true,
    socials: [],
    companies: input.companies,
    education: input.education,
    certifications: input.certifications,
    skills: input.skills,
    featuredProjects: input.featuredProjects,
    vertical: input.vertical,
    gender: input.gender,
  };
}
