
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    syncTheme();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  const navLinks = [
    { name: "Brand Story", href: "#story" },
    { name: "Our Model", href: "#model" },
    { name: "Trust", href: "#trust" },
    { name: "FAQ", href: "#faq" },
  ];

  const navLinkClass = cn(
    "rounded-md px-3 py-1.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:scale-[1.02]",
    isScrolled
      ? "text-primary hover:text-accent"
      : "text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:text-white"
  );

  const iconButtonClass = cn(
    "h-11 w-11 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    isScrolled
      ? "text-primary hover:bg-secondary/80 hover:text-primary"
      : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:bg-white/10 hover:text-white"
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500",
        isScrolled
          ? "bg-background/70 py-3 shadow-sm backdrop-blur-xl border-b border-border/30"
          : "bg-gradient-to-b from-black/30 via-black/10 to-transparent"
      )}
    >
      <Link
        href="/"
        className={cn(
          "rounded-sm text-2xl font-headline font-bold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          isScrolled
            ? "text-primary"
            : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
        )}
      >
        BiuBiu
      </Link>

      <div className="hidden items-center space-x-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={navLinkClass}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/browse" className={cn(navLinkClass, "hidden text-white/75 sm:block")}>
          Browse
        </Link>
        <Link href="/sell" className={cn(navLinkClass, "hidden text-white/75 sm:block")}>
          Sell
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={iconButtonClass}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={isDark}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(iconButtonClass, "md:hidden")}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(20rem,85vw)] border-l border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <SheetHeader className="pr-8 text-left">
              <SheetTitle className="font-headline text-primary">Navigate BiuBiu</SheetTitle>
              <SheetDescription>
                Jump through the homepage or open the marketplace pages.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <a
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-base font-medium text-primary transition-all hover:text-accent hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {link.name}
                  </a>
                </SheetClose>
              ))}

              <div className="my-2 h-px bg-border/60" />

              <SheetClose asChild>
                <Link
                  href="/browse"
                  className="rounded-xl px-3 py-3 text-base font-medium text-primary transition-all hover:text-accent hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Browse
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/sell"
                  className="rounded-xl px-3 py-3 text-base font-medium text-primary transition-all hover:text-accent hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Sell
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
