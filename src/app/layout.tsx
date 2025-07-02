import { GoogleTagManager } from "@next/third-parties/google";
import { Layout } from "./components/Layout";
import { ThemeAppearanceProvider } from "./components/ThemeContext";
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
  return (
    <html lang="en">
      <head>
        {process.env?.GTM_ID ? <GoogleTagManager gtmId={process.env.GTM_ID} /> : null}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/images/ampd-resume-favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeAppearanceProvider>
          <Layout>{children}</Layout>
        </ThemeAppearanceProvider>
      </body>
    </html>
  );
}
