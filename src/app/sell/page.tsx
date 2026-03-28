
"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Upload, CheckCircle2, ChevronRight, ChevronLeft, Eye, Package, Camera, DollarSign, Send, Info, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { num: 1, label: "基本信息", labelEn: "Details", icon: Package },
  { num: 2, label: "照片上传", labelEn: "Photos", icon: Camera },
  { num: 3, label: "定价描述", labelEn: "Pricing", icon: DollarSign },
  { num: 4, label: "预览提交", labelEn: "Review", icon: Send },
];

const CATEGORIES = ["时尚 Fashion", "腕表 Watches", "艺术 Art", "家居 Home", "箱包 Bags", "其他 Other"];
const CONDITIONS = [
  { value: "pristine", label: "全新 Pristine", desc: "从未使用，标签完好" },
  { value: "excellent", label: "优秀 Excellent", desc: "极少使用痕迹" },
  { value: "loved", label: "有使用痕迹 Loved", desc: "有自然磨损，品相良好" },
];

export default function SellPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    title: "", titleEn: "", brand: "", category: CATEGORIES[0], condition: "pristine",
    description: "", descriptionEn: "", price: "", photos: [] as string[],
  });

  const updateForm = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const fee = form.price ? (parseFloat(form.price) * 0.05).toFixed(2) : "0.00";
  const payout = form.price ? (parseFloat(form.price) * 0.95).toFixed(2) : "0.00";

  const canNext = () => {
    if (step === 1) return form.title && form.brand;
    if (step === 2) return true;
    if (step === 3) return form.price && parseFloat(form.price) > 0;
    return true;
  };

  const fieldClass = "w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 placeholder:text-muted-foreground/50";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border/50 bg-secondary/15 px-6 py-8 md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent mb-2">出售商品 · SELL</p>
            <h1 className="text-3xl font-headline font-bold text-primary md:text-4xl">上架您的珍藏</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg">
              加入我们的精选卖家社区，让您的珍藏以它应有的优雅方式展示。
            </p>
          </div>
        </div>

        {/* Step Progress */}
        <div className="sticky top-16 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-3 md:px-8">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => { if (isDone) setStep(s.num as Step); }}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : isDone
                        ? "bg-accent/10 text-accent cursor-pointer hover:bg-accent/15"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Icon size={16} />
                    )}
                    <span className="hidden text-xs font-medium sm:block">{s.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`hidden h-px flex-1 sm:block ${isDone ? "bg-accent/30" : "bg-border/40"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="mx-auto max-w-4xl px-6 py-8 md:px-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-background p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-headline font-medium text-primary mb-1">商品信息</h2>
                  <p className="text-xs text-muted-foreground">填写商品的基本信息，帮助买家了解您的珍藏</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      商品名称 (中文) <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text" value={form.title} onChange={(e) => updateForm("title", e.target.value)}
                      className={fieldClass} placeholder="例：中古羊皮手提包"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Product Name (EN)
                    </label>
                    <input
                      type="text" value={form.titleEn} onChange={(e) => updateForm("titleEn", e.target.value)}
                      className={fieldClass} placeholder="e.g. Vintage Lambskin Handbag"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      品牌 / 来源 <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text" value={form.brand} onChange={(e) => updateForm("brand", e.target.value)}
                      className={fieldClass} placeholder="例：Chanel / 1980年代巴黎"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">品类</label>
                    <select
                      value={form.category} onChange={(e) => updateForm("category", e.target.value)}
                      className={fieldClass + " bg-transparent"}
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">品相</label>
                  <div className="grid gap-3 md:grid-cols-3">
                    {CONDITIONS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => updateForm("condition", c.value)}
                        className={`rounded-xl p-4 text-left transition-all border ${
                          form.condition === c.value
                            ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
                            : "border-border/40 hover:border-border hover:bg-secondary/15"
                        }`}
                      >
                        <p className={`text-sm font-medium ${form.condition === c.value ? "text-accent" : "text-primary"}`}>
                          {c.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{c.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <div className="rounded-2xl border border-border/40 bg-background p-6 md:p-8">
                  <h2 className="text-lg font-headline font-medium text-primary mb-1">上传照片</h2>
                  <p className="text-xs text-muted-foreground mb-6">高质量照片能大幅提升商品吸引力</p>

                  <div className="aspect-[16/9] rounded-xl border-2 border-dashed border-accent/30 bg-secondary/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-secondary/20 transition-colors">
                    <div className="rounded-full bg-accent/10 p-4">
                      <ImagePlus size={28} className="text-accent" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-primary">拖拽图片到此处，或点击上传</p>
                      <p className="text-[11px] text-muted-foreground mt-1">支持 JPG, PNG, HEIC · 最少4张 · 单张不超过10MB</p>
                    </div>
                  </div>

                  {/* Mock uploaded thumbnails */}
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {["正面 Front", "背面 Back", "细节 Detail", "标记 Mark"].map((label, idx) => (
                      <div key={idx} className="aspect-square rounded-xl border border-border/40 bg-secondary/15 flex flex-col items-center justify-center gap-1">
                        <Camera size={16} className="text-muted-foreground/40" />
                        <span className="text-[9px] text-muted-foreground/60">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tips sidebar */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-border/40 bg-background p-5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-4">
                    <Info size={14} />
                    拍摄指南
                  </h3>
                  <div className="space-y-3">
                    {[
                      "使用自然柔和的日光",
                      "背景保持干净素色",
                      "突出独特纹理或标记",
                      "展示品牌标志和序列号",
                      "避免使用滤镜",
                    ].map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-accent/5 border border-accent/20 p-5">
                  <p className="text-xs font-medium text-accent mb-1">专业提示</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    多角度拍摄的商品平均销售速度快 3 倍。确保至少上传正面、背面、细节特写和品牌标记照片。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-2xl border border-border/40 bg-background p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="text-lg font-headline font-medium text-primary mb-1">定价与描述</h2>
                    <p className="text-xs text-muted-foreground">设定合理价格，并详细描述商品特点</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      期望售价 (USD) <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                      <input
                        type="number" value={form.price} onChange={(e) => updateForm("price", e.target.value)}
                        className={fieldClass + " pl-8"} placeholder="0.00" min="0" step="0.01"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      商品描述 (中文)
                    </label>
                    <textarea
                      value={form.description} onChange={(e) => updateForm("description", e.target.value)}
                      rows={4} className={fieldClass + " resize-none"} placeholder="描述商品的历史、特点、使用情况..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Description (EN)
                    </label>
                    <textarea
                      value={form.descriptionEn} onChange={(e) => updateForm("descriptionEn", e.target.value)}
                      rows={3} className={fieldClass + " resize-none"} placeholder="Optional English description..."
                    />
                  </div>
                </div>
              </div>

              {/* Fee Calculator */}
              <div>
                <div className="rounded-2xl border border-border/40 bg-background p-5 sticky top-40">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-5">
                    <DollarSign size={14} />
                    费用计算
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">售价</span>
                      <span className="font-medium text-primary">${form.price || "0.00"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">BiuBiu 佣金 (5%)</span>
                      <span className="text-accent font-medium">-${fee}</span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-primary">预计到手</span>
                      <span className="text-xl font-headline font-bold text-primary">${payout}</span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-secondary/20 p-3">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      佣金包含平台维护、安全认证和白手套客服支持。资金通过托管系统保护。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-background p-6 md:p-8">
                <h2 className="text-lg font-headline font-medium text-primary mb-6">预览您的商品</h2>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Preview Card */}
                  <div className="rounded-xl border border-border/40 overflow-hidden">
                    <div className="aspect-[3/4] bg-secondary/20 flex items-center justify-center">
                      <div className="text-center">
                        <Camera size={40} className="mx-auto text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground/50">商品图片预览</p>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{form.brand || "品牌"}</p>
                      <h3 className="text-base font-headline font-medium text-primary">{form.title || "商品名称"}</h3>
                      {form.titleEn && <p className="text-xs text-muted-foreground">{form.titleEn}</p>}
                      <div className="flex items-center justify-between pt-1">
                        <span className="rounded-md bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {CONDITIONS.find((c) => c.value === form.condition)?.label}
                        </span>
                        <span className="text-lg font-headline font-bold text-primary">
                          {form.price ? `$${parseFloat(form.price).toLocaleString()}` : "$0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Summary */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">提交信息摘要</h3>
                    {[
                      { label: "商品名称", value: form.title || "—" },
                      { label: "English Name", value: form.titleEn || "—" },
                      { label: "品牌/来源", value: form.brand || "—" },
                      { label: "品类", value: form.category },
                      { label: "品相", value: CONDITIONS.find((c) => c.value === form.condition)?.label || "" },
                      { label: "售价", value: form.price ? `$${parseFloat(form.price).toLocaleString()}` : "—" },
                      { label: "预计到手", value: `$${payout}` },
                      { label: "照片数量", value: "0 张（演示模式）" },
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between border-b border-border/20 pb-2 last:border-0">
                        <span className="text-xs text-muted-foreground">{row.label}</span>
                        <span className="text-xs font-medium text-primary text-right max-w-[60%] truncate">{row.value}</span>
                      </div>
                    ))}

                    {form.description && (
                      <div className="pt-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">描述</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{form.description}</p>
                      </div>
                    )}

                    <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 mt-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        提交后，我们的策展团队将在 <strong className="text-primary">24-48 小时</strong> 内审核您的商品。审核通过后将自动上架。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep((step - 1) as Step)}
                className="rounded-xl gap-2"
              >
                <ChevronLeft size={16} />
                上一步
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button
                onClick={() => setStep((step + 1) as Step)}
                disabled={!canNext()}
                className="rounded-xl gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button className="rounded-xl gap-2 bg-accent text-white hover:bg-accent/90 px-8">
                <Send size={16} />
                提交审核
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
