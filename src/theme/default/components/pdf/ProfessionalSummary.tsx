import { Typography } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { User } from "@/types";
import { getProfessionalSummaryTitle } from "@/lib/professionalSummary";
import { hasRichTextContent } from "@/lib/richText";
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
