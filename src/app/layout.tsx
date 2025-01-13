import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Card Game",
    "Party Game",
    "Team Fun",
    "React",
    "Typescript",
    "Vercel AI SDK",
    "Interactive Games",
    "Microinteractions",
    "Vibrant Design",
    "AI"
  ],
  authors: [
    {
      name: "Niklas Bognar",
      url: "https://bognar.co.uk",
    },
  ],
  creator: "Niklas Bognar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - A Fun and Engaging Card Game`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@nikibgnr",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-grafien bg-background antialiased`}
      >
        <Analytics />
        <main className="">
          {children}
        </main>
      </body>
    </html>
  )
}