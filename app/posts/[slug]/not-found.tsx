import React from "react";

import Link from "next/link";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <div className="flex flex-col mt-16">
      <Link href="/">
        <span className="inline-flex items-center text-sm text-zinc-400">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to posts
        </span>
      </Link>
      <h1 className="text-4xl font-semibold mt-6">Post not found</h1>
      <p className="text-sm text-zinc-400 mt-2">
        The post you are looking for does not exist.
      </p>
    </div>
  )
}
