import { useState } from "react";
import { z } from "zod";
import { db } from "@/src/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit phone"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  city: z.string().optional(),
  message: z.string().optional()
});

const SERVICES = [
  "Residential Solar",
  "Commercial Solar",
  "Solar Pump",
  "Water Heater",
  "Other"
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "Guntur",
    message: ""
  });

  const update = (k: string, v: string) => {
    setForm({ ...form, [k]: v });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      const fe: any = {};
      parsed.error.issues.forEach((i) => {
        fe[i.path[0]] = i.message;
      });
      setErrors(fe);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // 🔥 Save to Firebase
      await addDoc(collection(db, "leads"), {
        ...form,
        createdAt: new Date()
      });

      // 🔥 Send Email
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form,
        "YOUR_PUBLIC_KEY"
      );

      setSubmitted(true);

      toast({
        title: "Success",
        description: "We will contact you soon"
      });

    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong"
      });
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="p-6 text-center border rounded-xl">
        <CheckCircle2 className="mx-auto text-green-600 mb-3" />
        <h3 className="text-xl font-bold">Thank You!</h3>
        <p>Our team will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <Field label="Name" error={errors.name}>
        <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      </Field>

      <Field label="Email">
        <Input value={form.email} onChange={(e) => update("email", e.target.value)} />
      </Field>

      <Field label="City">
        <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
      </Field>

      <Field label="Service" error={errors.service}>
        <Select onValueChange={(v) => update("service", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Message">
        <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} />
      </Field>

      <Button type="submit" disabled={loading} className="w-full">
        <Send className="mr-2 h-4 w-4" />
        {loading ? "Submitting..." : "Get Quote"}
      </Button>

    </form>
  );
}

function Field({ label, error, children }: any) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
