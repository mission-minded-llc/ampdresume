import { defineCharacter } from "../buildCharacter";

export const legal = [
  defineCharacter({
    slug: "jonathan-harker",
    name: "Jonathan Harker",
    title: "Solicitor of Exeter",
    location: "Exeter, England",
    siteDescription:
      "Newly qualified solicitor sent to Transylvania to close a property file, then kept as a guest until the file closed on him. The journal was the only brief he got to keep.",
    affiliation: "hero",
    died: 1897,
    education: [
      {
        school: "Peter Hawkins, Solicitor",
        degree: "Articled clerk",
        dateAwarded: "1891-06-01",
      },
    ],
    certifications: [
      {
        name: "Admitted as a solicitor",
        issuer: "England and Wales",
        dateAwarded: "1893-03-01",
        credentialId: "EXETER-HARKER",
      },
    ],
    skills: [
      {
        name: "Law",
        description:
          "Conveyancing, estate work, and the kind of client letter that should have been refused. Inherited Hawkins's practice after the castle.",
        yearStarted: 1891,
      },
      {
        name: "Letter Writing",
        description:
          "Kept a shorthand journal from Munich to the Borgo Pass. Mina typed it; Van Helsing treated it as evidence.",
        yearStarted: 1893,
      },
      {
        name: "Investigation",
        description:
          "Matched the Count's London purchases to Carfax and the other houses, then followed the boxes.",
        yearStarted: 1893,
      },
      {
        name: "Observation",
        description:
          "Noted the empty rooms, the doors that locked from the outside, and the client who never sat to dinner.",
        yearStarted: 1893,
      },
      {
        name: "Languages",
        description:
          "German enough for the innkeepers' warnings; English enough to write what the castle would not let him post.",
        yearStarted: 1893,
      },
      {
        name: "Survival",
        description:
          "Climbed the outer wall, hid from the women in the moonlight, and left the castle by a drop that should have killed him.",
        yearStarted: 1893,
      },
    ],
    companies: [
      {
        name: "Hawkins & Harker",
        description:
          "Exeter solicitor's office. Hawkins sent his newly admitted clerk east with the Carfax papers; Harker came home a partner, then the firm.",
        location: "Exeter, England",
        startDate: "1891-06-01",
        positions: [
          {
            title: "Solicitor",
            startDate: "1893-03-01",
            projects: [
              {
                name: "The Carfax conveyance",
                description:
                  "May 1893: travelled to Castle Dracula to let the Count execute the English deeds. The client signed, then locked the guest in.",
                skills: ["Law", "Observation", "Letter Writing"],
              },
              {
                name: "The inherited practice",
                description:
                  "Hawkins died while Harker convalesced in Budapest. The Exeter office and the unfinished London purchases became his.",
                skills: ["Law", "Investigation"],
              },
            ],
          },
        ],
      },
      {
        name: "The hunt from Carfax",
        description:
          "London to Varna to the Borgo Pass: a solicitor's file turned into a pursuit. Mina's compilations were the docket; Harker's knife closed it.",
        location: "London / Transylvania",
        startDate: "1893-09-01",
        endDate: "1893-11-06",
        positions: [
          {
            title: "Solicitor on the Count's trail",
            startDate: "1893-09-01",
            endDate: "1893-11-06",
            projects: [
              {
                name: "The last chase",
                description:
                  "Traced the boxes from Carfax and the other houses, then rode with Morris and Holmwood until the Count's cart reached the castle road.",
                skills: ["Investigation", "Survival", "Languages"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Dracula (1897)",
        description:
          "<p>Stoker's Harker is a working solicitor, not a soldier of fortune. The first chapters are a conveyance that becomes a captivity narrative; the later ones are the same man finishing the file.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/345" }],
        skills: ["Law", "Letter Writing", "Investigation"],
      },
    ],
  }),

  defineCharacter({
    slug: "portia",
    name: "Portia",
    title: "Advocate of Belmont",
    location: "Belmont / Venice",
    siteDescription:
      "Heiress bound by her father's caskets who went to Venice as Balthazar, a young doctor of law, and saved a merchant by reading a bond more closely than the lender had.",
    affiliation: "hero",
    died: 1597,
    education: [
      {
        school: "Belmont, under her father's will",
        degree: "Heiress; the three caskets",
        dateAwarded: "1596-01-01",
      },
    ],
    certifications: [
      {
        name: "Recommended to the Duke as Balthazar",
        issuer: "Bellario of Padua",
        dateAwarded: "1596-06-01",
        credentialId: "PADUA-BELLARIO",
      },
    ],
    skills: [
      {
        name: "Advocacy",
        description:
          "Appeared for Antonio when Bellario could not. Asked for mercy first, then for the exact pound the bond allowed — and no more.",
        yearStarted: 1596,
      },
      {
        name: "Law",
        description:
          "Held the court to the letter: a Jew may take flesh, but not a drop of Christian blood, and not a hair's weight over a pound.",
        yearStarted: 1596,
      },
      {
        name: "Rhetoric",
        description:
          "The quality of mercy is not strained. She argued equity before she argued the statute, and the Duke listened.",
        yearStarted: 1596,
      },
      {
        name: "Debate",
        description:
          "Turned Shylock's insistence on the bond into the ground of his defeat, then stayed for the penalty the state could claim.",
        yearStarted: 1596,
      },
      {
        name: "Disguise",
        description:
          "A doctor's gown and Nerissa as clerk. Bassanio did not know his own wife until the rings came back.",
        yearStarted: 1596,
      },
      {
        name: "Diplomacy",
        description:
          "Settled a death-bond, a marriage, and a pair of rings without naming the advocate who had stood at the bar.",
        yearStarted: 1596,
      },
    ],
    companies: [
      {
        name: "House of Belmont",
        description:
          "A country seat and a father's lottery: gold, silver, and lead. Bassanio chose the lead; the others went home poorer.",
        location: "Belmont",
        startDate: "1596-01-01",
        positions: [
          {
            title: "Heiress",
            startDate: "1596-01-01",
            projects: [
              {
                name: "The three caskets",
                description:
                  "Morocco and Aragon failed the riddle. Bassanio read the lead correctly; Portia had already chosen him and could not say so.",
                skills: ["Diplomacy", "Rhetoric"],
              },
            ],
          },
        ],
      },
      {
        name: "The Venetian court",
        description:
          "The Duke's court, a forfeited bond, and a letter from Padua that put a young doctor on the case. The merchant lived; the lender did not keep his principal.",
        location: "Venice",
        startDate: "1596-06-01",
        endDate: "1596-06-30",
        positions: [
          {
            title: "Counsel for Antonio (as Balthazar)",
            startDate: "1596-06-01",
            endDate: "1596-06-30",
            projects: [
              {
                name: "The quality of mercy",
                description:
                  "Moved the court to mercy, then to a close reading of the bond. Shylock could not cut the pound; Venice kept the rest of the judgment.",
                skills: ["Advocacy", "Law", "Debate", "Disguise"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Merchant of Venice (c. 1596)",
        description:
          "<p>Shakespeare's Portia is the play's lawyer, not a later film's romantic lead. The caskets are the private plot; the court scene is the résumé.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1515" }],
        skills: ["Advocacy", "Law", "Rhetoric"],
      },
    ],
  }),
];
