import NextLink from "next/link";
import { SxProps, Theme } from "@mui/material";
import Link from "@mui/material/Link";
import { ComponentPropsWithoutRef } from "react";

export const MuiLink = ({
  children,
  href,
  target = "_self",
  sx,
  "aria-label": ariaLabel,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  target?: "_self" | "_blank";
  sx?: SxProps<Theme>;
  "aria-label"?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "children">) => (
  <Link href={href} component={NextLink} target={target} sx={sx} aria-label={ariaLabel} {...props}>
    {children}
  </Link>
);
