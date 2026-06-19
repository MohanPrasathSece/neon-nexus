import { TiltCard } from "./TiltCard";

const features = [
  { i: "⚡", t: "AI Investment Assistant", d: "Neural networks scan 10K+ data points per second to surface high-conviction trades.", c: "200" },
  { i: "◈", t: "Smart Portfolio", d: "Auto-balancing baskets that rotate exposure based on volatility, momentum and risk.", c: "295" },
  { i: "↯", t: "Instant Buy & Sell", d: "Sub-100ms execution with deep liquidity routed across 40+ global venues.", c: "340" },
  { i: "⌬", t: "Secure Vault Wallet", d: "MPC + hardware-backed cold storage with 24/7 threat monitoring and insurance.", c: "260" },
  { i: "◉", t: "Real-Time Analytics", d: "Customisable dashboards with on-chain signals, whale flows and sentiment heat.", c: "200" },
  { i: "⟁", t: "Auto Trading Bots", d: "Build, backtest and deploy strategies — no code required. Live in 60 seconds.", c: "295" },
  { i: "⬢", t: "Blockchain Security", d: "Audited smart contracts, proof-of-reserves and zero-knowledge withdrawals.", c: "10" },
  { i: "◐", t: "Global Access", d: "Available in 180+ countries, 50+ fiat onramps, 24/7 multilingual support.", c: "220" },
];

export function Features() {
  return (
    <section id="features" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-purple)] mb-3">// CORE SYSTEMS</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">
            BUILT FOR THE <span className="text-glow-purple" style={{ color: "var(--neon-purple)" }}>NEW ECONOMY</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <TiltCard key={f.t} className="rounded-2xl">
              <div className="relative h-full rounded-2xl glass-panel p-6 overflow-hidden group">
                <div className="absolute inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `linear-gradient(135deg, oklch(0.7 0.25 ${f.c} / 0.15), transparent 60%)` }} />
                <div className="relative h-14 w-14 mb-4 rounded-xl flex items-center justify-center font-display text-2xl font-black animate-float" style={{ background: `oklch(0.15 0.15 ${f.c} / 0.6)`, color: `oklch(0.88 0.2 ${f.c})`, boxShadow: `0 0 24px oklch(0.7 0.25 ${f.c} / 0.5), inset 0 0 12px oklch(0.7 0.25 ${f.c} / 0.3)` }}>
                  {f.i}
                </div>
                <h3 className="relative font-display font-bold text-lg mb-2">{f.t}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}