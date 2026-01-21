import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import type { Certification } from "@/types";

export const Certifications = ({ certifications }: { certifications: Certification[] }) => {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        marginTop: "30px",
        "@media screen and (max-width: 600px)": {
          marginTop: "16px",
          paddingTop: 0,
        },
      }}
    >
      <ResumeTitle>Certifications</ResumeTitle>
      {certifications.map((cert) => (
        <Box key={cert.id} sx={{ mb: 2 }}>
          <Typography component="h3" variant="h5">
            {cert.name}
          </Typography>
          <Typography component="h4" variant="h6" sx={{ fontWeight: "bold", mt: 0.5 }}>
            {cert.issuer}
            {cert.dateAwarded && (
              <Typography component="span" variant="h6" sx={{ fontWeight: "normal" }}>
                {" "}
                &mdash; {formatLongDate(cert.dateAwarded)}
              </Typography>
            )}
          </Typography>
          {cert.credentialUrl && (
            <Typography component="p" variant="body2" sx={{ mt: 0.5 }}>
              <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                View Credential{cert.credentialId ? ` (${cert.credentialId})` : ""}
              </Link>
            </Typography>
          )}
          {cert.credentialId && !cert.credentialUrl && (
            <Typography component="p" variant="body2" sx={{ mt: 0.5 }}>
              Credential ID: {cert.credentialId}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};
