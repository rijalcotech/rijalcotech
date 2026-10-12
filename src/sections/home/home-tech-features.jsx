"use client";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: "solar:delivery-bold-duotone",
    title: "Free Shipping",
    description: "Free shipping on orders over Rs. 2500",
    color: "primary",
  },
  {
    icon: "solar:shield-check-bold-duotone",
    title: "Secure Payment",
    description: "100% secure payment methods",
    color: "success",
  },
  {
    icon: "solar:refresh-bold-duotone",
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    color: "warning",
  },
  {
    icon: "solar:headphones-round-sound-bold-duotone",
    title: "24/7 Support",
    description: "Round the clock assistance",
    color: "info",
  },
];

// ----------------------------------------------------------------------

export function HomeTechFeatures() {
  const colorMap = {
    primary: {
      bg: "rgba(99,102,241,0.12)",
      text: "#6366f1",
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#22c55e",
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#f59e0b",
    },
    info: {
      bg: "rgba(6,182,212,0.12)",
      text: "#06b6d4",
    },
  };

  return (
    <section
      className="
                rounded-3xl
                border
                px-3
                py-4
lg:my-6 my-2 mb-10 lg:mb-16
            "
      style={{
        backgroundColor: "rgba(145,158,171,0.04)",
        borderColor: "rgba(145,158,171,0.08)",
      }}
    >
      <div
        className="
                    grid
                    grid-cols-2
                    gap-3
                    md:grid-cols-4
                    items-center
                "
      >
        {FEATURES.map((feature, index) => (
          <div key={index}>
            <div
              className="
                                group
                                flex
                                cursor-default
                                flex-col
                                items-center
                                gap-2
                                rounded-2xl
                                p-2
                                text-center
                                transition-all
                                duration-300
                                ease-in-out

                                hover:-translate-y-1
                                hover:bg-white
                                hover:shadow-md

                                sm:flex-row
                                sm:items-start
                                sm:text-left
                            "
            >
              {/* Icon */}
              <div
                className="
                                    feature-icon
                                    flex
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    p-2
                                    transition-transform
                                    duration-300
                                    ease-in-out
                                    group-hover:rotate-6
                                    group-hover:scale-110
                                "
                style={{
                  backgroundColor: colorMap[feature.color].bg,
                  color: colorMap[feature.color].text,
                }}
              >
                <Iconify icon={feature.icon} width={20} />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h3
                  className="
                                        text-[0.8rem]
                                        font-bold
                                        text-gray-900
                                        sm:text-[0.9rem]
                                    "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                                        hidden
                                        mb-0 pb-0
                                        text-xs
                                        text-gray-500
                                        sm:block
                                    "
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
