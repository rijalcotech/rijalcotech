import React from "react";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBrand, setCategory } from "@/redux/actions";

import { FacebookIcon, LinkedinIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/assets/icons";

import { Logo } from "@/components/logo";

import { useGetBrands, useGetHomeRecentProducts } from "@/api";
import { useGetSocialMediaData } from "@/api/social-media";

// ----------------------------------------------------------------------

const LEGAL_SECTIONS = [
  { name: "Terms and condition", href: "#" },
  { name: "Privacy policy", href: "#" },
];

// ----------------------------------------------------------------------

export function Footer({ className = "", layoutQuery = "md", pages, categories, ...other }) {
  const dispatch = useAppDispatch();
  const { vendor } = useAppSelector((state) => state.vendor);
  const { brands } = useGetBrands();
  const { recentProducts } = useGetHomeRecentProducts();
  const { socialMediaData } = useGetSocialMediaData();

  const handleClickBrand = (brandId) => {
    dispatch(setBrand([brandId]));
    dispatch(setCategory(""));
  };

  const handleClickCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
  };

  const footerBg =
    vendor?.secondary_color && vendor?.primary_color
      ? `linear-gradient(135deg, ${vendor.secondary_color} 0%, ${vendor.primary_color} 100%)`
      : vendor?.secondary_color
        ? `linear-gradient(135deg, ${vendor.secondary_color} 0%, ${vendor.secondary_color}dd 100%)`
        : `linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)`;

  // Shared footer link style (arrow hover animation)
  const footerLinkClass =
    "group relative inline-block text-sm text-white/90 no-underline transition-all duration-200 hover:text-white hover:pl-6";

  const footerLinkArrow = (
    <span className="absolute left-0 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-1">
      →
    </span>
  );

  // Shared section heading style
  const headingClass =
    "font-bold text-white pb-1 border-b-2 border-white/30 inline-block text-[0.9rem] sm:text-[1rem] md:text-[1.2rem]";

  return (
    <footer
      className={`relative overflow-hidden pb-[var(--layout-nav-mobile-bottom-height,0px)] md:pb-0 ${className} py-10`}
      style={{ background: footerBg, color: "white" }}
      {...other}
    >
      {/* ::before overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)",
        }}
      />
      {/* ::after overlay */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-[40%]"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Container */}
      <div className="mx-auto container md:px-5 px-3 py-6 relative z-10 flex flex-col gap-5 text-center md:text-left">

        {/* ── Row 1: Logo col + Links col ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 justify-items-center md:justify-items-start">

          {/* Logo + description + socials — col span 4 */}
          <div className="md:col-span-4 flex flex-col gap-3 items-center md:items-start">
            {/* Logo box */}
            <div
              className="inline-block p-2.5 rounded-2xl border border-white/20"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Logo />
            </div>

            {/* Description */}
            <p
              className="mx-auto md:mx-0 max-w-[320px] text-sm leading-[1.8] text-justify"
              style={{ color: "rgba(255, 255, 255, 0.95)" }}
            >
              We're dedicated to providing a smooth and reliable shopping
              experience with a wide selection of quality products, fast
              delivery, and customer service you can count on. Shop with
              confidence and convenience.
            </p>

            {/* Social icons */}
            <div className="flex flex-row gap-1">
              {socialMediaData?.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  title={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full text-white border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")
                  }
                >
                  {social.platform === "Facebook" && <FacebookIcon />}
                  {social.platform === "Instagram" && <InstagramIcon />}
                  {social.platform === "Linkedin" && <LinkedinIcon />}
                  {social.platform === "TikTok" && <TikTokIcon />}
                  {social.platform === "WhatsApp" && <WhatsAppIcon />}
                  {social.platform === "YouTube" && <YouTubeIcon />}
                  {social.platform === "Threads" && <ThreadsIcon />}
                </a>
              ))}
            </div>
          </div>

          {/* Links — col span 8 */}
          <div className="md:col-span-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* Brands */}
            <div className="flex flex-col gap-5">
              <h2 className={headingClass}>Top Brands</h2>
              <div className="flex flex-col gap-3">
                {brands?.slice(0, 5)?.map((brand) => (
                  <RouterLink
                    key={brand.brand_id}
                    href={paths.product.root}
                    title={brand.brand_name}
                    onClick={() => handleClickBrand(brand.brand_id)}
                    className={footerLinkClass}
                  >
                    {footerLinkArrow}
                    {brand.brand_name}
                  </RouterLink>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-5">
              <h2 className={headingClass}>Company</h2>
              <div className="flex flex-col gap-3">
                <RouterLink
                  href={paths.blog.root}
                  title="Blogs"
                  className={footerLinkClass}
                >
                  {footerLinkArrow}
                  Blogs
                </RouterLink>

                {pages?.map((link) => {
                  if (link.show_in_footer === "0" || !link.path) return null;
                  return (
                    <RouterLink
                      key={link.title}
                      href={link.path}
                      className={footerLinkClass}
                    >
                      {footerLinkArrow}
                      {link.title}
                    </RouterLink>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-5">
              <h2 className={headingClass}>Categories</h2>
              <div className="flex flex-col gap-2">
                {categories
                  ?.filter((category) => category.show_in_home)
                  ?.slice(0, 5)
                  ?.map((category) => (
                    <RouterLink
                      key={category.category_id}
                      href={paths.product.root}
                      onClick={() => handleClickCategory(category.category_id)}
                      className={footerLinkClass}
                    >
                      {footerLinkArrow}
                      {category.name}
                    </RouterLink>
                  ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-5">
              <h2 className={headingClass}>Contact Us</h2>
              <div className="flex flex-col gap-3">
                <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  {vendor?.contact_info} | 9851212477
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Row 2: Latest Products ── */}
        {recentProducts && recentProducts.length > 0 && (
          <div
            className="rounded-3xl p-3.5 border border-white/15"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 className="font-bold text-white mb-3 text-[0.9rem] sm:text-[1rem] md:text-[1.2rem]">
              Latest Products
            </h2>

            <div className="flex flex-wrap gap-2">
              {recentProducts?.slice(0, 8)?.map((product) => (
                <RouterLink
                  key={product.product_id}
                  href={paths.product.details(product.slug)}
                  className="px-3 py-2 rounded-2xl text-white no-underline text-sm font-medium border border-white/20 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")
                  }
                >
                  {product.name}
                </RouterLink>
              ))}
            </div>
          </div>
        )}

        {/* ── Row 3: Bottom bar ── */}
        <div>
          <hr className="border-white/20 mb-4" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              © {new Date().getFullYear()} {vendor?.vendor_name}. All rights reserved.
            </p>

            {/* <div className="flex flex-row items-center gap-4">
              {LEGAL_SECTIONS.map((link, index) => (
                <React.Fragment key={link.name}>
                  <RouterLink
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  >
                    {link.name}
                  </RouterLink>

                  {index < LEGAL_SECTIONS.length - 1 && (
                    <span
                      className="inline-block w-px border-l border-white/30"
                      style={{ height: "16px" }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div> */}
          </div>
        </div>

      </div>
    </footer>
  );
}