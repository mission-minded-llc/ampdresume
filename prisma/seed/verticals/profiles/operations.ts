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
                name: "Converted three transfer presses to SMED kits and cut changeover from 47 to 18 minutes",
                description:
                  "Converted three transfer presses to SMED kits, staged fasteners, and a single-minute die-change standard the setup crews could run on third shift. Average changeover fell from 47 to 18 minutes and released 9 hours of weekly capacity without adding a fourth crew.",
                skills: ["Lean Manufacturing", "TPM", "Technical Leadership"],
              },
              {
                name: "Installed a three-shift daily board that cut unplanned overtime 22% while holding delivery",
                description:
                  "Installed a three-shift board for OEE, scrap, and labor hours so supervisors could act before Friday became the recovery plan. Cut unplanned overtime 22% while holding on-time delivery above 98.4%, and the weekend float stopped being the default answer to a mix change.",
                skills: ["Workforce Planning", "Production Planning", "Change Management"],
              },
              {
                name: "Rewrote crane and lockout rules after a near miss and cut recordables from 3.4 to 1.1",
                description:
                  "Rewrote crane and lockout rules with the trades and the safety committee after a near miss in the die-set pit. Recordables fell from 3.4 to 1.1 in 18 months, and the new cards were the ones third shift actually used, not a binder in the office.",
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
                name: "Pulled melt, shakeout, and machining onto one system and cut work-in-process 28%",
                description:
                  "Pulled melt, shakeout, and machining onto one pull system so a hot heat no longer sat waiting on a batch queue. Work-in-process fell 28% and late shipments to the Detroit customer dropped from 6.1% to 1.8% without adding a buffer of finished housings.",
                skills: ["Lean Manufacturing", "Production Planning"],
              },
              {
                name: "Replaced Saturday catch-up with a Friday close that cut weekend hours 41%",
                description:
                  "Replaced Saturday catch-up with a Friday close checklist and a skilled-trades float that supervisors could staff from the weekday bench. Weekend hours fell 41% over two years, and the union committee stopped treating Saturday as unpaid planning someone else would fix.",
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
                name: "Wrote B-shift molding standard work for 34 operators and raised first-pass yield 4.2 points",
                description:
                  "Wrote the first standard work for the B-shift molding line and trained 34 operators who had been running from memory and the day-shift leftover notes. First-pass yield rose 4.2 points, and the night crew finally had a sequence that survived a relief operator.",
                skills: ["Lean Manufacturing", "Technical Leadership"],
              },
              {
                name: "Stood up operator TPM checks on six molders and cut unplanned downtime 19%",
                description:
                  "Stood up operator TPM checks on six molding machines, including the greasing and guard checks that maintenance had been skipping on nights. Unplanned downtime on those assets fell 19% in two quarters, and the lockout cards rode with the route so a check did not become a safety miss.",
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
                name: "Collapsed a Line 4 batch cell into one-piece flow and ran the same rate with two fewer operators",
                description:
                  "Collapsed a batch machining cell into a one-piece-flow U-cell so shafts stopped traveling the aisle between operations. Travel distance dropped 60% and the cell ran with two fewer operators at the same rate, which gave the skilled-trades bench back two people without a layoff story.",
                skills: ["Lean Manufacturing", "Workforce Planning"],
              },
              {
                name: "Rewrote CNC lockout cards with maintenance and cleared the next corporate safety review",
                description:
                  "Rewrote lockout cards with maintenance after an audit finding that the old cards still showed a retired disconnect. The cell passed the next corporate safety review with zero majors, and operators could point to the card on the cabinet instead of calling a supervisor to guess.",
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
        name: "Plant-wide daily management system at Northline",
        description:
          "<p>A plant-level operating system that puts OEE, scrap, labor hours, and safety on one board for three shifts. Supervisors run the huddle; escalation is time-boxed to the hour, not the next staff meeting. Unplanned overtime fell 22% once the weekend float stopped being the default plan.</p>",
        skills: ["Lean Manufacturing", "Change Management", "Workforce Planning"],
      },
      {
        name: "SMED kits and pit standard for transfer presses",
        description:
          "<p>Die-change kits, staged fasteners, and a pit standard that cut average changeover from 47 to 18 minutes across three presses without adding a fourth setup crew. The same kits run on third shift, which is where a poster standard usually dies.</p>",
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
      {
        name: "Change Management",
        description:
          "Turns a special-status containment into a control-plan rewrite operators will run. Adoption is a reaction plan on the cell, not a poster in the break room.",
        yearStarted: 2016,
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
                name: "Moved 14 CNC cells onto live SPC charts and raised flagship Cpk from 1.12 to 1.48",
                description:
                  "Moved bore and grind checks from end-of-shift samples to real-time charts with reaction plans operators actually ran, not a stack of sort tickets after the fact. Cpk on the flagship family rose from 1.12 to 1.48, and the auditor could walk the cell and see the same story the chart told.",
                skills: ["SPC", "Quality Improvement", "Six Sigma"],
              },
              {
                name: "Rewrote control plans and layered audits after special status and cleared it in seven months",
                description:
                  "Rewrote control plans and layered process audits after a customer special status that had turned every shipment into a containment exercise. Cleared the status in seven months with zero majors on the next registrar visit, and the management review stopped recycling last year's open actions.",
                skills: [
                  "Quality Management",
                  "Internal Controls",
                  "Stakeholder Management",
                  "Change Management",
                ],
              },
              {
                name: "Blocked dock shipment in the ERP until the lab released the lot and ended inspection escapes",
                description:
                  "Blocked dock shipment in the ERP until the lab released the lot, so a traveler could not print a shipper the certificate had not earned. Escapes tied to skipped inspection dropped to zero in the following two quarters, and the dock stopped asking quality to 'just sign it' at 4 p.m.",
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
                name: "Ran a leak-tester Six Sigma study that cut false fails 54% and restored standard sampling",
                description:
                  "Ran a Six Sigma project on the end-of-line leak tester after false fails had flooded the sort bay and the customer had tightened sampling. False fails fell 54% and the customer returned the line to standard sampling once the gage and the fixture stopped arguing with each other.",
                skills: ["Six Sigma", "SPC", "Quality Improvement"],
              },
              {
                name: "Rebuilt PPAP evidence for three chronic suppliers and cut their incoming PPM 71%",
                description:
                  "Rebuilt incoming inspection and PPAP evidence for three chronic suppliers who had been living on concessions and a handshake. Incoming PPM from those sources fell 71%, and the next launch packet had dimensional data the customer did not send back for a rewrite.",
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
                name: "Wrote the launch control plan and MSA for a new manifold and held launch PPM under 80",
                description:
                  "Wrote the launch control plan and MSA for a new manifold family before the first production heat, not after the first customer complaint. Launch PPM stayed under 80 against a 250 target, and the reaction plan was posted on the cell instead of living in a shared drive nobody opened.",
                skills: ["Quality Management", "SPC"],
              },
              {
                name: "Closed the gap between red-tag inventory and the system so every tagged lot sat in the hold cage",
                description:
                  "Closed the gap between red-tag inventory and the system of record after a walk found tagged lots still on the dock. A physical audit found 100% of tagged lots in the hold cage, and a concession could no longer print a shipper without a signed disposition.",
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
                name: "Put SPC on pour temperature and chemistry and cut misrun and hard-spot scrap 16%",
                description:
                  "Put SPC on pour temperature and chemistry so a cold heat no longer became a surprise in machining. Scrap from misruns and hard spots fell 16% in the first year, and the melt deck finally had a reaction plan that was not 'pour it anyway and sort later.'",
                skills: ["SPC", "Quality Improvement"],
              },
              {
                name: "Stood up a foundry layout bench and gage R&R cadence so machining stopped guessing at variation",
                description:
                  "Stood up a layout bench and a gage R&R cadence so machining could stop guessing whether a bore miss started in the mold or on the mill. Foundry variation had a number, not a shrug, and the next capability study used the same fixtures the floor would run.",
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
        name: "Real-time SPC program for precision bore cells",
        description:
          "<p>Fourteen CNC cells on live control charts with reaction plans operators actually run. Capability on the flagship bore family moved from 1.12 to 1.48 Cpk without adding inspectors. The auditor can walk the cell and see the same story the chart tells.</p>",
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
                name: "Rebuilt the weekly master schedule around heat-treat windows and raised adherence from 81% to 94%",
                description:
                  "Rebuilt the weekly schedule around heat-treat windows and heading-cell changeovers so a promotion no longer printed as a wish the floor could not run. Schedule adherence rose from 81% to 94% in three quarters, and the Friday fire drill stopped being the plan of record.",
                skills: ["Production Planning", "ERP", "Lean Manufacturing"],
              },
              {
                name: "Reset safety stock and lot sizes by family and lifted turns from 6.1 to 8.4",
                description:
                  "Recalculated safety stock and order multiples by fastener family from actual demand and setup cost, not tribal min/max. Turns rose from 6.1 to 8.4 and A-item fill stayed above 98.7%, which meant the C-item bins finally stopped hiding a second plant's worth of steel.",
                skills: ["Inventory Optimization", "Demand Planning"],
              },
              {
                name: "Brought a one-page capacity story to S&OP so promotions stopped landing on full families",
                description:
                  "Brought a one-page capacity story to monthly S&OP so sales could see which families were already full before they promised a circular. Promotions stopped landing on already-loaded heading cells, and the plant stopped finding out about a lift in the same week the steel was due.",
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
                name: "Built an e-coat hang-density and cure-window model that raised on-time finish 11 points",
                description:
                  "Built a hang-density and cure-window model so the e-coat line stopped overbooking Thursday and then apologizing to the dock on Friday. On-time finish rose 11 points, and the ERP work center finally told the truth about how many racks a shift could actually hang.",
                skills: ["Production Planning", "ERP"],
              },
              {
                name: "Cut the MRP exception list from 900 to under 120 by fixing lead times and phantom BOMs",
                description:
                  "Cut the MRP exception list from 900 to under 120 by fixing lead times and phantom BOMs that had been generating noise since the last ERP cutover. Planners stopped living in firefighting, and the Monday meeting finally had a list of real breaks instead of a scroll of ghosts.",
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
                name: "Reset min/max on 80 process chemicals and cut A-resin stockouts from 9 a quarter to 1",
                description:
                  "Reset min/max on 80 process chemicals after the floor had been stealing pigment from the next job to keep a line up. Stockouts of A resins dropped from 9 a quarter to 1, and purchasing stopped placing emergency drums at a premium because someone forgot the coverage report.",
                skills: ["Inventory Optimization", "Demand Planning"],
              },
              {
                name: "Started a monthly forecast-bias review with two distributors and cut overbuilds on specials 34%",
                description:
                  "Started a monthly bias review with the two largest distributors so their specials stopped arriving as a surprise the week after we had already headed the stock program. Overbuilds on their specials fell 34%, and the leftover custom lots stopped aging in the finished-goods cage.",
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
          "<p>A weekly master schedule that respects heat-treat windows and heading-cell changeovers. Adherence moved from 81% to 94% and the Friday fire drill stopped being the plan. The ERP work centers finally tell the truth about what a shift can run.</p>",
        skills: ["Production Planning", "ERP", "Lean Manufacturing"],
      },
      {
        name: "Inventory policy reset by fastener family",
        description:
          "<p>Safety stock and lot sizes reset from actual demand and setup cost, not tribal min/max. Turns rose from 6.1 to 8.4 with A-item fill still above 98.7%. The C-item bins finally stopped hiding a second plant's worth of steel.</p>",
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
                name: "Rolled TPM across 18 spine assets and lifted OEE from 61% to 74% while cutting weekend recovery 36%",
                description:
                  "Stood up autonomous and planned maintenance on the 18 assets that gate the assembly spine, with lockout folded into the route so a maintenance win did not become a safety miss. OEE rose from 61% to 74% and weekend recovery hours fell 36%, which meant Saturday stopped being the unofficial third shift.",
                skills: ["TPM", "Maintenance Planning", "Process Safety"],
              },
              {
                name: "Closed a chronic seal leak at press-fit and cut customer returns on that family 81%",
                description:
                  "Ran DMAIC on a chronic seal leak and changed the press-fit instead of adding another 100% air test that the night crew would eventually skip. Customer returns on that family dropped 81%, and the dollar showed up in the P&L as scrap and warranty, not as a kaizen poster.",
                skills: ["Six Sigma", "Quality Improvement"],
              },
              {
                name: "Ran a 12-project CI slate with A3 training and closed 10 on the committed date",
                description:
                  "Ran a twelve-project CI portfolio with team-lead A3 training so improvement was not a staff function that visited the floor. 10 of 12 projects closed on the committed date with finance-signed savings, and the two that slipped had a named reason instead of a quiet burial.",
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
                name: "Cut slitter changeover from 52 to 24 minutes and released a sixth run per shift",
                description:
                  "Cut slitter changeover from 52 to 24 minutes with staged knives and a two-person standard the crews could run without waiting on a setup specialist. Released a sixth run per shift, and the leftover changeover minutes stopped hiding in a 'we'll catch it on Saturday' note.",
                skills: ["Lean Manufacturing", "Change Management"],
              },
              {
                name: "Ran Six Sigma on dye-lot shade variation and cut rework yards 44%",
                description:
                  "Ran Six Sigma on shade variation after the finishing floor had been living on extra inspection and a hope that the next lot would match. Rework yards fell 44% after the recipe and hold-time controls stuck, and the customer stopped sending back rolls that looked fine under the plant lights.",
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
                name: "Wrote finishing-line standard work for both shifts and raised first-pass yield 3.6 points",
                description:
                  "Wrote the first standard work for the finishing line and trained both shifts, including the relief operators who had been inventing a sequence each time someone called in. First-pass yield rose 3.6 points, and the night crew finally had a method that survived a mix change.",
                skills: ["Lean Manufacturing", "Quality Improvement"],
              },
              {
                name: "Replaced the copied OEM PM list with a failure-history calendar and cut emergency work 22%",
                description:
                  "Replaced the copied OEM PM list with a calendar built from failure history so the crew stopped greasing what never failed and ignoring what always did. Emergency work orders fell 22% in a year, and the planned window finally had a job that matched the asset, not the binder.",
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
                name: "Closed or killed 600 stale work orders and lifted planned maintenance hours from 31% to 58%",
                description:
                  "Closed or killed 600 stale work orders and stood up a weekly planning meeting so the backlog stopped being a museum of jobs nobody would ever do. Planned work rose from 31% to 58% of hours, and the trades finally had a week they could staff instead of a scroll of ghosts.",
                skills: ["Maintenance Planning", "Program Management"],
              },
              {
                name: "Wrote equipment-specific lockout cards on the grinders and cleared the next insurance finding",
                description:
                  "Wrote equipment-specific lockout cards with the trades after an insurance survey found generic cards that still showed a retired disconnect. The next survey cleared the prior finding, and a grinder stoppage no longer started with a debate about which breaker was the real one.",
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
        name: "TPM operating system on the gearbox assembly spine",
        description:
          "<p>Autonomous and planned maintenance on the 18 assets that gate assembly. OEE moved from 61% to 74%, and the weekend became a planned window instead of a rescue. Lockout rides with the route so a maintenance win does not become a safety miss.</p>",
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
                name: "Required a reason code on every sales override and cut A-item WAPE from 31% to 19%",
                description:
                  "Required a reason code and a lookback for every sales override so a 'just add 10%' habit had to survive a 15-minute challenge. A-item WAPE fell from 31% to 19% and unearned lift stopped flooding the plants, which meant the exception list finally had names instead of a corporate MAPE that hid the damage.",
                skills: ["Demand Planning", "Stakeholder Management", "Change Management"],
              },
              {
                name: "Replaced a 60-slide S&OP pack with a one-page decision log and held volume inside 4%",
                description:
                  "Replaced a 60-slide pack with a one-page decision log that named the call, the owner, and the number sales, marketing, and supply would live with. Consensus volume finished the year inside 4% of actuals, and the monthly meeting stopped being a recitation of last month's misses.",
                skills: ["S&OP", "Market Analysis"],
              },
              {
                name: "Recut safety stock from demand variability and dropped $6.2M of C-item excess",
                description:
                  "Recut safety stock by family using demand variability and lead time instead of a flat weeks-of-cover that treated every SKU like an A item. Excess on C items dropped $6.2M; A-item fill held at 98.1%, and the ERP forecast of record finally drove the min/max instead of a shadow workbook.",
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
                name: "Split the forecast into four store clusters and cut produce shrink 12% in two seasons",
                description:
                  "Split the forecast into four store clusters instead of one chain number that averaged a urban flagship with a rural independent. Produce shrink fell 12% in the first two seasons, and the buyers stopped shipping a city circular into stores that had never moved that SKU.",
                skills: ["Demand Planning", "Market Analysis", "Python"],
              },
              {
                name: "Built a promotional lift model from two years of circulars and cut holiday overbuilds 29%",
                description:
                  "Built a simple lift model from two years of circulars so a holiday shipper had to earn its case pack against actuals, not last year's hope. Overbuilds on holiday shippers fell 29%, and the leftover displays stopped dying in the back room after week two.",
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
                name: "Moved grocery and HBC forecasts into the ERP so purchasing stopped placing from a stale workbook",
                description:
                  "Moved grocery and HBC forecasts out of a shared workbook into the ERP as the forecast of record. Purchasing stopped placing from a stale copy that had been emailed on a Tuesday and edited on a Thursday, and the exception queue finally matched what the system would buy.",
                skills: ["ERP", "Change Management"],
              },
              {
                name: "Built a daily exception list for the top 200 SKUs and cut stockouts on those items 18%",
                description:
                  "Stood up a daily exception list for the top 200 SKUs so an A-item miss showed up as a name before the store called. Stockouts on those items dropped 18% in two quarters, and the planners stopped discovering a hole when the order was already late.",
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
        name: "Monthly S&OP that decides instead of reciting",
        description:
          "<p>A monthly demand and supply review with a one-page decision log. Consensus volume finished inside 4% of actuals, and overrides had to survive a 15-minute challenge. The 60-slide pack retired; the exception list has names.</p>",
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
                name: "Sited a 420k sq ft Carolinas DC that modeled 8.4% landed-cost reduction on a $210M base",
                description:
                  "Sited a 420k sq ft DC near Concord to pull volume off Atlanta and Savannah after the model beat the current cost-to-serve, not a map that looked tidy. Modeled 8.4% landed-cost reduction on a $210M base; the board funded it, and operations signed the labor and dock-door assumptions before the slide left the room.",
                skills: ["Network Optimization", "Financial Modeling", "Stakeholder Management"],
              },
              {
                name: "Reassigned 1,100 SKUs and rebuilt safety stock so the new node did not starve in week three",
                description:
                  "Reassigned 1,100 SKUs and rebuilt safety stock for the new node so the inventory move was in the business case, not a week-three surprise when Atlanta still held the A items. Slotting, dock-door, and labor assumptions were the ones the DC managers would sign, not a solver default.",
                skills: ["Inventory Optimization", "Warehouse Management", "Network Planning"],
              },
              {
                name: "Replaced the rate-card cost layer with 12 months of TMS tenders and killed two false savings lanes",
                description:
                  "Replaced the rate-card layer with 12 months of TMS tenders and accessorials so a lane recommendation had to survive a month of real cost. Two 'savings' lanes died when the accessorials showed up, which is cheaper than opening a door on a lie.",
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
                name: "Closed an underused cross-dock, re-routed 18 lanes, and cut cost per hundredweight 6.1%",
                description:
                  "Closed one underused cross-dock and re-routed 18 lanes after the volume could not pay for the doors. Transportation cost per hundredweight fell 6.1% with service still inside the SLA, and the remaining docks finally had a night they could staff.",
                skills: ["Network Optimization", "TMS", "Network Planning"],
              },
              {
                name: "Built a shipper cost-to-serve map that sales used to reprice or exit two unprofitable accounts",
                description:
                  "Built a cost-to-serve map that sales could use in pricing instead of a blended average that hid the expensive shippers. Two unprofitable accounts were repriced or exited, and the next bid started from actual cost, not last year's hope.",
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
                name: "Reconciled TMS rates to invoices on the top 40 lanes and found $1.3M in accessorial leakage",
                description:
                  "Reconciled TMS rates to invoices on the top 40 lanes after the rate card and the bill had stopped telling the same story. Found $1.3M in accessorial leakage in the first year, and the next bid packet used the invoice, not the brochure.",
                skills: ["TMS", "Financial Modeling"],
              },
              {
                name: "Redrew Saturday grocery pool routes and raised on-time delivery 5 points without adding tractors",
                description:
                  "Redrew Saturday pool routes for grocery so the late stores were not always the ones at the end of a hope-and-a-map run. On-time delivery rose 5 points without adding tractors, and the dock could stage the pool before the first tractor idled in the yard.",
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
                name: "Modeled drayage versus rail for inland points and shifted 12% of volume to rail",
                description:
                  "Modeled drayage versus rail for inland points so a container did not default to a truck because that was how last year moved. Shifted 12% of volume to rail with a two-day service hold, and the importers who needed the faster lane kept it with a number, not a habit.",
                skills: ["Network Optimization", "Python"],
              },
              {
                name: "Built a daily dwell and chassis report that cut average yard dwell 0.6 days",
                description:
                  "Built a daily dwell and chassis report for the yard team so a box that had been sitting since Tuesday had a name on it by Wednesday morning. Average dwell fell 0.6 days in two quarters, and the chassis pool stopped being a scavenger hunt at the gate.",
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
        name: "Carolinas greenfield DC and network case",
        description:
          "<p>A DC siting and flow-path study that used TMS actuals, not the rate card. The board funded a 420k sq ft node after the model showed 8.4% landed-cost reduction on a $210M base. Operations signed the labor and dock-door assumptions before the slide left the room.</p>",
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
                name: "Rebid hot-roll and bar with a should-cost model and validated $11M on a $190M book",
                description:
                  "Rebid hot-roll and bar with a should-cost model and a second qualified mill so a steel move did not become an emergency PO at the spot price. Validated $11M on a $190M metals book without a quality escape, and the index clause was signed after the second mill could actually ship.",
                skills: ["Procurement", "Contract Negotiation", "Program Management"],
              },
              {
                name: "Collapsed six plant vendor lists into one and cut maverick spend from 14% to 4%",
                description:
                  "Collapsed six plant vendor lists into one and turned on three-way match so maverick spend had nowhere to hide behind a local favorite. Maverick spend fell from 14% to 4% of addressable PO dollars, and the 'we've always used them' exception now needed a VP signature.",
                skills: ["ERP", "Change Management", "Stakeholder Management"],
              },
              {
                name: "Moved inserts, bearings, and PPE onto consignment and cut stores inventory 18%",
                description:
                  "Moved inserts, bearings, and PPE onto consignment and VMI so the crib stopped being a second distributor. Stores inventory dropped 18% and line-down stockouts on those items went to zero, which meant a missing insert was a process miss, not a 2 a.m. truck.",
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
                name: "Consolidated four motor and drive brands to two and cut unit cost 9% with a dual-source clause",
                description:
                  "Consolidated four motor and drive brands to two with a dual-source clause so a single OEM could not hold a launch hostage. Unit cost fell 9% and lead-time variability dropped by a week, and the plants still had a second name they could actually order.",
                skills: ["Procurement", "Contract Negotiation", "Relationship Management"],
              },
              {
                name: "Rebid corrugate and dunnage across three plants and landed $3.4M with a shared spec",
                description:
                  "Rebid corrugate and dunnage across three plants after each site had been buying its own 'special' box that was the same RSC with a different part number. $3.4M savings with a shared spec engineering signed, so the next change order could not reopen the price.",
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
                name: "Stood up MRO punchout catalogs, cleaned 8,000 items, and stopped five-SKU insert spot buys",
                description:
                  "Stood up punchout catalogs and cleaned 8,000 MRO items so the same insert stopped living under five SKUs and a night-shift spot buy. The crib could finally search one name, and the next PO matched the item master instead of a typed description that purchasing had to decode.",
                skills: ["ERP", "Procurement"],
              },
              {
                name: "Required a reason code and plant sign-off for expedites and cut premium freight 37%",
                description:
                  "Required a reason code and a plant sign-off for expedites so a missed forecast could not hide inside a hot truck. Premium freight on my book fell 37% in a year, and the Monday review finally had owners instead of a stack of invoices nobody wanted to explain.",
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
                name: "Kept the mill allocation book and the spot book separate so a promise did not eat the reserve",
                description:
                  "Kept the allocation book and the spot book separate so a customer promise did not eat the mill reserve the next heat was already sold against. Sales could still say yes; they just had to say it against the book that could actually ship.",
                skills: ["Procurement", "Inventory Optimization"],
              },
              {
                name: "Closed mill quality claims inside 30 days and recovered $410k that had been dying in email",
                description:
                  "Closed quality claims with mills inside 30 days instead of letting a debit sit in a thread until the mill 'needed more pictures.' Recovered $410k in a year that had been dying in email, and the next claim had a file the mill could not pretend it had never seen.",
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
        name: "Should-cost and dual-source program for metals",
        description:
          "<p>A should-cost and dual-source program on hot-roll and bar. $11M validated on a $190M book, with a second mill qualified before the index clause was signed. A steel move no longer becomes an emergency PO at the spot price.</p>",
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
                name: "Reslotted A items to the golden zone and raised units per labor hour 17% while cutting travel 24%",
                description:
                  "Reslotted A items to the golden zone and rewrote pick paths so a grocery wave no longer walked the building for a case that should have been at the hip. Units per labor hour rose 17% and travel per pick fell 24%, and the labor plan finally matched the wave instead of a hope.",
                skills: ["Warehouse Management", "Lean Manufacturing", "Workforce Planning"],
              },
              {
                name: "Installed ABC cycle counts that hold 99.4% accuracy without an annual wall-to-wall shutdown",
                description:
                  "Installed location-audit and ABC cycle counts that hold 99.4% accuracy so the annual wall-to-wall became a sample, not a holiday that shut the building. A mis-slot was a process failure with an owner, and the WMS and ERP stayed in balance at the hour, not the week.",
                skills: ["Inventory Optimization", "ERP"],
              },
              {
                name: "Tied WMS dock doors to TMS appointments and cut average carrier dwell from 94 to 41 minutes",
                description:
                  "Tied WMS dock doors to TMS appointments so carriers were not staged in the yard for two hours waiting on a door that had never been theirs. Average carrier dwell fell from 94 to 41 minutes, and the yard stopped being an unpaid waiting room with a forklift risk.",
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
                name: "Stopped releasing cooler waves the crew could not pick and cut refrigerated A-item shorts 38%",
                description:
                  "Stopped releasing waves the cooler could not pick after the night crew had been living on shorts and a radio call for more people. Shorts on refrigerated A items fell 38%, and the labor plan finally respected the doors and the hours instead of a wave that looked good in the WMS.",
                skills: ["Warehouse Management", "Workforce Planning"],
              },
              {
                name: "Retrained PIT operators, repaired 40 damaged bays, and cut equipment recordables by half",
                description:
                  "Retrained PIT operators and repaired 40 damaged bays after a racking hit had become a shrug and a cone. Recordables tied to equipment fell by half in a year, and a damaged upright was a work order the same shift, not a story for the next safety meeting.",
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
                name: "Wrote night-shift receiving and putaway standard work and cut mis-slots on that crew 41%",
                description:
                  "Wrote receiving and putaway standard work for nights after the day crew had been inheriting a building the night shift had invented. Mis-slots on the night crew dropped 41%, and a label that did not match the location was a process miss, not a picker problem.",
                skills: ["Warehouse Management", "Lean Manufacturing"],
              },
              {
                name: "Built a nightly WMS-to-ERP reconciliation that caught inventory drift before the cycle count",
                description:
                  "Closed the nightly inventory recon before first wave so a WMS move that never hit the ERP could not hide until the customer audit. The morning surprise count ended, and the reconciling journal became an exception with an owner instead of the close process itself.",
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
        name: "Columbus campus slotting and walk-path program",
        description:
          "<p>A golden-zone slotting and walk-path rewrite for a 720k sq ft campus. Units per labor hour rose 17%, travel per pick fell 24%, and the labor plan finally matched the wave. A mis-slot is a process failure with an owner, not a picker problem.</p>",
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
                name: "Required a written scorecard and same-week debrief and cut time-to-offer on priority roles from 62 to 38 days",
                description:
                  "Required a written scorecard and a debrief inside five business days so a hiring manager could not keep a search open by 'just meeting one more person.' Time-to-offer on priority roles fell from 62 to 38 days, and interviewer training became a prerequisite, not a suggestion the ELT could skip.",
                skills: ["Talent Acquisition", "Change Management", "Stakeholder Management"],
              },
              {
                name: "Tied the annual hiring plan to funded seats and cut open requisitions 22%",
                description:
                  "Tied the annual hiring plan to funded seats so leftover reqs could not sit open as a comfort blanket. Open reqs dropped 22% and the leftover-req pile disappeared, which meant the ATS finally showed roles the business could staff and pay for.",
                skills: ["Workforce Planning", "Organizational Design", "HRIS"],
              },
              {
                name: "Rewrote the careers narrative and raised senior editorial offer-accept from 61% to 78%",
                description:
                  "Rewrote the careers site and employee stories so the company stopped losing senior editors to a louder brand with a thinner bench. Senior editorial offer-accept rose from 61% to 78% in three quarters, and the passive candidates we already knew finally had a story worth returning a call for.",
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
                name: "Closed four editor-in-chief searches in 11 months with slates the boards actually chose from",
                description:
                  "Closed four EIC searches in 11 months with slates the boards actually chose from, not a single favorite dressed up as a process. No search reopened after kickoff, and the scorecard was written before the first outreach, which is when it still has a chance.",
                skills: ["Talent Acquisition", "Stakeholder Management"],
              },
              {
                name: "Kept a living bench of 80 finalists so two sudden VP searches started with a shortlist",
                description:
                  "Kept a living bench of 80 silver-medalist and passive finalists so a sudden VP search did not start from a blank Boolean. Two of those searches opened with a shortlist, and the clients stopped paying retainers to watch us rebuild a slate from scratch.",
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
                name: "Filled 70 brand and marketing seats a year with a 28-day median time-to-slate",
                description:
                  "Filled 70 brand and marketing seats a year from a volume desk that treated the ATS as the system of record, not a graveyard. Median time-to-slate held at 28 days, and the clients stopped asking where the other two candidates were hiding in a spreadsheet.",
                skills: ["Talent Acquisition", "HRIS"],
              },
              {
                name: "Wrote the first structured interview kit the firm sent with a slate and lifted conversion 9 points",
                description:
                  "Wrote the first structured interview kit the firm sent with a slate so a client could not run a vibe-based panel and then blame the search. Interview-to-offer conversion rose 9 points, and the debrief finally had evidence instead of 'we just didn't click.'",
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
                name: "Built a 200-person editorial contract bench and cut fill time on those requisitions from 12 days to 4",
                description:
                  "Built a 200-person contract bench for copy and production so a last-minute book close did not start with a panicked Boolean. Fill time on those reqs fell from 12 days to 4, and the people we called had already said they wanted the work.",
                skills: ["Talent Acquisition", "Relationship Management"],
              },
              {
                name: "Cleaned 4,000 stale ATS records so the desk stopped calling people who had asked to be left alone",
                description:
                  "Cleaned 4,000 stale records so the desk stopped calling people who had asked to be left alone and then blaming 'the market' when they hung up. The ATS became a bench again, and the next outreach list had a date and a permission, not a 2011 resume.",
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
        name: "Hiring operating system for a media company",
        description:
          "<p>Scorecards, same-week debriefs, and a funded headcount plan. Time-to-offer on priority roles fell from 62 to 38 days, and the leftover-req pile went away. Interviewer training is a prerequisite; 'just one more candidate' now needs a reason.</p>",
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
                name: "Wrote the investigation standard, moved cases off email, and cut median close from 38 to 22 days",
                description:
                  "Wrote the investigation standard and moved cases off email into a tracked system so a file could survive later review and a person still had to come to work on Monday. Median close fell from 38 to 22 days; two audits of the process came back clean, and hold notices finally had a log.",
                skills: ["Employee Relations", "Internal Controls", "Program Management"],
              },
              {
                name: "Trained 280 people leaders on an ER playbook and cut informal issues that became formal cases 24%",
                description:
                  "Trained 280 people leaders on intake, documentation, and when to call ER so a complaint did not have to become a case before a manager would write anything down. Informal issues that became formal cases dropped 24%, and the leaders who called early stopped being the ones who showed up in the risk pack.",
                skills: ["Change Management", "Relationship Management", "Stakeholder Management"],
              },
              {
                name: "Used repeat-case data to trigger org-design reviews and redesigned two high-volume desks",
                description:
                  "Used repeat-case data to trigger span and team-design reviews when a chronic ER pattern was actually a desk that could not be managed. Two high-volume desks were redesigned instead of investigated again, and the next intake had a structure that could hold, not another coaching memo.",
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
                name: "Rebuilt contact-center attendance and conduct standards and cut grievances on those policies 31%",
                description:
                  "Rebuilt attendance and conduct standards with the center leaders after the old rules had been generating grievances faster than they generated attendance. Grievances on those policies fell 31% after the rewrite, and the union and the floor finally had one fact pattern instead of two stories.",
                skills: ["Employee Relations", "Stakeholder Management", "Change Management"],
              },
              {
                name: "Installed legal-hold and privilege logging with counsel so the next external review found complete files",
                description:
                  "Installed legal-hold and privilege logging with counsel so a later review did not discover the file in a personal inbox. The next external review found the files complete, and a hold notice had an owner and a date instead of a hope that someone had saved the thread.",
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
                name: "Covered four claims offices as first-line ER so managers called before they issued the warning",
                description:
                  "Covered four claims offices as the first-line ER partner so a performance conversation did not have to become a complaint before anyone called. Managers started calling before they issued the warning, and the file that landed on Monday was one we had already helped write.",
                skills: ["Employee Relations", "Relationship Management"],
              },
              {
                name: "Wrote a people-leader policy FAQ that cut repeat questions on leave and attendance by half",
                description:
                  "Wrote a short policy FAQ that cut repeat questions on leave and attendance by half after the same three scenarios had been eating the inbox every Monday. Managers could answer the ordinary case without waiting on HR, and the exceptions that still came in were actually exceptions.",
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
        name: "Employee-relations operating system and case file",
        description:
          "<p>An investigation standard, a case system, and a manager playbook. Median time-to-close fell from 38 to 22 days, and two audits of the process came back with zero findings. I write for the file and for the person who still has to come to work on Monday.</p>",
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
                name: "Rebuilt levels and bands for 140 job families and cut off-cycle exceptions 41%",
                description:
                  "Rebuilt levels and bands for 140 job families so range penetration is visible by org, not a year-end surprise in a slide. Off-cycle exceptions dropped 41%, and two title-inflation waves were walked back before they hit the cycle and made the next hire unpayable.",
                skills: ["Compensation", "Organizational Design", "HRIS"],
              },
              {
                name: "Modeled the annual cycle with finance before lock and landed spend within 1.4% of the pool",
                description:
                  "Modeled the cycle with finance before lock so the leftover 'we will find it' habit could not reopen the pool in week three. Spend landed within 1.4% of the approved pool, and the board pack used the same cost and equity-burn numbers finance had already signed.",
                skills: ["Workforce Planning", "Financial Modeling", "Stakeholder Management"],
              },
              {
                name: "Published offer guidelines and a dual-approval path so new-hire premiums stopped blowing the range",
                description:
                  "Published offer guidelines and a dual-approval exception path so a candidate ask could not blow the range for the next person in the seat. The answer in the exception meeting is a band and a rationale, not a vibe, and the shadow spreadsheet for special deals was retired.",
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
                name: "Re-cut survey data for hardware versus software engineering so offers stopped missing on hardware",
                description:
                  "Re-cut survey data for hardware versus software engineering so offers stopped missing on the hardware side while software looked 'on market' in a blended cut. Hiring managers finally had a number they could defend, and we stopped paying a software premium for a board-layout seat.",
                skills: ["Market Analysis", "Compensation", "Stakeholder Management"],
              },
              {
                name: "Built an equity refresh model by level and performance and cut unplanned off-cycle grants 33%",
                description:
                  "Built a refresh model by level and performance so an off-cycle grant had to survive the same math as the cycle. Unplanned off-cycle grants fell 33% the next year, and the exception path had dual approval instead of a hallway yes that showed up in the burn.",
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
                name: "Wrote the first internally published salary-band book so managers stopped inventing titles to dodge a range",
                description:
                  "Wrote the first band book the company would publish internally so a manager could not invent a title to dodge a range and then act surprised at cycle. Job codes and bands lived in the HRIS, and the next offer started from a level the architecture could actually hold.",
                skills: ["Compensation", "Organizational Design", "HRIS"],
              },
              {
                name: "Moved offer letters into the HRIS with job-code checks and retired the shadow Word docs",
                description:
                  "Moved offer letters into the HRIS with job-code checks so a special deal could not hide in a Word doc on someone's desktop. Shadow Word docs lost, and the audit trail for who got what survived a later review instead of a search through email.",
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
          "<p>Levels, bands, and offer guidelines that managers can defend. Off-cycle exceptions dropped 41%, and range penetration stopped being a year-end surprise. The exception meeting answers with a band and a rationale, not a vibe.</p>",
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
                name: "Redrew product and engineering around three platforms and landed the hiring map the same week, with no freeze",
                description:
                  "Redrew product and engineering around three platforms so the announcement and the HRIS orgs were the same file. Hiring map and supervisory orgs landed the same week as the announcement; no freeze, and engagement dips recovered inside a quarter because managers had a toolkit instead of a rumor.",
                skills: ["Organizational Design", "HRIS", "Change Management"],
              },
              {
                name: "Tied open requisitions to a funded quarterly plan and cut unfunded leftover reqs from 34 to 6",
                description:
                  "Tied open reqs to a funded quarterly plan with finance so a wish list could not hide as a requisition. Unfunded leftover reqs dropped from 34 to 6 in two quarters, and TA stopped working seats the GM had not paid for.",
                skills: ["Workforce Planning", "Stakeholder Management", "Talent Acquisition"],
              },
              {
                name: "Installed a monthly performance and ER huddle for 45 leaders and cut formal cases from skipped conversations 27%",
                description:
                  "Installed a monthly performance and ER huddle for 45 people leaders so a conflict did not have to wait for a specialist or become a case. Formal cases from skipped conversations fell 27%, and the leaders who called early were no longer the ones who showed up in the file.",
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
                name: "Split GTM into three regions and moved 90 people without a skip in quota credit",
                description:
                  "Designed the regional GTM org and moved 90 people without a skip in quota credit, which is the part that usually breaks the quarter. HRIS and comp changes landed on the same Monday, and the skip-level cadence kept the engagement dip inside one quarter.",
                skills: ["Organizational Design", "HRIS", "Change Management"],
              },
              {
                name: "Stopped mid-quarter requisitions with no budget so the quarterly plan became the only way a seat opened",
                description:
                  "Stopped mid-quarter reqs that had no budget after the company had been opening seats in a slide and then arguing with finance in week six. The quarterly plan became the only way a seat opened, and the GM, finance, and I used one headcount number.",
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
                name: "Stood up supervisory orgs and job codes at 250 people and retired the spreadsheet org chart",
                description:
                  "Stood up supervisory orgs and job codes when the company passed 250 and the slide org had stopped matching anyone's manager. The spreadsheet org chart retired, and position management in the HRIS became the file we used for headcount, not a picture we redrew after the fact.",
                skills: ["HRIS", "Organizational Design"],
              },
              {
                name: "Wrote the first founder intake and scorecard and cut time-to-offer on engineering seats 16 days",
                description:
                  "Wrote the first intake and scorecard the founders would use so a priority engineering seat did not sit open while we debated the level in a hallway. Time-to-offer on those seats fell 16 days, and TA finally had a written brief instead of a vibe.",
                skills: ["Talent Acquisition", "Relationship Management", "Stakeholder Management"],
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
        name: "Product-org redesign that landed without a freeze",
        description:
          "<p>An org design, HRIS cutover, and hiring map that landed the same week as the announcement. Two platform teams stood up without a six-month stall. Manager toolkits and skip-levels kept the engagement dip inside one quarter.</p>",
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
                name: "Merged two overlapping cleaners, killed a third-place brand, and cut marketing cost 120 bps with share still up",
                description:
                  "Merged two overlapping cleaners and killed a third-place brand in a declining aisle instead of funding another revitalization. Marketing cost as a percent of sales fell 120 bps with share still up on the survivors, and the $40M TAM we sized was the one that did not get a team.",
                skills: ["Brand Strategy", "Market Analysis", "Market Sizing"],
              },
              {
                name: "Ran the hero campaign against a retailer holdout and landed 18% incremental lift on the hero SKU",
                description:
                  "Ran the hero campaign against a retailer holdout so incrementality had a number, not a vanity-reach slide. Incremental lift landed at 18% on the hero SKU; we cut the channels that did not move it, and sales could reuse the content without rewriting the brand every circular.",
                skills: ["Campaign Analytics", "Content Strategy", "Product Marketing"],
              },
              {
                name: "Replaced custom banner decks with one 12-page sell-in story and hit 78% year-one ACV",
                description:
                  "Wrote one 12-page story for category captains instead of a custom deck per banner that became a different company on the shelf. Year-one ACV on the latest innovation hit 78% against a 65% target, and the second brief was the one I refused.",
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
                name: "Restaged the club pack and aisle story and lifted club velocity 14% without a list-price cut",
                description:
                  "Restaged the club pack and the aisle story so a warehouse club did not get a smaller grocery pack with a louder claim. Club velocity rose 14% without a list-price cut, and the category captains finally had a story they did not have to rewrite in the room.",
                skills: ["Brand Strategy", "Market Analysis", "Stakeholder Management"],
              },
              {
                name: "Replaced one-off agency films with a quarterly content system and cut asset waste by a third",
                description:
                  "Replaced one-off agency films with a quarterly content system sales could reuse without inventing a new brand every circular. Asset waste fell by a third, and incrementality—not vanity reach—decided which films got another quarter of budget.",
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
                name: "Wrote the first sell-in category managers stopped rewriting and beat prior-year spring distribution by 9 ACV points",
                description:
                  "Wrote the first sell-in that category managers stopped rewriting after they had been turning every deck into their own brand. Distribution on the spring SKU beat the prior year by 9 ACV points, and the 12-page story survived a 20-minute meeting.",
                skills: ["Product Marketing", "Slide Storytelling"],
              },
              {
                name: "Sized the wipe adjacent before tooling and killed the project at a $40M TAM",
                description:
                  "Sized the wipe adjacent before we tooled a line so a 'new platform' had to clear a TAM that could pay for a team. The $40M TAM killed the project in time, and we stopped funding the third-place idea in a declining aisle.",
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
                name: "Recommended killing a four-brand client's flanker that was stealing from the hero, and hero share rose 1.6 points",
                description:
                  "Recommended killing a flanker that was stealing from the hero instead of 'revitalizing' a name that only won on the slide. The client did it; hero share rose 1.6 points, and the architecture finally had the courage the P&L had been asking for.",
                skills: ["Brand Strategy", "Market Sizing"],
              },
              {
                name: "Wrote 12-page retailer war-room stories that survived a 20-minute category meeting",
                description:
                  "Wrote the 12-page stories that survived a 20-minute category meeting instead of a 70-page archaeology of every test. Sales, the agency, and the category captain used one brief, and the second brief was the one that did not enter the room.",
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
        name: "House architecture reset across fourteen consumer brands",
        description:
          "<p>A house architecture that merged two overlapping brands and killed a third-place name in a declining aisle. Marketing cost as a percent of sales fell 120 bps while share rose on the brands that remained. The $40M TAM we sized was the one that did not get a team.</p>",
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
                name: "Rebuilt the public site around jobs-to-be-done hubs and lifted non-brand organic pipeline 62%",
                description:
                  "Rebuilt the public site around jobs-to-be-done and crawlable hubs so a facilities buyer could find the job, not a keyword dump. Non-brand organic pipeline rose 62% in 18 months, and share-of-search decided which cluster we staffed next instead of a leftover blog calendar.",
                skills: ["SEO", "Content Strategy", "Market Analysis"],
              },
              {
                name: "Stood up quarterly MMM, moved 14% of paid budget, and lifted incremental sign-ups 9% on flat spend",
                description:
                  "Stood up MMM and moved 14% of paid budget off last-click winners that looked efficient in the ad platform and were invisible in the holdout. Incremental sign-ups rose 9% on a flat spend, and the two paid-social campaigns that went flat lost their budget the next Monday.",
                skills: ["Marketing Mix Modeling", "Campaign Analytics", "Python"],
              },
              {
                name: "Redefined the MQL and CRM handoff with sales and cut bounced marketing-sourced opportunities from 31% to 12%",
                description:
                  "Redefined MQL and handoff with sales so growth was scored on pipeline sales would accept, not sessions. Bounce rate on marketing-sourced opportunities fell from 31% to 12%, and UTM discipline finally matched the CRM fields the desk would fill.",
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
                name: "Shipped 120 comparison and integration pages and lifted organic demo requests 38%",
                description:
                  "Shipped 120 comparison and integration pages with a template sales would not disown, mapped to jobs instead of a scraped feature grid. Organic demo requests rose 38%, and the CRM could finally tell which page had earned the opportunity.",
                skills: ["SEO", "Content Strategy", "CRM"],
              },
              {
                name: "Killed 4,000 thin URLs, fixed canonicals, and recovered rankings on the 40 money pages",
                description:
                  "Killed 4,000 thin URLs and fixed canonicals after index bloat had buried the pages that actually converted. Rankings recovered on the 40 money pages, and the anomaly alerts caught the next crawl mess before the weekly pack had to explain it.",
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
                name: "Geo-split two paid-social campaigns that looked efficient in-platform and cut the one that was flat",
                description:
                  "Geo-split two campaigns that looked efficient in-platform after last-click theater had been funding both. One was flat; we cut it the next Monday, and incrementality—not the ad platform's ROAS—became the number that kept a budget.",
                skills: ["Campaign Analytics", "Marketing Operations"],
              },
              {
                name: "Wrote the UTM standard and CRM mapping and cut dark traffic from paid by half",
                description:
                  "Wrote the UTM standard and the CRM mapping so paid could not hide as direct and then claim the pipeline. Dark traffic from paid fell by half, and the weekly pack finally had a source sales would accept.",
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
        name: "Growth acquisition system with a quarterly mix model",
        description:
          "<p>SEO that compounds, paid that has to survive a holdout, and a quarterly mix model that moved 14% of budget. Incremental sign-ups rose 9% on flat spend. Channels that look efficient in the ad platform and go flat in the holdout lose the budget.</p>",
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
                name: "Positioned a new handheld against two incumbents and lifted competitive win rate 7 points with field battlecards",
                description:
                  "Positioned a new handheld against two incumbents and shipped battlecards the field would open on a job site, not a 40-page manifesto. Competitive win rate rose 7 points in two quarters, and the 6-slide field version was the one sales actually used.",
                skills: ["Product Marketing", "Content Strategy", "Slide Storytelling"],
              },
              {
                name: "Sized a proposed handheld at $28M SAM with a price-only set and stopped the tooling PO",
                description:
                  "Sized a proposed SKU at $28M SAM with a price-only competitive set after the teardown showed a crowded segment we would have to buy. The PO was not written, and product, sales, and the channel heard the kill in the room instead of after the line was tooled.",
                skills: ["Market Sizing", "Market Analysis", "Stakeholder Management"],
              },
              {
                name: "Scored the last launch at day 90 on pipeline and win rate and cut two channels",
                description:
                  "Scored the last launch on pipeline and win rate at day 90, not launch-week traffic that vanishes by week three. Two channels were cut; two were funded, and the brand stayed inside the company voice so a new SKU did not invent a second story.",
                skills: ["Campaign Analytics", "Stakeholder Management", "Product Marketing"],
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
                name: "Replaced a feature-list platform narrative with a job-to-be-done story and shortened new-logo cycles 11 days",
                description:
                  "Replaced a feature list with a job-to-be-done story the economic buyer could repeat, inside the company brand so a new SKU did not invent a second voice. Sales cycle on new logos shortened 11 days, and the 10-slide version was the one that entered the room.",
                skills: ["Product Marketing", "Brand Strategy", "Slide Storytelling"],
              },
              {
                name: "Ran 30 structured win/loss interviews a quarter and killed two roadmap items the teardown could not defend",
                description:
                  "Ran thirty structured win/loss interviews a quarter so product would read the competitive landmine before staffing it. Two roadmap items were killed; one pricing pack was rewritten, and the next launch named the buyer and the job before the SKU shipped.",
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
                name: "Wrote the demo script SEs still use and cut trial time-to-first-value from 14 days to 6",
                description:
                  "Wrote the demo script SEs still use as the spine so a trial did not start with a feature tour the discovery had not earned. Time-to-first-value in the trial dropped from 14 days to 6, and sales reuse of the launch assets hit the number we later measured at 71%.",
                skills: ["Content Strategy", "Product Marketing"],
              },
              {
                name: "Sized the payroll adjacent before staffing it and gave the $90M SAM a team",
                description:
                  "Sized the payroll adjacent before we staffed it so a smaller idea could not sneak in on enthusiasm. The $90M SAM got a team; a smaller adjacent did not, and the score at day 90 later used pipeline, not launch-week traffic, to decide what stayed funded.",
                skills: ["Market Sizing", "Market Analysis", "Stakeholder Management"],
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
        name: "Field-tool launch kit and day-90 score",
        description:
          "<p>Positioning, battlecards, and a day-90 score for a handheld line. Competitive win rate rose 7 points, and a $28M SAM SKU never got a tooling PO. The field uses a 6-slide story; the 40-page manifesto stays in the appendix.</p>",
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
                name: "Rewrote the MQL and routing contract with sales and lifted accepted marketing-sourced pipeline from 69% to 91%",
                description:
                  "Rewrote MQL, routing, and accepted-pipeline rules with sales ops so a campaign that sales could not trust did not count as a campaign. Accepted marketing-sourced pipeline rose from 69% to 91%, and the second definition of pipeline was the one I refused.",
                skills: ["Marketing Operations", "CRM", "Stakeholder Management"],
              },
              {
                name: "Stood up quarterly MMM on paid, email, and partner and lifted incremental pipeline 8% on flat spend",
                description:
                  "Stood up MMM on paid, email, and partner so a budget move did not take a three-week argument about the spreadsheet. Moved 11% of budget; incremental pipeline rose 8% on flat spend, and two always-on programs were sunset after three flat holdouts.",
                skills: ["Marketing Mix Modeling", "Campaign Analytics", "Python"],
              },
              {
                name: "Moved seven channel owners onto one UTM taxonomy and cut dark traffic from paid and events by half",
                description:
                  "Moved seven campaign owners onto a single UTM and naming standard so paid and events could not collide in the same source. Dark traffic from paid and events fell by half in two quarters, and the shadow tracker died in week four.",
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
                name: "Replaced a Monday spreadsheet with a weekly incrementality pack and expanded two clients who could see holdout lift",
                description:
                  "Replaced a Monday spreadsheet with a weekly incrementality pack that did not need a narrator. Two clients expanded after they could see holdout lift, and a channel owner who wanted a friendlier number had to argue with the same pack finance used.",
                skills: ["Campaign Analytics", "Python", "Stakeholder Management"],
              },
              {
                name: "Installed CRM routing and attribution a 40-rep desk would use and cut unattributed revenue from 22% to 7%",
                description:
                  "Installed routing and attribution that the 40-rep desk would actually fill, so events could not hide as dark pipeline. Unattributed revenue on the books fell from 22% to 7%, and the SLA with sales finally had a source both sides would sign.",
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
                name: "Geo-split circulars for three grocers and killed a high-ROI insert the holdout showed was flat",
                description:
                  "Geo-split circulars for three grocers after a 'high ROI' insert had been living on last-click theater. One insert was flat; we said so, and the weekly pack used incrementality instead of a circular that looked efficient in the platform and did nothing in the holdout.",
                skills: ["Campaign Analytics", "Python"],
              },
              {
                name: "Wrote the UTM dictionary the shop still uses so paid and email stopped colliding in the same source",
                description:
                  "Wrote the UTM dictionary the shop still uses after paid and email had been colliding in the same source and then arguing about credit. The naming standard held, and the organic pipeline dashboard finally stopped inheriting paid sessions that had forgotten their tags.",
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
        name: "Marketing operations stack and pipeline system of record",
        description:
          "<p>A pipeline contract, a taxonomy, and a quarterly mix model. Sales accepted 91% of marketing-sourced pipeline, and 11% of budget moved to channels that actually lifted it. If sales cannot trust the source, the campaign did not happen.</p>",
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
                name: "Ran 12 named accounts on a live MEDDIC file and closed $5.1M against a $4.8M quota",
                description:
                  "Ran 12 named accounts with a live MEDDIC score so a happy conversation could not hide in the commit column. Closed $5.1M against a $4.8M quota; commit accuracy 91%, and a deal that could not name the economic buyer and the metric did not stay in the forecast.",
                skills: ["MEDDIC", "Account Planning", "Pipeline Forecasting"],
              },
              {
                name: "Multi-threaded security, risk, and procurement before RFPs and sourced 38% of the pipeline",
                description:
                  "Multi-threaded security, risk, and procurement before RFPs so inbound was not the only way a Fortune 1000 seat opened. 38% of pipeline was sourced; two seven-figure deals started as a cold thread, and if it was not in the CRM fields it was not in the forecast.",
                skills: ["Enterprise Prospecting", "Opportunity Management", "CRM"],
              },
              {
                name: "Closed on audit hours and control-gap cost instead of a bake-off and held average discount at 9%",
                description:
                  "Closed on audit hours and control-gap cost instead of a feature bake-off so procurement could not reopen the metric that won the deal. Average discount on the book held at 9%, and MSA cycle averaged 34 days because the paper already had the number legal would not give away.",
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
                name: "Brought MEDDIC to a mid-market desk that lived in next-step theater and lifted stage-3-to-close 11 points",
                description:
                  "Brought MEDDIC to a desk that lived in next-step theater so a stalled deal was exited, not aged. Stage-3-to-close rose 11 points in three quarters, and the weekly forecast came from scores, not hope that a champion would 'circle back.'",
                skills: ["MEDDIC", "Opportunity Management", "Pipeline Forecasting"],
              },
              {
                name: "Built a legal redline playbook and cut post-verbal cycle time from 52 to 29 days",
                description:
                  "Built a redline playbook with legal so deals stopped dying in paper after a verbal yes. Cycle time after verbal fell from 52 to 29 days, and the value case stayed in the CRM so procurement could not reopen the metric that had already won.",
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
                name: "Built the first outbound motion into CISOs and GRC leads and sourced $2.1M in pipeline",
                description:
                  "Built the first outbound motion into CISOs and GRC leads so a security buyer did not have to find us in an inbound form. Sourced $2.1M in pipeline in the last full year on the desk, and every thread lived in the CRM or it did not count.",
                skills: ["Enterprise Prospecting", "CRM"],
              },
              {
                name: "Wrote the SDR handoff note AEs stopped bouncing and lifted accepted meetings from 61% to 84%",
                description:
                  "Wrote the handoff note AEs stopped bouncing after meetings had been landing without a metric, a champion, or a next step. Accepted meetings rose from 61% to 84%, and the account plan started at handoff instead of at the first 'who is this?' email.",
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
        name: "Enterprise MEDDIC file and forecast operating system",
        description:
          "<p>A live MEDDIC file, sourced pipeline, and a forecast I will defend. $5.1M on a $4.8M quota, 91% commit accuracy, and a 9% average discount. A deal that cannot name the economic buyer and the metric does not stay in commit.</p>",
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
                name: "Wrote quarterly white-space maps for an $11M book and grew four accounts over 25% through two CFO changes",
                description:
                  "Wrote quarterly white-space and political maps for an $11M book so a champion leaving did not zero the account. Four accounts grew over 25%; two CFO changes did not slip a renewal, and the map lived in the CRM, not a slide that was already stale.",
                skills: ["Account Planning", "Relationship Management", "CRM"],
              },
              {
                name: "Moved five named accounts onto 36-month paper with a price-hold so December reopeners stopped being the plan",
                description:
                  "Moved five accounts onto 36-month paper with a price-hold so procurement could not reopen the metric every December. Finance, internal audit, and the controller's office sat on the same map, and a deal that only had IT did not get forecasted.",
                skills: ["Contract Negotiation", "Value Selling", "Stakeholder Management"],
              },
              {
                name: "Split renewal and expansion in the forecast so expansion could not hide, and held commit inside 6%",
                description:
                  "Split the forecast so expansion could not hide inside a renewal and a 'good relationship' could not sit in the commit column. Commit on the book held inside 6%, and every opportunity had a next step with a date and a name.",
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
                name: "Landed a six-entity media group at $720k ACV after a 14-month multi-thread that survived a champion leaving",
                description:
                  "Landed a six-entity media group at $720k ACV after a 14-month multi-thread. The first champion had left in month six, and the next buyer already had a metric because the map had named them before the job change. Average expansion ACV on later books still traces to that habit.",
                skills: ["Relationship Management", "Account Planning", "Value Selling"],
              },
              {
                name: "Took two deals through procurement on a written business case and landed discount at 11%",
                description:
                  "Took two deals through procurement on a written business case instead of a feature matrix that always ends in a bake-off tax. Discount landed at 11%, and the next step had a date so the deal could not age as a 'good relationship' in commit.",
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
                name: "Carried a $1.4M mid-market finance quota and hit 108% and 121% in the last two years",
                description:
                  "Carried a $1.4M quota selling reporting suites into controllers' offices, with a next step and a date on every opportunity. Hit 108% and 121% in the last two years on the desk, and if it was not in the CRM it was not in the forecast I asked my manager to inspect.",
                skills: ["Opportunity Management", "Pipeline Forecasting", "CRM"],
              },
              {
                name: "Wrote inspectable account plans and lifted expansion from the existing book from 12% to 21% of the number",
                description:
                  "Wrote plans the manager could inspect so a named account was more than a holiday card. Expansion from the existing book rose from 12% to 21% of the number, and I stayed two threads deep so a champion leaving did not zero the relationship.",
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
        name: "Named-account portfolio system for an $11M book",
        description:
          "<p>Quarterly maps, multi-year paper, and a forecast that separates renewal from expansion. An $11M book with four accounts over 25% growth and commit inside 6%. Two CFO changes last year and neither renewal slipped.</p>",
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
                name: "Required metrics, champion, and decision criteria before a POV and held a 74% technical-win rate",
                description:
                  "Required metrics, champion, and decision criteria before a POV so an open-ended 'let us keep exploring' could not hide as a technical win. Technical-win rate on those POVs is 74%; open-ended evals were declined, and every POV had an exit date on the opportunity.",
                skills: ["Sales Engineering", "MEDDIC", "Opportunity Management"],
              },
              {
                name: "Wrote integration-hour and failed-job value models and lifted average supported ACV from $180k to $260k",
                description:
                  "Wrote integration-hour and failed-job models the AE was not allowed to leave behind, in a 12-slide readout the economic buyer could repeat. Average supported deal size rose from $180k to $260k ACV, and the architecture appendix stayed in the appendix.",
                skills: ["Value Selling", "Slide Storytelling", "CRM"],
              },
              {
                name: "Ran one security-and-architect evaluation plan so a side demo could not path around a no",
                description:
                  "Wrote one evaluation plan for security, the architect, and ops so a side demo for one persona could not become the path around a no. Unqualified demos on the paired book dropped once discovery had to earn the meeting, and the scope lived on the CRM opportunity.",
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
                name: "Stopped demoing features discovery had not earned and lifted demo-to-POV conversion 16 points",
                description:
                  "Stopped demoing features discovery had not earned and coached AEs on what a meeting had to produce before a demo. Demo-to-POV conversion rose 16 points, and unqualified demos on the paired book dropped because MEDDIC had to name metrics and a champion first.",
                skills: ["Sales Engineering", "Technical Leadership", "MEDDIC"],
              },
              {
                name: "Wrote a 12-slide POV readout AEs could present without me and cut post-POV cycle time 8 days",
                description:
                  "Wrote a 12-slide POV readout AEs could present without me in the room, with the value model in the buyer's units. Cycle time after POV fell 8 days, and the architecture appendix stayed in the appendix instead of becoming the meeting.",
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
                name: "Onboarded the first 40 mid-market customers and cut time-to-first-value from 11 weeks to 6",
                description:
                  "Onboarded 40 mid-market customers and fed the failure modes back to sales so the next deal did not promise a connector we did not have. Time-to-first-value dropped from 11 weeks to 6, and the architect and the ops lead heard the same go-live number.",
                skills: ["Technical Leadership", "Stakeholder Management"],
              },
              {
                name: "Moved implementation scope onto the CRM opportunity so sales stopped promising a connector we did not have",
                description:
                  "Moved implementation scope onto the CRM opportunity so a promised connector could not hide in a deck and then fail at legal. Sales stopped selling what we did not ship, and a POV that could not name an exit date was a loss, not an open-ended explore.",
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
        name: "POV system with an exit date and value model",
        description:
          "<p>Discovery has to earn the POV, the POV has an exit date, and the value model is in the buyer's units. Technical-win rate 74%, and average supported ACV moved from $180k to $260k. A side demo for one persona is a risk, not a favor.</p>",
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
                name: "Installed weekly commit inspection from opportunity scores and held two-quarter accuracy on a $38M number inside 5%",
                description:
                  "Installed weekly inspection of commit from opportunity scores, not manager roll-up, so a number that could not be inspected was not a number. Two-quarter accuracy on a $38M number held inside 5%, and I did not run a private forecast for the board.",
                skills: ["Pipeline Forecasting", "CRM", "Stakeholder Management"],
              },
              {
                name: "Required next step, economic buyer, and kill date in reviews and cut stale stage-3 deals 44%",
                description:
                  "Required a next step, an economic buyer, and a kill date in every review so a bad deal exited early and Monday stayed honest. Stale stage-3 deals fell 44%, and the team moved onto a payments-cost case that dropped average discount from 18% to 11%.",
                skills: ["Opportunity Management", "Value Selling", "Change Management"],
              },
              {
                name: "Rewrote territories and named-account plans for 42 sellers and lifted ICP coverage from 61% to 88%",
                description:
                  "Rewrote territories and named-account plans for 42 sellers so coverage of the ICP list was a managed number, not a hope. ICP coverage rose from 61% to 88%, and the regional managers called a miss in week two instead of week twelve.",
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
                name: "Ran 11 AEs on Monday forecasts and Thursday reviews and hit 104%, 97%, and 112% over three years",
                description:
                  "Ran 11 AEs on a Monday forecast and a Thursday deal review so a miss was called in week two, not week twelve. The region hit 104%, 97%, and 112% in three years, and the CRM stages were the ones I inspected, not a shadow spreadsheet.",
                skills: [
                  "Pipeline Forecasting",
                  "Opportunity Management",
                  "Relationship Management",
                ],
              },
              {
                name: "Installed a value-case requirement above 12% off and cut the region's average discount from 19% to 12%",
                description:
                  "Installed a value-case requirement above 12% off so a discount could not hide as 'what it takes to win.' Average discount on the region fell from 19% to 12%, and finance and the CRO saw the same guardrail I used in the review.",
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
                name: "Carried a $1.1M Midwest distributor quota and hit 118% and 126% in the last two years",
                description:
                  "Carried a $1.1M quota into Midwest distributors with named-account plans and a next step the manager could see in the CRM. Hit 118% and 126% in the last two years on the bag, and a deal that could not be inspected did not stay in my number.",
                skills: ["Opportunity Management", "Account Planning", "CRM"],
              },
              {
                name: "Moved my own book off a private spreadsheet so the manager could inspect the forecast",
                description:
                  "Moved my own book off a private spreadsheet so the manager could inspect the forecast instead of taking my word on Monday. I kept the habit when I took a region: if it is not in the CRM, it is not in the number.",
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
        name: "Mid-market sales forecast and inspection system",
        description:
          "<p>An inspectable forecast, deal reviews with kill dates, and territories that cover the ICP. $38M number inside 5% commit accuracy, and stale stage-3 deals down 44%. A number that cannot be inspected is not a number.</p>",
        skills: ["Pipeline Forecasting", "Opportunity Management", "Account Planning"],
      },
    ],
  }),
];
