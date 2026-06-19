import { useState, useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export function Calculator() {
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(18);

  const { final, data } = useMemo(() => {
    const data = [];
    for (let y = 0; y <= years; y++) {
      data.push({ y, v: amount * Math.pow(1 + rate / 100, y) });
    }
    return { final: data[data.length - 1].v, data };
  }, [amount, years, rate]);

  return (
    <section id="investments" className="relative z-10 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.3em] text-[color:var(--neon-pink)] mb-3">// PROFIT SIMULATOR</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">
            CALCULATE YOUR <span style={{ color: "var(--neon-pink)" }} className="text-glow-purple">FUTURE</span>
          </h2>
        </div>
        <div className="rounded-3xl glass-panel p-6 md:p-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            {[
              { l: "Investment Amount", v: amount, min: 100, max: 100000, step: 100, set: setAmount, fmt: (v: number) => `$${v.toLocaleString()}` },
              { l: "Years", v: years, min: 1, max: 20, step: 1, set: setYears, fmt: (v: number) => `${v} yr` },
              { l: "Expected APY", v: rate, min: 1, max: 60, step: 1, set: setRate, fmt: (v: number) => `${v}%` },
            ].map((s) => (
              <div key={s.l}>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">{s.l}</span>
                  <span className="font-display text-xl font-black text-glow-cyan" style={{ color: "var(--neon-cyan)" }}>{s.fmt(s.v)}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.v}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--neon-cyan) 0%, var(--neon-purple) ${((s.v - s.min) / (s.max - s.min)) * 100}%, oklch(0.2 0.04 250) ${((s.v - s.min) / (s.max - s.min)) * 100}%)`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Projected Value</div>
            <div className="font-display text-5xl md:text-6xl font-black my-3" style={{ background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-pink))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ${Math.round(final).toLocaleString()}
            </div>
            <div className="text-emerald-400 font-semibold mb-4">+ ${Math.round(final - amount).toLocaleString()} profit</div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="g-calc" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.7 0.28 340)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="oklch(0.7 0.28 340)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="oklch(0.88 0.17 200)" strokeWidth={2.5} fill="url(#g-calc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-signup"))} className="mt-6 relative px-8 py-4 rounded-xl font-bold font-display tracking-wider text-sm overflow-hidden glow-cyan">
              <span className="absolute inset-0 neon-gradient" />
              <span className="relative text-background">START THIS PLAN →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}