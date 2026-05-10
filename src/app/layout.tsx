import type { Metadata } from "next";
import Script from "next/script";
import { uiText, defaultLocale } from "@/lib/i18n";
import "zenn-content-css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BF Portal Book",
    template: "%s | BF Portal Book",
  },
  description: uiText[defaultLocale].bookDescription,
  verification: {
    google: "MnTAVU2rjTNXby0Ae3O6a6gnhH6lIkklglwdDAGDIQE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Script
          src="https://embed.zenn.studio/js/listen-embed-event.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
