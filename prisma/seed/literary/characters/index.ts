import { adventure } from "./adventure";
import { detectives } from "./detectives";
import { folklore } from "./folklore";
import { gothic } from "./gothic";
import { legal } from "./legal";
import type { LiteraryCharacter } from "../types";

export const literaryCharacters: LiteraryCharacter[] = [
  ...detectives,
  ...legal,
  ...gothic,
  ...adventure,
  ...folklore,
];
