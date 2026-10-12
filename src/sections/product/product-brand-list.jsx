
import { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";

import { CONFIG } from "@/global-config";

import { useAppDispatch } from "@/redux/hooks";
import { setBrand } from "@/redux/actions";

import { Image } from "@/components/image";
import { Carousel, useCarousel } from "@/components/carousel";

export function ProductBrandList({ brands, filters }) {
  const dispatch = useAppDispatch();
  const { state: currentFilters, setState: updateFilters } = filters;

  const carousel = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "20px",
      slidesToShow: { xs: 3, sm: 3, md: 5, lg: 6 },
    },
    [Autoplay({ playOnInit: true, delay: 4000 })]
  );

  const handleFilter = useCallback(
    (selectedBrandId) => {
      const updateBrandIds = currentFilters.brand.includes(selectedBrandId)
        ? currentFilters.brand.filter((id) => id !== selectedBrandId)
        : [...currentFilters.brand, selectedBrandId];

      updateFilters({ brand: updateBrandIds });
      dispatch(setBrand(updateBrandIds));
    },
    [updateFilters, currentFilters.brand, dispatch]
  );

  if (!brands?.length) {
    return null;
  }

  return (
    <section className="flex flex-col gap-2 mb-2 md:mb-2">
      {/* <p className="text-sm font-bold mb-0">Our Brands</p> */}

      <div>
        <Carousel carousel={carousel} className="p-2">
          {brands.map((brand) => (
            <ProductBrandItem
              key={brand.brand_id}
              item={brand}
              onFilter={() => handleFilter(brand.brand_id)}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function ProductBrandItem({ item, onFilter }) {
  const { brand_name, brand_image } = item || {};

  return (
    <div
      onClick={onFilter}
      className="
        p-3 md:p-4 cursor-pointer flex items-center justify-center
        min-h-[100px]   overflow-visible rounded-xl bg-white shadow-md
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:-translate-y-1 hover:shadow-xl
        group
      "
    >
      <img
        alt={brand_name}
        title={brand_name}
        src={`${brand_image}`}
        className="w-auto lg:h-[80px] h-[50px] cursor-pointer transition-all duration-300 group-hover:scale-110"
      // slotProps={{
      //   img: {
      //     className: "object-contain w-auto h-full",
      //   },
      // }}
      />
    </div>
  );
}