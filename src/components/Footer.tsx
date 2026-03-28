
"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background py-20 border-t border-border/40 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="text-3xl font-headline font-bold text-primary">BiuBiu</Link>
          <p className="text-muted-foreground font-body leading-relaxed">
            Curated marketplace for the discerning eye.
            Embracing the slow movement in a fast world.
          </p>
          <div className="flex space-x-3">
            {[Instagram, Twitter, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2.5 bg-secondary/50 rounded-xl text-primary hover:bg-accent hover:text-white transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-medium text-primary text-xl">Quick Links</h4>
          <ul className="space-y-3 font-body text-muted-foreground">
            <li><Link href="/browse" className="hover:text-accent transition-colors flex items-center space-x-1"><span>Browse Gallery</span> <ArrowUpRight size={14} /></Link></li>
            <li><Link href="/sell" className="hover:text-accent transition-colors flex items-center space-x-1"><span>Join as Seller</span> <ArrowUpRight size={14} /></Link></li>
            <li><a href="#story" className="hover:text-accent transition-colors">About BiuBiu</a></li>
            <li><a href="#trust" className="hover:text-accent transition-colors">Trust & Safety</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-medium text-primary text-xl">Legal</h4>
          <ul className="space-y-3 font-body text-muted-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-medium text-primary text-xl">Newsletter</h4>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Subtle updates on our latest curated findings.
          </p>
          <div className="flex overflow-hidden rounded-xl border border-border/50">
            <input
              type="email"
              placeholder="email address"
              className="bg-secondary/20 p-3 flex-1 focus:outline-none focus:bg-secondary/40 transition-colors font-body text-sm"
            />
            <button className="bg-primary text-primary-foreground px-5 font-body uppercase text-xs tracking-widest hover:bg-accent transition-colors duration-300">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 mt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground font-body uppercase tracking-widest opacity-50">
        <p>&copy; 2025 BiuBiu Market. All rights reserved.</p>
        <div className="flex space-x-8">
          <span>Curated in Paris</span>
          <span>Coded for Longevity</span>
        </div>
      </div>
    </footer>
  );
}
