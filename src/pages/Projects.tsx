import { useState } from "react";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";
import { MapPin, Zap } from "lucide-react";

const FILTERS = ["All", "Residential", "Commercial", "Industrial", "Agricultural"] as const;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <SEO
        title="Solar Projects in Guntur & AP | Portfolio | Sarva Solar"
        description="Explore Sarva Solar's installations across Guntur and Andhra Pradesh — residential rooftops, industrial plants and agricultural pumps."
        path="/projects"
      />
      <PageHero
        eyebrow="Our Portfolio"
        title="1,200+ projects powered by Sarva Solar"
        subtitle="From village homes to multi-acre factories — a closer look at what we build."
      />

      <section className="section-y">
        <div className="container mx-auto container-px">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-full font-semibold text-sm transition-all",
                  filter === f
                    ? "bg-brand-green text-white shadow-cta"
                    : "bg-muted text-foreground hover:bg-brand-green/10"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <div key={p.title + p.location} className="group rounded-2xl overflow-hidden bg-white shadow-soft hover-lift">
                <div className="relative h-60 overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <div className="text-white">
                      <div className="text-xs font-bold uppercase text-brand-yellow">{p.category}</div>
                      <h3 className="font-display font-bold text-lg">{p.title}</h3>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-brand-yellow text-brand-green-dark text-xs font-bold px-2.5 py-1 rounded-full">{p.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-brand-green-dark">{p.title}</h3>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.location}</span>
                    <span className="flex items-center gap-1 font-bold text-brand-blue"><Zap className="h-3.5 w-3.5" />{p.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Yours could be the next project" />
    </>
  );
}
