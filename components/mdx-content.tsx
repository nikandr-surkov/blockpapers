import React from "react";

import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";

import rehypePrettyCode from "rehype-pretty-code";

import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { Options } from "rehype-pretty-code";
import ReadContractBlock from "./ReadContractBlock";
import WriteContractBlock from "./WriteContractBlock";


export default async function MDXContent({ source }: MDXRemoteProps) {
  const rehypePrettyCodeOptions: Options = {
    defaultLang: {
      block: "plaintext",
      inline: "plaintext",
    },
    theme: "github-light",
  };

  const shortcodes = { ReadContractBlock, WriteContractBlock };
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          // @ts-ignore
          remarkPlugins: [remarkGfm, remarkEmoji],
          // @ts-ignore
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
        },
      }}
      components={shortcodes}
    />
  );
}
