"use client";
import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";


const footerLinks = {
  activities: [
    { label: "Paramoteur", href: "#activites" },
    { label: "Parapente", href: "#activites" },
    { label: "Parachutisme", href: "#activites" },
    { label: "Montgolfière", href: "#activites" },
    { label: "FLY TAGHAZOUT", href: "#fly-taghazout" },
  ],
  destinations: [
    { label: "Marrakech", href: "#destinations" },
    { label: "Agadir", href: "#destinations" },
    { label: "Taghazout", href: "#destinations" },
    { label: "Autres destinations", href: "#destinations" },
  ],
  company: [
    { label: "À propos", href: "#about" },
    { label: "Pourquoi nous", href: "#pourquoi-nous" },
    { label: "Réservation", href: "#reservation" },
    { label: "Contact", href: "#reservation" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-3 mb-6">
              <img
                src="/lovable-uploads/logo-extrem-sport-footer.svg"
                alt="Extreme Sports Events"
                className="h-12 w-auto"
              />
              <span className="font-display text-xl tracking-wider text-foreground">
                EXTREME<span className="text-primary">SPORT</span> EVENTS
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Votre partenaire pour des expériences aériennes inoubliables au Maroc. Sécurité, passion et adrénaline
              garanties.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Activités</h4>
            <ul className="space-y-3">
              {footerLinks.activities.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Marrakech, Agadir, Taghazout, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+212600000000"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +212 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@extremesportsevents.ma"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  contact@extremesportsevents.ma
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HOVERSWITCH. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
