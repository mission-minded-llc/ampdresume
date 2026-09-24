import { defineProfile } from "../buildProfile";

export const civicProfiles = [
  defineProfile({
    gender: "woman",
    vertical: "higher-education",
    name: "Helen Cho",
    title: "Associate Dean of Academic Affairs",
    location: "Boston, MA",
    siteDescription:
      "Associate dean who treats curriculum as a governed product — outcomes, credit hours, and accreditation evidence in the same ledger.",
    summary:
      "<p>Associate dean who rebuilt Harborwell's general-education map and shepherded two NECHE self-studies without a focused visit. I treat curriculum as a governed product: learning outcomes, credit-hour audit, and faculty workload sit in the same ledger.</p><p>Before Harborwell I ran assessment at Fenwick College, where a 48-program inventory cut overlapping credits 18% and lifted first-year persistence four points. I still teach one seminar a year so the paperwork stays honest.</p>",
    skills: [
      {
        name: "Curriculum Design",
        description:
          "Mapped 62 undergraduate programs to shared outcomes and cut redundant 100-level credits without shrinking majors.",
        yearStarted: 2012,
      },
      {
        name: "Accreditation",
        description:
          "Wrote two NECHE self-studies and trained 14 program chairs to keep evidence folders current between visits.",
        yearStarted: 2013,
      },
      {
        name: "Academic Advising",
        description:
          "Rebuilt first-year advising syllabi so every undeclared student left orientation with a two-year map.",
        yearStarted: 2014,
      },
      {
        name: "Program Evaluation",
        description:
          "Ran a five-year program-review cycle that retired three low-enrollment certificates and reinvested the seats.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Held faculty senate, registrar, and student government in the same room until the gen-ed vote cleared 71%.",
        yearStarted: 2014,
      },
      {
        name: "Change Management",
        description:
          "Staged the Harborwell curriculum cutover over three catalogs so juniors were not stranded mid-requirement.",
        yearStarted: 2016,
      },
      {
        name: "Quality Improvement",
        description:
          "Installed an annual credit-hour sample that dropped documentation exceptions from 11% to 2%.",
        yearStarted: 2015,
      },
      {
        name: "Program Management",
        description:
          "Kept accreditation, catalog, and assessment calendars on one Gantt so summer work did not collide with registration.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Harborwell University",
        description:
          "Private research university in the Fenway. Academic affairs covers undergraduate curriculum, assessment, and the accreditation file.",
        location: "Boston, MA",
        startDate: "2021-07-01",
        positions: [
          {
            title: "Associate Dean of Academic Affairs",
            startDate: "2021-07-01",
            projects: [
              {
                name: "Led the NECHE decennial self-study that closed with no focused visit",
                description:
                  "Coordinated 11 standard teams and 2,400 pieces of evidence across every NECHE criterion, then sat in the mock visit so chairs heard their own gaps before the team did. The commission accepted the report with no focused visit and two commendations on assessment.",
                skills: ["Accreditation", "Program Evaluation", "Stakeholder Management"],
              },
              {
                name: "Redesigned general education so first-years finish the core in 32 credits",
                description:
                  "Collapsed 14 distribution menus into six outcome clusters and walked the map through senate, registrar, and student government in the same room. Faculty senate passed it 71–19; first-year students now finish the core in 32 credits instead of 40, without shrinking any major.",
                skills: ["Curriculum Design", "Change Management", "Academic Advising"],
              },
              {
                name: "Ran the credit-hour audit that dropped documentation exceptions from 11% to 2%",
                description:
                  "Sampled 180 courses across 9 colleges and installed an annual credit-hour file the chairs now update themselves. Documentation exceptions fell from 11% to 2% in two catalog years, and summer documentation work no longer collides with registration.",
                skills: ["Quality Improvement", "Program Management", "Accreditation"],
              },
            ],
          },
        ],
      },
      {
        name: "Fenwick College",
        description:
          "Liberal-arts college in Worcester. Curriculum office sat between the registrar, the provost, and 48 department chairs.",
        location: "Worcester, MA",
        startDate: "2014-08-15",
        endDate: "2021-06-30",
        positions: [
          {
            title: "Director of Curriculum Assessment",
            startDate: "2017-07-01",
            endDate: "2021-06-30",
            projects: [
              {
                name: "Inventoried 48 programs and cut overlapping 100-level credits by 18%",
                description:
                  "Catalogued overlapping requirements across every undergraduate major and put the shared 100-level list in front of 48 chairs before anyone lost a course. Shared credits dropped 18% and released 6 FTE of instructional capacity the provost could reinvest.",
                skills: ["Curriculum Design", "Program Evaluation", "Quality Improvement"],
              },
              {
                name: "Built the first-year advising syllabus that lifted undeclared persistence four points",
                description:
                  "Gave every first-year adviser a common syllabus and a two-year planner so undeclared students left orientation with a map, not a brochure. Persistence from fall to fall rose four points in the undeclared cohort, and the registrar stopped fielding the same add-drop questions in September.",
                skills: ["Academic Advising", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Assistant Professor of Education Policy",
            startDate: "2014-08-15",
            endDate: "2017-06-30",
            projects: [
              {
                name: "Replaced a one-credit orientation hour with a seminar that cut withdrawals",
                description:
                  "Replaced a 1-credit orientation hour with a 3-credit inquiry seminar so first-years met a faculty member before they met the registrar's hold list. Withdrawals in the first semester fell from 9% to 5%, and the seminar still carries the college's writing outcome.",
                skills: ["Curriculum Design", "Academic Advising"],
              },
              {
                name: "Wrote the five-year program-review cycle that retired three low-enrollment certificates",
                description:
                  "Wrote the five-year review template later adopted campus-wide, with a data packet chairs could not ignore and a close-out memo the provost could act on. Three certificates closed; two new minors opened with documented demand instead of a hopeful enrollment slide.",
                skills: ["Program Evaluation", "Program Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Boston University",
        degree: "Ed.D. Higher Education Administration",
        dateAwarded: "2014-05-18",
      },
      {
        school: "University of Massachusetts Amherst",
        degree: "M.Ed. Curriculum and Instruction",
        dateAwarded: "2009-05-24",
      },
    ],
    certifications: [
      {
        name: "NECHE Evaluator Training",
        issuer: "New England Commission of Higher Education",
        dateAwarded: "2018-03-12",
        credentialId: "NECHE-EV-2018-441",
      },
      {
        name: "Quality Matters Peer Reviewer",
        issuer: "Quality Matters",
        dateAwarded: "2016-09-08",
        credentialId: "QM-PR-CHO-2016",
      },
    ],
    featuredProjects: [
      {
        name: "Harborwell undergraduate curriculum atlas and gap watch",
        description:
          "<p>Public map of every undergraduate requirement, outcome, and assessment artifact. Chairs update their own nodes; the dean's office watches the gaps. Accreditation evidence now lives on the same map, so a missing artifact is a gap the chair can see before the visit.</p>",
        skills: ["Curriculum Design", "Accreditation", "Program Management"],
      },
      {
        name: "Fenwick five-year program-review playbook for chairs",
        description:
          "<p>Five-year review kit used by 48 programs: data packet, faculty prompt, and a close-out memo the provost can act on. Chairs who used to invent their own templates now finish in one cycle.</p>",
        skills: ["Program Evaluation", "Quality Improvement"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "higher-education",
    name: "Samuel Wright",
    title: "Director of Institutional Research",
    location: "Ann Arbor, MI",
    siteDescription:
      "IR director who turns IPEDS, enrollment, and budget files into decisions the provost can defend in public.",
    summary:
      "<p>Director of institutional research at Great Lakes Collegium. I keep the census, the common data set, and the board dashboard on one pipeline so a headcount argument never starts from three spreadsheets.</p><p>Earlier I built Huron Valley University's IR shop from a two-person reporting desk into an office that cut the provost's ad-hoc request backlog 60% and published an equity scorecard the faculty senate still cites.</p>",
    skills: [
      {
        name: "Institutional Research",
        description:
          "Own IPEDS, the common data set, and the official census. Board packets now pull from one warehouse instead of 11 shadow files.",
        yearStarted: 2012,
      },
      {
        name: "Python",
        description:
          "Automated census extracts and peer-comparison jobs that used to take three analysts a week each reporting cycle.",
        yearStarted: 2014,
      },
      {
        name: "Program Evaluation",
        description:
          "Designed the collegium's five-question program health check: yield, cost per SCH, outcomes, labor market, and equity gaps.",
        yearStarted: 2015,
      },
      {
        name: "Accreditation",
        description:
          "Supplied HLC evidence tables and the federal compliance worksheet without a last-minute scramble the year of the visit.",
        yearStarted: 2013,
      },
      {
        name: "Financial Reporting",
        description:
          "Reconciled SCH, instructional cost, and net tuition by college so budget hearings used the same numbers as IR.",
        yearStarted: 2016,
      },
      {
        name: "Market Analysis",
        description:
          "Built a 14-peer comparison set the trustees accepted after two years of arguing about Carnegie lookalikes.",
        yearStarted: 2014,
      },
      {
        name: "Quality Improvement",
        description:
          "Cut data-request turnaround from 18 days to 7 and published a service catalog so offices stopped emailing raw dumps.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Sat with enrollment, finance, and faculty senate until the official census date stopped being a political argument.",
        yearStarted: 2013,
      },
    ],
    companies: [
      {
        name: "Great Lakes Collegium",
        description:
          "Public research university. IR reports to the provost and feeds the board, HLC, and the state higher-ed dashboard.",
        location: "Ann Arbor, MI",
        startDate: "2020-09-01",
        positions: [
          {
            title: "Director of Institutional Research",
            startDate: "2020-09-01",
            projects: [
              {
                name: "Built the official census warehouse that ended monthly cabinet headcount fights",
                description:
                  "Collapsed 11 shadow extracts into one Python-built warehouse so IPEDS, the common data set, and the board packet share a timestamp. Census disputes at cabinet dropped from monthly to twice a year, and enrollment stopped arriving with a second spreadsheet.",
                skills: ["Institutional Research", "Python", "Stakeholder Management"],
              },
              {
                name: "Published the board academic dashboard the trustees now use every census",
                description:
                  "Eight metrics, refreshed each census: yield, retention, six-year graduation, net tuition, SCH cost, and three equity gaps. Trustees stopped asking for a side deck, and finance finally used the same net-tuition number IR published each cycle.",
                skills: ["Financial Reporting", "Quality Improvement", "Institutional Research"],
              },
              {
                name: "Delivered HLC evidence tables 90 days early with a clean data chapter",
                description:
                  "Delivered the federal compliance worksheet 90 days early and kept the evidence tables on the same warehouse as the official census. Peer reviewers cited the data integrity chapter as a strength, and the visit year skipped the usual last-minute scramble.",
                skills: ["Accreditation", "Program Evaluation"],
              },
            ],
          },
        ],
      },
      {
        name: "Huron Valley University",
        description:
          "Regional public in Ypsilanti. IR sat under planning and had to earn the right to own official numbers.",
        location: "Ypsilanti, MI",
        startDate: "2015-08-01",
        endDate: "2020-08-14",
        positions: [
          {
            title: "Associate Director of Institutional Research",
            startDate: "2017-07-01",
            endDate: "2020-08-14",
            projects: [
              {
                name: "Published the equity scorecard faculty senate adopted as the annual packet",
                description:
                  "Published first-to-second-year retention and gateway-course gaps by race, Pell, and first-generation status, with the same definitions the official census uses. Faculty senate adopted it as the annual review packet, and deans stopped bringing their own gap tables to the meeting.",
                skills: ["Program Evaluation", "Institutional Research", "Stakeholder Management"],
              },
              {
                name: "Stood up ad-hoc request intake that cut the provost backlog 60%",
                description:
                  "Stood up a ticketed service catalog so offices stopped emailing raw dumps and calling them research. Provost-office backlog fell 60% in 14 months; median turnaround went from 18 days to 7, and IR finally had a queue it could defend.",
                skills: ["Quality Improvement", "Python"],
              },
            ],
          },
          {
            title: "Institutional Research Analyst",
            startDate: "2015-08-01",
            endDate: "2017-06-30",
            projects: [
              {
                name: "Replaced informal peer lists with a 14-institution set trustees voted to keep",
                description:
                  "Replaced an informal list of 'schools we like' with a 14-institution set built on Carnegie, size, and aid mix. The trustees voted to keep it for five years, and peer arguments stopped restarting every budget cycle.",
                skills: ["Market Analysis", "Institutional Research"],
              },
              {
                name: "Tied instructional cost to SCH so two colleges retired low-margin certificates",
                description:
                  "Tied SCH to faculty effort and net tuition so budget hearings used the same file as IR. Two colleges used it to retire low-margin certificates before the next budget, and the cost conversation finally had a denominator.",
                skills: ["Financial Reporting", "Program Evaluation"],
              },
            ],
          },
        ],
      },
      {
        name: "Midland State College",
        description:
          "Community college IR desk. First job after the master's: IPEDS, the fact book, and whatever the president needed by Monday.",
        location: "Midland, MI",
        startDate: "2012-06-01",
        endDate: "2015-07-31",
        positions: [
          {
            title: "Research Analyst",
            startDate: "2012-06-01",
            endDate: "2015-07-31",
            projects: [
              {
                name: "Moved the annual fact book from a June surprise to a March release",
                description:
                  "Moved the annual fact book from a June surprise to a March release aligned with the official census, so the president stopped quoting last year's headcount in April. Campus offices now wait for the book instead of building their own extracts.",
                skills: ["Institutional Research", "Quality Improvement"],
              },
              {
                name: "Tracked the developmental math funnel that let the college cut a redundant sequence",
                description:
                  "Tracked placement-to-gateway completion through the two-course algebra sequence and put the leak in front of the math chair with names, not anecdotes. The college used the file to cut a redundant algebra sequence, and gateway completion finally had a funnel instead of a rumor.",
                skills: ["Program Evaluation", "Python"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Michigan",
        degree: "M.S. Higher Education / Institutional Research",
        dateAwarded: "2012-04-28",
      },
      {
        school: "Michigan State University",
        degree: "B.A. Economics",
        dateAwarded: "2010-05-08",
      },
    ],
    certifications: [
      {
        name: "AIR Foundations of IR",
        issuer: "Association for Institutional Research",
        dateAwarded: "2016-11-04",
        credentialId: "AIR-FIR-2016-882",
      },
      {
        name: "HLC Peer Corps Data Training",
        issuer: "Higher Learning Commission",
        dateAwarded: "2019-02-21",
        credentialId: "HLC-DATA-2019-17",
      },
    ],
    featuredProjects: [
      {
        name: "Great Lakes official census warehouse and IPEDS pipeline",
        description:
          "<p>Python pipeline that turns SIS extracts into the official census, IPEDS, and the board dashboard. One number, one timestamp. Cabinet stopped arguing about which extract was official.</p>",
        skills: ["Institutional Research", "Python", "Financial Reporting"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "higher-education",
    name: "Imani Brooks",
    title: "Director of Student Affairs",
    location: "Atlanta, GA",
    siteDescription:
      "Student-affairs director who rebuilt advising, conduct, and residence life as one pathway instead of three offices.",
    summary:
      "<p>Director of student affairs at Piedmont Ridge University. I pulled advising, conduct, and residence life onto one case map so a student in trouble is not handed across three waiting lists.</p><p>At Oakmere College I cut judicial backlog 40% and raised first-year housing retention three points by treating residence life as an advising site, not a bed inventory. The work is still the 2 a.m. call — the difference is the morning file is already open.</p>",
    skills: [
      {
        name: "Student Affairs",
        description:
          "Run advising, conduct, residence life, and student organizations as one division with a shared case file.",
        yearStarted: 2013,
      },
      {
        name: "Academic Advising",
        description:
          "Moved first-year advising into residence halls two nights a week; undeclared students saw an adviser 12 days sooner.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Kept campus police, counsel, and the faculty conduct board on one protocol after a year of conflicting memos.",
        yearStarted: 2015,
      },
      {
        name: "Organizational Design",
        description:
          "Collapsed four director-level silos into three pathway teams: arrival, persistence, and community standards.",
        yearStarted: 2018,
      },
      {
        name: "Change Management",
        description:
          "Staged the case-management cutover over a single summer so fall move-in did not land on two systems.",
        yearStarted: 2017,
      },
      {
        name: "Relationship Management",
        description:
          "Built a parent-and-family council that now absorbs 70% of the calls that used to hit the dean's cell phone.",
        yearStarted: 2016,
      },
      {
        name: "Program Management",
        description:
          "Ran orientation, welcome week, and the first six weeks as one program with a single after-action review.",
        yearStarted: 2014,
      },
      {
        name: "Workforce Planning",
        description:
          "Rewrote RA and adviser staffing to cover nights without overtime spikes; incident response coverage went to 24/7.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Piedmont Ridge University",
        description:
          "Private university in Atlanta. Student affairs covers undergraduate life, conduct, housing, and the CARE team.",
        location: "Atlanta, GA",
        startDate: "2022-06-01",
        positions: [
          {
            title: "Director of Student Affairs",
            startDate: "2022-06-01",
            projects: [
              {
                name: "Merged advising, conduct, and housing into one CARE map that cut outreach from 9 days to 3",
                description:
                  "Merged advising flags, conduct holds, and housing incidents into one CARE file so a student in trouble is not handed across three waiting lists. Median time from first flag to outreach fell from 9 days to 3, and the morning meeting finally opened one case, not three inboxes.",
                skills: ["Student Affairs", "Organizational Design", "Change Management"],
              },
              {
                name: "Put first-year advisers in residence halls and lifted housing retention three points",
                description:
                  "Put first-year advisers in two halls two evenings a week so undeclared students did not have to find the advising office before they found a planner. They reached a planner 12 days faster; fall-to-spring housing retention rose 3 points, and the halls stopped being only a bed inventory.",
                skills: ["Academic Advising", "Student Affairs", "Workforce Planning"],
              },
              {
                name: "Built the parent and family council that cut dean-cell escalations 70%",
                description:
                  "Stood up a monthly council and a shared FAQ so families heard the same answer the residence director already had. Escalations to the dean's cell dropped 70% in the first academic year, and the 2 a.m. call still happens — it just no longer starts from scratch.",
                skills: ["Relationship Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Oakmere College",
        description:
          "Liberal-arts college south of Atlanta. Dean of students office handled conduct, housing, and student organizations.",
        location: "Decatur, GA",
        startDate: "2016-07-01",
        endDate: "2022-05-20",
        positions: [
          {
            title: "Associate Dean of Students",
            startDate: "2019-08-01",
            endDate: "2022-05-20",
            projects: [
              {
                name: "Rebuilt the conduct calendar and cut the judicial backlog 40%",
                description:
                  "Cut the judicial backlog 40% by giving hearing officers protected hours and a 10-day clock instead of leftover Thursday afternoons. Appeals fell as students saw dates, not delays, and campus police finally had a protocol that matched counsel's memo.",
                skills: ["Student Affairs", "Program Management", "Stakeholder Management"],
              },
              {
                name: "Treated orientation through week six as one program with same-week outreach",
                description:
                  "Treated orientation through the sixth week as one program with a single after-action, not three offices running competing welcome weeks. First-year students who missed two events got a same-week outreach, not a November letter, and the CARE file opened while there was still time to act.",
                skills: ["Program Management", "Academic Advising"],
              },
            ],
          },
          {
            title: "Director of Residence Life",
            startDate: "2016-07-01",
            endDate: "2019-07-31",
            projects: [
              {
                name: "Rewrote RA staffing so every building had overnight coverage without overtime spikes",
                description:
                  "Rewrote duty rosters so every building had a trained responder overnight without a 22% overtime spike, and incident coverage actually went to 24/7 instead of a hope and a cell phone. Night reports finally named a person, not a building.",
                skills: ["Workforce Planning", "Student Affairs"],
              },
              {
                name: "Trained RAs to hand academic flags to advisers and cut mid-semester leaves 11%",
                description:
                  "Trained RAs to spot academic withdrawal signs and hand off to advisers the next morning instead of waiting for a missed class report in week ten. Mid-semester leaves from housing dropped 11%, and residence life stopped pretending a quiet floor was a healthy one.",
                skills: ["Academic Advising", "Change Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Georgia",
        degree: "Ed.D. Student Affairs Leadership",
        dateAwarded: "2019-05-10",
      },
      {
        school: "Spelman College",
        degree: "B.A. Sociology",
        dateAwarded: "2011-05-15",
      },
    ],
    certifications: [
      {
        name: "NASPA Certified Student Affairs Educator",
        issuer: "NASPA",
        dateAwarded: "2020-10-16",
        credentialId: "NASPA-CSAE-BROOKS-2020",
      },
      {
        name: "Title IX Coordinator Training",
        issuer: "ATIXA",
        dateAwarded: "2018-04-09",
        credentialId: "ATIXA-TC-2018-553",
      },
    ],
    featuredProjects: [
      {
        name: "Piedmont Ridge unified CARE case map",
        description:
          "<p>Shared case protocol for advising, housing, and conduct. A student in trouble gets one outreach plan, not three offices guessing. Median time from first flag to outreach fell from nine days to three once the lists merged.</p>",
        skills: ["Student Affairs", "Organizational Design", "Academic Advising"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "higher-education",
    name: "Paolo Ricci",
    title: "Grant Administrator",
    location: "Madison, WI",
    siteDescription:
      "Grant administrator who writes, budgets, and closes sponsored projects without leaving PI's hanging on the drawdown.",
    summary:
      "<p>Grant administrator at Driftless University. I take proposals from the first budget narrative through closeout so PIs are not translating agency rules alone, and sponsored expenditures stay inside the award.</p><p>At Lakeshore Technical Institute I raised proposal hit rate from 18% to 31% and closed a $4.2M backlog of expired awards that finance had been carrying as open. The job is still the FOA — the difference is the file is audit-ready before the visit.</p>",
    skills: [
      {
        name: "Grant Writing",
        description:
          "Wrote or substantially edited 60+ federal and foundation proposals; hit rate at Lakeshore rose from 18% to 31%.",
        yearStarted: 2013,
      },
      {
        name: "Grant Management",
        description:
          "Own post-award: drawdowns, rebudgets, subawards, and closeout. Expired-award backlog fell from $4.2M to under $200K.",
        yearStarted: 2014,
      },
      {
        name: "Budget Formulation",
        description:
          "Build personnel, F&A, and cost-share tables that survive sponsored-programs and agency review on the first pass.",
        yearStarted: 2013,
      },
      {
        name: "Program Evaluation",
        description:
          "Write measurable objectives and reporting calendars PIs can actually keep, then sit in on the annual performance report.",
        yearStarted: 2016,
      },
      {
        name: "Financial Reporting",
        description:
          "Reconcile sponsored expenditures to the general ledger monthly so the FFATA and final FFR are not a June surprise.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep PIs, department chairs, and the controller on one timeline when a site visit or a late subaward lands.",
        yearStarted: 2014,
      },
      {
        name: "Program Management",
        description:
          "Run the proposal calendar 90 days out so multi-college submissions do not collide with the same two grants officers.",
        yearStarted: 2017,
      },
      {
        name: "Nonprofit Finance",
        description:
          "Treat cost share and restricted balances like a nonprofit ledger: promised, booked, and documented for the auditor.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Driftless University",
        description:
          "Public flagship sponsored-programs office. Pre-award and post-award sit together; Ricci owns a STEM and education portfolio.",
        location: "Madison, WI",
        startDate: "2021-01-15",
        positions: [
          {
            title: "Grant Administrator",
            startDate: "2021-01-15",
            projects: [
              {
                name: "Administered a $27M NSF and USDA portfolio and lifted on-time reports to 96%",
                description:
                  "Administer 38 active awards totaling $27M across STEM and education, with drawdowns and rebudgets on the same calendar as the PI. On-time annual reports rose from 74% to 96% after a shared calendar and a 21-day reminder, and sponsored expenditures stayed inside the award.",
                skills: ["Grant Management", "Program Management", "Stakeholder Management"],
              },
              {
                name: "Closed 22 expired awards and returned $180K with auditor-ready documentation",
                description:
                  "Closed 22 expired awards in nine months and returned $180K in unspent funds with documentation the auditor accepted on the first pass. Awards now close inside 90 days of the end date instead of lingering into the next fiscal year as someone else's problem.",
                skills: ["Grant Management", "Financial Reporting", "Nonprofit Finance"],
              },
              {
                name: "Coordinated a $6.4M multi-college NSF bid that awarded on the first submission",
                description:
                  "Led budget and narrative coordination across three colleges for a $6.4M research-traineeship bid so F&A, cost share, and the evaluation plan survived sponsored-programs on the first pass. Awarded on the first submission, and the three chairs stayed on one timeline through the site visit.",
                skills: ["Grant Writing", "Budget Formulation", "Program Evaluation"],
              },
            ],
          },
        ],
      },
      {
        name: "Lakeshore Technical Institute",
        description:
          "Two-year college grants office. One team wrote workforce, NSF ATE, and foundation proposals and then lived with the awards.",
        location: "Cleveland, WI",
        startDate: "2015-03-01",
        endDate: "2021-01-08",
        positions: [
          {
            title: "Senior Grants Officer",
            startDate: "2018-07-01",
            endDate: "2021-01-08",
            projects: [
              {
                name: "Rebuilt proposal review so federal hit rate rose from 18% to 31%",
                description:
                  "Installed a pink-team review and a 10-day budget lock so narratives stopped arriving with a personnel table the controller would not sign. Hit rate on competitive federal proposals rose from 18% to 31% over three cycles, and PIs stopped treating the FOA as optional reading.",
                skills: ["Grant Writing", "Budget Formulation", "Program Evaluation"],
              },
              {
                name: "Closed a $4.2M expired-award backlog and wrote the controller's closeout SOP",
                description:
                  "Finance had $4.2M sitting in expired funds that nobody wanted to touch after the PI left. Closed the file to under $200K and wrote the closeout SOP the controller still uses, with drawdown and FFATA steps the next officer can follow without a phone call.",
                skills: ["Grant Management", "Financial Reporting", "Nonprofit Finance"],
              },
            ],
          },
          {
            title: "Grants Specialist",
            startDate: "2015-03-01",
            endDate: "2018-06-30",
            projects: [
              {
                name: "Wrote the budget and evaluation plan for the institute's first NSF ATE award",
                description:
                  "Wrote the budget narrative and evaluation plan for a technician-education grant the institute had never won before. $900K over three years; the PI kept the reporting calendar, and workforce partners finally appeared in the objectives instead of the letters-of-support appendix.",
                skills: ["Grant Writing", "Program Evaluation"],
              },
              {
                name: "Standardized subaward packets and cut late subrecipient invoices from 28% to 6%",
                description:
                  "Standardized subrecipient risk review and FFATA filing so a late partner did not become a June surprise on the FFR. Late subaward invoices dropped from 28% to 6%, and department chairs stopped signing packets they had not read.",
                skills: ["Grant Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Wisconsin–Madison",
        degree: "M.P.A. Public Affairs",
        dateAwarded: "2014-05-17",
      },
      {
        school: "University of Wisconsin–Milwaukee",
        degree: "B.A. Political Science",
        dateAwarded: "2011-05-22",
      },
    ],
    certifications: [
      {
        name: "Certified Research Administrator",
        issuer: "Research Administrators Certification Council",
        dateAwarded: "2019-06-14",
        credentialId: "CRA-2019-RICCI-4412",
      },
      {
        name: "Uniform Guidance Workshop",
        issuer: "National Council of University Research Administrators",
        dateAwarded: "2017-10-03",
        credentialId: "NCURA-UG-2017-88",
      },
    ],
    featuredProjects: [
      {
        name: "Driftless sponsored-award closeout desk and PI packet",
        description:
          "<p>Shared closeout checklist, drawdown calendar, and PI packet. Awards now close inside 90 days of the end date instead of lingering into the next fiscal year. Finance stopped carrying expired awards as open while the PI was still on campus.</p>",
        skills: ["Grant Management", "Financial Reporting", "Program Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "architecture",
    name: "Camille Renard",
    title: "Project Architect",
    location: "New York, NY",
    siteDescription:
      "Project architect who takes cultural and commercial work from design development through a coordinated Revit set.",
    summary:
      "<p>Project architect at Atelier Meridian. I own design development and the Revit model from SD handoff through CA, and I treat coordination as a weekly discipline, not a late-phase rescue.</p><p>At Langford + Voss I delivered two Midtown commercial interiors and a Brooklyn arts annex on GMP with RFI rates 30% below the studio average. The drawings still have to be beautiful — they also have to build.</p>",
    skills: [
      {
        name: "Revit",
        description:
          "Lead modeler on 80,000–220,000 sf commercial and cultural jobs; worksets, typical details, and a clash log the GC recognizes.",
        yearStarted: 2014,
      },
      {
        name: "Design Development",
        description:
          "Take schematic parti through materials, assemblies, and a coordinated DD set the owner can price.",
        yearStarted: 2015,
      },
      {
        name: "Construction Documents",
        description:
          "Produce permit and GMP sets with sheet indexes the reviewer can follow and details the shop can build.",
        yearStarted: 2014,
      },
      {
        name: "Construction Administration",
        description:
          "Run OAC, submittals, and RFIs. Average RFI cycle on my jobs is 6 days, not the studio's old 11.",
        yearStarted: 2016,
      },
      {
        name: "Building Codes",
        description:
          "Egress, occupancy, and accessibility reviews before DD, so the code consultant is confirming, not redesigning.",
        yearStarted: 2015,
      },
      {
        name: "AutoCAD",
        description:
          "Still the right tool for site overlays and consultant backgrounds that arrive as CAD, not models.",
        yearStarted: 2012,
      },
      {
        name: "MEP Coordination",
        description:
          "Weekly clash sessions with mechanical and electrical; ceiling conflicts dropped 40% between DD and IFC on the last two jobs.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold owner, GC, and consultants to a decision log so finishes do not reopen after the GMP.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Atelier Meridian",
        description:
          "45-person architecture studio in Hudson Square. Cultural, commercial interior, and adaptive-reuse work.",
        location: "New York, NY",
        startDate: "2022-04-01",
        positions: [
          {
            title: "Project Architect",
            startDate: "2022-04-01",
            projects: [
              {
                name: "Led Harbor Pier Arts Annex from design development through 210 closed RFIs",
                description:
                  "68,000 sf adaptive reuse of a 1920s pier shed on the Brooklyn waterfront into galleries, education, and a public hall. Led DD through CA; coordinated structure and MEP in Revit and closed 210 RFIs in 11 months without turning coordination into a late-phase rescue.",
                skills: ["Revit", "Design Development", "Construction Administration"],
              },
              {
                name: "Cleared the West 26th loft on the second DOB filing and cut ceiling clashes 40%",
                description:
                  "142,000 sf multi-tenant loft conversion with an egress and accessibility package that went to DOB before DD, not after the first rejection. Building-code review cleared on the second filing; ceiling coordination cut clashes 40% from DD to IFC, and the GC recognized the clash log.",
                skills: ["Building Codes", "MEP Coordination", "Construction Documents"],
              },
              {
                name: "Rebuilt the studio typical-detail library and cut junior redline hours 15%",
                description:
                  "Rebuilt 80 typical wall, door, and ceiling details as a shared Revit library so juniors stopped redrawing the same head condition on every job. Junior hours on redlines fell about 15% the next two jobs, and the sheet index finally matched what the shop was building.",
                skills: ["Revit", "Construction Documents", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Langford + Voss Architects",
        description:
          "Midtown commercial practice. Interiors, lobby renovations, and the occasional core-and-shell punch.",
        location: "New York, NY",
        startDate: "2015-06-01",
        endDate: "2022-03-18",
        positions: [
          {
            title: "Project Architect",
            startDate: "2019-01-07",
            endDate: "2022-03-18",
            projects: [
              {
                name: "Delivered the Fifth Avenue lobby renovation 30% below the studio RFI rate",
                description:
                  "22,000 sf lobby, conference, and amenity renovation on GMP, with a decision log that kept finishes from reopening after the number locked. RFI rate landed 30% below the studio average; CA closed two weeks ahead of the TCO target, and the owner still got the lobby they priced.",
                skills: [
                  "Construction Administration",
                  "Design Development",
                  "Stakeholder Management",
                ],
              },
              {
                name: "Produced the Bryant Park tenant-stack CD set with one ceiling revision",
                description:
                  "Four floors of speculative office with MEP risers coordinated before the first tenant's architect arrived with a ceiling they could not build. Produced the CD set; the first tenant took occupancy with one ceiling revision, and the typical details survived the shop drawings.",
                skills: ["Construction Documents", "MEP Coordination", "Revit"],
              },
            ],
          },
          {
            title: "Architectural Designer",
            startDate: "2015-06-01",
            endDate: "2018-12-31",
            projects: [
              {
                name: "Ran 30-plus Madison Avenue test fits that survived landlord review unchanged",
                description:
                  "Ran 30+ test fits in AutoCAD and Revit for a 400,000 sf tower, checking egress and occupancy before the broker promised a headcount. Two tenants signed on plans that survived landlord review unchanged, and the rest at least died on a drawing instead of a tour.",
                skills: ["AutoCAD", "Revit", "Building Codes"],
              },
              {
                name: "Drew the core restroom typical that cleared accessibility comments to zero",
                description:
                  "Drew the restroom typical later used on three subsequent jobs, with clearances the code consultant could check without a redline novel. Accessibility comments dropped to zero after the second revision, and interiors stopped inventing a new lavatory layout on every floor.",
                skills: ["Construction Documents", "Building Codes"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Columbia University GSAPP",
        degree: "M.Arch",
        dateAwarded: "2015-05-20",
      },
      {
        school: "McGill University",
        degree: "B.Sc. Architecture",
        dateAwarded: "2012-05-30",
      },
    ],
    certifications: [
      {
        name: "Registered Architect",
        issuer: "New York State Education Department",
        dateAwarded: "2019-08-22",
        credentialId: "NY-RA-041992",
      },
      {
        name: "NCARB Certificate",
        issuer: "National Council of Architectural Registration Boards",
        dateAwarded: "2020-01-15",
        credentialId: "NCARB-RENARD-88341",
      },
    ],
    featuredProjects: [
      {
        name: "Harbor Pier Arts Annex adaptive-reuse drawing set",
        description:
          "<p>Adaptive reuse of a 1920s pier shed into galleries, education, and a public hall. I owned the Revit model from DD through CA. Structure and MEP stayed in the same model, and 210 RFIs closed in eleven months.</p>",
        skills: ["Revit", "Design Development", "Construction Administration"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "architecture",
    name: "Diego Morales",
    title: "Urban Designer",
    location: "Los Angeles, CA",
    siteDescription:
      "Urban designer who turns corridor plans and specific plans into streets, blocks, and public space a city can adopt.",
    summary:
      "<p>Urban designer at Civic Grid Studio. I work the scale between a specific plan and a curb: street sections, block structure, and the public-space program a planning commission can vote on.</p><p>At Pacific Rim Urban Works I led two corridor plans that unlocked 4,200 housing units and 18 acres of open space without a successful CEQA challenge. The render is the argument; the adopted map is the work.</p>",
    skills: [
      {
        name: "Urban Design",
        description:
          "Street, block, and public-space frameworks for corridors and specific plans. Two adopted plans unlocked 4,200 units.",
        yearStarted: 2013,
      },
      {
        name: "Sustainable Design",
        description:
          "Shade, stormwater, and tree-canopy standards written into the regulating plan, not left as a LEED appendix.",
        yearStarted: 2015,
      },
      {
        name: "Design Development",
        description:
          "Take a vision plan through dimensions, materials, and a kit of parts public works can maintain.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Run bilingual workshops and property-owner hours so the hearing is not the first time a merchant sees the curb cut.",
        yearStarted: 2014,
      },
      {
        name: "Market Analysis",
        description:
          "Test unit mix and ground-floor retail against absorption so the form-based code is not a vacant podium.",
        yearStarted: 2016,
      },
      {
        name: "AutoCAD",
        description:
          "Production drawings for street sections, right-of-way, and the exhibits planning staff attach to the ordinance.",
        yearStarted: 2011,
      },
      {
        name: "Revit",
        description:
          "Massing and typical-block models when the city needs a 3D argument, not just a plan view.",
        yearStarted: 2016,
      },
      {
        name: "Program Management",
        description:
          "Keep city staff, traffic, and the EIR consultant on one schedule so the hearing date does not slip twice.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Civic Grid Studio",
        description:
          "Los Angeles urban design practice. Specific plans, corridor frameworks, and campus-scale public space.",
        location: "Los Angeles, CA",
        startDate: "2021-03-01",
        positions: [
          {
            title: "Urban Designer",
            startDate: "2021-03-01",
            projects: [
              {
                name: "Wrote the Vermont Corridor specific plan that unlocked 2,100 housing units",
                description:
                  "3.2-mile corridor framework adopted in 2024, with a form-based code and street sections public works would maintain. The map supports 2,100 units and a continuous shade canopy standard, and the hearing was not the first time merchants saw their own curb.",
                skills: ["Urban Design", "Sustainable Design", "Stakeholder Management"],
              },
              {
                name: "Reset Sepulveda civic-block retail from 80% to 45% so the frontage could lease",
                description:
                  "Four-block civic and housing mix next to a new Metro station, tested against absorption instead of a rendering full of cafes. Market analysis reset ground-floor retail from 80% to 45% so the frontage could lease, and the typical-block model survived the planning commission.",
                skills: ["Market Analysis", "Design Development", "Revit"],
              },
              {
                name: "Designed the public-works kit of parts the bureau would actually maintain",
                description:
                  "Typical benches, tree wells, and lighting the bureau would maintain, not a furniture catalog the city would rip out in year three. AutoCAD exhibits attached to the ordinance without a rewrite, and the kit of parts survived public-works review intact.",
                skills: ["AutoCAD", "Design Development", "Program Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Pacific Rim Urban Works",
        description:
          "Regional planning and urban design shop. Corridor plans, downtown specific plans, and campus frameworks.",
        location: "Pasadena, CA",
        startDate: "2014-09-01",
        endDate: "2021-02-19",
        positions: [
          {
            title: "Associate Urban Designer",
            startDate: "2018-04-01",
            endDate: "2021-02-19",
            projects: [
              {
                name: "Led the Long Beach boulevard plan that unlocked 2,100 units without a CEQA loss",
                description:
                  "Unlocked 2,100 housing units and 11 acres of open space on a corridor that had been stuck in vision-plan mode. No successful CEQA challenge; the street sections survived public works review intact, and the adopted map — not the render — is what the city is building.",
                skills: ["Urban Design", "Program Management", "Stakeholder Management"],
              },
              {
                name: "Wrote the El Monte downtown code that entitled two projects in 14 months",
                description:
                  "Form-based code and a 12-block regulating plan with a unit mix that could actually absorb, not a vacant podium with a pretty section. First two projects entitled under the code in 14 months, and planning staff attached the exhibits without a second consultant pass.",
                skills: ["Urban Design", "Market Analysis", "AutoCAD"],
              },
            ],
          },
          {
            title: "Urban Designer",
            startDate: "2014-09-01",
            endDate: "2018-03-31",
            projects: [
              {
                name: "Planned the San Gabriel campus framework that cut surface parking 22%",
                description:
                  "Community-college campus plan with a pedestrian spine, 18 acres of open space, and a parking district that cut surface lots 22%. Shade and stormwater standards sat in the regulating plan, not a LEED appendix, and the college could phase the spine without stranded lots.",
                skills: ["Sustainable Design", "Urban Design", "Design Development"],
              },
              {
                name: "Ran bilingual corridor workshops that dropped property-owner opposition at hearing",
                description:
                  "Twelve workshops in English and Spanish, plus property-owner hours, so the hearing was not the first time a merchant saw the curb cut. Property-owner opposition at hearing dropped after they saw their own curb in section, and the coalition letter matched what the field could live with.",
                skills: ["Stakeholder Management", "Program Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, Los Angeles",
        degree: "M.A. Urban and Regional Planning",
        dateAwarded: "2014-06-13",
      },
      {
        school: "University of California, Berkeley",
        degree: "B.A. Architecture",
        dateAwarded: "2011-05-14",
      },
    ],
    certifications: [
      {
        name: "AICP Certification",
        issuer: "American Planning Association",
        dateAwarded: "2018-11-09",
        credentialId: "AICP-MORALES-2018-774",
      },
      {
        name: "Form-Based Code Institute Certificate",
        issuer: "Form-Based Codes Institute",
        dateAwarded: "2017-05-19",
        credentialId: "FBCI-2017-DM",
      },
    ],
    featuredProjects: [
      {
        name: "Vermont Corridor adopted specific plan and street sections",
        description:
          "<p>Adopted corridor plan with a form-based code, shade standards, and street sections public works will maintain. 2,100 units entitled under the new map. The bureau attached the sections to the ordinance without a rewrite.</p>",
        skills: ["Urban Design", "Sustainable Design", "Stakeholder Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "architecture",
    name: "Naomi Stein",
    title: "Healthcare Architect",
    location: "Houston, TX",
    siteDescription:
      "Healthcare architect who designs inpatient and ambulatory buildings that clear FGI, life safety, and a working nurse's path.",
    summary:
      "<p>Healthcare architect at Halcyon Health Design. I take inpatient units and ambulatory platforms from programming through CA, and I treat FGI, life safety, and infection control as design constraints, not a late checklist.</p><p>At Gulf Coast Facilities Group I delivered a 180-bed replacement tower and two outpatient clinics with zero life-safety comments on the final inspection. The floor plate still has to work at 2 a.m. for the charge nurse — that is the review that matters.</p>",
    skills: [
      {
        name: "Building Codes",
        description:
          "FGI, IBC, NFPA 101, and Texas licensing reviews before DD. Last two jobs closed final inspection with zero life-safety comments.",
        yearStarted: 2014,
      },
      {
        name: "Revit",
        description:
          "Department models with medical-equipment families and a clash log the GC and the clinical planner both trust.",
        yearStarted: 2013,
      },
      {
        name: "Design Development",
        description:
          "Convert a functional program into room data sheets, typical bays, and a nurse-server layout the unit manager will sign.",
        yearStarted: 2015,
      },
      {
        name: "Construction Documents",
        description:
          "Permit and GMP sets with equipment plans, infection-control partitions, and details the installer can follow.",
        yearStarted: 2014,
      },
      {
        name: "Construction Administration",
        description:
          "ICRA, above-ceiling, and owner training. I walk the unit with nursing before the punch so the first night shift is not the first review.",
        yearStarted: 2016,
      },
      {
        name: "MEP Coordination",
        description:
          "Medical gas, isolation rooms, and OR air changes coordinated before the ceiling closes — not after the first smoke test.",
        yearStarted: 2016,
      },
      {
        name: "Quality Management",
        description:
          "Room-by-room checklist against the functional program. Equipment misses on my jobs have stayed under 2% at turnover.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold nursing, facilities, and infection prevention in the same user group so the med-room door does not move twice.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Halcyon Health Design",
        description:
          "Houston healthcare architecture studio. Inpatient towers, ambulatory platforms, and diagnostic renovations.",
        location: "Houston, TX",
        startDate: "2020-11-01",
        positions: [
          {
            title: "Healthcare Architect",
            startDate: "2020-11-01",
            projects: [
              {
                name: "Led the Bayou Memorial tower typical unit that closed inspection with zero life-safety comments",
                description:
                  "180-bed inpatient tower with typical units designed against FGI, NFPA 101, and a charge-nurse path that works at 2 a.m. Led typical-unit DD and the life-safety package; final inspection closed with zero life-safety comments, and Texas licensing was confirming, not redesigning.",
                skills: ["Building Codes", "Design Development", "Revit"],
              },
              {
                name: "Coordinated Westchase isolation and OR suites before ceiling close with 1.4% equipment misses",
                description:
                  "92,000 sf clinic with imaging and an ASC, with medical gas, isolation rooms, and OR air changes coordinated before the ceiling closed. Equipment misses at turnover were 1.4%, and the clash log was one the GC and the clinical planner both trusted.",
                skills: ["MEP Coordination", "Construction Documents", "Quality Management"],
              },
              {
                name: "Walked two med-surg units at 2 a.m. and relocated four nurse-server doors",
                description:
                  "Walked two med-surg units with charge nurses at 2 a.m. before punch so the first night shift was not the first design review. Relocated four nurse-server doors and avoided a first-week work order storm, and nursing signed the path they actually walk.",
                skills: ["Construction Administration", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Gulf Coast Facilities Group",
        description:
          "Regional healthcare planner-architect. Replacement hospitals, clinic rollouts, and code upgrades.",
        location: "Houston, TX",
        startDate: "2014-08-11",
        endDate: "2020-10-23",
        positions: [
          {
            title: "Project Architect, Healthcare",
            startDate: "2017-09-01",
            endDate: "2020-10-23",
            projects: [
              {
                name: "Delivered two Pasadena clinics that cleared Texas licensing in one comment cycle",
                description:
                  "Two 28,000 sf clinics on a shared typical, with infection-control partitions and equipment plans the installer could follow. Texas licensing comments closed in one cycle; both clinics opened inside the original GMP, and the second clinic did not invent a new nurse-server.",
                skills: ["Building Codes", "Construction Documents", "Quality Management"],
              },
              {
                name: "Phased a 24-bay ED expansion so the existing trauma bay never went dark",
                description:
                  "Phased 24-bay ED expansion in an occupied hospital, with ICRA partitions and above-ceiling work sequenced against the live trauma bay. The existing bay never went dark, and infection prevention sat in the same user group as facilities so the med-room door did not move twice.",
                skills: [
                  "Construction Administration",
                  "MEP Coordination",
                  "Stakeholder Management",
                ],
              },
            ],
          },
          {
            title: "Architectural Designer",
            startDate: "2014-08-11",
            endDate: "2017-08-31",
            projects: [
              {
                name: "Drew the 32-bed med-surg typical nursing signed on the second workshop",
                description:
                  "Drew the 32-bed typical later reused on three floors, converting the functional program into room data sheets and a nurse-server layout the unit manager would sign. Nursing signed the toilet-room layout on the second workshop, and the bay survived the next two floors without a redo.",
                skills: ["Design Development", "Revit", "Stakeholder Management"],
              },
              {
                name: "Built the equipment-plan checklist that cut missing outlets at punch from 19 to 4",
                description:
                  "Built a room-data and equipment checklist the PM still uses, room by room against the functional program instead of a furniture list the vendor invented. First job that used it cut missing outlets at punch from 19 to 4, and equipment misses on later jobs stayed under 2% at turnover.",
                skills: ["Quality Management", "Construction Documents"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Rice University",
        degree: "M.Arch",
        dateAwarded: "2014-05-10",
      },
      {
        school: "University of Texas at Austin",
        degree: "B.S. Architectural Studies",
        dateAwarded: "2011-05-21",
      },
    ],
    certifications: [
      {
        name: "Registered Architect",
        issuer: "Texas Board of Architectural Examiners",
        dateAwarded: "2018-06-28",
        credentialId: "TX-RA-26981",
      },
      {
        name: "EDAC Certification",
        issuer: "The Center for Health Design",
        dateAwarded: "2019-03-14",
        credentialId: "EDAC-STEIN-2019-1104",
      },
    ],
    featuredProjects: [
      {
        name: "Bayou Memorial 180-bed replacement tower typical unit",
        description:
          "<p>180-bed inpatient tower with typical units designed against FGI and a night-shift nursing walk. Final life-safety inspection closed clean. Charge nurses walked the unit at 2 a.m. before punch so the first night shift was not the first review.</p>",
        skills: ["Building Codes", "Design Development", "Revit"],
      },
      {
        name: "Westchase ambulatory platform with isolation and ASC",
        description:
          "<p>Clinic, imaging, and ASC on one platform. Isolation and OR air were coordinated before the ceiling closed. Equipment misses at turnover landed at 1.4 percent because the clash log closed first.</p>",
        skills: ["MEP Coordination", "Construction Documents", "Quality Management"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "architecture",
    name: "Felix Huang",
    title: "Sustainability Lead",
    location: "Portland, OR",
    siteDescription:
      "Sustainability lead who writes energy, carbon, and materials targets into the design, then keeps them through CA.",
    summary:
      "<p>Sustainability lead at Cascade Timber Practice. I set energy, embodied-carbon, and materials targets in SD and stay on the job through CA so the LEED plaque is not a surprise at occupancy.</p><p>At Northlight Architecture I took four civic and workplace projects to LEED Gold or better and cut modeled EUI 28% versus the 2018 baseline set. The point is not the plaque — it is a building the owner can operate on the energy model we sold.</p>",
    skills: [
      {
        name: "Sustainable Design",
        description:
          "Energy, carbon, daylight, and materials targets written into SD, then tracked to occupancy. Four projects at Gold or better.",
        yearStarted: 2014,
      },
      {
        name: "Building Codes",
        description:
          "Oregon energy code, stretch code, and envelope commissioning language that survives plan review.",
        yearStarted: 2015,
      },
      {
        name: "Design Development",
        description:
          "Translate targets into wall assemblies, glazing ratios, and a mechanical narrative the engineer will own.",
        yearStarted: 2014,
      },
      {
        name: "Revit",
        description:
          "Energy-model geometry and material takeoffs from the same model the documents come from.",
        yearStarted: 2013,
      },
      {
        name: "Program Management",
        description:
          "Hold the LEED, energy-model, and commissioning calendars so credits are not left to the last month of CA.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Get owner, GC, and the mechanical engineer to sign the EUI target before DD, not after value engineering.",
        yearStarted: 2016,
      },
      {
        name: "Quality Management",
        description:
          "Envelope and systems checklists against the model. First-year energy variance on my last two jobs stayed inside 8%.",
        yearStarted: 2018,
      },
      {
        name: "Construction Documents",
        description:
          "Specifications and details that name the product, the VOC limit, and the commissioning requirement.",
        yearStarted: 2014,
      },
    ],
    companies: [
      {
        name: "Cascade Timber Practice",
        description:
          "Portland studio known for mass timber and civic work. Sustainability is a studio role, not a consultant afterthought.",
        location: "Portland, OR",
        startDate: "2023-01-09",
        positions: [
          {
            title: "Sustainability Lead",
            startDate: "2023-01-09",
            projects: [
              {
                name: "Locked Willamette Civic Hall's EUI 24 target in design development before value engineering",
                description:
                  "Mass-timber civic building targeting EUI 24 and LEED Platinum, with envelope and HVAC narratives locked in DD so the plaque was not a surprise at occupancy. Owner signed the EUI before VE, and sustainability stayed on the job through CA instead of arriving as a closeout consultant.",
                skills: ["Sustainable Design", "Design Development", "Stakeholder Management"],
              },
              {
                name: "Built the studio embodied-carbon ledger that cut A1–A3 carbon 11% on two jobs",
                description:
                  "Revit takeoff plus a materials ledger on every job over 20,000 sf, from the same model the documents come from. Two projects swapped steel stairs for timber and cut A1–A3 carbon 11%, and the studio finally had a carbon number it could defend in SD, not a late LEED credit.",
                skills: ["Revit", "Quality Management", "Sustainable Design"],
              },
              {
                name: "Wrote the Oregon stretch-code playbook that cleared energy review in one comment cycle",
                description:
                  "Internal guide for envelope, lighting, and commissioning notes that survive Oregon energy-code and stretch-code plan review. First three jobs using it cleared energy review with one comment cycle, and credits stopped being left to the last month of CA.",
                skills: ["Building Codes", "Construction Documents", "Program Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Northlight Architecture",
        description:
          "Pacific Northwest practice. Workplace, civic, and higher-ed projects with a standing sustainability desk.",
        location: "Seattle, WA",
        startDate: "2015-02-02",
        endDate: "2022-12-22",
        positions: [
          {
            title: "Sustainability Coordinator",
            startDate: "2018-06-01",
            endDate: "2022-12-22",
            projects: [
              {
                name: "Took four civic and workplace projects to LEED Gold with EUI 28% below baseline",
                description:
                  "Took four civic and workplace jobs to LEED Gold or Platinum and kept the energy model honest through CA. Modeled EUI averaged 28% below the 2018 baseline the studio had been using, and the owners could operate on the model we sold, not a plaque.",
                skills: ["Sustainable Design", "Program Management", "Quality Management"],
              },
              {
                name: "Closed first-year energy within 8% of the model on two workplace buildings",
                description:
                  "Compared metered energy to the model on two workplaces and walked the sequences with the operator before anyone blamed the envelope. Variance stayed inside 8%; the owner kept the same mechanical sequence we designed, and the first-year file matched the SD target.",
                skills: ["Quality Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Architectural Designer",
            startDate: "2015-02-02",
            endDate: "2018-05-31",
            projects: [
              {
                name: "Cut west glass 18% on a 90,000 sf workplace and kept the daylight target",
                description:
                  "Glazing-ratio and shading studies in Revit for a 90,000 sf workplace, translating the EUI target into a wall assembly the engineer would own. Cut west glass 18% and kept the daylight target, and the owner signed the glass ratio before DD, not after value engineering.",
                skills: ["Revit", "Design Development", "Sustainable Design"],
              },
              {
                name: "Rewrote materials specs so three jobs reused VOC limits without a substitution fight",
                description:
                  "Rewrote Division 09 and 12 specs so they named the product, the VOC limit, and the commissioning requirement in the same paragraph. Three subsequent jobs reused the language without a substitution fight, and the GC stopped treating the materials appendix as optional.",
                skills: ["Construction Documents", "Building Codes"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Oregon",
        degree: "M.Arch",
        dateAwarded: "2014-06-14",
      },
      {
        school: "University of Washington",
        degree: "B.A. Architectural Studies",
        dateAwarded: "2011-06-11",
      },
    ],
    certifications: [
      {
        name: "LEED AP BD+C",
        issuer: "U.S. Green Building Council",
        dateAwarded: "2016-09-22",
        credentialId: "LEED-AP-HUANG-44821",
      },
      {
        name: "Registered Architect",
        issuer: "Oregon Board of Architect Examiners",
        dateAwarded: "2019-04-05",
        credentialId: "OR-RA-6117",
      },
    ],
    featuredProjects: [
      {
        name: "Willamette Civic Hall mass-timber energy target",
        description:
          "<p>Mass-timber civic hall with an EUI 24 target locked in design development. Sustainability stayed on the job through CA, not as a closeout consultant. The owner signed the EUI before value engineering.</p>",
        skills: ["Sustainable Design", "Design Development", "Building Codes"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "commercial-real-estate",
    name: "Alexandra Dunn",
    title: "Acquisitions Associate",
    location: "New York, NY",
    siteDescription:
      "Acquisitions associate who underwrites office and industrial deals in ARGUS and will not send a memo the IC cannot audit.",
    summary:
      "<p>Acquisitions associate at Meridian Gate Capital. I underwrite office and last-mile industrial in ARGUS, build the DCF the investment committee can audit, and stay on the deal through PSA and first close.</p><p>At Ashlar Realty Partners I underwrote $1.1B of bids, closed $340M, and killed two LOIs after rent rolls did not survive a unit-level check. The model is the argument — the rent roll is the evidence.</p>",
    skills: [
      {
        name: "ARGUS",
        description:
          "Enterprise models for office and industrial: rent rolls, recovery structures, and a cash-flow the IC can open without a translator.",
        yearStarted: 2017,
      },
      {
        name: "Underwriting",
        description:
          "Full-file underwriting from OM to IC memo. Closed $340M and walked from two LOIs after the rent roll failed a unit check.",
        yearStarted: 2017,
      },
      {
        name: "Financial Underwriting",
        description:
          "Debt, equity, and sensitivity cases in the same memo so leverage is a decision, not a late tab.",
        yearStarted: 2018,
      },
      {
        name: "DCF Valuation",
        description:
          "10-year DCFs with exit cap, downtime, and rollover that match the ARGUS file, not a separate spreadsheet.",
        yearStarted: 2017,
      },
      {
        name: "Financial Modeling",
        description:
          "Sources and uses, promote, and monthly cash flow the CFO will reuse at close without rebuilding.",
        yearStarted: 2016,
      },
      {
        name: "Market Analysis",
        description:
          "Submarket vacancy, absorption, and rent bands that survive a broker's rebuttal in the IC room.",
        yearStarted: 2017,
      },
      {
        name: "Deal Execution",
        description:
          "PSA comments, diligence rooms, and first-close checklists. Average exclusivity-to-close on my live deals is 71 days.",
        yearStarted: 2019,
      },
      {
        name: "Capital Markets",
        description:
          "Talk to the debt desk before IC so the cap rate is not an equity-only number.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Meridian Gate Capital",
        description:
          "New York opportunistic and core-plus shop. Office recapitalizations and last-mile industrial on the Eastern Seaboard.",
        location: "New York, NY",
        startDate: "2022-08-15",
        positions: [
          {
            title: "Acquisitions Associate",
            startDate: "2022-08-15",
            projects: [
              {
                name: "Underwrote and closed a $128M Newark last-mile portfolio at a 6.1% cap",
                description:
                  "Underwrote a four-building, 612,000 sf industrial portfolio with rent rolls, recoveries, and a cash-flow the IC could open without a translator. ARGUS and DCF survived committee; closed $128M at a 6.1% going-in cap in 68 days, and the debt quote lived in the same assumption table.",
                skills: ["ARGUS", "DCF Valuation", "Deal Execution"],
              },
              {
                name: "Killed a Midtown recap after 14% of in-place income failed a unit-level check",
                description:
                  "Unit-level rent-roll check showed 14% of 'in-place' income was month-to-month with notice already given, which the OM had buried in a footnote. Killed the LOI before deposits went hard, and the next file got a unit check before anyone drafted a love letter.",
                skills: ["Underwriting", "Financial Underwriting", "Market Analysis"],
              },
              {
                name: "Rewrote the IC memo so ARGUS, debt, and the DCF share one assumption table",
                description:
                  "Rewrote the acquisitions memo so ARGUS, debt quotes, and the DCF share one assumption table the CFO can audit. Partners stopped asking which file was official, and exclusivity-to-close stopped depending on which intern owned the latest tab.",
                skills: ["Financial Modeling", "Capital Markets", "ARGUS"],
              },
            ],
          },
        ],
      },
      {
        name: "Ashlar Realty Partners",
        description:
          "Mid-market acquisitions boutique. Office and industrial from Boston to D.C., tickets $40–150M.",
        location: "New York, NY",
        startDate: "2017-07-10",
        endDate: "2022-08-05",
        positions: [
          {
            title: "Acquisitions Analyst",
            startDate: "2017-07-10",
            endDate: "2022-08-05",
            projects: [
              {
                name: "Underwrote $1.1B of Northeast bids and closed $340M after two rent-roll kills",
                description:
                  "Underwrote $1.1B of bids across 22 office and industrial files from Boston to D.C. Closed $340M; two LOIs died after rent rolls failed a unit-level audit, and walking those two saved more reputation than winning them would have.",
                skills: ["Underwriting", "ARGUS", "Deal Execution"],
              },
              {
                name: "Built the Jersey City office recap that closed equity in 74 days",
                description:
                  "Built the DCF and debt case for a 420,000 sf recapitalization so leverage was a decision in the memo, not a late tab. Debt desk priced inside the IC hurdle; equity closed in 74 days, and the promote survived first close without a rebuild.",
                skills: ["DCF Valuation", "Capital Markets", "Financial Modeling"],
              },
              {
                name: "Maintained submarket rent bands brokers stopped beating with trailing-twelve anecdotes",
                description:
                  "Maintained vacancy and asking-rent bands for six office and four industrial submarkets, updated against absorption rather than a broker's favorite tour. Brokers stopped winning arguments with trailing-twelve anecdotes, and IC finally had a rent case that survived rebuttal.",
                skills: ["Market Analysis", "Financial Underwriting"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Pennsylvania",
        degree: "B.S. Economics, Wharton",
        dateAwarded: "2017-05-15",
      },
    ],
    certifications: [
      {
        name: "ARGUS Enterprise Certification",
        issuer: "Altus Group",
        dateAwarded: "2018-03-09",
        credentialId: "AE-DUNN-2018-9021",
      },
      {
        name: "Chartered Financial Analyst, Level II",
        issuer: "CFA Institute",
        dateAwarded: "2021-08-02",
        credentialId: "CFA-L2-DUNN-2021",
      },
    ],
    featuredProjects: [
      {
        name: "Newark last-mile industrial portfolio underwriting close",
        description:
          "<p>Four-building industrial close at $128M. The ARGUS file, the DCF, and the debt quote shared one assumption table the IC could audit. Exclusivity-to-close ran 68 days, and partners stopped asking which file was official.</p>",
        skills: ["ARGUS", "DCF Valuation", "Deal Execution"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "commercial-real-estate",
    name: "Ryan Okafor",
    title: "Asset Manager",
    location: "Dallas, TX",
    siteDescription:
      "Asset manager who runs office and industrial NOI like an operating company, not a quarterly spreadsheet.",
    summary:
      "<p>Asset manager at Red Oak Asset Group. I own a $1.4B office and industrial book in Dallas–Fort Worth: budgets, leasing, capex, and the quarterly pack the investment committee actually reads.</p><p>At Trinity Corridor Holdings I lifted same-store NOI 9% in two years by treating vacancy as a leasing problem and recoveries as an operations problem. The building still has to cash flow after the roof and the tenant improvement.</p>",
    skills: [
      {
        name: "Asset Management",
        description:
          "Own NOI, occupancy, and hold/sell on a $1.4B DFW book. Quarterly packs go to IC with variance, not a narrative surprise.",
        yearStarted: 2015,
      },
      {
        name: "Financial Modeling",
        description:
          "Annual budgets, reforecasts, and hold/sell DCFs the CFO will reuse without rebuilding the tabs.",
        yearStarted: 2014,
      },
      {
        name: "Lease Negotiation",
        description:
          "Term sheets and renewal economics with the leasing broker. Average renewal spread on my industrial book is +8% cash.",
        yearStarted: 2016,
      },
      {
        name: "Market Analysis",
        description:
          "Submarket vacancy and tenant-demand notes that decide whether we spend TI or wait a quarter.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Property managers, leasing brokers, and lenders on one monthly call so capex does not land as a surprise draw.",
        yearStarted: 2016,
      },
      {
        name: "Budget Formulation",
        description:
          "Building-level opex, capex, and TI budgets that closed last year 1.8% under on controllable expenses.",
        yearStarted: 2015,
      },
      {
        name: "Financial Reporting",
        description:
          "Quarterly packs with occupancy, NOI, debt yield, and a one-page exception list. Partners stopped asking for a second file.",
        yearStarted: 2014,
      },
      {
        name: "Relationship Management",
        description:
          "Keep the top 20 tenants on a call list. Two industrial renewals last year closed without a broker because the ops issue was already fixed.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Red Oak Asset Group",
        description:
          "Dallas asset-management platform. Office and industrial for three closed-end funds and a separate account.",
        location: "Dallas, TX",
        startDate: "2021-05-01",
        positions: [
          {
            title: "Asset Manager",
            startDate: "2021-05-01",
            projects: [
              {
                name: "Reunderwrote 11 DFW industrial assets, sold two, and lifted hold-set NOI 7%",
                description:
                  "Reunderwrote 11 industrial assets with hold/sell DCFs the CFO would reuse without rebuilding the tabs. Sold two at a 5.4% cap, held nine; same-store NOI on the hold set is up 7% since the review, and the buildings still have to cash flow after the roof.",
                skills: ["Asset Management", "Financial Modeling", "Market Analysis"],
              },
              {
                name: "Recovered $1.1M in CAM and taxes and closed controllable expenses 1.8% under",
                description:
                  "Found $1.1M of unrecovered CAM and taxes across four towers that property managers had been treating as a rounding error. Recast the 2023 budget; controllable expenses closed 1.8% under, and recoveries became an operations problem instead of a year-end surprise.",
                skills: ["Budget Formulation", "Financial Reporting", "Asset Management"],
              },
              {
                name: "Ran a top-20 tenant circuit that closed two industrial renewals in-house",
                description:
                  "Quarterly ops calls with the twenty largest tenants so a broken dock or a slow work order did not become a brokered renewal. Two industrial renewals closed in-house at +9% and +6% cash, and the ops issue was already fixed before anyone priced TI.",
                skills: ["Relationship Management", "Lease Negotiation", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Trinity Corridor Holdings",
        description:
          "Value-add owner along the Stemmons and LBJ corridors. Smaller book, closer to the property managers.",
        location: "Dallas, TX",
        startDate: "2015-08-03",
        endDate: "2021-04-23",
        positions: [
          {
            title: "Associate Asset Manager",
            startDate: "2018-03-01",
            endDate: "2021-04-23",
            projects: [
              {
                name: "Lifted same-store NOI 9% in two years by treating vacancy as a leasing problem",
                description:
                  "Nine-asset office and flex book along the Stemmons and LBJ corridors. Same-store NOI up 9% in two years: vacancy treated as leasing, recoveries as operations, and the quarterly pack finally showed variance instead of a narrative surprise.",
                skills: ["Asset Management", "Budget Formulation", "Lease Negotiation"],
              },
              {
                name: "Rewrote the lender pack so covenant questions dropped to one follow-up a quarter",
                description:
                  "One quarterly pack for three lenders: occupancy, NOI, debt yield, and a one-page exception list partners could read. Covenant questions dropped to a single follow-up a quarter, and nobody asked for a second file after the first cycle.",
                skills: ["Financial Reporting", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Asset Management Analyst",
            startDate: "2015-08-03",
            endDate: "2018-02-28",
            projects: [
              {
                name: "Built first-year building budgets that closed controllable opex inside 3%",
                description:
                  "Built building-level opex and TI budgets for 14 assets the property managers could actually live with, not a spreadsheet that ignored the roof. Year-one variance on controllable opex landed inside 3%, and the CFO reused the tabs at reforecast.",
                skills: ["Budget Formulation", "Financial Modeling"],
              },
              {
                name: "Mapped vacancy against absorption so two buildings leased as-is without extra TI",
                description:
                  "Mapped vacant suites against submarket absorption so we spent TI where demand existed and waited where it did not. Two buildings deferred TI and leased as-is within a quarter, and the heatmap decided the hold conversation before the broker did.",
                skills: ["Market Analysis", "Asset Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Southern Methodist University",
        degree: "M.S. Real Estate",
        dateAwarded: "2015-05-16",
      },
      {
        school: "University of Texas at Dallas",
        degree: "B.B.A. Finance",
        dateAwarded: "2013-05-18",
      },
    ],
    certifications: [
      {
        name: "CCIM Candidate — CI 101 and CI 102",
        issuer: "CCIM Institute",
        dateAwarded: "2019-10-11",
        credentialId: "CCIM-OKAFOR-101-102",
      },
      {
        name: "ARGUS Enterprise Certification",
        issuer: "Altus Group",
        dateAwarded: "2016-06-24",
        credentialId: "AE-OKAFOR-2016-3301",
      },
    ],
    featuredProjects: [
      {
        name: "DFW industrial hold-sell and same-store NOI review",
        description:
          "<p>Eleven-asset review that sold two buildings and kept nine. Same-store NOI on the hold set is up 7% since the memo. Two sales printed a 5.4% cap; the nine we held still have to cash flow after the roof.</p>",
        skills: ["Asset Management", "Financial Modeling", "Market Analysis"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "commercial-real-estate",
    name: "Leila Mansour",
    title: "Office Broker",
    location: "Chicago, IL",
    siteDescription:
      "Office broker who closes tenant-rep and landlord deals on the actual lease, not the tour.",
    summary:
      "<p>Office broker at Lakeshore Office Partners. I represent tenants and a short list of landlords in the Loop, River North, and Fulton Market, and I treat the lease as the product — economics, options, and the work letter, not the tour deck.</p><p>At Wacker Lease Advisory I closed 1.1 million sf over four years with a 92% retainer-to-close rate. The tour is the audition; the work letter is the deal.</p>",
    skills: [
      {
        name: "Lease Negotiation",
        description:
          "Economics, options, and work letters. Last year I closed 310,000 sf with average rent 4% inside the tenant's walk-away.",
        yearStarted: 2014,
      },
      {
        name: "Contract Negotiation",
        description:
          "Redline the lease, SNDA, and commencement memo so legal is not inventing business terms at 11 p.m.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "Block-by-block vacancy, net absorption, and concession bands I update monthly for the Loop and Fulton Market.",
        yearStarted: 2014,
      },
      {
        name: "Relationship Management",
        description:
          "Keep 40 active tenants and 8 landlords on a cadence. Half of last year's sf came from people I had already housed once.",
        yearStarted: 2013,
      },
      {
        name: "Deal Execution",
        description:
          "From RFP to commencement. Retainer-to-close at Wacker was 92%; average exclusive-to-lease is 11 weeks.",
        yearStarted: 2015,
      },
      {
        name: "Stakeholder Management",
        description:
          "Tenant legal, facilities, and the landlord's asset manager in one thread so the work letter does not reopen twice.",
        yearStarted: 2016,
      },
      {
        name: "Opportunity Management",
        description: "Pipeline by stage and probability. I do not forecast a tour as a 70% close.",
        yearStarted: 2017,
      },
      {
        name: "Account Planning",
        description:
          "Two-year occupancy plans for multi-site tenants so the next expiration is a project, not a surprise.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Lakeshore Office Partners",
        description:
          "Boutique Chicago office shop. Tenant-rep first, a short landlord list in Class A and creative.",
        location: "Chicago, IL",
        startDate: "2020-10-01",
        positions: [
          {
            title: "Office Broker",
            startDate: "2020-10-01",
            projects: [
              {
                name: "Closed a 92,000 sf Fulton Market deal $4 under the landlord's first ask",
                description:
                  "Represented a 140,000 sf software tenant across three buildings and treated the work letter as the deal, not the tour deck. Closed 92,000 sf at $4 under the first ask; the work letter survived legal on the second redline, and economics stayed inside the tenant's walk-away.",
                skills: ["Lease Negotiation", "Contract Negotiation", "Deal Execution"],
              },
              {
                name: "Recast River North concessions and leased 31,000 sf in two transactions",
                description:
                  "Recast concessions and a 40,000 sf availability for a River North owner after the old ask was pricing the building empty. Leased 31,000 sf in two transactions inside one quarter, and the asset manager stopped reopening the work letter twice.",
                skills: ["Market Analysis", "Opportunity Management", "Stakeholder Management"],
              },
              {
                name: "Built two-year occupancy plans that put three expirations in exclusive early",
                description:
                  "Two-year maps for four tenants with 6–11 suburban and downtown sites so the next expiration was a project, not a surprise. Three expirations last year were already in exclusive before the 12-month mark, and half of last year's sf came from people I had already housed once.",
                skills: ["Account Planning", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Wacker Lease Advisory",
        description: "Tenant-rep boutique on Wacker. Mid-market office, 10,000–80,000 sf tickets.",
        location: "Chicago, IL",
        startDate: "2014-06-02",
        endDate: "2020-09-18",
        positions: [
          {
            title: "Vice President, Tenant Representation",
            startDate: "2017-01-09",
            endDate: "2020-09-18",
            projects: [
              {
                name: "Closed 1.1 million sf over four years at a 92% retainer-to-close rate",
                description:
                  "Closed 1.1 million sf with a 92% retainer-to-close rate and an 11-week exclusive-to-lease average on mid-market tickets. I do not forecast a tour as a 70% close, and the pipeline by stage finally matched what legal was actually redlining.",
                skills: ["Deal Execution", "Lease Negotiation", "Opportunity Management"],
              },
              {
                name: "Published monthly concession bands that stopped tenants from overbidding unused TI",
                description:
                  "Monthly free-rent and TI bands for the Loop and West Loop, updated against net absorption instead of last quarter's rumor. Tenants stopped overbidding TI they would not use, and landlord responses started answering economics, options, and the work letter on the same grid.",
                skills: ["Market Analysis", "Contract Negotiation"],
              },
            ],
          },
          {
            title: "Associate Broker",
            startDate: "2014-06-02",
            endDate: "2016-12-31",
            projects: [
              {
                name: "Closed 200,000 sf as the junior and brought two tenants back without a bake-off",
                description:
                  "Toured, RFPed, and closed 200,000 sf as the junior on eight files, writing the commencement memo so legal was not inventing business terms at 11 p.m. Two tenants brought the next search back without a bake-off, and the relationship outlasted the tour.",
                skills: ["Relationship Management", "Lease Negotiation"],
              },
              {
                name: "Standardized the office RFP and cut landlord response time by a week",
                description:
                  "Standardized the RFP so economics, options, and the work letter were answered in the same grid instead of three attachments and a hope. Landlord response time fell by a week, and tenant legal, facilities, and the asset manager finally sat in one thread.",
                skills: ["Stakeholder Management", "Deal Execution"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Illinois Urbana-Champaign",
        degree: "B.S. Finance",
        dateAwarded: "2013-05-12",
      },
    ],
    certifications: [
      {
        name: "Illinois Real Estate Managing Broker",
        issuer: "Illinois Department of Financial and Professional Regulation",
        dateAwarded: "2018-05-04",
        credentialId: "IL-MB-4751193",
      },
      {
        name: "SIOR Candidate",
        issuer: "Society of Industrial and Office Realtors",
        dateAwarded: "2021-09-17",
        credentialId: "SIOR-CAND-MANSOUR-21",
      },
    ],
    featuredProjects: [
      {
        name: "Fulton Market creative-office tenant-rep lease close",
        description:
          "<p>140,000 sf search closed at 92,000 sf and $4 under the first ask. The work letter survived legal on the second redline. Economics stayed inside the tenant's walk-away, and the tour did not get to reopen the deal.</p>",
        skills: ["Lease Negotiation", "Contract Negotiation", "Deal Execution"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "commercial-real-estate",
    name: "Peter Lang",
    title: "Debt Originator",
    location: "San Francisco, CA",
    siteDescription:
      "CRE debt originator who prices, structures, and closes office and industrial loans the credit committee can defend.",
    summary:
      "<p>Debt originator at Golden Gate Credit Partners. I originate senior and stretch senior on West Coast office and industrial, from term sheet through the credit memo and close.</p><p>At Pacific Rim Debt Desk I closed $890M across 17 loans with one loss and a 94% term-sheet-to-close rate. The spread is the conversation; the structure is the job.</p>",
    skills: [
      {
        name: "Capital Markets",
        description:
          "Price senior and stretch senior against life-company, bank, and debt-fund quotes so the borrower hears one market, not three rumors.",
        yearStarted: 2015,
      },
      {
        name: "Loan Structuring",
        description:
          "Amortization, recourse carve-outs, and cash-management that survive credit and the borrower's counsel.",
        yearStarted: 2016,
      },
      {
        name: "Credit Analysis",
        description:
          "In-place and in-place-plus DSCR, debt yield, and tenant concentration before the term sheet goes out.",
        yearStarted: 2015,
      },
      {
        name: "Financial Modeling",
        description:
          "Monthly cash flow, sweep, and refinance cases the credit committee can open without a translator tab.",
        yearStarted: 2014,
      },
      {
        name: "Underwriting",
        description:
          "Full-file underwriting from OM to credit memo. Closed $890M with one loss across 17 loans.",
        yearStarted: 2015,
      },
      {
        name: "Deal Execution",
        description:
          "Term sheet to close. 94% hit rate at Pacific Rim; average exclusivity-to-funding is 52 days.",
        yearStarted: 2016,
      },
      {
        name: "Relationship Management",
        description:
          "Sponsors, brokers, and the credit officer on one cadence so a structure change is a call, not a surprise memo.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "West Coast office and industrial cap-rate and vacancy notes that decide leverage before the tour.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Golden Gate Credit Partners",
        description:
          "San Francisco debt platform. Senior and stretch senior on West Coast office, industrial, and select multifamily.",
        location: "San Francisco, CA",
        startDate: "2022-02-01",
        positions: [
          {
            title: "Debt Originator",
            startDate: "2022-02-01",
            projects: [
              {
                name: "Structured a $186M South San Francisco industrial club that funded in 49 days",
                description:
                  "Structured a $186M senior club on 1.1M sf with amortization, carve-outs, and cash-management credit could defend. Debt yield 9.4% in-place; funded in 49 days with a springing lockbox the sponsor accepted on the second draft, and the term sheet matched the memo.",
                skills: ["Loan Structuring", "Capital Markets", "Deal Execution"],
              },
              {
                name: "Withdrew a Peninsula office refinance after in-place DSCR printed 1.05",
                description:
                  "In-place DSCR printed 1.05 after a tenant concentration check the OM had treated as a footnote. Withdrew the term sheet before deposits went hard; the sponsor refinanced elsewhere at a lower LTV, and credit did not have to defend a hope.",
                skills: ["Credit Analysis", "Underwriting", "Market Analysis"],
              },
              {
                name: "Standardized the credit memo so the model, term sheet, and rent roll matched",
                description:
                  "One assumption table across the model, the term sheet, and the memo so a structure change was a call, not a surprise redline. Credit stopped asking which rent roll was official, and the monthly cash-flow file opened without a translator tab.",
                skills: ["Financial Modeling", "Underwriting", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Pacific Rim Debt Desk",
        description:
          "West Coast correspondent and balance-sheet desk. Life-company and bank executions, $15–80M tickets.",
        location: "San Francisco, CA",
        startDate: "2015-07-06",
        endDate: "2022-01-21",
        positions: [
          {
            title: "Vice President, Originations",
            startDate: "2018-09-01",
            endDate: "2022-01-21",
            projects: [
              {
                name: "Closed $890M across 17 loans with one loss and a 94% term-sheet hit rate",
                description:
                  "Closed $890M across 17 West Coast office and industrial loans with one loss and a 94% term-sheet-to-close rate. Average exclusivity-to-funding was 52 days, and the spread was the conversation — the structure, not the rumor, was the job.",
                skills: ["Deal Execution", "Capital Markets", "Loan Structuring"],
              },
              {
                name: "Recast an Oakland flex refinance to 25-year amort that credit approved first pass",
                description:
                  "Recast a 420,000 sf flex park from I/O to 25-year amort after a tenant roll that would have broken interest-only. Credit approved on the first memo, and the sweep and refinance cases lived in the same file the committee opened.",
                skills: ["Loan Structuring", "Credit Analysis", "Financial Modeling"],
              },
            ],
          },
          {
            title: "Associate, Debt Origination",
            startDate: "2015-07-06",
            endDate: "2018-08-31",
            projects: [
              {
                name: "Wrote 22 first credit memos so the ten that died died in credit, not at the table",
                description:
                  "Wrote 22 memos as the junior, with in-place DSCR, debt yield, and tenant concentration on the page before the term sheet went out. Twelve funded; the ten that died died in credit, not at the table, which is the only kind of no that still leaves a relationship.",
                skills: ["Underwriting", "Credit Analysis"],
              },
              {
                name: "Built a 40-broker coverage map that sourced half of 2017 volume from four relationships",
                description:
                  "Built a 40-broker coverage list by West Coast submarket so the desk heard one market, not three rumors. Half of 2017 volume came from four relationships that started as coffee, not a bid, and a structure change was a call instead of a surprise memo.",
                skills: ["Relationship Management", "Market Analysis"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "M.B.A.",
        dateAwarded: "2015-05-16",
      },
      {
        school: "University of Southern California",
        degree: "B.S. Business Administration",
        dateAwarded: "2011-05-13",
      },
    ],
    certifications: [
      {
        name: "California Real Estate Broker",
        issuer: "California Department of Real Estate",
        dateAwarded: "2018-02-16",
        credentialId: "CA-BRK-02044817",
      },
      {
        name: "ARGUS Enterprise Certification",
        issuer: "Altus Group",
        dateAwarded: "2016-11-04",
        credentialId: "AE-LANG-2016-7710",
      },
    ],
    featuredProjects: [
      {
        name: "South San Francisco industrial senior-loan club",
        description:
          "<p>$186M senior club on 1.1 million square feet. Debt yield 9.4% in-place; funded in 49 days with a lockbox the sponsor signed on the second draft. Credit opened one assumption table across the model, the term sheet, and the memo.</p>",
        skills: ["Loan Structuring", "Capital Markets", "Deal Execution"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "nonprofit",
    name: "Fatima Al-Hassan",
    title: "Program Director",
    location: "Washington, DC",
    siteDescription:
      "Program director who treats grants, evaluation, and delivery as one file so a site visit is not a scramble.",
    summary:
      "<p>Program director at Civic Commons Institute. I run a youth-employment and civic-education portfolio across six cities, and I keep grant, evaluation, and delivery on one calendar so a site visit reads the same file the board already saw.</p><p>At Atlas Neighborhood Fund I took three federal awards from proposal through closeout and raised on-time performance reports from 71% to 98%. The program still has to work on a Thursday night — the report is how we prove it.</p>",
    skills: [
      {
        name: "Program Evaluation",
        description:
          "Outcome frameworks and annual learning reviews the board uses. Last year we retired one underperforming site and doubled another.",
        yearStarted: 2014,
      },
      {
        name: "Grant Management",
        description:
          "Post-award drawdowns, rebudgets, and closeout. On-time performance reports rose from 71% to 98% at Atlas.",
        yearStarted: 2015,
      },
      {
        name: "Grant Writing",
        description:
          "Federal and foundation narratives with a budget the finance director will sign. Three competitive awards totaling $6.8M.",
        yearStarted: 2014,
      },
      {
        name: "Program Management",
        description:
          "Six-city delivery calendar, staff, and partners. Youth-employment completions hit 84% against a 70% target.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep city agencies, school partners, and the evaluator in one monthly so the site visit is not a first conversation.",
        yearStarted: 2015,
      },
      {
        name: "Monitoring and Evaluation",
        description:
          "Indicator sets and a data-quality check that program staff can keep without a second job.",
        yearStarted: 2016,
      },
      {
        name: "Budget Formulation",
        description:
          "Restricted and unrestricted budgets by site. Last fiscal year closed 2.1% under on program expense.",
        yearStarted: 2015,
      },
      {
        name: "Nonprofit Finance",
        description:
          "Treat cost share and restricted balances as a ledger: promised, booked, and documented for the auditor.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Civic Commons Institute",
        description:
          "National nonprofit in Washington. Youth employment, civic education, and city-agency partnerships in six markets.",
        location: "Washington, DC",
        startDate: "2021-04-01",
        positions: [
          {
            title: "Program Director",
            startDate: "2021-04-01",
            projects: [
              {
                name: "Ran six-city youth employment to 84% completion against a 70% target",
                description:
                  "1,140 youth across six sites on one delivery calendar with city agencies and school partners in the same monthly. Completions hit 84% against a 70% target; one underperforming site closed after the annual learning review, and the Thursday-night program still had to work.",
                skills: ["Program Management", "Program Evaluation", "Stakeholder Management"],
              },
              {
                name: "Managed a $4.1M DOL and foundation portfolio the last site visit reused from the board packet",
                description:
                  "Three active awards totaling $4.1M with monthly drawdowns, rebudgets, and a shared indicator set program staff could keep. The last site visit reused the board packet, and grant, evaluation, and delivery finally sat on one calendar.",
                skills: ["Grant Management", "Monitoring and Evaluation", "Nonprofit Finance"],
              },
              {
                name: "Built site-level program budgets that closed 2.1% under without cutting stipends",
                description:
                  "Restricted and unrestricted budgets by city, with cost share booked like a ledger instead of a promise in a proposal. Fiscal year closed 2.1% under on program expense without cutting stipends, and finance could see the restricted balance before the auditor asked.",
                skills: ["Budget Formulation", "Program Management", "Nonprofit Finance"],
              },
            ],
          },
        ],
      },
      {
        name: "Atlas Neighborhood Fund",
        description:
          "Place-based intermediary in D.C. and Baltimore. Workforce, after-school, and neighborhood grants.",
        location: "Washington, DC",
        startDate: "2015-09-08",
        endDate: "2021-03-19",
        positions: [
          {
            title: "Senior Program Manager",
            startDate: "2018-06-01",
            endDate: "2021-03-19",
            projects: [
              {
                name: "Took three federal awards through closeout and lifted on-time reports from 71% to 98%",
                description:
                  "Took three federal awards from proposal through closeout so a site visit read the same file the board already saw. On-time performance reports rose from 71% to 98%, and the report stopped being a scramble the week the PPR was due.",
                skills: ["Grant Management", "Grant Writing", "Program Evaluation"],
              },
              {
                name: "Built the Baltimore after-school indicator set and cut attendance data issues from 18% to 4%",
                description:
                  "Eight school partners, 620 youth, and an indicator set staff could keep without a second job. Attendance data quality issues fell from 18% to 4%, and the learning review used numbers the site directors recognized from their own rosters.",
                skills: [
                  "Monitoring and Evaluation",
                  "Program Management",
                  "Stakeholder Management",
                ],
              },
            ],
          },
          {
            title: "Program Officer",
            startDate: "2015-09-08",
            endDate: "2018-05-31",
            projects: [
              {
                name: "Wrote the $2.2M DOL youth-employment proposal that funded on the first submission",
                description:
                  "Wrote the narrative and budget for a $2.2M youth-employment award with objectives the sites could actually keep. Funded on the first submission; finance signed the cost-share table, and the evaluation chapter matched the indicator set we later used.",
                skills: ["Grant Writing", "Budget Formulation"],
              },
              {
                name: "Standardized subgrantee risk review and cut late invoices from 24% to 7%",
                description:
                  "Standardized fiscal and program-risk review for 14 subgrantees so a late invoice was a documented exception, not a surprise drawdown. Late invoices dropped from 24% to 7%, and the auditor could follow promised, booked, and documented without a scavenger hunt.",
                skills: ["Grant Management", "Nonprofit Finance"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgetown University",
        degree: "M.P.P. Public Policy",
        dateAwarded: "2015-05-16",
      },
      {
        school: "Howard University",
        degree: "B.A. International Affairs",
        dateAwarded: "2012-05-12",
      },
    ],
    certifications: [
      {
        name: "Project Management Professional",
        issuer: "Project Management Institute",
        dateAwarded: "2019-07-19",
        credentialId: "PMP-ALHASSAN-3341901",
      },
      {
        name: "Grants Management Certificate",
        issuer: "Management Concepts",
        dateAwarded: "2017-04-28",
        credentialId: "MC-GMC-2017-882",
      },
    ],
    featuredProjects: [
      {
        name: "Civic Commons six-city youth-employment delivery portfolio",
        description:
          "<p>Youth-employment and civic-education delivery across six cities. Completions at 84% against a 70% target, with grant and evaluation on the same calendar as the board packet. One underperforming site closed after the annual learning review; stipends were not the first cut.</p>",
        skills: ["Program Management", "Program Evaluation", "Grant Management"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "nonprofit",
    name: "Gabriel Santos",
    title: "Development Director",
    location: "Boston, MA",
    siteDescription:
      "Development director who treats major gifts, grants, and the gala as one pipeline with names, not a spreadsheet of hope.",
    summary:
      "<p>Development director at Harborlight Foundation. I own major gifts, institutional grants, and the annual gala as one pipeline, and I will not forecast a coffee as a close.</p><p>At North Atlantic Philanthropy I grew individual giving 38% in three years and cut lapsed major-donor rate from 22% to 9%. The thank-you is still the job — the difference is the next ask is already on a calendar.</p>",
    skills: [
      {
        name: "Donor Relations",
        description:
          "Major-donor portfolios with a 12-month cadence. Lapsed rate on $10K+ donors fell from 22% to 9% at North Atlantic.",
        yearStarted: 2013,
      },
      {
        name: "Grant Writing",
        description:
          "Foundation proposals and reports the program staff will recognize. Hit rate on $100K+ asks is 41%.",
        yearStarted: 2014,
      },
      {
        name: "Nonprofit Finance",
        description:
          "Restricted gift agreements and a pipeline that finance can book, not a development-only forecast.",
        yearStarted: 2016,
      },
      {
        name: "Relationship Management",
        description:
          "Board solicitors and 60 major-donor households on a shared contact plan. Half of last year's $10K+ gifts were repeats.",
        yearStarted: 2013,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep the ED, finance, and program directors in the same gift conversation so a restricted ask does not surprise the budget.",
        yearStarted: 2015,
      },
      {
        name: "Budget Formulation",
        description:
          "Development operating budget and a gift forecast by stage. Last year we closed 4% over the conservative case.",
        yearStarted: 2016,
      },
      {
        name: "Program Management",
        description:
          "Gala, report cycle, and the stewardship calendar as one program with a single after-action.",
        yearStarted: 2015,
      },
      {
        name: "Policy Advocacy",
        description:
          "Brief board members for public and private asks so the case for support is the same in a hearing and a living room.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Harborlight Foundation",
        description:
          "Boston education and youth nonprofit. $18M operating budget; development sits next to the ED, not in a satellite office.",
        location: "Boston, MA",
        startDate: "2020-07-01",
        positions: [
          {
            title: "Development Director",
            startDate: "2020-07-01",
            projects: [
              {
                name: "Rebuilt the $10K+ major-gifts portfolio to 60 households with 54% repeat revenue",
                description:
                  "Rebuilt the $10K+ portfolio to 60 households with a 12-month cadence so coffee was no longer forecast as a close. Repeat gifts were 54% of $10K+ revenue last year; the conservative forecast closed 4% over, and the next ask was already on a calendar.",
                skills: ["Donor Relations", "Relationship Management", "Budget Formulation"],
              },
              {
                name: "Stood up an institutional grants desk that put report drafts in front of program 21 days out",
                description:
                  "Eight foundation relationships, $2.4M in awards, with reports the program staff would recognize as their own work. Program staff now see the report draft 21 days out, not the night before, and finance can book the restricted gift instead of a development-only forecast.",
                skills: ["Grant Writing", "Stakeholder Management", "Nonprofit Finance"],
              },
              {
                name: "Ran the Harborlight gala as stewardship and netted $1.1M with spring asks already booked",
                description:
                  "Ran the gala as a stewardship program, not a party, with the same case for support the board uses in a living room. Net revenue $1.1M; 40% of tables were prior-year major donors with a spring ask already booked, and the after-action fed the pipeline instead of a thank-you pile.",
                skills: ["Program Management", "Donor Relations", "Policy Advocacy"],
              },
            ],
          },
        ],
      },
      {
        name: "North Atlantic Philanthropy",
        description:
          "Regional community foundation affiliate. Individual giving, donor-advised funds, and a small institutional desk.",
        location: "Boston, MA",
        startDate: "2014-04-01",
        endDate: "2020-06-19",
        positions: [
          {
            title: "Associate Director of Development",
            startDate: "2017-08-01",
            endDate: "2020-06-19",
            projects: [
              {
                name: "Grew individual giving 38% and cut the $10K+ lapse rate from 22% to 9%",
                description:
                  "Grew individual giving 38% in three years with a written stewardship cadence the thank-you notes actually followed. Lapsed rate on $10K+ donors fell from 22% to 9%, and half of last year's $10K+ gifts were repeats instead of a new-name scramble.",
                skills: ["Donor Relations", "Relationship Management", "Program Management"],
              },
              {
                name: "Moved restricted gifts onto agreements finance could book and ended year-end receivable fights",
                description:
                  "Moved major restricted gifts onto agreements finance could book, so a restricted ask no longer surprised the operating budget in December. Year-end receivable fights dropped to zero in the second year, and the ED, finance, and program sat in the same gift conversation.",
                skills: ["Nonprofit Finance", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Development Officer",
            startDate: "2014-04-01",
            endDate: "2017-07-31",
            projects: [
              {
                name: "Built the first foundation portfolio and lifted $100K+ hit rate to 41%",
                description:
                  "Wrote and reported on 11 foundation grants the program staff recognized when the report came due. Hit rate on $100K+ asks reached 41% by the third cycle, and the operating budget for development closed against a forecast by stage, not hope.",
                skills: ["Grant Writing", "Budget Formulation"],
              },
              {
                name: "Wrote board solicitor briefs that doubled board-sourced gifts in two years",
                description:
                  "One-page briefs for board asks so the case for support was the same in a hearing and a living room. Board-sourced gifts doubled in two years because the solicitor finally had a page they would actually read, and the ask survived contact with a real person.",
                skills: ["Policy Advocacy", "Donor Relations"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Boston College",
        degree: "M.S.W. Community Organization",
        dateAwarded: "2014-05-19",
      },
      {
        school: "University of Massachusetts Boston",
        degree: "B.A. Communications",
        dateAwarded: "2011-05-27",
      },
    ],
    certifications: [
      {
        name: "CFRE",
        issuer: "CFRE International",
        dateAwarded: "2019-11-08",
        credentialId: "CFRE-SANTOS-2019-77421",
      },
      {
        name: "AFP Master Trainer",
        issuer: "Association of Fundraising Professionals",
        dateAwarded: "2021-03-12",
        credentialId: "AFP-MT-SANTOS-21",
      },
    ],
    featuredProjects: [
      {
        name: "Harborlight major-gifts portfolio and stewardship cadence",
        description:
          "<p>Sixty-household $10K+ portfolio with a 12-month cadence. Repeat gifts were more than half of major revenue, and the conservative forecast closed over plan. Coffee was no longer forecast as a close.</p>",
        skills: ["Donor Relations", "Relationship Management", "Budget Formulation"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "nonprofit",
    name: "June Ellison",
    title: "Monitoring & Evaluation Specialist",
    location: "Atlanta, GA",
    siteDescription:
      "M&E specialist who builds indicator systems program staff will actually keep, then uses them in the next design.",
    summary:
      "<p>Monitoring and evaluation specialist at MeasureWell Collaborative. I design indicator sets, data-quality checks, and learning reviews for education and health nonprofits that are tired of a dashboard no one trusts.</p><p>At Southern Outcomes Lab I cut missing outcome records from 21% to 5% across four partners and wrote the evaluation chapter of two funded federal proposals. The point of M&E is the next program decision — not a PDF for the binder.</p>",
    skills: [
      {
        name: "Monitoring and Evaluation",
        description:
          "Indicator sets, data-quality protocols, and learning reviews staff can keep. Missing outcome records fell from 21% to 5% at Southern Outcomes.",
        yearStarted: 2015,
      },
      {
        name: "Program Evaluation",
        description:
          "Outcome frameworks and mixed-method reviews the ED will use to retire or double a site, not a 80-page annex.",
        yearStarted: 2015,
      },
      {
        name: "Python",
        description:
          "Cleaning, matching, and a monthly quality job so the dashboard is not a weekend scramble before the board.",
        yearStarted: 2017,
      },
      {
        name: "Grant Management",
        description:
          "Performance-report calendars and indicator maps that match the award, so the PPR is an extract, not a rewrite.",
        yearStarted: 2016,
      },
      {
        name: "Quality Improvement",
        description:
          "Data-quality loops with program staff. Error rates drop when the person who collects the data sees the weekly miss list.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold program, finance, and the evaluator in one design session so the indicator is collectable and fundable.",
        yearStarted: 2015,
      },
      {
        name: "Program Management",
        description:
          "Evaluation workplans with dates the field office can keep. Last three learning reviews landed before the board retreat.",
        yearStarted: 2018,
      },
      {
        name: "Nonprofit Finance",
        description:
          "Cost the evaluation line honestly so M&E is not the first cut when the restricted budget tightens.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "MeasureWell Collaborative",
        description:
          "Atlanta M&E shop embedded with education and community-health nonprofits. Design, data quality, and learning reviews.",
        location: "Atlanta, GA",
        startDate: "2022-09-01",
        positions: [
          {
            title: "Monitoring & Evaluation Specialist",
            startDate: "2022-09-01",
            projects: [
              {
                name: "Built a four-partner data-quality loop that cut missing outcome records from 14% to 3%",
                description:
                  "Weekly miss lists and a Python matching job so the person who collects the data sees the miss before the board does. Missing outcome records across four partners fell from 14% to 3% in two quarters, and the dashboard is now an extract, not a weekend project.",
                skills: ["Monitoring and Evaluation", "Python", "Quality Improvement"],
              },
              {
                name: "Mapped federal PPR indicators so the last four reports filed on time without a rewrite",
                description:
                  "Mapped indicators to two DOL awards so the PPR is an extract, not a rewrite the night before the portal closes. Last four reports filed on time without a weekend rewrite, and the award, the indicator, and the field office calendar finally matched.",
                skills: ["Grant Management", "Program Evaluation", "Program Management"],
              },
              {
                name: "Wrote eight-page board learning reviews that retired one site and doubled another",
                description:
                  "Eight-page reviews, not 80, with an outcome framework the ED could use to retire or double a site. One partner retired a Saturday site and doubled a weekday cohort after the spring review, and the evaluation line was costed honestly enough to survive the restricted-budget cut.",
                skills: ["Program Evaluation", "Stakeholder Management", "Nonprofit Finance"],
              },
            ],
          },
        ],
      },
      {
        name: "Southern Outcomes Lab",
        description:
          "Regional evaluation collaborative. Shared tools for school, health, and workforce nonprofits in the Southeast.",
        location: "Atlanta, GA",
        startDate: "2016-01-11",
        endDate: "2022-08-19",
        positions: [
          {
            title: "Evaluation Associate",
            startDate: "2019-03-01",
            endDate: "2022-08-19",
            projects: [
              {
                name: "Cut missing outcome records from 21% to 5% across four partners with a monthly cleaning job",
                description:
                  "Cut missing outcome records from 21% to 5% across four partners with a data-quality protocol and a monthly cleaning job program staff could keep. Error rates dropped once the weekly miss list went to the person who collected the row, not a dashboard no one trusted.",
                skills: ["Monitoring and Evaluation", "Python", "Quality Improvement"],
              },
              {
                name: "Wrote two funded federal evaluation chapters that kept the indicator set we designed",
                description:
                  "Wrote the evaluation design for two federal proposals in a session with program, finance, and the evaluator so the indicator was collectable and fundable. Both funded; both kept the indicator set we designed, and the PPR later extracted from the same map.",
                skills: ["Program Evaluation", "Grant Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Research Assistant",
            startDate: "2016-01-11",
            endDate: "2019-02-28",
            projects: [
              {
                name: "Wrote the first shared indicator dictionary and collapsed five completion definitions into one",
                description:
                  "A shared dictionary for eight workforce programs so 'completion' stopped meaning five different things in five partner exports. Duplicate definitions dropped from five to one, and the monthly quality job finally had a column it could match without a footnote novel.",
                skills: ["Monitoring and Evaluation", "Program Management"],
              },
              {
                name: "Costed the evaluation line at 7–9% so M&E survived the restricted-budget cut",
                description:
                  "Costed M&E as 7–9% of program expense on two proposals so the line survived the restricted-budget cut instead of becoming the first nice-to-have. Finance could book the evaluation work, and the next program decision still had a file behind it.",
                skills: ["Nonprofit Finance", "Grant Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Emory University",
        degree: "M.P.H. Epidemiology",
        dateAwarded: "2015-05-11",
      },
      {
        school: "Spelman College",
        degree: "B.A. Mathematics",
        dateAwarded: "2013-05-19",
      },
    ],
    certifications: [
      {
        name: "Certificate in Evaluation Practice",
        issuer: "The Evaluators' Institute",
        dateAwarded: "2018-08-24",
        credentialId: "TEI-CEP-ELLISON-2018",
      },
      {
        name: "Qualtrics XM Scientist",
        issuer: "Qualtrics",
        dateAwarded: "2020-02-07",
        credentialId: "XM-SCI-ELLISON-2020",
      },
    ],
    featuredProjects: [
      {
        name: "MeasureWell four-partner weekly outcome data-quality loop",
        description:
          "<p>Weekly miss lists and a matching job that dropped missing outcome records from 14% to 3% across four partners. The dashboard is now an extract, not a weekend project. Program staff see the miss list, so the person who collects the data is the person who fixes it.</p>",
        skills: ["Monitoring and Evaluation", "Python", "Quality Improvement"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "nonprofit",
    name: "Colin Byrne",
    title: "Policy Advocate",
    location: "Washington, DC",
    siteDescription:
      "Policy advocate who writes the brief, works the Hill, and counts the vote — not the press release.",
    summary:
      "<p>Policy advocate at Open Corridor Advocacy. I work housing, workforce, and appropriations files: the brief, the Hill meeting, and the vote count. A press release is not an outcome.</p><p>At Federal Policy Workshop I helped move two authorizing bills through committee and killed a rider that would have cut a $40M youth-employment set-aside. The meeting still happens in a hallway — the difference is the one-pager is already in the member's folder.</p>",
    skills: [
      {
        name: "Policy Advocacy",
        description:
          "Hill and agency advocacy with a vote count. Two authorizing bills through committee; one rider killed that would have cut $40M.",
        yearStarted: 2014,
      },
      {
        name: "Policy Analysis",
        description:
          "One-pagers and longer memos that name the statute, the dollar, and the district impact. Members' staff reuse the tables.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Coalitions of 12–30 organizations that can agree a ask. I will not staff a letter that the field cannot live with.",
        yearStarted: 2015,
      },
      {
        name: "Grant Writing",
        description:
          "Advocacy-capacity and c3/c4 proposals that fund the work without mixing the ledgers.",
        yearStarted: 2016,
      },
      {
        name: "Relationship Management",
        description:
          "Member and committee staff on a cadence. Half of last year's meetings were return visits, not cold drops.",
        yearStarted: 2014,
      },
      {
        name: "Program Management",
        description:
          "Hearing prep, fly-ins, and comment calendars as one program with a single after-action.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Move a coalition from a slogan to a legislative ask with a vote target and a whip list.",
        yearStarted: 2017,
      },
      {
        name: "Legal Writing",
        description:
          "Comment letters and statutory markups that counsel will file without a rewrite of the operative language.",
        yearStarted: 2015,
      },
    ],
    companies: [
      {
        name: "Open Corridor Advocacy",
        description:
          "Washington advocacy shop. Housing, workforce, and appropriations for a coalition of city and nonprofit members.",
        location: "Washington, DC",
        startDate: "2021-08-16",
        positions: [
          {
            title: "Policy Advocate",
            startDate: "2021-08-16",
            projects: [
              {
                name: "Killed the rider that would have cut a $40M youth-employment set-aside",
                description:
                  "Killed a rider that would have cut a $40M set-aside with a vote count, a one-pager, and a 22-group letter field offices could live with. The member folder already had the district table, and a press release was not the outcome we counted.",
                skills: ["Policy Advocacy", "Policy Analysis", "Stakeholder Management"],
              },
              {
                name: "Drafted the housing authorizing markup that put two provisions through committee",
                description:
                  "Drafted the coalition markup and the comment letter counsel filed without rewriting the operative language. Two provisions survived committee; one died on purpose, and the coalition had agreed the ask before anyone staffed a slogan.",
                skills: ["Legal Writing", "Policy Advocacy", "Change Management"],
              },
              {
                name: "Ran three fly-ins and two hearings as one program with 19 return-visit asks",
                description:
                  "Three fly-ins and two hearings as one program with a single after-action, not three offices running competing hill days. 41 member meetings; 19 were return visits with a specific ask already in the folder, and half of last year's meetings were not cold drops.",
                skills: ["Program Management", "Relationship Management", "Policy Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "Federal Policy Workshop",
        description:
          "Bipartisan policy shop. Authorizing bills, appropriations, and the unglamorous comment calendar.",
        location: "Washington, DC",
        startDate: "2015-06-01",
        endDate: "2021-08-06",
        positions: [
          {
            title: "Senior Policy Associate",
            startDate: "2018-04-02",
            endDate: "2021-08-06",
            projects: [
              {
                name: "Staffed two workforce-authorizing bills through committee that set the next Congress's text",
                description:
                  "Staffed two workforce-authorizing bills through committee with a statute, a dollar, and a district impact on the same page. Neither became law that Congress; both set the text the next Congress started from, which is still more than a press release.",
                skills: ["Policy Advocacy", "Policy Analysis", "Legal Writing"],
              },
              {
                name: "Built a 30-group coalition whip list so letters stopped arriving with three dollar figures",
                description:
                  "A 30-group coalition with a written ask and a whip list, moved from a slogan to a vote target the field could live with. Letters stopped arriving with three different dollar figures, and I would not staff a letter the sites could not defend.",
                skills: ["Stakeholder Management", "Change Management"],
              },
            ],
          },
          {
            title: "Policy Associate",
            startDate: "2015-06-01",
            endDate: "2018-03-30",
            projects: [
              {
                name: "Built the district-impact tables members' staff still reuse on housing and workforce files",
                description:
                  "Built the district tables members' staff still reuse, naming the statute, the dollar, and the county on one page. Return visits got easier because the folder already had the table, and the hallway meeting finally had a number that survived contact with legislative counsel.",
                skills: ["Policy Analysis", "Relationship Management"],
              },
              {
                name: "Wrote the first c3/c4 capacity proposal that funded the shop without mixing ledgers",
                description:
                  "Wrote the capacity proposal that funded the shop without mixing the c3 and c4 ledgers, with a time-allocation memo counsel would file. Counsel signed it, and advocacy capacity stopped depending on a restricted grant that could not pay for a lobby visit.",
                skills: ["Grant Writing", "Program Management"],
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
        dateAwarded: "2015-05-17",
      },
      {
        school: "College of the Holy Cross",
        degree: "B.A. Political Science",
        dateAwarded: "2011-05-22",
      },
    ],
    certifications: [
      {
        name: "Admitted to the District of Columbia Bar",
        issuer: "District of Columbia Court of Appeals",
        dateAwarded: "2016-01-11",
        credentialId: "DC-BAR-1044921",
      },
      {
        name: "Lobbying Disclosure Act Compliance",
        issuer: "Congressional Management Foundation",
        dateAwarded: "2017-09-08",
        credentialId: "CMF-LDA-2017-BYRNE",
      },
    ],
    featuredProjects: [
      {
        name: "Youth-employment set-aside rider defense on the Hill",
        description:
          "<p>Killed a rider that would have cut a $40 million set-aside. The vote count, the one-pager, and a 22-group letter the field could live with. The member folder already had the district table before the hallway meeting.</p>",
        skills: ["Policy Advocacy", "Policy Analysis", "Stakeholder Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "airlines-aviation",
    name: "Sienna Walsh",
    title: "Captain and Check Airman",
    location: "Dallas, TX",
    siteDescription:
      "Captain and check airman who treats line ops and the checkride as the same standard, not two different airlines.",
    summary:
      "<p>Captain and check airman at Horizon Line Airways. I fly the 737 line out of Dallas and conduct AQP checks and IOEs so the standard in the sim is the standard on a Friday night into LGA.</p><p>At Red Mesa Regional I wrote the CRM module the FAA accepted on the first review and cut repeat training events 18% in a year. The debrief is still the job — the difference is the event file is already in the SMS.</p>",
    skills: [
      {
        name: "Flight Operations",
        description:
          "737 captain, 8,400 hours, Dallas base. Line flying and IOE so new captains see the same callouts I use on the check.",
        yearStarted: 2010,
      },
      {
        name: "Crew Resource Management",
        description:
          "Wrote the CRM module Red Mesa's FAA PMI accepted on the first review. Repeat training events fell 18% the next year.",
        yearStarted: 2014,
      },
      {
        name: "FAA Compliance",
        description:
          "AQP checks, IOE, and the event file the PMI can open. No enforcement action on my check airman file.",
        yearStarted: 2015,
      },
      {
        name: "Safety Management Systems",
        description:
          "Every check and line event that meets the threshold goes into SMS the same day, not after the monthly meeting.",
        yearStarted: 2016,
      },
      {
        name: "Avionics",
        description:
          "737 NG and MAX differences, HUD, and the failures I still teach in the sim because the line still sees them.",
        yearStarted: 2012,
      },
      {
        name: "Quality Management",
        description:
          "Standardize debrief forms so two check airmen grade the same event inside one score band.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep the chief pilot, the AQP manager, and the union training committee on one change before it hits the bid pack.",
        yearStarted: 2016,
      },
      {
        name: "Workforce Planning",
        description:
          "IOE and check calendars that match the new-hire and upgrade bid. Last winter we did not cancel a check for lack of a seat.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Horizon Line Airways",
        description:
          "Mainline 737 operator. Dallas base; AQP training and line checks sit under the fleet captain.",
        location: "Dallas, TX",
        startDate: "2020-06-01",
        positions: [
          {
            title: "Captain and Check Airman",
            startDate: "2020-06-01",
            projects: [
              {
                name: "Aligned 14 check airmen to one AQP debrief form inside a single score band",
                description:
                  "Aligned 14 check airmen to one debrief form so the standard in the sim is the standard on a Friday night into LGA. Inter-rater spread on CRM items fell inside one score band; the PMI reviewed the file without a finding, and no enforcement action sits on the check-airman record.",
                skills: ["FAA Compliance", "Crew Resource Management", "Quality Management"],
              },
              {
                name: "Ran MAX differences IOE for 62 captains with zero training failures in 90 days",
                description:
                  "Ran IOE for 62 captains moving NG to MAX, teaching avionics and HUD differences on the line instead of as a slide in ground school. Zero training failures in the first 90 days, and the upgrade calendar matched the bid so we did not cancel a check for lack of a seat.",
                skills: ["Flight Operations", "Avionics", "Workforce Planning"],
              },
              {
                name: "Put check and line events into SMS the same day and cut late reports to one a month",
                description:
                  "Check and line events that meet the threshold now enter SMS the same day, not after the monthly meeting when the story has already hardened. Late event reports from training dropped from 11 a month to 1, and the debrief file is already in the system when the chief pilot asks.",
                skills: ["Safety Management Systems", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Red Mesa Regional",
        description:
          "CRJ regional based in Phoenix. Walsh upgraded, then moved into training and the CRM rewrite.",
        location: "Phoenix, AZ",
        startDate: "2012-03-12",
        endDate: "2020-05-22",
        positions: [
          {
            title: "Check Airman and CRM Lead",
            startDate: "2016-09-01",
            endDate: "2020-05-22",
            projects: [
              {
                name: "Rewrote the CRM module the FAA accepted first review and cut repeat events 18%",
                description:
                  "Rewrote the CRM module the FAA PMI accepted on the first review, with the same callouts I use on the check and on the line. Repeat training events fell 18% the following year, and the union training committee saw the change before it hit the bid pack.",
                skills: ["Crew Resource Management", "FAA Compliance", "Quality Management"],
              },
              {
                name: "Mapped upgrade IOE to the bid so winter 2019 ran without a cancelled check",
                description:
                  "Mapped upgrade IOE to the new-hire and upgrade bid so the check calendar was a staffing product, not a hope. Winter 2019 ran without a cancelled check for lack of a seat, and new captains saw the same callouts I use on the line.",
                skills: ["Workforce Planning", "Flight Operations", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "First Officer, then Captain",
            startDate: "2012-03-12",
            endDate: "2016-08-31",
            projects: [
              {
                name: "Logged 3,100 CRJ hours, upgraded in 2015, and filed two ASAP reports that changed a briefing",
                description:
                  "3,100 hours in the CRJ-700/900, including the failures I still teach in the sim because the line still sees them. Upgraded in 2015; no check failures and two ASAP reports that changed a briefing item, which is the only kind of report that still teaches the next crew.",
                skills: ["Flight Operations", "Avionics"],
              },
              {
                name: "Turned two line ASAP reports into the first items in the monthly SMS review",
                description:
                  "Two line events I filed became the first training items the chief pilot put into the monthly SMS review, instead of dying in an ASAP inbox. The debrief stayed the job — the difference is the event file was already in the system when training rewrote the briefing.",
                skills: ["Safety Management Systems", "Crew Resource Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Embry-Riddle Aeronautical University",
        degree: "B.S. Aeronautical Science",
        dateAwarded: "2010-05-08",
      },
    ],
    certifications: [
      {
        name: "ATP, Airplane Multiengine Land — B-737",
        issuer: "Federal Aviation Administration",
        dateAwarded: "2015-07-24",
        credentialId: "ATP-3371842",
      },
      {
        name: "Check Airman Authorization, AQP",
        issuer: "Federal Aviation Administration",
        dateAwarded: "2016-09-15",
        credentialId: "CA-AQP-WALSH-2016",
      },
    ],
    featuredProjects: [
      {
        name: "Horizon Line AQP line-check debrief standard",
        description:
          "<p>One debrief form for 14 check airmen. Inter-rater spread on CRM items fell inside one score band, and the PMI opened the file without a finding. IOE and line checks now use the same callouts, so Friday night into LGA is not a different airline from the sim.</p>",
        skills: ["Crew Resource Management", "FAA Compliance", "Flight Operations"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "airlines-aviation",
    name: "Hiroshi Tanaka",
    title: "Director of System Operations Control",
    location: "Chicago, IL",
    siteDescription:
      "SOC director who keeps the operation legal, crewed, and recoverable when the day does not match the plan.",
    summary:
      "<p>Director of system operations control at Midcontinent Air Group. I own the day-of operation: schedule integrity, crew legality, and the IROPS plan when weather or a ground stop takes the bank apart.</p><p>At Prairie Hub Airlines I cut controllable cancellations 22% and recovered 91% of misconnects inside the next bank after we put dispatch, crew scheduling, and maintenance control on one floor. The plan is the morning product — the recover is the job.</p>",
    skills: [
      {
        name: "Airline Scheduling",
        description:
          "Day-of schedule integrity and the next-day recovery. Controllable cancellations down 22% at Prairie Hub.",
        yearStarted: 2012,
      },
      {
        name: "Flight Operations",
        description:
          "Dispatch, crew, and maintenance control as one operation. The floor talks before the delay code is filed.",
        yearStarted: 2011,
      },
      {
        name: "FAA Compliance",
        description:
          "Crew legality, dispatch release, and the records the POI can open. No legality events on my watch in three years.",
        yearStarted: 2013,
      },
      {
        name: "Safety Management Systems",
        description:
          "IROPS and delay events that meet the threshold enter SMS the same shift, not in the monthly wash-up.",
        yearStarted: 2015,
      },
      {
        name: "Workforce Planning",
        description:
          "Crew and dispatcher staffing against the bank. Last winter we did not cancel a turn for a legal crew we failed to position.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Stations, ATC, and the commercial team on one IROPS bridge so the passenger message matches the operation.",
        yearStarted: 2013,
      },
      {
        name: "Program Management",
        description:
          "IROPS playbooks, spare-aircraft rules, and the after-action that actually changes the next storm.",
        yearStarted: 2016,
      },
      {
        name: "Quality Management",
        description:
          "Delay-code and cancellation-reason audits. Controllable codes that were really weather fell from 9% to 2%.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Midcontinent Air Group",
        description:
          "Chicago-based mainline. SOC sits above dispatch, crew scheduling, and maintenance control on one floor.",
        location: "Chicago, IL",
        startDate: "2021-02-01",
        positions: [
          {
            title: "Director of System Operations Control",
            startDate: "2021-02-01",
            projects: [
              {
                name: "Moved dispatch, crew, and maintenance onto one floor and recovered 91% of misconnects",
                description:
                  "Moved dispatch, crew scheduling, and maintenance control onto one floor and one IROPS bridge so the floor talks before the delay code is filed. Misconnect recovery inside the next bank hit 91% last winter, and stations heard the same passenger message as the operation.",
                skills: ["Flight Operations", "Airline Scheduling", "Stakeholder Management"],
              },
              {
                name: "Built the crew-legality watch that ran three years with zero legality events",
                description:
                  "A legality board the POI can open, covering crew legality, dispatch release, and the records that used to live in two buildings. Zero legality events in three years; winter 2024 ran without a cancel for a crew we failed to position, and the next-day recovery started from a legal lineup.",
                skills: ["FAA Compliance", "Workforce Planning", "Quality Management"],
              },
              {
                name: "Put IROPS and delay events into SMS the same shift and cut late SOC reports to two",
                description:
                  "IROPS and delay events that meet the threshold enter SMS before the shift ends, not in the monthly wash-up when the code has already been argued. Late reports from SOC dropped from 14 a month to 2, and controllable codes that were really weather fell after the audit started.",
                skills: ["Safety Management Systems", "Program Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Prairie Hub Airlines",
        description:
          "Midwest hub carrier. SOC and crew scheduling sat in two buildings until the 2018 move.",
        location: "Minneapolis, MN",
        startDate: "2012-08-06",
        endDate: "2021-01-22",
        positions: [
          {
            title: "Manager, System Operations Control",
            startDate: "2016-11-01",
            endDate: "2021-01-22",
            projects: [
              {
                name: "Cut controllable cancellations 22% with spare-aircraft rules stations could not game",
                description:
                  "Controllable cancellations down 22% in two years after spare-aircraft rules and a shared delay code the stations could not game. Controllable codes that were really weather fell from 9% to 2%, and the after-action actually changed the next storm instead of reprinting the last one.",
                skills: ["Airline Scheduling", "Quality Management", "Program Management"],
              },
              {
                name: "Wrote the irregular-operations playbook that put stations and commercial on one passenger message",
                description:
                  "One playbook for ground stops and hub thunderstorms, with stations, ATC, and the commercial team on one bridge. Commercial and stations heard the same passenger message as the operation, and the recover — not the morning plan — is still the job.",
                skills: [
                  "Stakeholder Management",
                  "Flight Operations",
                  "Safety Management Systems",
                ],
              },
            ],
          },
          {
            title: "Dispatcher, then Assistant Manager",
            startDate: "2012-08-06",
            endDate: "2016-10-31",
            projects: [
              {
                name: "Rewrote the dispatch-release checklist after two near-legality events the POI accepted",
                description:
                  "Rewrote the release checklist after two near-legality events that would have been a finding if they had gone out. The POI accepted the change; the events did not repeat, and dispatch, crew, and maintenance control finally talked before the release went final.",
                skills: ["FAA Compliance", "Flight Operations"],
              },
              {
                name: "Built the crew-positioning board that stopped winter deadheads from being a 2 a.m. surprise",
                description:
                  "First version of the legality and positioning board later used in Chicago, staffing dispatchers and crews against the bank instead of hoping a legal crew appeared. Winter deadheads stopped being a 2 a.m. surprise, and we did not cancel a turn for a crew we failed to position.",
                skills: ["Workforce Planning", "Airline Scheduling"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of North Dakota",
        degree: "B.S. Aeronautics — Air Traffic / Dispatch",
        dateAwarded: "2012-05-12",
      },
    ],
    certifications: [
      {
        name: "Aircraft Dispatcher Certificate",
        issuer: "Federal Aviation Administration",
        dateAwarded: "2012-06-29",
        credentialId: "ADX-2012-88419",
      },
      {
        name: "IOSA Internal Auditor",
        issuer: "International Air Transport Association",
        dateAwarded: "2018-04-13",
        credentialId: "IOSA-IA-TANAKA-2018",
      },
    ],
    featuredProjects: [
      {
        name: "Midcontinent single-floor SOC and IROPS bridge",
        description:
          "<p>Dispatch, crew scheduling, and maintenance control on one floor and one IROPS bridge. Next-bank misconnect recovery hit 91% last winter. Stations and commercial hear the same passenger message as the operation.</p>",
        skills: ["Flight Operations", "Airline Scheduling", "Stakeholder Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "airlines-aviation",
    name: "Megan Price",
    title: "Revenue Management Analyst",
    location: "Atlanta, GA",
    siteDescription:
      "Revenue-management analyst who prices O&D and fare classes against a forecast, then checks whether the flight actually closed that way.",
    summary:
      "<p>Revenue-management analyst at Atlantic Peak Air. I own O&D forecasts, fare-class mix, and the overbooking curve for a 90-city domestic network, and I close the week against flown revenue, not the Monday bid price.</p><p>At Sunbelt Yield Analytics I lifted unit revenue 4.2% on a 40-market test set and cut denied boardings 31% after we stopped treating no-show as a constant. The RM system is a recommendation — the analyst still owns the flight.</p>",
    skills: [
      {
        name: "Revenue Management",
        description:
          "O&D forecasts, fare-class mix, and overbooking. Unit revenue up 4.2% on a 40-market test set at Sunbelt.",
        yearStarted: 2016,
      },
      {
        name: "Financial Modeling",
        description:
          "Weekly close against flown revenue, spill, and spoilage so the bid-price story has to match the P&L.",
        yearStarted: 2016,
      },
      {
        name: "Python",
        description:
          "Forecast residuals, no-show curves, and a market-watch job that flags a flight before the inventory desk does.",
        yearStarted: 2017,
      },
      {
        name: "Market Analysis",
        description:
          "Competitor fare and capacity notes by O&D. I will not open a class because a hostile sale landed on one departure.",
        yearStarted: 2016,
      },
      {
        name: "Airline Scheduling",
        description:
          "Talk to scheduling about bank structure and aircraft gauge before I ask RM to save a broken departure.",
        yearStarted: 2018,
      },
      {
        name: "Demand Planning",
        description:
          "Booking curves and group demand that update mid-week, not only on the Sunday batch.",
        yearStarted: 2017,
      },
      {
        name: "Quality Improvement",
        description:
          "Denied boardings down 31% after no-show stopped being a constant. Overbooking is a curve, not a habit.",
        yearStarted: 2019,
      },
      {
        name: "Stakeholder Management",
        description:
          "Sales, scheduling, and the pricing desk on one exception list so a group dump is a decision, not a surprise.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Atlantic Peak Air",
        description:
          "Atlanta-based carrier. RM sits between scheduling and sales; Price owns a 90-city domestic set.",
        location: "Atlanta, GA",
        startDate: "2023-03-06",
        positions: [
          {
            title: "Revenue Management Analyst",
            startDate: "2023-03-06",
            projects: [
              {
                name: "Closed a 90-city O&D forecast against flown revenue every week instead of the Monday bid",
                description:
                  "Weekly close of forecast vs flown revenue on 90 cities so the bid-price story has to match the P&L. Bid-price exceptions that did not pay for themselves are now a Tuesday conversation, not a quarterly surprise, and the RM system stays a recommendation the analyst still owns.",
                skills: ["Revenue Management", "Financial Modeling", "Python"],
              },
              {
                name: "Built the group-demand exception list that requires a named owner before inventory moves",
                description:
                  "Sales, scheduling, and RM on one list so a group dump is a decision, not a surprise on a Tuesday departure. Those dumps now require a named owner before inventory moves, and booking curves update mid-week instead of waiting for the Sunday batch.",
                skills: ["Stakeholder Management", "Demand Planning", "Airline Scheduling"],
              },
              {
                name: "Automated competitor fare watch so we stopped opening a class for a single-departure sale",
                description:
                  "Python job that flags hostile fare-and-capacity moves by O&D before the inventory desk does. We stopped opening a class for a single-departure sale, and a competitor's one-off does not get to rewrite the fare-class mix for the week.",
                skills: ["Market Analysis", "Python", "Revenue Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Sunbelt Yield Analytics",
        description:
          "Consulting RM desk for three regional and ULCC clients. Forecasts, overbooking, and a weekly close.",
        location: "Atlanta, GA",
        startDate: "2016-08-01",
        endDate: "2023-02-24",
        positions: [
          {
            title: "Senior RM Analyst",
            startDate: "2019-10-01",
            endDate: "2023-02-24",
            projects: [
              {
                name: "Rebuilt fare-class mix on 40 markets and lifted unit revenue 4.2% versus control",
                description:
                  "Rebuilt fare-class mix and booking curves on 40 markets and closed the week against flown revenue, not the Monday bid price. Unit revenue up 4.2% versus a matched control set over two quarters, and the analyst still owned the flight when the system wanted to dump inventory.",
                skills: ["Revenue Management", "Demand Planning", "Financial Modeling"],
              },
              {
                name: "Rewrote no-show as a curve and cut denied boardings 31% while load factor held",
                description:
                  "Stopped treating no-show as a constant and built the curve by departure hour so overbooking was a forecast, not a habit. Denied boardings fell 31% while load factor held, and the Monday bid price had to survive the Thursday close.",
                skills: ["Quality Improvement", "Python", "Revenue Management"],
              },
            ],
          },
          {
            title: "Revenue Analyst",
            startDate: "2016-08-01",
            endDate: "2019-09-30",
            projects: [
              {
                name: "Built the first weekly close that made the Monday bid-price story match the Thursday P&L",
                description:
                  "Flew revenue versus bid price on one client so spill and spoilage had to explain themselves by Thursday. The Monday story had to match the P&L or the class mix changed, and consulting RM finally had a close the airline finance team would reuse.",
                skills: ["Financial Modeling", "Market Analysis"],
              },
              {
                name: "Wrote the bank-structure notes that stopped RM from asking inventory to save a broken bank",
                description:
                  "Wrote the first scheduling memo RM used to stop asking inventory to save a broken connecting bank. Gauge and bank structure became a conversation with scheduling before I asked RM to rescue a departure that was never going to connect.",
                skills: ["Airline Scheduling", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgia Institute of Technology",
        degree: "M.S. Operations Research",
        dateAwarded: "2016-05-07",
      },
      {
        school: "University of Florida",
        degree: "B.S. Industrial Engineering",
        dateAwarded: "2014-05-03",
      },
    ],
    certifications: [
      {
        name: "IATA Revenue Management",
        issuer: "International Air Transport Association",
        dateAwarded: "2018-06-15",
        credentialId: "IATA-RM-PRICE-2018",
      },
      {
        name: "PROS RM Practitioner",
        issuer: "PROS",
        dateAwarded: "2019-01-18",
        credentialId: "PROS-RMP-PRICE-19",
      },
    ],
    featuredProjects: [
      {
        name: "Sunbelt forty-market unit-revenue test and no-show curve",
        description:
          "<p>Fare-class mix and booking curves rebuilt on 40 markets. Unit revenue rose 4.2% against a matched control, and denied boardings fell after no-show stopped being a constant. Overbooking became a curve by departure hour, and the Monday bid price had to survive Thursday.</p>",
        skills: ["Revenue Management", "Demand Planning", "Quality Improvement"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "airlines-aviation",
    name: "Omar Khalil",
    title: "Maintenance Planning Manager",
    location: "Miami, FL",
    siteDescription:
      "Maintenance planning manager who keeps the AMP legal, the hangar loaded, and the SMS file current when a check slips.",
    summary:
      "<p>Maintenance planning manager at Tropic Line Maintenance. I own the aircraft maintenance program, the hangar load, and the parts forecast so a C-check does not become a three-day AOG because a panel was not kitted.</p><p>At Caribbean Heavy Check I raised on-time check completion from 71% to 89% and cut repeat findings 24% after configuration control and the SMS event file started talking to the work package. The hangar still has to close on Friday — the AMP is how we stay legal while it does.</p>",
    skills: [
      {
        name: "Maintenance Planning",
        description:
          "AMP, hangar load, and parts kitting. On-time check completion rose from 71% to 89% at Caribbean Heavy Check.",
        yearStarted: 2013,
      },
      {
        name: "Safety Management Systems",
        description:
          "Check findings and deferrals that meet the threshold enter SMS the same shift the card closes.",
        yearStarted: 2016,
      },
      {
        name: "FAA Compliance",
        description:
          "AMP revisions, MEL, and the records the PMI can open. Last two program revisions closed with one comment cycle.",
        yearStarted: 2014,
      },
      {
        name: "Avionics",
        description:
          "Avionics and IFE cards in the work package with the right effectivity, not a fleet-wide guess.",
        yearStarted: 2014,
      },
      {
        name: "Configuration Management",
        description:
          "Effectivity, SB status, and the as-maintained file. Repeat findings from wrong-config cards fell 24%.",
        yearStarted: 2015,
      },
      {
        name: "Quality Management",
        description:
          "Work-package audits before the aircraft arrives. Cards that used to be written on the floor are now in the kit.",
        yearStarted: 2015,
      },
      {
        name: "Program Management",
        description:
          "A- and C-check calendars against the flying program. Last winter we did not drop a C-check for a hangar we failed to book.",
        yearStarted: 2017,
      },
      {
        name: "Workforce Planning",
        description:
          "Crew mix and overtime against the check. Night-shift coverage held without a 20% overtime spike the last two quarters.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Tropic Line Maintenance",
        description:
          "Miami Part 121 maintenance planning. Line, A-check, and contracted C-check for a narrowbody fleet.",
        location: "Miami, FL",
        startDate: "2022-01-10",
        positions: [
          {
            title: "Maintenance Planning Manager",
            startDate: "2022-01-10",
            projects: [
              {
                name: "Rebuilt the 18-month AMP and hangar load so winter C-checks stayed booked",
                description:
                  "Rebuilt the 18-month check calendar against the flying program so a C-check did not become a three-day AOG because a hangar was a rumor. Last winter we did not drop a C-check for a slot we failed to book, and the AMP stayed legal while the hangar still closed on Friday.",
                skills: ["Maintenance Planning", "Program Management", "FAA Compliance"],
              },
              {
                name: "Kitted parts 72 hours before arrival and cut AOG hours from missing panels 41%",
                description:
                  "Parts and cards kitted 72 hours before the aircraft, including avionics and IFE cards with the right effectivity instead of a fleet-wide guess. AOG hours from missing panels fell 41% in two quarters, and cards that used to be written on the floor are now in the kit.",
                skills: ["Maintenance Planning", "Quality Management", "Avionics"],
              },
              {
                name: "Filed check findings into SMS when the card closed and cut late events to one a month",
                description:
                  "Findings and deferrals that meet the threshold enter SMS when the card closes, the same shift, not after the monthly wash-up. Late events from planning dropped from 8 a month to 1, and configuration status finally talked to the work package before the next induction.",
                skills: [
                  "Safety Management Systems",
                  "Configuration Management",
                  "Quality Management",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Caribbean Heavy Check",
        description:
          "Miami and San Juan heavy-maintenance provider. C-checks and modifications for three 121 customers.",
        location: "Miami, FL",
        startDate: "2013-09-02",
        endDate: "2021-12-23",
        positions: [
          {
            title: "Planning Supervisor",
            startDate: "2017-05-01",
            endDate: "2021-12-23",
            projects: [
              {
                name: "Lifted on-time C-check completion from 71% to 89% after kitting and effectivity talks",
                description:
                  "On-time C-check completion from 71% to 89% after kitting, effectivity, and a hangar-load meeting that actually changed the next induction. The hangar still had to close on Friday — the AMP is how we stayed legal while it did, and repeat findings stopped arriving as a surprise on day two.",
                skills: ["Maintenance Planning", "Quality Management", "Program Management"],
              },
              {
                name: "Tied SB status to the work package and cut wrong-config repeat findings 24%",
                description:
                  "Tied SB status and as-maintained effectivity to the work package so a card was not a fleet-wide guess. Repeat findings from wrong-config cards fell 24%, and the PMI can open the as-maintained file without finding a side spreadsheet.",
                skills: ["Configuration Management", "Avionics", "FAA Compliance"],
              },
            ],
          },
          {
            title: "Maintenance Planner",
            startDate: "2013-09-02",
            endDate: "2017-04-30",
            projects: [
              {
                name: "Drafted the AMP revision the PMI closed in one comment cycle",
                description:
                  "Drafted the AMP revision the PMI closed in one comment cycle, with MEL and escalation tasks in the program instead of a side spreadsheet. Last two program revisions closed the same way, and planning stopped hoping the next check would remember the task.",
                skills: ["FAA Compliance", "Maintenance Planning"],
              },
              {
                name: "Rewrote the night-shift crew mix so overtime held inside 8% while inductions rose 12%",
                description:
                  "Rewrote the check crew mix against the hangar load so night-shift coverage held without a 20% overtime spike. Overtime held inside 8% while induction count rose 12%, and the crew that closed the card was the crew we had planned on Monday.",
                skills: ["Workforce Planning", "Safety Management Systems"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Embry-Riddle Aeronautical University",
        degree: "B.S. Aviation Maintenance Management",
        dateAwarded: "2013-05-04",
      },
    ],
    certifications: [
      {
        name: "A&P Mechanic Certificate",
        issuer: "Federal Aviation Administration",
        dateAwarded: "2013-07-19",
        credentialId: "AP-2911844",
      },
      {
        name: "SMS Practitioner",
        issuer: "Aviation Safety Management Solutions",
        dateAwarded: "2018-11-02",
        credentialId: "SMS-PRAC-KHALIL-2018",
      },
    ],
    featuredProjects: [
      {
        name: "Tropic Line AMP calendar and hangar-load plan",
        description:
          "<p>Eighteen-month check calendar rebuilt against the flying program. C-checks stay legal and kitted; last winter we did not drop a slot we failed to book. Parts and cards are kitted 72 hours before the aircraft arrives.</p>",
        skills: ["Maintenance Planning", "FAA Compliance", "Program Management"],
      },
    ],
  }),
];
