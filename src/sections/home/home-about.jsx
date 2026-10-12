"use client";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";
import { Markdown } from "@/components/markdown";
import { Iconify } from "@/components/iconify";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

const getIcon = (type, index) => {
  const typeMap = {
    mission: "solar:target-bold-duotone",
    vision: "solar:eye-bold-duotone",
    values: "solar:heart-pulse-bold-duotone",
    goal: "solar:flag-bold-duotone",
  };

  const fallbackIcons = [
    "solar:target-bold-duotone",
    "solar:eye-bold-duotone",
    "solar:heart-pulse-bold-duotone",
    "solar:flag-bold-duotone",
  ];

  return typeMap[type?.toLowerCase()] || fallbackIcons[index % fallbackIcons.length];
};

export function HomeAbout({ aboutData }) {
  const router = useRouter();
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color
  const secondaryColor = vendor?.secondary_color

  const title = aboutData?.title || "About Us";
  const subtitle = aboutData?.subtitle || "";
  const featured_image = aboutData?.featured_image;
  const description = aboutData?.description || "";

  const estd_date = vendor?.estd_date || "";
  const estd_year = estd_date ? new Date(estd_date).getFullYear() : "";

  const missionVisions = aboutData?.mission_visions || [];
  const displayItems = missionVisions.slice(0, 2);

  return (
    <section className="container-fluid lg:my-6 my-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-6 items-center">
        <div className="relative">
          {featured_image ? (
            <Image
              alt={title}
              title={title}
              src={featured_image}
              width={800}
              height={500}
              className="rounded-3xl w-full object-cover shadow-xl"
              sizes="(max-width: 768px) 100vw, 380px"
            />
          ) : null}

          <div className="absolute bottom-3 left-3 bg-white py-2 px-4 rounded-full shadow-lg flex items-center text-xs font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Since {estd_year}
          </div>
        </div>

        <div>
          <span
            className="uppercase tracking-widest text-xs font-bold mb-1 block"
            style={{ color: secondaryColor }}
          >
            — {subtitle}
          </span>

          <h2
            className="text-4xl font-extrabold mb-2"
            style={{ color: primaryColor }}
          >
            {title}
          </h2>

          <div className="text-gray-600 mb-4 leading-relaxed">
            <Markdown children={description} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {displayItems.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white border border-purple-50 p-3 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <div
                  className="w-8 h-8 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${secondaryColor}20`,
                    color: secondaryColor,
                  }}
                >
                  <Iconify
                    icon={getIcon(item.type, index)}
                    width={28}
                  />
                </div>

                <h3 className="font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <div className="text-md text-gray-500">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => router.push(paths.about)}
              className="text-white px-4 py-3 rounded-xl font-bold flex items-center transition hover:opacity-90"
              style={{
                backgroundColor: secondaryColor,
              }}
            >
              Learn More About Us
              <span className="ml-1"><Iconify icon="solar:arrow-right-bold-duotone" /></span>
            </button>

            <button
              onClick={() => router.push(paths.contact)}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold flex items-center hover:bg-gray-50 transition"
            >
              <Iconify
                icon="solar:phone-bold-duotone"
                className="mr-2"
              />
              Contact Us
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}