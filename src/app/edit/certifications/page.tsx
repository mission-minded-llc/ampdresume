import { titleSuffix } from "@/constants";
import { EditCertifications } from "./EditCertifications";

export function generateMetadata() {
  return {
    title: `Edit Certifications ${titleSuffix}`,
  };
}

export default function Page() {
  return <EditCertifications />;
}
