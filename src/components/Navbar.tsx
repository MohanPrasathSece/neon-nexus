import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import { Menu, X, LogOut } from "lucide-react";

const publicLinks = [
  { name: "Marchés", id: "markets" },
  { name: "Investissements", id: "investments" },
  { name: "Fonctionnalités", id: "features" },
  { name: "Contact", id: "contact" }
];
const loggedInLinks = [
  { name: "Tableau de Bord", id: "dashboard" },
  { name: "Actifs", id: "assets" },
  { name: "Négocier", id: "trade" },
  { name: "Gagner", id: "earn" },
  { name: "Historique", id: "history" },
  { name: "Paramètres", id: "settings" }
];

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedInPage = location.pathname === "/logged-in";
  const links = isLoggedInPage ? loggedInLinks : publicLinks;

  useEffect(() => {
    const handleLogin = () => setIsLoginOpen(true);
    const handleSignup = () => setIsSignupOpen(true);
    window.addEventListener("open-login", handleLogin);
    window.addEventListener("open-signup", handleSignup);
    return () => {
      window.removeEventListener("open-login", handleLogin);
      window.removeEventListener("open-signup", handleSignup);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-2xl glass-panel px-4 py-3 md:px-6"
      >
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 group z-50">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-lg neon-gradient animate-rotate-slow opacity-80" />
            <div className="absolute inset-[2px] rounded-md bg-background flex items-center justify-center font-display font-black text-sm text-glow-cyan">
              NX
            </div>
          </div>
          <span className="font-display font-black text-lg tracking-widest text-glow-cyan">ORBITX FINANCE</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              {l.name}
              <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 8px var(--neon-cyan)" }} />
            </a>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedInPage ? (
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 transition-all">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          ) : (
            <>
              <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 text-sm font-semibold rounded-lg border border-[color:var(--neon-cyan)]/40 text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10 transition-all">
                Connexion
              </button>
              <button onClick={() => setIsSignupOpen(true)} className="relative px-5 py-2 text-sm font-bold rounded-lg overflow-hidden group">
                <span className="absolute inset-0 neon-gradient" />
                <span className="absolute inset-[1.5px] rounded-md bg-background/40 backdrop-blur" />
                <span className="relative text-foreground">S'inscrire</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-4 mb-8">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold tracking-wider text-muted-foreground hover:text-[color:var(--neon-cyan)] transition-colors"
                >
                  {l.name}
                </a>
              ))}
            </nav>
            
            <div className="flex flex-col gap-4 mt-auto mb-12">
              {isLoggedInPage ? (
                <button onClick={handleLogout} className="flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl font-bold font-display tracking-wider text-sm border border-destructive/50 text-destructive hover:bg-destructive/10 transition-all">
                  <LogOut className="w-5 h-5" />
                  DÉCONNEXION
                </button>
              ) : (
                <>
                  <button onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }} className="w-full px-6 py-4 rounded-xl font-bold font-display tracking-wider text-sm border border-[color:var(--neon-cyan)]/50 text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10 transition-all">
                    CONNEXION
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); setIsSignupOpen(true); }} className="relative w-full px-6 py-4 rounded-xl font-bold font-display tracking-wider text-sm overflow-hidden glow-cyan">
                    <span className="absolute inset-0 neon-gradient" />
                    <span className="relative text-background">S'INSCRIRE</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}