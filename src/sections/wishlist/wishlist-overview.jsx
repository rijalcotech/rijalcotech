// import {
//   Box,
//   Card,
//   Button,
//   CardHeader,
//   Typography,
//   LinearProgress,
// } from "@mui/material";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { addToCart, removeWishlistItem, getCartDataRequest } from "@/redux/actions";

// import { paths } from "@/routes/paths";
// import { RouterLink } from "@/routes/components";

// import { Iconify } from "@/components/iconify";
// import { EmptyContent } from "@/components/empty-content";
// import { toast } from "@/components/snackbar";

// import { WishlistProductList } from "./wishlist-product-list";

// import { addProductToCart, removeProductFromWishlist } from "@/api";

// // ----------------------------------------------------------------------

// export function WishlistOverview() {
//   const dispatch = useAppDispatch();

//   const { isLoading, items, totalItems } = useAppSelector(
//     (state) => state.wishlist
//   );

//   const isWishlistEmpty = !items.length;

//   const handleMoveToCart = async ({ product_id, variant_id, wishlist_id }) => {
//     const newProduct = {
//       product_id,
//       quantity: 1,
//       ...(variant_id && { variant_id }),
//     };

//     try {
//       const cartResponse = await addProductToCart([newProduct]);

//       console.log("[MOVE TO CART] API Response:", cartResponse);

//       await removeProductFromWishlist(wishlist_id);

//       dispatch(removeWishlistItem(wishlist_id));

//       // Refresh cart from server to get complete data
//       dispatch(getCartDataRequest());

//       toast.success("Product moved to cart!");
//     } catch (error) {
//       console.error("[MOVE TO CART] Error:", error);
//       toast.error("Couldn't move to cart! Try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await removeProductFromWishlist(id);

//       dispatch(removeWishlistItem(id));

//       toast.success("Product removed from wishlist!");
//     } catch (error) {
//       toast.error("Couldn't remove product! Try again.");
//     }
//   };

//   const renderLoading = () => (
//     <Box
//       sx={{
//         height: 340,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 320 }} />
//     </Box>
//   );

//   const renderEmpty = () => (
//     <EmptyContent
//       title="Wishlist is empty!"
//       description="Look like you have no items in your wishlist."
//       imgUrl="/assets/icons/empty/ic-cart.svg"
//       sx={{ height: 340 }}
//     />
//   );

//   return (
//     <>
//       <Card sx={{ mb: 3 }}>
//         <CardHeader
//           title={
//             <Typography variant="h6">
//               {`Wishlist `}
//               <Typography component="span" sx={{ color: "text.secondary" }}>
//                 ({totalItems} items)
//               </Typography>
//             </Typography>
//           }
//           sx={{ mb: 3 }}
//         />

//         {isLoading ? (
//           renderLoading()
//         ) : (
//           <>
//             {isWishlistEmpty ? (
//               renderEmpty()
//             ) : (
//               <WishlistProductList
//                 items={items}
//                 //
//                 onMoveToCart={handleMoveToCart}
//                 onDelete={handleDelete}
//               />
//             )}
//           </>
//         )}
//       </Card>

//       <Button
//         component={RouterLink}
//         href={paths.product.root}
//         color="inherit"
//         startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
//       >
//         Continue shopping
//       </Button>
//     </>
//   );
// }
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeWishlistItem, getCartDataRequest } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { EmptyContent } from "@/components/empty-content";
import { toast } from "@/components/snackbar";

import { WishlistProductList } from "./wishlist-product-list";

import { addProductToCart, removeProductFromWishlist } from "@/api";

// ----------------------------------------------------------------------

export function WishlistOverview() {
  const dispatch = useAppDispatch();

  const { isLoading, items, totalItems } = useAppSelector(
    (state) => state.wishlist
  );

  const isWishlistEmpty = !items.length;

  const handleMoveToCart = async ({ product_id, variant_id, wishlist_id }) => {
    const newProduct = {
      product_id,
      quantity: 1,
      ...(variant_id && { variant_id }),
    };

    try {
      const cartResponse = await addProductToCart([newProduct]);

      console.log("[MOVE TO CART] API Response:", cartResponse);

      await removeProductFromWishlist(wishlist_id);

      dispatch(removeWishlistItem(wishlist_id));

      // Refresh cart from server to get complete data
      dispatch(getCartDataRequest());

      toast.success("Product moved to cart!");
    } catch (error) {
      console.error("[MOVE TO CART] Error:", error);
      toast.error("Couldn't move to cart! Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeProductFromWishlist(id);

      dispatch(removeWishlistItem(id));

      toast.success("Product removed from wishlist!");
    } catch (error) {
      toast.error("Couldn't remove product! Try again.");
    }
  };

  const renderLoading = () => (
    <div className="h-[340px] flex items-center justify-center">
      <div className="w-full max-w-[320px]">
        <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-gray-800 rounded animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <EmptyContent
      title="Wishlist is empty!"
      description="Look like you have no items in your wishlist."
      imgUrl="/assets/icons/empty/ic-cart.svg"
      sx={{ height: 340 }}
    />
  );

  return (
    <>
      {/* Card */}
      <div className="bg-white w-full rounded-2xl shadow-sm mb-6">
        {/* CardHeader */}
        <div className="p-2">
          <h2 className="text-sm font-semibold leading-snug">
            {"Wishlist "}
            <span className="text-gray-500 font-normal">
              ({totalItems} items)
            </span>
          </h2>
        </div>

        {isLoading ? (
          renderLoading()
        ) : (
          <>
            {isWishlistEmpty ? (
              renderEmpty()
            ) : (
              <WishlistProductList
                items={items}
                onMoveToCart={handleMoveToCart}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </div>

      {/* Continue Shopping Button */}
      <RouterLink
        href={paths.product.root}
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors"
      >
        <Iconify icon="eva:arrow-ios-back-fill" className="w-4 h-4" />
        Continue shopping
      </RouterLink>
    </>
  );
}