import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import commercialImg from "@/assets/commercial-solar.jpg";
import { Building2, Factory, FileCheck2, Gauge, LineChart, MessageCircle, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import { waLink } from "@/lib/site";

const SECTORS = [
  { i: Factory, t: "Manufacturing", d: "Reduce per-unit production cost with rooftop & ground-mount plants." },
  { i: Building2, t: "Commercial Buildings", d: "Offices, malls, hotels — slash diesel & grid bills." },
  { i: Gauge, t: "Hospitals", d: "Reliable, hybrid solar + battery for critical loads." },
  { i: LineChart, t: "Educational Institutions", d: "ESG-aligned solar for schools, colleges & hostels." },
];

const BENEFITS = [
  { i: TrendingDown, t: "30–60% lower energy cost", d: "Most C&I clients break even in 3–4 years." },
  { i: ShieldCheck, t: "Accelerated depreciation", d: "Claim 40% AD in year one (Sec 32 IT Act)." },
  { i: FileCheck2, t: "PPA / CAPEX / OPEX models", d: "Choose ownership or zero-investment options." },
  { i: Zap, t: "Net & gross metering", d: "We handle full APSPDCL liaison." },
];

export default function Commercial() {
  return (
    <>
      <SEO
        title="Commercial & Industrial Solar in Guntur | C&I Solar | Sarva Solar"
        description="Industrial rooftop solar plants in Guntur & AP. CAPEX, OPEX & PPA options. 3–4 year payback. Tier-1 panels, MNRE empanelled. Free feasibility study."
        path="/commercial"
      />
      <PageHero
        eyebrow="Commercial & Industrial"
        title="Industrial-grade solar that powers profit"
        subtitle="Engineered C&I solar plants from 25 kW to multi-MW — designed, financed and serviced by Sarva Solar."
      >
        <Button asChild variant="cta" size="lg">
          <a href={waLink("Hi! I want a feasibility study for a commercial solar plant.")} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" /> Request Feasibility
          </a>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Why C&I Solar</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Cut energy OPEX. Lift bottom line.</h2>
            <p className="text-muted-foreground mt-4">Commercial tariffs in AP have crossed ₹9–11/kWh. A 100kW solar plant typically saves ₹12–15 lakh per year — money straight to your P&L.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {BENEFITS.map((b) => (
                <div key={b.t} className="flex gap-3 p-4 rounded-xl bg-muted">
                  <b.i className="h-6 w-6 text-brand-green shrink-0" />
                  <div>
                    <h4 className="font-display font-bold">{b.t}</h4>
                    <p className="text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img src={commercialImg} alt="Industrial rooftop solar plant" loading="lazy" className="rounded-3xl shadow-elegant" />
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">Sectors we serve</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTORS.map((s) => (
              <Card key={s.t} className="p-6 hover-lift text-center">
                <div className="h-14 w-14 rounded-xl gradient-brand text-white mx-auto flex items-center justify-center mb-4">
                  <s.i className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-green-dark">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container mx-auto container-px">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { t: "CAPEX Model", d: "You own the plant. Best ROI & accelerated depreciation benefits.", price: "Best long-term ROI" },
              { t: "OPEX / RESCO", d: "We invest, you pay only for units consumed at a discount.", price: "Zero investment", featured: true },
              { t: "Hybrid + Storage", d: "Solar + lithium battery for round-the-clock reliability.", price: "24×7 power" },
            ].map((p) => (
              <Card key={p.t} className={`p-7 hover-lift ${p.featured ? "border-2 border-brand-yellow shadow-cta" : ""}`}>
                {p.featured && <div className="text-xs font-bold uppercase text-brand-green-dark bg-brand-yellow inline-block px-2 py-1 rounded mb-3">Recommended</div>}
                <h3 className="font-display font-extrabold text-2xl text-brand-green-dark">{p.t}</h3>
                <p className="text-muted-foreground mt-2">{p.d}</p>
                <div className="text-brand-blue font-bold mt-4">{p.price}</div>
                <Button asChild variant="brand" className="w-full mt-5">
                  <a href={waLink(`Hi! Tell me more about the ${p.t} model.`)} target="_blank" rel="noreferrer">Talk to Expert</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container mx-auto container-px max-w-3xl">
          <h2 className="text-3xl font-display font-extrabold text-center mb-8">Get a free feasibility study</h2>
          <LeadForm defaultService="Commercial & Industrial Solar" />
        </div>
      </section>

      <CtaBanner title="Let's engineer your C&I solar plant" subtitle="Site assessment, financial model & shadow analysis — within 7 days." />
    </>
  );
}
