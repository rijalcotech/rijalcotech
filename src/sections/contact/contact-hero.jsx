"use client";

import { m } from "framer-motion";
import { varFade, AnimateText, MotionContainer } from "@/components/animate";
import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function ContactHero({ className = "", ...other }) {
  const vendor = useAppSelector((state) => state.vendor.vendor);

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  return (
    <section
      className={[
        "relative overflow-hidden",
        "py-24 md:py-32",
        "bg-slate-900",
        className,
      ].join(" ")}
      {...other}
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full opacity-20 mix-blend-screen blur-[100px]"
          style={{ background: primaryColor }}
        />
        <div
          className="absolute top-[20%] -right-[10%] w-[40%] h-[80%] rounded-full opacity-20 mix-blend-screen blur-[100px]"
          style={{ background: secondaryColor }}
        />
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <MotionContainer>
          <div className="flex flex-col items-center text-center space-y-12">

            {/* Animated Heading */}
            <div className="space-y-4 max-w-3xl">
              <m.div variants={varFade("inUp", { distance: 30 })}>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                  Get in <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>Touch</span>
                </h1>
              </m.div>
              <m.div variants={varFade("inUp", { distance: 30 })}>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                  Have a question or want to work together? We'd love to hear from you.
                  Reach out to our team and we'll respond as soon as we can.
                </p>
              </m.div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
              {[
                {
                  icon: "solar:map-point-linear",
                  title: "Visit Us",
                  desc: vendor?.address || "123 Commerce St, Tech City",
                },
                {
                  icon: "solar:phone-linear",
                  title: "Call Us",
                  desc: vendor?.contact_info || "+1 (555) 123-4567",
                },
                {
                  icon: "solar:chat-round-linear",
                  title: "Chat with Us",
                  desc: "support@example.com",
                }
              ].map((item, index) => (
                <m.div
                  key={index}
                  variants={varFade("inUp", { distance: 24 })}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-md transition-all duration-300 group-hover:blur-xl opacity-0 group-hover:opacity-100" />
                  <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col items-center text-center space-y-4 hover:bg-white/[0.05] transition-colors duration-300">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)` }}
                    >
                      <Iconify icon={item.icon} width={24} height={24} color={primaryColor} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>

          </div>
        </MotionContainer>
      </div>
    </section>
  );
}