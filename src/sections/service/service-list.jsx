
"use client";

import { useAppSelector } from "@/redux/hooks";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";

import { useGetServiceData } from "@/api/service";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

// Map FontAwesome icons to Solar icons
const FA_TO_SOLAR_ICON_MAP = {
  "fa-star": "solar:star-bold-duotone",
  "fa-lightbulb": "solar:lightbulb-bolt-bold-duotone",
  "fa-headset": "solar:headphones-round-sound-bold-duotone",
  "fa-users-cog": "solar:users-group-rounded-bold-duotone",
  "fa-shield": "solar:shield-check-bold-duotone",
  "fa-rocket": "solar:rocket-bold-duotone",
  "fa-cog": "solar:settings-bold-duotone",
  "fa-check": "solar:verified-check-bold-duotone",
  "fa-heart": "solar:heart-bold-duotone",
  "fa-clock": "solar:clock-circle-bold-duotone",
  "fa-truck": "solar:delivery-bold-duotone",
  "fa-dollar-sign": "solar:tag-price-bold-duotone",
  "fa-box": "solar:box-bold-duotone",
  "fa-shopping-cart": "solar:cart-bold-duotone",
  "fa-credit-card": "solar:card-bold-duotone",
  "fa-globe": "solar:global-bold-duotone",
  "fa-phone": "solar:phone-bold-duotone",
  "fa-envelope": "solar:letter-bold-duotone",
  "fa-code": "solar:code-bold-duotone",
  "fa-paint-brush": "solar:pallete-2-bold-duotone",
  "fa-chart-line": "solar:chart-bold-duotone",
  "fa-search": "solar:magnifer-bold-duotone",
};

const getSolarIcon = (faIcon) =>
  FA_TO_SOLAR_ICON_MAP[faIcon] || faIcon || "solar:star-bold-duotone";

const SERVICE_COLORS = [
  {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hoverBg: "group-hover:bg-blue-600",
    shadow: "hover:shadow-blue-200",
  },
  {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    hoverBg: "group-hover:bg-cyan-600",
    shadow: "hover:shadow-cyan-200",
  },
  {
    bg: "bg-green-50",
    text: "text-green-600",
    hoverBg: "group-hover:bg-green-600",
    shadow: "hover:shadow-green-200",
  },
  {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hoverBg: "group-hover:bg-amber-600",
    shadow: "hover:shadow-amber-200",
  },
  {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hoverBg: "group-hover:bg-purple-600",
    shadow: "hover:shadow-purple-200",
  },
  {
    bg: "bg-red-50",
    text: "text-red-600",
    hoverBg: "group-hover:bg-red-600",
    shadow: "hover:shadow-red-200",
  },
];

export function ServiceList() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { serviceData } = useGetServiceData();

  const primaryColor = vendor?.primary_color || "#2563eb";

  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <span
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: primaryColor }}
            >
              Core Services
            </span>

            <h2 className="mt-3 max-w-xl text-3xl font-extrabold md:text-5xl">
              Everything You Need,
              <span
                className="ml-2 inline-block"
                style={{ color: primaryColor }}
              >
                All in One Place
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-gray-600 leading-7">
              From browsing to delivery, we've got every aspect of your shopping
              journey covered with premium services.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceData?.map(
              ({ id, icon, title, short_description, slug }, index) => {
                const color =
                  SERVICE_COLORS[index % SERVICE_COLORS.length];

                return (
                  <div
                    key={id}
                    className={`group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${color.shadow}`}
                  >
                    <div className="flex flex-1 flex-col gap-5">
                      {/* Icon */}
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${color.bg} ${color.text} ${color.hoverBg} group-hover:text-white`}
                      >
                        <Iconify
                          icon={getSolarIcon(icon)}
                          width={32}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold sm:text-lg md:text-xl">
                        {title}
                      </h3>

                      {/* Description */}
                      <Markdown className="flex-1 text-sm leading-7 text-gray-600" children=
                        {short_description}
                      />

                      {/* Button */}
                      <RouterLink
                        href={paths.service.details(slug)}
                        className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 ${color.text}`}
                      >
                        Learn More

                        <Iconify
                          icon="solar:arrow-right-bold"
                          width={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </RouterLink>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}