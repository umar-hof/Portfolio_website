import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { getLandingPage } from "@/lib/data/landing-pages";
import { landingMetadata } from "@/lib/landing";

export const metadata: Metadata = landingMetadata("web-development");

export default function WebDevelopmentPage() {
  const content = getLandingPage("web-development");
  if (!content) notFound();

  return <LandingPage content={content} />;
}
