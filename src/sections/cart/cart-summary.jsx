// import { z as zod } from "zod";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Box,
//   Card,
//   Stack,
//   Divider,
//   CardHeader,
//   Typography,
//   InputAdornment,
//   Button,
//   Alert,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// import { useAppSelector, useAppDispatch } from "@/redux/hooks";
// import { setDiscount, removeDiscount } from "@/redux/actions";

// import { fCurrency } from "@/utils/format-number";

// import { Form, Field } from "@/components/hook-form";
// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";

// import { calculateCart } from "@/api";

// // ----------------------------------------------------------------------

// export const DiscountCodeSchema = zod.object({
//   discount_code: zod.string().min(1, { message: "Discount code is required!" }),
// });

// export function CartSummary({ isAddressSelected, selectedAddressId }) {
//   const dispatch = useAppDispatch();

//   const { total, subtotal, shipping, discount, items } = useAppSelector(
//     (state) => state.cart
//   );

//   const { isLogin } = useAppSelector((state) => state.auth);

//   const [calculation, setCalculation] = useState(null);
//   const [isCalculating, setIsCalculating] = useState(false);

//   const rowStyles = {
//     display: "flex",
//   };

//   const defaultValues = {
//     discount_code: "",
//   };

//   const methods = useForm({
//     resolver: zodResolver(DiscountCodeSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { isSubmitting },
//   } = methods;

//   const runCalculation = async (discountCode) => {
//     if (!isLogin) return;

//     // Don't call calculate API if cart is empty
//     if (!items || items.length === 0) {
//       setCalculation(null);
//       return;
//     }

//     try {
//       setIsCalculating(true);

//       // Ensure discount_code is always a string
//       const safeDiscountCode = typeof discountCode === 'string' ? discountCode :
//         (typeof discountCode === 'object' && discountCode?.code ? String(discountCode.code) : undefined);

//       const payload = {
//         ...(safeDiscountCode ? { discount_code: safeDiscountCode } : {}),
//         ...(isAddressSelected && selectedAddressId && selectedAddressId !== "guest-address" ? { customer_address_id: selectedAddressId } : {}),
//       };

//       const response = await calculateCart(payload);

//       if (response?.success && response?.data) {
//         setCalculation(response.data);
//       }
//     } catch (error) {
//       if (discountCode) {
//         toast.error(error?.message || "Couldn't apply discount code! Please try again.");
//       }
//     } finally {
//       setIsCalculating(false);
//     }
//   };

//   useEffect(() => {
//     runCalculation(discount?.code || undefined);
//   }, [isLogin, isAddressSelected, selectedAddressId, subtotal, items?.length]);

//   const handleRemoveDiscount = async () => {
//     dispatch(removeDiscount());
//     await runCalculation(undefined);
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const discountCode = data.discount_code?.trim()?.toUpperCase();
//       const payload = {
//         discount_code: discountCode,
//         ...(isAddressSelected && selectedAddressId && selectedAddressId !== "guest-address" ? { customer_address_id: selectedAddressId } : {}),
//       };

//       const response = await calculateCart(payload);

//       if (!response?.success || !response?.data) {
//         toast.error(response?.message || "Couldn't apply discount code! Please try again.");
//         return;
//       }

//       setCalculation(response.data);

//       dispatch(setDiscount(response.data));

//       reset();

//       toast.success("Discount applied!");
//     } catch (error) {
//       toast.error(error?.message || "Couldn't apply discount code! Please try again.");
//     }
//   });
//   console.log('CartSummary - calculation:', calculation);
//   const subtotalAmount = calculation?.subtotal ?? subtotal;
//   const taxableAmount = calculation?.tax?.taxable_amount ?? subtotal;
//   const discountAmount = calculation?.discount?.amount ?? discount?.amount ?? 0;
//   const shippingAmount = calculation?.additional_charges_total ?? shipping;
//   const totalAmount = calculation?.total_amount ?? total;

//   const extractDiscountCode = (value) => {
//     if (!value) return "";

//     if (typeof value === "string") return value;

//     if (typeof value === "object") {
//       if (typeof value.code === "string") return value.code;
//       if (typeof value.discount_code === "string") return value.discount_code;
//       return "";
//     }

//     return "";
//   };

//   const appliedDiscountCode =
//     extractDiscountCode(calculation?.discount_code) || extractDiscountCode(discount?.code);

//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardHeader title="Order summary" />

//       <Stack spacing={2} sx={{ p: 3 }}>
//         <Box sx={{ ...rowStyles }}>
//           <Typography
//             component="span"
//             variant="body2"
//             sx={{ flexGrow: 1, color: "text.secondary" }}
//           >
//             Sub Total
//           </Typography>

//           <Typography component="span" variant="subtitle2">
//             {fCurrency(taxableAmount)}
//           </Typography>
//         </Box>

//         <Box sx={{ ...rowStyles }}>
//           <Typography
//             component="span"
//             variant="body2"
//             sx={{ flexGrow: 1, color: "text.secondary" }}
//           >
//             Discount
//           </Typography>

//           <Typography component="span" variant="subtitle2">
//             {discountAmount ? fCurrency(-discountAmount) : "-"}
//           </Typography>
//         </Box>

//         {calculation?.tax?.applied && (
//           <Box sx={{ ...rowStyles }}>
//             <Typography
//               component="span"
//               variant="body2"
//               sx={{ flexGrow: 1, color: "text.secondary" }}
//             >
//               {calculation.tax.tax_name} ({calculation.tax.percentage}%)
//               {calculation.tax.price_includes_tax ? " (Included)" : ""}
//             </Typography>

//             <Typography component="span" variant="subtitle2">
//               {fCurrency(calculation.tax.tax_amount)}
//             </Typography>
//           </Box>
//         )}
//         {isAddressSelected && (
//           <Box sx={{ ...rowStyles }}>
//             <Typography
//               component="span"
//               variant="body2"
//               sx={{ flexGrow: 1, color: "text.secondary" }}
//             >
//               Shipping
//             </Typography>

//             <Typography component="span" variant="subtitle2">
//               {shippingAmount || fCurrency(shippingAmount)}
//             </Typography>
//           </Box>
//         )}


//         {calculation?.flash_sale?.has_flash_sale_items && calculation?.flash_sale?.total_flash_sale_savings > 0 && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1,
//               px: 2,
//               py: 1,
//               borderRadius: 1,
//               backgroundColor: 'error.lighter',
//               border: '1px dashed',
//               borderColor: 'error.main',
//             }}
//           >
//             <Iconify
//               icon="solar:fire-bold"
//               width={20}
//               sx={{ color: 'error.main' }}
//             />
//             <Typography
//               component="span"
//               variant="body2"
//               sx={{ flexGrow: 1, color: 'error.darker', fontWeight: 600 }}
//             >
//               Flash Sale Savings
//             </Typography>
//             <Typography
//               component="span"
//               variant="subtitle2"
//               sx={{ color: 'error.main', fontWeight: 700 }}
//             >
//               {fCurrency(calculation.flash_sale.total_flash_sale_savings)}
//             </Typography>
//           </Box>
//         )}

//         <Divider sx={{ borderStyle: "dashed" }} />

//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//             px: 2,
//             py: 1.5,
//             borderRadius: 1.5,
//             backgroundColor: 'success.lighter',
//             border: '1px dashed',
//             borderColor: 'success.main',
//           }}
//         >
//           <Iconify
//             icon="solar:wallet-money-bold"
//             width={24}
//             sx={{ color: 'success.main' }}
//           />
//           <Typography
//             component="span"
//             variant="subtitle2"
//             sx={{
//               color: "success.darker",
//               fontWeight: 600,
//             }}
//           >
//             Cash on Delivery
//           </Typography>
//         </Box>

//         <Box sx={{ ...rowStyles }}>
//           <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
//             Total
//           </Typography>

//           <Typography
//             component="span"
//             variant="subtitle1"
//             sx={{ display: "block", color: "error.main" }}
//           >
//             {fCurrency(totalAmount)}
//           </Typography>
//         </Box>

//         {isLogin && (
//           <>
//             {appliedDiscountCode ? (
//               <Stack spacing={1}>
//                 <Alert
//                   severity="success"
//                   action={
//                     <Button
//                       color="inherit"
//                       size="small"
//                       onClick={handleRemoveDiscount}
//                     >
//                       Remove
//                     </Button>
//                   }
//                 >
//                   Discount code &quot;{appliedDiscountCode}&quot; applied!
//                   {discountAmount > 0 && (
//                     <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
//                       You saved {fCurrency(discountAmount)}
//                     </Typography>
//                   )}
//                 </Alert>

//                 {/* Show which product the discount applies to */}
//                 {calculation?.discount_code?.applies_to === "product" && calculation?.discount_info?.target && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1.5,
//                       p: 1.5,
//                       borderRadius: 1,
//                       bgcolor: "action.hover",
//                     }}
//                   >
//                     <Iconify icon="solar:tag-price-bold" width={18} sx={{ color: "success.main", flexShrink: 0 }} />
//                     <Typography variant="caption" color="text.secondary">
//                       Discount applied on{" "}
//                       <Typography component="span" variant="caption" fontWeight={700} color="text.primary">
//                         {calculation.discount_info.target.name}
//                       </Typography>
//                       {" "}({fCurrency(discountAmount)} off)
//                     </Typography>
//                   </Box>
//                 )}

//                 {calculation?.discount_code?.applies_to === "category" && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1.5,
//                       p: 1.5,
//                       borderRadius: 1,
//                       bgcolor: "action.hover",
//                     }}
//                   >
//                     <Iconify icon="solar:tag-price-bold" width={18} sx={{ color: "success.main", flexShrink: 0 }} />
//                     <Typography variant="caption" color="text.secondary">
//                       Discount applied on category items ({fCurrency(discountAmount)} off)
//                     </Typography>
//                   </Box>
//                 )}
//               </Stack>
//             ) : (
//               <Form methods={methods} onSubmit={onSubmit}>
//                 <Field.Text
//                   fullWidth
//                   name="discount_code"
//                   label="Discount code"
//                   onChange={(e) => {
//                     const upperValue = e.target.value.toUpperCase();
//                     setValue("discount_code", upperValue, { shouldValidate: true });
//                   }}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <LoadingButton
//                             type="submit"
//                             color="primary"
//                             loading={isSubmitting || isCalculating}
//                             sx={{ mr: -0.5 }}
//                           >
//                             Apply
//                           </LoadingButton>
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                 />
//               </Form>
//             )}
//           </>
//         )}
//       </Stack>
//     </Card>
//   );
// }
import { z as zod } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setDiscount, removeDiscount } from "@/redux/actions";

import { fCurrency } from "@/utils/format-number";

import { Form, Field } from "@/components/hook-form";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { calculateCart } from "@/api";

// ----------------------------------------------------------------------

export const DiscountCodeSchema = zod.object({
  discount_code: zod.string().min(1, { message: "Discount code is required!" }),
});

export function CartSummary({ isAddressSelected, selectedAddressId }) {
  const dispatch = useAppDispatch();

  const { total, subtotal, shipping, discount, items } = useAppSelector(
    (state) => state.cart
  );
  const { isLogin } = useAppSelector((state) => state.auth);

  const [calculation, setCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const defaultValues = { discount_code: "" };

  const methods = useForm({
    resolver: zodResolver(DiscountCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const runCalculation = async (discountCode) => {
    if (!isLogin) return;
    if (!items || items.length === 0) {
      setCalculation(null);
      return;
    }

    try {
      setIsCalculating(true);

      const safeDiscountCode =
        typeof discountCode === "string"
          ? discountCode
          : typeof discountCode === "object" && discountCode?.code
            ? String(discountCode.code)
            : undefined;

      const payload = {
        ...(safeDiscountCode ? { discount_code: safeDiscountCode } : {}),
        ...(isAddressSelected &&
          selectedAddressId &&
          selectedAddressId !== "guest-address"
          ? { customer_address_id: selectedAddressId }
          : {}),
      };

      const response = await calculateCart(payload);
      if (response?.success && response?.data) {
        setCalculation(response.data);
      }
    } catch (error) {
      if (discountCode) {
        toast.error(
          error?.message || "Couldn't apply discount code! Please try again."
        );
      }
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    runCalculation(discount?.code || undefined);
  }, [isLogin, isAddressSelected, selectedAddressId, subtotal, items?.length]);

  const handleRemoveDiscount = async () => {
    dispatch(removeDiscount());
    await runCalculation(undefined);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const discountCode = data.discount_code?.trim()?.toUpperCase();
      const payload = {
        discount_code: discountCode,
        ...(isAddressSelected &&
          selectedAddressId &&
          selectedAddressId !== "guest-address"
          ? { customer_address_id: selectedAddressId }
          : {}),
      };

      const response = await calculateCart(payload);

      if (!response?.success || !response?.data) {
        toast.error(
          response?.message ||
          "Couldn't apply discount code! Please try again."
        );
        return;
      }

      setCalculation(response.data);
      dispatch(setDiscount(response.data));
      reset();
      toast.success("Discount applied!");
    } catch (error) {
      toast.error(
        error?.message || "Couldn't apply discount code! Please try again."
      );
    }
  });

  const subtotalAmount = calculation?.subtotal ?? subtotal;
  const taxableAmount = calculation?.tax?.taxable_amount ?? subtotal;
  const discountAmount = calculation?.discount?.amount ?? discount?.amount ?? 0;
  const shippingAmount = calculation?.additional_charges_total ?? shipping;
  const totalAmount = calculation?.total_amount ?? total;

  const extractDiscountCode = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      if (typeof value.code === "string") return value.code;
      if (typeof value.discount_code === "string") return value.discount_code;
      return "";
    }
    return "";
  };

  const appliedDiscountCode =
    extractDiscountCode(calculation?.discount_code) ||
    extractDiscountCode(discount?.code);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-1 pb-3">
      {/* Card Header */}
      <div className="p-3">
        <h6 className="text-base font-semibold">Order summary</h6>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 py-2 p-3">

        {/* Sub Total */}
        <div className="flex items-center">
          <span className="flex-1 text-sm text-gray-500">Sub Total</span>
          <span className="text-sm font-semibold">{fCurrency(taxableAmount)}</span>
        </div>

        {/* Discount */}
        <div className="flex items-center">
          <span className="flex-1 text-sm text-gray-500">Discount</span>
          <span className="text-sm font-semibold">
            {discountAmount ? fCurrency(-discountAmount) : "-"}
          </span>
        </div>

        {/* Tax */}
        {calculation?.tax?.applied && (
          <div className="flex items-center">
            <span className="flex-1 text-sm text-gray-500">
              {calculation.tax.tax_name} ({calculation.tax.percentage}%)
              {calculation.tax.price_includes_tax ? " (Included)" : ""}
            </span>
            <span className="text-sm font-semibold">
              {fCurrency(calculation.tax.tax_amount)}
            </span>
          </div>
        )}

        {/* Shipping */}
        {isAddressSelected && (
          <div className="flex items-center">
            <span className="flex-1 text-sm text-gray-500">Shipping</span>
            <span className="text-sm font-semibold">
              {shippingAmount || fCurrency(shippingAmount)}
            </span>
          </div>
        )}

        {/* Flash Sale */}
        {calculation?.flash_sale?.has_flash_sale_items &&
          calculation?.flash_sale?.total_flash_sale_savings > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-dashed border-red-500">
              <Iconify icon="solar:fire-bold" className="w-5 h-5 text-red-600 shrink-0" />
              <span className="flex-1 text-sm font-semibold text-red-800">
                Flash Sale Savings
              </span>
              <span className="text-sm font-bold text-red-600">
                {fCurrency(calculation.flash_sale.total_flash_sale_savings)}
              </span>
            </div>
          )}

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300" />

        {/* Cash on Delivery */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-dashed border-green-500">
          <Iconify icon="solar:wallet-money-bold" className="w-6 h-6 text-green-600 shrink-0" />
          <span className="text-sm font-semibold text-green-800">
            Cash on Delivery
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center">
          <span className="flex-1 text-sm font-semibold">Total</span>
          <span className="text-sm font-semibold text-red-500">
            {fCurrency(totalAmount)}
          </span>
        </div>

        {/* Discount Code Section */}
        {isLogin && (
          <>
            {appliedDiscountCode ? (
              <div className="flex flex-col gap-2">
                {/* Success Alert */}
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-green-50 border border-green-200">
                  <Iconify
                    icon="eva:checkmark-circle-2-fill"
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  />
                  <div className="flex-1 text-sm text-green-800">
                    Discount code &quot;{appliedDiscountCode}&quot; applied!
                    {discountAmount > 0 && (
                      <p className="text-xs mt-0.5">
                        You saved {fCurrency(discountAmount)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleRemoveDiscount}
                    className="text-xs font-medium text-green-800 hover:text-green-900 underline shrink-0"
                  >
                    Remove
                  </button>
                </div>

                {/* Discount applies to product */}
                {calculation?.discount_code?.applies_to === "product" &&
                  calculation?.discount_info?.target && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                      <Iconify
                        icon="solar:tag-price-bold"
                        className="w-4 h-4 text-green-600 shrink-0"
                      />
                      <p className="text-xs text-gray-500">
                        Discount applied on{" "}
                        <span className="font-bold text-gray-800">
                          {calculation.discount_info.target.name}
                        </span>{" "}
                        ({fCurrency(discountAmount)} off)
                      </p>
                    </div>
                  )}

                {/* Discount applies to category */}
                {calculation?.discount_code?.applies_to === "category" && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                    <Iconify
                      icon="solar:tag-price-bold"
                      className="w-4 h-4 text-green-600 shrink-0"
                    />
                    <p className="text-xs text-gray-500">
                      Discount applied on category items (
                      {fCurrency(discountAmount)} off)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Form methods={methods} onSubmit={onSubmit}>
                <Field.Text
                  fullWidth
                  name="discount_code"
                  label="Discount code"
                  onChange={(e) => {
                    const upperValue = e.target.value.toUpperCase();
                    setValue("discount_code", upperValue, {
                      shouldValidate: true,
                    });
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <div className="mr-[-4px]">
                          <button
                            type="submit"
                            disabled={isSubmitting || isCalculating}
                            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isSubmitting || isCalculating ? (
                              <span className="flex items-center gap-1">
                                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Applying...
                              </span>
                            ) : (
                              "Apply"
                            )}
                          </button>
                        </div>
                      ),
                    },
                  }}
                />
              </Form>
            )}
          </>
        )}
      </div>
    </div>
  );
}