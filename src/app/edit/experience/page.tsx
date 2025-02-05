import { EditExperience } from "./EditExperience";
import { EditPageLayout } from "../components/EditPageLayout";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Edit Work Experience ${titleSuffix}`,
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditExperience />
    </EditPageLayout>
  );
}
