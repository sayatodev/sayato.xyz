import { PageContainer } from "./_components/PageContainer";
import { SectionContainer } from "./_components/SectionContainer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <PageContainer>
      <SectionContainer>
        <h2 className={styles.header}><span>Sayato</span> <span className={styles.header_supp}>/ Isaac Ma</span></h2>
        <p>This page is still under development. Check back later!</p>
      </SectionContainer>
    </PageContainer>
  );
}
