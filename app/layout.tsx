import "./globals.css";

import localFont from "next/font/local";

import { GoogleAnalytics } from '@next/third-parties/google'
import { NavigationProvider } from "@/components/providers/navigation-provider";

const skrappa = localFont({
  src: [
    {
      path: "./fonts/skrappa.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/skrappa-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-skrappa",
  weight: "100 900",
});

const skrappaNarrow = localFont({
  src: "./fonts/skrappa-narrow.woff2",
  variable: "--font-skrappa-narrow",
  weight: "100 900",
});

const skrappaReasonable = localFont({
  src: "./fonts/skrappa-reasonable.woff2",
  variable: "--font-skrappa-reasonable",
  weight: "100 900",
});
const gtPressura = localFont({
  src: "./fonts/gt-pressura.woff2",
  variable: "--font-gt-pressura",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${skrappa.variable} ${skrappaNarrow.variable} ${skrappaReasonable.variable} ${gtPressura.variable} antialiased`}
      >
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
}
