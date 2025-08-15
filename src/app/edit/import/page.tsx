import { titleSuffix } from "@/constants";
import { ImportPDF } from "./ImportPDF";

export function generateMetadata() {
  return {
    title: `Import PDF ${titleSuffix}`,
  };
}

export default function Page() {
  return <ImportPDF />;
}
