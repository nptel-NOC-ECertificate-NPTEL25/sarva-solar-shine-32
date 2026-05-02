import { MessageCircle, Phone } from "lucide-react";
import { telLink, waLink } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={telLink}
        aria-label="Call Sarva Solar"
        className="md:hidden h-14 w-14 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-elegant"
      >
        <Phone className="h-6 w-6" />
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant animate-pulse-glow"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
