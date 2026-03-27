import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, Camera, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import taghazoutImg from "@/assets/taghazout.jpg";

const features = [
  {
    icon: Star,
    text: "Un spot côtier unique révélant plages, dunes et falaises atlantiques",
  },
  {
    icon: Award,
    text: "Un encadrement premium assuré par des pilotes certifiés",
  },
  {
    icon: Camera,
    text: "Des prises de vues spectaculaires pour sublimer vos souvenirs",
  },
  {
    icon: Users,
    text: "Une activité accessible à tous, sans prérequis sportif",
  },
];

export const FlyTaghazoutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="fly-taghazout"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={taghazoutImg}
          alt="Vue aérienne de Taghazout"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-6">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Expérience Signature
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none mb-6">
              FLY{" "}
              <span className="text-gradient">TAGHAZOUT</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              FLY TAGHAZOUT est l'expérience signature d'Extreme Sports Events.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Survolez les plages mythiques de Taghazout, ses falaises sauvages, 
              ses spots de surf emblématiques et ses villages côtiers. Un vol à 
              couper le souffle, accessible à tous, réalisé par des pilotes certifiés.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground pt-2">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="xl" asChild>
              <a href="#reservation">Réserver FLY TAGHAZOUT</a>
            </Button>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-3xl" />
              <div className="absolute -inset-8 border border-primary/10 rounded-3xl" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-card rounded-2xl p-8 border border-border shadow-card">
                <div className="text-center mb-8">
                  <span className="font-display text-8xl text-gradient">FLY</span>
                  <div className="font-display text-4xl text-foreground tracking-widest mt-2">
                    TAGHAZOUT
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "20min", label: "Durée moyenne" },
                    { value: "500m", label: "Altitude max" },
                    { value: "4K", label: "Vidéo incluse" },
                    { value: "100%", label: "Sensations" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl bg-background/50"
                    >
                      <div className="font-display text-2xl text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/20 blur-3xl rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
