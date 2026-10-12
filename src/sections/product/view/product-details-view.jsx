
"use client";

import { useTabs, usePopover } from "minimal-shared/hooks";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProductReviewsRequest, setActiveChatData } from "@/redux/actions";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";
import { Iconify } from "@/components/iconify";
import { useCarousel } from "@/components/carousel";
import { CustomPopover } from "@/components/custom-popover";
import { toast } from "@/components/snackbar";

import { ProductDetailsReview } from "../product-details-review";
import { ProductDetailsSummary } from "../product-details-summary";
import { ProductDetailsCarousel } from "../product-details-carousel";
import { ProductDetailsDescription } from "../product-details-description";
import { ProductDetailsRelatedProducts } from "../product-details-related-products";

import { ChatView } from "@/sections/chat/view";

import { createChat } from "@/api";

// ----------------------------------------------------------------------

export function ProductDetailsView({ product, relatedProducts }) {
  const chatPopover = usePopover();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);

  const carousel = useCarousel({ thumbs: { slidesToShow: "auto" } });

  const {
    product_id,
    name,
    featured_image,
    description,
    descriptions,
    product_galleries,
    variants,
  } = product || {};

  // Filter active descriptions and set default tab
  const activeDescriptions =
    descriptions?.filter((desc) => desc.is_active == 1) || [];
  const defaultTab = "description";

  const tabs = useTabs(defaultTab);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductReviewsRequest(product_id));
  }, [product_id]);

  const variantImages =
    variants
      ?.map((variant) => ({
        id: variant.variant_id,
        image: variant.image,
      }))
      .filter((v) => v.image) || [];

  const featuredImage = featured_image
    ? { id: "featured_image", image: featured_image }
    : null;

  const imageCarousel = [
    ...(featuredImage ? [featuredImage] : []),
    ...(product_galleries || []),
    ...variantImages,
  ].filter((img) => img && img.image);

  // Use placeholder if no images available
  const displayImages =
    imageCarousel.length > 0
      ? imageCarousel
      : [{ id: "placeholder", image: "/assets/placeholder.png" }];

  const handleOpenChat = async (event) => {
    if (!isLogin) {
      toast.error("Please login to start a chat!");
      router.push(paths.auth.signIn);
      return;
    }

    chatPopover.onOpen(event);

    try {
      const response = await createChat(product_id);

      const activeChatData = {
        ...response,
        product: {
          product_id,
          name,
          featured_image,
        },
      };

      dispatch(setActiveChatData(activeChatData));
    } catch (error) {
      console.error(error);
    }
  };

  const renderError = () => (
    <EmptyContent
      title="Product Not Found"
      description="Oops! The product you're looking for isn't available. Check out our other amazing products!"
      action={
        <RouterLink href={paths.product.root}>
          <button className="mt-3 inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            <Iconify icon="eva:arrow-ios-back-fill" width={16} />
            Back to List
          </button>
        </RouterLink>
      }
      className="py-10"
    />
  );

  const renderProduct = () => (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <CustomBreadcrumbs
        links={[
          { name: "Home", href: paths.home },
          { name: "Shop", href: paths.product.root },
          { name: name },
        ]}
        className="mb-1"
      />

      {/* Product Grid — image + summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16">
        {/* Carousel — lg: 7/12 columns */}
        <div className="min-w-0">
          <ProductDetailsCarousel images={displayImages} carousel={carousel} />
        </div>

        {/* Summary — lg: 5/12 columns */}
        <div className="min-w-0">
          <ProductDetailsSummary
            product={product}
            carousel={carousel}
            galleryImagesLength={displayImages.length}
            onOpenChat={handleOpenChat}
          />
        </div>
      </div>

      {/* Tabs Card */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden p-4">
        {/* Tab Bar */}
        <div className=" border-b border-gray-500/[0.08] ">
          <div className="flex gap-0 w-full min-w-max mb-3">
            {/* Description tab */}
            <TabButton
              active={tabs.value === "description"}
              onClick={() => tabs.onChange(null, "description")}
            >
              Description
            </TabButton>

            {/* Dynamic description tabs */}
            {activeDescriptions.map((desc) => (
              <TabButton
                key={desc.id}
                active={tabs.value === desc.id.toString()}
                onClick={() => tabs.onChange(null, desc.id.toString())}
              >
                {desc.title}
              </TabButton>
            ))}

            {/* Reviews tab */}
            <TabButton
              active={tabs.value === "reviews"}
              onClick={() => tabs.onChange(null, "reviews")}
            >
              Reviews
            </TabButton>
          </div>
        </div>

        {/* Tab Panels */}
        {tabs.value === "description" && (
          <ProductDetailsDescription description={description} />
        )}

        {activeDescriptions.map(
          (desc) =>
            tabs.value === desc.id.toString() && (
              <ProductDetailsDescription
                key={desc.id}
                description={desc.description}
              />
            )
        )}

        {tabs.value === "reviews" && (
          <ProductDetailsReview productId={product_id} />
        )}
      </div>

      {/* Related Products */}
      <ProductDetailsRelatedProducts
        list={relatedProducts}
        title="Related Products"
        className="mt-5"
      />
    </div>
  );

  return (
    <>
      {/* Main container */}
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-10">
        {product ? renderProduct() : renderError()}
      </div>

      {/* Floating Chat Button */}
      <div className="group relative">
        <div
          role="button"
          aria-label="Chat with us"
          onClick={handleOpenChat}
          className={[
            "fixed z-[999] flex cursor-pointer items-center justify-center",
            "right-5 sm:right-5 md:right-6",
            "bottom-36 sm:bottom-36 md:bottom-[88px]",
            "rounded-full bg-white p-2",
            "text-primary shadow-[0_12px_24px_0_rgba(0,0,0,0.12)]",
            "transition-opacity duration-200 hover:opacity-75",
          ].join(" ")}
        >
          <Iconify icon="solar:chat-line-bold-duotone" width={40} />
        </div>

        {/* Tooltip */}
        <span
          className={[
            "pointer-events-none fixed z-[1000]",
            "right-[72px] sm:right-[72px] md:right-[82px]",
            "bottom-[148px] sm:bottom-[148px] md:bottom-[96px]",
            "whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white",
            "opacity-0 transition-opacity group-hover:opacity-100",
          ].join(" ")}
        >
          Chat with us
          {/* Arrow pointing right */}
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
        </span>
      </div>

      {/* Chat Popover */}
      <CustomPopover
        open={chatPopover.open}
        anchorEl={chatPopover.anchorEl}
        onClose={chatPopover.onClose}
        slotProps={{
          arrow: { placement: "right-bottom" },
          paper: {
            sx: {
              width: 320,
              height: 1,
              maxHeight: 350,
            },
          },
        }}
      >
        <ChatView />
      </CustomPopover>
    </>
  );
}

// ---------------------------------------------------------------------------
// Internal helper: Tab Button
// ---------------------------------------------------------------------------

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 outline-none",
        "border-b-2 -mb-[2px]",
        active
          ? "border-primary text-primary"
          : "border-transparent text-gray-500 hover:text-gray-800",
      ].join(" ")}
    >
      {children}
    </button>
  );
}