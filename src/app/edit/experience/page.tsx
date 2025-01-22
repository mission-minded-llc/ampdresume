import { EditExperience } from "./EditExperience";
import { EditPageLayout } from "../components/EditPageLayout";

export function generateMetadata() {
  return {
    title: "Edit Work Experience | OpenResume",
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditExperience />
    </EditPageLayout>
  );
}
