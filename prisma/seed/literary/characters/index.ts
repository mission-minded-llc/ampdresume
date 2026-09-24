import type { LiteraryCharacter } from "../types";
import { popularCharacters } from "./popular";

/** Slugs previously seeded as literary demos. Re-running the seed deletes these users. */
export const RETIRED_LITERARY_SLUGS = [
  "john-watson",
  "irene-adler",
  "james-moriarty",
  "arsene-lupin",
  "sam-spade",
  "john-thorndyke",
  "jonathan-harker",
  "portia",
  "victor-frankenstein",
  "the-creature",
  "henry-jekyll",
  "griffin",
  "moreau",
  "abraham-van-helsing",
  "captain-nemo",
  "cyrus-smith",
  "phileas-fogg",
  "edmond-dantes",
  "jean-valjean",
  "javert",
  "dartagnan",
  "milady-de-winter",
  "george-challenger",
  "captain-ahab",
  "long-john-silver",
  "cyrano-de-bergerac",
  "time-traveller",
  "sheriff-of-nottingham",
  "odysseus",
  "penelope",
  "scheherazade",
  "dorothy-gale",
] as const;

export const literaryCharacters: LiteraryCharacter[] = popularCharacters;
