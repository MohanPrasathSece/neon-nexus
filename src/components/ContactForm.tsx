import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm({ formId = "contact" }: { formId?: string }) {
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
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
      } else if (!/^(\+41|0041|0)?[1-9]\d{8}$/.test(cleanNum)) {
        setPhoneError("Veuillez entrer un numéro suisse valide (ex: 079 123 45 67)");
        setLoading(false);
        return;
      }

      // Validate
      if (!formData.name || !formData.email) {
        toast.error("Veuillez remplir tous les champs obligatoires.");
        setLoading(false);
        return;
      }

      const formTarget = e.target as HTMLFormElement;
      const countryCodeSelect = formTarget.elements.namedItem("countryCode") as HTMLSelectElement;
      
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: countryCodeSelect ? countryCodeSelect.value : 'CH',
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
    <select name="countryCode" style={{ width: '110px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', padding: '0.8rem', fontFamily: 'inherit' }}>
        <option value="FR">🇫🇷 +33</option>
        <option value="BE">🇧🇪 +32</option>
        <option value="CH">🇨🇭 +41</option>
        <option value="NL">🇳🇱 +31</option>
        <option value="DE">🇩🇪 +49</option>
        <option value="ES">🇪🇸 +34</option>
        <option value="IT">🇮🇹 +39</option>
        <option value="AT">🇦🇹 +43</option>
        <option value="SE">🇸🇪 +46</option>
        <option value="GB">🇬🇧 +44</option>
        <option value="US">🇺🇸 +1</option>
        <option value="CA">🇨🇦 +1</option>
        <option value="AU">🇦🇺 +61</option>
    </select>
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
