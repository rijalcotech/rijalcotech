"use client";

import { useBoolean } from "minimal-shared/hooks";
import { useAppSelector } from "@/redux/hooks";

import { Logo } from "@/components/logo";

import { NavMobile, NavMobileBottom } from "./nav/mobile";
import { NavDesktop } from "./nav/desktop";
import { Footer } from "./footer";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";

import { mainNavData } from "../nav-config-main";
import { mobileNavData } from "../nav-config-mobile";
import { accountNavData } from "../nav-config-account";

import { MenuButton } from "../components/menu-button";
import { SignInButton } from "../components/sign-in-button";
import { CartButton } from "../components/cart-button";
import { WishlistButton } from "../components/wishlist-button";
import { ProductSearchbar } from "../components/product-searchbar";
import { OrderButton } from "../components/order-button";
import { AccountPopover } from "../components/account-popover";
import { ProductSearchButton } from "../components/product-search-button";

import { useGetPages, useGetCategories } from "@/api";

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = "md",
}) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const { isLogin } = useAppSelector((state) => state.auth);
  const { vendor } = useAppSelector((state) => state.vendor);

  const { pages } = useGetPages();
  const { categories } = useGetCategories();

  const mobileNavigationData = [...mobileNavData, ...pages];

  const vendorCssVars = {
    ...cssVars,
    "--vendor-primary-color": vendor?.primary_color || "",
    "--vendor-secondary-color": vendor?.secondary_color || "",
    "--palette-primary-main": vendor?.primary_color || "",
    "--palette-secondary-main": vendor?.secondary_color || "",
  };

  const renderHeader = () => {
    const headerSlots = {
      leftArea: (
        <div className="flex h-full items-center">
          {/* Mobile menu button */}
          <MenuButton
            onClick={onOpen}
            className="mr-2 -ml-1 md:hidden"
          />

          {/* Mobile nav drawer */}
          <NavMobile
            data={mobileNavigationData}
            open={open}
            onClose={onClose}
            categories={categories}
          />

          {/* Logo */}
          <Logo className="h-[60px] w-[60px]" />
        </div>
      ),

      centerArea: (
        <div className="hidden sm:block w-full max-w-xl">
          <ProductSearchbar />
        </div>
      ),

      rightArea: (
        <div className="flex h-full items-center gap-2">
          {/* Mobile search */}
          <div className="sm:hidden">
            <ProductSearchButton />
          </div>

          {isLogin && <WishlistButton />}

          <CartButton />
          <OrderButton />

          {isLogin ? (
            <AccountPopover data={accountNavData} />
          ) : (
            <SignInButton />
          )}
        </div>
      ),

      bottomArea: (
        <div className="hidden md:flex">
          <NavDesktop
            categories={categories}
            mainNavData={mainNavData}
            secondaryNavData={pages}
          />
        </div>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => (
    <Footer
      layoutQuery={layoutQuery}
      pages={pages}
      categories={categories}
      sx={slotProps?.footer?.sx}
    />
  );

  const renderMain = () => (
    <main className="flex flex-col">
      {children}
    </main>
  );

  const renderNavMobile = () => (
    <div className={`md:hidden`}>
      <NavMobileBottom />
    </div>
  );

  return (
    <LayoutSection
      headerSection={renderHeader()}
      footerSection={renderFooter()}
      navMobileSection={renderNavMobile()}
      cssVars={vendorCssVars}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}