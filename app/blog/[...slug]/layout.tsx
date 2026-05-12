import { SectionContainer } from "@/app/_components/SectionContainer";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SectionContainer mono noAnimation>
        <h2 className={styles.header}>
          <span>Blogs</span>
        </h2>
      </SectionContainer>

      <SectionContainer bordered>
        <article className={styles.blogPost}>{children}</article>
      </SectionContainer>
    </>
  );
}
