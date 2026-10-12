"use client";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";

export function ServiceHero() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#2563eb";
  const secondaryColor = vendor?.secondary_color || "#7c3aed";

  return (
    <section className="relative flex min-h-[400px] md:min-h-[500px] items-center justify-center overflow-hidden rounded-[40px] bg-[#050505] mt-4 border border-white/10 shadow-2xl">
      
      {/* Abstract Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Sweeping Energy Orbs - Increased opacity and added light cores for better visibility even with dark brand colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[30%] -left-[10%] w-[60%] h-[80%] rounded-full opacity-50 blur-[100px] animate-blob mix-blend-screen"
          style={{ background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, ${primaryColor} 50%, transparent 100%)` }}
        />
        <div
          className="absolute top-[20%] -right-[10%] w-[50%] h-[80%] rounded-full opacity-40 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"
          style={{ background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, ${secondaryColor} 50%, transparent 100%)` }}
        />
      </div>

      {/* Floating Holographic Icons */}
      <div className="absolute right-[10%] top-[15%] animate-float group perspective-1000">
        <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl transition-transform duration-500 group-hover:rotate-y-12">
          <div className="absolute inset-0 blur-xl opacity-50 rounded-full" style={{ background: primaryColor }} />
          <Iconify icon="solar:settings-bold-duotone" width={48} className="relative z-10 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="absolute bottom-[20%] left-[8%] animate-float-delay group perspective-1000 hidden md:block">
        <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl transition-transform duration-500 group-hover:rotate-y-12">
          <div className="absolute inset-0 blur-xl opacity-50 rounded-full" style={{ background: secondaryColor }} />
          <Iconify icon="solar:wrench-bold-duotone" width={40} className="relative z-10 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="absolute left-[20%] top-[25%] animate-float-slow">
        <Iconify icon="solar:star-bold-duotone" width={32} className="text-white/50" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center">
        <div className="flex flex-col items-center gap-8">
          
          {/* Neon Pill Subtitle - Forced text-white for visibility */}
          <span
            className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.25em] backdrop-blur-md transition-all duration-500 hover:scale-105 text-white bg-white/10 border border-white/20 shadow-lg"
          >
            <div className="h-2 w-2 rounded-full animate-pulse bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            What We Offer
          </span>

          {/* Premium Gradient Title - Fixed gradient to ensure visibility even if brand colors are dark */}
          <h1 className="text-[3.5rem] font-black leading-tight tracking-tighter sm:text-[4.5rem] md:text-[5.5rem] drop-shadow-2xl">
            <span className="text-white">
              Our{" "}
            </span>
            <span 
              className="text-transparent bg-clip-text animate-pulse-glow"
              style={{ backgroundImage: `linear-gradient(to right, #ffffff, ${primaryColor}, #ffffff)` }}
            >
              Services
            </span>
          </h1>

          {/* Clean Description */}
          <p className="max-w-[600px] text-lg leading-relaxed text-slate-300 font-light mix-blend-screen">
            Comprehensive ecommerce solutions designed to enhance your
            shopping experience with innovation, reliability, and excellence.
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 7s ease-in-out infinite 2s;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite 1s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .animate-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite alternate;
        }
        @keyframes pulseGlow {
          0% { filter: drop-shadow(0 0 15px rgba(255,255,255,0.2)); }
          100% { filter: drop-shadow(0 0 30px rgba(255,255,255,0.6)); }
        }

        .rotate-y-12 {
          transform: rotateY(12deg);
        }
      `}</style>
    </section>
  );
}