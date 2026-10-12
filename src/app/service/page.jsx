import { CONFIG } from "@/global-config";

import { getAppName } from "@/api";
import { ServiceView } from "@/sections/service";

// ----------------------------------------------------------------------

export async function generateMetadata() {
  const { appName } = await getAppName();

  return {
    metadataBase: new URL("https://rijalcotech.com"),
    title: `Our Services | ${appName}`,
    description:
      "Discover our comprehensive ecommerce services including fast delivery, secure payments, 24/7 support, and hassle-free returns.",
    keywords: [
      "ecommerce services",
      "online shopping",
      "delivery",
      "customer support",
      "secure payments",
      appName,
    ],
    authors: [{ name: appName }],
    creator: appName,
    publisher: appName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
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
      canonical: "/service",
      languages: {
        "en-US": "/service",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://rijalcotech.com/service",
      title: `Our Services | ${appName}`,
      description:
        "Discover our comprehensive ecommerce services including fast delivery, secure payments, 24/7 support, and hassle-free returns.",
      siteName: appName,
    },
  };
}

export default function ServicePage() {
  return <ServiceView />;
}
