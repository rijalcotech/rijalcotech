"use client";

import { useAppSelector } from "@/redux/hooks";
import { fDate } from "@/utils/format-time";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function BlogDetailsHero({
  className = "",
  title,
  category,
  createdBy,
  coverUrl,
  createdAt,
  readingTime = 3,
  ...other
}) {
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color || "#1976d2";
  const categoryLabel = category?.name || category;
  const authorInitial = createdBy?.charAt(0)?.toUpperCase() || "A";

  return (
    <div
      className={`group relative h-[420px] md:h-[520px] w-full overflow-hidden bg-gray-900 ${className}`}
      {...other}
    >
      {/* ── Background Image with Smooth Hover Zoom ── */}
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title || "Blog cover"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      )}

      {/* ── Multi-layer Gradient Overlays for High-Contrast Text ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* ── Hero Content Container ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8 md:pb-14 z-20">
        <div className="flex flex-col gap-4 md:gap-5 max-w-[850px]">
          
          {/* Category Badge */}
          {categoryLabel && (
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-md"
                style={{
                  backgroundColor: `${primaryColor}`,
                  boxShadow: `0 4px 20px ${primaryColor}60`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {categoryLabel}
              </span>
            </div>
          )}

          {/* Headline Title */}
          <h1 className="text-white font-black text-2xl sm:text-4xl md:text-5xl leading-[1.25] tracking-tight drop-shadow-md">
            {title}
          </h1>

          {/* Author & Meta Information Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white/30"
                style={{ backgroundColor: primaryColor }}
              >
                {authorInitial}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm leading-snug flex items-center gap-1">
                  {createdBy || "Admin"}
                  <Iconify
                    icon="solar:verified-check-bold"
                    width={14}
                    className="text-blue-400 inline-block"
                  />
                </span>
                <span className="text-gray-300 text-xs opacity-80">
                  Verified Contributor
                </span>
              </div>
            </div>

            {/* Separator */}
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/40" />

            {/* Date Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium">
              <Iconify icon="solar:calendar-bold" width={15} className="text-white/80" />
              <span>{fDate(createdAt)}</span>
            </div>

            {/* Reading Time Pill */}
            {readingTime && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium">
                <Iconify icon="solar:clock-circle-bold" width={15} className="text-white/80" />
                <span>{readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}