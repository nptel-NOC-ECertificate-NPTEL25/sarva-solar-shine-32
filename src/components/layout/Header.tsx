import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE, telLink, waLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/residential", label: "Residential" },
  { to: "/commercial", label: "Commercial & Industrial" },
  { to: "/pumps", label: "Pumps & Heaters" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur shadow-soft" : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto container-px flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Sarva Solar logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-extrabold text-brand-green-dark text-base md:text-lg">Sarva Solar</div>
            <div className="text-[10px] md:text-xs text-muted-foreground -mt-0.5">Group of Companies • Guntur</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                  isActive
                    ? "text-brand-green-dark bg-muted"
                    : "text-foreground/80 hover:text-brand-green-dark hover:bg-muted"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink}
            aria-label="Call us"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-brand-blue hover:bg-muted"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{SITE.phone}</span>
          </a>
          <Button asChild variant="cta" size="sm" className="hidden sm:inline-flex">
            <a href={waLink()} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" /> Get Quote
            </a>
          </Button>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white animate-fade-in">
          <nav className="container mx-auto container-px py-3 flex flex-col">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "py-3 px-2 text-base font-semibold border-b border-border/60",
                    isActive ? "text-brand-green-dark" : "text-foreground/80"
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-3">
              <Button asChild variant="outline" className="flex-1">
                <a href={telLink}><Phone className="h-4 w-4" /> Call</a>
              </Button>
              <Button asChild variant="cta" className="flex-1">
                <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
