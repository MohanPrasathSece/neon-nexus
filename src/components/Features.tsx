import { TiltCard } from "./TiltCard";

const features = [
  { i: "⚡", t: "Assistant d'Investissement IA", d: "Les réseaux de neurones analysent plus de 10 000 points de données par seconde pour révéler des transactions à forte conviction.", c: "200" },
  { i: "◈", t: "Portefeuille Intelligent", d: "Paniers à rééquilibrage automatique qui ajustent l'exposition en fonction de la volatilité, de la dynamique et du risque.", c: "295" },
  { i: "↯", t: "Achat et Vente Instantanés", d: "Exécution en moins de 100 ms avec une liquidité profonde acheminée à travers plus de 40 places boursières mondiales.", c: "340" },
  { i: "⌬", t: "Portefeuille Coffre-Fort Sécurisé", d: "Stockage à froid MPC + matériel avec surveillance des menaces 24/7 et assurance.", c: "260" },
  { i: "◉", t: "Analyses en Temps Réel", d: "Tableaux de bord personnalisables avec signaux on-chain, flux de baleines et cartes de sentiment.", c: "200" },
  { i: "⟁", t: "Bots de Trading Automatiques", d: "Créez, backtestez et déployez des stratégies — sans code. En direct en 60 secondes.", c: "295" },
  { i: "⬢", t: "Sécurité Blockchain", d: "Contrats intelligents audités, preuves de réserves et retraits zero-knowledge.", c: "10" },
  { i: "◐", t: "Accès Mondial", d: "Disponible dans plus de 180 pays, plus de 50 passerelles fiat, support multilingue 24/7.", c: "220" },
];

export function Features() {
  return (
    <section id="features" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-purple)] mb-3">// SYSTÈMES CENTRAUX</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">
            CONSTRUIT POUR LA <span className="text-glow-purple" style={{ color: "var(--neon-purple)" }}>NOUVELLE ÉCONOMIE</span>
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