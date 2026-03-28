
"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background py-16 border-t border-border/40 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-5">
          <Link href="/" className="text-2xl font-headline font-bold text-primary">BiuBiu</Link>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            为鉴赏者打造的策展型市场。<br />
            在快节奏的世界中，拥抱慢时尚。
          </p>
          <div className="flex space-x-2.5">
            {[Instagram, Twitter, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2 bg-secondary/40 rounded-lg text-primary hover:bg-accent hover:text-white transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">快速链接</h4>
          <ul className="space-y-2.5 font-body text-sm text-muted-foreground">
            <li><Link href="/browse" className="hover:text-accent transition-colors flex items-center gap-1">浏览商品 <ArrowUpRight size={12} /></Link></li>
            <li><Link href="/sell" className="hover:text-accent transition-colors flex items-center gap-1">出售商品 <ArrowUpRight size={12} /></Link></li>
            <li><a href="#story" className="hover:text-accent transition-colors">品牌故事</a></li>
            <li><a href="#trust" className="hover:text-accent transition-colors">信任与安全</a></li>
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">法律信息</h4>
          <ul className="space-y-2.5 font-body text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">服务条款</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">隐私政策</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Cookie 政策</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">退款政策</a></li>
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">订阅通讯</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            获取我们最新的策展精选资讯。
          </p>
          <div className="flex overflow-hidden rounded-xl border border-border/50">
            <input
              type="email"
              placeholder="邮箱地址"
              className="bg-secondary/20 p-2.5 flex-1 text-sm focus:outline-none focus:bg-secondary/40 transition-colors"
            />
            <button className="bg-primary text-primary-foreground px-4 text-xs font-medium tracking-wider hover:bg-accent transition-colors duration-300">
              订阅
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-10 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-muted-foreground/50 uppercase tracking-widest">
        <p>&copy; 2025 BiuBiu Market. All rights reserved.</p>
        <div className="flex gap-6">
          <span>策展于巴黎</span>
          <span>为长久而造</span>
        </div>
      </div>
    </footer>
  );
}
