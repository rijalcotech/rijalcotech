import { ContactHero } from "../contact-hero";
import { ContactForm } from "../contact-form";
import { ContactMap } from "../contact-map";

// ----------------------------------------------------------------------

export function ContactView() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <ContactHero />

      <section className="relative -mt-16 md:-mt-24 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
            <ContactForm className="h-full" />
            <ContactMap />
          </div>
        </div>
      </section>
    </div>
  );
}