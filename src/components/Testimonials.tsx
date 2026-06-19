import { TiltCard } from "./TiltCard";

const testimonials = [
  { n: "Maya Chen", r: "Quant Trader", q: "Nexus replaced my entire stack. The AI signals alone paid for the year in two weeks." },
  { n: "Diego Alvarez", r: "Crypto Fund GP", q: "Execution is faster than any prime broker I've used. The dashboards feel like a Bloomberg terminal from 2090." },
  { n: "Aiko Tanaka", r: "DeFi Builder", q: "I went from manual trades to a fully automated portfolio in one afternoon. Unreal product." },
  { n: "Marcus Webb", r: "Angel Investor", q: "The risk analytics caught a position blow-up before I did. Saved me six figures, no exaggeration." },
];

export function Testimonials() {
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-purple)] mb-3">// SIGNAL FROM THE GRID</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">TRUSTED BY OPERATORS</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <TiltCard key={t.n} className="rounded-2xl">
              <div className="h-full rounded-2xl glass-panel p-6 relative overflow-hidden">
                <div className="text-4xl font-display text-[color:var(--neon-cyan)] leading-none mb-3">"</div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-6">{t.q}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[color:var(--neon-cyan)]/15">
                  <div className="h-10 w-10 rounded-full neon-gradient flex items-center justify-center font-display font-black text-sm text-background" style={{ boxShadow: "0 0 16px var(--neon-cyan)" }}>
                    {t.n.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}