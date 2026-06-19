import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip } from "recharts";

const lineData = Array.from({ length: 30 }, (_, i) => ({ d: i, v: 40000 + Math.sin(i / 3) * 8000 + i * 800 + Math.random() * 2000 }));
const pieData = [
  { n: "BTC", v: 45, c: "oklch(0.85 0.18 50)" },
  { n: "ETH", v: 28, c: "oklch(0.7 0.2 260)" },
  { n: "SOL", v: 15, c: "oklch(0.75 0.25 295)" },
  { n: "Other", v: 12, c: "oklch(0.85 0.17 200)" },
];
const barData = Array.from({ length: 12 }, (_, i) => ({ m: i, v: 1000 + Math.random() * 3000 }));

export function Dashboard() {
  return (
    <section id="portfolio" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-cyan)] mb-3">// COMMAND CENTER</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">YOUR LIVE PORTFOLIO</h2>
        </div>

        <div className="relative rounded-3xl glass-panel p-6 md:p-8 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: "var(--neon-cyan)" }} />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: "var(--neon-purple)" }} />

          <div className="relative grid gap-6 lg:grid-cols-3">
            {/* Portfolio value */}
            <div className="lg:col-span-2 rounded-2xl glass-panel p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Portfolio Value</div>
                  <div className="font-display text-4xl md:text-5xl font-black mt-1 text-glow-cyan" style={{ color: "var(--neon-cyan)" }}>$128,432.18</div>
                  <div className="text-emerald-400 font-semibold mt-1">+ $8,432.05 (+7.02%) today</div>
                </div>
                <div className="flex gap-2">
                  {["1D", "1W", "1M", "1Y"].map((t, i) => (
                    <button key={t} className={`px-3 py-1 rounded-md text-xs font-bold ${i === 2 ? "bg-[color:var(--neon-cyan)]/20 text-[color:var(--neon-cyan)]" : "text-muted-foreground"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="grad-line" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.85 0.17 200)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="oklch(0.85 0.17 200)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="oklch(0.85 0.17 200)" strokeWidth={2} fill="url(#grad-line)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Allocation */}
            <div className="rounded-2xl glass-panel p-6">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Allocation</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="v" innerRadius={50} outerRadius={75} stroke="none">
                    {pieData.map((p, i) => <Cell key={i} fill={p.c} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {pieData.map((p) => (
                  <div key={p.n} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.c, boxShadow: `0 0 8px ${p.c}` }} />
                      {p.n}
                    </div>
                    <span className="font-bold">{p.v}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            {[
              { l: "Total Profit", v: "+$42,108", s: "+18.4%", c: "var(--neon-cyan)" },
              { l: "Active Positions", v: "23", s: "8 winning", c: "var(--neon-purple)" },
              { l: "Stake Rewards", v: "$1,284", s: "this month", c: "var(--neon-pink)" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl glass-panel p-5">
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.l}</div>
                <div className="font-display text-2xl font-black mt-1" style={{ color: s.c }}>{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.s}</div>
              </div>
            ))}

            {/* Bar chart */}
            <div className="lg:col-span-2 rounded-2xl glass-panel p-6">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Monthly Volume</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={barData}>
                  <XAxis dataKey="m" hide />
                  <Tooltip cursor={{ fill: "oklch(0.85 0.17 200 / 0.1)" }} contentStyle={{ background: "oklch(0.08 0.04 250)", border: "1px solid oklch(0.6 0.2 220 / 0.3)", borderRadius: 8 }} />
                  <Bar dataKey="v" fill="oklch(0.7 0.25 295)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Transactions */}
            <div className="lg:col-span-3 rounded-2xl glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-display font-bold">Recent Transactions</div>
                <button className="text-xs text-[color:var(--neon-cyan)]">View all →</button>
              </div>
              <div className="space-y-2">
                {[
                  { t: "BUY", a: "BTC", q: "0.124", p: "$8,361.78", s: "2m ago" },
                  { t: "SELL", a: "ETH", q: "2.41", p: "$8,487.74", s: "18m ago" },
                  { t: "STAKE", a: "SOL", q: "45.0", p: "$8,434.10", s: "1h ago" },
                  { t: "BUY", a: "AVAX", q: "120", p: "$4,669.20", s: "3h ago" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-[color:var(--neon-cyan)]/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${tx.t === "BUY" ? "bg-emerald-500/15 text-emerald-400" : tx.t === "SELL" ? "bg-rose-500/15 text-rose-400" : "bg-violet-500/15 text-violet-400"}`}>{tx.t}</span>
                      <span className="font-display font-bold">{tx.a}</span>
                      <span className="text-sm text-muted-foreground">{tx.q}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm">{tx.p}</span>
                      <span className="text-xs text-muted-foreground">{tx.s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}