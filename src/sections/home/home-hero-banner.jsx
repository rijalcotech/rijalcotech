"use client";

import { useAppSelector } from "@/redux/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";
import { paths } from "@/routes/paths";

export function HomeHeroBanner({ sliders }) {
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color || "#000000";

  const slidesData = sliders?.length > 0 ? sliders : [];
  if (!slidesData.length) return null;

  return (
    <section className="container-fluid lg:my-8 my-4 lg:px-0">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        observer={false}
        observeParents={false}
        resizeObserver={false}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} w-8 h-1.5 rounded-full bg-gray-900 opacity-20 transition-all duration-300 mx-1"></span>`;
          }
        }}
        className="w-full relative pb-14" // Padding bottom for pagination outside the slides
      >
        <style jsx global>{`
          .swiper-pagination-bullet-active {
            opacity: 1 !important;
            background: ${primaryColor} !important;
            width: 32px !important;
          }
          .swiper-pagination-bullets {
            bottom: 0px !important;
          }
        `}</style>

        {sliders?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col-reverse lg:flex-row items-stretch gap-4 lg:gap-6 min-h-auto md:min-h-[400px] lg:min-h-[500px]">

              {/* Text Content Block - Clean, white, editorial style */}
              <div className="w-full lg:w-[45%] lg:flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-gray-50 rounded-3xl lg:rounded-4xl relative overflow-hidden group hidden">

                {/* Subtle decorative background element */}
                <div
                  className="absolute -top-24 -left-24 w-64 h-64 rounded-3xl mix-blend-multiply filter blur-3xl opacity-30"
                  style={{ backgroundColor: primaryColor }}
                />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-gray-900"></span>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900">
                      Featured
                    </span>
                  </div>

                  <h2
                    className="text-2xl md:text-[2rem] lg:text-[2.5rem] font-black tracking-tight leading-[1.05] text-gray-900 mb-6"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />

                  <div
                    className="text-base md:text-[0.9rem] text-gray-600 leading-relaxed mb-10 max-w-md font-medium break-words [&>p]:mb-0 [&>p]:inline"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />

                  <div className="flex flex-wrap gap-3 items-center">
                    <Link
                      href={slide.product_url || '#'}
                      className="relative overflow-hidden bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center group/btn"
                    >
                      <span className="relative z-10 flex items-center">
                        Shop Now
                        <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </span>
                    </Link>

                    <Link
                      href={paths.category}
                      className="px-8 py-4 rounded-xl font-bold text-sm tracking-wide text-gray-900 bg-transparent border-2 border-gray-200 transition-all duration-300 hover:border-gray-900 flex items-center"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>

              {/* Image Block - 100% visible, perfectly framed */}
              <div className="w-full lg:w-[55%] h-[280px] sm:h-[400px] lg:h-auto relative rounded-3xl lg:rounded-4xl overflow-hidden  group shadow-xl">
                <img
                  src={slide.featured_image}
                  alt={slide.title}
                  title={slide.title}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[20000ms] ease-out group-hover:scale-110 lg:rounded-4xl "
                  aria-hidden="true"
                />

                {/* Very subtle inner shadow for a premium feel */}
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none" />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}