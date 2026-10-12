"use client";

import React from "react";

// ----------------------------------------------------------------------

export function ProductItemSkeleton({
  className = "",
  itemCount = 16,
  ...other
}) {
  return (
    <>
      {Array.from({ length: itemCount }, (_, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}
          {...other}
        >
          {/* Image Skeleton */}
          <div className="p-2">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
          </div>

          {/* Content */}
          <div className="space-y-4 p-4">
            {/* Title */}
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              {/* Rating Circles */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
              </div>

              {/* Price */}
              <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

export function ProductDetailsSkeleton({ className = "", ...other }) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 lg:grid-cols-12 ${className}`}
      {...other}
    >
      {/* Left Image Section */}
      <div className="lg:col-span-7">
        <div className="aspect-square w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>

      {/* Right Content Section */}
      <div className="space-y-5 lg:col-span-5">
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>

      {/* Bottom Features / Reviews Section */}
      <div className="col-span-1 lg:col-span-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-3"
            >
              {/* Circle */}
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200" />

              {/* Title */}
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

              {/* Subtitle */}
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}