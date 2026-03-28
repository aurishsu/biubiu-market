
"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2 } from "lucide-react";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24 px-8 md:px-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-headline font-medium text-primary">List Your Legacy</h1>
            <p className="text-muted-foreground font-body max-w-lg mx-auto leading-relaxed">
              Join our exclusive community of sellers. We assist in showcasing your 
              pieces with the elegance they deserve.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl shadow-sm p-12 space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-headline font-medium text-primary border-b border-accent/20 pb-4">Object Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Title</label>
                    <input type="text" className="w-full border-b border-border p-3 focus:outline-none focus:border-accent transition-colors font-body" placeholder="e.g. Vintage Leather Trunk" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Provenance</label>
                    <input type="text" className="w-full border-b border-border p-3 focus:outline-none focus:border-accent transition-colors font-body" placeholder="e.g. Inherited, Paris 1980" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Desired Price</label>
                      <input type="text" className="w-full border-b border-border p-3 focus:outline-none focus:border-accent transition-colors font-body" placeholder="$0.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Condition</label>
                      <select className="w-full border-b border-border p-3 focus:outline-none focus:border-accent transition-colors font-body bg-transparent">
                        <option>Pristine</option>
                        <option>Excellent</option>
                        <option>Loved with Character</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Description</label>
                    <textarea rows={4} className="w-full border-b border-border p-3 focus:outline-none focus:border-accent transition-colors font-body resize-none" placeholder="The story of this piece..." />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-headline font-medium text-primary border-b border-accent/20 pb-4">Visual Essence</h3>
                <div className="aspect-square bg-secondary/20 border-2 border-dashed border-accent/30 rounded-xl flex flex-col items-center justify-center space-y-4 p-8 group hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className="p-4 bg-white rounded-full shadow-sm text-accent group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-headline font-medium text-primary">Upload High-Res Imagery</p>
                    <p className="text-xs text-muted-foreground font-body">Minimum 4 photos: Front, Back, Detail, & Provenance mark.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Submission Guidelines</h4>
                  <div className="space-y-3">
                    {[
                      "Use natural, soft daylight",
                      "Ensure backdrop is neutral and uncluttered",
                      "Highlight any unique textures or marks",
                    ].map((tip, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground font-body">
                        <CheckCircle2 size={14} className="text-accent" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-col items-center space-y-4">
              <Button size="lg" className="w-full md:w-64 bg-primary text-primary-foreground rounded-none tracking-widest py-6">
                SUBMIT FOR REVIEW
              </Button>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-body">
                Our concierges review all submissions within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
