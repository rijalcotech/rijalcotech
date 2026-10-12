import { CONFIG } from "@/global-config";

import { getAppName } from "@/api";
import { getServiceDetails } from "@/api/service.server";
import { ServiceDetailView } from "@/sections/service/view/service-detail-view";

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [service, { appName }] = await Promise.all([
    getServiceDetails(slug),
    getAppName(),
  ]);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const serviceTitle = service.title || "Service";
  const serviceDescription =
    service.short_description ||
    service.description ||
    "Explore our premium services.";

  return {
    metadataBase: new URL("https://rijalcotech.com"),
    title: `${serviceTitle} | ${appName}`,
    description: serviceDescription.replace(/<[^>]*>/g, "").substring(0, 155),
    keywords: [serviceTitle.toLowerCase(), "ecommerce services", appName],
    authors: [{ name: appName }],
    creator: appName,
    publisher: appName,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // icons: {
    //   icon: "/api/favicon.ico",
    // },
    alternates: {
      canonical: `/service/${slug}`,
      languages: {
        "en-US": `/service/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://rijalcotech.com/service/${slug}`,
      title: `${serviceTitle} | ${appName}`,
      description: serviceDescription.replace(/<[^>]*>/g, "").substring(0, 155),
      siteName: appName,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;

  return <ServiceDetailView slug={slug} />;
}
