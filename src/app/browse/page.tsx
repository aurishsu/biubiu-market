
"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export default function BrowsePage() {
  const mockItems = [
    { id: 1, name: "1960s Silk Scarf", price: "$240", brand: "Hermès Heritage", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Minimalist Brass Vessel", price: "$180", brand: "Oda Studio", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Leather Travel Trunk", price: "$1,200", brand: "Maison Voyage", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Ceramic Tea Set", price: "$320", brand: "Kyoto Artisans", img: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Hand-Woven Cashmere", price: "$850", brand: "Altai Peaks", img: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80&w=400" },
    { id: 6, name: "Antique Watch", price: "$3,400", brand: "Patek Legacy", img: "https://images.unsplash.com/photo-1524592093835-8421b1db3e2d?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-12">
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-medium text-primary tracking-tight">Browse Gallery</h1>
              <p className="text-muted-foreground font-body max-w-md">
                Discover our meticulously curated selection of exceptional pieces, 
                each with its own story to tell.
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search pieces..." 
                  className="w-full bg-secondary/20 border border-border p-2.5 pl-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent font-body text-sm"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {mockItems.map((item) => (
              <div key={item.id} className="group cursor-pointer space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/10">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium tracking-widest text-primary">
                    {item.price}
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-accent font-body">{item.brand}</p>
                  <h3 className="text-xl font-headline font-medium text-primary">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-16 flex justify-center">
            <Button variant="ghost" className="text-muted-foreground font-body hover:text-primary">
              Load more extraordinary finds
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
