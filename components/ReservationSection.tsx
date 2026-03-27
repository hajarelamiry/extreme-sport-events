"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, Mail, Phone, Calendar, Users, MessageSquare, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [phone, setPhone]             = useState("");
  const [date, setDate]               = useState("");
  const [participants, setParticipants] = useState("");
  const [message, setMessage]         = useState("");

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const removeActivity = (value: string) => {
    setSelectedActivities((prev) => prev.filter((v) => v !== value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA non prêt, réessayez.");
      return;
    }
    if (selectedActivities.length === 0) {
      toast.error("Veuillez sélectionner au moins une activité.");
      return;
    }
  
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
  
    try {
      const recaptchaToken = await executeRecaptcha("reservation_form");
  
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          participants,
          message,
          activities: selectedActivities,
          recaptchaToken,
        }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Une erreur est survenue.");
        return;
      }
  
      setIsSuccess(true);
      form.reset();
      setName(""); setEmail(""); setPhone("");
      setDate(""); setParticipants(""); setMessage("");
      setSelectedActivities([]);
    } catch {
      toast.error("Erreur réseau. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-24 lg:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background decoration */}
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
              Prêt à vivre <span className="text-gradient">l'adrénaline</span> ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Notre équipe vous accompagne pour choisir l'activité idéale et organiser votre expérience dans les
              meilleures conditions.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Phone, label: "Téléphone", value: "+212 661-447158" },
                { icon: Mail, label: "Email", value: "contact@extremesportsevents.ma" },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border"
                >
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

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {["Réponse sous 24h"].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
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
              <h3 className="font-display text-2xl text-foreground mb-6">Formulaire de réservation</h3>

              <div className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nom et prénom"
                    required
                    className="pl-12 h-12 bg-background border-border"
                    value={name} onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="pl-12 h-12 bg-background border-border" />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="phone"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Téléphone"
                    required
                    className="pl-12 h-12 bg-background border-border"
                  />
                </div>

                {/* Activity Multi-Select */}
                <Popover open={activitiesOpen} onOpenChange={setActivitiesOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex h-12 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <span className={selectedActivities.length === 0 ? "text-muted-foreground" : "text-foreground"}>
                        {selectedActivities.length === 0
                          ? "Type d'activité"
                          : `${selectedActivities.length} activité(s) sélectionnée(s)`}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2" align="start">
                    <div className="space-y-1">
                      {activities.map((activity) => (
                        <label
                          key={activity.value}
                          className="flex items-center gap-3 rounded-md px-2 py-2 cursor-pointer hover:bg-accent"
                        >
                          <Checkbox
                            checked={selectedActivities.includes(activity.value)}
                            onCheckedChange={() => toggleActivity(activity.value)}
                          />
                          <span className="text-sm">{activity.label}</span>
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                {selectedActivities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedActivities.map((value) => {
                      const activity = activities.find((a) => a.value === value);
                      return (
                        <span
                          key={value}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {activity?.label}
                          <button type="button" onClick={() => removeActivity(value)} className="hover:text-primary/70">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Date & Participants */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required className="pl-12 h-12 bg-background border-border" />
                  </div>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      name= "participants"
                      value={participants} onChange={(e) => setParticipants(e.target.value)}
                      placeholder="Participants"
                      min="1"
                      required
                      className="pl-12 h-12 bg-background border-border"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    name="specialRequests"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Demandes spéciales (optionnel)"
                    className="pl-12 pt-3 min-h-[100px] bg-background border-border resize-none"
                  />
                </div>

                {/* Submit */}
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Réserver maintenant
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      {isSuccess && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl p-8 bg-green-600 text-white rounded-xl shadow-2xl border border-green-500 flex flex-col items-center justify-center animate-slideDown">
    <X
      className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-green-200"
      onClick={() => setIsSuccess(false)}
    />
    <h3 className="text-2xl font-bold mb-2">Merci ! 🎉</h3>
    <p className="text-lg text-center">
      Votre réservation a été envoyée avec succès.<br />
      Notre équipe vous contactera dans les plus brefs délais.
    </p>
  </div>
)}

<style jsx>{`
  .animate-slideDown {
    animation: slideDown 0.5s ease forwards;
  }
  @keyframes slideDown {
    0% { transform: translate(-50%, -200%); opacity: 0; }
    100% { transform: translate(-50%, 0); opacity: 1; }
  }
`}</style>
      
    </section>
    
  );
};
