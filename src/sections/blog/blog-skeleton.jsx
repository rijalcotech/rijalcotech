"use client";

// ----------------------------------------------------------------------

export function BlogItemSkeleton({ itemCount = 16, className = "", ...other }) {
  return Array.from({ length: itemCount }).map((_, index) => (
    <div
      key={index}
      className={`flex container mx-auto rounded-lg bg-white border border-gray-200 ${className}`}
      {...other}
    >
      <div className="p-4 flex flex-col gap-3 flex-1 animate-pulse">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="w-6 h-3 bg-gray-200 rounded" />
        </div>

        {/* Text lines */}
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-5/6" />
        <div className="h-2 bg-gray-200 rounded w-4/6" />
      </div>

      {/* Image skeleton */}
      <div className="p-1 hidden sm:block">
        <div className="w-[170px] h-[240px] bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ));
}

// ----------------------------------------------------------------------

export function BlogDetailsSkeleton({ className = "", ...other }) {
  return (
    <div className={className} {...other}>
      {/* Hero image */}
      <div className="w-full  h-[480px] bg-gray-200 animate-pulse" />

      <div className="container mx-auto max-w-[720px] mx-auto">
        <div className="my-8 flex flex-col gap-3 animate-pulse">
          <div className="h-2 bg-gray-200 rounded w-full" />
          <div className="h-2 bg-gray-200 rounded w-[90%]" />
          <div className="h-2 bg-gray-200 rounded w-[80%]" />
        </div>
      </div>
    </div>
  );
}