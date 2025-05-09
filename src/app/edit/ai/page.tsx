import { AiAssist } from "./AiAssist";
import { EditPageLayout } from "../components/EditPageLayout";
import { MuiLink } from "@/components/MuiLink";
import { isFeatureEnabledForUser } from "@/lib/featureFlags";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `AI Assist ${titleSuffix}`,
  };
}

export default async function Page() {
  const enabled = await isFeatureEnabledForUser("ai_assist");

  if (!enabled) {
    return (
      <EditPageLayout>
        <p>
          AI Assist is not enabled for your account. To request access, please email{" "}
          <MuiLink href="mailto:mail@openresume.org">mail@openresume.org</MuiLink>
        </p>
      </EditPageLayout>
    );
  }

  return (
    <EditPageLayout>
      <AiAssist />
    </EditPageLayout>
  );
}
