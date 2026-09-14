import type { Metadata } from "next";
import {Sora,Inter } from "next/font/google";

import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600","700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maternal Health App",
  description:
    "A pregnancy companion built around real pain points from Nigerian mothers — reassurance, plain-language guidance, and cost transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
       <body className="min-h-full">{children}</body>
    </html>
  );
}