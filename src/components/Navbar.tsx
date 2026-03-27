import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// logo import removed

const navLinks = [
{ href: "#activites", label: "Activités" },
{ href: "#fly-taghazout", label: "Fly Taghazout" },
{ href: "#destinations", label: "Destinations" },
{ href: "#pourquoi-nous", label: "Pourquoi Nous" },
{ href: "#reservation", label: "Réservation" }];


export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ?
      "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg" :
      "bg-transparent"}`
      }>
      
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              alt="Extreme Sports Events Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
              src="/lovable-uploads/logo-extrem-sport-2.svg" 
            />
            
            <span className="font-display text-xl tracking-wider text-foreground hidden sm:block">
              EXTREME <span className="text-primary">SPORT</span> EVENTS
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group">
              
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="default" size="lg" asChild>
              <a href="#reservation">Réserver</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu">
            
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) =>
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-display text-2xl text-foreground hover:text-primary transition-colors py-2">
              
                  {link.label}
                </motion.a>
            )}
              <Button variant="hero" size="xl" className="w-full mt-6" asChild>
                <a href="#reservation">Réserver Maintenant</a>
              </Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.header>);

};