import { EditEducation } from "./EditEducation";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Edit Education ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditEducation />;
}
