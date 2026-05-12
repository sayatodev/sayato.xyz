import type { Metadata } from "next";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import styles from "./page.module.css";
import { getAllBlogSlugs, getBlogPost } from "../posts";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const rehypePrettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return (
    <>
      <div className={styles.postMeta}>
        <Link href="/blog" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeft} color="var(--foreground)" />
        </Link>
        {(post.metadata.date || post.metadata.tags?.length) && (
          <>
            {post.metadata.date && (
              <time dateTime={post.metadata.date}>{post.metadata.date}</time>
            )}
            {!!post.metadata.tags?.length && (
              <div className={styles.postTags}>
                {post.metadata.tags.map((tag) => (
                  <span key={tag} className={styles.postTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <MarkdownAsync
        rehypePlugins={[rehypeRaw, [rehypePrettyCode, rehypePrettyCodeOptions]]}
        remarkPlugins={[remarkGfm]}
      >
        {post.content}
      </MarkdownAsync>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await getBlogPost(slug);
  const title = metadata?.title;

  return {
    title: title ? `${title} | Sayato` : "Sayato",
    description: metadata?.description,
    keywords: metadata?.tags,
  };
}

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export const dynamicParams = false;
