"use client";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { ProductItem } from "../product/product-item";

import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

export function HomeTrendingProducts({ products }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#FF5630";
  const secondaryColor = vendor?.secondary_color || "#FFAB00";

  if (!products?.length) return null;

  return (
    <section className="container-fluid lg:my-8 my-4 lg:px-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${secondaryColor} 0%, ${primaryColor} 100%)`,
            }}
          >
            <Iconify icon="solar:fire-bold-duotone" width={24} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-xl md:text-2xl">Trending Now</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Most popular products this week
            </p>
          </div>
        </div>

        <RouterLink
          href={paths.product.root}
          className="inline-flex items-center gap-1 font-semibold text-sm transition-transform duration-300 hover:translate-x-1"
        >
          View All Products
          <Iconify icon="solar:arrow-right-bold" width={18} />
        </RouterLink>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {products?.slice(0, 10)?.map((product, index) => (
          <div
            key={product.product_id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
          >
            <ProductItem
              product={product}
              detailsHref={paths.product.details(product.slug)}
              isTrending={index < 3}
            />
          </div>
        ))}
      </div>
    </section>
  );
}