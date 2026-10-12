// "use client";

// import Grid from "@mui/material/Grid2";
// import { Container, Card } from "@mui/material";

// import { paths } from "@/routes/paths";

// import { OrderDetailsItems } from "../order-details-items";
// import { OrderDetailsToolbar } from "../order-details-toolbar";
// import { OrderDetailsShipping } from "../order-details-shipping";

// import { useGetOrderDetail } from "@/api";

// // ----------------------------------------------------------------------

// export function OrderDetailsView({ orderId }) {
//   const { order } = useGetOrderDetail(orderId);

//   if (!order) {
//     return null; // Or return a loading skeleton
//   }

//   const {
//     address,
//     order_id,
//     order_number,
//     order_date,
//     status,
//     unit_price,
//     order_items,
//     total_amount,
//     discount_amount,
//     discount_details,
//     logistic_charge,
//     vat_amount,
//     taxable_amount,
//     tax,
//   } = order;

//   const subtotal = taxable_amount
//     ? Number(taxable_amount)
//     : order_items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;

//   // Tax details - use tax object if available, otherwise create from vat_amount
//   const taxDetails = tax?.applied ? tax : {
//     applied: true,
//     tax_name: "VAT",
//     percentage: null,
//     price_includes_tax: false,
//     tax_amount: vat_amount || 0
//   };

//   return (
//     <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
//       <OrderDetailsToolbar
//         status={status}
//         createdAt={order_date}
//         orderNumber={order_number || order_id}
//         orderId={order_id}
//         backHref={paths.order.root}
//       />

//       <Grid container spacing={3}>
//         <Grid size={{ xs: 12, md: 8 }}>
//           <OrderDetailsItems
//             items={order_items}
//             taxDetails={taxDetails}
//             shipping={logistic_charge}
//             discount={discount_amount}
//             discountDetails={discount_details}
//             subtotal={subtotal}
//             totalAmount={total_amount}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card>
//             <OrderDetailsShipping address={address} />
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }
"use client";

import { paths } from "@/routes/paths";

import { OrderDetailsItems } from "../order-details-items";
import { OrderDetailsToolbar } from "../order-details-toolbar";
import { OrderDetailsShipping } from "../order-details-shipping";

import { useGetOrderDetail } from "@/api";

// ----------------------------------------------------------------------

export function OrderDetailsView({ orderId }) {
  const { order } = useGetOrderDetail(orderId);

  if (!order) return null;

  const {
    address,
    order_id,
    order_number,
    order_date,
    status,
    order_items,
    total_amount,
    discount_amount,
    discount_details,
    logistic_charge,
    taxable_amount,
    tax,
  } = order;

  const subtotal =
    taxable_amount
      ? Number(taxable_amount)
      : order_items?.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      ) || 0;

  const taxDetails = tax?.applied
    ? tax
    : {
      applied: true,
      tax_name: "VAT",
      percentage: null,
      price_includes_tax: false,
      tax_amount: logistic_charge || 0,
    };

  return (
    <div className="mx-auto mb-10 mt-5 container px-4 sm:px-6 lg:px-8">
      {/* Toolbar */}
      <OrderDetailsToolbar
        status={status}
        createdAt={order_date}
        orderNumber={order_number || order_id}
        orderId={order_id}
        backHref={paths.order.root}
      />

      {/* Grid Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Left Section - Items */}
        <div className="md:col-span-8">
          <OrderDetailsItems
            items={order_items}
            taxDetails={taxDetails}
            shipping={logistic_charge}
            discount={discount_amount}
            discountDetails={discount_details}
            subtotal={subtotal}
            totalAmount={total_amount}
          />
        </div>

        {/* Right Section - Shipping */}
        <div className="md:col-span-4">
          <div className="rounded-xl bg-white shadow-sm">
            <OrderDetailsShipping address={address} />
          </div>
        </div>
      </div>
    </div>
  );
}