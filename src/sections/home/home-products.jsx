
"use client";

import { useState } from "react";
import { Lightbox } from "@/components/lightbox";

// ----------------------------------------------------------------------

const DEFAULT_SECONDARY = "#9c27b0";

function hexAlpha(hex, opacity) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

// ----------------------------------------------------------------------
// Inline SVG
// ----------------------------------------------------------------------

function EyeIcon({ size = 24, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path opacity={0.5} d="M12 5C7.18 5 3.11 7.95 1.5 12c1.61 4.05 5.68 7 10.5 7s8.89-2.95 10.5-7C20.89 7.95 16.82 5 12 5z" />
    </svg>
  );
}

// ----------------------------------------------------------------------

const STATIC_PRODUCTS = [
  { product_id: 1, product_name: "Premier Vit - Multivitamins, Multiminerals & Antioxidants witth Lycopene & Lutein Tablets", image: "/assets/images/products/product.jpg" },
  { product_id: 2, product_name: "Omega Max - Omega-3 Fish Oil 1000mg with Vitamin D3 Softgels", image: "/assets/images/products/product-1.jpg" },
  { product_id: 3, product_name: "Coralcal Calcium Supplement", image: "/assets/images/products/product-2.jpg" },
  { product_id: 4, product_name: "CoKing Pro - CoEnzyme Q10 & L-Carnitine Tablets", image: "/assets/images/products/product-3.jpg" },
  { product_id: 5, product_name: "CoQueen-Max - CoEnzyme + Vitamin E", image: "/assets/images/products/product-4.jpg" },
];

// ----------------------------------------------------------------------

export function HomeProducts({ vendor }) {
  const secondaryColor = vendor?.secondary_color || DEFAULT_SECONDARY;

  return (
    <section className="relative overflow-hidden py-6 md:py-6">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-[150px] -right-[150px] h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ backgroundColor: hexAlpha("#1976d2", 0.04) }}
      />
      <div
        className="pointer-events-none absolute -bottom-[100px] -left-[100px] h-[350px] w-[350px] rounded-full blur-[100px]"
        style={{ backgroundColor: hexAlpha(secondaryColor, 0.03) }}
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 flex flex-col gap-16">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-2xl border px-6 py-2"
            style={{
              backgroundColor: hexAlpha(secondaryColor, 0.08),
              borderColor: hexAlpha(secondaryColor, 0.15),
            }}
          >
            {/* Pulsing dot */}
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: secondaryColor }}
            />
            <span
              className="text-[0.7rem] font-bold uppercase tracking-[2px]"
              style={{ color: secondaryColor }}
            >
              Premium Collection
            </span>
          </div>

          {/* Title */}
          <h2 className="max-w-[700px] text-[2rem] font-extrabold leading-[1.15] tracking-tight text-gray-900 md:text-[2.75rem]">
            Our Featured{" "}
            <span className="relative inline-block" style={{ color: secondaryColor }}>
              Products
              {/* Highlight underline */}
              <span
                className="absolute -bottom-1 left-0 right-0 -z-10 h-2 rounded-lg"
                style={{ backgroundColor: hexAlpha(secondaryColor, 0.2) }}
              />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-[550px] text-[1.05rem] leading-[1.75] text-gray-500">
            Discover our carefully curated selection of premium health and wellness products
          </p>
        </div>

        {/* ── Products Grid ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {STATIC_PRODUCTS.map((product) => (
            <ProductCard key={product.product_id} product={product} secondaryColor={secondaryColor} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function ProductCard({ product, secondaryColor }) {
  const { product_name, image } = product;
  const [openLightbox, setOpenLightbox] = useState(false);

  const slides = [{ src: image, title: product_name }];

  return (
    <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:scale-[1.02]"
      style={{
        borderColor: "rgba(145,158,171,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 48px ${hexAlpha(secondaryColor, 0.2)}, 0 8px 24px rgba(0,0,0,0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden pb-[110%]" style={{ backgroundColor: "rgba(145,158,171,0.03)" }}>

        {/* Premium badge — slides in on hover */}
        <div
          className="absolute left-3 top-3 z-20 -translate-x-full rounded-xl px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white opacity-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0 group-hover:opacity-100"
          style={{ backgroundColor: secondaryColor }}
        >
          Premium
        </div>

        {/* Product image */}
        <img
          alt={product_name}
          title={product_name}
          src={image}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)" }}
        >
          {/* Eye button */}
          <button
            type="button"
            onClick={() => setOpenLightbox(true)}
            className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 hover:scale-110"
            style={{
              backgroundColor: secondaryColor,
              boxShadow: `0 4px 16px ${hexAlpha(secondaryColor, 0.4)}`,
            }}
          >
            <EyeIcon size={24} />
          </button>

          {/* Product name */}
          <h3 className="line-clamp-2 text-center text-[0.9rem] font-bold leading-[1.4] text-white md:text-[1rem]">
            {product_name}
          </h3>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox slides={slides} open={openLightbox} close={() => setOpenLightbox(false)} />
    </div>
  );
}