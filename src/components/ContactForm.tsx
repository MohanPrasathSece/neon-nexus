import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm({ formId = "contact" }: { formId?: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // Submit to our secure serverless endpoint
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "No message provided",
          source: `${formId}-form`
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      toast.success("Enquiry received successfully! Our team will contact you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border p-8 rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor={`${formId}-name`} className="text-sm font-medium text-foreground">
            Full Name *
          </label>
          <Input
            id={`${formId}-name`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="bg-background/50 border-input font-rajdhani"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={`${formId}-email`} className="text-sm font-medium text-foreground">
              Email Address *
            </label>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="bg-background/50 border-input font-rajdhani"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-foreground">
              Phone Number *
            </label>
            <Input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              required
              className="bg-background/50 border-input font-rajdhani"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-message`} className="text-sm font-medium text-foreground">
            Message (Optional)
          </label>
          <Textarea
            id={`${formId}-message`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we assist you?"
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
              TRANSMITTING...
            </>
          ) : (
            "SUBMIT INQUIRY"
          )}
        </Button>
      </form>
    </div>
  );
}
