// import {
//   Box,
//   Avatar,
//   TableRow,
//   TableCell,
//   IconButton,
//   Link,
//   Button,
//   Typography,
//   Chip,
//   Stack,
// } from "@mui/material";

// import { CONFIG } from "@/global-config";

// import { RouterLink } from "@/routes/components";
// import { paths } from "@/routes/paths";

// import { useAppSelector } from "@/redux/hooks";
// import { selectAuthState, selectWishlistState } from "@/redux/selectors";

// import { fCurrency } from "@/utils/format-number";

// import { Iconify } from "@/components/iconify";
// import { NumberInput } from "@/components/number-input";

// // ----------------------------------------------------------------------

// export function CartProduct({
//   row,
//   onDeleteCartItem,
//   onChangeItemQuantity,
//   onMoveToWishlist,
// }) {
//   const { isLogin } = useAppSelector(selectAuthState);

//   const { items: wishlistItems } = useAppSelector(selectWishlistState);

//   console.log('Cart row data:', row);

//   const {
//     cart_id,
//     product_id,
//     itemable_id, // Alternative field for product_id from API
//     product_name,
//     item_name, // API returns item_name instead of product_name
//     slug,
//     featured_image,
//     item_image, // API returns item_image instead of featured_image
//     price,
//     regular_price,
//     quantity,
//     is_flash_sale,
//     flash_sale_price,
//     flash_sale_remaining_qty,
//   } = row;

//   // Use API field names as fallback
//   const productId = product_id || itemable_id;
//   const productName = item_name || product_name;

//   // Handle image URL - item_image from API is full URL, featured_image is relative path
//   let productImage = item_image || featured_image;

//   // If it's a relative path (doesn't start with http), prepend the assets directory
//   if (productImage && !productImage.startsWith('http')) {
//     productImage = `${productImage}`;
//   }

//   const priceValue = Number(price) || Number(regular_price) || 0;
//   const regularPriceValue = Number(regular_price) || 0;
//   const isFlashSale = Boolean(is_flash_sale);
//   const flashSaleRemaining = Number(flash_sale_remaining_qty) || 0;

//   // Calculate savings if flash sale is active
//   const flashSaleSavings = isFlashSale && regularPriceValue > priceValue
//     ? (regularPriceValue - priceValue) * quantity
//     : 0;

//   const isProductInWishlist = wishlistItems?.some(
//     (wishlistItem) => wishlistItem.product_id == productId
//   );

//   console.log('Cart Product - productId:', productId, 'isProductInWishlist:', isProductInWishlist, 'isLogin:', isLogin);

//   return (
//     <TableRow>
//       <TableCell>
//         <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
//           <Avatar
//             variant="rounded"
//             alt={productName}
//             title={productName}
//             src={productImage || undefined}
//             sx={{ width: 64, height: 64 }}
//           />

//           <Stack spacing={0.5}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
//               <Typography component="h2">
//                 <Link
//                   component={RouterLink}
//                   href={paths.product.details(slug)}
//                   sx={{ color: "inherit", typography: "subtitle2", maxWidth: 240 }}
//                 >
//                   {productName}
//                 </Link>
//               </Typography>
//               {isFlashSale && (
//                 <Chip
//                   icon={<Iconify icon="solar:fire-bold" width={16} />}
//                   label="Flash Sale"
//                   size="small"
//                   color="error"
//                   sx={{ height: 20, fontSize: '0.7rem' }}
//                 />
//               )}
//             </Box>
//             {isFlashSale && flashSaleRemaining > 0 && (
//               <Typography variant="caption" sx={{ color: 'warning.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                 <Iconify icon="solar:clock-circle-bold" width={14} />
//                 {flashSaleRemaining} left at this price
//               </Typography>
//             )}
//           </Stack>
//         </Box>
//       </TableCell>

//       <TableCell>
//         <Stack spacing={0.5} alignItems="flex-start">
//           {isFlashSale && regularPriceValue > priceValue ? (
//             <>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: 'text.disabled',
//                   textDecoration: 'line-through',
//                 }}
//               >
//                 {fCurrency(regularPriceValue)}
//               </Typography>
//               <Typography variant="body2" sx={{ fontWeight: "bold", color: 'error.main' }}>
//                 {fCurrency(priceValue)}
//               </Typography>
//               <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
//                 Save {fCurrency(regularPriceValue - priceValue)}
//               </Typography>
//             </>
//           ) : (
//             <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//               {fCurrency(priceValue)}
//             </Typography>
//           )}
//         </Stack>
//       </TableCell>

//       <TableCell>
//         <Box sx={{ width: 100, textAlign: "right" }}>
//           <NumberInput
//             hideDivider
//             value={Number(quantity)}
//             onChange={(event, quantity) =>
//               onChangeItemQuantity(cart_id, quantity)
//             }
//             min={1}
//           />
//         </Box>
//       </TableCell>

//       <TableCell
//         align="right"
//         sx={{ whiteSpace: "nowrap", typography: "subtitle2" }}
//       >
//         {fCurrency(priceValue * quantity)}
//       </TableCell>

//       <TableCell align="right" sx={{ px: 1 }}>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             alignItems: "center",
//             justifyContent: "flex-end",
//           }}
//         >
//           {isLogin && !isProductInWishlist && (
//             <Button
//               size="small"
//               variant="outlined"
//               onClick={() => onMoveToWishlist(row)}
//               sx={{ whiteSpace: "nowrap" }}
//             >
//               To Wishlist
//             </Button>
//           )}

//           <IconButton color="error" onClick={() => onDeleteCartItem(cart_id)}>
//             <Iconify icon="solar:trash-bin-trash-bold" />
//           </IconButton>
//         </Box>
//       </TableCell>
//     </TableRow>
//   );
// }

import { CONFIG } from "@/global-config";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { useAppSelector } from "@/redux/hooks";
import { selectAuthState, selectWishlistState } from "@/redux/selectors";

import { fCurrency } from "@/utils/format-number";

import { Iconify } from "@/components/iconify";
import { NumberInput } from "@/components/number-input";

// ----------------------------------------------------------------------

export function CartProduct({
  row,
  onDeleteCartItem,
  onChangeItemQuantity,
  onMoveToWishlist,
}) {
  const { isLogin } = useAppSelector(selectAuthState);

  const { items: wishlistItems } = useAppSelector(selectWishlistState);

  console.log("Cart row data:", row);

  const {
    cart_id,
    product_id,
    itemable_id,
    product_name,
    item_name,
    slug,
    featured_image,
    item_image,
    price,
    regular_price,
    quantity,
    is_flash_sale,
    flash_sale_price,
    flash_sale_remaining_qty,
  } = row;

  // Use API field names as fallback
  const productId = product_id || itemable_id;
  const productName = item_name || product_name;

  // Handle image URL
  let productImage = item_image || featured_image;

  if (productImage && !productImage.startsWith("http")) {
    productImage = `${productImage}`;
  }

  const priceValue = Number(price) || Number(regular_price) || 0;
  const regularPriceValue = Number(regular_price) || 0;
  const isFlashSale = Boolean(is_flash_sale);
  const flashSaleRemaining = Number(flash_sale_remaining_qty) || 0;

  // Calculate savings if flash sale is active
  const flashSaleSavings =
    isFlashSale && regularPriceValue > priceValue
      ? (regularPriceValue - priceValue) * quantity
      : 0;

  const isProductInWishlist = wishlistItems?.some(
    (wishlistItem) => wishlistItem.product_id == productId
  );

  console.log(
    "Cart Product - productId:",
    productId,
    "isProductInWishlist:",
    isProductInWishlist,
    "isLogin:",
    isLogin
  );

  return (
    <tr className="border-b border-gray-200">
      {/* Product */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img
              src={productImage || undefined}
              alt={productName}
              title={productName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2>
                <RouterLink
                  href={paths.product.details(slug)}
                  className="max-w-[240px] text-sm font-semibold text-inherit no-underline hover:underline"
                >
                  {productName}
                </RouterLink>
              </h2>

              {isFlashSale && (
                <div
                  className="
                    inline-flex items-center gap-1 rounded-full
                    bg-red-100 px-2 py-0.5 text-[11px]
                    font-medium text-red-600
                  "
                >
                  <Iconify
                    icon="solar:fire-bold"
                    width={16}
                  />
                  Flash Sale
                </div>
              )}
            </div>

            {isFlashSale && flashSaleRemaining > 0 && (
              <div className="flex items-center gap-1 text-xs text-amber-700">
                <Iconify
                  icon="solar:clock-circle-bold"
                  width={14}
                />
                {flashSaleRemaining} left at this price
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-4">
        <div className="flex flex-col items-start gap-1">
          {isFlashSale && regularPriceValue > priceValue ? (
            <>
              <span className="text-xs text-gray-400 line-through">
                {fCurrency(regularPriceValue)}
              </span>

              <span className="text-sm font-bold text-red-600">
                {fCurrency(priceValue)}
              </span>

              <span className="text-xs font-semibold text-green-600">
                Save {fCurrency(regularPriceValue - priceValue)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold">
              {fCurrency(priceValue)}
            </span>
          )}
        </div>
      </td>

      {/* Quantity */}
      <td className="px-4 py-4">
        <div className="w-[100px] text-right">
          <NumberInput
            hideDivider
            value={Number(quantity)}
            onChange={(event, quantity) =>
              onChangeItemQuantity(cart_id, quantity)
            }
            min={1}
          />
        </div>
      </td>

      {/* Total */}
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-semibold">
        {fCurrency(priceValue * quantity)}
      </td>

      {/* Actions */}
      <td className="px-2 py-4">
        <div className="flex items-center justify-end gap-2">
          {isLogin && !isProductInWishlist && (
            <button
              type="button"
              onClick={() => onMoveToWishlist(row)}
              className="
                whitespace-nowrap rounded-md border border-gray-300
                px-3 py-1.5 text-sm font-medium
                transition hover:bg-gray-100
              "
            >
              To Wishlist
            </button>
          )}

          <button
            type="button"
            onClick={() => onDeleteCartItem(cart_id)}
            className="
              inline-flex h-10 w-10 items-center justify-center
              rounded-full text-red-600 transition
              hover:bg-red-50
            "
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </button>
        </div>
      </td>
    </tr>
  );
}