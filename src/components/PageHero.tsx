import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-blue-dark text-white">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto container-px py-16 md:py-24 relative">
        <div className="max-w-3xl animate-fade-in">
          {eyebrow && <p className="text-brand-yellow font-semibold uppercase tracking-wider text-sm">{eyebrow}</p>}
          <h1 className="text-white font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mt-3">{title}</h1>
          {subtitle && <p className="text-white/85 text-lg mt-5 max-w-2xl">{subtitle}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
