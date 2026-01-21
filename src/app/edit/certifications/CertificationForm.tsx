import { Certification } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CertificationGeneric } from "@/graphql/getCertifications";
import { formatLongDate, timestampToDate } from "@/lib/format";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";

export const CertificationForm = ({
  certification,
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  certification?: Certification | null;
  handler: (certification: CertificationGeneric | Certification) => void;
  deleteHandler?: ((certification: Certification) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const [name, setName] = useState(certification?.name || "");
  const [issuer, setIssuer] = useState(certification?.issuer || "");
  const [dateAwarded, setDateAwarded] = useState<Dayjs | null>(
    dayjs(timestampToDate(certification?.dateAwarded)),
  );
  const [credentialUrl, setCredentialUrl] = useState(certification?.credentialUrl || "");
  const [credentialId, setCredentialId] = useState(certification?.credentialId || "");

  const saveHandler = () => {
    handler({
      name,
      issuer,
      dateAwarded: dateAwarded?.toString() || "",
      credentialUrl: credentialUrl || null,
      credentialId: credentialId || null,
    });
  };

  const isChanged =
    name !== certification?.name ||
    issuer !== certification?.issuer ||
    formatLongDate(dateAwarded) !== formatLongDate(certification?.dateAwarded) ||
    credentialUrl !== (certification?.credentialUrl || "") ||
    credentialId !== (certification?.credentialId || "");

  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Certification Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Issuing Organization"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          required
        />
      </Box>
      <Box
        sx={{
          mb: 2,
          mt: { xs: 3, sm: 0 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <DatePicker
          label="Date Awarded"
          value={dateAwarded}
          onChange={(newValue) => setDateAwarded(newValue)}
          views={["month", "year"]}
        />
      </Box>
      <Box
        sx={{
          mb: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Credential URL (optional)"
          value={credentialUrl}
          onChange={(e) => setCredentialUrl(e.target.value)}
          placeholder="https://..."
        />
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Credential ID (optional)"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          placeholder="ABC-123-XYZ"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
          mt: 2,
        }}
      >
        {certification && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Certification"
            onConfirmDelete={() => deleteHandler(certification)}
            dialogMessage="Are you sure you want to delete this certification? (No undo!)"
          />
        )}
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={saveHandler}
          disabled={!isChanged || !name.trim() || !issuer.trim() || !dateAwarded?.isValid()}
        >
          Save Certification
        </Button>
      </Box>
    </>
  );
};
