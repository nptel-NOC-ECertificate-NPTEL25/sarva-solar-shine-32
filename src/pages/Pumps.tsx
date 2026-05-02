import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import CtaBanner from "@/components/CtaBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import pumpImg from "@/assets/solar-pump.jpg";
import { Droplets, Flame, MessageCircle, ShieldCheck, Sprout, Sun, Wrench } from "lucide-react";
import { waLink } from "@/lib/site";

const PUMPS = [
  { hp: "1 HP", use: "Small farms, gardens", flow: "Up to 40,000 L/day" },
  { hp: "3 HP", use: "2–4 acre farms", flow: "Up to 1,00,000 L/day" },
  { hp: "5 HP", use: "5–10 acre farms", flow: "Up to 1,80,000 L/day" },
  { hp: "7.5 HP", use: "Large farms, dairy", flow: "Up to 2,40,000 L/day" },
  { hp: "10 HP", use: "Commercial irrigation", flow: "Up to 3,20,000 L/day" },
];

const HEATERS = [
  { l: "100 LPD", use: "Small family (2–3 people)" },
  { l: "200 LPD", use: "Medium family (4–6 people)" },
  { l: "300 LPD", use: "Large family / villa" },
  { l: "500+ LPD", use: "Hotels, hostels, hospitals" },
];

export default function Pumps() {
  return (
    <>
      <SEO
        title="Solar Water Pumps & Heaters in Guntur | PM-KUSUM | Sarva Solar"
        description="Solar submersible & surface pumps (1HP–10HP) and ETC/FPC solar water heaters in Guntur. PM-KUSUM subsidy assistance. 5-year warranty."
        path="/pumps"
      />
      <PageHero
        eyebrow="Solar Pumps & Water Heaters"
        title="Free fuel for your farm and home"
        subtitle="Reliable solar pumps for irrigation and ETC/FPC water heaters that deliver hot water 365 days a year."
      >
        <Button asChild variant="cta" size="lg">
          <a href={waLink("Hi! I'm interested in a solar pump / water heater.")} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" /> Get a Quote
          </a>
        </Button>
      </PageHero>

      {/* PUMPS */}
      <section className="section-y">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-10 items-center">
          <img src={pumpImg} alt="Solar pump in agricultural field near Guntur" loading="lazy" className="rounded-3xl shadow-elegant" />
          <div>
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Solar Pumps</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">No diesel. No bills. Just sunshine.</h2>
            <p className="text-muted-foreground mt-4">Sarva Solar supplies submersible & surface pumps from 1HP to 10HP, eligible under the PM-KUSUM scheme with up to 60% central + state subsidy.</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              {[
                { i: Sprout, t: "Higher yields" },
                { i: ShieldCheck, t: "5-yr warranty" },
                { i: Wrench, t: "Free installation" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  <f.i className="h-5 w-5 text-brand-green" />
                  <span className="font-semibold text-sm">{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container mx-auto container-px">
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-center mb-8">Available pump capacities</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PUMPS.map((p) => (
              <Card key={p.hp} className="p-5 hover-lift text-center">
                <Droplets className="h-8 w-8 text-brand-blue mx-auto mb-2" />
                <div className="font-display font-extrabold text-2xl text-brand-green-dark">{p.hp}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.use}</div>
                <div className="text-sm font-semibold text-brand-blue mt-2">{p.flow}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HEATERS */}
      <section className="section-y">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Solar Water Heaters</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Hot water, every single day</h2>
            <p className="text-muted-foreground mt-3">ETC & FPC heaters with stainless steel tanks. Pays back in 2–3 years.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HEATERS.map((h) => (
              <Card key={h.l} className="p-6 hover-lift text-center">
                <div className="h-14 w-14 rounded-xl gradient-sun mx-auto flex items-center justify-center mb-3">
                  <Flame className="h-7 w-7 text-brand-green-dark" />
                </div>
                <div className="font-display font-extrabold text-2xl text-brand-green-dark">{h.l}</div>
                <p className="text-sm text-muted-foreground mt-1">{h.use}</p>
                <Button asChild variant="cta" size="sm" className="mt-4 w-full">
                  <a href={waLink(`Hi! I want pricing for a ${h.l} solar water heater.`)} target="_blank" rel="noreferrer">Get Price</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container mx-auto container-px max-w-3xl">
          <h2 className="text-3xl font-display font-extrabold text-center mb-8">Request a quote</h2>
          <LeadForm defaultService="Solar Pump" />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
