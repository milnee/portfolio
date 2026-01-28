import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "millen", template: "%s · millen" },
  description: "computer science student and software developer from northern ireland",
  keywords: ["millen", "software developer", "portfolio", "ulster university", "northern ireland"],
  authors: [{ name: "millen" }],
  creator: "millen",
  metadataBase: new URL("https://millen.sh"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://millen.sh",
    siteName: "millen",
    title: "millen",
    description: "software developer · northern ireland",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "millen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "millen",
    description: "software developer · northern ireland",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
