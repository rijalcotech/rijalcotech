"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";
import { useGetHomeClients } from "@/api";

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#1976d2";

// Inline SVG — replaces <Iconify icon="solar:users-group-rounded-bold-duotone" />
function UsersGroupIcon({ size = 28, className = "" }) {
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
        d="M13 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      />
      <path d="M13 13c-3.866 0-7 2.239-7 5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1c0-2.761-3.134-5-7-5zM5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-3 7a1 1 0 0 1-1-1c0-2.209 1.78-4 4-4 .374 0 .734.05 1.076.144C5.4 14.78 5 15.85 5 17c0 .693.134 1.355.376 1.963L2 20h-.001z" />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function HomeCustomerLogos() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const { clients, clientsLoading } = useGetHomeClients();

  const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;

  const autoScroll =
    clients?.length > 6
      ? [
        AutoScroll({
          playOnInit: true,
          speed: 0.8,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
      : [];

  const [emblaRef] = useEmblaCarousel(
    {
      watchResize: false, // disable auto resize watching

      loop: clients?.length > 6,
      align: "center",
      dragFree: true,
    },
    autoScroll
  );

  const isCentered = clients?.length <= 6;

  if (clientsLoading || !clients?.length) return null;

  return (
    <section className="container-fluid lg:my-8 my-4 lg:px-0">
      {/* ── Header ── */}
      <div className="flex flex-col items-start justify-center gap-1 text-center mb-5">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-2xl p-3"
            style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
          >
            <UsersGroupIcon size={28} className="text-yellow-500" />
          </div>

          {/* Text */}
          <div className="text-left">
            <h2 className="text-[1.25rem] font-bold text-gray-900 md:text-[1.5rem]">
              Our valued partners and customers
            </h2>
            <p className="text-sm text-gray-500">
              Trusted by our customers and partners, we’re committed to delivering quality products and a seamless shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        className="rounded-3xl border px-2 py-4"
        style={{
          backgroundColor: "rgba(145,158,171,0.04)",
          borderColor: "rgba(145,158,171,0.08)",
        }}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className={`flex gap-[15px] ${isCentered ? "justify-center" : ""}`}
          >
            {clients.map((client, index) => (
              <CustomerLogoItem
                key={client.id || index}
                client={client}
                primaryColor={primaryColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function CustomerLogoItem({ client, primaryColor }) {
  const { name, featured_image } = client;

  return (
    <div
      className="
        group flex min-h-[120px] min-w-[48%] items-center justify-center
        overflow-visible rounded-2xl border bg-white p-2
        transition-all duration-300 ease-in-out
        hover:-translate-y-[2px] hover:shadow-md
        sm:min-w-[30%] md:min-w-[22%] lg:min-w-[15%]
      "
      style={{ borderColor: "rgba(145,158,171,0.08)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = primaryColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(145,158,171,0.08)";
      }}
    >
      <img
        alt={name || "Customer Logo"}
        title={name || "Customer Logo"}
        src={featured_image}
        className="max-h-[120px] w-auto object-contain opacity-100 transition-all duration-300 ease-in-out"
      />
    </div>
  );
}