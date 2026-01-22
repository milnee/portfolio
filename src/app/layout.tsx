import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Millen Singh",
  icons: {
    icon: "/favicon.svg",
  },
  description: "Second-year Computer Science student at Ulster University seeking placement opportunities. Passionate about building web applications with React, Next.js, and TypeScript.",
  keywords: ["Millen Singh", "Software Developer", "Portfolio", "Ulster University", "React", "Next.js", "TypeScript", "Web Developer"],
  authors: [{ name: "Millen Singh" }],
  openGraph: {
    title: "Millen Singh",
    description: "Software Developer · Northern Ireland",
    url: "https://millen.sh",
    siteName: "Millen Singh",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://millen.sh/preview.png",
        width: 1200,
        height: 630,
        alt: "Millen Singh Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Millen Singh",
    description: "Software Developer · Northern Ireland",
    images: ["https://millen.sh/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
