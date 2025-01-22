import { EditEducation } from "./EditEducation";
import { EditPageLayout } from "../components/EditPageLayout";

export function generateMetadata() {
  return {
    title: "Edit Education | OpenResume",
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditEducation />
    </EditPageLayout>
  );
}
