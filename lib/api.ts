import fs from "fs";
import path from "path";

import matter from "gray-matter";

type Post = {
  title: string;
  excerpt: string;
  slug: string;
  author: {
    name: string;
  };
  content: string;
};

const root = path.join(process.cwd(), "contents");

export function extractSlug(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

export function getPosts(): Post[] {
  const files = fs.readdirSync(root, "utf-8");

  const posts = files
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => {
      const slug = extractSlug(fn);
      const path = `${root}/${fn}`;
      const raw = fs.readFileSync(path, "utf-8");
      const { data, content } = matter(raw);
      return {
        ...data,
        slug: slug,
        content: content,
      } as Post;
    });

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const path = `${root}/${slug}.mdx`;
  if (!fs.existsSync(path)) return null;
  const raw = fs.readFileSync(path, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...data,
    slug: slug,
    content: content,
  } as Post;
}
