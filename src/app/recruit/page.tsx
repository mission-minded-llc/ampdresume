import { redirect } from "next/navigation";
import { titleSuffix } from "@/constants";
import { getSession } from "@/lib/auth";
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

  const profile = await prisma.recruiterProfile.findUnique({
    where: { userId: session.user.id },
    select: { companyName: true, title: true },
  });

  return <RecruiterWorkspace profile={profile} />;
}
