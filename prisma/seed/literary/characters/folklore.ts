import { defineCharacter } from "../buildCharacter";

export const folklore = [
  defineCharacter({
    slug: "robin-hood",
    name: "Robin Hood",
    title: "Outlaw of Sherwood",
    location: "Sherwood Forest, Nottinghamshire",
    siteDescription:
      "Yeoman archer of the ballads who took from Norman purses and kept a court of outlaws under the greenwood tree. The later novels borrowed him; the ballads made him.",
    affiliation: "hero",
    died: 1247,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Archery",
        description: "Splits the wand at a hundred paces in every telling that matters.",
        yearStarted: 1190,
      },
      {
        name: "Outlaw Leadership",
        description:
          "Little John, Much, Scarlet, and a band that ate the king's deer and called it justice.",
        yearStarted: 1190,
      },
      {
        name: "Forestry",
        description: "Knew Sherwood's paths better than the sheriff's riders knew the road.",
        yearStarted: 1190,
      },
      {
        name: "Disguise",
        description: "Potter, butcher, or beggar when Nottingham gates required a different coat.",
        yearStarted: 1190,
      },
      {
        name: "Swordsmanship",
        description: "Staff and sword after the arrows were spent.",
        yearStarted: 1190,
      },
    ],
    companies: [
      {
        name: "Sherwood band",
        description:
          "A greenwood affinity, not a charter. The ballads disagree on kings and ladies; they agree on the forest and the sheriff.",
        location: "Sherwood Forest",
        startDate: "1190-01-01",
        positions: [
          {
            title: "Captain of outlaws",
            startDate: "1190-01-01",
            projects: [
              {
                name: "The sheriff's purse",
                description:
                  "Ambush, invitation, and a feast the guest paid for. Nottingham's taxes took a detour under the oaks.",
                skills: ["Archery", "Outlaw Leadership", "Forestry"],
              },
              {
                name: "The potters and the gates",
                description:
                  "Entered the town in borrowed trades, shot for a prize, and left with the prize and the story.",
                skills: ["Disguise", "Swordsmanship", "Archery"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "A Gest of Robyn Hode",
        description:
          "<p>The long printed ballad, not a studio outlaw. Child and the early printers are the source; later films and novels are outside this résumé.</p>",
        links: [
          {
            label: "Project Gutenberg (Robin Hood anthology)",
            url: "https://www.gutenberg.org/ebooks/10148",
          },
        ],
        skills: ["Archery", "Outlaw Leadership", "Forestry"],
      },
    ],
  }),

  defineCharacter({
    slug: "sheriff-of-nottingham",
    name: "Sheriff of Nottingham",
    title: "High Sheriff",
    location: "Nottingham, England",
    siteDescription:
      "The crown's man in the shire, forever hiring a better archer and never keeping him. The ballads need him the way a target needs a post.",
    affiliation: "villain",
    died: 1194,
    education: [],
    certifications: [
      {
        name: "High Sheriff of Nottinghamshire",
        issuer: "The Crown",
        dateAwarded: "1190-01-01",
        credentialId: "NOTTS-SHERIFF",
      },
    ],
    skills: [
      {
        name: "Law",
        description: "Collected what the forest took back. Called it order.",
        yearStarted: 1190,
      },
      {
        name: "Statecraft",
        description: "Held the castle and the market; could not hold the greenwood.",
        yearStarted: 1190,
      },
      {
        name: "Tactical Leadership",
        description: "Rode posses that returned with songs about them instead of prisoners.",
        yearStarted: 1190,
      },
      {
        name: "Obsession",
        description:
          "Posted prizes and ambushes for one yeoman until the yeoman became the shire's joke.",
        yearStarted: 1190,
      },
    ],
    companies: [
      {
        name: "Nottingham Castle",
        description:
          "Seat of the shrievalty. Markets, courts, and a standing invitation to be robbed on the way home.",
        location: "Nottingham, England",
        startDate: "1190-01-01",
        positions: [
          {
            title: "High Sheriff",
            startDate: "1190-01-01",
            projects: [
              {
                name: "The archery contest",
                description:
                  "Set a prize to draw Robin into town. The prize left with the hooded bowman.",
                skills: ["Law", "Tactical Leadership", "Obsession"],
              },
              {
                name: "The forest commissions",
                description:
                  "Tried to make Sherwood answer to the castle. The bandits answered to the trees.",
                skills: ["Statecraft", "Law"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The sheriff in the Gest",
        description:
          "<p>A public-domain antagonist: greedy, official, and repeatedly outshot. He exists so the ballad can measure a yeoman against the law.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/10148" }],
        skills: ["Law", "Statecraft", "Obsession"],
      },
    ],
  }),

  defineCharacter({
    slug: "king-arthur",
    name: "King Arthur",
    title: "King of Britain · Pendragon",
    location: "Camelot",
    siteDescription:
      "Wart turned king by a sword in a stone, then kept a table that was supposed to make knighthood a public office. Malory is the résumé; later cinema is not.",
    affiliation: "hero",
    died: 542,
    education: [],
    certifications: [
      {
        name: "Sword from the stone",
        issuer: "London churchyard",
        dateAwarded: "0500-01-01",
        credentialId: "PENDRAGON-STONE",
      },
    ],
    skills: [
      {
        name: "Quest Leadership",
        description:
          "Sent the Table after the Grail, after giants, and after the private wars that unmade the court.",
        yearStarted: 500,
      },
      {
        name: "Statecraft",
        description:
          "Held a coalition of knights as if it were a kingdom — which, for a while, it was.",
        yearStarted: 500,
      },
      {
        name: "Swordsmanship",
        description:
          "Excalibur after the stone; the scabbard, Malory says, was worth more than the blade.",
        yearStarted: 500,
      },
      {
        name: "Leadership",
        description:
          "Camelot's order was personal: he believed men would be better if seated as equals.",
        yearStarted: 500,
      },
      {
        name: "Military Strategy",
        description: "The Roman war, the Saxon fights, and the last battle on Salisbury plain.",
        yearStarted: 500,
      },
    ],
    companies: [
      {
        name: "The Round Table",
        description:
          "A fellowship with a furniture problem: no head of the table, and still a king.",
        location: "Camelot",
        startDate: "0500-01-01",
        endDate: "0542-01-01",
        positions: [
          {
            title: "King",
            startDate: "0500-01-01",
            endDate: "0542-01-01",
            projects: [
              {
                name: "The fellowship",
                description:
                  "Knighted a generation, married Guinevere, and watched Lancelot and the Grail divide the same men.",
                skills: ["Quest Leadership", "Statecraft", "Leadership"],
              },
              {
                name: "Camlan",
                description:
                  "Mordred and the last field. The boat to Avalon is Malory's close, not a studio sequel.",
                skills: ["Military Strategy", "Swordsmanship"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Le Morte d'Arthur (1485)",
        description:
          "<p>Malory's compilation, modernized in public-domain editions. This is the English prose Arthur, not a film franchise.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1251" }],
        skills: ["Quest Leadership", "Statecraft", "Swordsmanship"],
      },
    ],
  }),

  defineCharacter({
    slug: "odysseus",
    name: "Odysseus",
    title: "King of Ithaca · Man of Many Turns",
    location: "Ithaca",
    siteDescription:
      "The tactician of the Trojan Horse and of the long way home. Homer's Odysseus lies, endures, and counts the suitors before he strings the bow.",
    affiliation: "hero",
    died: 10,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Cunning",
        description: "Nobody, in the cave; a beggar, in his own hall. The name is a method.",
        yearStarted: 1,
      },
      {
        name: "Navigation",
        description: "Ten years of coasts, winds, and islands that did not want to be left.",
        yearStarted: 1,
      },
      {
        name: "Seamanship",
        description: "Lost crews to cattle, to Scylla, and to a bag of winds opened too soon.",
        yearStarted: 1,
      },
      {
        name: "Rhetoric",
        description: "Told Alcinous a story long enough to earn a ship home.",
        yearStarted: 1,
      },
      {
        name: "Archery",
        description: "The bow the suitors could not string. Twelve axes, then the hall.",
        yearStarted: 1,
      },
      {
        name: "Leadership",
        description:
          "A king who came home late and reclaimed the house by massacre and recognition.",
        yearStarted: 1,
      },
    ],
    companies: [
      {
        name: "The return from Troy",
        description:
          "A decade of detours after a decade of siege. Calypso, Circe, the dead, and a raft.",
        location: "The Mediterranean",
        startDate: "0001-01-01",
        endDate: "0010-01-01",
        positions: [
          {
            title: "Wanderer",
            startDate: "0001-01-01",
            endDate: "0010-01-01",
            projects: [
              {
                name: "The wanderings",
                description:
                  "Cyclops, lotus, Aeolus, Circe, the Sirens, and the cattle of the Sun. He arrived alone.",
                skills: ["Cunning", "Navigation", "Seamanship"],
              },
            ],
          },
        ],
      },
      {
        name: "House of Odysseus",
        description: "Ithaca after the landing. A nurse, a son, a swineherd, and a bow.",
        location: "Ithaca",
        startDate: "0010-01-01",
        positions: [
          {
            title: "King returned",
            startDate: "0010-01-01",
            projects: [
              {
                name: "The slaughter in the hall",
                description:
                  "Strung the bow, named himself, and cleared the house. Penelope's test of the bed followed the blood.",
                skills: ["Archery", "Rhetoric", "Leadership"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Odyssey",
        description:
          "<p>Homer in public-domain English (Butler and others). The résumé follows the poem, not later films or novels that reuse the name.</p>",
        links: [
          { label: "Project Gutenberg (Butler)", url: "https://www.gutenberg.org/ebooks/1727" },
        ],
        skills: ["Cunning", "Navigation", "Rhetoric"],
      },
    ],
  }),

  defineCharacter({
    slug: "penelope",
    name: "Penelope",
    title: "Queen of Ithaca",
    location: "Ithaca",
    siteDescription:
      "Held a house full of suitors for twenty years by weaving a shroud she unwove at night. Recognition, when it came, was a bedpost hewn from a living tree.",
    affiliation: "hero",
    died: 10,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Weaving",
        description: "Laertes's shroud: three years of daylight work undone by lamp-light.",
        yearStarted: 1,
      },
      {
        name: "Cunning",
        description:
          "Promised a choice when the web was finished, then made sure it was never finished.",
        yearStarted: 1,
      },
      {
        name: "Hospitality",
        description:
          "Fed the men who ate the house, because a queen's doors could not simply close.",
        yearStarted: 1,
      },
      {
        name: "Statecraft",
        description:
          "Kept Ithaca from a new king without an army — only delay, rumor, and a son coming of age.",
        yearStarted: 1,
      },
      {
        name: "Leadership",
        description:
          "The household's remaining order ran through her, the nurse, and the few servants who had not gone over.",
        yearStarted: 1,
      },
    ],
    companies: [
      {
        name: "House of Odysseus",
        description:
          "A palace under occupation. The suitors drank the flocks; Penelope ran the interval.",
        location: "Ithaca",
        startDate: "0001-01-01",
        positions: [
          {
            title: "Queen in waiting",
            startDate: "0001-01-01",
            projects: [
              {
                name: "The shroud",
                description:
                  "A public piety and a private tactic. When the maids told, she set the bow-contest instead.",
                skills: ["Weaving", "Cunning", "Statecraft"],
              },
              {
                name: "The bed",
                description:
                  "Tested the beggar with a secret only Odysseus would know: a bed rooted in the courtyard tree.",
                skills: ["Hospitality", "Leadership", "Cunning"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Penelope's web",
        description:
          "<p>Homer's queen is not a passenger. The poem's homecoming is a joint operation: his bow, her test.</p>",
        links: [
          { label: "Project Gutenberg (Butler)", url: "https://www.gutenberg.org/ebooks/1727" },
        ],
        skills: ["Weaving", "Cunning", "Statecraft"],
      },
    ],
  }),

  defineCharacter({
    slug: "scheherazade",
    name: "Scheherazade",
    title: "Storyteller of the Thousand Nights",
    location: "The king's city",
    siteDescription:
      "Vizier's daughter who volunteered for a marriage that had been a death sentence, then bought the mornings with unfinished tales.",
    affiliation: "hero",
    died: 803,
    education: [
      {
        school: "The vizier's household",
        degree: "Poetry, history, and the philosophers",
        dateAwarded: "0800-01-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Storytelling",
        description: "Nested tales that end on a cliff the king cannot leave unheard.",
        yearStarted: 800,
      },
      {
        name: "Rhetoric",
        description: "Each dawn is a closing argument for one more night.",
        yearStarted: 800,
      },
      {
        name: "Classical Scholarship",
        description:
          "The frame presents her as learned: poetry, medicine, and the histories of kings.",
        yearStarted: 800,
      },
      {
        name: "Diplomacy",
        description:
          "Turned a murderous policy into a marriage by making curiosity stronger than revenge.",
        yearStarted: 800,
      },
      {
        name: "Translation",
        description:
          "Her voice is how the tales travel; English readers meet her in public-domain versions such as Lane and Payne.",
        yearStarted: 800,
      },
    ],
    companies: [
      {
        name: "The thousand and one nights",
        description:
          "A bedroom that was also a court. Dunyazad asked for a story; the king stayed to hear the end.",
        location: "The royal palace",
        startDate: "0800-01-01",
        endDate: "0803-01-01",
        positions: [
          {
            title: "Queen by installment",
            startDate: "0800-01-01",
            endDate: "0803-01-01",
            projects: [
              {
                name: "The unfinished tale",
                description:
                  "Sindbad, jinn, porters, and caliphs — always one thread left hanging at cock-crow.",
                skills: ["Storytelling", "Rhetoric", "Classical Scholarship"],
              },
              {
                name: "The pardon",
                description:
                  "Three years of nights, children, and a king who had forgotten the original decree.",
                skills: ["Diplomacy", "Translation", "Storytelling"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Arabian Nights Entertainments",
        description:
          "<p>Folklore in public-domain English, not a later film cycle. Scheherazade's craft is narrative suspense used as statecraft.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/128" }],
        skills: ["Storytelling", "Rhetoric", "Diplomacy"],
      },
    ],
  }),

  defineCharacter({
    slug: "dorothy-gale",
    name: "Dorothy Gale",
    title: "Traveller from Kansas",
    location: "Kansas / the Land of Oz",
    siteDescription:
      "Orphan of the 1900 novel who was carried to Oz by a cyclone, walked a yellow road, and wanted only to go home. Baum's Dorothy, not later studio versions.",
    affiliation: "hero",
    died: 1900,
    education: [],
    certifications: [],
    skills: [
      {
        name: "Farm Work",
        description:
          "Kansas prairie life with Uncle Henry and Aunt Em before the house took flight.",
        yearStarted: 1895,
      },
      {
        name: "Survival",
        description:
          "Poppy field, flying monkeys, and a witch's castle — passed through with Toto and three companions.",
        yearStarted: 1900,
      },
      {
        name: "Leadership",
        description:
          "Kept a scarecrow, a tin woodman, and a lion on the same errand until each received what he already had.",
        yearStarted: 1900,
      },
      {
        name: "Curiosity",
        description: "Asked the obvious questions the Emerald City preferred not to hear.",
        yearStarted: 1900,
      },
      {
        name: "Logistics",
        description:
          "Followed the Road of Yellow Brick as a project plan: city, wizard, witch, home.",
        yearStarted: 1900,
      },
    ],
    companies: [
      {
        name: "The journey to the Emerald City",
        description:
          "Munchkin Country to the gates, then the Wizard's tasks and the discovery that the Wizard was a balloonist from Omaha.",
        location: "Land of Oz",
        startDate: "1900-01-01",
        endDate: "1900-12-01",
        positions: [
          {
            title: "Companion on the Road of Yellow Brick",
            startDate: "1900-01-01",
            endDate: "1900-12-01",
            projects: [
              {
                name: "The Wicked Witch of the West",
                description:
                  "Melting was accidental water, not a production number. The broom was the Wizard's price; the shoes were the way home.",
                skills: ["Survival", "Leadership", "Logistics"],
              },
              {
                name: "The silver shoes",
                description:
                  "Baum's shoes are silver. Three clicks and Kansas. The cyclone had been the hard part.",
                skills: ["Curiosity", "Farm Work", "Survival"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "The Wonderful Wizard of Oz (1900)",
        description:
          "<p>Baum's first Oz novel, public domain. Silver shoes, a humbug wizard, and a prairie girl — not the later musical's interpolations.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/55" }],
        skills: ["Leadership", "Survival", "Logistics"],
      },
    ],
  }),

  defineCharacter({
    slug: "alice",
    name: "Alice",
    title: "Explorer of Wonderland",
    location: "Oxford / Wonderland",
    siteDescription:
      "A reasonable child who fell down a rabbit-hole and tried to apply schoolroom logic to a country that refused it. Carroll's Alice of 1865, not later films.",
    affiliation: "hero",
    died: 1865,
    education: [
      {
        school: "Victorian nursery and schoolroom",
        degree: "French, manners, and recitation",
        dateAwarded: "1864-06-01",
      },
    ],
    certifications: [],
    skills: [
      {
        name: "Curiosity",
        description:
          "Followed a waistcoated rabbit without a plan and kept going when the rooms shrank.",
        yearStarted: 1865,
      },
      {
        name: "Logic",
        description: "Tried syllogisms on caterpillars, queens, and a cat that vanished to a grin.",
        yearStarted: 1865,
      },
      {
        name: "Debate",
        description: "Corrected everyone. Almost no one stayed corrected.",
        yearStarted: 1865,
      },
      {
        name: "Languages",
        description: "Recited school verses that came out wrong in the new air.",
        yearStarted: 1864,
      },
      {
        name: "Survival",
        description: "Ate, drank, and grew until the house and the courtroom would not hold her.",
        yearStarted: 1865,
      },
    ],
    companies: [
      {
        name: "Wonderland",
        description:
          "A riverbank sleep that became a country of cards, pepper, and trials without evidence.",
        location: "Down the rabbit-hole",
        startDate: "1865-07-04",
        endDate: "1865-07-04",
        positions: [
          {
            title: "Uninvited guest",
            startDate: "1865-07-04",
            endDate: "1865-07-04",
            projects: [
              {
                name: "The caucus-race and the tea",
                description:
                  "Met animals who held meetings that did not move and a tea-party that did not end.",
                skills: ["Curiosity", "Logic", "Debate"],
              },
              {
                name: "The Queen of Hearts's court",
                description:
                  "A trial about tarts. Alice grew large enough to call the process nonsense and woke on the bank.",
                skills: ["Survival", "Languages", "Logic"],
              },
            ],
          },
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Alice's Adventures in Wonderland (1865)",
        description:
          "<p>Carroll's first Alice book, public domain. The looking-glass sequel is also public domain; this résumé stays with the 1865 fall.</p>",
        links: [{ label: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/11" }],
        skills: ["Curiosity", "Logic", "Debate"],
      },
    ],
  }),
];
