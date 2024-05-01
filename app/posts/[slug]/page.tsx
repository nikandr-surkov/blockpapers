import React from "react";

import { notFound } from "next/navigation";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import MDXContent from "@/components/mdx-content";

import { getPostBySlug, getPosts } from "@/lib/api";

import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="flex flex-col mt-16">
      <Link href="/">
        <span className="inline-flex items-center text-sm text-zinc-400">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to posts
        </span>
      </Link>
      <h1 className="text-4xl font-semibold mt-6">{post.title}</h1>
      <p className="text-sm text-zinc-400 mt-2">
        Written by {post.author.name}
      </p>
      <article className="max-w-none prose mt-10 mx-auto">
        <MDXContent source={post.content} />
      </article>
    </div>
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return {
    title: `${post.title} | someblog`,
  };
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
