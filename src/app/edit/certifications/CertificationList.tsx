import { Certification } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { addCertification } from "@/graphql/addCertification";
import { CertificationGeneric } from "@/graphql/getCertifications";
import { CertificationForm } from "./CertificationForm";
import { CertificationItem } from "./CertificationItem";

export const CertificationList = ({ certifications }: { certifications: Certification[] }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  const mutation = useMutation({
    mutationFn: async ({
      name,
      issuer,
      dateAwarded,
      credentialUrl,
      credentialId,
    }: {
      name: string;
      issuer: string;
      dateAwarded: string;
      credentialUrl?: string | null;
      credentialId?: string | null;
    }) => {
      if (!session?.user?.id) return;

      await addCertification({
        userId: session.user.id,
        name,
        issuer,
        dateAwarded,
        credentialUrl,
        credentialId,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
  });

  const handleAddCertification = (certification: CertificationGeneric) => {
    mutation.mutate({
      name: certification.name,
      issuer: certification.issuer,
      dateAwarded: certification.dateAwarded,
      credentialUrl: certification.credentialUrl,
      credentialId: certification.credentialId,
    });

    setIsOpen(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {certifications.map((cert) => (
        <CertificationItem
          key={cert.id}
          certification={cert}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}

      {expanded === false ? (
        <>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
              Add Certification
            </Button>
          </Box>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
            <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
              Add New Certification
            </CustomDialogTitle>
            <DialogContent>
              <CertificationForm
                handler={handleAddCertification}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </Box>
  );
};
