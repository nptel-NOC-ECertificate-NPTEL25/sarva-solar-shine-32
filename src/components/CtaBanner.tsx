import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { telLink, waLink } from "@/lib/site";

export default function CtaBanner({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto container-px">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-8 md:p-14 text-white shadow-elegant">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-yellow/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-white font-display font-extrabold text-3xl md:text-4xl leading-tight">
                {title || "Ready to slash your electricity bill?"}
              </h2>
              <p className="mt-3 text-white/85 max-w-xl">
                {subtitle || "Talk to a Guntur solar expert today. Free site survey, transparent pricing, end-to-end subsidy support."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="cta" size="lg">
                <a href={waLink()} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-5 w-5" /> WhatsApp Us
                </a>
              </Button>
              <Button asChild variant="hero" size="lg">
                <a href={telLink}><Phone className="h-5 w-5" /> Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
