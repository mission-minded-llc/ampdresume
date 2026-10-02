import { ReactNode } from "react";
import { Box } from "@mui/material";
import { usePdfLayout } from "@/theme/default/components/pdf/pdfLayout";

/**
 * One printed line: the fact on the left, the place or date on the right.
 *
 * @param primary The school, firm, degree, or role.
 * @param trailing Location or date, kept on one line.
 * @param emphasize When true, the primary fact is set in bold as a heading line.
 * @returns The two-column line.
 */
export const DocketLine = ({
  primary,
  trailing,
  emphasize = false,
}: {
  primary: ReactNode;
  trailing?: ReactNode;
  emphasize?: boolean;
}) => {
  const { fontSize, ink } = usePdfLayout();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 2,
        mt: emphasize ? 1 : 0.15,
        color: ink,
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          minWidth: 0,
          fontWeight: emphasize ? 700 : 400,
          fontSize: emphasize ? fontSize.subtitle : fontSize.body,
        }}
      >
        {primary}
      </Box>
      {trailing ? (
        <Box
          sx={{
            flex: "0 0 auto",
            textAlign: "right",
            fontSize: fontSize.body,
            whiteSpace: "nowrap",
          }}
        >
          {trailing}
        </Box>
      ) : null}
    </Box>
  );
};
