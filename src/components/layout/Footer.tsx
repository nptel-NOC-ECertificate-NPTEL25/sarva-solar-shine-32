import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE, telLink, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white/90 mt-20">
      <div className="container mx-auto container-px py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Sarva Solar" className="h-12 w-12 bg-white rounded-md p-1" />
            <div>
              <div className="font-display font-bold text-white">Sarva Solar</div>
              <div className="text-xs text-white/60">Group of Companies</div>
            </div>
          </div>
          <p className="text-sm text-white/70">
            Guntur's trusted partner for rooftop, commercial, and agricultural solar — backed by certified engineers and 25-year panel warranties.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-green-dark flex items-center justify-center transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/residential" className="hover:text-brand-yellow">Residential Solar</Link></li>
            <li><Link to="/commercial" className="hover:text-brand-yellow">Commercial & Industrial</Link></li>
            <li><Link to="/pumps" className="hover:text-brand-yellow">Solar Pumps</Link></li>
            <li><Link to="/pumps" className="hover:text-brand-yellow">Solar Water Heaters</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brand-yellow">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-brand-yellow">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-brand-yellow">Contact</Link></li>
            <li><a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-brand-yellow">Get a Quote</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-brand-yellow shrink-0" /><span>{SITE.address}</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-brand-yellow shrink-0" /><a href={telLink} className="hover:text-brand-yellow">{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-brand-yellow shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-brand-yellow">{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto container-px py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Sarva Solar Group of Companies. All rights reserved.</p>
          <p>Solar Installation in Guntur • Andhra Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
