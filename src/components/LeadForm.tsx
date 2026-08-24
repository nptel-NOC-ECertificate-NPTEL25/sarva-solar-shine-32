import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/usePublicContent";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit phone"),
  email: z.string().email("Enter a valid email").max(200).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service").max(120),
  city: z.string().max(120).optional(),
  message: z.string().max(2000).optional(),
});

const FALLBACK_SERVICES = [
  "Residential Solar",
  "Commercial Solar",
  "Solar Pump",
  "Water Heater",
  "Other",
];

export default function LeadForm({
  source = "website",
  defaultService = "",
}: {
  source?: string;
  defaultService?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { data: services } = useServices();

  const options = services?.length
    ? Array.from(new Set([...services.map((s) => s.name), ...(defaultService ? [defaultService] : [])]))
    : Array.from(new Set([...FALLBACK_SERVICES, ...(defaultService ? [defaultService] : [])]));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    city: "Guntur",
    message: "",
    // honeypot — must stay empty
    company_website: "",
  });

  const update = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fe[String(i.path[0])] = i.message;
      });
      setErrors(fe);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          ...parsed.data,
          source,
          honeypot: form.company_website,
          page_path: typeof window !== "undefined" ? window.location.pathname : null,
        },
      });

      if (error) throw error;
      if (data && (data as { error?: string }).error) {
        throw new Error((data as { error?: string }).error);
      }

      setSubmitted(true);
      toast({
        title: "Enquiry received",
        description: "Our team will contact you shortly.",
      });
    } catch (err) {
      console.error("Lead submission error:", err);
      toast({
        title: "Submission failed",
        description: "Please try again in a moment, or reach us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center border rounded-xl bg-card">
        <CheckCircle2 className="mx-auto text-primary mb-3 h-10 w-10" />
        <h3 className="text-xl font-bold">Thank You!</h3>
        <p className="text-muted-foreground mt-1">Our team will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Name" error={errors.name}>
        <Input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} inputMode="numeric" autoComplete="tel" />
      </Field>

      <Field label="Email" error={errors.email}>
        <Input value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
      </Field>

      <Field label="City">
        <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
      </Field>

      <Field label="Service" error={errors.service}>
        <Select value={form.service} onValueChange={(v) => update("service", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {options.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Message">
        <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} />
      </Field>

      {/* Honeypot: hidden from users, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={form.company_website}
          onChange={(e) => update("company_website", e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        <Send className="mr-2 h-4 w-4" />
        {loading ? "Submitting..." : "Get Quote"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
