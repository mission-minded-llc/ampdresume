import Link from "@mui/material/Link";
import NextLink from "next/link";

export const MuiLink = ({
  children,
  href,
  target = "_self",
}: {
  children: React.ReactNode;
  href: string;
  target?: "_self" | "_blank";
}) => (
  <Link href={href} component={NextLink} target={target}>
    {children}
  </Link>
);
