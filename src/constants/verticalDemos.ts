export type VerticalDemo = {
  slug: string;
  name: string;
  title: string;
};

export type VerticalDemoGroup = {
  id: string;
  label: string;
  shortLabel: string;
  blurb: string;
  resumes: VerticalDemo[];
};

export const VERTICAL_DEMO_GROUPS: VerticalDemoGroup[] = [
  {
    id: "software-technology",
    label: "Software & Technology",
    shortLabel: "Software",
    blurb: "Staff engineers, managers, product-facing frontend, and SRE.",
    resumes: [
      { slug: "maya-chen", name: "Maya Chen", title: "Staff Software Engineer" },
      { slug: "elias-navarro", name: "Elias Navarro", title: "Engineering Manager" },
      { slug: "aisha-rahman", name: "Aisha Rahman", title: "Senior Frontend Engineer" },
      { slug: "cole-brennan", name: "Cole Brennan", title: "Staff Site Reliability Engineer" },
    ],
  },
  {
    id: "investment-banking",
    label: "Investment Banking & Capital Markets",
    shortLabel: "Investment Banking",
    blurb: "M&A, leveraged finance, ECM, and coverage.",
    resumes: [
      { slug: "helena-voss", name: "Helena Voss", title: "Vice President, Mergers & Acquisitions" },
      { slug: "julian-park", name: "Julian Park", title: "Associate, Leveraged Finance" },
      {
        slug: "naomi-adeyemi",
        name: "Naomi Adeyemi",
        title: "Vice President, Equity Capital Markets",
      },
      { slug: "marcus-bellamy", name: "Marcus Bellamy", title: "Investment Banking Analyst" },
    ],
  },
  {
    id: "management-consulting",
    label: "Management Consulting",
    shortLabel: "Consulting",
    blurb: "Engagement leadership, operations, digital, and strategy.",
    resumes: [
      { slug: "lina-okonkwo", name: "Lina Okonkwo", title: "Engagement Manager" },
      { slug: "theo-marchetti", name: "Theo Marchetti", title: "Principal" },
      { slug: "sabine-keller", name: "Sabine Keller", title: "Associate" },
      { slug: "rohan-mehta", name: "Rohan Mehta", title: "Manager" },
    ],
  },
  {
    id: "commercial-banking",
    label: "Commercial Banking",
    shortLabel: "Commercial Banking",
    blurb: "Middle-market, credit, relationship management, and loan structuring.",
    resumes: [
      { slug: "camille-duval", name: "Camille Duval", title: "Director, Middle Market Banking" },
      {
        slug: "andre-whitfield",
        name: "Andre Whitfield",
        title: "Vice President, Commercial Credit",
      },
      { slug: "priya-shah", name: "Priya Shah", title: "Relationship Manager" },
      { slug: "benito-alvarez", name: "Benito Alvarez", title: "Credit Officer" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    shortLabel: "Healthcare",
    blurb: "Nursing leadership, hospital medicine, revenue cycle, and quality.",
    resumes: [
      { slug: "elena-vasquez", name: "Elena Vasquez", title: "Chief Nursing Officer" },
      { slug: "david-okello", name: "David Okello", title: "Medical Director, Hospital Medicine" },
      { slug: "keisha-monroe", name: "Keisha Monroe", title: "Director of Revenue Cycle" },
      { slug: "nathan-brooks", name: "Nathan Brooks", title: "Clinical Quality Manager" },
    ],
  },
  {
    id: "pharmaceuticals",
    label: "Pharmaceuticals & Life Sciences",
    shortLabel: "Pharma",
    blurb: "Clinical development, regulatory, safety, and CMC.",
    resumes: [
      { slug: "yuna-takahashi", name: "Yuna Takahashi", title: "Clinical Development Lead" },
      { slug: "omar-haddad", name: "Omar Haddad", title: "Director of Regulatory Affairs" },
      { slug: "francesca-rossi", name: "Francesca Rossi", title: "Pharmacovigilance Manager" },
      { slug: "grant-holloway", name: "Grant Holloway", title: "CMC Project Lead" },
    ],
  },
  {
    id: "federal-public-sector",
    label: "Federal & Public Sector",
    shortLabel: "Public Sector",
    blurb: "Program analysis, contracting, policy, and budget.",
    resumes: [
      { slug: "amara-dixon", name: "Amara Dixon", title: "Program Analyst" },
      { slug: "wesley-cho", name: "Wesley Cho", title: "Contracting Officer" },
      { slug: "noelle-hartman", name: "Noelle Hartman", title: "Policy Advisor" },
      { slug: "isaac-flores", name: "Isaac Flores", title: "Budget Analyst" },
    ],
  },
  {
    id: "aerospace-defense",
    label: "Aerospace & Defense",
    shortLabel: "Aerospace",
    blurb: "Systems, flight test, avionics, and cleared program management.",
    resumes: [
      { slug: "rhea-kapoor", name: "Rhea Kapoor", title: "Systems Engineer" },
      { slug: "tyler-grayson", name: "Tyler Grayson", title: "Flight Test Engineer" },
      { slug: "ingrid-solberg", name: "Ingrid Solberg", title: "Avionics Lead" },
      { slug: "malcolm-reeves", name: "Malcolm Reeves", title: "Program Manager" },
    ],
  },
  {
    id: "legal-services",
    label: "Legal Services",
    shortLabel: "Legal",
    blurb: "Corporate, litigation, in-house, and regulatory counsel.",
    resumes: [
      { slug: "danielle-okoye", name: "Danielle Okoye", title: "Corporate Associate" },
      { slug: "seth-greenberg", name: "Seth Greenberg", title: "Litigation Counsel" },
      { slug: "marisol-vega", name: "Marisol Vega", title: "Senior Counsel" },
      { slug: "hugh-pemberton", name: "Hugh Pemberton", title: "Regulatory Attorney" },
    ],
  },
  {
    id: "accounting-audit",
    label: "Accounting & Audit",
    shortLabel: "Accounting",
    blurb: "External audit, SOX, tax, and internal audit.",
    resumes: [
      { slug: "claire-fontaine", name: "Claire Fontaine", title: "Audit Senior Manager" },
      { slug: "victor-nguyen", name: "Victor Nguyen", title: "SOX Compliance Manager" },
      { slug: "jasmine-patel", name: "Jasmine Patel", title: "Tax Manager" },
      { slug: "owen-mcallister", name: "Owen McAllister", title: "Director of Internal Audit" },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    shortLabel: "Insurance",
    blurb: "Underwriting, actuarial pricing, claims, and reinsurance.",
    resumes: [
      { slug: "bridget-callahan", name: "Bridget Callahan", title: "Senior Underwriter" },
      { slug: "kenji-mori", name: "Kenji Mori", title: "Pricing Actuary" },
      { slug: "tessa-morin", name: "Tessa Morin", title: "Claims Director" },
      { slug: "rafael-soto", name: "Rafael Soto", title: "Reinsurance Broker" },
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    shortLabel: "Cybersecurity",
    blurb: "Detection, incident response, GRC, and cloud security.",
    resumes: [
      { slug: "nadia-el-sayed", name: "Nadia El-Sayed", title: "Detection Engineer" },
      { slug: "chris-langford", name: "Chris Langford", title: "Incident Response Lead" },
      { slug: "harper-quinn", name: "Harper Quinn", title: "GRC Manager" },
      { slug: "dinesh-iyer", name: "Dinesh Iyer", title: "Cloud Security Architect" },
    ],
  },
  {
    id: "professional-engineering",
    label: "Professional Engineering",
    shortLabel: "Engineering",
    blurb: "Structural, transportation, MEP, and water resources.",
    resumes: [
      { slug: "sofia-alvarez", name: "Sofia Alvarez", title: "Structural Engineer, PE" },
      { slug: "patrick-oreilly", name: "Patrick O'Reilly", title: "Civil Engineer, PE" },
      { slug: "mei-lin", name: "Mei Lin", title: "Mechanical Engineer, PE" },
      { slug: "jordan-hale", name: "Jordan Hale", title: "Water Resources Engineer" },
    ],
  },
  {
    id: "energy-utilities",
    label: "Energy, Utilities & Oil & Gas",
    shortLabel: "Energy",
    blurb: "Power markets, reservoir, grid operations, and process safety.",
    resumes: [
      { slug: "anika-bose", name: "Anika Bose", title: "Power Markets Analyst" },
      { slug: "levi-stanton", name: "Levi Stanton", title: "Reservoir Engineer" },
      { slug: "hannah-greer", name: "Hannah Greer", title: "Grid Operations Manager" },
      { slug: "yusuf-rahman", name: "Yusuf Rahman", title: "Process Safety Engineer" },
    ],
  },
  {
    id: "telecommunications",
    label: "Telecommunications",
    shortLabel: "Telecom",
    blurb: "RF planning, NOC, fiber product, and OSS/BSS.",
    resumes: [
      { slug: "bianca-moretti", name: "Bianca Moretti", title: "RF Planning Engineer" },
      { slug: "kwame-boateng", name: "Kwame Boateng", title: "Network Operations Manager" },
      { slug: "erin-walsh", name: "Erin Walsh", title: "Product Manager, Fiber" },
      { slug: "soren-lindqvist", name: "Soren Lindqvist", title: "OSS/BSS Architect" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing & Industrial Operations",
    shortLabel: "Manufacturing",
    blurb: "Plant leadership, quality, planning, and lean.",
    resumes: [
      { slug: "leila-haddad", name: "Leila Haddad", title: "Plant Manager" },
      { slug: "hank-mueller", name: "Hank Mueller", title: "Quality Manager" },
      { slug: "rosa-delgado", name: "Rosa Delgado", title: "Production Planner" },
      { slug: "arjun-singh", name: "Arjun Singh", title: "Continuous Improvement Lead" },
    ],
  },
  {
    id: "supply-chain",
    label: "Supply Chain & Logistics",
    shortLabel: "Supply Chain",
    blurb: "Demand planning, network design, procurement, and warehousing.",
    resumes: [
      { slug: "nora-kim", name: "Nora Kim", title: "Demand Planning Manager" },
      { slug: "mateo-cruz", name: "Mateo Cruz", title: "Network Design Lead" },
      { slug: "faith-okoro", name: "Faith Okoro", title: "Director of Procurement" },
      { slug: "elliot-ward", name: "Elliot Ward", title: "Warehouse Operations Manager" },
    ],
  },
  {
    id: "human-resources",
    label: "Human Resources",
    shortLabel: "HR",
    blurb: "Talent, employee relations, compensation, and HRBP work.",
    resumes: [
      { slug: "simone-blanchard", name: "Simone Blanchard", title: "Head of Talent" },
      { slug: "craig-donovan", name: "Craig Donovan", title: "Director of Employee Relations" },
      { slug: "amina-traore", name: "Amina Traore", title: "Compensation Manager" },
      { slug: "luis-ortega", name: "Luis Ortega", title: "HR Business Partner" },
    ],
  },
  {
    id: "corporate-marketing",
    label: "Corporate Marketing & Brand",
    shortLabel: "Marketing",
    blurb: "Brand, growth, product marketing, and marketing ops.",
    resumes: [
      { slug: "zoe-hart", name: "Zoe Hart", title: "Brand Director" },
      { slug: "ian-fletcher", name: "Ian Fletcher", title: "Growth Marketing Lead" },
      { slug: "priyanka-desai", name: "Priyanka Desai", title: "Product Marketing Manager" },
      { slug: "deshawn-carter", name: "DeShawn Carter", title: "Marketing Operations Manager" },
    ],
  },
  {
    id: "enterprise-sales",
    label: "Enterprise & B2B Sales",
    shortLabel: "Sales",
    blurb: "Enterprise AE, strategic accounts, sales engineering, and mid-market.",
    resumes: [
      { slug: "rachel-kim", name: "Rachel Kim", title: "Enterprise Account Executive" },
      { slug: "thomas-adler", name: "Thomas Adler", title: "Strategic Account Director" },
      { slug: "valentina-russo", name: "Valentina Russo", title: "Sales Engineer" },
      { slug: "malik-johnson", name: "Malik Johnson", title: "Vice President, Mid-Market Sales" },
    ],
  },
  {
    id: "higher-education",
    label: "Higher Education",
    shortLabel: "Higher Ed",
    blurb: "Academic leadership, institutional research, student affairs, and grants.",
    resumes: [
      { slug: "helen-cho", name: "Helen Cho", title: "Associate Dean of Academic Affairs" },
      { slug: "samuel-wright", name: "Samuel Wright", title: "Director of Institutional Research" },
      { slug: "imani-brooks", name: "Imani Brooks", title: "Director of Student Affairs" },
      { slug: "paolo-ricci", name: "Paolo Ricci", title: "Grant Administrator" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Urban Planning",
    shortLabel: "Architecture",
    blurb: "Project architecture, urban design, healthcare, and sustainability.",
    resumes: [
      { slug: "camille-renard", name: "Camille Renard", title: "Project Architect" },
      { slug: "diego-morales", name: "Diego Morales", title: "Urban Designer" },
      { slug: "naomi-stein", name: "Naomi Stein", title: "Healthcare Architect" },
      { slug: "felix-huang", name: "Felix Huang", title: "Sustainability Lead" },
    ],
  },
  {
    id: "commercial-real-estate",
    label: "Commercial Real Estate",
    shortLabel: "Real Estate",
    blurb: "Acquisitions, asset management, office brokerage, and debt.",
    resumes: [
      { slug: "alexandra-dunn", name: "Alexandra Dunn", title: "Acquisitions Associate" },
      { slug: "ryan-okafor", name: "Ryan Okafor", title: "Asset Manager" },
      { slug: "leila-mansour", name: "Leila Mansour", title: "Office Broker" },
      { slug: "peter-lang", name: "Peter Lang", title: "Debt Originator" },
    ],
  },
  {
    id: "nonprofit",
    label: "Nonprofit & International Development",
    shortLabel: "Nonprofit",
    blurb: "Programs, development, monitoring & evaluation, and advocacy.",
    resumes: [
      { slug: "fatima-al-hassan", name: "Fatima Al-Hassan", title: "Program Director" },
      { slug: "gabriel-santos", name: "Gabriel Santos", title: "Development Director" },
      { slug: "june-ellison", name: "June Ellison", title: "Monitoring & Evaluation Specialist" },
      { slug: "colin-byrne", name: "Colin Byrne", title: "Policy Advocate" },
    ],
  },
  {
    id: "airlines-aviation",
    label: "Airlines & Aviation",
    shortLabel: "Aviation",
    blurb: "Flight operations, SOC, revenue management, and maintenance planning.",
    resumes: [
      { slug: "sienna-walsh", name: "Sienna Walsh", title: "Captain and Check Airman" },
      {
        slug: "hiroshi-tanaka",
        name: "Hiroshi Tanaka",
        title: "Director of System Operations Control",
      },
      { slug: "megan-price", name: "Megan Price", title: "Revenue Management Analyst" },
      { slug: "omar-khalil", name: "Omar Khalil", title: "Maintenance Planning Manager" },
    ],
  },
];
