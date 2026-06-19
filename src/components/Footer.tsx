import { Link } from "react-router-dom";

export function Footer() {
  const cols = [
    { t: "Product", l: [{ name: "Markets", path: "/#markets" }, { name: "Trading", path: "/#markets" }, { name: "Staking", path: "/#investments" }, { name: "Wallets", path: "/#features" }, { name: "API", path: "/#features" }] },
    { t: "Company", l: [{ name: "About", path: "/#features" }, { name: "Careers", path: "/#contact" }] },
    { t: "Resources", l: [{ name: "Docs", path: "/logged-in" }, { name: "Blog", path: "/logged-in" }, { name: "Help Center", path: "/#contact" }, { name: "Status", path: "/" }, { name: "Community", path: "/#contact" }] },
    { t: "Legal", l: [{ name: "Privacy Policy", path: "/privacy-policy" }, { name: "Terms & Conditions", path: "/terms-and-conditions" }] },
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
              <span className="font-display font-black text-lg tracking-widest text-glow-cyan">ORBITX FINANCE</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              The cyberpunk command center for digital wealth. Trade, stake and build the new economy.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <div className="font-display font-bold mb-4 text-sm uppercase tracking-widest text-[color:var(--neon-cyan)]">{c.t}</div>
              <ul className="space-y-2">
                {c.l.map((l) => (
                  <li key={l.name}>
                    {l.path.includes("#") ? (
                      <a href={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.name}</a>
                    ) : (
                      <Link to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[color:var(--neon-cyan)]/15">
          <div className="text-xs text-muted-foreground">© 2026 ORBITX FINANCE Protocol. All systems operational.</div>

        </div>
      </div>
    </footer>
  );
}