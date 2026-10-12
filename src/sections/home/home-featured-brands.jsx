"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setBrand, setCategory } from "@/redux/actions";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HomeFeaturedBrands({ brands }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (!brands?.length) return null;

  const handleView = (id) => {
    dispatch(setBrand([id]));
    dispatch(setCategory(""));
    router.push(paths.product.root);
  };

  return (
    <section className="container-fluid lg:my-8 my-4 lg:px-0">
      <style jsx global>{`
        .brand-swiper {
          padding-left: 10px !important;
          padding-right: 10px !important;
          padding-bottom: 40px !important; /* Space for pagination */
        }
        .brand-swiper .swiper-button-next,
        .brand-swiper .swiper-button-prev {
          display: none !important;
        }

        @media (min-width: 768px) {
          .brand-swiper {
            padding-left: 50px !important;
            padding-right: 50px !important;
          }
          .brand-swiper .swiper-button-next,
          .brand-swiper .swiper-button-prev {
            display: flex !important;
            width: 32px;
            height: 32px;
            background-color: #1a1a1a;
            border-radius: 6px;
            color: white;
            margin-top: -30px; /* Adjust for padding-bottom */
          }
        }

        .brand-swiper .swiper-button-prev {
          left: 0px;
          padding:5px;
        }
        .brand-swiper .swiper-button-next {
          right: 0px;
          padding:5px;
        }
        .brand-swiper .swiper-button-next:after,
        .brand-swiper .swiper-button-prev:after {
          font-size: 5px !important;
          font-weight: 900;
        }
        .brand-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #e5e7eb;
          opacity: 1;
          transition: all 0.3s;
          margin: 0 4px !important;
        }
        .brand-swiper .swiper-pagination-bullet-active {
          width: 16px;
          border-radius: 4px;
          background: #dc2626; /* Red active dot */
        }
        .brand-swiper .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop={brands.length > 6}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 15 },
        }}
        className="brand-swiper"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.brand_id}>
            <div
              onClick={() => handleView(brand.brand_id)}
              className="flex h-20 cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <img
                alt={brand.brand_name}
                title={brand.brand_name}
                src={brand.brand_image}
                className="max-h-16 w-auto max-w-full object-contain mix-blend-multiply"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}