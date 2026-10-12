
"use client";

import { useEffect } from "react";
import { useTabs } from "minimal-shared/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProductReviewsRequest } from "@/redux/actions";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";
import { Iconify } from "@/components/iconify";
import { useCarousel } from "@/components/carousel";

import { ProductDetailsReview } from "../product-details-review";
import { ProductDetailsSummary } from "../product-details-summary";
import { ProductDetailsCarousel } from "../product-details-carousel";
import { ProductDetailsDescription } from "../product-details-description";
import { ProductDetailsRelatedProducts } from "../product-details-related-products";
import { ProductQuickOrderForm } from "../product-quick-order-form";

// ----------------------------------------------------------------------

export function ProductQuickOrderView({ product, relatedProducts }) {
  const tabs = useTabs("description");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);

  const carousel = useCarousel({
    thumbs: { slidesToShow: "auto" },
  });

  const {
    product_id,
    name,
    featured_image,
    description,
    gallery_images,
    variants,
    slug,
    selling_price,
    price,
  } = product || {};

  useEffect(() => {
    if (isLogin) {
      router.push(paths.product.details(slug));
    }
  }, [isLogin, router, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (product_id) {
      dispatch(getProductReviewsRequest(product_id));
    }
  }, [dispatch, product_id]);

  const variantImages =
    variants
      ?.map((variant) => ({
        id: variant.variant_id,
        image: variant.image,
      }))
      .filter((v) => v.image) || [];

  const featuredImage = featured_image
    ? {
      id: "featured_image",
      image: featured_image,
    }
    : null;

  const imageCarousel = [
    ...(featuredImage ? [featuredImage] : []),
    ...(gallery_images || []),
    ...variantImages,
  ].filter((img) => img && img.image);

  const displayImages =
    imageCarousel.length > 0
      ? imageCarousel
      : [{ id: "placeholder", image: "/assets/placeholder.png" }];

  const renderError = () => (
    <EmptyContent
      title="Product Not Found"
      description="Oops! The product you're looking for isn't available. Check out our other amazing products!"
      action={
        <RouterLink
          href={paths.product.root}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Iconify
            icon="eva:arrow-ios-back-fill"
            width={16}
          />
          Back to List
        </RouterLink>
      }
      sx={{ py: 10 }}
    />
  );

  const renderTabs = () => {
    const tabsList = [
      {
        value: "description",
        label: "Description",
      },
      {
        value: "reviews",
        label: "Reviews",
      },
    ];

    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Tab Header */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 px-4 md:px-6">
          {tabsList.map((tab) => {
            const active = tabs.value === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() =>
                  tabs.onChange(null, tab.value)
                }
                className={`relative px-4 py-4 text-sm font-semibold transition ${active
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                {tab.label}

                {active && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {tabs.value === "description" && (
            <ProductDetailsDescription
              description={description}
            />
          )}

          {tabs.value === "reviews" && (
            <ProductDetailsReview
              productId={product_id}
            />
          )}
        </div>
      </div>
    );
  };

  const renderProduct = () => (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <CustomBreadcrumbs
        links={[
          {
            name: "Shop",
            href: paths.product.root,
          },
          {
            name,
          },
        ]}
      />

      {/* Main Section */}
      <div className="grid grid-cols-1 gap-6 lg:gap-10 xl:grid-cols-12">
        {/* Left */}
        <div className="xl:col-span-7">
          <div className="flex flex-col gap-6">
            <ProductDetailsCarousel
              images={displayImages}
              carousel={carousel}
            />

            <ProductDetailsSummary
              product={product}
              carousel={carousel}
              galleryImagesLength={
                (gallery_images?.length || 0) + 1
              }
              isQuickOrder={true}
            />
          </div>
        </div>

        {/* Right */}
        <div className="xl:col-span-5">
          <div className="sticky top-24">
            <ProductQuickOrderForm
              productId={product_id}
              price={price}
              selling_price={selling_price}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      {renderTabs()}

      {/* Related Products */}
      <ProductDetailsRelatedProducts
        list={relatedProducts}
        title="Related Products"
        isQuickOrder={true}
        sx={{ mt: 5 }}
      />
    </div>
  );

  return (
    <div className="mx-auto mt-5 mb-10 w-full max-w-[1440px] px-4 md:px-6 lg:px-8">
      {product ? renderProduct() : renderError()}
    </div>
  );
}