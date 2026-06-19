import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("Please fill in all fields.");
        setLoading(false);
        return;
      }

      if (!consent) {
        toast.error("You must acknowledge the risks to proceed.");
        setLoading(false);
        return;
      }



      const authResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to create auth profile");
      }

      toast.success("Signup successful! Welcome to ORBITX FINANCE.");
      setFormData({ name: "", email: "", phone: "" });
      setConsent(false);
      onClose();
      navigate("/logged-in");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

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
                  <div className="w-8 h-8 rounded-full neon-gradient animate-pulse-glow" style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-pink))" }} />
                </div>
                <h2 className="text-2xl font-display font-black tracking-widest text-glow-purple uppercase">
                  Register
                </h2>
                <p className="text-muted-foreground font-sans text-sm mt-2">Establish protocol access.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="signup-name" className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-purple)]">
                    Designation (Name)
                  </label>
                  <input 
                    id="signup-name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Operator Name"
                    required 
                    className="w-full bg-background/50 border border-[color:var(--neon-purple)]/30 rounded-lg px-4 py-3 text-foreground font-sans focus:outline-none focus:border-[color:var(--neon-purple)] focus:ring-1 focus:ring-[color:var(--neon-purple)] transition-all placeholder:text-muted-foreground/50" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-purple)]">
                    Network ID (Email)
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
                
                <div className="space-y-2">
                  <label htmlFor="signup-phone" className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-purple)]">
                    Commlink (Phone)
                  </label>
                  <input 
                    id="signup-phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+1 (555) 000-0000"
                    required 
                    className="w-full bg-background/50 border border-[color:var(--neon-purple)]/30 rounded-lg px-4 py-3 text-foreground font-sans focus:outline-none focus:border-[color:var(--neon-purple)] focus:ring-1 focus:ring-[color:var(--neon-purple)] transition-all placeholder:text-muted-foreground/50" 
                  />
                </div>

                <div className="flex items-start gap-3 mt-4 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[color:var(--neon-purple)]/50 bg-background/50 text-[color:var(--neon-purple)] focus:ring-[color:var(--neon-purple)]"
                  />
                  <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed font-sans cursor-pointer">
                    I acknowledge that cryptocurrency investments are highly volatile and carry significant risk. I have read and agree to the Terms & Conditions.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full relative px-6 py-4 rounded-lg overflow-hidden group flex items-center justify-center mt-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--neon-purple)] to-[color:var(--neon-pink)] opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2 text-background font-display font-bold tracking-widest text-sm uppercase">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : "Create Profile"}
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
