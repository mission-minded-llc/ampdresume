"use client";

import { useTheme } from "@mui/material/styles";
import Image from "next/image";

/**
 * The theme aware image component for the application. This component
 * is used to display an image that is aware of the theme; e.g., it will
 * display a light-mode-specific image when the theme is light and a
 * dark-mode-specific image when the theme is dark.
 */
export const ThemeAwareImage: React.FC<{
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}> = ({ lightSrc, darkSrc, alt, width = 0, height = 0, sizes = "100vw", style, ariaLabel }) => {
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
