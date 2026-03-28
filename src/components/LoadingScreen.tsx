
"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function LoadingScreen({
  isReady,
  onComplete,
}: {
  isReady: boolean;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finishLoading = (delay: number) => {
      if (hasCompletedRef.current) {
        return;
      }

      hasCompletedRef.current = true;
      setIsExiting(true);
      window.setTimeout(onComplete, delay);
    };

    const timer = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (isReady) {
          const nextProgress = mediaQuery.matches
            ? 100
            : Math.min(currentProgress + Math.max(8, (100 - currentProgress) * 0.28), 100);

          if (nextProgress >= 100) {
            finishLoading(mediaQuery.matches ? 120 : 500);
          }

          return nextProgress;
        }

        const ceiling = mediaQuery.matches ? 92 : 82;
        const increment = mediaQuery.matches
          ? 10
          : Math.max(1.5, (ceiling - currentProgress) * 0.12);

        return Math.min(currentProgress + increment, ceiling);
      });
    }, mediaQuery.matches ? 90 : 110);

    return () => window.clearInterval(timer);
  }, [isReady, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background p-8 transition-all duration-700 motion-reduce:transition-none ${
        isExiting ? "pointer-events-none opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading homepage"
    >
      <div className="flex w-full max-w-xs flex-col items-center space-y-10">
        <div className="space-y-2 text-center">
          <div className="text-5xl font-headline font-bold text-primary md:text-6xl">BiuBiu</div>
          <div className="text-sm font-body uppercase tracking-[0.4em] text-muted-foreground">Market</div>
        </div>
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-[3px] bg-muted/50" />
          <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
            <span>Loading Experience</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
