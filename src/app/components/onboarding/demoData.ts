import { Company, Skill, SkillForUser } from "@/types";

export const DEMO_USER_ID = "onboarding-demo-user";

const yearStarted = (yearsAgo: number) => new Date().getFullYear() - yearsAgo;

export const DEMO_SKILL_CATALOG: Skill[] = [
  { id: "demo-skill-react", name: "React", icon: "logos:react" },
  { id: "demo-skill-ts", name: "TypeScript", icon: "devicon:typescript" },
  { id: "demo-skill-node", name: "Node.js", icon: "logos:nodejs-icon" },
  { id: "demo-skill-graphql", name: "GraphQL", icon: "logos:graphql" },
  { id: "demo-skill-css", name: "CSS", icon: "logos:css-3" },
  { id: "demo-skill-html", name: "HTML", icon: "logos:html-5" },
];

export const DEMO_SKILLS_FOR_USER: SkillForUser[] = [
  {
    id: "demo-sfu-ts",
    userId: DEMO_USER_ID,
    skill: DEMO_SKILL_CATALOG[1],
    icon: DEMO_SKILL_CATALOG[1].icon,
    description:
      "<p>Type-safe APIs and UI for product teams. I use TypeScript on both the client and server so refactors stay honest.</p>",
    yearStarted: yearStarted(6),
    totalYears: null,
  },
  {
    id: "demo-sfu-node",
    userId: DEMO_USER_ID,
    skill: DEMO_SKILL_CATALOG[2],
    icon: DEMO_SKILL_CATALOG[2].icon,
    description: "<p>REST and GraphQL services, background jobs, and CI pipelines.</p>",
    yearStarted: yearStarted(7),
    totalYears: null,
  },
  {
    id: "demo-sfu-css",
    userId: DEMO_USER_ID,
    skill: DEMO_SKILL_CATALOG[4],
    icon: DEMO_SKILL_CATALOG[4].icon,
    description: null,
    yearStarted: yearStarted(8),
    totalYears: null,
  },
  {
    id: "demo-sfu-html",
    userId: DEMO_USER_ID,
    skill: DEMO_SKILL_CATALOG[5],
    icon: DEMO_SKILL_CATALOG[5].icon,
    description: null,
    yearStarted: yearStarted(8),
    totalYears: null,
  },
];

const twoYearsAgo = String(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2);

export const DEMO_COMPANY: Company = {
  id: "demo-company-1",
  name: "Northwind Labs",
  description:
    "Product studio building internal tools and customer-facing apps for mid-size teams.",
  location: "Austin, TX",
  startDate: twoYearsAgo,
  endDate: null,
  positionCount: 1,
  positions: [
    {
      id: "demo-position-1",
      title: "Senior Software Engineer",
      startDate: twoYearsAgo,
      endDate: null,
      projectCount: 1,
      projects: [
        {
          id: "demo-project-1",
          name: "Cut release time in half by splitting a monolith into typed services",
          description:
            "<ul><li>Led a 4-person migration off a single deploy unit.</li><li>Added contract tests so product teams could ship independently.</li><li>Reduced failed deploys by 40% in the first quarter.</li></ul>",
          sortIndex: 0,
          skillsForProject: [],
        },
      ],
    },
  ],
};

export const DEMO_PROJECT_HTML =
  DEMO_COMPANY.positions?.[0]?.projects?.[0]?.description ??
  "<p>Describe the problem, what you did, and the outcome.</p>";
