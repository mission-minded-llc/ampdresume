import NextLink from "next/link";
import { SxProps, Theme } from "@mui/material";
import Link from "@mui/material/Link";

export const MuiLink = ({
  children,
  href,
  target = "_self",
  sx,
}: {
  children: React.ReactNode;
  href: string;
  target?: "_self" | "_blank";
  sx?: SxProps<Theme>;
}) => (
  <Link href={href} component={NextLink} target={target} sx={sx}>
    {children}
  </Link>
);
