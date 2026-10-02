import type { VerticalId, VerticalProfile, VerticalProfileInput } from "./types";

const CLASSIC = { webThemeName: "default", pdfThemeName: "default" } as const;
const LEGAL = { webThemeName: "legal", pdfThemeName: "legal" } as const;
const FORMAL_PRINT = { webThemeName: "default", pdfThemeName: "times" } as const;

/**
 * Formal industries use the Times print layout. Their public page stays Classic
 * because Times is a PDF theme. Legal services is the one category with its own
 * web and PDF theme.
 */
const THEME_BY_VERTICAL: Record<VerticalId, { webThemeName: string; pdfThemeName: string }> = {
  "software-technology": CLASSIC,
  "investment-banking": FORMAL_PRINT,
  "management-consulting": FORMAL_PRINT,
  "commercial-banking": FORMAL_PRINT,
  healthcare: FORMAL_PRINT,
  pharmaceuticals: FORMAL_PRINT,
  "federal-public-sector": FORMAL_PRINT,
  "aerospace-defense": FORMAL_PRINT,
  "legal-services": LEGAL,
  "accounting-audit": FORMAL_PRINT,
  insurance: FORMAL_PRINT,
  cybersecurity: CLASSIC,
  "professional-engineering": FORMAL_PRINT,
  "energy-utilities": FORMAL_PRINT,
  telecommunications: CLASSIC,
  manufacturing: CLASSIC,
  "supply-chain": CLASSIC,
  "human-resources": CLASSIC,
  "corporate-marketing": CLASSIC,
  "enterprise-sales": CLASSIC,
  "higher-education": FORMAL_PRINT,
  architecture: FORMAL_PRINT,
  "commercial-real-estate": FORMAL_PRINT,
  nonprofit: FORMAL_PRINT,
  "airlines-aviation": CLASSIC,
};

/**
 * Picks the layout a seeded demo opens on from its industry category.
 *
 * @param vertical Industry the profile belongs to.
 * @returns Web and PDF theme slugs stored on the demo user.
 */
function themesForVertical(vertical: VerticalId): { webThemeName: string; pdfThemeName: string } {
  return THEME_BY_VERTICAL[vertical];
}

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
    featuredProjects: input.featuredProjects.map((project) => ({
      ...project,
      links: [],
    })),
    vertical: input.vertical,
    gender: input.gender,
    ...themesForVertical(input.vertical),
  };
}
