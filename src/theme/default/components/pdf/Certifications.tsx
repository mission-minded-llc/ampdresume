import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { Certification } from "@/types";
import { usePdfLayout } from "./pdfLayout";
import { Section, SectionTitle } from "./styled";

export const Certifications = ({ certifications }: { certifications: Certification[] }) => {
  const { fontSize, ink } = usePdfLayout();
  if (!certifications || certifications.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Certifications</SectionTitle>
      {certifications.map((cert) => (
        <Box key={cert.id} data-pdf-unit="">
          <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", mt: 1 }}>
            {cert.name}
          </Typography>
          <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", mt: 0.5 }}>
            {cert.issuer}
            {cert.dateAwarded && (
              <Typography
                component="span"
                sx={{ fontSize: fontSize.subtitle, fontWeight: "normal" }}
              >
                {" "}
                &mdash; {formatLongDate(cert.dateAwarded)}
              </Typography>
            )}
          </Typography>
          {cert.credentialUrl && (
            <Typography sx={{ fontSize: fontSize.body, mt: 0.5 }}>
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: ink }}
              >
                View Credential{cert.credentialId ? ` (${cert.credentialId})` : ""}
              </Link>
            </Typography>
          )}
          {cert.credentialId && !cert.credentialUrl && (
            <Typography sx={{ fontSize: fontSize.body, mt: 0.5 }}>
              Credential ID: {cert.credentialId}
            </Typography>
          )}
        </Box>
      ))}
    </Section>
  );
};
