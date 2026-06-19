import { TiltCard } from "./TiltCard";

const markets = [
  { sym: "BTC", name: "Bitcoin", price: 67432.10, change: 2.34, mcap: "1.33T", vol: "32.4B", color: "200" },
  { sym: "ETH", name: "Ethereum", price: 3521.88, change: -0.87, mcap: "423B", vol: "18.2B", color: "260" },
  { sym: "SOL", name: "Solana", price: 187.42, change: 5.12, mcap: "87B", vol: "4.1B", color: "295" },
  { sym: "BNB", name: "BNB", price: 612.05, change: 1.04, mcap: "91B", vol: "2.3B", color: "60" },
  { sym: "XRP", name: "Ripple", price: 0.5823, change: -1.55, mcap: "32B", vol: "1.8B", color: "220" },
  { sym: "AVAX", name: "Avalanche", price: 38.91, change: 4.18, mcap: "15B", vol: "640M", color: "10" },
];

function MiniChart({ up }: { up: boolean }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const base = up ? i * 2 : (24 - i) * 2;
    return [i * 6, 40 - (base + Math.sin(i) * 6 + Math.random() * 8)];
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const stroke = up ? "rgb(52, 211, 153)" : "rgb(251, 113, 133)";
  return (
    <svg viewBox="0 0 144 50" className="w-full h-12">
      <defs>
        <linearGradient id={`g-${up}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L144,50 L0,50 Z`} fill={`url(#g-${up})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 4px ${stroke})` }} />
    </svg>
  );
}

export function MarketCards() {
  return (
    <section id="markets" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-cyan)] mb-3">// LIVE MARKETS</div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-glow-cyan">TOP ASSETS, REAL-TIME</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => {
            const up = m.change >= 0;
            return (
              <TiltCard key={m.sym} className="rounded-2xl">
                <div className="relative rounded-2xl glass-panel p-6 overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity" style={{ background: `oklch(0.7 0.25 ${m.color})` }} />
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center font-display font-black text-lg" style={{ background: `oklch(0.2 0.15 ${m.color} / 0.6)`, color: `oklch(0.85 0.2 ${m.color})`, boxShadow: `0 0 20px oklch(0.7 0.25 ${m.color} / 0.5)` }}>
                        {m.sym[0]}
                      </div>
                      <div>
                        <div className="font-display font-bold">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.sym}/USDT</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>
                      {up ? "▲" : "▼"} {Math.abs(m.change)}%
                    </span>
                  </div>
                  <div className="relative font-display text-3xl font-black mb-2">${m.price.toLocaleString()}</div>
                  <div className="relative -mx-2 mb-4"><MiniChart up={up} /></div>
                  <div className="relative grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-muted-foreground">Market Cap</div>
                      <div className="font-semibold">${m.mcap}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Volume 24h</div>
                      <div className="font-semibold">${m.vol}</div>
                    </div>
                  </div>
                  <button className="relative mt-5 w-full py-2.5 rounded-lg font-display font-bold text-sm border border-[color:var(--neon-cyan)]/40 text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10 transition-all">
                    TRADE NOW
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}