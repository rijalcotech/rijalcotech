import "@/global.css";
import Script from "next/script";


import { CONFIG } from "@/global-config";

import { Snackbar } from "@/components/snackbar";
import { ProgressBar } from "@/components/progress-bar";
import { MotionLazy } from "@/components/animate/motion-lazy";

import { themeConfig, ThemeProvider } from "@/theme";

import { LocalizationProvider } from "@/locales";

import { StoreProvider } from "@/redux";

import { AuthLayout } from "@/auth/layouts";
import { MainLayout } from "@/layouts/main";

import { getVendorDetails } from "@/api";



export async function generateMetadata() {
  const defaultMetadata = {
    title: { template: "%s | ", default: "" },
    description: "",
    icons: { icon: "" },
  };

  try {
    const vendorDetails = await getVendorDetails();
    const vendorName = vendorDetails?.vendor_name || CONFIG.appName;
    defaultMetadata.title.default = vendorName;
    defaultMetadata.title.template = `%s | ${vendorName}`;
    defaultMetadata.icons.icon = vendorDetails?.logo ? `${vendorDetails.logo}` : "";
  } catch (error) {
    console.error(error);
  }

  return defaultMetadata;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnects — only for above-the-fold critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://venturekartapi.walkershive.com.np" crossOrigin="anonymous" />

      </head>
      <body>
        <LocalizationProvider>
          <ThemeProvider
            defaultMode={themeConfig.defaultMode}
            modeStorageKey={themeConfig.modeStorageKey}
          >
            <MotionLazy>
              <StoreProvider>
                <Snackbar />
                <ProgressBar />
                <AuthLayout>
                  <MainLayout>{children}</MainLayout>
                </AuthLayout>
              </StoreProvider>
            </MotionLazy>
          </ThemeProvider>
        </LocalizationProvider>
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-TFLWZ2HSN5" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TFLWZ2HSN5');
        `}
      </Script>
    </html>
  );
}