"use client";

import { ServiceHero } from "../service-hero";
import { ServiceProcess } from "../service-process";
import { ServiceBenefits } from "../service-benefits";
import { ServiceFaq } from "../service-faq";
import { ServiceCta } from "../service-cta";
import { ServiceList } from "../service-list";

// ----------------------------------------------------------------------

export function ServiceView() {
  return (
    <main>
      {/* Hero Section */}
      <div className="mx-auto container lg:px-4 px-2 pt-2 md:pt-4">
        <ServiceHero />
      </div>

      {/* Core Services */}
      <ServiceList />

      {/* How It Works */}
      <ServiceProcess />

      {/* Benefits */}
      <ServiceBenefits />

      {/* FAQ Section */}
      <ServiceFaq />

      {/* Call to Action */}
      <ServiceCta />
    </main>
  );
}