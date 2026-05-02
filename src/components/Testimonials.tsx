import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const TESTIMONIALS = [
  {
    name: "Ramesh K.",
    role: "Homeowner, Brodipet Guntur",
    text: "My ₹4,200 monthly bill dropped to ₹280. Sarva Solar's team handled subsidy paperwork end-to-end. Best decision for my family.",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    role: "Farmer, Tenali",
    text: "The 5HP solar pump saved me ₹40,000/year on diesel. Works flawlessly even in peak summer. Truly life-changing.",
    rating: 5,
  },
  {
    name: "Sai Textiles Pvt Ltd",
    role: "Industrial Customer, Mangalagiri",
    text: "120kW rooftop installation for our factory — payback in 3.2 years. Professional engineering and zero downtime during install.",
    rating: 5,
  },
  {
    name: "Dr. Anil Reddy",
    role: "Hospital Owner, Guntur",
    text: "Reliable power, premium Tier-1 panels, and 25-year warranty. Their post-sale service is genuinely excellent.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];

  return (
    <section className="section-y bg-muted">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">What our customers say</h2>
        </div>

        <Card className="max-w-3xl mx-auto p-8 md:p-12 relative shadow-elegant gradient-card">
          <Quote className="absolute top-6 right-6 h-16 w-16 text-brand-yellow/30" />
          <div key={idx} className="animate-fade-in">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />)}
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">"{t.text}"</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full gradient-brand text-white flex items-center justify-center font-display font-extrabold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-display font-bold text-brand-green-dark">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-brand-green" : "w-2 bg-border"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
