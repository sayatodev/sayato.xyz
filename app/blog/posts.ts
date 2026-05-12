import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const MARKDOWN_EXTENSION = ".md";

export interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
}

export interface BlogPost {
  content: string;
  metadata: BlogFrontmatter;
  slug: string[];
}

function normalizeMetadata(data: matter.GrayMatterFile<string>["data"]) {
  const tags = Array.isArray(data.tags)
    ? data.tags.filter(
        (tag): tag is string => typeof tag === "string" && tag.length > 0
      )
    : undefined;

  return {
    title: typeof data.title === "string" ? data.title : undefined,
    description:
      typeof data.description === "string" ? data.description : undefined,
    date: typeof data.date === "string" ? data.date : undefined,
    tags,
  } satisfies BlogFrontmatter;
}

async function collectBlogSlugs(dir: string, segments: string[] = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const slugs: { slug: string[] }[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      slugs.push(
        ...(await collectBlogSlugs(path.join(dir, entry.name), [
          ...segments,
          entry.name,
        ]))
      );
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(MARKDOWN_EXTENSION)) {
      continue;
    }

    slugs.push({
      slug: [...segments, entry.name.slice(0, -MARKDOWN_EXTENSION.length)],
    });
  }

  return slugs;
}

export const getAllBlogSlugs = cache(async () => collectBlogSlugs(BLOG_DIR));

const getBlogPostBySlugPath = cache(async (slugPath: string) => {
  const slug = slugPath.split("/").filter(Boolean);
  const source = await readFile(
    path.join(BLOG_DIR, ...slug) + MARKDOWN_EXTENSION,
    "utf8"
  );
  const { content, data } = matter(source);

  return {
    content,
    metadata: normalizeMetadata(data),
    slug,
  } satisfies BlogPost;
});

export async function getBlogPost(slug: string[]) {
  return getBlogPostBySlugPath(slug.join("/"));
}

export const getAllBlogPosts = cache(async () => {
  const slugs = await getAllBlogSlugs();
  const posts = await Promise.all(slugs.map(({ slug }) => getBlogPost(slug)));

  return posts.sort((left, right) => {
    const leftDate = left.metadata.date ?? "";
    const rightDate = right.metadata.date ?? "";

    return rightDate.localeCompare(leftDate);
  });
});
