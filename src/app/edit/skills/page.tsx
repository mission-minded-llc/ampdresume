import { titleSuffix } from "@/constants";

import { EditSkills } from "./EditSkills";

export function generateMetadata() {
  return {
    title: `Edit Skills ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditSkills />;
}
