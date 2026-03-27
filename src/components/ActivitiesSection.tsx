import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import paramoteurImg from "@/assets/paramoteur.jpg";
import parapenteImg from "@/assets/parapente.jpg";
import parachutismeImg from "@/assets/parachutisme.jpg";
import montgolfiereImg from "@/assets/montgolfiere.jpg";

const activities = [
  {
    id: "paramoteur",
    title: "Paramoteur",
    description: "Un vol proche du sol, offrant une sensation de liberté pure. Une expérience douce mais intense pour découvrir le ciel autrement.",
    image: paramoteurImg,
    cta: "Découvrir le paramoteur",
  },
  {
    id: "parapente",
    title: "Parapente",
    description: "Laissez-vous porter par le vent et savourez la légèreté du vol en tandem. Une immersion totale dans le silence et la beauté des paysages.",
    image: parapenteImg,
    cta: "Réserver un vol parapente",
  },
  {
    id: "parachutisme",
    title: "Parachutisme",
    description: "L'ultime montée d'adrénaline : une chute libre à haute vitesse suivie d'un vol paisible sous voile. Une expérience puissante et mémorable.",
    image: parachutismeImg,
    cta: "Réserver votre saut",
  },
  {
    id: "montgolfiere",
    title: "Montgolfière",
    description: "Un vol calme et poétique au lever du soleil. Idéal pour admirer des panoramas majestueux et vivre un moment suspendu hors du temps.",
    image: montgolfiereImg,
    cta: "Explorer la montgolfière",
  },
];

export const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="activites" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-display text-xl tracking-wider mb-4 block">
            NOS ACTIVITÉS EXTRÊMES
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Vivez l'adrénaline, l'évasion et des moments qui restent{" "}
            <span className="text-gradient">gravés</span>
          </h2>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <motion.article
              key={activity.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Activity Number */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <span className="font-display text-xl text-primary-foreground">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-3xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {activity.description}
                </p>
                <Button 
                  variant="outline" 
                  className="group/btn"
                  asChild
                >
                  <a href="#reservation">
                    {activity.cta}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
