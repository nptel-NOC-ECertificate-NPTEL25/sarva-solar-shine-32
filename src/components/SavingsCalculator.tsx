import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { IndianRupee, Sun, TrendingUp, Zap, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

// Assumptions for Guntur, AP
const TARIFF = 8.5;            // ₹/kWh avg residential
const SUN_HOURS = 5.2;         // peak sun hours/day
const COST_PER_KW = 60000;     // ₹/kW installed (after subsidy avg)
const DEGRADATION = 0.005;     // 0.5%/yr
const YEARS = 25;

function inr(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export default function SavingsCalculator({ compact = false }: { compact?: boolean }) {
  const [bill, setBill] = useState<number>(3500);

  const result = useMemo(() => {
    const monthlyUnits = bill / TARIFF;
    const dailyUnits = monthlyUnits / 30;
    const sizeKw = Math.max(1, Math.round((dailyUnits / SUN_HOURS) * 10) / 10);
    const cost = sizeKw * COST_PER_KW;
    const monthlySavings = monthlyUnits * TARIFF * 0.92; // 92% offset
    const yearlySavings = monthlySavings * 12;
    const payback = cost / yearlySavings;
    let lifetime = 0;
    for (let y = 0; y < YEARS; y++) lifetime += yearlySavings * Math.pow(1 - DEGRADATION, y);
    const co2 = sizeKw * 1500 * YEARS / 1000; // tonnes
    return { sizeKw, cost, monthlySavings, yearlySavings, payback, lifetime, co2 };
  }, [bill]);

  return (
    <Card className={`p-6 md:p-8 gradient-card border-2 border-brand-green/10 shadow-elegant ${compact ? "" : "lg:p-10"}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl gradient-sun flex items-center justify-center">
          <Sun className="h-6 w-6 text-brand-green-dark" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-extrabold text-brand-green-dark">Solar Savings Calculator</h3>
          <p className="text-sm text-muted-foreground">See your savings in 10 seconds</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="bill" className="text-sm font-semibold mb-2 block">
            Your average monthly electricity bill (₹)
          </Label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="bill"
                type="number"
                min={500}
                max={500000}
                value={bill}
                onChange={(e) => setBill(Math.max(500, Math.min(500000, Number(e.target.value) || 0)))}
                className="pl-9 h-12 text-lg font-semibold"
              />
            </div>
          </div>
          <Slider
            value={[bill]}
            onValueChange={(v) => setBill(v[0])}
            min={500}
            max={50000}
            step={250}
            className="mt-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₹500</span><span>₹50,000+</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <Stat icon={<Zap className="h-4 w-4" />} label="System Size" value={`${result.sizeKw} kW`} />
          <Stat icon={<IndianRupee className="h-4 w-4" />} label="Est. Investment" value={`₹${inr(result.cost)}`} />
          <Stat icon={<TrendingUp className="h-4 w-4" />} label="Monthly Savings" value={`₹${inr(result.monthlySavings)}`} highlight />
          <Stat icon={<Sun className="h-4 w-4" />} label="Payback" value={`${result.payback.toFixed(1)} yrs`} />
        </div>

        <div className="bg-brand-green-dark text-white rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-brand-yellow font-semibold">25-year savings</div>
            <div className="text-2xl md:text-3xl font-display font-extrabold">₹{inr(result.lifetime)}</div>
            <div className="text-xs text-white/70 mt-1">Plus {result.co2.toFixed(1)} tonnes CO₂ saved 🌱</div>
          </div>
          <Button asChild variant="cta" size="lg">
            <a
              href={waLink(
                `Hi Sarva Solar! My monthly bill is ₹${bill}. I want a free quote for ~${result.sizeKw} kW system.`
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> Get Free Quote
            </a>
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground">
          *Estimates based on Guntur solar irradiance (5.2 sun-hrs/day) & avg AP tariff ₹{TARIFF}/kWh. Final quote depends on roof area, shading & subsidy eligibility.
        </p>
      </div>
    </Card>
  );
}

function Stat({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-3 border ${highlight ? "bg-brand-yellow/15 border-brand-yellow/40" : "bg-white border-border"}`}>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">{icon}{label}</div>
      <div className={`text-base md:text-lg font-display font-extrabold mt-1 ${highlight ? "text-brand-green-dark" : "text-brand-blue"}`}>
        {value}
      </div>
    </div>
  );
}
