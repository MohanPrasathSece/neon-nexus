import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { MarketCards } from "@/components/MarketCards";
import { Features } from "@/components/Features";
import { Calculator } from "@/components/Calculator";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative">
        <Hero />
        <Ticker />
        <MarketCards />
        <Features />
        <Calculator />
        <Testimonials />
        <FAQ />
        
        {/* Contact Form Section */}
        <section id="contact" className="py-24 relative overflow-hidden bg-background">
          <div className="container mx-auto px-4 md:px-6 z-10 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                  INITIATE CONTACT
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-rajdhani">
                Securely transmit your inquiry to our encrypted network.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <ContactForm formId="home-contact" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
