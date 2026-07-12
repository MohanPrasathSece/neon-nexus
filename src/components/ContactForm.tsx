import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone') setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanNum = formData.phone.replace(/\s+/g, "");
      if (!cleanNum) {
        setPhoneError("Veuillez entrer un numéro de téléphone");
        setLoading(false);
        return;
      } 

      // Validate
      if (!formData.name || !formData.email) {
        toast.error("Veuillez remplir tous les champs obligatoires.");
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
          source: `${formId}-form`
        }),
      });

      if (!response.ok) {
        const errorData = await response.clone().text().catch(()=>"");
        if (errorData.includes("already exist")) {
            throw new Error("You have already contacted us pls wait");
        }
        throw new Error("Échec de la soumission");
      }

      toast.success("Demande reçue avec succès ! Notre équipe vous contactera sous peu.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error((error && error.message && error.message.includes("already exist")) ? "You have already contacted us pls wait" : "Une erreur s\'est produite lors de la soumission. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border p-8 rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor={`${formId}-name`} className="text-sm font-medium text-foreground">
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
          <div className="space-y-2">
            <label htmlFor={`${formId}-email`} className="text-sm font-medium text-foreground">
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

          <div className="space-y-2">
            <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-foreground">
              Numéro de Téléphone *
            </label>
            
<div style={{ display: 'flex', gap: '8px', width: '100%' }}>
    <Select value={countryCode} onValueChange={setCountryCode}>
      <SelectTrigger className="w-[110px] bg-background/50 border-input font-rajdhani text-foreground h-10">
        <SelectValue placeholder="Code" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="FR">🇫🇷 +33</SelectItem>
        <SelectItem value="BE">🇧🇪 +32</SelectItem>
        <SelectItem value="CH">🇨🇭 +41</SelectItem>
        <SelectItem value="NL">🇳🇱 +31</SelectItem>
        <SelectItem value="DE">🇩🇪 +49</SelectItem>
        <SelectItem value="ES">🇪🇸 +34</SelectItem>
        <SelectItem value="IT">🇮🇹 +39</SelectItem>
        <SelectItem value="AT">🇦🇹 +43</SelectItem>
        <SelectItem value="SE">🇸🇪 +46</SelectItem>
        <SelectItem value="GB">🇬🇧 +44</SelectItem>
        <SelectItem value="US">🇺🇸 +1</SelectItem>
        <SelectItem value="CA">🇨🇦 +1</SelectItem>
        <SelectItem value="AU">🇦🇺 +61</SelectItem>
        <SelectItem value="IN">🇮🇳 +91</SelectItem>
      </SelectContent>
    </Select>
<Input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
              required
              className="bg-background/50 border-input font-rajdhani"
             style={{ flex: 1 }} />
</div>
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-message`} className="text-sm font-medium text-foreground">
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
