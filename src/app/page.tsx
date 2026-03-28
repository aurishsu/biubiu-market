
"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { BrandStory, OperatingModel, TrustSafety, FAQSection, ContactUs } from "@/components/Sections";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    if (heroReady) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      setHeroReady(true);
    }, 3200);

    return () => window.clearTimeout(fallbackTimer);
  }, [heroReady]);

  return (
    <div className="relative min-h-screen">
      {loading ? (
        <LoadingScreen isReady={heroReady} onComplete={() => setLoading(false)} />
      ) : null}

      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[1000] rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Skip to content
      </a>

      <Navigation />

      <main
        id="main-content"
        tabIndex={-1}
        aria-busy={loading}
        className="focus:outline-none"
      >
        <Hero isLoading={loading} onVideoReady={() => setHeroReady(true)} />

        <ParallaxSection speed={0.2}>
          <BrandStory />
        </ParallaxSection>

        <ParallaxSection speed={-0.12}>
          <OperatingModel />
        </ParallaxSection>

        <ParallaxSection speed={0.14} className="bg-secondary/10">
          <TrustSafety />
        </ParallaxSection>

        <ParallaxSection speed={-0.08}>
          <FAQSection />
        </ParallaxSection>

        <ParallaxSection speed={0.1}>
          <ContactUs />
        </ParallaxSection>
      </main>

      <Footer />
    </div>
  );
}
