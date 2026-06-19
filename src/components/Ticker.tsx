const coins = [
  { s: "BTC", p: 67432.10, c: 2.34 },
  { s: "ETH", p: 3521.88, c: -0.87 },
  { s: "SOL", p: 187.42, c: 5.12 },
  { s: "BNB", p: 612.05, c: 1.04 },
  { s: "XRP", p: 0.5823, c: -1.55 },
  { s: "DOGE", p: 0.1421, c: 8.23 },
  { s: "ADA", p: 0.4512, c: 0.42 },
  { s: "LINK", p: 18.34, c: 3.12 },
  { s: "AVAX", p: 38.91, c: -2.18 },
  { s: "DOT", p: 7.21, c: 1.88 },
  { s: "MATIC", p: 0.7234, c: 4.56 },
];

export function Ticker() {
  const items = [...coins, ...coins];
  return (
    <div className="relative z-10 border-y border-[color:var(--neon-cyan)]/20 glass-panel overflow-hidden py-3">
      <div className="flex gap-12 animate-ticker whitespace-nowrap">
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-sm">
            <span className="font-display font-bold text-glow-cyan" style={{ color: "var(--neon-cyan)" }}>{c.s}</span>
            <span className="text-foreground">${c.p.toLocaleString()}</span>
            <span className={c.c >= 0 ? "text-emerald-400" : "text-rose-400"} style={{ textShadow: c.c >= 0 ? "0 0 8px rgb(52 211 153 / 0.6)" : "0 0 8px rgb(251 113 133 / 0.6)" }}>
              {c.c >= 0 ? "▲" : "▼"} {Math.abs(c.c).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}