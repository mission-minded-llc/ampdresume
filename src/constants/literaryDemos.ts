export type LiteraryDemo = {
  slug: string;
  name: string;
  title: string;
};

export type LiteraryDemoGroup = {
  id: string;
  label: string;
  blurb: string;
  characters: LiteraryDemo[];
};

export const LITERARY_DEMO_GROUPS: LiteraryDemoGroup[] = [
  {
    id: "detectives",
    label: "Detectives",
    blurb: "Consulting rooms, ciphers, and one very polite burglar.",
    characters: [
      { slug: "sherlock-holmes", name: "Sherlock Holmes", title: "Consulting Detective" },
      { slug: "john-watson", name: "John H. Watson", title: "Army Surgeon · Chronicler" },
      { slug: "irene-adler", name: "Irene Adler", title: "Contralto · The Woman" },
      { slug: "james-moriarty", name: "James Moriarty", title: "Consulting Criminal" },
      { slug: "arsene-lupin", name: "Arsène Lupin", title: "Gentleman Burglar" },
      { slug: "sam-spade", name: "Sam Spade", title: "Private Detective" },
      { slug: "john-thorndyke", name: "John Evelyn Thorndyke", title: "Medico-legal Expert" },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    blurb: "A solicitor's file, a Venetian bond, and the letter of the law.",
    characters: [
      { slug: "jonathan-harker", name: "Jonathan Harker", title: "Solicitor of Exeter" },
      { slug: "portia", name: "Portia", title: "Advocate of Belmont" },
    ],
  },
  {
    id: "gothic",
    label: "Gothic",
    blurb: "Laboratories, islands, and the nights that followed.",
    characters: [
      { slug: "victor-frankenstein", name: "Victor Frankenstein", title: "Natural Philosopher" },
      { slug: "the-creature", name: "The Creature", title: "Unnamed · Self-taught" },
      { slug: "henry-jekyll", name: "Henry Jekyll", title: "Physician · Dual identity" },
      { slug: "griffin", name: "Griffin", title: "Invisible Man" },
      { slug: "moreau", name: "Doctor Moreau", title: "Island Physiologist" },
      { slug: "abraham-van-helsing", name: "Abraham Van Helsing", title: "M.D., D.Ph., D.Lit." },
    ],
  },
  {
    id: "adventure",
    label: "Adventure",
    blurb: "Submarines, wagers, prisons, and a white whale.",
    characters: [
      { slug: "captain-nemo", name: "Captain Nemo", title: "Commander of the Nautilus" },
      { slug: "cyrus-smith", name: "Cyrus Smith", title: "Engineer of Lincoln Island" },
      { slug: "phileas-fogg", name: "Phileas Fogg", title: "Gentleman of the Reform Club" },
      { slug: "edmond-dantes", name: "Edmond Dantès", title: "Count of Monte Cristo" },
      { slug: "jean-valjean", name: "Jean Valjean", title: "Monsieur Madeleine" },
      { slug: "javert", name: "Inspector Javert", title: "Inspector of Police" },
      { slug: "dartagnan", name: "d'Artagnan", title: "Gascon Guardsman" },
      { slug: "milady-de-winter", name: "Milady de Winter", title: "Agent of the Cardinal" },
      {
        slug: "george-challenger",
        name: "George Edward Challenger",
        title: "Professor of Zoology",
      },
      { slug: "captain-ahab", name: "Captain Ahab", title: "Master of the Pequod" },
      { slug: "long-john-silver", name: "Long John Silver", title: "Sea-cook · Pirate" },
      { slug: "cyrano-de-bergerac", name: "Cyrano de Bergerac", title: "Cadet · Poet" },
      { slug: "time-traveller", name: "The Time Traveller", title: "Independent Inventor" },
    ],
  },
  {
    id: "folklore",
    label: "Folklore & legend",
    blurb: "Greenwood, Ithaca, Oz, and Wonderland.",
    characters: [
      { slug: "robin-hood", name: "Robin Hood", title: "Outlaw of Sherwood" },
      { slug: "sheriff-of-nottingham", name: "Sheriff of Nottingham", title: "High Sheriff" },
      { slug: "king-arthur", name: "King Arthur", title: "Pendragon" },
      { slug: "odysseus", name: "Odysseus", title: "King of Ithaca" },
      { slug: "penelope", name: "Penelope", title: "Queen of Ithaca" },
      { slug: "scheherazade", name: "Scheherazade", title: "Storyteller" },
      { slug: "dorothy-gale", name: "Dorothy Gale", title: "Traveller from Kansas" },
      { slug: "alice", name: "Alice", title: "Explorer of Wonderland" },
    ],
  },
];
