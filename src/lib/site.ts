export const SITE = {
  name: "Sarva Solar Group of Companies",
  shortName: "Sarva Solar",
  tagline: "Powering Guntur with Clean, Affordable Solar Energy",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "919876543210",
  email: "info@sarvasolar.in",
  address: "5-12-34, Lakshmipuram, Guntur, Andhra Pradesh 522007, India",
  city: "Guntur",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15311.96!2d80.4365!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGuntur!5e0!3m2!1sen!2sin!4v1700000000000",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
};

export const waLink = (msg = "Hi Sarva Solar, I'd like a free quote.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = `tel:${SITE.phoneRaw}`;
