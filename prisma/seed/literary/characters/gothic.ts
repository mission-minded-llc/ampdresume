import { defineCharacter } from "../buildCharacter";

export const gothic = [
  defineCharacter({
    slug: "victor-frankenstein",
    name: "Victor Frankenstein",
    title: "Student of Natural Philosophy",
    location: "Geneva, Switzerland",
    siteDescription:
      "Genevese student who learned to animate dead tissue at Ingolstadt, then spent the rest of a short life trying to undo the work.",
    affiliation: "antihero",
    died: 1797,
    education: [
      {
        school: "University of Ingolstadt",
        degree: "Natural philosophy and chemistry",
        dateAwarded: "1789-11-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Natural Philosophy",
        description:
          "Left Agrippa and Paracelsus for the modern lecturers, then used both traditions in the same loft.",
        yearStarted: 1786,
      },
      {
        name: "Chemistry",
        description:
          "Collected materials from the dissecting room and the slaughterhouse; the work was chemical as much as anatomical.",
        yearStarted: 1788,
      },
      {
        name: "Anatomy",
        description:
          "Studied the passage from life to death until he believed he could reverse it.",
        yearStarted: 1788,
      },
      {
        name: "Galvanism",
        description:
          "Applied the era's electrical science to a body assembled from more than one grave.",
        yearStarted: 1788,
      },
      {
        name: "Resurrection Science",
        description:
          "Succeeded once, in November, and refused a second creature when the first demanded a companion.",
        yearStarted: 1789,
      },
      {
        name: "Obsession",
        description:
          "Pursued the creature to the Arctic after the family deaths, narrating the case to Walton as he died.",
        yearStarted: 1790,
      },
    ],
    companies: [
      {
        name: "University of Ingolstadt",
        description:
          "Where Krempe mocked the alchemists and Waldman opened the modern laboratory. Victor used the loft above.",
        location: "Ingolstadt, Bavaria",
        startDate: "1786-09-01",
        endDate: "1790-05-01",
        positions: [
          {
            title: "Student",
            startDate: "1786-09-01",
            endDate: "1790-05-01",
            projects: [
              {
                name: "The first creature",
                description:
                  "Two years of private labor ended on a November night. He fled the room; the being did not stay in it.",
                skills: ["Anatomy", "Chemistry", "Resurrection Science"],
              },
            ],
          },
        ],
      },
      {
        name: "The Orkney work",
        description:
          "A second body begun on a barren island, then destroyed on the table when Victor pictured a race of such beings.",
        location: "Orkney Islands",
        startDate: "1795-05-01",
        endDate: "1795-09-01",
        positions: [
          {
            title: "Reluctant maker",
            startDate: "1795-05-01",
            endDate: "1795-09-01",
            projects: [
              {
                name: "The unfinished companion",
                description:
                  "Promised a mate, then broke the promise in sight of the first creature. The murders that followed were the invoice.",
                skills: ["Galvanism", "Obsession", "Natural Philosophy"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Frankenstein; or, The Modern Prometheus (1818)",
        description:
          "<p>Shelley's frame is Walton's polar letters. Inside them, Victor confesses a laboratory success that his ethics could not survive.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/84" }],
        skills: ["Resurrection Science", "Natural Philosophy", "Obsession"],
      },
    ],
  }),

  defineCharacter({
    slug: "the-creature",
    name: "The Creature",
    title: "Unnamed · Self-taught",
    location: "The Arctic ice",
    siteDescription:
      "Eight feet of assembled body, abandoned on the night of animation. Learned language from a cottage window, then asked his maker for a peer.",
    affiliation: "antihero",
    died: 1797,
    education: [
      {
        school: "The De Lacey cottage",
        degree: "Language, history, and the sense of being shut out",
        dateAwarded: "1793-06-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Languages",
        description:
          "Learned French by watching Felix teach Safie; later read Plutarch, Goethe, and Paradise Lost.",
        yearStarted: 1792,
      },
      {
        name: "Classical Scholarship",
        description:
          "Paradise Lost taught him to name himself a fallen Adam; Plutarch taught him what men praise.",
        yearStarted: 1793,
      },
      {
        name: "Survival",
        description:
          "Lived in a hovel, in the Alps, and on the ice, feeding as he could and hiding from every face.",
        yearStarted: 1789,
      },
      {
        name: "Physical Strength",
        description: "Outran hunters, crossed glaciers, and strangled when argument failed.",
        yearStarted: 1789,
      },
      {
        name: "Rhetoric",
        description:
          "Persuaded Victor on the Mer de Glace, then cursed him when the second body was torn apart.",
        yearStarted: 1794,
      },
      {
        name: "Moral Philosophy",
        description:
          "Asked whether a being given no name or companion owes gentleness to the species that hunts it.",
        yearStarted: 1793,
      },
    ],
    companies: [
      {
        name: "Self-education at the cottage",
        description:
          "A lean-to against the De Lacey wall. He gathered firewood by night and language by day, then revealed himself and was beaten.",
        location: "Germany",
        startDate: "1792-01-01",
        endDate: "1793-06-01",
        positions: [
          {
            title: "Hidden pupil",
            startDate: "1792-01-01",
            endDate: "1793-06-01",
            projects: [
              {
                name: "The stolen education",
                description:
                  "Learned speech, the idea of family, and the fact of his own reflection. The meeting indoors ended the experiment.",
                skills: ["Languages", "Classical Scholarship", "Moral Philosophy"],
              },
            ],
          },
        ],
      },
      {
        name: "The pursuit",
        description:
          "From Geneva to Ireland to the Orkneys to the ice: a correspondence of murders and a demand that was refused.",
        location: "Europe / Arctic",
        startDate: "1794-05-01",
        positions: [
          {
            title: "Accuser",
            startDate: "1794-05-01",
            projects: [
              {
                name: "William, Clerval, and Elizabeth",
                description:
                  "Killed to make Victor feel the isolation he had imposed. Promised the pyre at the pole after Walton's ship turned home.",
                skills: ["Physical Strength", "Rhetoric", "Survival"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Mer de Glace argument",
        description:
          "<p>Shelley gives the creature the centre of the book: a clear account of abandonment, education, and the request for one other like himself.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/84" }],
        skills: ["Rhetoric", "Moral Philosophy", "Languages"],
      },
    ],
  }),

  defineCharacter({
    slug: "henry-jekyll",
    name: "Henry Jekyll",
    title: "M.D., D.C.L., LL.D., F.R.S.",
    location: "London, England",
    siteDescription:
      "Fashionable physician who divided himself with a tincture and discovered the other half would not stay in the cabinet.",
    affiliation: "antihero",
    died: 1886,
    education: [
      {
        school: "London medical and legal faculties",
        degree: "M.D., D.C.L., LL.D.",
        dateAwarded: "1865-06-01",
      },
    ],
    certifications: [
      {
        name: "Fellow of the Royal Society",
        issuer: "Royal Society",
        dateAwarded: "1870-01-01",
        credentialId: "FRS-JEKYLL",
      },
    ],
    skills: [
      {
        name: "Medical Practice",
        description:
          "A large house, a pious reputation, and a circle that included Lanyon and Utterson.",
        yearStarted: 1865,
      },
      {
        name: "Chemistry",
        description:
          "Compounded the draught in a private cabinet; later found that not every sample of salt would serve.",
        yearStarted: 1870,
      },
      {
        name: "Transformation",
        description:
          "Became Edward Hyde at will, then against will, as the balance tipped toward the smaller man.",
        yearStarted: 1884,
      },
      {
        name: "Dual Identity",
        description:
          "Wrote Hyde into the will as heir; kept a rear door and a separate life in Soho.",
        yearStarted: 1884,
      },
      {
        name: "Pharmacology",
        description:
          "The impurity in the original salt was the true reagent. When it ran out, so did control.",
        yearStarted: 1884,
      },
      {
        name: "Moral Philosophy",
        description:
          "Tried to isolate conscience from appetite and learned they were one organism.",
        yearStarted: 1884,
      },
    ],
    companies: [
      {
        name: "Jekyll's practice and cabinet",
        description:
          "Respectable frontage on a square; the laboratory behind, once a dissecting theatre, where the draught was mixed.",
        location: "London, England",
        startDate: "1870-01-01",
        endDate: "1886-01-01",
        positions: [
          {
            title: "Physician and experimenter",
            startDate: "1870-01-01",
            endDate: "1886-01-01",
            projects: [
              {
                name: "The tincture",
                description:
                  "Separated the reputational self from Hyde. The will, the cheque-book, and Carew's murder made the split public.",
                skills: ["Chemistry", "Transformation", "Dual Identity"],
              },
              {
                name: "Henry Jekyll's full statement",
                description:
                  "Left Utterson the confession. Lanyon died of what he saw; Jekyll did not come back from the last dose.",
                skills: ["Pharmacology", "Moral Philosophy", "Medical Practice"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Strange Case of Dr Jekyll and Mr Hyde (1886)",
        description:
          "<p>Stevenson's novella is a legal file that becomes a laboratory confession. Hyde is not a costume; he is the remainder after Jekyll subtracts himself.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/43" }],
        skills: ["Transformation", "Chemistry", "Dual Identity"],
      },
    ],
  }),

  defineCharacter({
    slug: "griffin",
    name: "Griffin",
    title: "Albino Chemist · Invisible Man",
    location: "Iping, Sussex",
    siteDescription:
      "University chemist who bleached himself out of sight and then out of the law. The bandages were not an injury; they were a costume for a missing face.",
    affiliation: "villain",
    died: 1896,
    education: [
      {
        school: "University College (provincial)",
        degree: "Research in optics and physiology",
        dateAwarded: "1890-06-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Optics",
        description:
          "Worked the refractive index of tissue down to that of air. The formula worked on himself.",
        yearStarted: 1891,
      },
      {
        name: "Chemistry",
        description:
          "A two-part process: bleaching the pigment, then lowering the remaining index.",
        yearStarted: 1891,
      },
      {
        name: "Invisibility",
        description:
          "Naked he could not be seen; clothed he was a floating coat. Rain, fog, and mud betrayed him.",
        yearStarted: 1895,
      },
      {
        name: "Scientific Research",
        description: "Kept notebooks that a tramp later tried to sell as a fortune-telling kit.",
        yearStarted: 1891,
      },
      {
        name: "Criminal Strategy",
        description: "From petty theft in Iping to the planned reign of terror in Port Burdock.",
        yearStarted: 1896,
      },
    ],
    companies: [
      {
        name: "The Coach and Horses",
        description:
          "Lodged in Iping wrapped in coats and false whiskers, then wrecked the inn when the rooms were searched.",
        location: "Iping, Sussex",
        startDate: "1896-02-01",
        endDate: "1896-02-29",
        positions: [
          {
            title: "Anonymous lodger",
            startDate: "1896-02-01",
            endDate: "1896-02-29",
            projects: [
              {
                name: "Unwrapping at the inn",
                description:
                  "The village saw an empty sleeve and a vanishing face. Griffin left on the run, invisible and barefoot.",
                skills: ["Invisibility", "Chemistry", "Optics"],
              },
            ],
          },
        ],
      },
      {
        name: "Port Burdock",
        description:
          "Tried to enlist Kemp as confederate in a Terror. Kemp called the police; the hunt ended in the streets.",
        location: "Port Burdock, England",
        startDate: "1896-03-01",
        endDate: "1896-03-31",
        positions: [
          {
            title: "Would-be tyrant",
            startDate: "1896-03-01",
            endDate: "1896-03-31",
            projects: [
              {
                name: "The Reign of Terror",
                description:
                  "Letters to Kemp named a new order. A mob and a spade ended it. Visibility returned with death.",
                skills: ["Criminal Strategy", "Scientific Research", "Invisibility"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Invisible Man (1897)",
        description:
          "<p>Wells's Griffin is a research success and a social failure. The science is optical; the plot is what a man does when no one can hold him.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/5230" }],
        skills: ["Optics", "Invisibility", "Chemistry"],
      },
    ],
  }),

  defineCharacter({
    slug: "moreau",
    name: "Doctor Moreau",
    title: "Physiologist · Island vivisector",
    location: "Noble's Isle, Pacific",
    siteDescription:
      "London physiologist driven out over vivisection, then free to continue on an uncharted island. The Law was for the Beast Folk; he stood outside it.",
    affiliation: "villain",
    died: 1896,
    education: [
      {
        school: "London physiological laboratories",
        degree: "Doctor of Medicine / research physiologist",
        dateAwarded: "1875-06-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Experimental Biology",
        description:
          "Remade animals toward a human shape by surgery and grafting, then taught them speech and the Law.",
        yearStarted: 1878,
      },
      {
        name: "Biology",
        description:
          "Knew the plasticity of living tissue better than the ethics that had exiled him.",
        yearStarted: 1870,
      },
      {
        name: "Surgery",
        description:
          "The House of Pain was an operating theatre. Montgomery assisted; Prendick heard the screams from the enclosure.",
        yearStarted: 1878,
      },
      {
        name: "Anatomy",
        description: "Worked from the skeleton outward, chasing a form that would hold.",
        yearStarted: 1870,
      },
      {
        name: "Scientific Research",
        description: "Called the island an experiment in the limits of plasticity, not a colony.",
        yearStarted: 1887,
      },
    ],
    companies: [
      {
        name: "Noble's Isle",
        description:
          "A Pacific island stocked with animals, a compound, and a beach of creatures who recited: Are we not men?",
        location: "South Pacific",
        startDate: "1887-01-01",
        endDate: "1896-01-01",
        positions: [
          {
            title: "Master of the island",
            startDate: "1887-01-01",
            endDate: "1896-01-01",
            projects: [
              {
                name: "The Beast Folk",
                description:
                  "Puma, ape, wolf, and ox driven toward humanity, then left to revert when the maker died on the puma's claws.",
                skills: ["Experimental Biology", "Surgery", "Anatomy"],
              },
              {
                name: "The Law",
                description:
                  "Not to eat flesh, not to go on all fours, not to spill blood — a catechism to delay the slip back to the beast.",
                skills: ["Biology", "Scientific Research"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Island of Doctor Moreau (1896)",
        description:
          "<p>Wells again: a shipwreck, a laboratory, and a question about how much pain a science may spend. Prendick's testimony is the public-domain text.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/159" }],
        skills: ["Experimental Biology", "Surgery", "Biology"],
      },
    ],
  }),

  defineCharacter({
    slug: "abraham-van-helsing",
    name: "Abraham Van Helsing",
    title: "M.D., D.Ph., D.Lit.",
    location: "Amsterdam, Netherlands",
    siteDescription:
      "Amsterdam professor called to London for a case of wasting illness that was not anaemia. Philosopher, metaphysician, and the only consultant who packed garlic with the lancet.",
    affiliation: "hero",
    died: 1897,
    education: [
      {
        school: "Dutch medical and philosophical faculties",
        degree: "M.D., D.Ph., D.Lit.",
        dateAwarded: "1865-06-01",
      },
    ],
    certifications: [
      {
        name: "Professor of Medicine",
        issuer: "University of Amsterdam",
        dateAwarded: "1878-01-01",
        credentialId: "AMSTERDAM-VH",
      },
    ],
    skills: [
      {
        name: "Medical Practice",
        description:
          "Seward's old teacher. Transfused Lucy from Holmwood, Seward, Morris, and himself when the blood kept vanishing.",
        yearStarted: 1865,
      },
      {
        name: "Scientific Research",
        description:
          "An open mind and an iron nerve, in Seward's phrase: tested the case against both the laboratory and the folklore.",
        yearStarted: 1865,
      },
      {
        name: "Philosophy",
        description:
          "Metaphysician as much as physician. Treated the Un-Dead as a problem of will and soul, not only of pulse.",
        yearStarted: 1860,
      },
      {
        name: "Investigation",
        description:
          "Read Harker's journal, Lucy's letters, and the shipping news until the Count's houses and boxes made a map.",
        yearStarted: 1893,
      },
      {
        name: "Field Medicine",
        description:
          "Garlic flowers, the Host, and a bedside vigil. The treatments were medieval; the case notes were not.",
        yearStarted: 1893,
      },
      {
        name: "Languages",
        description:
          "Dutch, English, German, and Latin enough for the rites. His English arrived with the work, not before it.",
        yearStarted: 1860,
      },
    ],
    companies: [
      {
        name: "University of Amsterdam",
        description:
          "Chair of medicine and a reputation Seward still quoted. The London work was a consultation that would not stay in the ward.",
        location: "Amsterdam, Netherlands",
        startDate: "1878-01-01",
        positions: [
          {
            title: "Professor of Medicine",
            startDate: "1878-01-01",
            projects: [
              {
                name: "The Amsterdam chair",
                description:
                  "Taught Seward, published, and kept the kind of library that later explained a patient who did not stay dead.",
                skills: ["Medical Practice", "Scientific Research", "Philosophy"],
              },
            ],
          },
        ],
      },
      {
        name: "The Westenra consultation",
        description:
          "Called by Seward in August 1893 for Lucy Westenra. The anaemia was a feeding; the funeral was not the end of the case.",
        location: "London / Whitby / Transylvania",
        startDate: "1893-08-01",
        endDate: "1893-11-06",
        positions: [
          {
            title: "Consulting physician",
            startDate: "1893-08-01",
            endDate: "1893-11-06",
            projects: [
              {
                name: "Lucy Westenra",
                description:
                  "Four transfusions, the garlic, and a tomb in Hampstead. Van Helsing named what Seward would not, then finished the work in the vault.",
                skills: ["Medical Practice", "Field Medicine", "Languages"],
              },
              {
                name: "The Count's file",
                description:
                  "Compiled the journals into one case, then led Harker, Seward, Holmwood, and Morris from Carfax to the castle road.",
                skills: ["Investigation", "Scientific Research", "Philosophy"],
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
          "<p>Stoker's Van Helsing is a doctor of medicine, philosophy, and letters — a consultant, not a film's action lead. The 1897 text is the source; later stagings are not.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/345" }],
        skills: ["Medical Practice", "Investigation", "Philosophy"],
      },
    ],
  }),
];
