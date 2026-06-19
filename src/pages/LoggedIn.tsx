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
                ORBITX KNOWLEDGE BASE
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto relative z-10">
              Master the digital frontier with our comprehensive guide to cryptocurrency, blockchain technology, and strategic investments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            <div className="lg:col-span-2 space-y-8">
              
              <MacBrowserTab id="dashboard" title="Introduction to Cryptocurrency" icon={<BookOpen className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-orbitron font-semibold text-foreground">Digital Assets 101</h3>
                  <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                    Cryptocurrency represents a paradigm shift in how we perceive and exchange value. Unlike traditional fiat currencies controlled by central banks, cryptocurrencies operate on decentralized networks, enabling peer-to-peer transactions globally, 24/7, without intermediaries.
                  </p>
                  <div className="bg-background/40 p-4 rounded-lg border border-border mt-4">
                    <p className="text-sm font-rajdhani text-neon-blue">
                      "The root problem with conventional currency is all the trust that's required to make it work. The central bank must be trusted not to debase the currency, but the history of fiat currencies is full of breaches of that trust." - Satoshi Nakamoto
                    </p>
                  </div>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="assets" title="Understanding Blockchain" icon={<Cpu className="w-4 h-4 text-neon-purple" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-orbitron font-semibold text-foreground">The Distributed Ledger</h3>
                  <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                    At its core, a blockchain is a distributed digital ledger that records transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks and the consensus of the network. This technology ensures transparency, security, and immutability.
                  </p>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="trade" title="Crypto Trading Basics & Market Analysis" icon={<Activity className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-orbitron font-semibold text-foreground">Reading the Markets</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                      Successful trading requires understanding market cycles, technical analysis, and sentiment. Candlestick charts are the primary tool used by traders to analyze price movements over time. Each candle represents a specific timeframe, showing the open, high, low, and close prices.
                    </p>
                    <div className="bg-background/80 border border-border rounded-xl p-4 h-64 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none"></div>
                      <AnimatedCandlestick />
                    </div>
                  </div>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="earn" title="Portfolio Diversification" icon={<PieChart className="w-4 h-4 text-neon-purple" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-orbitron font-semibold text-foreground">Strategic Allocation</h3>
                  <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                    Never put all your digital assets in one protocol. A well-diversified portfolio might include established large-cap assets (like BTC and ETH) as a foundation, mid-cap utility tokens for growth, and a small percentage allocated to higher-risk experimental protocols.
                  </p>
                </div>
              </MacBrowserTab>

            </div>

            <div className="space-y-8">
              
              <MacBrowserTab id="history" title="Risk Management" icon={<Shield className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground mb-2">Protecting Capital</h3>
                  <ul className="space-y-3 font-rajdhani text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Never invest more than you can afford to lose.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Always use stop-loss orders to limit potential downsides.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Beware of high leverage, especially in volatile markets.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">✓</span>
                      <span>Keep emotional control during market swings.</span>
                    </li>
                  </ul>
                </div>
              </MacBrowserTab>

              <MacBrowserTab id="settings" title="Security Best Practices" icon={<Shield className="w-4 h-4 text-neon-purple" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground mb-2">Operational Security</h3>
                  <p className="text-muted-foreground font-rajdhani mb-4">
                    In the crypto space, you are your own bank. This requires taking full responsibility for your security.
                  </p>
                  <div className="bg-background/40 p-4 rounded border border-border border-l-4 border-l-neon-purple">
                    <p className="font-rajdhani text-sm text-foreground">
                      <strong>Not your keys, not your coins.</strong> Store long-term holdings in cold storage hardware wallets rather than keeping them on exchanges.
                    </p>
                  </div>
                </div>
              </MacBrowserTab>
              
              <MacBrowserTab title="Market Trends & AI" icon={<TrendingUp className="w-4 h-4 text-neon-blue" />}>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground">Next-Gen Intelligence</h3>
                  <p className="text-muted-foreground font-rajdhani">
                    AI and machine learning are revolutionizing how we analyze crypto markets. Algorithms can now process vast amounts of on-chain data, social sentiment, and historical patterns to identify potential opportunities before they become obvious to the broader market.
                  </p>
                </div>
              </MacBrowserTab>

            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-24 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                  NEED MORE INTEL?
                </span>
              </h2>
              <p className="text-muted-foreground text-lg font-rajdhani">
                Connect with our specialists for personalized guidance on your crypto journey.
              </p>
            </div>
            
            <ContactForm formId="loggedin-contact" />
          </div>
          
        </div>
      </div>
    </>
  );
}
