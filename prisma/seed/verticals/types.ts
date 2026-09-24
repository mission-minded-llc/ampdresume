import type { SeedResumeProfile } from "../literary/types";

export const VERTICAL_IDS = [
  "software-technology",
  "investment-banking",
  "management-consulting",
  "commercial-banking",
  "healthcare",
  "pharmaceuticals",
  "federal-public-sector",
  "aerospace-defense",
  "legal-services",
  "accounting-audit",
  "insurance",
  "cybersecurity",
  "professional-engineering",
  "energy-utilities",
  "telecommunications",
  "manufacturing",
  "supply-chain",
  "human-resources",
  "corporate-marketing",
  "enterprise-sales",
  "higher-education",
  "architecture",
  "commercial-real-estate",
  "nonprofit",
  "airlines-aviation",
] as const;

export type VerticalId = (typeof VERTICAL_IDS)[number];

export type VerticalGender = "man" | "woman";

export type VerticalMeta = {
  id: VerticalId;
  label: string;
  blurb: string;
};

export const VERTICALS: VerticalMeta[] = [
  {
    id: "software-technology",
    label: "Software & Technology",
    blurb: "Staff engineers, managers, product-facing frontend, and SRE.",
  },
  {
    id: "investment-banking",
    label: "Investment Banking & Capital Markets",
    blurb: "M&A, leveraged finance, ECM, and coverage.",
  },
  {
    id: "management-consulting",
    label: "Management Consulting",
    blurb: "Engagement leadership, operations, digital, and strategy.",
  },
  {
    id: "commercial-banking",
    label: "Commercial Banking",
    blurb: "Middle-market, credit, relationship management, and loan structuring.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    blurb: "Nursing leadership, hospital medicine, revenue cycle, and quality.",
  },
  {
    id: "pharmaceuticals",
    label: "Pharmaceuticals & Life Sciences",
    blurb: "Clinical development, regulatory, safety, and CMC.",
  },
  {
    id: "federal-public-sector",
    label: "Federal & Public Sector",
    blurb: "Program analysis, contracting, policy, and budget.",
  },
  {
    id: "aerospace-defense",
    label: "Aerospace & Defense",
    blurb: "Systems, flight test, avionics, and cleared program management.",
  },
  {
    id: "legal-services",
    label: "Legal Services",
    blurb: "Corporate, litigation, in-house, and regulatory counsel.",
  },
  {
    id: "accounting-audit",
    label: "Accounting & Audit",
    blurb: "External audit, SOX, tax, and internal audit.",
  },
  {
    id: "insurance",
    label: "Insurance",
    blurb: "Underwriting, actuarial pricing, claims, and reinsurance.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    blurb: "Detection, incident response, GRC, and cloud security.",
  },
  {
    id: "professional-engineering",
    label: "Professional Engineering",
    blurb: "Structural, transportation, MEP, and water resources.",
  },
  {
    id: "energy-utilities",
    label: "Energy, Utilities & Oil & Gas",
    blurb: "Power markets, reservoir, grid operations, and process safety.",
  },
  {
    id: "telecommunications",
    label: "Telecommunications",
    blurb: "RF planning, NOC, fiber product, and OSS/BSS.",
  },
  {
    id: "manufacturing",
    label: "Manufacturing & Industrial Operations",
    blurb: "Plant leadership, quality, planning, and lean.",
  },
  {
    id: "supply-chain",
    label: "Supply Chain & Logistics",
    blurb: "Demand planning, network design, procurement, and warehousing.",
  },
  {
    id: "human-resources",
    label: "Human Resources",
    blurb: "Talent, employee relations, compensation, and HRBP work.",
  },
  {
    id: "corporate-marketing",
    label: "Corporate Marketing & Brand",
    blurb: "Brand, growth, product marketing, and marketing ops.",
  },
  {
    id: "enterprise-sales",
    label: "Enterprise & B2B Sales",
    blurb: "Enterprise AE, strategic accounts, sales engineering, and mid-market.",
  },
  {
    id: "higher-education",
    label: "Higher Education",
    blurb: "Academic leadership, institutional research, student affairs, and grants.",
  },
  {
    id: "architecture",
    label: "Architecture & Urban Planning",
    blurb: "Project architecture, urban design, healthcare, and sustainability.",
  },
  {
    id: "commercial-real-estate",
    label: "Commercial Real Estate",
    blurb: "Acquisitions, asset management, office brokerage, and debt.",
  },
  {
    id: "nonprofit",
    label: "Nonprofit & International Development",
    blurb: "Programs, development, monitoring & evaluation, and advocacy.",
  },
  {
    id: "airlines-aviation",
    label: "Airlines & Aviation",
    blurb: "Flight operations, SOC, revenue management, and maintenance planning.",
  },
];

export type VerticalProfileInput = {
  vertical: VerticalId;
  gender: VerticalGender;
  name: string;
  slug?: string;
  title: string;
  location: string;
  displayEmail?: string;
  siteDescription: string;
  summary: string;
  summaryTitle?: string;
  socials: SeedResumeProfile["socials"];
  skills: SeedResumeProfile["skills"];
  companies: SeedResumeProfile["companies"];
  education: SeedResumeProfile["education"];
  certifications: SeedResumeProfile["certifications"];
  featuredProjects: SeedResumeProfile["featuredProjects"];
};

export type VerticalProfile = SeedResumeProfile & {
  vertical: VerticalId;
  gender: VerticalGender;
};
