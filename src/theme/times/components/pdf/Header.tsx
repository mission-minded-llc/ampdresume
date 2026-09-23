import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { User } from "@/types";
import { timesPdfLayout } from "../../pdfLayout";

const contactParts = (user: User) => {
  const parts: ReactNode[] = [];

  if (user.location) {
    parts.push(user.location);
  }

  if (user.displayEmail) {
    parts.push(
      <a key="email" href={`mailto:${user.displayEmail}`}>
        {user.displayEmail}
      </a>,
    );
  }

  return parts;
};

export const Header = ({ user }: { user: User }) => {
  const parts = contactParts(user);
  const { fontSize, ink } = timesPdfLayout;

  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        sx={{
          mt: 0,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.04em",
          lineHeight: 1.2,
          color: ink,
        }}
      >
        {user.name}
      </Typography>
      {parts.length > 0 ? (
        <Typography sx={{ mt: 0.5, fontSize: fontSize.body, color: ink }}>
          {parts.map((part, index) => (
            <span key={index}>
              {index > 0 ? <span style={{ padding: "0 0.4em" }}>{"\u00b7"}</span> : null}
              {part}
            </span>
          ))}
        </Typography>
      ) : null}
      {user.title ? (
        <Typography
          sx={{
            mt: 0.75,
            fontSize: fontSize.subtitle,
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "0.01em",
            color: ink,
          }}
        >
          {user.title}
        </Typography>
      ) : null}
      <Box
        sx={{
          mt: 1.25,
          borderTop: `1px solid ${ink}`,
          borderBottom: `2px solid ${ink}`,
          height: 4,
        }}
      />
    </Box>
  );
};
