
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Phone, Shield, Search, Sparkles } from "lucide-react";

export function BrandStory() {
  return (
    <section id="story" className="bg-background px-6 py-28 sm:px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-medium text-primary leading-[1.05]">
            The Art of<br />Curation
          </h2>
          <div className="w-20 h-[2px] bg-accent/60" />
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            BiuBiu Market began as a whisper in the halls of slow fashion. We believed that every object
            carries a legacy, and that true luxury lies in longevity. Our platform is a sanctuary for
            those who seek character over convenience.
          </p>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            By connecting discerning collectors with passionate sellers, we breathe new life into
            exceptional pieces, ensuring the cycle of beauty continues with grace and integrity.
          </p>
        </div>
        <div className="relative img-zoom">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-black/10">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
              alt="Curated fashion piece"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 hidden md:block">
            <p className="text-sm font-headline font-medium text-primary">Since 2020</p>
            <p className="text-xs text-muted-foreground">Curating with passion</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OperatingModel() {
  return (
    <section id="model" className="py-28 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <div className="text-center space-y-5 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mx-auto">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-medium text-primary">
            Sophisticated Simplicity
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-lg">
            How BiuBiu creates a seamless bridge between worlds.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Discover",
              desc: "Every listing is vetted for quality and authenticity, ensuring only the most exquisite finds grace our platform.",
              icon: <Search size={24} />,
              num: "01"
            },
            {
              title: "Exchange",
              desc: "Our secure communication and payment systems allow for graceful transactions with peace of mind.",
              icon: <Sparkles size={24} />,
              num: "02"
            },
            {
              title: "Experience",
              desc: "From concierge shipping to identity verification, we handle the intricacies so you can enjoy the essence.",
              icon: <Shield size={24} />,
              num: "03"
            }
          ].map((item) => (
            <div key={item.title} className="glass-card p-10 rounded-2xl space-y-5 group">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-400">
                  {item.icon}
                </div>
                <span className="text-accent/20 font-headline text-4xl font-bold">{item.num}</span>
              </div>
              <h3 className="text-2xl font-headline font-medium text-primary">{item.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSafety() {
  return (
    <section id="trust" className="bg-background px-6 py-28 sm:px-8 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Shield size={14} className="text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Trust & Safety</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-medium text-primary leading-[1.05]">
            Guardian of<br />the Gate
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            In an era of mass consumption, trust is the ultimate currency. We employ multi-layer
            identity verification and expert appraisal to ensure that every BiuBiu member
            is authentic, and every product is real.
          </p>
          <div className="space-y-4 pt-2">
            {[
              "Identity-verified community only",
              "Escrow protection for all transactions",
              "White-glove dispute resolution"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center space-x-4 text-muted-foreground font-body">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                </div>
                <span className="text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 img-zoom">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
             <img
              src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
              alt="Trust and safety"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    { q: "Is there a fee for selling on BiuBiu?", a: "We maintain a transparent 5% commission on successful sales, which goes directly into platform maintenance and white-glove support." },
    { q: "How is my identity verified?", a: "We partner with global security leaders to securely verify government IDs and social proofing, ensuring our market remains exclusive and safe." },
    { q: "What happens if an item isn't as described?", a: "Our escrow system holds funds until the buyer confirms receipt. In cases of discrepancy, our concierge team mediates a swift resolution." },
    { q: "Can I sell internationally?", a: "BiuBiu supports trade within major hubs, with global international shipping expanding in 2025 and beyond." }
  ];

  return (
    <section id="faq" className="bg-secondary/15 px-6 py-28 sm:px-8 md:px-24">
      <div className="max-w-3xl mx-auto space-y-14">
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mx-auto">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-medium text-primary">Inquiries</h2>
          <p className="text-muted-foreground font-body text-lg">Common questions regarding our ecosystem.</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="glass-card rounded-xl px-6 border-none">
              <AccordionTrigger className="text-left font-headline font-medium text-lg text-primary py-6 hover:text-accent transition-colors no-underline hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function ContactUs() {
  const fieldClassName =
    "min-h-11 w-full rounded-xl border border-border/70 bg-background p-3 text-base transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-accent/50";

  return (
    <section id="contact" className="bg-background px-6 py-28 sm:px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
                <Mail size={14} className="text-accent" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-medium text-primary">Connect With Us</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-md text-lg">
                Whether you have a unique discovery to share or a question about our curated world,
                our team is ready to assist you.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { icon: <Mail size={20} />, label: "Email", value: "concierge@biubiu.market" },
                { icon: <Phone size={20} />, label: "Call", value: "+1 (234) 567 890" },
                { icon: <MapPin size={20} />, label: "Visit", value: "42 Atelier Way, Paris" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-secondary flex items-center justify-center rounded-xl text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">{item.label}</p>
                    <p className="text-primary font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="glass-card space-y-6 rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-xs font-medium uppercase tracking-widest">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={fieldClassName}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-xs font-medium uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClassName}
                  placeholder="hello@world.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-inquiry-type" className="text-xs font-medium uppercase tracking-widest">
                Inquiry Type
              </label>
              <select
                id="contact-inquiry-type"
                name="inquiryType"
                className={fieldClassName}
                defaultValue="General Support"
              >
                <option>General Support</option>
                <option>Seller Onboarding</option>
                <option>Authentication Query</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-widest">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className={fieldClassName + " resize-none"}
                placeholder="Your thoughts..."
              />
            </div>
            <button
              type="submit"
              className="btn-premium w-full rounded-xl bg-primary py-4 font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
