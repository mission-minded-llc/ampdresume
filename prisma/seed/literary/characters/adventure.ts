import { defineCharacter } from "../buildCharacter";

export const adventure = [
  defineCharacter({
    slug: "captain-nemo",
    name: "Captain Nemo",
    title: "Commander of the Nautilus",
    location: "The world's oceans",
    siteDescription:
      "Engineer-captain who left the surface nations after a private catastrophe and built a submarine that answered to no flag. Latin for no one.",
    affiliation: "antihero",
    died: 1869,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Submarine Engineering",
        description:
          "Designed the Nautilus: double hull, sodium batteries, and a ram that could hole a warship.",
        yearStarted: 1865,
      },
      {
        name: "Engineering",
        description: "Drew every plate himself and had the parts built in scattered yards so no one nation owned the secret.",
        yearStarted: 1860,
      },
      {
        name: "Navigation",
        description: "Under-ice runs to the South Pole, the Arabian Tunnel, and the cemetery in the Atlantic.",
        yearStarted: 1866,
      },
      {
        name: "Command at Sea",
        description: "A crew that spoke a private tongue and followed a captain who would not name his country.",
        yearStarted: 1866,
      },
      {
        name: "Seamanship",
        description: "Surface only to breathe and to bury. The rest is depth.",
        yearStarted: 1866,
      },
      {
        name: "Scientific Research",
        description: "A library and a museum under pressure; Aronnax was invited as a colleague, then held as a guest.",
        yearStarted: 1866,
      },
    ],
    companies: [
      {
        name: "Nautilus",
        description:
          "An independent vessel. The world hunted a sea monster; it was a boat answering only to Nemo.",
        location: "International waters",
        startDate: "1866-01-01",
        positions: [
          {
            title: "Captain",
            startDate: "1866-01-01",
            projects: [
              {
                name: "Twenty thousand leagues",
                description:
                  "1866–1868 cruise with Aronnax, Conseil, and Ned Land aboard: coral cemetery, pearl dive, and the sinking of a pursuing man-of-war.",
                skills: ["Submarine Engineering", "Navigation", "Command at Sea"],
              },
              {
                name: "The island refuge",
                description:
                  "Later found in a Pacific cavern, still refusing the surface states that had taken his family.",
                skills: ["Engineering", "Seamanship", "Scientific Research"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Twenty Thousand Leagues Under the Seas (1870)",
        description:
          "<p>Verne's Nemo is an engineer and a political exile, not a treasure-map pirate. The Nautilus is the résumé: power, library, and a ram.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/164" }],
        skills: ["Submarine Engineering", "Navigation", "Command at Sea"],
      },
    ],
  }),

  defineCharacter({
    slug: "phileas-fogg",
    name: "Phileas Fogg",
    title: "Gentleman of the Reform Club",
    location: "Saville Row, London",
    siteDescription:
      "Punctual to the minute until a whist-table wager sent him east with Passepartout and a detective who thought he had robbed the Bank of England.",
    affiliation: "hero",
    died: 1872,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Logistics",
        description: "Eighty days by liner, rail, elephant, and sledge, booked as a sequence of connections rather than an adventure.",
        yearStarted: 1872,
      },
      {
        name: "Accounting",
        description: "Carried a carpet-bag of notes and spent them as fuel. The Reform Club bet was twenty thousand pounds.",
        yearStarted: 1872,
      },
      {
        name: "Navigation",
        description: "Read Bradshaw and the shipping columns the way other men read novels.",
        yearStarted: 1870,
      },
      {
        name: "Diplomacy",
        description: "Bought an elephant, raised a siege of sorts in India, and married Aouda without raising his voice.",
        yearStarted: 1872,
      },
      {
        name: "Obsession",
        description: "Would not concede a day until the International Date Line gave one back.",
        yearStarted: 1872,
      },
    ],
    companies: [
      {
        name: "Reform Club wager",
        description: "A whist conversation on 2 October 1872 became a circumnavigation. Fix followed; Passepartout carried the bags.",
        location: "London to London via the East",
        startDate: "1872-10-02",
        endDate: "1872-12-21",
        positions: [
          {
            title: "Traveller against the clock",
            startDate: "1872-10-02",
            endDate: "1872-12-21",
            projects: [
              {
                name: "Around the world in eighty days",
                description:
                  "Suez, Bombay, Calcutta, Hong Kong, Yokohama, San Francisco, New York, and a special train. Arrived believing he had lost.",
                skills: ["Logistics", "Navigation", "Accounting"],
              },
              {
                name: "The eighty-first day",
                description:
                  "Gained a calendar day by travelling east. Presented himself at the club in time, then married Aouda.",
                skills: ["Diplomacy", "Obsession"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Around the World in Eighty Days (1873)",
        description:
          "<p>Verne's Fogg is a timetable with a conscience. The romance is Passepartout's; the plot is connections, arrests, and one extra day.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/103" }],
        skills: ["Logistics", "Navigation", "Accounting"],
      },
    ],
  }),

  defineCharacter({
    slug: "edmond-dantes",
    name: "Edmond Dantès",
    title: "The Count of Monte Cristo",
    location: "Paris / the Mediterranean",
    siteDescription:
      "Marseille sailor denounced on the eve of his wedding, buried in the Château d'If, and returned with a treasure and a ledger of names.",
    affiliation: "antihero",
    died: 1839,
    education: [
      {
        school: "Abbé Faria, Château d'If",
        degree: "Languages, history, and the location of a fortune",
        dateAwarded: "1829-02-27",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Prison Escape",
        description: "Left the château in another man's shroud and swam to the island that financed the rest.",
        yearStarted: 1829,
      },
      {
        name: "Languages",
        description: "Faria taught him to speak as a noble; Paris later believed the costume.",
        yearStarted: 1815,
      },
      {
        name: "Accounting",
        description: "Used credit, rumor, and sudden ruin as precisely as a knife.",
        yearStarted: 1838,
      },
      {
        name: "Banking",
        description: "Moved through Danglars's world as a client who already knew the books.",
        yearStarted: 1838,
      },
      {
        name: "Disguise",
        description: "Sinbad the Sailor, Abbé Busoni, Lord Wilmore — each name a tool.",
        yearStarted: 1829,
      },
      {
        name: "Obsession",
        description: "Danglars, Fernand, and Villefort were not random enemies; they were the three signatures on a letter.",
        yearStarted: 1815,
      },
    ],
    companies: [
      {
        name: "Château d'If",
        description: "Political prison in the Marseille roadstead. Fourteen years in a cell beside a priest who had a map.",
        location: "Île d'If, France",
        startDate: "1815-03-01",
        endDate: "1829-02-27",
        positions: [
          {
            title: "Prisoner No. 34",
            startDate: "1815-03-01",
            endDate: "1829-02-27",
            projects: [
              {
                name: "Faria's education",
                description:
                  "Languages, science, and the story of the Spada treasure. The abbé died; Dantès took the shroud and the secret.",
                skills: ["Languages", "Prison Escape", "Obsession"],
              },
            ],
          },
        ],
      },
      {
        name: "House of Monte Cristo",
        description: "A title bought with buried coin, then spent on the slow undoing of three careers in Paris.",
        location: "Paris, France",
        startDate: "1838-05-01",
        positions: [
          {
            title: "Count",
            startDate: "1838-05-01",
            projects: [
              {
                name: "The settling of accounts",
                description:
                  "Bankruptcy, exposure, and suicide arranged so each man seemed to fall by his own weight.",
                skills: ["Accounting", "Banking", "Disguise"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Count of Monte Cristo (1846)",
        description:
          "<p>Dumas's long revenge. The island is only the treasury; the work is social engineering in Restoration and July-Monarchy Paris.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1184" }],
        skills: ["Prison Escape", "Accounting", "Disguise"],
      },
    ],
  }),

  defineCharacter({
    slug: "jean-valjean",
    name: "Jean Valjean",
    title: "Monsieur Madeleine · Mayor of Montreuil-sur-Mer",
    location: "Paris, France",
    siteDescription:
      "Convict 24601 who stole bread, then a bishop's silver, and spent the rest of a life trying to become the man the silver implied.",
    affiliation: "hero",
    died: 1833,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Physical Strength",
        description: "Lifted a cart off Fauchelevent; later carried Marius through the Paris sewers.",
        yearStarted: 1795,
      },
      {
        name: "Prison Escape",
        description: "Broke parole after Digne, then lived under other names until the courtroom at Arras.",
        yearStarted: 1823,
      },
      {
        name: "Charity",
        description: "As Madeleine, employed a town and refused to let Fantine fall without a witness.",
        yearStarted: 1815,
      },
      {
        name: "Prison Reform",
        description: "Ran a factory on humane lines and learned that a mayor's kindness does not cancel a yellow passport.",
        yearStarted: 1815,
      },
      {
        name: "Dual Identity",
        description: "Madeleine, Ultime Fauchelevent, Ultimus Fauchelevent — each alias a shelter for Cosette.",
        yearStarted: 1815,
      },
      {
        name: "Moral Philosophy",
        description: "The bishop's candlesticks remain the argument: a life can be purchased back, at interest.",
        yearStarted: 1815,
      },
    ],
    companies: [
      {
        name: "Montreuil-sur-Mer",
        description: "Jet-work factory town. Valjean arrived with a new name and left when another man was tried in his place.",
        location: "Montreuil-sur-Mer, France",
        startDate: "1815-12-01",
        endDate: "1823-06-01",
        positions: [
          {
            title: "Mayor (Monsieur Madeleine)",
            startDate: "1815-12-01",
            endDate: "1823-06-01",
            projects: [
              {
                name: "The factory and Fantine",
                description:
                  "Built a local prosperity, failed Fantine until the end, then confessed at Arras rather than let Champmathieu go to the hulks.",
                skills: ["Charity", "Prison Reform", "Moral Philosophy"],
              },
            ],
          },
        ],
      },
      {
        name: "Paris, under other names",
        description: "The Gorbeau tenement, the convent, the Rue Plumet, and the sewer on the night of the barricades.",
        location: "Paris, France",
        startDate: "1823-12-01",
        endDate: "1833-06-01",
        positions: [
          {
            title: "Guardian of Cosette",
            startDate: "1823-12-01",
            endDate: "1833-06-01",
            projects: [
              {
                name: "From the Thénardiers to the sewer",
                description:
                  "Bought Cosette out of Montfermeil, hid her, and carried Marius to his grandfather's door while Javert waited above.",
                skills: ["Physical Strength", "Dual Identity", "Prison Escape"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Les Misérables (1862)",
        description:
          "<p>Hugo's Valjean is a social argument in the shape of a man. The yellow passport, the candlesticks, and the sewer are the same book.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/135" }],
        skills: ["Moral Philosophy", "Charity", "Dual Identity"],
      },
    ],
  }),

  defineCharacter({
    slug: "javert",
    name: "Inspector Javert",
    title: "Inspector of Police",
    location: "Paris, France",
    siteDescription:
      "Born in a prison to a fortune-teller, and spent a career believing the law had no remainder. Valjean was the remainder.",
    affiliation: "antihero",
    died: 1832,
    education: [],
    certifications: [
      {
        name: "Inspector",
        issuer: "Prefecture of Police",
        dateAwarded: "1820-01-01",
        credentialId: "PREF-JAVERT",
      },
    ],
    skills: [
      {
        name: "Police Procedure",
        description: "Knew the registers, the hulks, and the faces that reappear under new papers.",
        yearStarted: 1815,
      },
      {
        name: "Investigation",
        description: "Tracked Madeleine to Arras and Valjean through Paris on a scent that never cooled.",
        yearStarted: 1820,
      },
      {
        name: "Law",
        description: "The code was a complete world. Mercy looked like a clerical error.",
        yearStarted: 1815,
      },
      {
        name: "Obsession",
        description: "Valjean was not a case load; he was a proposition about whether a convict can close.",
        yearStarted: 1823,
      },
      {
        name: "Moral Philosophy",
        description: "When the convict spared him at the barricade, the proposition failed. The Seine was his last report.",
        yearStarted: 1832,
      },
    ],
    companies: [
      {
        name: "Prefecture of Police",
        description: "Montreuil posting, then Paris. Always the same man in a new arrondissement.",
        location: "Montreuil-sur-Mer / Paris",
        startDate: "1820-01-01",
        endDate: "1832-06-07",
        positions: [
          {
            title: "Inspector",
            startDate: "1820-01-01",
            endDate: "1832-06-07",
            projects: [
              {
                name: "The Madeleine file",
                description:
                  "Recognized a convict in a mayor, then watched the mayor confess to save another man.",
                skills: ["Police Procedure", "Investigation", "Law"],
              },
              {
                name: "The barricade and the river",
                description:
                  "Captured, released, and unable to file the result. Left his hat and a note on the quay.",
                skills: ["Obsession", "Moral Philosophy"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The inspector's last report",
        description:
          "<p>Hugo writes Javert as the law's true believer. His suicide is not weakness; it is a system that cannot store a paradox.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/135" }],
        skills: ["Law", "Police Procedure", "Moral Philosophy"],
      },
    ],
  }),

  defineCharacter({
    slug: "dartagnan",
    name: "d'Artagnan",
    title: "Gascon Guardsman",
    location: "Paris, France",
    siteDescription:
      "Young Gascon who arrived in Paris with a yellow horse, a letter of introduction, and three duels booked before noon. Stayed for the diamonds.",
    affiliation: "hero",
    died: 1673,
    education: [],
    certifications: [
      {
        name: "Admitted to the King's Musketeers",
        issuer: "M. de Tréville",
        dateAwarded: "1626-01-01",
        credentialId: "TRE-DARTAGNAN",
      },
    ],
    skills: [
      {
        name: "Swordsmanship",
        description: "Gascon wrist and a Paris education from Athos, Porthos, and Aramis.",
        yearStarted: 1625,
      },
      {
        name: "Dueling",
        description: "Three appointments at midday; the Cardinal's Guards interrupted, and a friendship began.",
        yearStarted: 1625,
      },
      {
        name: "Horsemanship",
        description: "Rode to London for the Queen's diamonds and back before the ball.",
        yearStarted: 1625,
      },
      {
        name: "Court Intrigue",
        description: "Learned that a Buckingham, a cardinal, and a queen can share one necklace.",
        yearStarted: 1625,
      },
      {
        name: "Tactical Leadership",
        description: "The fourth man in 'all for one' — later a lieutenant who still took the street work.",
        yearStarted: 1626,
      },
    ],
    companies: [
      {
        name: "King's Musketeers",
        description: "M. de Tréville's company. The motto was not official; the work was.",
        location: "Paris, France",
        startDate: "1625-04-01",
        positions: [
          {
            title: "Musketeer (later lieutenant)",
            startDate: "1625-04-01",
            projects: [
              {
                name: "The Queen's diamonds",
                description:
                  "Calais, the Channel, and London in time to recover the studs Richelieu had meant to miss.",
                skills: ["Horsemanship", "Court Intrigue", "Swordsmanship"],
              },
              {
                name: "Milady",
                description:
                  "A war in miniature: letters, poisons, and a trial on the riverbank that the four would not forget.",
                skills: ["Dueling", "Tactical Leadership", "Court Intrigue"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Three Musketeers (1844)",
        description:
          "<p>Dumas's d'Artagnan is ambition with a sword. The historical d'Artagnan existed; this résumé follows the 1844 novel, which is public domain.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1257" }],
        skills: ["Swordsmanship", "Court Intrigue", "Dueling"],
      },
    ],
  }),

  defineCharacter({
    slug: "milady-de-winter",
    name: "Milady de Winter",
    title: "Agent of the Cardinal",
    location: "London / the Continent",
    siteDescription:
      "Branded in a convent, widowed into an English title, and employed where Richelieu needed a letter stolen or a duke dead.",
    affiliation: "villain",
    died: 1628,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Court Intrigue",
        description: "Moved between Paris, London, and the cardinal's cabinet as a wife, a penitent, or a widow.",
        yearStarted: 1620,
      },
      {
        name: "Poisoncraft",
        description: "The convent at Béthune; a last commission against Buckingham that arrived too late and against Constance that did not.",
        yearStarted: 1626,
      },
      {
        name: "Social Engineering",
        description: "Turned jailers, lovers, and brothers-in-law into instruments. Felton was the most expensive.",
        yearStarted: 1625,
      },
      {
        name: "Assassination",
        description: "Buckingham by a fanatic's knife; Constance by a stolen Host and a glass of wine.",
        yearStarted: 1628,
      },
      {
        name: "Infiltration",
        description: "Entered a prison as a victim and left it as the author of the next crime.",
        yearStarted: 1628,
      },
    ],
    companies: [
      {
        name: "Service of the Cardinal",
        description: "Unofficial. Richelieu used her when musketeers and open warrants would have made a scandal.",
        location: "France / England",
        startDate: "1625-01-01",
        endDate: "1628-08-01",
        positions: [
          {
            title: "Secret agent",
            startDate: "1625-01-01",
            endDate: "1628-08-01",
            projects: [
              {
                name: "The diamond studs",
                description:
                  "Two studs cut from the Queen's gift in London, meant to finish Anne at the ball. d'Artagnan replaced them in time.",
                skills: ["Court Intrigue", "Infiltration", "Social Engineering"],
              },
              {
                name: "Buckingham and Béthune",
                description:
                  "Felton and the knife; then the convent murder. The four musketeers and Lord de Winter closed the file on the river.",
                skills: ["Assassination", "Poisoncraft", "Social Engineering"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The cardinal's woman",
        description:
          "<p>In Dumas, Milady is the novel's other general: she fights a war of letters and poison while the men fight with swords.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1257" }],
        skills: ["Court Intrigue", "Poisoncraft", "Assassination"],
      },
    ],
  }),

  defineCharacter({
    slug: "george-challenger",
    name: "George Edward Challenger",
    title: "Professor of Zoology",
    location: "Enmore Park, London",
    siteDescription:
      "Zoologist with a bull neck and a talent for making enemies of committees. Proved a lost plateau the only way he accepted: by going there.",
    affiliation: "hero",
    died: 1912,
    education: [
      {
        school: "British scientific faculties",
        degree: "Professor of Zoology",
        dateAwarded: "1895-01-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Zoology",
        description: "Described living forms the British Museum had only as fossils, then brought a specimen home in a crate.",
        yearStarted: 1895,
      },
      {
        name: "Paleontology",
        description: "The plateau was a Jurassic argument with teeth. Summerlee came to scoff and stayed to collect.",
        yearStarted: 1912,
      },
      {
        name: "Scientific Research",
        description: "Maple White's sketchbook was a lead; the expedition was the paper.",
        yearStarted: 1912,
      },
      {
        name: "Debate",
        description: "Lectured with his fists when the hall required it. The Queen's Hall demonstration ended the dispute.",
        yearStarted: 1912,
      },
      {
        name: "Survival",
        description: "Swamp, pterodactyl, and ape-men. Malone got the copy; Challenger got the proof.",
        yearStarted: 1912,
      },
      {
        name: "Leadership",
        description: "Commanded a four-man party that did not like him and came back believing him.",
        yearStarted: 1912,
      },
    ],
    companies: [
      {
        name: "Amazon plateau expedition",
        description: "Challenger, Summerlee, Lord John Roxton, and Edward Malone. A plateau above the jungle, reached by beech and cut off by landslide.",
        location: "South America",
        startDate: "1912-04-01",
        endDate: "1912-11-01",
        positions: [
          {
            title: "Expedition leader",
            startDate: "1912-04-01",
            endDate: "1912-11-01",
            projects: [
              {
                name: "Maple White Land",
                description:
                  "Mapped a lost world of living dinosaurs and a war between ape-men and Indians. Left with notes, scars, and one caged witness.",
                skills: ["Zoology", "Paleontology", "Survival"],
              },
              {
                name: "Queen's Hall",
                description:
                  "Opened the crate. The pterodactyl took a turn around the hall and settled the Royal Society's doubts.",
                skills: ["Debate", "Scientific Research", "Leadership"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Lost World (1912)",
        description:
          "<p>Conan Doyle's Challenger is Holmes's opposite: loud, physical, and allergic to committees. The 1912 novel is public domain in the United States.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/139" }],
        skills: ["Zoology", "Paleontology", "Debate"],
      },
    ],
  }),

  defineCharacter({
    slug: "captain-ahab",
    name: "Captain Ahab",
    title: "Master of the Pequod",
    location: "Nantucket, MA",
    siteDescription:
      "Nantucket captain with one ivory leg and one purpose. The ship's papers said oil; the quarterdeck said the white whale.",
    affiliation: "antihero",
    died: 1841,
    education: [],
    certifications: [
      {
        name: "Master, Pequod",
        issuer: "Bildad and Peleg, Nantucket",
        dateAwarded: "1840-12-01",
        credentialId: "PEQUOD-AHAB",
      },
    ],
    skills: [
      {
        name: "Whaling",
        description: "Forty years of cruises; the last one was not for oil.",
        yearStarted: 1800,
      },
      {
        name: "Command at Sea",
        description: "Held a crew of isolatoes to a single hunt by sermon, gold ounce, and the line of his bone leg.",
        yearStarted: 1841,
      },
      {
        name: "Navigation",
        description: "Read the sea's surface for a scarred hump and a spout that was not like other spouts.",
        yearStarted: 1800,
      },
      {
        name: "Seamanship",
        description: "Nantucket trained; the Pacific finished the education.",
        yearStarted: 1800,
      },
      {
        name: "Obsession",
        description: "Moby Dick took a leg. Ahab meant to take the mask off the world by striking through the whale.",
        yearStarted: 1841,
      },
      {
        name: "Rhetoric",
        description: "The doubloon nailed to the mast was a speech as much as a bounty.",
        yearStarted: 1841,
      },
    ],
    companies: [
      {
        name: "Pequod",
        description: "Nantucket whaleship, three years out, never returned. Queequeg, Starbuck, Stubb, Flask, and Ishmael among the company.",
        location: "Pacific Ocean",
        startDate: "1841-01-01",
        endDate: "1841-12-01",
        positions: [
          {
            title: "Captain",
            startDate: "1841-01-01",
            endDate: "1841-12-01",
            projects: [
              {
                name: "The white whale",
                description:
                  "Turned a commercial cruise into a chase. The boats went down; the whale took Ahab in the line; Ishmael alone lived to tell it.",
                skills: ["Whaling", "Obsession", "Command at Sea"],
              },
              {
                name: "The quarterdeck oath",
                description:
                  "Crossed the lances and made the crew swear. Starbuck's prudence did not survive the ceremony.",
                skills: ["Rhetoric", "Navigation", "Seamanship"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Moby-Dick; or, The Whale (1851)",
        description:
          "<p>Melville's Ahab is a metaphysical brief delivered from a whaleship. The cetology chapters are the job; the last three days are the verdict.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/2701" }],
        skills: ["Whaling", "Obsession", "Command at Sea"],
      },
    ],
  }),

  defineCharacter({
    slug: "long-john-silver",
    name: "Long John Silver",
    title: "Sea-cook · Sometime Pirate",
    location: "The Hispaniola / the sea",
    siteDescription:
      "One-legged cook who quoted Scripture, kept a parrot named Captain Flint, and very nearly took a schooner and a treasure off a boy.",
    affiliation: "villain",
    died: 1760,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Piracy",
        description: "Sailed with Flint; knew where the cache was buried and who had been buried with it.",
        yearStarted: 1740,
      },
      {
        name: "Seamanship",
        description: "Could work a ship from a crutch and keep a crew fed while he counted their usefulness.",
        yearStarted: 1740,
      },
      {
        name: "Social Engineering",
        description: "Hired as cook by Squire Trelawney, then turned the forecastle into a jury.",
        yearStarted: 1760,
      },
      {
        name: "Treasure Hunting",
        description: "Read Flint's map as well as any gentleman in the cabin.",
        yearStarted: 1760,
      },
      {
        name: "Cunning",
        description: "Changed sides when the numbers changed, and left the island with a sack rather than a noose.",
        yearStarted: 1760,
      },
    ],
    companies: [
      {
        name: "Hispaniola",
        description: "Schooner fitted in Bristol for a treasure cruise. Silver packed the crew with Flint's survivors.",
        location: "Bristol to Treasure Island",
        startDate: "1760-01-01",
        endDate: "1760-12-01",
        positions: [
          {
            title: "Sea-cook and mutineer",
            startDate: "1760-01-01",
            endDate: "1760-12-01",
            projects: [
              {
                name: "The mutiny",
                description:
                  "Took the ship in all but name. Jim in the apple barrel heard the plan; the stockade and the guns answered it.",
                skills: ["Piracy", "Social Engineering", "Seamanship"],
              },
              {
                name: "The cache",
                description:
                  "Found Flint's pit empty — Ben Gunn had moved the bars. Silver bargained again and slipped the voyage home.",
                skills: ["Treasure Hunting", "Cunning"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Treasure Island (1883)",
        description:
          "<p>Stevenson's Silver is charming on purpose. The book is Jim's; the danger is how reasonable the cook sounds until the black spot arrives.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/120" }],
        skills: ["Piracy", "Cunning", "Treasure Hunting"],
      },
    ],
  }),

  defineCharacter({
    slug: "cyrano-de-bergerac",
    name: "Cyrano de Bergerac",
    title: "Cadet of Gascony · Poet",
    location: "Paris, France",
    siteDescription:
      "Swordsman and poet who lent his lines to Christian and kept the nose as both joke and armor. The letters were his; the kiss was not.",
    affiliation: "hero",
    died: 1655,
    education: [],
    certifications: [
      {
        name: "Cadet in Carbon de Castel-Jaloux's company",
        issuer: "Guards",
        dateAwarded: "1640-01-01",
        credentialId: "GASCON-CYRANO",
      },
    ],
    skills: [
      {
        name: "Poetry",
        description: "Improvised a ballade while fighting, and wrote the letters Roxane believed were Christian's.",
        yearStarted: 1635,
      },
      {
        name: "Swordsmanship",
        description: "Emptied the theatre of a bad actor and a crowd of hired blades in one act.",
        yearStarted: 1635,
      },
      {
        name: "Dueling",
        description: "A Gascon cadet's ordinary afternoon, performed with commentary.",
        yearStarted: 1635,
      },
      {
        name: "Wit",
        description: "Made a catalogue of nose jokes so no one else could land the first cut.",
        yearStarted: 1635,
      },
      {
        name: "Letter Writing",
        description: "Fifteen years of unsigned pages to Roxane; the last one he recited as he died.",
        yearStarted: 1640,
      },
    ],
    companies: [
      {
        name: "Carbon de Castel-Jaloux's cadets",
        description: "Gascon company in Paris and at the siege of Arras. Christian stood in the light; Cyrano stood under the balcony.",
        location: "Paris / Arras",
        startDate: "1640-01-01",
        endDate: "1655-01-01",
        positions: [
          {
            title: "Cadet and ghostwriter",
            startDate: "1640-01-01",
            endDate: "1655-01-01",
            projects: [
              {
                name: "The balcony",
                description:
                  "Prompted Christian from the shadows while Roxane heard the soul she had asked for. The body on the balcony was not the author.",
                skills: ["Poetry", "Letter Writing", "Wit"],
              },
              {
                name: "Arras and the convent years",
                description:
                  "Carried the last letter through the siege. Spent the rest of his life visiting a widow who learned the handwriting too late.",
                skills: ["Swordsmanship", "Dueling", "Letter Writing"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Cyrano de Bergerac (1897)",
        description:
          "<p>Rostand's play, not the historical satirist alone. The 1897 text is public domain; this résumé follows that Gascon, not later films.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1256" }],
        skills: ["Poetry", "Swordsmanship", "Wit"],
      },
    ],
  }),
];
