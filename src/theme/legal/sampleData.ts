import { Company, FeaturedProject, Response, SkillForProject, SkillForUser } from "@/types";

const userId = "legal-demo-user";

/**
 * Noon UTC timestamp for a calendar day, stable across US timezones.
 *
 * @param isoDate Calendar day, `YYYY-MM-DD`.
 * @returns Milliseconds since epoch, as the string themes already format.
 */
const at = (isoDate: string): string => String(Date.parse(`${isoDate}T12:00:00.000Z`));

/**
 * A skill on the legal demo resume.
 *
 * @param id Stable id used when a matter cites the skill.
 * @param name Label shown on the resume.
 * @param yearStarted First year the skill counts toward experience.
 * @param description What the skill means in this practice.
 * @returns The skill record themes render.
 */
const skill = (
  id: string,
  name: string,
  yearStarted: number,
  description: string,
): SkillForUser => ({
  id,
  userId,
  icon: null,
  description,
  yearStarted,
  totalYears: null,
  skill: { id: `skill-${id}`, name, icon: null },
});

const skills = {
  corporate: skill(
    "corporate-law",
    "Corporate Law",
    2015,
    "Leads private M&A and general corporate work for middle-market sponsors and founder-backed companies.",
  ),
  governance: skill(
    "corporate-governance",
    "Corporate Governance",
    2016,
    "Keeps boards, consents, and committee charters in a form that will still make sense after the deal.",
  ),
  research: skill(
    "legal-research",
    "Legal Research",
    2015,
    "Reads the statute and the credit documents before a structure is described as standard.",
  ),
  writing: skill(
    "legal-writing",
    "Legal Writing",
    2015,
    "Drafts merger agreements, disclosure schedules, and board materials that survive the next dispute.",
  ),
  negotiation: skill(
    "contract-negotiation",
    "Contract Negotiation",
    2016,
    "Holds indemnity, representations, and closing conditions to the points that actually move risk.",
  ),
  execution: skill(
    "deal-execution",
    "Deal Execution",
    2017,
    "Runs the checklist, the funds flow, and the third-party consents so closing is a date.",
  ),
  regulatory: skill(
    "regulatory-counseling",
    "Regulatory Counseling",
    2018,
    "Flags HSR, CFIUS, and industry notices early enough that they are a workstream.",
  ),
};

/**
 * Cites demo skills on one engagement, in the order given.
 *
 * @param projectId Engagement the citations belong to.
 * @param cited Skills exercised on that engagement.
 * @returns Project skill records.
 */
const cite = (projectId: string, cited: SkillForUser[]): SkillForProject[] =>
  cited.map((skillForUser, index) => ({
    id: `${projectId}-skill-${index}`,
    description: null,
    skillForUser,
  }));

const companies: Company[] = [
  {
    id: "calder-finch",
    name: "Calder Finch LLP",
    description:
      "<p>Fifty-lawyer New York firm with a middle-market M&amp;A practice. Danielle runs deals from term sheet through post-closing cleanup.</p>",
    location: "New York, NY",
    startDate: at("2021-09-13"),
    endDate: null,
    positions: [
      {
        id: "calder-associate",
        title: "Corporate Associate",
        startDate: at("2021-09-13"),
        endDate: null,
        projects: [
          {
            id: "harborline",
            name: "Closed a $410 million specialty-distributor sale on the announced date after a 72-hour disclosure-schedule recut",
            description:
              "<p>Led buy-side documents. The disclosure schedule matched the data room after a recut that caught three unscheduled contracts. Those contracts became a price conversation while there was still a price conversation.</p>",
            sortIndex: 0,
            skillsForProject: cite("harborline", [
              skills.corporate,
              skills.execution,
              skills.negotiation,
            ]),
          },
          {
            id: "minute-book",
            name: "Rebuilt board minutes, consents, and the audit-committee charter so the next financing needed no cleanup memo",
            description:
              "<p>Rebuilt a portfolio company's minute book after an add-on that had been running on email approvals. The next financing used that book without a cleanup memo.</p>",
            sortIndex: 1,
            skillsForProject: cite("minute-book", [skills.governance, skills.writing]),
          },
          {
            id: "hsr",
            name: "Stood up HSR and a short-form CFIUS analysis 19 days after signing without moving the closing",
            description:
              "<p>Neither filing became the reason the closing moved. The CFIUS memo named the contracts that looked like critical infrastructure and the ones that only looked like a press release.</p>",
            sortIndex: 2,
            skillsForProject: cite("hsr", [skills.regulatory, skills.research, skills.execution]),
          },
        ],
      },
    ],
  },
  {
    id: "westbrook",
    name: "Westbrook Corporate",
    description:
      "<p>Boutique governance and sponsor-side shop. Danielle learned how boards actually decide.</p>",
    location: "New York, NY",
    startDate: at("2018-01-08"),
    endDate: at("2021-09-03"),
    positions: [
      {
        id: "westbrook-associate",
        title: "Associate",
        startDate: at("2018-01-08"),
        endDate: at("2021-09-03"),
        projects: [
          {
            id: "consents",
            name: "Standardized stockholder and board consents across 22 portfolio companies",
            description:
              "<p>A sponsor had been issuing equity on reply-all threads. The replacement consent was short enough that deal teams used it, which is the only governance program a sponsor will keep.</p>",
            sortIndex: 0,
            skillsForProject: cite("consents", [
              skills.governance,
              skills.corporate,
              skills.writing,
            ]),
          },
          {
            id: "opinions",
            name: "Held corporate-authority opinions until each one had a consent in the minute book",
            description:
              "<p>One facility everyone remembered authorizing had no consent in the book. The deal slipped a week. The opinion that shipped had a consent behind it.</p>",
            sortIndex: 1,
            skillsForProject: cite("opinions", [skills.research, skills.corporate]),
          },
        ],
      },
    ],
  },
  {
    id: "hudson",
    name: "Hudson Deal Counsel",
    description:
      "<p>Small Manhattan shop that staffed closings. Danielle started on the checklist.</p>",
    location: "New York, NY",
    startDate: at("2015-10-05"),
    endDate: at("2017-12-22"),
    positions: [
      {
        id: "hudson-junior",
        title: "Junior Associate",
        startDate: at("2015-10-05"),
        endDate: at("2017-12-22"),
        projects: [
          {
            id: "ucc",
            name: "Moved UCC searches to three days before closing across 11 deals",
            description:
              "<p>An 11 p.m. lien search became a morning problem with time left to call the bank. One deal would otherwise have closed on a surprise filing.</p>",
            sortIndex: 0,
            skillsForProject: cite("ucc", [skills.execution, skills.corporate]),
          },
        ],
      },
    ],
  },
];

const featuredProjects: FeaturedProject[] = [
  {
    id: "harborline-record",
    name: "Harborline sale closing record",
    description:
      "<p>Redacted walkthrough of the $410 million Harborline sale: the disclosure-schedule recut, the consent trail, and the HSR and CFIUS workstream that stayed off the critical path.</p>",
    links: [],
    skillsForFeaturedProject: cite("harborline-record", [
      skills.corporate,
      skills.execution,
      skills.governance,
    ]).map((cited) => ({
      id: cited.id,
      description: cited.description,
      skillForUser: cited.skillForUser,
    })),
  },
];

/**
 * Example resume for the Legal theme: a New York corporate associate.
 * The same record is used by the web demo and the legal PDF demo.
 */
export const themeLegalSampleData: Response = {
  data: {
    resume: {
      user: {
        id: userId,
        name: "Danielle Okoye",
        displayEmail: "danielle.okoye@calderfinch.example",
        location: "New York, NY",
        title: "Corporate Associate",
        summary:
          "<p>Corporate Associate at Calder Finch LLP, leading middle-market mergers and the governance work that keeps a board from inventing process in the middle of a deal. I draft the merger agreement, run the closing checklist, and write the minutes that will be read in the next dispute.</p><p>I started in general corporate at Hudson Deal Counsel and learned governance at Westbrook Corporate. The work I trust is a disclosure schedule that matches the data room, a stockholder consent that is actually authorized, and a closing that does not discover a lien at 11 p.m.</p>",
        summaryTitle: "Practice",
        isDemo: true,
      },
      socials: [],
      skillsForUser: Object.values(skills),
      companies,
      education: [
        {
          id: "columbia",
          school: "Columbia Law School",
          degree: "J.D.",
          dateAwarded: at("2015-05-20"),
        },
        {
          id: "howard",
          school: "Howard University",
          degree: "B.A., History",
          dateAwarded: at("2012-05-12"),
        },
      ],
      certifications: [
        {
          id: "ny-bar",
          name: "Admitted to the New York Bar",
          issuer: "Appellate Division, First Department",
          dateAwarded: at("2015-09-16"),
          credentialUrl: null,
          credentialId: "NY-BAR-2015-90821",
        },
        {
          id: "dc-bar",
          name: "Admitted to the District of Columbia Bar",
          issuer: "District of Columbia Court of Appeals",
          dateAwarded: at("2019-04-11"),
          credentialUrl: null,
          credentialId: "DC-BAR-2019-44120",
        },
      ],
      featuredProjects,
    },
  },
};
