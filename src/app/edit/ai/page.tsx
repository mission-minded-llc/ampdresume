import { AiAssist } from "./AiAssist";
import { EditPageLayout } from "../components/EditPageLayout";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `AI Assist ${titleSuffix}`,
  };
}

export default function Page() {
  return (
    <EditPageLayout>
      <AiAssist />
    </EditPageLayout>
  );
}
