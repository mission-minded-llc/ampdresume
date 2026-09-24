import { defineProfile } from "../buildProfile";

export const infrastructureProfiles = [
  defineProfile({
    gender: "woman",
    vertical: "insurance",
    name: "Bridget Callahan",
    title: "Senior Underwriter",
    location: "Hartford, CT",
    siteDescription:
      "Commercial property underwriter in Hartford who prices habitational, habitational-adjacent, and mid-market industrial schedules against CAT, construction, and occupancy risk.",
    summary:
      "<p>Senior commercial property underwriter with a Hartford book of mid-market schedules, habitational towers, and light industrial risks. I bind accounts when COPE data, CAT output, and terms actually line up — not when a broker just needs a quote by Friday.</p><p>At Harborline Mutual I own a $420M TIV book with a 91% hit ratio on referred submissions and a combined ratio 6 points inside plan. Earlier specialty work taught me when to walk away from a coastal frame schedule that looks cheap until the hurricane model runs.</p>",
    socials: [
      { platform: "linkedin.com", ref: "bridget-callahan" },
      { platform: "website", ref: "https://bridgetcallahan.example.com" },
      { platform: "medium.com", ref: "bridget-callahan" },
    ],
    skills: [
      {
        name: "Underwriting",
        description:
          "Bind mid-market commercial property on COPE, protection class, and occupancy — not just last year's loss run.",
        yearStarted: 2014,
      },
      {
        name: "Financial Underwriting",
        description:
          "Read statements and rent rolls before I price a schedule so vacancy and deferred maintenance show up in the rate, not the claim.",
        yearStarted: 2016,
      },
      {
        name: "Risk Rating",
        description:
          "Layer ISO loss costs, company deviations, and CAT loads so a Hartford habitational tower is not priced like inland warehouse.",
        yearStarted: 2014,
      },
      {
        name: "Loss Modeling",
        description:
          "Use vendor CAT output and internal PML views to set deductibles and sublimits on coastal and convective schedules.",
        yearStarted: 2017,
      },
      {
        name: "Policy Administration",
        description:
          "Keep endorsements, location schedules, and inspection follow-ups current so the binder matches what we actually cover.",
        yearStarted: 2014,
      },
      {
        name: "Market Analysis",
        description:
          "Track surplus-lines appetite and admitted-market tightening so referrals go to a market that will still be there at renewal.",
        yearStarted: 2018,
      },
      {
        name: "Stakeholder Management",
        description:
          "Work brokers, loss control, and claims on the same file so a bind is not a surprise to the people who have to service it.",
        yearStarted: 2015,
      },
      {
        name: "Contract Negotiation",
        description:
          "Hold manuscript wording on vacancy, protective safeguards, and ordinance or law instead of accepting a broker's first draft.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Harborline Mutual",
        description:
          "Admitted commercial property writer focused on Northeast mid-market schedules, habitational, and light industrial.",
        location: "Hartford, CT",
        startDate: "2021-03-01",
        positions: [
          {
            title: "Senior Underwriter",
            startDate: "2021-03-01",
            projects: [
              {
                name: "Hartford habitational schedule rebuild",
                description:
                  "Re-underwrote 86 garden and mid-rise accounts totaling $180M TIV after a convective year. Raised deductibles on 31 locations and non-renewed 9 frame schedules; book combined ratio improved 8 points at the following renewal.",
                skills: ["Underwriting", "Loss Modeling", "Risk Rating"],
              },
              {
                name: "Broker referral desk",
                description:
                  "Cut average quote turnaround from 9 days to 4 on referred submissions by standardizing COPE checklists and inspection triggers. Hit ratio on mid-market new business rose from 74% to 91%.",
                skills: ["Policy Administration", "Stakeholder Management", "Market Analysis"],
              },
              {
                name: "Manuscript vacancy wording",
                description:
                  "Negotiated protective-safeguard and vacancy clauses on 14 industrial files so sprinkler impairment and 60-day vacancy no longer sat in silent coverage.",
                skills: ["Contract Negotiation", "Financial Underwriting"],
              },
            ],
          },
        ],
      },
      {
        name: "Northbridge Specialty",
        description:
          "E&S property shop writing coastal and inland CAT-exposed commercial schedules for regional brokers.",
        location: "Hartford, CT",
        startDate: "2016-06-01",
        endDate: "2021-02-12",
        positions: [
          {
            title: "Property Underwriter",
            startDate: "2018-04-01",
            endDate: "2021-02-12",
            projects: [
              {
                name: "Coastal frame non-renewal program",
                description:
                  "Pulled 22 coastal frame locations off the book after a PML review showed $41M of limit sitting inside a 100-year wind contour. Replaced $12M of that capacity with inland masonry that stayed inside appetite.",
                skills: ["Loss Modeling", "Underwriting", "Risk Rating"],
              },
              {
                name: "Surplus-lines appetite map",
                description:
                  "Published a quarterly admitted-vs-E&S appetite note for 40 Northeast brokers so habitational and warehouse submissions stopped arriving in the wrong market.",
                skills: ["Market Analysis", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Associate Underwriter",
            startDate: "2016-06-01",
            endDate: "2018-03-31",
            projects: [
              {
                name: "Location schedule cleanup",
                description:
                  "Reconciled 310 locations across 48 policies where TIV, construction, and year built disagreed with the inspection file. Corrected $27M of mis-coded TIV before renewal.",
                skills: ["Policy Administration", "Underwriting"],
              },
              {
                name: "First-year loss-cost calibration",
                description:
                  "Compared ISO loss costs to three years of company experience on warehouse occupancy and recommended a 6-point deviation that pricing later adopted.",
                skills: ["Risk Rating", "Financial Underwriting"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Connecticut",
        degree: "B.S. Finance",
        dateAwarded: "2014-05-11",
      },
    ],
    certifications: [
      {
        name: "Chartered Property Casualty Underwriter (CPCU)",
        issuer: "The Institutes",
        dateAwarded: "2019-11-08",
        credentialId: "CPCU-BC-44192",
      },
      {
        name: "Associate in Commercial Underwriting (AU)",
        issuer: "The Institutes",
        dateAwarded: "2017-06-15",
        credentialId: "AU-BC-22811",
      },
    ],
    featuredProjects: [
      {
        name: "COPE-to-bind playbook",
        description:
          "<p>A public write-up of how Harborline Mutual turns a broker submission into a bind: required COPE fields, CAT triggers, and the vacancy clauses that keep a mid-market property file from leaking at claim time.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/harborline-cope-playbook" },
          { label: "Appetite note", url: "https://www.example.com/harborline-appetite" },
        ],
        skills: ["Underwriting", "Policy Administration", "Loss Modeling"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "insurance",
    name: "Kenji Mori",
    title: "Pricing Actuary",
    location: "New York, NY",
    siteDescription:
      "Personal auto pricing actuary in New York who builds GLMs, monitors rate adequacy, and files indications that survive a department hearing.",
    summary:
      "<p>Pricing actuary for personal auto in New York. I own the indication, the GLM that sits under it, and the filing narrative when a department asks why a territory factor moved.</p><p>At Keystone Auto Mutual I cut indicated vs. booked rate inadequacy from 9.4% to 2.1% across a 1.2M vehicle book. Earlier rating work taught me that a clever telematics factor is worthless if the residual market load is wrong.</p>",
    socials: [
      { platform: "linkedin.com", ref: "kenji-mori" },
      { platform: "github.com", ref: "kenjimori" },
      { platform: "website", ref: "https://kenjimori.example.com" },
    ],
    skills: [
      {
        name: "Actuarial Pricing",
        description:
          "Produce personal auto indications and rating-plan changes that a New York filing unit can defend.",
        yearStarted: 2015,
      },
      {
        name: "Loss Modeling",
        description:
          "Fit frequency and severity models on bodily injury, PIP, and collision so one weather year does not rewrite the whole plan.",
        yearStarted: 2016,
      },
      {
        name: "Python",
        description:
          "Build GLM pipelines, residual diagnostics, and filing exhibits in Python instead of a one-off spreadsheet.",
        yearStarted: 2016,
      },
      {
        name: "Financial Modeling",
        description:
          "Translate indicated rate need into premium, loss ratio, and surplus views the CFO will actually sign.",
        yearStarted: 2017,
      },
      {
        name: "Risk Rating",
        description:
          "Keep territory, class, and credit-based factors inside regulatory bounds while still separating risk.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "Benchmark competitor filings and residual-market share before recommending a double-digit rate take.",
        yearStarted: 2018,
      },
      {
        name: "Policy Administration",
        description:
          "Map rating variables to policy-admin fields so a new factor is not dropped on the first endorsement.",
        yearStarted: 2017,
      },
      {
        name: "Audit Analytics",
        description:
          "Reconcile earned premium and accident-year triangles before an indication leaves the desk.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Keystone Auto Mutual",
        description:
          "Regional personal auto writer with a 1.2M vehicle book concentrated in New York, New Jersey, and Pennsylvania.",
        location: "New York, NY",
        startDate: "2020-08-17",
        positions: [
          {
            title: "Pricing Actuary",
            startDate: "2020-08-17",
            projects: [
              {
                name: "New York personal auto indication",
                description:
                  "Rebuilt the NY indication on a 12-quarter triangle and a GLM with 18 rating variables. Closed a 9.4% rate inadequacy to 2.1% over two filing cycles without a hearing rejection.",
                skills: ["Actuarial Pricing", "Loss Modeling", "Financial Modeling"],
              },
              {
                name: "Telematics factor integration",
                description:
                  "Added a usage-based score to the rating algorithm for 210k enrolled vehicles. Lift on collision frequency was 11% in the holdout; residual-market leakage stayed under 40 bps.",
                skills: ["Python", "Risk Rating", "Policy Administration"],
              },
              {
                name: "Competitor filing watch",
                description:
                  "Tracked 14 competitor NY filings and residual-market share so the 2023 take was sized against the market, not just the triangle.",
                skills: ["Market Analysis", "Audit Analytics"],
              },
            ],
          },
        ],
      },
      {
        name: "Hudson Rating Bureau",
        description:
          "Advisory organization producing personal-lines loss costs and rating research for Northeast member companies.",
        location: "New York, NY",
        startDate: "2015-07-06",
        endDate: "2020-08-07",
        positions: [
          {
            title: "Associate Actuary",
            startDate: "2018-01-08",
            endDate: "2020-08-07",
            projects: [
              {
                name: "PIP severity study",
                description:
                  "Re-fit PIP severity after a statute change moved average paid severity 18%. Published a member circular that 9 companies used in their next indication.",
                skills: ["Loss Modeling", "Actuarial Pricing"],
              },
              {
                name: "Territory definition refresh",
                description:
                  "Collapsed 140 NY territories into 96 statistically credible cells and documented the credibility standard for the next loss-cost filing.",
                skills: ["Risk Rating", "Python", "Audit Analytics"],
              },
            ],
          },
          {
            title: "Actuarial Analyst",
            startDate: "2015-07-06",
            endDate: "2017-12-29",
            projects: [
              {
                name: "Accident-year triangle rebuild",
                description:
                  "Reconstructed collision and BI triangles from raw claims extracts after a system conversion dropped 3% of earned car-years.",
                skills: ["Audit Analytics", "Policy Administration"],
              },
              {
                name: "First GLM notebook",
                description:
                  "Moved a collision frequency model off a desktop GLM package into a reviewed Python notebook with residual plots and lift charts.",
                skills: ["Python", "Loss Modeling"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Columbia University",
        degree: "M.S. Actuarial Science",
        dateAwarded: "2015-05-20",
      },
      {
        school: "New York University",
        degree: "B.A. Mathematics",
        dateAwarded: "2013-05-15",
      },
    ],
    certifications: [
      {
        name: "Associate of the Casualty Actuarial Society (ACAS)",
        issuer: "Casualty Actuarial Society",
        dateAwarded: "2019-05-14",
        credentialId: "ACAS-KM-31820",
      },
      {
        name: "Certified Specialist in Predictive Analytics (CSPA)",
        issuer: "Casualty Actuarial Society",
        dateAwarded: "2021-10-02",
        credentialId: "CSPA-KM-77401",
      },
    ],
    featuredProjects: [
      {
        name: "NY auto indication notebook",
        description:
          "<p>An open walkthrough of a New York personal auto indication: triangle construction, GLM diagnostics, and the filing exhibits a department actuary actually reads.</p>",
        links: [
          { label: "Notebook", url: "https://www.example.com/keystone-ny-indication" },
          { label: "Filing exhibits", url: "https://www.example.com/keystone-ny-exhibits" },
        ],
        skills: ["Actuarial Pricing", "Python", "Loss Modeling"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "insurance",
    name: "Tessa Morin",
    title: "Claims Director",
    location: "Chicago, IL",
    siteDescription:
      "Complex-claims director in Chicago who runs large-loss property and casualty files from first notice through litigation and recovery.",
    summary:
      "<p>Claims director for complex commercial files in Chicago. I run large-loss property, extra-expense, and contested liability from first notice through settlement, and I do not let a coverage question sit in email for three weeks.</p><p>At Lakeshore Casualty I cut average cycle time on $1M+ files from 14 months to 9 and recovered $18M in subrogation over three years. Earlier field work taught me that a well-run site inspection beats a late reservation of rights.</p>",
    socials: [
      { platform: "linkedin.com", ref: "tessa-morin" },
      { platform: "medium.com", ref: "tessa-morin" },
      { platform: "website", ref: "https://tessamorin.example.com" },
    ],
    skills: [
      {
        name: "Claims Management",
        description:
          "Run complex commercial claims from FNOL through settlement, including large-loss property and contested casualty.",
        yearStarted: 2012,
      },
      {
        name: "Loss Modeling",
        description:
          "Build reserve views on extra-expense, business interruption, and liability severity so the file is not surprises at quarter end.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep insureds, brokers, counsel, and reinsurers on one timeline when a file turns into a room full of experts.",
        yearStarted: 2013,
      },
      {
        name: "Contract Negotiation",
        description:
          "Settle coverage and quantum with opposing counsel and public adjusters without giving away the policy's actual limits.",
        yearStarted: 2016,
      },
      {
        name: "Policy Administration",
        description:
          "Read the form, the endorsements, and the location schedule before I write a coverage letter.",
        yearStarted: 2012,
      },
      {
        name: "Risk Rating",
        description:
          "Feed claims outcomes back to underwriting so a repeat occupancy does not keep the same rate after three water losses.",
        yearStarted: 2018,
      },
      {
        name: "Change Management",
        description:
          "Move a field office onto a new claims system and a large-loss playbook without losing the files in flight.",
        yearStarted: 2019,
      },
      {
        name: "Relationship Management",
        description:
          "Hold the broker and risk-manager relationship on accounts that generate more than one large loss a year.",
        yearStarted: 2014,
      },
    ],
    companies: [
      {
        name: "Lakeshore Casualty",
        description:
          "Midwest commercial carrier with a Chicago large-loss unit handling property, extra-expense, and contested casualty.",
        location: "Chicago, IL",
        startDate: "2020-02-03",
        positions: [
          {
            title: "Claims Director",
            startDate: "2022-01-10",
            projects: [
              {
                name: "Large-loss cycle-time program",
                description:
                  "Reset the $1M+ playbook across 11 adjusters: site inspection in 72 hours, coverage letter in 10 days, reserve review at day 30. Average cycle time fell from 14 months to 9 on 64 files.",
                skills: ["Claims Management", "Change Management", "Stakeholder Management"],
              },
              {
                name: "Subrogation recovery desk",
                description:
                  "Stood up a dedicated recovery review on fire and water files. Closed $18M in subrogation over three years, $6.2M of it in the first full year.",
                skills: ["Contract Negotiation", "Claims Management", "Policy Administration"],
              },
            ],
          },
          {
            title: "Complex Claims Manager",
            startDate: "2020-02-03",
            endDate: "2022-01-09",
            projects: [
              {
                name: "Warehouse fire extra-expense file",
                description:
                  "Led a $14M fire and extra-expense claim on a food-distribution warehouse. Settled quantum in 11 months with a 22% reduction from the public adjuster's first demand.",
                skills: ["Loss Modeling", "Contract Negotiation", "Relationship Management"],
              },
              {
                name: "Underwriting feedback loop",
                description:
                  "Sent quarterly occupancy loss notes to underwriting on restaurants and cold storage. Three account families were re-rated; two were non-renewed.",
                skills: ["Risk Rating", "Policy Administration"],
              },
            ],
          },
        ],
      },
      {
        name: "Prairie Field Adjusters",
        description:
          "Independent adjusting firm handling commercial property and casualty assignments across Illinois and Indiana.",
        location: "Chicago, IL",
        startDate: "2012-08-01",
        endDate: "2020-01-24",
        positions: [
          {
            title: "Senior Field Adjuster",
            startDate: "2016-03-01",
            endDate: "2020-01-24",
            projects: [
              {
                name: "Midwest hail CAT deployment",
                description:
                  "Ran a 9-adjuster CAT team after a 2018 hail event. Closed 410 commercial roofs in 11 weeks with a 4% reopened-file rate.",
                skills: ["Claims Management", "Stakeholder Management"],
              },
              {
                name: "Coverage investigation unit",
                description:
                  "Built a late-notice and vacancy investigation checklist that carriers adopted on 70 habitational assignments.",
                skills: ["Policy Administration", "Claims Management"],
              },
            ],
          },
          {
            title: "Staff Adjuster",
            startDate: "2012-08-01",
            endDate: "2016-02-28",
            projects: [
              {
                name: "First-party water loss desk",
                description:
                  "Handled 180+ water and freeze files a year for three regional carriers, with average cycle time under 45 days on non-litigated claims.",
                skills: ["Claims Management", "Relationship Management"],
              },
              {
                name: "Reserve accuracy review",
                description:
                  "Compared initial reserves to close on 90 casualty files and cut average reserve miss from 31% to 14%.",
                skills: ["Loss Modeling", "Risk Rating"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Illinois Chicago",
        degree: "B.A. Risk Management and Insurance",
        dateAwarded: "2012-05-06",
      },
    ],
    certifications: [
      {
        name: "Associate in Claims (AIC)",
        issuer: "The Institutes",
        dateAwarded: "2016-09-22",
        credentialId: "AIC-TM-55018",
      },
      {
        name: "Chartered Property Casualty Underwriter (CPCU)",
        issuer: "The Institutes",
        dateAwarded: "2021-04-16",
        credentialId: "CPCU-TM-66203",
      },
    ],
    featuredProjects: [
      {
        name: "Large-loss playbook",
        description:
          "<p>The Lakeshore Casualty large-loss playbook: inspection clocks, coverage-letter standards, reserve gates, and the subrogation triggers that recovered $18M on fire and water files.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/lakeshore-large-loss" },
          { label: "Recovery notes", url: "https://www.example.com/lakeshore-subrogation" },
        ],
        skills: ["Claims Management", "Change Management", "Contract Negotiation"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "insurance",
    name: "Rafael Soto",
    title: "Reinsurance Broker",
    location: "Stamford, CT",
    siteDescription:
      "Treaty and facultative reinsurance broker in Stamford who places property and casualty programs for mid-size insurers and captives.",
    summary:
      "<p>Reinsurance broker in Stamford placing treaty and facultative property and casualty for regional insurers and captives. I build the submission, run the market, and hold the slip when a January 1 renewal is still short two days before inception.</p><p>At Atlantic Treaty Partners I placed $1.1B of treaty limit across 18 buyers last year, with 94% of programs bound before inception. Facultative work on peak CAT zones taught me that a pretty model will not save a late underwriting file.</p>",
    socials: [
      { platform: "linkedin.com", ref: "rafael-soto" },
      { platform: "website", ref: "https://rafaelsoto.example.com" },
      { platform: "medium.com", ref: "rafael-soto" },
    ],
    skills: [
      {
        name: "Reinsurance",
        description:
          "Place treaty and facultative property and casualty, from quota share through excess of loss and per-risk facultative.",
        yearStarted: 2013,
      },
      {
        name: "Underwriting",
        description:
          "Read a cedent's book the way a reinsurer will: occupancy mix, CAT PML, and the claims that never made the bordereau.",
        yearStarted: 2014,
      },
      {
        name: "Loss Modeling",
        description:
          "Translate vendor CAT and experience rating into a structure a London or Bermuda underwriter will actually quote.",
        yearStarted: 2015,
      },
      {
        name: "Contract Negotiation",
        description:
          "Hold hours clauses, hours-and-hours, sunset, and follow-the-fortunes language instead of accepting a market's first slip.",
        yearStarted: 2016,
      },
      {
        name: "Relationship Management",
        description:
          "Keep cedent CROs and reinsurer underwriters in the same conversation when a mid-year loss hits the program.",
        yearStarted: 2013,
      },
      {
        name: "Market Analysis",
        description:
          "Know which panels still have capacity for Northeast property vs. which ones are already full by October.",
        yearStarted: 2014,
      },
      {
        name: "Risk Rating",
        description:
          "Price a facultative layer against the cedent's original rate and the reinsurer's view of PML, not a guess.",
        yearStarted: 2015,
      },
      {
        name: "Financial Modeling",
        description:
          "Show a buyer the cost of extra limit vs. a higher attachment so the board can pick a structure on purpose.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Atlantic Treaty Partners",
        description:
          "Independent reinsurance intermediary placing treaty and facultative for regional carriers and captives from Stamford.",
        location: "Stamford, CT",
        startDate: "2021-01-11",
        positions: [
          {
            title: "Reinsurance Broker",
            startDate: "2021-01-11",
            projects: [
              {
                name: "January 1 property treaty panel",
                description:
                  "Led placement of 11 property catastrophe treaties totaling $740M of limit. Bound 10 of 11 before inception; the last closed with a 4-point rate-on-line increase instead of a capacity shortfall.",
                skills: ["Reinsurance", "Market Analysis", "Contract Negotiation"],
              },
              {
                name: "Captive per-risk facultative desk",
                description:
                  "Built a facultative desk for three captives writing large habitational and industrial schedules. Placed $180M of per-risk limit across 26 slips with average turnaround under 8 days.",
                skills: ["Underwriting", "Risk Rating", "Relationship Management"],
              },
              {
                name: "Structure alternatives for a mutual",
                description:
                  "Modeled a higher attachment vs. extra limit for a $2.1B TIV mutual. The board bought $50M more limit at a 90 bps cheaper rate-on-line than the incumbent structure.",
                skills: ["Financial Modeling", "Loss Modeling"],
              },
            ],
          },
        ],
      },
      {
        name: "Soundview Re Intermediaries",
        description:
          "Boutique Stamford broker focused on facultative property and small treaty programs for New England writers.",
        location: "Stamford, CT",
        startDate: "2016-04-04",
        endDate: "2020-12-18",
        positions: [
          {
            title: "Facultative Broker",
            startDate: "2016-04-04",
            endDate: "2020-12-18",
            projects: [
              {
                name: "Coastal facultative panel",
                description:
                  "Placed 90+ facultative slips a year on coastal commercial property, with 88% bound inside the cedent's requested terms after a 2017 market hardening.",
                skills: ["Reinsurance", "Underwriting", "Market Analysis"],
              },
              {
                name: "Hours-clause rewrite",
                description:
                  "Renegotiated hours and occurrence language on 7 programs after a multi-day wind event stacked two events into one. Saved an estimated $9M of disputed recovery.",
                skills: ["Contract Negotiation", "Loss Modeling"],
              },
            ],
          },
        ],
      },
      {
        name: "East River Treaty Desk",
        description:
          "In-house ceded reinsurance unit for a New York regional insurer, supporting property and casualty treaty renewals.",
        location: "New York, NY",
        startDate: "2013-06-03",
        endDate: "2016-03-25",
        positions: [
          {
            title: "Ceded Reinsurance Analyst",
            startDate: "2013-06-03",
            endDate: "2016-03-25",
            projects: [
              {
                name: "Treaty submission rebuild",
                description:
                  "Rebuilt the annual property treaty submission with exposure, PML, and claims exhibits that cut market questions by half at the next renewal.",
                skills: ["Reinsurance", "Financial Modeling", "Relationship Management"],
              },
              {
                name: "Bordereau quality review",
                description:
                  "Reconciled ceded premium and loss bordereaux that had been 3% short on subject premium for two years.",
                skills: ["Risk Rating", "Underwriting"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Pennsylvania",
        degree: "B.S. Economics",
        dateAwarded: "2013-05-13",
      },
    ],
    certifications: [
      {
        name: "Associate in Reinsurance (ARe)",
        issuer: "The Institutes",
        dateAwarded: "2017-08-11",
        credentialId: "ARE-RS-40912",
      },
      {
        name: "Chartered Property Casualty Underwriter (CPCU)",
        issuer: "The Institutes",
        dateAwarded: "2020-03-27",
        credentialId: "CPCU-RS-51844",
      },
    ],
    featuredProjects: [
      {
        name: "Treaty placement brief",
        description:
          "<p>A public brief on how Atlantic Treaty Partners builds a January 1 property panel: submission exhibits, market sequencing, and the contract clauses that decide whether a wind event is one occurrence or two.</p>",
        links: [
          { label: "Placement brief", url: "https://www.example.com/atlantic-treaty-brief" },
          { label: "Structure note", url: "https://www.example.com/atlantic-structure-note" },
        ],
        skills: ["Reinsurance", "Contract Negotiation", "Market Analysis"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "cybersecurity",
    name: "Nadia El-Sayed",
    title: "Detection Engineer",
    location: "Arlington, VA",
    siteDescription:
      "Detection engineer in Arlington who writes SIEM analytics, tunes detections against ATT&CK, and hunts what the rules missed.",
    summary:
      "<p>Detection engineer in Arlington building SIEM analytics and hunt hypotheses for a federal-adjacent SOC. I write the rule, measure the false-positive rate, and retire the ones that only fire on Friday deploys.</p><p>At Sentinel Harbor I shipped 140 detections with a median time-to-detect of 9 minutes on high-severity tags and cut alert volume 38% without losing confirmed incidents. Earlier SOC work taught me that a pretty dashboard is not a detection program.</p>",
    socials: [
      { platform: "linkedin.com", ref: "nadia-elsayed" },
      { platform: "github.com", ref: "nadia-elsayed" },
      { platform: "website", ref: "https://nadiaelsayed.example.com" },
    ],
    skills: [
      {
        name: "Detection Engineering",
        description:
          "Write, test, and retire SIEM detections against ATT&CK so the SOC is not drowning in Friday-deploy noise.",
        yearStarted: 2017,
      },
      {
        name: "SIEM",
        description:
          "Own content, parsers, and use-case health in a multi-tenant SIEM feeding a 24x7 SOC.",
        yearStarted: 2016,
      },
      {
        name: "Threat Hunting",
        description:
          "Run hypothesis-driven hunts on identity, endpoint, and cloud telemetry when the rules have already missed it.",
        yearStarted: 2018,
      },
      {
        name: "Python",
        description:
          "Automate content tests, enrichment, and hunt notebooks instead of clicking the same query every Monday.",
        yearStarted: 2017,
      },
      {
        name: "Observability",
        description:
          "Measure detection coverage, time-to-detect, and data gaps the same way an SRE measures a service.",
        yearStarted: 2019,
      },
      {
        name: "Incident Response",
        description:
          "Hand a confirmed detection to IR with the artifacts already pulled, not a screenshot of a red bar.",
        yearStarted: 2016,
      },
      {
        name: "Cloud Security",
        description:
          "Detect IAM abuse, public buckets, and control-plane anomalies in AWS accounts the SOC actually monitors.",
        yearStarted: 2019,
      },
      {
        name: "Kubernetes",
        description:
          "Parse audit logs and runtime signals so a privileged pod is not invisible until it phones home.",
        yearStarted: 2020,
      },
    ],
    companies: [
      {
        name: "Sentinel Harbor",
        description:
          "Managed detection shop serving federal-adjacent and critical-infrastructure customers from Arlington.",
        location: "Arlington, VA",
        startDate: "2021-05-03",
        positions: [
          {
            title: "Detection Engineer",
            startDate: "2021-05-03",
            projects: [
              {
                name: "ATT&CK coverage map",
                description:
                  "Mapped 140 shipped detections to ATT&CK techniques and closed 22 high-priority gaps in credential access and defense evasion. Median time-to-detect on high-severity tags fell from 27 minutes to 9.",
                skills: ["Detection Engineering", "SIEM", "Observability"],
              },
              {
                name: "Cloud control-plane hunt pack",
                description:
                  "Wrote Python hunt notebooks and SIEM content for IAM key creation, role assumption, and public S3 changes across 46 AWS accounts. Caught 3 confirmed incidents the existing rules missed.",
                skills: ["Threat Hunting", "Cloud Security", "Python"],
              },
              {
                name: "Kubernetes audit detections",
                description:
                  "Added audit-log detections for privileged pods, hostPath mounts, and exec into kube-system. False-positive rate on the first 60 days was 6% after two tuning passes.",
                skills: ["Kubernetes", "Detection Engineering", "Incident Response"],
              },
            ],
          },
        ],
      },
      {
        name: "Potomac SOC Collective",
        description:
          "Shared SOC serving three mid-size contractors with a common SIEM and a small detection bench.",
        location: "Arlington, VA",
        startDate: "2016-09-12",
        endDate: "2021-04-23",
        positions: [
          {
            title: "SOC Analyst II",
            startDate: "2018-07-02",
            endDate: "2021-04-23",
            projects: [
              {
                name: "Alert-volume cutover",
                description:
                  "Tuned the noisiest 40 use cases and retired 11 that never produced a true positive. Alert volume dropped 38% while confirmed incidents held flat.",
                skills: ["SIEM", "Detection Engineering", "Observability"],
              },
              {
                name: "Identity hunt series",
                description:
                  "Ran a quarterly hunt on impossible travel and consent-grant phishing. Produced 7 confirmed account takeovers that ticket queues had labeled low.",
                skills: ["Threat Hunting", "Incident Response"],
              },
            ],
          },
          {
            title: "SOC Analyst I",
            startDate: "2016-09-12",
            endDate: "2018-06-29",
            projects: [
              {
                name: "Parser and CIM cleanup",
                description:
                  "Fixed Windows and firewall parsers that had been dropping 12% of events, restoring the fields detections actually needed.",
                skills: ["SIEM", "Python"],
              },
              {
                name: "Tier-1 playbook rewrite",
                description:
                  "Rewrote phishing and malware playbooks so a new analyst could escalate with artifacts instead of a ticket that said 'looks bad.'",
                skills: ["Incident Response", "Detection Engineering"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "George Mason University",
        degree: "B.S. Computer Science",
        dateAwarded: "2016-05-14",
      },
    ],
    certifications: [
      {
        name: "GIAC Certified Intrusion Analyst (GCIA)",
        issuer: "GIAC",
        dateAwarded: "2019-03-19",
        credentialId: "GCIA-NES-88421",
      },
      {
        name: "GIAC Detect and Response (GDAT)",
        issuer: "GIAC",
        dateAwarded: "2022-06-08",
        credentialId: "GDAT-NES-10277",
      },
    ],
    featuredProjects: [
      {
        name: "Detection quality scorecard",
        description:
          "<p>How Sentinel Harbor scores a detection before it ships: ATT&CK coverage, false-positive budget, data-source health, and the IR handoff packet the SOC actually uses.</p>",
        links: [
          { label: "Scorecard", url: "https://www.example.com/sentinel-detection-scorecard" },
          { label: "Hunt pack", url: "https://www.example.com/sentinel-cloud-hunts" },
        ],
        skills: ["Detection Engineering", "SIEM", "Observability"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "cybersecurity",
    name: "Chris Langford",
    title: "Incident Response Lead",
    location: "Austin, TX",
    siteDescription:
      "Incident response lead in Austin who runs enterprise IR, forensics, and tabletop programs when a detection becomes a war room.",
    summary:
      "<p>Incident response lead in Austin. I take a confirmed intrusion from first pager to containment, forensics, and the board brief — and I keep the war room from becoming a status-meeting factory.</p><p>At Redline Forensics I led 28 major incidents in three years, including a ransomware event contained in 11 hours with no domain-wide encryption. Earlier MSSP nights taught me that a memory image collected late is just a story you tell later.</p>",
    socials: [
      { platform: "linkedin.com", ref: "chris-langford" },
      { platform: "github.com", ref: "clangford" },
      { platform: "medium.com", ref: "chris-langford" },
    ],
    skills: [
      {
        name: "Incident Response",
        description:
          "Lead enterprise IR from first pager through containment, eradication, and the after-action that actually changes controls.",
        yearStarted: 2014,
      },
      {
        name: "Threat Hunting",
        description:
          "Hunt residual access after containment so a cleaned laptop is not the only thing we fixed.",
        yearStarted: 2016,
      },
      {
        name: "SIEM",
        description:
          "Pull the timeline from the SIEM and the EDR, not from whoever talked loudest on the bridge.",
        yearStarted: 2014,
      },
      {
        name: "Cloud Security",
        description:
          "Contain IAM, SSO, and workload compromise in AWS and SaaS the same week as the on-prem file.",
        yearStarted: 2018,
      },
      {
        name: "Detection Engineering",
        description:
          "Turn every major incident into detections that would have fired on the first hop, not the last.",
        yearStarted: 2017,
      },
      {
        name: "Python",
        description:
          "Automate evidence collection, timeline merge, and IOC sweep so analysts are not copying hashes by hand.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Brief legal, comms, and the CEO without turning a containment decision into a committee.",
        yearStarted: 2016,
      },
      {
        name: "Technical Leadership",
        description:
          "Run a 7-person IR bench, on-call, and tabletop calendar that people actually show up for.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Redline Forensics",
        description:
          "Austin IR and digital-forensics firm retaining mid-market and upper-mid-market companies for 24x7 response.",
        location: "Austin, TX",
        startDate: "2020-06-01",
        positions: [
          {
            title: "Incident Response Lead",
            startDate: "2022-03-14",
            projects: [
              {
                name: "Ransomware containment in 11 hours",
                description:
                  "Led a 14-person response on a mid-market manufacturer. Isolated the beachhead, killed the GPO push, and kept encryption under 4% of endpoints. Domain rebuild was not required.",
                skills: ["Incident Response", "Technical Leadership", "Stakeholder Management"],
              },
              {
                name: "Post-incident detection backlog",
                description:
                  "Converted 28 major incidents into 41 SIEM and EDR detections. 9 of those fired on a later customer within 90 days.",
                skills: ["Detection Engineering", "SIEM", "Python"],
              },
            ],
          },
          {
            title: "Senior IR Consultant",
            startDate: "2020-06-01",
            endDate: "2022-03-13",
            projects: [
              {
                name: "Business-email-compromise desk",
                description:
                  "Ran 19 BEC cases, including a $2.4M outbound-wire attempt stopped after MFA-fatigue on a finance mailbox. Average time-to-contain was 3.5 hours.",
                skills: ["Incident Response", "Cloud Security", "Threat Hunting"],
              },
              {
                name: "Tabletop program",
                description:
                  "Designed and ran 12 executive tabletops. Three customers used the findings to fund EDR coverage they had been deferring.",
                skills: ["Stakeholder Management", "Technical Leadership"],
              },
            ],
          },
        ],
      },
      {
        name: "Nightwatch MSSP",
        description:
          "Managed security provider running a follow-the-sun SOC with an Austin IR overflow bench.",
        location: "Austin, TX",
        startDate: "2014-07-07",
        endDate: "2020-05-22",
        positions: [
          {
            title: "IR Analyst",
            startDate: "2014-07-07",
            endDate: "2020-05-22",
            projects: [
              {
                name: "Memory-first collection standard",
                description:
                  "Moved the IR runbook to memory and disk collection before reimage. Recovered credentials and C2 configs on 11 cases that would have been closed as 'malware cleaned.'",
                skills: ["Incident Response", "Python", "Threat Hunting"],
              },
              {
                name: "SIEM timeline kit",
                description:
                  "Built a Python merge of SIEM, EDR, and DHCP so a 48-hour intrusion timeline took 40 minutes instead of a day.",
                skills: ["SIEM", "Python", "Detection Engineering"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Texas at Austin",
        degree: "B.S. Information Security",
        dateAwarded: "2014-05-17",
      },
    ],
    certifications: [
      {
        name: "GIAC Certified Forensic Analyst (GCFA)",
        issuer: "GIAC",
        dateAwarded: "2018-11-30",
        credentialId: "GCFA-CL-22091",
      },
      {
        name: "GIAC Certified Incident Handler (GCIH)",
        issuer: "GIAC",
        dateAwarded: "2016-04-12",
        credentialId: "GCIH-CL-11844",
      },
    ],
    featuredProjects: [
      {
        name: "War-room runbook",
        description:
          "<p>Redline Forensics' public IR runbook: who is on the bridge, what gets collected first, and how a ransomware containment decision is made before the domain is already gone.</p>",
        links: [
          { label: "Runbook", url: "https://www.example.com/redline-war-room" },
          { label: "Tabletop kit", url: "https://www.example.com/redline-tabletop" },
        ],
        skills: ["Incident Response", "Technical Leadership", "Stakeholder Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "cybersecurity",
    name: "Harper Quinn",
    title: "GRC Manager",
    location: "Boston, MA",
    siteDescription:
      "GRC manager in Boston who turns Zero Trust policy, control frameworks, and audit evidence into something engineers will actually implement.",
    summary:
      "<p>GRC manager in Boston. I write Zero Trust and access policy that can survive an audit and a product launch, and I do not publish a control that no team owns.</p><p>At Beacon Trust Advisory I took three SaaS customers from a failed SOC 2 Type I to a clean Type II in one cycle and retired 60 zombie policies. Earlier internal-audit work taught me that a shared drive of PDFs is not a control environment.</p>",
    socials: [
      { platform: "linkedin.com", ref: "harper-quinn" },
      { platform: "website", ref: "https://harperquinn.example.com" },
      { platform: "medium.com", ref: "harper-quinn" },
    ],
    skills: [
      {
        name: "GRC",
        description:
          "Run governance, risk, and compliance programs that map SOC 2, ISO 27001, and customer questionnaires to owned controls.",
        yearStarted: 2015,
      },
      {
        name: "Zero Trust",
        description:
          "Write access and segmentation policy that product and IAM teams can implement, not a slide that says 'never trust.'",
        yearStarted: 2019,
      },
      {
        name: "Policy Analysis",
        description:
          "Read a new customer, regulator, or insurer requirement and say what we already do vs. what we are about to fake.",
        yearStarted: 2016,
      },
      {
        name: "Cloud Security",
        description:
          "Scope cloud control evidence so an auditor is not handed a console screenshot from a sandbox account.",
        yearStarted: 2018,
      },
      {
        name: "IAM",
        description:
          "Push joiner-mover-leaver, MFA, and privileged-access reviews until the exceptions list is short enough to defend.",
        yearStarted: 2017,
      },
      {
        name: "Internal Controls",
        description:
          "Design preventative and detective controls with owners, frequency, and evidence — not a policy that ends at 'should.'",
        yearStarted: 2015,
      },
      {
        name: "Risk Rating",
        description:
          "Score vendors, systems, and findings so the backlog is ordered by exposure, not by whoever emailed last.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep engineering, legal, and sales aligned when a questionnaire would otherwise become a late-night fiction.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Beacon Trust Advisory",
        description:
          "Boston GRC consultancy helping SaaS and health-tech companies stand up SOC 2, ISO 27001, and Zero Trust policy.",
        location: "Boston, MA",
        startDate: "2021-02-08",
        positions: [
          {
            title: "GRC Manager",
            startDate: "2021-02-08",
            projects: [
              {
                name: "SOC 2 Type II recovery",
                description:
                  "Took three SaaS customers from a failed Type I to a clean Type II in one 12-month cycle. Closed 47 exceptions and cut overdue evidence requests from 31% to 4%.",
                skills: ["GRC", "Internal Controls", "Stakeholder Management"],
              },
              {
                name: "Zero Trust access policy",
                description:
                  "Wrote device, identity, and network-segmentation policy for a 900-person health-tech firm. IAM implemented MFA on 100% of privileged roles and removed 220 standing admin grants.",
                skills: ["Zero Trust", "IAM", "Policy Analysis"],
              },
              {
                name: "Vendor risk scoring reset",
                description:
                  "Replaced a spreadsheet of 400 vendors with a tiered rating. Critical vendors dropped from 90 to 28; questionnaires stopped going to the parking-lot SaaS tool.",
                skills: ["Risk Rating", "Cloud Security"],
              },
            ],
          },
        ],
      },
      {
        name: "Commonwealth Internal Audit",
        description:
          "Internal audit and compliance group for a Boston financial-services processor.",
        location: "Boston, MA",
        startDate: "2015-08-03",
        endDate: "2021-01-29",
        positions: [
          {
            title: "IT Compliance Lead",
            startDate: "2018-09-04",
            endDate: "2021-01-29",
            projects: [
              {
                name: "Access-review rebuild",
                description:
                  "Moved quarterly access reviews off email attachments. Exception aging fell from 64 days to 11; auditors sampled 40 reviews with no failed tests.",
                skills: ["IAM", "Internal Controls", "GRC"],
              },
              {
                name: "Policy library cull",
                description:
                  "Retired 60 policies that had no owner and no control mapping. The remaining 42 each had an executive sponsor and an evidence path.",
                skills: ["Policy Analysis", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "IT Auditor",
            startDate: "2015-08-03",
            endDate: "2018-08-31",
            projects: [
              {
                name: "Cloud evidence pack",
                description:
                  "Built the first AWS evidence pack for change management and logging so the external auditor stopped asking for console tours.",
                skills: ["Cloud Security", "Internal Controls"],
              },
              {
                name: "Finding risk ratings",
                description:
                  "Introduced a consistent risk rating for IT findings. Criticals that sat open past 90 days dropped from 12 to 2.",
                skills: ["Risk Rating", "GRC"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Boston University",
        degree: "M.S. Cybersecurity",
        dateAwarded: "2017-05-21",
      },
      {
        school: "Northeastern University",
        degree: "B.S. Business Administration",
        dateAwarded: "2015-05-09",
      },
    ],
    certifications: [
      {
        name: "Certified Information Systems Auditor (CISA)",
        issuer: "ISACA",
        dateAwarded: "2018-06-15",
        credentialId: "CISA-HQ-33910",
      },
      {
        name: "Certified Information Security Manager (CISM)",
        issuer: "ISACA",
        dateAwarded: "2022-02-18",
        credentialId: "CISM-HQ-55102",
      },
    ],
    featuredProjects: [
      {
        name: "Zero Trust policy kit",
        description:
          "<p>Beacon Trust's public Zero Trust policy kit: identity, device, and segmentation controls mapped to SOC 2, with owners and evidence — not a poster that says never trust.</p>",
        links: [
          { label: "Policy kit", url: "https://www.example.com/beacon-zero-trust" },
          { label: "SOC 2 map", url: "https://www.example.com/beacon-soc2-map" },
        ],
        skills: ["Zero Trust", "GRC", "IAM"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "cybersecurity",
    name: "Dinesh Iyer",
    title: "Cloud Security Architect",
    location: "Seattle, WA",
    siteDescription:
      "Cloud security architect in Seattle who designs AWS and IAM baselines, guardrails, and Zero Trust patterns for multi-account estates.",
    summary:
      "<p>Cloud security architect in Seattle. I design AWS multi-account baselines, IAM, and guardrails so a new account is born restricted — not opened up after the first incident.</p><p>At Cascade Cloud Guard I moved 120 accounts onto a Control Tower-style landing zone with no standing admin and a 70% drop in public-resource findings. Earlier platform work taught me that a 'break-glass' role used daily is just admin with extra steps.</p>",
    socials: [
      { platform: "linkedin.com", ref: "dinesh-iyer" },
      { platform: "github.com", ref: "diyer-sec" },
      { platform: "website", ref: "https://dineshiyer.example.com" },
    ],
    skills: [
      {
        name: "Cloud Security",
        description:
          "Design AWS security baselines, detective controls, and guardrails for multi-account estates.",
        yearStarted: 2016,
      },
      {
        name: "AWS",
        description:
          "Own Organizations, Control Tower patterns, Config, GuardDuty, and the IAM story that actually gets used.",
        yearStarted: 2015,
      },
      {
        name: "IAM",
        description:
          "Replace standing admin with roles, permission boundaries, and short-lived credentials teams will still ship with.",
        yearStarted: 2016,
      },
      {
        name: "Zero Trust",
        description:
          "Apply identity-aware access to cloud consoles, CI, and production paths instead of a flat VPN.",
        yearStarted: 2019,
      },
      {
        name: "Kubernetes",
        description:
          "Harden EKS clusters: IRSA, network policy, and admission controls so a pod cannot assume the node role.",
        yearStarted: 2018,
      },
      {
        name: "System Design",
        description:
          "Draw the landing zone, data perimeters, and break-glass paths before the first account is vended.",
        yearStarted: 2017,
      },
      {
        name: "Detection Engineering",
        description:
          "Turn CloudTrail and Config into detections for privilege escalation and public exposure, not just a log archive.",
        yearStarted: 2018,
      },
      {
        name: "Python",
        description:
          "Automate account vending, policy lint, and evidence collection instead of clicking 120 accounts by hand.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Cascade Cloud Guard",
        description:
          "Seattle cloud-security studio that designs landing zones and IAM programs for product companies on AWS.",
        location: "Seattle, WA",
        startDate: "2021-09-07",
        positions: [
          {
            title: "Cloud Security Architect",
            startDate: "2021-09-07",
            projects: [
              {
                name: "120-account landing zone",
                description:
                  "Moved 120 AWS accounts onto a vended landing zone with SCPs, Config, and no standing admin. Public-resource findings dropped 70% in two quarters; account vending time fell from 9 days to 4 hours.",
                skills: ["AWS", "Cloud Security", "System Design"],
              },
              {
                name: "IAM permission-boundary program",
                description:
                  "Rolled permission boundaries and role-based access to 800 engineers. Standing admin grants went from 146 to 6 break-glass roles with 15-minute sessions.",
                skills: ["IAM", "Zero Trust", "Python"],
              },
              {
                name: "EKS IRSA and admission baseline",
                description:
                  "Standardized IRSA, network policy, and admission webhooks across 18 EKS clusters. Closed node-role assumption paths that two threat models had flagged.",
                skills: ["Kubernetes", "Cloud Security", "Detection Engineering"],
              },
            ],
          },
        ],
      },
      {
        name: "Puget Platform Security",
        description:
          "Internal security platform team for a Seattle SaaS company running a growing AWS estate.",
        location: "Seattle, WA",
        startDate: "2015-06-15",
        endDate: "2021-08-27",
        positions: [
          {
            title: "Senior Cloud Security Engineer",
            startDate: "2018-11-01",
            endDate: "2021-08-27",
            projects: [
              {
                name: "GuardDuty and CloudTrail detections",
                description:
                  "Shipped 24 CloudTrail and GuardDuty detections for key creation, role assumption, and public snapshot sharing. Mean time to ticket on critical findings fell from 2 days to 20 minutes.",
                skills: ["Detection Engineering", "AWS", "Python"],
              },
              {
                name: "CI identity cutover",
                description:
                  "Replaced long-lived CI keys with OIDC roles. Revoked 310 access keys; deploy failures from expired keys went to zero.",
                skills: ["IAM", "Zero Trust"],
              },
            ],
          },
          {
            title: "Cloud Engineer",
            startDate: "2015-06-15",
            endDate: "2018-10-31",
            projects: [
              {
                name: "First multi-account split",
                description:
                  "Split a single production account into log, security, and workload accounts after a contractor key leaked. Blast radius on the next incident stayed in one account.",
                skills: ["AWS", "System Design", "Cloud Security"],
              },
              {
                name: "EKS bootstrap",
                description:
                  "Stood up the first production EKS cluster with IRSA and private API access, replacing a set of EC2 pets that had SSH from the office CIDR.",
                skills: ["Kubernetes", "AWS"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Washington",
        degree: "B.S. Computer Engineering",
        dateAwarded: "2015-06-13",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Security – Specialty",
        issuer: "Amazon Web Services",
        dateAwarded: "2019-09-20",
        credentialId: "AWS-SCS-DI-44821",
      },
      {
        name: "Certified Cloud Security Professional (CCSP)",
        issuer: "ISC2",
        dateAwarded: "2022-01-11",
        credentialId: "CCSP-DI-77290",
      },
    ],
    featuredProjects: [
      {
        name: "Landing-zone reference",
        description:
          "<p>Cascade Cloud Guard's AWS landing-zone reference: account vending, SCP baselines, IAM boundaries, and the detections that fire when someone opens a public snapshot anyway.</p>",
        links: [
          { label: "Reference", url: "https://www.example.com/cascade-landing-zone" },
          { label: "IAM boundaries", url: "https://www.example.com/cascade-iam-boundaries" },
        ],
        skills: ["AWS", "IAM", "Cloud Security"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "professional-engineering",
    name: "Sofia Alvarez",
    title: "Structural Engineer, PE",
    location: "Los Angeles, CA",
    siteDescription:
      "California PE designing seismic-resistant buildings in Los Angeles, from mid-rise housing to special moment frames that have to survive peer review.",
    summary:
      "<p>Structural engineer and California PE in Los Angeles. I design seismic systems for mid-rise housing and commercial buildings and I stamp when the analysis, the detailing, and the peer review actually agree.</p><p>At Pacific Frame Engineers I delivered 1.4M sf of Type I and Type III work through LADBS and peer review, including a 12-story special moment-frame tower that stayed inside drift limits after two redesigns. Earlier production work taught me that a pretty Revit model is not a complete joint.</p>",
    socials: [
      { platform: "linkedin.com", ref: "sofia-alvarez-pe" },
      { platform: "website", ref: "https://sofiaalvarez.example.com" },
      { platform: "medium.com", ref: "sofia-alvarez-pe" },
    ],
    skills: [
      {
        name: "Structural Analysis",
        description:
          "Run linear and nonlinear seismic analysis for steel and concrete buildings that have to clear California peer review.",
        yearStarted: 2013,
      },
      {
        name: "PE Stamping",
        description:
          "Stamp structural drawings and calculations in California only when the load path and detailing are ready for the field.",
        yearStarted: 2018,
      },
      {
        name: "Building Codes",
        description:
          "Apply ASCE 7, AISC, ACI, and the Los Angeles Building Code, including the amendments that trip out-of-town engineers.",
        yearStarted: 2013,
      },
      {
        name: "AutoCAD",
        description:
          "Produce calculation sketches and 2D details when the BIM model is not the right place for a connection.",
        yearStarted: 2012,
      },
      {
        name: "Revit",
        description:
          "Coordinate structural BIM with architect and MEP so a beam does not land in a shaft after permit.",
        yearStarted: 2014,
      },
      {
        name: "Construction Documents",
        description:
          "Issue IFC sets with schedules, typical details, and the notes inspectors actually look for.",
        yearStarted: 2013,
      },
      {
        name: "Construction Administration",
        description:
          "Answer RFIs and review shop drawings fast enough that a steel mill date does not slip for a missing weld symbol.",
        yearStarted: 2015,
      },
      {
        name: "Sustainable Design",
        description:
          "Right-size members and consider mass timber and reused steel when the program and the seismic system allow it.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Pacific Frame Engineers",
        description:
          "Los Angeles structural firm focused on seismic design of mid-rise housing, schools, and commercial towers.",
        location: "Los Angeles, CA",
        startDate: "2020-04-06",
        positions: [
          {
            title: "Associate Structural Engineer, PE",
            startDate: "2020-04-06",
            projects: [
              {
                name: "12-story special moment-frame tower",
                description:
                  "Engineer of record on a 12-story steel SMF in Koreatown. Two redesigns kept story drift inside ASCE 7 limits; the project cleared LADBS and peer review on the second cycle with 38 RFIs in CA.",
                skills: ["Structural Analysis", "PE Stamping", "Building Codes"],
              },
              {
                name: "Type III housing package",
                description:
                  "Delivered 420 units of Type III wood over podium across three sites. Coordinated Revit with architect and MEP so shaft clashes dropped from 90 at 50% CD to 7 at IFC.",
                skills: ["Revit", "Construction Documents", "Sustainable Design"],
              },
              {
                name: "Steel shop-drawing turnaround",
                description:
                  "Cut average shop-drawing review from 14 days to 6 on a 180-ton package so the mill date held.",
                skills: ["Construction Administration", "AutoCAD"],
              },
            ],
          },
        ],
      },
      {
        name: "Wilshire Gravity Studio",
        description:
          "Production structural office doing housing and adaptive reuse across Los Angeles County.",
        location: "Los Angeles, CA",
        startDate: "2013-07-08",
        endDate: "2020-03-27",
        positions: [
          {
            title: "Project Engineer",
            startDate: "2016-09-01",
            endDate: "2020-03-27",
            projects: [
              {
                name: "Adaptive-reuse office to housing",
                description:
                  "Designed gravity and seismic upgrades for a 1924 concrete frame converted to 96 units. Existing-to-new load path was the peer-review fight; we won it with in-situ testing, not extra shear walls.",
                skills: ["Structural Analysis", "Building Codes", "Construction Documents"],
              },
              {
                name: "School modernization package",
                description:
                  "Produced CD and CA for two LAUSD modernizations totaling 110,000 sf, including DSA comments closed in two cycles.",
                skills: ["PE Stamping", "Construction Administration", "Revit"],
              },
            ],
          },
          {
            title: "Staff Engineer",
            startDate: "2013-07-08",
            endDate: "2016-08-31",
            projects: [
              {
                name: "Connection typicals library",
                description:
                  "Built the office AutoCAD typicals for wood shear walls and steel braces that junior staff still use.",
                skills: ["AutoCAD", "Construction Documents"],
              },
              {
                name: "First stamped calculations",
                description:
                  "Prepared calculation packages under a supervising PE for 14 Type V housing projects and learned which notes inspectors mark in red.",
                skills: ["Structural Analysis", "Building Codes"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "M.S. Structural Engineering",
        dateAwarded: "2013-05-17",
      },
      {
        school: "UCLA",
        degree: "B.S. Civil Engineering",
        dateAwarded: "2011-06-10",
      },
    ],
    certifications: [
      {
        name: "Professional Engineer, Civil (California)",
        issuer: "California Board for Professional Engineers",
        dateAwarded: "2018-08-24",
        credentialId: "CA-PE-C-884201",
      },
      {
        name: "SEAOC Seismology Committee contributor",
        issuer: "Structural Engineers Association of California",
        dateAwarded: "2022-10-01",
        credentialId: "SEAOC-SA-2022",
      },
    ],
    featuredProjects: [
      {
        name: "Koreatown SMF case study",
        description:
          "<p>Design notes from a 12-story special moment-frame in Los Angeles: drift, connection design, and the peer-review comments that forced two redesigns before the stamp.</p>",
        links: [
          { label: "Case study", url: "https://www.example.com/pacific-frame-smf" },
          { label: "Detail set", url: "https://www.example.com/pacific-frame-details" },
        ],
        skills: ["Structural Analysis", "PE Stamping", "Building Codes"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "professional-engineering",
    name: "Patrick O'Reilly",
    title: "Civil Engineer, PE",
    location: "Boston, MA",
    siteDescription:
      "Massachusetts PE delivering transportation projects in Boston — roadway, transit civil, and the utility coordination that keeps a letting on the calendar.",
    summary:
      "<p>Civil engineer and Massachusetts PE in Boston. I deliver roadway and transit-civil packages through MassDOT and MBTA review, and I treat utility coordination as design work, not a surprise at pre-bid.</p><p>At Commonwealth Transit Design I brought $240M of transportation civil to advertisement with a 4% addendum rate. Earlier municipal work taught me that a pretty typical section fails if the drainage outfall was never permitted.</p>",
    socials: [
      { platform: "linkedin.com", ref: "patrick-oreilly-pe" },
      { platform: "website", ref: "https://patrickoreilly.example.com" },
    ],
    skills: [
      {
        name: "PE Stamping",
        description:
          "Stamp transportation civil plans in Massachusetts when geometry, drainage, and specs are ready for a letting.",
        yearStarted: 2017,
      },
      {
        name: "AutoCAD",
        description:
          "Produce Civil 3D alignments, surfaces, and plan-and-profile sheets that survive a MassDOT CADD review.",
        yearStarted: 2011,
      },
      {
        name: "Construction Documents",
        description:
          "Issue PS&E sets with quantities, specs, and the notes a resident engineer can actually build from.",
        yearStarted: 2012,
      },
      {
        name: "Construction Administration",
        description:
          "Answer RFIs and review shop drawings on active roadway and transit jobs without stopping the night shift.",
        yearStarted: 2014,
      },
      {
        name: "Building Codes",
        description:
          "Apply AASHTO, MassDOT standards, and ADA so a sidewalk or station platform is not redesigned after advertisement.",
        yearStarted: 2012,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep DOT, municipality, utilities, and abutters on one schedule when a detour is the political problem.",
        yearStarted: 2013,
      },
      {
        name: "Program Management",
        description:
          "Run a corridor of related contracts so right-of-way, permits, and design packages hit the same letting season.",
        yearStarted: 2018,
      },
      {
        name: "Hydraulics",
        description:
          "Size roadway drainage, outfalls, and temporary water management so a 10-year storm is not a change order.",
        yearStarted: 2012,
      },
    ],
    companies: [
      {
        name: "Commonwealth Transit Design",
        description:
          "Boston civil firm delivering roadway, bus, and transit-civil packages for MassDOT and MBTA.",
        location: "Boston, MA",
        startDate: "2020-01-13",
        positions: [
          {
            title: "Senior Civil Engineer, PE",
            startDate: "2020-01-13",
            projects: [
              {
                name: "Silver Line extension civil package",
                description:
                  "Lead civil on a 1.8-mile busway and station package. Coordinated 14 utility relocations and advertised on the programmed letting with a 4% addendum rate.",
                skills: ["Construction Documents", "Program Management", "Stakeholder Management"],
              },
              {
                name: "Corridor drainage redesign",
                description:
                  "Re-sized 2.4 miles of roadway drainage after a climate-updated rainfall atlas. Avoided a late outfall redesign that would have slipped the advertisement by a season.",
                skills: ["Hydraulics", "PE Stamping", "Building Codes"],
              },
              {
                name: "Night-shift CA on I-93 ramp",
                description:
                  "Handled 61 RFIs and 22 shop-drawing packages on an active ramp reconstruction without a weather-related claim on drainage.",
                skills: ["Construction Administration", "AutoCAD"],
              },
            ],
          },
        ],
      },
      {
        name: "Harborline Municipal Works",
        description:
          "Municipal civil shop doing streets, sidewalks, and small bridges for Boston-area cities and towns.",
        location: "Boston, MA",
        startDate: "2011-06-06",
        endDate: "2019-12-20",
        positions: [
          {
            title: "Project Civil Engineer",
            startDate: "2015-04-01",
            endDate: "2019-12-20",
            projects: [
              {
                name: "Complete-streets program",
                description:
                  "Designed 6.2 miles of complete-streets work across three towns. All six contracts bid within 8% of estimate after quantity reviews.",
                skills: ["Construction Documents", "Building Codes", "Stakeholder Management"],
              },
              {
                name: "Culvert replacement package",
                description:
                  "Replaced four undersized culverts with hydraulically adequate structures and temporary water plans that held through two spring freshets.",
                skills: ["Hydraulics", "PE Stamping", "Construction Administration"],
              },
            ],
          },
          {
            title: "Staff Civil Engineer",
            startDate: "2011-06-06",
            endDate: "2015-03-31",
            projects: [
              {
                name: "CADD standards adoption",
                description:
                  "Moved the office onto MassDOT CADD standards and Civil 3D data shortcuts, cutting sheet production time 25% on the next three jobs.",
                skills: ["AutoCAD", "Construction Documents"],
              },
              {
                name: "Sidewalk ADA inventory",
                description:
                  "Surveyed and designed 3.1 miles of sidewalk ramps to current ADA standards for a Boston neighborhood reconstruction.",
                skills: ["Building Codes", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Northeastern University",
        degree: "B.S. Civil Engineering",
        dateAwarded: "2011-05-07",
      },
    ],
    certifications: [
      {
        name: "Professional Engineer, Civil (Massachusetts)",
        issuer: "Massachusetts Board of Registration of Professional Engineers",
        dateAwarded: "2017-02-16",
        credentialId: "MA-PE-C-50119",
      },
      {
        name: "Professional Traffic Operations Engineer (PTOE)",
        issuer: "Transportation Professional Certification Board",
        dateAwarded: "2021-07-09",
        credentialId: "PTOE-POR-22810",
      },
    ],
    featuredProjects: [
      {
        name: "Busway civil case study",
        description:
          "<p>How Commonwealth Transit Design took a 1.8-mile busway from 30% to advertisement: utility matrix, drainage redesign, and the PS&E checks that kept addenda under 4%.</p>",
        links: [
          { label: "Case study", url: "https://www.example.com/commonwealth-busway" },
          { label: "Utility matrix", url: "https://www.example.com/commonwealth-utilities" },
        ],
        skills: ["Construction Documents", "Program Management", "Hydraulics"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "professional-engineering",
    name: "Mei Lin",
    title: "Mechanical Engineer, PE",
    location: "Chicago, IL",
    siteDescription:
      "Illinois PE coordinating MEP systems in Chicago — HVAC, plumbing, and the clash-free BIM that has to survive a hospital or lab commissioning.",
    summary:
      "<p>Mechanical engineer and Illinois PE in Chicago. I coordinate HVAC and plumbing through BIM and I stamp when loads, clearances, and sequences will actually commission.</p><p>At Lakeside MEP Partners I led 2.1M sf of healthcare and lab MEP with clash counts under 12 per 100,000 sf at IFC. Earlier production work taught me that a duct that fits in the model can still miss a fire damper in the field.</p>",
    socials: [
      { platform: "linkedin.com", ref: "mei-lin-pe" },
      { platform: "website", ref: "https://meilin-pe.example.com" },
      { platform: "medium.com", ref: "mei-lin-pe" },
    ],
    skills: [
      {
        name: "MEP Coordination",
        description:
          "Run multi-trade BIM coordination so HVAC, plumbing, fire protection, and structure share a ceiling that can be built.",
        yearStarted: 2014,
      },
      {
        name: "PE Stamping",
        description:
          "Stamp mechanical drawings in Illinois when load calculations, sequences, and code reviews are finished.",
        yearStarted: 2019,
      },
      {
        name: "Revit",
        description:
          "Own mechanical models, worksets, and clash views that architects and contractors will actually open.",
        yearStarted: 2013,
      },
      {
        name: "AutoCAD",
        description:
          "Produce riser diagrams and details when a 2D sheet is clearer than a 3D crop.",
        yearStarted: 2012,
      },
      {
        name: "Construction Documents",
        description:
          "Issue mechanical CDs with schedules, controls sequences, and the notes a balancer needs.",
        yearStarted: 2014,
      },
      {
        name: "Building Codes",
        description:
          "Apply IMC, IECC, NFPA, and Chicago amendments so a hospital air-change rate is not a late comment.",
        yearStarted: 2013,
      },
      {
        name: "Construction Administration",
        description:
          "Review equipment submittals and answer RFIs before a long-lead air handler misses its pad.",
        yearStarted: 2015,
      },
      {
        name: "Sustainable Design",
        description:
          "Right-size HVAC and recover energy on labs and hospitals instead of oversizing 'to be safe.'",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Lakeside MEP Partners",
        description:
          "Chicago MEP firm focused on healthcare, labs, and high-rise residential mechanical systems.",
        location: "Chicago, IL",
        startDate: "2021-03-15",
        positions: [
          {
            title: "Senior Mechanical Engineer, PE",
            startDate: "2021-03-15",
            projects: [
              {
                name: "Hospital tower MEP coordination",
                description:
                  "Lead mechanical on a 14-story hospital tower. Clash count at IFC was 11 per 100,000 sf; commissioning of air-handling systems finished 3 weeks ahead of the owner milestone.",
                skills: ["MEP Coordination", "Revit", "PE Stamping"],
              },
              {
                name: "Lab exhaust energy recovery",
                description:
                  "Redesigned a 90,000-cfm lab exhaust with energy recovery that cut estimated annual energy 18% and still met IMC and owner air-change rates.",
                skills: ["Sustainable Design", "Building Codes", "Construction Documents"],
              },
              {
                name: "Air-handler submittal desk",
                description:
                  "Turned 27 long-lead air-handler submittals in 8 business days so pad and steel dates held.",
                skills: ["Construction Administration", "AutoCAD"],
              },
            ],
          },
        ],
      },
      {
        name: "Loop Mechanical Studio",
        description:
          "Production MEP office doing residential high-rise and commercial tenant work in downtown Chicago.",
        location: "Chicago, IL",
        startDate: "2013-06-10",
        endDate: "2021-03-05",
        positions: [
          {
            title: "Mechanical Project Engineer",
            startDate: "2017-02-01",
            endDate: "2021-03-05",
            projects: [
              {
                name: "High-rise residential HVAC package",
                description:
                  "Designed HVAC for an 38-story residential tower. Coordinated fan-coil and shaft layouts in Revit; field RFIs on mechanical were 0.6 per 10,000 sf.",
                skills: ["Revit", "MEP Coordination", "Construction Documents"],
              },
              {
                name: "IECC envelope and systems review",
                description:
                  "Closed Chicago IECC comments on five tenant jobs in one cycle by documenting equipment efficiencies and control sequences up front.",
                skills: ["Building Codes", "Sustainable Design", "PE Stamping"],
              },
            ],
          },
          {
            title: "Mechanical Designer",
            startDate: "2013-06-10",
            endDate: "2017-01-31",
            projects: [
              {
                name: "Riser-diagram standard",
                description:
                  "Created the office AutoCAD riser standard that made plumbing and hydronic stacks readable on 30x42 sheets.",
                skills: ["AutoCAD", "Construction Documents"],
              },
              {
                name: "Clash-detection cadence",
                description:
                  "Set a weekly Navisworks cadence with structure and fire protection that cut late duct reroutes 40% on the next three jobs.",
                skills: ["MEP Coordination", "Revit"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Illinois Urbana-Champaign",
        degree: "B.S. Mechanical Engineering",
        dateAwarded: "2013-05-12",
      },
    ],
    certifications: [
      {
        name: "Professional Engineer, Mechanical (Illinois)",
        issuer: "Illinois Department of Financial and Professional Regulation",
        dateAwarded: "2019-05-03",
        credentialId: "IL-PE-M-062184",
      },
      {
        name: "LEED AP BD+C",
        issuer: "U.S. Green Building Council",
        dateAwarded: "2018-11-16",
        credentialId: "LEED-ML-44109",
      },
    ],
    featuredProjects: [
      {
        name: "Hospital MEP coordination brief",
        description:
          "<p>How Lakeside MEP Partners coordinated a 14-story hospital: clash budgets, sequence of operations, and the commissioning notes that kept air-change rates honest.</p>",
        links: [
          { label: "Coordination brief", url: "https://www.example.com/lakeside-hospital-mep" },
          { label: "Sequence notes", url: "https://www.example.com/lakeside-sequences" },
        ],
        skills: ["MEP Coordination", "Revit", "Building Codes"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "professional-engineering",
    name: "Jordan Hale",
    title: "Water Resources Engineer",
    location: "Denver, CO",
    siteDescription:
      "Colorado PE designing hydraulics and stormwater systems in Denver — floodplain, detention, and the models that have to survive a Mile High storm.",
    summary:
      "<p>Water resources engineer and Colorado PE in Denver. I design stormwater, detention, and floodplain work that has to survive both a Mile High cloudburst and an Urban Drainage review.</p><p>At Front Range Waterworks I delivered 18 stormwater packages totaling $92M, including a regional detention facility that dropped a 100-year peak 34% for a 240-acre basin. Earlier municipal work taught me that a HEC-RAS plot is not a permit.</p>",
    socials: [
      { platform: "linkedin.com", ref: "jordan-hale-pe" },
      { platform: "github.com", ref: "jordanhale" },
      { platform: "website", ref: "https://jordanhale.example.com" },
    ],
    skills: [
      {
        name: "Hydraulics",
        description:
          "Model open-channel, pipe, and detention hydraulics for Front Range storms that do not match a textbook hyetograph.",
        yearStarted: 2014,
      },
      {
        name: "PE Stamping",
        description:
          "Stamp drainage reports and construction plans in Colorado when the model, the grading, and the outfall agree.",
        yearStarted: 2019,
      },
      {
        name: "AutoCAD",
        description:
          "Produce Civil 3D grading, profiles, and pond details that a contractor can stake.",
        yearStarted: 2013,
      },
      {
        name: "Sustainable Design",
        description:
          "Use green infrastructure and water-quality capture volume so a pond is not only a peak-shave hole.",
        yearStarted: 2016,
      },
      {
        name: "Construction Documents",
        description:
          "Issue stormwater CDs with details, specs, and the maintenance notes a city will require at acceptance.",
        yearStarted: 2014,
      },
      {
        name: "Building Codes",
        description:
          "Apply Urban Drainage criteria, floodplain rules, and MS4 requirements so a pond is not redesigned after first review.",
        yearStarted: 2014,
      },
      {
        name: "Python",
        description:
          "Script hydrograph batching and rating-curve checks so a 40-basin model is not a weekend of copy-paste.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep cities, developers, and floodplain administrators on one set of peaks when three models disagree.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Front Range Waterworks",
        description:
          "Denver water-resources firm designing stormwater, detention, and floodplain projects for cities and land developers.",
        location: "Denver, CO",
        startDate: "2020-09-08",
        positions: [
          {
            title: "Water Resources Engineer, PE",
            startDate: "2020-09-08",
            projects: [
              {
                name: "Regional detention for a 240-acre basin",
                description:
                  "Designed a regional pond that dropped the 100-year peak 34% and met water-quality capture volume. Urban Drainage approved on the second cycle; construction finished $1.1M under the engineer's estimate.",
                skills: ["Hydraulics", "Sustainable Design", "PE Stamping"],
              },
              {
                name: "Floodplain map revision package",
                description:
                  "Prepared a CLOMR/LOMR package for 1.6 miles of improved channel. FEMA issued the LOMR 11 months after construction without a conditional-to-final remodel.",
                skills: ["Hydraulics", "Building Codes", "Stakeholder Management"],
              },
              {
                name: "Python hydrograph batcher",
                description:
                  "Scripted 40-basin hydrograph and rating-curve checks that cut model QA from two days to three hours before each submittal.",
                skills: ["Python", "Hydraulics", "Construction Documents"],
              },
            ],
          },
        ],
      },
      {
        name: "Platte Municipal Drainage",
        description:
          "City stormwater group doing CIP ponds, outfalls, and development review along the South Platte.",
        location: "Denver, CO",
        startDate: "2014-01-06",
        endDate: "2020-08-28",
        positions: [
          {
            title: "Stormwater Project Engineer",
            startDate: "2017-03-01",
            endDate: "2020-08-28",
            projects: [
              {
                name: "Outfall CIP package",
                description:
                  "Designed three storm outfalls totaling $18M. All three bid within 7% of estimate after a quantity and utility review that caught a conflicting sanitary crossing.",
                skills: ["Construction Documents", "AutoCAD", "PE Stamping"],
              },
              {
                name: "Development review desk",
                description:
                  "Reviewed 90+ drainage reports a year. First-review comment counts dropped 30% after publishing a criteria checklist developers actually used.",
                skills: ["Building Codes", "Stakeholder Management", "Hydraulics"],
              },
            ],
          },
          {
            title: "Staff Water Resources Engineer",
            startDate: "2014-01-06",
            endDate: "2017-02-28",
            projects: [
              {
                name: "Green-street pilot",
                description:
                  "Designed the city's first three green-street blocks with water-quality planters that captured the WQCV without flooding driveways.",
                skills: ["Sustainable Design", "AutoCAD", "Construction Documents"],
              },
              {
                name: "Rainfall atlas update support",
                description:
                  "Re-ran 12 CIP models against an updated rainfall atlas and flagged three ponds that no longer met peak release.",
                skills: ["Hydraulics", "Python"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Colorado State University",
        degree: "M.S. Civil Engineering, Water Resources",
        dateAwarded: "2013-12-14",
      },
      {
        school: "University of Colorado Boulder",
        degree: "B.S. Civil Engineering",
        dateAwarded: "2012-05-11",
      },
    ],
    certifications: [
      {
        name: "Professional Engineer, Civil (Colorado)",
        issuer: "Colorado State Board of Licensure",
        dateAwarded: "2019-04-19",
        credentialId: "CO-PE-C-0055120",
      },
      {
        name: "Certified Floodplain Manager (CFM)",
        issuer: "Association of State Floodplain Managers",
        dateAwarded: "2018-06-22",
        credentialId: "CFM-JH-33180",
      },
    ],
    featuredProjects: [
      {
        name: "Regional detention case study",
        description:
          "<p>Design notes from a 240-acre Front Range detention facility: peak shaving, water-quality volume, and the Urban Drainage comments that decided the outlet structure.</p>",
        links: [
          { label: "Case study", url: "https://www.example.com/frontrange-detention" },
          { label: "Model notes", url: "https://www.example.com/frontrange-hydraulics" },
        ],
        skills: ["Hydraulics", "Sustainable Design", "PE Stamping"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "energy-utilities",
    name: "Anika Bose",
    title: "Power Markets Analyst",
    location: "Houston, TX",
    siteDescription:
      "Wholesale power markets analyst in Houston who prices ERCOT and multi-ISO books, hedges shape risk, and explains a $9,000 spike without a novel.",
    summary:
      "<p>Power markets analyst in Houston. I price wholesale power, build the hedge, and explain a scarcity spike to a desk that already knows it lost money.</p><p>At Gulf Coast Power Desk I cover a 4.2 GW ERCOT and PJM book with day-ahead vs. real-time leakage inside 80 bps of plan. Earlier ISO work taught me that a pretty forward curve is not a congestion story.</p>",
    socials: [
      { platform: "linkedin.com", ref: "anika-bose" },
      { platform: "medium.com", ref: "anika-bose" },
      { platform: "website", ref: "https://anikabose.example.com" },
    ],
    skills: [
      {
        name: "Power Markets",
        description:
          "Trade and analyze wholesale power across ERCOT and PJM: day-ahead, real-time, and the congestion that sits between them.",
        yearStarted: 2015,
      },
      {
        name: "Financial Modeling",
        description:
          "Build P&L, VaR, and shape-risk views a desk head will sign before the next strip is bought.",
        yearStarted: 2016,
      },
      {
        name: "Python",
        description:
          "Pull ISO settlements, build basis curves, and catch a missing DAM award before it becomes a true-up surprise.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "Read load, outages, and fuel into a view that is more than 'gas is up so power is up.'",
        yearStarted: 2015,
      },
      {
        name: "Grid Operations",
        description:
          "Talk to the real-time desk in the language of constraints, not just the language of forwards.",
        yearStarted: 2017,
      },
      {
        name: "Pipeline Forecasting",
        description:
          "Forecast generation and load shapes so a retail book is not naked into a summer week.",
        yearStarted: 2016,
      },
      {
        name: "Risk Rating",
        description:
          "Score counterparties, nodes, and products so limit is spent on the basis we actually understand.",
        yearStarted: 2018,
      },
      {
        name: "Stakeholder Management",
        description:
          "Brief origination, risk, and the ISO settlements team when a $9,000 interval needs a single story.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Gulf Coast Power Desk",
        description:
          "Houston wholesale desk covering ERCOT and a PJM strip for a mid-size generator and retail book.",
        location: "Houston, TX",
        startDate: "2021-06-01",
        positions: [
          {
            title: "Power Markets Analyst",
            startDate: "2021-06-01",
            projects: [
              {
                name: "ERCOT day-ahead vs. real-time leakage",
                description:
                  "Rebuilt the DAM/RT attribution for a 4.2 GW book. Leakage fell from 210 bps to 80 bps of plan after we stopped treating West Hub as a single story.",
                skills: ["Power Markets", "Financial Modeling", "Python"],
              },
              {
                name: "Summer shape hedge",
                description:
                  "Sized a July-August hedge on 1.1 GW of retail load using a heat-driven load forecast. Gross margin held inside 4% of plan through a 12-day heat event.",
                skills: ["Pipeline Forecasting", "Market Analysis", "Risk Rating"],
              },
              {
                name: "Constraint brief for origination",
                description:
                  "Wrote weekly constraint briefs so originators stopped selling fixed-price load behind a frequently binding Houston import.",
                skills: ["Grid Operations", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Bayou ISO Analytics",
        description:
          "Independent shop producing ERCOT and SPP settlement and congestion research for generators and marketers.",
        location: "Houston, TX",
        startDate: "2015-07-13",
        endDate: "2021-05-21",
        positions: [
          {
            title: "Senior Markets Analyst",
            startDate: "2018-08-06",
            endDate: "2021-05-21",
            projects: [
              {
                name: "Congestion atlas",
                description:
                  "Published a monthly ERCOT congestion atlas used by 11 generator clients. Predicted 7 of the 10 most expensive constraints in summer 2020 inside a 15% shadow-price band.",
                skills: ["Power Markets", "Market Analysis", "Grid Operations"],
              },
              {
                name: "Settlement true-up monitor",
                description:
                  "Automated true-up vs. initial settlement checks in Python. Caught $2.4M of missing DAM awards across four clients in the first year.",
                skills: ["Python", "Financial Modeling"],
              },
            ],
          },
          {
            title: "Markets Analyst",
            startDate: "2015-07-13",
            endDate: "2018-08-03",
            projects: [
              {
                name: "Load-shape library",
                description:
                  "Built weather-normalized load shapes for 40 Texas weather zones that the retail team still uses for strip pricing.",
                skills: ["Pipeline Forecasting", "Python"],
              },
              {
                name: "Counterparty scorecard",
                description:
                  "Scored 60 counterparties on collateral, default history, and nodal concentration so credit limit was not a handshake.",
                skills: ["Risk Rating", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Rice University",
        degree: "M.S. Economics",
        dateAwarded: "2015-05-09",
      },
      {
        school: "University of Texas at Austin",
        degree: "B.S. Electrical Engineering",
        dateAwarded: "2013-05-18",
      },
    ],
    certifications: [
      {
        name: "ERCOT Market Participant Certification",
        issuer: "Electric Reliability Council of Texas",
        dateAwarded: "2016-03-11",
        credentialId: "ERCOT-AB-44102",
      },
      {
        name: "Series 3 National Commodity Futures Examination",
        issuer: "FINRA",
        dateAwarded: "2018-09-14",
        credentialId: "SERIES3-AB-22910",
      },
    ],
    featuredProjects: [
      {
        name: "ERCOT leakage note",
        description:
          "<p>How Gulf Coast Power Desk attributes day-ahead vs. real-time leakage: hub basis, constraint hours, and the load-shape mistakes that look like bad luck until you plot them.</p>",
        links: [
          { label: "Leakage note", url: "https://www.example.com/gulfcoast-leakage" },
          { label: "Congestion atlas", url: "https://www.example.com/gulfcoast-congestion" },
        ],
        skills: ["Power Markets", "Financial Modeling", "Market Analysis"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "energy-utilities",
    name: "Levi Stanton",
    title: "Reservoir Engineer",
    location: "Midland, TX",
    siteDescription:
      "Reservoir engineer in Midland working unconventional oil — type curves, spacing, and the wells that have to pay out before the next rig walk.",
    summary:
      "<p>Reservoir engineer in Midland. I build type curves, spacing cases, and EURs for unconventional oil that a completions engineer and a CFO can both live with.</p><p>At Permian Basin Reservoir Co I own 420 producing wells and a 90-well annual program with type-curve error inside 8% at 18 months. Earlier operator work taught me that a pretty decline fit is not a spacing decision.</p>",
    socials: [
      { platform: "linkedin.com", ref: "levi-stanton" },
      { platform: "website", ref: "https://levistanton.example.com" },
      { platform: "medium.com", ref: "levi-stanton" },
    ],
    skills: [
      {
        name: "Reservoir Engineering",
        description:
          "Build type curves, EURs, and spacing cases for unconventional oil in the Midland Basin.",
        yearStarted: 2014,
      },
      {
        name: "Python",
        description:
          "Fit declines, batch type curves, and flag wells that leave the type curve before the reserve meeting.",
        yearStarted: 2015,
      },
      {
        name: "Financial Modeling",
        description:
          "Turn EUR and capex into NPV and payout so a spacing case is a money decision, not a geology slide.",
        yearStarted: 2016,
      },
      {
        name: "Process Safety",
        description:
          "Keep flowback, high-pressure facilities, and simultaneous operations inside the MOC the field actually runs.",
        yearStarted: 2017,
      },
      {
        name: "Production Planning",
        description:
          "Sequence a 90-well program against facilities, takeaway, and the offset wells we cannot frac into.",
        yearStarted: 2016,
      },
      {
        name: "Market Analysis",
        description:
          "Price strip and differential assumptions so a type curve is not an oil-price hope.",
        yearStarted: 2018,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold geology, completions, and midstream in one room when a child well underperforms.",
        yearStarted: 2015,
      },
      {
        name: "Quality Management",
        description:
          "Standardize decline fits and reserve categories so two engineers do not book the same well two ways.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Permian Basin Reservoir Co",
        description:
          "Midland operator-focused reservoir shop supporting a 420-well unconventional oil program.",
        location: "Midland, TX",
        startDate: "2020-03-02",
        positions: [
          {
            title: "Reservoir Engineer",
            startDate: "2020-03-02",
            projects: [
              {
                name: "Midland Basin type-curve reset",
                description:
                  "Re-fit type curves on 420 wells after a completion change. 18-month cumulative error fell from 17% to 8%; the next AFE round used one curve family instead of four.",
                skills: ["Reservoir Engineering", "Python", "Quality Management"],
              },
              {
                name: "Parent-child spacing study",
                description:
                  "Modeled 660- vs. 880-ft spacing on two benches. Recommended 880 on the child-prone bench; first 16 wells paid out 3 months faster than the tight-spacing case.",
                skills: ["Reservoir Engineering", "Financial Modeling", "Stakeholder Management"],
              },
              {
                name: "90-well program sequence",
                description:
                  "Sequenced a 90-well year against tank, gas takeaway, and offset frac hits. Deferred 6 wells that would have flowed into a constrained battery.",
                skills: ["Production Planning", "Process Safety", "Market Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "Llano Unconventional",
        description:
          "Private Midland operator with a 180-well Wolfcamp position and a small reservoir bench.",
        location: "Midland, TX",
        startDate: "2014-06-02",
        endDate: "2020-02-21",
        positions: [
          {
            title: "Associate Reservoir Engineer",
            startDate: "2017-01-09",
            endDate: "2020-02-21",
            projects: [
              {
                name: "Reserve category cleanup",
                description:
                  "Rebooked 180 wells to a consistent PDP/PUD split after two engineers had used different decline cutoffs. Year-end reserve variance vs. auditor dropped from 11% to 3%.",
                skills: ["Quality Management", "Reservoir Engineering", "Financial Modeling"],
              },
              {
                name: "Flowback MOC",
                description:
                  "Wrote the flowback MOC with operations after a high-pressure incident. Zero repeat events on the next 40 wells.",
                skills: ["Process Safety", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Reservoir Analyst",
            startDate: "2014-06-02",
            endDate: "2016-12-30",
            projects: [
              {
                name: "Decline batch notebook",
                description:
                  "Moved decline fits off 180 spreadsheets into a Python notebook with a review plot for each well.",
                skills: ["Python", "Reservoir Engineering"],
              },
              {
                name: "Strip and differential pack",
                description:
                  "Built the monthly price and Midland differential pack the AFE process still uses.",
                skills: ["Market Analysis", "Financial Modeling"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Texas Tech University",
        degree: "B.S. Petroleum Engineering",
        dateAwarded: "2014-05-16",
      },
    ],
    certifications: [
      {
        name: "Society of Petroleum Engineers member, Reservoir discipline",
        issuer: "Society of Petroleum Engineers",
        dateAwarded: "2015-02-01",
        credentialId: "SPE-LS-882014",
      },
      {
        name: "Well Control (IADC WellSharp, Supervisor)",
        issuer: "IADC",
        dateAwarded: "2018-10-05",
        credentialId: "IADC-WS-LS-44119",
      },
    ],
    featuredProjects: [
      {
        name: "Spacing and type-curve note",
        description:
          "<p>How Permian Basin Reservoir Co reset Midland type curves and chose 880-ft spacing on a child-prone bench: decline fits, payout, and the wells we did not drill into a constrained battery.</p>",
        links: [
          { label: "Type-curve note", url: "https://www.example.com/permian-typecurves" },
          { label: "Spacing study", url: "https://www.example.com/permian-spacing" },
        ],
        skills: ["Reservoir Engineering", "Financial Modeling", "Production Planning"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "energy-utilities",
    name: "Hannah Greer",
    title: "Grid Operations Manager",
    location: "Portland, OR",
    siteDescription:
      "Grid operations manager in Portland running NERC compliance and SCADA for a balancing-authority desk that has to stay inside the BAAL.",
    summary:
      "<p>Grid operations manager in Portland. I run a balancing-authority desk, the SCADA that feeds it, and the NERC evidence that has to be true on a bad Tuesday, not just at audit.</p><p>At Cascadia Grid Cooperative I cut BAAL exceedances 62% and closed a CIP evidence gap that had sat open for two audit cycles. Earlier dispatcher work taught me that a quiet alarm page is not the same as a reliable grid.</p>",
    socials: [
      { platform: "linkedin.com", ref: "hannah-greer" },
      { platform: "website", ref: "https://hannahgreer.example.com" },
      { platform: "medium.com", ref: "hannah-greer" },
    ],
    skills: [
      {
        name: "Grid Operations",
        description:
          "Run a balancing-authority and transmission desk: ACE, BAAL, outages, and the calls that happen at 02:00.",
        yearStarted: 2013,
      },
      {
        name: "NERC Compliance",
        description:
          "Own BAL, TOP, and CIP evidence so an audit is a walkthrough, not a scavenger hunt.",
        yearStarted: 2015,
      },
      {
        name: "SCADA",
        description:
          "Keep EMS/SCADA points, ICCP, and alarm rationalization current so operators are not hunting a stale analog.",
        yearStarted: 2013,
      },
      {
        name: "Power Markets",
        description:
          "Coordinate real-time dispatch with the market desk when a constraint and a price spike arrive together.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold neighboring BAs, TOPs, and the reliability coordinator when a path rating or an outage plan changes mid-shift.",
        yearStarted: 2014,
      },
      {
        name: "Change Management",
        description:
          "Cut over EMS displays and operating procedures without losing the night shift.",
        yearStarted: 2018,
      },
      {
        name: "Workforce Planning",
        description:
          "Staff a 24x7 desk with NERC-certified operators and a training pipeline that is not one retirement from a hole.",
        yearStarted: 2019,
      },
      {
        name: "Technical Leadership",
        description:
          "Lead a 22-person operations and SCADA group and the after-action that actually changes a display.",
        yearStarted: 2020,
      },
    ],
    companies: [
      {
        name: "Cascadia Grid Cooperative",
        description:
          "Pacific Northwest balancing authority and transmission operator running a Portland control center.",
        location: "Portland, OR",
        startDate: "2020-11-02",
        positions: [
          {
            title: "Grid Operations Manager",
            startDate: "2020-11-02",
            projects: [
              {
                name: "BAAL exceedance program",
                description:
                  "Rebuilt ACE/BAAL procedures, alarm deadbands, and the real-time training drill. Exceedances dropped 62% in 18 months; the RC stopped calling about the same path every heat week.",
                skills: ["Grid Operations", "SCADA", "Technical Leadership"],
              },
              {
                name: "CIP evidence closeout",
                description:
                  "Closed a two-cycle CIP evidence gap on BES cyber-system access and change tickets. The next audit sampled 40 tickets with no potential noncompliance.",
                skills: ["NERC Compliance", "Change Management", "Stakeholder Management"],
              },
              {
                name: "Operator pipeline",
                description:
                  "Stood up a 18-month NERC certification pipeline. Filled 5 desk seats internally and cut overtime 19% without dropping coverage.",
                skills: ["Workforce Planning", "Power Markets"],
              },
            ],
          },
        ],
      },
      {
        name: "Columbia River Dispatch",
        description:
          "Transmission operations group supporting a mid-size TOP and BA in the Pacific Northwest.",
        location: "Portland, OR",
        startDate: "2013-05-06",
        endDate: "2020-10-23",
        positions: [
          {
            title: "Senior System Operator",
            startDate: "2017-04-03",
            endDate: "2020-10-23",
            projects: [
              {
                name: "Alarm rationalization",
                description:
                  "Cut standing SCADA alarms from 140 to 38 on the main display. Operator-acknowledged critical alarms rose from 71% to 96% in 90 days.",
                skills: ["SCADA", "Grid Operations", "Change Management"],
              },
              {
                name: "TOP-001 operating plan rewrite",
                description:
                  "Rewrote SOL and IROL procedures after a path-rating change. Neighboring BAs adopted the same outage-notification timeline.",
                skills: ["NERC Compliance", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "System Operator",
            startDate: "2013-05-06",
            endDate: "2017-03-31",
            projects: [
              {
                name: "ICCP point cleanup",
                description:
                  "Reconciled 600 ICCP points with the neighboring BA; 44 stale analogs had been driving false ACE contributions.",
                skills: ["SCADA", "Grid Operations"],
              },
              {
                name: "Real-time market coordination",
                description:
                  "Wrote the desk's first real-time coordination note with the market group so a constraint and a price spike used the same outage ticket.",
                skills: ["Power Markets", "Workforce Planning"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Oregon State University",
        degree: "B.S. Electrical Engineering",
        dateAwarded: "2013-06-15",
      },
    ],
    certifications: [
      {
        name: "NERC Reliability Coordinator Certification",
        issuer: "North American Electric Reliability Corporation",
        dateAwarded: "2016-08-19",
        credentialId: "NERC-RC-HG-22014",
      },
      {
        name: "NERC Balancing, Interchange, and Transmission Operator",
        issuer: "North American Electric Reliability Corporation",
        dateAwarded: "2014-02-07",
        credentialId: "NERC-BIT-HG-11802",
      },
    ],
    featuredProjects: [
      {
        name: "BAAL and CIP operating brief",
        description:
          "<p>Cascadia Grid Cooperative's public brief on BAAL performance, alarm rationalization, and the CIP evidence path that survived a two-cycle gap closeout.</p>",
        links: [
          { label: "Operating brief", url: "https://www.example.com/cascadia-baal" },
          { label: "CIP evidence note", url: "https://www.example.com/cascadia-cip" },
        ],
        skills: ["Grid Operations", "NERC Compliance", "SCADA"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "energy-utilities",
    name: "Yusuf Rahman",
    title: "Process Safety Engineer",
    location: "Baton Rouge, LA",
    siteDescription:
      "Process safety engineer in Baton Rouge running PSM, PHAs, and MOC for refiners that cannot treat a recommendation as a suggestion.",
    summary:
      "<p>Process safety engineer in Baton Rouge. I run PSM, PHAs, and MOC for refiners, and I treat an open recommendation as a leak until it is closed with evidence.</p><p>At Bayou Refining Safety I cut overdue PHA recommendations 71% across two sites and closed a PSI gap that had sat through two turnarounds. Earlier unit work taught me that a HAZOP sticky note is not a safeguard.</p>",
    socials: [
      { platform: "linkedin.com", ref: "yusuf-rahman-psm" },
      { platform: "website", ref: "https://yusufrahman.example.com" },
    ],
    skills: [
      {
        name: "Process Safety",
        description:
          "Run PSM programs for refiners: PHA, LOPA, MOC, PSI, and the recommendation tracking that decides whether a unit starts up.",
        yearStarted: 2014,
      },
      {
        name: "Quality Management",
        description:
          "Keep PSI, P&IDs, and procedures on the same revision so a PHA is not studying last turnaround's drawing.",
        yearStarted: 2015,
      },
      {
        name: "Internal Controls",
        description:
          "Design MOC and action-item controls with owners and due dates an auditor can sample without a war story.",
        yearStarted: 2016,
      },
      {
        name: "Risk Rating",
        description:
          "Score scenarios and recommendations so a high-consequence LOPA gap is not behind a housekeeping item.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold operations, maintenance, and the unit superintendent when a recommendation would slip past a turnaround gate.",
        yearStarted: 2014,
      },
      {
        name: "Change Management",
        description:
          "Run MOC on unit changes so a 'temporary' hose is not still there at the next PHA.",
        yearStarted: 2015,
      },
      {
        name: "Program Management",
        description:
          "Schedule PHA revalidations, PSI audits, and training so two sites are not due in the same month with one facilitator.",
        yearStarted: 2018,
      },
      {
        name: "Safety Management Systems",
        description:
          "Connect PSM to the site SMS so incident learnings become safeguards, not a slide at the safety meeting.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Bayou Refining Safety",
        description:
          "Process-safety group supporting two Gulf Coast refineries from a Baton Rouge office.",
        location: "Baton Rouge, LA",
        startDate: "2021-04-12",
        positions: [
          {
            title: "Process Safety Engineer",
            startDate: "2021-04-12",
            projects: [
              {
                name: "PHA recommendation closeout",
                description:
                  "Cleared a 210-item overdue backlog across two sites. Overdues fell 71% in 14 months; high-consequence LOPA gaps went from 18 to 2 before the next turnaround.",
                skills: ["Process Safety", "Risk Rating", "Program Management"],
              },
              {
                name: "PSI and P&ID reconciliation",
                description:
                  "Reconciled PSI against as-built P&IDs on a crude unit that had drifted through two turnarounds. Closed 64 drawing gaps before the PHA revalidation.",
                skills: ["Quality Management", "Internal Controls", "Change Management"],
              },
              {
                name: "Turnaround MOC gate",
                description:
                  "Added a process-safety gate to the turnaround schedule so 11 open recommendations could not be deferred past startup.",
                skills: ["Stakeholder Management", "Safety Management Systems"],
              },
            ],
          },
        ],
      },
      {
        name: "Red Stick Unit Safety",
        description:
          "In-house process safety for a Baton Rouge refinery, embedded on crude and hydroprocessing units.",
        location: "Baton Rouge, LA",
        startDate: "2014-07-07",
        endDate: "2021-04-02",
        positions: [
          {
            title: "Unit Process Safety Engineer",
            startDate: "2017-09-05",
            endDate: "2021-04-02",
            projects: [
              {
                name: "Hydroprocessing HAZOP/LOPA",
                description:
                  "Facilitated a HAZOP/LOPA on a hydroprocessing unit after a catalyst change. Identified 9 IPLs that existed only on paper; 7 were made real before restart.",
                skills: ["Process Safety", "Risk Rating", "Stakeholder Management"],
              },
              {
                name: "Temporary MOC purge",
                description:
                  "Closed 38 'temporary' MOCs older than 90 days, including hoses and blinds that had become the normal line-up.",
                skills: ["Change Management", "Internal Controls"],
              },
            ],
          },
          {
            title: "Process Safety Analyst",
            startDate: "2014-07-07",
            endDate: "2017-09-01",
            projects: [
              {
                name: "Action-item tracker",
                description:
                  "Replaced a shared spreadsheet with an owned tracker. On-time closure rose from 54% to 88% in a year.",
                skills: ["Program Management", "Quality Management"],
              },
              {
                name: "Incident-to-safeguard reviews",
                description:
                  "Mapped 12 unit incidents to missing safeguards and fed them into the next PHA instead of a safety-meeting slide.",
                skills: ["Safety Management Systems", "Process Safety"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Louisiana State University",
        degree: "B.S. Chemical Engineering",
        dateAwarded: "2014-05-16",
      },
    ],
    certifications: [
      {
        name: "Certified Safety Professional (CSP)",
        issuer: "Board of Certified Safety Professionals",
        dateAwarded: "2019-11-08",
        credentialId: "CSP-YR-55201",
      },
      {
        name: "PHA Facilitator (HAZOP/LOPA)",
        issuer: "ABS Group",
        dateAwarded: "2018-03-22",
        credentialId: "PHA-YR-11844",
      },
    ],
    featuredProjects: [
      {
        name: "PSM closeout playbook",
        description:
          "<p>Bayou Refining Safety's playbook for overdue PHA recommendations, PSI reconciliation, and the turnaround gate that keeps a high-consequence LOPA gap from slipping past startup.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/bayou-psm-playbook" },
          { label: "MOC gate", url: "https://www.example.com/bayou-moc-gate" },
        ],
        skills: ["Process Safety", "Program Management", "Change Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "telecommunications",
    name: "Bianca Moretti",
    title: "RF Planning Engineer",
    location: "Dallas, TX",
    siteDescription:
      "RF planning engineer in Dallas building 5G RAN layers — PCI, power, and the sites that have to carry mid-band without wrecking the LTE neighbor list.",
    summary:
      "<p>RF planning engineer in Dallas. I design 5G RAN layers — site selection, PCI, power, and neighbor lists — and I do not call a cluster 'on air' until the drive test matches the prediction.</p><p>At Lone Star Spectrum I planned 1,140 mid-band sites with a 9% prediction-to-drive error on RSRP and a 22% drop in intra-frequency interference after a PCI and PCI-confusion cleanup. Earlier LTE work taught me that a pretty coverage plot is not a capacity plan.</p>",
    socials: [
      { platform: "linkedin.com", ref: "bianca-moretti" },
      { platform: "github.com", ref: "bmoretti" },
      { platform: "website", ref: "https://biancamoretti.example.com" },
    ],
    skills: [
      {
        name: "5G RAN Planning",
        description:
          "Plan mid-band and low-band 5G layers: site selection, PCI, power, and the neighbor lists that keep a cluster clean.",
        yearStarted: 2019,
      },
      {
        name: "Spectrum Management",
        description:
          "Assign and police PCI, PRACH, and channel plans so a new carrier does not collide with the one next door.",
        yearStarted: 2016,
      },
      {
        name: "Network Planning",
        description:
          "Build the multi-year site and carrier plan against traffic, backhaul, and the search-ring reality on the ground.",
        yearStarted: 2015,
      },
      {
        name: "Network Optimization",
        description:
          "Tune tilt, power, and handover after on-air so a prediction error does not live in the KPI for a year.",
        yearStarted: 2015,
      },
      {
        name: "Python",
        description:
          "Batch PCI audits, drive-test joins, and interference reports instead of a weekend in a spreadsheet.",
        yearStarted: 2017,
      },
      {
        name: "Market Analysis",
        description:
          "Read competitor coverage and traffic growth so a new site is not built where the other carrier already won.",
        yearStarted: 2018,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep RF, site-dev, and the NOC on one on-air date when a landlord and a fiber splice are both late.",
        yearStarted: 2016,
      },
      {
        name: "System Design",
        description:
          "Design the RAN layer stack — low-band coverage, mid-band capacity, and the small-cell overlay — as one system.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Lone Star Spectrum",
        description:
          "Dallas RAN planning group building 5G mid-band and LTE overlay for a regional wireless operator.",
        location: "Dallas, TX",
        startDate: "2021-02-01",
        positions: [
          {
            title: "RF Planning Engineer",
            startDate: "2021-02-01",
            projects: [
              {
                name: "Mid-band 5G cluster plan",
                description:
                  "Planned 1,140 mid-band sites across DFW. Prediction-to-drive RSRP error landed at 9%; first-month accessibility held above 99.2% on 18 of 20 clusters.",
                skills: ["5G RAN Planning", "Network Planning", "System Design"],
              },
              {
                name: "PCI and interference cleanup",
                description:
                  "Audited PCI and PCI-confusion in Python across 2,400 cells. Intra-frequency interference tickets dropped 22% in the quarter after retune.",
                skills: ["Spectrum Management", "Python", "Network Optimization"],
              },
              {
                name: "Competitor coverage overlay",
                description:
                  "Mapped competitor mid-band against our search rings so 40 proposed sites were moved before lease spend.",
                skills: ["Market Analysis", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Trinity LTE Design",
        description:
          "RF design shop doing LTE site selection and optimization for North Texas markets.",
        location: "Dallas, TX",
        startDate: "2015-08-03",
        endDate: "2021-01-22",
        positions: [
          {
            title: "RF Design Engineer",
            startDate: "2018-03-05",
            endDate: "2021-01-22",
            projects: [
              {
                name: "LTE 1900 overlay",
                description:
                  "Designed a 1900 overlay on 310 sites. Post-launch dropped-call rate fell 18% in the target zip codes after a tilt pass.",
                skills: ["Network Optimization", "Network Planning", "Spectrum Management"],
              },
              {
                name: "Small-cell overlay study",
                description:
                  "Sized a 90-node small-cell overlay for a downtown grid. Traffic offload hit 14% of busy-hour volume in six months.",
                skills: ["System Design", "5G RAN Planning", "Market Analysis"],
              },
            ],
          },
          {
            title: "RF Analyst",
            startDate: "2015-08-03",
            endDate: "2018-03-02",
            projects: [
              {
                name: "Drive-test join toolkit",
                description:
                  "Built the Python join of prediction and drive-test that the planning team still uses for cluster acceptance.",
                skills: ["Python", "Network Optimization"],
              },
              {
                name: "Neighbor-list hygiene",
                description:
                  "Cleaned missing and one-way neighbors on 800 cells; handover failures dropped 11% on the next cluster.",
                skills: ["Spectrum Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Southern Methodist University",
        degree: "M.S. Electrical Engineering",
        dateAwarded: "2015-05-16",
      },
      {
        school: "University of Texas at Dallas",
        degree: "B.S. Electrical Engineering",
        dateAwarded: "2013-05-18",
      },
    ],
    certifications: [
      {
        name: "Certified Wireless Network Expert (CWNE)",
        issuer: "Certified Wireless Network Professionals",
        dateAwarded: "2020-06-12",
        credentialId: "CWNE-BM-4418",
      },
      {
        name: "5G RAN Planning Certificate",
        issuer: "IEEE Communications Society",
        dateAwarded: "2021-09-03",
        credentialId: "IEEE-5G-BM-1022",
      },
    ],
    featuredProjects: [
      {
        name: "DFW mid-band plan",
        description:
          "<p>How Lone Star Spectrum planned 1,140 mid-band 5G sites in DFW: prediction-to-drive error, PCI hygiene, and the competitor overlay that moved 40 search rings before lease spend.</p>",
        links: [
          { label: "Cluster plan", url: "https://www.example.com/lonestar-midband" },
          { label: "PCI audit", url: "https://www.example.com/lonestar-pci" },
        ],
        skills: ["5G RAN Planning", "Spectrum Management", "Network Optimization"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "telecommunications",
    name: "Kwame Boateng",
    title: "Network Operations Manager",
    location: "Atlanta, GA",
    siteDescription:
      "NOC and network-planning manager in Atlanta who keeps a multi-vendor core and transport network inside its SLAs.",
    summary:
      "<p>Network operations manager in Atlanta. I run a NOC and the planning that sits behind it so a fiber cut or a core failover is a drill, not a press release.</p><p>At Peachtree Network Ops I cut Sev-1 MTTR from 3.4 hours to 71 minutes and took change-related incidents down 44%. Earlier NOC nights taught me that a green dashboard is not the same as a tested failover.</p>",
    socials: [
      { platform: "linkedin.com", ref: "kwame-boateng" },
      { platform: "website", ref: "https://kwameboateng.example.com" },
      { platform: "medium.com", ref: "kwame-boateng" },
    ],
    skills: [
      {
        name: "Network Planning",
        description:
          "Plan core, transport, and peering capacity so a busy season is not the first time we notice a 90% link.",
        yearStarted: 2013,
      },
      {
        name: "Network Optimization",
        description:
          "Tune IGP, peering, and protection paths so failover is the designed path, not the surprising one.",
        yearStarted: 2014,
      },
      {
        name: "OSS/BSS",
        description:
          "Keep inventory, tickets, and service orders aligned so the NOC is not troubleshooting a circuit that was never turned up.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold vendors, field, and the product team when a Sev-1 is also a customer-commitment problem.",
        yearStarted: 2014,
      },
      {
        name: "Workforce Planning",
        description:
          "Staff a 24x7 NOC with a follow-the-sun bench and a training path that is not one resignation from a hole.",
        yearStarted: 2018,
      },
      {
        name: "Change Management",
        description:
          "Run a change calendar with freeze windows and backout plans that people actually use.",
        yearStarted: 2015,
      },
      {
        name: "Technical Leadership",
        description:
          "Lead a 28-person NOC and planning group and the after-action that changes a runbook.",
        yearStarted: 2019,
      },
      {
        name: "Observability",
        description:
          "Measure latency, loss, and capacity the same way we measure ticket age — with a target, not a vibe.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Peachtree Network Ops",
        description:
          "Atlanta NOC and network-planning organization for a regional fiber and wireless backhaul operator.",
        location: "Atlanta, GA",
        startDate: "2020-07-06",
        positions: [
          {
            title: "Network Operations Manager",
            startDate: "2020-07-06",
            projects: [
              {
                name: "Sev-1 MTTR program",
                description:
                  "Rewrote Sev-1 runbooks, vendor bridges, and paging. MTTR fell from 3.4 hours to 71 minutes on 46 events; customer-facing SLA credits dropped 58%.",
                skills: ["Technical Leadership", "Observability", "Stakeholder Management"],
              },
              {
                name: "Change-related incident cut",
                description:
                  "Installed a freeze calendar, peer review, and mandatory backout. Change-related Sev-2s fell 44% in two quarters.",
                skills: ["Change Management", "OSS/BSS", "Workforce Planning"],
              },
              {
                name: "Core capacity plan",
                description:
                  "Built an 18-month core and peering plan that pulled two 90% links forward a quarter before a football-season traffic spike.",
                skills: ["Network Planning", "Network Optimization"],
              },
            ],
          },
        ],
      },
      {
        name: "Piedmont Transport NOC",
        description: "Multi-vendor transport NOC running DWDM and IP/MPLS for Southeast carriers.",
        location: "Atlanta, GA",
        startDate: "2013-06-10",
        endDate: "2020-06-26",
        positions: [
          {
            title: "NOC Supervisor",
            startDate: "2017-02-06",
            endDate: "2020-06-26",
            projects: [
              {
                name: "Failover drill calendar",
                description:
                  "Ran quarterly core and DWDM failover drills. Two drills found protection paths that only existed in inventory; both were fixed before a real cut.",
                skills: ["Network Optimization", "OSS/BSS", "Change Management"],
              },
              {
                name: "Follow-the-sun staffing",
                description:
                  "Moved the desk to a follow-the-sun model with a partner NOC. Overtime fell 21% and overnight Sev-1 page-ack time halved.",
                skills: ["Workforce Planning", "Technical Leadership"],
              },
            ],
          },
          {
            title: "NOC Engineer",
            startDate: "2013-06-10",
            endDate: "2017-02-03",
            projects: [
              {
                name: "Circuit inventory cleanup",
                description:
                  "Reconciled 1,800 transport circuits against the OSS. 9% were undocumented or wrongly protected; the next fiber cut failed over as designed.",
                skills: ["OSS/BSS", "Network Planning"],
              },
              {
                name: "Latency SLO dashboards",
                description:
                  "Stood up latency and loss SLOs on 40 on-net paths so the NOC stopped arguing about 'feels slow.'",
                skills: ["Observability", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgia Institute of Technology",
        degree: "B.S. Computer Engineering",
        dateAwarded: "2013-05-04",
      },
    ],
    certifications: [
      {
        name: "Cisco CCNP Enterprise",
        issuer: "Cisco",
        dateAwarded: "2017-08-18",
        credentialId: "CCNP-KB-33910",
      },
      {
        name: "ITIL 4 Managing Professional",
        issuer: "AXELOS",
        dateAwarded: "2021-01-22",
        credentialId: "ITIL4-KB-55201",
      },
    ],
    featuredProjects: [
      {
        name: "NOC Sev-1 playbook",
        description:
          "<p>Peachtree Network Ops' Sev-1 playbook: who is on the bridge, how MTTR is measured, and the change freeze that cut change-related incidents 44%.</p>",
        links: [
          { label: "Playbook", url: "https://www.example.com/peachtree-sev1" },
          { label: "Capacity plan", url: "https://www.example.com/peachtree-capacity" },
        ],
        skills: ["Technical Leadership", "Network Planning", "Change Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "telecommunications",
    name: "Erin Walsh",
    title: "Product Manager, Fiber",
    location: "Denver, CO",
    siteDescription:
      "Fiber product manager in Denver who takes FTTH from a construction schedule to a product customers can actually order.",
    summary:
      "<p>Fiber product manager in Denver. I take FTTH from a construction schedule to a product with a price, an install window, and a churn number that is not a surprise.</p><p>At Rockies Fiber Co I launched service in 42,000 passings with 31% take rate at month 12 and install cycle time of 9 days. Earlier planning work taught me that a pretty homepass count is not a product if drop inventory is a rumor.</p>",
    socials: [
      { platform: "linkedin.com", ref: "erin-walsh-fiber" },
      { platform: "website", ref: "https://erinwalsh.example.com" },
      { platform: "medium.com", ref: "erin-walsh" },
    ],
    skills: [
      {
        name: "Fiber Deployment",
        description:
          "Take FTTH from design and construction to a live passing a customer can order — including the drop that everyone forgot.",
        yearStarted: 2016,
      },
      {
        name: "Network Planning",
        description:
          "Sequence markets, headends, and feeder so construction and product launch share a calendar.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold construction, OSS, and the city permit desk when a launch date is also a council meeting.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "Pick overbuild vs. greenfield markets with a take-rate model that survives a competitor price cut.",
        yearStarted: 2017,
      },
      {
        name: "Program Management",
        description:
          "Run a multi-city fiber program with one backlog, one risk register, and one person who can say no.",
        yearStarted: 2018,
      },
      {
        name: "Pipeline Forecasting",
        description:
          "Forecast passings, installs, and churn so finance is not modeling a hockey stick from a permit delay.",
        yearStarted: 2017,
      },
      {
        name: "Relationship Management",
        description:
          "Keep HOAs, municipalities, and the ISP channel from becoming three different launch dates.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Cut a new order-to-install path without losing the 400 orders already in flight.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Rockies Fiber Co",
        description:
          "Denver FTTH builder and ISP launching mid-density neighborhoods and small-city overbuilds.",
        location: "Denver, CO",
        startDate: "2021-01-11",
        positions: [
          {
            title: "Product Manager, Fiber",
            startDate: "2021-01-11",
            projects: [
              {
                name: "42,000-passing launch",
                description:
                  "Launched FTTH in 42,000 passings across four Front Range cities. Month-12 take rate was 31%; install cycle time averaged 9 days after a drop-inventory fix.",
                skills: ["Fiber Deployment", "Program Management", "Pipeline Forecasting"],
              },
              {
                name: "Overbuild market model",
                description:
                  "Built the take-rate and competitor-price model that killed two overbuild markets and funded a third that hit 28% take at month 8.",
                skills: ["Market Analysis", "Network Planning", "Stakeholder Management"],
              },
              {
                name: "Order-to-install cutover",
                description:
                  "Moved order-to-install onto a single OSS path. In-flight orders were not dropped; truck-roll fails from bad addresses fell 36%.",
                skills: ["Change Management", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Front Range Broadband Planning",
        description:
          "Municipal and co-op broadband planning shop supporting Colorado fiber grants and builds.",
        location: "Denver, CO",
        startDate: "2015-09-08",
        endDate: "2020-12-18",
        positions: [
          {
            title: "Fiber Program Manager",
            startDate: "2018-04-02",
            endDate: "2020-12-18",
            projects: [
              {
                name: "Grant-funded town build",
                description:
                  "Ran a 6,200-passing town build on a state grant. Construction finished 5% under budget; every pledged passing was serviceable at closeout.",
                skills: ["Fiber Deployment", "Program Management", "Stakeholder Management"],
              },
              {
                name: "HOA access program",
                description:
                  "Negotiated access with 14 HOAs so a feeder was not stranded behind a locked gate. 11 signed before construction; 3 after a redesigned drop plan.",
                skills: ["Relationship Management", "Network Planning"],
              },
            ],
          },
          {
            title: "Planning Analyst",
            startDate: "2015-09-08",
            endDate: "2018-03-30",
            projects: [
              {
                name: "Passing and take-rate forecast",
                description:
                  "Built the first rolling forecast of passings and installs that finance used for three budget cycles.",
                skills: ["Pipeline Forecasting", "Market Analysis"],
              },
              {
                name: "Permit calendar",
                description:
                  "Mapped city permit SLAs against the construction calendar so two launches stopped slipping a season for a ROW delay.",
                skills: ["Change Management", "Fiber Deployment"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Colorado Boulder",
        degree: "B.S. Business Administration, Operations",
        dateAwarded: "2015-05-09",
      },
    ],
    certifications: [
      {
        name: "Project Management Professional (PMP)",
        issuer: "Project Management Institute",
        dateAwarded: "2019-07-19",
        credentialId: "PMP-EW-228401",
      },
      {
        name: "Broadband Fiber Installer (FOA CFOT)",
        issuer: "Fiber Optic Association",
        dateAwarded: "2017-04-14",
        credentialId: "CFOT-EW-11028",
      },
    ],
    featuredProjects: [
      {
        name: "FTTH launch brief",
        description:
          "<p>How Rockies Fiber Co launched 42,000 passings: take-rate model, drop inventory, and the order-to-install path that cut truck-roll fails 36%.</p>",
        links: [
          { label: "Launch brief", url: "https://www.example.com/rockies-ftth-launch" },
          { label: "Take-rate model", url: "https://www.example.com/rockies-takerate" },
        ],
        skills: ["Fiber Deployment", "Market Analysis", "Pipeline Forecasting"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "telecommunications",
    name: "Soren Lindqvist",
    title: "OSS/BSS Architect",
    location: "Newark, NJ",
    siteDescription:
      "OSS/BSS architect in Newark designing inventory, order, and spectrum-adjacent systems that have to agree with the network they claim to represent.",
    summary:
      "<p>OSS/BSS architect in Newark. I design inventory, order management, and spectrum-adjacent systems so a service order, a radio license, and a live circuit are the same object — not three databases arguing.</p><p>At Hudson OSS Labs I retired two shadow inventories and cut order fallout from 11% to 2.4% on a 180k-subscriber stack. Earlier integration work taught me that a 'source of truth' with a nightly batch is just a delayed rumor.</p>",
    socials: [
      { platform: "linkedin.com", ref: "soren-lindqvist" },
      { platform: "github.com", ref: "slindqvist" },
      { platform: "website", ref: "https://sorenlindqvist.example.com" },
    ],
    skills: [
      {
        name: "OSS/BSS",
        description:
          "Design inventory, order, billing, and assurance so a service exists in the network and in the stack for the same reason.",
        yearStarted: 2013,
      },
      {
        name: "Spectrum Management",
        description:
          "Model licenses, channels, and interference constraints next to the RAN inventory so a retune is not a surprise to the FCC file.",
        yearStarted: 2017,
      },
      {
        name: "System Design",
        description:
          "Draw the domain boundaries — inventory, order, activation — before another point-to-point integration is born.",
        yearStarted: 2014,
      },
      {
        name: "Network Planning",
        description:
          "Feed planned sites and capacity into OSS so construction and activation share an identifier from day one.",
        yearStarted: 2015,
      },
      {
        name: "Python",
        description:
          "Reconcile inventory vs. live network and generate the exception lists that keep a migration honest.",
        yearStarted: 2014,
      },
      {
        name: "Distributed Systems",
        description:
          "Design evented inventory and order flows that survive a downstream timeout without double-activating a port.",
        yearStarted: 2016,
      },
      {
        name: "Technical Leadership",
        description:
          "Lead a 12-person OSS platform group and the vendor conversations that decide what we build vs. what we buy.",
        yearStarted: 2019,
      },
      {
        name: "Requirements Management",
        description:
          "Write requirements a vendor and a network engineer can both test, including the ones about what happens when a license expires.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Hudson OSS Labs",
        description: "Newark OSS/BSS platform group for a multi-state wireless and fiber operator.",
        location: "Newark, NJ",
        startDate: "2020-05-04",
        positions: [
          {
            title: "OSS/BSS Architect",
            startDate: "2020-05-04",
            projects: [
              {
                name: "Inventory consolidation",
                description:
                  "Retired two shadow inventories into one service-and-resource model. Order fallout fell from 11% to 2.4% on a 180k-subscriber stack; activation time dropped from 36 hours to 9.",
                skills: ["OSS/BSS", "System Design", "Distributed Systems"],
              },
              {
                name: "Spectrum-adjacent inventory",
                description:
                  "Modeled licenses, channels, and PCI plans next to RAN inventory. A mid-band retune now updates the FCC file and the neighbor list from the same change ticket.",
                skills: ["Spectrum Management", "Network Planning", "Requirements Management"],
              },
              {
                name: "Reconciliation jobs",
                description:
                  "Shipped Python reconciliation of inventory vs. live EMS. First run found 6,400 ghost circuits; 92% were closed or documented in 10 weeks.",
                skills: ["Python", "Technical Leadership"],
              },
            ],
          },
        ],
      },
      {
        name: "Passaic Integration Works",
        description:
          "OSS integration shop connecting vendor BSS, inventory, and activation for Northeast operators.",
        location: "Newark, NJ",
        startDate: "2013-07-08",
        endDate: "2020-04-24",
        positions: [
          {
            title: "Lead Integration Engineer",
            startDate: "2017-01-09",
            endDate: "2020-04-24",
            projects: [
              {
                name: "Order-to-activate event bus",
                description:
                  "Replaced a nightly batch with evented order-to-activate. Duplicate port activations went from 40 a month to 2; timeout retries became idempotent.",
                skills: ["Distributed Systems", "OSS/BSS", "System Design"],
              },
              {
                name: "Vendor requirements pack",
                description:
                  "Wrote the requirements and acceptance tests for a billing-and-inventory RFP. Two vendors failed the license-expiry scenario before we signed the one that passed.",
                skills: ["Requirements Management", "Spectrum Management", "Technical Leadership"],
              },
            ],
          },
          {
            title: "OSS Engineer",
            startDate: "2013-07-08",
            endDate: "2016-12-30",
            projects: [
              {
                name: "Planned-vs-live site IDs",
                description:
                  "Forced planned sites and live cells onto one identifier. RF planning and the NOC stopped opening tickets on the same site under three names.",
                skills: ["Network Planning", "OSS/BSS"],
              },
              {
                name: "Inventory exception notebook",
                description:
                  "Built the first Python exception notebook that compared inventory to EMS dumps every Monday.",
                skills: ["Python", "System Design"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "New Jersey Institute of Technology",
        degree: "M.S. Information Systems",
        dateAwarded: "2015-05-15",
      },
      {
        school: "Rutgers University",
        degree: "B.S. Computer Science",
        dateAwarded: "2013-05-19",
      },
    ],
    certifications: [
      {
        name: "TM Forum Open Digital Architecture certified",
        issuer: "TM Forum",
        dateAwarded: "2021-06-11",
        credentialId: "TMF-ODA-SL-22019",
      },
      {
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        dateAwarded: "2020-02-07",
        credentialId: "AWS-SAA-SL-44102",
      },
    ],
    featuredProjects: [
      {
        name: "Inventory consolidation brief",
        description:
          "<p>How Hudson OSS Labs retired two shadow inventories: the service-and-resource model, the spectrum-adjacent license object, and the reconciliation that found 6,400 ghost circuits.</p>",
        links: [
          { label: "Architecture brief", url: "https://www.example.com/hudson-inventory" },
          { label: "Reconciliation note", url: "https://www.example.com/hudson-reconcile" },
        ],
        skills: ["OSS/BSS", "Spectrum Management", "System Design"],
      },
    ],
  }),
];
