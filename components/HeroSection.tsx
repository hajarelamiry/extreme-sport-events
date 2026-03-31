"use client";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">  <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Paramoteur au-dessus des falaises du Maroc"
          className="w-full h-full object-cover"
        />
        {/* Overlay de base */}
        <div className="absolute inset-0 bg-white/20" />
        {/* Gradient du bas vers le haut — assombrit la zone du texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
        {/* Gradient du centre vers les bords — crée un vignettage */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Animated Particles/Lines Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              y: [0, 200, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Marrakech • Agadir • Taghazout</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-none mb-6">
            Vivez{" "}
            <span className="text-gradient">l'Adrénaline</span>
            <br />
            <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-none mb-6">des Sports Extrêmes</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-black max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Vivez des sensations fortes et des moments inoubliables grâce à nos expériences aériennes haut de gamme,
            conçues pour vous offrir liberté, adrénaline et émerveillement.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#reservation">Réserver votre expérience</a>
            </Button>
            <Button variant="heroOutline" size="xl" className="group" asChild>
              <a href="#activites">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Découvrir nos activités
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>

      {/* Side Stats */}
     // APRÈS
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 1, duration: 0.8 }}
  className="absolute right-4 2xl:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
>
  {[
    { value: "15+", label: "Ans d'expérience" },
    { value: "5000+", label: "Vols réalisés" },
    { value: "100%", label: "Sécurité" },
  ].map((stat, index) => (
    <div key={index} className="text-right">
      <div className="font-display text-2xl 2xl:text-3xl text-primary">{stat.value}</div>
      <div className="text-xs text-foreground uppercase tracking-wider">{stat.label}</div>
    </div>
  ))}
</motion.div>
    </section>
  );
};