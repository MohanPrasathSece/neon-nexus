import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_OPTIONS = [
  { code: "CH", flag: "🇨🇭", dialCode: "+41", label: "Suisse", pattern: /^[0-9]{9}$/, example: "79 123 45 67" },
  { code: "FR", flag: "🇫🇷", dialCode: "+33", label: "France", pattern: /^[0-9]{9}$/, example: "6 12 34 56 78" },
  { code: "BE", flag: "🇧🇪", dialCode: "+32", label: "Belgique", pattern: /^[0-9]{8,9}$/, example: "471 23 45 67" },
  { code: "DE", flag: "🇩🇪", dialCode: "+49", label: "Allemagne", pattern: /^[0-9]{10,11}$/, example: "151 1234 5678" },
  { code: "ES", flag: "🇪🇸", dialCode: "+34", label: "Espagne", pattern: /^[0-9]{9}$/, example: "612 345 678" },
  { code: "IT", flag: "🇮🇹", dialCode: "+39", label: "Italie", pattern: /^[0-9]{9,10}$/, example: "312 345 6789" },
  { code: "NL", flag: "🇳🇱", dialCode: "+31", label: "Pays-Bas", pattern: /^[0-9]{9}$/, example: "612 345 678" },
  { code: "SE", flag: "🇸🇪", dialCode: "+46", label: "Suède", pattern: /^[0-9]{9}$/, example: "701 234 567" },
  { code: "AT", flag: "🇦🇹", dialCode: "+43", label: "Autriche", pattern: /^[0-9]{9,10}$/, example: "664 123 4567" },
  { code: "GB", flag: "🇬🇧", dialCode: "+44", label: "Royaume-Uni", pattern: /^[0-9]{10}$/, example: "7911 123456" },
  { code: "CY", flag: "🇨🇾", dialCode: "+357", label: "Chypre", pattern: /^[0-9]{8}$/, example: "96 123456" },
  { code: "US", flag: "🇺🇸", dialCode: "+1", label: "États-Unis", pattern: /^[0-9]{10}$/, example: "212 555 1234" },
  { code: "CA", flag: "🇨🇦", dialCode: "+1", label: "Canada", pattern: /^[0-9]{10}$/, example: "416 555 0100" },
  { code: "AU", flag: "🇦🇺", dialCode: "+61", label: "Australie", pattern: /^[0-9]{9}$/, example: "412 345 678" },
  { code: "IN", flag: "🇮🇳", dialCode: "+91", label: "Inde", pattern: /^[0-9]{10}$/, example: "98765 43210" },
  { code: "AE", flag: "🇦🇪", dialCode: "+971", label: "Émirats arabes unis", pattern: /^[0-9]{9}$/, example: "50 123 4567" },
  { code: "SG", flag: "🇸🇬", dialCode: "+65", label: "Singapour", pattern: /^[0-9]{8}$/, example: "9123 4567" },
  { code: "ZA", flag: "🇿🇦", dialCode: "+27", label: "Afrique du Sud", pattern: /^[0-9]{9}$/, example: "71 123 4567" },
  { code: "BR", flag: "🇧🇷", dialCode: "+55", label: "Brésil", pattern: /^[0-9]{10,11}$/, example: "11 91234-5678" },
  { code: "MX", flag: "🇲🇽", dialCode: "+52", label: "Mexique", pattern: /^[0-9]{10}$/, example: "55 1234 5678" },
  { code: "JP", flag: "🇯🇵", dialCode: "+81", label: "Japon", pattern: /^[0-9]{10,11}$/, example: "90-1234-5678" },
];

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [consent, setConsent] = useState(false);
  const [countryCode, setCountryCode] = useState("CH");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.code === countryCode) || COUNTRY_OPTIONS[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.email) {
        toast.error("Veuillez remplir tous les champs obligatoires.");
        setLoading(false);
        return;
      }

      const cleanNum = formData.phone.replace(/\s+/g, "").replace(/[^0-9]/g, "");
      if (!cleanNum) {
        setPhoneError("Veuillez entrer un numéro de téléphone.");
        setLoading(false);
        return;
      }

      if (!selectedCountry.pattern.test(cleanNum)) {
        setPhoneError(
          `Format invalide pour ${selectedCountry.label}. Exemple : ${selectedCountry.example}`
        );
        setLoading(false);
        return;
      }

      if (!consent) {
        toast.error("Vous devez reconnaître les risques pour continuer.");
        setLoading(false);
        return;
      }

      const crmResponse = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: countryCode,
          notes: "Signup from Modal",
          source: "signup-modal",
        }),
      });

      if (!crmResponse.ok) {
        const errData = await crmResponse.json().catch(() => ({}));

        if (crmResponse.status === 409 || errData?.error === "already_exists") {
          toast.info(
            "Vous avez déjà soumis une demande. Notre équipe vous contactera très bientôt. Merci de votre patience."
          );
          setLoading(false);
          return;
        }

        if (crmResponse.status === 422 || errData?.error === "invalid_lead") {
          toast.error(
            "Vos informations n'ont pas pu être vérifiées. Veuillez vérifier vos données et réessayer."
          );
          setLoading(false);
          return;
        }

        throw new Error("Échec de la synchronisation du profil.");
      }

      const authResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, countryCode }),
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json().catch(() => null);
        throw new Error(errorData?.error || "Échec de la création du profil d'authentification");
      }

      toast.success("Inscription réussie ! Bienvenue sur ORBITX FINANCE.");
      setFormData({ name: "", email: "", phone: "" });
      setConsent(false);
      onClose();
      navigate("/logged-in");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.message ||
          "Une erreur inattendue s'est produite. Veuillez réessayer dans quelques instants."
      );
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md"
          >
            <div className="glass-panel p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 neon-gradient" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-[color:var(--neon-purple)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8 pt-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color:var(--neon-purple)]/10 mb-4 glow-purple">
                  <div
                    className="w-8 h-8 rounded-full neon-gradient animate-pulse-glow"
                    style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-indigo))" }}
                  />
                </div>
                <h2 className="text-2xl font-display font-black tracking-widest text-glow-purple uppercase">
                  S'inscrire
                </h2>
                <p className="text-muted-foreground font-sans text-sm mt-2">
                  Établir l'accès au protocole.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="signup-name"
                    className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-purple)]"
                  >
                    Désignation (Nom)
                  </label>
                  <input
                    id="signup-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom de l'Opérateur"
                    required
                    className="w-full bg-background/50 border border-[color:var(--neon-purple)]/30 rounded-lg px-4 py-3 text-foreground font-sans focus:outline-none focus:border-[color:var(--neon-purple)] focus:ring-1 focus:ring-[color:var(--neon-purple)] transition-all placeholder:text-muted-foreground/50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-purple)]"
                  >
                    ID Réseau (E-mail)
                  </label>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="operator@ORBITX FINANCE.crypto"
                    required
                    className="w-full bg-background/50 border border-[color:var(--neon-purple)]/30 rounded-lg px-4 py-3 text-foreground font-sans focus:outline-none focus:border-[color:var(--neon-purple)] focus:ring-1 focus:ring-[color:var(--neon-purple)] transition-all placeholder:text-muted-foreground/50"
                  />
                </div>

                {/* Phone with country dropdown */}
                <div className="space-y-2">
                  <label
                    htmlFor="signup-phone"
                    className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-purple)]"
                  >
                    Lien de Comm (Téléphone)
                  </label>
                  <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-[130px] bg-background/50 border-[color:var(--neon-purple)]/30 text-foreground h-[46px] rounded-lg shrink-0">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent
                        className="max-h-[260px] overflow-y-auto"
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.flag} {c.dialCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={selectedCountry.example}
                      required
                      className="w-full bg-background/50 border border-[color:var(--neon-purple)]/30 rounded-lg px-4 py-3 text-foreground font-sans focus:outline-none focus:border-[color:var(--neon-purple)] focus:ring-1 focus:ring-[color:var(--neon-purple)] transition-all placeholder:text-muted-foreground/50"
                      style={{ flex: 1 }}
                    />
                  </div>
                  {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 mt-4 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[color:var(--neon-purple)]/50 bg-background/50 text-[color:var(--neon-purple)] focus:ring-[color:var(--neon-purple)]"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-muted-foreground leading-relaxed font-sans cursor-pointer"
                  >
                    Je reconnais que les investissements en cryptomonnaie sont très volatils et
                    comportent des risques importants. J'ai lu et j'accepte les Termes et Conditions.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative px-6 py-4 rounded-lg overflow-hidden group flex items-center justify-center mt-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--neon-purple)] to-[color:var(--neon-indigo)] opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2 text-background font-display font-bold tracking-widest text-sm uppercase">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Téléchargement...
                      </>
                    ) : (
                      "Créer le Profil"
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
