import { titleSuffix } from "@/constants";

import { EditExperience } from "./EditExperience";

export function generateMetadata() {
  return {
    title: `Edit Work Experience ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditExperience />;
}
