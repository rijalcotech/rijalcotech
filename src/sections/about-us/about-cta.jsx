"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { paths } from "@/routes/paths";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function AboutCta() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4">

        {/* Main Dark Holographic Card */}
        <div
          className="relative overflow-hidden rounded-[40px] bg-[#404040] border border-white/10 px-6 py-20 text-center transition-all duration-700 hover:border-white/20 group"
          style={{
            boxShadow: `0 30px 60px -20px rgba(0,0,0,0.5), inset 0 -20px 80px -20px ${primaryColor}30`
          }}
        >
          {/* Deep Space Background Mesh */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          />

          {/* Core Energy Glows */}
          <div className="absolute inset-0 pointer-events-none mix-blend-screen">
            <div
              className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[120%] h-[100%] rounded-full opacity-40 blur-[100px] transition-transform duration-1000 group-hover:scale-110"
              style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
            />
            <div
              className="absolute -top-[50%] right-[-20%] w-[80%] h-[80%] rounded-full opacity-20 blur-[100px]"
              style={{ background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)` }}
            />
          </div>

          {/* Floating Cyber Elements */}
          <div className="absolute right-[15%] top-[20%] opacity-30 animate-float">
            <div className="relative">
              <div className="absolute inset-0 blur-xl opacity-60 rounded-full" style={{ background: secondaryColor }} />
              <Iconify icon="solar:bag-heart-bold-duotone" width={80} className="relative z-10 text-white" />
            </div>
          </div>

          <div className="absolute left-[12%] bottom-[20%] opacity-30 animate-float-delay">
            <div className="relative">
              <div className="absolute inset-0 blur-xl opacity-60 rounded-full" style={{ background: primaryColor }} />
              <Iconify icon="solar:rocket-bold-duotone" width={60} className="relative z-10 text-white transform -rotate-45" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: secondaryColor }} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">
                Next Steps
              </span>
            </div>

            {/* Typography */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-2xl">
              Ready to Start <br className="hidden sm:block" />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, #fff)` }}
              >
                Shopping?
              </span>
            </h2>

            <p className="max-w-[500px] text-md text-slate-400 font-light leading-relaxed mb-0">
              Join thousands of happy customers and discover amazing products at unbeatable prices. Your perfect shopping experience awaits!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-6">
              <Link
                href={paths.category}
                className="group relative flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 overflow-hidden w-full sm:w-auto shadow-2xl"
              >
                {/* Button Background */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />

                <span className="relative z-10">Browse Products</span>
                <Iconify
                  icon="solar:arrow-right-bold"
                  width={20}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>

              <Link
                href={paths.auth.signUp}
                className="group relative flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                {/* Neon Border */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 transition-colors duration-300 group-hover:border-white/50" />
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}