import { Link } from "react-router-dom";

export function Footer() {
  const cols = [
    { t: "Product", l: [{ name: "Markets", path: "/" }, { name: "Trading", path: "/" }, { name: "Staking", path: "/" }, { name: "Wallets", path: "/" }, { name: "API", path: "/" }] },
    { t: "Company", l: [{ name: "About", path: "/" }, { name: "Careers", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }, { name: "Terms & Conditions", path: "/terms-and-conditions" }, { name: "Legal", path: "/" }] },
    { t: "Resources", l: [{ name: "Docs", path: "/" }, { name: "Blog", path: "/" }, { name: "Help Center", path: "/" }, { name: "Status", path: "/" }, { name: "Community", path: "/" }] },
  ];
  return (
    <footer className="relative z-10 mt-24 border-t border-[color:var(--neon-cyan)]/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: "var(--neon-purple)" }} />
        <div className="absolute -top-20 right-1/4 h-60 w-60 rounded-full blur-3xl opacity-20" style={{ background: "var(--neon-cyan)" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg neon-gradient" />
              <span className="font-display font-black text-lg tracking-widest text-glow-cyan">NEXUS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              The cyberpunk command center for digital wealth. Trade, stake and build the new economy.
            </p>
            <div className="rounded-xl glass-panel p-4 max-w-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Subscribe to signal</div>
              <div className="flex gap-2">
                <input
                  placeholder="you@protocol.com"
                  className="flex-1 bg-transparent border border-[color:var(--neon-cyan)]/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--neon-cyan)] transition-colors"
                />
                <button className="px-4 py-2 rounded-md font-display font-bold text-xs neon-gradient text-background">JOIN</button>
              </div>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <div className="font-display font-bold mb-4 text-sm uppercase tracking-widest text-[color:var(--neon-cyan)]">{c.t}</div>
              <ul className="space-y-2">
                {c.l.map((l) => (
                  <li key={l.name}><Link to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[color:var(--neon-cyan)]/15">
          <div className="text-xs text-muted-foreground">© 2026 Nexus Protocol. All systems operational.</div>
          <div className="flex gap-3">
            {["X", "Discord", "GitHub", "TG"].map((s) => (
              <a key={s} href="#" className="h-9 w-9 rounded-lg glass-panel flex items-center justify-center text-xs font-bold hover:glow-cyan transition-all">{s[0]}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}