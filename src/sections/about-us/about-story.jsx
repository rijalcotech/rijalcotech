"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { paths } from "@/routes/paths";
import { Iconify } from "@/components/iconify";
import { useGetOurStoryData } from "../../api/about";
import { Markdown } from "@/components/markdown";

export function AboutStory() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { ourStoryData } = useGetOurStoryData();

  const { title, description, subtitle, featured_image } = ourStoryData || {};

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 md:grid-cols-2">

          {/* Content Side */}
          <div className="flex flex-col gap-8 order-2 md:order-1">
            <div>
              <span
                className="text-sm font-bold uppercase tracking-[0.2em] mb-4 inline-block"
                style={{ color: primaryColor }}
              >
                {subtitle}              </span>

              <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                {title?.split(" ").slice(0, -2).join(" ")}{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                >
                  {title?.split(" ").slice(-2).join(" ")}
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <Markdown children={description} />
            </div>

            <div className="pt-4">
              <Link
                href={paths.category}
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Explore Our Products
                <Iconify
                  icon="solar:arrow-right-bold"
                  width={20}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </div>

          {/* Abstract Image/Illustration Side */}
          <div className="relative  h-[300px] md:h-[450px] w-full rounded-[40px] overflow-hidden order-1 md:order-2 bg-slate-100 shadow-lg">
            {/* Abstract Background */}
            <div className="md:col-span-6">
              {featured_image ? (
                <div className="relative rounded-[32px] overflow-hidden h-[300px] md:h-[450px] ">
                  <img
                    src={featured_image}
                    alt={title || "Featured image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)` }}
                  />

                  <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-3xl" style={{ background: primaryColor }} />
                  <div className="absolute bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-3xl" style={{ background: secondaryColor }} />

                  {/* Center Piece */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl opacity-40 rounded-full" style={{ background: primaryColor }} />
                      <div className="relative flex items-center justify-center h-32 w-32 rounded-3xl bg-white shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
                        <Iconify icon="solar:shop-2-bold-duotone" width={60} style={{ color: primaryColor }} />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-[20%] left-[15%] animate-[float_6s_ease-in-out_infinite] bg-white p-4 rounded-2xl shadow-xl rotate-12">
                    <Iconify icon="solar:cart-large-4-bold-duotone" width={32} className="text-indigo-500" />
                  </div>
                  <div className="absolute bottom-[20%] right-[15%] animate-[float_5s_ease-in-out_infinite_1s] bg-white p-4 rounded-2xl shadow-xl -rotate-12">
                    <Iconify icon="solar:shield-check-bold-duotone" width={32} className="text-emerald-500" />
                  </div>
                </>

              )}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}