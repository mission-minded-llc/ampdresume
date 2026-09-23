import { Metadata } from "next";
import { notFound } from "next/navigation";
import { titleSuffix } from "@/constants";
import { getPdfThemeDefinition, isPdfThemeName, themeDefinitions } from "@/theme";
import { PDFView } from "../PDFView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ themeName: string }>;
}): Promise<Metadata> {
  const { themeName } = await params;
  const pdfTheme = getPdfThemeDefinition(themeName);

  const title = `PDF Theme: ${pdfTheme.name} ${titleSuffix}`;
  const description = pdfTheme.description;
  const authors = pdfTheme.authors;

  return {
    title,
    description,
    authors: authors.map((author) => ({
      name: author.name,
      url: author.gitHubUrl || author.linkedInUrl || "",
    })),
    openGraph: {
      title,
      description,
      images: [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ themeName: string }> }) {
  const { themeName } = await params;

  // Nested demo PDF URLs stay under the web theme path so "View PDF" links keep working.
  // Unknown web themes 404; known web themes without a matching PDF view fall back in PDFView.
  if (!(themeName in themeDefinitions) && !isPdfThemeName(themeName)) {
    return notFound();
  }

  return <PDFView themeName={themeName} />;
}
