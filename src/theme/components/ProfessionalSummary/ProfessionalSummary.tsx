import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { User } from "@/types";
import { getProfessionalSummaryTitle, hasRichTextContent } from "@/lib/professionalSummary";

export const ProfessionalSummary = ({ user }: { user: User }) => {
  if (!hasRichTextContent(user.summary)) {
    return null;
  }

  return (
    <>
      <ResumeTitle>{getProfessionalSummaryTitle(user.summaryTitle)}</ResumeTitle>
      <RichTextBlock content={user.summary ?? null} />
    </>
  );
};
