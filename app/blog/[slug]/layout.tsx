import styles from "./page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.blogContainer}>{children}</div>;
}
