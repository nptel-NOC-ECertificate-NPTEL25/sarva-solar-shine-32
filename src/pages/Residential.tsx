import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import SavingsCalculator from "@/components/SavingsCalculator";
import LeadForm from "@/components/LeadForm";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import residentialImg from "@/assets/residential-solar.jpg";
import { Battery, BadgeCheck, Home, IndianRupee, ShieldCheck, Sun, Zap, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

const FEATURES = [
  { i: IndianRupee, t: "Save up to 92%", d: "Slash your monthly bill from day one." },
  { i: ShieldCheck, t: "25-Year Warranty", d: "On Tier-1 monocrystalline panels." },
  { i: BadgeCheck, t: "Govt Subsidy", d: "Up to ₹78,000 for residential rooftops." },
  { i: Battery, t: "Battery Optional", d: "Add lithium storage for 24×7 backup." },
  { i: Zap, t: "Net Metering", d: "Sell excess power back to APSPDCL." },
  { i: Home, t: "Any Roof Type", d: "RCC, tin-shed, sloped — we engineer it." },
];

const PACKAGES = [
  { kw: "1–3 kW", suit: "1 BHK / 2 BHK Flat", bill: "₹1,500–₹3,000", price: "₹65,000 – ₹1.85L*" },
  { kw: "3–5 kW", suit: "Independent home", bill: "₹3,000–₹5,000", price: "₹1.85L – ₹3L*" },
  { kw: "5–10 kW", suit: "Villa / large home", bill: "₹5,000–₹10,000", price: "₹3L – ₹5.5L*" },
];

export default function Residential() {
  return (
    <>
      <SEO
        title="Residential Solar Panels in Guntur | Rooftop Solar | Sarva Solar"
        description="Install rooftop solar at home in Guntur. Tier-1 panels, 25-yr warranty, full subsidy paperwork. Save up to ₹5 lakh over 25 years. Free site survey."
        path="/residential"
      />
      <PageHero
        eyebrow="Residential Solar"
        title="Rooftop solar that pays for itself"
        subtitle="Tier-1 panels, premium inverters and end-to-end subsidy support — designed for Guntur homes."
      >
        <Button asChild variant="cta" size="lg">
          <a href={waLink("Hi! I want a quote for residential rooftop solar.")} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" /> Get Free Quote
          </a>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-10 items-center">
          <img src={residentialImg} alt="Residential solar installation in Guntur" loading="lazy" className="rounded-3xl shadow-elegant" />
          <div>
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Built for Indian homes</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Why home solar makes sense now</h2>
            <p className="text-muted-foreground mt-4">With AP electricity tariffs rising every year, a one-time solar investment locks in your power cost for the next 25 years. Combined with the central PM Surya Ghar subsidy, payback is typically 3–5 years.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {FEATURES.map((f) => (
                <div key={f.t} className="flex gap-3 p-4 rounded-xl bg-muted">
                  <f.i className="h-6 w-6 text-brand-green shrink-0" />
                  <div>
                    <h4 className="font-display font-bold">{f.t}</h4>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-y bg-muted">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">Popular home packages</h2>
            <p className="text-muted-foreground mt-3">Indicative pricing — final quote depends on roof, brand & subsidy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((p, i) => (
              <Card key={p.kw} className={`p-7 hover-lift ${i === 1 ? "border-2 border-brand-yellow shadow-cta" : ""}`}>
                {i === 1 && <div className="text-xs font-bold uppercase text-brand-green-dark bg-brand-yellow inline-block px-2 py-1 rounded mb-3">Most popular</div>}
                <Sun className="h-8 w-8 text-brand-yellow-dark mb-3" />
                <h3 className="font-display font-extrabold text-2xl text-brand-green-dark">{p.kw}</h3>
                <p className="text-sm text-muted-foreground">{p.suit}</p>
                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Suits bill</span><span className="font-semibold">{p.bill}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Investment</span><span className="font-semibold text-brand-blue">{p.price}</span></div>
                </div>
                <Button asChild variant="cta" className="w-full mt-6">
                  <a href={waLink(`Hi! I'm interested in the ${p.kw} home package.`)} target="_blank" rel="noreferrer">Get Quote</a>
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">*Before subsidy. Govt subsidy: ₹30k for 1kW, ₹60k for 2kW, ₹78k for ≥3kW.</p>
        </div>
      </section>

      {/* Calculator + Form */}
      <section className="section-y">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-8">
          <SavingsCalculator />
          <LeadForm defaultService="Residential Solar" />
        </div>
      </section>

      <CtaBanner title="Get a residential solar quote today" subtitle="Free site survey within 48 hours across Guntur district." />
    </>
  );
}
