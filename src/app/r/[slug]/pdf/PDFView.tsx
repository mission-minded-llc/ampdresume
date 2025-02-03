"use client";

import { Box, Button } from "@mui/material";

import { Company } from "@/graphql/getCompanies";
import { Education } from "@/graphql/getEducation";
import { PDFViewThemeDefault } from "./pdf-theme";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { User } from "@prisma/client";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUserWithSkill[];
  companies: Company[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
  education: Education[];
}

export const PDFView = ({
  user,
  skillsForUser,
  companies,
  positionsWithSkillsForProjects,
  education,
}: PDFViewProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleGeneratePdf = () => {
    if (!pdfRef.current) return;

    const options = {
      margin: [0.75, 0.75, 0.75, 0.75], // top, right, bottom, left
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf()
      .from(pdfRef.current)
      .set(options)
      .outputPdf("bloburl")
      .then((pdfUrl: string) => {
        window.open(pdfUrl, "_blank");
      });
  };

  return (
    <Box sx={{ color: "#000", pb: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
        <Button onClick={handleGeneratePdf} variant="contained">
          Generate PDF
        </Button>
      </Box>
      <Box
        sx={{
          padding: "0.75in",
          width: "8.5in",
          minHeight: "11in",
          margin: "auto",
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Box ref={pdfRef}>
          <PDFViewThemeDefault
            user={user}
            skillsForUser={skillsForUser}
            companies={companies}
            positionsWithSkillsForProjects={positionsWithSkillsForProjects}
            education={education}
            themeOptions={{ showSkillsInWorkExperience: false }}
          />
        </Box>
      </Box>
    </Box>
  );
};
