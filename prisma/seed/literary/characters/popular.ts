import { defineCharacter } from "../buildCharacter";

export const popularCharacters = [
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
                name: "Solved the Lauriston Gardens murder from cab tracks, a wedding ring, and a Utah motive",
                description:
                  "Met Watson in 1881 over a Lauriston Gardens murder the Yard had already mishandled. Identified Jefferson Hope from cab tracks, a wedding ring, and a revenge that began in Utah, then let the law take a dying man. The method was the point: observe first, name the man second.",
                skills: ["Observation", "Deduction", "Forensic Chemistry"],
              },
              {
                name: "Published the 1891–1892 cases that made the consulting method public knowledge",
                description:
                  "A Scandal in Bohemia, The Red-Headed League, The Speckled Band, and the rest of the 1891–1892 cases Watson put into print. Irene Adler kept the photograph; the dancing men later proved a cipher is only a language until it is read. Scotland Yard still climbed the stairs after the stories ran.",
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
          "<p>Twelve cases Watson published after the Baker Street years were already famous. The method is on the page: observe, discard the impossible, and do not theorize ahead of the facts. This is the public-domain collection, not a later pastiche.</p>",
        skills: ["Deduction", "Observation", "Investigation"],
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
                name: "Sat a caucus-race and an endless tea that refused to move the meeting forward",
                description:
                  "Met animals who held meetings that did not move and a tea-party that did not end. The Dormouse slept in the sugar, the Hatter asked riddles without answers, and Alice kept applying schoolroom rules to a table that had retired from time. Curiosity got her a seat; logic did not get her a conclusion.",
                skills: ["Curiosity", "Logic", "Debate"],
              },
              {
                name: "Broke up the Queen of Hearts's tart trial by calling the evidence nonsense",
                description:
                  "A trial about tarts, a jury of creatures, and a verdict decided before the witnesses finished. Alice grew large enough to knock the pack of cards into the air, named the process for what it was, and woke on the bank with her sister still reading. Survival here was refusing a court that had already chosen 'off with her head.'",
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
          "<p>Carroll's first Alice book, public domain. The looking-glass sequel is also public domain; this résumé stays with the 1865 fall down the rabbit-hole, not later films or retellings.</p>",
        skills: ["Curiosity", "Logic", "Debate"],
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
                name: "Seated the Round Table, married Guinevere, and sent the fellowship after the Grail",
                description:
                  "Knighted a generation and made the table a public office: no head seat, and still a king. Married Guinevere, kept Lancelot at court, and watched the Grail quest divide the same men the furniture had been meant to equalize. The fellowship held until the private wars began.",
                skills: ["Quest Leadership", "Statecraft", "Leadership"],
              },
              {
                name: "Fought Mordred on Salisbury plain and took the boat to Avalon",
                description:
                  "Camlan was the last field: Mordred opposite, the kingdom already split by rumor and kin. Malory closes with the boat to Avalon, not a studio sequel. Military strategy here was holding a coalition together until the last battle made holding it impossible.",
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
          "<p>Malory's compilation, modernized in public-domain editions. This is the English prose Arthur — sword, table, Grail, and Camlan — not a film franchise.</p>",
        skills: ["Quest Leadership", "Statecraft", "Swordsmanship"],
      },
    ],
  }),

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
                name: "Took the sheriff's tax purse under the oaks and made the guest pay for the feast",
                description:
                  "Ambush, invitation, and a feast the guest paid for. Nottingham's taxes took a detour under the oaks, and the band ate the king's deer afterward as if the forest had always been the treasury. The ballads disagree on the king; they agree the sheriff left lighter.",
                skills: ["Archery", "Outlaw Leadership", "Forestry"],
              },
              {
                name: "Entered Nottingham in borrowed trades, won the prize shot, and left with the story",
                description:
                  "Potter, butcher, or beggar at the gates — whichever coat would pass the sheriff's men. Shot for a prize in the town, took the prize and the story, and was back under the greenwood before the riders knew which path to follow. Disguise got him in; archery got him out famous.",
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
        skills: ["Archery", "Outlaw Leadership", "Forestry"],
      },
    ],
  }),
];
