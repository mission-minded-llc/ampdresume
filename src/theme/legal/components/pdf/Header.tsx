import { Box, Typography } from "@mui/material";
import { User } from "@/types";
import { letterheadContact } from "../../letterheadContact";
import { LEGAL_PDF_INK } from "../../pdfLayout";
import { OxfordRule } from "../OxfordRule";

/**
 * Centered black-letter letterhead for the printed resume.
 *
 * @param user Profile shown at the top of the page.
 * @returns The PDF letterhead.
 */
export const Header = ({ user }: { user: User }) => {
  const contact = letterheadContact(user);

  return (
    <Box data-pdf-unit="" sx={{ mb: 0.5, textAlign: "center", color: LEGAL_PDF_INK }}>
      <Typography component="div" sx={{ fontSize: 13, lineHeight: 1 }}>
        §
      </Typography>
      <Typography
        component="div"
        sx={{
          mt: 0.75,
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        Curriculum Vitae
      </Typography>
      <Typography
        component="div"
        sx={{
          mt: 0.75,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.14em",
          lineHeight: 1.15,
          textTransform: "uppercase",
        }}
      >
        {user.name}
      </Typography>
      {user.title ? (
        <Typography component="div" sx={{ mt: 0.5, fontSize: 12, fontStyle: "italic" }}>
          {user.title}
        </Typography>
      ) : null}
      {contact.length > 0 ? (
        <Typography component="div" sx={{ mt: 0.4, fontSize: 11 }}>
          {contact.map((part, index) => (
            <span key={index}>
              {index > 0 ? <span style={{ padding: "0 0.45em" }}>{"\u00b7"}</span> : null}
              {part}
            </span>
          ))}
        </Typography>
      ) : null}
      <OxfordRule color={LEGAL_PDF_INK} />
    </Box>
  );
};
