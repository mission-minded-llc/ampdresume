import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { MuiLink } from "@/components/MuiLink";
import { titleSuffix } from "@/constants";
import { SectionTitle } from "@/app/edit/components/SectionTitle";
import { getSession } from "@/lib/auth";
import { isFeatureEnabledForUser } from "@/lib/featureFlags";
import { prisma } from "@/lib/prisma";
import { RecruiterWorkspace } from "./RecruiterWorkspace";

export function generateMetadata() {
  return {
    title: `Recruiter ${titleSuffix}`,
  };
}

export default async function RecruitPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/recruit");
  }

  const enabled = await isFeatureEnabledForUser("recruiter_beta");

  if (!enabled) {
    return (
      <Box sx={{ py: 2 }}>
        <SectionTitle title="Recruiter" />
        <Typography component="p">
          Recruiter search is not enabled for your account. To request access, email{" "}
          <MuiLink href="mailto:mail@ampdresume.com">mail@ampdresume.com</MuiLink>.
        </Typography>
      </Box>
    );
  }

  const profile = await prisma.recruiterProfile.findUnique({
    where: { userId: session.user.id },
    select: { companyName: true, title: true },
  });

  return <RecruiterWorkspace profile={profile} />;
}
