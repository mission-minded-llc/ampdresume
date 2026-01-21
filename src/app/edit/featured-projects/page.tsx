import { titleSuffix } from "@/constants";
import { EditFeaturedProjects } from "./EditFeaturedProjects";

export function generateMetadata() {
  return {
    title: `Edit Featured Projects ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditFeaturedProjects />;
}
