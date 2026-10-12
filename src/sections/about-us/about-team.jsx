"use client";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

const getInitials = (name) => {
  if (!name) return "??";
  return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
};

export function AboutTeam() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { aboutData } = useGetAboutData();

  const teams = aboutData?.teams || [];
  const primaryColor = vendor?.primary_color || "#4f46e5";

  if (teams.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-slate-50/50  rounded-[40px] border border-slate-100">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4">
            <span
              className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
              style={{ color: primaryColor }}
            >
              Our Team
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Meet the <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, #06b6d4)` }}>People</span> Behind {vendor?.vendor_name || "Us"}
            </h2>

            <p className="text-lg text-slate-500 max-w-2xl">
              A passionate team dedicated to delivering the best ecommerce experience for you.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teams.map(({ id, name, designation, featured_image }, index) => {
              const initials = getInitials(name);

              return (
                <div
                  key={id || index}
                  className="group relative flex flex-col items-center bg-white rounded-3xl p-8 border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 left-0 w-full h-32 rounded-t-3xl opacity-10 bg-gradient-to-b from-slate-300 to-transparent pointer-events-none" />

                  {/* Avatar Container */}
                  <div className="relative mb-6">
                    <div
                      className="absolute -inset-1 rounded-full opacity-0 blur group-hover:opacity-40 transition duration-500"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #06b6d4)` }}
                    />
                    <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center">
                      {featured_image ? (
                        <img
                          src={featured_image}
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <span className="text-3xl font-black" style={{ color: primaryColor }}>
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center z-10 flex flex-col items-center w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
                    <p className="text-sm font-medium" style={{ color: primaryColor }}>{designation}</p>

                    {/* Socials - Reveal on hover */}
                    <div className="flex gap-3 mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {["mdi:linkedin", "mdi:twitter"].map((iconName, i) => (
                        <button
                          key={i}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-800 hover:text-white"
                        >
                          <Iconify icon={iconName} width={20} />
                        </button>
                      ))}
                    </div>
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