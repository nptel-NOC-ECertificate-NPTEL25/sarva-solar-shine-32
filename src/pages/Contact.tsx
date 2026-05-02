import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, telLink, waLink } from "@/lib/site";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Sarva Solar | Solar Company in Guntur | Free Quote"
        description="Contact Sarva Solar Group, Guntur. Call +91 98765 43210, WhatsApp, or visit our Lakshmipuram office. Free site survey across Andhra Pradesh."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Talk to a Guntur solar expert"
        subtitle="We typically respond in under 30 minutes during working hours."
      />

      <section className="section-y">
        <div className="container mx-auto container-px grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover-lift">
            <div className="h-12 w-12 rounded-xl gradient-sun text-brand-green-dark flex items-center justify-center mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg">Call Us</h3>
            <p className="text-muted-foreground text-sm mt-1">Mon–Sat, 9am–7pm IST</p>
            <a href={telLink} className="block mt-3 text-brand-blue font-bold text-lg hover:underline">{SITE.phone}</a>
          </Card>
          <Card className="p-6 hover-lift">
            <div className="h-12 w-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg">WhatsApp</h3>
            <p className="text-muted-foreground text-sm mt-1">Fastest replies, 7 days a week</p>
            <Button asChild variant="whatsapp" className="mt-3">
              <a href={waLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </Button>
          </Card>
          <Card className="p-6 hover-lift">
            <div className="h-12 w-12 rounded-xl gradient-brand text-white flex items-center justify-center mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg">Email</h3>
            <p className="text-muted-foreground text-sm mt-1">For quotes & enquiries</p>
            <a href={`mailto:${SITE.email}`} className="block mt-3 text-brand-blue font-bold hover:underline break-all">{SITE.email}</a>
          </Card>
        </div>

        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-10">
          <div>
            <LeadForm />
          </div>
          <div className="space-y-5">
            <Card className="p-6">
              <h3 className="font-display font-bold text-xl text-brand-green-dark">Visit our office</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3"><MapPin className="h-5 w-5 text-brand-yellow-dark shrink-0" /><span>{SITE.address}</span></div>
                <div className="flex gap-3"><Clock className="h-5 w-5 text-brand-yellow-dark shrink-0" /><span>Monday–Saturday: 9:00 AM – 7:00 PM<br />Sunday: By appointment</span></div>
              </div>
            </Card>
            <div className="rounded-2xl overflow-hidden shadow-elegant border">
              <iframe
                title="Sarva Solar location — Guntur"
                src={SITE.mapEmbed}
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
