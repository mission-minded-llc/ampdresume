import { adventure } from "./adventure";
import { detectives } from "./detectives";
import { folklore } from "./folklore";
import { gothic } from "./gothic";
import type { LiteraryCharacter } from "../types";

export const literaryCharacters: LiteraryCharacter[] = [
  ...detectives,
  ...gothic,
  ...adventure,
  ...folklore,
];
