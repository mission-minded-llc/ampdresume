import { Box, Link, Typography } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { Certification } from "@/types";
import { DocketLine } from "./DocketLine";

/**
 * Credentials in the same two-column form as education. Bar admissions and
 * certificates both read as a name, an issuer, and a date.
 *
 * @param certifications Credential records from the resume.
 * @returns The certifications section, or nothing when the list is empty.
 */
export const Certifications = ({ certifications }: { certifications: Certification[] }) => {
  if (!certifications?.length) return null;

  return (
    <Box component="section">
      <ResumeTitle>Certifications</ResumeTitle>
      {certifications.map((cert) => (
        <Box key={cert.id} sx={{ mt: 2 }}>
          <DocketLine
            primary={cert.name}
            trailing={cert.dateAwarded ? formatLongDate(cert.dateAwarded) : undefined}
            emphasize
          />
          {cert.issuer ? (
            <Typography sx={{ fontStyle: "italic", color: "text.secondary" }}>
              {cert.issuer}
            </Typography>
          ) : null}
          {cert.credentialUrl ? (
            <Typography sx={{ mt: 0.5 }}>
              <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                View Credential{cert.credentialId ? ` (${cert.credentialId})` : ""}
              </Link>
            </Typography>
          ) : null}
          {cert.credentialId && !cert.credentialUrl ? (
            <Typography sx={{ mt: 0.5 }}>Credential ID: {cert.credentialId}</Typography>
          ) : null}
        </Box>
      ))}
    </Box>
  );
};
