import React from "react";
import { Typography, Link } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { Certification } from "@/types";
import { Section, SectionTitle } from "./styled";

export const Certifications = ({ certifications }: { certifications: Certification[] }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Certifications</SectionTitle>
      {certifications.map((cert) => (
        <React.Fragment key={cert.id}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}>{cert.name}</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 0.5 }}>
            {cert.issuer}
            {cert.dateAwarded && (
              <Typography component="span" sx={{ fontSize: 14, fontWeight: "normal" }}>
                {" "}
                &mdash; {formatLongDate(cert.dateAwarded)}
              </Typography>
            )}
          </Typography>
          {cert.credentialUrl && (
            <Typography sx={{ fontSize: 12, mt: 0.5 }}>
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#000" }}
              >
                View Credential{cert.credentialId ? ` (${cert.credentialId})` : ""}
              </Link>
            </Typography>
          )}
          {cert.credentialId && !cert.credentialUrl && (
            <Typography sx={{ fontSize: 12, mt: 0.5 }}>
              Credential ID: {cert.credentialId}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Section>
  );
};
