"use client";

import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

function AnimatedCounter({ value, duration = 2000, symbol = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const isDecimal = numericValue % 1 !== 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated, numericValue]);

  const animateCounter = () => {
    const startTime = Date.now();
    const endValue = numericValue;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * endValue;

      setCount(isDecimal ? currentValue : Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formatNumber = (num) => {
    if (isDecimal) return num.toFixed(1);
    return Math.floor(num).toLocaleString();
  };

  return (
    <span ref={ref}>
      {formatNumber(count)}
      {symbol}
    </span>
  );
}

// ----------------------------------------------------------------------

export function AboutStats() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { aboutData, aboutLoading } = useGetAboutData();
  const counters = aboutData?.counters || [];

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  if (aboutLoading || !counters.length) return null;

  return (
    <section className="relative overflow-hidden rounded-[40px] py-20 md:py-32 lg:my-10 my-10 mb-0  bg-[#404040] border border-white/5 shadow-2xl">
      {/* Abstract Animated Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px] animate-pulse-slow"
          style={{ background: primaryColor }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[100px] animate-pulse-slow delay-1000"
          style={{ background: secondaryColor }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-20">

          {/* Header */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="inline-flex items-center justify-center rounded-full px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span
                className="text-xs font-black uppercase tracking-[0.3em] text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Our Impact
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white">
              Trusted by <br />
              <span
                className="text-transparent bg-clip-text animate-text-shimmer"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
                  backgroundSize: '200% auto'
                }}
              >
                Thousands
              </span>
            </h2>
          </div>

          {/* Staggered Stats Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center px-4">
            {counters.map((stat, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`group relative flex flex-col items-center lg:p-10 p-5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:bg-white/10 ${isEven ? 'lg:-translate-y-8' : 'lg:translate-y-8'}`}
                  style={{
                    boxShadow: `0 20px 40px -20px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.1)`
                  }}
                >
                  {/* Hover Glow Underneath */}
                  <div
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: index % 2 === 0 ? primaryColor : secondaryColor }}
                  />

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    {/* Rotating Dashed Ring */}
                    <div
                      className="absolute -inset-4 rounded-full border border-dashed border-white/20 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div
                      className="flex items-center justify-center h-16 w-16 lg:h-20 lg:w-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110"
                    >
                      <Iconify
                        icon={stat.icon}
                        width={{ lg: 40, sm: 30 }}
                        style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
                        className="drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Counter */}
                  <div className="relative mb-2 flex items-baseline">
                    <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter drop-shadow-xl">
                      <AnimatedCounter value={stat.count} duration={2500} symbol="" />
                    </h3>
                    {stat.symbol && (
                      <span
                        className="text-2xl font-bold ml-1 text-transparent bg-clip-text"
                        style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                      >
                        {stat.symbol}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">
                    {stat.title}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite alternate;
        }
        @keyframes pulseSlow {
          0% { transform: scale(1); opacity: 0.1; }
          100% { transform: scale(1.2); opacity: 0.3; }
        }

        .animate-text-shimmer {
          animation: textShimmer 3s linear infinite;
        }
        @keyframes textShimmer {
          to {
            background-position: 200% center;
          }
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </section>
  );
}