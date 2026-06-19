import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        toast.error("Please enter your email address.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "User not found or authentication failed.");
      }

      toast.success("Authentication successful. Redirecting...");
      setEmail("");
      onClose();
      navigate("/logged-in");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Authentication failed. Please try again.");
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
            className="relative w-full max-w-sm"
          >
            <div className="glass-panel p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 neon-gradient" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-[color:var(--neon-cyan)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-8 pt-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color:var(--neon-cyan)]/10 mb-4 glow-cyan">
                  <div className="w-8 h-8 rounded-full neon-gradient animate-pulse-glow" />
                </div>
                <h2 className="text-2xl font-display font-black tracking-widest text-glow-cyan uppercase">
                  Initialize
                </h2>
                <p className="text-muted-foreground font-sans text-sm mt-2">Access the command center.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-xs uppercase tracking-widest font-display text-[color:var(--neon-cyan)]">
                    Network ID (Email)
                  </label>
                  <input 
                    id="login-email" 
                    name="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="operator@ORBITX FINANCE.crypto"
                    required 
                    className="w-full bg-background/50 border border-[color:var(--neon-cyan)]/30 rounded-lg px-4 py-3 text-foreground font-sans focus:outline-none focus:border-[color:var(--neon-cyan)] focus:ring-1 focus:ring-[color:var(--neon-cyan)] transition-all placeholder:text-muted-foreground/50" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full relative px-6 py-4 rounded-lg overflow-hidden group flex items-center justify-center mt-4"
                >
                  <span className="absolute inset-0 neon-gradient opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2 text-background font-display font-bold tracking-widest text-sm uppercase">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uplinking...</> : "Enter ORBITX FINANCE"}
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
