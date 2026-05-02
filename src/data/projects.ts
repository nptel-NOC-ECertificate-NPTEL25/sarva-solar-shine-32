import residentialImg from "@/assets/residential-solar.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import pumpImg from "@/assets/solar-pump.jpg";
import heroImg from "@/assets/hero-solar.jpg";

export type Project = {
  title: string;
  category: "Residential" | "Commercial" | "Industrial" | "Agricultural";
  size: string;
  location: string;
  image: string;
};

export const PROJECTS: Project[] = [
  { title: "5kW Rooftop Villa", category: "Residential", size: "5 kW", location: "Brodipet, Guntur", image: residentialImg },
  { title: "120kW Factory Rooftop", category: "Industrial", size: "120 kW", location: "Mangalagiri", image: commercialImg },
  { title: "5HP Agricultural Pump", category: "Agricultural", size: "5 HP", location: "Tenali", image: pumpImg },
  { title: "8kW Independent Home", category: "Residential", size: "8 kW", location: "Lakshmipuram", image: heroImg },
  { title: "75kW Hospital Plant", category: "Commercial", size: "75 kW", location: "Guntur City", image: commercialImg },
  { title: "3kW Apartment Setup", category: "Residential", size: "3 kW", location: "Pattabhipuram", image: residentialImg },
  { title: "200kW Cold Storage", category: "Industrial", size: "200 kW", location: "Chilakaluripet", image: commercialImg },
  { title: "10HP Borewell Pump", category: "Agricultural", size: "10 HP", location: "Narasaraopet", image: pumpImg },
];
