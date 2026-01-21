import { Certification } from "@/types";
import { useSession } from "next-auth/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCertification } from "@/graphql/deleteCertification";
import { CertificationGeneric } from "@/graphql/getCertifications";
import { updateCertification } from "@/graphql/updateCertification";
import { formatLongDate } from "@/lib/format";
import { AccordionSummaryContent } from "../components/AccordionSummaryContent";
import { CertificationForm } from "./CertificationForm";

export const CertificationItem = ({
  certification,
  expanded,
  setExpanded,
}: {
  certification: Certification;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleExpandClick = () => {
    setExpanded(expanded === certification.id ? false : certification.id);
  };

  const saveMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      issuer,
      dateAwarded,
      credentialUrl,
      credentialId,
    }: {
      id: string;
      name: string;
      issuer: string;
      dateAwarded: string;
      credentialUrl?: string | null;
      credentialId?: string | null;
    }) => {
      if (!session?.user?.id) return;

      await updateCertification({
        id,
        userId: session.user.id,
        name,
        issuer,
        dateAwarded,
        credentialUrl,
        credentialId,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certifications"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deleteCertification({ id, userId });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certifications"] }),
  });

  const handleEditCertification = (certificationGeneric: CertificationGeneric) => {
    certification.name = certificationGeneric.name;
    certification.issuer = certificationGeneric.issuer;
    certification.dateAwarded = certificationGeneric.dateAwarded;
    certification.credentialUrl = certificationGeneric.credentialUrl;
    certification.credentialId = certificationGeneric.credentialId;

    saveMutation.mutate({
      id: certification.id,
      name: certification.name,
      issuer: certification.issuer,
      dateAwarded: certification.dateAwarded,
      credentialUrl: certification.credentialUrl,
      credentialId: certification.credentialId,
    });
  };

  const handleDeleteCertification = (certification: Certification) => {
    if (!session?.user?.id) return;

    deleteMutation.mutate({ userId: session.user.id, id: certification.id });
  };

  return (
    <Accordion expanded={expanded === certification.id} sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
        sx={(theme) => ({
          cursor: "pointer",
          pt: 1,
          pb: 1,
          "&:hover": { backgroundColor: theme.palette.primary.light },
        })}
        data-testid={`certification-accordion-${certification.id}`}
      >
        <div
          style={{
            width: "90%",
            display: expanded === certification.id ? "none" : "flex",
          }}
        >
          <AccordionSummaryContent
            primary={certification.name}
            secondary={certification.issuer}
            dateRange={formatLongDate(certification.dateAwarded)}
          />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <CertificationForm
          certification={certification}
          handler={handleEditCertification}
          deleteHandler={handleDeleteCertification}
        />
      </AccordionDetails>
    </Accordion>
  );
};
