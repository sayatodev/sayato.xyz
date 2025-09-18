import { LinkChip } from "./_components/LinkChip";
import { SectionContainer } from "./_components/SectionContainer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SectionContainer mono noAnimation>
        <h2 className={styles.header}>
          <span>Sayato</span>
          <div className={styles.header_supp}>
            <span className={styles.italics}>aka</span>&nbsp;
            <span>Isaac Ma</span>
          </div>
        </h2>
      </SectionContainer>
      <SectionContainer mono bordered coloured>
        <pre>README.md</pre>
        <h3># Who am I?</h3>
        <p>
          I am currently a Year 1 student at the Hong Kong University of Science
          and Technology. With a profound passion for programming, I have been
          exploring different programming languages and tools since 2019, and
          have now developed a variety of skills in both front-end and back-end
          web development. I have always been eager to learn more in the world
          of technology.
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
            title="Vue.js"
            description="With 1-month internship experience"
            color="#3fb27f"
            url="https://vuejs.org/"
          />
        </div>
        <div className={styles.chipGallery}>
          <LinkChip
            small
            title="Next.js"
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
          <LinkChip
            small
            title="Unity C#"
            description="With 2-month internship experience"
            color="#000000"
            url="https://unity.com/"
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
          url="https://aviameter.sayato.xyz/"
          imageUrl="/project_thumbnails/aviameter.png"
        />
        <LinkChip
          title="Progex"
          description={
            "The All-in-one tool for Calculator Programs.\nWritten in NextJS + TypeScript\nIncludes an interpreter that can interpret calculator syntax (Written in TypeScript)."
          }
          color="#fff"
          url="https://progex.sayato.xyz/"
        />
        <LinkChip
          title="Siu Ying (Discord Bot)"
          description={
            "A Discord Bot released by SPYC Software Development Club.\nThis bot aims to provide convenience by implementing a chat command (/timetable) to check the school timetable."
          }
          color="#fff"
          url="https://github.com/sayatodev/siu-ying-v2"
          imageUrl="/project_thumbnails/siuying.png"
          cropImage
        />
        <LinkChip
          title="sayato.xyz"
          description={"This Portfolio Site. Made with NextJS."}
          color="#fff"
          url="https://github.com/sayatodev/sayato.xyz"
        />
      </SectionContainer>
      <SectionContainer mono bordered coloured>
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
          <LinkChip
            small
            title="LinkedIn"
            description="Check out my profile on LinkedIn"
            color="#0274b3"
            url="linkedin.com/in/zheng-qing-ma-607051310"
          />
        </div>
      </SectionContainer>
    </>
  );
}
