// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import {
//   Box,
//   Stack,
//   Button,
//   Divider,
//   Typography,
//   Avatar,
//   Rating,
//   ListItemText,
//   Tooltip,
//   useTheme,
// } from "@mui/material";

// import { varAlpha } from "minimal-shared/utils";

// import { fCurrency } from "@/utils/format-number";

// import { CONFIG } from "@/global-config";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { addToCart, addToWishlist, removeWishlistItem, getCartDataRequest } from "@/redux/actions";

// import { Iconify } from "@/components/iconify";
// import { NumberInput } from "@/components/number-input";
// import { toast } from "@/components/snackbar";

// import {
//   addProductToCart,
//   addProductToWishlist,
//   removeProductFromWishlist,
// } from "@/api";
// import { RouterLink } from "@/routes/components";
// import { paths } from "@/routes/paths";

// // ----------------------------------------------------------------------

// export function ProductDetailsSummary({
//   product,
//   carousel,
//   galleryImagesLength,
//   onOpenChat = () => { },
//   isQuickOrder = false,
//   ...other
// }) {

//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const { isLogin } = useAppSelector((state) => state.auth);

//   const { items } = useAppSelector((state) => state.cart);

//   const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

//   const { vendor } = useAppSelector((state) => state.vendor);

//   const theme = useTheme();

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;

//   const [quantity, setQuantity] = useState(1);

//   const [selectedVariant, setSelectedVariant] = useState();

//   const {
//     product_id,
//     name,
//     slug,
//     brand,
//     categories,
//     price,
//     selling_price,
//     variants,
//     featured_image,
//     flash_sale_products,
//   } = product || {};

//   // Extract primary category from categories array
//   const category = categories?.find(cat => cat.is_primary) || categories?.[0];

//   // API returns: selling_price as object with flashSalePrice and regularPrice
//   // selling_price: { flashSalePrice: "254.99", regularPrice: "299.99" }
//   const regularPrice = selling_price?.regularPrice || price;
//   const flashSalePrice = selling_price?.flashSalePrice || price;
//   const hasFlashSale = flash_sale_products && flash_sale_products.length > 0;

//   const shouldUseFlashSalePrice = hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice);

//   const hasVariant = variants?.length > 0;

//   const shouldUseVariantFlashSalePrice = selectedVariant?.price && hasFlashSale &&
//     parseFloat(flashSalePrice) < parseFloat(selectedVariant.price);

//   const productInWishlist = wishlistItems?.find(
//     (wishlistItem) => wishlistItem.product_id == product_id
//   );

//   useEffect(() => {
//     if (hasVariant) {
//       setSelectedVariant(variants[0]);
//     }
//   }, [hasVariant]);

//   const handleRemoveFromWishlist = async () => {
//     try {
//       await removeProductFromWishlist(productInWishlist.wishlist_id);

//       dispatch(removeWishlistItem(productInWishlist.wishlist_id));

//       toast.success("Product removed from wishlist!");
//     } catch (error) {
//       toast.error("Couldn't remove product! Try again.");
//     }
//   };

//   const handleAddToWishlist = async () => {
//     const newProduct = {
//       product_id,
//     };

//     if (hasVariant) {
//       newProduct.variant_id = selectedVariant.variant_id
//         ? selectedVariant.variant_id
//         : variants[0].variant_id;
//     }

//     try {
//       const response = await addProductToWishlist(newProduct);

//       dispatch(addToWishlist(response[0]));

//       toast.success("Product added to wishlist!");
//     } catch (error) {
//       toast.error("Couldn't add to wishlist! Try again.");
//     }
//   };

//   const handleAddToCart = async () => {
//     let newProduct = {
//       product_id,
//       quantity,
//     };

//     if (hasVariant) {
//       newProduct.variant_id = selectedVariant.variant_id
//         ? selectedVariant.variant_id
//         : variants[0].variant_id;
//     }

//     try {
//       if (isLogin) {
//         // Add to cart via API
//         const cartResponse = await addProductToCart([newProduct]);

//         // console.log("[ADD TO CART] API Response:", cartResponse);

//         // After successful API call, refresh cart from server
//         // This ensures we have the complete cart data with all fields
//         dispatch(getCartDataRequest());
//       } else {
//         newProduct = {
//           ...newProduct,
//           cart_id: items.length + 1,
//           product_name: name,
//           featured_image,
//           slug,
//           price: flashSalePrice || regularPrice,
//         };

//         dispatch(addToCart(newProduct));
//       }

//       toast.success("Product added to cart!");
//     } catch (error) {
//       console.error("[ADD TO CART] Error:", error);
//       toast.error("Couldn't add product to cart! Try again");
//     }
//   };

//   // const handleBuyNow = async () => {
//   //   if (!isLogin) {
//   //     // Not logged in, redirect to checkout directly
//   //     router.push(`${paths.checkout}?buyNow=true&productId=${product_id}&quantity=${quantity}`);
//   //     return;
//   //   }

//   //   // Logged in: Add to cart first, then go to cart page
//   //   let newProduct = {
//   //     product_id,
//   //     quantity,
//   //   };

//   //   if (hasVariant) {
//   //     newProduct.variant_id = selectedVariant.variant_id
//   //       ? selectedVariant.variant_id
//   //       : variants[0].variant_id;
//   //   }

//   //   try {
//   //     // Add to cart via API
//   //     const cartResponse = await addProductToCart([newProduct]);

//   //     console.log("[BUY NOW] API Response:", cartResponse);

//   //     // After successful API call, refresh cart from server
//   //     dispatch(getCartDataRequest());

//   //     toast.success("Product added to cart!");

//   //     // Navigate to cart page
//   //     router.push(paths.cart);
//   //   } catch (error) {
//   //     console.error("[BUY NOW] Error:", error);
//   //     toast.error("Couldn't add product to cart! Try again");
//   //   }
//   // };
//   const handleBuyNow = async () => {
//     if (!isLogin) {
//       // Not logged in, redirect to checkout directly
//       router.push(`${paths.checkout}?buyNow=true&productSlug=${slug}&quantity=1`);
//       return;
//     }

//     // Logged in: Add to cart first, then go to cart page
//     let newProduct = {
//       product_id,
//       quantity: 1,
//     };

//     if (!!variants?.length) {
//       newProduct.variant_id = variants[0].variant_id;
//     }

//     try {
//       // Add to cart via API
//       const cartResponse = await addProductToCart([newProduct]);

//       // After successful API call, refresh cart from server
//       dispatch(getCartDataRequest());

//       toast.success("Product added to cart!");

//       // Navigate to cart page
//       router.push(paths.cart);
//     } catch (error) {
//       toast.error("Couldn't add product to cart! Try again");
//     }
//   };
//   const renderRating = () => (
//     <Box
//       sx={{
//         display: "flex",
//         typography: "body2",
//         alignItems: "center",
//         color: "text.disabled",
//       }}
//     >
//       <Rating size="small" value={5} precision={0.1} readOnly sx={{ mr: 1 }} />
//       (5 reviews)
//     </Box>
//   );

//   const renderRegularPrice = (price) => (
//     <Box
//       component="span"
//       sx={{ color: "text.disabled", textDecoration: "line-through" }}
//     >
//       {fCurrency(price)}
//     </Box>
//   );

//   const renderSalePrice = (price) => (
//     <Box component="span">{fCurrency(price)}</Box>
//   );

//   const renderPrice = () => (
//     <Box sx={{ gap: 0.5, display: "flex", typography: "h3" }}>
//       {hasVariant ? (
//         shouldUseVariantFlashSalePrice ? (
//           <>
//             {renderRegularPrice(selectedVariant?.price)}

//             {renderSalePrice(flashSalePrice)}
//           </>
//         ) : (
//           renderSalePrice(selectedVariant?.price || flashSalePrice || regularPrice)
//         )
//       ) : shouldUseFlashSalePrice ? (
//         <>
//           {renderRegularPrice(regularPrice)}

//           {renderSalePrice(flashSalePrice)}
//         </>
//       ) : (
//         renderSalePrice(flashSalePrice || regularPrice)
//       )}
//     </Box>
//   );

//   const renderQuantity = () => {
//     if (isQuickOrder) {
//       return null;
//     }

//     return (
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <Typography variant="body" sx={{
//           margin: 0,
//           flexGrow: 1,
//           fontSize: {
//             sm: "0.8rem",
//             md: "0.8rem",
//             md: "0.9rem",
//           },
//           fontWeight: 700
//         }}>
//           Quantity
//         </Typography>

//         <Stack spacing={1}>
//           <NumberInput
//             hideDivider
//             value={quantity}
//             onChange={(event, qty) => setQuantity(qty)}
//             min={1}
//             max={100}
//             sx={{ maxWidth: 112 }}
//           />
//         </Stack>
//       </Box>
//     );
//   };

//   const renderBrand = () => (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Typography variant="h2" sx={{
//         margin: 0,
//         flexGrow: 1,
//         fontSize: {
//           sm: "0.8rem",
//           md: "0.8rem",
//           md: "0.9rem",
//         },
//       }}>
//         Brand
//       </Typography>

//       <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//         <Typography variant="h3" sx={{
//           fontSize: {
//             sm: "0.8rem",
//             md: "0.8rem",
//             md: "0.9rem",
//           },
//         }}> {brand?.brand_name} </Typography>

//         <Avatar
//           alt={brand?.brand_name}
//           title={brand?.brand_name}
//           src={`${brand?.brand_image}`}
//         />
//       </Box>
//     </Box>
//   );

//   const renderCategory = () => {
//     if (!categories || categories.length === 0) {
//       return null;
//     }

//     return (
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
//         <Typography variant="h2" sx={{
//           margin: 0,
//           flexShrink: 0,
//           fontSize: {
//             sm: "0.8rem",
//             md: "0.8rem",
//             md: "0.9rem",
//           },
//         }}>
//           Categories
//         </Typography>

//         <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
//           {categories.map((cat) => (
//             <Box
//               key={cat.category_id}
//               sx={{ display: "flex", gap: 1, alignItems: "center", flexDirection: "column", justifyContent: "center" }}
//             >
//               <Tooltip title={cat?.category_name} placement="top" arrow>

//                 <Avatar
//                   alt={cat?.category_name}
//                   sx={{
//                     borderRadius: "50%",
//                     boxShadow: (theme) => theme.shadows[3],
//                     p: 0.1
//                   }}
//                   src={`${cat?.web_image}`}
//                 />
//               </Tooltip>
//               {/* <Typography variant="h3" sx={{
//                 fontSize: {
//                   sm: "0.7rem",
//                   md: "0.7rem",
//                   md: "0.8rem",
//                 },
//                 textAlign: "center",
//               }}>
//                 {cat?.category_name} */}
//               {/* {cat?.is_primary && (
//                   <Typography
//                     component="span"
//                     variant="caption"
//                     sx={{
//                       display: "block",
//                       fontSize: "0.65rem",
//                       color: "text.secondary",
//                       fontWeight: 600
//                     }}
//                   >
//                     (Primary)
//                   </Typography>
//                 )} */}
//               {/* </Typography> */}
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     );
//   };

//   const renderVariants = () => {
//     if (!hasVariant) {
//       return null;
//     }

//     return (
//       <Stack spacing={2}>
//         <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
//           Variant: {selectedVariant?.variant_name}
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           {variants.map((variant, index) => (
//             <Avatar
//               key={variant.variant_id}
//               alt={variant.variant_name}
//               src={`${variant.image}`}
//               onClick={() => {
//                 carousel.thumbs.onClickThumb(galleryImagesLength + index);

//                 setSelectedVariant(variant);
//               }}
//               sx={{
//                 cursor: "pointer",
//                 boxShadow: (theme) => theme.shadows[7],
//               }}
//             />
//           ))}
//         </Box>
//       </Stack>
//     );
//   };

//   const renderChatAction = () => {
//     if (isQuickOrder) {
//       return null;
//     }

//     return (
//       <Box sx={{ display: "flex" }}>
//         <ListItemText
//           primary="Need more info?"
//           secondary="Chat with the product supplier"
//           slotProps={{
//             primary: { noWrap: true, sx: { typography: "subtitle2" } },
//             secondary: { sx: { typography: "caption" } },
//           }}
//         />

//         <Button variant="outlined" onClick={(event) => onOpenChat(event)}>
//           Chat now
//         </Button>
//       </Box>
//     );
//   };

//   const renderActions = () => {
//     if (isQuickOrder) {
//       return null;
//     }

//     return (
//       <Box sx={{ gap: 2, display: "flex" }}>
//         {isLogin && (
//           <Button
//             fullWidth
//             size="large"
//             variant="contained"
//             startIcon={<Iconify icon="solar:heart-bold" width={24} />}
//             onClick={
//               productInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
//             }
//             sx={{ whiteSpace: "nowrap" }}
//           >
//             {productInWishlist ? "Remove" : "Add to Wishlist"}
//           </Button>
//         )}

//         <Button
//           fullWidth
//           size="large"
//           variant="contained"
//           startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
//           onClick={handleAddToCart}
//           sx={{
//             whiteSpace: "nowrap",
//             ...(vendor?.primary_color && {
//               backgroundColor: vendor.primary_color,
//               '&:hover': {
//                 backgroundColor: vendor.primary_color,
//                 opacity: 0.9,
//               },
//             }),
//           }}
//         >
//           Add to Cart
//         </Button>
//         <Button
//           size="large"
//           fullWidth
//           variant="contained"
//           startIcon={<Iconify icon="solar:bolt-bold" width={16} />}
//           onClick={handleBuyNow}
//           sx={{ whiteSpace: "nowrap" }}
//         >
//           Buy Now
//         </Button>
//       </Box >
//     );
//   };

//   return (
//     <Stack spacing={2} sx={{ pt: 2 }} {...other}>
//       <Stack spacing={2} alignItems="flex-start">
//         <Typography variant="h1" sx={{
//           fontSize: {
//             xs: "1rem",
//             sm: "1.1rem",
//             md: "1.2rem",
//           }
//         }}>{name}</Typography>

//         {renderRating()}

//         {renderPrice()}
//       </Stack>

//       <Divider sx={{ borderStyle: "dashed" }} />

//       {renderBrand()}

//       <Divider sx={{ borderStyle: "dashed" }} />

//       {renderCategory()}

//       <Divider sx={{ borderStyle: "dashed" }} />

//       {renderVariants()}

//       {hasVariant && <Divider sx={{ borderStyle: "dashed" }} />}

//       {renderQuantity()}

//       {!isQuickOrder && <Divider sx={{ borderStyle: "dashed" }} />}

//       {renderChatAction()}

//       {!isQuickOrder && <Divider sx={{ borderStyle: "dashed" }} />}

//       {renderActions()}
//     </Stack>
//   );
// }
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { fCurrency } from "@/utils/format-number";

import { CONFIG } from "@/global-config";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  addToWishlist,
  removeWishlistItem,
  getCartDataRequest,
} from "@/redux/actions";

import { Iconify } from "@/components/iconify";
import { NumberInput } from "@/components/number-input";
import { toast } from "@/components/snackbar";

import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/api";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

export function ProductDetailsSummary({
  product,
  carousel,
  galleryImagesLength,
  onOpenChat = () => { },
  isQuickOrder = false,
  ...other
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { vendor } = useAppSelector((state) => state.vendor);

  // Vendor primary color used inline where Tailwind can't handle dynamic values
  const primaryColor = vendor?.primary_color || null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState();

  const {
    product_id,
    name,
    slug,
    brand,
    categories,
    price,
    selling_price,
    variants,
    featured_image,
    flash_sale_products,
  } = product || {};

  const regularPrice = selling_price?.regularPrice || price;
  const flashSalePrice = selling_price?.flashSalePrice || price;
  const hasFlashSale = flash_sale_products && flash_sale_products.length > 0;

  const shouldUseFlashSalePrice =
    hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice);

  const hasVariant = variants?.length > 0;

  const shouldUseVariantFlashSalePrice =
    selectedVariant?.price &&
    hasFlashSale &&
    parseFloat(flashSalePrice) < parseFloat(selectedVariant.price);

  const productInWishlist = wishlistItems?.find(
    (wishlistItem) => wishlistItem.product_id == product_id
  );

  useEffect(() => {
    if (hasVariant) {
      setSelectedVariant(variants[0]);
    }
  }, [hasVariant]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleRemoveFromWishlist = async () => {
    try {
      await removeProductFromWishlist(productInWishlist.wishlist_id);
      dispatch(removeWishlistItem(productInWishlist.wishlist_id));
      toast.success("Product removed from wishlist!");
    } catch {
      toast.error("Couldn't remove product! Try again.");
    }
  };

  const handleAddToWishlist = async () => {
    const newProduct = { product_id };
    if (hasVariant) {
      newProduct.variant_id = selectedVariant?.variant_id ?? variants[0].variant_id;
    }
    try {
      const response = await addProductToWishlist(newProduct);
      dispatch(addToWishlist(response[0]));
      toast.success("Product added to wishlist!");
    } catch {
      toast.error("Couldn't add to wishlist! Try again.");
    }
  };

  const handleAddToCart = async () => {
    let newProduct = { product_id, quantity };
    if (hasVariant) {
      newProduct.variant_id = selectedVariant?.variant_id ?? variants[0].variant_id;
    }
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
      console.error("[ADD TO CART] Error:", error);
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  const handleBuyNow = async () => {
    if (!isLogin) {
      router.push(`${paths.checkout}?buyNow=true&productSlug=${slug}&quantity=1`);
      return;
    }
    let newProduct = { product_id, quantity: 1 };
    if (!!variants?.length) {
      newProduct.variant_id = variants[0].variant_id;
    }
    try {
      await addProductToCart([newProduct]);
      dispatch(getCartDataRequest());
      toast.success("Product added to cart!");
      router.push(paths.cart);
    } catch {
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  // ── Render helpers ───────────────────────────────────────────────────────────

  const renderRating = () => (
    <div className="flex items-center gap-1 text-sm text-gray-400">
      {/* Star rating — 5 filled stars */}
      <div className="flex items-center mr-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-4 h-4 text-yellow-400 fill-yellow-400"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      (5 reviews)
    </div>
  );

  const renderRegularPrice = (p) => (
    <span className="text-gray-400 line-through">{fCurrency(p)}</span>
  );

  const renderSalePrice = (p) => <span>{fCurrency(p)}</span>;

  const renderPrice = () => (
    <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
      {hasVariant ? (
        shouldUseVariantFlashSalePrice ? (
          <>
            {renderRegularPrice(selectedVariant?.price)}
            {renderSalePrice(flashSalePrice)}
          </>
        ) : (
          renderSalePrice(
            selectedVariant?.price || flashSalePrice || regularPrice
          )
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
  );

  const renderQuantity = () => {
    if (isQuickOrder) return null;
    return (
      <div className="flex items-center">
        <span className="flex-1 text-[0.875rem] font-bold text-gray-800">
          Quantity
        </span>
        <div>
          <NumberInput
            hideDivider
            value={quantity}
            onChange={(event, qty) => setQuantity(qty)}
            min={1}
            max={100}
            sx={{ maxWidth: 112 }}
          />
        </div>
      </div>
    );
  };

  const renderBrand = () => (
    <div className="flex items-center">
      <span className="flex-1 text-[0.875rem] text-gray-700">Brand</span>
      <div className="flex items-center gap-2">
        <span className="text-[0.875rem] font-semibold text-gray-900">
          {brand?.brand_name}
        </span>
        <img
          alt={brand?.brand_name}
          title={brand?.brand_name}
          src={brand?.brand_image}
          className="w-10 h-10 shadow-lg border-gray-300 border-[2px] rounded-full object-cover"
        />
      </div>
    </div>
  );

  const renderCategory = () => {
    if (!categories || categories.length === 0) return null;
    return (
      <div className="flex items-center justify-between gap-4">
        <span className="flex-shrink-0 text-[0.875rem] text-gray-700">
          Categories
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {categories.map((cat) => (
            <div
              key={cat.category_id}
              className="flex flex-col items-center justify-center gap-0"
            >
              {/* Tooltip via title attribute — lightweight replacement */}
              <img
                alt={cat?.category_name}
                title={cat?.category_name}
                src={cat?.web_image}
                className="w-10 h-10 shadow-lg border-gray-300 border-[2px] rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVariants = () => {
    if (!hasVariant) return null;
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-gray-800">
          Variant: {selectedVariant?.variant_name}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {variants.map((variant, index) => (
            <img
              key={variant.variant_id}
              alt={variant.variant_name}
              src={variant.image}
              title={variant.variant_name}
              onClick={() => {
                carousel.thumbs.onClickThumb(galleryImagesLength + index);
                setSelectedVariant(variant);
              }}
              className="w-10 h-10 rounded-full object-cover cursor-pointer shadow-lg hover:ring-2 hover:ring-primary transition-all"
            />
          ))}
        </div>
      </div>
    );
  };

  const renderChatAction = () => {
    if (isQuickOrder) return null;
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            Need more info?
          </span>
          <span className="text-xs text-gray-500">
            Chat with the product supplier
          </span>
        </div>
        <button
          onClick={(event) => onOpenChat(event)}
          className="ml-4 rounded-md border border-gray-300 px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Chat now
        </button>
      </div>
    );
  };

  const renderActions = () => {
    if (isQuickOrder) return null;
    return (
      <div className="flex gap-3">
        {/* Wishlist button — only when logged in */}
        {isLogin && (
          <button
            onClick={productInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            <Iconify icon="solar:heart-bold" width={24} />
            {productInWishlist ? "Remove" : "Add to Wishlist"}
          </button>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 transition-opacity"
          style={primaryColor ? { backgroundColor: primaryColor } : undefined}
        >
          <Iconify icon="solar:cart-plus-bold" width={24} />
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#000000]  px-4 py-2 text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          <Iconify icon="solar:bolt-bold" width={16} />
          Buy Now
        </button>
      </div>
    );
  };

  // ── Root ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-2 pt-2" {...other}>
      {/* Name + rating + price */}
      <div className="flex flex-col gap-2 items-start">
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 m-0">
          {name}
        </h1>
        {renderRating()}
        {renderPrice()}
      </div>

      <Divider />

      {renderBrand()}

      <Divider />

      {renderCategory()}

      <Divider />

      {renderVariants()}

      {hasVariant && <Divider />}

      {renderQuantity()}

      {!isQuickOrder && <Divider />}

      {renderChatAction()}

      {!isQuickOrder && <Divider />}

      {renderActions()}
    </div>
  );
}

// ── Dashed divider ────────────────────────────────────────────────────────────
function Divider() {
  return <hr className="border-t border-dashed border-gray-200 my-0 py-0" />;
}