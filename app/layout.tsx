import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code();

export const metadata: Metadata = {
  title: "Sayato",
  description: "Portfolio of Sayato",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.className}`}>
        {children}
      </body>
    </html>
  );
}
