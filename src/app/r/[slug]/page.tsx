import { Metadata } from "next";
import { ResumeView } from "./ResumeView";
import { getResume } from "@/graphql/getResume";
import { getSession } from "@/lib/auth";
import { getUser } from "@/graphql/getUser";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUser(slug);

  const siteTitleDefault =
    user?.name && user?.title ? `Resume of ${user.name}, ${user.title}` : "Amp'd Resume";

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
      images: user?.siteImage
        ? [
            {
              url: user.siteImage,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resume = await getResume(slug);
  const session = await getSession();

  if (!resume) notFound();

  const { user, socials, skillsForUser, companies, education } = resume;

  return (
    <ResumeView
      session={session}
      slug={slug}
      user={user}
      socials={socials}
      skillsForUser={skillsForUser}
      companies={companies}
      education={education}
    />
  );
}
