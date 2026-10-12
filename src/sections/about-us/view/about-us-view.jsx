"use client";

import { AboutHero } from "../about-hero";
import { AboutMission } from "../about-mission";
import { AboutOwner } from "../about-owner";
import { AboutStory } from "../about-story";
import { AboutStats } from "../about-stats";
import { AboutFeatures } from "../about-features";
import { AboutTeam } from "../about-team";
import { AboutCta } from "../about-cta";

// ----------------------------------------------------------------------

export function AboutUsView() {
  return (
    <main>
      <div className="mx-auto container px-2 lg:px-4 pt-2 md:pt-4">
        {/* Hero Section */}
        <AboutHero />

        {/* Mission, Vision, Values */}
        <AboutMission />

        {/* Company Owner */}
        <AboutOwner />

        {/* Our Story */}
        <AboutStory />

        {/* Stats Section */}
        <AboutStats />

        {/* Features / Why Choose Us */}
        <AboutFeatures />

        {/* Team Section */}
        <AboutTeam />

        {/* Call to Action */}
        <AboutCta />
      </div>
    </main>
  );
}