import type { Metadata } from "next";
import Script from "next/script";
import "zenn-content-css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BF Portal Book",
    template: "%s | BF Portal Book",
  },
  description: "Zenn記法のMarkdownから生成する静的Web書籍サイトです。",
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
