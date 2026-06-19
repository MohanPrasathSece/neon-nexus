import { motion } from "framer-motion";

const headline = "L'AVENIR DE L'INVESTISSEMENT CRYPTO";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* holographic globe */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative h-[640px] w-[640px] max-w-[90vw] max-h-[90vw]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border animate-rotate-slow"
              style={{
                borderColor: `oklch(0.7 0.2 ${200 + i * 30} / ${0.3 - i * 0.05})`,
                transform: `rotateX(${60 + i * 10}deg) rotateY(${i * 20}deg)`,
                animationDuration: `${20 + i * 10}s`,
                animationDirection: i % 2 ? "reverse" : "normal",
                boxShadow: `inset 0 0 80px oklch(0.7 0.25 ${200 + i * 40} / 0.2)`,
              }}
            />
          ))}
          <div className="absolute inset-1/4 rounded-full opacity-50 blur-2xl" style={{ background: "radial-gradient(circle, var(--neon-cyan), transparent 70%)" }} />
          {/* orbiting coins */}
          {["₿", "Ξ", "◎", "✕"].map((sym, i) => (
            <div
              key={sym}
              className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
              style={{ animation: `orbit ${15 + i * 3}s linear infinite`, ["--orbit-radius" as string]: `${260 + i * 20}px` }}
            >
              <div className="h-full w-full rounded-full glass-panel glow-cyan flex items-center justify-center font-display font-black text-xl text-glow-cyan">
                {sym}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass-panel text-xs font-semibold tracking-widest"
        >
          <span className="h-2 w-2 rounded-full animate-aurora" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 12px var(--neon-cyan)" }} />
          EN DIRECT · PLUS DE 1,2M D'INVESTISSEURS EN LIGNE
        </motion.div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6">
          {headline.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block mr-3">
              {word.split("").map((c, ci) => (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + wi * 0.08 + ci * 0.02, duration: 0.6 }}
                  className="inline-block text-glow-cyan"
                  style={{ color: wi === 2 ? "var(--neon-cyan)" : undefined }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="block mt-2 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-indigo))" }}
          >
            COMMENCE ICI
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-10"
        >
          Négociez, stakez et faites croître votre richesse numérique dans un centre de commande de nouvelle génération.
          Propulsé par des signaux d'IA, une sécurité de niveau militaire et des renseignements de marché en temps réel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-signup"))} className="group relative px-8 py-4 rounded-xl font-bold font-display tracking-wider text-sm overflow-hidden glow-cyan transition-transform hover:scale-105">
            <span className="absolute inset-0 neon-gradient" />
            <span className="absolute inset-0 animate-shimmer" />
            <span className="relative text-background">COMMENCER À INVESTIR →</span>
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-login"))} className="group relative px-8 py-4 rounded-xl font-bold font-display tracking-wider text-sm border border-[color:var(--neon-cyan)]/50 text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10 transition-all hover:glow-cyan">
            <span className="relative">EXPLORER LE MARCHÉ</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { v: "$84B+", l: "Volume Échangé" },
            { v: "1.2M+", l: "Utilisateurs Actifs" },
            { v: "350+", l: "Actifs Listés" },
            { v: "99.99%", l: "SLA de Disponibilité" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-black text-glow-cyan" style={{ color: "var(--neon-cyan)" }}>{s.v}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}