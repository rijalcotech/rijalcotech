"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

import { paths } from "@/routes/paths";

import { BlogItem } from "@/sections/blog/blog-item";
import { BlogItemSkeleton } from "@/sections/blog/blog-skeleton";

// ----------------------------------------------------------------------

// Inline SVG replacements for Iconify icons used in this component
function DocumentTextIcon({ className = "", size = 32 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        opacity={0.5}
        d="M4 6.012C4 4.343 5.343 3 7.012 3h10.976C19.657 3 21 4.343 21 6.012v11.976C21 19.657 19.657 21 17.988 21H7.012C5.343 21 4 19.657 4 17.988V6.012z"
      />
      <path d="M8 8.75A.75.75 0 0 1 8.75 8h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 8.75zM8 12.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75zM8.75 16a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-4z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "", size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H4a.75.75 0 0 1 0-1.5h14.69l-5.72-5.72a.75.75 0 0 1 0-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#1976d2";
const DEFAULT_SECONDARY = "#9c27b0";

// ----------------------------------------------------------------------

export function HomeBlog({ blogs, isLoading }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;
  const secondaryColor = vendor?.secondary_color || DEFAULT_SECONDARY;

  // ----------------------------------------------------------------------

  const renderLoading = () => (
    <>
      <BlogItemSkeleton />
      <BlogItemSkeleton />
      <BlogItemSkeleton />
    </>
  );

  const renderList = () =>
    blogs?.slice(0, 3)?.map((blog, index) => (
      <article
        key={blog.id}
        className="animate-fadeInUp"
        style={{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: "both",
        }}
      >
        <BlogItem blog={blog} detailsHref={paths.blog.details(blog.slug)} />
      </article>
    ));

  // ----------------------------------------------------------------------

  if (!isLoading && (!blogs || blogs.length === 0)) return null;

  return (
    <section className="relative overflow-hidden py-2 lg:my-6 my-2">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute right-[5%] top-[10%] h-[300px] w-[300px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${primaryColor}10 0%, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -left-[5%] bottom-[20%] h-[200px] w-[200px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left */}
          <div className="flex items-center gap-2">
            {/* Icon box */}
            <div
              className="flex items-center justify-center rounded-2xl p-3"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                boxShadow: `0 8px 24px ${primaryColor}40`,
              }}
            >
              <DocumentTextIcon className="text-white" size={28} />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-[1.5rem] font-extrabold text-gray-900 md:text-[2rem] mb-0 pb-0">
                Reviews & Insights
              </h2>
              <p className="text-sm text-gray-500 md:text-base mt-0 pt-0">
                Latest news and reviews from the optic world
              </p>
            </div>
          </div>

          {/* Right — View All button */}
          <Link
            href={paths.blog.root}
            className="group inline-flex items-center gap-2 rounded-2xl border-2 px-5 py-3 font-bold transition-all duration-300 ease-in-out hover:translate-x-1"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = primaryColor;
            }}
          >
            <span>View All Articles</span>
            <ArrowRightIcon size={20} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {isLoading ? renderLoading() : renderList()}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}