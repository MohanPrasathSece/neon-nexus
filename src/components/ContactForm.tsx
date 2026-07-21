import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackPixelEvent } from "@/lib/pixel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRY_OPTIONS = [
  { code: "IE", flag: "🇮🇪", dialCode: "+353", label: "Ireland", pattern: /^[0-9]{9}$/, example: "87 123 4567" },
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

export function ContactForm({ formId = "contact" }: { formId?: string }) {
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const selectedCountry =
    COUNTRY_OPTIONS.find((c) => c.code === countryCode) || COUNTRY_OPTIONS[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: countryCode,
          message: formData.message || "Aucun message fourni",
          source: `${formId}-form`,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));

        if (response.status === 409 || errData?.error === "already_exists") {
          toast.info(
            "Nous avons déjà reçu votre demande. Notre équipe vous contactera très bientôt. Merci de votre confiance."
          );
          setLoading(false);
          return;
        }

        if (response.status === 422 || errData?.error === "invalid_lead") {
          toast.error(
            "Vos coordonnées n'ont pas pu être validées. Veuillez vérifier les informations saisies et réessayer."
          );
          setLoading(false);
          return;
        }

        throw new Error("Échec de la soumission");
      }

      toast.success("Merci de nous avoir contactés. Votre message a bien été reçu et notre équipe vous répondra dans les plus brefs délais.");
      
      // Track Meta Pixel Lead event
      trackPixelEvent("Lead", {
        content_name: `${formId}-form`,
        email: formData.email
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error(error);
      toast.error(
        "Une erreur inattendue s'est produite. Veuillez réessayer dans quelques instants."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border p-8 rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor={`${formId}-name`}
            className="text-sm font-medium text-foreground"
          >
            Nom Complet *
          </label>
          <Input
            id={`${formId}-name`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jean Dupont"
            required
            className="bg-background/50 border-input font-rajdhani"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor={`${formId}-email`}
              className="text-sm font-medium text-foreground"
            >
              Adresse E-mail *
            </label>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean@exemple.com"
              required
              className="bg-background/50 border-input font-rajdhani"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor={`${formId}-phone`}
              className="text-sm font-medium text-foreground"
            >
              Numéro de Téléphone *
            </label>

            <div style={{ display: "flex", gap: "8px", width: "100%" }}>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[120px] bg-background/50 border-input font-rajdhani text-foreground h-10 shrink-0">
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
              <Input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={selectedCountry.example}
                required
                className="bg-background/50 border-input font-rajdhani"
                style={{ flex: 1 }}
              />
            </div>
            {phoneError && (
              <p className="text-red-400 text-xs mt-1">{phoneError}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor={`${formId}-message`}
            className="text-sm font-medium text-foreground"
          >
            Message (Facultatif)
          </label>
          <Textarea
            id={`${formId}-message`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Comment pouvons-nous vous aider ?"
            className="min-h-[120px] bg-background/50 border-input font-rajdhani"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron tracking-wider py-6"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              TRANSMISSION...
            </>
          ) : (
            "SOUMETTRE LA DEMANDE"
          )}
        </Button>
      </form>
    </div>
  );
}
