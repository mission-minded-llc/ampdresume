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
                name: "Cut ATOPIC-310 screen-fail from 41% to 27% after rewriting inclusion criteria",
                description:
                  "Led protocol design and operational standup for a 412-patient Phase IIb atopic dermatitis study across 38 U.S. sites. After interim feasibility showed inclusion language sites could not apply, rewrote the criteria. Screen-fail dropped from 41% to 27%; sites posted the new flowchart in the workroom instead of paging medical monitors.",
                skills: ["Clinical Development", "Trial Operations", "Quality Improvement"],
              },
              {
                name: "Took LUPUS-301 from concept sheet to first patient in 11 months, six weeks ahead",
                description:
                  "Took a lupus nephritis pivotal from concept sheet to FPI in 11 months, including SAP alignment and a Type C package that locked the renal endpoint. First 80 patients randomized 6 weeks ahead of the enrollment model. CMC and biostats stayed on one calendar so the briefing book did not invent a second design.",
                skills: [
                  "Clinical Development",
                  "GCP",
                  "Regulatory Writing",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Rebuilt the U.S. investigator map around 14 academic sites and cut deviations 22%",
                description:
                  "Replaced an underperforming CRO country lead and rebuilt the U.S. investigator map around 14 high-enrolling academic sites that already knew the indication. Protocol deviation rate dropped 22% in two quarters. The new map killed three sites that looked busy on the feasibility call and empty in the EDC, which is the only audit that matters.",
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
                name: "Locked a 620-patient Phase III database 9 days after LPLV instead of the planned 21",
                description:
                  "Owned medical review for a 620-patient Phase III CSR and the last two data-cleaning cycles, including the queries medical monitors keep for the weekend. Locked the database 9 days after LPLV instead of the planned 21. The CSR tables matched the lock listing on the first medical pass.",
                skills: ["Clinical Development", "GCP", "Regulatory Writing"],
              },
              {
                name: "Standardized DSMB packets across three studies so monitors stopped building slides overnight",
                description:
                  "Standardized DSMB open- and closed-session packets across three ongoing studies so medical monitors stopped assembling slides the night before the call. Open-session tables shipped with a locked footnote set; closed-session listings no longer arrived as a personal Excel file. Chairs stopped asking which version was current, which had been the unofficial agenda item.",
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
                name: "Drafted the IL-17 dose-range protocol and cut medical-monitor queries by a third",
                description:
                  "Drafted the dose-range protocol and eligibility flowchart for a first-in-indication IL-17 asset, including the stopping rules biostats would actually use. Medical monitor queries fell by a third after the flowchart shipped to sites. Investigators stopped inventing their own washout math, which had been the quiet source of the protocol deviations.",
                skills: ["Clinical Development", "Regulatory Writing", "GCP"],
              },
              {
                name: "Dropped 11 low-yield sites before SIV using a feasibility score and saved $1.4M",
                description:
                  "Built a feasibility score from prior enrollment, IRB cycle time, and competing studies instead of the usual PI enthusiasm call. Dropped 11 low-yield sites before SIV and saved an estimated $1.4M in start-up. Surviving sites had a coordinator who could name the last competing protocol.",
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
                name: "Closed 94% of critical queries inside 10 days across 19 New England Phase II sites",
                description:
                  "Monitored 19 sites across New England for two Phase II programs that look close on a map and take a full day in January. Closed 94% of critical queries inside the 10-day window for four consecutive quarters. Source-to-EDC mismatches were written up the same visit, not saved for a later letter.",
                skills: ["GCP", "Trial Operations", "Clinical Operations"],
              },
              {
                name: "Led a mock FDA TMF inspection that found 47 gaps; the real inspection found none",
                description:
                  "Led a mock FDA TMF inspection that found 47 filing gaps, most of them certified copies everyone swore were already in the eTMF. The real inspection six months later issued no TMF findings. The drill report named owners, not departments, which is why the gaps closed.",
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
        name: "ATOPIC-310 feasibility rewrite and site-scoring playbook",
        description:
          "<p>Public write-up of the feasibility rewrite and site-scoring method used on Helixbridge's Phase IIb atopic program. Includes the screen-fail waterfall and the eligibility flowchart sites actually posted in the workroom. Written so a new country lead can run the next interim without inventing the method again.</p>",
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
        name: "Regulatory Counseling",
        description:
          "Counsels labeling, REMS, and inspection responses so counsel and the review division hear the same story.",
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
                name: "Directed the NEURO-NDA-04 original filing through 148 eCTD sequences to first-cycle acceptance",
                description:
                  "Directed the original NDA for a late-stage epilepsy asset, 148 eCTD sequences through filing, with Module 2 claims matching the Module 5 tables. FDA accepted on first cycle and scheduled an advisory committee 7 months after NDA receipt. The Type C that set the ad comm clock was written before CMC asked for another week.",
                skills: ["FDA Regulatory Affairs", "Regulatory Writing", "Quality Management"],
              },
              {
                name: "Opened two oncology INDs in 14 months after a pre-IND that reset the starting dose",
                description:
                  "Opened two oncology INDs in 14 months, including a pre-IND that moved the starting dose after FDA questioned the animal-to-human multiple. First-in-human opened 11 weeks after IND receipt. The second IND reused the tox narrative that survived the first review, which is the only kind of template I will defend.",
                skills: ["FDA Regulatory Affairs", "Clinical Development", "GCP"],
              },
              {
                name: "Kept a boxed warning from becoming a contraindication that would have blocked the primary-care launch",
                description:
                  "Led labeling and REMS talks with DMEPA and OSE on a neurology asset commercial wanted in primary care. Kept a boxed warning from expanding into a contraindication that would have blocked that launch. The REMS elements that survived were the ones a clinic can actually run.",
                skills: ["Regulatory Counseling", "Stakeholder Management", "Policy Analysis"],
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
                name: "Rewrote a failed Type B package and locked a single pivotal design at the second EOP2",
                description:
                  "Rewrote a client's EOP2 package after a failed Type B that had asked the division to bless two pivotal designs. The second meeting locked a single pivotal and avoided a second Phase II the board had already funded. Minutes matched the ask, so development did not restart.",
                skills: ["FDA Regulatory Affairs", "Clinical Development", "Regulatory Writing"],
              },
              {
                name: "Built a 505(b)(2) CRL response on new PK work and won resubmission approval in 6 months",
                description:
                  "Built the CRL response for a 505(b)(2) analgesic: new PK work, no new outcome trial, and a Module 2 that did not pretend the first review had asked for new science. Resubmission approved in 6 months. The PK protocol used the CRL language so CMC could not reopen the clinical question.",
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
                name: "Cut ESG sequence rejection from 8% to under 1% with a publish-ready QC checklist",
                description:
                  "Installed a publish-ready QC checklist across 11 client dossiers so hyperlink and leaf-title errors stopped being discovered at the ESG. Sequence rejection dropped from 8% to under 1%. Publishers stopped treating Module 1 as a last-night scramble, which is how most of those rejections had been earned.",
                skills: ["Quality Management", "FDA Regulatory Affairs"],
              },
              {
                name: "Wrote four orphan designation requests and won three on first review with reusable prevalence tables",
                description:
                  "Wrote four orphan designation requests; three granted on first review. Prevalence tables were the part clients kept recycling, because the scientific rationale is easier than a denominator the agency will believe. The one that failed had a prevalence story that only worked if you ignored the broader ICD-10 bucket, which OOPD did not.",
                skills: ["Regulatory Writing", "Policy Analysis", "Regulatory Counseling"],
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
                name: "Cut average FDA information-request cycles from 47 days to 29 across 60-plus ANDA supplements",
                description:
                  "Managed 60-plus annual ANDA supplements for a mature generics book that generated change control faster than anyone wanted to write Module 3. Cut average FDA information-request cycle from 47 days to 29 by standardizing the change narratives. Reviewers stopped asking the same three questions about the same equipment swap.",
                skills: ["FDA Regulatory Affairs", "Quality Management", "Regulatory Writing"],
              },
              {
                name: "Closed two 2014 site inspections VAI with no import alert after drafting the 483 responses",
                description:
                  "Drafted 483 and warning-letter responses with QA for Harborline's site inspections, matching the CAPA language to what the investigator actually wrote. Two site inspections in 2014 closed with voluntary action indicated and no import alert. The responses named the SOP that changed, not the training that would have been the easier paragraph.",
                skills: ["GCP", "Regulatory Counseling", "Stakeholder Management"],
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
        name: "Annotated NEURO-NDA-04 first-cycle filing strategy memo",
        description:
          "<p>Annotated outline of the epilepsy NDA filing strategy: review-division mapping, Module 2 claims that match Module 5, and the Type C questions that decided the advisory-committee timing. The memo is the version CMC and clinical can execute, not the version that only survives a slide review.</p>",
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
                name: "Moved two validated signals into RMP updates within 45 days of the first weekly board flag",
                description:
                  "Stood up a weekly quantitative signal board across 14 products using disproportionality plus case-series review, with a chair who could kill a false flag in the room. Two validated signals reached RMP updates inside 45 days of first flag. Medical and regulatory left with the same action list.",
                skills: ["Pharmacovigilance", "Patient Safety", "Medical Affairs"],
              },
              {
                name: "Cut serious-case coding error from 11% to 3.4% and late 15-day reports from 8 to 1",
                description:
                  "Cut serious-case coding error from 11% to 3.4% in two quarters by pairing MedDRA recoding audits with a vendor scorecard that named the coder, not the company. Late 15-day reports fell from 8 per quarter to 1. The scorecard ended treating a late case as a system issue.",
                skills: ["Pharmacovigilance", "Quality Management", "GCP"],
              },
              {
                name: "Shipped six PSURs and four DSURs on time for two years after rebuilding the aggregate calendar",
                description:
                  "Rebuilt the aggregate-report calendar so six PSURs and four DSURs shipped on time for two consecutive years. Medical review moved from the last weekend to a locked two-week window with a frozen line listing. Authors stopped discovering a new fatal case on Saturday night, which had been the unofficial close process.",
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
                name: "Caught a hepatic signal on 19 cases a monthly disproportionality table had buried",
                description:
                  "Designed a case-series-first method for four pre-approval clients who did not have enough exposure for disproportionality to mean anything. Caught a hepatic signal on 19 cases that the monthly table had buried under a reassuring PRR. The method note went into the DSUR.",
                skills: ["Pharmacovigilance", "Patient Safety", "Regulatory Writing"],
              },
              {
                name: "Closed a 41-case SAE-to-EDC gap before database lock and kept the DSUR clock intact",
                description:
                  "Reconciled safety-database SAEs against EDC for three Phase III programs in the weeks when everyone else is writing the lock plan. Closed a 41-case gap before database lock and kept the DSUR clock intact. Missing cases were mostly hospitalizations coded as protocol visits.",
                skills: ["GCP", "Clinical Operations", "Quality Management"],
              },
              {
                name: "Rewrote U.S. consumer intake so call-center notes stopped storing full SSNs beside AE narratives",
                description:
                  "Rewrote U.S. consumer intake so call-center notes stopped storing full SSNs next to adverse-event narratives, a habit that had survived two vendor changes. Scripts now capture the minimum identifiers a valid ICSR needs. Privacy and safety signed the same SOP so turnover cannot undo it.",
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
                name: "Held 15-day compliance at 98.6% on 74 serious cases a month after a vendor backlog at 91%",
                description:
                  "Processed 74 serious U.S. and EU cases a month at peak, including weekend clocks that do not care about a vendor ticket queue. Held 15-day compliance at 98.6% for 2015–2016 after a vendor backlog that had sat at 91%. The daily aging list named the case, not the workstream.",
                skills: ["Pharmacovigilance", "GCP", "Quality Management"],
              },
              {
                name: "Converted 23 literature articles into valid ICSRs marketing had never sent to safety",
                description:
                  "Ran weekly literature review for nine products and converted 23 articles into valid ICSRs that marketing had never sent to safety, mostly congress abstracts with a hospitalization buried in the poster. The rota assigned a reviewer by product. Marketing learned a published case is still a case.",
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
        name: "Weekly quantitative signal board operating model",
        description:
          "<p>Description of the weekly quantitative-plus-case-series board Francesca installed at Rivermark, including the two signals that reached RMP updates inside 45 days. Names the chair, the kill criteria for a false flag, and the handoff into the RMP so the board is not a slide ritual.</p>",
        skills: ["Pharmacovigilance", "Patient Safety", "Quality Management"],
      },
      {
        name: "PSUR and DSUR aggregate report calendar",
        description:
          "<p>The PSUR and DSUR calendar that moved medical review off the last weekend and kept ten aggregate reports on time for two years. Includes the frozen line-listing window so a new fatal case stops arriving as a Saturday surprise.</p>",
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
                name: "Landed three mAb PPQ lots inside PAR on a 2,000 L site-to-site transfer",
                description:
                  "Transferred a 2,000 L mAb DS process from the sending development suite to a second Oakridge train. Three PPQ lots landed inside PAR; the receiving team ran lot 3 without the sending MSAT lead on the floor. Batch-record redlines were finished before the first CIP.",
                skills: ["CMC Development", "Program Management", "Technical Leadership"],
              },
              {
                name: "Executed a five-lot high-potency API PPQ with Cpk above 1.4 and zero critical deviations",
                description:
                  "Designed and executed a five-lot PPQ for a high-potency API after a solvent swap that had already rewritten the relief-device calc. Cpk on the critical impurity stayed above 1.4; zero critical deviations in the campaign. Operators ran the new charge sequence on engineering lots, not on PPQ-1.",
                skills: ["CMC Development", "Six Sigma", "Quality Management"],
              },
              {
                name: "Forced a hydrogenation vent redesign at 400 L that would have been a late qualification finding",
                description:
                  "Led the process-hazard analysis before a hydrogenation scale-up moved from 50 L to 400 L, with operations and EHS in the room. Two scenarios forced a vent redesign that would have been a late finding in qualification. The timeline slipped six weeks on purpose; the alternative was a finding with a lot number.",
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
                name: "Rebuilt the spray-dried intermediate control strategy and recovered capability without new capital",
                description:
                  "Rebuilt the control strategy for a client's spray-dried intermediate after three commercial lots drifted on residual solvent. Capability recovered without a new capital project, mostly by moving a drying endpoint from a clock to a PAT reading the operators already trusted. QA stopped opening deviations that were really a specification written for a different dryer.",
                skills: ["CMC Development", "Six Sigma", "Quality Management"],
              },
              {
                name: "Wrote the receiving-site playbook used on four later transfers, from redlines to day-one QA questions",
                description:
                  "Wrote the receiving-site playbook used on four subsequent transfers: batch-record redlines, sampling maps, PAR tables, and the questions QA always asks on day one. Sending teams stopped treating the receive as a shipping project. The packet still gets handed to MSAT before the first CIP, which is the only time it is useful.",
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
                name: "Moved a crystallization from 62% to 81% isolated yield and retired a second mill pass",
                description:
                  "Ran a 16-run designed experiment that moved a crystallization from 62% to 81% isolated yield and tightened PSD enough for the downstream mill to retire a second pass. The design included the seed load operators had been adjusting by eye. Process chemistry kept the setpoints; manufacturing kept the cycle time.",
                skills: ["Six Sigma", "CMC Development"],
              },
              {
                name: "Built an engineering-lot calendar around a sold-out line so characterization did not steal Friday",
                description:
                  "Built the engineering-lot calendar around a sold-out commercial line so characterization did not steal the Friday slot for two months running. Planning and MSAT signed the same freeze date. The commercial planner stopped discovering a characterization batch on the board on Thursday, which had been the unofficial scheduling process.",
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
                name: "Cut night-shift documentation deviations 38% in a year by rewriting the steps operators skipped",
                description:
                  "Cut documentation deviations on the night shift by 38% in a year by rewriting the batch-record steps operators actually skipped, mostly checks that duplicated a DCS interlock. The rewrite sat with the night lead, not the day-shift author. QA kept the critical checks and lost the ones that had been training people to initial fiction.",
                skills: ["Quality Management", "Production Planning", "Technical Leadership"],
              },
              {
                name: "Changed a methylene-chloride-to-acetonitrile timeline by six weeks after the PHA rewrote the relief calc",
                description:
                  "Ran the first formal PHA on a methylene-chloride-to-acetonitrile swap that process chemistry had treated as a drop-in. The relief-device calculation changed the project timeline by six weeks and avoided a later near miss. EHS kept the new calc; the project kept the solvent.",
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
        name: "Receiving-site tech-transfer playbook for MSAT teams",
        description:
          "<p>The packet Grant still hands a receiving MSAT team on day one: redlined batch records, sampling maps, PAR tables, and the PHA questions that stop a transfer from becoming a shipping project. Used on four later transfers without rewriting the first chapter.</p>",
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
                name: "Found 28% of a $180M workforce portfolio could not document the employment outcome they were paid for",
                description:
                  "Led a mixed-methods evaluation of a $180M workforce grant portfolio across 41 states, using a sample that was not a convenience sample. Found 28% of sites could not document the employment outcome they were paid for; the next NOFO dropped that indicator. Program offices got a methods note, not a success story.",
                skills: ["Program Evaluation", "Monitoring and Evaluation", "Grant Management"],
              },
              {
                name: "Cleared a 12,000-respondent OMB Part A/B package in 91 days after the prior package sat 8 months",
                description:
                  "Wrote the OMB Part A/B package for a 12,000-respondent grantee survey and cleared it in 91 days. The prior package had sat 8 months on a burden estimate nobody could defend. Part B named the sampling frame the contractor actually had, which is the only way a PRA package leaves the building.",
                skills: ["Regulatory Writing", "Policy Analysis", "Stakeholder Management"],
              },
              {
                name: "Protected $62M and cut $19M from a demonstration that had never met its own logic model",
                description:
                  "Turned two evaluation reports into a passback justification that protected $62M and cut $19M from a demonstration that had never met its own logic model. Budget and evaluation sat in the same room so the cut list cited evidence, not a target. The demonstration office appealed; the evidence-act file was the exhibit that ended it.",
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
                name: "Showed the NOFO fidelity measure did not match how 63 housing-counseling grantees actually spent time",
                description:
                  "Designed an implementation study of 63 housing-counseling grantees, including site visits that watched the hour, not the workplan. The fidelity measure in the NOFO did not match how counselors actually spent time. The next award announcement dropped the measure rather than train counselors to perform it for the monitor.",
                skills: ["Program Evaluation", "Monitoring and Evaluation", "Grant Management"],
              },
              {
                name: "Walked an IG team through sampling after a program office claimed bias; the public finding stood",
                description:
                  "Walked an IG team through sampling and weighting after a program office claimed the sample was biased against the cooperative grantees. The finding stood in the public report. The liaison file had the frame, the nonresponse, and the one email that asked us to drop a site, which is why the conversation stayed technical.",
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
                name: "Rebuilt 11 program logic models so outputs stopped being labeled outcomes; four later survived OMB review",
                description:
                  "Ran a clinic that rebuilt 11 program logic models so outputs stopped being labeled outcomes. Four of those models later survived OMB evidence-act review. Program offices left with a one-page model they could not quietly re-inflate in the justification book, which had been the usual after-action.",
                skills: ["Program Evaluation", "Change Management", "Regulatory Writing"],
              },
              {
                name: "Found 17% of a $90M portfolio reused the prior quarter's numerator and built the automatic check",
                description:
                  "Audited quarterly indicator files for a $90M portfolio and found 17% of records reused the prior quarter's numerator. Built the check that caught it automatically before the dashboard published. Grantees stopped calling it a system glitch once the check named the award number, which is the only language that changes a file.",
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
                name: "Documented $2.1M in questioned costs across 34 on-site reviews that the awarding agency later disallowed",
                description:
                  "Completed 34 on-site reviews in two years, reading the drawdown against the activity the award actually paid for. Documented $2.1M in questioned costs that the federal awarding agency later disallowed. The reports named the invoice, not the vibe of the site visit, which is why the disallowance survived the grantee letter.",
                skills: ["Grant Management", "Monitoring and Evaluation", "Policy Analysis"],
              },
              {
                name: "Moved a rural match requirement from 50% to 25% after documenting the actual local-revenue base",
                description:
                  "Drafted a comment letter that moved a match requirement from 50% to 25% for rural grantees after documenting the actual local-revenue base, not the one implied by a metro county. The preamble quoted the revenue table. Rural applicants stopped being designed out of a competition that claimed to want them.",
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
        name: "Workforce grant portfolio evaluation and NOFO change",
        description:
          "<p>Public summary of the $180M workforce evaluation: sampling, the 28% documentation gap, and the NOFO change that followed. Written so an appropriations staffer can read it in one sitting, and so the next NOFO cannot quietly restore the unpaid-for indicator.</p>",
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
                name: "Awarded a $1.2B multiple-award IDIQ; GAO denied the only protest in 88 days on the SSDD",
                description:
                  "Awarded a $1.2B multiple-award IDIQ after a 15.3 competition with 19 proposals. One protest; GAO denied in 88 days because the SSDD quoted the factors the RFP actually used. Consensus notes were written to the factors, not to a favorite offeror, which is the only protest record that holds.",
                skills: ["Procurement", "Regulatory Writing", "Legal Research"],
              },
              {
                name: "Held cost realism on an $84M task order 31% below the IGE and awarded with no protest",
                description:
                  "Led discussions and FPRs on a $84M task order where the apparent winner was 31% below the IGE. Cost realism held; the award went to the second-lowest, and the debrief produced no protest. The realism narrative named the labor mix that could not staff the PWS.",
                skills: ["Contract Negotiation", "Procurement", "Stakeholder Management"],
              },
              {
                name: "Stopped an award 11 days out after OCI showed a subcontractor had written the PWS",
                description:
                  "Stopped an award 11 days out after an OCI review showed a subcontractor had written the PWS, which is the finding everyone hopes stays in the email thread. Recompeted the work; the file later survived an IG sample. The mitigation the contractor offered was a firewall slide; the file got a new competition instead.",
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
                name: "Rebuilt a contaminated evaluation file mid-competition and awarded in 47 days with no protest",
                description:
                  "Rebuilt a contaminated evaluation file after a CO left mid-competition, including a consensus report that had been edited after the ratings were signed. New consensus, new SSDD, award in 47 days; no protest. The new file quoted the evaluation notices, not the hallway ranking that had been living in a spreadsheet.",
                skills: ["Procurement", "Regulatory Writing", "Program Management"],
              },
              {
                name: "Built a CAAC and agency class-deviation tracker so COs stopped citing expired flexibilities in RFPs",
                description:
                  "Built the shop's tracker for CAAC and agency class deviations so COs stopped citing expired flexibilities in RFPs that would have to be explained in a protest. The tracker named the sunset date next to the clause. Policy stopped being a shared drive folder that was current as of whoever last cared.",
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
                name: "Forced a fair-opportunity memo on every BPA call over the SAT and drove call protests to zero",
                description:
                  "Wrote the call-order template that forced a fair-opportunity memo on every BPA call over the SAT, including the ones program offices wanted to send to the incumbent. Call protests in that office went to zero for 18 months. The memo was short enough that people used it.",
                skills: ["Procurement", "Regulatory Writing"],
              },
              {
                name: "Documented the Rule of Two that moved a $19M IT buy to 8(a) and held on protest",
                description:
                  "Documented the Rule of Two analysis that moved a $19M IT support buy from unrestricted to 8(a) after market research showed two capable firms, not a vibe. Award held on protest. The file had the capability statements, not a small-business goal chart, which is what GAO actually reads.",
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
                name: "Cut commercial-item award time from 34 days to 19 across 200-plus SAP actions under a $5M warrant",
                description:
                  "Closed 200-plus SAP actions a year under a $5M warrant, the work that looks simple until the clause set is wrong. Average award time on commercial items dropped from 34 days to 19 after a clause library rewrite. Specialists stopped retyping FAR 52.212-4 from memory, which is how most of those 34 days were spent.",
                skills: ["Procurement", "Contract Negotiation", "Program Management"],
              },
              {
                name: "Assembled the agency report on a $3.2M protest that GAO denied on the evaluation notices",
                description:
                  "Assembled the agency report on a $3.2M protest, including the evaluation notices the CO had actually sent. GAO denied; those notices were the exhibit that mattered. Counsel stopped asking for a narrative that improved the file after the fact, which is the only way a first protest stays a first protest.",
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
        name: "ATLAS $1.2B IDIQ source-selection protest record",
        description:
          "<p>Redacted walkthrough of the $1.2B ATLAS competition: evaluation plan, consensus, SSDD excerpts, and why the protest record held at GAO. The SSDD quotes the factors the RFP actually used, which is the only protest exhibit that matters.</p>",
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
                name: "Wrote the seven-state wildfire-mitigation memo regional offices used as the inspection checklist",
                description:
                  "Wrote the seven-state implementation memo for a federal wildfire-mitigation rule so regional offices had one inspection checklist instead of seven informal readings. Informal guidance emails dropped by half in the first season. The memo named the inspection item and the citation, which is how unofficial guidance stops becoming the real rule.",
                skills: ["Regulatory Writing", "Change Management", "Stakeholder Management"],
              },
              {
                name: "Documented where three state ozone rules exceeded the federal minimum; two states rewrote their SIP narratives",
                description:
                  "Documented where three state ozone rules exceeded the federal minimum and where they only looked like they did in the SIP narrative. Two states rewrote that narrative before EPA asked. The table put the state language next to the federal floor, which is the only format that ends the more-stringent argument.",
                skills: ["Policy Analysis", "Legal Writing", "Regulatory Writing"],
              },
              {
                name: "Staffed a 1,400-comment water-quality docket so form letters got one answer and technical comments got citations",
                description:
                  "Staffed the comment-response for a 1,400-comment water-quality docket. Every form-letter cluster got one answer; the unique technical comments got citations to the record, not a thank-you sentence. The preamble could be read by someone who had filed a real comment, which is rarer than the process memo claims.",
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
                name: "Drafted the inspection-split MOU cited in two later lawsuits, and the split held",
                description:
                  "Drafted the MOU that split inspection responsibility on a federal land-management rule between the state and the federal field office. The MOU was cited in two later lawsuits and held. Counsel kept the statute in the first paragraph so the split could not be reread as a delegation the agency did not have.",
                skills: ["Legal Writing", "Policy Analysis", "Stakeholder Management"],
              },
              {
                name: "Cut a quarterly reporting form by a third after 41% of fields went unused in enforcement",
                description:
                  "Evaluated a quarterly reporting rule after two years and showed 41% of fields were never used in an enforcement file, a dashboard, or a referral. The next revision cut the form by a third. Program staff kept the fields they actually queried; counsel lost the ones that existed for completeness theater.",
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
                name: "Wrote the workplan that pulled $4.6M in federal implementation money for 11 rural counties",
                description:
                  "Wrote the workplan that pulled $4.6M in federal implementation money for 11 rural counties that could not hire their own rule staff. The budget named shared inspectors, not eleven desk officers. Those counties stopped being the ones who learn a rule from an enforcement letter.",
                skills: ["Grant Writing", "Policy Advocacy", "Policy Analysis"],
              },
              {
                name: "Built testimony books for three legislative hearings so members quoted the docket instead of the lobby one-pager",
                description:
                  "Built the testimony book for three legislative hearings so members quoted the docket instead of the lobby one-pager that had been circulating since breakfast. Q-and-A tabs cited the comment-response, not a talking point. The hearing record sounded like the rulemaking, which is the only win that counts after the cameras leave.",
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
                name: "Drafted 40-plus docket comments; eight were quoted in final preambles and two changed a compliance deadline",
                description:
                  "Drafted 40-plus docket comments in three years for counties that would otherwise have sent a late letter about unfunded mandates. Eight were quoted in final preambles; two changed a compliance deadline. The comments that landed had a local fact and a citation, not a mood.",
                skills: ["Policy Advocacy", "Regulatory Writing", "Policy Analysis"],
              },
              {
                name: "Ran 12 county workshops whose attendance notes became the consultation record the state later filed",
                description:
                  "Ran 12 county workshops on a pending air rule, with attendance notes that named who spoke and what they asked. Those notes became the consultation record the state later filed. The workshops were scheduled before the draft was frozen, which is the only time consultation is not theater.",
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
        name: "Seven-state wildfire rule implementation checklist memo",
        description:
          "<p>The seven-state memo regional offices used as an inspection checklist, plus the consultation log that kept unofficial guidance from becoming the real rule. Each inspection item carries the citation so informal emails stop being the implementation.</p>",
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
                name: "Freed $31M with a vacancy-factor rewrite and protected two evidence-backed decision units in passback",
                description:
                  "Led formulation for a $2.4B portfolio across four bureaus. A vacancy-factor rewrite freed $31M without a program cut; the passback protected two evidence-backed decision units and reduced a demonstration that had never spent its first-year allotment. The request that left the building could still be explained in May, which is the test.",
                skills: ["Budget Formulation", "Financial Modeling", "Program Evaluation"],
              },
              {
                name: "Moved $47M in a mid-year package the control agency approved on first review after a hire freeze",
                description:
                  "Built the mid-year package that moved $47M after a delayed hire freeze left allotments sitting on vacant lines. Every line cited the allotment, not the original request, and the control agency approved on first review. Program offices stopped treating the request as the legal ceiling, which it had never been.",
                skills: ["Financial Reporting", "Stakeholder Management", "GAAP"],
              },
              {
                name: "Separated obligated pass-through awards from expended amounts after the prior report overstated execution by 9%",
                description:
                  "Separated obligated pass-through awards from expended amounts in the monthly close after the prior report had been adding them together for two quarters. Execution had been overstated by 9%. The dashboard that survived showed cash out the door, not a grant that had been awarded and then admired.",
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
                name: "Rebuilt the personal-services model so salary savings stopped being a plug, landing $18M closer to execution",
                description:
                  "Rebuilt the personal-services model so salary savings stopped being a plug that made the request look disciplined. The next request was $18M closer to actual execution. HR and budget used the same onboard date assumptions, which is the only way a vacancy factor is not a wish.",
                skills: ["Financial Modeling", "Budget Formulation", "GAAP"],
              },
              {
                name: "Ran the mid-year cut workshop that produced a ranked list instead of an across-the-board percent",
                description:
                  "Ran the mid-year cut workshop that produced a ranked list instead of an across-the-board percent that would have punished the bureaus that had already executed. Three bureaus took the list; one appealed and lost on the evidence. The ranking cited unobligated balances and the evaluation file, not who spoke last.",
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
                name: "Brought a $620M bureau monthly close from day 18 to day 9 by locking journal-source rules",
                description:
                  "Closed monthly execution for a $620M bureau. Brought the average close from day 18 to day 9 by locking journal-source rules so late entries stopped arriving as tribal knowledge. The trial balance that published on day 9 was the same one the analysts had, which had not been true when close was a negotiation.",
                skills: ["Financial Reporting", "GAAP"],
              },
              {
                name: "Tagged one-time funds so they could not hide in the base and surfaced a $12M out-year cliff",
                description:
                  "Tagged one-time funds so they could not hide in the base and reappear as a permanent decision unit. The next out-year showed a $12M cliff the program office had not briefed. The justification book lost a paragraph that had been doing a lot of quiet work.",
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
                name: "Caught a $6.4M double-count in object-class tables before the book went to the control agency",
                description:
                  "Owned the object-class tables for three decision units and reconciled them to the account-level request, not the narrative. Caught a $6.4M double-count before the book went to the control agency. The table that shipped could be added up, which is a lower bar than it sounds.",
                skills: ["Budget Formulation", "Financial Reporting"],
              },
              {
                name: "Built a match schedule that treated local match as a constraint and resized two awards before the NOFO",
                description:
                  "Built the first match schedule that showed state and local match as a constraint, not a footnote under the federal share. Two awards were resized before the NOFO dropped. Applicants stopped being set up to fail a match they could not raise, which had been the unofficial design.",
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
        name: "FY23 vacancy-factor rewrite that freed $31M",
        description:
          "<p>How the FY23 personal-services model stopped treating vacancy as a plug and freed $31M without a program cut. Includes the mid-year reprogramming that followed when hiring still lagged, and the onboard-date assumptions HR and budget finally shared.</p>",
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
                name: "Generated 1,140 requirements and 86 ICDs from the SysML baseline and cut inconsistency comments 40%",
                description:
                  "Built the program SysML baseline used at SRR and PDR. Generated 1,140 requirements and 86 ICDs from the model; customer review comments on inconsistency dropped 40% versus the prior document-based cycle. If it was not in the model it was not in the program.",
                skills: [
                  "Model-Based Systems Engineering",
                  "Requirements Management",
                  "System Design",
                ],
              },
              {
                name: "Closed 63 ICD deltas in two quarters with a weekly interface board and zero orphaned child requirements",
                description:
                  "Stood up a weekly interface board that closed 63 ICD deltas in two quarters, with the owning IPT in the room instead of on the distribution. Zero orphaned child requirements after the first month of CM discipline. Hardware leads stopped marking up a PDF in the hallway, which had been the unofficial ICD process.",
                skills: [
                  "Configuration Management",
                  "Systems Engineering",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Rewrote 210 shalls that had verify-by-analysis with no owner so TRR entry criteria stopped being a negotiation",
                description:
                  "Rewrote 210 shalls that had 'verify by analysis' with no analysis owner, no product, and no due date. TRR entry criteria stopped being a negotiation. Test and analysis leads signed the method before the shall was baselined, which is the only order that works.",
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
                name: "Automated spec generation from SysML so the Word baseline stopped drifting from the model after PDR",
                description:
                  "Automated spec generation from SysML so the Word baseline stopped drifting from the model within a week of PDR. Spec authors edited the model, not a checkout copy that became truth by seniority. Configuration management finally had one object to put a number on.",
                skills: [
                  "Model-Based Systems Engineering",
                  "Configuration Management",
                  "Technical Leadership",
                ],
              },
              {
                name: "Moved 19 software functions off an overloaded processor before CDR drawings froze",
                description:
                  "Ran allocation workshops that moved 19 software functions off an overloaded processor before CDR drawings froze the box list. Software and hardware leads left with the same allocation table. The processor that would have failed timing analysis kept the functions it could actually run, which is a kindness you only get before CDR.",
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
                name: "Rewrote 400-plus compound shalls into verifiable singles that test planning used without a translation spreadsheet",
                description:
                  "Rewrote 400-plus compound shalls into verifiable singles so a requirement no longer hid three tests and a hope. Test planning used the new set without a translation spreadsheet. The customer accepted the rewrite because each shall still traced to the same parent, which is the only way a cleanup does not become a scope fight.",
                skills: ["Requirements Management", "Systems Engineering"],
              },
              {
                name: "Rebuilt a broken parent-child trace before audit; the customer found two gaps instead of 70 hidden ones",
                description:
                  "Rebuilt a broken parent-child trace before a customer audit, starting from the model instead of the spreadsheet that had been 'reconciling' for a month. The audit found two gaps instead of the 70 the draft matrix had hidden. Those two had owners before the in-brief, which is the only acceptable number.",
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
        name: "Interceptor support SysML baseline for SRR and PDR",
        description:
          "<p>How the Aetherion model became the SRR and PDR source of truth: generated requirements, ICDs, and the change-board rule that stopped orphaned children. If it is not in the model it is not in the program, which is how a baseline earns the name.</p>",
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
                name: "Led 41 Block 3 envelope-expansion sorties, closed 28 flying-qualities shalls, and rewrote two cards after the THA",
                description:
                  "Led 41 envelope-expansion sorties on Block 3, including the points that look routine on the card and interesting on the TM. Closed 28 flying-qualities shalls; two cards were rewritten after the THA, not after a near miss. The rewrite named the condition that had been implied, which is how implied conditions become incidents.",
                skills: ["Flight Test", "Safety Management Systems", "Requirements Management"],
              },
              {
                name: "Tied each sortie to a DO-178C build and caught two configuration mismatches on the ground before flight",
                description:
                  "Tied each sortie to a DO-178C software build and objective set so the card, the load, and the evidence folder told the same story. A configuration mismatch was caught on the ground twice; it had been the source of a prior no-score flight. Quality stopped treating the build as a dispatch-sheet note.",
                skills: ["DO-178C", "Avionics", "Quality Management"],
              },
              {
                name: "Rebuilt the experimental-certificate package so the ASI visit kept operating limitations and answered 14 oral-tradition questions",
                description:
                  "Rebuilt the experimental-certificate package for the ASI visit so the data package answered the 14 questions that had been oral tradition in the hangar. Operating limitations stayed intact. The ASI left with a binder, not a phone tree, which is the only way a renewal stays a renewal.",
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
                name: "Closed 94 DO-178C Level C objectives after rewriting the trace; the DER accepted on the second cycle",
                description:
                  "Closed 94 DO-178C Level C objectives for a flight-control load. The DER accepted the package on the second cycle after the trace was rewritten, not the tests. The tests had been fine; the matrix had been a novel. That is usually the ratio.",
                skills: ["DO-178C", "Requirements Management", "Quality Management"],
              },
              {
                name: "Ran load-control for three test articles with zero unauthorized loads in 22 months after a two-person verify rule",
                description:
                  "Ran the software load-control desk for three test articles, including the weekend loads that used to happen because someone had a cable. Zero unauthorized loads in 22 months after a two-person verify rule. The second person was on the hangar floor, not on a distribution list, which is why the rule held.",
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
                name: "Cut high-g data loss on 12 critical TM parameters from 8% of frames to under 0.4%",
                description:
                  "Rebuilt the TM package so 12 critical parameters stopped dropping on high-g points that were exactly the points the card cared about. Data loss on those parameters went from 8% of frames to under 0.4%. The next THA used the parameter, not a reconstruction, which is the difference between a score and a story.",
                skills: ["Flight Test", "Avionics", "Systems Engineering"],
              },
              {
                name: "Mapped card success criteria to TM parameters before the brief and delayed two cards missing on the jet",
                description:
                  "Mapped each card's success criteria to TM parameters before the brief, not after the debrief when everyone is already sure they saw it. Two cards were delayed because the parameter was not on the jet; that was the point. The map lived with the card so a late load could not quietly unscore a point.",
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
        name: "Palmdale flight-test DO-178C build-to-sortie evidence method",
        description:
          "<p>The method that ties each Palmdale sortie to a DO-178C build and objective set, plus the two ground catches that used to become no-score flights. The card, the load, and the evidence folder finally tell the same story before the jet moves.</p>",
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
                name: "Found 11 undocumented software deltas on two aircraft and rebaselined both jets before the next customer flight",
                description:
                  "Reconciled as-designed vs. as-flown on two aircraft after a load-control drift that had been living in technician notebooks. Found 11 undocumented software deltas; both jets were rebaselined before the next customer flight. The release gate that followed required the as-built record, not a verbal 'it's the same as the other tail.'",
                skills: ["Configuration Management", "Avionics", "Quality Management"],
              },
              {
                name: "Released a DO-178C Level B flight-control load locked to three tails; the DER accepted on first cycle",
                description:
                  "Released a DO-178C Level B flight-control load with effectivity locked to three tail numbers, including the load-control record the hangar had been treating as optional. The DER accepted the package on first cycle. Effectivity was in the release, not in a spreadsheet someone updated after the jet left the hangar.",
                skills: ["DO-178C", "FAA Compliance", "Technical Leadership"],
              },
              {
                name: "Froze the comms ICD after 27 shop-floor notes and cut integration defects 35% in a quarter",
                description:
                  "Froze the comms ICD after 27 late changes had been arriving as shop-floor notes that never quite made it to the model. Subsequent changes went through the board; integration defects dropped 35% in a quarter. Lab techs stopped being the configuration-management system, which they had not asked to be.",
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
                name: "Merged three CM tools into one as-built record and cut fleet configuration findings from 22 to 3",
                description:
                  "Merged three CM tools into one as-built record for a 14-aircraft fleet so a tail number finally had one configuration story. Audit findings on configuration dropped from 22 to 3 in a year. The remaining three were real; the other nineteen had been tool disagreements wearing a finding number.",
                skills: ["Configuration Management", "Quality Management", "Technical Leadership"],
              },
              {
                name: "Cut average avionics change-board cycle from 19 days to 6 by requiring a shall and an effectivity",
                description:
                  "Cut average avionics change-board cycle from 19 days to 6 by forcing a shall and an effectivity on every request, including the ones that arrived as 'just a wire.' Requests without both sat in a queue that was visible. The board started deciding changes instead of translating them.",
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
                name: "Installed a two-person load-control rule after an unauthorized field load, with no repeat in 18 months",
                description:
                  "Installed a two-person load-control rule after an unauthorized field load that had been justified as a Saturday urgency. No repeat in 18 months of hangar operations. The second signature was physical, on the load sheet, which is the only place a field load actually happens.",
                skills: ["Avionics", "Quality Management", "DO-178C"],
              },
              {
                name: "Assembled the first complete major-alteration data package the shop shipped without a DER rewrite",
                description:
                  "Assembled the first complete major-alteration data package the shop had shipped without a DER rewrite, including the drawings and the ground-structure that had previously arrived as attachments to an apology. The DER marked comments, not a rebuild. The shop learned what 'complete' meant before the next alteration, which is the actual deliverable.",
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
                name: "Correlated bench and first-flight bus logs and found a radio timing issue the room-temperature bench had masked",
                description:
                  "Correlated bench bus logs with first-flight logs on a new radio suite. Found a timing issue the bench had masked at room temperature and would have become a flight card if the overlay had waited. Integration kept the bench; they also kept a temperature point, which is cheaper than a sortie.",
                skills: ["Avionics", "Systems Engineering"],
              },
              {
                name: "Closed 40 of 61 ICD discrepancies before first flight instead of turning them into flight cards",
                description:
                  "Opened the first formal ICD discrepancy log the lab kept, instead of a hallway list that reset every Monday. 40 of 61 items closed before first flight instead of becoming flight cards. The remaining 21 had owners and effectivity, which is a better first-flight story than 61 surprises.",
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
        name: "As-flown configuration baseline recovery for two jets",
        description:
          "<p>How Cascadia reconciled two jets after load-control drift: the 11 undocumented deltas, the rebaseline, and the release gate that followed. The gate requires the as-built record, not a verbal claim that one tail matches the other.</p>",
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
                name: "Recovered a 14-week increment 2 slip to 11 days late and held the award-fee score",
                description:
                  "Recovered a 14-week slip on increment 2 by replanning two subcontractors against the true critical path, not the path on the award-fee slide. Delivered increment 2 11 days late instead of a quarter late; award-fee score held. The IMS that survived had ICD freeze on it, which is how increment 3 starts honest.",
                skills: ["Program Management", "Stakeholder Management", "Contract Negotiation"],
              },
              {
                name: "Sized 47 customer asks in a year, funding 19 mods and deferring 28 with written shalls",
                description:
                  "Installed a CCB that sized 47 customer asks in a year. 19 became funded mods; 28 were deferred with a written shall so they could not re-enter as 'small.' The customer still got a no, but it had a number and a slot, which is the only no that stays a no.",
                skills: ["Change Management", "Requirements Management", "Technical Leadership"],
              },
              {
                name: "Brought three subcontractors onto a common visitor and artifact-control process; the security review closed with two observations",
                description:
                  "Brought three subcontractors onto a common visitor and artifact-control process before a customer security review that would have found three different badge stories. The review closed with two observations and no findings. The process was boring on purpose; exciting security processes are the ones that fail the in-brief.",
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
                name: "Rewrote two subcontract SOWs off slide-deck management and halved earned-value variance on those CLINs",
                description:
                  "Rewrote two subcontract SOWs after the vendors were managing to a slide, not a shall, and invoicing to the slide. Earned-value variance on those CLINs halved in two quarters. The new SOWs had CDRLs a CAM could refuse, which is the only language a subcontract understands.",
                skills: ["Contract Negotiation", "Requirements Management", "Program Management"],
              },
              {
                name: "Put systems engineering back on the critical path so PDR stopped inventing 40 interface issues in the hallway",
                description:
                  "Moved ICD freeze onto the IMS critical path so systems engineering stopped being a weekend activity before PDR. The next PDR did not invent 40 interface issues in the hallway. Hardware leads complained about the freeze date and then used it, which is the usual adoption curve.",
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
                name: "Cut customer surprise items from a dozen a quarter to two by walking the IMS weekly",
                description:
                  "Replaced a monthly slide dump with a weekly IMS walk that showed the true critical path, including the subcontractor that had been green by optimism. Customer surprise items dropped from a dozen a quarter to two. The walk took forty minutes; the monthly dump had taken two hours and answered fewer questions.",
                skills: ["Stakeholder Management", "Program Management"],
              },
              {
                name: "Stood up the IPT CCB so informal email changes stopped being the way hardware got redesigned",
                description:
                  "Stood up the IPT CCB after hardware had been redesigned by email threads that never quite reached configuration management. Informal email changes stopped being the way a box picked up a new connector. The first three requests were messy; the fourth already had a shall, which is how a board becomes real.",
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
                name: "Owned the shipboard C4I interface package on two hulls and finished both installs inside the yard window",
                description:
                  "Owned the interface package for a shipboard C4I install on two hulls, including the yard constraints that do not care about a program IMS. Both installs completed inside the yard window. The ICD that shipped had the cable that existed on the ship, not the cable in the proposal drawing.",
                skills: ["Systems Engineering", "Requirements Management", "Technical Leadership"],
              },
              {
                name: "Briefed the design review without a program manager and closed 16 of 18 actions before the next review",
                description:
                  "Briefed the first design review run without a program manager in the room, which is when you find out whether the IPT actually owns the design. The action list had owners and dates; 16 of 18 closed before the next review. The two that slipped had a written reason, not a vibe.",
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
        name: "C4ISR increment 2 critical-path recovery brief",
        description:
          "<p>How increment 2 came back from a 14-week slip: the real critical path, the two subcontract replans, and the CCB that stopped unofficial scope from returning. The IMS that survived has ICD freeze on it, which is how increment 3 starts honest.</p>",
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
                name: "Closed a $410M specialty-distributor sale on the announced date after a 72-hour disclosure-schedule recut",
                description:
                  "Led buy-side documents on a $410M sale of a specialty distributor. Closed on the announced date; the disclosure schedule matched the data room after a 72-hour recut that caught three unscheduled contracts. Those contracts would have been a post-closing letter; they became a price conversation while there was still a price conversation.",
                skills: ["Corporate Law", "Deal Execution", "Contract Negotiation"],
              },
              {
                name: "Rebuilt board minutes, consents, and the audit-committee charter so the next financing needed no cleanup memo",
                description:
                  "Rebuilt a portfolio company's board minutes, consents, and audit-committee charter after a sponsor add-on that had been running on email approvals and optimism. The next financing used the minute book without a cleanup memo. The audit committee finally had a charter that matched the meetings it was already having.",
                skills: ["Corporate Governance", "Legal Writing", "Stakeholder Management"],
              },
              {
                name: "Stood up HSR and short-form CFIUS on a defense-adjacent add-on 19 days after signing without moving close",
                description:
                  "Stood up HSR and a short-form CFIUS analysis on a defense-adjacent add-on 19 days after signing, while the rest of the deal was still arguing working capital. Neither filing became the reason closing moved. The CFIUS memo named the contracts that looked like critical infrastructure and the ones that only looked like a press release.",
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
                name: "Standardized stockholder and board consents across 22 portfolio companies so email approvals stopped issuing equity",
                description:
                  "Standardized stockholder and board consents for a sponsor with 22 portfolio companies that had been issuing equity on reply-all threads. Unauthorized email approvals stopped being the way options were granted. The template was short enough that deal teams used it, which is the only governance program a sponsor will keep.",
                skills: ["Corporate Governance", "Corporate Law", "Legal Writing"],
              },
              {
                name: "Managed corporate-authority opinions on four facilities and slipped a week rather than opine on a missing consent",
                description:
                  "Managed the corporate-authority opinions on four credit facilities, including the one where the consent everyone remembered did not exist in the minute book. That deal slipped a week. The opinion that shipped had a consent behind it, which is the only kind I will sign my name under.",
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
                name: "Moved UCC checks to T-3 across 11 closings so a late lien search became a morning problem",
                description:
                  "Ran closing checklists on 11 deals and moved UCC checks to T-3 so an 11 p.m. lien search became a morning problem with time left to call the bank. One deal would have closed with a surprise filing. The checklist was boring on purpose; exciting closings are the ones that generate the morning-after memo.",
                skills: ["Deal Execution", "Corporate Law"],
              },
              {
                name: "Owned the first indemnity and escrow markup; only the basket and sandbagging sentence survived the call",
                description:
                  "Marked the first indemnity and escrow package I owned, after sitting through enough of other people's markups to know which fights are real. The basket and the sandbagging sentence were the only fights that survived the call. Everything else was a style preference wearing a redline.",
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
        name: "Harborline $410M sale closing record walkthrough",
        description:
          "<p>Redacted walkthrough of the $410M Harborline sale: the disclosure-schedule recut, the consent trail, and the HSR/CFIUS workstream that stayed off the critical path. The three unscheduled contracts became a price conversation while there was still a price conversation.</p>",
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
                name: "Won a $27M supply-contract bench verdict after dropping a fraud count the custodian review could not support",
                description:
                  "Tried a $27M supply-contract case to a bench verdict in the Northern District. Judgment for the client on the contract claim; the fraud count was dropped after a custodian review that did not support it. The court got one theory. The other side got a cleaner record than they wanted and a worse result.",
                skills: ["Litigation Strategy", "Legal Writing", "Legal Research"],
              },
              {
                name: "Negotiated a TAR protocol that cut 2.1M documents to 180k and dropped production cost 62%",
                description:
                  "Negotiated a TAR protocol that cut a 2.1M-document review to 180k with a 75% recall validation the requesting party accepted in writing. Production cost dropped 62% versus the vendor's linear estimate. The seed set was built from known-good productions, not from whoever yelled first in the protocol draft.",
                skills: ["eDiscovery", "Contract Negotiation", "Stakeholder Management"],
              },
              {
                name: "Installed a hold 11 days after a demand letter while two key custodians still had intact mail",
                description:
                  "Installed a hold 11 days after a demand letter on a case that had been 'waiting to see' whether it would get serious. Two key custodians still had intact mail; the spoliation letter the other side sent went nowhere. The hold notice named the systems, not the vibe of a litigation hold.",
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
                name: "Built the non-compete SJ record the court granted in part, with a facts section the opinion quoted",
                description:
                  "Built the SJ record on a non-compete case from the emails the client wished were shorter and the ones that were actually helpful. The court granted in part; the facts section was the part the opinion quoted. Legal argument is cheaper when the facts are already in the order you need.",
                skills: ["Legal Writing", "Legal Research", "Litigation Strategy"],
              },
              {
                name: "Rebuilt a 4,200-entry privilege log after a magistrate called the first version a novel; the redo survived",
                description:
                  "Rebuilt a 4,200-entry privilege log after a magistrate called the first version 'a novel,' which was generous. The redo used a consistent taxonomy and survived. Entries named a privilege and a subject, not a paragraph of argument, which is how a log stops being a brief in disguise.",
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
                name: "Negotiated an ESI protocol that tested search terms on a sample before they were ordered",
                description:
                  "Negotiated the first ESI protocol I owned. Search terms were tested on a sample before they were ordered; the fishing expedition died in the draft instead of in a motion. The other side still got a production. They did not get a keyword list that would have collected every all-hands email for three years.",
                skills: ["eDiscovery", "Contract Negotiation"],
              },
              {
                name: "Flagged a consumer-fraud overlay before the answer so parallel AG interest used one set of facts",
                description:
                  "Flagged a consumer-fraud overlay before the client answered a commercial complaint that looked like a contract case and smelled like a statute. Parallel AG interest was managed with one set of facts, not two stories. The answer that shipped could be handed to the AG without a second memo.",
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
                name: "Cut a 90-custodian ask to 22 with a use-case memo and dropped review spend $410k",
                description:
                  "Cut a 90-custodian ask to 22 with a use-case memo the requesting party accepted, built from who actually touched the contract and the systems that stored it. Review spend dropped $410k on that matter. The memo named roles, not org-chart proximity, which is how 90 names become 22.",
                skills: ["eDiscovery", "Litigation Strategy", "Stakeholder Management"],
              },
              {
                name: "Caught a family-break error in QC before a 400k production so the receiving party never saw it",
                description:
                  "Built the QC sample that caught a family-break error before a 400k production, the kind of error that turns a clean production into a redo and a letter. The vendor fixed it; the receiving party never saw it. The sample was drawn from families, not a random 1%.",
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
        name: "TAR protocol that funded the $27M trial record",
        description:
          "<p>How a negotiated TAR protocol funded the trial record, and how the custodian review killed a fraud count that would have been a bad exhibit. The seed set came from known-good productions, not from whoever yelled first in the protocol draft.</p>",
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
                name: "Installed a legal design review on every PHI or cross-border launch; two features were redesigned before GA",
                description:
                  "Installed a legal design review on every launch that touches PHI or cross-border processing, with product and security in the room before the ticket is done. Two features were redesigned before GA; one customer BAA fight never started because the product no longer needed the extra use. The alternative is a launch-day memo.",
                skills: ["Regulatory Counseling", "HIPAA Compliance", "Stakeholder Management"],
              },
              {
                name: "Rebuilt the DPA/BAA stack against the real data map and cut enterprise cycle time 12 days",
                description:
                  "Rebuilt the DPA/BAA stack against the actual data map, not the one sales had been reciting. Subprocessor list shrank from 31 names sales had promised to the 14 that process; enterprise cycle time dropped 12 days. Customers stopped negotiating ghosts, which is most of a DPA fight.",
                skills: ["Contract Negotiation", "Legal Writing", "GRC"],
              },
              {
                name: "Wrote the board incident paper after a vendor misconfiguration and notified OCR on the statutory clock",
                description:
                  "Wrote the incident paper that went to the board after a vendor misconfiguration, with a timeline that matched the IR ticket instead of the comms draft. OCR was notified on the statutory clock; the product story in the letter matched that timeline. The board got one narrative. The agency got the same one.",
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
                name: "Shipped CCPA notice, request flow, and vendor addendum in 11 weeks and held a 28-day request SLA",
                description:
                  "Shipped the first CCPA notice, request flow, and vendor addendum in 11 weeks, including the delete path engineering said would be 'later.' Request SLA held at 28 days for the first two quarters. Privacy and product signed the same flow, which is the only way a notice is not a decoration.",
                skills: ["Regulatory Counseling", "Legal Writing", "GRC"],
              },
              {
                name: "Moved enterprise deals onto a four-fallback playbook and cut legal cycle time from 34 days to 16",
                description:
                  "Moved enterprise deals off a 40-page customer-paper fight and onto a playbook with four fallbacks counsel could grant without a partner consult. Legal cycle time on those deals dropped from 34 days to 16. Sales got a faster yes; legal got fewer midnight redlines on points that had already been decided.",
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
                name: "Diligence on 18 hospital-system BAAs dropped three vendors whose subprocessors could not be named",
                description:
                  "Diligence on 18 BAAs for a hospital-system vendor, reading the subprocessor list instead of the security one-pager. Three vendors were dropped after their subprocessors could not be named. The hospital system kept the ones who could draw the map, which is the only HIPAA conversation that ends well.",
                skills: ["HIPAA Compliance", "Legal Research", "Contract Negotiation"],
              },
              {
                name: "Drafted the OCR chronology that closed the inquiry without a resolution agreement",
                description:
                  "Drafted the factual chronology for an OCR inquiry from the IR tickets, the notice clock, and the emails people wished were shorter. The inquiry closed without a resolution agreement; the chronology was the exhibit that mattered. Counsel did not get a second story to reconcile, which is how inquiries stay inquiries.",
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
        name: "Product legal design review for PHI launches",
        description:
          "<p>The product-counseling review Marisol installed at Lumenora: when a feature touches PHI, who is in the room, and the two launches that changed before GA. One customer BAA fight never started because the product no longer needed the extra use.</p>",
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
                name: "Closed a Class II device warning letter in 7 months without a consent decree",
                description:
                  "Led the warning-letter response for a Class II device client, matching the CAPA to the observation the investigator wrote, not the one quality wished had been written. FDA closed the letter in 7 months without a consent decree. The legal narrative and the shop-floor change had the same date.",
                skills: ["FDA Regulatory Affairs", "Legal Writing", "GRC"],
              },
              {
                name: "Locked a single clinical path at Type B after the client had briefed the board on two",
                description:
                  "Wrote the Type B package that locked a single clinical path after the client had briefed the board on two and funded the optimism. The minutes matched the ask; development did not restart. CMC and clinical sat in the same outline so the division was not asked to choose a science project.",
                skills: [
                  "FDA Regulatory Affairs",
                  "Regulatory Counseling",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Counseled a consumer-health client through an FTC CID and two AG letters from one factual chronology",
                description:
                  "Counseled a consumer-health client through an FTC CID and two state AG letters from one factual chronology, built before the second letter arrived. No second story leaked into the public file. The marketing claim that caused the CID was pulled the same week as the first response.",
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
                name: "Rebuilt advertising review after three untitled letters and delivered 24 months with zero untitled or warning letters",
                description:
                  "Rebuilt a client's advertising review after three untitled letters in 18 months, the kind of streak that means the process is decorative. The next 24 months had zero untitled or warning letters on promo. Medical, legal, and marketing signed the same claim table, which is how a review becomes a gate.",
                skills: ["FDA Regulatory Affairs", "GRC", "Policy Analysis"],
              },
              {
                name: "Drafted a 40-page comment three trade associations reused; two requested changes appeared in the final preamble",
                description:
                  "Drafted a 40-page comment that three trade associations reused instead of filing a mood. Two of the requested changes appeared in the final preamble. The comment had a docket citation and a proposed sentence, which is the only format an agency can actually adopt.",
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
                name: "Drafted 483 responses for four device inspections; two closed VAI and none became warning letters",
                description:
                  "Drafted 483 responses with quality for four device inspections, matching the CAPA to the observation instead of to the inspection-close slide. Two closed VAI; none became warning letters on my watch. The responses named the SOP revision, not the training that would have been the cheaper paragraph.",
                skills: ["FDA Regulatory Affairs", "Legal Writing", "Stakeholder Management"],
              },
              {
                name: "Turned a hidden 483 into a closing condition on a $220M deal instead of a post-closing surprise",
                description:
                  "Diligence on FDA correspondence for a $220M deal, reading the letters the data room had filed under 'quality' and the ones it had not. A hidden 483 became a closing condition instead of a post-closing surprise. The purchase agreement got a schedule; the buyer got a fact.",
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
                name: "Built the research book for two citizen petitions; one was granted in part on the prior-agency-action table",
                description:
                  "Built the research book for two citizen petitions, including the table of prior agency action that is usually the only exhibit the agency cites. One was granted in part. The other lost on a distinction the table made visible early, which is cheaper than discovering it in the denial.",
                skills: ["Legal Research", "Policy Analysis", "Legal Writing"],
              },
              {
                name: "Counseled 30-plus small firms on labeling and promo; the memo-takers had fewer repeat questions",
                description:
                  "Counseled 30-plus small firms on labeling and promo, the ones who cannot afford a standing review board and will invent one in Slack. Firms that took the memo home had fewer repeat questions; the ones who did not came back with a letter. The memo named the claim and the regulation.",
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
                name: "Kept the clinic's monthly guidance digest so fellows stopped citing withdrawn documents after the second issue",
                description:
                  "Kept the clinic's monthly guidance digest, including the withdrawn documents that fellows otherwise treat as current because they are still on a shared drive. Fellows stopped citing withdrawn documents after the second issue. Partners started forwarding the digest, which is the only adoption metric that counts.",
                skills: ["Policy Analysis", "Legal Research"],
              },
              {
                name: "Wrote intake memos naming the agency, the statute, and the first clock that partners used as file openers",
                description:
                  "Wrote intake memos that named the agency, the statute, and the first clock, instead of a fact pattern that buried the deadline in paragraph four. Partners used them as the file openers. The clock that mattered was on page one, which is how a clinic file stops missing a comment date.",
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
        name: "Class II device warning-letter closeout in seven months",
        description:
          "<p>How the Class II device warning letter closed in 7 months: CAPA that matched the legal narrative, and the meeting minutes that kept development from restarting. The shop-floor change and the letter to the agency carry the same date.</p>",
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
                name: "Filed a first-year $1.1B issuer audit on time with no PCAOB Part I findings on owned accounts",
                description:
                  "Led a first-year audit of a $1.1B revenue issuer after a firm rotation, including the accounts the prior firm had treated as known. Filed on time; PCAOB inspection produced no Part I findings on the accounts I owned. The planning memo named what we did not know yet.",
                skills: ["External Audit", "Quality Management", "Stakeholder Management"],
              },
              {
                name: "Replaced a haphazard revenue sample with journal-entry analytics; planning exceptions rose 2.4x and year-end surprises halved",
                description:
                  "Replaced a haphazard revenue sample with a journal-entry and contract-analytics approach that looked at the population before it looked at the binder. Exceptions found in planning rose 2.4x; year-end surprise adjustments fell by half. The sample that remained was smaller and meaner, which is the point of the analytics.",
                skills: ["Audit Analytics", "GAAP", "External Audit"],
              },
              {
                name: "Evaluated a late ITGC finding to a significant deficiency so the 10-K disclosure matched the AS 2201 conclusion",
                description:
                  "Evaluated a late ITGC finding through to a significant deficiency, not a hallway conversation that hoped it would stay unrated until after the 10-K. The disclosure and the AS 2201 conclusion matched. The audit committee got the rating before the printer did, which is the only order that is defensible.",
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
                name: "Led first-year ASC 606 for a multi-element software issuer; national office signed and SAB 74 disclosures held",
                description:
                  "Led the first-year ASC 606 file for a multi-element software issuer, including the performance obligations sales had been bundling by habit. National office signed the memo; the 10-K SAB 74 and adoption disclosures held through review. The memo used the contract, not the rate card, which is how 606 files survive.",
                skills: ["GAAP", "Financial Reporting", "External Audit"],
              },
              {
                name: "Rescoped a 22-location private audit so four sites carried 81% coverage and fieldwork fell to 9 weeks",
                description:
                  "Rescoped a 22-location private audit so four locations carried 81% of coverage instead of a tour that made every plant feel chosen. Fieldwork weeks dropped from 14 to 9 without a scope exception. The locations that lost a visit kept a desktop procedure, which is how you stop pretending coverage is a plane ticket.",
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
                name: "Rewrote lease walkthroughs after ASC 842 so the process narrative stopped describing a spreadsheet nobody used",
                description:
                  "Rewrote lease walkthroughs after ASC 842 so the process narrative stopped describing a spreadsheet that nobody used and a control that lived in a shared inbox. The new walkthrough named the system and the reviewer. SOX testing finally had a population that existed, which is a lower bar than it sounds.",
                skills: ["Internal Controls", "GAAP", "SOX Compliance"],
              },
              {
                name: "Closed 31 EQCR comments on a first-year file in nine days by rewriting the revenue memo",
                description:
                  "Closed 31 EQCR comments on a first-year file in nine days by rewriting the revenue memo instead of adding appendices that would have made the file heavier and the answer worse. The engagement partner could defend the memo in one sitting. EQCR stopped asking the same question in three places.",
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
                name: "Found a 2012 cutoff error that became a $4.1M adjusting entry the client had missed",
                description:
                  "Owned cash, AR, and the first revenue samples, the work that looks junior until a cutoff is wrong. A cut-off error I found in 2012 became a $4.1M adjusting entry the client had missed. The tick-and-tie was to the shipping log, not the invoice date, which is how cutoff errors hide.",
                skills: ["External Audit", "GAAP", "Financial Reporting"],
              },
              {
                name: "Redid AP control testing after watching the floor, where the three-way match existed only in the memo",
                description:
                  "Redid AP control testing after watching the process on the plant floor. The 'three-way match' existed in the memo and not in the plant; receiving used a stamp and a habit. The test that shipped described the stamp. The significant-deficiency conversation started from a fact, not a narrative.",
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
        name: "First-year $1.1B issuer audit planning file",
        description:
          "<p>Planning-through-opinion notes from the $1.1B first-year audit: the analytics redesign, the ITGC deficiency evaluation, and the inspection that stayed clean on Claire's accounts. The planning memo names what the first-year team did not know yet.</p>",
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
                name: "Took SOX in-house in year two, retired 38 unperformed key controls, and dropped testing hours 29%",
                description:
                  "Took SOX in-house in year two after a consultant inventory that had grown every control anyone was afraid to delete. Retired 38 key controls that nobody performed; testing hours dropped 29% while coverage of revenue and settlement risks increased. The surviving matrix could be walked in a day.",
                skills: ["SOX Compliance", "Internal Controls", "Stakeholder Management"],
              },
              {
                name: "Found 17 terminated IDs still active and briefed the significant-deficiency call two weeks before the auditor walkthrough",
                description:
                  "Rebuilt ITGC testing around joiner-mover-leaver analytics instead of a sample of access forms that always looked fine. Found 17 terminated IDs still active; the significant-deficiency call went to the CFO two weeks before the auditor's walkthrough. The IDs were disabled before the walkthrough. The rating was not.",
                skills: ["Audit Analytics", "GRC", "SOX Compliance"],
              },
              {
                name: "Got external-auditor reliance on 22 of 31 key business controls and cut direct-assist hours by a third",
                description:
                  "Built the reliance package the external auditor used on 22 of 31 key business controls, with reperformance evidence that did not require a guided tour. Direct-assist hours on those cycles fell by a third. The auditor still tested. They stopped re-walking processes we had already watched.",
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
                name: "Stood up first-year SOX for a $700M issuer with zero material weaknesses on the cycles scoped",
                description:
                  "Stood up a first-year SOX program for a $700M revenue issuer that had been running on tribal close procedures. Year-one material-weakness count: zero on the cycles I scoped; two IT findings were closed before the auditor's opinion date. The walkthroughs matched the current ERP, which is rarer in year one than the readiness deck claims.",
                skills: ["SOX Compliance", "GRC", "GAAP"],
              },
              {
                name: "Threw out 2014 ERP consultant narratives and deleted 14 controls that no longer matched the settlement process",
                description:
                  "Threw out consultant narratives that described a 2014 ERP and a close that no longer existed. New walkthroughs matched the current settlement process; 14 controls were deleted on the spot. Operators recognized the new narratives, which is the only validation that counts.",
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
                name: "Mapped 11 vendor SOC 1s and wrote complementary controls for four risks that were not actually covered",
                description:
                  "Mapped 11 vendor SOC 1s to user-entity controls instead of filing the reports under 'covered.' Four 'covered' risks were not covered; complementary controls were written before year-end testing. The mapping named the complementary control owner, not the vendor, which is how a SOC 1 stops being a comfort object.",
                skills: ["GRC", "External Audit", "Internal Controls"],
              },
              {
                name: "Piloted JE analytics that found a recurring manual entry with no reviewer and made it a key control",
                description:
                  "Piloted JE analytics that found a recurring manual entry with no reviewer, posted late in close by someone who also prepared it. It became a key control instead of a year-end surprise. The analytic ran on the full population, which is the only reason a lonely entry shows up.",
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
                name: "Found the reconciler and reviewer were the same person on a payments-issuer walkthrough I insisted on watching",
                description:
                  "Tested ICFR on a payments issuer and insisted on watching the walkthrough instead of accepting the narrative. The reconciler and the reviewer were the same person on Thursdays, when the backup was out. The control that shipped described that fact. The deficiency conversation started that afternoon.",
                skills: ["External Audit", "Internal Controls", "SOX Compliance"],
              },
              {
                name: "Mapped revenue controls to occurrence and cutoff after a restatement risk, leaving fewer, better samples",
                description:
                  "Mapped revenue controls to occurrence and cutoff after a restatement risk that had been treated as a disclosure problem. The next file had fewer, better samples. The map killed three controls that addressed completeness and called it occurrence, which is how restatements get a second chance.",
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
                name: "Failed two first-owned SOX samples because the evidence was a screenshot of a screenshot",
                description:
                  "Pulled and tested the first SOX samples I owned. Two controls failed because the evidence was a screenshot of a screenshot, dated after the period, from a login that was not the reviewer's. The failures were written up. The screenshots were not remediated into a pass.",
                skills: ["SOX Compliance", "Internal Controls"],
              },
              {
                name: "Owned cash and settlement testing on two files; a one-day cutoff miss became a $2.6M adjustment",
                description:
                  "Owned cash and settlement testing on two files, including the reconciling items that close teams treat as personality. A one-day cutoff miss became a $2.6M adjustment. The tie was to the settlement report, not the GL date, which is how a day disappears.",
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
        name: "In-house year-two SOX program rebuild note",
        description:
          "<p>How PrairieLine retired 38 paper controls, rebuilt ITGC around access analytics, and still increased coverage of settlement risk. The matrix that survived can be walked in a day, which is the only matrix operators will tell the truth about.</p>",
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
                name: "Moved the quarterly provision from T+18 to T+8 and dropped late ETR changes to zero",
                description:
                  "Moved the quarterly provision from T+18 to T+8 by locking the current-tax calc and deferred rollforward before the rest of close asked for another day. Two quarters of late ETR changes dropped to zero. The controller got a rate that could be briefed; tax stopped being the function that reopens earnings on Thursday.",
                skills: ["Tax Provision", "Financial Reporting", "Internal Controls"],
              },
              {
                name: "Rebuilt multi-state apportionment in Python from 40 workbooks and caught a $1.7M recycled current-tax overstatement",
                description:
                  "Rebuilt multi-state apportionment in Python from 40 workbooks that had been passing factors by copy-paste. The first quarter caught a $1.7M current-tax overstatement that the old model had recycled from a closed year. The new model had a test for that. The workbooks had a prayer.",
                skills: ["Python", "Tax Provision", "Financial Modeling"],
              },
              {
                name: "Documented a valuation-allowance release and two UTPs before earnings so the auditor sampled with no rate surprise",
                description:
                  "Documented a valuation-allowance release and two UTPs before the disclosure committee, with memos the auditor could sample without a guided tour. No year-end surprise on the rate. The release had a schedule of evidence, not a hope that next year's forecast would stay friendly.",
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
                name: "Built the first public-company provision for a newly listed manufacturer; footnote and SAB 74 language held through review",
                description:
                  "Built the first public-company provision for a newly listed manufacturer that had been closing tax like a private company with a good accountant. Footnote and SAB 74 language held through the first 10-K review. The rate walk that shipped could be read by someone who does not live in the provision file.",
                skills: ["Tax Provision", "Financial Reporting", "GAAP"],
              },
              {
                name: "Standardized RTP true-ups across 11 clients and cut average true-up from 140 bps of ETR to 35",
                description:
                  "Standardized RTP true-ups across 11 clients so the current-tax calc stopped being a black box that got 'trued up' by personality. Average true-up dropped from 140 bps of ETR to 35. Reviewers could find the return position and the provision position on the same page, which is how 140 bps becomes 35.",
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
                name: "Tied a client's deferred rollforward to the balance sheet for the first time in three years",
                description:
                  "Tied a client's deferred rollforward to the balance sheet for the first time in three years. Four accounts had been plug figures that moved when the ETR needed to. The rollforward that survived had a schedule for each account. The plugs had a funeral.",
                skills: ["GAAP", "Tax Provision", "Internal Controls"],
              },
              {
                name: "Built a provision PBC pack the auditor could sample without a tour, cutting review hours by a week",
                description:
                  "Built the first PBC pack an auditor could sample without a guided tour of folders named 'final_v7.' Review hours on that file fell by a week. The pack had the rate walk, the deferred rollforward, and the UTPs in the order the workpapers already used, which is how a tour becomes a sample.",
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
                name: "Reviewed 80-plus state returns a season; a 2014 nexus position later saved a client from a wrong-start-date assessment",
                description:
                  "Prepared and reviewed 80-plus state returns a season, including the nexus positions that look like a checkbox until an assessment arrives. A nexus position documented in 2014 later saved a client from an assessment that used the wrong start date. The memo had the facts; the assessment did not.",
                skills: ["Tax Provision", "GAAP", "Financial Modeling"],
              },
              {
                name: "Installed a workpaper index reviewers actually used so review notes dropped once people could find the apportionment",
                description:
                  "Installed a workpaper index the reviewers actually used, instead of a cover sheet that pointed to a folder named 'tax.' Review notes per return dropped after people could find the apportionment, not hunt for it. The index was short. The hunting had been the review.",
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
        name: "T+8 quarterly tax provision close note",
        description:
          "<p>How North Pier moved the quarterly provision onto the controller's calendar, plus the Python apportionment model that caught a $1.7M recycled overstatement. Late ETR changes dropped to zero once the current-tax calc locked before the rest of close.</p>",
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
                name: "Found $2.4M in duplicate and early AP payments and recovered $1.1M with a control change that stuck",
                description:
                  "Stood up monthly Python tests on the full AP population, not a sample that always looked fine. Found $2.4M in duplicate and early payments in the first two quarters; recovery hit $1.1M and the control change stuck. AP stopped treating a duplicate as a vendor personality once the test named the invoice.",
                skills: ["Audit Analytics", "Python", "Internal Controls"],
              },
              {
                name: "Pulled two plants forward after shrink analytics and issued high-rated findings the 2024 rotational plan would have missed",
                description:
                  "Replaced a rotational plant plan with a risk assessment that pulled two plants forward after analytics flagged inventory shrink the cycle-count program had been smoothing. Both audits issued high-rated findings the rotational plan would have reached in 2024. The committee got the plants that were loud in the data.",
                skills: ["Audit Analytics", "Stakeholder Management", "GAAP"],
              },
              {
                name: "Got external-auditor reliance on 18 IA-tested SOX controls so plants hosted one walkthrough cycle instead of two",
                description:
                  "Renegotiated IA's SOX direct assist so the external auditor relied on 18 IA-tested controls, with reperformance they did not have to invent on site. Plants hosted one walkthrough cycle instead of two. Operators stopped telling the story twice, which is how walkthroughs start matching the floor.",
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
                name: "Caught a recurring unreviewed manual JE that became a SOX key control the next year",
                description:
                  "Built monthly JE analytics for a 30-entity close and caught a recurring manual entry with no reviewer, posted by the same preparer late in the cycle. It became a SOX key control the next year. The analytic ran on the full population, which is the only reason a lonely entry has a chance.",
                skills: ["Audit Analytics", "Python", "SOX Compliance"],
              },
              {
                name: "Replaced a 25-item T&E sample with a full-population test that found 8x the policy-break dollars",
                description:
                  "Replaced a 25-item T&E sample with a full-population test that did not care how tidy the sample folder looked. Policy-break dollars were 8x the sample estimate; the policy, not the sample size, changed. Finance stopped arguing about sample size once the dollars had a vendor name.",
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
                name: "Wrote a production AP script whose duplicate-invoice logic found hits the vendor dashboard had been filtering out",
                description:
                  "Wrote the first production AP script I owned. Duplicate-invoice logic was ugly and correct; the vendor dashboard it replaced had been filtering out the hits as 'possible matches' nobody opened. The script's first month paid for the time it took to write. The dashboard kept the charts.",
                skills: ["Python", "Audit Analytics"],
              },
              {
                name: "Used cycle-count and shipment data to pick two plants whose shrink the cycle-count program had been smoothing",
                description:
                  "Used cycle-count and shipment data to pick two plants for inventory audits instead of the ones that were next on the rotation. Both had shrink the cycle-count program had been smoothing by recounting the friendly bins. The findings had a quantity; the cycle-count program had a green dashboard.",
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
                name: "Found a wall of finished goods missing from the listing that became a $3.2M inventory adjustment",
                description:
                  "Ran inventory observations at four plants and walked the floor instead of the listing. A wall of finished goods that was not on the listing became a $3.2M adjustment. The observation that mattered was the wall, not the count sheet the client had pre-reconciled.",
                skills: ["External Audit", "GAAP", "Internal Controls"],
              },
              {
                name: "Tried to rely on IA work that had no reperformance and learned what reliance actually requires",
                description:
                  "Tried to rely on IA work that had no reperformance, a tidy memo, and a sample that could not be re-pulled. The file taught me what reliance actually requires. The next attempt started with the reperformance, not the memo, which is the only order that survives a reviewer.",
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
                name: "Owned cash and AP on two CPG files; a vendor-rebate cutoff miss became the first real adjusting entry",
                description:
                  "Owned cash and AP on two CPG files, including the vendor rebates that close teams treat as a timing story. A cutoff miss on a vendor rebate became my first real adjusting entry. The tie was to the credit memo date, not the GL hope, which is how rebates hide a period.",
                skills: ["External Audit", "GAAP"],
              },
              {
                name: "Found the matcher and approver shared a Thursday login after watching the three-way match on the floor",
                description:
                  "Tested AP controls after watching the three-way match, not the narrative that described a segregation nobody could demonstrate. The matcher and the approver shared a login on Thursdays. The test that shipped said so. The deficiency was dated that Thursday, which is more precise than most control reports.",
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
        name: "P2P continuous audit on the full AP population",
        description:
          "<p>The monthly AP tests that found $2.4M in duplicate and early payments, the $1.1M recovered, and the control change that lasted past the finding. The test names the invoice, which is how a duplicate stops being treated as a vendor personality.</p>",
        skills: ["Audit Analytics", "Python", "Internal Controls"],
      },
      {
        name: "Risk-based plant audit plan driven by inventory analytics",
        description:
          "<p>How inventory analytics pulled two plants forward and produced high-rated findings the old rotational plan would have missed for years. The cycle-count program had been smoothing shrink by recounting the friendly bins; the plan stopped waiting for 2024.</p>",
        skills: ["Audit Analytics", "Stakeholder Management", "GAAP"],
      },
    ],
  }),
];
