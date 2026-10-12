
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, addToWishlist, removeWishlistItem, getCartDataRequest } from "@/redux/actions";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { fCurrency } from "@/utils/format-number";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/api";

// ----------------------------------------------------------------------

export function ProductItem({ product, detailsHref }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#6366f1"; // fallback indigo

  const {
    product_id,
    name,
    slug,
    featured_image,
    price,
    selling_price,
    is_active,
    variants,
    flash_sale_products,
  } = product;

  const regularPrice = selling_price?.regularPrice || price;
  const flashSalePrice = selling_price?.flashSalePrice || price;
  const hasFlashSale = flash_sale_products && flash_sale_products.length > 0;
  const shouldUseFlashSalePrice = hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice);

  const productInWishlist = wishlistItems?.find(
    (wishlistItem) => wishlistItem.product_id == product_id
  );

  const handleRemoveFromWishlist = async () => {
    try {
      await removeProductFromWishlist(productInWishlist.wishlist_id);
      dispatch(removeWishlistItem(productInWishlist.wishlist_id));
      toast.success("Product removed from wishli  st!");
    } catch (error) {
      toast.error("Couldn't remove product! Try again.");
    }
  };

  const handleAddToWishlist = async () => {
    const newProduct = { product_id };
    if (!!variants?.length) newProduct.variant_id = variants[0].variant_id;
    try {
      const response = await addProductToWishlist(newProduct);
      dispatch(addToWishlist(response[0]));
      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("Couldn't add to wishlist! Try again.");
    }
  };

  const handleAddToCart = async () => {
    let newProduct = { product_id, quantity: 1 };
    if (!!variants?.length) newProduct.variant_id = variants[0].variant_id;
    try {
      if (isLogin) {
        await addProductToCart([newProduct]);
        dispatch(getCartDataRequest());
      } else {
        newProduct = {
          ...newProduct,
          cart_id: items.length + 1,
          product_name: name,
          featured_image,
          slug,
          price: flashSalePrice || regularPrice,
        };
        dispatch(addToCart(newProduct));
      }
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  const handleBuyNow = async () => {
    if (!isLogin) {
      router.push(`${paths.checkout}?buyNow=true&productSlug=${slug}&quantity=1`);
      return;
    }
    let newProduct = { product_id, quantity: 1 };
    if (!!variants?.length) newProduct.variant_id = variants[0].variant_id;
    try {
      await addProductToCart([newProduct]);
      dispatch(getCartDataRequest());
      toast.success("Product added to cart!");
      router.push(paths.cart);
    } catch (error) {
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  const renderRegularPrice = (p) => (
    <span className="text-gray-400 line-through">{fCurrency(p)}</span>
  );

  const renderSalePrice = (p) => (
    <span>{fCurrency(p)}</span>
  );

  const renderImage = () => {
    const imageUrl = featured_image
      ? featured_image.startsWith("http")
        ? featured_image
        : `${process.env.NEXT_PUBLIC_API_URL}/${featured_image.replace(/^\/+/, "")}`
      : "/assets/placeholder.png";

    return (
      <RouterLink
        href={detailsHref}
        className="relative block bg-gray-50 overflow-hidden group"
      >
        {/* Trending Badge */}
        {/* {isTrending && (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-red-500 text-white text-[0.65rem] font-semibold px-2 py-0.5 rounded-full">
            <Iconify icon="solar:fire-bold" width={12} />
            Trending
          </span>
        )} */}

        {/* Sale Badge */}
        {shouldUseFlashSalePrice && flash_sale_products?.[0] && (
          <span
            className="absolute top-2 right-2 z-10 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            -{flash_sale_products[0].discount_percentage}%
          </span>
        )}

        <img
          alt={name}
          title={name}
          src={imageUrl}
          className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/assets/placeholder.png";
          }}
        />
      </RouterLink>
    );
  };
  const renderContent = () => (
    <div className="flex flex-col flex-grow p-3 gap-2">
      {/* Product Name */}
      <RouterLink
        href={detailsHref}
        title={name}
        className="text-sm font-semibold text-gray-800 truncate hover:text-[var(--primary-color)] transition-colors duration-200"
        style={{ "--primary-color": primaryColor }}
      >
        {name}
      </RouterLink>

      {/* Price + Wishlist row */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: primaryColor }}
        >
          {!!variants?.length && variants[0] ? (
            variants[0].price && shouldUseFlashSalePrice ? (
              <>
                {renderRegularPrice(variants[0].price)}
                {renderSalePrice(flashSalePrice)}
              </>
            ) : (
              renderSalePrice(variants[0].price || flashSalePrice)
            )
          ) : shouldUseFlashSalePrice ? (
            <>
              {renderRegularPrice(regularPrice)}
              {renderSalePrice(flashSalePrice)}
            </>
          ) : (
            renderSalePrice(flashSalePrice || regularPrice)
          )}
        </div>

        {/* Wishlist — hidden on small screens */}
        {isLogin && (
          <button
            onClick={productInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
            className="hidden sm:flex items-center justify-center p-1 rounded-full hover:bg-gray-100 transition-colors"
            style={{ color: primaryColor }}
          >
            <Iconify
              icon={`solar:heart-${productInWishlist ? "bold" : "outline"}`}
              width={18}
            />
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-1.5 mt-auto">
        <div className="flex gap-1.5">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-white py-1.5 px-2 rounded-lg transition-shadow hover:shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Iconify icon="solar:cart-plus-bold" width={15} />
            <span className="sm:hidden">Cart</span>
            <span className="hidden sm:inline">Add to Cart</span>
          </button>

          {/* Wishlist icon — visible only on small screens */}
          {isLogin && (
            <button
              onClick={productInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
              className="sm:hidden flex items-center justify-center p-1.5 rounded-lg transition-colors"
              style={{
                color: primaryColor,
                backgroundColor: `${primaryColor}15`,
              }}
            >
              <Iconify
                icon={`solar:heart-${productInWishlist ? "bold" : "outline"}`}
                width={18}
              />
            </button>
          )}
        </div>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold py-1.5 px-2 rounded-lg border transition-colors hover:bg-opacity-10"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primaryColor}15`)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <Iconify icon="solar:bolt-bold" width={15} />
          Buy Now
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="h-full flex flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all duration-200 hover:shadow-xl"
      style={{
        "--tw-shadow-color": `${primaryColor}3d`,
      }}
    >
      {renderImage()}
      {renderContent()}
    </div>
  );
}