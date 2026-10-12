import Autoplay from "embla-carousel-autoplay";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { useRouter } from "@/routes/hooks";

import { Carousel, useCarousel } from "@/components/carousel";
import { Iconify } from "@/components/iconify";
import Image from "next/image";

// Decorative blob + avatar ring colors per card index
const ACCENT_COLORS = [
  { blob: "#d1fae5", ring: "from-green-300 to-teal-200" },
  { blob: "#ede9fe", ring: "from-purple-400 to-violet-300" },
  { blob: "#e0f2fe", ring: "from-cyan-300 to-blue-200" },
  { blob: "#fef9c3", ring: "from-yellow-300 to-amber-200" },
  { blob: "#fee2e2", ring: "from-red-300 to-pink-200" },
  { blob: "#dbeafe", ring: "from-blue-300 to-indigo-200" },
];

export function HomeFeaturedCategories({ categories }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const carousel = useCarousel(
    {
      loop: true,
      align: "start",
      justifyContent: "flex-start",
      slideSpacing: "20px",
      slidesToShow: { xs: 2, sm: 3, md: 4, lg: 5 },
      duration: 18000,
    },
    [Autoplay({ playOnInit: true, delay: 0, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const handleClick = (id) => {
    dispatch(setCategory(id));
    router.push(paths.product.root);
  };

  const visibleCategories = categories?.filter((c) => c.show_in_home === true) ?? [];

  if (!visibleCategories.length) return null;

  return (
    <section className="container-fluid lg:my-8 my-4 lg:px-0">
      {/* Header */}
      <div className="flex justify-between items-end mb-8 md:mb-10">
        <div className="flex flex-col gap-1">
          <div className="relative inline-flex items-center px-2 py-1 w-max group cursor-default">
            {/* Glowing aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 blur-md rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            {/* Frosted Glass body */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full shadow-sm" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-1">
              {/* <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-500 text-white shadow-inner"> */}
              <Iconify icon="solar:magic-stick-3-bold" width={12} className="text-orange-500" />
              {/* </span> */}
              <span className="pr-2 text-[11px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                Collections
              </span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
        </div>

        <RouterLink
          href={paths.category}
          className="group text-gray-900 font-bold text-sm flex items-center gap-1.5 hover:text-gray-600 transition-colors uppercase tracking-widest pb-1 border-b-2 border-transparent hover:border-gray-600"
        >
          View All <span className="text-lg leading-none transform transition-transform group-hover:translate-x-1">→</span>
        </RouterLink>
      </div>

      {/* Carousel */}
      <Carousel carousel={carousel} className="p-4 -m-4">
        {visibleCategories.map((category) => (
          <FeaturedCategoriesItem
            key={category.category_id}
            category={category}
            onClick={() => handleClick(category.category_id)}
          />
        ))}
      </Carousel>
    </section>
  );
}

function FeaturedCategoriesItem({ category, onClick }) {
  const { name, web_image } = category;

  return (
    <div
      onClick={onClick}
      className="group relative w-full aspect-square rounded-3xl overflow-hidden cursor-pointer bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
    >
      {/* Background Image */}
      <Image
        alt={name}
        src={web_image || "/assets/placeholder.png"}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Subtle inner ring for depth (glassmorphism touch) */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

      {/* Content (Bottom Left aligned) */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end items-start">
        <div className="flex items-center gap-2.5">
          <h3 className="text-white text-base md:text-xl font-bold leading-tight tracking-wide drop-shadow-md">
            {name}
          </h3>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transform transition-all duration-300 group-hover:translate-x-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}