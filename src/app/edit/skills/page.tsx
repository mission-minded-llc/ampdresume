import { EditPageLayout } from "../components/EditPageLayout";
import { EditSkills } from "./EditSkills";

export function generateMetadata() {
  return {
    title: "Edit Skills | OpenResume",
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditSkills />
    </EditPageLayout>
  );
}
