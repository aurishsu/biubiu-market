
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Search, SlidersHorizontal, X, ShieldCheck, Heart, Grid3X3, ChevronDown } from "lucide-react";

type Category = "all" | "electronics" | "fashion" | "furniture" | "bags" | "books" | "sports" | "toys" | "kitchen" | "art";

interface Product {
  id: number;
  name: string;
  price: string;
  location: string;
  img: string;
  aspect: string; // tailwind aspect ratio class
  seller: string;
  time: string;
  verified: boolean;
  category: Category;
  condition: string;
  likes: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "索尼 WH-1000XM4 降噪耳机", price: "¥680", location: "上海浦东", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/5]", seller: "小王数码", time: "3分钟前", verified: true, category: "electronics", condition: "95新", likes: 24 },
  { id: 2, name: "北欧风实木书桌 120cm", price: "¥350", location: "北京朝阳", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/4]", seller: "搬家急售", time: "15分钟前", verified: false, category: "furniture", condition: "八成新", likes: 8 },
  { id: 3, name: "Levi's 501 牛仔裤 W32", price: "¥120", location: "广州天河", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/5]", seller: "衣柜清理", time: "1小时前", verified: false, category: "fashion", condition: "九成新", likes: 5 },
  { id: 4, name: "iPad Pro 11寸 2022 256G", price: "¥3,800", location: "深圳南山", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/3]", seller: "数码达人Leo", time: "28分钟前", verified: true, category: "electronics", condition: "98新", likes: 67 },
  { id: 5, name: "Coach 托特包 棕色经典款", price: "¥450", location: "杭州西湖", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/5]", seller: "包包控小美", time: "2小时前", verified: true, category: "bags", condition: "九成新", likes: 31 },
  { id: 6, name: "村上春树文集 全套12本", price: "¥85", location: "成都锦江", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[1/1]", seller: "书虫阿杰", time: "5小时前", verified: false, category: "books", condition: "品相好", likes: 12 },
  { id: 7, name: "戴森 V12 吸尘器", price: "¥1,500", location: "上海徐汇", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/4]", seller: "家电二手铺", time: "45分钟前", verified: true, category: "kitchen", condition: "95新", likes: 43 },
  { id: 8, name: "油画 抽象风景 60x80cm", price: "¥280", location: "南京鼓楼", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/5]", seller: "美院毕业生", time: "1天前", verified: false, category: "art", condition: "全新", likes: 19 },
  { id: 9, name: "Switch OLED + 3个游戏", price: "¥1,650", location: "武汉洪山", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/3]", seller: "游戏换新党", time: "3小时前", verified: true, category: "electronics", condition: "九成新", likes: 55 },
  { id: 10, name: "MUJI 懒人沙发 灰色", price: "¥200", location: "杭州余杭", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/2]", seller: "极简生活", time: "6小时前", verified: false, category: "furniture", condition: "八成新", likes: 7 },
  { id: 11, name: "Nike Air Max 270 黑色 42码", price: "¥220", location: "北京海淀", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/3]", seller: "球鞋柜清理", time: "20分钟前", verified: false, category: "fashion", condition: "八成新", likes: 15 },
  { id: 12, name: "大疆 Mini 3 Pro 无人机", price: "¥2,900", location: "深圳福田", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/4]", seller: "航拍爱好者", time: "4小时前", verified: true, category: "electronics", condition: "95新", likes: 38 },
  { id: 13, name: "Longchamp 饺子包 中号 黑色", price: "¥320", location: "上海静安", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[1/1]", seller: "闲置包包", time: "8小时前", verified: true, category: "bags", condition: "九成新", likes: 22 },
  { id: 14, name: "瑜伽垫 + 弹力带套装", price: "¥45", location: "广州番禺", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/5]", seller: "健身小白", time: "2天前", verified: false, category: "sports", condition: "全新", likes: 3 },
  { id: 15, name: "乐高城市系列 消防局 60320", price: "¥180", location: "成都武侯", img: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[1/1]", seller: "乐高控老爸", time: "12小时前", verified: false, category: "toys", condition: "全新未拆", likes: 9 },
  { id: 16, name: "Marshall 蓝牙音箱 黑色", price: "¥550", location: "北京通州", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/5]", seller: "音乐发烧友", time: "5小时前", verified: true, category: "electronics", condition: "95新", likes: 29 },
  { id: 17, name: "宜家 KALLAX 书柜 白色 4x4格", price: "¥150", location: "上海闵行", img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/4]", seller: "搬家出清", time: "1天前", verified: false, category: "furniture", condition: "七成新", likes: 4 },
  { id: 18, name: "Canon EOS R50 微单 + 镜头", price: "¥4,200", location: "杭州滨江", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/3]", seller: "摄影师阿文", time: "1小时前", verified: true, category: "electronics", condition: "95新", likes: 48 },
  { id: 19, name: "Zara 西装外套 男 M码 藏青", price: "¥95", location: "广州越秀", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/5]", seller: "职场换衣间", time: "3天前", verified: false, category: "fashion", condition: "九成新", likes: 6 },
  { id: 20, name: "Switch 健身环大冒险", price: "¥120", location: "武汉江汉", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[1/1]", seller: "吃灰转让", time: "7小时前", verified: false, category: "toys", condition: "95新", likes: 14 },
  { id: 21, name: "Herman Miller 人体工学椅", price: "¥2,200", location: "北京朝阳", img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[4/5]", seller: "公司搬迁", time: "30分钟前", verified: true, category: "furniture", condition: "八成新", likes: 72 },
  { id: 22, name: "AirPods Pro 2 带MagSafe壳", price: "¥780", location: "深圳宝安", img: "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[1/1]", seller: "果粉小陈", time: "10分钟前", verified: true, category: "electronics", condition: "95新", likes: 33 },
  { id: 23, name: "猫爬架 多层实木 1.6米", price: "¥90", location: "南京建邺", img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[3/4]", seller: "猫奴搬家", time: "4小时前", verified: false, category: "furniture", condition: "七成新", likes: 11 },
  { id: 24, name: "篮球 斯伯丁 室外用球", price: "¥35", location: "上海杨浦", img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=500", aspect: "aspect-[1/1]", seller: "毕业甩卖", time: "2天前", verified: false, category: "sports", condition: "八成新", likes: 2 },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "electronics", label: "数码" },
  { key: "fashion", label: "服饰" },
  { key: "furniture", label: "家具" },
  { key: "bags", label: "箱包" },
  { key: "books", label: "图书" },
  { key: "sports", label: "运动" },
  { key: "toys", label: "玩具" },
  { key: "kitchen", label: "家电" },
  { key: "art", label: "手工" },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.location.includes(q) || p.seller.includes(q));
    }
    if (category !== "all") items = items.filter((p) => p.category === category);
    if (verifiedOnly) items = items.filter((p) => p.verified);
    return items;
  }, [search, category, verifiedOnly]);

  // Distribute items into 4 columns for masonry
  const columns = useMemo(() => {
    const cols: Product[][] = [[], [], [], []];
    filtered.forEach((item, idx) => {
      cols[idx % 4].push(item);
    });
    return cols;
  }, [filtered]);

  const hasFilter = category !== "all" || verifiedOnly || search;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-14">
        {/* Top bar */}
        <div className="sticky top-14 z-30 border-b border-border/40 bg-background/85 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-2.5 overflow-x-auto">
            {/* Search */}
            <div className="relative shrink-0 w-52">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索宝贝..."
                className="w-full rounded-lg border border-border/50 bg-secondary/20 py-1.5 pl-8 pr-7 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X size={12} className="text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="h-5 w-px bg-border/40 shrink-0" />

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    category === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-border/40 shrink-0" />

            {/* Verified toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                verifiedOnly ? "bg-emerald-500/15 text-emerald-600" : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <ShieldCheck size={12} />
              认证
            </button>

            {/* Count */}
            <span className="shrink-0 ml-auto text-[10px] text-muted-foreground/60">{filtered.length} 件</span>

            {hasFilter && (
              <button
                onClick={() => { setSearch(""); setCategory("all"); setVerifiedOnly(false); }}
                className="shrink-0 text-[10px] text-accent hover:underline"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* Masonry Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center px-4">
            <div className="mb-3 rounded-full bg-secondary/30 p-5">
              <Search size={28} className="text-muted-foreground/30" />
            </div>
            <p className="text-base font-headline font-medium text-primary mb-1">没有找到相关宝贝</p>
            <p className="text-xs text-muted-foreground">换个关键词试试？</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {/* 4 columns masonry */}
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-3">
                {col.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-xl overflow-hidden bg-background border border-border/30 transition-all hover:shadow-md hover:shadow-black/5"
                  >
                    {/* Image - variable height based on aspect */}
                    <div className={`relative ${item.aspect} overflow-hidden bg-secondary/10`}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      {/* Badges */}
                      {item.verified && (
                        <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 rounded-md bg-emerald-500/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          <ShieldCheck size={9} /> 已验
                        </span>
                      )}
                      {/* Fav button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }}
                        className="absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart size={12} className={favorites.has(item.id) ? "fill-white text-white" : "text-white/80"} />
                      </button>
                      {/* Price overlay */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent pt-6 pb-2 px-2.5">
                        <span className="text-sm font-bold text-white">{item.price}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-2.5 space-y-1">
                      <h3 className="text-xs font-medium text-primary leading-snug line-clamp-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground/70">{item.condition}</span>
                        <span className="text-[10px] text-muted-foreground/50 flex items-center gap-0.5">
                          <Heart size={8} className="inline" /> {item.likes}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[10px] text-muted-foreground/60 truncate max-w-[60%]">{item.seller}</span>
                        <span className="text-[10px] text-muted-foreground/40">{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
