
"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, SlidersHorizontal, X, ChevronDown, Eye, Tag, ShieldCheck, Clock, Grid3X3, LayoutList, Heart, ExternalLink, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortKey = "newest" | "price-asc" | "price-desc" | "name";
type Category = "all" | "fashion" | "watches" | "art" | "home" | "bags";

interface Product {
  id: number;
  name: string;
  nameCn: string;
  price: number;
  priceDisplay: string;
  brand: string;
  category: Category;
  img: string;
  condition: string;
  conditionCn: string;
  verified: boolean;
  isNew: boolean;
  seller: string;
  listedAgo: string;
  listedAgoCn: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "1960s Silk Scarf", nameCn: "1960年代丝巾", price: 240, priceDisplay: "$240", brand: "Hermès Heritage", category: "fashion", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600", condition: "Pristine", conditionCn: "全新", verified: true, isNew: true, seller: "Marie D.", listedAgo: "2h ago", listedAgoCn: "2小时前" },
  { id: 2, name: "Minimalist Brass Vessel", nameCn: "极简黄铜花瓶", price: 180, priceDisplay: "$180", brand: "Oda Studio", category: "home", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600", condition: "Excellent", conditionCn: "优秀", verified: true, isNew: false, seller: "Luca R.", listedAgo: "1d ago", listedAgoCn: "1天前" },
  { id: 3, name: "Leather Travel Trunk", nameCn: "皮革旅行箱", price: 1200, priceDisplay: "$1,200", brand: "Maison Voyage", category: "bags", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", condition: "Loved", conditionCn: "有使用痕迹", verified: true, isNew: false, seller: "Sophia K.", listedAgo: "3d ago", listedAgoCn: "3天前" },
  { id: 4, name: "Ceramic Tea Set", nameCn: "陶瓷茶具套装", price: 320, priceDisplay: "$320", brand: "Kyoto Artisans", category: "home", img: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?auto=format&fit=crop&q=80&w=600", condition: "Pristine", conditionCn: "全新", verified: false, isNew: true, seller: "Yuki T.", listedAgo: "5h ago", listedAgoCn: "5小时前" },
  { id: 5, name: "Hand-Woven Cashmere", nameCn: "手工羊绒围巾", price: 850, priceDisplay: "$850", brand: "Altai Peaks", category: "fashion", img: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80&w=600", condition: "Excellent", conditionCn: "优秀", verified: true, isNew: false, seller: "Elena V.", listedAgo: "6h ago", listedAgoCn: "6小时前" },
  { id: 6, name: "Antique Timepiece", nameCn: "古董腕表", price: 3400, priceDisplay: "$3,400", brand: "Patek Legacy", category: "watches", img: "https://images.unsplash.com/photo-1524592093835-8421b1db3e2d?auto=format&fit=crop&q=80&w=600", condition: "Excellent", conditionCn: "优秀", verified: true, isNew: false, seller: "James L.", listedAgo: "2d ago", listedAgoCn: "2天前" },
  { id: 7, name: "Oil on Canvas", nameCn: "布面油画", price: 2800, priceDisplay: "$2,800", brand: "Atelier Moderne", category: "art", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600", condition: "Pristine", conditionCn: "全新", verified: true, isNew: true, seller: "Claude M.", listedAgo: "1h ago", listedAgoCn: "1小时前" },
  { id: 8, name: "Vintage Handbag", nameCn: "中古手提包", price: 1650, priceDisplay: "$1,650", brand: "Chanel Archive", category: "bags", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600", condition: "Excellent", conditionCn: "优秀", verified: true, isNew: false, seller: "Anna P.", listedAgo: "4d ago", listedAgoCn: "4天前" },
  { id: 9, name: "Swiss Chronograph", nameCn: "瑞士计时码表", price: 5200, priceDisplay: "$5,200", brand: "Omega Vintage", category: "watches", img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=600", condition: "Pristine", conditionCn: "全新", verified: true, isNew: true, seller: "Hans W.", listedAgo: "30m ago", listedAgoCn: "30分钟前" },
];

const CATEGORIES: { key: Category; label: string; labelCn: string }[] = [
  { key: "all", label: "All", labelCn: "全部" },
  { key: "fashion", label: "Fashion", labelCn: "时尚" },
  { key: "watches", label: "Watches", labelCn: "腕表" },
  { key: "art", label: "Art", labelCn: "艺术" },
  { key: "home", label: "Home", labelCn: "家居" },
  { key: "bags", label: "Bags", labelCn: "箱包" },
];

const CONDITIONS = ["all", "Pristine", "Excellent", "Loved"] as const;
const COND_CN: Record<string, string> = { all: "全部", Pristine: "全新", Excellent: "优秀", Loved: "有使用痕迹" };

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [condition, setCondition] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.nameCn.includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (category !== "all") items = items.filter((p) => p.category === category);
    if (condition !== "all") items = items.filter((p) => p.condition === condition);
    if (verifiedOnly) items = items.filter((p) => p.verified);

    switch (sort) {
      case "price-asc": items.sort((a, b) => a.price - b.price); break;
      case "price-desc": items.sort((a, b) => b.price - a.price); break;
      case "name": items.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return items;
  }, [search, category, sort, condition, verifiedOnly]);

  const stats = {
    total: filtered.length,
    avgPrice: filtered.length ? Math.round(filtered.reduce((s, p) => s + p.price, 0) / filtered.length) : 0,
    verified: filtered.filter((p) => p.verified).length,
    newest: filtered.filter((p) => p.isNew).length,
  };

  const hasActiveFilters = category !== "all" || condition !== "all" || verifiedOnly || search;

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setCondition("all");
    setVerifiedOnly(false);
    setSort("newest");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        {/* Stats Bar */}
        <div className="border-b border-border/50 bg-secondary/15">
          <div className="mx-auto flex flex-wrap items-center gap-6 px-6 py-3 md:px-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Eye size={14} />
              <span>在浏览</span>
            </div>
            {[
              { label: "商品总数", value: stats.total.toString(), sub: `共 ${PRODUCTS.length} 件` },
              { label: "均价", value: `$${stats.avgPrice.toLocaleString()}`, sub: `$${Math.min(...PRODUCTS.map(p=>p.price))} – $${Math.max(...PRODUCTS.map(p=>p.price)).toLocaleString()}` },
              { label: "已认证", value: `${stats.verified} 件`, sub: `${PRODUCTS.length} 件中` },
              { label: "新上架", value: `${stats.newest} 件`, sub: "最近24小时" },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-border/40 pl-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-headline font-bold text-primary leading-tight">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Filter Sidebar */}
          {showFilter && (
            <aside className="hidden w-72 shrink-0 border-r border-border/40 bg-background p-6 md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
                  <SlidersHorizontal size={14} />
                  筛选工作台
                </h2>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-xs text-accent hover:underline">
                    重置
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索商品 / Search..."
                  className="w-full rounded-xl border border-border/60 bg-secondary/20 py-2.5 pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={14} className="text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">品类 Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        category === cat.key
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-primary"
                      }`}
                    >
                      {cat.labelCn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">品相 Condition</p>
                <div className="space-y-1.5">
                  {CONDITIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCondition(c)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${
                        condition === c
                          ? "bg-accent/10 text-accent font-medium border border-accent/20"
                          : "text-muted-foreground hover:bg-secondary/30"
                      }`}
                    >
                      {COND_CN[c]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                    verifiedOnly
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "bg-secondary/20 text-muted-foreground hover:bg-secondary/40"
                  }`}
                >
                  <ShieldCheck size={16} />
                  <span className="font-medium">仅显示已认证</span>
                  <span className={`ml-auto h-5 w-9 rounded-full transition-colors ${verifiedOnly ? "bg-accent" : "bg-border"}`}>
                    <span className={`block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${verifiedOnly ? "translate-x-[18px]" : "translate-x-[2px]"}`} />
                  </span>
                </button>
              </div>

              {/* Result count */}
              <div className="rounded-xl bg-secondary/20 p-4 text-center">
                <p className="text-3xl font-headline font-bold text-primary">{filtered.length}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">件商品符合条件</p>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="sticky top-16 z-30 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="hidden md:flex items-center gap-2 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary/30 transition-all"
                >
                  <SlidersHorizontal size={14} />
                  {showFilter ? "隐藏筛选" : "显示筛选"}
                </button>

                {/* Mobile filter button */}
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="md:hidden flex items-center gap-2 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <SlidersHorizontal size={14} />
                  筛选
                </button>

                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    {category !== "all" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
                        {CATEGORIES.find((c) => c.key === category)?.labelCn}
                        <button onClick={() => setCategory("all")}><X size={10} /></button>
                      </span>
                    )}
                    {verifiedOnly && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
                        已认证
                        <button onClick={() => setVerifiedOnly(false)}><X size={10} /></button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg border border-border/40 p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-md p-1.5 transition-all ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
                  >
                    <Grid3X3 size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-1.5 transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
                  >
                    <LayoutList size={14} />
                  </button>
                </div>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-border/50 bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="newest">最新上架</option>
                  <option value="price-asc">价格 ↑</option>
                  <option value="price-desc">价格 ↓</option>
                  <option value="name">名称 A-Z</option>
                </select>
              </div>
            </div>

            {/* Product Grid / List */}
            <div className="p-6">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="mb-4 rounded-full bg-secondary/30 p-6">
                    <Search size={32} className="text-muted-foreground/40" />
                  </div>
                  <h3 className="text-xl font-headline font-medium text-primary mb-2">未找到商品</h3>
                  <p className="text-sm text-muted-foreground mb-4">试试调整筛选条件，或浏览全部商品</p>
                  <Button variant="outline" size="sm" onClick={resetFilters} className="rounded-xl">
                    重置筛选
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className={`grid gap-5 ${showFilter ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl border border-border/40 bg-background overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/10">
                        <img
                          src={item.img}
                          alt={item.nameCn}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlays */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {item.isNew && (
                            <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                              NEW
                            </span>
                          )}
                          {item.verified && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                              <ShieldCheck size={10} /> 认证
                            </span>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                          <span className="rounded-lg bg-white/85 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-primary shadow-sm">
                            {item.priceDisplay}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleFav(item.id)}
                          className="absolute bottom-3 right-3 rounded-full bg-white/80 backdrop-blur-sm p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-white"
                        >
                          <Heart size={14} className={favorites.has(item.id) ? "fill-accent text-accent" : "text-muted-foreground"} />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{item.brand}</p>
                          <p className="text-[10px] text-muted-foreground">{item.listedAgoCn}</p>
                        </div>
                        <h3 className="text-base font-headline font-medium text-primary leading-snug">{item.nameCn}</h3>
                        <p className="text-xs text-muted-foreground">{item.name}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="rounded-md bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {item.conditionCn}
                          </span>
                          <span className="text-[10px] text-muted-foreground">卖家: {item.seller}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-3">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-5 rounded-xl border border-border/40 bg-background p-3 transition-all hover:shadow-md hover:shadow-black/5"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary/10">
                        <img src={item.img} alt={item.nameCn} className="h-full w-full object-cover" />
                        {item.verified && (
                          <span className="absolute top-1 left-1 rounded bg-emerald-500/90 p-0.5">
                            <ShieldCheck size={10} className="text-white" />
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{item.brand}</p>
                          {item.isNew && <span className="rounded bg-accent px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>}
                        </div>
                        <h3 className="text-sm font-headline font-medium text-primary truncate">{item.nameCn}</h3>
                        <p className="text-xs text-muted-foreground truncate">{item.name} · {item.conditionCn}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-headline font-bold text-primary">{item.priceDisplay}</p>
                        <p className="text-[10px] text-muted-foreground">{item.listedAgoCn}</p>
                      </div>
                      <button onClick={() => toggleFav(item.id)} className="shrink-0 p-2 rounded-full hover:bg-secondary/30 transition-colors">
                        <Heart size={16} className={favorites.has(item.id) ? "fill-accent text-accent" : "text-muted-foreground"} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
