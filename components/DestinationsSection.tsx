"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Plane, Sun, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    name: "Marrakech",
    description: "Vols en montgolfière, parachutisme et expériences aériennes dans un décor unique. Une destination iconique pour vivre des moments forts au lever du soleil.",
    icon: Sun,
    activities: ["Montgolfière", "Parachutisme"],
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "Agadir",
    description: "Un environnement idéal pour les sports aériens grâce à ses plages infinies, ses vents réguliers et ses paysages variés. Parfait pour des vols immersifs et fluides.",
    icon: Waves,
    activities: ["Paramoteur", "Parapente"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Taghazout",
    description: "Le spot privilégié pour le paramoteur et l'activité phare FLY TAGHAZOUT. Une zone magnifique réputée pour ses panoramas exceptionnels et son atmosphère surf.",
    icon: Plane,
    activities: ["FLY TAGHAZOUT", "Paramoteur"],
    color: "from-primary/20 to-orange-500/20",
    featured: true,
  },
];

const otherDestinations = ["Essaouira", "Ouarzazate", "Beni Mellal", "Dakhla", "Oualidia"];

export const DestinationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="destinations" className="py-24 lg:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-display text-xl tracking-wider mb-4 block">
            ZONES D'INTERVENTION
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Où profiter de vos aventures{" "}
            <span className="text-gradient">au Maroc</span>
          </h2>
        </motion.div>

        {/* Main Destinations */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative rounded-2xl p-8 border transition-all duration-500 ${
                destination.featured
                  ? "bg-gradient-card border-primary/50 shadow-glow"
                  : "bg-card/50 border-border hover:border-primary/30"
              }`}
            >
              {/* Featured Badge */}
              {destination.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full">
                  <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                    Populaire
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${destination.color} flex items-center justify-center mb-6`}>
                <destination.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-display text-3xl text-foreground">
                  {destination.name}
                </h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {destination.description}
              </p>

              {/* Activities Tags */}
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((activity) => (
                  <span
                    key={activity}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl text-foreground mb-4">
            Autres destinations au Maroc
          </h3>
          <p className="text-muted-foreground mb-6">
            Sur demande, nous organisons des expériences dans des lieux exclusifs :
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {otherDestinations.map((dest) => (
              <span
                key={dest}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border"
              >
                {dest}
              </span>
            ))}
          </div>
          <Button variant="outline" size="lg" asChild>
            <a href="#reservation">Demander une disponibilité</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
