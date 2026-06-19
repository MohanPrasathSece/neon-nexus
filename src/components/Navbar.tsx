import { motion } from "framer-motion";

const links = ["Markets", "Investments", "Portfolio", "Features", "Pricing", "News"];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex max-w-7xl items-center justify-between rounded-2xl glass-panel px-6 py-3"
    >
      <a href="#" className="flex items-center gap-2 group">
        <div className="relative h-9 w-9">
          <div className="absolute inset-0 rounded-lg neon-gradient animate-rotate-slow opacity-80" />
          <div className="absolute inset-[2px] rounded-md bg-background flex items-center justify-center font-display font-black text-sm text-glow-cyan">
            NX
          </div>
        </div>
        <span className="font-display font-black text-lg tracking-widest text-glow-cyan">NEXUS</span>
      </a>
      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            {l}
            <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 8px var(--neon-cyan)" }} />
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 text-sm font-semibold rounded-lg border border-[color:var(--neon-cyan)]/40 text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10 transition-all">
          Login
        </button>
        <button className="relative px-5 py-2 text-sm font-bold rounded-lg overflow-hidden group">
          <span className="absolute inset-0 neon-gradient" />
          <span className="absolute inset-[1.5px] rounded-md bg-background/40 backdrop-blur" />
          <span className="relative text-foreground">Sign Up</span>
        </button>
      </div>
    </motion.header>
  );
}