import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { getLandingPage } from "@/lib/data/landing-pages";
import { landingMetadata } from "@/lib/landing";

export const metadata: Metadata = landingMetadata("ai-development");

export default function AiDevelopmentPage() {
  const content = getLandingPage("ai-development");
  if (!content) notFound();

  return <LandingPage content={content} />;
}
