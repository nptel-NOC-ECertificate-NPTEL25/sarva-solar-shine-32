import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import TrustStats from "@/components/TrustStats";
import { Card } from "@/components/ui/card";
import commercialImg from "@/assets/commercial-solar.jpg";
import { Award, BadgeCheck, HeartHandshake, Leaf, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";

const VALUES = [
  { i: ShieldCheck, t: "Integrity", d: "Transparent quotes, no hidden costs — ever." },
  { i: Lightbulb, t: "Innovation", d: "We deploy the latest in PV, inverter & monitoring tech." },
  { i: HeartHandshake, t: "Customer-first", d: "Your savings and uptime are our success metrics." },
  { i: Leaf, t: "Sustainability", d: "Every kW we install offsets 1.5 tonnes of CO₂ a year." },
];

const CERTS = [
  "MNRE Empanelled Channel Partner",
  "ISO 9001:2015 Certified",
  "APSPDCL Approved Vendor",
  "BIS / IEC Certified Components",
  "Class A Electrical Contractor",
];

export default function About() {
  return (
    <>
      <SEO
        title="About Sarva Solar Group | Solar Company in Guntur, AP"
        description="Sarva Solar Group of Companies — Guntur's trusted solar EPC since 2013. 1,200+ installations, 8.5MW+ powered. Mission: clean, affordable energy for every Andhra home."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="Guntur's solar energy partner since 2013"
        subtitle="We're a homegrown Andhra Pradesh company on a mission: to make every roof an income source."
      />

      <section className="section-y">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-center">
          <img src={commercialImg} alt="Sarva Solar team" loading="lazy" className="rounded-3xl shadow-elegant" />
          <div>
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Our story</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">From a small Guntur workshop to AP-wide impact</h2>
            <div className="space-y-4 text-muted-foreground mt-5 text-base leading-relaxed">
              <p>Sarva Solar Group was founded in 2013 by a team of electrical engineers from Guntur with a simple goal: bring high-quality, affordable solar to every Andhra household and business.</p>
              <p>Today, we're a multi-vertical group serving residential, commercial, industrial and agricultural customers across Guntur, Krishna, Prakasam and West Godavari districts — with our own design, install and service teams.</p>
              <p>Every project we deliver is a long-term relationship. That's why we don't subcontract installs, and why our customers come back to us for their second and third systems.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustStats />

      <section className="section-y">
        <div className="container mx-auto container-px grid md:grid-cols-2 gap-6">
          <Card className="p-8 gradient-card border-l-4 border-brand-green">
            <Target className="h-10 w-10 text-brand-green mb-4" />
            <h3 className="font-display font-extrabold text-2xl">Our Mission</h3>
            <p className="text-muted-foreground mt-3">To make every roof in Andhra Pradesh a clean energy generator — by removing the cost, complexity and trust barriers from solar.</p>
          </Card>
          <Card className="p-8 gradient-card border-l-4 border-brand-yellow">
            <Users className="h-10 w-10 text-brand-yellow-dark mb-4" />
            <h3 className="font-display font-extrabold text-2xl">Our Vision</h3>
            <p className="text-muted-foreground mt-3">A solar-powered Andhra Pradesh by 2035 — with 1 million homes, 50,000 farms and 10,000 businesses running on Sarva-engineered solar.</p>
          </Card>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">Our values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <Card key={v.t} className="p-6 text-center hover-lift">
                <div className="h-14 w-14 mx-auto rounded-xl gradient-brand text-white flex items-center justify-center mb-4">
                  <v.i className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold text-lg">{v.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{v.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm">Certifications</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-2">Accredited & approved</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {CERTS.map((c) => (
              <div key={c} className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-soft border">
                <Award className="h-6 w-6 text-brand-yellow-dark shrink-0" />
                <span className="font-semibold text-sm">{c}</span>
                <BadgeCheck className="h-5 w-5 text-brand-green ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
