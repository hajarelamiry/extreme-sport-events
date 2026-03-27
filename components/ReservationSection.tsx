"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, Mail, Phone, CalendarIcon, Users, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const activities = [
  { value: "paramoteur", label: "Paramoteur" },
  { value: "parapente", label: "Parapente" },
  { value: "parachutisme", label: "Parachutisme" },
  { value: "montgolfiere", label: "Montgolfière" },
  { value: "fly-taghazout", label: "FLY TAGHAZOUT" },
];

export const ReservationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form         = e.target as HTMLFormElement;
    const name         = (form.querySelector('[name="name"]') as HTMLInputElement)?.value.trim();
    const emailVal     = (form.querySelector('[name="email"]') as HTMLInputElement)?.value.trim();
    const phone        = (form.querySelector('[name="phone"]') as HTMLInputElement)?.value.trim();
    const participants = (form.querySelector('[name="participants"]') as HTMLInputElement)?.value;

    if (!name) {
      toast.error("Merci d'indiquer votre nom et prénom 👤");
      setIsSubmitting(false);
      return;
    }
    if (!emailVal) {
      toast.error("Votre adresse email est requise 📧");
      setIsSubmitting(false);
      return;
    }
    if (!phone) {
      toast.error("Ajoutez un numéro de téléphone pour qu'on puisse vous joindre 📞");
      setIsSubmitting(false);
      return;
    }
    if (!selectedActivity) {
      toast.error("Choisissez une activité pour continuer 🪂");
      setIsSubmitting(false);
      return;
    }
    if (!selectedDate) {
      toast.error("Sélectionnez une date souhaitée pour votre expérience 📅");
      setIsSubmitting(false);
      return;
    }
    if (!participants) {
      toast.error("Combien de personnes participent ? 👥");
      setIsSubmitting(false);
      return;
    }

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA non prêt");
      setIsSubmitting(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("reservation");

    const data = {
      name,
      email:        emailVal,
      phone,
      activity:     selectedActivity,
      date:         format(selectedDate, "yyyy-MM-dd"),
      participants,
      message:      (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value,
      recaptchaToken,
    };

    console.log("data envoyée:", data);

    const res = await fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Merci, votre demande a été envoyée avec succès.", {
        description: "Notre équipe vous recontactera dans les plus brefs délais.",
        position: "top-center",
        duration: 5000,
        style: { fontSize: "16px", padding: "20px 24px", minWidth: "380px" },
      });
      form.reset();
      setSelectedActivity("");
      setSelectedDate(undefined);
    } else {
      const { error } = await res.json();
      toast.error(error || "Une erreur est survenue", {
        position: "top-center",
        duration: 5000,
        style: { fontSize: "16px", padding: "20px 24px", minWidth: "380px" },
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="reservation" className="py-24 lg:py-32 bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-display text-xl tracking-wider mb-4 block">
              RÉSERVEZ VOTRE EXPÉRIENCE
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              Prêt à vivre{" "}
              <span className="text-gradient">l'adrénaline</span> ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Notre équipe vous accompagne pour choisir l'activité idéale et organiser
              votre expérience dans les meilleures conditions.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Phone, label: "Téléphone", value: "+212 6 00 00 00 00" },
                { icon: Mail, label: "Email", value: "contact@extremesportsevents.ma" },
              ].map((contact) => (
                <div key={contact.label} className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{contact.label}</div>
                    <div className="font-semibold text-foreground">{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {["Réponse sous 24h", "Devis gratuit", "Sans engagement"].map((badge) => (
                <span key={badge} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="p-8 lg:p-10 rounded-3xl bg-card border border-border shadow-card">
              <h3 className="font-display text-2xl text-foreground mb-6">
                Formulaire de réservation
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input name="name" type="text" placeholder="Nom et prénom" className="pl-12 h-12 bg-background border-border" />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input name="email" type="email" placeholder="Email" className="pl-12 h-12 bg-background border-border" />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input name="phone" type="tel" placeholder="Téléphone" className="pl-12 h-12 bg-background border-border" />
                </div>

                {/* Activity */}
                <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                  <SelectTrigger className="h-12 bg-background border-border">
                    <SelectValue placeholder="Type d'activité" />
                  </SelectTrigger>
                  <SelectContent>
                    {activities.map((activity) => (
                      <SelectItem key={activity.value} value={activity.value}>
                        {activity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date & Participants */}
                <div className="grid grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-12 bg-background border-border justify-start text-left font-normal w-full",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: fr }) : "Date souhaitée"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input name="participants" type="number" placeholder="Participants" min="1" className="pl-12 h-12 bg-background border-border" />
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea name="message" placeholder="Demandes spéciales (optionnel)" className="pl-12 pt-3 min-h-[100px] bg-background border-border resize-none" />
                </div>

                {/* Submit */}
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><span className="animate-spin mr-2">◌</span>Envoi en cours...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />Réserver maintenant</>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};