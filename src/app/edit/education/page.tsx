import { EditEducation } from "./EditEducation";
import { EditPageLayout } from "../components/EditPageLayout";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Edit Education ${titleSuffix}`,
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <EditEducation />
    </EditPageLayout>
  );
}
