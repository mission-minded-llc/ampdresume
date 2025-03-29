import { FeatureFlagProvider } from "./components/FeatureFlagProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import { Layout } from "./components/Layout";
import { ThemeAppearanceProvider } from "./components/ThemeContext";
import flagsmith from "flagsmith/isomorphic";
import localFont from "next/font/local";

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
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID || "",
    // Add optional identity, traits if needed.
  });
  const serverState = flagsmith.getState();

  return (
    <html lang="en">
      <head>
        {process.env?.GTM_ID ? <GoogleTagManager gtmId={process.env.GTM_ID} /> : null}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FeatureFlagProvider serverState={serverState}>
          <ThemeAppearanceProvider>
            <Layout>{children}</Layout>
          </ThemeAppearanceProvider>
        </FeatureFlagProvider>
      </body>
    </html>
  );
}
