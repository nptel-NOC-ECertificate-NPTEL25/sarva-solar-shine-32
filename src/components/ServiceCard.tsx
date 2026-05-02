import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  icon, title, desc, href, image,
}: { icon: React.ReactNode; title: string; desc: string; href: string; image?: string }) {
  return (
    <Link to={href}>
      <Card className="group overflow-hidden hover-lift border-2 border-transparent hover:border-brand-yellow/60 h-full">
        {image && (
          <div className="h-44 overflow-hidden">
            <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        )}
        <div className="p-6">
          <div className="h-12 w-12 rounded-xl gradient-sun flex items-center justify-center mb-4 text-brand-green-dark">
            {icon}
          </div>
          <h3 className="font-display font-bold text-xl text-brand-green-dark">{title}</h3>
          <p className="text-muted-foreground text-sm mt-2">{desc}</p>
          <div className="inline-flex items-center gap-1 mt-4 text-brand-blue font-semibold text-sm group-hover:gap-2 transition-all">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
