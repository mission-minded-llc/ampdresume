import { Typography } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { User } from "@/types";
import { getProfessionalSummaryTitle, hasRichTextContent } from "@/lib/professionalSummary";
import { Section, SectionTitle, fontSize } from "./styled";

export const ProfessionalSummary = ({ user }: { user: User }) => {
  if (!hasRichTextContent(user.summary)) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>{getProfessionalSummaryTitle(user.summaryTitle)}</SectionTitle>
      <Typography component="div" sx={{ fontSize: fontSize.body }}>
        <RichTextBlock content={user.summary ?? null} />
      </Typography>
    </Section>
  );
};
