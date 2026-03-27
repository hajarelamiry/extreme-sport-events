import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, label: "Sécurité Certifiée" },
  { icon: Award, label: "Pilotes Experts" },
  { icon: MapPin, label: "Spots Uniques" },
  { icon: Users, label: "Team Building" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-display text-xl tracking-wider mb-4 block">
              QUI SOMMES-NOUS
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              L'Excellence des{" "}
              <span className="text-gradient">Sports Aériens</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Extreme Sports Events, c'est avant tout une équipe passionnée par l'univers des sports aériens 
              et des expériences fortes. Basés à Marrakech, Agadir et Taghazout, nous créons des moments 
              qui sortent de l'ordinaire.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Nous accompagnons particuliers, entreprises, influenceurs, agences et organisateurs d'événements 
              dans la création de moments forts, sécurisés et parfaitement orchestrés.
            </p>
            
            {/* Feature Icons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" size="lg" asChild>
              <a href="#reservation">Planifier votre aventure</a>
            </Button>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse" />
              <div className="absolute inset-8 border-2 border-primary/30 rounded-full" />
              <div className="absolute inset-16 border-2 border-primary/40 rounded-full" />
              
              {/* Center content */}
              <div className="absolute inset-24 bg-gradient-card rounded-full flex flex-col items-center justify-center text-center p-6 border border-border shadow-glow">
                <span className="font-display text-6xl text-primary">15+</span>
                <span className="text-muted-foreground text-sm uppercase tracking-wider mt-2">
                  Années d'expérience
                </span>
              </div>

              {/* Floating badges */}
              {[
                { value: "5000+", label: "Vols", position: "top-0 left-0" },
                { value: "100%", label: "Sécurité", position: "top-0 right-0" },
                { value: "4.9★", label: "Avis", position: "bottom-0 left-0" },
                { value: "3", label: "Bases", position: "bottom-0 right-0" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`absolute ${badge.position} bg-card border border-border rounded-xl p-4 shadow-card`}
                >
                  <div className="font-display text-2xl text-primary">{badge.value}</div>
                  <div className="text-xs text-muted-foreground">{badge.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-2xl font-display text-foreground italic">
                "Relax, respirez… le ciel marocain vous attend."
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
