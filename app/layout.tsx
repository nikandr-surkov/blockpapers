"use client"

import "@/styles/globals.css";

import React from "react";

import { cn } from "@/lib/utils";
import { geist } from "@/styles/fonts";

import type { Metadata } from "next";

import { TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const MANIFEST_URL = "https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmX52NLktjPJBM4zNepaqQ8c34XHatxWzTSujHvLTZtSr8";

  return (
    <html lang="en">
      <head>
        <title>BlockPapers - Revolutionizing Web3 Content Creation</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <meta name="title" content="BlockPapers - Revolutionizing Web3 Content Creation" />
        <meta name="description" content="Explore BlockPapers, the platform that allows you to mint articles as NFTs and interact with smart contracts seamlessly within your content." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://blockpapers.com/" />
        <meta property="og:title" content="BlockPapers - Revolutionizing Web3 Content Creation" />
        <meta property="og:description" content="Explore BlockPapers, the platform that allows you to mint articles as NFTs and interact with smart contracts seamlessly within your content." />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://blockpapers.com/" />
        <meta property="twitter:title" content="BlockPapers - Revolutionizing Web3 Content Creation" />
        <meta property="twitter:description" content="Explore BlockPapers, the platform that allows you to mint articles as NFTs and interact with smart contracts seamlessly within your content." />

      </head>
      <body className={cn("font-geist antialiased", geist.variable)}>
        <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
          <main className="max-w-3xl px-8 py-6 mx-auto">
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-semibold">BlockPapers</p>
              <TonConnectButton />
            </div>
            {children}
          </main>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
