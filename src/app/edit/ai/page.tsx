import { AiAssist } from "./AiAssist";
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
      <p>
        AI Assist is not enabled for your account. To request access, please email{" "}
        <MuiLink href="mailto:mail@ampdresume.com">mail@ampdresume.com</MuiLink>
      </p>
    );
  }

  return <AiAssist />;
}
