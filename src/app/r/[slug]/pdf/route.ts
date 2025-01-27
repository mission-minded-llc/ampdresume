import * as Sentry from "@sentry/nextjs";

import { Company, getCompanies } from "@/graphql/getCompanies";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { PositionWithProjects, getPositions } from "@/graphql/getPositions";

import { NextResponse } from "next/server";
import { getEducation } from "@/graphql/getEducation";
import { getUser } from "@/graphql/getUser";
import { notFound } from "next/navigation";
import { removeHiddenFields } from "@/util/userData";

type CompanyJson = Omit<Company, "id"> & {
  positions?: PositionWithProjects[];
};

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const user = await getUser(params.slug);

  if (!user) return notFound();

  const companies = (await getCompanies(user.id)) ?? [];
  const positions = (await getPositions(companies.map((company) => company.id))) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  const companiesWithPositions: CompanyJson[] = [];

  let i = 0;
  for (const company of companies) {
    const companyPositions = positions.filter((position) => position.company.id === company.id);
    companiesWithPositions[i++] = { ...company, positions: companyPositions };
  }

  const sanitizedData = removeHiddenFields({ user, experience: companiesWithPositions, education });

  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Set up fonts and content
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();
    const fontSize = 20;

    const name = sanitizedData.user.name ?? "No Name";
    const title = sanitizedData.user.title ?? "No Title";
    const header = `${name} - ${title}`;

    // Add text to the PDF
    page.drawText(header, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="generated-pdf.pdf"',
      },
    });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
