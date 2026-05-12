import Link from "next/link";
import styles from "@/app/blog/page.module.css";
import { getAllBlogPosts } from "./posts";
import { SectionContainer } from "../_components/SectionContainer";

export default async function Home() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <SectionContainer mono noAnimation>
        <h2 className={styles.header}>
          <span>Blogs</span>
        </h2>
      </SectionContainer>
      <SectionContainer mono>
        {posts.map((post) => {
          const href = `/blog/${post.slug.join("/")}`;
          const title = post.metadata.title ?? post.slug.at(-1) ?? "Untitled";

          return (
            <Link key={href} href={href} className={styles.postCard}>
              <div className={styles.postCardHeader}>
                <h2>{title}</h2>
                {post.metadata.date && (
                  <time dateTime={post.metadata.date}>
                    {post.metadata.date}
                  </time>
                )}
              </div>
              <p className={styles.postPath}>/{post.slug.join("/")}</p>
              {!!post.metadata.tags?.length && (
                <div className={styles.tagRow}>
                  {post.metadata.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </SectionContainer>
    </>
  );
}
