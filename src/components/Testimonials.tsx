import { TiltCard } from "./TiltCard";

const testimonials = [
  { n: "Maya Chen", r: "Trader Quantitatif", q: "ORBITX FINANCE a remplacé toute ma pile technique. Les signaux d'IA ont à eux seuls amorti l'année en deux semaines." },
  { n: "Diego Alvarez", r: "Gérant de Fonds Crypto", q: "L'exécution est plus rapide que n'importe quel courtier principal que j'ai utilisé. Les tableaux de bord ressemblent à un terminal Bloomberg de l'année 2090." },
  { n: "Aiko Tanaka", r: "Développeur DeFi", q: "Je suis passé de transactions manuelles à un portefeuille entièrement automatisé en un après-midi. Produit irréel." },
  { n: "Marcus Webb", r: "Business Angel", q: "Les analyses de risques ont détecté une explosion de position avant moi. M'a fait économiser à six chiffres, sans exagération." },
];

export function Testimonials() {
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-purple)] mb-3">// SIGNAL DE LA GRILLE</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">APPROUVÉ PAR LES OPÉRATEURS</h2>
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