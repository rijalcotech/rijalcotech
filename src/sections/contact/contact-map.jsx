"use client";

import { Iconify } from "@/components/iconify";
import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

export function ContactMap() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const map_link = vendor?.map_link;

  const primaryColor = vendor?.primary_color || "#4f46e5";

  return (
    <div className="relative h-full min-h-[400px] md:min-h-full rounded-3xl p-3 shadow-[0_20px_40px_rgb(0,0,0,0.08)] bg-white border border-gray-100 group overflow-hidden">
      {/* Decorative Gradient Ring */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-20 blur group-hover:opacity-40 transition duration-500"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, #06b6d4)` }}
      />

      <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gray-100 z-10">
        {map_link ? (
          <iframe
            src={map_link}
            width="100%"
            height="100%"
            className="border-0 block w-full h-full  transition-all duration-700 ease-in-out filter"
            loading="lazy"
            title="Location Map"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center space-y-2">
              <Iconify icon="lucide:map" width={30} />
              <p className="text-sm font-medium">Map not available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}