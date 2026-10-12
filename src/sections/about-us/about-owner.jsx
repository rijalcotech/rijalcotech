"use client";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

const getInitials = (name) => {
  if (!name) return "??";
  return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
};

export function AboutOwner() {
  const { aboutData } = useGetAboutData();
  const messages = aboutData?.message || [];
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  if (!messages.length) return null;

  return (
    <section className="relative overflow-hidden my-10 md:my-20 bg-slate-50 rounded-[40px] border border-slate-200 shadow-xl">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.06) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl py-10 lg:py-20">
        <div className="space-y-32">
          {messages.map((person, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={person.id}
                className={`flex flex-col gap-12 lg:gap-20 ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center`}
              >
                {/* 1. Creative Image Section */}
                <div className="w-full lg:w-5/12 relative flex justify-center">

                  {/* Floating Elements & Backlight */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-20 blur-[80px] pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
                  />

                  <div className="relative group perspective-1000">
                    <div
                      className="relative w-[300px] h-[400px] md:w-[380px] md:h-[500px] rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl transition-transform duration-700 group-hover:rotate-y-12 group-hover:scale-105"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Image */}
                      {person.featured_image ? (
                        <img
                          src={person.featured_image}
                          alt={person.name}
                          title={person.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center bg-slate-100 text-7xl font-black"
                          style={{ color: primaryColor }}
                        >
                          {getInitials(person.name)}
                        </div>
                      )}

                      {/* Glassmorphism Nameplate Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-z-20">
                        <div className="backdrop-blur-xl bg-white/70 border border-slate-200/80 rounded-2xl p-6 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-2xl font-bold text-slate-900 mb-1">{person.name || "Leadership"}</h3>
                          <p
                            className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
                          >
                            {person.designation || "Executive"}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* 2. Editorial Content Section */}
                <div className="w-full lg:w-7/12 flex flex-col relative p-5">

                  {/* Giant Decorative Quote Mark */}
                  <Iconify
                    icon="fa-solid:quote-left"
                    className="absolute -top-10 -left-10 md:-top-20 md:-left-16 text-slate-200/60 rotate-12 pointer-events-none"
                    width={180}
                  />

                  <div className="relative z-10">
                    {/* Tiny Neon Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px w-12" style={{ background: primaryColor }} />
                      <span
                        className="text-xs font-black uppercase tracking-[0.3em] text-transparent bg-clip-text"
                        style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
                      >
                        {index === 0 ? "The Visionary" : "Leadership"}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-12">
                      {index === 0 ? "Driving the Future of" : "Excellence at"}{" "}
                      <br />
                      <span className="italic text-slate-500">
                        {vendor?.vendor_name}
                      </span>
                    </h2>

                    {/* The Message */}
                    <div className="relative pl-6 md:pl-10 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                      <div className="text-md md:text-xl lg:text-xl leading-relaxed text-slate-600 font-light">
                        <Markdown>
                          {person.message || person.description || "We lead with passion and dedication to provide the best possible service, pushing the boundaries of what's possible."}
                        </Markdown>
                      </div>
                    </div>

                    {/* Signature / Accent */}


                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .translate-z-20 {
          transform: translateZ(30px);
        }
      `}</style>
    </section>
  );
}