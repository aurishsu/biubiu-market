
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, Home } from "lucide-react";
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
  const pathname = usePathname();
  const isHome = pathname === "/";
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

  // On sub-pages, always use solid bg style
  const useSolidStyle = !isHome || isScrolled;

  const navLinks = [
    { name: "首页", nameEn: "Home", href: "/" },
    { name: "浏览", nameEn: "Browse", href: "/browse" },
    { name: "出售", nameEn: "Sell", href: "/sell" },
  ];

  const sectionLinks = isHome
    ? [
        { name: "品牌故事", nameEn: "Story", href: "#story" },
        { name: "模式", nameEn: "Model", href: "#model" },
        { name: "信任", nameEn: "Trust", href: "#trust" },
        { name: "FAQ", nameEn: "FAQ", href: "#faq" },
      ]
    : [];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    cn(
      "relative rounded-md px-3 py-1.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      useSolidStyle
        ? cn(
            "text-muted-foreground hover:text-primary",
            isActive(href) && "text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-4 after:rounded-full after:bg-accent"
          )
        : cn(
            "text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:text-white",
            isActive(href) && "text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-4 after:rounded-full after:bg-white"
          )
    );

  const iconBtnClass = cn(
    "h-10 w-10 rounded-full transition-all duration-300",
    useSolidStyle
      ? "text-primary hover:bg-secondary/80"
      : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:bg-white/10"
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-500",
        useSolidStyle
          ? "bg-background/80 shadow-sm backdrop-blur-xl border-b border-border/30"
          : "bg-gradient-to-b from-black/30 via-black/10 to-transparent"
      )}
    >
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className={cn(
            "text-2xl font-headline font-bold tracking-tight transition-colors",
            useSolidStyle ? "text-primary" : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          )}
        >
          BiuBiu
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}
          {sectionLinks.length > 0 && (
            <>
              <div className={cn("mx-2 h-4 w-px", useSolidStyle ? "bg-border" : "bg-white/20")} />
              {sectionLinks.map((link) => (
                <a key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.name}
                </a>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className={iconBtnClass} aria-label="Toggle theme">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={cn(iconBtnClass, "md:hidden")} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(20rem,85vw)] border-l border-border/60 bg-background/95 backdrop-blur-xl">
            <SheetHeader className="pr-8 text-left">
              <SheetTitle className="font-headline text-primary">BiuBiu Market</SheetTitle>
              <SheetDescription>导航菜单</SheetDescription>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium transition-all hover:bg-secondary/30",
                      isActive(link.href) ? "text-accent bg-accent/5" : "text-primary"
                    )}
                  >
                    {link.name}
                    <span className="ml-2 text-xs text-muted-foreground">{link.nameEn}</span>
                  </Link>
                </SheetClose>
              ))}
              {sectionLinks.length > 0 && (
                <>
                  <div className="my-2 h-px bg-border/40" />
                  {sectionLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:bg-secondary/30 hover:text-primary"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
