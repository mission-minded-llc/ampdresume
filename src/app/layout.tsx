import { GoogleTagManager } from "@next/third-parties/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { parseThemeAppearance, THEME_APPEARANCE_COOKIE_NAME } from "@/lib/themeAppearanceCookie";
import { Layout } from "./components/Layout";
import { ThemeAppearanceProvider } from "./components/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Press Start 2P (SIL Open Font License 1.1) is only used by the retro-80s resume
// theme, so it is not preloaded on every page.
const pressStart2P = localFont({
  src: "./fonts/PressStart2P-Regular.woff2",
  variable: "--font-press-start",
  weight: "400",
  display: "swap",
  preload: false,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialThemeAppearance = parseThemeAppearance(
    cookieStore.get(THEME_APPEARANCE_COOKIE_NAME)?.value,
  );

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable}`}
      style={{ colorScheme: initialThemeAppearance ?? "light" }}
    >
      <head>
        {process.env?.GTM_ID ? <GoogleTagManager gtmId={process.env.GTM_ID} /> : null}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/images/ampd-resume-favicon.png" />
      </head>
      <body className={geistSans.className}>
        <ThemeAppearanceProvider initialThemeAppearance={initialThemeAppearance}>
          <Layout>{children}</Layout>
        </ThemeAppearanceProvider>
      </body>
    </html>
  );
}
