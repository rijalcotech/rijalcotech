"use client";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

const FA_TO_SOLAR_ICON_MAP = {
  "fa-star": "solar:star-bold-duotone",
  "fa-lightbulb": "solar:lightbulb-bolt-bold-duotone",
  "fa-headset": "solar:headphones-round-sound-bold-duotone",
  "fa-users-cog": "solar:users-group-rounded-bold-duotone",
  "fa-shield": "solar:shield-check-bold-duotone",
  "fa-rocket": "solar:rocket-bold-duotone",
  "fa-cog": "solar:settings-bold-duotone",
  "fa-check": "solar:verified-check-bold-duotone",
  "fa-heart": "solar:heart-bold-duotone",
  "fa-clock": "solar:clock-circle-bold-duotone",
  "fa-truck": "solar:delivery-bold-duotone",
  "fa-dollar-sign": "solar:tag-price-bold-duotone",
};

export function AboutFeatures() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { aboutData } = useGetAboutData();

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const whyChooseUs = aboutData?.why_choose_us || [];

  if (!whyChooseUs.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white pb-0 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 items-center">

          <div className="flex flex-col items-center text-center gap-4 max-w-3xl">
            <span
              className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-slate-100"
              style={{ color: primaryColor }}
            >
              Why Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything You Need for a{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, #06b6d4)` }}>
                Perfect
              </span>{" "}
              Shopping Experience
            </h2>

            <p className="text-lg text-slate-500">
              We've designed every aspect of our platform to make your shopping journey smooth, secure, and satisfying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {whyChooseUs.map(({ id, title, icon, description }, index) => {
              const solarIcon = FA_TO_SOLAR_ICON_MAP[icon] || "solar:star-bold-duotone";

              return (
                <div
                  key={id || index}
                  className="group relative overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-200 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Subtle Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, #06b6d4)` }}
                  />

                  <div className="relative z-10 flex flex-col gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    >
                      <Iconify icon={solarIcon} width={28} style={{ color: primaryColor }} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      {title}
                    </h3>

                    <p className="text-base text-slate-600 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}