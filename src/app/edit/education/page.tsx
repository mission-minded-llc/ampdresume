import { EditEducation } from "./EditEducation";
import { EditPageLayout } from "../components/EditPageLayout";

export function generateMetadata() {
  return {
    title: "Edit Education",
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditEducation />
    </EditPageLayout>
  );
}
