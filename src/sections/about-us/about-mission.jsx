"use client";

import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";
import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

const getIconAndColor = (type, index) => {
  const typeMap = {
    mission: { icon: "solar:target-bold-duotone", color: "indigo" },
    vision: { icon: "solar:eye-bold-duotone", color: "cyan" },
    values: { icon: "solar:heart-pulse-bold-duotone", color: "emerald" },
    goal: { icon: "solar:flag-bold-duotone", color: "blue" },
  };

  const fallbackColors = ["indigo", "cyan", "emerald", "blue", "amber"];
  const fallbackIcons = [
    "solar:target-bold-duotone",
    "solar:eye-bold-duotone",
    "solar:heart-pulse-bold-duotone",
    "solar:flag-bold-duotone",
    "solar:star-bold-duotone",
  ];

  if (type && typeMap[type.toLowerCase()]) {
    return typeMap[type.toLowerCase()];
  }

  return {
    icon: fallbackIcons[index % fallbackIcons.length],
    color: fallbackColors[index % fallbackColors.length],
  };
};

const tailwindColors = {
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", hoverShadow: "hover:shadow-indigo-500/20", border: "hover:border-indigo-500/50" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-600", hoverShadow: "hover:shadow-cyan-500/20", border: "hover:border-cyan-500/50" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", hoverShadow: "hover:shadow-emerald-500/20", border: "hover:border-emerald-500/50" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", hoverShadow: "hover:shadow-blue-500/20", border: "hover:border-blue-500/50" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", hoverShadow: "hover:shadow-amber-500/20", border: "hover:border-amber-500/50" },
};

export function AboutMission() {
  const { aboutData } = useGetAboutData();
  const missionVisions = aboutData?.mission_visions || [];

  if (!missionVisions.length) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:gap-12">
          {missionVisions.map((item, index) => {
            const { icon, color } = getIconAndColor(item.type, index);
            const style = tailwindColors[color];

            return (
              <div
                key={item.id || index}
                className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${style.hoverShadow} ${style.border}`}
              >
                {/* Background Decoration */}
                <div className={`${style.bg} absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-150`} />

                <div className="relative z-10 flex flex-col items-start gap-6">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${style.bg} ${style.text}`}
                  >
                    <Iconify icon={icon} width={32} />
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                      {item.title}
                    </h2>
                    <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}