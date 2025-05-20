import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
