import { useState } from "react";

const faqs = [
  { q: "À quelle vitesse puis-je commencer à trader ?", a: "La vérification de compte se termine généralement en moins de 3 minutes. Après le KYC, déposez des devises fiat ou des cryptos et vous êtes immédiatement en direct sur les marchés mondiaux." },
  { q: "Ma crypto est-elle en sécurité ?", a: "Oui. 95 % des actifs se trouvent dans un stockage à froid MPC hors ligne avec une assurance Lloyd's. Nous publions une preuve de réserves mensuelle." },
  { q: "Quels sont les frais ?", a: "0,10 % pour les makers / 0,15 % pour les takers, baissant jusqu'à 0 % sur les paliers supérieurs. Pas de frais de dépôt, retraits au coût du réseau uniquement." },
  { q: "Prenez-vous en charge le staking ?", a: "Oui. Stakez plus de 40 actifs dont ETH, SOL, ADA et DOT. Récompenses distribuées quotidiennement, retirez votre mise à tout moment sur des plans flexibles." },
  { q: "Puis-je utiliser des bots automatisés ?", a: "Créez des stratégies sans code avec notre éditeur visuel, backtestez sur 5 ans de données tick, puis déployez en un clic." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-cyan)] mb-3">// PROTOCOLE.FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">RÉPONSES, DÉCRYPTÉES</h2>
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