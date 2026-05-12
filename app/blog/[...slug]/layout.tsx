import { SectionContainer } from "@/app/_components/SectionContainer";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SectionContainer bordered noAnimation>
      <article className={styles.blogPost}>{children}</article>
    </SectionContainer>
  );
}
