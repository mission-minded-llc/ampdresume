import { defineProfile } from "../buildProfile";

export const operationsProfiles = [
  defineProfile({
    gender: "woman",
    vertical: "manufacturing",
    name: "Leila Haddad",
    title: "Plant Manager",
    location: "Detroit, MI",
    siteDescription:
      "Plant manager who runs a Detroit stamping campus on lean standard work, TPM, and a daily management system that keeps overtime from becoming the plan.",
    summary:
      "<p>I run a 420-person stamping and assembly plant for Northline Stampings. The job is not a kaizen poster on the wall. It is a weekly cadence that keeps press uptime, die changes, and labor hours on the same board so supervisors can act before the weekend becomes the recovery plan.</p><p>I came up through production supervision in the Great Lakes corridor. The plants that stay solvent are the ones that treat changeover, safety, and staffing as one system. I install that system, then I stay on the floor long enough to see whether it holds on third shift.</p>",
    skills: [
      {
        name: "Lean Manufacturing",
        description:
          "Installed a plant-level lean system: standard work, visual management, and a weekly kaizen slate that cut average changeover from 47 to 18 minutes on three transfer presses.",
        yearStarted: 2012,
      },
      {
        name: "TPM",
        description:
          "Built autonomous maintenance routes for 22 presses and a die-change pit. Mean time between failures on the A-line rose 31% in the first year.",
        yearStarted: 2014,
      },
      {
        name: "Production Planning",
        description:
          "Tied the daily production board to the master schedule so mix changes did not show up as surprise overtime on Friday.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Moved three shifts onto a single daily management rhythm without a consultant army. Supervisors own the board; I own the escalation path.",
        yearStarted: 2016,
      },
      {
        name: "Workforce Planning",
        description:
          "Staffed a 420-person plant through two volume swings by building a skilled-trades bench and a weekend float pool instead of agency overtime.",
        yearStarted: 2018,
      },
      {
        name: "Process Safety",
        description:
          "Rebuilt lockout, die-set, and crane procedures after a near miss. Recordable rate dropped from 3.4 to 1.1 over 18 months.",
        yearStarted: 2013,
      },
      {
        name: "Stakeholder Management",
        description:
          "Keep corporate, the union committee, and the customer launch team on one set of numbers. No separate decks.",
        yearStarted: 2018,
      },
      {
        name: "Technical Leadership",
        description:
          "Coach supervisors and process engineers on the same problem-solving method so a press stoppage has one owner, not a meeting.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Northline Stampings",
        description:
          "Tier-1 body-in-white stamper serving two Detroit assembly plants. 420 hourly and salaried on three shifts.",
        location: "Detroit, MI",
        startDate: "2021-04-01",
        positions: [
          {
            title: "Plant Manager",
            startDate: "2021-04-01",
            projects: [
              {
                name: "Press-line lean conversion",
                description:
                  "Converted three transfer presses to SMED kits and a single-minute die-change standard. Average changeover fell from 47 to 18 minutes and released 9 hours of weekly capacity.",
                skills: ["Lean Manufacturing", "TPM", "Technical Leadership"],
              },
              {
                name: "Daily management and staffing model",
                description:
                  "Installed a three-shift board for OEE, scrap, and labor hours. Cut unplanned overtime 22% while holding on-time delivery above 98.4%.",
                skills: ["Workforce Planning", "Production Planning", "Change Management"],
              },
              {
                name: "Die-set safety reset",
                description:
                  "Rewrote crane and lockout rules with the trades and the safety committee after a near miss. Recordables fell from 3.4 to 1.1 in 18 months.",
                skills: ["Process Safety", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Harbor Castings",
        description:
          "Iron foundry and machining house in Toledo supplying chassis and brake components.",
        location: "Toledo, OH",
        startDate: "2016-03-01",
        endDate: "2021-03-31",
        positions: [
          {
            title: "Operations Manager",
            startDate: "2018-07-01",
            endDate: "2021-03-31",
            projects: [
              {
                name: "Melt-to-machine flow",
                description:
                  "Pulled melt, shakeout, and machining onto one pull system. Work-in-process fell 28% and late shipments to the Detroit customer dropped from 6.1% to 1.8%.",
                skills: ["Lean Manufacturing", "Production Planning"],
              },
              {
                name: "Weekend recovery retirement",
                description:
                  "Replaced Saturday catch-up with a Friday close checklist and a skilled-trades float. Weekend hours fell 41% over two years.",
                skills: ["Workforce Planning", "Change Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Production Supervisor",
            startDate: "2016-03-01",
            endDate: "2018-06-30",
            projects: [
              {
                name: "B-shift standard work",
                description:
                  "Wrote the first standard work for the B-shift molding line and trained 34 operators. First-pass yield rose 4.2 points.",
                skills: ["Lean Manufacturing", "Technical Leadership"],
              },
              {
                name: "Autonomous maintenance start",
                description:
                  "Stood up operator TPM checks on six molding machines. Unplanned downtime on those assets fell 19% in two quarters.",
                skills: ["TPM", "Process Safety"],
              },
            ],
          },
        ],
      },
      {
        name: "Great Lakes Axle",
        description:
          "Axle and driveline machining plant in Warren. High-mix, low-buffer work for two OEMs.",
        location: "Warren, MI",
        startDate: "2012-06-01",
        endDate: "2016-02-28",
        positions: [
          {
            title: "Manufacturing Supervisor",
            startDate: "2012-06-01",
            endDate: "2016-02-28",
            projects: [
              {
                name: "Cell redesign on Line 4",
                description:
                  "Collapsed a batch machining cell into a one-piece-flow U-cell. Travel distance dropped 60% and the cell ran with two fewer operators at the same rate.",
                skills: ["Lean Manufacturing", "Workforce Planning"],
              },
              {
                name: "Lockout refresh for CNC cells",
                description:
                  "Rewrote lockout cards with maintenance after an audit finding. The cell passed the next corporate safety review with zero majors.",
                skills: ["Process Safety", "Technical Leadership"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Wayne State University",
        degree: "B.S. Industrial Engineering",
        dateAwarded: "2012-05-06",
      },
      {
        school: "University of Michigan, Ross School of Business",
        degree: "Certificate, Operations Management",
        dateAwarded: "2019-08-16",
      },
    ],
    certifications: [
      {
        name: "Lean Bronze Certification",
        issuer: "Association for Manufacturing Excellence",
        dateAwarded: "2018-11-02",
        credentialId: "AME-LB-HADDAD-2018",
      },
      {
        name: "OSHA 30 — General Industry",
        issuer: "OSHA Outreach",
        dateAwarded: "2016-04-18",
        credentialId: "OSHA30-LH-441902",
      },
    ],
    featuredProjects: [
      {
        name: "Northline daily management system",
        description:
          "<p>A plant-level operating system that puts OEE, scrap, labor hours, and safety on one board for three shifts. Supervisors run the huddle; escalation is time-boxed to the hour, not the next staff meeting.</p>",
        links: [
          { label: "Operating system overview", url: "https://www.example.com/northline-dms" },
          { label: "Supervisor guide", url: "https://www.example.com/northline-dms-guide" },
        ],
        skills: ["Lean Manufacturing", "Change Management", "Workforce Planning"],
      },
      {
        name: "SMED kits for transfer presses",
        description:
          "<p>Die-change kits, staged fasteners, and a pit standard that cut average changeover from 47 to 18 minutes across three presses without adding a fourth setup crew.</p>",
        links: [{ label: "Changeover case", url: "https://www.example.com/northline-smed" }],
        skills: ["Lean Manufacturing", "TPM"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "manufacturing",
    name: "Hank Mueller",
    title: "Quality Manager",
    location: "Milwaukee, WI",
    siteDescription:
      "Quality manager who treats SPC and the QMS as one system: the chart on the line and the audit trail in the office have to tell the same story.",
    summary:
      "<p>I run quality for Milwaukee Gauge Works, a 280-person precision machining house. Incoming, in-process, and dock audit sit on the same control plan. When a chart goes unstable, the reaction is a process change, not a stack of sort tickets.</p><p>I spent six years as a quality engineer before I took the manager seat. The work that stuck was teaching operators to read their own charts and teaching auditors to leave the floor with evidence, not opinions.</p>",
    skills: [
      {
        name: "SPC",
        description:
          "Stood up real-time control charts on 14 CNC cells. Cpk on the flagship bore family rose from 1.12 to 1.48 after the reaction plans were actually followed.",
        yearStarted: 2010,
      },
      {
        name: "Quality Management",
        description:
          "Own the IATF 16949 QMS: control plans, MSA, layered process audits, and the management review that does not recycle last year's actions.",
        yearStarted: 2014,
      },
      {
        name: "Quality Improvement",
        description:
          "Cut customer PPM from 412 to 67 in three years by killing recurring grind and heat-treat escapes at the source.",
        yearStarted: 2012,
      },
      {
        name: "Six Sigma",
        description:
          "Black Belt projects on grind burn and bore taper. Combined scrap savings of $1.1M over two fiscal years.",
        yearStarted: 2015,
      },
      {
        name: "Internal Controls",
        description:
          "Rebuilt the hold-tag and concession path so nonconforming product could not reach the dock without a signed disposition.",
        yearStarted: 2016,
      },
      {
        name: "ERP",
        description:
          "Tied inspection lots and certificates of conformance to the ERP traveler so the dock could not ship a lot the lab had not released.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Run the customer quality reviews and the registrar visits. Same packet, same owners, no surprise findings.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Milwaukee Gauge Works",
        description:
          "Precision machining and gauge house serving heavy truck and ag OEMs. 280 people, IATF 16949.",
        location: "Milwaukee, WI",
        startDate: "2020-08-01",
        positions: [
          {
            title: "Quality Manager",
            startDate: "2020-08-01",
            projects: [
              {
                name: "In-process SPC on 14 cells",
                description:
                  "Moved bore and grind checks from end-of-shift samples to real-time charts with documented reaction plans. Cpk on the flagship family rose from 1.12 to 1.48.",
                skills: ["SPC", "Quality Improvement", "Six Sigma"],
              },
              {
                name: "QMS and layered audit reset",
                description:
                  "Rewrote control plans and layered process audits after a customer special status. Cleared the status in seven months with zero majors on the next registrar visit.",
                skills: ["Quality Management", "Internal Controls", "Stakeholder Management"],
              },
              {
                name: "ERP lot-release lock",
                description:
                  "Blocked dock shipment in the ERP until the lab released the lot. Escapes tied to skipped inspection dropped to zero in the following two quarters.",
                skills: ["ERP", "Internal Controls"],
              },
            ],
          },
        ],
      },
      {
        name: "Fox River Assemblies",
        description:
          "Hydraulic assembly plant in Racine. High-mix valves and manifolds for mobile equipment.",
        location: "Racine, WI",
        startDate: "2014-02-01",
        endDate: "2020-07-31",
        positions: [
          {
            title: "Senior Quality Engineer",
            startDate: "2018-01-01",
            endDate: "2020-07-31",
            projects: [
              {
                name: "Leak-test capability study",
                description:
                  "Ran a Six Sigma project on the end-of-line leak tester. False fails fell 54% and the customer returned the line to standard sampling.",
                skills: ["Six Sigma", "SPC", "Quality Improvement"],
              },
              {
                name: "Supplier PPAP recovery",
                description:
                  "Rebuilt incoming inspection and PPAP evidence for three chronic suppliers. Incoming PPM from those sources fell 71%.",
                skills: ["Quality Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Quality Engineer",
            startDate: "2014-02-01",
            endDate: "2017-12-31",
            projects: [
              {
                name: "First control plans for new manifold",
                description:
                  "Wrote the launch control plan and MSA for a new manifold family. Launch PPM stayed under 80 against a 250 target.",
                skills: ["Quality Management", "SPC"],
              },
              {
                name: "Hold-tag discipline",
                description:
                  "Closed the gap between red-tag inventory and the system of record. A physical audit found 100% of tagged lots in the hold cage.",
                skills: ["Internal Controls", "ERP"],
              },
            ],
          },
        ],
      },
      {
        name: "Lakeshore Foundry",
        description: "Gray-iron foundry in Sheboygan with a small machining annex.",
        location: "Sheboygan, WI",
        startDate: "2010-05-01",
        endDate: "2014-01-31",
        positions: [
          {
            title: "Quality Engineer",
            startDate: "2010-05-01",
            endDate: "2014-01-31",
            projects: [
              {
                name: "Pour-temperature charts",
                description:
                  "Put SPC on pour temperature and chemistry. Scrap from misruns and hard spots fell 16% in the first year.",
                skills: ["SPC", "Quality Improvement"],
              },
              {
                name: "Dimensional layout lab",
                description:
                  "Stood up a layout bench and a gage R&R cadence so machining could stop guessing at foundry variation.",
                skills: ["Quality Management", "SPC"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Wisconsin–Madison",
        degree: "B.S. Mechanical Engineering",
        dateAwarded: "2010-05-15",
      },
    ],
    certifications: [
      {
        name: "Certified Quality Engineer",
        issuer: "ASQ",
        dateAwarded: "2016-06-11",
        credentialId: "ASQ-CQE-88421",
      },
      {
        name: "Six Sigma Black Belt",
        issuer: "IASSC",
        dateAwarded: "2017-09-22",
        credentialId: "IASSC-BB-HM-2017",
      },
    ],
    featuredProjects: [
      {
        name: "Real-time SPC for precision bores",
        description:
          "<p>Fourteen CNC cells on live control charts with reaction plans operators actually run. Capability on the flagship bore family moved from 1.12 to 1.48 Cpk without adding inspectors.</p>",
        links: [
          { label: "SPC program", url: "https://www.example.com/mueller-spc" },
          { label: "Reaction plan kit", url: "https://www.example.com/mueller-spc-kit" },
        ],
        skills: ["SPC", "Quality Improvement", "Six Sigma"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "manufacturing",
    name: "Rosa Delgado",
    title: "Production Planner",
    location: "Cincinnati, OH",
    siteDescription:
      "Production planner who keeps the master schedule, the ERP, and the floor in the same week. Mix changes land as a plan, not a surprise kit shortage.",
    summary:
      "<p>I own the master schedule for Ohio Valley Fasteners, a high-mix heading and threading plant. The work is finite capacity, not a wish list: heat-treat windows, tool changes, and customer dock dates sit in one ERP plan that the floor can actually run.</p><p>I started as a materials planner and learned that a pretty Gantt chart is worthless if the steel is still on a truck. I plan from inventory and confirmed supply, then I replan when the week breaks — which it will.</p>",
    skills: [
      {
        name: "Production Planning",
        description:
          "Build and freeze a weekly master schedule for 1,200 SKUs across heading, threading, and heat treat. Schedule adherence held at 94% last year.",
        yearStarted: 2017,
      },
      {
        name: "ERP",
        description:
          "Own MRP parameters, finite-capacity work centers, and the exception queue in the plant ERP. Cleaned 2,400 stale BOMs and lead times in the first nine months.",
        yearStarted: 2017,
      },
      {
        name: "Inventory Optimization",
        description:
          "Reset safety stock and order multiples by family. Finished-goods turns rose from 6.1 to 8.4 without a service miss on A items.",
        yearStarted: 2018,
      },
      {
        name: "S&OP",
        description:
          "Feed the plant into the monthly S&OP with a capacity story the sales team cannot ignore: which families are full and which can take a promotion.",
        yearStarted: 2019,
      },
      {
        name: "Demand Planning",
        description:
          "Reconcile customer forecasts with actuals before they become a firm schedule. Bias on the top 40 SKUs dropped from 18% to 6%.",
        yearStarted: 2018,
      },
      {
        name: "Lean Manufacturing",
        description:
          "Sequence the heading cells for fewer diameter changes. Average weekly changeovers fell 21% after the sequence rules went into the ERP.",
        yearStarted: 2019,
      },
      {
        name: "Stakeholder Management",
        description:
          "Run the Monday plan meeting with sales, purchasing, and the floor. One list of breaks, one owner each.",
        yearStarted: 2019,
      },
      {
        name: "Change Management",
        description:
          "Moved planners and supervisors off shared spreadsheets onto the ERP as the schedule of record. The spreadsheet died in week six.",
        yearStarted: 2020,
      },
    ],
    companies: [
      {
        name: "Ohio Valley Fasteners",
        description:
          "Heading, threading, and heat-treat plant. 1,200 active SKUs for automotive and industrial distributors.",
        location: "Cincinnati, OH",
        startDate: "2022-01-10",
        positions: [
          {
            title: "Production Planner",
            startDate: "2022-01-10",
            projects: [
              {
                name: "Finite-capacity master schedule",
                description:
                  "Rebuilt the weekly schedule around heat-treat windows and heading-cell constraints. Schedule adherence rose from 81% to 94% in three quarters.",
                skills: ["Production Planning", "ERP", "Lean Manufacturing"],
              },
              {
                name: "Safety-stock and lot-size reset",
                description:
                  "Recalculated safety stock and order multiples by family. Turns rose from 6.1 to 8.4 and A-item fill stayed above 98.7%.",
                skills: ["Inventory Optimization", "Demand Planning"],
              },
              {
                name: "S&OP capacity pack",
                description:
                  "Brought a one-page capacity story to monthly S&OP so promotions stopped landing on already-full families.",
                skills: ["S&OP", "Stakeholder Management", "Change Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Queen City Coatings",
        description:
          "Industrial coatings and fastener finishing house on the west side of Cincinnati.",
        location: "Cincinnati, OH",
        startDate: "2017-04-01",
        endDate: "2021-12-31",
        positions: [
          {
            title: "Master Scheduler",
            startDate: "2019-06-01",
            endDate: "2021-12-31",
            projects: [
              {
                name: "Line-load model for e-coat",
                description:
                  "Built a hang-density and cure-window model so the e-coat line stopped overbooking Thursday. On-time finish rose 11 points.",
                skills: ["Production Planning", "ERP"],
              },
              {
                name: "Exception-queue hygiene",
                description:
                  "Cut the MRP exception list from 900 to under 120 by fixing lead times and phantom BOMs. Planners stopped living in firefighting.",
                skills: ["ERP", "Change Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Materials Planner",
            startDate: "2017-04-01",
            endDate: "2019-05-31",
            projects: [
              {
                name: "Resin and pigment coverage",
                description:
                  "Reset min/max on 80 process chemicals. Stockouts of A resins dropped from 9 a quarter to 1.",
                skills: ["Inventory Optimization", "Demand Planning"],
              },
              {
                name: "Customer forecast reconciliation",
                description:
                  "Started a monthly bias review with the two largest distributors. Overbuilds on their specials fell 34%.",
                skills: ["Demand Planning", "S&OP"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Cincinnati",
        degree: "B.S. Operations Management",
        dateAwarded: "2017-05-06",
      },
    ],
    certifications: [
      {
        name: "CPIM",
        issuer: "ASCM",
        dateAwarded: "2020-03-14",
        credentialId: "ASCM-CPIM-RD-44019",
      },
      {
        name: "CSCP",
        issuer: "ASCM",
        dateAwarded: "2023-06-09",
        credentialId: "ASCM-CSCP-RD-11802",
      },
    ],
    featuredProjects: [
      {
        name: "Finite-capacity schedule for a fastener plant",
        description:
          "<p>A weekly master schedule that respects heat-treat windows and heading-cell changeovers. Adherence moved from 81% to 94% and the Friday fire drill stopped being the plan.</p>",
        links: [
          { label: "Scheduling model", url: "https://www.example.com/delgado-finite-schedule" },
        ],
        skills: ["Production Planning", "ERP", "Lean Manufacturing"],
      },
      {
        name: "Inventory policy by fastener family",
        description:
          "<p>Safety stock and lot sizes reset from actual demand and setup cost, not tribal min/max. Turns rose from 6.1 to 8.4 with A-item fill still above 98.7%.</p>",
        links: [
          { label: "Policy paper", url: "https://www.example.com/delgado-inventory-policy" },
          { label: "Family scorecard", url: "https://www.example.com/delgado-inventory-scorecard" },
        ],
        skills: ["Inventory Optimization", "Demand Planning"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "manufacturing",
    name: "Arjun Singh",
    title: "Continuous Improvement Lead",
    location: "Greenville, SC",
    siteDescription:
      "Continuous improvement lead who runs Six Sigma and TPM as a plant system, not a project of the month. The savings have to show up in the P&L.",
    summary:
      "<p>I lead CI for Carolina Drive Systems, a 360-person gearbox and drive plant in Greenville. The portfolio is a mix of Six Sigma on chronic scrap and TPM on the assets that stop the whole line. I do not start a project that cannot name the dollar and the owner.</p><p>I came through process engineering and maintenance planning. The plants that improve are the ones that keep the same method after the champion leaves. I write the method down, train the supervisors, and then I audit whether they still use it on night shift.</p>",
    skills: [
      {
        name: "Six Sigma",
        description:
          "Black Belt portfolio on grind burn, seal leak, and heat-treat distortion. $2.4M validated scrap and rework savings over three years.",
        yearStarted: 2015,
      },
      {
        name: "TPM",
        description:
          "Rolled autonomous and planned maintenance across 18 critical assets. OEE on the assembly spine rose from 61% to 74%.",
        yearStarted: 2016,
      },
      {
        name: "Lean Manufacturing",
        description:
          "Value-stream maps and standard work for two gearbox families. Dock-to-dock time fell 19% after the supermarket and pull signals went in.",
        yearStarted: 2015,
      },
      {
        name: "Quality Improvement",
        description:
          "Closed the top five customer complaints by family with permanent process changes, not extra inspection.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Trained 40 team leads on A3 and layered audits so CI is not a staff function that visits the floor.",
        yearStarted: 2018,
      },
      {
        name: "Program Management",
        description:
          "Run a 12-project CI slate with a monthly steering review. On-time project close held at 83% last year.",
        yearStarted: 2019,
      },
      {
        name: "Process Safety",
        description:
          "Folded lockout and confined-space checks into TPM routes so a maintenance win did not become a safety miss.",
        yearStarted: 2014,
      },
      {
        name: "Maintenance Planning",
        description:
          "Built a planned-maintenance calendar from failure history instead of a copied OEM list. Emergency work orders fell 27%.",
        yearStarted: 2012,
      },
    ],
    companies: [
      {
        name: "Carolina Drive Systems",
        description:
          "Gearbox and industrial drive plant. 360 people, two assembly spines, and a heat-treat bay.",
        location: "Greenville, SC",
        startDate: "2021-09-01",
        positions: [
          {
            title: "Continuous Improvement Lead",
            startDate: "2021-09-01",
            projects: [
              {
                name: "Assembly-spine TPM",
                description:
                  "Autonomous and planned maintenance on 18 assets that gate the spine. OEE rose from 61% to 74% and weekend recovery hours fell 36%.",
                skills: ["TPM", "Maintenance Planning", "Process Safety"],
              },
              {
                name: "Seal-leak Six Sigma",
                description:
                  "DMAIC on a chronic seal leak. Process change at press-fit, not another 100% air test. Customer returns on that family dropped 81%.",
                skills: ["Six Sigma", "Quality Improvement"],
              },
              {
                name: "CI slate and A3 academy",
                description:
                  "Twelve-project portfolio with team-lead A3 training. 10 of 12 projects closed on the committed date with finance-signed savings.",
                skills: ["Program Management", "Change Management", "Lean Manufacturing"],
              },
            ],
          },
        ],
      },
      {
        name: "Piedmont Textile Works",
        description:
          "Industrial textile and belt plant in Spartanburg. High-mix finishing and slitting.",
        location: "Spartanburg, SC",
        startDate: "2015-01-12",
        endDate: "2021-08-15",
        positions: [
          {
            title: "Continuous Improvement Engineer",
            startDate: "2018-03-01",
            endDate: "2021-08-15",
            projects: [
              {
                name: "Slitter changeover SMED",
                description:
                  "Cut slitter changeover from 52 to 24 minutes with staged knives and a two-person standard. Released a sixth run per shift.",
                skills: ["Lean Manufacturing", "Change Management"],
              },
              {
                name: "Dye-lot variation",
                description:
                  "Six Sigma on shade variation. Rework yards fell 44% after the recipe and hold-time controls stuck.",
                skills: ["Six Sigma", "Quality Improvement"],
              },
            ],
          },
          {
            title: "Process Engineer",
            startDate: "2015-01-12",
            endDate: "2018-02-28",
            projects: [
              {
                name: "Finishing-line standard work",
                description:
                  "Wrote the first standard work for the finishing line and trained both shifts. First-pass yield rose 3.6 points.",
                skills: ["Lean Manufacturing", "Quality Improvement"],
              },
              {
                name: "Planned-maintenance calendar",
                description:
                  "Replaced the copied OEM PM list with a calendar from failure history. Emergency work orders fell 22% in a year.",
                skills: ["Maintenance Planning", "TPM"],
              },
            ],
          },
        ],
      },
      {
        name: "Upstate Bearings",
        description:
          "Bearing grind and assembly shop in Anderson. Small plant, thin maintenance bench.",
        location: "Anderson, SC",
        startDate: "2012-08-01",
        endDate: "2014-12-19",
        positions: [
          {
            title: "Maintenance Planner",
            startDate: "2012-08-01",
            endDate: "2014-12-19",
            projects: [
              {
                name: "Work-order backlog purge",
                description:
                  "Closed or killed 600 stale work orders and stood up a weekly planning meeting. Planned work rose from 31% to 58% of hours.",
                skills: ["Maintenance Planning", "Program Management"],
              },
              {
                name: "Lockout cards on grinders",
                description:
                  "Wrote equipment-specific lockout cards with the trades. The next insurance survey cleared the prior finding.",
                skills: ["Process Safety", "TPM"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Clemson University",
        degree: "B.S. Industrial Engineering",
        dateAwarded: "2012-05-11",
      },
      {
        school: "Clemson University",
        degree: "M.S. Industrial Engineering",
        dateAwarded: "2018-12-14",
      },
    ],
    certifications: [
      {
        name: "Six Sigma Black Belt",
        issuer: "ASQ",
        dateAwarded: "2019-04-20",
        credentialId: "ASQ-SSBB-SINGH-441",
      },
      {
        name: "Certified TPM Facilitator",
        issuer: "Japan Institute of Plant Maintenance",
        dateAwarded: "2022-10-07",
        credentialId: "JIPM-TPM-AS-2207",
      },
    ],
    featuredProjects: [
      {
        name: "Gearbox spine TPM system",
        description:
          "<p>Autonomous and planned maintenance on the 18 assets that gate assembly. OEE moved from 61% to 74%, and the weekend became a planned window instead of a rescue.</p>",
        links: [
          { label: "TPM system", url: "https://www.example.com/singh-tpm" },
          { label: "Route cards", url: "https://www.example.com/singh-tpm-routes" },
        ],
        skills: ["TPM", "Maintenance Planning", "Process Safety"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "supply-chain",
    name: "Nora Kim",
    title: "Demand Planning Manager",
    location: "Chicago, IL",
    siteDescription:
      "Demand planning manager who runs S&OP as a monthly decision, not a slide ritual. Forecast bias is a number with an owner.",
    summary:
      "<p>I lead demand planning for Prairie Brands Co-op, a Midwest CPG portfolio with 4,800 SKUs and a retail calendar that does not forgive a late shipper. The forecast is a statistical baseline plus a sales override that has to earn its keep in the monthly S&OP.</p><p>I measure bias and WAPE by family, not a single corporate MAPE that hides the damage. When a promotion overstates lift, it shows up as a name on the exception list, not a write-off in quarter close.</p>",
    skills: [
      {
        name: "Demand Planning",
        description:
          "Own the statistical baseline and override process for 4,800 SKUs. WAPE on A items fell from 31% to 19% after we killed unearned sales overrides.",
        yearStarted: 2016,
      },
      {
        name: "S&OP",
        description:
          "Run the monthly demand and supply reviews with a one-page decision log. Consensus volume variance to actuals held inside 4% last year.",
        yearStarted: 2018,
      },
      {
        name: "Inventory Optimization",
        description:
          "Reset safety stock from demand variability, not a flat weeks-of-cover. Excess on C items dropped $6.2M without hurting A-item fill.",
        yearStarted: 2018,
      },
      {
        name: "ERP",
        description:
          "Keep the demand plan as the ERP forecast of record. Stopped the shadow spreadsheet that purchasing still trusted more than the system.",
        yearStarted: 2017,
      },
      {
        name: "Market Analysis",
        description:
          "Read retailer POS and shipment data for the top 12 accounts so a promo in one banner does not get copied blindly to the rest.",
        yearStarted: 2019,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold sales, marketing, and supply to one number. The override has to survive a 15-minute challenge, or it does not enter the plan.",
        yearStarted: 2018,
      },
      {
        name: "Python",
        description:
          "Build the exception reports and bias dashboards that the planning suite does not ship. Weekly pack lands before the S&OP pre-read.",
        yearStarted: 2019,
      },
      {
        name: "Change Management",
        description:
          "Moved six planners and the sales directors onto a single override policy. The old 'just add 10%' habit died in two cycles.",
        yearStarted: 2020,
      },
    ],
    companies: [
      {
        name: "Prairie Brands Co-op",
        description:
          "Midwest CPG co-op: pantry, refrigerated, and foodservice. 4,800 SKUs into grocery and club.",
        location: "Chicago, IL",
        startDate: "2021-02-01",
        positions: [
          {
            title: "Demand Planning Manager",
            startDate: "2021-02-01",
            projects: [
              {
                name: "Override policy and bias review",
                description:
                  "Required a reason code and a lookback for every sales override. A-item WAPE fell from 31% to 19% and unearned lift stopped flooding the plants.",
                skills: ["Demand Planning", "Stakeholder Management", "Change Management"],
              },
              {
                name: "Monthly S&OP decision log",
                description:
                  "Replaced a 60-slide pack with a one-page decision log. Consensus volume finished the year inside 4% of actuals.",
                skills: ["S&OP", "Market Analysis"],
              },
              {
                name: "Safety-stock from variability",
                description:
                  "Recut safety stock by family using demand variability and lead time. Excess on C items dropped $6.2M; A-item fill held at 98.1%.",
                skills: ["Inventory Optimization", "ERP", "Python"],
              },
            ],
          },
        ],
      },
      {
        name: "Lakeshore Grocery Group",
        description:
          "Regional grocery wholesaler serving 190 independent stores across Illinois, Wisconsin, and Indiana.",
        location: "Chicago, IL",
        startDate: "2016-06-01",
        endDate: "2021-01-15",
        positions: [
          {
            title: "Senior Demand Planner",
            startDate: "2018-09-01",
            endDate: "2021-01-15",
            projects: [
              {
                name: "Store-cluster forecasts",
                description:
                  "Split the forecast into four store clusters instead of one chain number. Produce shrink fell 12% in the first two seasons.",
                skills: ["Demand Planning", "Market Analysis", "Python"],
              },
              {
                name: "Promotional lift model",
                description:
                  "Built a simple lift model from two years of circulars. Overbuilds on holiday shippers fell 29%.",
                skills: ["Demand Planning", "S&OP"],
              },
            ],
          },
          {
            title: "Demand Planner",
            startDate: "2016-06-01",
            endDate: "2018-08-31",
            projects: [
              {
                name: "ERP forecast of record",
                description:
                  "Moved grocery and HBC forecasts out of a shared workbook into the ERP. Purchasing stopped placing from a stale copy.",
                skills: ["ERP", "Change Management"],
              },
              {
                name: "Exception queue for A items",
                description:
                  "Daily exception list for the top 200 SKUs. Stockouts on those items dropped 18% in two quarters.",
                skills: ["Demand Planning", "Inventory Optimization"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Northwestern University",
        degree: "B.S. Industrial Engineering and Management Sciences",
        dateAwarded: "2016-06-17",
      },
    ],
    certifications: [
      {
        name: "CSCP",
        issuer: "ASCM",
        dateAwarded: "2020-11-06",
        credentialId: "ASCM-CSCP-NK-90211",
      },
      {
        name: "Demand Planning Certificate",
        issuer: "Institute of Business Forecasting",
        dateAwarded: "2022-05-13",
        credentialId: "IBF-DP-NK-2213",
      },
    ],
    featuredProjects: [
      {
        name: "S&OP that decides, not recites",
        description:
          "<p>A monthly demand and supply review with a one-page decision log. Consensus volume finished inside 4% of actuals, and overrides had to survive a 15-minute challenge.</p>",
        links: [
          { label: "S&OP pack", url: "https://www.example.com/nora-kim-sop" },
          { label: "Override policy", url: "https://www.example.com/nora-kim-overrides" },
        ],
        skills: ["S&OP", "Demand Planning", "Stakeholder Management"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "supply-chain",
    name: "Mateo Cruz",
    title: "Network Design Lead",
    location: "Atlanta, GA",
    siteDescription:
      "Network design lead who treats DC locations, lanes, and inventory as one model. The map has to beat the current cost-to-serve, or it stays a slide.",
    summary:
      "<p>I lead network design for Ridgeway Logistics, a 3PL and private-fleet operator serving grocery and industrial shippers out of the Southeast. The work is greenfield DC siting, lane redesign, and the inventory that has to move when the map changes.</p><p>I build the model in code, then I sit with operations until the recommended flow can actually be staffed. A cheaper network that the warehouses cannot run is not a cheaper network.</p>",
    skills: [
      {
        name: "Network Optimization",
        description:
          "Greenfield and brownfield models for DC siting and flow-path. Last study cut landed cost 8.4% on a $210M transportation-and-warehousing base.",
        yearStarted: 2016,
      },
      {
        name: "Network Planning",
        description:
          "Annual network plan and mid-year refresh for 11 DCs and 4 cross-docks. Capacity and lane decisions land in the same packet as the budget.",
        yearStarted: 2017,
      },
      {
        name: "TMS",
        description:
          "Use TMS actuals — not the rate card — as the cost layer in the model. Lane recommendations have to survive a month of tender history.",
        yearStarted: 2015,
      },
      {
        name: "Warehouse Management",
        description:
          "Translate a new flow-path into slotting, dock-door, and labor assumptions the DC managers will sign.",
        yearStarted: 2016,
      },
      {
        name: "Inventory Optimization",
        description:
          "Reposition safety stock when a DC opens or closes. The inventory move is part of the business case, not a surprise in week three.",
        yearStarted: 2018,
      },
      {
        name: "Python",
        description:
          "Build the solvers, scenario packs, and cost-to-serve maps. The planning suite is the store of record; the model lives where I can test it.",
        yearStarted: 2014,
      },
      {
        name: "Financial Modeling",
        description:
          "Five-year cash and P&L for each scenario, including one-time inventory and severance. Finance uses my pack, not a restated version.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Walk operations, sales, and finance through the same three scenarios. The choice is recorded; the other two stay in the appendix.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Ridgeway Logistics",
        description:
          "Southeast 3PL and dedicated fleet. 11 DCs, 4 cross-docks, grocery and industrial shippers.",
        location: "Atlanta, GA",
        startDate: "2022-03-01",
        positions: [
          {
            title: "Network Design Lead",
            startDate: "2022-03-01",
            projects: [
              {
                name: "Carolinas DC greenfield",
                description:
                  "Sited a 420k sq ft DC near Concord to pull volume off Atlanta and Savannah. Modeled 8.4% landed-cost reduction on a $210M base; the board funded it.",
                skills: ["Network Optimization", "Financial Modeling", "Stakeholder Management"],
              },
              {
                name: "Flow-path and inventory reposition",
                description:
                  "Reassigned 1,100 SKUs and rebuilt safety stock for the new node. The inventory move was in the case, not a week-three surprise.",
                skills: ["Inventory Optimization", "Warehouse Management", "Network Planning"],
              },
              {
                name: "TMS-actual cost layer",
                description:
                  "Replaced the rate-card layer with 12 months of TMS tenders and accessorials. Two 'savings' lanes died when real cost showed up.",
                skills: ["TMS", "Python", "Network Optimization"],
              },
            ],
          },
        ],
      },
      {
        name: "Southern Spoke Distribution",
        description:
          "Regional LTL and pool distributor based in Atlanta, serving the Southeast and Mid-South.",
        location: "Atlanta, GA",
        startDate: "2016-08-01",
        endDate: "2022-02-28",
        positions: [
          {
            title: "Senior Network Analyst",
            startDate: "2019-05-01",
            endDate: "2022-02-28",
            projects: [
              {
                name: "Cross-dock consolidation",
                description:
                  "Closed one underused cross-dock and re-routed 18 lanes. Transportation cost per hundredweight fell 6.1% with service still inside the SLA.",
                skills: ["Network Optimization", "TMS", "Network Planning"],
              },
              {
                name: "Cost-to-serve by shipper",
                description:
                  "Built a cost-to-serve map that sales could use in pricing. Two unprofitable shippers were repriced or exited.",
                skills: ["Financial Modeling", "Python", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Network Analyst",
            startDate: "2016-08-01",
            endDate: "2019-04-30",
            projects: [
              {
                name: "Lane-rate sanity check",
                description:
                  "Reconciled TMS rates to invoices on the top 40 lanes. Found $1.3M in accessorial leakage in the first year.",
                skills: ["TMS", "Financial Modeling"],
              },
              {
                name: "Saturday pool redesign",
                description:
                  "Redrew Saturday pool routes for grocery. On-time delivery rose 5 points without adding tractors.",
                skills: ["Network Planning", "Warehouse Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Gulfport Intermodal",
        description:
          "Port and rail intermodal operator in Savannah moving containers for Southeast importers.",
        location: "Savannah, GA",
        startDate: "2013-07-01",
        endDate: "2016-07-15",
        positions: [
          {
            title: "Transportation Analyst",
            startDate: "2013-07-01",
            endDate: "2016-07-15",
            projects: [
              {
                name: "Drayage lane model",
                description:
                  "Modeled drayage vs. rail for inland points. Shifted 12% of volume to rail with a two-day service hold.",
                skills: ["Network Optimization", "Python"],
              },
              {
                name: "Dwell dashboard",
                description:
                  "Daily dwell and chassis report for the yard team. Average dwell fell 0.6 days in two quarters.",
                skills: ["TMS", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgia Institute of Technology",
        degree: "B.S. Industrial Engineering",
        dateAwarded: "2013-05-04",
      },
      {
        school: "Georgia Institute of Technology",
        degree: "M.S. Supply Chain Engineering",
        dateAwarded: "2017-12-16",
      },
    ],
    certifications: [
      {
        name: "CSCP",
        issuer: "ASCM",
        dateAwarded: "2019-08-23",
        credentialId: "ASCM-CSCP-MC-77310",
      },
      {
        name: "Certificate, Supply Chain Engineering",
        issuer: "Georgia Institute of Technology",
        dateAwarded: "2021-02-19",
        credentialId: "GATECH-SCE-MC-1104",
      },
    ],
    featuredProjects: [
      {
        name: "Carolinas greenfield network case",
        description:
          "<p>A DC siting and flow-path study that used TMS actuals, not the rate card. The board funded a 420k sq ft node after the model showed 8.4% landed-cost reduction on a $210M base.</p>",
        links: [
          { label: "Network case", url: "https://www.example.com/cruz-carolinas-dc" },
          { label: "Scenario pack", url: "https://www.example.com/cruz-carolinas-scenarios" },
        ],
        skills: ["Network Optimization", "Financial Modeling", "TMS"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "supply-chain",
    name: "Faith Okoro",
    title: "Director of Procurement",
    location: "Memphis, TN",
    siteDescription:
      "Procurement director who treats strategic sourcing as a P&L lever: should-cost, dual source, and a contract the plant can actually live with.",
    summary:
      "<p>I run procurement for Riverbend Sourcing, a $640M indirect and direct spend book for a Mid-South industrial group. The work is category strategy, should-cost, and contracts that operations will honor — not a savings slide that dies in the first change order.</p><p>I came up as a buyer on metals and MRO. The suppliers who stay are the ones who can explain a price move and still hit the dock date. I dual-source the risk, I do not pretend a single source is a partnership.</p>",
    skills: [
      {
        name: "Procurement",
        description:
          "Own $640M in direct and indirect spend. Last cycle delivered $28M in validated savings with service levels still inside the plant SLAs.",
        yearStarted: 2011,
      },
      {
        name: "Contract Negotiation",
        description:
          "Lead MSAs, index clauses, and volume commitments so a steel move does not become an emergency PO at the spot price.",
        yearStarted: 2014,
      },
      {
        name: "Stakeholder Management",
        description:
          "Plant managers, engineering, and finance sit on the category teams. A savings number they did not help write does not ship.",
        yearStarted: 2017,
      },
      {
        name: "ERP",
        description:
          "Cleaned item masters, approved-vendor lists, and three-way match so maverick spend had nowhere to hide.",
        yearStarted: 2014,
      },
      {
        name: "Inventory Optimization",
        description:
          "Reset consignment and VMI on MRO and fasteners. Stores inventory dropped 18% without a line-down for a missing insert.",
        yearStarted: 2018,
      },
      {
        name: "Change Management",
        description:
          "Moved six plants onto a single approved-vendor list. The local 'we've always used them' exception now needs a VP signature.",
        yearStarted: 2018,
      },
      {
        name: "Program Management",
        description:
          "Run a 20-category sourcing slate with a quarterly steering review. On-time award held at 85% last year.",
        yearStarted: 2017,
      },
      {
        name: "Relationship Management",
        description:
          "Quarterly business reviews with the top 25 suppliers. Scorecards cover cost, quality, and dock performance — not a lunch.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Riverbend Sourcing",
        description:
          "Procurement arm of a Mid-South industrial group. Metals, MRO, packaging, and logistics spend.",
        location: "Memphis, TN",
        startDate: "2020-06-01",
        positions: [
          {
            title: "Director of Procurement",
            startDate: "2020-06-01",
            projects: [
              {
                name: "Metals should-cost and dual source",
                description:
                  "Rebid hot-roll and bar with a should-cost model and a second qualified mill. Validated $11M on a $190M metals book without a quality escape.",
                skills: ["Procurement", "Contract Negotiation", "Program Management"],
              },
              {
                name: "Approved-vendor and ERP match",
                description:
                  "Collapsed six plant vendor lists into one and turned on three-way match. Maverick spend fell from 14% to 4% of addressable PO dollars.",
                skills: ["ERP", "Change Management", "Stakeholder Management"],
              },
              {
                name: "MRO consignment reset",
                description:
                  "Moved inserts, bearings, and PPE onto consignment and VMI. Stores inventory dropped 18% and line-down stockouts on those items went to zero.",
                skills: ["Inventory Optimization", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Cotton Belt Industrials",
        description:
          "Industrial distributor and light manufacturer of conveying and packaging equipment.",
        location: "Memphis, TN",
        startDate: "2014-03-01",
        endDate: "2020-05-31",
        positions: [
          {
            title: "Category Manager",
            startDate: "2017-01-01",
            endDate: "2020-05-31",
            projects: [
              {
                name: "Motor and drive category",
                description:
                  "Consolidated four brands to two with a dual-source clause. Unit cost fell 9% and lead-time variability dropped by a week.",
                skills: ["Procurement", "Contract Negotiation", "Relationship Management"],
              },
              {
                name: "Packaging rebid",
                description:
                  "Rebid corrugate and dunnage across three plants. $3.4M savings with a shared spec engineering signed.",
                skills: ["Procurement", "Stakeholder Management", "Program Management"],
              },
            ],
          },
          {
            title: "Buyer",
            startDate: "2014-03-01",
            endDate: "2016-12-31",
            projects: [
              {
                name: "MRO punchout and item master",
                description:
                  "Stood up punchout catalogs and cleaned 8,000 MRO items. Spot buys of the same insert under five SKUs stopped.",
                skills: ["ERP", "Procurement"],
              },
              {
                name: "Expedite discipline",
                description:
                  "Required a reason code and a plant sign-off for expedites. Premium freight on my book fell 37% in a year.",
                skills: ["Change Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Delta Alloy Trading",
        description:
          "Regional metals trader in Jackson buying and reselling bar, plate, and structurals.",
        location: "Jackson, MS",
        startDate: "2011-09-01",
        endDate: "2014-02-28",
        positions: [
          {
            title: "Junior Buyer",
            startDate: "2011-09-01",
            endDate: "2014-02-28",
            projects: [
              {
                name: "Mill allocation book",
                description:
                  "Kept the allocation book and the spot book separate so a customer promise did not eat the mill reserve.",
                skills: ["Procurement", "Inventory Optimization"],
              },
              {
                name: "Claim and debit file",
                description:
                  "Closed quality claims with mills inside 30 days. Recovered $410k in a year that had been dying in email.",
                skills: ["Contract Negotiation", "Relationship Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Memphis",
        degree: "B.B.A. Supply Chain Management",
        dateAwarded: "2011-05-07",
      },
      {
        school: "University of Tennessee, Knoxville",
        degree: "M.S. Supply Chain Management",
        dateAwarded: "2018-05-12",
      },
    ],
    certifications: [
      {
        name: "CPSM",
        issuer: "Institute for Supply Management",
        dateAwarded: "2019-03-29",
        credentialId: "ISM-CPSM-FO-33901",
      },
      {
        name: "CSCP",
        issuer: "ASCM",
        dateAwarded: "2021-09-17",
        credentialId: "ASCM-CSCP-FO-55102",
      },
    ],
    featuredProjects: [
      {
        name: "Metals dual-source program",
        description:
          "<p>A should-cost and dual-source program on hot-roll and bar. $11M validated on a $190M book, with a second mill qualified before the index clause was signed.</p>",
        links: [
          { label: "Category case", url: "https://www.example.com/okoro-metals" },
          { label: "Should-cost outline", url: "https://www.example.com/okoro-should-cost" },
        ],
        skills: ["Procurement", "Contract Negotiation", "Program Management"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "supply-chain",
    name: "Elliot Ward",
    title: "Warehouse Operations Manager",
    location: "Columbus, OH",
    siteDescription:
      "Warehouse operations manager who runs WMS, slotting, and labor as one system. Inventory accuracy is a process, not a cycle-count holiday.",
    summary:
      "<p>I run a 720k sq ft ambient and cooler campus for Scioto Fulfillment in Columbus. The building ships grocery and industrial for three national accounts. The job is WMS discipline, a labor plan that matches the wave, and an inventory number the customer can audit.</p><p>I came up on nights in a cold-chain building. The warehouses that work are the ones that treat a mis-slot as a process failure, not a picker problem. I fix the location, the label, and the standard — then I measure whether it stays fixed.</p>",
    skills: [
      {
        name: "Warehouse Management",
        description:
          "Own WMS configuration, slotting, and wave planning for a 720k sq ft campus. Units per labor hour rose 17% after the slotting pass and the walk-path rewrite.",
        yearStarted: 2016,
      },
      {
        name: "Inventory Optimization",
        description:
          "Cycle-count and location-audit program that holds inventory accuracy at 99.4% without a wall-to-wall shutdown.",
        yearStarted: 2017,
      },
      {
        name: "TMS",
        description:
          "Dock-door and appointment logic tied to the TMS so carriers are not staged in the yard for two hours.",
        yearStarted: 2018,
      },
      {
        name: "Lean Manufacturing",
        description:
          "Applied lean to receiving, putaway, and pack: standard work, spaghetti maps, and a daily board. Travel per pick fell 24%.",
        yearStarted: 2018,
      },
      {
        name: "Workforce Planning",
        description:
          "Staff three shifts and a weekend flex crew from a volume forecast, not a hope. Agency hours fell 29% last year.",
        yearStarted: 2019,
      },
      {
        name: "ERP",
        description:
          "Keep WMS and ERP inventory in balance at the hour, not the week. The reconciling journal is an exception, not the close process.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Customer QBR, carrier scorecards, and a Monday volume call with planning. One number for what the building will ship.",
        yearStarted: 2019,
      },
      {
        name: "Process Safety",
        description:
          "PIT, racking, and cooler lockout standards. Recordable rate in the building dropped from 2.9 to 1.3 over two years.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Scioto Fulfillment",
        description:
          "Third-party fulfillment campus in Columbus. Ambient and cooler, grocery and industrial, 720k sq ft.",
        location: "Columbus, OH",
        startDate: "2021-11-01",
        positions: [
          {
            title: "Warehouse Operations Manager",
            startDate: "2021-11-01",
            projects: [
              {
                name: "Slotting and walk-path rewrite",
                description:
                  "Reslotted A items to the golden zone and rewrote pick paths. Units per labor hour rose 17% and travel per pick fell 24%.",
                skills: ["Warehouse Management", "Lean Manufacturing", "Workforce Planning"],
              },
              {
                name: "Cycle-count without a shutdown",
                description:
                  "Location-audit and ABC cycle counts that hold 99.4% accuracy. The annual wall-to-wall became a sample, not a holiday.",
                skills: ["Inventory Optimization", "ERP"],
              },
              {
                name: "Yard and dock-door appointments",
                description:
                  "Tied WMS dock doors to TMS appointments. Average carrier dwell fell from 94 to 41 minutes.",
                skills: ["TMS", "Stakeholder Management", "Process Safety"],
              },
            ],
          },
        ],
      },
      {
        name: "Heartland Cold Chain",
        description: "Multi-temp DC in Dayton serving Midwest grocery and foodservice.",
        location: "Dayton, OH",
        startDate: "2016-02-01",
        endDate: "2021-10-15",
        positions: [
          {
            title: "Operations Supervisor",
            startDate: "2018-09-01",
            endDate: "2021-10-15",
            projects: [
              {
                name: "Cooler wave discipline",
                description:
                  "Stopped releasing waves the cooler could not pick. Shorts on refrigerated A items fell 38%.",
                skills: ["Warehouse Management", "Workforce Planning"],
              },
              {
                name: "PIT and racking reset",
                description:
                  "Retrained PIT operators and repaired 40 damaged bays. Recordables tied to equipment fell by half in a year.",
                skills: ["Process Safety", "Workforce Planning"],
              },
            ],
          },
          {
            title: "Shift Supervisor",
            startDate: "2016-02-01",
            endDate: "2018-08-31",
            projects: [
              {
                name: "Night-shift standard work",
                description:
                  "Wrote receiving and putaway standard work for nights. Mis-slots on the night crew dropped 41%.",
                skills: ["Warehouse Management", "Lean Manufacturing"],
              },
              {
                name: "WMS–ERP nightly recon",
                description:
                  "Closed the nightly inventory recon before first wave. The morning surprise count ended.",
                skills: ["ERP", "Inventory Optimization"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Ohio State University",
        degree: "B.S. Logistics Management",
        dateAwarded: "2015-12-20",
      },
    ],
    certifications: [
      {
        name: "CLTD",
        issuer: "ASCM",
        dateAwarded: "2020-07-24",
        credentialId: "ASCM-CLTD-EW-66012",
      },
      {
        name: "OSHA 30 — General Industry",
        issuer: "OSHA Outreach",
        dateAwarded: "2017-03-11",
        credentialId: "OSHA30-EW-229184",
      },
    ],
    featuredProjects: [
      {
        name: "Columbus campus slotting program",
        description:
          "<p>A golden-zone slotting and walk-path rewrite for a 720k sq ft campus. Units per labor hour rose 17%, travel per pick fell 24%, and the labor plan finally matched the wave.</p>",
        links: [
          { label: "Slotting program", url: "https://www.example.com/ward-slotting" },
          { label: "Labor model", url: "https://www.example.com/ward-labor-model" },
        ],
        skills: ["Warehouse Management", "Lean Manufacturing", "Workforce Planning"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "human-resources",
    name: "Simone Blanchard",
    title: "Head of Talent",
    location: "New York, NY",
    siteDescription:
      "Head of talent who treats hiring as a system: workforce plan, slate quality, and an offer the hiring manager will not reopen on Friday.",
    summary:
      "<p>I lead talent for Meridian Media Group, a 2,100-person media and events company. The brief is not more requisitions. It is a workforce plan that names the roles we will fill, a slate that is actually diverse and qualified, and a process hiring managers finish.</p><p>I ran agency and in-house desks before I took the function. The searches that close are the ones with a written scorecard and a debrief that happens the same week. I install that, then I hold the business to it when they want to 'just meet one more person.'</p>",
    skills: [
      {
        name: "Talent Acquisition",
        description:
          "Own executive and volume hiring for a 2,100-person company. Time-to-offer on priority roles fell from 62 to 38 days after scorecards and same-week debriefs.",
        yearStarted: 2012,
      },
      {
        name: "Workforce Planning",
        description:
          "Annual headcount plan tied to the budget, not a pile of leftover reqs. Open reqs dropped 22% once we killed roles the business could not staff or fund.",
        yearStarted: 2018,
      },
      {
        name: "Organizational Design",
        description:
          "Partner on team shapes before the req opens. Two reorgs landed with a hiring map instead of a six-month freeze.",
        yearStarted: 2019,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold editors, sales leads, and the ELT to a written scorecard. The 'just one more candidate' request now needs a reason.",
        yearStarted: 2016,
      },
      {
        name: "Relationship Management",
        description:
          "Keep a bench of silver-medalist and passive candidates so a sudden VP search does not start from a blank Boolean.",
        yearStarted: 2014,
      },
      {
        name: "Change Management",
        description:
          "Moved 40 hiring managers onto structured interviews. Interviewer training is a prerequisite, not a suggestion.",
        yearStarted: 2018,
      },
      {
        name: "HRIS",
        description:
          "ATS and HRIS as the system of record for reqs, offers, and onboarding. The shadow tracker in a spreadsheet lost.",
        yearStarted: 2017,
      },
      {
        name: "Brand Strategy",
        description:
          "Rebuilt the careers narrative and employee stories so the company stopped losing senior editors to a louder brand.",
        yearStarted: 2020,
      },
    ],
    companies: [
      {
        name: "Meridian Media Group",
        description:
          "Media, events, and subscription brands. 2,100 employees across New York, London, and remote.",
        location: "New York, NY",
        startDate: "2022-01-03",
        positions: [
          {
            title: "Head of Talent",
            startDate: "2022-01-03",
            projects: [
              {
                name: "Scorecard and same-week debrief",
                description:
                  "Required a written scorecard and a debrief inside five business days. Time-to-offer on priority roles fell from 62 to 38 days.",
                skills: ["Talent Acquisition", "Change Management", "Stakeholder Management"],
              },
              {
                name: "Headcount plan that closes reqs",
                description:
                  "Tied the annual hiring plan to funded seats. Open reqs dropped 22% and the leftover-req pile disappeared.",
                skills: ["Workforce Planning", "Organizational Design", "HRIS"],
              },
              {
                name: "Careers narrative reset",
                description:
                  "Rewrote the careers site and employee stories. Senior editorial offer-accept rose from 61% to 78% in three quarters.",
                skills: ["Brand Strategy", "Relationship Management", "Talent Acquisition"],
              },
            ],
          },
        ],
      },
      {
        name: "Hudson Talent Exchange",
        description:
          "Retained and contingency search firm focused on media, publishing, and consumer brands.",
        location: "New York, NY",
        startDate: "2015-04-01",
        endDate: "2021-12-17",
        positions: [
          {
            title: "Talent Lead",
            startDate: "2018-06-01",
            endDate: "2021-12-17",
            projects: [
              {
                name: "Retained editor-in-chief slate",
                description:
                  "Closed four EIC searches in 11 months with slates the boards actually chose from. No search reopened after kickoff.",
                skills: ["Talent Acquisition", "Stakeholder Management"],
              },
              {
                name: "Silver-medalist bench",
                description:
                  "Kept a living bench of 80 finalists. Two sudden VP searches started with a shortlist, not a Boolean.",
                skills: ["Relationship Management", "Workforce Planning"],
              },
            ],
          },
          {
            title: "Recruiter",
            startDate: "2015-04-01",
            endDate: "2018-05-31",
            projects: [
              {
                name: "Consumer-brand volume desk",
                description:
                  "Filled 70 brand and marketing seats a year with a 28-day median time-to-slate.",
                skills: ["Talent Acquisition", "HRIS"],
              },
              {
                name: "Structured interview kit",
                description:
                  "Wrote the first structured kit the firm sent with a slate. Client interview-to-offer conversion rose 9 points.",
                skills: ["Change Management", "Talent Acquisition"],
              },
            ],
          },
        ],
      },
      {
        name: "Fifth Avenue Staffing",
        description: "Contract and temp staffing house for publishing and agency desks.",
        location: "New York, NY",
        startDate: "2012-08-01",
        endDate: "2015-03-20",
        positions: [
          {
            title: "Sourcer",
            startDate: "2012-08-01",
            endDate: "2015-03-20",
            projects: [
              {
                name: "Editorial contract bench",
                description:
                  "Built a 200-person contract bench for copy and production. Fill time on those reqs fell from 12 days to 4.",
                skills: ["Talent Acquisition", "Relationship Management"],
              },
              {
                name: "ATS hygiene",
                description:
                  "Cleaned 4,000 stale records so the desk stopped calling people who had asked to be left alone.",
                skills: ["HRIS", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "New York University",
        degree: "B.A. Communications",
        dateAwarded: "2012-05-16",
      },
      {
        school: "Cornell ILR School",
        degree: "Certificate, Strategic Talent Management",
        dateAwarded: "2020-06-19",
      },
    ],
    certifications: [
      {
        name: "SHRM-SCP",
        issuer: "SHRM",
        dateAwarded: "2021-11-12",
        credentialId: "SHRM-SCP-SB-441890",
      },
      {
        name: "AIRS Certified Diversity and Inclusion Recruiter",
        issuer: "AIRS",
        dateAwarded: "2019-05-03",
        credentialId: "AIRS-CDIR-SB-1903",
      },
    ],
    featuredProjects: [
      {
        name: "Hiring system for a media company",
        description:
          "<p>Scorecards, same-week debriefs, and a funded headcount plan. Time-to-offer on priority roles fell from 62 to 38 days, and the leftover-req pile went away.</p>",
        links: [
          { label: "Hiring system", url: "https://www.example.com/blanchard-hiring-system" },
          { label: "Scorecard kit", url: "https://www.example.com/blanchard-scorecards" },
        ],
        skills: ["Talent Acquisition", "Workforce Planning", "Change Management"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "human-resources",
    name: "Craig Donovan",
    title: "Director of Employee Relations",
    location: "Chicago, IL",
    siteDescription:
      "Employee relations director who runs investigations and manager coaching as one practice. The file has to be clean, and the workplace has to get quieter.",
    summary:
      "<p>I lead employee relations for Great Lakes Mutual, a 4,400-person Midwest insurer. The caseload is investigations, policy, and the manager conversations that should have happened before a complaint landed. I measure time-to-close and repeat issues by leader, not a vanity 'open door' score.</p><p>I was an investigator and an HR generalist before I took the function. The work that lasts is a documented process managers can follow and a set of decisions that survive a later review. I write for the file and for the person who still has to come to work on Monday.</p>",
    skills: [
      {
        name: "Employee Relations",
        description:
          "Own investigations, policy interpretation, and manager coaching for 4,400 employees. Median time-to-close on formal cases fell from 38 to 22 days.",
        yearStarted: 2014,
      },
      {
        name: "Internal Controls",
        description:
          "Investigation files, hold notices, and privilege logs that survive later review. Zero findings on the last two internal audits of the ER process.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Counsel, business leaders, and the union on the same fact pattern. I do not run a separate story for each room.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Rolled a manager ER playbook to 280 people leaders. Informal issues that became formal cases dropped 24% in a year.",
        yearStarted: 2018,
      },
      {
        name: "Organizational Design",
        description:
          "Advise on spans, skip-levels, and team splits when a chronic ER pattern is actually a design problem.",
        yearStarted: 2019,
      },
      {
        name: "Workforce Planning",
        description:
          "Staff the ER team and the investigator bench to the caseload, not last year's headcount.",
        yearStarted: 2020,
      },
      {
        name: "Relationship Management",
        description:
          "Keep enough trust with business leaders that they call before they send the email they will regret.",
        yearStarted: 2015,
      },
      {
        name: "Program Management",
        description:
          "Case-management cadence, monthly risk pack, and a quarterly policy review. The work is a program, not a pile of inboxes.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Great Lakes Mutual",
        description:
          "Regional P&C and life insurer. 4,400 employees, union and non-union, Chicago headquarters.",
        location: "Chicago, IL",
        startDate: "2020-09-14",
        positions: [
          {
            title: "Director of Employee Relations",
            startDate: "2020-09-14",
            projects: [
              {
                name: "Investigation standard and case system",
                description:
                  "Wrote the investigation standard and moved cases off email into a tracked system. Median close fell from 38 to 22 days; two audits of the process came back clean.",
                skills: ["Employee Relations", "Internal Controls", "Program Management"],
              },
              {
                name: "Manager ER playbook",
                description:
                  "Trained 280 people leaders on intake, documentation, and when to call ER. Informal issues that became formal cases dropped 24%.",
                skills: ["Change Management", "Relationship Management", "Stakeholder Management"],
              },
              {
                name: "Chronic-pattern org reviews",
                description:
                  "Used repeat-case data to trigger span and team-design reviews. Two high-volume desks were redesigned instead of investigated again.",
                skills: ["Organizational Design", "Workforce Planning", "Employee Relations"],
              },
            ],
          },
        ],
      },
      {
        name: "Northwind Insurance",
        description:
          "Midwest personal-lines carrier. 1,800 employees across claims, underwriting, and a small contact center.",
        location: "Chicago, IL",
        startDate: "2014-01-06",
        endDate: "2020-08-31",
        positions: [
          {
            title: "Employee Relations Manager",
            startDate: "2017-04-01",
            endDate: "2020-08-31",
            projects: [
              {
                name: "Contact-center conduct reset",
                description:
                  "Rebuilt attendance and conduct standards with the center leaders. Grievances on those policies fell 31% after the rewrite.",
                skills: ["Employee Relations", "Stakeholder Management", "Change Management"],
              },
              {
                name: "Privilege and hold protocol",
                description:
                  "Installed legal-hold and privilege logging with counsel. The next external review found the files complete.",
                skills: ["Internal Controls", "Program Management"],
              },
            ],
          },
          {
            title: "HR Generalist",
            startDate: "2014-01-06",
            endDate: "2017-03-31",
            projects: [
              {
                name: "Claims-office ER desk",
                description:
                  "Covered four claims offices as the first-line ER partner. Managers started calling before they issued the warning.",
                skills: ["Employee Relations", "Relationship Management"],
              },
              {
                name: "Policy FAQ for people leaders",
                description:
                  "Wrote a short policy FAQ that cut repeat questions on leave and attendance by half.",
                skills: ["Change Management", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Illinois Urbana-Champaign",
        degree: "B.A. Labor and Employment Relations",
        dateAwarded: "2013-12-21",
      },
      {
        school: "Loyola University Chicago School of Law",
        degree: "Certificate, Employment Law for HR",
        dateAwarded: "2018-06-08",
      },
    ],
    certifications: [
      {
        name: "SHRM-SCP",
        issuer: "SHRM",
        dateAwarded: "2020-04-17",
        credentialId: "SHRM-SCP-CD-228190",
      },
      {
        name: "PHR",
        issuer: "HRCI",
        dateAwarded: "2016-11-04",
        credentialId: "HRCI-PHR-CD-66102",
      },
    ],
    featuredProjects: [
      {
        name: "ER operating system",
        description:
          "<p>An investigation standard, a case system, and a manager playbook. Median time-to-close fell from 38 to 22 days, and two audits of the process came back with zero findings.</p>",
        links: [
          { label: "ER operating system", url: "https://www.example.com/donovan-er-system" },
          { label: "Manager playbook", url: "https://www.example.com/donovan-er-playbook" },
        ],
        skills: ["Employee Relations", "Internal Controls", "Change Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "human-resources",
    name: "Amina Traore",
    title: "Compensation Manager",
    location: "San Francisco, CA",
    siteDescription:
      "Compensation manager who builds bands, offers, and cycle math the business can defend. Pay is a system, not a negotiation that starts over every time.",
    summary:
      "<p>I run compensation for Bay Grid Software, a 1,600-person B2B SaaS company. The work is job architecture, bands, the annual cycle, and offers that do not blow up the range for the next hire. I publish the rules so managers stop treating every offer as a one-off.</p><p>I was a compensation analyst through two market spikes. The companies that held together were the ones that named a philosophy and then lived with it when a candidate asked for more. I write the philosophy, I model the cost, and I sit in the exception meeting.</p>",
    skills: [
      {
        name: "Compensation",
        description:
          "Own job architecture, salary bands, the annual cycle, and offer guidelines for 1,600 employees. Range penetration is now visible by org, not a year-end surprise.",
        yearStarted: 2016,
      },
      {
        name: "Workforce Planning",
        description:
          "Model headcount and cycle cost with finance before the budget locks. Last cycle landed within 1.4% of the approved pool.",
        yearStarted: 2018,
      },
      {
        name: "HRIS",
        description:
          "Bands, job codes, and offer letters live in the HRIS. The shadow spreadsheet for 'special deals' was retired.",
        yearStarted: 2017,
      },
      {
        name: "Internal Controls",
        description:
          "Exception path, dual approval on off-cycle awards, and an audit trail that survives a later review of who got what.",
        yearStarted: 2018,
      },
      {
        name: "Market Analysis",
        description:
          "Cut surveys into a Bay Area and remote-eligible story so we stopped paying San Francisco for a role that sits in Austin.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Sit in the exception meeting with the hiring manager and finance. The answer is a band and a rationale, not a vibe.",
        yearStarted: 2019,
      },
      {
        name: "Organizational Design",
        description:
          "Job architecture and levels that match how the company actually works. Two title-inflation waves were walked back before they hit the cycle.",
        yearStarted: 2019,
      },
      {
        name: "Financial Modeling",
        description:
          "Cycle cost, equity burn, and offer-premium scenarios in the same pack finance uses for the board.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Bay Grid Software",
        description:
          "B2B SaaS for grid and facilities data. 1,600 employees, San Francisco HQ, hybrid U.S. and Europe.",
        location: "San Francisco, CA",
        startDate: "2021-06-01",
        positions: [
          {
            title: "Compensation Manager",
            startDate: "2021-06-01",
            projects: [
              {
                name: "Job architecture and salary bands",
                description:
                  "Rebuilt levels and bands for 140 job families. Range penetration is now visible by org, and off-cycle exceptions dropped 41%.",
                skills: ["Compensation", "Organizational Design", "HRIS"],
              },
              {
                name: "Annual cycle with a closed pool",
                description:
                  "Modeled the cycle with finance before lock. Spend landed within 1.4% of the approved pool and the leftover 'we will find it' habit died.",
                skills: ["Workforce Planning", "Financial Modeling", "Stakeholder Management"],
              },
              {
                name: "Offer guidelines and exception path",
                description:
                  "Published offer guidelines and a dual-approval exception path. New-hire premiums stopped blowing the range for the next person in the seat.",
                skills: ["Compensation", "Internal Controls", "Market Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "Pacific Circuit",
        description:
          "Hardware and firmware company in San Jose. 900 employees, heavy engineering mix.",
        location: "San Jose, CA",
        startDate: "2016-03-01",
        endDate: "2021-05-14",
        positions: [
          {
            title: "Senior Compensation Analyst",
            startDate: "2018-12-01",
            endDate: "2021-05-14",
            projects: [
              {
                name: "Engineering market cut",
                description:
                  "Re-cut survey data for hardware vs. software engineering so offers stopped missing on the hardware side.",
                skills: ["Market Analysis", "Compensation", "Stakeholder Management"],
              },
              {
                name: "Equity refresh model",
                description:
                  "Built a refresh model by level and performance. Unplanned off-cycle grants fell 33% the next year.",
                skills: ["Financial Modeling", "Compensation", "Internal Controls"],
              },
            ],
          },
          {
            title: "Compensation Analyst",
            startDate: "2016-03-01",
            endDate: "2018-11-30",
            projects: [
              {
                name: "First salary-band book",
                description:
                  "Wrote the first band book the company would publish internally. Managers stopped inventing titles to dodge a range.",
                skills: ["Compensation", "Organizational Design", "HRIS"],
              },
              {
                name: "Offer-letter system of record",
                description:
                  "Moved offer letters into the HRIS with job-code checks. Shadow Word docs lost.",
                skills: ["HRIS", "Internal Controls"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "B.A. Economics",
        dateAwarded: "2015-05-16",
      },
      {
        school: "University of California, Berkeley, Haas School of Business",
        degree: "M.B.A.",
        dateAwarded: "2020-05-22",
      },
    ],
    certifications: [
      {
        name: "Certified Compensation Professional",
        issuer: "WorldatWork",
        dateAwarded: "2019-09-27",
        credentialId: "WAW-CCP-AT-44901",
      },
      {
        name: "Certified Executive Compensation Professional",
        issuer: "WorldatWork",
        dateAwarded: "2023-03-10",
        credentialId: "WAW-CECP-AT-1103",
      },
    ],
    featuredProjects: [
      {
        name: "Job architecture for a 1,600-person SaaS company",
        description:
          "<p>Levels, bands, and offer guidelines that managers can defend. Off-cycle exceptions dropped 41%, and range penetration stopped being a year-end surprise.</p>",
        links: [
          {
            label: "Architecture overview",
            url: "https://www.example.com/traore-job-architecture",
          },
          { label: "Offer guidelines", url: "https://www.example.com/traore-offer-guidelines" },
        ],
        skills: ["Compensation", "Organizational Design", "HRIS"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "human-resources",
    name: "Luis Ortega",
    title: "HR Business Partner",
    location: "Austin, TX",
    siteDescription:
      "HR business partner who sits in org design, workforce plans, and the HRIS — not a touring advice booth. The org chart and the headcount file have to match.",
    summary:
      "<p>I partner with product, engineering, and go-to-market at Hill Country Payments, a 900-person payments company in Austin. The work is org design, workforce planning, and the manager conversations that keep a reorg from becoming a six-month stall.</p><p>There is no HRBP skill on a resume that matters more than being able to read a headcount file, an HRIS, and a team that is about to break. I do that work, then I stay for the staffing and the ER follow-through.</p>",
    skills: [
      {
        name: "Organizational Design",
        description:
          "Design spans, layers, and team splits before the reorg announcement. Two product-org changes landed with a hiring map instead of a freeze.",
        yearStarted: 2019,
      },
      {
        name: "HRIS",
        description:
          "Supervisory orgs, job codes, and position management in the HRIS. The slide org and the system of record are the same file.",
        yearStarted: 2017,
      },
      {
        name: "Workforce Planning",
        description:
          "Quarterly headcount plan with finance and the GM. Open seats are funded seats, not a wish list.",
        yearStarted: 2018,
      },
      {
        name: "Change Management",
        description:
          "Manager toolkits and skip-level cadence for org changes. Engagement dips recovered inside one quarter on the last two moves.",
        yearStarted: 2019,
      },
      {
        name: "Stakeholder Management",
        description:
          "Sit with the GM, finance, and the function leads on one headcount number. I do not run a private plan for each of them.",
        yearStarted: 2018,
      },
      {
        name: "Employee Relations",
        description:
          "First-line ER for my groups: performance, conflict, and the cases that should not wait for a specialist.",
        yearStarted: 2017,
      },
      {
        name: "Talent Acquisition",
        description:
          "Intake, scorecards, and offer calibration with TA so a priority seat does not sit open while we debate the level.",
        yearStarted: 2018,
      },
      {
        name: "Relationship Management",
        description:
          "Enough trust with engineering and GTM leads that they call before they reorganize a team in a slide.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Hill Country Payments",
        description: "Payments infrastructure for mid-market merchants. 900 employees, Austin HQ.",
        location: "Austin, TX",
        startDate: "2022-04-11",
        positions: [
          {
            title: "HR Business Partner",
            startDate: "2022-04-11",
            projects: [
              {
                name: "Product-org redesign",
                description:
                  "Redrew product and engineering around three platforms. Hiring map and HRIS orgs landed the same week as the announcement; no freeze.",
                skills: ["Organizational Design", "HRIS", "Change Management"],
              },
              {
                name: "Quarterly funded-seat plan",
                description:
                  "Tied open reqs to a funded quarterly plan with finance. Unfunded leftover reqs dropped from 34 to 6 in two quarters.",
                skills: ["Workforce Planning", "Stakeholder Management", "Talent Acquisition"],
              },
              {
                name: "Manager ER and performance cadence",
                description:
                  "Installed a monthly performance and ER huddle for 45 people leaders. Formal cases from skipped conversations fell 27%.",
                skills: ["Employee Relations", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Austin Grid Labs",
        description:
          "Energy-software startup that grew from 180 to 520 people. HR was a generalist desk until it was not.",
        location: "Austin, TX",
        startDate: "2017-07-01",
        endDate: "2022-03-31",
        positions: [
          {
            title: "Senior HR Business Partner",
            startDate: "2020-01-01",
            endDate: "2022-03-31",
            projects: [
              {
                name: "GTM split into three regions",
                description:
                  "Designed the regional GTM org and moved 90 people without a skip in quota credit. HRIS and comp changes landed on the same Monday.",
                skills: ["Organizational Design", "HRIS", "Change Management"],
              },
              {
                name: "Headcount lock with finance",
                description:
                  "Stopped mid-quarter reqs that had no budget. The quarterly plan became the only way a seat opened.",
                skills: ["Workforce Planning", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "HR Generalist",
            startDate: "2017-07-01",
            endDate: "2019-12-31",
            projects: [
              {
                name: "First HRIS org structure",
                description:
                  "Stood up supervisory orgs and job codes when the company passed 250. The spreadsheet org chart retired.",
                skills: ["HRIS", "Organizational Design"],
              },
              {
                name: "Hiring intake with founders",
                description:
                  "Wrote the first intake and scorecard the founders would use. Time-to-offer on engineering seats fell 16 days.",
                skills: ["Talent Acquisition", "Relationship Management", "Employee Relations"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Texas at Austin",
        degree: "B.B.A. Management",
        dateAwarded: "2017-05-20",
      },
    ],
    certifications: [
      {
        name: "SHRM-CP",
        issuer: "SHRM",
        dateAwarded: "2019-08-16",
        credentialId: "SHRM-CP-LO-339102",
      },
      {
        name: "PHR",
        issuer: "HRCI",
        dateAwarded: "2021-02-05",
        credentialId: "HRCI-PHR-LO-77120",
      },
    ],
    featuredProjects: [
      {
        name: "Product-org redesign without a freeze",
        description:
          "<p>An org design, HRIS cutover, and hiring map that landed the same week as the announcement. Two platform teams stood up without a six-month stall.</p>",
        links: [
          { label: "Design brief", url: "https://www.example.com/ortega-product-org" },
          { label: "Change toolkit", url: "https://www.example.com/ortega-change-toolkit" },
        ],
        skills: ["Organizational Design", "HRIS", "Change Management"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "corporate-marketing",
    name: "Zoe Hart",
    title: "Brand Director",
    location: "New York, NY",
    siteDescription:
      "Brand director who treats architecture, campaigns, and the P&L as one system. A brand that cannot survive a promotion calendar is a mood board.",
    summary:
      "<p>I lead brand for Northstar Consumer, a 14-brand home and personal-care house. The work is architecture, the annual campaign system, and the guardrails that keep a retailer brief from becoming a different company on the shelf.</p><p>I came up as a brand manager and an agency strategist. The brands that compound are the ones that can say no to a tactic that would win the quarter and lose the next three. I write that no down, then I show the number.</p>",
    skills: [
      {
        name: "Brand Strategy",
        description:
          "Own architecture and positioning for a 14-brand house. Two overlapping brands were merged and one was killed instead of being 'revitalized' again.",
        yearStarted: 2012,
      },
      {
        name: "Content Strategy",
        description:
          "Editorial and retail content system that sales can use without rewriting the brand every circular.",
        yearStarted: 2015,
      },
      {
        name: "Campaign Analytics",
        description:
          "Read incrementality, not vanity reach. Last national campaign showed 18% incremental lift on the hero SKU against a holdout.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Hold sales, agencies, and the category captains to one brief. The second brief is the one I refuse.",
        yearStarted: 2015,
      },
      {
        name: "Market Analysis",
        description:
          "Category and retailer reads that decide which brand gets the spring slot. We stopped funding the third-place brand in a declining aisle.",
        yearStarted: 2014,
      },
      {
        name: "Product Marketing",
        description:
          "Launch narratives and retailer sell-in for two hero innovations. Year-one distribution hit 78% ACV against a 65% target.",
        yearStarted: 2016,
      },
      {
        name: "Slide Storytelling",
        description:
          "Board and retailer rooms get a 12-page story, not a 70-page archaeology of every test.",
        yearStarted: 2013,
      },
      {
        name: "Market Sizing",
        description:
          "Size the white space before we staff a 'new platform.' One proposed brand was killed at $40M TAM.",
        yearStarted: 2016,
      },
    ],
    companies: [
      {
        name: "Northstar Consumer",
        description: "Home and personal-care house. 14 brands into grocery, mass, and specialty.",
        location: "New York, NY",
        startDate: "2021-03-01",
        positions: [
          {
            title: "Brand Director",
            startDate: "2021-03-01",
            projects: [
              {
                name: "House architecture reset",
                description:
                  "Merged two overlapping cleaners and killed a third-place brand in a declining aisle. Marketing cost as a percent of sales fell 120 bps with share still up on the survivors.",
                skills: ["Brand Strategy", "Market Analysis", "Market Sizing"],
              },
              {
                name: "National campaign with a holdout",
                description:
                  "Ran the hero campaign against a retailer holdout. Incremental lift landed at 18% on the hero SKU; we cut the channels that did not move it.",
                skills: ["Campaign Analytics", "Content Strategy", "Product Marketing"],
              },
              {
                name: "Retailer sell-in system",
                description:
                  "One 12-page story for category captains instead of a custom deck per banner. Year-one ACV on the latest innovation hit 78%.",
                skills: ["Slide Storytelling", "Stakeholder Management", "Product Marketing"],
              },
            ],
          },
        ],
      },
      {
        name: "Atlas Home Brands",
        description:
          "Mid-size home-care company later folded into a larger house. Four brands, heavy club and mass.",
        location: "New York, NY",
        startDate: "2015-08-01",
        endDate: "2021-02-12",
        positions: [
          {
            title: "Brand Manager",
            startDate: "2018-02-01",
            endDate: "2021-02-12",
            projects: [
              {
                name: "Club-channel restage",
                description:
                  "Restaged the club pack and the aisle story. Club velocity rose 14% without a list-price cut.",
                skills: ["Brand Strategy", "Market Analysis", "Stakeholder Management"],
              },
              {
                name: "Always-on content calendar",
                description:
                  "Replaced one-off agency films with a quarterly content system sales could reuse. Asset waste fell by a third.",
                skills: ["Content Strategy", "Campaign Analytics"],
              },
            ],
          },
          {
            title: "Associate Brand Manager",
            startDate: "2015-08-01",
            endDate: "2018-01-31",
            projects: [
              {
                name: "Spring innovation sell-in",
                description:
                  "Wrote the first sell-in that category managers stopped rewriting. Distribution on the spring SKU beat the prior year by 9 ACV points.",
                skills: ["Product Marketing", "Slide Storytelling"],
              },
              {
                name: "Category size for a new wipe",
                description:
                  "Sized the wipe adjacent before we tooled a line. The $40M TAM killed the project in time.",
                skills: ["Market Sizing", "Market Analysis"],
              },
            ],
          },
        ],
      },
      {
        name: "East River Agency",
        description: "Independent brand consultancy for CPG and retail clients.",
        location: "New York, NY",
        startDate: "2012-06-01",
        endDate: "2015-07-15",
        positions: [
          {
            title: "Brand Strategist",
            startDate: "2012-06-01",
            endDate: "2015-07-15",
            projects: [
              {
                name: "Architecture for a four-brand client",
                description:
                  "Recommended killing a flanker that was stealing from the hero. The client did it; hero share rose 1.6 points.",
                skills: ["Brand Strategy", "Market Sizing"],
              },
              {
                name: "Retailer war-room decks",
                description:
                  "Wrote the 12-page stories that survived a 20-minute category meeting.",
                skills: ["Slide Storytelling", "Stakeholder Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Northwestern University",
        degree: "B.S. Communication",
        dateAwarded: "2012-06-15",
      },
      {
        school: "Columbia Business School",
        degree: "M.B.A.",
        dateAwarded: "2018-05-16",
      },
    ],
    certifications: [
      {
        name: "Professional Certified Marketer — Marketing Management",
        issuer: "American Marketing Association",
        dateAwarded: "2019-10-04",
        credentialId: "AMA-PCM-ZH-2019",
      },
      {
        name: "Brand Strategy Certificate",
        issuer: "Kellogg Executive Education",
        dateAwarded: "2022-06-11",
        credentialId: "KELLOGG-BRAND-ZH-0611",
      },
    ],
    featuredProjects: [
      {
        name: "Fourteen-brand architecture reset",
        description:
          "<p>A house architecture that merged two overlapping brands and killed a third-place name in a declining aisle. Marketing cost as a percent of sales fell 120 bps while share rose on the brands that remained.</p>",
        links: [
          { label: "Architecture case", url: "https://www.example.com/hart-architecture" },
          { label: "Holdout campaign", url: "https://www.example.com/hart-holdout" },
        ],
        skills: ["Brand Strategy", "Market Analysis", "Campaign Analytics"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "corporate-marketing",
    name: "Ian Fletcher",
    title: "Growth Marketing Lead",
    location: "San Francisco, CA",
    siteDescription:
      "Growth marketing lead who treats SEO, paid, and mix models as one acquisition system. A channel that cannot show incrementality loses budget.",
    summary:
      "<p>I lead growth for Fog City Software, a vertical SaaS company selling to facilities and property teams. The job is a growth system: SEO that compounds, paid that we can prove, and a mix model that stops us from funding last-click theater.</p><p>I was an SEO manager and a growth analyst before I took the lead seat. The work that stuck was killing channels that looked efficient in the ad platform and were invisible in the holdout. I still run that test.</p>",
    skills: [
      {
        name: "SEO",
        description:
          "Technical and content SEO for a product-led site. Non-brand organic pipeline rose 62% in 18 months after the information-architecture rewrite.",
        yearStarted: 2016,
      },
      {
        name: "Campaign Analytics",
        description:
          "Holdouts, geo-splits, and a weekly incrementality pack. Two paid social campaigns that looked efficient were cut after the holdout went flat.",
        yearStarted: 2017,
      },
      {
        name: "Marketing Mix Modeling",
        description:
          "Quarterly MMM that reallocates search, social, and affiliate. Last reallocation moved 14% of paid budget and lifted incremental sign-ups 9%.",
        yearStarted: 2020,
      },
      {
        name: "Marketing Operations",
        description:
          "UTM discipline, CRM handoff, and the pipeline definition sales will accept. MQLs that sales bounced fell from 31% to 12%.",
        yearStarted: 2018,
      },
      {
        name: "Python",
        description:
          "Build the mix-model refresh and the SEO anomaly alerts the suite does not ship.",
        yearStarted: 2017,
      },
      {
        name: "Content Strategy",
        description:
          "Programmatic and editorial content mapped to jobs-to-be-done, not a keyword dump. Assisted pipeline from content rose 41%.",
        yearStarted: 2016,
      },
      {
        name: "Market Analysis",
        description:
          "Category and competitor share-of-search that decides which cluster we staff next.",
        yearStarted: 2018,
      },
      {
        name: "CRM",
        description:
          "Closed-loop from first touch to opportunity so growth is scored on pipeline, not sessions.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Fog City Software",
        description:
          "Vertical SaaS for facilities and property teams. Product-led motion with an enterprise overlay.",
        location: "San Francisco, CA",
        startDate: "2022-02-01",
        positions: [
          {
            title: "Growth Marketing Lead",
            startDate: "2022-02-01",
            projects: [
              {
                name: "Information-architecture rewrite",
                description:
                  "Rebuilt the public site around jobs-to-be-done and crawlable hubs. Non-brand organic pipeline rose 62% in 18 months.",
                skills: ["SEO", "Content Strategy", "Market Analysis"],
              },
              {
                name: "Quarterly mix-model reallocation",
                description:
                  "Stood up MMM and moved 14% of paid budget off last-click winners. Incremental sign-ups rose 9% on a flat spend.",
                skills: ["Marketing Mix Modeling", "Campaign Analytics", "Python"],
              },
              {
                name: "CRM pipeline contract with sales",
                description:
                  "Redefined MQL and handoff with sales. Bounce rate on marketing-sourced opportunities fell from 31% to 12%.",
                skills: ["CRM", "Marketing Operations", "Campaign Analytics"],
              },
            ],
          },
        ],
      },
      {
        name: "Pacific SaaS",
        description: "Horizontal productivity SaaS in Oakland. Self-serve plus inside sales.",
        location: "Oakland, CA",
        startDate: "2016-09-01",
        endDate: "2022-01-21",
        positions: [
          {
            title: "SEO Manager",
            startDate: "2019-01-01",
            endDate: "2022-01-21",
            projects: [
              {
                name: "Programmatic comparison pages",
                description:
                  "Shipped 120 comparison and integration pages with a template sales would not disown. Organic demo requests rose 38%.",
                skills: ["SEO", "Content Strategy", "CRM"],
              },
              {
                name: "Technical crawl debt",
                description:
                  "Killed 4,000 thin URLs and fixed canonicals. Index bloat fell and rankings recovered on the 40 money pages.",
                skills: ["SEO", "Python"],
              },
            ],
          },
          {
            title: "Growth Analyst",
            startDate: "2016-09-01",
            endDate: "2018-12-31",
            projects: [
              {
                name: "First holdout on paid social",
                description:
                  "Geo-split two campaigns that looked efficient in-platform. One was flat; we cut it the next Monday.",
                skills: ["Campaign Analytics", "Marketing Operations"],
              },
              {
                name: "UTM and source-of-truth cleanup",
                description:
                  "Wrote the UTM standard and the CRM mapping. Dark traffic from paid fell by half.",
                skills: ["Marketing Operations", "CRM", "Python"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "B.A. Statistics",
        dateAwarded: "2016-05-14",
      },
    ],
    certifications: [
      {
        name: "Google Analytics Individual Qualification",
        issuer: "Google",
        dateAwarded: "2018-04-20",
        credentialId: "GAIQ-IF-2018-4421",
      },
      {
        name: "Marketing Analytics Certificate",
        issuer: "UC Berkeley Executive Education",
        dateAwarded: "2021-11-05",
        credentialId: "HAAS-MA-IF-1105",
      },
    ],
    featuredProjects: [
      {
        name: "Growth system with a mix model",
        description:
          "<p>SEO that compounds, paid that has to survive a holdout, and a quarterly mix model that moved 14% of budget. Incremental sign-ups rose 9% on flat spend.</p>",
        links: [
          { label: "Growth system", url: "https://www.example.com/fletcher-growth-system" },
          { label: "MMM note", url: "https://www.example.com/fletcher-mmm" },
        ],
        skills: ["SEO", "Marketing Mix Modeling", "Campaign Analytics"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "corporate-marketing",
    name: "Priyanka Desai",
    title: "Product Marketing Manager",
    location: "Seattle, WA",
    siteDescription:
      "Product marketing manager who writes the narrative, the size of the bet, and the enablement sales will actually use. A launch is a decision, not a landing page.",
    summary:
      "<p>I run product marketing for Rainier Devices, a hardware-plus-software company selling field tools to utilities and contractors. The work is positioning, pricing narrative, and a launch kit that sales can open on a job site — not a 40-page manifesto.</p><p>I was a PMM and an associate at a Seattle cloud company before this. The launches that work are the ones that name the buyer, the job, and the competitive landmine before the SKU ships. I write that first, then I staff the campaign.</p>",
    skills: [
      {
        name: "Product Marketing",
        description:
          "Own positioning, launch, and sales enablement for two product lines. Win rate on competitive deals rose 7 points after the battlecards shipped.",
        yearStarted: 2017,
      },
      {
        name: "Market Analysis",
        description:
          "Win/loss and competitor teardown that product will read. Two roadmap items were killed after the teardown showed a crowded, price-only segment.",
        yearStarted: 2017,
      },
      {
        name: "Market Sizing",
        description:
          "TAM/SAM for new SKUs before we tool a line. One proposed handheld was sized at $28M SAM and did not get a PO.",
        yearStarted: 2018,
      },
      {
        name: "Content Strategy",
        description:
          "Launch content mapped to buyer jobs: one-pager, demo script, and a field video. Asset reuse by sales hit 71% on the last launch.",
        yearStarted: 2018,
      },
      {
        name: "Brand Strategy",
        description:
          "Keep the product story inside the company brand so a new SKU does not invent a second voice.",
        yearStarted: 2019,
      },
      {
        name: "Slide Storytelling",
        description:
          "A 10-slide launch story for the board and a 6-slide version for the field. The 40-page version stays in the appendix.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Product, sales, and the channel on one launch date. The date that slips is the one we name in the room, not after.",
        yearStarted: 2018,
      },
      {
        name: "Campaign Analytics",
        description:
          "Read pipeline and win-rate movement, not launch-week traffic. The last launch was scored at day 90, not day 7.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Rainier Devices",
        description:
          "Field tools and software for utilities and contractors. Hardware plus a subscription overlay.",
        location: "Seattle, WA",
        startDate: "2021-08-16",
        positions: [
          {
            title: "Product Marketing Manager",
            startDate: "2021-08-16",
            projects: [
              {
                name: "Line-two launch and battlecards",
                description:
                  "Positioned a new handheld against two incumbents and shipped battlecards the field would open. Competitive win rate rose 7 points in two quarters.",
                skills: ["Product Marketing", "Content Strategy", "Slide Storytelling"],
              },
              {
                name: "SAM check before tooling",
                description:
                  "Sized a proposed SKU at $28M SAM with a price-only competitive set. The PO was not written.",
                skills: ["Market Sizing", "Market Analysis", "Stakeholder Management"],
              },
              {
                name: "Day-90 launch score",
                description:
                  "Scored the last launch on pipeline and win rate at day 90, not launch-week traffic. Two channels were cut; two were funded.",
                skills: ["Campaign Analytics", "Brand Strategy", "Product Marketing"],
              },
            ],
          },
        ],
      },
      {
        name: "Cascade Cloud",
        description: "Vertical SaaS for construction back office. Seattle HQ, mid-market motion.",
        location: "Seattle, WA",
        startDate: "2017-01-09",
        endDate: "2021-08-01",
        positions: [
          {
            title: "Product Marketing Manager",
            startDate: "2019-03-01",
            endDate: "2021-08-01",
            projects: [
              {
                name: "Platform narrative rewrite",
                description:
                  "Replaced a feature list with a job-to-be-done story. Sales cycle on new logos shortened 11 days.",
                skills: ["Product Marketing", "Brand Strategy", "Slide Storytelling"],
              },
              {
                name: "Win/loss program",
                description:
                  "Thirty structured win/loss interviews a quarter. Two roadmap items were killed; one pricing pack was rewritten.",
                skills: ["Market Analysis", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Product Marketing Associate",
            startDate: "2017-01-09",
            endDate: "2019-02-28",
            projects: [
              {
                name: "First demo script",
                description:
                  "Wrote the demo script SEs still use as the spine. Time-to-first-value in the trial dropped from 14 days to 6.",
                skills: ["Content Strategy", "Product Marketing"],
              },
              {
                name: "Category size for payroll add-on",
                description:
                  "Sized the payroll adjacent before we staffed it. The $90M SAM got a team; a smaller adjacent did not.",
                skills: ["Market Sizing", "Market Analysis", "Campaign Analytics"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Washington",
        degree: "B.A. Business Administration — Marketing",
        dateAwarded: "2016-06-11",
      },
    ],
    certifications: [
      {
        name: "Pragmatic Institute — PMC",
        issuer: "Pragmatic Institute",
        dateAwarded: "2019-07-19",
        credentialId: "PRAG-PMC-PD-1907",
      },
      {
        name: "Product Marketing Certified",
        issuer: "Product Marketing Alliance",
        dateAwarded: "2022-01-28",
        credentialId: "PMA-PMC-PD-2201",
      },
    ],
    featuredProjects: [
      {
        name: "Field-tool launch kit",
        description:
          "<p>Positioning, battlecards, and a day-90 score for a handheld line. Competitive win rate rose 7 points, and a $28M SAM SKU never got a tooling PO.</p>",
        links: [
          { label: "Launch kit", url: "https://www.example.com/desai-launch-kit" },
          { label: "Win/loss note", url: "https://www.example.com/desai-win-loss" },
        ],
        skills: ["Product Marketing", "Market Analysis", "Slide Storytelling"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "corporate-marketing",
    name: "DeShawn Carter",
    title: "Marketing Operations Manager",
    location: "Atlanta, GA",
    siteDescription:
      "Marketing operations manager who treats the stack, the mix model, and the CRM as one system. If sales cannot trust the source, the campaign did not happen.",
    summary:
      "<p>I run marketing operations for Peachtree Commerce, a mid-market ecommerce platform. The job is the stack, the taxonomy, the SLA with sales, and a mix model that reallocates budget without a three-week argument about the spreadsheet.</p><p>I was a campaign analyst and an ops lead at a retail-media shop. The work that lasts is a definition of pipeline everyone will sign and a weekly pack that does not need a narrator. I build that, then I defend it when a channel owner wants a friendlier number.</p>",
    skills: [
      {
        name: "Marketing Operations",
        description:
          "Own the marketing stack, taxonomy, and sales SLA for a 70-person GTM org. Marketing-sourced pipeline that sales accepted rose from 69% to 91%.",
        yearStarted: 2015,
      },
      {
        name: "Marketing Mix Modeling",
        description:
          "Quarterly MMM on paid, email, and partner. Last cycle moved 11% of budget and lifted incremental pipeline 8% on flat spend.",
        yearStarted: 2020,
      },
      {
        name: "Campaign Analytics",
        description:
          "Weekly incrementality and funnel pack. Two always-on programs were sunset after three flat holdouts.",
        yearStarted: 2015,
      },
      {
        name: "CRM",
        description:
          "Lead-to-opportunity contract, routing, and the fields sales will actually fill. Dark pipeline from events fell by half.",
        yearStarted: 2016,
      },
      {
        name: "SEO",
        description:
          "Ops owner for the SEO measurement layer: canonical tags, crawl reports, and the organic pipeline dashboard.",
        yearStarted: 2018,
      },
      {
        name: "Python",
        description:
          "Build the MMM refresh and the anomaly alerts that do not wait for a vendor release.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "Channel owners, sales ops, and finance on one definition of pipeline. The second definition is the one I refuse.",
        yearStarted: 2017,
      },
      {
        name: "Change Management",
        description:
          "Moved seven campaign owners onto a single UTM and naming standard. The shadow tracker died in week four.",
        yearStarted: 2018,
      },
    ],
    companies: [
      {
        name: "Peachtree Commerce",
        description: "Ecommerce platform for mid-market retailers. Atlanta HQ, 70-person GTM.",
        location: "Atlanta, GA",
        startDate: "2020-10-01",
        positions: [
          {
            title: "Marketing Operations Manager",
            startDate: "2020-10-01",
            projects: [
              {
                name: "Pipeline contract with sales",
                description:
                  "Rewrote MQL, routing, and accepted-pipeline rules with sales ops. Accepted marketing-sourced pipeline rose from 69% to 91%.",
                skills: ["Marketing Operations", "CRM", "Stakeholder Management"],
              },
              {
                name: "Quarterly mix-model cycle",
                description:
                  "Stood up MMM on paid, email, and partner. Moved 11% of budget; incremental pipeline rose 8% on flat spend.",
                skills: ["Marketing Mix Modeling", "Campaign Analytics", "Python"],
              },
              {
                name: "UTM and naming standard",
                description:
                  "One taxonomy for seven channel owners. Dark traffic from paid and events fell by half in two quarters.",
                skills: ["Change Management", "Marketing Operations", "SEO"],
              },
            ],
          },
        ],
      },
      {
        name: "Piedmont Retail Media",
        description: "Retail-media and circular shop serving Southeast grocers and specialty.",
        location: "Atlanta, GA",
        startDate: "2015-05-01",
        endDate: "2020-09-18",
        positions: [
          {
            title: "Marketing Ops Lead",
            startDate: "2017-12-01",
            endDate: "2020-09-18",
            projects: [
              {
                name: "Client scorecard automation",
                description:
                  "Replaced a Monday spreadsheet with a weekly incrementality pack. Two clients expanded after they could see holdout lift.",
                skills: ["Campaign Analytics", "Python", "Stakeholder Management"],
              },
              {
                name: "CRM for a 40-rep sales desk",
                description:
                  "Routing and attribution that the desk would use. Unattributed revenue on the books fell from 22% to 7%.",
                skills: ["CRM", "Marketing Operations"],
              },
            ],
          },
          {
            title: "Campaign Analyst",
            startDate: "2015-05-01",
            endDate: "2017-11-30",
            projects: [
              {
                name: "Circular incrementality tests",
                description:
                  "Geo-split circulars for three grocers. One 'high ROI' insert was flat; we said so.",
                skills: ["Campaign Analytics", "Marketing Mix Modeling"],
              },
              {
                name: "First UTM dictionary",
                description:
                  "Wrote the dictionary the shop still uses. Paid and email stopped colliding in the same source.",
                skills: ["Marketing Operations", "Change Management", "SEO"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Georgia State University",
        degree: "B.B.A. Marketing",
        dateAwarded: "2015-05-09",
      },
    ],
    certifications: [
      {
        name: "Salesforce Certified Administrator",
        issuer: "Salesforce",
        dateAwarded: "2018-06-22",
        credentialId: "SFDC-ADM-DC-1806",
      },
      {
        name: "Google Analytics Individual Qualification",
        issuer: "Google",
        dateAwarded: "2016-09-14",
        credentialId: "GAIQ-DC-2016-9912",
      },
    ],
    featuredProjects: [
      {
        name: "Marketing ops system of record",
        description:
          "<p>A pipeline contract, a taxonomy, and a quarterly mix model. Sales accepted 91% of marketing-sourced pipeline, and 11% of budget moved to channels that actually lifted it.</p>",
        links: [
          { label: "Ops system", url: "https://www.example.com/carter-mops" },
          { label: "MMM cycle", url: "https://www.example.com/carter-mmm" },
        ],
        skills: ["Marketing Operations", "Marketing Mix Modeling", "CRM"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "enterprise-sales",
    name: "Rachel Kim",
    title: "Enterprise Account Executive",
    location: "San Francisco, CA",
    siteDescription:
      "Enterprise AE who runs MEDDIC as a live file, not a coaching poster. A deal that cannot name the economic buyer and the metric does not stay in the forecast.",
    summary:
      "<p>I sell enterprise seats for Helios Cloud, a security and compliance platform, into Fortune 1000 security and risk orgs. Average deal size is $420k ACV. The process is MEDDIC with a written score on every stage, and a forecast I will defend in the Monday call.</p><p>I came through mid-market and an SDR desk. The deals that close are the ones where the champion can repeat the metric and the economic buyer has already seen the number. I do not keep a happy conversation in the commit column.</p>",
    skills: [
      {
        name: "MEDDIC",
        description:
          "Score every opportunity against metrics, economic buyer, decision process, and champion. Commit accuracy held at 91% last year on a $4.8M quota.",
        yearStarted: 2018,
      },
      {
        name: "Enterprise Prospecting",
        description:
          "Multi-thread into security, risk, and procurement before the RFP lands. 38% of last year's pipeline was sourced, not inbound.",
        yearStarted: 2016,
      },
      {
        name: "Opportunity Management",
        description:
          "Stage discipline and a next-step that has a date and a name. Stalled deals are exited, not aged.",
        yearStarted: 2017,
      },
      {
        name: "Pipeline Forecasting",
        description:
          "Weekly forecast from MEDDIC scores, not hope. Missed commit twice in twelve quarters, both called before month-end.",
        yearStarted: 2018,
      },
      {
        name: "Value Selling",
        description:
          "Business case in the buyer's units: audit hours, control gaps, and the cost of the last finding. Average discount on my book is 9%, not 22%.",
        yearStarted: 2018,
      },
      {
        name: "Account Planning",
        description:
          "Annual plan for 12 named accounts with white-space and a political map. Four of those accounts expanded over 30% last year.",
        yearStarted: 2019,
      },
      {
        name: "CRM",
        description:
          "The CRM is the deal file. If it is not in the fields, it is not in the forecast.",
        yearStarted: 2016,
      },
      {
        name: "Contract Negotiation",
        description:
          "Paper with legal and procurement without giving away the metric that won the deal. MSA cycle on my book averaged 34 days.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Helios Cloud",
        description:
          "Security and compliance platform. Enterprise motion into Fortune 1000 risk and security orgs.",
        location: "San Francisco, CA",
        startDate: "2021-01-04",
        positions: [
          {
            title: "Enterprise Account Executive",
            startDate: "2021-01-04",
            projects: [
              {
                name: "Named-account MEDDIC file",
                description:
                  "Ran 12 named accounts with a live MEDDIC score. Closed $5.1M against a $4.8M quota; commit accuracy 91%.",
                skills: ["MEDDIC", "Account Planning", "Pipeline Forecasting"],
              },
              {
                name: "Sourced enterprise pipeline",
                description:
                  "Multi-threaded security, risk, and procurement before RFPs. 38% of pipeline was sourced; two seven-figure deals started as a cold thread.",
                skills: ["Enterprise Prospecting", "Opportunity Management", "CRM"],
              },
              {
                name: "Business-case close",
                description:
                  "Closed on audit hours and control-gap cost instead of a feature bake-off. Average discount on the book held at 9%.",
                skills: ["Value Selling", "Contract Negotiation", "MEDDIC"],
              },
            ],
          },
        ],
      },
      {
        name: "Harborline Data",
        description: "Data-governance SaaS. Mid-market and emerging enterprise.",
        location: "San Francisco, CA",
        startDate: "2016-03-01",
        endDate: "2020-12-18",
        positions: [
          {
            title: "Mid-Market Account Executive",
            startDate: "2018-07-01",
            endDate: "2020-12-18",
            projects: [
              {
                name: "First MEDDIC on the mid-market desk",
                description:
                  "Brought MEDDIC to a desk that lived in next-step theater. Stage-3-to-close rose 11 points in three quarters.",
                skills: ["MEDDIC", "Opportunity Management", "Pipeline Forecasting"],
              },
              {
                name: "Procurement-ready paper",
                description:
                  "Built a redline playbook with legal so deals stopped dying in paper. Cycle time after verbal fell from 52 to 29 days.",
                skills: ["Contract Negotiation", "CRM", "Value Selling"],
              },
            ],
          },
          {
            title: "Sales Development Representative",
            startDate: "2016-03-01",
            endDate: "2018-06-30",
            projects: [
              {
                name: "Security-buyer outbound",
                description:
                  "Built the first outbound motion into CISOs and GRC leads. Sourced $2.1M in pipeline in the last full year on the desk.",
                skills: ["Enterprise Prospecting", "CRM"],
              },
              {
                name: "Handoff that AEs would take",
                description:
                  "Wrote the handoff note AEs stopped bouncing. Accepted meetings rose from 61% to 84%.",
                skills: ["Opportunity Management", "Account Planning"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of California, San Diego",
        degree: "B.A. Economics",
        dateAwarded: "2015-06-13",
      },
    ],
    certifications: [
      {
        name: "MEDDICC Certified",
        issuer: "MEDDIC Academy",
        dateAwarded: "2019-09-06",
        credentialId: "MEDDIC-RK-1909",
      },
      {
        name: "Certified Professional Sales Person",
        issuer: "NASP",
        dateAwarded: "2017-04-14",
        credentialId: "NASP-CPSP-RK-1704",
      },
    ],
    featuredProjects: [
      {
        name: "Enterprise MEDDIC operating system",
        description:
          "<p>A live MEDDIC file, sourced pipeline, and a forecast I will defend. $5.1M on a $4.8M quota, 91% commit accuracy, and a 9% average discount.</p>",
        links: [
          { label: "Operating system", url: "https://www.example.com/rkim-meddic" },
          { label: "Forecast notes", url: "https://www.example.com/rkim-forecast" },
        ],
        skills: ["MEDDIC", "Pipeline Forecasting", "Value Selling"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "enterprise-sales",
    name: "Thomas Adler",
    title: "Strategic Account Director",
    location: "New York, NY",
    siteDescription:
      "Strategic account director who treats a named book as a portfolio: white space, political map, and paper that does not reopen every renewal.",
    summary:
      "<p>I run eight named financial-services and media accounts for Atlas Ledger, a close-and-consolidation platform. The book is $11M in ACV. The job is expansion, multi-thread, and a renewal that is a decision, not a hostage negotiation.</p><p>I sold as an enterprise AE before I took the named book. The accounts that grow are the ones where I can name the next buyer and the next metric before the current champion changes jobs. I write that map down every quarter.</p>",
    skills: [
      {
        name: "Account Planning",
        description:
          "Quarterly plans for eight named accounts: white space, political map, and a 12-month expansion thesis. Four accounts grew over 25% last year.",
        yearStarted: 2017,
      },
      {
        name: "Relationship Management",
        description:
          "Stay two threads deep so a champion leaving does not zero the account. Two CFO changes last year and neither renewal slipped.",
        yearStarted: 2015,
      },
      {
        name: "Opportunity Management",
        description:
          "Expansion and renewal opportunities with a next step and a date. I do not keep a 'good relationship' in the commit column.",
        yearStarted: 2015,
      },
      {
        name: "Contract Negotiation",
        description:
          "Multi-year paper and price-hold clauses so procurement cannot reopen the metric every December.",
        yearStarted: 2017,
      },
      {
        name: "Value Selling",
        description:
          "Close on close-cycle days and control findings, not a feature list. Average expansion ACV on the book is $380k.",
        yearStarted: 2016,
      },
      {
        name: "Stakeholder Management",
        description:
          "Finance, internal audit, and the controller's office on the same map. The deal that only has IT does not get forecasted.",
        yearStarted: 2016,
      },
      {
        name: "Pipeline Forecasting",
        description:
          "Named-account forecast that separates renewal, expansion, and new entity. Commit on the book held inside 6% last year.",
        yearStarted: 2017,
      },
      {
        name: "CRM",
        description:
          "Account plans, contacts, and opportunities live in the CRM. If the map is in a slide, it is already stale.",
        yearStarted: 2014,
      },
    ],
    companies: [
      {
        name: "Atlas Ledger",
        description: "Close, consolidation, and controls platform for multi-entity finance teams.",
        location: "New York, NY",
        startDate: "2020-05-01",
        positions: [
          {
            title: "Strategic Account Director",
            startDate: "2020-05-01",
            projects: [
              {
                name: "Eight-account portfolio plan",
                description:
                  "Quarterly white-space and political maps for an $11M book. Four accounts grew over 25%; two CFO changes did not slip a renewal.",
                skills: ["Account Planning", "Relationship Management", "CRM"],
              },
              {
                name: "Multi-year paper",
                description:
                  "Moved five accounts onto 36-month paper with a price-hold. December reopeners stopped being the plan.",
                skills: ["Contract Negotiation", "Value Selling", "Stakeholder Management"],
              },
              {
                name: "Renewal vs. expansion forecast",
                description:
                  "Split the forecast so expansion could not hide inside a renewal. Commit on the book held inside 6%.",
                skills: ["Pipeline Forecasting", "Opportunity Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Midtown Analytics",
        description:
          "Analytics and reporting house later acquired. Enterprise finance and media buyers.",
        location: "New York, NY",
        startDate: "2014-09-01",
        endDate: "2020-04-17",
        positions: [
          {
            title: "Enterprise Account Executive",
            startDate: "2017-07-01",
            endDate: "2020-04-17",
            projects: [
              {
                name: "Media-holding-company land",
                description:
                  "Landed a six-entity media group at $720k ACV after a 14-month multi-thread. The first champion had left in month six.",
                skills: ["Relationship Management", "Account Planning", "Value Selling"],
              },
              {
                name: "Procurement without a bake-off tax",
                description:
                  "Took two deals through procurement on a written business case instead of a feature matrix. Discount landed at 11%.",
                skills: [
                  "Contract Negotiation",
                  "Stakeholder Management",
                  "Opportunity Management",
                ],
              },
            ],
          },
          {
            title: "Account Executive",
            startDate: "2014-09-01",
            endDate: "2017-06-30",
            projects: [
              {
                name: "Mid-market finance desk",
                description:
                  "Carried a $1.4M quota selling reporting suites into controllers' offices. Hit 108% and 121% in the last two years on the desk.",
                skills: ["Opportunity Management", "Pipeline Forecasting", "CRM"],
              },
              {
                name: "First written account plans",
                description:
                  "Wrote plans the manager could inspect. Expansion from the existing book rose from 12% to 21% of the number.",
                skills: ["Account Planning", "Relationship Management"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "Boston College",
        degree: "B.S. Finance",
        dateAwarded: "2014-05-19",
      },
    ],
    certifications: [
      {
        name: "Certified Strategic Account Manager",
        issuer: "SAMA",
        dateAwarded: "2021-08-20",
        credentialId: "SAMA-CSAM-TA-2108",
      },
      {
        name: "MEDDICC Certified",
        issuer: "MEDDIC Academy",
        dateAwarded: "2018-11-09",
        credentialId: "MEDDIC-TA-1811",
      },
    ],
    featuredProjects: [
      {
        name: "Named-account portfolio system",
        description:
          "<p>Quarterly maps, multi-year paper, and a forecast that separates renewal from expansion. An $11M book with four accounts over 25% growth and commit inside 6%.</p>",
        links: [
          { label: "Portfolio system", url: "https://www.example.com/adler-portfolio" },
          { label: "Account-plan template", url: "https://www.example.com/adler-account-plan" },
        ],
        skills: ["Account Planning", "Relationship Management", "Pipeline Forecasting"],
      },
    ],
  }),

  defineProfile({
    gender: "woman",
    vertical: "enterprise-sales",
    name: "Valentina Russo",
    title: "Sales Engineer",
    location: "Austin, TX",
    siteDescription:
      "Sales engineer who runs discovery, the demo, and the value model as one conversation. A technical win that cannot name the metric is a science fair.",
    summary:
      "<p>I am a sales engineer for Red River Systems, an integration and iPaaS platform selling into mid-market and enterprise IT. I sit in discovery, I run the technical evaluation, and I write the value model the AE will not be allowed to leave behind.</p><p>I came through implementation and solutions consulting. The evaluations that we win are the ones where the architect and the economic buyer heard the same number. I do not demo a feature the discovery did not earn.</p>",
    skills: [
      {
        name: "Sales Engineering",
        description:
          "Own discovery, POV, and technical evaluation for a $3.2M supported book. Technical-win rate on qualified POVs is 74%.",
        yearStarted: 2017,
      },
      {
        name: "Value Selling",
        description:
          "Write the value model in the buyer's units: integration hours, failed-job cost, and time-to-onboard a new system.",
        yearStarted: 2019,
      },
      {
        name: "MEDDIC",
        description:
          "Partner the AE on metrics, champion, and decision criteria. I will not start a POV that cannot name those three.",
        yearStarted: 2019,
      },
      {
        name: "Stakeholder Management",
        description:
          "Architect, security, and the ops lead on the same evaluation plan. A side demo for one persona is a risk, not a favor.",
        yearStarted: 2018,
      },
      {
        name: "Slide Storytelling",
        description:
          "A 12-slide POV readout the economic buyer can repeat. The architecture appendix stays in the appendix.",
        yearStarted: 2018,
      },
      {
        name: "Opportunity Management",
        description:
          "Stage the technical work so a POV has an exit date. Open-ended 'let us keep exploring' is a loss.",
        yearStarted: 2018,
      },
      {
        name: "Technical Leadership",
        description:
          "Coach AEs and newer SEs on what discovery has to earn before a demo. Unqualified demos on my paired book dropped 40%.",
        yearStarted: 2020,
      },
      {
        name: "CRM",
        description:
          "POV scope, stakeholders, and the value model live on the opportunity. If it is only in a deck, it will be lost at legal.",
        yearStarted: 2017,
      },
    ],
    companies: [
      {
        name: "Red River Systems",
        description: "Integration and iPaaS for mid-market and enterprise IT. Austin HQ.",
        location: "Austin, TX",
        startDate: "2022-06-01",
        positions: [
          {
            title: "Sales Engineer",
            startDate: "2022-06-01",
            projects: [
              {
                name: "POV with an exit date",
                description:
                  "Required metrics, champion, and decision criteria before a POV. Technical-win rate on those POVs is 74%; open-ended evals were declined.",
                skills: ["Sales Engineering", "MEDDIC", "Opportunity Management"],
              },
              {
                name: "Value model in buyer units",
                description:
                  "Wrote integration-hour and failed-job models the AE left behind. Average supported deal size rose from $180k to $260k ACV.",
                skills: ["Value Selling", "Slide Storytelling", "CRM"],
              },
              {
                name: "Security and architect one-plan",
                description:
                  "One evaluation plan for security, the architect, and ops. Side demos stopped being the path around a no.",
                skills: ["Stakeholder Management", "Technical Leadership", "Sales Engineering"],
              },
            ],
          },
        ],
      },
      {
        name: "Hill Country Cloud",
        description: "Workflow SaaS later acquired. Mid-market IT and operations buyers.",
        location: "Austin, TX",
        startDate: "2017-02-01",
        endDate: "2022-05-20",
        positions: [
          {
            title: "Solutions Consultant",
            startDate: "2019-08-01",
            endDate: "2022-05-20",
            projects: [
              {
                name: "Discovery-before-demo rule",
                description:
                  "Stopped demoing features discovery had not earned. Demo-to-POV conversion rose 16 points.",
                skills: ["Sales Engineering", "Technical Leadership", "MEDDIC"],
              },
              {
                name: "Shared readout template",
                description:
                  "A 12-slide POV readout AEs could present without me in the room. Cycle time after POV fell 8 days.",
                skills: ["Slide Storytelling", "Value Selling", "CRM"],
              },
            ],
          },
          {
            title: "Implementation Specialist",
            startDate: "2017-02-01",
            endDate: "2019-07-31",
            projects: [
              {
                name: "First 40 customer go-lives",
                description:
                  "Onboarded 40 mid-market customers and fed the failure modes back to sales. Time-to-first-value dropped from 11 weeks to 6.",
                skills: ["Technical Leadership", "Stakeholder Management"],
              },
              {
                name: "Scope file on the opportunity",
                description:
                  "Moved implementation scope onto the CRM opportunity so sales stopped promising a connector we did not have.",
                skills: ["CRM", "Opportunity Management", "Sales Engineering"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Texas at Austin",
        degree: "B.S. Electrical and Computer Engineering",
        dateAwarded: "2016-12-17",
      },
    ],
    certifications: [
      {
        name: "Certified Sales Engineer",
        issuer: "Sales Engineering Association",
        dateAwarded: "2020-10-02",
        credentialId: "SEA-CSE-VR-2010",
      },
      {
        name: "MEDDICC Certified",
        issuer: "MEDDIC Academy",
        dateAwarded: "2021-06-18",
        credentialId: "MEDDIC-VR-2106",
      },
    ],
    featuredProjects: [
      {
        name: "POV system with a value model",
        description:
          "<p>Discovery has to earn the POV, the POV has an exit date, and the value model is in the buyer's units. Technical-win rate 74%, and average supported ACV moved from $180k to $260k.</p>",
        links: [
          { label: "POV system", url: "https://www.example.com/russo-pov" },
          { label: "Value-model kit", url: "https://www.example.com/russo-value-model" },
        ],
        skills: ["Sales Engineering", "Value Selling", "MEDDIC"],
      },
    ],
  }),

  defineProfile({
    gender: "man",
    vertical: "enterprise-sales",
    name: "Malik Johnson",
    title: "Vice President, Mid-Market Sales",
    location: "Chicago, IL",
    siteDescription:
      "Mid-market sales VP who treats forecast, inspection, and manager coaching as one operating system. A number that cannot be inspected is not a number.",
    summary:
      "<p>I lead mid-market sales for Lakeshore Payments, a 42-person team selling payments and payouts into Midwestern and national mid-market. The number is $38M. The job is a forecast I can inspect, managers who can run a deal review, and a hiring bar that does not lower in a miss month.</p><p>I carried a bag and then a region before I took the VP seat. The teams that hit are the ones that exit bad deals early and tell the truth on Monday. I install that cadence, then I sit in the reviews until it holds without me.</p>",
    skills: [
      {
        name: "Pipeline Forecasting",
        description:
          "Weekly forecast from inspected opportunities, not rolled-up hope. Two-quarter commit accuracy on a $38M number held inside 5%.",
        yearStarted: 2018,
      },
      {
        name: "Opportunity Management",
        description:
          "Deal-review standard: next step, economic buyer, and a kill date. Stale stage-3 deals on the team fell 44% in a year.",
        yearStarted: 2016,
      },
      {
        name: "Account Planning",
        description:
          "Territory and named-account plans for 42 sellers. Coverage of the ICP list rose from 61% to 88%.",
        yearStarted: 2017,
      },
      {
        name: "Stakeholder Management",
        description:
          "CRO, finance, and product on one number. I do not run a private forecast for the board.",
        yearStarted: 2019,
      },
      {
        name: "CRM",
        description:
          "Hygiene and stage definitions the managers inspect. If it is not in the CRM, it is not in the forecast.",
        yearStarted: 2015,
      },
      {
        name: "Value Selling",
        description:
          "Coached the team onto a payments-cost and payout-speed case. Average discount on the mid-market book fell from 18% to 11%.",
        yearStarted: 2016,
      },
      {
        name: "Relationship Management",
        description:
          "Keep the regional managers and the top 15 sellers close enough that a miss is called in week two, not week twelve.",
        yearStarted: 2016,
      },
      {
        name: "Change Management",
        description:
          "Moved a team that lived in spreadsheet forecasts onto inspected CRM stages. The shadow tracker died in a quarter.",
        yearStarted: 2019,
      },
    ],
    companies: [
      {
        name: "Lakeshore Payments",
        description:
          "Payments and payouts for mid-market merchants and marketplaces. Chicago HQ, national mid-market team.",
        location: "Chicago, IL",
        startDate: "2021-07-01",
        positions: [
          {
            title: "Vice President, Mid-Market Sales",
            startDate: "2021-07-01",
            projects: [
              {
                name: "Inspectable forecast cadence",
                description:
                  "Weekly inspection of commit from opportunity scores, not manager roll-up. Two-quarter accuracy on a $38M number held inside 5%.",
                skills: ["Pipeline Forecasting", "CRM", "Stakeholder Management"],
              },
              {
                name: "Deal-review and kill dates",
                description:
                  "Required a next step, an economic buyer, and a kill date in every review. Stale stage-3 deals fell 44%.",
                skills: ["Opportunity Management", "Value Selling", "Change Management"],
              },
              {
                name: "Territory and ICP coverage",
                description:
                  "Rewrote territories and named-account plans for 42 sellers. ICP coverage rose from 61% to 88%.",
                skills: ["Account Planning", "Relationship Management"],
              },
            ],
          },
        ],
      },
      {
        name: "Windy City Software",
        description: "Vertical SaaS for Midwest distributors. Inside and field mid-market.",
        location: "Chicago, IL",
        startDate: "2015-04-01",
        endDate: "2021-06-15",
        positions: [
          {
            title: "Regional Sales Manager",
            startDate: "2018-01-01",
            endDate: "2021-06-15",
            projects: [
              {
                name: "Central-region operating rhythm",
                description:
                  "Ran 11 AEs on a Monday forecast and a Thursday deal review. The region hit 104%, 97%, and 112% in three years.",
                skills: [
                  "Pipeline Forecasting",
                  "Opportunity Management",
                  "Relationship Management",
                ],
              },
              {
                name: "Discount guardrail",
                description:
                  "Installed a value-case requirement above 12% off. Average discount on the region fell from 19% to 12%.",
                skills: ["Value Selling", "Change Management", "Stakeholder Management"],
              },
            ],
          },
          {
            title: "Account Executive",
            startDate: "2015-04-01",
            endDate: "2017-12-31",
            projects: [
              {
                name: "Distributor desk",
                description:
                  "Carried a $1.1M quota into Midwest distributors. 118% and 126% in the last two years on the bag.",
                skills: ["Opportunity Management", "Account Planning", "CRM"],
              },
              {
                name: "First written forecast",
                description:
                  "Moved my own book off a private spreadsheet. The manager could inspect it; I kept the habit.",
                skills: ["Pipeline Forecasting", "CRM"],
              },
            ],
          },
        ],
      },
    ],
    education: [
      {
        school: "University of Illinois Chicago",
        degree: "B.A. Communications",
        dateAwarded: "2014-12-13",
      },
      {
        school: "Kellogg School of Management",
        degree: "Certificate, Sales Leadership",
        dateAwarded: "2020-08-21",
      },
    ],
    certifications: [
      {
        name: "Certified Sales Leader",
        issuer: "Sales Management Association",
        dateAwarded: "2022-03-18",
        credentialId: "SMA-CSL-MJ-2203",
      },
      {
        name: "MEDDICC Certified",
        issuer: "MEDDIC Academy",
        dateAwarded: "2019-02-15",
        credentialId: "MEDDIC-MJ-1902",
      },
    ],
    featuredProjects: [
      {
        name: "Mid-market sales operating system",
        description:
          "<p>An inspectable forecast, deal reviews with kill dates, and territories that cover the ICP. $38M number inside 5% commit accuracy, and stale stage-3 deals down 44%.</p>",
        links: [
          { label: "Operating system", url: "https://www.example.com/johnson-mm-os" },
          { label: "Deal-review guide", url: "https://www.example.com/johnson-deal-review" },
        ],
        skills: ["Pipeline Forecasting", "Opportunity Management", "Account Planning"],
      },
    ],
  }),
];
