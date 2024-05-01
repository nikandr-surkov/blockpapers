import React from "react";

import Link from "next/link";

import { getPosts } from "@/lib/api";

export default async function Page() {
  const posts = getPosts();

  return (
    <div className="flex flex-col mt-16">
      <div className="flex flex-col space-y-8">
        {!!posts &&
          posts.map((post) => (
            <div key={post.slug} className="mb-4">
              <Link
                className="text-2xl font-medium"
                href={`/posts/${post.slug}`}
              >
                {post.title}
                <p className="text-sm text-zinc-400 mt-2">{post.excerpt}</p>
                <p className="text-sm text-zinc-400 mt-2">
                  Written by {post.author.name}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
