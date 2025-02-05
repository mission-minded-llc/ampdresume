import { EditPageLayout } from "../components/EditPageLayout";
import { EditSkills } from "./EditSkills";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Edit Skills ${titleSuffix}`,
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditSkills />
    </EditPageLayout>
  );
}
