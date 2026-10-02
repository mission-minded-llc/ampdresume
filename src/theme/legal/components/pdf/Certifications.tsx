import { Box, Link, Typography } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { Section, SectionTitle } from "@/theme/default/components/pdf/styled";
import { Certification } from "@/types";
import { usePdfLayout } from "@/theme/default/components/pdf/pdfLayout";
import { DocketLine } from "./docket";

/**
 * Printed credentials. Each certificate stays with its issuer so the date is not
 * separated from the name.
 *
 * @param certifications Credential records from the resume.
 * @returns The certifications section, or nothing when the list is empty.
 */
export const Certifications = ({ certifications }: { certifications: Certification[] }) => {
  const { fontSize, ink } = usePdfLayout();
  if (!certifications?.length) return null;

  return (
    <Section>
      <SectionTitle>Certifications</SectionTitle>
      {certifications.map((cert) => (
        <Box key={cert.id} data-pdf-unit="" sx={{ mb: 1 }}>
          <DocketLine
            primary={cert.name}
            trailing={cert.dateAwarded ? formatLongDate(cert.dateAwarded) : undefined}
            emphasize
          />
          {cert.issuer ? (
            <Typography sx={{ fontSize: fontSize.body, fontStyle: "italic" }}>
              {cert.issuer}
            </Typography>
          ) : null}
          {cert.credentialUrl ? (
            <Typography sx={{ fontSize: fontSize.body, mt: 0.25 }}>
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: ink }}
              >
                View Credential{cert.credentialId ? ` (${cert.credentialId})` : ""}
              </Link>
            </Typography>
          ) : null}
          {cert.credentialId && !cert.credentialUrl ? (
            <Typography sx={{ fontSize: fontSize.body, mt: 0.25 }}>
              Credential ID: {cert.credentialId}
            </Typography>
          ) : null}
        </Box>
      ))}
    </Section>
  );
};
