import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 px-4"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-[10rem] md:text-[15rem] leading-none text-gradient mb-4"
        >
          404
        </motion.h1>
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
          Page introuvable
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Oups ! Cette page semble avoir pris son envol vers des horizons inconnus.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <a href="/">
              <Home className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Page précédente
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
