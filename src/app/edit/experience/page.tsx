import { EditExperience } from "./EditExperience";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Edit Work Experience ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditExperience />;
}
