"use client";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

export function AboutHero() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { aboutData } = useGetAboutData();
  const { title = "About Us", subtitle, description } = aboutData || {};

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  return (
    <section className="relative flex min-h-[400px] md:min-h-[450px] items-center justify-center overflow-hidden rounded-[40px] bg-slate-50 mt-4 border border-slate-200">

      {/* 1. Giant Animated Outline Marquee (Background) */}
      <div className="absolute inset-0 flex flex-col justify-center gap-12 overflow-hidden pointer-events-none opacity-[0.08]">
        <div className="flex w-[200%] animate-marquee-left whitespace-nowrap">
          {Array(8).fill(title).map((text, i) => (
            <span
              key={i}
              className="text-[8rem] md:text-[12rem] font-black uppercase leading-none tracking-tighter mx-4 text-transparent"
              style={{ WebkitTextStroke: `2px ${primaryColor}` }}
            >
              {text}
            </span>
          ))}
        </div>
        <div className="flex w-[200%] animate-marquee-right whitespace-nowrap">
          {Array(8).fill(title).map((text, i) => (
            <span
              key={i}
              className="text-[8rem] md:text-[12rem] font-black uppercase leading-none tracking-tighter mx-4 text-transparent"
              style={{ WebkitTextStroke: `2px ${secondaryColor}` }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Sweeping Laser Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-0 h-[2px] w-[200px] animate-laser-horizontal opacity-70 blur-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`, boxShadow: `0 0 20px 2px ${primaryColor}` }}
        />
        <div
          className="absolute right-[20%] top-0 w-[2px] h-[200px] animate-laser-vertical opacity-70 blur-[1px]"
          style={{ background: `linear-gradient(180deg, transparent, ${secondaryColor}, transparent)`, boxShadow: `0 0 20px 2px ${secondaryColor}` }}
        />
      </div>

      {/* 3. Central Glass Monolith (3D Effect) */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 perspective-1000">
        <div
          className="relative rounded-[3rem] border border-slate-200/80 bg-white/70 p-8 md:p-16 backdrop-blur-2xl transition-transform duration-700 hover:rotate-x-0 rotate-x-3 shadow-xl"
          style={{
            boxShadow: `0 20px 80px -20px ${primaryColor}20, inset 0 0 40px -10px ${secondaryColor}10`,
            transformStyle: "preserve-3d",
            transform: "perspective(1200px) rotateX(8deg)"
          }}
        >
          {/* Inner Corner Accents */}
          <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 rounded-tl-[3rem] opacity-50" style={{ borderColor: primaryColor }} />
          <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 rounded-br-[3rem] opacity-50" style={{ borderColor: secondaryColor }} />

          <div className="flex flex-col items-center text-center gap-8 translate-z-10">
            {/* Holographic Badge */}
            <div className="relative group cursor-pointer">
              <div
                className="absolute -inset-1 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"
                style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
              />
              <span className="relative inline-flex items-center gap-2 rounded-full px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-slate-800 bg-white border border-slate-200">
                <Iconify icon="solar:planet-3-bold-duotone" width={18} />
                {subtitle || ""}
              </span>
            </div>

            {/* Glowing Typography */}
            <h1 className="text-[3rem] font-black leading-[1.1] tracking-tighter sm:text-[4rem] md:text-[5rem]">
              <span className="text-slate-900">
                {title.split(" ")[0]}{" "}
              </span>
              <span
                className="text-transparent bg-clip-text animate-pulse-glow"
                style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            {/* Markdown Text */}
            <div className="max-w-[600px] text-lg leading-relaxed text-slate-600 font-light">
              <Markdown>
                {description || ""}
              </Markdown>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-laser-horizontal {
          animation: laserH 6s ease-in-out infinite;
        }
        .animate-laser-vertical {
          animation: laserV 8s ease-in-out infinite 1s;
        }
        @keyframes laserH {
          0% { top: 10%; left: -200px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 80%; left: 100%; opacity: 0; }
        }
        @keyframes laserV {
          0% { top: -200px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .translate-z-10 {
          transform: translateZ(50px);
        }

        .animate-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite alternate;
        }
        @keyframes pulseGlow {
          0% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.1)); }
          100% { filter: drop-shadow(0 0 30px rgba(255,255,255,0.4)); }
        }
      `}</style>
    </section>
  );
}