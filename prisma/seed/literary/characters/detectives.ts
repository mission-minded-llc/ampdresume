import { defineCharacter } from "../buildCharacter";

export const detectives = [
  defineCharacter({
    slug: "sherlock-holmes",
    name: "Sherlock Holmes",
    title: "Consulting Detective",
    location: "221B Baker Street, London",
    siteDescription:
      "The world's first consulting detective. Observes what others overlook and reasons from ash, mud, and newspaper type back to the person who left them.",
    affiliation: "hero",
    died: 1914,
    education: [
      {
        school: "University of London / independent chemical study",
        degree: "Informal scientific training",
        dateAwarded: "1878-06-01",
      },
    ],
    certifications: [
      {
        name: "Consulting practice established",
        issuer: "Baker Street",
        dateAwarded: "1881-03-01",
        credentialId: "BAKER-221B",
      },
    ],
    skills: [
      {
        name: "Observation",
        description:
          "Reads occupation, recent travel, and domestic habit from cuffs, boots, and the dust on a hat brim.",
        yearStarted: 1878,
      },
      {
        name: "Deduction",
        description:
          "Works from observed particulars to a single explanation that fits every fact and discards the rest.",
        yearStarted: 1878,
      },
      {
        name: "Forensic Chemistry",
        description:
          "Maintains a Baker Street bench for blood tests, reagent work, and the cataloguing of tobacco ashes.",
        yearStarted: 1878,
      },
      {
        name: "Disguise",
        description:
          "Passes as a groom, a clergyman, or an opium-den loafer when a case requires entering a room unseen.",
        yearStarted: 1881,
      },
      {
        name: "Investigation",
        description:
          "Takes only the problems that have already defeated Scotland Yard, then reconstructs them from the scene.",
        yearStarted: 1881,
      },
      {
        name: "Boxing",
        description:
          "Amateur boxer; uses fists when a walking stick and a waiting cab will not do.",
        yearStarted: 1878,
      },
      {
        name: "Music",
        description:
          "Plays the violin through a case, often as a way of thinking rather than of performing.",
        yearStarted: 1878,
      },
      {
        name: "Cryptography",
        description:
          "Broke the dancing-men cipher and other substitution systems used by American and London criminals.",
        yearStarted: 1881,
      },
    ],
    companies: [
      {
        name: "221B Baker Street",
        description:
          "Shared rooms with Dr. Watson from 1881. Clients climb the seventeen steps; Lestrade and Gregson follow when they must.",
        location: "London, England",
        startDate: "1881-03-01",
        positions: [
          {
            title: "Consulting Detective",
            startDate: "1881-03-01",
            projects: [
              {
                name: "A Study in Scarlet",
                description:
                  "Met Watson in 1881 over a Lauriston Gardens murder. Identified Jefferson Hope from cab tracks, a wedding ring, and a motive that began in Utah.",
                skills: ["Observation", "Deduction", "Forensic Chemistry"],
              },
              {
                name: "The Adventures practice",
                description:
                  "A Scandal in Bohemia, The Red-Headed League, The Speckled Band, and the rest of the 1891–1892 cases that made the consulting method public.",
                skills: ["Investigation", "Disguise", "Cryptography"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Adventures of Sherlock Holmes (1892)",
        description:
          "<p>Twelve cases Watson published after the Baker Street years were already famous. The method is on the page: observe, discard the impossible, and do not theorize ahead of the facts.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1661" }],
        skills: ["Deduction", "Observation", "Investigation"],
      },
    ],
  }),

  defineCharacter({
    slug: "john-watson",
    name: "John H. Watson",
    title: "Army Surgeon · Chronicler of Baker Street",
    location: "London, England",
    siteDescription:
      "Late of the Army Medical Department, invalided from Afghanistan, and the man who made Holmes's methods readable. Physician first, biographer by necessity.",
    affiliation: "hero",
    died: 1914,
    education: [
      {
        school: "University of London",
        degree: "Doctor of Medicine",
        dateAwarded: "1878-06-01",
      },
      {
        school: "Netley Army Medical School",
        degree: "Army surgeon course",
        dateAwarded: "1878-12-01",
      },
    ],
    certifications: [
      {
        name: "Attached to the Fifth Northumberland Fusiliers",
        issuer: "British Army",
        dateAwarded: "1879-01-01",
        credentialId: "AMD-WATSON-5NF",
      },
    ],
    skills: [
      {
        name: "Medical Practice",
        description:
          "Civilian practice in Paddington after the Afghan campaign; later a second marriage and a return to Baker Street as needed.",
        yearStarted: 1878,
      },
      {
        name: "Field Medicine",
        description:
          "Served as assistant surgeon in the Second Anglo-Afghan War; wounded at Maiwand and invalided through Peshawar.",
        yearStarted: 1878,
      },
      {
        name: "Surgery",
        description:
          "Trained at Netley; kept a service revolver and a medical bag on Baker Street cases.",
        yearStarted: 1878,
      },
      {
        name: "Journalism",
        description:
          "Wrote the Holmes cases for the Strand and for book publication, selecting what the public could be told.",
        yearStarted: 1887,
      },
      {
        name: "Investigation",
        description:
          "Watson is the second pair of eyes. He misses what Holmes sees, then records why it mattered.",
        yearStarted: 1881,
      },
      {
        name: "Marksmanship",
        description:
          "Service revolver; used on the moor, in a suburban villa, and wherever Holmes asked him to cover a door.",
        yearStarted: 1878,
      },
    ],
    companies: [
      {
        name: "British Army Medical Department",
        description:
          "Posted to India and Afghanistan with the Fifth Northumberland Fusiliers, then attached to the Berkshires after Maiwand.",
        location: "Afghanistan / India",
        startDate: "1878-12-01",
        endDate: "1880-12-01",
        positions: [
          {
            title: "Assistant Surgeon",
            startDate: "1878-12-01",
            endDate: "1880-12-01",
            projects: [
              {
                name: "Maiwand and the retreat",
                description:
                  "Took a Jezail bullet in the shoulder (or the leg, depending on the memoir). Enteric fever in Peshawar ended the campaign.",
                skills: ["Field Medicine", "Surgery"],
              },
            ],
          },
        ],
      },
      {
        name: "221B Baker Street",
        description:
          "Shared rooms from 1881. Paid the bills, interviewed clients, and wrote the stories Holmes would not write himself.",
        location: "London, England",
        startDate: "1881-03-01",
        positions: [
          {
            title: "Associate and biographer",
            startDate: "1881-03-01",
            projects: [
              {
                name: "A Study in Scarlet (1887)",
                description:
                  "First published account of Holmes. Introduced the consulting detective to a public that still preferred official police work.",
                skills: ["Journalism", "Investigation"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "A Study in Scarlet",
        description:
          "<p>Watson meets Stamford at the Criterion, takes rooms in Baker Street, and learns that a science of deduction already exists — it had only been waiting for a chronicler.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/244" }],
        skills: ["Journalism", "Medical Practice", "Investigation"],
      },
    ],
  }),

  defineCharacter({
    slug: "irene-adler",
    name: "Irene Adler",
    title: "Contralto · The Woman",
    location: "London / the Continent",
    siteDescription:
      "New Jersey-born opera singer who outmaneuvered Holmes, a king, and a blackmail plot in one night. Thereafter, to Holmes, simply the woman.",
    affiliation: "antihero",
    died: 1888,
    education: [
      {
        school: "Imperial Opera of Warsaw",
        degree: "Principal contralto (former)",
        dateAwarded: "1887-01-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Music",
        description: "Contralto at Warsaw; later a private life in London under the name Adler.",
        yearStarted: 1880,
      },
      {
        name: "Disguise",
        description:
          "Walked past Holmes as a slim youth after the fire alarm at Briony Lodge and wished him good-night in her own voice.",
        yearStarted: 1888,
      },
      {
        name: "Social Engineering",
        description:
          "Kept a photograph that could unseat a throne, then left a letter and a portrait of herself instead.",
        yearStarted: 1888,
      },
      {
        name: "Infiltration",
        description:
          "Read Holmes's own watchers, then used his church-wedding ruse as cover for her departure.",
        yearStarted: 1888,
      },
      {
        name: "Diplomacy",
        description:
          "Settled with Godfrey Norton and left England; the King of Bohemia kept the photograph she chose to leave.",
        yearStarted: 1888,
      },
    ],
    companies: [
      {
        name: "Briony Lodge",
        description:
          "Serpentine Avenue, St. John's Wood. The house from which a king wanted a photograph recovered and a detective learned he could lose.",
        location: "St. John's Wood, London",
        startDate: "1888-03-01",
        endDate: "1888-03-31",
        positions: [
          {
            title: "Private resident",
            startDate: "1888-03-01",
            endDate: "1888-03-31",
            projects: [
              {
                name: "A Scandal in Bohemia",
                description:
                  "Holmes's smoke-rocket and window scramble recovered nothing. Adler left for the Continent with Norton and the original photograph.",
                skills: ["Disguise", "Social Engineering", "Infiltration"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "A Scandal in Bohemia",
        description:
          "<p>The only client who beat Holmes at his own methods and left him a portrait for his pains. Watson published the case in 1891.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1661" }],
        skills: ["Disguise", "Diplomacy", "Music"],
      },
    ],
  }),

  defineCharacter({
    slug: "james-moriarty",
    name: "James Moriarty",
    title: "Consulting Criminal · Former Professor of Mathematics",
    location: "London, England",
    siteDescription:
      "The organizer of half that is evil and of nearly all that is undetected in London. A spider at the centre of a web, rarely seen in it.",
    affiliation: "villain",
    died: 1891,
    education: [
      {
        school: "Provincial university chair",
        degree: "Professor of Mathematics",
        dateAwarded: "1870-01-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Mathematics",
        description:
          "Wrote a treatise on the binomial theorem at twenty-one and later The Dynamics of an Asteroid, a book Holmes said ascended to rarefied heights of pure mathematics.",
        yearStarted: 1865,
      },
      {
        name: "Criminal Strategy",
        description:
          "Plans remain with him; agents take the risk. Holmes called him the Napoleon of crime.",
        yearStarted: 1878,
      },
      {
        name: "Leadership",
        description: "Held a web of fences, forgers, and specialists who never met the centre.",
        yearStarted: 1878,
      },
      {
        name: "Obsession",
        description:
          "Once Holmes closed on the web, Moriarty made the contest personal and followed him to Switzerland.",
        yearStarted: 1891,
      },
      {
        name: "Tactical Leadership",
        description:
          "Coordinated the destruction of Holmes's cases and the pursuit that ended at the Reichenbach Fall.",
        yearStarted: 1891,
      },
    ],
    companies: [
      {
        name: "The professor's web",
        description:
          "No public office. A mathematical reputation first, then a silent directorship over London crime that official police could not prove.",
        location: "London, England",
        startDate: "1878-01-01",
        endDate: "1891-05-04",
        positions: [
          {
            title: "Consulting criminal",
            startDate: "1878-01-01",
            endDate: "1891-05-04",
            projects: [
              {
                name: "The Final Problem",
                description:
                  "January to May 1891: Holmes gathered evidence that would break the organization. Moriarty answered with assault, arson, and a meeting at Reichenbach.",
                skills: ["Criminal Strategy", "Obsession", "Tactical Leadership"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Final Problem (1893)",
        description:
          "<p>Watson's account of the chase to Meiringen and the struggle at the falls. Moriarty appears in person only long enough to close the web around Holmes.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/834" }],
        skills: ["Mathematics", "Criminal Strategy", "Leadership"],
      },
    ],
  }),

  defineCharacter({
    slug: "arsene-lupin",
    name: "Arsène Lupin",
    title: "Gentleman Burglar",
    location: "Paris, France",
    siteDescription:
      "Gentleman-cambrioleur of the early Third Republic. Announces the theft, then takes the object while the police watch the wrong door.",
    affiliation: "antihero",
    died: 1914,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Gentleman Burglary",
        description:
          "Steals from the titled and the insured, often leaving a card and a compliment.",
        yearStarted: 1905,
      },
      {
        name: "Disguise",
        description:
          "A dozen names and faces; inspectors have arrested the wrong man while Lupin held the door.",
        yearStarted: 1905,
      },
      {
        name: "Lockpicking",
        description: "Safes, museum cases, and cabin trunks open on his schedule.",
        yearStarted: 1905,
      },
      {
        name: "Social Engineering",
        description: "Uses invitations, newspapers, and the vanity of collectors as entry papers.",
        yearStarted: 1905,
      },
      {
        name: "Wit",
        description: "Publishes challenges in the press and keeps the joke on Ganimard.",
        yearStarted: 1905,
      },
      {
        name: "Infiltration",
        description:
          "Boards liners and walks into ministries as a guest, a clerk, or the victim himself.",
        yearStarted: 1905,
      },
    ],
    companies: [
      {
        name: "Independent practice",
        description:
          "First public cases in 1905, when the arrest on the Provence and the affair of the Queen's Necklace made the name national.",
        location: "Paris, France",
        startDate: "1905-01-01",
        positions: [
          {
            title: "Gentleman burglar",
            startDate: "1905-01-01",
            projects: [
              {
                name: "The Queen's Necklace",
                description:
                  "Recovered — or appropriated — the infamous necklace and made the police party to the performance.",
                skills: ["Gentleman Burglary", "Social Engineering", "Wit"],
              },
              {
                name: "Arrests that did not hold",
                description:
                  "Ganimard's captures dissolve when the prisoner is a decoy or the cell is already empty.",
                skills: ["Disguise", "Lockpicking", "Infiltration"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Arsène Lupin, Gentleman Burglar (1907)",
        description:
          "<p>Leblanc's first collection. The burglar introduces himself in print the way he enters a house: politely, and already inside.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/6133" }],
        skills: ["Gentleman Burglary", "Disguise", "Wit"],
      },
    ],
  }),

  defineCharacter({
    slug: "sam-spade",
    name: "Sam Spade",
    title: "Private Detective",
    location: "San Francisco, CA",
    siteDescription:
      "Partner in Spade & Archer until a bird statue and a dead partner rewrote the letterhead. Works the case, not the client's story about the case.",
    affiliation: "antihero",
    died: 1930,
    education: [],
    certifications: [
      {
        name: "California private detective",
        issuer: "City and County of San Francisco",
        dateAwarded: "1925-01-01",
        credentialId: "SF-PI-SPADE",
      },
    ],
    skills: [
      {
        name: "Private Investigation",
        description:
          "Shadow work, hotel lobbies, and the habit of letting other people talk until the story cracks.",
        yearStarted: 1925,
      },
      {
        name: "Investigation",
        description:
          "Follows money, steamship tickets, and who had a key — not the romance of a black bird.",
        yearStarted: 1925,
      },
      {
        name: "Social Engineering",
        description:
          "Plays Gutman, Cairo, and Brigid against one another until someone names the shooter.",
        yearStarted: 1928,
      },
      {
        name: "Law",
        description:
          "Knows what a district attorney can prove and what a detective can only know. Turns Brigid in because the partner was his.",
        yearStarted: 1925,
      },
      {
        name: "Boxing",
        description: "A big blond devil, in Hammett's phrase; uses size when talk stalls.",
        yearStarted: 1925,
      },
    ],
    companies: [
      {
        name: "Spade & Archer",
        description:
          "San Francisco partnership until Miles Archer was shot in Burritt Street. Spade kept the office and the name long enough to finish the job.",
        location: "San Francisco, CA",
        startDate: "1928-01-01",
        endDate: "1929-12-01",
        positions: [
          {
            title: "Partner",
            startDate: "1928-01-01",
            endDate: "1929-12-01",
            projects: [
              {
                name: "The black bird",
                description:
                  "A Levantine statuette, a pack of thieves, and a partner dead in an alley. Spade delivered the falcon and the killer, not the dream.",
                skills: ["Private Investigation", "Social Engineering", "Law"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Maltese Falcon (1930)",
        description:
          "<p>Hammett's novel, not the later film. Spade's code is professional, not chivalrous: when your partner is killed you are supposed to do something about it.</p>",
        links: [],
        skills: ["Private Investigation", "Investigation", "Law"],
      },
    ],
  }),

  defineCharacter({
    slug: "john-thorndyke",
    name: "John Evelyn Thorndyke",
    title: "Medico-legal Expert · Barrister",
    location: "5A King's Bench Walk, Inner Temple",
    siteDescription:
      "Physician and barrister who treats a crime scene as a bench, not a puzzle for intuition. Fingerprints can lie if someone has a cast and a stamp-pad; Thorndyke brought both into court.",
    affiliation: "hero",
    died: 1907,
    education: [
      {
        school: "London hospital schools",
        degree: "Doctor of Medicine",
        dateAwarded: "1890-06-01",
      },
      {
        school: "Inner Temple",
        degree: "Called to the bar",
        dateAwarded: "1894-06-01",
      },
    ],
    certifications: [
      {
        name: "Lecturer in medical jurisprudence",
        issuer: "St. Margaret's Hospital",
        dateAwarded: "1898-01-01",
        credentialId: "TEMPLE-THORNDYKE",
      },
    ],
    skills: [
      {
        name: "Forensic Medicine",
        description:
          "Medical jurisprudence from the Temple: wounds, identity, and what a body or a stain can be made to say.",
        yearStarted: 1894,
      },
      {
        name: "Forensic Chemistry",
        description:
          "Polton keeps the laboratory. Casts, reagents, and photomicrographs go to court as exhibits, not as hunches.",
        yearStarted: 1894,
      },
      {
        name: "Medical Practice",
        description: "A physician first. The legal work is the medicine applied to a brief.",
        yearStarted: 1890,
      },
      {
        name: "Law",
        description:
          "Barrister of the Inner Temple. Appears as expert and as counsel when a scientific fact is the whole defence.",
        yearStarted: 1894,
      },
      {
        name: "Investigation",
        description:
          "Goes to the scene with a research-case and comes back with measurements. Jervis writes what the jury can follow.",
        yearStarted: 1894,
      },
      {
        name: "Deduction",
        description:
          "Will not theorize ahead of the facts — and will not accept a fact that has not been tested against a forgery.",
        yearStarted: 1894,
      },
    ],
    companies: [
      {
        name: "5A King's Bench Walk",
        description:
          "Chambers and laboratory in the Inner Temple. Polton at the bench, Jervis on the notes, Thorndyke between medicine and the bar.",
        location: "Inner Temple, London",
        startDate: "1898-01-01",
        positions: [
          {
            title: "Medico-legal expert",
            startDate: "1898-01-01",
            projects: [
              {
                name: "The Red Thumb Mark",
                description:
                  "Reuben Hornby stood to lose his liberty on a bloody print. Thorndyke showed the court how a fingerprint is cast, inked, and planted.",
                skills: ["Forensic Medicine", "Forensic Chemistry", "Law"],
              },
              {
                name: "The Temple laboratory",
                description:
                  "A working bench above the Walk: photomicrography, casts, and the exhibits that turn a brief into a demonstration.",
                skills: ["Investigation", "Deduction", "Medical Practice"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Red Thumb Mark (1907)",
        description:
          "<p>Freeman's first Thorndyke novel, and the public-domain text this résumé follows. A doctor-barrister dismantles fingerprint evidence that everyone else treated as infallible.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/11128" }],
        skills: ["Forensic Medicine", "Law", "Deduction"],
      },
    ],
  }),
];
