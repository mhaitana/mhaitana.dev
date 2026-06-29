import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SkipNav } from "@/components/skip-nav";
import { Analytics } from "@vercel/analytics/react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhaitana.dev"),
  title: {
    default: "Matt Haitana | Senior Software Engineer",
    template: "%s | Matt Haitana",
  },
  description:
    "Senior Software Engineer based in Melbourne, Australia. Experienced in React, Node.js, real-time systems, and scalable frontend platforms.",
  keywords: [
    "Matt Haitana",
    "Senior Software Engineer",
    "Frontend Developer",
    "React",
    "Node.js",
    "Melbourne",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "Matt Haitana", url: "https://github.com/mhaitana" }],
  creator: "Matt Haitana",
  openGraph: {
    title: "Matt Haitana | Senior Software Engineer",
    description:
      "Senior Software Engineer based in Melbourne, Australia. Experienced in React, Node.js, real-time systems, and scalable frontend platforms.",
    type: "website",
    locale: "en_AU",
    url: "https://mhaitana.dev",
    siteName: "Matt Haitana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Haitana | Senior Software Engineer",
    description:
      "Senior Software Engineer based in Melbourne, Australia. Experienced in React, Node.js, real-time systems, and scalable frontend platforms.",
    creator: "@mhaitana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`h-full antialiased ${plusJakartaSans.variable}`}>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          <SkipNav />
          <Navbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
