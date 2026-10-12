// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import { Container, Typography, Alert, CircularProgress, Box } from "@mui/material";

// import { useRouter } from "@/routes/hooks";
// import { paths } from "@/routes/paths";

// import { useAppSelector } from "@/redux/hooks";

// import { BuyNowProductDisplay } from "../buy-now-product-display";
// import { CartItemsDisplay } from "../cart-items-display";
// import { QuickOrderForm } from "../quick-order-form";

// // ----------------------------------------------------------------------

// export function CheckoutView() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [checkoutMode, setCheckoutMode] = useState(null); // 'buyNow' | 'cart'
//     const [buyNowProduct, setBuyNowProduct] = useState(null);
//     const [buyNowQuantity, setBuyNowQuantity] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Only access cart from Redux when in cart mode
//     const { items: cartItems } = useAppSelector((state) => state.cart);

//     useEffect(() => {
//         const isBuyNow = searchParams.get("buyNow") === "true";
//         const productSlug = searchParams.get("productSlug");
//         const quantity = searchParams.get("quantity");

//         if (isBuyNow && productSlug) {
//             // Buy Now mode - don't need cart
//             setCheckoutMode("buyNow");
//             setBuyNowQuantity(parseInt(quantity) || 1);

//             // Fetch product details
//             fetchProductForBuyNow(productSlug);
//         } else {
//             // Cart checkout mode
//             setCheckoutMode("cart");

//             if (!cartItems || cartItems.length === 0) {
//                 setError("Your cart is empty");
//                 setTimeout(() => {
//                     router.push(paths.cart);
//                 }, 2000);
//             } else {
//                 setIsLoading(false);
//             }
//         }
//     }, [searchParams, cartItems, router]);



//     const fetchProductForBuyNow = async (productSlug) => {
//         try {
//             setIsLoading(true);
//             setError("");

//             // Import product API function
//             const { getProductDetails } = await import("@/api");

//             const product = await getProductDetails(productSlug);
//             // console.log(product, "hahaha")
//             if (product) {
//                 setBuyNowProduct(product);
//             } else {
//                 setError("Product not found");
//                 setTimeout(() => {
//                     router.push(paths.home);
//                 }, 2000);
//             }
//         } catch (err) {
//             console.error("Error fetching product:", err);
//             setError("Failed to load product. Redirecting...");
//             setTimeout(() => {
//                 router.push(paths.home);
//             }, 2000);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleQuantityChange = (newQuantity) => {
//         setBuyNowQuantity(newQuantity);
//     };

//     if (isLoading) {
//         return (
//             <Container sx={{ py: 8, textAlign: "center" }}>
//                 <CircularProgress />
//                 <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
//                     Loading checkout...
//                 </Typography>
//             </Container>
//         );
//     }

//     if (error) {
//         return (
//             <Container sx={{ py: 8 }}>
//                 <Alert severity="error">{error}</Alert>
//             </Container>
//         );
//     }

//     return (
//         <Container maxWidth="md" sx={{ py: 5 }}>
//             <Typography variant="h3" sx={{ mb: 4 }}>
//                 Checkout
//             </Typography>

//             {checkoutMode === "buyNow" && buyNowProduct && (
//                 <Box sx={{ mb: 4 }}>
//                     <Typography variant="h5" sx={{ mb: 2 }}>
//                         Your Selected Item
//                     </Typography>
//                     <BuyNowProductDisplay
//                         product={buyNowProduct}
//                         quantity={buyNowQuantity}
//                         onQuantityChange={handleQuantityChange}
//                     />
//                 </Box>
//             )}

//             {checkoutMode === "cart" && cartItems && cartItems.length > 0 && (
//                 <Box sx={{ mb: 4 }}>
//                     <Typography variant="h5" sx={{ mb: 2 }}>
//                         Your Cart Items ({cartItems.length})
//                     </Typography>
//                     <CartItemsDisplay items={cartItems} />
//                 </Box>
//             )}

//             <QuickOrderForm
//                 mode={checkoutMode}
//                 buyNowProduct={buyNowProduct}
//                 buyNowQuantity={buyNowQuantity}
//                 cartItems={cartItems}
//             />
//         </Container>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import { useAppSelector } from "@/redux/hooks";

import { BuyNowProductDisplay } from "../buy-now-product-display";
import { CartItemsDisplay } from "../cart-items-display";
import { QuickOrderForm } from "../quick-order-form";

// ----------------------------------------------------------------------

export function CheckoutView() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [checkoutMode, setCheckoutMode] = useState(null); // 'buyNow' | 'cart'
    const [buyNowProduct, setBuyNowProduct] = useState(null);
    const [buyNowQuantity, setBuyNowQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Only access cart from Redux when in cart mode
    const { items: cartItems } = useAppSelector((state) => state.cart);

    useEffect(() => {
        const isBuyNow = searchParams.get("buyNow") === "true";
        const productSlug = searchParams.get("productSlug");
        const quantity = searchParams.get("quantity");

        if (isBuyNow && productSlug) {
            // Buy Now mode
            setCheckoutMode("buyNow");
            setBuyNowQuantity(parseInt(quantity) || 1);

            // Fetch product details
            fetchProductForBuyNow(productSlug);
        } else {
            // Cart checkout mode
            setCheckoutMode("cart");

            if (!cartItems || cartItems.length === 0) {
                setError("Your cart is empty");

                setTimeout(() => {
                    router.push(paths.cart);
                }, 2000);
            } else {
                setIsLoading(false);
            }
        }
    }, [searchParams, cartItems, router]);

    const fetchProductForBuyNow = async (productSlug) => {
        try {
            setIsLoading(true);
            setError("");

            // Import product API function
            const { getProductDetails } = await import("@/api");

            const product = await getProductDetails(productSlug);

            if (product) {
                setBuyNowProduct(product);
            } else {
                setError("Product not found");

                setTimeout(() => {
                    router.push(paths.home);
                }, 2000);
            }
        } catch (err) {
            console.error("Error fetching product:", err);

            setError("Failed to load product. Redirecting...");

            setTimeout(() => {
                router.push(paths.home);
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuantityChange = (newQuantity) => {
        setBuyNowQuantity(newQuantity);
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="py-20">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 text-center">
                    {/* Spinner */}
                    <div
                        className="
              h-10 w-10 animate-spin rounded-full
              border-4 border-gray-200 border-t-black
            "
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading checkout...
                    </p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="py-20">
                <div className="mx-auto max-w-4xl px-4">
                    <div
                        className="
              rounded-xl border border-red-200
              bg-red-50 px-4 py-3
              text-sm text-red-700
            "
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="mx-auto max-w-5xl px-4">
                {/* Heading */}
                <h1 className="mb-8 text-3xl font-bold tracking-tight">
                    Checkout
                </h1>

                {/* Buy Now */}
                {checkoutMode === "buyNow" && buyNowProduct && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-xl font-semibold">
                            Your Selected Item
                        </h2>

                        <BuyNowProductDisplay
                            product={buyNowProduct}
                            quantity={buyNowQuantity}
                            onQuantityChange={handleQuantityChange}
                        />
                    </div>
                )}

                {/* Cart Items */}
                {checkoutMode === "cart" &&
                    cartItems &&
                    cartItems.length > 0 && (
                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-semibold">
                                Your Cart Items ({cartItems.length})
                            </h2>

                            <CartItemsDisplay items={cartItems} />
                        </div>
                    )}

                {/* Checkout Form */}
                <QuickOrderForm
                    mode={checkoutMode}
                    buyNowProduct={buyNowProduct}
                    buyNowQuantity={buyNowQuantity}
                    cartItems={cartItems}
                />
            </div>
        </div>
    );
}