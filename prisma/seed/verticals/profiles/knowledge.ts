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
                name: "Designed the multi-region scheduler that fails a zone in 11 seconds and cut dual-write incidents 73%",
                description:
                  "Designed the scheduler that places stateful workloads across 14 clusters and fails a zone in 11 seconds, down from 90. Placement is a lease plus a drain, not a hope that DNS will catch up. Cut dual-write incidents by 73% in the first two quarters, when product teams stopped opening a second writer.",
                skills: ["Distributed Systems", "Kubernetes", "Go", "System Design"],
              },
              {
                name: "Replaced ad-hoc heartbeats with a quorum lease API and cut leader flaps 81%",
                description:
                  "Replaced ad-hoc heartbeats with a quorum lease API that membership actually honors during a partition. Leader flaps dropped 81% and on-call pages for split-brain went from weekly to two in a year. The old ping loop is still in the repo, commented, as a warning.",
                skills: ["Distributed Systems", "Go", "Observability"],
              },
              {
                name: "Versioned the public CRDs and shipped clients that 19 internal teams adopted in six months",
                description:
                  "Versioned the public CRDs and shipped TypeScript/Go clients so product teams stopped scraping etcd for cluster state. Adoption reached 19 internal teams in six months, which is when the deprecation calendar stopped being a slide. The sunset date held; the unofficial watchers did not.",
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
                name: "Rolled out a sidecar mesh across 46 services and cut p99 latency 28%",
                description:
                  "Moved 46 services onto a sidecar mesh with staged mTLS and a sunset date for the plaintext path. p99 inter-service latency fell 28% after retry and timeout defaults were made explicit instead of inherited from whoever copied the last YAML. On-call stopped treating timeouts as a personality trait.",
                skills: ["Kubernetes", "Observability", "AWS"],
              },
              {
                name: "Wrote a Go rebalancer that drained hot shards and cut peak hotspot CPU from 94% to 61%",
                description:
                  "Wrote the Go rebalancer that drained hot shards without pausing writes, which is the part the Friday-afternoon version never quite did. Peak hotspot CPU dropped from 94% to 61% during Black Friday traffic. The runbook is three commands; the design doc is why we did not pause the world.",
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
                name: "Built the usage billing pipeline that cut late invoice events from 4.2% to 0.3%",
                description:
                  "Built the event pipeline that turned cluster-hours into invoices a finance team would actually send. Late events fell from 4.2% to 0.3% after exactly-once keys landed and the 'we will reconcile later' path was retired. Billing disputes dropped with the late events, which was the real product requirement.",
                skills: ["TypeScript", "AWS", "System Design"],
              },
              {
                name: "Added drain-aware autoscaler hooks and cut node-replacement incidents 62% in two quarters",
                description:
                  "Added drain-aware hooks so scale-in stopped killing in-flight control loops mid-reconcile. Node replacement incidents dropped 62% in two quarters, and the 'why is the leader gone' page stopped pairing with a scale-in event. The hook is boring; the incidents it prevented were not.",
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
                name: "Ported the packet classifier to Go and cut 10 Gbps classification latency 41%",
                description:
                  "Ported the rule compiler from a Perl pipeline to Go so a 10 Gbps classifier could reload without a coffee break. Classification latency fell 41% and rule-reload time went from 18 seconds to 2. The NOC noticed the reload first; marketing noticed the latency later.",
                skills: ["Go", "System Design"],
              },
              {
                name: "Shipped a structured edge telemetry exporter that cut blackhole MTTD from 22 minutes to 6",
                description:
                  "Shipped the first structured exporter the NOC would trust instead of a packet dump and a guess. MTTD for blackhole routes improved from 22 minutes to 6, which is the difference between a customer ticket and a page we already had. The schema is still the one they page from.",
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
        name: "Northline multi-region placement engine design notes",
        description:
          "<p>Open design notes and a reference scheduler that places stateful workloads across regions and drains a failed zone in 11 seconds. Built for operators who are tired of a second etcd becoming the architecture. Includes the lease rules that kept dual-write incidents from returning with the next region.</p>",
        skills: ["Distributed Systems", "Kubernetes", "Go", "System Design"],
      },
      {
        name: "Production control-plane SLO and paging playbook",
        description:
          "<p>A public write-up of the reconcile-latency and leader-election SLOs Northline uses in production, including the dashboards that made split-brain pages rare. Written so a new on-call can tell a burn from a noisy saturation without a war room.</p>",
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
                name: "Replaced seven ad-hoc pipelines with one paved path and cut PR-to-prod from 3.4 days to 11 hours",
                description:
                  "Replaced seven ad-hoc pipelines with one paved path that 22 squads could actually ship on. Median PR-to-prod fell from 3.4 days to 11 hours; Friday deploys stopped being a rumor. The old pipelines still exist as a museum exhibit with a sunset date, which is how adoption happened.",
                skills: [
                  "Technical Leadership",
                  "Change Management",
                  "Kubernetes",
                  "Program Management",
                ],
              },
              {
                name: "Shipped the catalog and scorecards that cut orphaned services from 61 to 9 and onboarding to 2 days",
                description:
                  "Shipped the catalog and scorecards that made ownership visible instead of a tribal Slack thread. Orphaned services dropped from 61 to 9; onboarding time for a new service went from 9 days to 2. The portal is a product with a backlog, not a link farm with a search box.",
                skills: ["TypeScript", "System Design", "Program Management"],
              },
              {
                name: "Launched per-PR preview environments on shared EKS and cut QA cycle time 44%",
                description:
                  "Per-PR environments on a shared EKS fleet, with a TTL so they did not become a second staging. QA cycle time fell 44% and the #platform queue for a staging slot went quiet. Product squads stopped hoarding shared namespaces like they were conference rooms.",
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
                name: "Automated AWS account vending and cut new-environment lead time from 12 days to 40 minutes",
                description:
                  "Automated AWS account and IAM boundary creation so a new environment was a request, not a ticket archaeology project. New-environment lead time fell from 12 days to 40 minutes; audit exceptions on shared credentials went to zero. Security liked the boundaries; product liked the 40 minutes.",
                skills: ["AWS", "Python", "System Design"],
              },
              {
                name: "Codified ten security guardrails as policy-as-code and blocked 230 public buckets in a year",
                description:
                  "Codified the ten rules security actually cared about so a public bucket was a deny, not a conversation. Blocked 230 misconfigured public buckets in the first year without a ticket per request. The exceptions process is three people and a date; it is not a Slack emoji.",
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
                name: "Shipped a Python CLI that mirrored staging locally and cut platform laptop-only bugs 58%",
                description:
                  "Python CLI that mirrored staging networking on a laptop, including the parts people used to fake with a hosts file. Laptop-only bugs filed against platform dropped 58%. Local still is not prod; it is close enough that the remaining bugs are real.",
                skills: ["Python", "TypeScript", "Change Management"],
              },
              {
                name: "Collapsed 30 forked pipelines into shared CI templates and cut weekly pipeline minutes 36%",
                description:
                  "One set of pipelines instead of 30 forks that drifted the week after they were copied. Mean pipeline minutes per week fell 36% after cache and image reuse landed. The template is versioned; the forks are a support burden we stopped taking.",
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
        name: "Paved-road golden-path scorecards for platform teams",
        description:
          "<p>A public version of the Driftwood catalog rules: what a golden path must guarantee, how scorecards stay honest, and why a portal is not a platform. Includes the orphan-service definition that dropped the count from 61 to 9.</p>",
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
                name: "Rebuilt the React design system on tokens and cut unique buttons from 47 to 4",
                description:
                  "Rebuilt the React kit on tokens and headless primitives so a second brand could land without a fork. Unique button implementations fell from 47 to 4; visual-regression escapes dropped 62% in two quarters. The working group still reviews the PR that would have been button number 48.",
                skills: ["React", "TypeScript", "System Design", "Technical Leadership"],
              },
              {
                name: "Shipped a six-week codemod program that moved 11 squads to v3 and cut leftover one-offs 84%",
                description:
                  "Shipped codemods and a six-week office-hours cadence so the v2-to-v3 cutover had a calendar, not a hope. 11 squads completed the migration; leftover one-off components fell 84%. Adoption was scheduled in the same spreadsheet as the sprint, which is why it finished.",
                skills: ["Change Management", "Program Management", "TypeScript"],
              },
              {
                name: "Instrumented production component usage, removed 23 dead exports, and cut the kit bundle 18%",
                description:
                  "Instrumented production usage so unused primitives could be deleted with evidence instead of a design-system eulogy. Removed 23 dead exports and cut bundle size for the kit 18%. If a primitive has no consumers, it is a candidate for deletion, not a case study.",
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
                name: "Built the Figma-to-TypeScript token pipeline that turned weekly theme hotfixes into a monthly release",
                description:
                  "Built the Style Dictionary path from Figma tokens to TypeScript so three brands stopped hand-editing hex values in a pull request. Theme drift across those brands fell from weekly hotfixes to a monthly release. Designers ship tokens; engineers stop hunting for the unofficial gray.",
                skills: ["TypeScript", "System Design", "AWS"],
              },
              {
                name: "Replaced custom inputs with a WCAG 2.1 AA React form kit and cut form support tickets 31%",
                description:
                  "Replaced custom inputs with a React kit that passed WCAG 2.1 AA on the first audit, which is not how the previous kit went. Form-related support tickets dropped 31%. The stories include the keyboard path; the old one-offs did not.",
                skills: ["React", "Technical Leadership", "Change Management"],
              },
              {
                name: "Shipped a CloudFront docs site that lifted weekly design visitors from 6 to 48",
                description:
                  "Shipped the docs and playground on CloudFront so designers had a URL that was not a Storybook someone forgot to deploy. Weekly unique visitors from design went from 6 to 48; Slack questions about how to use a component fell by half. The site is the contract; office hours are for the exceptions.",
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
        name: "Headless token-driven design system primitive kit",
        description:
          "<p>Open reference components for buttons, menus, and dialogs with tokens as the only theme API. Written so a second brand can land without a fork. The stories include the keyboard path the last kit treated as optional.</p>",
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
                name: "Replaced threshold alerts with error-budget burns and cut pages 58% while MTTR fell to 14 minutes",
                description:
                  "Replaced threshold alerts with error-budget burns on 31 services so a page named a user-facing burn, not a noisy saturation. Pages per week fell 58%; MTTR on customer-facing incidents went from 47 minutes to 14. Saturation without a burn still goes to a ticket, which is how the pager got quiet.",
                skills: ["Observability", "Technical Leadership", "Python"],
              },
              {
                name: "Unified traces across 9 EKS clusters and cut time-to-name-the-dependency from 18 minutes to 3",
                description:
                  "Unified traces across 9 EKS clusters with consistent baggage so a request did not become three tools and a guess. Time-to-name-the-dependency in incidents dropped from 18 minutes to 3. The war room still happens; it starts with a trace ID instead of a theory.",
                skills: ["Kubernetes", "Distributed Systems", "AWS", "Observability"],
              },
              {
                name: "Shipped a Go admission webhook that flattened time-series growth 71% and stopped surprise telemetry bills",
                description:
                  "Go admission webhook that rejects unbounded label sets before they become a finance conversation. Time-series growth flattened 71% and the monthly telemetry bill stopped surprising finance. A new high-cardinality label is now a design review, which is the point of a budget.",
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
                name: "Defined a span contract six clients adopted and cut duplicate incident channels from 4 per outage to 1",
                description:
                  "Defined the span contract six clients adopted so an outage stopped opening four Slack channels with four clocks. Duplicate incident channels fell from 4 per outage to 1; postmortems started with a trace ID. The standard is a page, not a working group that never shipped.",
                skills: ["Observability", "Distributed Systems", "Technical Leadership"],
              },
              {
                name: "Split noisy batch onto dedicated node pools and cut noisy-neighbor latency events 64%",
                description:
                  "Split noisy batch onto dedicated pools so a report job stopped being a latency incident for product. Noisy-neighbor latency events fell 64% and the batch team stopped paging product on-call. Isolation is cheaper than another apology in the incident channel.",
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
                name: "Mailed weekly SLO budget-burn reports that cut unowned 5xx alerts 40% once owners were named",
                description:
                  "Python reports that mailed weekly budget burn to service owners, with a name on the page instead of a shared inbox. Unowned 5xx alerts dropped 40% once names were on the dashboard. Leadership still reads the mail; that is why the names stayed accurate.",
                skills: ["Python", "Observability"],
              },
              {
                name: "Moved Prometheus scrape onto private links and cut accidental public metric endpoints from 11 to 0",
                description:
                  "Moved Prometheus scrape onto private links so a metrics endpoint stopped being a public API with worse auth. Accidental public metric endpoints went from 11 to 0 in a quarter. The scrape path is boring on purpose; the findings it closed were not.",
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
        name: "Reusable SLO and paging contract template",
        description:
          "<p>A reusable SLO and paging contract: burn-rate alerts, ownership fields, and the rule that saturation without a user-facing burn does not wake anyone. Includes the weekly budget-burn mail that kept names on the dashboard accurate.</p>",
        skills: ["Observability", "Technical Leadership", "Python"],
      },
      {
        name: "High-cardinality time series budget admission webhook",
        description:
          "<p>Reference admission controller that keeps high-cardinality labels out of the time-series store. Written after a single deploy doubled a client's Prometheus bill. A new unbounded label is a design review, not a surprise invoice.</p>",
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
                name: "Led a 14-bidder industrials auction to $780M EV at 11.2x EBITDA, 9% above the walk-away",
                description:
                  "Led a sell-side for a $780M EV components maker through 14 first-round bids and a close at 11.2x EBITDA, 9% above the board's walk-away. Process ran 17 weeks, two days under the original calendar, which is the part founders remember. The buyer tree was the work; the tombstone was the receipt.",
                skills: [
                  "Deal Execution",
                  "Pitch Books",
                  "Industry Coverage",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Closed a $410M logistics carve-out on a locked-box with an 8% indemnity cap and a nine-month TSA",
                description:
                  "Sold a $410M EV logistics carve-out with a locked-box and a TSA that expired on month nine, not the version that would be figured out in diligence. Working-capital peg survived QoE; indemnity cap closed at 8% of EV. Counsel marked the paper; the economics stayed on the banker's page.",
                skills: [
                  "Deal Execution",
                  "Contract Negotiation",
                  "DCF Valuation",
                  "Financial Modeling",
                ],
              },
              {
                name: "Re-cut buyer outreach when loans widened 175 bps and kept six cash buyers in the second round",
                description:
                  "Re-cut buyer outreach when the leveraged loan market widened 175 bps mid-process, which is when a debt-dependent bid becomes a press release. Kept six cash buyers in the second round and avoided a failed launch. The financing tape is part of the calendar, not a footnote after the CIM goes out.",
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
                name: "Ran a dual-track IPO explore and sale that closed at $620M EV after the public window shut",
                description:
                  "Ran a dual-track IPO explore and sale for a business-services name. Sale won at $620M EV after the public window closed; dual-track cost the client 11 extra days, not a failed process. The explore file was current enough to kill, which is the only reason a dual-track is worth running.",
                skills: ["Capital Markets", "Deal Execution", "Pitch Books"],
              },
              {
                name: "Modeled recap versus sale for a 72-year-old founder and closed a 61% sale with rollover economics",
                description:
                  "Modeled a recap vs. 100% sale for a 72-year-old founder who wanted a number and a chair, not a lecture. Board chose a 61% sale; negotiated the rollover economics and the chair seat. The model survived the family meeting, which is the diligence that does not show up in a CIM.",
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
                name: "Built industrials CIM templates that lifted first-round bids from 4.1 to 6.8 buyers per process",
                description:
                  "Built the coverage templates Calder Street still uses, including the buyer page that has a reason for each name. First-round bid rate on launched processes rose from 4.1 to 6.8 buyers. Associates still open the file first; that is the definition of a factory that worked.",
                skills: ["Pitch Books", "Industry Coverage", "Financial Modeling"],
              },
              {
                name: "Standardized the working-capital peg model and cut average QoE dispute days from 9 to 2",
                description:
                  "Standardized the peg model so QoE stopped rewriting banker numbers on a Sunday night. Average peg dispute days fell from 9 to 2, which is the difference between a close calendar and a renegotiation. The tabs match the QoE request list; that was the entire point.",
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
        name: "Riverton sell-side industrials process letter archive",
        description:
          "<p>Anonymized process letters and buyer-tree templates from Riverton industrials auctions, including the 14-bidder case that cleared 11.2x. Written for associates who inherit a live calendar. The walk-away math is in the same folder as the letter.</p>",
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
                name: "Modeled and syndicated a $640M first-lien 6.4x LBO that held through 90 bps of flex",
                description:
                  "Modeled and syndicated a $640M first-lien for a 6.4x LBO that had to clear a committee and a tape. Held through 90 bps of flex; closing leverage printed 6.25x. Sponsor returned for the dividend recap eight months later, which is the only tombstone that matters on a hold-level book.",
                skills: ["LBO Analysis", "Loan Structuring", "Capital Markets", "Deal Execution"],
              },
              {
                name: "Wrote the $220M recap memo that cut an $8M add-back and still cleared at 5.1x",
                description:
                  "Wrote the committee memo for a $220M recap at 5.1x and called the customer-concentration risk that cut the add-back by $8M. Deal still cleared with a tighter ECF sweep, which is how you keep a yes without pretending the concentration is diversification. The page the committee read twice was the add-back page.",
                skills: ["Credit Analysis", "Financial Modeling", "Pitch Books"],
              },
              {
                name: "Rebuilt the standard LBO with 100/150/200 bps rate cases and cut committee rate questions in half",
                description:
                  "Rebuilt the standard LBO with 100/150/200 bps rate cases and covenant headroom so associates stopped maintaining five files. Committee questions on rates fell by half. The debt schedule is one tab; the old version was a scavenger hunt with a circular reference.",
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
                name: "Built 27 first-pass LBOs that cut associate rewrite time from 6 hours to 90 minutes",
                description:
                  "Built 27 first-pass LBOs for mid-market sponsors with a debt schedule an associate could defend. Average rewrite time fell from 6 hours to 90 minutes after the template landed. The files were the ones they kept, which is the only analyst metric that counts.",
                skills: ["LBO Analysis", "Financial Modeling", "DCF Valuation"],
              },
              {
                name: "Tracked leverage and FCCR on 9 live deals and flagged a springing covenant two weeks before a miss",
                description:
                  "Weekly tracker of leverage and FCCR vs. package for 9 live deals, updated before the Sunday process email. Flagged a springing covenant two weeks before a missed test; amendment closed without a default. The tracker is a calendar, not a dashboard nobody opened.",
                skills: ["Credit Analysis", "Loan Structuring", "Capital Markets"],
              },
              {
                name: "Built first-round lender decks for three launched deals that cleared at 1.8x oversubscription",
                description:
                  "First-round lender decks for three launched deals, written so a holdco and a credit committee could both say yes. Average oversubscription on launched paper was 1.8x; zero failed syndications on the books. The slides are a credit argument; the logo page is page two.",
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
        name: "Through-cycle leveraged buyout model and memo template",
        description:
          "<p>A public, anonymized LBO with rate shocks, ECF sweep, and covenant headroom. Built so an associate can defend the debt schedule without a second file. The 100/150/200 bps cases are tabs, not a late-night copy.</p>",
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
                name: "Led a £1.1B UK consumer IPO that priced at the top after a 2.4x covered book",
                description:
                  "Led a UK consumer IPO that priced at the top of a 310–360p range after a 2.4x covered book. Day-six close was +4.1%; greenshoe fully exercised. The aftermarket is the part the chair lives with; the book was built so day six was not a surprise.",
                skills: [
                  "Capital Markets",
                  "Deal Execution",
                  "Pitch Books",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Executed a £420M overnight follow-on at a 4.8% discount with the book covered in 90 minutes",
                description:
                  "Executed a £420M overnight follow-on at a 4.8% discount when the primary window closed and a bought deal was the alternative the board did not want. Book covered in 90 minutes; issuer avoided a bought deal. The list was warm because the closed-window work had been real.",
                skills: ["Deal Execution", "Market Analysis", "Capital Markets"],
              },
              {
                name: "Repositioned a Nordic healthcare issuer around free-float and lifted index-aware follow-on demand 38%",
                description:
                  "Repositioned a Nordic healthcare issuer around free-float and FTSE inclusion so the equity story matched the longs who actually show up. Follow-on demand from index-aware longs rose 38% vs. the prior roadshow. The comps still mattered; the free-float math is what moved the book.",
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
                name: "Kept 11 issuers warm through a closed IPO window so three launched inside 28 days of the reopen",
                description:
                  "Kept 11 issuers warm with a quarterly investor program while IPOs were paused, which is unglamorous work that pays when the window moves. When it reopened, three launched inside 28 days. The program was a calendar with named longs, not a newsletter.",
                skills: ["Stakeholder Management", "Industry Coverage", "Capital Markets"],
              },
              {
                name: "Modeled UK mid-cap follow-on discounts and recommended prints 70 bps tighter with equal cover",
                description:
                  "Modeled UK mid-cap follow-on discounts vs. liquidity so a Sunday board call had a number that was not last year's desk folklore. Average recommended discount on the files was 70 bps tighter than the prior-year desk average, with equal cover. Tighter is only useful if the book still prints.",
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
                name: "Built the comps and DCF pack that stopped range-setting meetings from opening on a blank slide",
                description:
                  "Built the comps and DCF pack Meridian Row still opens first, including the free-float and index notes a range actually needs. Range-setting meetings stopped starting from a blank slide. The pack is a valuation argument; the logo wall is in the appendix.",
                skills: ["Financial Modeling", "DCF Valuation", "Pitch Books"],
              },
              {
                name: "Mapped 180 European longs by style and lifted first-week roadshow hit-rate from 54% to 71%",
                description:
                  "Mapped 180 European longs by holding period and style so the first week of a roadshow was a calendar, not a hope. First-week hit-rate rose from 54% to 71%. The map names who will still be there after allocation, which is the only targeting that matters.",
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
        name: "Consumer IPO range-setting and book memo",
        description:
          "<p>Anonymized range memo from the £1.1B consumer IPO: comps, DCF, free-float, and the book-building notes that supported a top-of-range print. Includes the day-six aftermarket notes the chair actually asked for.</p>",
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
      {
        name: "Credit Analysis",
        description:
          "Flags when a sale process is assuming leverage, working-capital, or a buyer credit box that will not clear. Coverage notes include the tape, not just the multiple.",
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
                name: "Built a 60-name Midwest industrials book that lifted partner CEO meetings from 6 to 17 in two quarters",
                description:
                  "Built the live coverage book on 60 Midwest names with comps, end-markets, and a last-meeting note a partner can read in a cab. Partner CEO meetings rose from 6 to 17 in two quarters. The book is current or it is a PDF; this one stayed current.",
                skills: ["Industry Coverage", "Market Analysis", "Pitch Books"],
              },
              {
                name: "Wrote the CIM and operating model for a $190M EV packaging converter that drew nine first-round bids",
                description:
                  "Wrote the CIM and operating model for a $190M EV converter. Nine first-round bids; process still live. Founder sent the CIM without a rewrite, which is the analyst test that does not show up on a staffing sheet. The buyer list had reasons, not last year's logos.",
                skills: ["Pitch Books", "Financial Modeling", "Deal Execution", "Credit Analysis"],
              },
              {
                name: "Templated three-statement and DCF files so associates review in 70 minutes instead of rebuilding overnight",
                description:
                  "Templated the three-statement and DCF so associates review in 70 minutes instead of rebuilding overnight. Used on 14 live processes. The footnotes match the industry fade; the circulars are gone. That is the entire standard.",
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
                name: "Mapped 32 distribution strategics by route overlap; two names appeared in a live process the next winter",
                description:
                  "Mapped 32 strategics by route overlap and prior-deal multiple, which is the version of a buyer tree that is not a logo wall. Two names from the tree showed up in a live process the following winter. Coverage work counts when a live process inherits the list.",
                skills: ["Industry Coverage", "Pitch Books", "Market Analysis"],
              },
              {
                name: "Built resin and freight pass-through slides used in 8 CEO sit-downs the same summer",
                description:
                  "Built the resin and freight pass-through slides the coverage team still drops into first meetings, because a multiple is earned or it is a hope. Used in 8 CEO sit-downs that summer. The page is volumes, freight, and who actually passed the cost through.",
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
        name: "Midwest industrials coverage and buyer-tree notes",
        description:
          "<p>Anonymized coverage pages: comps, end-market volumes, and the buyer-tree logic for packaging and specialty distribution. Written so the next analyst does not start from a blank book. Each name has a last-meeting note, or it is not in the book.</p>",
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
                name: "Led a four-DC CPG network redesign that cut landed cost 11% and lifted OTIF to 96.4%",
                description:
                  "Led a four-DC redesign for a CPG client that had been solving service with inventory and freight with hope. Landed cost fell 11% and OTIF rose from 91% to 96.4% without adding inventory days. The closed branch was a DC, not a slide about agility.",
                skills: [
                  "Issue Trees",
                  "Inventory Optimization",
                  "Hypothesis-Driven Problem Solving",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Rebuilt the monthly S&OP cadence and cut forecast MAPE from 34% to 19%",
                description:
                  "Rebuilt the monthly planning cadence across sales, supply, and finance so a forecast had an owner before it had a dashboard. Forecast MAPE dropped from 34% to 19%; bias flipped from +8% to +1%. The meeting still happens; it now changes a production plan.",
                skills: ["Demand Planning", "Change Management", "Slide Storytelling"],
              },
              {
                name: "Cut constraint changeover from 74 minutes to 41 and released 6.2 hours of weekly capacity",
                description:
                  "Ran changeover kaizen on the constraint lines at two plants with supervisors on the floor, not a war room. Average changeover fell from 74 minutes to 41 and released 6.2 hours of weekly capacity without a capex request. The boards were still in use at the 90-day revisit.",
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
                name: "Reset min/max on 4,200 spare SKUs, lifted critical service to 98.1%, and cut stores 17%",
                description:
                  "Reset min/max on 4,200 SKUs after the critical-part stockouts and the overstock lived in the same cage. Service on critical parts rose to 98.1% while stores inventory fell 17%. Planners kept the policy because it was a min/max they could defend, not a model they could not open.",
                skills: [
                  "Inventory Optimization",
                  "Issue Trees",
                  "Hypothesis-Driven Problem Solving",
                ],
              },
              {
                name: "Coached 22 supervisors on leader standard work that held above 80% audit scores at 90 days",
                description:
                  "Wrote the leader standard work and coached 22 supervisors through a Gemba that was a calendar, not a poster. Audit scores held above 80% at 90 days; the boards were still in use at the six-month revisit. Night shift kept the same standard, which is the only test that counts.",
                skills: ["Lean Manufacturing", "Change Management", "Slide Storytelling"],
              },
              {
                name: "Stood up a weekly demand review that cut peak-season expedite freight 22%",
                description:
                  "Stood up a weekly demand review for a seasonal brand so a spike was a decision, not a Friday expedite. Expedite freight fell 22% in the first peak season. Sales still argued; they argued in the meeting instead of after the truck left.",
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
        name: "Midwest DC network redesign issue tree",
        description:
          "<p>Public version of the landed-cost tree Oakline used on the Midwest DC case: service, inventory, and freight as separate branches, with the decision that actually moved a DC. Includes the OTIF and inventory-day constraints that kept the redesign from becoming a freight story.</p>",
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
                name: "Led a four-plant PE program that released $86M annualized conversion cost and lifted constraint OEE 7–12 points",
                description:
                  "Led a PE portfolio program across four plants that had to print in the P&L, not in a lean tour. Released $86M annualized conversion cost; constraint OEE rose 7–12 points. Two plants hit the year-two run-rate a quarter early, which is when the operating partner stopped asking for another diagnostic.",
                skills: [
                  "Lean Manufacturing",
                  "Six Sigma",
                  "Stakeholder Management",
                  "Change Management",
                ],
              },
              {
                name: "Collapsed a central process-engineering matrix and cut yield-action close time from 19 days to 6",
                description:
                  "Collapsed a matrix that had process engineers reporting to a central COE while supervisors owned the line. Time-to-close a yield action fell from 19 days to 6; attrition in the supervisor bench dropped 28%. Role charters survived the first reorg rumor, which is the actual deliverable.",
                skills: ["Organizational Design", "Change Management", "Slide Storytelling"],
              },
              {
                name: "Installed a two-week frozen horizon that cut expedite overtime 31% and lifted on-time start to 91%",
                description:
                  "Installed a two-week frozen horizon and a weekly SIOP so sales stopped treating the constraint like a suggestion box. Expedite overtime fell 31%; on-time start on the constraint rose from 72% to 91%. The frozen week is a decision; the exception log is short on purpose.",
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
                name: "Cut coating-line first-pass yield loss 4.6 points and $4.1M annualized scrap with a 180-day control plan",
                description:
                  "Ran DMAIC on a coating line with the process owner who would keep the control plan after the team left. First-pass yield loss fell 4.6 points; scrap dollars fell $4.1M annualized. The control plan held at 180 days, which is longer than most belt projects survive a shift change.",
                skills: ["Six Sigma", "Lean Manufacturing", "Hypothesis-Driven Problem Solving"],
              },
              {
                name: "Productized a two-week plant diagnostic sold 22 times with 70% conversion to a transformation",
                description:
                  "Productized the two-week diagnostic Northbridge sold 22 times: where the hours go, which losses are projects, and which are a management-system gap. Average identified loss was 9–14% of conversion cost; 70% converted to a transformation. The board pack stops at the run-rate; the ANOVA stays in the appendix.",
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
                name: "Cut stamping-cell changeover from 96 minutes to 38 and released a Saturday shift",
                description:
                  "Cut changeover from 96 minutes to 38 on a stamping cell that had been a showcase for everything except the bottleneck. Released a Saturday shift; overtime on that value stream fell 24%. Internal setups moved off the line; the Saturday crew went home, which was the point.",
                skills: ["Lean Manufacturing", "Change Management"],
              },
              {
                name: "Replaced daily reshuffles with a published production wheel and lifted schedule adherence from 61% to 84%",
                description:
                  "Replaced daily reshuffles with a published wheel so a hot order was an exception with a name, not the plan. Schedule adherence rose from 61% to 84% in 10 weeks. Sales still got a yes; they got it on Tuesday, not at 6 a.m. on the line.",
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
        name: "Two-week plant diagnostic method for manufacturers",
        description:
          "<p>The loss-tree method Halcyon still sells: where the hours go, which losses are projects, and which are a management-system gap. Includes the board pack that stops at the run-rate. The ANOVA stays in the appendix, where a steering committee will not live.</p>",
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
                name: "Turned a stalled CPQ from 18% to 71% weekly active use and cut quote cycle time 36%",
                description:
                  "Took a stalled CPQ from 18% to 71% weekly active use in 16 weeks with named owners and a sunset for the shadow spreadsheet. Quote cycle time fell 36%; shadow spreadsheets on the named team went from 14 to 2. Usage was the metric; the kickoff slide was not.",
                skills: ["Change Management", "Program Management", "Stakeholder Management"],
              },
              {
                name: "Split quote-to-cash leakage across pricing, approval, and handoff and kept a CRM rewrite out of wave one",
                description:
                  "Split leakage across pricing, approval, and handoff so a digital program was not one workstream named CRM. The pricing branch paid back; the CRM rewrite the client wanted did not make the first wave. The tree is why the steering pack had a no on page one.",
                skills: ["Issue Trees", "Hypothesis-Driven Problem Solving", "Slide Storytelling"],
              },
              {
                name: "Wrote charters for a four-person digital PMO and cut steering decision latency from 19 days to 6",
                description:
                  "Wrote charters for a four-person PMO and process owners in sales ops who would remain after the integrator left. Decision latency on the steering committee fell from 19 days to 6. The PMO is a clearance path, not a fourth meeting.",
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
                name: "Built a bottom-up SAM across 1,400 plants that the board used in Series C",
                description:
                  "Bottom-up SAM for a maintenance-software client across 1,400 plants, built from accounts and win rates, not a Gartner screenshot. Board used the number in the Series C; variance vs. first-year bookings was 8%. The partner took the file into the room unedited.",
                skills: [
                  "Market Sizing",
                  "Hypothesis-Driven Problem Solving",
                  "Slide Storytelling",
                ],
              },
              {
                name: "Showed that 60% of a CRM problem was approval policy and paused a $2.4M license expansion",
                description:
                  "Showed that 60% of a so-called CRM problem was an approval policy, which is an unfashionable finding in a digital RFP. Client paused a $2.4M license expansion and restarted after the policy change. The license was not the constraint; the signature path was.",
                skills: ["Issue Trees", "Change Management", "Organizational Design"],
              },
              {
                name: "Templated the weekly decision memo that cut no-decision meetings from 40% to 10%",
                description:
                  "Templated the weekly decision memo Vesper still uses: one governing thought, an owner, and a date. Meetings that ended without a decision fell from 4 in 10 to 1 in 10 on her cases. Roadmaps without an owner do not ship, and they do not appear on page one.",
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
        name: "Working note on digital adoption before the roadmap",
        description:
          "<p>A short public note on why digital transformations fail at the spreadsheet, not the license. Includes the CPQ usage curve and the issue tree that kept a CRM rewrite out of wave one.</p>",
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
                name: "Evaluated 42 grant programs and redirected $180M toward higher-performing awards, sunsetting six",
                description:
                  "Evaluated 42 programs against outcome evidence and statutory fit so a portfolio review was a decision, not a listening tour. Redirected $180M toward higher-performing awards; six programs sunset on the client's own recommendation. The budget office could defend the table in a hearing, which was the product.",
                skills: [
                  "Program Evaluation",
                  "Budget Formulation",
                  "Policy Analysis",
                  "Slide Storytelling",
                ],
              },
              {
                name: "Mapped a 14-step commercial permit path and cut median cycle time 29% by removing five habitual clearances",
                description:
                  "Mapped a 14-step commercial permit path and cut median cycle time 29%. Two clearances were statutory; five were habit. The habit ones left. Career staff kept the new path because the statutory two were named, not because a consultant called it modernization.",
                skills: [
                  "Issue Trees",
                  "Hypothesis-Driven Problem Solving",
                  "Stakeholder Management",
                  "Organizational Design",
                ],
              },
              {
                name: "Redesigned a civilian bureau to match a new authorization and cut time-to-award 22%",
                description:
                  "Redesigned a civilian bureau's delivery org to match a new authorization so the org chart stopped fighting the statute. Time-to-award fell 22%; the IG later used the charter as the control narrative. A PMO was not added; a fourth clearance would have been the easy wrong answer.",
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
                name: "Wrote a three-option mark for a $2.1B account that survived OMB with a 4% trim",
                description:
                  "Wrote the three-option mark for a $2.1B account with statute, outcome evidence, and a table a deputy could take into passback. Leadership took option B; the table survived OMB with a 4% trim instead of a program kill. Option C was written so they did not invent one in the room.",
                skills: ["Budget Formulation", "Policy Analysis", "Slide Storytelling"],
              },
              {
                name: "Replaced activity counts with four outcome measures that pulled continuation funding from two grantees on evidence",
                description:
                  "Replaced activity counts with four outcome measures a budget office accepted, including a counterfactual they could audit. Two grantees lost continuation funding on evidence, not politics. Evaluation was a decision tool; the journal-article version stayed in the appendix.",
                skills: ["Program Evaluation", "Hypothesis-Driven Problem Solving", "Issue Trees"],
              },
              {
                name: "Collapsed four overlapping interagency workstreams and cut duplicate field requests 40% in a quarter",
                description:
                  "Collapsed four overlapping workstreams into one decision body so the field stopped answering the same request on four letterheads. Duplicate requests to the field dropped 40% in a quarter. The working group is one government again, which is harder than adding a fifth.",
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
        name: "Hearing-ready three-option public sector budget memo",
        description:
          "<p>A public, anonymized three-option mark: statute, outcome evidence, and the budget table that survived review. Written for managers who have to put a number on a page before Friday.</p>",
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
                name: "Grew a Carolinas book from $1.1B to $1.6B with criticized assets under 2.1% and fee income up 24%",
                description:
                  "Grew commitments from $1.1B to $1.6B across 48 relationships that still wanted a banker who answered. Criticized assets stayed under 2.1%; net interest plus treasury fee income rose 24%. The annual review was not a surprise, which is how a book that size stays clean through a rate-up cycle.",
                skills: [
                  "Relationship Management",
                  "Commercial Lending",
                  "Risk Rating",
                  "Treasury Management",
                ],
              },
              {
                name: "Required operating-account conversations on every annual review and lifted treasury penetration from 41% to 73%",
                description:
                  "Required an operating-account and lockbox conversation on every annual review so treasury was a hold decision, not a brochure. Treasury penetration rose from 41% to 73% of the book; deposit beta on the book lagged the region by 18 bps. The region copied the script; the 18 bps is why.",
                skills: [
                  "Treasury Management",
                  "Stakeholder Management",
                  "Relationship Management",
                ],
              },
              {
                name: "Installed a monthly rating huddle on 12 names that closed two amendments before a missed test",
                description:
                  "Installed a monthly rating huddle on 12 names so a watchlist was a calendar, not a year-end surprise. Two amendments closed before a missed test; no unexpected downgrade reached committee in 2023. Credit already knew the covenant conversation, which is the point of a huddle.",
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
                name: "Built a 22-name owner-managed industrials book averaging $18M hold with zero charge-offs",
                description:
                  "Built a 22-name book averaging $18M hold for owner-managed industrials that still faxed a borrowing-base certificate. Zero charge-offs; two successful sponsor exits refinanced in-house. The calling cadence was the underwriting, which is how a community-sized hold stays off the watchlist.",
                skills: ["Commercial Lending", "Financial Underwriting", "Relationship Management"],
              },
              {
                name: "Reset ineligible definitions after a dilution spike and avoided a $6M over-advance that would have been a surprise",
                description:
                  "Reset ineligible definitions after a dilution spike so availability on paper matched the collateral a field exam would find. Availability fell 9% on paper and saved a $6M over-advance that would have been a surprise. The borrower did not like the 9%; the committee liked the save.",
                skills: ["Loan Structuring", "Credit Analysis", "Financial Underwriting"],
              },
              {
                name: "Paired annual credit reviews with treasury QBRs and lifted ACH and fraud-tool cross-sell 35%",
                description:
                  "Paired annual credit reviews with treasury QBRs so the bank stopped selling two different relationships in two rooms. Cross-sell of ACH and fraud tools rose 35%; one fraud event was caught on the new dual-control. The QBR opens with cash, then products, which is the order that sticks.",
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
        name: "Annual calling playbook for treasury-attached middle-market reviews",
        description:
          "<p>The annual-review script Catawba copied across the region: operating accounts, lockbox, and the RAROC math that makes treasury part of the hold decision. Includes the penetration target that moved the book from 41% to 73%.</p>",
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
                name: "Cleared $2.4B of C&I and sponsor commitments with a 4% return-to-analyst rate and 11-day time-to-yes",
                description:
                  "Cleared $2.4B of C&I and sponsor commitments with a 4% return-to-analyst rate. Average time-to-yes fell from 18 days to 11 without a change in approval quality. The file was complete before the deadline, which is how exam week stayed an observation, not a matter requiring attention.",
                skills: [
                  "Credit Analysis",
                  "Financial Underwriting",
                  "Commercial Lending",
                  "Internal Controls",
                ],
              },
              {
                name: "Recalibrated obligor ratings against 6 years of loss history with no MRA on credit administration in two exams",
                description:
                  "Recalibrated obligor ratings against 6 years of loss history so the ALLL and the rating page told the same story. Watchlist migration matched exam expectations; no MRA on credit administration in the last two exams. Observations we can live with; MRAs we do not write toward.",
                skills: ["Risk Rating", "Financial Reporting", "Internal Controls"],
              },
              {
                name: "Standardized downside LBO cases that declined two deals later amended at other banks",
                description:
                  "Standardized downside cases for sponsor LBOs so the upside memo could not bury a coverage hole. Two deals were declined on cash-flow coverage the upside memo had buried; both later needed amendments at other banks. The sensitivity is the page the committee asks for after lunch.",
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
                name: "Wrote the spreading guide that cut analyst rewrite time 40% and exceptions from 12 per file to 3",
                description:
                  "Wrote the spreading guide that cut analyst rewrite time 40%. Exception logs fell from 12 per file to 3 after the related-party checklist landed. Analysts still open the file first; that is the definition of a standard that survived a staffing change.",
                skills: ["Financial Underwriting", "Financial Reporting", "Internal Controls"],
              },
              {
                name: "Built covenant and liquidity triggers that flagged two missed tests a month early as amendments, not defaults",
                description:
                  "Built covenant and liquidity triggers that flagged two missed tests a month early. Both closed as amendments, not defaults. The trigger is a date and a number, not a dashboard that pages nobody. RMs got the call before the certificate was late.",
                skills: ["Risk Rating", "Loan Structuring", "Credit Analysis"],
              },
              {
                name: "Catalogued sponsor add-backs that survive a downturn so run-rate EBITDA stopped being treated as fact",
                description:
                  "Catalogued add-backs that survived vs. died in downturn files so a new sponsor memo had a memory. New sponsor memos stopped treating run-rate EBITDA as a fact. The library is the page that kills a quality-of-earnings hope before it becomes a hold-level yes.",
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
        name: "Outline for a through-cycle commercial credit memo",
        description:
          "<p>The Magnolia Trust memo skeleton: cash flow, add-backs that die, and the rating page the ALLL can live with. Written so an analyst can defend the file without a late-night rewrite.</p>",
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
                name: "Grew a 31-name North Texas book to $420M commitments with treasury fees up 38% and no late certificates",
                description:
                  "Grew a 31-name book to $420M commitments with one banker for the revolver and the operating account. Treasury fee income rose 38%; no past-due borrowing-base certificates in six consecutive quarters. The CRM had the calling notes a backup banker could run, or the call did not happen.",
                skills: [
                  "Relationship Management",
                  "Commercial Lending",
                  "Treasury Management",
                  "CRM",
                ],
              },
              {
                name: "Installed a quarterly cash-and-covenant review that negotiated two amendments before a miss",
                description:
                  "Installed a quarterly review that opens with cash and covenants, then products, so credit is not hearing dilution for the first time in October. Two amendments were negotiated in the QBR instead of after a miss. The backup banker can run the agenda, which is the test.",
                skills: ["Stakeholder Management", "Credit Analysis", "Loan Structuring"],
              },
              {
                name: "Built shared 13-week cash models with six seasonal borrowers and cut over-advances from 5 a year to 1",
                description:
                  "Built shared 13-week models with six seasonal borrowers so the cash view was a conversation, not a banker file the CFO never saw. Over-advance requests fell from 5 a year to 1; two clients used the view to time a term-out. The model is simple on purpose.",
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
                name: "Packaged lockbox, positive pay, and dual-control wires that kept two clients after a 15 bp tighter loan",
                description:
                  "Packaged lockbox, positive pay, and dual-control wires for companies whose banks treated cash as an afterthought. Two clients stayed after a competitor priced the loan 15 bps tighter; they would not move the operating account. Treasury spread is how a relationship earns its keep when the loan is quiet.",
                skills: ["Treasury Management", "Stakeholder Management", "CRM"],
              },
              {
                name: "Cut new-client treasury implementation from 7 weeks to 18 days and implementation tickets 44%",
                description:
                  "Cut new-client treasury implementation from 7 weeks to 18 days with a path a controller could finish in a week that already had a close. Implementation tickets per client fell 44%. The onboarding is a calendar; the old version was a scavenger hunt with a welcome email.",
                skills: ["Treasury Management", "CRM", "Relationship Management"],
              },
              {
                name: "Wrote the borrowing-base checklist that cut late certificates on referred names from 18% to 4%",
                description:
                  "Wrote the borrowing-base and reporting checklist Alamo handed to partner banks so a seasonal revolver had a certificate a controller could actually produce. Late certificates on referred names dropped from 18% to 4%. A late certificate is a structure problem; the checklist made that obvious.",
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
        name: "Joint credit and treasury QBR agenda",
        description:
          "<p>The Trinity River quarterly: cash, covenants, then products. Written so a backup banker can run the meeting and the credit officer is not hearing dilution for the first time.</p>",
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
                name: "Recast 38 energy ratings after the 2022 strip move and held criticized assets at 3.4%",
                description:
                  "Recast 38 energy obligor ratings after the 2022 strip move so ratings moved with hedges and reserve life, not with last year's EBITDA. Criticized energy assets held at 3.4% of the book; two RBLs were cut at redetermination instead of after a miss. The strip is a credit input; it is not a logo.",
                skills: [
                  "Risk Rating",
                  "Credit Analysis",
                  "Commercial Lending",
                  "Industry Coverage",
                ],
              },
              {
                name: "Reset hedge coverage on 11 RBLs and cut unhedged production into redetermination 40%",
                description:
                  "Reset hedge coverage and tenor tests on 11 RBLs so unhedged production stopped arriving as a surprise at redetermination. Unhedged production into a redetermination fell 40%; one amendment closed two weeks before a covenant miss. Structure is how an energy book survives a strip.",
                skills: ["Loan Structuring", "Financial Modeling", "Credit Analysis"],
              },
              {
                name: "Added PSM findings to the energy file and downgraded two OFS names before an event hit the tape",
                description:
                  "Added PSM incident and inspection findings to the standard energy file so a blowout was a credit event, not only an insurance binder. Two OFS names were downgraded on repeat findings before an operational event hit the tape. The addendum sits next to the hedges, which is where it belongs.",
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
                name: "Standardized PDP/PUD reserve cases that cut correspondent rewrite questions 50% and became two banks' internal form",
                description:
                  "Standardized PDP/PUD cases and strip decks so a correspondent file was not a scavenger hunt with a type curve. Rewrite questions fell 50%; two banks adopted the file as their internal form. The engineer footnote is on the page; that is the part other templates skip.",
                skills: ["Financial Modeling", "Financial Underwriting", "Industry Coverage"],
              },
              {
                name: "Mapped contract versus interruptible offtake for 9 gatherers and declined a credit whose committed volumes were interruptible",
                description:
                  "Mapped contract vs. interruptible offtake for 9 gatherers so a volume forecast had a page number. One credit was declined when committed volumes were interruptible on page 14. The offtake is a contract or it is a hope; the memo now says which.",
                skills: ["Credit Analysis", "Commercial Lending", "Loan Structuring"],
              },
              {
                name: "Wrote process-safety questions used on 15 OFS files that moved three ratings on findings, not EBITDA",
                description:
                  "Wrote the first process-safety questions Gulfport put in an energy memo, next to the hedge schedule. Used on 15 OFS files; three ratings moved on findings, not on EBITDA. A repeat PSM finding is a rating event; it was not, until the questions existed.",
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
        name: "Notes from the 2022 energy rating recast",
        description:
          "<p>Anonymized notes from the 2022 strip recast: how ratings moved with hedges, reserve life, and the two RBLs that were cut at redetermination instead of after a miss.</p>",
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
                name: "Stood up a daily system safety huddle that cut serious events from 1.8 to 0.7 per 10,000 days",
                description:
                  "Stood up a daily system huddle with unit-level escalation so a finding moved before it became a never-event. Serious safety events fell from 1.8 to 0.7 per 10,000 adjusted patient days in 24 months. The board accepted the definition; the night shift still runs the same huddle.",
                skills: [
                  "Patient Safety",
                  "Nursing Leadership",
                  "Stakeholder Management",
                  "Clinical Operations",
                ],
              },
              {
                name: "Ran unit PDSA on hospital-acquired pressure injuries across 18 units and cut the HAPI rate 41%",
                description:
                  "Unit PDSA on hospital-acquired pressure injuries across 18 units, run by night-shift nurses without a project manager. HAPI rate fell 41%; two units held zero for 9 consecutive months. The collaborative is a Tuesday huddle; the consultant deck was never ordered.",
                skills: ["Quality Improvement", "Patient Safety", "Care Coordination"],
              },
              {
                name: "Built a float pool and new-grad residency that cut RN turnover from 22% to 14%",
                description:
                  "Built a float pool and a new-grad residency that cut reliance on travel at 2x. RN turnover dropped from 22% to 14%; travel spend fell $9.4M annualized. Skill mix is a design problem; the Saturday night looks like a Tuesday, which is the staffing standard the board actually funded.",
                skills: ["Workforce Planning", "Nursing Leadership", "Stakeholder Management"],
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
                name: "Centralized house-wide staffing with a 4-hour prediction window and cut unplanned agency hours 33%",
                description:
                  "Centralized staffing with a 4-hour prediction window so a call-out was a deployment, not a group text. Unplanned agency hours fell 33%; missed meal-break grievances dropped 28%. The office still staffs beds the hard way; it just does it once, house-wide.",
                skills: ["Workforce Planning", "Clinical Operations", "Nursing Leadership"],
              },
              {
                name: "Gave the night council a budget and a quality aim that cut night falls with injury 22%",
                description:
                  "Gave the night council a budget and a quality aim so it stopped being a suggestion box with sandwiches. Falls with injury on nights fell 22%; the council's first protocol became a house standard. A council without a budget is a listening tour; this one had both.",
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
                name: "Ran a daily barrier huddle with case management that cut observed LOS 0.4 days without raising readmissions",
                description:
                  "Daily barrier huddle with case management so a discharge hold was a named barrier by 10 a.m., not a nursing failure at 4 p.m. Observed LOS on two med-surg units fell 0.4 days; readmissions did not rise. Case management is a partner on the huddle, not a ticket after noon.",
                skills: ["Care Coordination", "Clinical Operations", "Quality Improvement"],
              },
              {
                name: "Rewrote the minimum-necessary workstation standard and cut unit privacy events from 7 a year to 1",
                description:
                  "Rewrote the minimum-necessary standard after two incidents so privacy was a practice habit at 3 a.m., not a module. Privacy events on the units fell from 7 a year to 1; the audit passed without a finding. The workstation timeout is a standard; the workaround is a finding.",
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
        name: "Hospital system daily safety huddle playbook",
        description:
          "<p>The Memorial Harbor huddle: escalation rules, the serious-safety definition the board accepted, and the unit PDSA cadence that cut HAPI 41% without a consultant deck. Night shift still runs the same huddle.</p>",
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
                name: "Moved hospital medicine to unit-based teams and lifted geographic discharges from 41% to 86%",
                description:
                  "Moved the service to unit-based teams so a hospitalist group stopped being 40 solo practices with a shared pager. Geographic discharges rose from 41% to 86%; observed LOS on the service fell 0.5 days without a rise in revisits. The daily board with nursing is the operating system.",
                skills: ["Clinical Operations", "Care Coordination", "Workforce Planning"],
              },
              {
                name: "Standardized the discharge checklist and 48-hour call that cut 7-day revisits 18%",
                description:
                  "Standardized the discharge checklist and the 48-hour call so a 7-day revisit was a design failure, not a courtesy missed. 7-day revisits fell 18%; the EHR order set made the bundle the default, not a reminder. Case management is on the rounding team, not a page after noon.",
                skills: ["Quality Improvement", "Electronic Health Records", "Patient Safety"],
              },
              {
                name: "Rewrote the hospitalist medical-staff compact with a census cap the MEC backed and cut locums hours 27%",
                description:
                  "Rewrote the hospitalist compact with medical affairs: peer review, closed-loop consults, and a census cap the MEC backed. Locums hours fell 27%. The group is a service line, not a vendor; the compact is how medical staff stopped treating it like one.",
                skills: ["Medical Affairs", "Workforce Planning", "Clinical Operations"],
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
                name: "Replaced cross-cover chaos with a dedicated nocturnist and cut night pages to the day team 62%",
                description:
                  "Replaced cross-cover chaos with a dedicated nocturnist so a night team inherited a handoff, not a census surprise. Night pages to the day team fell 62%; two serious handoff events in the prior year did not recur. Schedule is a safety control; locums at 2x is not a model.",
                skills: ["Workforce Planning", "Patient Safety", "Clinical Operations"],
              },
              {
                name: "Cut after-hours EHR time 41 minutes per hospitalist with team inbox pools and shorter notes",
                description:
                  "Cut the afternoon inbox with team pools and shorter notes so the EHR stopped eating the family-meeting hour. After-hours EHR time per hospitalist fell 41 minutes; documentation queries dropped 22%. If the inbox is the bottleneck, it is an ops project, not a personal-resilience seminar.",
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
                name: "Led hospitalist sepsis-bundle adoption that lifted time-to-antibiotics under 60 minutes from 68% to 89%",
                description:
                  "Led the unit adoption of the sepsis bundle so the order set was the default, not a reminder after the first lactate. Time-to-antibiotics under 60 minutes rose from 68% to 89% on the hospitalist service. Quality is the daily board; the committee minutes are the receipt.",
                skills: ["Quality Improvement", "Electronic Health Records", "Care Coordination"],
              },
              {
                name: "Wrote the family-update standard after a privacy complaint and cut family complaints 30%",
                description:
                  "Wrote the update standard after a privacy complaint so a hallway consult stopped being the default family meeting. Family complaints fell 30%; hallway updates stopped being the default. Minimum-necessary is a habit on the unit, not a module assigned in January.",
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
        name: "Hospital medicine geographic rounding operating rhythm",
        description:
          "<p>The daily board, census cap, and handoff standard Cuyahoga Lakes used to move geographic discharges to 86% and cut service LOS 0.5 days. Includes the compact language the MEC actually backed.</p>",
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
                name: "Rebuilt front-end edits and lifted clean-claim rate from 81% to 94% while cutting days in A/R to 39",
                description:
                  "Rebuilt front-end edits and coder feedback so a repeat reject became a rule, not a trainer. Clean-claim rate rose from 81% to 94%; days in A/R fell from 48 to 39 in three quarters. Cash is a process; month-end stopped being a scramble the CFO narrated to the board.",
                skills: [
                  "Revenue Cycle",
                  "Electronic Health Records",
                  "Quality Improvement",
                  "Change Management",
                ],
              },
              {
                name: "Collapsed 14 denial queues into 5 families and pulled $18M of aged AR under 90 days",
                description:
                  "Collapsed 14 queues into 5 reason families with owners so a denial was a front-end problem someone owned. Initial denial rate dropped 6.8 points; $18M of aged AR moved under 90 days. The aging the CFO opens on Monday now has a name on each family.",
                skills: ["Revenue Cycle", "Financial Reporting", "Program Management"],
              },
              {
                name: "Ran a weekly HIM and service-line huddle that cut query response time from 9 days to 3",
                description:
                  "Weekly huddle with HIM and two service lines on the top deny codes so documentation stopped being a billing attitude. Query response time fell from 9 days to 3; two codes left the top-10 list. Clinical documentation is in the room; the service-line chief stayed after the first two weeks.",
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
                name: "Mapped 200-plus payer remarks into 12 families and cut repeat rejects on the same edit 51%",
                description:
                  "Mapped 200-plus payer remarks into 12 families so the same reject stopped landing twice in two inboxes. Repeat rejects on the same edit fell 51% after the library went live. A remark is a family or it is folklore; the taxonomy made the difference operational.",
                skills: ["Revenue Cycle", "Financial Reporting", "Electronic Health Records"],
              },
              {
                name: "Ran a Medicaid MCO cutover that held first-pass yield at 90% in week one",
                description:
                  "Ran a Medicaid MCO cutover that held first-pass yield at 90% in week one. The prior cutover had dropped to 71% for a month. The RAID log named the claim file, not a vibe, which is how a Monday go-live stayed a Monday.",
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
                name: "Attributed $12M of 180-plus AR to five root causes and turned the registration two into a front-end project",
                description:
                  "Attributed $12M of 180-plus AR to five root causes. Two were coding; three were registration. The registration two became a front-end project instead of another coder memo. The residual is a coding problem or a payer problem; the report now says which.",
                skills: ["Financial Reporting", "Revenue Cycle", "Stakeholder Management"],
              },
              {
                name: "Closed a whole-chart access finding and cut open-chart events 70% without slowing clean-claim rate",
                description:
                  "Closed a billing-shop finding on whole-chart access so minimum-necessary was a role, not a workaround. Minimum-necessary roles cut open-chart events 70% without slowing clean-claim rate. Privacy and a clean claim are the same workstation habit; the audit finally agreed.",
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
        name: "Hospital denial taxonomy and claim-edit library",
        description:
          "<p>The twelve-family denial map and the edit rules that stopped the same reject from landing twice. Includes the aging view the CFO now opens on Monday. A remark is a family or it is folklore.</p>",
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
                name: "Moved sepsis-bundle elements into required EHR fields and lifted compliance from 72% to 91%",
                description:
                  "Moved bundle elements into required fields and a one-click order set so the measure lived in the workflow, not in an abstractor army. Compliance rose from 72% to 91%; abstractor hours on the measure fell 60%. If the field is optional, the measure is a hope.",
                skills: [
                  "Quality Improvement",
                  "Electronic Health Records",
                  "Change Management",
                  "Clinical Operations",
                ],
              },
              {
                name: "Ran an 11-unit PDSA on falls with injury that cut the rate 27%",
                description:
                  "Eleven-unit PDSA on falls with injury, assigned only where census made a twelfth aim survivable. Rate fell 27%; two units held the new rate at 180 days with the huddle still on the board. Survey readiness was a side effect; the Tuesday huddle was the product.",
                skills: ["Patient Safety", "Quality Improvement", "Program Management"],
              },
              {
                name: "Aligned quality and case management on a 48-hour reach definition that lifted documented reach from 54% to 81%",
                description:
                  "Aligned quality and case management on a single reached definition and a 48-hour call so the courtesy call became a process. Documented reach rose from 54% to 81%; 7-day revisits on the pilot service fell 12%. Both teams now mean the same thing by reached.",
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
                name: "Designed 18 EHR-submitted measures for 14 clinics and ended summer-intern file cleaning",
                description:
                  "Designed 18 measures 14 clinics submit from the EHR so a hypertension gap was a real gap, not a definition fight. Summer-intern cleaning of the file stopped; site-to-site variance on hypertension control became something a medical director could act on. The shared set is still what they submit.",
                skills: ["Quality Improvement", "Electronic Health Records", "Program Management"],
              },
              {
                name: "Rebuilt the quality registry as a limited-data set and ended whole-chart access for abstractors",
                description:
                  "Rebuilt the registry extract as a limited-data set so a quality program did not need a whole chart. Whole-chart access for abstractors ended; a privacy review closed with no findings. Privacy is designed into the extract; the workaround was the old extract.",
                skills: ["HIPAA Compliance", "Electronic Health Records", "Care Coordination"],
              },
              {
                name: "Shipped a one-page huddle and control plan that six clinic sites still ran at the two-year revisit",
                description:
                  "A one-page huddle and a control plan clinics could run without a project manager, including a sunset for the shadow tracker. Six sites still used the kit at the two-year revisit. Adoption is a field-completion rate; the kit made that visible on Tuesday.",
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
        name: "Kit for capturing sepsis-bundle measures in the workflow",
        description:
          "<p>How North Star moved sepsis-bundle capture into required EHR fields and killed the abstractor army. Includes the huddle page units still run after survey. If the field is optional, the measure is a hope.</p>",
        skills: ["Quality Improvement", "Electronic Health Records", "Patient Safety"],
      },
    ],
  }),
];
