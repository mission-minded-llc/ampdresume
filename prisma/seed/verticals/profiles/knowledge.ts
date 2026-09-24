import { defineProfile } from "../buildProfile";

export const knowledgeProfiles = [
  defineProfile({
    gender: "woman",
    vertical: "software-technology",
    name: "Maya Chen",
    title: "Staff Software Engineer",
    location: "Seattle, WA",
    siteDescription:
      "Staff engineer who designs multi-region control planes. Consensus, placement, and the APIs that keep clusters honest when a zone disappears.",
    summary:
      "<p>Builds distributed control planes for fleets that cannot pause for a region outage. Placement, lease management, and API deprecation are the day job; the night job is teaching other teams how not to invent a second source of truth.</p><p>At Northline, led the scheduler that cut cross-region failover from 90 seconds to 11 across 14 clusters. Before that, shipped Harborline's mesh and shard rebalancer, and learned packet-level telemetry at Rainier Packet Co.</p>",
    socials: [
      { platform: "linkedin.com", ref: "maya-chen" },
      { platform: "github.com", ref: "mayachen" },
      { platform: "website", ref: "https://mayachen.example.com" },
    ],
    skills: [
      {
        name: "Distributed Systems",
        description:
          "Lease managers, quorum writes, and membership that survives a zone loss without split-brain. Designed the control-plane contract used by 14 production clusters.",
        yearStarted: 2014,
      },
      {
        name: "Kubernetes",
        description:
          "Custom controllers and CRDs for placement and drain. Operators, not YAML archaeology, are how the fleet stays consistent.",
        yearStarted: 2017,
      },
      {
        name: "Go",
        description:
          "Primary language for schedulers, reconcilers, and gRPC control APIs. Prefer small binaries and explicit concurrency over framework magic.",
        yearStarted: 2016,
      },
      {
        name: "TypeScript",
        description:
          "Typed the internal control-plane console and the client SDKs that product teams actually ship against.",
        yearStarted: 2018,
      },
      {
        name: "AWS",
        description:
          "Multi-account EKS, IAM for controllers, and the networking path that makes a control plane reachable without becoming a public API.",
        yearStarted: 2016,
      },
      {
        name: "System Design",
        description:
          "Writes the design docs that decide whether a new surface is a controller, a queue, or a mistake. Reviews the ones that should have been a queue.",
        yearStarted: 2018,
      },
      {
        name: "Observability",
        description:
          "SLOs on reconcile latency and leader-election flaps. If the control plane is quiet, something is already wrong.",
        yearStarted: 2017,
      },
      {
        name: "Technical Leadership",
        description:
          "Staff-level partner to two platform teams. Sets the API bar, the rollout bar, and the 'we are not adding a second etcd' bar.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Northline Control Systems",
        description:
          "Seattle infrastructure studio that sells a managed control plane to mid-market SaaS. The product is the scheduler; the support burden is everyone else's YAML.",
        location: "Seattle, WA",
        startDate: "2021-04-12",
        positions: [
          {
            title: "Staff Software Engineer",
            startDate: "2021-04-12",
            projects: [
              {
                name: "Multi-region placement engine",
                description:
                  "Designed the scheduler that places stateful workloads across 14 clusters and fails a zone in 11 seconds, down from 90. Cut dual-write incidents by 73% in the first two quarters.",
                skills: ["Distributed Systems", "Kubernetes", "Go", "System Design"],
              },
              {
                name: "Lease and membership service",
                description:
                  "Replaced ad-hoc heartbeats with a quorum lease API. Leader flaps dropped 81% and on-call pages for split-brain went from weekly to two in a year.",
                skills: ["Distributed Systems", "Go", "Observability"],
              },
              {
                name: "Control-plane API deprecation",
                description:
                  "Versioned the public CRDs and shipped TypeScript/Go clients so product teams stopped scraping etcd. Adoption reached 19 internal teams in six months.",
                skills: ["TypeScript", "Go", "Technical Leadership", "AWS"],
              },
            ],
          },
        ],
      },
      {
        name: "Harborline Software",
        description:
          "B2B SaaS platform that grew from a single-region monolith into a mesh it did not plan for. Maya owned the parts that broke first.",
        location: "Seattle, WA",
        startDate: "2016-08-01",
        endDate: "2021-03-31",
        positions: [
          {
            title: "Senior Software Engineer",
            startDate: "2019-01-07",
            endDate: "2021-03-31",
            projects: [
              {
                name: "Service mesh rollout",
                description:
                  "Moved 46 services onto a sidecar mesh with staged mTLS. p99 inter-service latency fell 28% after the retry and timeout defaults were made explicit.",
                skills: ["Kubernetes", "Observability", "AWS"],
              },
              {
                name: "Shard rebalancer",
                description:
                  "Wrote the Go rebalancer that drained hot shards without pausing writes. Peak hotspot CPU dropped from 94% to 61% during Black Friday traffic.",
                skills: ["Distributed Systems", "Go", "System Design"],
              },
            ],
          },
          {
            title: "Software Engineer",
            startDate: "2016-08-01",
            endDate: "2019-01-06",
            projects: [
              {
                name: "Usage billing pipeline",
                description:
                  "Built the event pipeline that turned cluster-hours into invoices. Late events fell from 4.2% to 0.3% after exactly-once keys landed.",
                skills: ["TypeScript", "AWS", "System Design"],
              },
              {
                name: "Cluster autoscaler hooks",
                description:
                  "Added drain-aware hooks so scale-in stopped killing in-flight control loops. Node replacement incidents dropped 62% in two quarters.",
                skills: ["Kubernetes", "AWS", "Observability"],
              },
            ],
          },
        ],
      },
      {
        name: "Rainier Packet Co.",
        description:
          "Redmond networking shop that sold packet classifiers to regional ISPs. Small enough that every engineer touched the datapath.",
        location: "Redmond, WA",
        startDate: "2014-07-07",
        endDate: "2016-07-29",
        positions: [
          {
            title: "Software Engineer",
            startDate: "2014-07-07",
            endDate: "2016-07-29",
            projects: [
              {
                name: "Packet classifier rewrite",
                description:
                  "Ported the rule compiler from a Perl pipeline to Go. Classification latency at 10 Gbps fell 41% and rule-reload time went from 18 seconds to 2.",
                skills: ["Go", "System Design"],
              },
              {
                name: "Edge telemetry exporter",
                description:
                  "Shipped the first structured exporter the NOC would trust. MTTD for blackhole routes improved from 22 minutes to 6.",
                skills: ["Observability", "AWS", "TypeScript"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Washington",
        degree: "B.S. Computer Science",
        dateAwarded: "2014-06-15",
      },
    ],
    certifications: [
      {
        name: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        dateAwarded: "2020-04-12",
        credentialId: "CKA-MAYA-8841",
      },
      {
        name: "AWS Certified Solutions Architect – Professional",
        issuer: "Amazon Web Services",
        dateAwarded: "2022-09-08",
        credentialId: "SAP-MAYA-2209",
      },
    ],
    featuredProjects: [
      {
        name: "Northline placement engine",
        description:
          "<p>Open design notes and a reference scheduler that places stateful workloads across regions and drains a failed zone in 11 seconds. Built for operators who are tired of a second etcd becoming the architecture.</p>",
        links: [
          { label: "Design notes", url: "https://www.example.com/maya-chen/placement" },
          { label: "Reference repo", url: "https://www.example.com/maya-chen/scheduler" },
        ],
        skills: ["Distributed Systems", "Kubernetes", "Go", "System Design"],
      },
      {
        name: "Control-plane SLO playbook",
        description:
          "<p>A public write-up of the reconcile-latency and leader-election SLOs Northline uses in production, including the dashboards that made split-brain pages rare.</p>",
        links: [{ label: "Playbook", url: "https://www.example.com/maya-chen/slo-playbook" }],
        skills: ["Observability", "Technical Leadership"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "software-technology",
    name: "Elias Navarro",
    title: "Engineering Manager",
    location: "Austin, TX",
    siteDescription:
      "Engineering manager for platform and developer experience. Golden paths, paved roads, and the tickets that stop existing when the path is actually paved.",
    summary:
      "<p>Runs platform teams that treat developer time as the scarce resource. Golden paths, paved CI, and internal platforms only count if a product squad can ship on Friday without filing a ticket on Thursday.</p><p>At Driftwood, cut median PR-to-prod time from 3.4 days to 11 hours for 22 squads. Previously built Copperline's self-service environments and Lantern's local toolchain before anyone called it DX.</p>",
    socials: [
      { platform: "linkedin.com", ref: "elias-navarro" },
      { platform: "github.com", ref: "enavarro-eng" },
      { platform: "website", ref: "https://eliasnavarro.example.com" },
    ],
    skills: [
      {
        name: "Technical Leadership",
        description:
          "Manages a platform org of 14. Sets the paved-road contract, the on-call contract, and the rule that a platform is not a ticket queue.",
        yearStarted: 2018,
      },
      {
        name: "Program Management",
        description:
          "Sequences multi-quarter platform bets so product squads see a weekly unlock, not a two-year migration story.",
        yearStarted: 2019,
      },
      {
        name: "Change Management",
        description:
          "Moves teams onto golden paths with champions, office hours, and a sunset date for the old way. Adoption is a program, not a Slack announcement.",
        yearStarted: 2018,
      },
      {
        name: "TypeScript",
        description:
          "Still reviews the IDP and CLI surfaces. Typed contracts are how platform APIs stay boring.",
        yearStarted: 2016,
      },
      {
        name: "Kubernetes",
        description:
          "Self-service namespaces, policy, and the templates that keep product teams off raw manifests.",
        yearStarted: 2017,
      },
      {
        name: "AWS",
        description:
          "Account vending, IAM boundaries, and the environment factory Copperline still runs.",
        yearStarted: 2015,
      },
      {
        name: "System Design",
        description:
          "Draws the IDP as a product: catalog, scorecards, and the few APIs that must never become a portal for everything.",
        yearStarted: 2017,
      },
      {
        name: "Python",
        description:
          "Internal CLIs and the glue that made local environments match staging. Still the fastest way to kill a class of 'works on my laptop' tickets.",
        yearStarted: 2012,
      },
    ],
    companies: [
      {
        name: "Driftwood Platform",
        description:
          "Austin company that sells an internal developer platform to product-led SaaS. Elias runs the team that has to use the product on itself first.",
        location: "Austin, TX",
        startDate: "2022-02-01",
        positions: [
          {
            title: "Engineering Manager, Developer Experience",
            startDate: "2022-02-01",
            projects: [
              {
                name: "Golden-path rollout",
                description:
                  "Replaced seven ad-hoc pipelines with one paved path. Median PR-to-prod for 22 squads fell from 3.4 days to 11 hours; Friday deploys stopped being a rumor.",
                skills: [
                  "Technical Leadership",
                  "Change Management",
                  "Kubernetes",
                  "Program Management",
                ],
              },
              {
                name: "Internal developer portal",
                description:
                  "Shipped the catalog and scorecards that made ownership visible. Orphaned services dropped from 61 to 9; onboarding time for a new service went from 9 days to 2.",
                skills: ["TypeScript", "System Design", "Program Management"],
              },
              {
                name: "Self-service preview environments",
                description:
                  "Per-PR environments on a shared EKS fleet. QA cycle time fell 44% and the #platform queue for 'need a staging slot' went quiet.",
                skills: ["Kubernetes", "AWS", "Python"],
              },
            ],
          },
        ],
      },
      {
        name: "Copperline Cloud",
        description:
          "Austin IaaS reseller that grew an internal platform the hard way. Elias turned the environment factory into something product teams could click.",
        location: "Austin, TX",
        startDate: "2017-03-06",
        endDate: "2022-01-28",
        positions: [
          {
            title: "Staff Engineer, Platform",
            startDate: "2020-01-13",
            endDate: "2022-01-28",
            projects: [
              {
                name: "Account vending factory",
                description:
                  "Automated AWS account and IAM boundary creation. New-environment lead time fell from 12 days to 40 minutes; audit exceptions on shared credentials went to zero.",
                skills: ["AWS", "Python", "System Design"],
              },
              {
                name: "Policy-as-code guardrails",
                description:
                  "Codified the ten rules security actually cared about. Blocked 230 misconfigured public buckets in the first year without a ticket per request.",
                skills: ["AWS", "Kubernetes", "Technical Leadership"],
              },
            ],
          },
          {
            title: "Senior Software Engineer",
            startDate: "2017-03-06",
            endDate: "2020-01-12",
            projects: [
              {
                name: "Local toolchain parity",
                description:
                  "Python CLI that mirrored staging networking on a laptop. 'Works on my machine' bugs filed against platform dropped 58%.",
                skills: ["Python", "TypeScript", "Change Management"],
              },
              {
                name: "Shared CI templates",
                description:
                  "One set of pipelines instead of 30 forks. Mean pipeline minutes per week fell 36% after cache and image reuse landed.",
                skills: ["TypeScript", "Program Management", "AWS"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "The University of Texas at Austin",
        degree: "B.S. Electrical and Computer Engineering",
        dateAwarded: "2012-05-19",
      },
    ],
    certifications: [
      {
        name: "AWS Certified DevOps Engineer – Professional",
        issuer: "Amazon Web Services",
        dateAwarded: "2021-06-18",
        credentialId: "DOP-ELIAS-0618",
      },
      {
        name: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        dateAwarded: "2023-02-03",
        credentialId: "CKA-ELIAS-2302",
      },
    ],
    featuredProjects: [
      {
        name: "Paved-road scorecards",
        description:
          "<p>A public version of the Driftwood catalog rules: what a golden path must guarantee, how scorecards stay honest, and why a portal is not a platform.</p>",
        links: [
          { label: "Scorecard spec", url: "https://www.example.com/elias-navarro/scorecards" },
          { label: "Talk slides", url: "https://www.example.com/elias-navarro/paved-road" },
        ],
        skills: ["Technical Leadership", "System Design", "Program Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "software-technology",
    name: "Aisha Rahman",
    title: "Senior Frontend Engineer",
    location: "New York, NY",
    siteDescription:
      "Senior frontend engineer who treats the design system as a product. React, tokens, and the components that stop every squad from inventing a second button.",
    summary:
      "<p>Owns design systems the way platform engineers own clusters: versioned APIs, adoption metrics, and a sunset date for the one-off components. React and TypeScript are the materials; the work is making 11 product squads look like one company.</p><p>At Kestrel, cut unique button implementations from 47 to 4 and dropped visual-regression escapes 62%. Earlier, built Vellum's token pipeline and Redcedar's first accessible component kit.</p>",
    socials: [
      { platform: "linkedin.com", ref: "aisha-rahman" },
      { platform: "github.com", ref: "aisharahman" },
      { platform: "medium.com", ref: "aisharahman" },
    ],
    skills: [
      {
        name: "React",
        description:
          "Component APIs that product teams extend without forking. Headless primitives first; chrome second.",
        yearStarted: 2016,
      },
      {
        name: "TypeScript",
        description:
          "Public types are the design-system contract. If a prop is optional, there is a story that says why.",
        yearStarted: 2017,
      },
      {
        name: "System Design",
        description:
          "Tokens, theming, and the package graph that keeps a system from becoming a junk drawer of variants.",
        yearStarted: 2018,
      },
      {
        name: "Technical Leadership",
        description:
          "Staffs the design-system working group. Reviews the PRs that would have added a 48th button.",
        yearStarted: 2020,
      },
      {
        name: "Change Management",
        description:
          "Migration playbooks, codemods, and office hours. Adoption is scheduled, not hoped for.",
        yearStarted: 2019,
      },
      {
        name: "AWS",
        description:
          "Chromatic-adjacent preview stacks and the S3/CloudFront path that serves the docs site the designers actually open.",
        yearStarted: 2018,
      },
      {
        name: "Observability",
        description:
          "Usage telemetry on components in production. If a primitive has no consumers, it is a candidate for deletion, not a case study.",
        yearStarted: 2020,
      },
      {
        name: "Program Management",
        description:
          "Quarterly adoption targets with design and brand. The system ships on a calendar, not when a hero component feels ready.",
        yearStarted: 2021,
      },
    ],
    companies: [
      {
        name: "Kestrel Interface Lab",
        description:
          "New York product studio whose clients kept shipping a different button per squad. Aisha's job is one system, versioned, with receipts.",
        location: "New York, NY",
        startDate: "2021-06-01",
        positions: [
          {
            title: "Senior Frontend Engineer",
            startDate: "2021-06-01",
            projects: [
              {
                name: "Kestrel design system v3",
                description:
                  "Rebuilt the React kit on tokens and headless primitives. Unique button implementations fell from 47 to 4; visual-regression escapes dropped 62% in two quarters.",
                skills: ["React", "TypeScript", "System Design", "Technical Leadership"],
              },
              {
                name: "Codemod migration program",
                description:
                  "Shipped codemods and a six-week office-hours cadence. 11 squads completed the v2-to-v3 cutover; leftover one-off components fell 84%.",
                skills: ["Change Management", "Program Management", "TypeScript"],
              },
              {
                name: "Component usage telemetry",
                description:
                  "Instrumented production usage so unused primitives could be deleted with evidence. Removed 23 dead exports and cut bundle size for the kit 18%.",
                skills: ["Observability", "React", "AWS"],
              },
            ],
          },
        ],
      },
      {
        name: "Vellum Systems",
        description:
          "Manhattan SaaS company that sold workflow software and a design language that lived in a Figma file no engineer opened.",
        location: "New York, NY",
        startDate: "2017-09-11",
        endDate: "2021-05-28",
        positions: [
          {
            title: "Frontend Engineer",
            startDate: "2017-09-11",
            endDate: "2021-05-28",
            projects: [
              {
                name: "Token pipeline",
                description:
                  "Built the Style Dictionary path from Figma tokens to TypeScript. Theme drift across three brands fell from weekly hotfixes to a monthly release.",
                skills: ["TypeScript", "System Design", "AWS"],
              },
              {
                name: "Accessible form kit",
                description:
                  "Replaced custom inputs with a React kit that passed WCAG 2.1 AA on the first audit. Form-related support tickets dropped 31%.",
                skills: ["React", "Technical Leadership", "Change Management"],
              },
              {
                name: "Docs site that designers use",
                description:
                  "Shipped the docs and playground on CloudFront. Weekly unique visitors from design went from 6 to 48; Slack 'how do I use X' questions fell by half.",
                skills: ["React", "AWS", "Program Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "New York University",
        degree: "B.S. Computer Science",
        dateAwarded: "2015-05-20",
      },
      {
        school: "School of Visual Arts",
        degree: "Certificate, Interaction Design",
        dateAwarded: "2017-12-15",
      },
    ],
    certifications: [
      {
        name: "Professional Scrum Master I",
        issuer: "Scrum.org",
        dateAwarded: "2020-11-09",
        credentialId: "PSM1-AISHA-1109",
      },
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        dateAwarded: "2022-03-22",
        credentialId: "DVA-AISHA-0322",
      },
    ],
    featuredProjects: [
      {
        name: "Headless primitive kit",
        description:
          "<p>Open reference components for buttons, menus, and dialogs with tokens as the only theme API. Written so a second brand can land without a fork.</p>",
        links: [
          { label: "Kit docs", url: "https://www.example.com/aisha-rahman/primitives" },
          { label: "Migration notes", url: "https://www.example.com/aisha-rahman/v3-migration" },
        ],
        skills: ["React", "TypeScript", "System Design"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "software-technology",
    name: "Cole Brennan",
    title: "Staff Site Reliability Engineer",
    location: "Denver, CO",
    siteDescription:
      "Staff SRE for observability and Kubernetes. SLOs, traces, and the dashboards that make a 3 a.m. page mean one thing.",
    summary:
      "<p>Treats observability as a product with owners, SLOs, and a budget. Kubernetes is the substrate; the work is making a page name the failing dependency before the war room does.</p><p>At Highwater, cut MTTR from 47 minutes to 14 and dropped paging noise 58% across 9 clusters. Previously ran Summit's tracing mesh and Alpine's first on-call that did not page on every 5xx.</p>",
    socials: [
      { platform: "linkedin.com", ref: "cole-brennan" },
      { platform: "github.com", ref: "colebrennan-sre" },
      { platform: "website", ref: "https://colebrennan.example.com" },
    ],
    skills: [
      {
        name: "Observability",
        description:
          "SLOs, tracing, and exemplars that tie a red burn to a deploy. If a dashboard cannot name the owner, it is decoration.",
        yearStarted: 2015,
      },
      {
        name: "Kubernetes",
        description:
          "Multi-cluster ops, admission policy, and the node pools that stop noisy neighbors from becoming an incident.",
        yearStarted: 2017,
      },
      {
        name: "AWS",
        description:
          "EKS, IRSA, and the networking that keeps scrape paths private. Cost of telemetry is part of the design.",
        yearStarted: 2014,
      },
      {
        name: "Go",
        description:
          "Exporters, admission webhooks, and the small controllers that should never have been a sidecar.",
        yearStarted: 2016,
      },
      {
        name: "Python",
        description:
          "Runbooks that execute. Alert routing, capacity reports, and the weekly SLO mail that leadership actually reads.",
        yearStarted: 2013,
      },
      {
        name: "Distributed Systems",
        description:
          "Understands fan-out, retries, and why a trace that stops at the queue is a lie. Designs for partial failure first.",
        yearStarted: 2016,
      },
      {
        name: "System Design",
        description:
          "Telemetry pipelines with budgets. Sampling, cardinality, and the rule that a new high-cardinality label is a design review.",
        yearStarted: 2018,
      },
      {
        name: "Technical Leadership",
        description:
          "Staff partner to product SRE and platform. Sets the paging contract and the 'we do not page on saturation without a burn' rule.",
        yearStarted: 2020,
      },
    ],
    companies: [
      {
        name: "Highwater Observability",
        description:
          "Denver shop that sells managed telemetry to teams drowning in their own cardinality. Cole is the staff SRE who still carries a pager.",
        location: "Denver, CO",
        startDate: "2020-11-02",
        positions: [
          {
            title: "Staff Site Reliability Engineer",
            startDate: "2020-11-02",
            projects: [
              {
                name: "SLO and paging contract",
                description:
                  "Replaced threshold alerts with error-budget burns on 31 services. Pages per week fell 58%; MTTR on customer-facing incidents went from 47 minutes to 14.",
                skills: ["Observability", "Technical Leadership", "Python"],
              },
              {
                name: "Multi-cluster trace mesh",
                description:
                  "Unified traces across 9 EKS clusters with consistent baggage. Time-to-name-the-dependency in incidents dropped from 18 minutes to 3.",
                skills: ["Kubernetes", "Distributed Systems", "AWS", "Observability"],
              },
              {
                name: "Cardinality budget service",
                description:
                  "Go admission webhook that rejects unbounded label sets. Time-series growth flattened 71% and the monthly telemetry bill stopped surprising finance.",
                skills: ["Go", "System Design", "Kubernetes"],
              },
            ],
          },
        ],
      },
      {
        name: "Summit Mesh Ops",
        description:
          "Boulder consultancy that ran other people's clusters. Cole owned the tracing story and the on-call that had become a group chat.",
        location: "Boulder, CO",
        startDate: "2016-04-04",
        endDate: "2020-10-30",
        positions: [
          {
            title: "Senior Site Reliability Engineer",
            startDate: "2018-02-12",
            endDate: "2020-10-30",
            projects: [
              {
                name: "Client tracing standard",
                description:
                  "Defined the span contract six clients adopted. Duplicate incident channels fell from 4 per outage to 1; postmortems started with a trace ID.",
                skills: ["Observability", "Distributed Systems", "Technical Leadership"],
              },
              {
                name: "Node-pool isolation",
                description:
                  "Split noisy batch onto dedicated pools. Noisy-neighbor latency events fell 64% and the batch team stopped paging product on-call.",
                skills: ["Kubernetes", "AWS", "System Design"],
              },
            ],
          },
          {
            title: "Site Reliability Engineer",
            startDate: "2016-04-04",
            endDate: "2018-02-11",
            projects: [
              {
                name: "First SLO dashboard",
                description:
                  "Python reports that mailed weekly budget burn to service owners. Unowned 5xx alerts dropped 40% once names were on the page.",
                skills: ["Python", "Observability"],
              },
              {
                name: "Scrape-path hardening",
                description:
                  "Moved Prometheus scrape onto private links. Accidental public metric endpoints went from 11 to 0 in a quarter.",
                skills: ["AWS", "Go", "Kubernetes"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Colorado Boulder",
        degree: "B.S. Computer Science",
        dateAwarded: "2013-05-10",
      },
    ],
    certifications: [
      {
        name: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        dateAwarded: "2019-08-16",
        credentialId: "CKA-COLE-0816",
      },
      {
        name: "AWS Certified SysOps Administrator – Associate",
        issuer: "Amazon Web Services",
        dateAwarded: "2021-01-29",
        credentialId: "SOA-COLE-0129",
      },
    ],
    featuredProjects: [
      {
        name: "Paging contract template",
        description:
          "<p>A reusable SLO and paging contract: burn-rate alerts, ownership fields, and the rule that saturation without a user-facing burn does not wake anyone.</p>",
        links: [
          { label: "Contract", url: "https://www.example.com/cole-brennan/paging-contract" },
          { label: "Dashboard kit", url: "https://www.example.com/cole-brennan/slo-kit" },
        ],
        skills: ["Observability", "Technical Leadership", "Python"],
      },
      {
        name: "Cardinality budget webhook",
        description:
          "<p>Reference admission controller that keeps high-cardinality labels out of the time-series store. Written after a single deploy doubled a client's Prometheus bill.</p>",
        links: [
          { label: "Webhook notes", url: "https://www.example.com/cole-brennan/cardinality" },
        ],
        skills: ["Go", "Kubernetes", "System Design"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "investment-banking",
    name: "Helena Voss",
    title: "Vice President, Mergers & Acquisitions",
    location: "New York, NY",
    siteDescription:
      "Sell-side M&A vice president. Process letters, buyer trees, and the models that keep a founder from taking the first number that sounds large.",
    summary:
      "<p>Runs sell-side processes for founder-owned and sponsor-backed companies in industrials and business services. Buyer trees, management presentations, and the close calendar are the craft; the job is getting a signed SPA that still looks like the CIM six months later.</p><p>At Riverton &amp; Hale, led eight announced sell-sides totaling $4.6B EV, including a 14-bidder auction that cleared 11.2x EBITDA. Earlier, built Calder Street's mid-market industrials practice and learned live deals as an analyst at Foxbridge.</p>",
    socials: [
      { platform: "linkedin.com", ref: "helena-voss" },
      { platform: "website", ref: "https://helenavoss.example.com" },
      { platform: "medium.com", ref: "helenavoss" },
    ],
    skills: [
      {
        name: "Deal Execution",
        description:
          "Owns the sell-side calendar from teaser to SPA. Eight announced processes at Riverton; none slipped a signed date for a banker-caused miss.",
        yearStarted: 2015,
      },
      {
        name: "DCF Valuation",
        description:
          "Builds the cases that survive buyer diligence. WACC, terminal, and the working-capital peg the QoE will actually support.",
        yearStarted: 2013,
      },
      {
        name: "Financial Modeling",
        description:
          "Three-statement, merger, and sensitivity books that associates can defend without a late-night rewrite.",
        yearStarted: 2013,
      },
      {
        name: "Pitch Books",
        description:
          "Buyer lists and positioning that get a first-round bid. The CIM is a narrative with numbers, not a slide dump.",
        yearStarted: 2013,
      },
      {
        name: "Capital Markets",
        description:
          "Reads the financing market so a sale process does not assume a leverage package that disappeared last Tuesday.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Founders, sponsors, and counsel. Keeps the board calendar and the management team from negotiating in parallel.",
        yearStarted: 2017,
      },
      {
        name: "Industry Coverage",
        description:
          "Industrials and business services. Knows which strategics will pay for route density and which will only pay for margin.",
        yearStarted: 2014,
      },
      {
        name: "Contract Negotiation",
        description:
          "SPA markups on indemnity, MAC, and working-capital true-up. Partners with counsel; does not outsource the economics.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Riverton & Hale",
        description:
          "New York boutique that runs sell-side M&A for founder and sponsor clients between $200M and $1.5B EV. Helena is the industrials VP the founders ask for by name.",
        location: "New York, NY",
        startDate: "2021-01-04",
        positions: [
          {
            title: "Vice President, Mergers & Acquisitions",
            startDate: "2021-01-04",
            projects: [
              {
                name: "14-bidder industrials auction",
                description:
                  "Led a sell-side for a $780M EV components maker. 14 first-round bids, close at 11.2x EBITDA, 9% above the board's walk-away. Process ran 17 weeks, two days under the original calendar.",
                skills: [
                  "Deal Execution",
                  "Pitch Books",
                  "Industry Coverage",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Sponsor carve-out close",
                description:
                  "Sold a $410M EV logistics carve-out with a locked-box and a TSA that expired on month nine. Working-capital peg survived QoE; indemnity cap closed at 8% of EV.",
                skills: [
                  "Deal Execution",
                  "Contract Negotiation",
                  "DCF Valuation",
                  "Financial Modeling",
                ],
              },
              {
                name: "Financing-aware sale process",
                description:
                  "Re-cut buyer outreach when the leveraged loan market widened 175 bps mid-process. Kept six cash buyers in the second round; avoided a failed debt-dependent bid.",
                skills: ["Capital Markets", "Deal Execution", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Calder Street Capital",
        description:
          "Mid-market advisory desk that grew an industrials franchise one CIM at a time. Helena was the associate who became the VP the partners staffed on live processes.",
        location: "New York, NY",
        startDate: "2015-07-06",
        endDate: "2020-12-18",
        positions: [
          {
            title: "Vice President",
            startDate: "2019-02-04",
            endDate: "2020-12-18",
            projects: [
              {
                name: "Business-services dual-track",
                description:
                  "Ran a dual-track IPO explore and sale. Sale won at $620M EV after the public window closed; dual-track cost the client 11 extra days, not a failed process.",
                skills: ["Capital Markets", "Deal Execution", "Pitch Books"],
              },
              {
                name: "Founder recap advisory",
                description:
                  "Modeled a recap vs. 100% sale for a 72-year-old founder. Board chose a 61% sale; Helena negotiated the rollover economics and the chair seat.",
                skills: [
                  "DCF Valuation",
                  "Financial Modeling",
                  "Contract Negotiation",
                  "Stakeholder Management",
                ],
              },
            ],
          },
          {
            title: "Associate",
            startDate: "2015-07-06",
            endDate: "2019-02-03",
            projects: [
              {
                name: "Industrials CIM factory",
                description:
                  "Built the coverage templates Calder Street still uses. First-round bid rate on launched processes rose from 4.1 to 6.8 buyers.",
                skills: ["Pitch Books", "Industry Coverage", "Financial Modeling"],
              },
              {
                name: "QoE-ready working-capital model",
                description:
                  "Standardized the peg model so QoE stopped rewriting banker numbers. Average peg dispute days fell from 9 to 2.",
                skills: ["Financial Modeling", "DCF Valuation"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Pennsylvania, The Wharton School",
        degree: "B.S. Economics, Finance concentration",
        dateAwarded: "2013-05-13",
      },
    ],
    certifications: [
      {
        name: "Series 79 – Investment Banking Representative",
        issuer: "FINRA",
        dateAwarded: "2013-09-20",
        credentialId: "FINRA-79-HV-2013",
      },
      {
        name: "Series 63 – Uniform Securities Agent",
        issuer: "FINRA / NASAA",
        dateAwarded: "2013-10-11",
        credentialId: "FINRA-63-HV-2013",
      },
    ],
    featuredProjects: [
      {
        name: "Sell-side process letter archive",
        description:
          "<p>Anonymized process letters and buyer-tree templates from Riverton industrials auctions, including the 14-bidder case that cleared 11.2x. Written for associates who inherit a live calendar.</p>",
        links: [
          { label: "Process letters", url: "https://www.example.com/helena-voss/process-letters" },
          { label: "Buyer-tree notes", url: "https://www.example.com/helena-voss/buyer-trees" },
        ],
        skills: ["Deal Execution", "Pitch Books", "Industry Coverage"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "investment-banking",
    name: "Julian Park",
    title: "Associate, Leveraged Finance",
    location: "New York, NY",
    siteDescription:
      "Leveraged finance associate. LBO models, credit memos, and the commitment papers that still look true after the quality of earnings.",
    summary:
      "<p>Underwrites leveraged loans and high-yield packages for sponsor LBOs and dividend recaps. The model is the argument; the credit memo is the part the commitment committee actually reads.</p><p>At Ironwood, staffed $3.1B of committed facilities across 11 sponsor deals, including a 6.4x first-lien package that held through a 90 bps flex. Came up as an analyst at Pellam Brothers writing the first-pass LBOs that associates used to rewrite.</p>",
    socials: [
      { platform: "linkedin.com", ref: "julian-park-levfin" },
      { platform: "website", ref: "https://julianpark.example.com" },
      { platform: "medium.com", ref: "julianpark" },
    ],
    skills: [
      {
        name: "LBO Analysis",
        description:
          "Sources-and-uses, returns at exit, and the debt schedule that survives a 150 bps rate move. Built the Ironwood LBO that the sponsors stopped sending back.",
        yearStarted: 2020,
      },
      {
        name: "Financial Modeling",
        description:
          "Credit models with covenants, excess cash flow sweep, and the cases the rating agencies will ask for on Tuesday.",
        yearStarted: 2020,
      },
      {
        name: "Credit Analysis",
        description:
          "Free cash flow through-cycle, customer concentration, and the add-backs that will not survive a downturn memo.",
        yearStarted: 2020,
      },
      {
        name: "Capital Markets",
        description:
          "Reads the leveraged loan and HY tape. Knows when a 6.5x package is a market print and when it is a hope.",
        yearStarted: 2021,
      },
      {
        name: "Deal Execution",
        description:
          "Commitment papers, flex, and the syndicate that actually clears. Eleven sponsor processes at Ironwood without a failed launch.",
        yearStarted: 2022,
      },
      {
        name: "Pitch Books",
        description:
          "Financing teases and lender slides that get a yes from the holdco and a yes from the credit committee.",
        yearStarted: 2020,
      },
      {
        name: "DCF Valuation",
        description:
          "Enterprise value checks against the LBO so the financing does not assume a multiple the equity story cannot defend.",
        yearStarted: 2020,
      },
      {
        name: "Loan Structuring",
        description:
          "First-lien, delayed-draw, and the basket language sponsors fight for. Structures the package; does not leave the grid to counsel alone.",
        yearStarted: 2022,
      },
    ],
    companies: [
      {
        name: "Ironwood Securities",
        description:
          "New York leveraged finance boutique that commits hold-level paper for mid-market sponsors. Julian is the associate who owns the model and the memo.",
        location: "New York, NY",
        startDate: "2022-07-11",
        positions: [
          {
            title: "Associate, Leveraged Finance",
            startDate: "2022-07-11",
            projects: [
              {
                name: "6.4x first-lien LBO package",
                description:
                  "Modeled and syndicated a $640M first-lien for a 6.4x LBO. Held through 90 bps of flex; closing leverage printed 6.25x. Sponsor returned for the dividend recap eight months later.",
                skills: ["LBO Analysis", "Loan Structuring", "Capital Markets", "Deal Execution"],
              },
              {
                name: "Dividend recap credit memo",
                description:
                  "Wrote the committee memo for a $220M recap at 5.1x. Called the customer-concentration risk that cut the add-back by $8M; deal still cleared with a tighter ECF sweep.",
                skills: ["Credit Analysis", "Financial Modeling", "Pitch Books"],
              },
              {
                name: "Rate-shock LBO library",
                description:
                  "Rebuilt the standard LBO with 100/150/200 bps rate cases and covenant headroom. Associates stopped maintaining five files; committee questions on rates fell by half.",
                skills: ["LBO Analysis", "Financial Modeling", "DCF Valuation"],
              },
            ],
          },
        ],
      },
      {
        name: "Pellam Brothers",
        description:
          "Credit-focused advisory shop where analysts wrote the first LBO and hoped an associate would keep the tabs. Julian's files were the ones they kept.",
        location: "New York, NY",
        startDate: "2020-07-06",
        endDate: "2022-06-30",
        positions: [
          {
            title: "Investment Banking Analyst",
            startDate: "2020-07-06",
            endDate: "2022-06-30",
            projects: [
              {
                name: "First-pass LBO book",
                description:
                  "Built 27 first-pass LBOs for mid-market sponsors. Average associate rewrite time fell from 6 hours to 90 minutes after the debt schedule template landed.",
                skills: ["LBO Analysis", "Financial Modeling", "DCF Valuation"],
              },
              {
                name: "Covenant headroom tracker",
                description:
                  "Weekly tracker of leverage and FCCR vs. package for 9 live deals. Flagged a springing covenant two weeks before a missed test; amendment closed without a default.",
                skills: ["Credit Analysis", "Loan Structuring", "Capital Markets"],
              },
              {
                name: "Lender marketing slides",
                description:
                  "First-round lender decks for three launched deals. Average oversubscription on launched paper was 1.8x; zero failed syndications on Julian's books.",
                skills: ["Pitch Books", "Deal Execution", "Capital Markets"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "New York University, Leonard N. Stern School of Business",
        degree: "B.S. Business, Finance and Accounting",
        dateAwarded: "2020-05-18",
      },
    ],
    certifications: [
      {
        name: "Securities Industry Essentials (SIE)",
        issuer: "FINRA",
        dateAwarded: "2020-06-12",
        credentialId: "SIE-JPARK-0612",
      },
      {
        name: "Series 79 – Investment Banking Representative",
        issuer: "FINRA",
        dateAwarded: "2020-08-28",
        credentialId: "FINRA-79-JP-2020",
      },
    ],
    featuredProjects: [
      {
        name: "Through-cycle LBO template",
        description:
          "<p>A public, anonymized LBO with rate shocks, ECF sweep, and covenant headroom. Built so an associate can defend the debt schedule without a second file.</p>",
        links: [
          { label: "Template notes", url: "https://www.example.com/julian-park/lbo-template" },
          { label: "Credit memo outline", url: "https://www.example.com/julian-park/credit-memo" },
        ],
        skills: ["LBO Analysis", "Financial Modeling", "Credit Analysis"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "investment-banking",
    name: "Naomi Adeyemi",
    title: "Vice President, Equity Capital Markets",
    location: "London, United Kingdom",
    siteDescription:
      "ECM vice president for IPOs and follow-ons. Order books, range-setting, and the roadshows that still have a bid when the window narrows.",
    summary:
      "<p>Runs European equity offerings for issuers who cannot afford a failed window. IPO positioning, follow-on execution, and the investor calendar are the craft; the job is a priced deal that the aftermarket does not punish on day six.</p><p>At Thames Gate, led four IPOs and nine follow-ons totaling £6.8B, including a £1.1B offering that priced at the top after a 2.4x covered book. Previously built Meridian Row's UK mid-cap franchise through a closed window and two reopened ones.</p>",
    socials: [
      { platform: "linkedin.com", ref: "naomi-adeyemi" },
      { platform: "medium.com", ref: "naomiadeyemi" },
      { platform: "website", ref: "https://naomiadeyemi.example.com" },
    ],
    skills: [
      {
        name: "Capital Markets",
        description:
          "Reads the European IPO and follow-on tape. Knows when a window is open and when a launch is a press release.",
        yearStarted: 2015,
      },
      {
        name: "Deal Execution",
        description:
          "Owns the ECM calendar from intention-to-float to allocation. Four IPOs and nine follow-ons at Thames Gate without a pulled book on her watch.",
        yearStarted: 2017,
      },
      {
        name: "Pitch Books",
        description:
          "Equity stories and investor targeting that get a covered book. The leave-behind is a valuation argument, not a logo slide.",
        yearStarted: 2015,
      },
      {
        name: "Financial Modeling",
        description:
          "IPO valuation ranges, greenshoe math, and the follow-on discount that the board will still approve on a Sunday.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "Peer multiples, free-float, and the index-inclusion story that actually moves the order book.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Issuers, syndicate, and the IR team that has to live with the aftermarket. Keeps the chair from negotiating allocation in the hallway.",
        yearStarted: 2018,
      },
      {
        name: "DCF Valuation",
        description:
          "Standalone DCFs that sit next to the comps so a range is not just a multiple from last Tuesday's print.",
        yearStarted: 2015,
      },
      {
        name: "Industry Coverage",
        description:
          "UK and Nordic mid-cap consumer and healthcare. Knows which longs will pay for growth and which only pay for cash conversion.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Thames Gate Markets",
        description:
          "London ECM house that still takes mid-cap IPOs when the bulge bracket is waiting for a larger file. Naomi is the VP who prices the book.",
        location: "London, United Kingdom",
        startDate: "2021-03-01",
        positions: [
          {
            title: "Vice President, Equity Capital Markets",
            startDate: "2021-03-01",
            projects: [
              {
                name: "£1.1B top-of-range IPO",
                description:
                  "Led a UK consumer IPO that priced at the top of a 310–360p range after a 2.4x covered book. Day-six close was +4.1%; greenshoe fully exercised.",
                skills: [
                  "Capital Markets",
                  "Deal Execution",
                  "Pitch Books",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Accelerated follow-on",
                description:
                  "Executed a £420M overnight follow-on at a 4.8% discount when the primary window closed. Book covered in 90 minutes; issuer avoided a bought deal.",
                skills: ["Deal Execution", "Market Analysis", "Capital Markets"],
              },
              {
                name: "Index-inclusion equity story",
                description:
                  "Repositioned a Nordic healthcare issuer around free-float and FTSE inclusion. Follow-on demand from index-aware longs rose 38% vs. the prior roadshow.",
                skills: [
                  "Market Analysis",
                  "Industry Coverage",
                  "Financial Modeling",
                  "DCF Valuation",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Meridian Row Capital",
        description:
          "City boutique that kept a UK mid-cap ECM franchise alive through a closed window. Naomi built the investor map the partners still use.",
        location: "London, United Kingdom",
        startDate: "2015-09-07",
        endDate: "2021-02-26",
        positions: [
          {
            title: "Associate, Equity Capital Markets",
            startDate: "2018-01-08",
            endDate: "2021-02-26",
            projects: [
              {
                name: "Closed-window issuer program",
                description:
                  "Kept 11 issuers warm with a quarterly investor program while IPOs were paused. When the window reopened, three launched inside 28 days.",
                skills: ["Stakeholder Management", "Industry Coverage", "Capital Markets"],
              },
              {
                name: "Follow-on discount study",
                description:
                  "Modeled UK mid-cap follow-on discounts vs. liquidity. Average recommended discount on her files was 70 bps tighter than the prior-year desk average, with equal cover.",
                skills: ["Financial Modeling", "Market Analysis", "DCF Valuation"],
              },
            ],
          },
          {
            title: "Analyst",
            startDate: "2015-09-07",
            endDate: "2018-01-07",
            projects: [
              {
                name: "Peer multiple book",
                description:
                  "Built the comps and DCF pack Meridian Row still opens first. Range-setting meetings stopped starting from a blank slide.",
                skills: ["Financial Modeling", "DCF Valuation", "Pitch Books"],
              },
              {
                name: "Roadshow targeting map",
                description:
                  "Mapped 180 European longs by holding period and style. First-week roadshow hit-rate rose from 54% to 71%.",
                skills: ["Market Analysis", "Pitch Books", "Industry Coverage"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "London School of Economics and Political Science",
        degree: "BSc Finance",
        dateAwarded: "2014-07-11",
      },
      {
        school: "University of Oxford, Saïd Business School",
        degree: "MSc Financial Economics",
        dateAwarded: "2015-07-18",
      },
    ],
    certifications: [
      {
        name: "FCA Approved Person – Investment Advice",
        issuer: "Financial Conduct Authority",
        dateAwarded: "2016-02-04",
        credentialId: "FCA-CF30-NA-2016",
      },
      {
        name: "CFA Level II passed",
        issuer: "CFA Institute",
        dateAwarded: "2018-08-15",
        credentialId: "CFA-L2-NADEYEMI",
      },
    ],
    featuredProjects: [
      {
        name: "IPO range-setting memo",
        description:
          "<p>Anonymized range memo from the £1.1B consumer IPO: comps, DCF, free-float, and the book-building notes that supported a top-of-range print.</p>",
        links: [
          { label: "Range memo", url: "https://www.example.com/naomi-adeyemi/range-memo" },
          { label: "Aftermarket notes", url: "https://www.example.com/naomi-adeyemi/aftermarket" },
        ],
        skills: ["Capital Markets", "Financial Modeling", "DCF Valuation", "Deal Execution"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "investment-banking",
    name: "Marcus Bellamy",
    title: "Investment Banking Analyst",
    location: "Chicago, IL",
    siteDescription:
      "Industrials coverage analyst. Comps, CIMs, and the first-pass models that let a VP walk into a CEO meeting without a second all-nighter.",
    summary:
      "<p>Covers Midwest industrials for a Chicago boutique: packaging, specialty distribution, and the family-owned manufacturers that still fax a data tape. The job is a clean model, a buyer list that is not last year's logos, and a CIM a founder will actually send.</p><p>At Lakeshore, staffed 14 live processes and built the coverage book on 60 names. First-pass models now take associates 70 minutes to review, down from a rewrite. Summered at Fairmont Coverage Group, where he learned which strategics pay for route density.</p>",
    socials: [
      { platform: "linkedin.com", ref: "marcus-bellamy" },
      { platform: "website", ref: "https://marcusbellamy.example.com" },
    ],
    skills: [
      {
        name: "Industry Coverage",
        description:
          "Midwest industrials: packaging, distribution, and engineered products. Knows which strategics pay for density and which only pay for margin expansion.",
        yearStarted: 2021,
      },
      {
        name: "Pitch Books",
        description:
          "CIMs and teasers that a founder will send. Buyer lists with a reason for each name, not a logo wall.",
        yearStarted: 2021,
      },
      {
        name: "Financial Modeling",
        description:
          "Three-statement and operating models that survive a QoE. Associates review instead of rebuild.",
        yearStarted: 2021,
      },
      {
        name: "DCF Valuation",
        description:
          "WACC, mid-year, and the terminal that matches the industry fade. Writes the footnote the VP reads out loud.",
        yearStarted: 2022,
      },
      {
        name: "Market Analysis",
        description:
          "End-market volumes, freight, and the input-cost pass-through that decides whether a multiple is earned.",
        yearStarted: 2022,
      },
      {
        name: "Deal Execution",
        description:
          "Data room hygiene, buyer Q&A, and the weekly process update that does not surprise the partner on Sunday.",
        yearStarted: 2023,
      },
      {
        name: "Capital Markets",
        description:
          "Reads enough of the loan and HY tape to flag when a sale process is assuming leverage that is no longer printing.",
        yearStarted: 2023,
      },
    ],
    companies: [
      {
        name: "Lakeshore Advisory",
        description:
          "Chicago industrials boutique that still does live sell-sides for family owners. Marcus is the analyst who owns the coverage book and the first-pass model.",
        location: "Chicago, IL",
        startDate: "2023-07-10",
        positions: [
          {
            title: "Investment Banking Analyst",
            startDate: "2023-07-10",
            projects: [
              {
                name: "60-name industrials coverage book",
                description:
                  "Built the live coverage book on 60 Midwest names with comps, end-markets, and a last-meeting note. Partner CEOs meetings rose from 6 to 17 in two quarters.",
                skills: ["Industry Coverage", "Market Analysis", "Pitch Books"],
              },
              {
                name: "Packaging sell-side CIM",
                description:
                  "Wrote the CIM and operating model for a $190M EV converter. Nine first-round bids; process still live. Founder sent the CIM without a rewrite.",
                skills: ["Pitch Books", "Financial Modeling", "Deal Execution"],
              },
              {
                name: "First-pass model standard",
                description:
                  "Templated the three-statement and DCF so associates review in 70 minutes instead of rebuilding overnight. Used on 14 live processes.",
                skills: ["Financial Modeling", "DCF Valuation", "Capital Markets"],
              },
            ],
          },
        ],
      },
      {
        name: "Fairmont Coverage Group",
        description:
          "Chicago coverage shop where summers learned which strategics actually pick up the phone. Marcus left with a buyer list, not just a tombstone.",
        location: "Chicago, IL",
        startDate: "2022-06-06",
        endDate: "2022-08-12",
        positions: [
          {
            title: "Investment Banking Summer Analyst",
            startDate: "2022-06-06",
            endDate: "2022-08-12",
            projects: [
              {
                name: "Distribution buyer tree",
                description:
                  "Mapped 32 strategics by route overlap and prior-deal multiple. Two names from the tree showed up in a live process the following winter.",
                skills: ["Industry Coverage", "Pitch Books", "Market Analysis"],
              },
              {
                name: "Input-cost pass-through deck",
                description:
                  "Built the resin and freight pass-through slides the coverage team still drops into first meetings. Used in 8 CEO sit-downs that summer.",
                skills: ["Market Analysis", "Financial Modeling", "DCF Valuation"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Northwestern University, Kellogg School of Management (undergrad)",
        degree: "B.A. Economics, Certificate in Financial Economics",
        dateAwarded: "2023-06-17",
      },
    ],
    certifications: [
      {
        name: "Securities Industry Essentials (SIE)",
        issuer: "FINRA",
        dateAwarded: "2023-06-28",
        credentialId: "SIE-MBELL-0628",
      },
      {
        name: "Series 79 – Investment Banking Representative",
        issuer: "FINRA",
        dateAwarded: "2023-08-19",
        credentialId: "FINRA-79-MB-2023",
      },
    ],
    featuredProjects: [
      {
        name: "Midwest industrials coverage notes",
        description:
          "<p>Anonymized coverage pages: comps, end-market volumes, and the buyer-tree logic for packaging and specialty distribution. Written so the next analyst does not start from a blank book.</p>",
        links: [
          { label: "Coverage notes", url: "https://www.example.com/marcus-bellamy/coverage" },
          { label: "Model standard", url: "https://www.example.com/marcus-bellamy/model-standard" },
        ],
        skills: ["Industry Coverage", "Financial Modeling", "Pitch Books"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "management-consulting",
    name: "Lina Okonkwo",
    title: "Engagement Manager",
    location: "Chicago, IL",
    siteDescription:
      "Engagement manager for operations and supply. Issue trees that end in a plant, a DC, or a planning meeting — not another deck.",
    summary:
      "<p>Runs operations and supply engagements for industrials and CPG. The issue tree is the start; the work is a planning process, a DC network, or a changeover that still holds after the team leaves.</p><p>At Oakline, led a network redesign that cut landed cost 11% and a S&amp;OP reset that dropped forecast MAPE from 34% to 19%. Previously ran Fieldstone plant programs and learned the shop floor at Clearwater Operations.</p>",
    socials: [
      { platform: "linkedin.com", ref: "lina-okonkwo" },
      { platform: "medium.com", ref: "linaokonkwo" },
      { platform: "website", ref: "https://linaokonkwo.example.com" },
    ],
    skills: [
      {
        name: "Hypothesis-Driven Problem Solving",
        description:
          "Frames ops problems as testable bets. Will not staff a workstream until the hypothesis would change a decision.",
        yearStarted: 2016,
      },
      {
        name: "Issue Trees",
        description:
          "Decomposes landed cost, service, and inventory so the plant, the DC, and the forecast are not one slide.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Implements with supervisors, not just sponsors. The pilot is the product; the deck is the receipt.",
        yearStarted: 2017,
      },
      {
        name: "Slide Storytelling",
        description:
          "One governing thought per page. Executives get the decision; the appendix gets the regression.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Plant managers, planners, and the VP who asked for a study. Keeps the steering committee from reopening closed branches.",
        yearStarted: 2017,
      },
      {
        name: "Lean Manufacturing",
        description:
          "Changeover, standard work, and the boards that survive a night shift. Not a 5S poster program.",
        yearStarted: 2014,
      },
      {
        name: "Demand Planning",
        description:
          "S&OP cadence, bias, and the forecast that planners will actually use. MAPE is a starting metric, not the engagement.",
        yearStarted: 2018,
      },
      {
        name: "Inventory Optimization",
        description:
          "Service-level policies and multi-echelon buffers. Inventory is a decision, not a leftover.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Oakline Advisory",
        description:
          "Chicago operations consultancy that still sends teams to plants. Lina runs the supply and planning engagements that have to work on a Monday.",
        location: "Chicago, IL",
        startDate: "2021-09-07",
        positions: [
          {
            title: "Engagement Manager",
            startDate: "2021-09-07",
            projects: [
              {
                name: "Midwest DC network redesign",
                description:
                  "Led a four-DC redesign for a CPG client. Landed cost fell 11% and OTIF rose from 91% to 96.4% without adding inventory days.",
                skills: [
                  "Issue Trees",
                  "Inventory Optimization",
                  "Hypothesis-Driven Problem Solving",
                  "Stakeholder Management",
                ],
              },
              {
                name: "S&OP reset",
                description:
                  "Rebuilt the monthly planning cadence across sales, supply, and finance. Forecast MAPE dropped from 34% to 19%; bias flipped from +8% to +1%.",
                skills: ["Demand Planning", "Change Management", "Slide Storytelling"],
              },
              {
                name: "Changeover kaizen at two plants",
                description:
                  "Cut average changeover from 74 minutes to 41 on the constraint lines. Released 6.2 hours of weekly capacity without a capex request.",
                skills: ["Lean Manufacturing", "Change Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Fieldstone Consulting",
        description:
          "Midwest firm that sold 'operational excellence' and meant plants. Lina was the associate who stayed for the second shift.",
        location: "Chicago, IL",
        startDate: "2016-09-06",
        endDate: "2021-08-20",
        positions: [
          {
            title: "Associate",
            startDate: "2016-09-06",
            endDate: "2021-08-20",
            projects: [
              {
                name: "Spare-parts inventory policy",
                description:
                  "Reset min/max on 4,200 SKUs. Service on critical parts rose to 98.1% while stores inventory fell 17%.",
                skills: [
                  "Inventory Optimization",
                  "Issue Trees",
                  "Hypothesis-Driven Problem Solving",
                ],
              },
              {
                name: "Supervisor standard-work rollout",
                description:
                  "Wrote the leader standard work and coached 22 supervisors. Audit scores held above 80% at 90 days; the boards were still in use at the six-month revisit.",
                skills: ["Lean Manufacturing", "Change Management", "Slide Storytelling"],
              },
              {
                name: "Demand-review pilot",
                description:
                  "Stood up a weekly demand review for a seasonal brand. Expedite freight fell 22% in the first peak season.",
                skills: ["Demand Planning", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Illinois Chicago",
        degree: "B.S. Industrial Engineering",
        dateAwarded: "2014-05-11",
      },
      {
        school: "Northwestern University, Kellogg School of Management",
        degree: "M.B.A., Operations concentration",
        dateAwarded: "2016-06-18",
      },
    ],
    certifications: [
      {
        name: "Lean Six Sigma Black Belt",
        issuer: "American Society for Quality",
        dateAwarded: "2018-03-22",
        credentialId: "ASQ-BB-LO-0322",
      },
      {
        name: "Certified in Planning and Inventory Management (CPIM)",
        issuer: "ASCM",
        dateAwarded: "2020-11-14",
        credentialId: "CPIM-LOKONKWO-2020",
      },
    ],
    featuredProjects: [
      {
        name: "Network redesign issue tree",
        description:
          "<p>Public version of the landed-cost tree Oakline used on the Midwest DC case: service, inventory, and freight as separate branches, with the decision that actually moved a DC.</p>",
        links: [
          { label: "Issue tree", url: "https://www.example.com/lina-okonkwo/network-tree" },
          { label: "S&OP cadence", url: "https://www.example.com/lina-okonkwo/sop-cadence" },
        ],
        skills: ["Issue Trees", "Inventory Optimization", "Demand Planning"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "management-consulting",
    name: "Theo Marchetti",
    title: "Principal",
    location: "Boston, MA",
    siteDescription:
      "Principal for operations excellence with manufacturing clients. Throughput, yield, and the operating system that still runs after the team flies home.",
    summary:
      "<p>Sells and leads manufacturing transformations that have to print in the P&amp;L. Throughput, yield, and the management system are the product; a lean tour is not.</p><p>At Halcyon, led four multi-plant programs that released $86M in annualized conversion cost and lifted OEE 7–12 points on constraint assets. Previously built Northbridge's ops excellence practice from plant diagnostics into a booked pipeline.</p>",
    socials: [
      { platform: "linkedin.com", ref: "theo-marchetti" },
      { platform: "website", ref: "https://theomarchetti.example.com" },
    ],
    skills: [
      {
        name: "Lean Manufacturing",
        description:
          "Flow, pull, and the constraint. Has shut down a showcase cell that did not move the bottleneck.",
        yearStarted: 2010,
      },
      {
        name: "Six Sigma",
        description:
          "DMAIC on yield and scrap with process owners who keep the control plan. Not a belt collection.",
        yearStarted: 2011,
      },
      {
        name: "Hypothesis-Driven Problem Solving",
        description:
          "Diagnoses a plant in two weeks: where the loss is, which loss is a project, and which is a management-system gap.",
        yearStarted: 2012,
      },
      {
        name: "Change Management",
        description:
          "Implements with the value-stream leader. Sponsorship is a weekly Gemba, not a kickoff email.",
        yearStarted: 2013,
      },
      {
        name: "Organizational Design",
        description:
          "Redesigns the ops org so process engineers and supervisors are not two companies. Role charters that survive the first reorg rumor.",
        yearStarted: 2016,
      },
      {
        name: "Slide Storytelling",
        description:
          "Board packs that show the loss tree and the run-rate, then stop. The appendix holds the ANOVA.",
        yearStarted: 2012,
      },
      {
        name: "Stakeholder Management",
        description:
          "Plant managers, union stewards, and the PE operating partner. Keeps the program from becoming a scorecard war.",
        yearStarted: 2014,
      },
      {
        name: "Production Planning",
        description:
          "Finite scheduling and the frozen horizon that sales will actually honor. Planning is an ops system, not an MRP setting.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Halcyon Partners",
        description:
          "Boston firm that takes PE-backed manufacturers through a two-year operating-system build. Theo is the principal who still walks the constraint on Monday morning.",
        location: "Boston, MA",
        startDate: "2020-10-05",
        positions: [
          {
            title: "Principal",
            startDate: "2020-10-05",
            projects: [
              {
                name: "Four-plant conversion-cost program",
                description:
                  "Led a PE portfolio program across four plants. Released $86M annualized conversion cost; constraint OEE rose 7–12 points. Two plants hit the year-two run-rate a quarter early.",
                skills: [
                  "Lean Manufacturing",
                  "Six Sigma",
                  "Stakeholder Management",
                  "Change Management",
                ],
              },
              {
                name: "Ops organization redesign",
                description:
                  "Collapsed a matrix that had process engineers reporting to a central COE. Time-to-close a yield action fell from 19 days to 6; attrition in the supervisor bench dropped 28%.",
                skills: ["Organizational Design", "Change Management", "Slide Storytelling"],
              },
              {
                name: "Frozen-horizon planning reset",
                description:
                  "Installed a two-week frozen horizon and a weekly SIOP. Expedite overtime fell 31%; on-time start on the constraint rose from 72% to 91%.",
                skills: [
                  "Production Planning",
                  "Hypothesis-Driven Problem Solving",
                  "Stakeholder Management",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Northbridge Consulting",
        description:
          "Boston ops practice that started as plant diagnostics and became a booked transformation pipeline. Theo built the product.",
        location: "Boston, MA",
        startDate: "2012-09-04",
        endDate: "2020-09-15",
        positions: [
          {
            title: "Engagement Manager",
            startDate: "2016-07-11",
            endDate: "2020-09-15",
            projects: [
              {
                name: "Yield DMAIC on a coating line",
                description:
                  "Cut first-pass yield loss 4.6 points. Control plan held at 180 days; scrap dollars fell $4.1M annualized.",
                skills: ["Six Sigma", "Lean Manufacturing", "Hypothesis-Driven Problem Solving"],
              },
              {
                name: "Plant diagnostic product",
                description:
                  "Productized the two-week diagnostic Northbridge sold 22 times. Average identified loss was 9–14% of conversion cost; 70% converted to a transformation.",
                skills: [
                  "Hypothesis-Driven Problem Solving",
                  "Slide Storytelling",
                  "Organizational Design",
                ],
              },
            ],
          },
          {
            title: "Consultant",
            startDate: "2012-09-04",
            endDate: "2016-07-10",
            projects: [
              {
                name: "SMED on a stamping cell",
                description:
                  "Cut changeover from 96 minutes to 38. Released a Saturday shift; overtime on that value stream fell 24%.",
                skills: ["Lean Manufacturing", "Change Management"],
              },
              {
                name: "Weekly production wheel",
                description:
                  "Replaced daily reshuffles with a published wheel. Schedule adherence rose from 61% to 84% in 10 weeks.",
                skills: ["Production Planning", "Stakeholder Management", "Slide Storytelling"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Worcester Polytechnic Institute",
        degree: "B.S. Mechanical Engineering",
        dateAwarded: "2010-05-15",
      },
      {
        school: "MIT Sloan School of Management",
        degree: "M.B.A.",
        dateAwarded: "2012-06-08",
      },
    ],
    certifications: [
      {
        name: "Lean Six Sigma Master Black Belt",
        issuer: "American Society for Quality",
        dateAwarded: "2017-09-09",
        credentialId: "ASQ-MBB-TM-0909",
      },
      {
        name: "Project Management Professional (PMP)",
        issuer: "Project Management Institute",
        dateAwarded: "2019-04-26",
        credentialId: "PMP-MARCHETTI-1926",
      },
    ],
    featuredProjects: [
      {
        name: "Two-week plant diagnostic",
        description:
          "<p>The loss-tree method Halcyon still sells: where the hours go, which losses are projects, and which are a management-system gap. Includes the board pack that stops at the run-rate.</p>",
        links: [
          { label: "Diagnostic outline", url: "https://www.example.com/theo-marchetti/diagnostic" },
          { label: "Loss tree", url: "https://www.example.com/theo-marchetti/loss-tree" },
        ],
        skills: ["Hypothesis-Driven Problem Solving", "Lean Manufacturing", "Slide Storytelling"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "management-consulting",
    name: "Sabine Keller",
    title: "Associate",
    location: "San Francisco, CA",
    siteDescription:
      "Associate on digital transformation engagements. Operating models, adoption, and the workstreams that do not end at a slide titled 'roadmap.'",
    summary:
      "<p>Staffs digital transformation for mid-market software and industrial clients who already bought the licenses. The work is operating-model design, adoption, and the process that has to change before the tool does anything.</p><p>At Redwood, led workstreams that moved a CPQ rollout from 18% to 71% weekly active use and cut quote cycle time 36%. Previously at Vesper, sized markets and built the issue trees partners used in the room.</p>",
    socials: [
      { platform: "linkedin.com", ref: "sabine-keller" },
      { platform: "medium.com", ref: "sabinekeller" },
      { platform: "github.com", ref: "skeller-notes" },
    ],
    skills: [
      {
        name: "Hypothesis-Driven Problem Solving",
        description:
          "Tests whether a 'digital' problem is a process, a skill, or a system. Will not recommend another license until the hypothesis is written.",
        yearStarted: 2021,
      },
      {
        name: "Change Management",
        description:
          "Adoption plans with named owners, office hours, and a sunset for the shadow spreadsheet. Usage is the metric.",
        yearStarted: 2022,
      },
      {
        name: "Issue Trees",
        description:
          "Decomposes cycle time and leakage so the CRM, the CPQ, and the handoff are not one workstream.",
        yearStarted: 2021,
      },
      {
        name: "Slide Storytelling",
        description:
          "Steering decks that force a decision on the page. Roadmaps without an owner do not ship.",
        yearStarted: 2021,
      },
      {
        name: "Stakeholder Management",
        description:
          "Product, sales ops, and the plant IT lead who was not in the RFP. Keeps the working team from splitting into two transformations.",
        yearStarted: 2022,
      },
      {
        name: "Market Sizing",
        description:
          "TAM/SAM that a partner can defend. Bottom-up from accounts and win rates, not a Gartner screenshot.",
        yearStarted: 2021,
      },
      {
        name: "Organizational Design",
        description:
          "Role charters for the digital PMO and the process owners who remain after the integrator leaves.",
        yearStarted: 2023,
      },
      {
        name: "Program Management",
        description:
          "RAID logs, decision memos, and a weekly that does not become a status museum.",
        yearStarted: 2022,
      },
    ],
    companies: [
      {
        name: "Redwood Digital Partners",
        description:
          "San Francisco boutique that takes mid-market companies through the year after they bought the platform. Sabine owns the adoption workstreams.",
        location: "San Francisco, CA",
        startDate: "2023-01-09",
        positions: [
          {
            title: "Associate",
            startDate: "2023-01-09",
            projects: [
              {
                name: "CPQ adoption turnaround",
                description:
                  "Took a stalled CPQ from 18% to 71% weekly active use in 16 weeks. Quote cycle time fell 36%; shadow spreadsheets on the named team went from 14 to 2.",
                skills: ["Change Management", "Program Management", "Stakeholder Management"],
              },
              {
                name: "Quote-to-cash issue tree",
                description:
                  "Split leakage across pricing, approval, and handoff. The pricing branch paid back; the CRM rewrite the client wanted did not make the first wave.",
                skills: ["Issue Trees", "Hypothesis-Driven Problem Solving", "Slide Storytelling"],
              },
              {
                name: "Digital PMO role design",
                description:
                  "Wrote charters for a four-person PMO and process owners in sales ops. Decision latency on the steering committee fell from 19 days to 6.",
                skills: ["Organizational Design", "Program Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Vesper Strategy",
        description:
          "Bay Area strategy shop where associates built the trees and the TAM. Sabine's files were the ones partners took into the room unedited.",
        location: "San Francisco, CA",
        startDate: "2021-08-16",
        endDate: "2022-12-20",
        positions: [
          {
            title: "Business Analyst",
            startDate: "2021-08-16",
            endDate: "2022-12-20",
            projects: [
              {
                name: "Industrial software TAM",
                description:
                  "Bottom-up SAM for a maintenance-software client across 1,400 plants. Board used the number in the Series C; variance vs. first-year bookings was 8%.",
                skills: [
                  "Market Sizing",
                  "Hypothesis-Driven Problem Solving",
                  "Slide Storytelling",
                ],
              },
              {
                name: "Process vs. platform diagnostic",
                description:
                  "Showed that 60% of a 'CRM problem' was an approval policy. Client paused a $2.4M license expansion; restarted after the policy change.",
                skills: ["Issue Trees", "Change Management", "Organizational Design"],
              },
              {
                name: "Steering-pack standard",
                description:
                  "Templated the weekly decision memo Vesper still uses. Meetings that ended without a decision fell from 4 in 10 to 1 in 10 on her cases.",
                skills: ["Slide Storytelling", "Program Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "ETH Zurich",
        degree: "B.Sc. Mechanical Engineering",
        dateAwarded: "2019-09-20",
      },
      {
        school: "Stanford University",
        degree: "M.S. Management Science and Engineering",
        dateAwarded: "2021-06-13",
      },
    ],
    certifications: [
      {
        name: "Prosci Change Management Practitioner",
        issuer: "Prosci",
        dateAwarded: "2023-04-18",
        credentialId: "PROSCI-SK-0418",
      },
      {
        name: "Professional Scrum Master I",
        issuer: "Scrum.org",
        dateAwarded: "2022-02-11",
        credentialId: "PSM1-SKELLER-0211",
      },
    ],
    featuredProjects: [
      {
        name: "Adoption-before-roadmap note",
        description:
          "<p>A short public note on why digital transformations fail at the spreadsheet, not the license. Includes the CPQ usage curve and the issue tree that kept a CRM rewrite out of wave one.</p>",
        links: [
          { label: "Essay", url: "https://www.example.com/sabine-keller/adoption" },
          { label: "Issue tree", url: "https://www.example.com/sabine-keller/q2c-tree" },
        ],
        skills: ["Change Management", "Issue Trees", "Hypothesis-Driven Problem Solving"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "management-consulting",
    name: "Rohan Mehta",
    title: "Manager",
    location: "Washington, DC",
    siteDescription:
      "Manager for public-sector strategy. Agency operating models, budget choices, and the memos that survive a hearing.",
    summary:
      "<p>Leads public-sector strategy for civilian agencies and large cities. The product is a decision the budget office can defend: a program to keep, a process to retire, or an org chart that matches the statute.</p><p>At Capitol Ridge, ran a grants-portfolio review that redirected $180M toward higher-performing programs and a permitting redesign that cut median cycle time 29%. Previously at Argent, built the policy trees partners used in front of deputy secretaries.</p>",
    socials: [
      { platform: "linkedin.com", ref: "rohan-mehta-dc" },
      { platform: "website", ref: "https://rohanmehta.example.com" },
      { platform: "medium.com", ref: "rohanmehta" },
    ],
    skills: [
      {
        name: "Policy Analysis",
        description:
          "Reads statute, guidance, and the appropriation that actually funds the work. Will not recommend a program the account will not pay for.",
        yearStarted: 2016,
      },
      {
        name: "Hypothesis-Driven Problem Solving",
        description:
          "Frames agency problems as testable bets a deputy can accept or kill in a steering meeting.",
        yearStarted: 2016,
      },
      {
        name: "Issue Trees",
        description:
          "Decomposes cost, service, and statutory constraint so a 'modernization' is not one workstream.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Career SES, politicals, and the union that was not in the RFP. Keeps the working group from becoming two governments.",
        yearStarted: 2017,
      },
      {
        name: "Slide Storytelling",
        description:
          "Hearing-ready packs. One governing thought, a decision, and an appendix the IG can audit.",
        yearStarted: 2016,
      },
      {
        name: "Program Evaluation",
        description:
          "Outcome metrics and the counterfactual a budget office will accept. Evaluation is a decision tool, not a journal article.",
        yearStarted: 2018,
      },
      {
        name: "Budget Formulation",
        description:
          "Program justifications, passbacks, and the trade that fits inside a mark. Has written the table that survived OMB review.",
        yearStarted: 2017,
      },
      {
        name: "Organizational Design",
        description:
          "Role charters that match statute and the work. Will not add a PMO that becomes a fourth clearance.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Capitol Ridge Associates",
        description:
          "Washington strategy firm that still writes memos agencies can take into a hearing. Rohan runs the civilian and city engagements.",
        location: "Washington, DC",
        startDate: "2021-05-03",
        positions: [
          {
            title: "Manager",
            startDate: "2021-05-03",
            projects: [
              {
                name: "Grants-portfolio review",
                description:
                  "Evaluated 42 programs against outcome evidence and statutory fit. Redirected $180M toward higher-performing awards; six programs sunset on the client's own recommendation.",
                skills: [
                  "Program Evaluation",
                  "Budget Formulation",
                  "Policy Analysis",
                  "Slide Storytelling",
                ],
              },
              {
                name: "City permitting redesign",
                description:
                  "Mapped a 14-step commercial permit path and cut median cycle time 29%. Two clearances were statutory; five were habit. The habit ones left.",
                skills: [
                  "Issue Trees",
                  "Hypothesis-Driven Problem Solving",
                  "Stakeholder Management",
                  "Organizational Design",
                ],
              },
              {
                name: "Agency operating-model charter",
                description:
                  "Redesigned a civilian bureau's delivery org to match a new authorization. Time-to-award fell 22%; the IG later used the charter as the control narrative.",
                skills: ["Organizational Design", "Policy Analysis", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Argent Public Partners",
        description:
          "DC boutique that staffed policy trees for deputy secretaries. Rohan was the associate whose memos did not come back with 'please add an option C.'",
        location: "Washington, DC",
        startDate: "2016-09-06",
        endDate: "2021-04-30",
        positions: [
          {
            title: "Associate",
            startDate: "2016-09-06",
            endDate: "2021-04-30",
            projects: [
              {
                name: "Passback options memo",
                description:
                  "Wrote the three-option mark for a $2.1B account. Leadership took option B; the table survived OMB with a 4% trim instead of a program kill.",
                skills: ["Budget Formulation", "Policy Analysis", "Slide Storytelling"],
              },
              {
                name: "Outcome-metric redesign",
                description:
                  "Replaced activity counts with four outcome measures a budget office accepted. Two grantees lost continuation funding on evidence, not politics.",
                skills: ["Program Evaluation", "Hypothesis-Driven Problem Solving", "Issue Trees"],
              },
              {
                name: "Interagency working-group reset",
                description:
                  "Collapsed four overlapping workstreams into one decision body. Duplicate requests to the field dropped 40% in a quarter.",
                skills: ["Stakeholder Management", "Organizational Design", "Issue Trees"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgetown University, Walsh School of Foreign Service",
        degree: "B.S.F.S. International Political Economy",
        dateAwarded: "2014-05-17",
      },
      {
        school: "Johns Hopkins University, School of Advanced International Studies",
        degree: "M.A. International Economics and Strategic Studies",
        dateAwarded: "2016-05-26",
      },
    ],
    certifications: [
      {
        name: "Project Management Professional (PMP)",
        issuer: "Project Management Institute",
        dateAwarded: "2020-07-31",
        credentialId: "PMP-MEHTA-2031",
      },
      {
        name: "Certified Government Financial Manager (CGFM)",
        issuer: "Association of Government Accountants",
        dateAwarded: "2022-11-04",
        credentialId: "CGFM-RM-1104",
      },
    ],
    featuredProjects: [
      {
        name: "Hearing-ready options memo",
        description:
          "<p>A public, anonymized three-option mark: statute, outcome evidence, and the budget table that survived review. Written for managers who have to put a number on a page before Friday.</p>",
        links: [
          { label: "Options memo", url: "https://www.example.com/rohan-mehta/options-memo" },
          { label: "Evaluation frame", url: "https://www.example.com/rohan-mehta/evaluation" },
        ],
        skills: ["Policy Analysis", "Budget Formulation", "Program Evaluation"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "commercial-banking",
    name: "Camille Duval",
    title: "Director, Middle Market Banking",
    location: "Charlotte, NC",
    siteDescription:
      "Middle-market banking director. Relationship portfolios, hold levels, and the calls that keep a $40M credit from becoming a surprise.",
    summary:
      "<p>Runs a Carolinas middle-market book: C&amp;I, owner-managed industrials, and the sponsors who still want a banker who answers. Credit is a team sport; the job is a portfolio that earns its hold without surprising the committee in Q4.</p><p>At Catawba, grew a $1.1B commitment book to $1.6B with criticized assets under 2.1%. Previously built Sycamore's treasury-attached calling model and the joint credit-treasury reviews that stuck.</p>",
    socials: [
      { platform: "linkedin.com", ref: "camille-duval" },
      { platform: "website", ref: "https://camilleduval.example.com" },
    ],
    skills: [
      {
        name: "Relationship Management",
        description:
          "Owns the calling cadence and the annual review that is not a surprise. Clients return because the banker already knows the covenant conversation.",
        yearStarted: 2010,
      },
      {
        name: "Commercial Lending",
        description:
          "Structures revolvers, terms, and the accordion the sponsor will ask for in month 14. Hold levels that match the bank's appetite, not the pitch.",
        yearStarted: 2010,
      },
      {
        name: "Credit Analysis",
        description:
          "Cash flow through-cycle, customer concentration, and the add-backs that will not survive a downturn memo.",
        yearStarted: 2010,
      },
      {
        name: "Loan Structuring",
        description:
          "Borrowing bases, springing covenants, and the carve-outs counsel fights for. Structures the package; does not leave the grid to the credit memo alone.",
        yearStarted: 2012,
      },
      {
        name: "Treasury Management",
        description:
          "Attaches lockbox, ACH, and the operating accounts that make the relationship sticky. Treasury spread is part of the RAROC, not a product afterthought.",
        yearStarted: 2014,
      },
      {
        name: "Financial Underwriting",
        description:
          "Spreads that match tax returns and the QoE the sponsor actually commissioned. Will not underwrite a story the statements do not support.",
        yearStarted: 2011,
      },
      {
        name: "Stakeholder Management",
        description:
          "Credit, treasury, and the board member who golfs with the borrower. Keeps the bank from negotiating in two rooms.",
        yearStarted: 2013,
      },
      {
        name: "Risk Rating",
        description:
          "Owns the annual rating and the watchlist trigger. Criticized assets on her book stayed under 2.1% through a rate-up cycle.",
        yearStarted: 2012,
      },
    ],
    companies: [
      {
        name: "Catawba Mid-Market Bank",
        description:
          "Charlotte commercial bank that still underwrites owner-managed industrials. Camille runs the Carolinas book and the calling model the region copied.",
        location: "Charlotte, NC",
        startDate: "2020-08-03",
        positions: [
          {
            title: "Director, Middle Market Banking",
            startDate: "2020-08-03",
            projects: [
              {
                name: "Carolinas portfolio build",
                description:
                  "Grew commitments from $1.1B to $1.6B across 48 relationships. Criticized assets stayed under 2.1%; net interest plus treasury fee income rose 24%.",
                skills: [
                  "Relationship Management",
                  "Commercial Lending",
                  "Risk Rating",
                  "Treasury Management",
                ],
              },
              {
                name: "Treasury-attached calling model",
                description:
                  "Required an operating-account and lockbox conversation on every annual review. Treasury penetration rose from 41% to 73% of the book; deposit beta on the book lagged the region by 18 bps.",
                skills: [
                  "Treasury Management",
                  "Stakeholder Management",
                  "Relationship Management",
                ],
              },
              {
                name: "Watchlist early-warning cadence",
                description:
                  "Installed a monthly rating huddle on 12 names. Two amendments closed before a missed test; no unexpected downgrade reached committee in 2023.",
                skills: ["Risk Rating", "Credit Analysis", "Loan Structuring"],
              },
            ],
          },
        ],
      },
      {
        name: "Sycamore Commercial",
        description:
          "Charlotte middle-market shop that treated treasury as a product brochure. Camille made it a calling motion.",
        location: "Charlotte, NC",
        startDate: "2014-03-03",
        endDate: "2020-07-31",
        positions: [
          {
            title: "Vice President, Relationship Manager",
            startDate: "2014-03-03",
            endDate: "2020-07-31",
            projects: [
              {
                name: "Owner-managed industrials book",
                description:
                  "Built a 22-name book averaging $18M hold. Zero charge-offs; two successful sponsor exits refinanced in-house.",
                skills: ["Commercial Lending", "Financial Underwriting", "Relationship Management"],
              },
              {
                name: "Borrowing-base rebuild",
                description:
                  "Reset ineligible definitions after a dilution spike. Availability fell 9% on paper and saved a $6M over-advance that would have been a surprise.",
                skills: ["Loan Structuring", "Credit Analysis", "Financial Underwriting"],
              },
              {
                name: "Joint credit-treasury reviews",
                description:
                  "Paired annual credit reviews with treasury QBRs. Cross-sell of ACH and fraud tools rose 35%; one fraud event was caught on the new dual-control.",
                skills: ["Treasury Management", "Stakeholder Management", "Risk Rating"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of North Carolina at Charlotte",
        degree: "B.S. Finance",
        dateAwarded: "2008-05-10",
      },
      {
        school: "Wake Forest University, School of Business",
        degree: "M.B.A.",
        dateAwarded: "2012-05-14",
      },
    ],
    certifications: [
      {
        name: "Credit Risk Certification (CRC)",
        issuer: "Risk Management Association",
        dateAwarded: "2016-06-17",
        credentialId: "RMA-CRC-CD-0617",
      },
      {
        name: "Certified Treasury Professional (CTP)",
        issuer: "Association for Financial Professionals",
        dateAwarded: "2018-10-05",
        credentialId: "CTP-DUVAL-1005",
      },
    ],
    featuredProjects: [
      {
        name: "Treasury-attached calling playbook",
        description:
          "<p>The annual-review script Catawba copied across the region: operating accounts, lockbox, and the RAROC math that makes treasury part of the hold decision.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/camille-duval/calling-playbook" },
          { label: "Watchlist cadence", url: "https://www.example.com/camille-duval/watchlist" },
        ],
        skills: ["Relationship Management", "Treasury Management", "Risk Rating"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "commercial-banking",
    name: "Andre Whitfield",
    title: "Vice President, Commercial Credit",
    location: "Atlanta, GA",
    siteDescription:
      "Commercial credit vice president. Spreads, ratings, and the memos that keep a committee from buying a story the cash flow will not support.",
    summary:
      "<p>Underwrites C&amp;I and sponsor credits for a Southeast commercial bank. The memo is the product: cash flow through-cycle, the add-backs that die in a downturn, and a rating the ALLL can live with.</p><p>At Magnolia Trust, cleared $2.4B of commitments with a 4% return-to-analyst rate and no surprises at exam. Previously built Red Clay's spreading standard and the early-warning triggers that caught two covenant misses a month early.</p>",
    socials: [
      { platform: "linkedin.com", ref: "andre-whitfield" },
      { platform: "website", ref: "https://andrewhitfield.example.com" },
      { platform: "medium.com", ref: "andrewhitfield" },
    ],
    skills: [
      {
        name: "Credit Analysis",
        description:
          "Cash flow, concentration, and the quality of earnings a sponsor memo will not survive. Writes the page the committee reads twice.",
        yearStarted: 2015,
      },
      {
        name: "Risk Rating",
        description:
          "Facility and obligor ratings that match the ALLL. Exam findings on his files have been observations, not matters requiring attention.",
        yearStarted: 2016,
      },
      {
        name: "Financial Underwriting",
        description:
          "Spreads to tax returns and audited statements. Will not underwrite a quality-of-earnings add-back the accountants footnoted away.",
        yearStarted: 2015,
      },
      {
        name: "Commercial Lending",
        description:
          "Understands hold, participation, and when a hold-level yes is a syndication no. Partners with the RM; does not rubber-stamp the term sheet.",
        yearStarted: 2015,
      },
      {
        name: "Loan Structuring",
        description:
          "Covenant grids, borrowing bases, and the springing tests that should have been in the first draft.",
        yearStarted: 2016,
      },
      {
        name: "Financial Modeling",
        description:
          "Through-cycle cases and the sensitivity the committee asks for after lunch. Models that an analyst can defend without Andre on the phone.",
        yearStarted: 2015,
      },
      {
        name: "Financial Reporting",
        description:
          "Reads 10-Ks, QoE, and the footnote that changes the leverage math. Flags the lease and the related party before the RM does.",
        yearStarted: 2015,
      },
      {
        name: "Internal Controls",
        description:
          "Credit process that survives exam: dual review, exception logs, and the file that is complete before the deadline, not after.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Magnolia Trust Commercial",
        description:
          "Atlanta commercial bank whose credit shop still writes long memos. Andre is the VP who clears the book and the exam.",
        location: "Atlanta, GA",
        startDate: "2021-02-16",
        positions: [
          {
            title: "Vice President, Commercial Credit",
            startDate: "2021-02-16",
            projects: [
              {
                name: "Commitment clearing program",
                description:
                  "Cleared $2.4B of C&I and sponsor commitments with a 4% return-to-analyst rate. Average time-to-yes fell from 18 days to 11 without a change in approval quality.",
                skills: [
                  "Credit Analysis",
                  "Financial Underwriting",
                  "Commercial Lending",
                  "Internal Controls",
                ],
              },
              {
                name: "Rating and ALLL alignment",
                description:
                  "Recalibrated obligor ratings against 6 years of loss history. Watchlist migration matched exam expectations; no MRA on credit administration in the last two exams.",
                skills: ["Risk Rating", "Financial Reporting", "Internal Controls"],
              },
              {
                name: "Through-cycle model pack",
                description:
                  "Standardized downside cases for sponsor LBOs. Two deals were declined on cash-flow coverage that the upside memo had buried; both later needed amendments at other banks.",
                skills: ["Financial Modeling", "Credit Analysis", "Loan Structuring"],
              },
            ],
          },
        ],
      },
      {
        name: "Red Clay Credit",
        description:
          "Atlanta credit boutique that spread statements for community banks. Andre built the standard the analysts still open first.",
        location: "Atlanta, GA",
        startDate: "2015-06-01",
        endDate: "2021-02-12",
        positions: [
          {
            title: "Credit Analyst",
            startDate: "2015-06-01",
            endDate: "2021-02-12",
            projects: [
              {
                name: "Spreading standard",
                description:
                  "Wrote the spreading guide that cut analyst rewrite time 40%. Exception logs fell from 12 per file to 3 after the related-party checklist landed.",
                skills: ["Financial Underwriting", "Financial Reporting", "Internal Controls"],
              },
              {
                name: "Early-warning triggers",
                description:
                  "Built covenant and liquidity triggers that flagged two missed tests a month early. Both closed as amendments, not defaults.",
                skills: ["Risk Rating", "Loan Structuring", "Credit Analysis"],
              },
              {
                name: "Sponsor add-back library",
                description:
                  "Catalogued add-backs that survived vs. died in downturn files. New sponsor memos stopped treating run-rate EBITDA as a fact.",
                skills: ["Financial Modeling", "Commercial Lending", "Credit Analysis"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Morehouse College",
        degree: "B.A. Economics",
        dateAwarded: "2013-05-19",
      },
      {
        school: "Emory University, Goizueta Business School",
        degree: "M.B.A., Finance",
        dateAwarded: "2015-05-11",
      },
    ],
    certifications: [
      {
        name: "Credit Risk Certification (CRC)",
        issuer: "Risk Management Association",
        dateAwarded: "2018-05-24",
        credentialId: "RMA-CRC-AW-0524",
      },
      {
        name: "CFA Level I passed",
        issuer: "CFA Institute",
        dateAwarded: "2019-08-20",
        credentialId: "CFA-L1-WHITFIELD",
      },
    ],
    featuredProjects: [
      {
        name: "Through-cycle credit memo outline",
        description:
          "<p>The Magnolia Trust memo skeleton: cash flow, add-backs that die, and the rating page the ALLL can live with. Written so an analyst can defend the file without a late-night rewrite.</p>",
        links: [
          { label: "Memo outline", url: "https://www.example.com/andre-whitfield/memo" },
          { label: "Add-back library", url: "https://www.example.com/andre-whitfield/addbacks" },
        ],
        skills: ["Credit Analysis", "Financial Underwriting", "Risk Rating"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "commercial-banking",
    name: "Priya Shah",
    title: "Relationship Manager",
    location: "Dallas, TX",
    siteDescription:
      "Relationship manager for treasury and lending. Operating accounts, revolvers, and the QBR that makes the credit conversation happen before covenant season.",
    summary:
      "<p>Covers North Texas middle-market companies that want one banker for the revolver and the operating account. Treasury is not a cross-sell slide; it is how the relationship earns its keep when the loan is quiet.</p><p>At Trinity River, grew a 31-name book to $420M commitments with treasury fees up 38% and no past-due borrowing-base certificates. Previously built Alamo's lockbox and fraud-control offering that kept two clients after a competitor priced the loan tighter.</p>",
    socials: [
      { platform: "linkedin.com", ref: "priya-shah-rm" },
      { platform: "website", ref: "https://priyashah.example.com" },
    ],
    skills: [
      {
        name: "Treasury Management",
        description:
          "Lockbox, ACH, wires, and the fraud controls that keep a controller from leaving after one incident. Prices the operating account as part of the relationship, not a giveaway.",
        yearStarted: 2018,
      },
      {
        name: "Relationship Management",
        description:
          "QBRs that mix credit, treasury, and the next capex. Clients stay because the banker already has the certificate and the cash forecast.",
        yearStarted: 2018,
      },
      {
        name: "Commercial Lending",
        description:
          "Revolvers, terms, and the delayed-draw the CFO asked for after the plant tour. Hold levels that match the bank, not the competitor's teaser.",
        yearStarted: 2018,
      },
      {
        name: "Loan Structuring",
        description:
          "Borrowing bases and reporting that a controller can actually produce. A certificate that arrives late is a structure problem.",
        yearStarted: 2019,
      },
      {
        name: "Credit Analysis",
        description:
          "Reads the monthly package before the RM meeting. Flags dilution and concentration so credit is not hearing it first from the analyst.",
        yearStarted: 2018,
      },
      {
        name: "Stakeholder Management",
        description:
          "CFO, controller, and the credit officer who wants the file early. Keeps treasury and lending from selling two different banks.",
        yearStarted: 2019,
      },
      {
        name: "CRM",
        description:
          "Pipeline and calling notes that a backup banker can run. If it is not in the CRM, it did not happen.",
        yearStarted: 2018,
      },
      {
        name: "Financial Modeling",
        description:
          "Simple 13-week and annual cash views she builds with the client. The model is a conversation, not a banker file the CFO never sees.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Trinity River Bank",
        description:
          "Dallas commercial bank that still wants the operating account with the revolver. Priya's book is the proof the model works.",
        location: "Dallas, TX",
        startDate: "2022-04-04",
        positions: [
          {
            title: "Relationship Manager",
            startDate: "2022-04-04",
            projects: [
              {
                name: "North Texas book build",
                description:
                  "Grew a 31-name book to $420M commitments. Treasury fee income rose 38%; no past-due borrowing-base certificates in six consecutive quarters.",
                skills: [
                  "Relationship Management",
                  "Commercial Lending",
                  "Treasury Management",
                  "CRM",
                ],
              },
              {
                name: "Joint credit-treasury QBR",
                description:
                  "Installed a quarterly review that opens with cash and covenants, then products. Two amendments were negotiated in the QBR instead of after a miss.",
                skills: ["Stakeholder Management", "Credit Analysis", "Loan Structuring"],
              },
              {
                name: "Client 13-week cash views",
                description:
                  "Built shared 13-week models with six seasonal borrowers. Over-advance requests fell from 5 a year to 1; two clients used the view to time a term-out.",
                skills: ["Financial Modeling", "Treasury Management", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Alamo Treasury Partners",
        description:
          "Dallas treasury shop that sold lockbox and fraud tools to companies whose banks treated cash as an afterthought. Priya learned the controller's week.",
        location: "Dallas, TX",
        startDate: "2018-01-08",
        endDate: "2022-03-31",
        positions: [
          {
            title: "Treasury Associate",
            startDate: "2018-01-08",
            endDate: "2022-03-31",
            projects: [
              {
                name: "Lockbox and fraud-control offer",
                description:
                  "Packaged lockbox, positive pay, and dual-control wires. Two clients stayed after a competitor priced the loan 15 bps tighter; they would not move the operating account.",
                skills: ["Treasury Management", "Stakeholder Management", "CRM"],
              },
              {
                name: "Controller onboarding path",
                description:
                  "Cut new-client treasury implementation from 7 weeks to 18 days. Implementation tickets per client fell 44%.",
                skills: ["Treasury Management", "CRM", "Relationship Management"],
              },
              {
                name: "Seasonal revolver checklist",
                description:
                  "Wrote the borrowing-base and reporting checklist Alamo handed to partner banks. Late certificates on referred names dropped from 18% to 4%.",
                skills: ["Loan Structuring", "Credit Analysis", "Commercial Lending"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "The University of Texas at Dallas",
        degree: "B.S. Accounting and Finance",
        dateAwarded: "2017-05-20",
      },
    ],
    certifications: [
      {
        name: "Certified Treasury Professional (CTP)",
        issuer: "Association for Financial Professionals",
        dateAwarded: "2020-09-18",
        credentialId: "CTP-SHAH-0918",
      },
      {
        name: "Credit Skills Certificate",
        issuer: "Risk Management Association",
        dateAwarded: "2022-06-03",
        credentialId: "RMA-CS-PSHAH-0603",
      },
    ],
    featuredProjects: [
      {
        name: "Joint QBR agenda",
        description:
          "<p>The Trinity River quarterly: cash, covenants, then products. Written so a backup banker can run the meeting and the credit officer is not hearing dilution for the first time.</p>",
        links: [
          { label: "QBR agenda", url: "https://www.example.com/priya-shah/qbr" },
          { label: "13-week template", url: "https://www.example.com/priya-shah/13-week" },
        ],
        skills: ["Relationship Management", "Treasury Management", "Credit Analysis"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "commercial-banking",
    name: "Benito Alvarez",
    title: "Credit Officer",
    location: "Houston, TX",
    siteDescription:
      "Credit officer for energy borrowers. Risk ratings, reserve cases, and the memos that treat a barrel and a well as cash flow, not a logo.",
    summary:
      "<p>Underwrites E&amp;P, midstream, and oilfield services for a Houston commercial book. Ratings move with strip, hedge books, and the AFE the borrower will not discuss in the first meeting.</p><p>At Cypress Bend, recast 38 energy ratings after the 2022 strip move and kept criticized energy assets at 3.4% of the book. Previously built Gulfport's reserve-case template and the process-safety questions that belong in a credit file, not only an insurance binder.</p>",
    socials: [
      { platform: "linkedin.com", ref: "benito-alvarez" },
      { platform: "website", ref: "https://benitoalvarez.example.com" },
      { platform: "medium.com", ref: "benitoalvarez" },
    ],
    skills: [
      {
        name: "Risk Rating",
        description:
          "Obligor and facility ratings that move with strip, hedges, and reserve life. Energy criticized assets on his watch stayed at 3.4% after the 2022 move.",
        yearStarted: 2016,
      },
      {
        name: "Credit Analysis",
        description:
          "PDP vs. PUD, hedge coverage, and the offtake that is a contract vs. a hope. Writes the page that treats a well as cash flow.",
        yearStarted: 2016,
      },
      {
        name: "Commercial Lending",
        description:
          "RBL, midstream revolvers, and the borrowing base that should redetermine before the strip does the work.",
        yearStarted: 2016,
      },
      {
        name: "Financial Underwriting",
        description:
          "Reserve reports, strip decks, and the G&A that does not scale with a $10 move. Will not underwrite a type curve the engineer footnoted.",
        yearStarted: 2016,
      },
      {
        name: "Loan Structuring",
        description:
          "RBL grids, hedge covenants, and the redetermination calendar. Structure is how an energy book survives a strip, not a hope.",
        yearStarted: 2017,
      },
      {
        name: "Financial Modeling",
        description:
          "Reserve cases and the sensitivity that shows when the borrowing base should have already moved.",
        yearStarted: 2016,
      },
      {
        name: "Process Safety",
        description:
          "Reads incident history and PSM findings into the credit file. A blowout is a credit event; it belongs next to the hedges.",
        yearStarted: 2018,
      },
      {
        name: "Industry Coverage",
        description:
          "Gulf Coast E&P, midstream, and OFS. Knows which names are a basin story and which are a balance-sheet story.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Cypress Bend Bank",
        description:
          "Houston commercial bank with an energy book that still redetermines. Benito is the credit officer who owns the ratings when the strip moves.",
        location: "Houston, TX",
        startDate: "2021-06-14",
        positions: [
          {
            title: "Credit Officer",
            startDate: "2021-06-14",
            projects: [
              {
                name: "Energy rating recast",
                description:
                  "Recast 38 energy obligor ratings after the 2022 strip move. Criticized energy assets held at 3.4% of the book; two RBLs were cut at redetermination instead of after a miss.",
                skills: [
                  "Risk Rating",
                  "Credit Analysis",
                  "Commercial Lending",
                  "Industry Coverage",
                ],
              },
              {
                name: "Hedge-covenant rewrite",
                description:
                  "Reset hedge coverage and tenor tests on 11 RBLs. Unhedged production into a redetermination fell 40%; one amendment closed two weeks before a covenant miss.",
                skills: ["Loan Structuring", "Financial Modeling", "Credit Analysis"],
              },
              {
                name: "Process-safety credit addendum",
                description:
                  "Added PSM incident and inspection findings to the standard energy file. Two OFS names were downgraded on repeat findings before an operational event hit the tape.",
                skills: ["Process Safety", "Risk Rating", "Financial Underwriting"],
              },
            ],
          },
        ],
      },
      {
        name: "Gulfport Credit Partners",
        description:
          "Houston credit shop that spread energy names for correspondent banks. Benito built the reserve-case template correspondents still request.",
        location: "Houston, TX",
        startDate: "2016-08-01",
        endDate: "2021-06-11",
        positions: [
          {
            title: "Energy Credit Analyst",
            startDate: "2016-08-01",
            endDate: "2021-06-11",
            projects: [
              {
                name: "Reserve-case template",
                description:
                  "Standardized PDP/PUD cases and strip decks. Correspondent rewrite questions fell 50%; two banks adopted the file as their internal form.",
                skills: ["Financial Modeling", "Financial Underwriting", "Industry Coverage"],
              },
              {
                name: "Midstream offtake review",
                description:
                  "Mapped contract vs. interruptible offtake for 9 gatherers. One credit was declined when 'committed' volumes were interruptible on page 14.",
                skills: ["Credit Analysis", "Commercial Lending", "Loan Structuring"],
              },
              {
                name: "Incident-to-rating bridge",
                description:
                  "Wrote the first process-safety questions Gulfport put in an energy memo. Used on 15 OFS files; three ratings moved on findings, not on EBITDA.",
                skills: ["Process Safety", "Risk Rating", "Credit Analysis"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Houston",
        degree: "B.B.A. Finance",
        dateAwarded: "2014-05-16",
      },
      {
        school: "Texas A&M University",
        degree: "Certificate, Petroleum Economics and Management",
        dateAwarded: "2016-12-09",
      },
    ],
    certifications: [
      {
        name: "Credit Risk Certification (CRC)",
        issuer: "Risk Management Association",
        dateAwarded: "2019-03-15",
        credentialId: "RMA-CRC-BA-0315",
      },
      {
        name: "Energy Risk Professional (ERP)",
        issuer: "Global Association of Risk Professionals",
        dateAwarded: "2022-05-20",
        credentialId: "GARP-ERP-ALVAREZ",
      },
    ],
    featuredProjects: [
      {
        name: "Energy rating recast notes",
        description:
          "<p>Anonymized notes from the 2022 strip recast: how ratings moved with hedges, reserve life, and the two RBLs that were cut at redetermination instead of after a miss.</p>",
        links: [
          { label: "Recast notes", url: "https://www.example.com/benito-alvarez/rating-recast" },
          {
            label: "Reserve-case template",
            url: "https://www.example.com/benito-alvarez/reserve-case",
          },
        ],
        skills: ["Risk Rating", "Financial Modeling", "Industry Coverage"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "healthcare",
    name: "Elena Vasquez",
    title: "Chief Nursing Officer",
    location: "Houston, TX",
    siteDescription:
      "Chief nursing officer for a multi-hospital system. Staffing, safety, and the huddles that keep a never-event from becoming a press release.",
    summary:
      "<p>Leads nursing across a Houston system that still staffs beds the hard way. The work is skill mix, safety, and a professional-practice model that holds on a Saturday night, not a poster in the lobby.</p><p>At Memorial Harbor, cut hospital-acquired pressure injuries 41%, dropped RN turnover from 22% to 14%, and stood up a safety huddle that moved serious safety events from 1.8 to 0.7 per 10,000 adjusted patient days. Previously ran Bayou's house-wide staffing office and the first night-shift council that had a budget.</p>",
    socials: [
      { platform: "linkedin.com", ref: "elena-vasquez-cno" },
      { platform: "website", ref: "https://elenavasquez.example.com" },
    ],
    skills: [
      {
        name: "Nursing Leadership",
        description:
          "Accountable for nursing practice across four hospitals. Sets the staffing standard, the professional-practice model, and the rule that a Saturday night looks like a Tuesday.",
        yearStarted: 2011,
      },
      {
        name: "Patient Safety",
        description:
          "Serious safety event reviews that name a system, not a nurse. Huddles that move a finding before it becomes a never-event.",
        yearStarted: 2012,
      },
      {
        name: "Clinical Operations",
        description:
          "Capacity, boarding, and the discharge barrier that is a nursing problem only until it is a hospital problem. Owns the daily ops huddle with the CMO.",
        yearStarted: 2013,
      },
      {
        name: "Care Coordination",
        description:
          "Length-of-stay and the handoff that keeps a readmission from being a nursing failure. Case management is a partner, not a downstream ticket.",
        yearStarted: 2014,
      },
      {
        name: "Workforce Planning",
        description:
          "Skill mix, float pools, and the pipeline that does not depend on travel at 2x. Turnover is a design problem.",
        yearStarted: 2015,
      },
      {
        name: "HIPAA Compliance",
        description:
          "Minimum-necessary and the workstation habits that fail at 3 a.m. Privacy is a practice standard, not a module.",
        yearStarted: 2011,
      },
      {
        name: "Quality Improvement",
        description:
          "Unit-level PDSA on HAPI, falls, and CLABSI. Improvement that a night-shift nurse can run without a project manager.",
        yearStarted: 2012,
      },
      {
        name: "Stakeholder Management",
        description:
          "Medical staff, the board quality committee, and the union that was not in the press release. Keeps safety work from becoming a blame cycle.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Memorial Harbor Health",
        description:
          "Four-hospital Houston system. Elena is the CNO who still walks a night shift and owns the safety numbers the board reads.",
        location: "Houston, TX",
        startDate: "2020-09-01",
        positions: [
          {
            title: "Chief Nursing Officer",
            startDate: "2020-09-01",
            projects: [
              {
                name: "Serious safety huddle",
                description:
                  "Stood up a daily system huddle with unit-level escalation. Serious safety events fell from 1.8 to 0.7 per 10,000 adjusted patient days in 24 months.",
                skills: [
                  "Patient Safety",
                  "Nursing Leadership",
                  "Stakeholder Management",
                  "Clinical Operations",
                ],
              },
              {
                name: "HAPI reduction collaborative",
                description:
                  "Unit PDSA on hospital-acquired pressure injuries across 18 units. HAPI rate fell 41%; two units held zero for 9 consecutive months.",
                skills: ["Quality Improvement", "Patient Safety", "Care Coordination"],
              },
              {
                name: "RN workforce redesign",
                description:
                  "Built a float pool and a new-grad residency that cut reliance on travel. RN turnover dropped from 22% to 14%; travel spend fell $9.4M annualized.",
                skills: ["Workforce Planning", "Nursing Leadership", "HIPAA Compliance"],
              },
            ],
          },
        ],
      },
      {
        name: "Bayou Medical Center",
        description:
          "Houston community hospital where Elena ran the house-wide staffing office and learned that a night-shift council without a budget is a suggestion box.",
        location: "Houston, TX",
        startDate: "2011-03-07",
        endDate: "2020-08-21",
        positions: [
          {
            title: "Vice President, Nursing Operations",
            startDate: "2016-04-04",
            endDate: "2020-08-21",
            projects: [
              {
                name: "House-wide staffing office",
                description:
                  "Centralized staffing with a 4-hour prediction window. Unplanned agency hours fell 33%; missed meal-break grievances dropped 28%.",
                skills: ["Workforce Planning", "Clinical Operations", "Nursing Leadership"],
              },
              {
                name: "Night-shift practice council",
                description:
                  "Gave the night council a budget and a quality aim. Falls with injury on nights fell 22%; the council's first protocol became a house standard.",
                skills: ["Quality Improvement", "Stakeholder Management", "Patient Safety"],
              },
            ],
          },
          {
            title: "Director of Medical-Surgical Nursing",
            startDate: "2011-03-07",
            endDate: "2016-04-03",
            projects: [
              {
                name: "Discharge barrier huddle",
                description:
                  "Daily barrier huddle with case management. Observed LOS on two med-surg units fell 0.4 days; readmissions did not rise.",
                skills: ["Care Coordination", "Clinical Operations", "Quality Improvement"],
              },
              {
                name: "Workstation privacy standard",
                description:
                  "Rewrote the minimum-necessary standard after two incidents. Privacy events on the units fell from 7 a year to 1; the audit passed without a finding.",
                skills: ["HIPAA Compliance", "Nursing Leadership"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "The University of Texas Health Science Center at Houston",
        degree: "B.S.N.",
        dateAwarded: "2006-05-13",
      },
      {
        school: "Baylor University, Louise Herrington School of Nursing",
        degree: "M.S.N., Nursing Administration",
        dateAwarded: "2011-12-10",
      },
    ],
    certifications: [
      {
        name: "Nurse Executive, Advanced (NEA-BC)",
        issuer: "American Nurses Credentialing Center",
        dateAwarded: "2017-08-19",
        credentialId: "ANCC-NEA-EV-0819",
      },
      {
        name: "Certified Professional in Patient Safety (CPPS)",
        issuer: "Certification Board for Professionals in Patient Safety",
        dateAwarded: "2019-02-14",
        credentialId: "CPPS-VASQUEZ-0214",
      },
    ],
    featuredProjects: [
      {
        name: "Daily safety huddle playbook",
        description:
          "<p>The Memorial Harbor huddle: escalation rules, the serious-safety definition the board accepted, and the unit PDSA cadence that cut HAPI 41% without a consultant deck.</p>",
        links: [
          { label: "Huddle playbook", url: "https://www.example.com/elena-vasquez/huddle" },
          { label: "Workforce redesign", url: "https://www.example.com/elena-vasquez/workforce" },
        ],
        skills: ["Patient Safety", "Nursing Leadership", "Quality Improvement"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "healthcare",
    name: "David Okello",
    title: "Medical Director, Hospital Medicine",
    location: "Cleveland, OH",
    siteDescription:
      "Medical director for hospital medicine. Census, handoffs, and the operating rhythm that keeps a hospitalist group from becoming 40 solo practices.",
    summary:
      "<p>Runs a hospital medicine group as a clinical operating system: census caps, geographic rounding, and a handoff that a night team can trust. Quality is not a committee; it is the daily board.</p><p>At Cuyahoga Lakes, cut observed LOS 0.5 days on the hospitalist service, dropped 7-day revisits 18%, and moved geographic rounding to 86% of discharges. Previously built Lake Erie's nocturnist model and learned capacity math as a hospitalist physician in the same group.</p>",
    socials: [
      { platform: "linkedin.com", ref: "david-okello" },
      { platform: "website", ref: "https://davidokello.example.com" },
      { platform: "medium.com", ref: "davidokello" },
    ],
    skills: [
      {
        name: "Clinical Operations",
        description:
          "Census, geography, and the discharge barrier that is a physician problem until it is a hospital problem. Owns the daily board with nursing.",
        yearStarted: 2013,
      },
      {
        name: "Care Coordination",
        description:
          "Handoffs, post-acute placement, and the 7-day revisit that is a design failure. Case management is on the rounding team, not a page after noon.",
        yearStarted: 2013,
      },
      {
        name: "Patient Safety",
        description:
          "Handoff failures and the diagnostic delay that a night team inherits. Reviews as a system, not a peer-shame session.",
        yearStarted: 2014,
      },
      {
        name: "Electronic Health Records",
        description:
          "Note templates, order sets, and the inbox that was eating the afternoon. If the EHR is the bottleneck, it is an ops project.",
        yearStarted: 2013,
      },
      {
        name: "Quality Improvement",
        description:
          "Service-level PDSA on LOS, revisits, and sepsis bundle. Improvement that a hospitalist can run between census and family meetings.",
        yearStarted: 2015,
      },
      {
        name: "HIPAA Compliance",
        description:
          "Family updates and the hallway consult that becomes a privacy event. Teaches the minimum-necessary habit on the unit, not in a module.",
        yearStarted: 2013,
      },
      {
        name: "Medical Affairs",
        description:
          "Credentialing, peer review, and the medical-staff relationship that keeps a hospitalist group from becoming a vendor.",
        yearStarted: 2018,
      },
      {
        name: "Workforce Planning",
        description:
          "Nocturnist coverage, census caps, and the recruiting that does not depend on locums at 2x. Schedule is a safety control.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Cuyahoga Lakes Medical",
        description:
          "Cleveland hospital where hospital medicine is a service line, not a staffing vendor. David runs the group and the daily board.",
        location: "Cleveland, OH",
        startDate: "2021-07-01",
        positions: [
          {
            title: "Medical Director, Hospital Medicine",
            startDate: "2021-07-01",
            projects: [
              {
                name: "Geographic rounding rollout",
                description:
                  "Moved the service to unit-based teams. Geographic discharges rose from 41% to 86%; observed LOS on the service fell 0.5 days without a rise in revisits.",
                skills: ["Clinical Operations", "Care Coordination", "Workforce Planning"],
              },
              {
                name: "7-day revisit bundle",
                description:
                  "Standardized the discharge checklist and the 48-hour call. 7-day revisits fell 18%; the EHR order set made the bundle the default, not a reminder.",
                skills: ["Quality Improvement", "Electronic Health Records", "Patient Safety"],
              },
              {
                name: "Medical-staff compact",
                description:
                  "Rewrote the hospitalist compact with medical affairs: peer review, closed-loop consults, and a census cap the MEC backed. Locums hours fell 27%.",
                skills: ["Medical Affairs", "Workforce Planning", "HIPAA Compliance"],
              },
            ],
          },
        ],
      },
      {
        name: "Lake Erie Hospitalists",
        description:
          "Independent hospitalist group covering two community hospitals. David built the nocturnist model that the hospitals later hired in-house.",
        location: "Cleveland, OH",
        startDate: "2016-07-01",
        endDate: "2021-06-30",
        positions: [
          {
            title: "Associate Medical Director",
            startDate: "2018-09-04",
            endDate: "2021-06-30",
            projects: [
              {
                name: "Nocturnist coverage model",
                description:
                  "Replaced cross-cover chaos with a dedicated nocturnist. Night pages to the day team fell 62%; two serious handoff events in the prior year did not recur.",
                skills: ["Workforce Planning", "Patient Safety", "Clinical Operations"],
              },
              {
                name: "Inbox and note redesign",
                description:
                  "Cut the afternoon inbox with team pools and shorter notes. After-hours EHR time per hospitalist fell 41 minutes; documentation queries dropped 22%.",
                skills: ["Electronic Health Records", "Quality Improvement", "HIPAA Compliance"],
              },
            ],
          },
          {
            title: "Hospitalist Physician",
            startDate: "2016-07-01",
            endDate: "2018-09-03",
            projects: [
              {
                name: "Sepsis order-set adoption",
                description:
                  "Led the unit adoption of the sepsis bundle. Time-to-antibiotics under 60 minutes rose from 68% to 89% on the hospitalist service.",
                skills: ["Quality Improvement", "Electronic Health Records", "Care Coordination"],
              },
              {
                name: "Family-update standard",
                description:
                  "Wrote the update standard after a privacy complaint. Family complaints fell 30%; hallway updates stopped being the default.",
                skills: ["HIPAA Compliance", "Care Coordination", "Patient Safety"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Makerere University College of Health Sciences",
        degree: "M.B.Ch.B.",
        dateAwarded: "2009-01-16",
      },
      {
        school: "Case Western Reserve University / Cleveland Clinic",
        degree: "Internal Medicine Residency",
        dateAwarded: "2013-06-30",
      },
    ],
    certifications: [
      {
        name: "Board Certified, Internal Medicine",
        issuer: "American Board of Internal Medicine",
        dateAwarded: "2013-08-22",
        credentialId: "ABIM-OKELLO-2013",
      },
      {
        name: "Certified Physician Executive (CPE)",
        issuer: "American Association for Physician Leadership",
        dateAwarded: "2022-10-07",
        credentialId: "CPE-OKELLO-1007",
      },
    ],
    featuredProjects: [
      {
        name: "Geographic rounding operating rhythm",
        description:
          "<p>The daily board, census cap, and handoff standard Cuyahoga Lakes used to move geographic discharges to 86% and cut service LOS 0.5 days.</p>",
        links: [
          { label: "Operating rhythm", url: "https://www.example.com/david-okello/rounding" },
          { label: "Revisit bundle", url: "https://www.example.com/david-okello/revisit-bundle" },
        ],
        skills: ["Clinical Operations", "Care Coordination", "Quality Improvement"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "healthcare",
    name: "Keisha Monroe",
    title: "Director of Revenue Cycle",
    location: "Philadelphia, PA",
    siteDescription:
      "Revenue cycle director. Clean claims, denials, and the work queues that keep a $40M AR from becoming a story the CFO tells the board.",
    summary:
      "<p>Runs hospital and professional billing as one cycle: coding, claim edits, and the denial that is a front-end problem until someone owns it. Cash is a process, not a month-end scramble.</p><p>At Schuylkill, lifted clean-claim rate from 81% to 94%, cut initial denial rate 6.8 points, and pulled $18M of aged AR under 90 days. Previously rebuilt Liberty Bell's denial taxonomy and the payer-edit library that stopped the same reject from landing twice.</p>",
    socials: [
      { platform: "linkedin.com", ref: "keisha-monroe" },
      { platform: "website", ref: "https://keishamonroe.example.com" },
      { platform: "medium.com", ref: "keishamonroe" },
    ],
    skills: [
      {
        name: "Revenue Cycle",
        description:
          "Front-end edits, coding, and the denial work queue. Owns cash days and the aging the CFO reads on Monday.",
        yearStarted: 2015,
      },
      {
        name: "HIPAA Compliance",
        description:
          "Minimum-necessary in a billing shop that wants to see the whole chart. Privacy and a clean claim are the same workstation habit.",
        yearStarted: 2015,
      },
      {
        name: "Electronic Health Records",
        description:
          "Charge capture, claim edits, and the workqueue that should have been a rule. If it is a repeat reject, it is a build, not a trainer.",
        yearStarted: 2016,
      },
      {
        name: "Financial Reporting",
        description:
          "AR aging, denial reason codes, and the residual that is a coding problem vs. a payer problem. Reports the board can act on.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Moves coders and billers onto a new edit without a week of shadow systems. Adoption is a queue metric, not a kickoff.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "CFO, HIM, and the service-line chief who thinks denials are a billing attitude. Keeps clinical documentation in the room.",
        yearStarted: 2017,
      },
      {
        name: "Quality Improvement",
        description:
          "PDSA on edit fail rates and first-pass yield. Improvement that a lead biller can run without a consultant.",
        yearStarted: 2018,
      },
      {
        name: "Program Management",
        description:
          "Conversion cutovers and the payer go-lives that cannot slip a Monday. RAID logs that name the claim file, not a vibe.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Schuylkill Health",
        description:
          "Philadelphia system that still bills hospital and professional on two stacks. Keisha's job is one cycle and one aging report.",
        location: "Philadelphia, PA",
        startDate: "2022-01-10",
        positions: [
          {
            title: "Director of Revenue Cycle",
            startDate: "2022-01-10",
            projects: [
              {
                name: "Clean-claim lift",
                description:
                  "Rebuilt front-end edits and coder feedback. Clean-claim rate rose from 81% to 94%; days in A/R fell from 48 to 39 in three quarters.",
                skills: [
                  "Revenue Cycle",
                  "Electronic Health Records",
                  "Quality Improvement",
                  "Change Management",
                ],
              },
              {
                name: "Denial workqueue redesign",
                description:
                  "Collapsed 14 queues into 5 reason families with owners. Initial denial rate dropped 6.8 points; $18M of aged AR moved under 90 days.",
                skills: ["Revenue Cycle", "Financial Reporting", "Program Management"],
              },
              {
                name: "Clinical documentation huddle",
                description:
                  "Weekly huddle with HIM and two service lines on the top deny codes. Query response time fell from 9 days to 3; two codes left the top-10 list.",
                skills: ["Stakeholder Management", "HIPAA Compliance", "Quality Improvement"],
              },
            ],
          },
        ],
      },
      {
        name: "Liberty Bell Health System",
        description:
          "Philadelphia system whose denials lived in inboxes. Keisha built the taxonomy and the edit library that made a reject a rule.",
        location: "Philadelphia, PA",
        startDate: "2015-04-06",
        endDate: "2021-12-17",
        positions: [
          {
            title: "Manager, Denials and Edit Integrity",
            startDate: "2018-02-12",
            endDate: "2021-12-17",
            projects: [
              {
                name: "Denial taxonomy",
                description:
                  "Mapped 200+ payer remarks into 12 families. Repeat rejects on the same edit fell 51% after the library went live.",
                skills: ["Revenue Cycle", "Financial Reporting", "Electronic Health Records"],
              },
              {
                name: "Payer go-live cutover",
                description:
                  "Ran a Medicaid MCO cutover that held first-pass yield at 90% in week one. The prior cutover had dropped to 71% for a month.",
                skills: ["Program Management", "Change Management", "HIPAA Compliance"],
              },
            ],
          },
          {
            title: "Revenue Cycle Analyst",
            startDate: "2015-04-06",
            endDate: "2018-02-11",
            projects: [
              {
                name: "Aged-AR deep dive",
                description:
                  "Attributed $12M of 180+ AR to five root causes. Two were coding; three were registration. The registration two became a front-end project.",
                skills: ["Financial Reporting", "Revenue Cycle", "Stakeholder Management"],
              },
              {
                name: "Workstation privacy audit",
                description:
                  "Closed a billing-shop finding on whole-chart access. Minimum-necessary roles cut open-chart events 70% without slowing clean-claim rate.",
                skills: ["HIPAA Compliance", "Electronic Health Records"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Temple University",
        degree: "B.B.A. Healthcare Management",
        dateAwarded: "2013-05-16",
      },
      {
        school: "Drexel University",
        degree: "M.H.A.",
        dateAwarded: "2017-06-10",
      },
    ],
    certifications: [
      {
        name: "Certified Revenue Cycle Representative (CRCR)",
        issuer: "Healthcare Financial Management Association",
        dateAwarded: "2018-09-21",
        credentialId: "HFMA-CRCR-KM-0921",
      },
      {
        name: "Certified Specialist Payment & Reimbursement (CSPR)",
        issuer: "Healthcare Financial Management Association",
        dateAwarded: "2021-04-08",
        credentialId: "HFMA-CSPR-MONROE",
      },
    ],
    featuredProjects: [
      {
        name: "Denial taxonomy and edit library",
        description:
          "<p>The twelve-family denial map and the edit rules that stopped the same reject from landing twice. Includes the aging view the CFO now opens on Monday.</p>",
        links: [
          { label: "Taxonomy", url: "https://www.example.com/keisha-monroe/denial-taxonomy" },
          { label: "Clean-claim notes", url: "https://www.example.com/keisha-monroe/clean-claim" },
        ],
        skills: ["Revenue Cycle", "Financial Reporting", "Electronic Health Records"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "healthcare",
    name: "Nathan Brooks",
    title: "Clinical Quality Manager",
    location: "Minneapolis, MN",
    siteDescription:
      "Clinical quality manager. Measure design, EHR workflows, and the PDSA that still runs after the Joint Commission leaves.",
    summary:
      "<p>Builds quality programs that a unit can run: measure definitions, EHR capture, and a PDSA cadence that does not die after survey. The dashboard is a tool; the huddle is the product.</p><p>At North Star, lifted sepsis-bundle compliance from 72% to 91% and cut fall-with-injury 27% across 11 units. Previously at Twin Cities Quality Collaborative, designed the shared measure set 14 clinics still submit without a summer intern cleaning the file.</p>",
    socials: [
      { platform: "linkedin.com", ref: "nathan-brooks-cqm" },
      { platform: "website", ref: "https://nathanbrooks.example.com" },
      { platform: "medium.com", ref: "nathanbrookscqm" },
    ],
    skills: [
      {
        name: "Quality Improvement",
        description:
          "PDSA with unit owners and a control plan. Survey readiness is a side effect of a huddle that already exists.",
        yearStarted: 2016,
      },
      {
        name: "Electronic Health Records",
        description:
          "Measure capture in the workflow, not a chart-abstract army. If the field is optional, the measure is a hope.",
        yearStarted: 2016,
      },
      {
        name: "Patient Safety",
        description:
          "Falls, sepsis, and the event review that names a workflow. Safety and quality are the same Tuesday huddle.",
        yearStarted: 2017,
      },
      {
        name: "HIPAA Compliance",
        description:
          "Limited-data sets and the quality registry that does not need a whole chart. Privacy is designed into the extract.",
        yearStarted: 2016,
      },
      {
        name: "Clinical Operations",
        description:
          "Understands census and staffing enough to know when a bundle fail is a capacity problem. Will not assign a nurse a twelfth aim in a surge.",
        yearStarted: 2018,
      },
      {
        name: "Program Management",
        description:
          "Measure go-lives, abstractor training, and the Joint Commission window that cannot move. RAID logs that name the build ticket.",
        yearStarted: 2017,
      },
      {
        name: "Change Management",
        description:
          "Unit champions, a sunset for the shadow tracker, and a week of elbow support. Adoption is a field-completion rate.",
        yearStarted: 2017,
      },
      {
        name: "Care Coordination",
        description:
          "Post-discharge measures and the call that is a quality process, not a courtesy. Coordinates with case management on the same definition of 'reached.'",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "North Star Health",
        description:
          "Minneapolis system that wanted quality without a second EHR. Nathan runs the measure builds and the unit huddles that keep them honest.",
        location: "Minneapolis, MN",
        startDate: "2021-03-15",
        positions: [
          {
            title: "Clinical Quality Manager",
            startDate: "2021-03-15",
            projects: [
              {
                name: "Sepsis-bundle EHR capture",
                description:
                  "Moved bundle elements into required fields and a one-click order set. Compliance rose from 72% to 91%; abstractor hours on the measure fell 60%.",
                skills: [
                  "Quality Improvement",
                  "Electronic Health Records",
                  "Change Management",
                  "Clinical Operations",
                ],
              },
              {
                name: "Falls collaborative",
                description:
                  "Eleven-unit PDSA on falls with injury. Rate fell 27%; two units held the new rate at 180 days with the huddle still on the board.",
                skills: ["Patient Safety", "Quality Improvement", "Program Management"],
              },
              {
                name: "Post-discharge reach standard",
                description:
                  "Aligned quality and case management on a single 'reached' definition and a 48-hour call. Documented reach rose from 54% to 81%; 7-day revisits on the pilot service fell 12%.",
                skills: ["Care Coordination", "HIPAA Compliance", "Electronic Health Records"],
              },
            ],
          },
        ],
      },
      {
        name: "Twin Cities Quality Collaborative",
        description:
          "Clinic collaborative that was drowning in twelve definitions of the same measure. Nathan designed the shared set they still submit.",
        location: "Minneapolis, MN",
        startDate: "2016-05-02",
        endDate: "2021-03-12",
        positions: [
          {
            title: "Quality Improvement Specialist",
            startDate: "2016-05-02",
            endDate: "2021-03-12",
            projects: [
              {
                name: "Shared ambulatory measure set",
                description:
                  "Designed 18 measures 14 clinics submit from the EHR. Summer-intern cleaning of the file stopped; site-to-site variance on hypertension control became a real gap, not a definition fight.",
                skills: ["Quality Improvement", "Electronic Health Records", "Program Management"],
              },
              {
                name: "Limited-data extract",
                description:
                  "Rebuilt the registry extract as a limited-data set. Whole-chart access for abstractors ended; a privacy review closed with no findings.",
                skills: ["HIPAA Compliance", "Electronic Health Records", "Care Coordination"],
              },
              {
                name: "Unit huddle kit",
                description:
                  "A one-page huddle and a control plan clinics could run without a project manager. Six sites still used the kit at the two-year revisit.",
                skills: ["Change Management", "Patient Safety", "Clinical Operations"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Minnesota",
        degree: "B.S. Health Services Management",
        dateAwarded: "2014-05-17",
      },
      {
        school: "University of Minnesota School of Public Health",
        degree: "M.P.H., Public Health Administration and Policy",
        dateAwarded: "2016-05-06",
      },
    ],
    certifications: [
      {
        name: "Certified Professional in Healthcare Quality (CPHQ)",
        issuer: "National Association for Healthcare Quality",
        dateAwarded: "2018-11-16",
        credentialId: "CPHQ-BROOKS-1116",
      },
      {
        name: "Certified Professional in Patient Safety (CPPS)",
        issuer: "Certification Board for Professionals in Patient Safety",
        dateAwarded: "2021-07-23",
        credentialId: "CPPS-BROOKS-0723",
      },
    ],
    featuredProjects: [
      {
        name: "Measure-in-the-workflow kit",
        description:
          "<p>How North Star moved sepsis-bundle capture into required EHR fields and killed the abstractor army. Includes the huddle page units still run after survey.</p>",
        links: [
          { label: "Workflow kit", url: "https://www.example.com/nathan-brooks/measure-kit" },
          { label: "Huddle page", url: "https://www.example.com/nathan-brooks/huddle" },
        ],
        skills: ["Quality Improvement", "Electronic Health Records", "Patient Safety"],
      },
    ],
  }),
];
