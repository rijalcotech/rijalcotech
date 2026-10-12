// "use client";

// import { z as zod } from "zod";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//     Card,
//     CardContent,
//     Stack,
//     Box,
//     Typography,
//     MenuItem,
//     Divider,
//     Alert,
//     Button,
//     IconButton,
//     InputAdornment,
//     Link,
//     Backdrop,
//     CircularProgress,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { fCurrency } from "@/utils/format-number";

// import { Form, Field, schemaHelper } from "@/components/hook-form";
// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";

// import { useAppDispatch } from "@/redux/hooks";
// import { setUser, getCartDataRequest, resetCart } from "@/redux/actions";

// import { useGetStates, submitQuickOrder, verifyOtpAndCreateOrder, getLogisticCharge, calculateCart } from "@/api";

// import { OtpVerificationDialog } from "./otp-verification-dialog";

// // ----------------------------------------------------------------------

// const QuickOrderSchema = zod.object({
//     customer_name: zod
//         .string()
//         .min(1, { message: "Name is required!" })
//         .max(255, { message: "Name cannot exceed 255 characters" }),

//     customer_email: zod
//         .string()
//         .min(1, { message: "Email is required!" })
//         .email({ message: "Email must be a valid email address!" }),

//     customer_contact_info: zod
//         .string()
//         .min(1, { message: "Contact number is required!" })
//         .regex(/^\d{10}$/, { message: "Contact number must be exactly 10 digits!" }),

//     password: zod.string().optional(),

//     state_id: schemaHelper.nullableInput(
//         zod.string().min(1, { message: "State is required!" }),
//         { message: "State is required!" }
//     ),

//     district_id: schemaHelper.nullableInput(
//         zod.string().min(1, { message: "District is required!" }),
//         { message: "District is required!" }
//     ),

//     address: zod
//         .string()
//         .min(1, { message: "Address is required!" })
//         .max(500, { message: "Address cannot exceed 500 characters" }),

//     discount_code: zod.string().optional(),
//     remarks: zod.string().max(1000).optional(),
// });

// // ----------------------------------------------------------------------

// export function QuickOrderForm({ mode, buyNowProduct, buyNowQuantity, cartItems }) {
//     const WHATSAPP_ORDER_PHONE = "9779851212477";
//     const router = useRouter();
//     const dispatch = useAppDispatch();
//     const { states } = useGetStates();

//     const [districts, setDistricts] = useState([]);
//     const [logisticCharge, setLogisticCharge] = useState(0);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     // Cart Calculation State
//     const [cartCalculation, setCartCalculation] = useState(null);
//     const [isCalculating, setIsCalculating] = useState(false);
//     const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
//     const [discountError, setDiscountError] = useState("");
//     const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

//     // OTP State
//     const [otpDialogOpen, setOtpDialogOpen] = useState(false);
//     const [userEmail, setUserEmail] = useState("");
//     const [orderPreview, setOrderPreview] = useState(null);
//     const [isVerifying, setIsVerifying] = useState(false);
//     const [otpError, setOtpError] = useState("");
//     const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);
//     const [orderCustomerSnapshot, setOrderCustomerSnapshot] = useState(null);

//     // Redirect State
//     const [isRedirecting, setIsRedirecting] = useState(false);

//     const defaultValues = {
//         customer_name: "",
//         customer_contact_info: "",
//         customer_email: "",
//         password: "",
//         state_id: "",
//         district_id: "",
//         address: "",
//         discount_code: "",
//         remarks: "",
//     };

//     const methods = useForm({
//         resolver: zodResolver(QuickOrderSchema),
//         defaultValues,
//     });

//     const {
//         handleSubmit,
//         formState: { isSubmitting },
//     } = methods;

//     // Calculate subtotal
//     const calculateSubtotal = () => {
//         if (mode === "buyNow" && buyNowProduct) {
//             const regularPrice = buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
//             const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
//             const hasFlashSale =
//                 buyNowProduct.flash_sale_products && buyNowProduct.flash_sale_products.length > 0;

//             const finalPrice =
//                 hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
//                     ? flashSalePrice
//                     : regularPrice;

//             return buyNowQuantity * parseFloat(finalPrice);
//         }

//         if (mode === "cart" && cartItems) {
//             return cartItems.reduce((total, item) => {
//                 const itemPrice = parseFloat(item.price || 0);
//                 const itemQuantity = parseInt(item.quantity || 0);
//                 return total + itemPrice * itemQuantity;
//             }, 0);
//         }

//         return 0;
//     };

//     const subtotal = calculateSubtotal();
//     const totalAmount = logisticCharge + subtotal;

//     const formatAmount = (amount) => Number(amount || 0).toFixed(2);

//     const getStateNameById = (stateId) => {
//         const selectedState = states?.find((state) => String(state.state_id) === String(stateId));
//         return selectedState?.state_name || "";
//     };

//     const getDistrictNameById = (stateId, districtId) => {
//         const selectedState = states?.find((state) => String(state.state_id) === String(stateId));
//         const selectedDistrict = selectedState?.districts?.find(
//             (district) => String(district.district_id) === String(districtId)
//         );
//         return selectedDistrict?.district_name || "";
//     };

//     const getWhatsAppItems = () => {
//         if (mode === "buyNow" && buyNowProduct) {
//             const regularPrice = buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
//             const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
//             const hasFlashSale = buyNowProduct.flash_sale_products && buyNowProduct.flash_sale_products.length > 0;

//             const finalPrice =
//                 hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
//                     ? parseFloat(flashSalePrice)
//                     : parseFloat(regularPrice);

//             return [
//                 {
//                     name: buyNowProduct.name,
//                     quantity: buyNowQuantity,
//                     price: finalPrice,
//                 },
//             ];
//         }

//         if (mode === "cart" && cartItems?.length) {
//             return cartItems.map((item) => ({
//                 name: item.product_name || item.name || "Product",
//                 variant: item.variant_name,
//                 size: item.size || item.size_name || item.variant_size,
//                 color:
//                     item.color?.name ||
//                     item.color_name ||
//                     item.variant_color ||
//                     item.colour?.name,
//                 frontDesign: item.frontDesign?.name || item.front_design?.name || item.front_design_name,
//                 backDesign: item.backDesign?.name || item.back_design?.name || item.back_design_name,
//                 quantity: parseInt(item.quantity || 0),
//                 price: parseFloat(item.price || 0),
//             }));
//         }

//         return [];
//     };

//     const buildWhatsAppOrderMessage = (customerData) => {
//         const selectedStateName = getStateNameById(customerData?.state_id);
//         const selectedDistrictName = getDistrictNameById(customerData?.state_id, customerData?.district_id);
//         const whatsappItems = getWhatsAppItems();
//         const computedTotal =
//             mode === "cart" && cartCalculation?.total_amount
//                 ? cartCalculation.total_amount
//                 : totalAmount;

//         let message = "*NEW ORDER CONFIRMED - Rijalco Tech*\n\n";
//         message += `*Customer:* ${customerData?.customer_name || "N/A"}\n`;
//         message += `*Phone:* ${customerData?.customer_contact_info || "N/A"}\n`;
//         message += `*Email:* ${customerData?.customer_email || "N/A"}\n`;
//         message += `*Address:* ${customerData?.address || "N/A"}`;

//         if (selectedDistrictName || selectedStateName) {
//             message += `, ${selectedDistrictName}${selectedDistrictName && selectedStateName ? ", " : ""}${selectedStateName}`;
//         }

//         message += "\n\n";
//         message += "*Items:*\n";

//         whatsappItems.forEach((item, index) => {
//             message += `${index + 1}. ${item.name} (${item.quantity}x)\n`;
//             if (item.size) {
//                 message += `   - Size: ${item.size}\n`;
//             }
//             if (item.color) {
//                 message += `   - Color: ${item.color}\n`;
//             }
//             if (item.frontDesign) {
//                 message += `   - Front: ${item.frontDesign}\n`;
//             }
//             if (item.backDesign) {
//                 message += `   - Back: ${item.backDesign}\n`;
//             }
//             if (item.variant) {
//                 message += `   - Variant: ${item.variant}\n`;
//             }
//             message += `   - Price: Rs.${formatAmount(item.price * item.quantity)}\n\n`;
//         });

//         if (customerData?.remarks) {
//             message += `*Remarks:* ${customerData.remarks}\n\n`;
//         }

//         message += `*Total Amount: Rs.${formatAmount(computedTotal)}*`;

//         return message;
//     };

//     const openWhatsAppOrder = (customerData) => {
//         const message = buildWhatsAppOrderMessage(customerData);
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${WHATSAPP_ORDER_PHONE}?text=${encodedMessage}`;

//         const whatsappWindow = window.open(whatsappUrl, "_blank");

//         // Some browsers block async popups; fallback to same-tab navigation.
//         if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === "undefined") {
//             window.location.href = whatsappUrl;
//             return false;
//         }

//         return true;
//     };

//     const handleSelectState = (stateDistricts) => {
//         setDistricts(stateDistricts);
//     };

//     const handleSelectDistrict = async (districtId) => {
//         try {
//             const charge = await getLogisticCharge(districtId);
//             setLogisticCharge(charge.charge_amount);
//             // Recalculate with new logistic charge
//             await loadCartCalculation(appliedDiscountCode, charge.charge_amount);
//         } catch (error) {
//             toast.error("Couldn't fetch shipping charge! Try again.");
//         }
//     };

//     // Load cart calculation
//     const loadCartCalculation = async (discountCode = "", logisticChargeAmount = null) => {
//         // Only calculate for cart mode
//         if (mode !== "cart") return;

//         try {
//             setIsCalculating(true);
//             setDiscountError("");

//             const payload = {};
//             if (discountCode) {
//                 payload.discount_code = discountCode;
//             }
//             if (logisticChargeAmount !== null) {
//                 payload.logistic_charge = logisticChargeAmount;
//             } else if (logisticCharge) {
//                 payload.logistic_charge = logisticCharge;
//             }

//             const response = await calculateCart(payload);

//             if (response.success) {
//                 setCartCalculation(response.data);
//                 setAppliedDiscountCode(discountCode);
//             } else {
//                 setDiscountError(response.message || "Failed to calculate cart");
//             }
//         } catch (error) {
//             console.error("Cart calculation error:", error);
//             if (error?.message) {
//                 setDiscountError(error.message);
//             }
//             // Don't clear the cart calculation on error, keep showing previous data
//         } finally {
//             setIsCalculating(false);
//         }
//     };

//     // Handle discount code application
//     const handleApplyDiscount = async () => {
//         const code = methods.getValues("discount_code")?.trim().toUpperCase();

//         if (!code) {
//             setDiscountError("Please enter a discount code");
//             return;
//         }

//         setIsApplyingDiscount(true);
//         await loadCartCalculation(code);
//         setIsApplyingDiscount(false);
//     };

//     // Handle discount code removal
//     const handleRemoveDiscount = async () => {
//         methods.setValue("discount_code", "");
//         setAppliedDiscountCode("");
//         setDiscountError("");
//         await loadCartCalculation("");
//     };

//     // Load calculation on mount and when dependencies change
//     useEffect(() => {
//         if (mode === "cart" && cartItems?.length > 0) {
//             loadCartCalculation();
//         }
//     }, [mode, cartItems?.length]); // Only recalculate when mode changes or cart items count changes

//     // Build order items based on mode
//     const buildOrderItems = () => {
//         if (mode === "buyNow" && buyNowProduct) {
//             const regularPrice = buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
//             const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
//             const hasFlashSale =
//                 buyNowProduct.flash_sale_products && buyNowProduct.flash_sale_products.length > 0;

//             const finalPrice =
//                 hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
//                     ? flashSalePrice
//                     : regularPrice;

//             return [
//                 {
//                     item_type: "Product",
//                     item_id: buyNowProduct.product_id,
//                     quantity: buyNowQuantity,
//                     price: parseFloat(finalPrice),
//                 },
//             ];
//         }

//         if (mode === "cart" && cartItems) {
//             return cartItems.map((item) => ({
//                 item_type: item.variant_id ? "ProductVariant" : "Product",
//                 item_id: item.variant_id || item.product_id,
//                 quantity: parseInt(item.quantity),
//                 price: parseFloat(item.price),
//             }));
//         }

//         return [];
//     };

//     const onSubmit = handleSubmit(async (data) => {
//         try {
//             setErrorMessage("");
//             setOrderCustomerSnapshot(data);

//             const orderItems = buildOrderItems();

//             if (orderItems.length === 0) {
//                 setErrorMessage("No items to checkout");
//                 return;
//             }

//             const orderData = {
//                 customer_name: data.customer_name,
//                 customer_email: data.customer_email,
//                 customer_contact_info: data.customer_contact_info,
//                 password: data.password || undefined,
//                 state_id: parseInt(data.state_id),
//                 district_id: parseInt(data.district_id),
//                 address: data.address,
//                 order_items: orderItems,
//                 logistic_charge: logisticCharge,
//                 discount_code: data.discount_code?.trim().toUpperCase() || undefined,
//                 remarks: data.remarks || undefined,
//             };

//             const response = await submitQuickOrder(orderData);

//             if (response.success) {
//                 if (response.data.requires_otp) {
//                     // Existing customer - show OTP dialog
//                     setUserEmail(response.data.email);
//                     setOrderPreview(response.data.order_preview);
//                     setOtpExpiryMinutes(response.data.expires_in_minutes || 5);
//                     setOtpDialogOpen(true);
//                     toast.success(response.message || "OTP sent to your email!");
//                 } else {
//                     // New customer - order created
//                     // Set redirecting state immediately to keep loader visible
//                     setIsRedirecting(true);
//                     handleOrderSuccess(response.data, data);
//                 }
//             }
//         } catch (error) {
//             console.error("Quick order error:", error);
//             handleError(error);
//         }
//     });

//     const handleOrderSuccess = (data, customerData = null) => {
//         // Store token and login user
//         dispatch(setUser(data));

//         // If cart checkout, clear the cart
//         if (mode === "cart") {
//             dispatch(resetCart());
//         }

//         const finalCustomerData = customerData || orderCustomerSnapshot;
//         let openedInNewTab = false;
//         if (finalCustomerData) {
//             openedInNewTab = openWhatsAppOrder(finalCustomerData);
//         }

//         toast.success("Order placed successfully! You are now logged in.");

//         // If WhatsApp opened in a new tab, continue redirecting this tab to orders.
//         if (openedInNewTab || !finalCustomerData) {
//             window.setTimeout(() => {
//                 window.location.href = paths.order.root;
//             }, 800);
//         }
//     };

//     const handleError = (error) => {
//         if (error?.status === 422 || error?.status === 400) {
//             if (error?.message && typeof error.message === "object") {
//                 const errorMessages = Object.values(error.message)
//                     .flat()
//                     .filter((msg) => typeof msg === "string");
//                 setErrorMessage(errorMessages.join(", "));
//             } else if (error?.errors && typeof error.errors === "object") {
//                 const errorMessages = Object.values(error.errors)
//                     .flat()
//                     .filter((msg) => typeof msg === "string");
//                 setErrorMessage(errorMessages.join(", "));
//             } else if (error?.message && typeof error.message === "string") {
//                 setErrorMessage(error.message);
//             } else {
//                 setErrorMessage("Please check your form inputs and try again.");
//             }
//         } else if (error?.message && typeof error.message === "string") {
//             setErrorMessage(error.message);
//         } else {
//             setErrorMessage("An unexpected error occurred. Please try again.");
//         }
//     };

//     const handleVerifyOtp = async (otp) => {
//         try {
//             setIsVerifying(true);
//             setOtpError("");

//             if (!orderPreview) {
//                 setOtpError("Order data not found. Please try again.");
//                 return;
//             }

//             const verifyData = {
//                 email: userEmail,
//                 otp_code: otp,
//                 ...orderPreview,
//             };

//             const response = await verifyOtpAndCreateOrder(verifyData);

//             if (response.success) {
//                 setOtpDialogOpen(false);
//                 // Set redirecting state immediately to keep loader visible
//                 setIsRedirecting(true);
//                 handleOrderSuccess(response.data, orderCustomerSnapshot);
//             }
//         } catch (error) {
//             console.error("OTP verification error:", error);

//             if (error?.status === 422 || error?.status === 400) {
//                 if (error?.message && typeof error.message === "object") {
//                     const errorMessages = Object.values(error.message)
//                         .flat()
//                         .filter((msg) => typeof msg === "string");
//                     setOtpError(errorMessages.join(", "));
//                 } else if (error?.message && typeof error.message === "string") {
//                     setOtpError(error.message);
//                 } else {
//                     setOtpError("Invalid OTP. Please try again.");
//                 }
//             } else if (error?.message && typeof error.message === "string") {
//                 setOtpError(error.message);
//             } else {
//                 setOtpError("Invalid OTP. Please try again.");
//             }
//         } finally {
//             setIsVerifying(false);
//         }
//     };

//     const handleCloseOtpDialog = () => {
//         setOtpDialogOpen(false);
//         setOtpError("");
//         setOrderPreview(null);
//     };

//     return (
//         <>
//             {!isRedirecting && (
//                 <>
//                     <Box
//                         sx={{
//                             mb: 3,
//                             p: 2,
//                             borderRadius: 2,
//                             bgcolor: "background.neutral",
//                             textAlign: "center",
//                             border: (theme) => `1px dashed ${theme.palette.divider}`,
//                         }}
//                     >
//                         <Typography variant="body2" color="text.secondary">
//                             Already have an account?{" "}
//                             <Link
//                                 component={RouterLink}
//                                 href={paths.auth.signIn}
//                                 variant="subtitle2"
//                                 color="primary"
//                                 underline="hover"
//                                 sx={{ fontWeight: 600 }}
//                             >
//                                 Login here
//                             </Link>
//                         </Typography>
//                     </Box>

//                     <Card sx={{ boxShadow: 2 }}>
//                         <CardContent>
//                             <Typography variant="h5" sx={{ mb: 3 }}>
//                                 Delivery & Payment Details
//                             </Typography>

//                             <Form methods={methods} onSubmit={onSubmit}>
//                                 <Stack spacing={3}>
//                                     {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

//                                     {/* Customer Information */}
//                                     <Box>
//                                         <Typography variant="subtitle1" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
//                                             Customer Information
//                                         </Typography>
//                                         <Stack spacing={2}>
//                                             <Box sx={{ display: "flex", gap: 2 }}>

//                                                 <Field.Text name="customer_name" label="Full Name *" size="small" />
//                                                 <Field.Text name="customer_contact_info" label="Phone *" type="text" size="small" />
//                                             </Box>
//                                             <Box sx={{ display: "flex", gap: 2 }}>
//                                                 <Field.Text name="customer_email" label="Email *" type="email" size="small" />
//                                                 <Field.Text
//                                                     name="password"
//                                                     label="Password (for new customers)"
//                                                     type={showPassword ? "text" : "password"}
//                                                     size="small"
//                                                     InputProps={{
//                                                         endAdornment: (
//                                                             <InputAdornment position="end">
//                                                                 <IconButton
//                                                                     onClick={() => setShowPassword(!showPassword)}
//                                                                     edge="end"
//                                                                 >
//                                                                     <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
//                                                                 </IconButton>
//                                                             </InputAdornment>
//                                                         ),
//                                                     }}
//                                                 />
//                                             </Box>
//                                         </Stack>
//                                     </Box>

//                                     <Divider />

//                                     {/* Delivery Address */}
//                                     <Box>
//                                         <Typography variant="subtitle1" gutterBottom fontWeight={600}>
//                                             Delivery Address
//                                         </Typography>
//                                         <Stack spacing={2}>
//                                             <Box sx={{ display: "flex", gap: 2 }}>
//                                                 <Field.Select name="state_id" label="State *" size="small">
//                                                     <MenuItem value="">Select State</MenuItem>
//                                                     <Divider />
//                                                     {states?.map(({ state_id, state_name, districts }) => (
//                                                         <MenuItem
//                                                             key={state_id}
//                                                             value={String(state_id)}
//                                                             onClick={() => handleSelectState(districts)}
//                                                         >
//                                                             {state_name}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Field.Select>

//                                                 <Field.Select name="district_id" label="District *" size="small">
//                                                     <MenuItem value="">Select District</MenuItem>
//                                                     <Divider />
//                                                     {districts?.map(({ district_id, district_name }) => (
//                                                         <MenuItem
//                                                             key={district_id}
//                                                             value={String(district_id)}
//                                                             onClick={() => handleSelectDistrict(district_id)}
//                                                         >
//                                                             {district_name}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Field.Select>
//                                             </Box>
//                                             <Field.Text
//                                                 name="address"
//                                                 label="Detailed Address *"
//                                                 multiline
//                                                 rows={2}
//                                                 size="small"
//                                             />
//                                         </Stack>
//                                     </Box>

//                                     <Divider />

//                                     {/* Order Summary */}
//                                     <Box>
//                                         <Typography variant="subtitle1" gutterBottom fontWeight={600}>
//                                             Order Summary
//                                         </Typography>
//                                         <Stack spacing={2}>
//                                             {mode === "cart" && cartCalculation ? (
//                                                 <>
//                                                     {/* Flash Sale Banner */}
//                                                     {cartCalculation.flash_sale?.has_flash_sale_items && (
//                                                         <Alert severity="success" icon={<Iconify icon="solar:fire-bold" />}>
//                                                             🔥 You're saving {fCurrency(cartCalculation.flash_sale.total_flash_sale_savings)} with Flash Sale!
//                                                         </Alert>
//                                                     )}

//                                                     {/* Items Count */}
//                                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                         <Typography variant="body2" color="text.secondary">
//                                                             Items ({cartCalculation.items_count}):
//                                                         </Typography>
//                                                         <Typography variant="subtitle2">{fCurrency(cartCalculation.subtotal)}</Typography>
//                                                     </Box>

//                                                     {/* Discount */}
//                                                     {cartCalculation.discount?.amount > 0 && (
//                                                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                             <Typography variant="body2" color="success.main">
//                                                                 Discount {cartCalculation.discount_code?.code ? `(${cartCalculation.discount_code.code})` : ''}:
//                                                             </Typography>
//                                                             <Typography variant="subtitle2" color="success.main">
//                                                                 -{fCurrency(cartCalculation.discount.amount)}
//                                                             </Typography>
//                                                         </Box>
//                                                     )}

//                                                     {/* After Discount */}
//                                                     {cartCalculation.discount?.amount > 0 && (
//                                                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 After Discount:
//                                                             </Typography>
//                                                             <Typography variant="subtitle2">{fCurrency(cartCalculation.amount_after_discount)}</Typography>
//                                                         </Box>
//                                                     )}

//                                                     {/* Shipping */}
//                                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                         <Typography variant="body2" color="text.secondary">
//                                                             Shipping:
//                                                         </Typography>
//                                                         <Typography variant="subtitle2">
//                                                             {cartCalculation.additional_charges_total > 0
//                                                                 ? fCurrency(cartCalculation.additional_charges_total)
//                                                                 : "Free"}
//                                                         </Typography>
//                                                     </Box>

//                                                     {/* Tax */}
//                                                     {cartCalculation.tax?.applied && (
//                                                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 {cartCalculation.tax.tax_name} ({cartCalculation.tax.percentage}%)
//                                                                 {cartCalculation.tax.price_includes_tax ? ' (Included)' : ''}:
//                                                             </Typography>
//                                                             <Typography variant="subtitle2">
//                                                                 {fCurrency(cartCalculation.tax.tax_amount)}
//                                                             </Typography>
//                                                         </Box>
//                                                     )}

//                                                     <Divider />

//                                                     {/* Total */}
//                                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                         <Typography variant="h6">Total:</Typography>
//                                                         <Typography variant="h5" color="error">
//                                                             {fCurrency(cartCalculation.total_amount)}
//                                                         </Typography>
//                                                     </Box>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     {/* Buy Now Mode - Simple Calculation */}
//                                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                         <Typography variant="body2" color="text.secondary">
//                                                             Subtotal:
//                                                         </Typography>
//                                                         <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
//                                                     </Box>

//                                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                         <Typography variant="body2" color="text.secondary">
//                                                             Shipping:
//                                                         </Typography>
//                                                         <Typography variant="subtitle2">
//                                                             {logisticCharge ? fCurrency(logisticCharge) : "Free"}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Divider />

//                                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                         <Typography variant="h6">Total:</Typography>
//                                                         <Typography variant="h5" color="error">
//                                                             {fCurrency(totalAmount)}
//                                                         </Typography>
//                                                     </Box>
//                                                 </>
//                                             )}

//                                             {/* Discount Code Input with Apply/Remove Button */}
//                                             {mode === "cart" && (
//                                                 <Box>
//                                                     <Stack direction="row" spacing={1} alignItems="flex-start">
//                                                         <Field.Text
//                                                             name="discount_code"
//                                                             label="Discount Code (optional)"
//                                                             size="small"
//                                                             placeholder="Enter code"
//                                                             disabled={isApplyingDiscount || isCalculating}
//                                                             sx={{ flex: 1 }}
//                                                         />
//                                                         {appliedDiscountCode ? (
//                                                             <Button
//                                                                 variant="outlined"
//                                                                 color="error"
//                                                                 size="medium"
//                                                                 onClick={handleRemoveDiscount}
//                                                                 disabled={isCalculating}
//                                                                 sx={{ mt: 0.5 }}
//                                                             >
//                                                                 Remove
//                                                             </Button>
//                                                         ) : (
//                                                             <LoadingButton
//                                                                 variant="contained"
//                                                                 size="medium"
//                                                                 onClick={handleApplyDiscount}
//                                                                 loading={isApplyingDiscount}
//                                                                 disabled={isCalculating}
//                                                                 sx={{ mt: 0.5 }}
//                                                             >
//                                                                 Apply
//                                                             </LoadingButton>
//                                                         )}
//                                                     </Stack>
//                                                     {discountError && (
//                                                         <Alert severity="error" sx={{ mt: 1 }}>
//                                                             {discountError}
//                                                         </Alert>
//                                                     )}
//                                                     {appliedDiscountCode && cartCalculation?.discount_code && (
//                                                         <Alert severity="success" sx={{ mt: 1 }}>
//                                                             ✅ {appliedDiscountCode} applied — Saving {fCurrency(cartCalculation.discount_code.calculated_amount)}
//                                                             {cartCalculation.discount_info?.description && (
//                                                                 <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
//                                                                     {cartCalculation.discount_info.description}
//                                                                 </Typography>
//                                                             )}
//                                                         </Alert>
//                                                     )}
//                                                 </Box>
//                                             )}

//                                             <Field.Text
//                                                 name="remarks"
//                                                 label="Special Instructions (optional)"
//                                                 multiline
//                                                 rows={2}
//                                                 size="small"
//                                             />
//                                         </Stack>
//                                     </Box>

//                                     <Divider />

//                                     {/* Submit Buttons */}
//                                     <Stack direction="row" spacing={2} justifyContent="flex-end">
//                                         <Button
//                                             variant="outlined"
//                                             color="inherit"
//                                             size="large"
//                                             onClick={() => router.back()}
//                                         >
//                                             Cancel
//                                         </Button>
//                                         <LoadingButton
//                                             type="submit"
//                                             variant="contained"
//                                             color="primary"
//                                             size="large"
//                                             loading={isSubmitting}
//                                             loadingIndicator="Placing order..."
//                                         >
//                                             Place Order
//                                         </LoadingButton>
//                                     </Stack>
//                                 </Stack>
//                             </Form>
//                         </CardContent>
//                     </Card>
//                 </>
//             )}

//             {/* OTP Verification Dialog */}
//             <OtpVerificationDialog
//                 open={otpDialogOpen}
//                 onClose={handleCloseOtpDialog}
//                 email={userEmail}
//                 expiryMinutes={otpExpiryMinutes}
//                 onVerify={handleVerifyOtp}
//                 isVerifying={isVerifying}
//                 error={otpError}
//             />

//             {/* Full page loader during order creation and redirect */}
//             <Backdrop
//                 open={isSubmitting || isRedirecting}
//                 sx={{
//                     color: '#fff',
//                     zIndex: (theme) => theme.zIndex.drawer + 1,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: 2,
//                 }}
//             >
//                 <CircularProgress color="inherit" size={60} />
//                 <Typography variant="h6">
//                     {isRedirecting ? 'Redirecting to orders...' : 'Creating your order...'}
//                 </Typography>
//             </Backdrop>
//         </>
//     );
// }
"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { fCurrency } from "@/utils/format-number";

import { Form, Field, schemaHelper } from "@/components/hook-form";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import {
    useGetStates,
    submitQuickOrder,
    verifyOtpAndCreateOrder,
    getLogisticCharge,
    calculateCart,
} from "@/api";

import { OtpVerificationDialog } from "./otp-verification-dialog";

import { useAppDispatch } from "@/redux/hooks";
import { setUser, resetCart } from "@/redux/actions";

// ----------------------------------------------------------------------

export function QuickOrderForm({
    mode,
    buyNowProduct,
    buyNowQuantity,
    cartItems,
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { states } = useGetStates();

    const [districts, setDistricts] = useState([]);
    const [logisticCharge, setLogisticCharge] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [cartCalculation, setCartCalculation] = useState(null);
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [orderPreview, setOrderPreview] = useState(null);
    const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

    const defaultValues = {
        customer_name: "",
        customer_contact_info: "",
        customer_email: "",
        password: "",
        state_id: "",
        district_id: "",
        address: "",
        discount_code: "",
        remarks: "",
    };

    const methods = useForm({
        resolver: zodResolver(
            zod.object({
                customer_name: zod.string().min(1),
                customer_email: zod.string().email(),
                customer_contact_info: zod.string().min(10),
                state_id: schemaHelper.nullableInput(zod.string().min(1)),
                district_id: schemaHelper.nullableInput(zod.string().min(1)),
                address: zod.string().min(1),
                password: zod.string().optional(),
                discount_code: zod.string().optional(),
                remarks: zod.string().optional(),
            })
        ),
        defaultValues,
    });

    const { handleSubmit, formState, watch, setValue, setError } = methods;

    const selectedStateId = watch("state_id");
    const selectedDistrictId = watch("district_id");

    // Update districts when state_id changes
    useEffect(() => {
        if (selectedStateId && states) {
            const selectedState = states.find(
                (s) => String(s.state_id) === String(selectedStateId)
            );
            if (selectedState) {
                setDistricts(selectedState.districts || []);
            } else {
                setDistricts([]);
            }
        } else {
            setDistricts([]);
        }
        setValue("district_id", "");
    }, [selectedStateId, states, setValue]);

    // Update shipping charge when district_id changes
    useEffect(() => {
        const fetchLogisticCharge = async () => {
            if (selectedDistrictId) {
                try {
                    const charge = await getLogisticCharge(selectedDistrictId);
                    if (charge && typeof charge.charge_amount !== "undefined") {
                        setLogisticCharge(charge.charge_amount);
                    }
                } catch (error) {
                    console.error("Failed to fetch logistic charge:", error);
                    toast.error("Couldn't fetch shipping charge! Try again.");
                }
            } else {
                setLogisticCharge(0);
            }
        };
        fetchLogisticCharge();
    }, [selectedDistrictId]);

    // Calculate subtotal
    const calculateSubtotal = () => {
        if (mode === "buyNow" && buyNowProduct) {
            const regularPrice = buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
            const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
            const hasFlashSale =
                buyNowProduct.flash_sale_products && buyNowProduct.flash_sale_products.length > 0;

            const finalPrice =
                hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
                    ? flashSalePrice
                    : regularPrice;

            return buyNowQuantity * parseFloat(finalPrice);
        }

        if (mode === "cart" && cartItems) {
            return cartItems.reduce((total, item) => {
                const itemPrice = parseFloat(item.price || 0);
                const itemQuantity = parseInt(item.quantity || 0);
                return total + itemPrice * itemQuantity;
            }, 0);
        }

        return 0;
    };

    const subtotal = calculateSubtotal();

    const totalAmount = logisticCharge + subtotal;

    // Build order items based on mode
    const buildOrderItems = () => {
        if (mode === "buyNow" && buyNowProduct) {
            const regularPrice = buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
            const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
            const hasFlashSale =
                buyNowProduct.flash_sale_products && buyNowProduct.flash_sale_products.length > 0;

            const finalPrice =
                hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
                    ? flashSalePrice
                    : regularPrice;

            return [
                {
                    item_type: "Product",
                    item_id: buyNowProduct.product_id,
                    quantity: buyNowQuantity,
                    price: parseFloat(finalPrice),
                },
            ];
        }

        if (mode === "cart" && cartItems) {
            return cartItems.map((item) => ({
                item_type: item.variant_id ? "ProductVariant" : "Product",
                item_id: item.variant_id || item.product_id,
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price),
            }));
        }

        return [];
    };

    const handleOrderSuccess = (orderData) => {
        // Store token and customer in localStorage for persistence
        if (orderData.token) {
            localStorage.setItem("token", orderData.token);
        }
        if (orderData.customer) {
            localStorage.setItem("customer", JSON.stringify(orderData.customer));
        }

        // Store user and token details in Redux to log the customer in
        dispatch(setUser(orderData));

        // If cart checkout, clear the cart in Redux
        if (mode === "cart") {
            dispatch(resetCart());
        }

        toast.success("Order placed successfully! You are now logged in.");
        setTimeout(() => {
            const orderId = orderData.order?.order_id || orderData.order_id;
            if (orderId) {
                router.push(`/order/${orderId}`);
            } else {
                router.push("/order");
            }
        }, 1500);
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            setErrorMessage("");

            const orderItems = buildOrderItems();
            if (orderItems.length === 0) {
                setErrorMessage("No items to checkout");
                return;
            }

            const orderData = {
                customer_name: data.customer_name,
                customer_email: data.customer_email,
                customer_contact_info: data.customer_contact_info,
                password: data.password || undefined,
                state_id: parseInt(data.state_id),
                district_id: parseInt(data.district_id),
                address: data.address,
                order_items: orderItems,
                logistic_charge: logisticCharge,
                remarks: data.remarks || undefined,
            };

            const res = await submitQuickOrder(orderData);

            if (res.success) {
                if (res.data.requires_otp) {
                    setUserEmail(res.data.email);
                    setOrderPreview(res.data.order_preview);
                    setOtpExpiryMinutes(res.data.expires_in_minutes || 5);
                    setOtpDialogOpen(true);
                    toast.success("OTP sent to your email!");
                } else {
                    handleOrderSuccess(res.data);
                }
            }
        } catch (err) {
            console.error("Order submission error:", err);
            if (err?.status === 422 && err?.data && typeof err.data === "object") {
                const validationErrors = err.data;
                Object.keys(validationErrors).forEach((field) => {
                    const messages = validationErrors[field];
                    if (Array.isArray(messages) && messages.length > 0) {
                        setError(field, {
                            type: "server",
                            message: messages[0],
                        });
                    }
                });
                setErrorMessage("Validation failed. Please check the errors below.");
            } else if (err?.message && typeof err.message === "string") {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Something went wrong");
            }
        }
    });

    const handleVerifyOtp = async (otp) => {
        try {
            setIsVerifying(true);
            setOtpError("");

            if (!orderPreview) {
                setOtpError("Order data not found. Please try again.");
                return;
            }

            const verifyData = {
                email: userEmail,
                otp_code: otp,
                ...orderPreview,
            };

            const response = await verifyOtpAndCreateOrder(verifyData);

            if (response.success) {
                setOtpDialogOpen(false);
                handleOrderSuccess(response.data);
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            if (error?.message && typeof error.message === "string") {
                setOtpError(error.message);
            } else {
                setOtpError("Invalid OTP. Please try again.");
            }
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <>
            {/* LOGIN INFO */}
            <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-center text-sm">
                Already have account?{" "}
                <RouterLink
                    href="/login"
                    className="font-semibold text-purple-950 hover:underline"
                >
                    Login here
                </RouterLink>
            </div>

            {/* MAIN CARD */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Delivery & Payment Details
                    </h2>

                    <Form methods={methods} onSubmit={onSubmit}>
                        <div className="space-y-6">
                            {errorMessage && (
                                <div className="rounded-lg bg-red-50 p-2 text-sm text-red-600">
                                    {errorMessage}
                                </div>
                            )}

                            {/* CUSTOMER */}
                            <div>
                                <h3 className="mb-3 font-medium text-gray-800">
                                    Customer Info
                                </h3>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Field.Text name="customer_name" label="Full Name" />
                                    <Field.Text name="customer_contact_info" label="Phone" />
                                    <Field.Text name="customer_email" label="Email" />

                                    <div className="relative">
                                        <Field.Text
                                            name="password"
                                            label="Password (required for new customers)"
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-9 text-sm text-gray-500"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div>
                                <h3 className="mb-3 font-medium text-gray-800">
                                    Delivery Address
                                </h3>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Field.Select name="state_id" label="State">
                                        <option value="">Select State</option>
                                        {states?.map((s) => (
                                            <option key={s.state_id} value={s.state_id}>
                                                {s.state_name}
                                            </option>
                                        ))}
                                    </Field.Select>

                                    <Field.Select name="district_id" label="District">
                                        <option value="">Select District</option>
                                        {districts?.map((d) => (
                                            <option key={d.district_id} value={d.district_id}>
                                                {d.district_name}
                                            </option>
                                        ))}
                                    </Field.Select>
                                </div>

                                <div className="mt-3">
                                    <Field.Text
                                        name="address"
                                        label="Full Address"
                                        multiline
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {/* SUMMARY */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 gap-3">
                                <h3 className="mb-3 font-medium text-gray-800">
                                    Order Summary
                                </h3>

                                <div className="flex justify-between text-sm mb-3">
                                    <span>Subtotal</span>
                                    <span>{fCurrency(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-sm mb-1">
                                    <span>Shipping</span>
                                    <span>{logisticCharge ? fCurrency(logisticCharge) : "Free"}</span>
                                </div>

                                <div className="my-2 border-t" />

                                <div className="flex justify-between font-semibold text-purple-950">
                                    <span>Total</span>
                                    <span>{fCurrency(totalAmount)}</span>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={formState.isSubmitting}
                                    className="rounded-xl bg-purple-950 px-5 py-2 text-sm font-medium text-white hover:bg-purple-900 disabled:opacity-60"
                                >
                                    {formState.isSubmitting ? "Placing..." : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            {/* OTP */}
            <OtpVerificationDialog
                open={otpDialogOpen}
                onClose={() => setOtpDialogOpen(false)}
                email={userEmail}
                onVerify={handleVerifyOtp}
                isVerifying={isVerifying}
                error={otpError}
            />
        </>
    );
}