import { createFileRoute } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { MarketCards } from "@/components/MarketCards";
import { Features } from "@/components/Features";
import { Dashboard } from "@/components/Dashboard";
import { Calculator } from "@/components/Calculator";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus — The Cyberpunk Crypto Command Center" },
      { name: "description", content: "Trade, stake and grow digital wealth inside a next-generation cyberpunk investment platform powered by AI signals and military-grade security." },
      { property: "og:title", content: "Nexus — The Cyberpunk Crypto Command Center" },
      { property: "og:description", content: "Trade, stake and grow digital wealth inside a next-generation cyberpunk investment platform." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <Ticker />
        <MarketCards />
        <Features />
        <Dashboard />
        <Calculator />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
