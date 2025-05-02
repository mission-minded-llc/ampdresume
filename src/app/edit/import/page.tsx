import { EditPageLayout } from "../components/EditPageLayout";
import { ImportPDF } from "./ImportPDF";
import { MuiLink } from "@/components/MuiLink";
import { isFeatureEnabledForUser } from "@/lib/flagsmith";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Import PDF ${titleSuffix}`,
  };
}

export default async function Page() {
  const enabled = await isFeatureEnabledForUser("import_pdf_ai");

  if (!enabled) {
    return (
      <EditPageLayout>
        <p>
          Import PDF is not enabled for your account. To request access, please email{" "}
          <MuiLink href="mailto:mail@openresume.org">mail@openresume.org</MuiLink>
        </p>
      </EditPageLayout>
    );
  }

  return (
    <EditPageLayout>
      <ImportPDF />
    </EditPageLayout>
  );
}
