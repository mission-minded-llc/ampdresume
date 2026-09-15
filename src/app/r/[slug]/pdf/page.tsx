import { Metadata } from "next";
import { notFound } from "next/navigation";
import { titleSuffix } from "@/constants";
import { getResume } from "@/graphql/getResume";
import { getUser } from "@/graphql/getUser";
import { getSession } from "@/lib/auth";
import { withOwnerDisplayEmail } from "@/lib/withOwnerDisplayEmail";
import { PDFView } from "./PDFView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUser(slug);

  const siteTitleDefault =
    user?.name && user?.title
      ? `Resume of ${user.name}, ${user.title} ${titleSuffix}`
      : `Resume PDF ${titleSuffix}`;

  const title = user?.siteTitle ? user.siteTitle : siteTitleDefault;
  const description = user?.siteDescription ? user.siteDescription : "";

  return {
    title,
    description,
    authors: [
      {
        name: user?.name ? user.name : "Amp'd Resume",
      },
    ],
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [resume, session] = await Promise.all([getResume(slug), getSession()]);

  if (!resume) notFound();

  const { skillsForUser, companies, education, certifications, featuredProjects } = resume;
  const user = await withOwnerDisplayEmail(resume.user, session);

  return (
    <PDFView
      user={user}
      skillsForUser={skillsForUser}
      companies={companies}
      education={education}
      certifications={certifications}
      featuredProjects={featuredProjects}
    />
  );
}
