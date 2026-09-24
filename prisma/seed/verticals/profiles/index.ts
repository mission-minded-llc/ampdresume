import type { VerticalProfile } from "../types";
import { civicProfiles } from "./civic";
import { infrastructureProfiles } from "./infrastructure";
import { knowledgeProfiles } from "./knowledge";
import { operationsProfiles } from "./operations";
import { regulatedProfiles } from "./regulated";

export const verticalProfiles: VerticalProfile[] = [
  ...knowledgeProfiles,
  ...regulatedProfiles,
  ...infrastructureProfiles,
  ...operationsProfiles,
  ...civicProfiles,
];
