import { useCountUp } from "@/hooks/useCountUp";
import { Award, Users, Zap, Leaf } from "lucide-react";

const STATS = [
  { icon: Users, value: 1200, suffix: "+", label: "Happy Customers" },
  { icon: Zap, value: 8500, suffix: "+ kW", label: "Solar Installed" },
  { icon: Leaf, value: 12000, suffix: "T", label: "CO₂ Offset" },
  { icon: Award, value: 12, suffix: "+ Yrs", label: "Industry Experience" },
];

export default function TrustStats() {
  return (
    <section className="bg-gradient-to-br from-brand-green-dark to-brand-blue-dark text-white py-14 md:py-20">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-brand-yellow font-semibold uppercase tracking-wider text-sm">Trusted across Andhra Pradesh</p>
          <h2 className="text-3xl md:text-4xl text-white font-display font-extrabold mt-2">A track record you can trust</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, suffix, label }: { icon: any; value: number; suffix: string; label: string }) {
  const { ref, val } = useCountUp(value);
  return (
    <div ref={ref} className="text-center p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover-lift">
      <div className="h-12 w-12 mx-auto rounded-xl bg-brand-yellow text-brand-green-dark flex items-center justify-center mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-3xl md:text-4xl font-display font-extrabold text-white">
        {val.toLocaleString("en-IN")}<span className="text-brand-yellow">{suffix}</span>
      </div>
      <div className="text-sm text-white/75 mt-1">{label}</div>
    </div>
  );
}
