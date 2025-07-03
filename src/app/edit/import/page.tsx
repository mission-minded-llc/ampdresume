import { ImportPDF } from "./ImportPDF";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Import PDF ${titleSuffix}`,
  };
}

export default function Page() {
  return <ImportPDF />;
}
