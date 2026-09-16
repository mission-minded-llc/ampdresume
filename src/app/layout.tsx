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
      className={`${geistSans.variable} ${geistMono.variable}`}
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
