import { Box, useTheme } from "@mui/material";
import { Certification } from "@/types";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const theme = useTheme();

  return (
    <Box data-testid="certifications-section">
      {certifications.map((cert) => (
        <Box
          key={cert.id}
          sx={{
            mb: 3,
            pl: 1.5,
            borderLeft: `3px solid ${theme.palette.mode === "dark" ? "#60a5fa" : "#0d47a1"}`,
          }}
        >
          <Box component="h3" sx={{ fontWeight: 750, mb: 0.5, letterSpacing: "-0.02em" }}>
            {cert.name}
          </Box>
          <Box sx={{ mb: 0.5 }}>
            {cert.issuer}
            {cert.dateAwarded &&
              ` – ${new Date(Number(cert.dateAwarded)).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })}`}
          </Box>
          {cert.credentialUrl && (
            <Box>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                }}
              >
                View Credential
              </a>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
