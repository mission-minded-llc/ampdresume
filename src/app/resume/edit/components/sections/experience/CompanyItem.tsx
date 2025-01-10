import { Box, IconButton } from "@mui/material";

import { Company } from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { formatDate } from "@/lib/format";

export const CompanyItem = ({ company }: { company: Company }) => {
  return (
    <Box
      key={company.id}
      sx={{
        mb: 4,
        border: "1px solid #ccc",
        p: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <p>
        <strong>{company.name}&nbsp;-&nbsp;</strong>
        {company?.location ? ` (${company.location}) ` : " "}
        {formatDate(company.startDate.toString())} to{" "}
        {company?.endDate ? formatDate(company.endDate?.toString()) : "present"}
      </p>
      <Box sx={{ display: "flex", gap: 4 }}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        {/* TODO: make delete available only if all positions are removed from company. */}
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
