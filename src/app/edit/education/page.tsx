import { titleSuffix } from "@/constants";
import { EditEducation } from "./EditEducation";

export function generateMetadata() {
  return {
    title: `Edit Education ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditEducation />;
}
