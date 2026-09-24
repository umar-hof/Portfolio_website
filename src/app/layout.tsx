import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { Navbar } from "@/components/layout/Navbar";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { getSiteUrl, site } from "@/lib/data/site";
import { allTechnologies } from "@/lib/data/skills";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.brand} — ${site.role}`,
    template: `%s — ${site.brand}`,
  },
  description: site.metaDescription,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Software Engineer specializing in AI",
    "AI developer",
    "freelance AI engineer",
    "RAG systems",
    "LLM applications",
    "AI agents",
    "full-stack developer",
    "Next.js developer",
    "Python developer",
    "automation",
    ...allTechnologies(),
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} — ${site.role}`,
    description: site.metaDescription,
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — ${site.role}`,
    description: site.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="relative flex min-h-dvh flex-col bg-ink-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          Skip to content
        </a>

        <SiteBackground />

        <MotionProvider>
          {/* z-10 keeps all content above the fixed background layer. */}
          <div className="relative z-10 flex min-h-dvh flex-col">
            <Navbar />

            {/* pt-18 clears the fixed header; pages own their own top spacing. */}
            <main id="main" className="flex-1 pt-18">
              {children}
            </main>

            <Footer />
          </div>

          <MobileCta />
        </MotionProvider>

        <Analytics />
      </body>
    </html>
  );
}
