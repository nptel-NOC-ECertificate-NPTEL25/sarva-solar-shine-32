import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[+]?[0-9\s-]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  city: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(600).optional().or(z.literal("")),
});

const SERVICES = ["Residential Solar", "Commercial & Industrial Solar", "Solar Pump", "Solar Water Heater", "Other"];

export default function LeadForm({ defaultService }: { defaultService?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: defaultService || "", city: "Guntur", message: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fe[i.path[0] as string] = i.message; });
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    // Simulated submission — wire to backend or email service when ready
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
    toast({ title: "Request received!", description: "Our solar expert will call you within 2 hours." });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-brand-green/20 bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="h-14 w-14 text-brand-green mx-auto mb-4" />
        <h3 className="font-display font-extrabold text-2xl text-brand-green-dark">Thank you!</h3>
        <p className="text-muted-foreground mt-2">Our solar expert will call you within 2 hours with a custom quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border bg-white p-6 md:p-8 shadow-soft space-y-4" noValidate>
      <div>
        <h3 className="font-display font-extrabold text-2xl text-brand-green-dark">Get a free quote</h3>
        <p className="text-sm text-muted-foreground">No obligation • Replies in 2 hrs (Mon–Sat)</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name *" error={errors.name}>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" maxLength={80} />
        </Field>
        <Field label="Phone *" error={errors.phone}>
          <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" inputMode="tel" maxLength={15} />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" maxLength={120} />
        </Field>
        <Field label="City" error={errors.city}>
          <Input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Guntur" maxLength={60} />
        </Field>
      </div>
      <Field label="Service interested in *" error={errors.service}>
        <Select value={form.service} onValueChange={(v) => update("service", v)}>
          <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
          <SelectContent>{SERVICES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <Field label="Message (optional)" error={errors.message}>
        <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your roof, monthly bill, or questions" maxLength={600} rows={4} />
      </Field>
      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
        <Send className="h-4 w-4" /> {loading ? "Sending…" : "Request Free Quote"}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
