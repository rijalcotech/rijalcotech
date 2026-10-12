
"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "@/components/snackbar";

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#1976d2";
const DEFAULT_SECONDARY = "#9c27b0";

// ----------------------------------------------------------------------
// Inline SVGs (replaces Iconify)
// ----------------------------------------------------------------------

function LetterIcon({ size = 40, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path opacity={0.5} d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12z" />
      <path d="M7 9.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm1.5 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
    </svg>
  );
}

function MailboxIcon({ size = 20, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path opacity={0.5} d="M2 13c0-2.828 0-4.243.879-5.121C3.757 7 5.172 7 8 7h8c2.828 0 4.243 0 5.121.879C22 8.757 22 10.172 22 13v2c0 2.828 0 4.243-.879 5.121C20.243 21 18.828 21 16 21H8c-2.828 0-4.243 0-5.121-.879C2 19.243 2 17.828 2 15v-2z" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 11l5.5 3L13 11M22 11l-5.5 3L11 11" />
    </svg>
  );
}

function ArrowRightIcon({ size = 20, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H4a.75.75 0 0 1 0-1.5h14.69l-5.72-5.72a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function SpinnerIcon({ size = 20, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`animate-spin ${className}`}>
      <path opacity={0.3} d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M20 12h2A10 10 0 0 0 12 2v2a8 8 0 0 1 8 8z" />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function HomeNewsletter() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;
  const secondaryColor = vendor?.secondary_color || DEFAULT_SECONDARY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thank you for subscribing!");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section
      className="relative overflow-hidden rounded-[40px] py-20 lg:my-10 my-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group mx-2 lg:mx-0"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      }}
    >

      {/* 1. Ambient White Glows & Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top light */}
        <div className="absolute -top-[50%] -left-[10%] w-[80%] h-[80%] rounded-full opacity-30 blur-[100px] bg-white mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" />
        {/* Bottom light */}
        <div className="absolute -bottom-[50%] -right-[10%] w-[80%] h-[80%] rounded-full opacity-30 blur-[100px] bg-white mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" />

        {/* Subtle grid mesh */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
            backgroundSize: "20px 20px"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 flex flex-col items-center text-center">

        {/* Floating Icon Badge */}
        <div className="relative mb-10 group-hover:-translate-y-2 transition-transform duration-700">
          <div className="absolute inset-0 rounded-full blur-xl opacity-50 bg-white" />
          <div className="relative flex items-center justify-center h-20 w-20 rounded-full border border-white/40 bg-white/20 backdrop-blur-xl shadow-2xl">
            <LetterIcon size={36} className="text-white drop-shadow-md" />
          </div>
        </div>

        {/* Typography */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white mb-6 drop-shadow-lg">
          Stay Ahead with {vendor?.vendor_name || "Rijalco Tech"}

        </h2>

        <p className="max-w-[500px] text-lg text-white/90 font-medium leading-relaxed mb-12 drop-shadow-sm">
          Join our exclusive newsletter. Be the first to unlock new product drops, insider news, and special offers.
        </p>

        {/* Premium Input Form */}
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full max-w-lg flex-col sm:flex-row items-center gap-2 sm:gap-0 rounded-3xl sm:rounded-full bg-white/20 border border-white/40 p-2 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-300 focus-within:bg-white/30 hover:bg-white/25"
        >
          <div className="hidden sm:flex pl-5 text-white">
            <MailboxIcon size={24} />
          </div>
          <input
            type="email"
            placeholder="Enter your best email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl sm:rounded-none bg-white/10 sm:bg-transparent px-4 sm:px-4 text-white placeholder:text-white/70 focus:outline-none border border-white/20 sm:border-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl sm:rounded-full px-8 font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 overflow-hidden shadow-xl bg-white text-slate-900 hover:bg-slate-50"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)' }} />

            <span className="relative z-10">{isLoading ? "Subscribing" : "Subscribe"}</span>
            <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              {isLoading ? <SpinnerIcon size={20} /> : <ArrowRightIcon size={20} />}
            </div>
          </button>
        </form>


      </div>

      <style jsx>{`
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