import { EditExperience } from "./EditExperience";
import { EditPageLayout } from "../components/EditPageLayout";

export function generateMetadata() {
  return {
    title: "Edit Experience",
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditExperience />
    </EditPageLayout>
  );
}
