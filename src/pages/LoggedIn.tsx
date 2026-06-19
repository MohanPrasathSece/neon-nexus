import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ContactForm } from "@/components/ContactForm";
import { MacBrowserTab } from "@/components/MacBrowserTab";
import { AnimatedCandlestick } from "@/components/AnimatedCandlestick";
import { BookOpen, Shield, TrendingUp, Cpu, PieChart, Activity } from "lucide-react";

export default function LoggedIn() {
  return (
    <>
      <AnimatedBackground />
      
      <div className="relative pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="mb-16 text-center relative">
            {/* Orbiting Coins Background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <div className="relative h-[400px] w-[400px] max-w-[90vw]">
                <div className="absolute inset-1/4 rounded-full opacity-30 blur-xl" style={{ background: "radial-gradient(circle, var(--neon-cyan), transparent 70%)" }} />
                {["₿", "Ξ", "◎", "✕"].map((sym, i) => (
                  <div
                    key={sym}
                    className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ animation: `orbit ${10 + i * 2}s linear infinite`, ["--orbit-radius" as string]: `${180 + i * 20}px` }}
                  >
                    <div className="h-full w-full rounded-full glass-panel flex items-center justify-center font-display font-black text-sm text-glow-cyan border border-[color:var(--neon-cyan)]/30 bg-[color:var(--neon-cyan)]/5">
                      {sym}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-tight mb-6 relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                BASE DE CONNAISSANCES ORBITX
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto relative z-10">
              Maîtrisez la frontière numérique avec notre guide complet sur la cryptomonnaie, la technologie blockchain et les investissements stratégiques.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            <div className="lg:col-span-2 space-y-8">
              
              <MacBrowserTab id="dashboard" title="Introduction à la Cryptomonnaie" icon={<BookOpen className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-orbitron font-semibold text-foreground">Les Actifs Numériques 101</h3>
                  <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                    La cryptomonnaie représente un changement de paradigme dans la façon dont nous percevons et échangeons de la valeur. Contrairement aux monnaies fiduciaires traditionnelles contrôlées par les banques centrales, les cryptomonnaies fonctionnent sur des réseaux décentralisés, permettant des transactions de pair à pair dans le monde entier, 24h/24 et 7j/7, sans intermédiaires.
                  </p>
                  <div className="bg-background/40 p-4 rounded-lg border border-border mt-4">
                    <p className="text-sm font-rajdhani text-neon-blue">
                      "Le problème fondamental de la monnaie conventionnelle est toute la confiance nécessaire pour la faire fonctionner. On doit faire confiance à la banque centrale pour ne pas avilir la monnaie, mais l'histoire des monnaies fiduciaires est pleine de violations de cette confiance." - Satoshi Nakamoto
                    </p>
                  </div>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="assets" title="Comprendre la Blockchain" icon={<Cpu className="w-4 h-4 text-neon-purple" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-orbitron font-semibold text-foreground">Le Registre Distribué</h3>
                  <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                    À la base, une blockchain est un registre numérique distribué qui enregistre les transactions sur de nombreux ordinateurs afin que l'enregistrement ne puisse pas être modifié rétroactivement sans l'altération de tous les blocs ultérieurs et le consensus du réseau. Cette technologie garantit la transparence, la sécurité et l'immuabilité.
                  </p>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="trade" title="Bases du Trading Crypto & Analyse" icon={<Activity className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-orbitron font-semibold text-foreground">Lire les Marchés</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                      Un trading réussi nécessite de comprendre les cycles du marché, l'analyse technique et le sentiment. Les graphiques en chandeliers sont le principal outil utilisé par les traders pour analyser les mouvements de prix au fil du temps. Chaque bougie représente un laps de temps spécifique, affichant les prix d'ouverture, le plus haut, le plus bas et de clôture.
                    </p>
                    <div className="bg-background/80 border border-border rounded-xl p-4 h-64 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none"></div>
                      <AnimatedCandlestick />
                    </div>
                  </div>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="earn" title="Diversification du Portefeuille" icon={<PieChart className="w-4 h-4 text-neon-purple" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-orbitron font-semibold text-foreground">Allocation Stratégique</h3>
                  <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                    Ne mettez jamais tous vos actifs numériques dans un seul protocole. Un portefeuille bien diversifié pourrait inclure des actifs établis à grande capitalisation (comme BTC et ETH) comme base, des jetons utilitaires à moyenne capitalisation pour la croissance, et un petit pourcentage alloué à des protocoles expérimentaux à plus haut risque.
                  </p>
                </div>
              </MacBrowserTab>

            </div>

            <div className="space-y-8">
              
              <MacBrowserTab id="history" title="Gestion des Risques" icon={<Shield className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground mb-2">Protéger le Capital</h3>
                  <ul className="space-y-3 font-rajdhani text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>N'investissez jamais plus que ce que vous pouvez vous permettre de perdre.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Utilisez toujours des ordres stop-loss pour limiter les baisses potentielles.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Méfiez-vous d'un effet de levier élevé, surtout sur des marchés volatils.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Gardez le contrôle émotionnel pendant les fluctuations du marché.</span>
                    </li>
                  </ul>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="settings" title="Meilleures Pratiques de Sécurité" icon={<Shield className="w-4 h-4 text-neon-purple" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground mb-2">Sécurité Opérationnelle</h3>
                  <p className="text-muted-foreground font-rajdhani mb-4">
                    Dans l'espace crypto, vous êtes votre propre banque. Cela nécessite de prendre l'entière responsabilité de votre sécurité.
                  </p>
                  <div className="bg-background/40 p-4 rounded border border-border border-l-4 border-l-neon-purple">
                    <p className="font-rajdhani text-sm text-foreground">
                      <strong>Pas vos clés, pas vos pièces.</strong> Stockez vos avoirs à long terme dans des portefeuilles matériels de stockage à froid plutôt que de les conserver sur des bourses.
                    </p>
                  </div>
                </div>
              </MacBrowserTab>
              
              <MacBrowserTab title="Tendances du Marché & IA" icon={<TrendingUp className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground">Intelligence Nouvelle Génération</h3>
                  <p className="text-muted-foreground font-rajdhani">
                    L'IA et l'apprentissage automatique révolutionnent la façon dont nous analysons les marchés crypto. Les algorithmes peuvent désormais traiter de grandes quantités de données on-chain, le sentiment social et les modèles historiques pour identifier les opportunités potentielles avant qu'elles ne deviennent évidentes pour le marché dans son ensemble.
                  </p>
                </div>
              </MacBrowserTab>

            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-24 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                  BESOIN DE PLUS D'INFOS ?
                </span>
              </h2>
              <p className="text-muted-foreground text-lg font-rajdhani">
                Connectez-vous avec nos spécialistes pour des conseils personnalisés sur votre parcours crypto.
              </p>
            </div>
            
            <ContactForm formId="loggedin-contact" />
          </div>
          
        </div>
      </div>
    </>
  );
}
