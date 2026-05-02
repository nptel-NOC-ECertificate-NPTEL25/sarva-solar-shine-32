import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Award, BadgeCheck, Building2, ClipboardCheck,
  Droplets, Home as HomeIcon, MessageCircle, Phone, Settings, ShieldCheck, Sun, Wrench, Zap,
} from "lucide-react";
import heroImg from "@/assets/hero-solar.jpg";
import SEO from "@/components/SEO";
import SavingsCalculator from "@/components/SavingsCalculator";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import ServiceCard from "@/components/ServiceCard";
import residentialImg from "@/assets/residential-solar.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import pumpImg from "@/assets/solar-pump.jpg";
import { PROJECTS } from "@/data/projects";
import { telLink, waLink } from "@/lib/site";

export default function Index() {
  return (
    <>
      <SEO
        title="Sarva Solar Group | Solar Panels in Guntur, Andhra Pradesh"
        description="Sarva Solar Group of Companies — leading solar installation in Guntur. Rooftop solar, commercial plants, solar pumps & water heaters. Free quote, subsidies, 25-yr warranty."
        path="/"
      />
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Solar panels installed on a rooftop in Guntur" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container mx-auto container-px py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="text-white animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold">
              <BadgeCheck className="h-4 w-4 text-brand-yellow" /> MNRE-approved • Tier-1 Panels • 25-yr Warranty
            </div>
            <h1 className="text-white font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-5">
              Power Your Home with the <span className="text-brand-yellow">Sun of Guntur</span>
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Cut your electricity bill by up to 92%. Sarva Solar designs, installs and services rooftop solar across Andhra Pradesh — with full subsidy assistance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="xl">
                <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5" /> Get Free Quote</a>
              </Button>
              <Button asChild variant="hero" size="xl">
                <a href="#calculator"><Sun className="h-5 w-5" /> Calculate Savings</a>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-transparent border-white text-white hover:bg-white hover:text-brand-green-dark">
                <a href={telLink}><Phone className="h-5 w-5" /> Call Now</a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "1,200+", l: "Installations" },
                { v: "8.5 MW+", l: "Powered" },
                { v: "12+ yrs", l: "Experience" },
              ].map((s) => (
                <div key={s.l} className="text-center border-l-2 border-brand-yellow pl-3">
                  <div className="text-2xl md:text-3xl font-display font-extrabold text-brand-yellow">{s.v}</div>
                  <div className="text-xs text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="calculator" className="animate-scale-in">
            <SavingsCalculator />
          </div>
        </div>
      </section>

      <TrustStats />

      {/* SERVICES */}
      <section className="section-y">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">End-to-end solar solutions for Guntur</h2>
            <p className="text-muted-foreground mt-3">From a 1kW home rooftop to multi-MW industrial plants — we design, finance, install and maintain.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard icon={<HomeIcon className="h-6 w-6" />} title="Residential Solar" desc="Rooftop solar for homes, villas & apartments. Save up to ₹5L over 25 years." href="/residential" image={residentialImg} />
            <ServiceCard icon={<Building2 className="h-6 w-6" />} title="Commercial & Industrial" desc="High-efficiency rooftop & ground-mount plants for factories, hospitals & offices." href="/commercial" image={commercialImg} />
            <ServiceCard icon={<Droplets className="h-6 w-6" />} title="Solar Pumps & Heaters" desc="Submersible & surface pumps for farms; ETC/FPC water heaters for homes & industry." href="/pumps" image={pumpImg} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-y bg-muted">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">How it works</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Solar in 4 simple steps</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { i: ClipboardCheck, t: "Free Consultation", d: "Share your bill & roof details. Get a custom quote in 24 hrs." },
              { i: Wrench, t: "Site Survey & Design", d: "Engineers visit, design optimal layout & handle paperwork." },
              { i: Zap, t: "Professional Install", d: "Tier-1 panels installed in 3–5 days with zero hassle." },
              { i: Settings, t: "Service & Monitoring", d: "App-based monitoring + 5-yr free maintenance & 25-yr warranty." },
            ].map((s, i) => (
              <div key={s.t} className="bg-white rounded-2xl p-6 shadow-soft hover-lift relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-brand-yellow text-brand-green-dark font-display font-extrabold flex items-center justify-center shadow-cta">{i + 1}</div>
                <s.i className="h-9 w-9 text-brand-green mb-3" />
                <h3 className="font-display font-bold text-lg">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="section-y">
        <div className="container mx-auto container-px">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Recent Projects</p>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Powering homes & businesses across AP</h2>
            </div>
            <Button asChild variant="brand">
              <Link to="/projects">View all projects <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.slice(0, 6).map((p) => (
              <div key={p.title} className="group rounded-2xl overflow-hidden shadow-soft hover-lift bg-white">
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-brand-yellow text-brand-green-dark text-xs font-bold px-2.5 py-1 rounded-full">{p.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-brand-green-dark">{p.title}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{p.location}</span><span className="font-semibold text-brand-blue">{p.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-y bg-gradient-to-b from-white to-muted">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Why Sarva Solar</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Engineered to last. Priced to delight.</h2>
            <p className="text-muted-foreground mt-4">We combine premium German & Indian Tier-1 components with locally trained engineers — so every install meets MNRE standards and outperforms expectations.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              {[
                { i: ShieldCheck, t: "25-Year Warranty", d: "Panel performance guaranteed for two decades." },
                { i: Award, t: "MNRE Approved", d: "Empanelled vendor for AP rooftop subsidy scheme." },
                { i: Wrench, t: "In-house Engineers", d: "No subcontractors — our team owns every install." },
                { i: BadgeCheck, t: "Subsidy Assistance", d: "We handle all DISCOM & MNRE paperwork end-to-end." },
              ].map((b) => (
                <div key={b.t} className="flex gap-3">
                  <div className="h-11 w-11 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                    <b.i className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold">{b.t}</h4>
                    <p className="text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={commercialImg} alt="Sarva Solar commercial installation" loading="lazy" className="rounded-3xl shadow-elegant" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-elegant border-l-4 border-brand-yellow max-w-xs hidden md:block">
              <div className="text-3xl font-display font-extrabold text-brand-green-dark">98%</div>
              <div className="text-sm text-muted-foreground">Customer satisfaction across 1,200+ installs</div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
