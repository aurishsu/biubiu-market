
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  bgImage?: string;
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.5,
  bgImage,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current) {
      if (contentRef.current) {
        contentRef.current.style.setProperty("--parallax-shift", "0px");
      }

      return;
    }

    let frame = 0;

    const updatePosition = () => {
      frame = 0;

      if (!sectionRef.current || !contentRef.current) {
        return;
      }

      if (bgImage) {
        const scrollPos = window.pageYOffset;
        const offset = sectionRef.current.offsetTop;
        const yPos = (scrollPos - offset) * speed;
        sectionRef.current.style.backgroundPositionY = `${yPos}px`;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      const shift = Math.max(Math.min(distanceFromCenter * speed * -0.08, 28), -28);

      contentRef.current.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [bgImage, prefersReducedMotion, speed]);

  return (
    <section
      ref={sectionRef}
      data-visible={isVisible ? "true" : "false"}
      className={cn("parallax-shell relative overflow-hidden", className)}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      <div ref={contentRef} className="parallax-content">
        {children}
      </div>
    </section>
  );
}
