import { SectionContainer } from "@/app/_components/SectionContainer";

import styles from "@/app/blog/page.module.css";

export default function Home() {
  return (
    <>
      <SectionContainer mono>
        <div className={styles.blogListContainer}>
          <pre className={styles.hintText}>
            ┌──(sayato@procrastination101)-[~]
            <br />
            └─$ cat blog-list.txt
            <br />
            cat: blog-list.txt: No such file or directory
            <br />
            ...Stay tuned for future updates!
          </pre>
        </div>
      </SectionContainer>
    </>
  );
}
