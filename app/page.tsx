import { LinkChip } from "./_components/LinkChip";
import { PageContainer } from "./_components/PageContainer";
import { SectionContainer } from "./_components/SectionContainer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <PageContainer>
      <div className={styles.pageStyler}>
        <SectionContainer mono>
          <h2 className={styles.header}>
            <span>Sayato</span>&nbsp;
            <span className={styles.header_supp}>/ Isaac Ma</span>
          </h2>
        </SectionContainer>
        <SectionContainer mono bordered>
          <pre>README.md</pre>
          <h3># Who am I?</h3>
          <p>
            I am a Secondary 6 student from Hong Kong (class of 2025) with a
            passion for programming. Since 2019, I have been exploring different
            programming languages and tools, and have now developed a variety of
            skills in both front-end and back-end web development. I have always
            been eager to learn more in the world of technology.
          </p>
        </SectionContainer>
        <SectionContainer>
          <h3>Languages / Tools</h3>
          <div className={styles.chipGallery}>
            <LinkChip
              imageUrl="/language_thumbnails/Typescript.svg"
              title="TypeScript"
              description="Writing since 2022"
              color="#397cc6"
              url="https://www.typescriptlang.org/"
            />
            <LinkChip
              imageUrl="/language_thumbnails/html.svg"
              title="HTML/JS/CSS"
              description="Writing since 2020"
              color="#ee6b33"
              url="https://developer.mozilla.org/en-US/docs/Web/HTML"
            />
            <LinkChip
              imageUrl="/language_thumbnails/python.svg"
              title="Python"
              description="Writing since 2021"
              color="#3f82b9"
              url="https://www.python.org/"
            />
            <LinkChip
              imageUrl="/language_thumbnails/react.svg"
              title="React"
              description="Writing since 2022"
              color="#58c4dc"
              url="https://react.dev/"
            />
            <LinkChip
              imageUrl="/language_thumbnails/vue.svg"
              title="VueJS"
              description="With 1-month internship experience"
              color="#3fb27f"
              url="https://vuejs.org/"
            />
          </div>
          <div className={styles.chipGallery}>
            <LinkChip
              small
              title="NextJS"
              description="Writing since 2023"
              color="black"
              url="https://nextjs.org/"
            />
            <LinkChip
              small
              title="PostgreSQL"
              description="Writing since 2022"
              color="#397cc6"
              url="https://www.postgresql.org/"
            />
          </div>
        </SectionContainer>
        <SectionContainer bordered>
          <h3>Active Stack</h3>
          <p>
            Framework: NextJS (React) with TypeScript
            <br />
            Backend: NodeJS with TypeScript
            <br />
            Database: Supabase (PostgreSQL)
          </p>
        </SectionContainer>
        <SectionContainer>
          <h3>Major Projects</h3>
          <LinkChip
            title="Aviameter"
            description={
              "A GPS-based Flight Statistics Tracker.\nDisplays your real-time speed, altitude, vertical speed and more in-flight.\nWorks offline once the service worker is installed."
            }
            color="#fff"
            url="https://github.com/sayatodev/aviameter"
            imageUrl="/project_thumbnails/aviameter.png"
          />
          <LinkChip
            title="Progex"
            description={
              "The All-in-one tool for Calculator Programs.\nWritten in NextJS + TypeScript\nIncludes an interpreter that can interpret calculator syntax (Written in TypeScript)."
            }
            color="#fff"
            url="https://github.com/sayatodev/progex"
          />
          <LinkChip
            title="Siu Ying (Discord Bot)"
            description={
              "A Discord Bot released by SPYC Software Development Club.\nThis bot aims to provide convenience by implementing a chat command (/timetable) to check the school timetable."
            }
            color="#fff"
            url="https://github.com/sayatodev/siu-ying-v2"
          />
          <LinkChip
            title="sayato.xyz"
            description={"This Portfolio Site. Made with NextJS."}
            color="#fff"
            url="https://github.com/sayatodev/sayato.xyz"
          />
        </SectionContainer>
        <SectionContainer mono bordered>
          <pre>INFO.md</pre>
          <h3># More about me</h3>
          <p>
            Besides programming language, I can also speak a few different
            &quot;real langauges&quot;!
            <br />I speak fluent Chinese (Cantonese/Putonghua), English and also
            Japanese (Self-taught, JLPT N2)!
            <br />
            Apart from that, my other interests include music, cycling and
            photographing!
          </p>
        </SectionContainer>
        <SectionContainer>
          <h3>Reach me / Other Links</h3>
          <div className={styles.chipGallery}>
            <LinkChip
              small
              title="Email"
              description="Send me a mail at isaacma.zq@gmail.com"
              color="#397cc6"
              url="mailto:isaacma.zq@gmail.com"
            />
            <LinkChip
              small
              title="GitHub"
              description="Check out my work on GitHub: @sayatodev"
              color="#fff"
              url="https://github.com/sayatodev/"
            />
          </div>
        </SectionContainer>
      </div>
    </PageContainer>
  );
}
