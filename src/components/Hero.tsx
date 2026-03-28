
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HERO_VIDEO_SRC = "/hero-video.webm";
const TEXT_REVEAL_DELAY = 3000; // 3 seconds after hero is ready

export default function Hero({
  isLoading,
  onVideoReady,
}: {
  isLoading: boolean;
  onVideoReady: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  const handleVideoReady = useCallback(() => {
    onVideoReady();

    const playAttempt = videoRef.current?.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  }, [onVideoReady]);

  // Start the 3-second text reveal timer once loading screen is gone
  useEffect(() => {
    if (isLoading || textVisible) return;

    const timer = window.setTimeout(() => {
      setTextVisible(true);
    }, TEXT_REVEAL_DELAY);

    return () => window.clearTimeout(timer);
  }, [isLoading, textVisible]);

  return (
    <section
      className={`hero-stage relative flex min-h-[100svh] w-full items-center justify-start overflow-hidden px-6 pb-16 pt-28 sm:px-8 md:px-16 lg:px-24 ${
        !isLoading ? "hero-stage-ready" : ""
      }${textVisible ? " hero-text-visible" : ""}`}
    >
      <div className="hero-video-shell pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-video h-full w-full object-cover"
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
        >
          <source src={HERO_VIDEO_SRC} type="video/webm" />
        </video>
        <div className="hero-base-overlay absolute inset-0" />
        <div className="hero-left-glow absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-3/5" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] sm:max-w-2xl lg:max-w-[38rem]">
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="hero-reveal hero-reveal-1 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-semibold tracking-[0.35em] text-white">
                BB
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/75 sm:text-sm">
                BiuBiu
              </span>
            </div>

            <p className="hero-reveal hero-reveal-2 font-body text-sm font-medium uppercase tracking-[0.32em] text-white/70">
              Curated Marketplace
            </p>

            <h1 className="hero-reveal hero-reveal-3 text-5xl font-headline font-bold leading-[0.88] sm:text-6xl md:text-7xl xl:text-[7.25rem]">
              <span className="block">BiuBiu</span>
              <span className="block italic text-white/95">Market</span>
            </h1>

            <p className="hero-reveal hero-reveal-4 max-w-md font-body text-base font-light leading-relaxed text-white/82 md:text-[1.15rem]">
              Discover distinctive pre-loved luxury, or list your own with the same calm,
              trusted standard.
            </p>
          </div>

          <div className="hero-reveal hero-reveal-5 flex flex-wrap gap-4 pt-1">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/browse">Browse Listings</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none border-white text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/sell">Sell Product</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
