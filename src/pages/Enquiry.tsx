import { ContactForm } from "@/components/ContactForm";

export default function Enquiry() {
  return (
    <div className="relative pt-32 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold tracking-tight mb-4 text-foreground">
              Complete Your Registration
            </h1>
            <p className="text-muted-foreground text-lg font-rajdhani">
              Enter your details below to access the exclusive platform.
            </p>
          </div>
          <ContactForm formId="enquiry-form" />
        </div>
      </div>
    </div>
  );
}
