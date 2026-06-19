import { useState } from "react";

const faqs = [
  { q: "How fast can I start trading?", a: "Account verification typically completes in under 3 minutes. After KYC, deposit fiat or crypto and you're live on global markets immediately." },
  { q: "Is my crypto secure?", a: "Yes. 95% of assets sit in MPC + air-gapped cold storage with Lloyd's-backed insurance. We publish monthly proof-of-reserves." },
  { q: "What are the fees?", a: "0.10% maker / 0.15% taker, dropping to 0% on higher tiers. No deposit fees, withdrawals at network cost only." },
  { q: "Do you support staking?", a: "Yes. Stake 40+ assets including ETH, SOL, ADA and DOT. Rewards distributed daily, unstake any time on flexible plans." },
  { q: "Can I use automated bots?", a: "Build no-code strategies with our visual editor, backtest against 5 years of tick data, then deploy with one click." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-cyan)] mb-3">// PROTOCOL.FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">ANSWERS, DECRYPTED</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const o = open === i;
            return (
              <div key={i} className={`rounded-xl glass-panel overflow-hidden transition-all ${o ? "glow-cyan" : ""}`}>
                <button onClick={() => setOpen(o ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-display font-bold">{f.q}</span>
                  <span className={`h-7 w-7 rounded-full flex items-center justify-center transition-transform ${o ? "rotate-45" : ""}`} style={{ background: "var(--neon-cyan)", color: "var(--background)", boxShadow: "0 0 12px var(--neon-cyan)" }}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${o ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}