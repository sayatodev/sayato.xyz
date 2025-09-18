import type { Metadata } from "next";
import "./globals.css";
import { PageContainer } from "./_components/PageContainer";

import styles from "./page.module.css";
import { ConfigProvider } from "./_contexts/Config";
import { Navigation } from "./_components/Navigation";

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
        <ConfigProvider>
          <PageContainer>
            <div className={styles.pageStyler}>
              <Navigation />
              {children}
            </div>
          </PageContainer>
        </ConfigProvider>
      </body>
    </html>
  );
}
