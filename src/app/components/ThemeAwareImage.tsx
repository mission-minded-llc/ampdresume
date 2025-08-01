"use client";

import { useTheme } from "@mui/material/styles";
import Image from "next/image";

interface ThemeAwareImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const ThemeAwareImage: React.FC<ThemeAwareImageProps> = ({
  lightSrc,
  darkSrc,
  alt,
  width = 0,
  height = 0,
  sizes = "100vw",
  style,
  ariaLabel,
}) => {
  const theme = useTheme();

  return (
    <Image
      src={theme.palette.mode === "dark" ? darkSrc : lightSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      style={style}
      aria-label={ariaLabel}
    />
  );
};
