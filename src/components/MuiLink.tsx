import Link from "@mui/material/Link";
import NextLink from "next/link";

export const MuiLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Link href={href} component={NextLink}>
    {children}
  </Link>
);
