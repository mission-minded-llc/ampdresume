import { defineProfile } from "../buildProfile";

export const regulatedProfiles = [
  defineProfile({
    gender: "woman",
    vertical: "pharmaceuticals",
    name: "Yuna Takahashi",
    title: "Clinical Development Lead",
    location: "Cambridge, MA",
    siteDescription:
      "Clinical development lead in Cambridge running Phase II/III programs from protocol through CSR, with a bias for operationally honest endpoints.",
    summary:
      "<p>Clinical Development Lead at Helixbridge Therapeutics, accountable for two late-stage immunology programs and a 38-site U.S. network. I write protocols that sites can actually run, then stay in the room when recruitment, safety, and the SAP start to disagree.</p><p>Before Helixbridge I spent nine years moving from CRA work into clinical science at Northvale Biologics and Meridian Trial Sciences. I care about screen-fail rates, DSMB packets that arrive on time, and the difference between a clean database lock and a lock that just looks clean.</p>",
    socials: [
      { platform: "linkedin.com", ref: "yuna-takahashi" },
      { platform: "website", ref: "https://www.yuna-takahashi.example.com" },
      { platform: "medium.com", ref: "yunatakahashi" },
    ],
    skills: [
      {
        name: "Clinical Development",
        description:
          "Owns indication strategy, endpoint selection, and the handoff from Phase IIb to pivotal for immunology assets.",
        yearStarted: 2012,
      },
      {
        name: "Trial Operations",
        description:
          "Stands up site networks, vendor oversight, and enrollment recovery plans when a protocol meets real clinics.",
        yearStarted: 2012,
      },
      {
        name: "GCP",
        description:
          "Runs TMF hygiene, monitoring plans, and inspection-readiness drills against ICH E6(R2) expectations.",
        yearStarted: 2012,
      },
      {
        name: "Clinical Operations",
        description:
          "Coordinates CRO teams, country start-up, and visit-window discipline across multi-center U.S. studies.",
        yearStarted: 2014,
      },
      {
        name: "Medical Affairs",
        description:
          "Bridges investigators and the development team on protocol questions, congress abstracts, and KOL feedback.",
        yearStarted: 2016,
      },
      {
        name: "Regulatory Writing",
        description:
          "Authors protocols, IBs, and CSRs that survive both medical review and a picky agency reader.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps CMC, safety, biostats, and commercial aligned when a Phase III design has to change mid-program.",
        yearStarted: 2016,
      },
      {
        name: "Quality Improvement",
        description:
          "Uses protocol deviations and screen-fail data to rewrite criteria instead of just training sites harder.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Helixbridge Therapeutics",
        description:
          "Clinical-stage immunology company in Kendall Square. Two assets in Phase II/III; no commercial products yet.",
        location: "Cambridge, MA",
        startDate: "2021-03-01",
        positions: [
          {
            title: "Clinical Development Lead",
            startDate: "2021-03-01",
            projects: [
              {
                name: "ATOPIC-310 Phase IIb",
                description:
                  "Led protocol design and operational standup for a 412-patient Phase IIb atopic dermatitis study across 38 U.S. sites. Cut screen-fail from 41% to 27% after an interim feasibility rewrite of inclusion criteria.",
                skills: ["Clinical Development", "Trial Operations", "Quality Improvement"],
              },
              {
                name: "LUPUS-301 pivotal start-up",
                description:
                  "Took a lupus nephritis pivotal from concept sheet to FPI in 11 months, including SAP alignment and a Type C meeting package. First 80 patients randomized 6 weeks ahead of the enrollment model.",
                skills: [
                  "Clinical Development",
                  "GCP",
                  "Regulatory Writing",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Investigator network rebuild",
                description:
                  "Replaced an underperforming CRO country lead and rebuilt the U.S. investigator map around 14 high-enrolling academic sites. Protocol deviation rate dropped 22% in two quarters.",
                skills: ["Clinical Operations", "Medical Affairs", "Trial Operations"],
              },
            ],
          },
        ],
      },
      {
        name: "Northvale Biologics",
        description:
          "Mid-size biologics shop in the Seaport. Out-licensed two assets while Yuna was in clinical science.",
        location: "Boston, MA",
        startDate: "2016-06-01",
        endDate: "2021-02-26",
        positions: [
          {
            title: "Senior Clinical Scientist",
            startDate: "2018-04-02",
            endDate: "2021-02-26",
            projects: [
              {
                name: "Phase III CSR and database lock",
                description:
                  "Owned medical review for a 620-patient Phase III CSR and the last two data-cleaning cycles. Locked the database 9 days after LPLV instead of the planned 21.",
                skills: ["Clinical Development", "GCP", "Regulatory Writing"],
              },
              {
                name: "DSMB packet discipline",
                description:
                  "Standardized DSMB open- and closed-session packets across three ongoing studies so medical monitors stopped assembling slides the night before.",
                skills: ["Medical Affairs", "Clinical Operations", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Clinical Scientist",
            startDate: "2016-06-01",
            endDate: "2018-03-30",
            projects: [
              {
                name: "Phase II dose-range protocol",
                description:
                  "Drafted the dose-range protocol and eligibility flowchart for a first-in-indication IL-17 asset. Medical monitor queries fell by a third after the flowchart shipped to sites.",
                skills: ["Clinical Development", "Regulatory Writing", "GCP"],
              },
              {
                name: "Site feasibility scoring",
                description:
                  "Built a feasibility score from prior enrollment, IRB cycle time, and competing studies. Dropped 11 low-yield sites before SIV and saved an estimated $1.4M in start-up.",
                skills: ["Trial Operations", "Clinical Operations", "Quality Improvement"],
              },
            ],
          },
        ],
      },
      {
        name: "Meridian Trial Sciences",
        description:
          "Boutique CRO in Waltham that ran U.S. Phase II work for virtual biotechs. Yuna started as a CRA.",
        location: "Waltham, MA",
        startDate: "2012-08-06",
        endDate: "2016-05-20",
        positions: [
          {
            title: "Clinical Research Associate",
            startDate: "2012-08-06",
            endDate: "2016-05-20",
            projects: [
              {
                name: "New England site monitoring",
                description:
                  "Monitored 19 sites across New England for two Phase II programs. Closed 94% of critical queries inside the 10-day window for four consecutive quarters.",
                skills: ["GCP", "Trial Operations", "Clinical Operations"],
              },
              {
                name: "TMF inspection drill",
                description:
                  "Led a mock FDA TMF inspection that found 47 filing gaps; the real inspection six months later issued no TMF findings.",
                skills: ["GCP", "Quality Improvement"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Boston University School of Public Health",
        degree: "M.S., Clinical Investigation",
        dateAwarded: "2014-05-18",
      },
      {
        school: "Kyoto University",
        degree: "B.S., Pharmaceutical Sciences",
        dateAwarded: "2012-03-23",
      },
    ],
    certifications: [
      {
        name: "Regulatory Affairs Certification (U.S.)",
        issuer: "Regulatory Affairs Professionals Society",
        dateAwarded: "2019-06-12",
        credentialId: "RAC-US-88421",
      },
      {
        name: "ACRP Certified Professional",
        issuer: "Association of Clinical Research Professionals",
        dateAwarded: "2016-11-04",
        credentialId: "ACRP-CP-2016-4419",
      },
    ],
    featuredProjects: [
      {
        name: "ATOPIC-310 operational playbook",
        description:
          "<p>Public write-up of the feasibility rewrite and site-scoring method used on Helixbridge's Phase IIb atopic program. Includes the screen-fail waterfall and the eligibility flowchart sites actually posted in the workroom.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/helixbridge/atopic-310" },
          { label: "Enrollment notes", url: "https://www.example.com/yuna-takahashi/enrollment" },
        ],
        skills: ["Clinical Development", "Trial Operations", "Quality Improvement"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "pharmaceuticals",
    name: "Omar Haddad",
    title: "Director of Regulatory Affairs",
    location: "New Brunswick, NJ",
    siteDescription:
      "Regulatory affairs director in New Brunswick who shepherds FDA submissions from pre-IND through labeling, with a taste for Type C meetings that actually decide something.",
    summary:
      "<p>Director of Regulatory Affairs at Crestline Pharma, owning the U.S. strategy for a late-stage neurology franchise and two earlier oncology INDs. I write the briefing book, sit in the room with the review division, and then translate the minutes into a plan CMC and clinical can execute.</p><p>I came up through submission management at Harborline Medicines and Alderwick Regulatory Group. The work I trust is a Module 2 that matches the Module 5 tables, a labeling negotiation that does not surprise commercial, and a complete response that does not invent new science on deadline.</p>",
    socials: [
      { platform: "linkedin.com", ref: "omar-haddad-ra" },
      { platform: "website", ref: "https://www.omarhaddad.example.com" },
    ],
    skills: [
      {
        name: "FDA Regulatory Affairs",
        description:
          "Leads IND, NDA, and Type B/C meeting strategy with CDER review divisions for neurology and oncology assets.",
        yearStarted: 2011,
      },
      {
        name: "Regulatory Writing",
        description:
          "Authors Module 2 summaries, meeting packages, and complete-response strategies that stay faithful to the data.",
        yearStarted: 2011,
      },
      {
        name: "GCP",
        description:
          "Reads clinical sections the way an inspector will, then sends findings back to development before the dossier ships.",
        yearStarted: 2011,
      },
      {
        name: "Clinical Development",
        description:
          "Challenges endpoint and population choices early enough that the SPA or end-of-Phase II meeting still has room to move.",
        yearStarted: 2013,
      },
      {
        name: "Stakeholder Management",
        description:
          "Holds CMC, clinical, labeling, and legal to a single submission calendar when every function wants another week.",
        yearStarted: 2014,
      },
      {
        name: "Policy Analysis",
        description:
          "Tracks CDER guidance and ad comm precedent so strategy is not written from last year's playbook.",
        yearStarted: 2015,
      },
      {
        name: "Quality Management",
        description:
          "Runs submission QC, hyperlink checks, and publish-ready eCTD discipline so the portal is not the first time we find the error.",
        yearStarted: 2012,
      },
      {
        name: "Legal Writing",
        description:
          "Drafts labeling, REMS language, and correspondence that can survive both counsel and the review division.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Crestline Pharma",
        description:
          "Specialty neurology company headquartered near the old Johnson & Johnson campus. One NDA in review; two INDs active.",
        location: "New Brunswick, NJ",
        startDate: "2020-09-14",
        positions: [
          {
            title: "Director of Regulatory Affairs",
            startDate: "2020-09-14",
            projects: [
              {
                name: "NEURO-NDA-04 original submission",
                description:
                  "Directed the original NDA for a late-stage epilepsy asset, 148 eCTD sequences through filing. FDA accepted the application on first cycle and scheduled an advisory committee 7 months after NDA receipt.",
                skills: ["FDA Regulatory Affairs", "Regulatory Writing", "Quality Management"],
              },
              {
                name: "Oncology pre-IND pair",
                description:
                  "Opened two oncology INDs in 14 months, including a pre-IND that moved the starting dose after FDA questioned the animal-to-human multiple. First-in-human opened 11 weeks after IND receipt.",
                skills: ["FDA Regulatory Affairs", "Clinical Development", "GCP"],
              },
              {
                name: "Labeling and REMS negotiation",
                description:
                  "Led labeling and REMS talks with DMEPA and OSE. Kept a boxed warning the division wanted from expanding into a contraindication that would have blocked the primary care launch.",
                skills: ["Legal Writing", "Stakeholder Management", "Policy Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "Alderwick Regulatory Group",
        description:
          "Princeton consultancy that ran U.S. regulatory strategy for virtual biotechs. Omar led the neurology book.",
        location: "Princeton, NJ",
        startDate: "2015-03-02",
        endDate: "2020-09-04",
        positions: [
          {
            title: "Principal, Regulatory Strategy",
            startDate: "2017-07-10",
            endDate: "2020-09-04",
            projects: [
              {
                name: "End-of-Phase II meeting save",
                description:
                  "Rewrote a client's EOP2 package after a failed Type B. The second meeting locked a single pivotal design and avoided a second Phase II the board had already funded.",
                skills: ["FDA Regulatory Affairs", "Clinical Development", "Regulatory Writing"],
              },
              {
                name: "Complete response strategy",
                description:
                  "Built the CRL response for a 505(b)(2) analgesic: new PK work, no new outcome trial. Resubmission approved in 6 months.",
                skills: ["Regulatory Writing", "Policy Analysis", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Senior Regulatory Consultant",
            startDate: "2015-03-02",
            endDate: "2017-07-07",
            projects: [
              {
                name: "eCTD publishing standard",
                description:
                  "Installed a publish-ready QC checklist across 11 client dossiers. Sequence rejection at the ESG dropped from 8% to under 1%.",
                skills: ["Quality Management", "FDA Regulatory Affairs"],
              },
              {
                name: "Orphan designation briefs",
                description:
                  "Wrote four orphan designation requests; three granted on first review. Prevalence tables were the part clients kept recycling.",
                skills: ["Regulatory Writing", "Policy Analysis", "Legal Writing"],
              },
            ],
          },
        ],
      },
      {
        name: "Harborline Medicines",
        description:
          "Philadelphia specialty pharma. Omar started in submission management on the established-products desk.",
        location: "Philadelphia, PA",
        startDate: "2011-06-13",
        endDate: "2015-02-20",
        positions: [
          {
            title: "Regulatory Affairs Specialist",
            startDate: "2011-06-13",
            endDate: "2015-02-20",
            projects: [
              {
                name: "ANDA supplement factory",
                description:
                  "Managed 60-plus annual ANDA supplements for a mature generics book. Cut average FDA information-request cycle from 47 days to 29 by standardizing Module 3 change narratives.",
                skills: ["FDA Regulatory Affairs", "Quality Management", "Regulatory Writing"],
              },
              {
                name: "Inspection correspondence desk",
                description:
                  "Drafted 483 and warning-letter responses with QA. Two site inspections in 2014 closed with voluntary action indicated and no import alert.",
                skills: ["GCP", "Legal Writing", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Rutgers University",
        degree: "M.S., Regulatory Science",
        dateAwarded: "2013-05-19",
      },
      {
        school: "University of Jordan",
        degree: "B.S., Pharmacy",
        dateAwarded: "2010-06-14",
      },
    ],
    certifications: [
      {
        name: "Regulatory Affairs Certification (U.S.)",
        issuer: "Regulatory Affairs Professionals Society",
        dateAwarded: "2014-10-08",
        credentialId: "RAC-US-55102",
      },
      {
        name: "Regulatory Affairs Certification (Global)",
        issuer: "Regulatory Affairs Professionals Society",
        dateAwarded: "2018-04-21",
        credentialId: "RAC-GL-55102",
      },
    ],
    featuredProjects: [
      {
        name: "NEURO-NDA-04 filing memo",
        description:
          "<p>Annotated outline of the epilepsy NDA filing strategy: review-division mapping, Module 2 claims that match Module 5, and the Type C questions that decided the advisory-committee timing.</p>",
        links: [
          { label: "Filing memo", url: "https://www.example.com/crestline/neuro-nda-04" },
          { label: "Meeting log", url: "https://www.example.com/omar-haddad/fda-meetings" },
        ],
        skills: ["FDA Regulatory Affairs", "Regulatory Writing", "Clinical Development"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "pharmaceuticals",
    name: "Francesca Rossi",
    title: "Pharmacovigilance Manager",
    location: "Philadelphia, PA",
    siteDescription:
      "Pharmacovigilance manager in Philadelphia who treats signal detection as a weekly habit, not a quarterly surprise.",
    summary:
      "<p>Pharmacovigilance Manager at Rivermark Life Sciences, accountable for the global safety database, aggregate reports, and the signal board for a 14-product book. I would rather find a weak signal early than explain a late one to a Qualified Person or an FDA reviewer.</p><p>I trained on case processing and PSUR clocks at Pinnacle Vigilance, then built a signal-detection rhythm at Solara Safety Partners. The work that matters is clean ICSR coding, a signal that has a method behind it, and a risk-management plan that medical and regulatory can both defend.</p>",
    socials: [
      { platform: "linkedin.com", ref: "francesca-rossi-pv" },
      { platform: "medium.com", ref: "francescarossi" },
    ],
    skills: [
      {
        name: "Pharmacovigilance",
        description:
          "Owns ICSR quality, aggregate reporting, and the signal-to-RMP path for a multi-product global safety book.",
        yearStarted: 2013,
      },
      {
        name: "Patient Safety",
        description:
          "Turns individual case series into benefit-risk language clinicians and regulators can use the same week.",
        yearStarted: 2013,
      },
      {
        name: "GCP",
        description:
          "Keeps SAE reconciliation and SUSAR clocks honest between the safety database and the clinical TMF.",
        yearStarted: 2013,
      },
      {
        name: "Clinical Operations",
        description:
          "Works site and CRO safety desks so query backlogs do not become late 15-day reports.",
        yearStarted: 2014,
      },
      {
        name: "Medical Affairs",
        description:
          "Briefs medical directors on emerging signals before a congress poster or a Dear Investigator letter has to do it.",
        yearStarted: 2016,
      },
      {
        name: "Quality Management",
        description:
          "Runs CAPA on late cases and coding drift instead of treating every deviation as a training reminder.",
        yearStarted: 2015,
      },
      {
        name: "Regulatory Writing",
        description:
          "Authors PSURs, DSURs, and signal evaluation reports that survive both medical and agency review.",
        yearStarted: 2014,
      },
      {
        name: "HIPAA Compliance",
        description:
          "Keeps U.S. case intake and vendor access inside the minimum-necessary line when safety and privacy disagree.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Rivermark Life Sciences",
        description:
          "Philadelphia specialty company with a mixed innovator and established-products book. Safety sits next to medical, not under QA.",
        location: "Philadelphia, PA",
        startDate: "2022-01-10",
        positions: [
          {
            title: "Pharmacovigilance Manager",
            startDate: "2022-01-10",
            projects: [
              {
                name: "Weekly signal board",
                description:
                  "Stood up a weekly quantitative signal board across 14 products using disproportionality plus case-series review. Two validated signals reached RMP updates inside 45 days of first flag.",
                skills: ["Pharmacovigilance", "Patient Safety", "Medical Affairs"],
              },
              {
                name: "ICSR quality reset",
                description:
                  "Cut serious-case coding error from 11% to 3.4% in two quarters by pairing MedDRA recoding audits with a vendor scorecard. Late 15-day reports fell from 8 per quarter to 1.",
                skills: ["Pharmacovigilance", "Quality Management", "GCP"],
              },
              {
                name: "PSUR / PBRER factory",
                description:
                  "Rebuilt the aggregate-report calendar so six PSURs and four DSURs shipped on time for two consecutive years. Medical review moved from the last weekend to a locked two-week window.",
                skills: ["Regulatory Writing", "Pharmacovigilance", "Medical Affairs"],
              },
            ],
          },
        ],
      },
      {
        name: "Solara Safety Partners",
        description:
          "King of Prussia PV consultancy for virtual biotechs that outsourced the safety database and the QPPV backup.",
        location: "King of Prussia, PA",
        startDate: "2017-04-03",
        endDate: "2021-12-23",
        positions: [
          {
            title: "Senior Pharmacovigilance Scientist",
            startDate: "2017-04-03",
            endDate: "2021-12-23",
            projects: [
              {
                name: "Signal method for a thin book",
                description:
                  "Designed a case-series-first method for four pre-approval clients who did not have enough exposure for disproportionality. Caught a hepatic signal on 19 cases that the monthly table had buried.",
                skills: ["Pharmacovigilance", "Patient Safety", "Regulatory Writing"],
              },
              {
                name: "SAE reconciliation drill",
                description:
                  "Reconciled safety-database SAEs against EDC for three Phase III programs. Closed a 41-case gap before database lock and kept the DSUR clock intact.",
                skills: ["GCP", "Clinical Operations", "Quality Management"],
              },
              {
                name: "Privacy-safe intake",
                description:
                  "Rewrote U.S. consumer intake so call-center notes stopped storing full SSNs next to adverse-event narratives.",
                skills: ["HIPAA Compliance", "Pharmacovigilance"],
              },
            ],
          },
        ],
      },
      {
        name: "Pinnacle Vigilance",
        description:
          "Wilmington case-processing shop. Francesca started on the ICSR desk and learned the 15-day clock the hard way.",
        location: "Wilmington, DE",
        startDate: "2013-07-08",
        endDate: "2017-03-24",
        positions: [
          {
            title: "Drug Safety Specialist",
            startDate: "2013-07-08",
            endDate: "2017-03-24",
            projects: [
              {
                name: "Expedited case desk",
                description:
                  "Processed 74 serious U.S. and EU cases a month at peak. Held 15-day compliance at 98.6% for 2015–2016 after a vendor backlog that had sat at 91%.",
                skills: ["Pharmacovigilance", "GCP", "Quality Management"],
              },
              {
                name: "Literature surveillance rota",
                description:
                  "Ran weekly literature review for nine products and converted 23 articles into valid ICSRs that marketing had never sent to safety.",
                skills: ["Pharmacovigilance", "Medical Affairs", "Patient Safety"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Temple University School of Pharmacy",
        degree: "M.S., Pharmacovigilance and Patient Safety",
        dateAwarded: "2016-05-12",
      },
      {
        school: "University of Bologna",
        degree: "M.D.",
        dateAwarded: "2012-07-20",
      },
    ],
    certifications: [
      {
        name: "Certified Professional in Pharmacovigilance",
        issuer: "Drug Information Association",
        dateAwarded: "2018-09-14",
        credentialId: "DIA-PV-2018-7721",
      },
      {
        name: "Certified Quality Auditor",
        issuer: "American Society for Quality",
        dateAwarded: "2020-03-06",
        credentialId: "ASQ-CQA-338401",
      },
    ],
    featuredProjects: [
      {
        name: "Signal board operating model",
        description:
          "<p>Description of the weekly quantitative-plus-case-series board Francesca installed at Rivermark, including the two signals that reached RMP updates inside 45 days.</p>",
        links: [
          { label: "Operating model", url: "https://www.example.com/rivermark/signal-board" },
          { label: "Case study", url: "https://www.example.com/francesca-rossi/signals" },
        ],
        skills: ["Pharmacovigilance", "Patient Safety", "Quality Management"],
      },
      {
        name: "Aggregate report calendar",
        description:
          "<p>The PSUR and DSUR calendar that moved medical review off the last weekend and kept ten aggregate reports on time for two years.</p>",
        links: [
          { label: "Calendar notes", url: "https://www.example.com/rivermark/pbrer-calendar" },
        ],
        skills: ["Regulatory Writing", "Pharmacovigilance"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "pharmaceuticals",
    name: "Grant Holloway",
    title: "CMC Project Lead",
    location: "Indianapolis, IN",
    siteDescription:
      "CMC project lead in Indianapolis who treats tech transfer as a process problem, not a shipping problem.",
    summary:
      "<p>CMC Project Lead at Oakridge Biomanufacturing, accountable for process characterization, PPQ, and the tech-transfer packets that move a drug-substance process from development into a second site. I measure success in batches that stay inside the proven acceptable range, not in slide decks about readiness.</p><p>I came up through process engineering at Westfield Drug Substance and Fairhaven Process Sciences. The work I trust is a control strategy that QA and the plant can both run, a PPQ campaign that does not invent new deviations, and a transfer that the receiving site could execute without the sending team in the room.</p>",
    socials: [
      { platform: "linkedin.com", ref: "grant-holloway-cmc" },
      { platform: "website", ref: "https://www.grantholloway.example.com" },
      { platform: "medium.com", ref: "grantholloway" },
    ],
    skills: [
      {
        name: "CMC Development",
        description:
          "Owns process characterization, control strategy, and the Module 3 story for small-molecule and biologic DS transfers.",
        yearStarted: 2012,
      },
      {
        name: "Quality Management",
        description:
          "Writes PPQ protocols and deviation logic that QA will sign before the plant invents a workaround.",
        yearStarted: 2012,
      },
      {
        name: "Process Safety",
        description:
          "Runs PHA and scale-up hazard reviews when a solvent swap or a larger reactor changes the energy balance.",
        yearStarted: 2013,
      },
      {
        name: "Six Sigma",
        description:
          "Uses designed experiments and capability indices to decide whether a process is ready to leave development.",
        yearStarted: 2014,
      },
      {
        name: "Program Management",
        description:
          "Holds MSAT, QC, QA, and the receiving site to a transfer calendar that survives the first failed batch.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps regulatory, quality, and plant leadership aligned when a PPQ result wants a new specification.",
        yearStarted: 2015,
      },
      {
        name: "Technical Leadership",
        description:
          "Mentors process engineers through characterization plans they can defend in a pre-approval inspection.",
        yearStarted: 2018,
      },
      {
        name: "Production Planning",
        description:
          "Schedules engineering and PPQ lots around commercial demand so the plant is not asked to do both on the same line.",
        yearStarted: 2014,
      },
    ],
    companies: [
      {
        name: "Oakridge Biomanufacturing",
        description:
          "Indianapolis CDMO and captive plant for two virtual biotechs. Drug substance on site; fill-finish contracted.",
        location: "Indianapolis, IN",
        startDate: "2021-06-01",
        positions: [
          {
            title: "CMC Project Lead",
            startDate: "2021-06-01",
            projects: [
              {
                name: "Site-to-site mAb tech transfer",
                description:
                  "Transferred a 2,000 L mAb DS process from the sending development suite to a second Oakridge train. Three PPQ lots landed inside PAR; the receiving team ran lot 3 without the sending MSAT lead on the floor.",
                skills: ["CMC Development", "Program Management", "Technical Leadership"],
              },
              {
                name: "PPQ campaign for a small-molecule API",
                description:
                  "Designed and executed a five-lot PPQ for a high-potency API after a solvent swap. Cpk on the critical impurity stayed above 1.4; zero critical deviations in the campaign.",
                skills: ["CMC Development", "Six Sigma", "Quality Management"],
              },
              {
                name: "PHA on the new hydrogenation suite",
                description:
                  "Led the process-hazard analysis before a hydrogenation scale-up moved from 50 L to 400 L. Two scenarios forced a vent redesign that would have been a late finding in qualification.",
                skills: ["Process Safety", "Stakeholder Management", "Production Planning"],
              },
            ],
          },
        ],
      },
      {
        name: "Fairhaven Process Sciences",
        description:
          "Cincinnati MSAT consultancy that lived inside other people's plants. Grant ran characterization and transfer packets.",
        location: "Cincinnati, OH",
        startDate: "2016-05-16",
        endDate: "2021-05-21",
        positions: [
          {
            title: "Senior Process Engineer",
            startDate: "2018-09-04",
            endDate: "2021-05-21",
            projects: [
              {
                name: "Control strategy rewrite",
                description:
                  "Rebuilt the control strategy for a client's spray-dried intermediate after three commercial lots drifted on residual solvent. Capability recovered without a new capital project.",
                skills: ["CMC Development", "Six Sigma", "Quality Management"],
              },
              {
                name: "Receiving-site playbook",
                description:
                  "Wrote the receiving-site playbook used on four subsequent transfers: batch-record redlines, sampling maps, and the questions QA always asks on day one.",
                skills: ["Technical Leadership", "Program Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Process Engineer",
            startDate: "2016-05-16",
            endDate: "2018-08-31",
            projects: [
              {
                name: "DoE on a crystallization",
                description:
                  "Ran a 16-run designed experiment that moved a crystallization from 62% to 81% isolated yield and tightened PSD enough for the downstream mill to retire a second pass.",
                skills: ["Six Sigma", "CMC Development"],
              },
              {
                name: "Engineering-lot schedule",
                description:
                  "Built the engineering-lot calendar around a sold-out commercial line so characterization did not steal the Friday slot for two months running.",
                skills: ["Production Planning", "Program Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Westfield Drug Substance",
        description:
          "Louisville small-molecule plant. Grant started on the night shift and learned which deviations were real.",
        location: "Louisville, KY",
        startDate: "2012-07-09",
        endDate: "2016-05-06",
        positions: [
          {
            title: "Manufacturing Process Engineer",
            startDate: "2012-07-09",
            endDate: "2016-05-06",
            projects: [
              {
                name: "Night-shift deviation reduction",
                description:
                  "Cut documentation deviations on the night shift by 38% in a year by rewriting the batch-record steps operators actually skipped.",
                skills: ["Quality Management", "Production Planning", "Technical Leadership"],
              },
              {
                name: "Solvent-swap PHA",
                description:
                  "Ran the first formal PHA on a methylene-chloride-to-acetonitrile swap. The relief-device calculation changed the project timeline by six weeks and avoided a later near miss.",
                skills: ["Process Safety", "CMC Development"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Purdue University",
        degree: "B.S., Chemical Engineering",
        dateAwarded: "2012-05-12",
      },
    ],
    certifications: [
      {
        name: "Six Sigma Black Belt",
        issuer: "American Society for Quality",
        dateAwarded: "2017-02-18",
        credentialId: "ASQ-SSBB-190284",
      },
      {
        name: "Project Management Professional",
        issuer: "Project Management Institute",
        dateAwarded: "2019-08-09",
        credentialId: "PMP-3187742",
      },
    ],
    featuredProjects: [
      {
        name: "Receiving-site transfer playbook",
        description:
          "<p>The packet Grant still hands a receiving MSAT team on day one: redlined batch records, sampling maps, PAR tables, and the PHA questions that stop a transfer from becoming a shipping project.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/oakridge/tech-transfer" },
          { label: "PPQ notes", url: "https://www.example.com/grant-holloway/ppq" },
        ],
        skills: ["CMC Development", "Program Management", "Process Safety"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "federal-public-sector",
    name: "Amara Dixon",
    title: "Program Analyst",
    location: "Washington, DC",
    siteDescription:
      "GS-14 program analyst in Washington who evaluates whether a federal program did what the statute paid for, not what the briefing claimed.",
    summary:
      "<p>Program Analyst (GS-14) at the Civic Outcomes Bureau, leading evaluations for three grant-funded portfolios totaling $410M. I design the questions before the money moves, then come back with evidence that survives an IG or an appropriations staffer.</p><p>I started in monitoring at the Mid-Atlantic Grant Collaborative and learned evaluation design at Ridgeway Policy Lab. The work I trust is a logic model that matches the statute, a sample that is not a convenience sample, and a finding that program offices cannot edit into a success story.</p>",
    socials: [
      { platform: "linkedin.com", ref: "amara-dixon" },
      { platform: "website", ref: "https://www.amaradixon.example.com" },
      { platform: "medium.com", ref: "amaradixon" },
    ],
    skills: [
      {
        name: "Program Evaluation",
        description:
          "Designs and leads outcome and implementation evaluations for multi-bureau federal grant portfolios.",
        yearStarted: 2014,
      },
      {
        name: "Policy Analysis",
        description:
          "Reads authorizing language and NOFOs against what grantees actually deliver, then writes the gap in plain English.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Briefs SES sponsors, IG staff, and Hill staff without letting any of them rewrite the findings paragraph.",
        yearStarted: 2015,
      },
      {
        name: "Monitoring and Evaluation",
        description:
          "Builds indicator sets and data-quality checks so a quarterly report is not just a narrative with a table taped on.",
        yearStarted: 2014,
      },
      {
        name: "Grant Management",
        description:
          "Reviews drawdowns, match, and performance against award terms before an evaluation has to discover the problem.",
        yearStarted: 2016,
      },
      {
        name: "Budget Formulation",
        description:
          "Turns evaluation findings into justification language for the next passback, including what should be cut.",
        yearStarted: 2017,
      },
      {
        name: "Regulatory Writing",
        description:
          "Drafts Federal Register notices, evaluation plans, and OMB clearance packages that get through PRA the first time.",
        yearStarted: 2015,
      },
      {
        name: "Change Management",
        description:
          "Helps program offices absorb a finding without pretending the next NOFO will fix a statute problem.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Civic Outcomes Bureau",
        description:
          "Independent evaluation shop inside a fictional civilian agency. Reports to the Deputy, not to the program offices it reviews.",
        location: "Washington, DC",
        startDate: "2020-11-02",
        positions: [
          {
            title: "Program Analyst, GS-14",
            startDate: "2020-11-02",
            projects: [
              {
                name: "Workforce grant portfolio evaluation",
                description:
                  "Led a mixed-methods evaluation of a $180M workforce grant portfolio across 41 states. Found 28% of sites could not document the employment outcome they were paid for; the next NOFO dropped that indicator.",
                skills: ["Program Evaluation", "Monitoring and Evaluation", "Grant Management"],
              },
              {
                name: "PRA clearance for a new survey",
                description:
                  "Wrote the OMB Part A/B package for a 12,000-respondent grantee survey and cleared it in 91 days. The prior package had sat 8 months.",
                skills: ["Regulatory Writing", "Policy Analysis", "Stakeholder Management"],
              },
              {
                name: "Passback justification from findings",
                description:
                  "Turned two evaluation reports into a passback justification that protected $62M and cut $19M from a demonstration that had never met its own logic model.",
                skills: ["Budget Formulation", "Policy Analysis", "Change Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Ridgeway Policy Lab",
        description:
          "D.C. evaluation contractor that staffed civilian agencies. Amara ran implementation studies and learned how to brief SES.",
        location: "Washington, DC",
        startDate: "2016-08-01",
        endDate: "2020-10-23",
        positions: [
          {
            title: "Senior Evaluation Specialist",
            startDate: "2018-06-11",
            endDate: "2020-10-23",
            projects: [
              {
                name: "Implementation study, housing counseling",
                description:
                  "Designed an implementation study of 63 housing-counseling grantees. Site visits showed the fidelity measure in the NOFO did not match how counselors actually spent time.",
                skills: ["Program Evaluation", "Monitoring and Evaluation", "Grant Management"],
              },
              {
                name: "IG liaison on a contested finding",
                description:
                  "Walked an IG team through sampling and weighting after a program office claimed the sample was biased. The finding stood in the public report.",
                skills: ["Stakeholder Management", "Program Evaluation", "Policy Analysis"],
              },
            ],
          },
          {
            title: "Evaluation Specialist",
            startDate: "2016-08-01",
            endDate: "2018-06-08",
            projects: [
              {
                name: "Logic-model rewrite clinic",
                description:
                  "Ran a clinic that rebuilt 11 program logic models so outputs stopped being labeled outcomes. Four of those models later survived OMB evidence-act review.",
                skills: ["Program Evaluation", "Change Management", "Regulatory Writing"],
              },
              {
                name: "Indicator data-quality audit",
                description:
                  "Audited quarterly indicator files for a $90M portfolio and found 17% of records reused the prior quarter's numerator. Built the check that caught it automatically.",
                skills: ["Monitoring and Evaluation", "Grant Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Mid-Atlantic Grant Collaborative",
        description:
          "Baltimore-based technical-assistance shop for state grantees. Amara started on monitoring visits.",
        location: "Baltimore, MD",
        startDate: "2014-06-02",
        endDate: "2016-07-22",
        positions: [
          {
            title: "Monitoring Associate",
            startDate: "2014-06-02",
            endDate: "2016-07-22",
            projects: [
              {
                name: "On-site award monitoring",
                description:
                  "Completed 34 on-site reviews in two years. Documented $2.1M in questioned costs that the federal awarding agency later disallowed.",
                skills: ["Grant Management", "Monitoring and Evaluation", "Policy Analysis"],
              },
              {
                name: "NOFO comment letter",
                description:
                  "Drafted a comment letter that moved a match requirement from 50% to 25% for rural grantees after documenting the actual local-revenue base.",
                skills: ["Regulatory Writing", "Grant Management", "Policy Analysis"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "American University",
        degree: "M.P.A., Public Policy Analysis",
        dateAwarded: "2016-05-08",
      },
      {
        school: "Howard University",
        degree: "B.A., Political Science",
        dateAwarded: "2014-05-10",
      },
    ],
    certifications: [
      {
        name: "Project Management Professional",
        issuer: "Project Management Institute",
        dateAwarded: "2019-11-15",
        credentialId: "PMP-2944180",
      },
      {
        name: "Certified Government Financial Manager",
        issuer: "Association of Government Accountants",
        dateAwarded: "2021-06-03",
        credentialId: "CGFM-441902",
      },
    ],
    featuredProjects: [
      {
        name: "Workforce portfolio evaluation",
        description:
          "<p>Public summary of the $180M workforce evaluation: sampling, the 28% documentation gap, and the NOFO change that followed. Written so an appropriations staffer can read it in one sitting.</p>",
        links: [
          { label: "Evaluation brief", url: "https://www.example.com/civic-outcomes/workforce" },
          { label: "Methods note", url: "https://www.example.com/amara-dixon/methods" },
        ],
        skills: ["Program Evaluation", "Monitoring and Evaluation", "Policy Analysis"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "federal-public-sector",
    name: "Wesley Cho",
    title: "Contracting Officer",
    location: "Arlington, VA",
    siteDescription:
      "Warranted contracting officer in Arlington who treats source selection as a record you can defend, not a meeting you can win.",
    summary:
      "<p>Contracting Officer at Halcyon Acquisition Command with an unlimited warrant on civilian services and a $1.2B IDIQ book. I care about the evaluation notice that matches the RFP, the file that survives a GAO protest, and the modification that does not invent new scope.</p><p>I learned the FAR the slow way at the Arlington Procurement Office and Vesper Contracting Partners. The work I trust is a source-selection decision document that quotes the factors, a debrief that does not create a new protest ground, and a contractor that gets paid for what the contract actually said.</p>",
    socials: [
      { platform: "linkedin.com", ref: "wesley-cho-co" },
      { platform: "website", ref: "https://www.wesleycho.example.com" },
    ],
    skills: [
      {
        name: "Procurement",
        description:
          "Warranted CO for civilian services: IDIQs, BPA calls, and competitive 15.3 source selections through award.",
        yearStarted: 2012,
      },
      {
        name: "Contract Negotiation",
        description:
          "Leads discussions, FPRs, and cost realism so the award decision is not just the lowest color rating.",
        yearStarted: 2012,
      },
      {
        name: "Policy Analysis",
        description:
          "Reads FAR/DFARS deviations and class deviations against the file before a program office asks for a shortcut.",
        yearStarted: 2013,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps PMs, legal, and small-business advocates inside the evaluation plan when a protest clock starts.",
        yearStarted: 2014,
      },
      {
        name: "Program Management",
        description:
          "Runs the acquisition timeline so a late PWS does not become a sole-source letter two weeks before need.",
        yearStarted: 2016,
      },
      {
        name: "Legal Research",
        description:
          "Shepardizes GAO and COFC decisions that actually apply to the evaluation factor in dispute.",
        yearStarted: 2013,
      },
      {
        name: "Regulatory Writing",
        description:
          "Drafts RFPs, evaluation notices, and SSDDs that quote the solicitation instead of the program office's memory.",
        yearStarted: 2015,
      },
      {
        name: "GRC",
        description:
          "Holds OCI, organizational conflict, and contractor-system reviews before award, not after the IG asks.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Halcyon Acquisition Command",
        description:
          "Fictional civilian contracting activity in Arlington. Unlimited warrant desk for professional services and IT support.",
        location: "Arlington, VA",
        startDate: "2021-04-12",
        positions: [
          {
            title: "Contracting Officer",
            startDate: "2021-04-12",
            projects: [
              {
                name: "ATLAS professional-services IDIQ",
                description:
                  "Awarded a $1.2B multiple-award IDIQ after a 15.3 competition with 19 proposals. One protest; GAO denied in 88 days because the SSDD quoted the factors the RFP actually used.",
                skills: ["Procurement", "Regulatory Writing", "Legal Research"],
              },
              {
                name: "Cost-realism discussions",
                description:
                  "Led discussions and FPRs on a $84M task order where the apparent winner was 31% below the IGE. Cost realism held; the award went to the second-lowest, and the debrief produced no protest.",
                skills: ["Contract Negotiation", "Procurement", "Stakeholder Management"],
              },
              {
                name: "OCI cleanup before award",
                description:
                  "Stopped an award 11 days out after an OCI review showed a subcontractor had written the PWS. Recompeted the work; the file later survived an IG sample.",
                skills: ["GRC", "Policy Analysis", "Legal Research"],
              },
            ],
          },
        ],
      },
      {
        name: "Vesper Contracting Partners",
        description:
          "Arlington acquisition-support contractor. Wesley sat in other agencies' files and learned which shortcuts become protests.",
        location: "Arlington, VA",
        startDate: "2016-02-01",
        endDate: "2021-04-02",
        positions: [
          {
            title: "Lead Acquisition Specialist",
            startDate: "2018-03-19",
            endDate: "2021-04-02",
            projects: [
              {
                name: "Source-selection file rebuild",
                description:
                  "Rebuilt a contaminated evaluation file after a CO left mid-competition. New consensus report, new SSDD, award in 47 days; no protest.",
                skills: ["Procurement", "Regulatory Writing", "Program Management"],
              },
              {
                name: "Class-deviation tracker",
                description:
                  "Built the shop's tracker for CAAC and agency class deviations so COs stopped citing expired flexibilities in RFPs.",
                skills: ["Policy Analysis", "GRC", "Regulatory Writing"],
              },
            ],
          },
          {
            title: "Acquisition Specialist",
            startDate: "2016-02-01",
            endDate: "2018-03-16",
            projects: [
              {
                name: "BPA call discipline",
                description:
                  "Wrote the call-order template that forced a fair-opportunity memo on every BPA call over the SAT. Call protests in that office went to zero for 18 months.",
                skills: ["Procurement", "Regulatory Writing"],
              },
              {
                name: "Small-business set-aside analysis",
                description:
                  "Documented the Rule of Two analysis that moved a $19M IT support buy from unrestricted to 8(a). Award held on protest.",
                skills: ["Policy Analysis", "Legal Research", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Arlington Procurement Office",
        description:
          "Entry shop where Wesley earned a $5M warrant and learned to read a file from the back.",
        location: "Arlington, VA",
        startDate: "2012-07-16",
        endDate: "2016-01-22",
        positions: [
          {
            title: "Contract Specialist",
            startDate: "2012-07-16",
            endDate: "2016-01-22",
            projects: [
              {
                name: "Simplified acquisition desk",
                description:
                  "Closed 200-plus SAP actions a year under a $5M warrant. Average award time on commercial items dropped from 34 days to 19 after a clause library rewrite.",
                skills: ["Procurement", "Contract Negotiation", "Program Management"],
              },
              {
                name: "First protest support",
                description:
                  "Assembled the agency report on a $3.2M protest. GAO denied; the evaluation notices were the exhibit that mattered.",
                skills: ["Legal Research", "Regulatory Writing", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "George Mason University",
        degree: "M.P.A., Public Administration",
        dateAwarded: "2015-05-16",
      },
      {
        school: "Virginia Tech",
        degree: "B.S., Public and Urban Affairs",
        dateAwarded: "2012-05-12",
      },
    ],
    certifications: [
      {
        name: "FAC-C Professional (Level III equivalent)",
        issuer: "Federal Acquisition Institute",
        dateAwarded: "2019-04-22",
        credentialId: "FAC-C-PRO-2019-1184",
      },
      {
        name: "Certified Professional Contracts Manager",
        issuer: "National Contract Management Association",
        dateAwarded: "2020-10-09",
        credentialId: "CPCM-882041",
      },
    ],
    featuredProjects: [
      {
        name: "ATLAS IDIQ source-selection record",
        description:
          "<p>Redacted walkthrough of the $1.2B ATLAS competition: evaluation plan, consensus, SSDD excerpts, and why the protest record held at GAO.</p>",
        links: [
          { label: "Record brief", url: "https://www.example.com/halcyon/atlas-idiq" },
          { label: "Debrief notes", url: "https://www.example.com/wesley-cho/debriefs" },
        ],
        skills: ["Procurement", "Contract Negotiation", "Legal Research"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "federal-public-sector",
    name: "Noelle Hartman",
    title: "Policy Advisor",
    location: "Denver, CO",
    siteDescription:
      "Policy advisor in Denver who writes the state-federal rule so an agency can implement it, not just announce it.",
    summary:
      "<p>Policy Advisor at the Intermountain Regulatory Council, writing the state-federal interface on air, water, and wildfire-mitigation rules. I draft the preamble, the implementation memo, and the letter to the regional office that has to live with the result.</p><p>I started in advocacy comments at Front Range Policy Works and spent four years inside the Colorado Compact Office. The work I trust is a rule that a regional staffer can implement without calling counsel, a comment-response that actually answers the comment, and a cooperative-federalism deal that still has a statute underneath it.</p>",
    socials: [
      { platform: "linkedin.com", ref: "noelle-hartman" },
      { platform: "medium.com", ref: "noellehartman" },
      { platform: "website", ref: "https://www.noellehartman.example.com" },
    ],
    skills: [
      {
        name: "Regulatory Writing",
        description:
          "Drafts preambles, implementation memos, and comment-response documents that a regional office can run.",
        yearStarted: 2014,
      },
      {
        name: "Policy Analysis",
        description:
          "Maps state statutes against federal minimums so a 'more stringent' claim is documented, not assumed.",
        yearStarted: 2013,
      },
      {
        name: "Legal Writing",
        description:
          "Writes the finding, the citation, and the sentence that will be quoted in the first challenge.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Runs tribal, county, and industry consultation without letting the loudest comment rewrite the record.",
        yearStarted: 2015,
      },
      {
        name: "Program Evaluation",
        description:
          "Tests whether a rule's reporting burden produced the data the agency said it needed.",
        yearStarted: 2016,
      },
      {
        name: "Policy Advocacy",
        description:
          "Builds comment letters and hearing testimony that cite the docket, not the press release.",
        yearStarted: 2014,
      },
      {
        name: "Grant Writing",
        description:
          "Turns a rule's implementation gap into a fundable workplan when the statute did not appropriate the staff.",
        yearStarted: 2015,
      },
      {
        name: "Change Management",
        description:
          "Walks program staff through a new rule so the first month is not a pile of unofficial guidance emails.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Intermountain Regulatory Council",
        description:
          "Denver compact of western states that coordinates comments and implementation on federal environmental rules.",
        location: "Denver, CO",
        startDate: "2022-03-07",
        positions: [
          {
            title: "Policy Advisor",
            startDate: "2022-03-07",
            projects: [
              {
                name: "Wildfire-mitigation implementation memo",
                description:
                  "Wrote the seven-state implementation memo for a federal wildfire-mitigation rule. Regional offices used the memo as the inspection checklist; informal guidance emails dropped by half in the first season.",
                skills: ["Regulatory Writing", "Change Management", "Stakeholder Management"],
              },
              {
                name: "More-stringent analysis, ozone",
                description:
                  "Documented where three state ozone rules exceeded the federal minimum and where they only looked like they did. Two states rewrote their SIP narrative before EPA asked.",
                skills: ["Policy Analysis", "Legal Writing", "Regulatory Writing"],
              },
              {
                name: "Comment-response on a water docket",
                description:
                  "Staffed the comment-response for a 1,400-comment water-quality docket. Every form-letter cluster got one answer; the unique technical comments got citations.",
                skills: ["Policy Advocacy", "Legal Writing", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Colorado Compact Office",
        description:
          "State office that coordinated Colorado's positions with federal regional staff. Noelle wrote the letters the Attorney General later signed.",
        location: "Denver, CO",
        startDate: "2017-01-09",
        endDate: "2022-02-25",
        positions: [
          {
            title: "Senior Policy Analyst",
            startDate: "2019-05-06",
            endDate: "2022-02-25",
            projects: [
              {
                name: "Cooperative-federalism MOU",
                description:
                  "Drafted the MOU that split inspection responsibility on a federal land-management rule. The MOU was cited in two later lawsuits and held.",
                skills: ["Legal Writing", "Policy Analysis", "Stakeholder Management"],
              },
              {
                name: "Reporting-burden evaluation",
                description:
                  "Evaluated a quarterly reporting rule after two years and showed 41% of fields were never used in enforcement. The next revision cut the form by a third.",
                skills: ["Program Evaluation", "Regulatory Writing", "Change Management"],
              },
            ],
          },
          {
            title: "Policy Analyst",
            startDate: "2017-01-09",
            endDate: "2019-05-03",
            projects: [
              {
                name: "Implementation grant for rural counties",
                description:
                  "Wrote the workplan that pulled $4.6M in federal implementation money for 11 rural counties that could not hire their own rule staff.",
                skills: ["Grant Writing", "Policy Advocacy", "Policy Analysis"],
              },
              {
                name: "Hearing testimony book",
                description:
                  "Built the testimony book for three legislative hearings so members quoted the docket instead of the lobby one-pager.",
                skills: ["Policy Advocacy", "Legal Writing"],
              },
            ],
          },
        ],
      },
      {
        name: "Front Range Policy Works",
        description:
          "Denver shop that wrote comments for counties and watershed districts. Noelle learned the docket before she learned the building.",
        location: "Denver, CO",
        startDate: "2013-08-12",
        endDate: "2016-12-22",
        positions: [
          {
            title: "Policy Associate",
            startDate: "2013-08-12",
            endDate: "2016-12-22",
            projects: [
              {
                name: "County comment factory",
                description:
                  "Drafted 40-plus docket comments in three years. Eight were quoted in final preambles; two changed a compliance deadline.",
                skills: ["Policy Advocacy", "Regulatory Writing", "Policy Analysis"],
              },
              {
                name: "Stakeholder workshop series",
                description:
                  "Ran 12 county workshops on a pending air rule. Attendance notes became the consultation record the state later filed.",
                skills: ["Stakeholder Management", "Change Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Colorado Law School",
        degree: "J.D.",
        dateAwarded: "2016-05-14",
      },
      {
        school: "University of Colorado Boulder",
        degree: "B.A., Environmental Studies",
        dateAwarded: "2013-05-11",
      },
    ],
    certifications: [
      {
        name: "Admitted to the Colorado Bar",
        issuer: "Colorado Supreme Court",
        dateAwarded: "2016-10-21",
        credentialId: "CO-BAR-2016-44821",
      },
      {
        name: "Regulatory Affairs Certificate, Government Track",
        issuer: "Regulatory Affairs Professionals Society",
        dateAwarded: "2020-02-07",
        credentialId: "RAPS-GOV-2020-331",
      },
    ],
    featuredProjects: [
      {
        name: "Wildfire-mitigation implementation memo",
        description:
          "<p>The seven-state memo regional offices used as an inspection checklist, plus the consultation log that kept unofficial guidance from becoming the real rule.</p>",
        links: [
          { label: "Memo", url: "https://www.example.com/intermountain/wildfire-memo" },
          { label: "Consultation log", url: "https://www.example.com/noelle-hartman/consultation" },
        ],
        skills: ["Regulatory Writing", "Policy Analysis", "Stakeholder Management"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "federal-public-sector",
    name: "Isaac Flores",
    title: "Budget Analyst",
    location: "Sacramento, CA",
    siteDescription:
      "Budget analyst in Sacramento who formulates the request, then stays for the mid-year execution when the allotment does not match the story.",
    summary:
      "<p>Budget Analyst at the Pacific Budget Institute, leading formulation and mid-year execution for a $2.4B civilian portfolio. I build the justification, the allotment plan, and the reprogramming package when the enacted bill does not match the request.</p><p>I learned formulation at the Sacramento Fiscal Office and execution at Cascade Appropriations Group. The work I trust is a decision unit that still makes sense in May, a vacancy factor that is not a wish, and a mid-year cut that program offices can actually take.</p>",
    socials: [
      { platform: "linkedin.com", ref: "isaac-flores-budget" },
      { platform: "website", ref: "https://www.isaacflores.example.com" },
    ],
    skills: [
      {
        name: "Budget Formulation",
        description:
          "Builds decision units, vacancy factors, and passback options for a multi-bureau civilian request.",
        yearStarted: 2013,
      },
      {
        name: "Financial Reporting",
        description:
          "Closes monthly execution against allotment so a mid-year story is not written from the last invoice.",
        yearStarted: 2013,
      },
      {
        name: "Financial Modeling",
        description:
          "Models out-year scenarios when a one-time fund or a delayed hire would otherwise hide a structural gap.",
        yearStarted: 2014,
      },
      {
        name: "Policy Analysis",
        description:
          "Reads authorizing language against the request so a new initiative is not just a plus-up without a statute.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Walks program chiefs through a cut list without letting the loudest bureau rewrite the target.",
        yearStarted: 2016,
      },
      {
        name: "Program Evaluation",
        description:
          "Uses performance evidence to decide which decision units get protected in passback.",
        yearStarted: 2016,
      },
      {
        name: "GAAP",
        description:
          "Keeps fund accounting and accrual treatments honest when a program office wants cash-basis comfort.",
        yearStarted: 2013,
      },
      {
        name: "Grant Management",
        description:
          "Tracks pass-through awards and match so execution reports do not treat obligated grants as spent.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Pacific Budget Institute",
        description:
          "Sacramento formulation shop that staffs a fictional civilian department's request and mid-year execution.",
        location: "Sacramento, CA",
        startDate: "2021-08-16",
        positions: [
          {
            title: "Budget Analyst",
            startDate: "2021-08-16",
            projects: [
              {
                name: "FY23–FY25 formulation cycle",
                description:
                  "Led formulation for a $2.4B portfolio across four bureaus. Vacancy-factor rewrite freed $31M without a program cut; the passback protected two evidence-backed decision units and reduced a demonstration that had never spent its first-year allotment.",
                skills: ["Budget Formulation", "Financial Modeling", "Program Evaluation"],
              },
              {
                name: "Mid-year reprogramming",
                description:
                  "Built the mid-year package that moved $47M after a delayed hire freeze. Every line cited the allotment, not the original request, and the control agency approved on first review.",
                skills: ["Financial Reporting", "Stakeholder Management", "GAAP"],
              },
              {
                name: "Pass-through grant execution",
                description:
                  "Separated obligated pass-through awards from expended amounts in the monthly close. The prior report had overstated execution by 9% in two quarters.",
                skills: ["Grant Management", "Financial Reporting", "Policy Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "Sacramento Fiscal Office",
        description:
          "State-adjacent budget office that prepared the departmental request. Isaac owned personal services and operating expenses.",
        location: "Sacramento, CA",
        startDate: "2016-09-06",
        endDate: "2021-08-06",
        positions: [
          {
            title: "Senior Budget Analyst",
            startDate: "2018-11-01",
            endDate: "2021-08-06",
            projects: [
              {
                name: "Personal-services model",
                description:
                  "Rebuilt the personal-services model so salary savings stopped being a plug. The next request was $18M closer to actual execution.",
                skills: ["Financial Modeling", "Budget Formulation", "GAAP"],
              },
              {
                name: "Cut-list workshop",
                description:
                  "Ran the mid-year cut workshop that produced a ranked list instead of an across-the-board percent. Three bureaus took the list; one appealed and lost on the evidence.",
                skills: ["Stakeholder Management", "Program Evaluation", "Policy Analysis"],
              },
            ],
          },
          {
            title: "Budget Analyst",
            startDate: "2016-09-06",
            endDate: "2018-10-31",
            projects: [
              {
                name: "Monthly execution close",
                description:
                  "Closed monthly execution for a $620M bureau. Brought the average close from day 18 to day 9 by locking journal-source rules.",
                skills: ["Financial Reporting", "GAAP"],
              },
              {
                name: "One-time vs. ongoing split",
                description:
                  "Tagged one-time funds so they could not hide in the base. The next out-year showed a $12M cliff the program office had not briefed.",
                skills: ["Budget Formulation", "Financial Modeling", "Policy Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "Cascade Appropriations Group",
        description:
          "Portland shop that built justification books for western civilian agencies. Isaac started on the tables.",
        location: "Portland, OR",
        startDate: "2013-06-10",
        endDate: "2016-08-26",
        positions: [
          {
            title: "Junior Budget Analyst",
            startDate: "2013-06-10",
            endDate: "2016-08-26",
            projects: [
              {
                name: "Justification book tables",
                description:
                  "Owned the object-class tables for three decision units. Caught a $6.4M double-count before the book went to the control agency.",
                skills: ["Budget Formulation", "Financial Reporting"],
              },
              {
                name: "Grant-match schedule",
                description:
                  "Built the first match schedule that showed state and local match as a constraint, not a footnote. Two awards were resized before the NOFO dropped.",
                skills: ["Grant Management", "Policy Analysis"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, Davis",
        degree: "M.P.P., Public Policy",
        dateAwarded: "2015-06-12",
      },
      {
        school: "California State University, Sacramento",
        degree: "B.A., Economics",
        dateAwarded: "2013-05-18",
      },
    ],
    certifications: [
      {
        name: "Certified Government Financial Manager",
        issuer: "Association of Government Accountants",
        dateAwarded: "2018-05-11",
        credentialId: "CGFM-390118",
      },
      {
        name: "Certified Public Finance Officer",
        issuer: "Government Finance Officers Association",
        dateAwarded: "2020-09-18",
        credentialId: "CPFO-2020-7714",
      },
    ],
    featuredProjects: [
      {
        name: "Vacancy-factor rewrite",
        description:
          "<p>How the FY23 personal-services model stopped treating vacancy as a plug and freed $31M without a program cut. Includes the mid-year reprogramming that followed when hiring still lagged.</p>",
        links: [
          { label: "Model note", url: "https://www.example.com/pacific-budget/vacancy" },
          { label: "Execution brief", url: "https://www.example.com/isaac-flores/execution" },
        ],
        skills: ["Budget Formulation", "Financial Modeling", "Financial Reporting"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "aerospace-defense",
    name: "Rhea Kapoor",
    title: "Systems Engineer",
    location: "Huntsville, AL",
    siteDescription:
      "Systems engineer in Huntsville who keeps the SysML model, the requirements database, and the interface-control document telling the same story.",
    summary:
      "<p>Systems Engineer at Aetherion Defense Systems, owning MBSE and requirements for a ground-based interceptor support program. I would rather find a broken interface in the model than on the range.</p><p>I came up through requirements writing at Clearline Mission Engineering and model work at Redstone Model Works. The work I trust is a requirement that has a verification method, a block that matches the ICD, and a change that does not silently orphan a child requirement.</p>",
    socials: [
      { platform: "linkedin.com", ref: "rhea-kapoor-se" },
      { platform: "website", ref: "https://www.rheakapoor.example.com" },
      { platform: "medium.com", ref: "rheakapoor" },
    ],
    skills: [
      {
        name: "Systems Engineering",
        description:
          "Owns architecture, interfaces, and verification planning from SRR through TRR on ground-based missile-support systems.",
        yearStarted: 2013,
      },
      {
        name: "Model-Based Systems Engineering",
        description:
          "Keeps the SysML model as the source of truth so ICDs and requirements are generated, not retyped.",
        yearStarted: 2015,
      },
      {
        name: "Requirements Management",
        description:
          "Writes shall statements with verification methods and traces them through the change board instead of a spreadsheet graveyard.",
        yearStarted: 2013,
      },
      {
        name: "Configuration Management",
        description:
          "Baselines the model and the spec together so a late ICD change cannot hide in someone's email.",
        yearStarted: 2014,
      },
      {
        name: "System Design",
        description:
          "Allocates functions to hardware and software blocks before the first drawing release, not after.",
        yearStarted: 2014,
      },
      {
        name: "Technical Leadership",
        description:
          "Runs the SE working group so specialty engineering shows up before PDR, not with a finding after it.",
        yearStarted: 2018,
      },
      {
        name: "Program Management",
        description:
          "Holds the SE schedule against the program IMS so a late requirement does not become a late test.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Walks the customer, the prime, and the software IPT through a requirement change without three different versions leaving the room.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Aetherion Defense Systems",
        description:
          "Huntsville prime on a ground-based interceptor support contract. MBSE is required, not a pilot.",
        location: "Huntsville, AL",
        startDate: "2021-02-01",
        positions: [
          {
            title: "Systems Engineer",
            startDate: "2021-02-01",
            projects: [
              {
                name: "Interceptor support SysML baseline",
                description:
                  "Built the program SysML baseline used at SRR and PDR. Generated 1,140 requirements and 86 ICDs from the model; customer review comments on inconsistency dropped 40% versus the prior document-based cycle.",
                skills: [
                  "Model-Based Systems Engineering",
                  "Requirements Management",
                  "System Design",
                ],
              },
              {
                name: "Interface change board",
                description:
                  "Stood up a weekly interface board that closed 63 ICD deltas in two quarters. Zero orphaned child requirements after the first month of CM discipline.",
                skills: [
                  "Configuration Management",
                  "Systems Engineering",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Verification method cleanup",
                description:
                  "Rewrote 210 shalls that had 'verify by analysis' with no analysis owner. TRR entry criteria stopped being a negotiation.",
                skills: ["Requirements Management", "Systems Engineering", "Program Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Redstone Model Works",
        description:
          "Huntsville MBSE shop that embedded on primes. Rhea learned which models die after the first review.",
        location: "Huntsville, AL",
        startDate: "2016-04-11",
        endDate: "2021-01-22",
        positions: [
          {
            title: "MBSE Engineer",
            startDate: "2016-04-11",
            endDate: "2021-01-22",
            projects: [
              {
                name: "Model-to-spec pipeline",
                description:
                  "Automated spec generation from SysML so the Word baseline stopped drifting from the model within a week of PDR.",
                skills: [
                  "Model-Based Systems Engineering",
                  "Configuration Management",
                  "Technical Leadership",
                ],
              },
              {
                name: "Functional allocation workshop",
                description:
                  "Ran allocation workshops that moved 19 software functions off an overloaded processor before CDR drawings froze.",
                skills: ["System Design", "Systems Engineering", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Clearline Mission Engineering",
        description:
          "Requirements house for Redstone programs. Rhea started on the shall statements.",
        location: "Huntsville, AL",
        startDate: "2013-06-03",
        endDate: "2016-04-01",
        positions: [
          {
            title: "Requirements Engineer",
            startDate: "2013-06-03",
            endDate: "2016-04-01",
            projects: [
              {
                name: "Shall-statement rewrite",
                description:
                  "Rewrote 400-plus compound shalls into verifiable singles. Test planning used the new set without a translation spreadsheet.",
                skills: ["Requirements Management", "Systems Engineering"],
              },
              {
                name: "Trace matrix rescue",
                description:
                  "Rebuilt a broken parent-child trace before a customer audit. The audit found two gaps instead of the 70 the draft matrix had hidden.",
                skills: [
                  "Requirements Management",
                  "Configuration Management",
                  "Program Management",
                ],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Alabama in Huntsville",
        degree: "M.S., Systems Engineering",
        dateAwarded: "2016-05-07",
      },
      {
        school: "Indian Institute of Technology Bombay",
        degree: "B.Tech., Aerospace Engineering",
        dateAwarded: "2013-05-15",
      },
    ],
    certifications: [
      {
        name: "INCOSE Certified Systems Engineering Professional",
        issuer: "International Council on Systems Engineering",
        dateAwarded: "2018-09-12",
        credentialId: "CSEP-2018-4419",
      },
      {
        name: "OMG Certified Systems Modeling Professional",
        issuer: "Object Management Group",
        dateAwarded: "2017-03-24",
        credentialId: "OCSMP-MB-77201",
      },
    ],
    featuredProjects: [
      {
        name: "Interceptor SysML baseline",
        description:
          "<p>How the Aetherion model became the SRR and PDR source of truth: generated requirements, ICDs, and the change-board rule that stopped orphaned children.</p>",
        links: [
          { label: "Baseline note", url: "https://www.example.com/aetherion/sysml-baseline" },
          { label: "Trace method", url: "https://www.example.com/rhea-kapoor/trace" },
        ],
        skills: [
          "Model-Based Systems Engineering",
          "Requirements Management",
          "Configuration Management",
        ],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "aerospace-defense",
    name: "Tyler Grayson",
    title: "Flight Test Engineer",
    location: "Palmdale, CA",
    siteDescription:
      "Flight test engineer in Palmdale who writes the card, flies the point, and treats DO-178C evidence as part of the sortie, not a folder that gets filled in later.",
    summary:
      "<p>Flight Test Engineer at Skylance Flight Sciences, leading envelope-expansion and airworthiness cards on a remotely piloted test article. I plan the point, brief the crew, and close the data so the next card is not written from memory.</p><p>I started on instrumentation at Mojave Envelope Group and learned software airworthiness at Palmdale Airworthiness Lab. The work I trust is a test hazard analysis that changes the card, a DO-178C artifact that matches what flew, and a data package that FAA or the customer can read without a translator.</p>",
    socials: [
      { platform: "linkedin.com", ref: "tyler-grayson-fte" },
      { platform: "website", ref: "https://www.tylergrayson.example.com" },
    ],
    skills: [
      {
        name: "Flight Test",
        description:
          "Plans, briefs, and closes envelope-expansion and flying-qualities cards on manned and remotely piloted articles.",
        yearStarted: 2012,
      },
      {
        name: "DO-178C",
        description:
          "Treats airborne software evidence as part of the sortie: what flew, which build, which objectives closed.",
        yearStarted: 2014,
      },
      {
        name: "Systems Engineering",
        description:
          "Turns a verification requirement into a card that has a condition, a tolerance, and a stop rule.",
        yearStarted: 2012,
      },
      {
        name: "FAA Compliance",
        description:
          "Builds airworthiness and experimental-certificate packages that a DER or ASI can follow without a side briefing.",
        yearStarted: 2013,
      },
      {
        name: "Requirements Management",
        description:
          "Traces each card back to a shall so a successful flight is also a closed verification.",
        yearStarted: 2013,
      },
      {
        name: "Safety Management Systems",
        description:
          "Writes test hazard analyses that change the card, not just the signature block.",
        yearStarted: 2015,
      },
      {
        name: "Avionics",
        description:
          "Knows which box, which load, and which bus log to pull when the point does not match the prediction.",
        yearStarted: 2012,
      },
      {
        name: "Quality Management",
        description:
          "Closes configuration and data anomalies before the next go, instead of stacking them into a later mystery.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Skylance Flight Sciences",
        description:
          "Palmdale test organization flying a remotely piloted experimental article under an FAA experimental certificate.",
        location: "Palmdale, CA",
        startDate: "2020-06-08",
        positions: [
          {
            title: "Flight Test Engineer",
            startDate: "2020-06-08",
            projects: [
              {
                name: "Envelope expansion, Block 3",
                description:
                  "Led 41 envelope-expansion sorties on Block 3. Closed 28 flying-qualities shalls; two cards were rewritten after the THA, not after a near miss.",
                skills: ["Flight Test", "Safety Management Systems", "Requirements Management"],
              },
              {
                name: "Software build-to-sortie evidence",
                description:
                  "Tied each sortie to a DO-178C software build and objective set. A configuration mismatch was caught on the ground twice; it had been the source of a prior no-score flight.",
                skills: ["DO-178C", "Avionics", "Quality Management"],
              },
              {
                name: "Experimental-certificate renewal",
                description:
                  "Rebuilt the experimental-certificate package for the ASI visit. Operating limitations stayed intact; the data package answered the 14 questions that had been oral tradition.",
                skills: ["FAA Compliance", "Systems Engineering", "Flight Test"],
              },
            ],
          },
        ],
      },
      {
        name: "Palmdale Airworthiness Lab",
        description:
          "Software airworthiness shop supporting experimental and limited-category aircraft. Tyler learned DO-178C the long way.",
        location: "Palmdale, CA",
        startDate: "2015-03-02",
        endDate: "2020-05-29",
        positions: [
          {
            title: "Airworthiness Engineer",
            startDate: "2015-03-02",
            endDate: "2020-05-29",
            projects: [
              {
                name: "Level C objective closeout",
                description:
                  "Closed 94 DO-178C Level C objectives for a flight-control load. The DER accepted the package on the second cycle after Tyler rewrote the trace, not the tests.",
                skills: ["DO-178C", "Requirements Management", "Quality Management"],
              },
              {
                name: "Load-control desk",
                description:
                  "Ran the software load-control desk for three test articles. Zero unauthorized loads in 22 months after a two-person verify rule.",
                skills: ["Avionics", "Quality Management", "FAA Compliance"],
              },
            ],
          },
        ],
      },
      {
        name: "Mojave Envelope Group",
        description:
          "Mojave instrumentation and card-support shop. Tyler started on the telemetry van.",
        location: "Mojave, CA",
        startDate: "2012-07-16",
        endDate: "2015-02-20",
        positions: [
          {
            title: "Test Instrumentation Engineer",
            startDate: "2012-07-16",
            endDate: "2015-02-20",
            projects: [
              {
                name: "Telemetry package rebuild",
                description:
                  "Rebuilt the TM package so 12 critical parameters stopped dropping on high-g points. Data loss on those parameters went from 8% of frames to under 0.4%.",
                skills: ["Flight Test", "Avionics", "Systems Engineering"],
              },
              {
                name: "Card-to-parameter map",
                description:
                  "Mapped each card's success criteria to TM parameters before the brief. Two cards were delayed because the parameter was not on the jet; that was the point.",
                skills: ["Flight Test", "Requirements Management", "Safety Management Systems"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Embry-Riddle Aeronautical University",
        degree: "M.S., Flight Test Engineering",
        dateAwarded: "2015-12-12",
      },
      {
        school: "California Polytechnic State University",
        degree: "B.S., Aerospace Engineering",
        dateAwarded: "2012-06-16",
      },
    ],
    certifications: [
      {
        name: "Society of Flight Test Engineers Membership and Course Certificate",
        issuer: "Society of Flight Test Engineers",
        dateAwarded: "2016-08-19",
        credentialId: "SFTE-FTE-2016-229",
      },
      {
        name: "DO-178C Practitioner Certificate",
        issuer: "Avionics Certification Institute",
        dateAwarded: "2017-11-03",
        credentialId: "ACI-178C-44108",
      },
    ],
    featuredProjects: [
      {
        name: "Build-to-sortie evidence method",
        description:
          "<p>The method that ties each Palmdale sortie to a DO-178C build and objective set, plus the two ground catches that used to become no-score flights.</p>",
        links: [
          { label: "Method", url: "https://www.example.com/skylance/build-to-sortie" },
          { label: "Card notes", url: "https://www.example.com/tyler-grayson/cards" },
        ],
        skills: ["Flight Test", "DO-178C", "Quality Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "aerospace-defense",
    name: "Ingrid Solberg",
    title: "Avionics Lead",
    location: "Seattle, WA",
    siteDescription:
      "Avionics lead in Seattle who treats the load, the as-built, and the CM baseline as one configuration, not three stories.",
    summary:
      "<p>Avionics Lead at Cascadia Avionics, accountable for the flight-control and comms suite on a commercial-derivative special-mission aircraft. I own the box list, the software loads, and the change that would otherwise live in a technician's notebook.</p><p>I started in LRU integration at Puget Sound Flight Electronics and ran configuration at Rainier Config Systems. The work I trust is a baseline that matches the jet, a DO-178C load that has a release record, and a change board that happens before the next flight, not after.</p>",
    socials: [
      { platform: "linkedin.com", ref: "ingrid-solberg" },
      { platform: "medium.com", ref: "ingridsolberg" },
      { platform: "website", ref: "https://www.ingridsolberg.example.com" },
    ],
    skills: [
      {
        name: "Avionics",
        description:
          "Owns flight-control, comms, and navigation LRU integration on commercial-derivative special-mission aircraft.",
        yearStarted: 2011,
      },
      {
        name: "Configuration Management",
        description:
          "Keeps as-designed, as-built, and as-flown baselines in one record so a load cannot hide in a notebook.",
        yearStarted: 2012,
      },
      {
        name: "DO-178C",
        description:
          "Releases airborne software only with the objective evidence and the aircraft effectivity attached.",
        yearStarted: 2013,
      },
      {
        name: "Systems Engineering",
        description:
          "Allocates avionics functions and interfaces before a drawing or a load request is allowed to proceed.",
        yearStarted: 2011,
      },
      {
        name: "Technical Leadership",
        description:
          "Runs the avionics IPT so software, hardware, and the hangar are looking at the same effectivity.",
        yearStarted: 2016,
      },
      {
        name: "Requirements Management",
        description:
          "Traces LRU and software changes back to the shall that justified the board action.",
        yearStarted: 2012,
      },
      {
        name: "FAA Compliance",
        description:
          "Builds the data that a DER or ASI needs for a major alteration or an experimental operating limitation.",
        yearStarted: 2014,
      },
      {
        name: "Quality Management",
        description:
          "Closes escaped loads and part mismatches with CAPA that changes the release gate, not just the briefing.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Cascadia Avionics",
        description:
          "Seattle integrator on a special-mission derivative of a commercial twin. Hangar and lab share one CM system.",
        location: "Seattle, WA",
        startDate: "2022-05-02",
        positions: [
          {
            title: "Avionics Lead",
            startDate: "2022-05-02",
            projects: [
              {
                name: "As-flown baseline recovery",
                description:
                  "Reconciled as-designed vs. as-flown on two aircraft after a load-control drift. Found 11 undocumented software deltas; both jets were rebaselined before the next customer flight.",
                skills: ["Configuration Management", "Avionics", "Quality Management"],
              },
              {
                name: "Flight-control load release",
                description:
                  "Released a DO-178C Level B flight-control load with effectivity locked to three tail numbers. The DER accepted the package on first cycle.",
                skills: ["DO-178C", "FAA Compliance", "Technical Leadership"],
              },
              {
                name: "Comms suite ICD freeze",
                description:
                  "Froze the comms ICD after 27 late changes had been arriving as shop-floor notes. Subsequent changes went through the board; integration defects dropped 35% in a quarter.",
                skills: ["Systems Engineering", "Requirements Management", "Avionics"],
              },
            ],
          },
        ],
      },
      {
        name: "Rainier Config Systems",
        description:
          "Seattle CM shop embedded on airframers. Ingrid learned that a baseline is a decision, not a folder.",
        location: "Seattle, WA",
        startDate: "2016-08-08",
        endDate: "2022-04-22",
        positions: [
          {
            title: "Configuration Manager, Avionics",
            startDate: "2018-10-01",
            endDate: "2022-04-22",
            projects: [
              {
                name: "Single CM record",
                description:
                  "Merged three CM tools into one as-built record for a 14-aircraft fleet. Audit findings on configuration dropped from 22 to 3 in a year.",
                skills: ["Configuration Management", "Quality Management", "Technical Leadership"],
              },
              {
                name: "Change-board SLA",
                description:
                  "Cut average avionics change-board cycle from 19 days to 6 by forcing a shall and an effectivity on every request.",
                skills: [
                  "Requirements Management",
                  "Configuration Management",
                  "Systems Engineering",
                ],
              },
            ],
          },
          {
            title: "Avionics Configuration Specialist",
            startDate: "2016-08-08",
            endDate: "2018-09-28",
            projects: [
              {
                name: "Load-control two-person rule",
                description:
                  "Installed a two-person load-control rule after an unauthorized field load. No repeat in 18 months of hangar operations.",
                skills: ["Avionics", "Quality Management", "DO-178C"],
              },
              {
                name: "DER data package",
                description:
                  "Assembled the first complete major-alteration data package the shop had shipped without a DER rewrite.",
                skills: ["FAA Compliance", "Avionics"],
              },
            ],
          },
        ],
      },
      {
        name: "Puget Sound Flight Electronics",
        description: "Renton LRU integration lab. Ingrid started on the bench.",
        location: "Renton, WA",
        startDate: "2011-06-13",
        endDate: "2016-07-29",
        positions: [
          {
            title: "Avionics Integration Engineer",
            startDate: "2011-06-13",
            endDate: "2016-07-29",
            projects: [
              {
                name: "Bench-to-jet correlation",
                description:
                  "Correlated bench bus logs with first-flight logs on a new radio suite. Found a timing issue the bench had masked at room temperature.",
                skills: ["Avionics", "Systems Engineering"],
              },
              {
                name: "ICD discrepancy log",
                description:
                  "Opened the first formal ICD discrepancy log the lab kept. 40 of 61 items closed before first flight instead of becoming flight cards.",
                skills: ["Requirements Management", "Avionics", "Configuration Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Washington",
        degree: "M.S., Aeronautics and Astronautics",
        dateAwarded: "2014-06-14",
      },
      {
        school: "Norwegian University of Science and Technology",
        degree: "B.S., Cybernetics and Robotics",
        dateAwarded: "2011-06-20",
      },
    ],
    certifications: [
      {
        name: "INCOSE Associate Systems Engineering Professional",
        issuer: "International Council on Systems Engineering",
        dateAwarded: "2016-04-08",
        credentialId: "ASEP-2016-8821",
      },
      {
        name: "CMII Professional Certification",
        issuer: "Institute of Configuration Management",
        dateAwarded: "2019-01-18",
        credentialId: "CMII-P-2019-4402",
      },
    ],
    featuredProjects: [
      {
        name: "As-flown baseline recovery",
        description:
          "<p>How Cascadia reconciled two jets after load-control drift: the 11 undocumented deltas, the rebaseline, and the release gate that followed.</p>",
        links: [
          { label: "Recovery note", url: "https://www.example.com/cascadia/as-flown" },
          { label: "CM rule", url: "https://www.example.com/ingrid-solberg/cm" },
        ],
        skills: ["Configuration Management", "Avionics", "DO-178C"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "aerospace-defense",
    name: "Malcolm Reeves",
    title: "Program Manager",
    location: "Arlington, VA",
    siteDescription:
      "Cleared program manager in Arlington who runs the IMS, the customer, and the subcontractors without letting any of them become the real baseline.",
    summary:
      "<p>Program Manager at Northline Defense Programs, accountable for a cleared C4ISR modernization effort with three subcontractors and a customer who reads the IMS. I hold cost, schedule, and the technical baseline in the same meeting.</p><p>I came up through systems and contracts at Potomac Mission Office and Tidewater Systems Group. The work I trust is a program that can explain a slip before the customer finds it, a subcontractor that is managed to the SOW, and a security posture that is not a weekend scramble before a visit.</p>",
    socials: [
      { platform: "linkedin.com", ref: "malcolm-reeves-pm" },
      { platform: "website", ref: "https://www.malcolmreeves.example.com" },
    ],
    skills: [
      {
        name: "Program Management",
        description:
          "Owns cost, schedule, and technical baseline on a cleared C4ISR modernization with multiple subcontractors.",
        yearStarted: 2010,
      },
      {
        name: "Stakeholder Management",
        description:
          "Briefs the customer, the prime leadership, and the subcontractors from the same IMS, not three decks.",
        yearStarted: 2011,
      },
      {
        name: "Systems Engineering",
        description:
          "Keeps SE products on the critical path so a late ICD is a program issue, not a specialty-engineering surprise.",
        yearStarted: 2012,
      },
      {
        name: "Requirements Management",
        description:
          "Controls scope against the shalls the contract actually bought, including the ones the customer now wants.",
        yearStarted: 2013,
      },
      {
        name: "Contract Negotiation",
        description:
          "Leads subcontract mods and customer negotiations so new work has a price and a schedule before it starts.",
        yearStarted: 2014,
      },
      {
        name: "GRC",
        description:
          "Holds cleared-facility, visitor, and subcontract-security posture as part of weekly cadence, not a visit drill.",
        yearStarted: 2015,
      },
      {
        name: "Change Management",
        description:
          "Runs the CCB so a 'small' customer ask is sized before it lands in someone's unofficial backlog.",
        yearStarted: 2016,
      },
      {
        name: "Technical Leadership",
        description:
          "Puts IPT leads in the room with the customer when the answer is technical, instead of translating it badly later.",
        yearStarted: 2014,
      },
    ],
    companies: [
      {
        name: "Northline Defense Programs",
        description:
          "Arlington cleared program office on a C4ISR modernization. Customer sits in the building two days a week.",
        location: "Arlington, VA",
        startDate: "2020-10-19",
        positions: [
          {
            title: "Program Manager",
            startDate: "2020-10-19",
            projects: [
              {
                name: "C4ISR increment 2 IMS recovery",
                description:
                  "Recovered a 14-week slip on increment 2 by replanning two subcontractors against the true critical path. Delivered increment 2 11 days late instead of a quarter late; award-fee score held.",
                skills: ["Program Management", "Stakeholder Management", "Contract Negotiation"],
              },
              {
                name: "Scope-control CCB",
                description:
                  "Installed a CCB that sized 47 customer asks in a year. 19 became funded mods; 28 were deferred with a written shall so they could not re-enter as 'small'.",
                skills: ["Change Management", "Requirements Management", "Technical Leadership"],
              },
              {
                name: "Cleared-subcontractor posture",
                description:
                  "Brought three subcontractors onto a common visitor and artifact-control process before a customer security review. The review closed with two observations and no findings.",
                skills: ["GRC", "Program Management", "Systems Engineering"],
              },
            ],
          },
        ],
      },
      {
        name: "Potomac Mission Office",
        description:
          "Rosslyn systems-and-contracts shop. Malcolm ran IPT cadence and learned which slips are technical.",
        location: "Arlington, VA",
        startDate: "2014-02-03",
        endDate: "2020-10-09",
        positions: [
          {
            title: "Deputy Program Manager",
            startDate: "2017-06-12",
            endDate: "2020-10-09",
            projects: [
              {
                name: "Subcontract SOW rewrite",
                description:
                  "Rewrote two subcontract SOWs after the vendors were managing to a slide, not a shall. Earned-value variance on those CLINs halved in two quarters.",
                skills: ["Contract Negotiation", "Requirements Management", "Program Management"],
              },
              {
                name: "SE-on-the-path",
                description:
                  "Moved ICD freeze onto the IMS critical path. The next PDR did not invent 40 interface issues in the hallway.",
                skills: ["Systems Engineering", "Program Management", "Technical Leadership"],
              },
            ],
          },
          {
            title: "IPT Lead",
            startDate: "2014-02-03",
            endDate: "2017-06-09",
            projects: [
              {
                name: "Weekly customer rhythm",
                description:
                  "Replaced a monthly slide dump with a weekly IMS walk. Customer surprise items dropped from a dozen a quarter to two.",
                skills: ["Stakeholder Management", "Program Management"],
              },
              {
                name: "First CCB",
                description:
                  "Stood up the IPT CCB. Informal email changes stopped being the way hardware got redesigned.",
                skills: ["Change Management", "Requirements Management", "GRC"],
              },
            ],
          },
        ],
      },
      {
        name: "Tidewater Systems Group",
        description:
          "Norfolk engineering services firm. Malcolm started as a systems engineer on shipboard C4I.",
        location: "Norfolk, VA",
        startDate: "2010-06-07",
        endDate: "2014-01-24",
        positions: [
          {
            title: "Systems Engineer",
            startDate: "2010-06-07",
            endDate: "2014-01-24",
            projects: [
              {
                name: "Shipboard interface package",
                description:
                  "Owned the interface package for a shipboard C4I install on two hulls. Both installs completed inside the yard window.",
                skills: ["Systems Engineering", "Requirements Management", "Technical Leadership"],
              },
              {
                name: "Customer design review",
                description:
                  "Briefed the first design review Malcolm ran without a program manager in the room. The action list had owners and dates; 16 of 18 closed before the next review.",
                skills: ["Stakeholder Management", "Systems Engineering"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "George Washington University",
        degree: "M.S., Engineering Management",
        dateAwarded: "2014-05-18",
      },
      {
        school: "Virginia Military Institute",
        degree: "B.S., Mechanical Engineering",
        dateAwarded: "2010-05-15",
      },
    ],
    certifications: [
      {
        name: "Project Management Professional",
        issuer: "Project Management Institute",
        dateAwarded: "2015-07-24",
        credentialId: "PMP-2015571",
      },
      {
        name: "DAWIA Program Management, Advanced",
        issuer: "Defense Acquisition University",
        dateAwarded: "2018-03-09",
        credentialId: "DAU-PM-ADV-2018-441",
      },
    ],
    featuredProjects: [
      {
        name: "Increment 2 recovery",
        description:
          "<p>How increment 2 came back from a 14-week slip: the real critical path, the two subcontract replans, and the CCB that stopped unofficial scope from returning.</p>",
        links: [
          { label: "Recovery brief", url: "https://www.example.com/northline/increment-2" },
          { label: "CCB rule", url: "https://www.example.com/malcolm-reeves/ccb" },
        ],
        skills: ["Program Management", "Change Management", "Contract Negotiation"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "legal-services",
    name: "Danielle Okoye",
    title: "Corporate Associate",
    location: "New York, NY",
    siteDescription:
      "Corporate associate in New York who runs M&A closings and governance work like an operating system, not a last-minute closing binder.",
    summary:
      "<p>Corporate Associate at Calder Finch LLP, leading middle-market M&A and the governance work that keeps a board from inventing process in the middle of a deal. I draft the merger agreement, run the closing checklist, and write the minutes that will be read in the next dispute.</p><p>I started in general corporate at Hudson Deal Counsel and learned governance at Westbrook Corporate. The work I trust is a disclosure schedule that matches the data room, a stockholder consent that is actually authorized, and a closing that does not discover a lien at 11 p.m.</p>",
    socials: [
      { platform: "linkedin.com", ref: "danielle-okoye" },
      { platform: "website", ref: "https://www.danielleokoye.example.com" },
      { platform: "medium.com", ref: "danielleokoye" },
    ],
    skills: [
      {
        name: "Corporate Law",
        description:
          "Leads private M&A and general corporate for middle-market sponsors and founder-backed companies.",
        yearStarted: 2015,
      },
      {
        name: "Corporate Governance",
        description:
          "Keeps boards, consents, and committee charters in a form that will still make sense after the deal.",
        yearStarted: 2016,
      },
      {
        name: "Legal Research",
        description:
          "Reads DGCL, NYBCL, and the credit docs before a structure is sold as 'standard.'",
        yearStarted: 2015,
      },
      {
        name: "Legal Writing",
        description:
          "Drafts merger agreements, disclosure schedules, and board materials that survive the next litigator.",
        yearStarted: 2015,
      },
      {
        name: "Contract Negotiation",
        description:
          "Holds indemnity, R&W, and closing-condition fights to the points that actually move risk.",
        yearStarted: 2016,
      },
      {
        name: "Deal Execution",
        description:
          "Runs the checklist, the funds flow, and the third-party consents so closing is a date, not a hope.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps sponsor, target counsel, and the bank in one process when each wants a different closing sequence.",
        yearStarted: 2018,
      },
      {
        name: "Regulatory Counseling",
        description:
          "Flags HSR, CFIUS, and industry notices early enough that they are a workstream, not a surprise.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Calder Finch LLP",
        description:
          "Fifty-lawyer New York firm with a middle-market M&A book. Danielle runs deals from term sheet through post-closing cleanup.",
        location: "New York, NY",
        startDate: "2021-09-13",
        positions: [
          {
            title: "Corporate Associate",
            startDate: "2021-09-13",
            projects: [
              {
                name: "Harborline sale, $410M",
                description:
                  "Led buy-side documents on a $410M sale of a specialty distributor. Closed on the announced date; the disclosure schedule matched the data room after a 72-hour recut that caught three unscheduled contracts.",
                skills: ["Corporate Law", "Deal Execution", "Contract Negotiation"],
              },
              {
                name: "Board refresh and committee charters",
                description:
                  "Rebuilt a portfolio company's board minutes, consents, and audit-committee charter after a sponsor add-on. The next financing used the minute book without a cleanup memo.",
                skills: ["Corporate Governance", "Legal Writing", "Stakeholder Management"],
              },
              {
                name: "HSR and CFIUS workstream",
                description:
                  "Stood up HSR and a short-form CFIUS analysis on a defense-adjacent add-on 19 days after signing. Neither became the reason closing moved.",
                skills: ["Regulatory Counseling", "Legal Research", "Deal Execution"],
              },
            ],
          },
        ],
      },
      {
        name: "Westbrook Corporate",
        description:
          "Boutique governance and sponsor-side corporate shop. Danielle learned how boards actually decide.",
        location: "New York, NY",
        startDate: "2018-01-08",
        endDate: "2021-09-03",
        positions: [
          {
            title: "Associate",
            startDate: "2018-01-08",
            endDate: "2021-09-03",
            projects: [
              {
                name: "Written-consent factory",
                description:
                  "Standardized stockholder and board consents for a sponsor with 22 portfolio companies. Unauthorized 'email approvals' stopped being the way equity was issued.",
                skills: ["Corporate Governance", "Corporate Law", "Legal Writing"],
              },
              {
                name: "Credit-doc corporate opinions",
                description:
                  "Managed the corporate-authority opinions on four credit facilities. One deal slipped a week after Danielle refused to opine on a consent that did not exist.",
                skills: ["Legal Research", "Corporate Law", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Hudson Deal Counsel",
        description:
          "Small Manhattan shop that staffed closings. Danielle started on the checklist.",
        location: "New York, NY",
        startDate: "2015-10-05",
        endDate: "2017-12-22",
        positions: [
          {
            title: "Junior Associate",
            startDate: "2015-10-05",
            endDate: "2017-12-22",
            projects: [
              {
                name: "Closing checklist discipline",
                description:
                  "Ran closing checklists on 11 deals. One 11 p.m. lien search became a morning problem after she moved UCC checks to T-3.",
                skills: ["Deal Execution", "Corporate Law"],
              },
              {
                name: "First indemnity markup",
                description:
                  "Marked the first indemnity and escrow package Danielle owned. The basket and the sandbagging sentence were the only fights that survived the call.",
                skills: ["Contract Negotiation", "Legal Writing", "Legal Research"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Columbia Law School",
        degree: "J.D.",
        dateAwarded: "2015-05-20",
      },
      {
        school: "Howard University",
        degree: "B.A., History",
        dateAwarded: "2012-05-12",
      },
    ],
    certifications: [
      {
        name: "Admitted to the New York Bar",
        issuer: "Appellate Division, First Department",
        dateAwarded: "2015-09-16",
        credentialId: "NY-BAR-2015-90821",
      },
      {
        name: "Admitted to the District of Columbia Bar",
        issuer: "District of Columbia Court of Appeals",
        dateAwarded: "2019-04-11",
        credentialId: "DC-BAR-2019-44120",
      },
    ],
    featuredProjects: [
      {
        name: "Harborline closing record",
        description:
          "<p>Redacted walkthrough of the $410M Harborline sale: the disclosure-schedule recut, the consent trail, and the HSR/CFIUS workstream that stayed off the critical path.</p>",
        links: [
          { label: "Deal note", url: "https://www.example.com/calder-finch/harborline" },
          { label: "Checklist", url: "https://www.example.com/danielle-okoye/closings" },
        ],
        skills: ["Corporate Law", "Deal Execution", "Corporate Governance"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "legal-services",
    name: "Seth Greenberg",
    title: "Litigation Counsel",
    location: "Chicago, IL",
    siteDescription:
      "Litigation counsel in Chicago who treats commercial cases and eDiscovery as one file: the theory, the custodians, and the exhibit that will actually be used.",
    summary:
      "<p>Litigation Counsel at Brannigan & Holt LLP, running commercial cases from complaint through the first serious settlement window. I write the theory, hold the discovery, and refuse to produce a million documents because someone was afraid to negotiate the request.</p><p>I learned eDiscovery at Midwest Discovery Group and case work at Lakeshore Litigation. The work I trust is a custodian list that matches the claims, a privilege log that a magistrate will not laugh at, and a motion that cites the record we have, not the record we wish we had.</p>",
    socials: [
      { platform: "linkedin.com", ref: "seth-greenberg-lit" },
      { platform: "website", ref: "https://www.sethgreenberg.example.com" },
    ],
    skills: [
      {
        name: "Litigation Strategy",
        description:
          "Sets case theory, motion sequence, and settlement timing for commercial disputes in federal and Illinois courts.",
        yearStarted: 2012,
      },
      {
        name: "eDiscovery",
        description:
          "Owns custodian scope, TAR, and production quality so discovery is a tool, not a second lawsuit.",
        yearStarted: 2013,
      },
      {
        name: "Legal Research",
        description:
          "Reads the Seventh Circuit and the Northern District local rules before a 'standard' motion is filed.",
        yearStarted: 2012,
      },
      {
        name: "Legal Writing",
        description:
          "Drafts complaints, briefs, and settlement term sheets that a judge can follow without a translator.",
        yearStarted: 2012,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps the client, the insurer, and local counsel on one theory when each wants a different fight.",
        yearStarted: 2015,
      },
      {
        name: "Contract Negotiation",
        description:
          "Negotiates ESI protocols, protective orders, and settlement papers as tightly as the underlying deal.",
        yearStarted: 2014,
      },
      {
        name: "GRC",
        description:
          "Holds legal-hold and retention posture so the first letter is not also the first spoliation argument.",
        yearStarted: 2016,
      },
      {
        name: "Regulatory Counseling",
        description:
          "Flags agency or AG interest early when a commercial dispute is about to become a public file.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Brannigan & Holt LLP",
        description:
          "Chicago commercial litigation boutique. Seth runs a docket of mid-eight-figure contract and fraud cases.",
        location: "Chicago, IL",
        startDate: "2020-03-02",
        positions: [
          {
            title: "Litigation Counsel",
            startDate: "2020-03-02",
            projects: [
              {
                name: "Supply-contract bench trial",
                description:
                  "Tried a $27M supply-contract case to a bench verdict in the Northern District. Judgment for the client on the contract claim; the fraud count was dropped after a custodian review that did not support it.",
                skills: ["Litigation Strategy", "Legal Writing", "Legal Research"],
              },
              {
                name: "TAR instead of a million docs",
                description:
                  "Negotiated a TAR protocol that cut a 2.1M-document review to 180k with a 75% recall validation. Production cost dropped 62% versus the vendor's linear estimate.",
                skills: ["eDiscovery", "Contract Negotiation", "Stakeholder Management"],
              },
              {
                name: "Legal-hold rescue",
                description:
                  "Installed a hold 11 days after a demand letter on a case that had been 'waiting to see.' Two key custodians still had intact mail; the spoliation letter the other side sent went nowhere.",
                skills: ["GRC", "eDiscovery", "Litigation Strategy"],
              },
            ],
          },
        ],
      },
      {
        name: "Lakeshore Litigation",
        description:
          "Chicago firm that staffed commercial dockets for larger firms. Seth learned which motions are for the judge.",
        location: "Chicago, IL",
        startDate: "2015-09-08",
        endDate: "2020-02-21",
        positions: [
          {
            title: "Senior Associate",
            startDate: "2017-11-06",
            endDate: "2020-02-21",
            projects: [
              {
                name: "Summary-judgment record",
                description:
                  "Built the SJ record on a non-compete case. The court granted in part; the facts section was the part the opinion quoted.",
                skills: ["Legal Writing", "Legal Research", "Litigation Strategy"],
              },
              {
                name: "Privilege-log rebuild",
                description:
                  "Rebuilt a 4,200-entry privilege log after a magistrate called the first version 'a novel.' The redo used a consistent taxonomy and survived.",
                skills: ["eDiscovery", "Legal Writing", "GRC"],
              },
            ],
          },
          {
            title: "Associate",
            startDate: "2015-09-08",
            endDate: "2017-11-03",
            projects: [
              {
                name: "First ESI protocol",
                description:
                  "Negotiated Seth's first ESI protocol. Search terms were tested on a sample before they were ordered; the fishing expedition died in the draft.",
                skills: ["eDiscovery", "Contract Negotiation"],
              },
              {
                name: "AG-adjacent commercial case",
                description:
                  "Flagged a consumer-fraud overlay before the client answered. Parallel AG interest was managed with one set of facts, not two stories.",
                skills: ["Regulatory Counseling", "Stakeholder Management", "Litigation Strategy"],
              },
            ],
          },
        ],
      },
      {
        name: "Midwest Discovery Group",
        description:
          "Chicago eDiscovery shop. Seth started as a review lead and learned what a bad custodian list costs.",
        location: "Chicago, IL",
        startDate: "2012-09-04",
        endDate: "2015-08-28",
        positions: [
          {
            title: "Discovery Attorney",
            startDate: "2012-09-04",
            endDate: "2015-08-28",
            projects: [
              {
                name: "Custodian scoping",
                description:
                  "Cut a 90-custodian ask to 22 with a use-case memo the requesting party accepted. Review spend dropped $410k on that matter.",
                skills: ["eDiscovery", "Litigation Strategy", "Stakeholder Management"],
              },
              {
                name: "Production QC",
                description:
                  "Built the QC sample that caught a family-break error before a 400k production. The vendor fixed it; the receiving party never saw it.",
                skills: ["eDiscovery", "GRC", "Legal Research"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Northwestern Pritzker School of Law",
        degree: "J.D.",
        dateAwarded: "2012-05-18",
      },
      {
        school: "University of Michigan",
        degree: "B.A., Political Science",
        dateAwarded: "2009-05-02",
      },
    ],
    certifications: [
      {
        name: "Admitted to the Illinois Bar",
        issuer: "Illinois Supreme Court",
        dateAwarded: "2012-11-08",
        credentialId: "IL-BAR-2012-77140",
      },
      {
        name: "Relativity Certified Administrator",
        issuer: "Relativity",
        dateAwarded: "2016-06-17",
        credentialId: "RCA-2016-33901",
      },
    ],
    featuredProjects: [
      {
        name: "TAR protocol and the $27M trial",
        description:
          "<p>How a negotiated TAR protocol funded the trial record, and how the custodian review killed a fraud count that would have been a bad exhibit.</p>",
        links: [
          { label: "Case note", url: "https://www.example.com/brannigan-holt/supply-trial" },
          { label: "TAR method", url: "https://www.example.com/seth-greenberg/tar" },
        ],
        skills: ["Litigation Strategy", "eDiscovery", "Legal Writing"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "legal-services",
    name: "Marisol Vega",
    title: "Senior Counsel",
    location: "San Francisco, CA",
    siteDescription:
      "In-house senior counsel in San Francisco who treats product, privacy, and the contract as one risk, not three tickets.",
    summary:
      "<p>Senior Counsel at Lumenora Health Cloud, owning product counseling and privacy for a clinical-data platform. I sit with engineering on the feature, with security on the DPA, and with the customer when the BAA does not match what the product actually does.</p><p>I came up through privacy and commercial work at Sutter & Lang LLP and Fairwinds Software. The work I trust is a product launch that has a legal design review, a DPA that matches the data map, and a regulator letter that does not invent a new product story.</p>",
    socials: [
      { platform: "linkedin.com", ref: "marisol-vega" },
      { platform: "medium.com", ref: "marisolvega" },
      { platform: "website", ref: "https://www.marisolvega.example.com" },
    ],
    skills: [
      {
        name: "Regulatory Counseling",
        description:
          "Counsels product and sales on HIPAA, state privacy, and health-data rules before a feature ships, not after a customer asks.",
        yearStarted: 2014,
      },
      {
        name: "Legal Research",
        description:
          "Reads OCR guidance, CCPA regs, and the contract the customer actually signed before answering 'can we.'",
        yearStarted: 2013,
      },
      {
        name: "Legal Writing",
        description:
          "Drafts DPAs, BAAs, product notices, and regulator responses that match the data map.",
        yearStarted: 2013,
      },
      {
        name: "HIPAA Compliance",
        description:
          "Owns the BAA program, minimum-necessary debates, and the breach-assessment clock on a clinical-data platform.",
        yearStarted: 2015,
      },
      {
        name: "GRC",
        description:
          "Connects SOC 2, vendor reviews, and legal holds so privacy is not a parallel universe from security.",
        yearStarted: 2015,
      },
      {
        name: "Corporate Governance",
        description:
          "Runs privacy-committee materials and incident escalation so the board hears the same facts as the IR lead.",
        yearStarted: 2016,
      },
      {
        name: "Contract Negotiation",
        description:
          "Holds customer paper to the product's actual processing, including the subprocessors sales promised casually.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Puts product, security, and sales in one review so legal is not the last ticket on a launch checklist.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Lumenora Health Cloud",
        description:
          "San Francisco clinical-data platform. Legal sits with product, not in a separate building.",
        location: "San Francisco, CA",
        startDate: "2021-01-11",
        positions: [
          {
            title: "Senior Counsel, Product and Privacy",
            startDate: "2021-01-11",
            projects: [
              {
                name: "Feature design review",
                description:
                  "Installed a legal design review on every launch that touches PHI or cross-border processing. Two features were redesigned before GA; one customer BAA fight never started because the product no longer needed the extra use.",
                skills: ["Regulatory Counseling", "HIPAA Compliance", "Stakeholder Management"],
              },
              {
                name: "DPA and BAA rebuild",
                description:
                  "Rebuilt the DPA/BAA stack against the actual data map. Subprocessor list shrank from 31 names sales had promised to the 14 that process; enterprise cycle time dropped 12 days.",
                skills: ["Contract Negotiation", "Legal Writing", "GRC"],
              },
              {
                name: "Incident escalation to the board",
                description:
                  "Wrote the incident paper that went to the board after a vendor misconfiguration. OCR was notified on the statutory clock; the product story in the letter matched the IR timeline.",
                skills: ["Corporate Governance", "HIPAA Compliance", "Legal Research"],
              },
            ],
          },
        ],
      },
      {
        name: "Fairwinds Software",
        description:
          "Bay Area B2B SaaS. Marisol was the first product counsel and learned which tickets are actually launches.",
        location: "San Francisco, CA",
        startDate: "2017-04-03",
        endDate: "2020-12-23",
        positions: [
          {
            title: "Counsel, Commercial and Privacy",
            startDate: "2017-04-03",
            endDate: "2020-12-23",
            projects: [
              {
                name: "CCPA launch pack",
                description:
                  "Shipped the first CCPA notice, request flow, and vendor addendum in 11 weeks. Request SLA held at 28 days for the first two quarters.",
                skills: ["Regulatory Counseling", "Legal Writing", "GRC"],
              },
              {
                name: "Enterprise paper discipline",
                description:
                  "Moved enterprise deals off a 40-page customer paper fight and onto a playbook with four fallbacks. Legal cycle time on those deals dropped from 34 days to 16.",
                skills: ["Contract Negotiation", "Stakeholder Management", "Legal Research"],
              },
            ],
          },
        ],
      },
      {
        name: "Sutter & Lang LLP",
        description:
          "San Francisco firm with a privacy and health-data book. Marisol started on the research memos.",
        location: "San Francisco, CA",
        startDate: "2013-10-07",
        endDate: "2017-03-24",
        positions: [
          {
            title: "Associate",
            startDate: "2013-10-07",
            endDate: "2017-03-24",
            projects: [
              {
                name: "BAA diligence series",
                description:
                  "Diligence on 18 BAAs for a hospital-system vendor. Three vendors were dropped after their subprocessors could not be named.",
                skills: ["HIPAA Compliance", "Legal Research", "Contract Negotiation"],
              },
              {
                name: "OCR inquiry response",
                description:
                  "Drafted the factual chronology for an OCR inquiry. The inquiry closed without a resolution agreement; the chronology was the exhibit that mattered.",
                skills: ["Legal Writing", "HIPAA Compliance", "Corporate Governance"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Stanford Law School",
        degree: "J.D.",
        dateAwarded: "2013-06-16",
      },
      {
        school: "University of California, Berkeley",
        degree: "B.A., Rhetoric",
        dateAwarded: "2010-05-15",
      },
    ],
    certifications: [
      {
        name: "Admitted to the California Bar",
        issuer: "State Bar of California",
        dateAwarded: "2013-12-03",
        credentialId: "CA-BAR-2013-290441",
      },
      {
        name: "CIPP/US",
        issuer: "IAPP",
        dateAwarded: "2016-08-19",
        credentialId: "CIPP-US-2016-7712",
      },
    ],
    featuredProjects: [
      {
        name: "Legal design review",
        description:
          "<p>The product-counseling review Marisol installed at Lumenora: when a feature touches PHI, who is in the room, and the two launches that changed before GA.</p>",
        links: [
          { label: "Review model", url: "https://www.example.com/lumenora/design-review" },
          { label: "DPA notes", url: "https://www.example.com/marisol-vega/dpa" },
        ],
        skills: ["Regulatory Counseling", "HIPAA Compliance", "Contract Negotiation"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "legal-services",
    name: "Hugh Pemberton",
    title: "Regulatory Attorney",
    location: "Washington, DC",
    siteDescription:
      "Regulatory attorney in Washington who counsels clients through the agency they actually have, not the agency they briefed the board about.",
    summary:
      "<p>Regulatory Attorney at Ashford Quill LLP, counseling life-sciences and consumer clients through FDA, FTC, and the state AGs that follow. I write the meeting package, sit in the room, and then translate the minutes into a plan the business can run.</p><p>I started in research at the Mid-Atlantic Regulatory Clinic and spent six years at Interstate Agency Practice. The work I trust is a comment that cites the docket, a warning-letter response that does not invent new science, and a counseling memo that names the risk instead of softening it.</p>",
    socials: [
      { platform: "linkedin.com", ref: "hugh-pemberton" },
      { platform: "website", ref: "https://www.hughpemberton.example.com" },
    ],
    skills: [
      {
        name: "Regulatory Counseling",
        description:
          "Counsels life-sciences and consumer clients through FDA, FTC, and follow-on state AG matters.",
        yearStarted: 2011,
      },
      {
        name: "Legal Research",
        description:
          "Reads the statute, the guidance, and the last three warning letters before a 'industry practice' claim is used.",
        yearStarted: 2010,
      },
      {
        name: "Legal Writing",
        description:
          "Drafts meeting packages, comments, and warning-letter responses that an agency reviewer can follow.",
        yearStarted: 2010,
      },
      {
        name: "Policy Analysis",
        description:
          "Tracks guidance and enforcement trends so advice is not written from last year's desk.",
        yearStarted: 2012,
      },
      {
        name: "FDA Regulatory Affairs",
        description:
          "Handles FDA meeting strategy, advertising/promo review, and the 483 or warning-letter path for device and drug clients.",
        yearStarted: 2013,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps GC, quality, and commercial in one story when the agency already has three of their emails.",
        yearStarted: 2014,
      },
      {
        name: "Corporate Law",
        description:
          "Flags when a regulatory problem is about to become a disclosure, a deal condition, or a board issue.",
        yearStarted: 2011,
      },
      {
        name: "GRC",
        description:
          "Connects promo review, quality-system findings, and the legal file so a repeat observation is not a surprise.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Ashford Quill LLP",
        description:
          "Washington regulatory boutique. Hugh owns the FDA and consumer-protection docket.",
        location: "Washington, DC",
        startDate: "2022-07-18",
        positions: [
          {
            title: "Regulatory Attorney",
            startDate: "2022-07-18",
            projects: [
              {
                name: "Warning-letter response, device client",
                description:
                  "Led the warning-letter response for a Class II device client. CAPA and the legal narrative matched; FDA closed the letter in 7 months without a consent decree.",
                skills: ["FDA Regulatory Affairs", "Legal Writing", "GRC"],
              },
              {
                name: "Type B meeting package",
                description:
                  "Wrote the Type B package that locked a single clinical path after the client had briefed the board on two. The minutes matched the ask; development did not restart.",
                skills: [
                  "FDA Regulatory Affairs",
                  "Regulatory Counseling",
                  "Stakeholder Management",
                ],
              },
              {
                name: "FTC and AG follow-on",
                description:
                  "Counseled a consumer-health client through an FTC CID and two state AG letters from one factual chronology. No second story leaked into the public file.",
                skills: ["Regulatory Counseling", "Legal Research", "Corporate Law"],
              },
            ],
          },
        ],
      },
      {
        name: "Interstate Agency Practice",
        description:
          "D.C. firm that staffed FDA and FTC matters for larger clients. Hugh learned which meetings are for a decision.",
        location: "Washington, DC",
        startDate: "2015-02-02",
        endDate: "2022-07-08",
        positions: [
          {
            title: "Counsel",
            startDate: "2018-09-04",
            endDate: "2022-07-08",
            projects: [
              {
                name: "Promo-review rebuild",
                description:
                  "Rebuilt a client's advertising review after three untitled letters in 18 months. The next 24 months had zero untitled or warning letters on promo.",
                skills: ["FDA Regulatory Affairs", "GRC", "Policy Analysis"],
              },
              {
                name: "Docket comment on a rule",
                description:
                  "Drafted a 40-page comment that three trade associations reused. Two of the requested changes appeared in the final preamble.",
                skills: ["Legal Writing", "Policy Analysis", "Regulatory Counseling"],
              },
            ],
          },
          {
            title: "Associate",
            startDate: "2015-02-02",
            endDate: "2018-08-31",
            projects: [
              {
                name: "483 response desk",
                description:
                  "Drafted 483 responses with quality for four device inspections. Two closed VAI; none became warning letters on Hugh's watch.",
                skills: ["FDA Regulatory Affairs", "Legal Writing", "Stakeholder Management"],
              },
              {
                name: "Deal-condition diligence",
                description:
                  "Diligence on FDA correspondence for a $220M deal. A hidden 483 became a closing condition instead of a post-closing surprise.",
                skills: ["Corporate Law", "Legal Research", "Regulatory Counseling"],
              },
            ],
          },
        ],
      },
      {
        name: "Mid-Atlantic Regulatory Clinic",
        description:
          "Georgetown-adjacent clinic that took FDA and FTC intake. Hugh started on the research memos.",
        location: "Washington, DC",
        startDate: "2010-09-07",
        endDate: "2015-01-23",
        positions: [
          {
            title: "Staff Attorney",
            startDate: "2011-09-06",
            endDate: "2015-01-23",
            projects: [
              {
                name: "Citizen-petition research",
                description:
                  "Built the research book for two citizen petitions. One was granted in part; the table of prior agency action was the exhibit the agency cited.",
                skills: ["Legal Research", "Policy Analysis", "Legal Writing"],
              },
              {
                name: "Small-client counseling clinic",
                description:
                  "Counseled 30-plus small firms on labeling and promo. The ones who took the memo home had fewer repeat questions; the ones who did not came back with a letter.",
                skills: ["Regulatory Counseling", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Law Clerk",
            startDate: "2010-09-07",
            endDate: "2011-09-02",
            projects: [
              {
                name: "Guidance digest",
                description:
                  "Kept the clinic's monthly guidance digest. Fellows stopped citing withdrawn documents after the second issue.",
                skills: ["Policy Analysis", "Legal Research"],
              },
              {
                name: "Intake memos",
                description:
                  "Wrote intake memos that named the agency, the statute, and the first clock. Partners used them as the file openers.",
                skills: ["Legal Writing", "Regulatory Counseling"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgetown University Law Center",
        degree: "J.D.",
        dateAwarded: "2011-05-22",
      },
      {
        school: "George Washington University",
        degree: "B.A., Political Science",
        dateAwarded: "2008-05-17",
      },
    ],
    certifications: [
      {
        name: "Admitted to the District of Columbia Bar",
        issuer: "District of Columbia Court of Appeals",
        dateAwarded: "2011-11-14",
        credentialId: "DC-BAR-2011-55201",
      },
      {
        name: "Regulatory Affairs Certification (U.S.)",
        issuer: "Regulatory Affairs Professionals Society",
        dateAwarded: "2016-05-06",
        credentialId: "RAC-US-2016-3390",
      },
    ],
    featuredProjects: [
      {
        name: "Warning-letter closeout",
        description:
          "<p>How the Class II device warning letter closed in 7 months: CAPA that matched the legal narrative, and the meeting minutes that kept development from restarting.</p>",
        links: [
          { label: "Closeout note", url: "https://www.example.com/ashford-quill/warning-letter" },
          { label: "Meeting package", url: "https://www.example.com/hugh-pemberton/type-b" },
        ],
        skills: ["FDA Regulatory Affairs", "Regulatory Counseling", "Legal Writing"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "accounting-audit",
    name: "Claire Fontaine",
    title: "Audit Senior Manager",
    location: "New York, NY",
    siteDescription:
      "Audit senior manager in New York who treats the file, the controls, and the opinion as one piece of work, not a busy season performance.",
    summary:
      "<p>Audit Senior Manager at Hartwell & Grey LLP, leading external audits for mid-cap issuers and a pair of large private companies. I plan the file, staff the risky accounts, and stay in the room when a control deficiency wants to become a conversation instead of a conclusion.</p><p>I came up through East River Assurance and Meridian Public Audit. The work I trust is a walkthrough that matches how the process actually runs, a sampling method that can be explained to a reviewer, and an opinion that is dated because the evidence was ready, not because the calendar was.</p>",
    socials: [
      { platform: "linkedin.com", ref: "claire-fontaine-cpa" },
      { platform: "website", ref: "https://www.clairefontaine.example.com" },
      { platform: "medium.com", ref: "clairefontaine" },
    ],
    skills: [
      {
        name: "External Audit",
        description:
          "Leads issuer and large-private audits from planning through opinion, including first-year and multi-location files.",
        yearStarted: 2010,
      },
      {
        name: "GAAP",
        description:
          "Owns revenue, leases, and business-combination conclusions that have to survive national-office consult.",
        yearStarted: 2010,
      },
      {
        name: "Financial Reporting",
        description:
          "Reads the draft 10-K the way a reviewer will, then sends comments before the disclosure committee meets.",
        yearStarted: 2011,
      },
      {
        name: "Internal Controls",
        description:
          "Tests ICFR with walkthroughs that match the real process, not the narrative last year's team recycled.",
        yearStarted: 2012,
      },
      {
        name: "SOX Compliance",
        description:
          "Scopes key controls and deficiency evaluations so a late finding is still a documented conclusion.",
        yearStarted: 2013,
      },
      {
        name: "Audit Analytics",
        description:
          "Uses journal-entry and revenue analytics to pick the sample instead of taking the first 25 items in the listing.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps the audit committee, the controller, and the engagement quality reviewer on one issue list.",
        yearStarted: 2014,
      },
      {
        name: "Quality Management",
        description:
          "Runs file QC and EQCR readiness so a cold review is not the first time someone reads the memo.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Hartwell & Grey LLP",
        description:
          "New York firm with a mid-cap issuer practice. Claire runs four public files and two large privates.",
        location: "New York, NY",
        startDate: "2020-08-03",
        positions: [
          {
            title: "Audit Senior Manager",
            startDate: "2020-08-03",
            projects: [
              {
                name: "First-year issuer audit",
                description:
                  "Led a first-year audit of a $1.1B revenue issuer after a firm rotation. Filed on time; PCAOB inspection of the file produced no Part I findings on the accounts Claire owned.",
                skills: ["External Audit", "Quality Management", "Stakeholder Management"],
              },
              {
                name: "Revenue analytics redesign",
                description:
                  "Replaced a haphazard revenue sample with a journal-entry and contract-analytics approach. Exceptions found in planning rose 2.4x; year-end surprise adjustments fell by half.",
                skills: ["Audit Analytics", "GAAP", "External Audit"],
              },
              {
                name: "ICFR deficiency evaluation",
                description:
                  "Evaluated a late ITGC finding through to a significant deficiency, not a hallway conversation. The 10-K disclosure and the AS 2201 conclusion matched.",
                skills: ["SOX Compliance", "Internal Controls", "Financial Reporting"],
              },
            ],
          },
        ],
      },
      {
        name: "East River Assurance",
        description:
          "Manhattan firm that staffed issuer audits. Claire made manager on revenue and leases.",
        location: "New York, NY",
        startDate: "2015-01-12",
        endDate: "2020-07-24",
        positions: [
          {
            title: "Audit Manager",
            startDate: "2017-09-05",
            endDate: "2020-07-24",
            projects: [
              {
                name: "ASC 606 conversion file",
                description:
                  "Led the first-year ASC 606 file for a multi-element software issuer. National office signed the memo; the 10-K SAB 74 and adoption disclosures held through review.",
                skills: ["GAAP", "Financial Reporting", "External Audit"],
              },
              {
                name: "Multi-location scoping",
                description:
                  "Rescoped a 22-location private audit so four locations carried 81% of coverage. Fieldwork weeks dropped from 14 to 9 without a scope exception.",
                skills: ["External Audit", "Internal Controls", "Quality Management"],
              },
            ],
          },
          {
            title: "Audit Senior",
            startDate: "2015-01-12",
            endDate: "2017-09-01",
            projects: [
              {
                name: "Lease walkthroughs",
                description:
                  "Rewrote lease walkthroughs after ASC 842 so the process narrative stopped describing a spreadsheet that nobody used.",
                skills: ["Internal Controls", "GAAP", "SOX Compliance"],
              },
              {
                name: "EQCR comment close",
                description:
                  "Closed 31 EQCR comments on a first-year file in nine days by rewriting the revenue memo instead of adding appendices.",
                skills: ["Quality Management", "Financial Reporting", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Meridian Public Audit",
        description: "White Plains shop where Claire started as a staff on issuer files.",
        location: "White Plains, NY",
        startDate: "2010-09-07",
        endDate: "2014-12-19",
        positions: [
          {
            title: "Audit Staff / Senior",
            startDate: "2010-09-07",
            endDate: "2014-12-19",
            projects: [
              {
                name: "Cash-to-revenue tick and tie",
                description:
                  "Owned cash, AR, and the first revenue samples. A cut-off error Claire found in 2012 became a $4.1M adjusting entry the client had missed.",
                skills: ["External Audit", "GAAP", "Financial Reporting"],
              },
              {
                name: "Control testing that matched the floor",
                description:
                  "Redid AP control testing after watching the process. The 'three-way match' existed in the memo and not in the plant.",
                skills: ["Internal Controls", "SOX Compliance"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "New York University Stern School of Business",
        degree: "M.S., Accounting",
        dateAwarded: "2010-05-16",
      },
      {
        school: "Sciences Po",
        degree: "B.A., Economics",
        dateAwarded: "2008-06-20",
      },
    ],
    certifications: [
      {
        name: "Certified Public Accountant",
        issuer: "New York State Board of Public Accountancy",
        dateAwarded: "2012-02-14",
        credentialId: "NY-CPA-2012-44821",
      },
      {
        name: "Certified Internal Auditor",
        issuer: "Institute of Internal Auditors",
        dateAwarded: "2018-10-05",
        credentialId: "CIA-2018-22901",
      },
    ],
    featuredProjects: [
      {
        name: "First-year issuer file",
        description:
          "<p>Planning-through-opinion notes from the $1.1B first-year audit: the analytics redesign, the ITGC deficiency evaluation, and the inspection that stayed clean on Claire's accounts.</p>",
        links: [
          { label: "File note", url: "https://www.example.com/hartwell-grey/first-year" },
          { label: "Analytics method", url: "https://www.example.com/claire-fontaine/analytics" },
        ],
        skills: ["External Audit", "Audit Analytics", "SOX Compliance"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "accounting-audit",
    name: "Victor Nguyen",
    title: "SOX Compliance Manager",
    location: "Dallas, TX",
    siteDescription:
      "SOX compliance manager in Dallas who treats internal controls as an operating system, not a binder that comes out in January.",
    summary:
      "<p>SOX Compliance Manager at PrairieLine Payments, owning ICFR scoping, testing, and deficiency evaluation for a newly public payments processor. I would rather retire a key control that nobody performs than test a narrative that last year's consultant left behind.</p><p>I started in external audit at Redbird Assurance and built the first in-house SOX program at Trinity Controls. The work I trust is a risk-and-control matrix that matches the process, a tester who has watched the control run, and a significant-deficiency call that the CFO hears before the auditor does.</p>",
    socials: [
      { platform: "linkedin.com", ref: "victor-nguyen-sox" },
      { platform: "website", ref: "https://www.victornguyen.example.com" },
    ],
    skills: [
      {
        name: "SOX Compliance",
        description:
          "Owns ICFR scoping, testing, and deficiency evaluation for a newly public payments company.",
        yearStarted: 2013,
      },
      {
        name: "Internal Controls",
        description:
          "Writes and retires controls so the matrix matches the process operators actually run.",
        yearStarted: 2013,
      },
      {
        name: "External Audit",
        description:
          "Speaks auditor so walkthroughs, samples, and reliance conversations do not become a second project in March.",
        yearStarted: 2011,
      },
      {
        name: "GRC",
        description:
          "Connects access, change-management, and vendor SOC reports to the financial-statement risks they actually cover.",
        yearStarted: 2015,
      },
      {
        name: "Audit Analytics",
        description:
          "Uses access and journal-entry analytics to pick samples and to find the control that exists only on paper.",
        yearStarted: 2016,
      },
      {
        name: "Financial Reporting",
        description:
          "Keeps 10-K ICFR language and the internal deficiency log telling the same story.",
        yearStarted: 2012,
      },
      {
        name: "GAAP",
        description:
          "Maps controls to the assertions that actually move on a payments P&L and balance sheet.",
        yearStarted: 2011,
      },
      {
        name: "Stakeholder Management",
        description:
          "Holds process owners, IT, and the external auditor to one issue list through filing.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "PrairieLine Payments",
        description:
          "Dallas payments processor that went public in 2021. SOX moved in-house the same year Victor arrived.",
        location: "Dallas, TX",
        startDate: "2021-05-17",
        positions: [
          {
            title: "SOX Compliance Manager",
            startDate: "2021-05-17",
            projects: [
              {
                name: "Year-two SOX program",
                description:
                  "Took SOX in-house in year two. Retired 38 key controls that nobody performed; testing hours dropped 29% while coverage of revenue and settlement risks increased.",
                skills: ["SOX Compliance", "Internal Controls", "Stakeholder Management"],
              },
              {
                name: "ITGC and access analytics",
                description:
                  "Rebuilt ITGC testing around joiner-mover-leaver analytics. Found 17 terminated IDs still active; the significant-deficiency call went to the CFO two weeks before the auditor's walkthrough.",
                skills: ["Audit Analytics", "GRC", "SOX Compliance"],
              },
              {
                name: "Auditor reliance package",
                description:
                  "Built the reliance package the external auditor used on 22 of 31 key business controls. Direct-assist hours on those cycles fell by a third.",
                skills: ["External Audit", "Internal Controls", "Financial Reporting"],
              },
            ],
          },
        ],
      },
      {
        name: "Trinity Controls",
        description:
          "Dallas advisory shop that stood up first-year SOX programs. Victor ran two IPO-readiness files.",
        location: "Dallas, TX",
        startDate: "2016-03-07",
        endDate: "2021-05-07",
        positions: [
          {
            title: "Manager, Controls Advisory",
            startDate: "2018-08-13",
            endDate: "2021-05-07",
            projects: [
              {
                name: "IPO-readiness SOX",
                description:
                  "Stood up a first-year SOX program for a $700M revenue issuer. Year-one material-weakness count: zero on the cycles Victor scoped; two IT findings were closed before the auditor's opinion date.",
                skills: ["SOX Compliance", "GRC", "GAAP"],
              },
              {
                name: "Process-narrative rewrite",
                description:
                  "Threw out consultant narratives that described a 2014 ERP. New walkthroughs matched the current settlement process; 14 controls were deleted on the spot.",
                skills: ["Internal Controls", "Stakeholder Management", "Financial Reporting"],
              },
            ],
          },
          {
            title: "Senior Consultant",
            startDate: "2016-03-07",
            endDate: "2018-08-10",
            projects: [
              {
                name: "SOC-report mapping",
                description:
                  "Mapped 11 vendor SOC 1s to user-entity controls. Four 'covered' risks were not covered; complementary controls were written before year-end testing.",
                skills: ["GRC", "External Audit", "Internal Controls"],
              },
              {
                name: "Journal-entry analytics pilot",
                description:
                  "Piloted JE analytics that found a recurring manual entry with no reviewer. It became a key control instead of a year-end surprise.",
                skills: ["Audit Analytics", "SOX Compliance"],
              },
            ],
          },
        ],
      },
      {
        name: "Redbird Assurance",
        description:
          "Dallas firm where Victor started on issuer audits and learned which controls auditors actually rely on.",
        location: "Dallas, TX",
        startDate: "2011-09-06",
        endDate: "2016-02-26",
        positions: [
          {
            title: "Audit Senior",
            startDate: "2013-10-01",
            endDate: "2016-02-26",
            projects: [
              {
                name: "ICFR testing for a payments client",
                description:
                  "Tested ICFR on a payments issuer. A walkthrough Victor insisted on watching found the reconciler and the reviewer were the same person.",
                skills: ["External Audit", "Internal Controls", "SOX Compliance"],
              },
              {
                name: "Revenue assertion mapping",
                description:
                  "Mapped revenue controls to occurrence and cutoff after a restatement risk. The next file had fewer, better samples.",
                skills: ["GAAP", "Financial Reporting", "External Audit"],
              },
            ],
          },
          {
            title: "Audit Staff",
            startDate: "2011-09-06",
            endDate: "2013-09-27",
            projects: [
              {
                name: "First SOX samples",
                description:
                  "Pulled and tested the first SOX samples Victor owned. Two controls failed because the evidence was a screenshot of a screenshot.",
                skills: ["SOX Compliance", "Internal Controls"],
              },
              {
                name: "Cash and settlement",
                description:
                  "Owned cash and settlement testing on two files. A one-day cutoff miss became a $2.6M adjustment.",
                skills: ["External Audit", "GAAP"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "The University of Texas at Dallas",
        degree: "M.S., Accounting",
        dateAwarded: "2011-05-21",
      },
      {
        school: "The University of Texas at Austin",
        degree: "B.B.A., Finance",
        dateAwarded: "2009-05-23",
      },
    ],
    certifications: [
      {
        name: "Certified Public Accountant",
        issuer: "Texas State Board of Public Accountancy",
        dateAwarded: "2013-04-12",
        credentialId: "TX-CPA-2013-77102",
      },
      {
        name: "Certified Information Systems Auditor",
        issuer: "ISACA",
        dateAwarded: "2017-09-08",
        credentialId: "CISA-2017-44091",
      },
    ],
    featuredProjects: [
      {
        name: "In-house year-two SOX",
        description:
          "<p>How PrairieLine retired 38 paper controls, rebuilt ITGC around access analytics, and still increased coverage of settlement risk.</p>",
        links: [
          { label: "Program note", url: "https://www.example.com/prairieline/sox-year-two" },
          { label: "Access method", url: "https://www.example.com/victor-nguyen/itgc" },
        ],
        skills: ["SOX Compliance", "Internal Controls", "Audit Analytics"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "accounting-audit",
    name: "Jasmine Patel",
    title: "Tax Manager",
    location: "Chicago, IL",
    siteDescription:
      "Tax manager in Chicago who treats the provision as a process with a close calendar, not a weekend miracle before the 10-K.",
    summary:
      "<p>Tax Manager at North Pier Industrials, owning the U.S. GAAP tax provision, quarterly forecast, and the return-to-provision true-up for a multi-state industrial. I close the provision on the same calendar as the controller, then explain the rate to a CFO who does not want a story.</p><p>I started in compliance at Calumet Tax Partners and learned provision work at Lakeshore Tax Advisors. The work I trust is a rate rec that ties, a deferred rollforward that matches the balance sheet, and a state position that is documented before the auditor asks why the ETR moved.</p>",
    socials: [
      { platform: "linkedin.com", ref: "jasmine-patel-tax" },
      { platform: "medium.com", ref: "jasminepateltax" },
      { platform: "website", ref: "https://www.jasminepatel.example.com" },
    ],
    skills: [
      {
        name: "Tax Provision",
        description:
          "Owns the U.S. GAAP current and deferred provision, ETR rec, and return-to-provision for a multi-state industrial.",
        yearStarted: 2014,
      },
      {
        name: "GAAP",
        description:
          "Applies ASC 740 to valuation allowances, uncertain positions, and intraperiod allocation without a last-minute national-office surprise.",
        yearStarted: 2012,
      },
      {
        name: "Financial Reporting",
        description:
          "Writes the rate rec and footnote so the 10-K tax note matches the provision file.",
        yearStarted: 2012,
      },
      {
        name: "Financial Modeling",
        description:
          "Forecasts the quarterly ETR and cash tax so FP&A is not guessing from last year's rate.",
        yearStarted: 2013,
      },
      {
        name: "External Audit",
        description:
          "Builds the provision PBC the auditor can sample without living in the file for two extra weeks.",
        yearStarted: 2012,
      },
      {
        name: "Internal Controls",
        description:
          "Runs provision controls — review notes, tie-outs, and access — as part of close, not as a SOX afterthought.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keeps the controller, FP&A, and outside counsel on one rate story through earnings.",
        yearStarted: 2016,
      },
      {
        name: "Python",
        description:
          "Automates state apportionment and deferred rollforwards so the provision model is not 40 linked workbooks.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "North Pier Industrials",
        description:
          "Chicago industrial with 14 U.S. legal entities and a public parent. Tax sits next to the controller.",
        location: "Chicago, IL",
        startDate: "2022-02-14",
        positions: [
          {
            title: "Tax Manager",
            startDate: "2022-02-14",
            projects: [
              {
                name: "Provision close on the controller's calendar",
                description:
                  "Moved the quarterly provision from T+18 to T+8 by locking the current-tax calc and deferred rollforward before the rest of close. Two quarters of late ETR changes dropped to zero.",
                skills: ["Tax Provision", "Financial Reporting", "Internal Controls"],
              },
              {
                name: "State apportionment model",
                description:
                  "Rebuilt multi-state apportionment in Python from 40 workbooks. The first quarter caught a $1.7M current-tax overstatement that the old model had recycled.",
                skills: ["Python", "Tax Provision", "Financial Modeling"],
              },
              {
                name: "VAL and UTPs before earnings",
                description:
                  "Documented a valuation-allowance release and two UTPs before the disclosure committee. The auditor sampled the memos; no year-end surprise on the rate.",
                skills: ["GAAP", "External Audit", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Lakeshore Tax Advisors",
        description:
          "Chicago provision and controversy shop. Jasmine ran mid-market ASC 740 files.",
        location: "Chicago, IL",
        startDate: "2016-06-06",
        endDate: "2022-02-04",
        positions: [
          {
            title: "Senior Tax Associate",
            startDate: "2018-11-12",
            endDate: "2022-02-04",
            projects: [
              {
                name: "First-year public provision",
                description:
                  "Built the first public-company provision for a newly listed manufacturer. Footnote and SAB 74 language held through the first 10-K review.",
                skills: ["Tax Provision", "Financial Reporting", "GAAP"],
              },
              {
                name: "Return-to-provision factory",
                description:
                  "Standardized RTP true-ups across 11 clients. Average true-up dropped from 140 bps of ETR to 35 after the current-tax calc stopped being a black box.",
                skills: ["Tax Provision", "Financial Modeling", "External Audit"],
              },
            ],
          },
          {
            title: "Tax Associate",
            startDate: "2016-06-06",
            endDate: "2018-11-09",
            projects: [
              {
                name: "Deferred rollforward cleanup",
                description:
                  "Tied a client's deferred rollforward to the balance sheet for the first time in three years. Four accounts had been plug figures.",
                skills: ["GAAP", "Tax Provision", "Internal Controls"],
              },
              {
                name: "Provision PBC pack",
                description:
                  "Built the first PBC pack an auditor could sample without a guided tour. Review hours on that file fell by a week.",
                skills: ["External Audit", "Stakeholder Management", "Financial Reporting"],
              },
            ],
          },
        ],
      },
      {
        name: "Calumet Tax Partners",
        description:
          "Chicago compliance firm. Jasmine started on returns and learned why RTP exists.",
        location: "Chicago, IL",
        startDate: "2012-09-04",
        endDate: "2016-05-27",
        positions: [
          {
            title: "Tax Staff",
            startDate: "2012-09-04",
            endDate: "2016-05-27",
            projects: [
              {
                name: "Multi-state return desk",
                description:
                  "Prepared and reviewed 80-plus state returns a season. A nexus position Jasmine documented in 2014 later saved a client from an assessment that used the wrong start date.",
                skills: ["Tax Provision", "GAAP", "Financial Modeling"],
              },
              {
                name: "Workpaper discipline",
                description:
                  "Installed a workpaper index the reviewers actually used. Review notes per return dropped after people could find the apportionment, not hunt for it.",
                skills: ["Internal Controls", "Financial Reporting"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Northwestern University",
        degree: "M.S., Taxation",
        dateAwarded: "2016-06-18",
      },
      {
        school: "University of Illinois Urbana-Champaign",
        degree: "B.S., Accountancy",
        dateAwarded: "2012-05-13",
      },
    ],
    certifications: [
      {
        name: "Certified Public Accountant",
        issuer: "Illinois Board of Examiners",
        dateAwarded: "2014-08-22",
        credentialId: "IL-CPA-2014-33902",
      },
      {
        name: "Certified Specialist in Taxation",
        issuer: "American Institute of CPAs",
        dateAwarded: "2019-03-15",
        credentialId: "AICPA-CST-2019-771",
      },
    ],
    featuredProjects: [
      {
        name: "T+8 provision close",
        description:
          "<p>How North Pier moved the quarterly provision onto the controller's calendar, plus the Python apportionment model that caught a $1.7M recycled overstatement.</p>",
        links: [
          { label: "Close note", url: "https://www.example.com/north-pier/provision" },
          { label: "Model notes", url: "https://www.example.com/jasmine-patel/apportionment" },
        ],
        skills: ["Tax Provision", "Python", "Financial Reporting"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "accounting-audit",
    name: "Owen McAllister",
    title: "Director of Internal Audit",
    location: "Minneapolis, MN",
    siteDescription:
      "Internal audit director in Minneapolis who treats analytics as the way you pick the audit, not a slide that proves you have a tool.",
    summary:
      "<p>Director of Internal Audit at Minnehaha Consumer Brands, leading a 14-person function across North American plants and a shared-service center. I would rather find the duplicate payment in the data than write a finding about a policy nobody reads.</p><p>I came up through external audit at Northland Mutual Assurance and analytics at Prairie Analytics. The work I trust is a risk assessment that changes the plan, a continuous-audit script that a plant controller cannot game, and a report the audit committee reads because it is short and specific.</p>",
    socials: [
      { platform: "linkedin.com", ref: "owen-mcallister" },
      { platform: "website", ref: "https://www.owenmcallister.example.com" },
    ],
    skills: [
      {
        name: "Audit Analytics",
        description:
          "Uses full-population tests on P2P, payroll, and journal entries to pick audits and to write findings that name the dollars.",
        yearStarted: 2014,
      },
      {
        name: "Internal Controls",
        description:
          "Tests and remediates operational and ICFR controls in plants and shared services without recycling last year's RCM.",
        yearStarted: 2011,
      },
      {
        name: "SOX Compliance",
        description:
          "Coordinates management testing and IA direct assist so SOX is not a second audit the plants have to host.",
        yearStarted: 2012,
      },
      {
        name: "External Audit",
        description:
          "Speaks PCAOB and reliance language so the external auditor can use IA work without a translation layer.",
        yearStarted: 2010,
      },
      {
        name: "Python",
        description:
          "Writes the scripts that run monthly on AP, T&E, and JE data instead of waiting for a vendor dashboard.",
        yearStarted: 2016,
      },
      {
        name: "GAAP",
        description:
          "Knows which operational findings are also financial-statement issues before they reach the committee.",
        yearStarted: 2010,
      },
      {
        name: "Financial Reporting",
        description:
          "Writes IA reports and AC materials that a director can read in one sitting and still know the residual risk.",
        yearStarted: 2011,
      },
      {
        name: "Stakeholder Management",
        description:
          "Holds plant VPs, the CAE role, and the audit committee to one issue list through remediation.",
        yearStarted: 2014,
      },
    ],
    companies: [
      {
        name: "Minnehaha Consumer Brands",
        description:
          "Minneapolis CPG company with 11 plants and a shared-service center. IA reports to the audit committee, not the CFO.",
        location: "Minneapolis, MN",
        startDate: "2020-12-01",
        positions: [
          {
            title: "Director of Internal Audit",
            startDate: "2020-12-01",
            projects: [
              {
                name: "P2P continuous audit",
                description:
                  "Stood up monthly Python tests on the full AP population. Found $2.4M in duplicate and early payments in the first two quarters; recovery hit $1.1M and the control change stuck.",
                skills: ["Audit Analytics", "Python", "Internal Controls"],
              },
              {
                name: "Risk-based plan that moved",
                description:
                  "Replaced a rotational plant plan with a risk assessment that pulled two plants forward after analytics flagged inventory shrink. Both audits issued high-rated findings the rotational plan would have reached in 2024.",
                skills: ["Audit Analytics", "Stakeholder Management", "GAAP"],
              },
              {
                name: "SOX direct-assist reset",
                description:
                  "Renegotiated IA's SOX direct assist so the external auditor relied on 18 IA-tested controls. Plants hosted one walkthrough cycle instead of two.",
                skills: ["SOX Compliance", "External Audit", "Financial Reporting"],
              },
            ],
          },
        ],
      },
      {
        name: "Prairie Analytics Assurance",
        description:
          "Minneapolis shop that built IA analytics for mid-cap issuers. Owen learned which scripts survive a plant controller.",
        location: "Minneapolis, MN",
        startDate: "2015-04-06",
        endDate: "2020-11-20",
        positions: [
          {
            title: "Manager, Audit Analytics",
            startDate: "2017-07-10",
            endDate: "2020-11-20",
            projects: [
              {
                name: "JE continuous monitoring",
                description:
                  "Built monthly JE analytics for a 30-entity close. Caught a recurring manual entry with no reviewer; it became a SOX key control the next year.",
                skills: ["Audit Analytics", "Python", "SOX Compliance"],
              },
              {
                name: "T&E full-population test",
                description:
                  "Replaced a 25-item T&E sample with a full-population test. Policy-break dollars were 8x the sample estimate; the policy, not the sample size, changed.",
                skills: ["Audit Analytics", "Internal Controls", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Senior Analyst",
            startDate: "2015-04-06",
            endDate: "2017-07-07",
            projects: [
              {
                name: "First Python AP script",
                description:
                  "Wrote Owen's first production AP script. Duplicate-invoice logic was ugly and correct; the vendor dashboard it replaced had been filtering out the hits.",
                skills: ["Python", "Audit Analytics"],
              },
              {
                name: "Plant inventory analytics",
                description:
                  "Used cycle-count and shipment data to pick two plants for inventory audits. Both had shrink the cycle-count program had been smoothing.",
                skills: ["Audit Analytics", "GAAP", "Internal Controls"],
              },
            ],
          },
        ],
      },
      {
        name: "Northland Mutual Assurance",
        description:
          "Minneapolis firm where Owen started in external audit on CPG and insurance files.",
        location: "Minneapolis, MN",
        startDate: "2010-09-07",
        endDate: "2015-03-27",
        positions: [
          {
            title: "Audit Senior",
            startDate: "2012-10-01",
            endDate: "2015-03-27",
            projects: [
              {
                name: "Inventory observations that counted",
                description:
                  "Ran inventory observations at four plants. A wall of finished goods that was not on the listing became a $3.2M adjustment.",
                skills: ["External Audit", "GAAP", "Internal Controls"],
              },
              {
                name: "IA reliance first attempt",
                description:
                  "Tried to rely on IA work that had no reperformance. The file taught Owen what reliance actually requires.",
                skills: ["External Audit", "SOX Compliance", "Financial Reporting"],
              },
            ],
          },
          {
            title: "Audit Staff",
            startDate: "2010-09-07",
            endDate: "2012-09-28",
            projects: [
              {
                name: "Cash and AP",
                description:
                  "Owned cash and AP on two CPG files. A cutoff miss on a vendor rebate became Owen's first real adjusting entry.",
                skills: ["External Audit", "GAAP"],
              },
              {
                name: "Control testing on the floor",
                description:
                  "Tested AP controls after watching the three-way match. The matcher and the approver shared a login on Thursdays.",
                skills: ["Internal Controls", "SOX Compliance"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Minnesota Carlson School of Management",
        degree: "M.B.A.",
        dateAwarded: "2015-05-16",
      },
      {
        school: "University of Minnesota",
        degree: "B.S.B., Accounting",
        dateAwarded: "2010-05-15",
      },
    ],
    certifications: [
      {
        name: "Certified Internal Auditor",
        issuer: "Institute of Internal Auditors",
        dateAwarded: "2014-06-20",
        credentialId: "CIA-2014-88210",
      },
      {
        name: "Certified Information Systems Auditor",
        issuer: "ISACA",
        dateAwarded: "2018-02-09",
        credentialId: "CISA-2018-11902",
      },
    ],
    featuredProjects: [
      {
        name: "P2P continuous audit",
        description:
          "<p>The monthly AP tests that found $2.4M in duplicate and early payments, the $1.1M recovered, and the control change that lasted past the finding.</p>",
        links: [
          { label: "Program note", url: "https://www.example.com/minnehaha/p2p-continuous" },
          { label: "Script notes", url: "https://www.example.com/owen-mcallister/analytics" },
        ],
        skills: ["Audit Analytics", "Python", "Internal Controls"],
      },
      {
        name: "Risk-based plant plan",
        description:
          "<p>How inventory analytics pulled two plants forward and produced high-rated findings the old rotational plan would have missed for years.</p>",
        links: [{ label: "Plan note", url: "https://www.example.com/minnehaha/risk-plan" }],
        skills: ["Audit Analytics", "Stakeholder Management", "GAAP"],
      },
    ],
  }),
];
