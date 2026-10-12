// // import { useState } from "react";
// // import { useBoolean, usePopover } from "minimal-shared/hooks";

// // import {
// //   Box,
// //   Link,
// //   Paper,
// //   Avatar,
// //   Collapse,
// //   TableRow,
// //   TableCell,
// //   IconButton,
// //   ListItemText,
// //   Button,
// //   MenuList,
// //   MenuItem,
// //   Divider,
// // } from "@mui/material";

// // import { CONFIG } from "@/global-config";

// // import { RouterLink } from "@/routes/components";

// // import { fCurrency } from "@/utils/format-number";
// // import { fDate, fTime } from "@/utils/format-time";

// // import { Label } from "@/components/label";
// // import { Iconify } from "@/components/iconify";
// // import { CustomPopover } from "@/components/custom-popover";

// // import { OrderUpdateForm } from "./order-update-form";
// // import { OrderAddressUpdateForm } from "./order-address-update-form";

// // // ----------------------------------------------------------------------

// // export function OrderTableRow({ row, detailsHref }) {
// //   const { order_date, order_id, id, order_items, status, total_amount, created_at } = row;

// //   console.log("OrderTableRow - order_id:", order_id, "id:", id, "full row:", row);

// //   // Use numeric id if available, otherwise fall back to order_id
// //   const numericOrderId = id || order_id;

// //   const collapseRow = useBoolean();

// //   const openOrderUpdateForm = useBoolean();

// //   const openOrderAddressUpdateForm = useBoolean();

// //   const [updateStatus, setUpdateStatus] = useState("");

// //   const menuActions = usePopover();

// //   const isOrderDeliveredOrCompleted = ["delivered", "completed"].includes(
// //     status
// //   );

// //   const isOrderCancelledOrReturned = ["returned", "cancelled"].includes(status);

// //   const handleOrderReturn = (newStatus) => {
// //     openOrderUpdateForm.onTrue();

// //     setUpdateStatus(newStatus);

// //     menuActions.onClose();
// //   };

// //   const handleOrderAddressChange = () => {
// //     openOrderAddressUpdateForm.onTrue();

// //     menuActions.onClose();
// //   };

// //   const renderPrimaryRow = () => (
// //     <TableRow hover>
// //       <TableCell>
// //         <Link component={RouterLink} href={detailsHref} color="inherit">
// //           {order_id}
// //         </Link>
// //       </TableCell>

// //       <TableCell>
// //         <ListItemText
// //           primary={fDate(order_date)}
// //           secondary={fTime(created_at)}
// //           slotProps={{
// //             primary: {
// //               noWrap: true,
// //               sx: { typography: "body2" },
// //             },
// //             secondary: {
// //               sx: { mt: 0.5, typography: "caption" },
// //             },
// //           }}
// //         />
// //       </TableCell>

// //       <TableCell align="center"> {order_items?.length} </TableCell>

// //       <TableCell> {fCurrency(total_amount)} </TableCell>

// //       <TableCell>
// //         <Label
// //           variant="soft"
// //           color={
// //             (status === "completed" && "success") ||
// //             (status === "pending" && "warning") ||
// //             (status === "cancelled" && "error") ||
// //             "default"
// //           }
// //         >
// //           {status}
// //         </Label>
// //       </TableCell>

// //       <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
// //         <Box sx={{ gap: 1, display: "flex", justifyContent: "flex-end" }}>
// //           <Button
// //             component={RouterLink}
// //             href={detailsHref}
// //             variant="soft"
// //             color="primary"
// //           >
// //             View Details
// //           </Button>

// //           <IconButton
// //             color={collapseRow.value ? "inherit" : "default"}
// //             onClick={collapseRow.onToggle}
// //             sx={{ ...(collapseRow.value && { bgcolor: "action.hover" }) }}
// //           >
// //             <Iconify icon="eva:arrow-ios-downward-fill" />
// //           </IconButton>

// //           {!isOrderCancelledOrReturned && (
// //             <IconButton
// //               color={menuActions.open ? "inherit" : "default"}
// //               onClick={menuActions.onOpen}
// //             >
// //               <Iconify icon="eva:more-vertical-fill" />
// //             </IconButton>
// //           )}
// //         </Box>
// //       </TableCell>
// //     </TableRow>
// //   );

// //   const renderSecondaryRow = () => (
// //     <TableRow>
// //       <TableCell sx={{ p: 0, border: "none" }} colSpan={8}>
// //         <Collapse
// //           in={collapseRow.value}
// //           timeout="auto"
// //           unmountOnExit
// //           sx={{ bgcolor: "background.neutral" }}
// //         >
// //           <Paper sx={{ m: 1.5 }}>
// //             {order_items?.map((item) => (
// //               <Box
// //                 key={item.order_item_id}
// //                 sx={(theme) => ({
// //                   display: "flex",
// //                   alignItems: "center",
// //                   p: theme.spacing(1.5, 2, 1.5, 1.5),
// //                   "&:not(:last-of-type)": {
// //                     borderBottom: `solid 2px ${theme.vars.palette.background.neutral}`,
// //                   },
// //                 })}
// //               >
// //                 <Avatar
// //                   src={`${item.item_image}`}
// //                   variant="rounded"
// //                   sx={{ width: 48, height: 48, mr: 2 }}
// //                 />

// //                 <ListItemText
// //                   primary={item.item_name}
// //                   secondary={item.item_sku}
// //                   slotProps={{
// //                     primary: {
// //                       sx: { typography: "body2" },
// //                     },
// //                     secondary: {
// //                       sx: { mt: 0.5, color: "text.disabled" },
// //                     },
// //                   }}
// //                 />

// //                 <div>x{item.quantity} </div>

// //                 <Box sx={{ width: 110, textAlign: "right" }}>
// //                   {fCurrency(item.price)}
// //                 </Box>
// //               </Box>
// //             ))}
// //           </Paper>
// //         </Collapse>
// //       </TableCell>
// //     </TableRow>
// //   );

// //   const renderMenuActions = () => (
// //     <CustomPopover
// //       open={menuActions.open}
// //       anchorEl={menuActions.anchorEl}
// //       onClose={menuActions.onClose}
// //       slotProps={{ arrow: { placement: "right-top" } }}
// //     >
// //       <MenuList>
// //         {!isOrderDeliveredOrCompleted && (
// //           <MenuItem onClick={handleOrderAddressChange}>Change address</MenuItem>
// //         )}

// //         {isOrderDeliveredOrCompleted && (
// //           <MenuItem
// //             onClick={() => handleOrderReturn("returned")}
// //             sx={{ color: "error.main" }}
// //           >
// //             Return
// //           </MenuItem>
// //         )}

// //         <Divider sx={{ borderStyle: "dashed" }} />

// //         {!isOrderDeliveredOrCompleted && (
// //           <MenuItem
// //             sx={{ color: "error.main" }}
// //             onClick={() => handleOrderReturn("cancelled")}
// //           >
// //             Cancel
// //           </MenuItem>
// //         )}
// //       </MenuList>
// //     </CustomPopover>
// //   );

// //   return (
// //     <>
// //       {renderPrimaryRow()}

// //       {renderSecondaryRow()}

// //       {renderMenuActions()}

// //       {openOrderUpdateForm.value && (
// //         <OrderUpdateForm
// //           open={openOrderUpdateForm.value}
// //           onClose={openOrderUpdateForm.onFalse}
// //           //
// //           orderUpdateData={{
// //             id: numericOrderId,
// //             status: updateStatus,
// //           }}
// //         />
// //       )}

// //       {openOrderAddressUpdateForm.value && (
// //         <OrderAddressUpdateForm
// //           open={openOrderAddressUpdateForm.value}
// //           onClose={openOrderAddressUpdateForm.onFalse}
// //           //
// //           orderUpdateData={{
// //             id: numericOrderId,
// //           }}
// //         />
// //       )}
// //     </>
// //   );
// // }
// import { useState } from "react";
// import { useBoolean, usePopover } from "minimal-shared/hooks";

// import {
//   Box,
//   Link,
//   Paper,
//   Avatar,
//   Collapse,
//   TableRow,
//   TableCell,
//   IconButton,
//   ListItemText,
//   Button,
//   MenuList,
//   MenuItem,
//   Divider,
// } from "@mui/material";

// import { RouterLink } from "@/routes/components";

// import { fCurrency } from "@/utils/format-number";
// import { fDate, fTime } from "@/utils/format-time";

// import { Label } from "@/components/label";
// import { Iconify } from "@/components/iconify";
// import { CustomPopover } from "@/components/custom-popover";

// import { OrderUpdateForm } from "./order-update-form";
// import { OrderAddressUpdateForm } from "./order-address-update-form";

// export function OrderTableRow({ row, detailsHref }) {
//   const {
//     order_date,
//     order_id,
//     id,
//     order_items,
//     status,
//     total_amount,
//     created_at,
//   } = row;

//   const numericOrderId = id || order_id;

//   const collapseRow = useBoolean();
//   const openOrderUpdateForm = useBoolean();
//   const openOrderAddressUpdateForm = useBoolean();
//   const menuActions = usePopover();

//   const [updateStatus, setUpdateStatus] = useState("");

//   const isOrderDeliveredOrCompleted = ["delivered", "completed"].includes(status);
//   const isOrderCancelledOrReturned = ["returned", "cancelled"].includes(status);

//   const handleOrderReturn = (newStatus) => {
//     openOrderUpdateForm.onTrue();
//     setUpdateStatus(newStatus);
//     menuActions.onClose();
//   };

//   const handleOrderAddressChange = () => {
//     openOrderAddressUpdateForm.onTrue();
//     menuActions.onClose();
//   };

//   return (
//     <>
//       {/* MAIN ROW */}
//       <TableRow hover>
//         <TableCell>
//           <Link component={RouterLink} href={detailsHref} color="inherit">
//             {order_id}
//           </Link>
//         </TableCell>

//         <TableCell>
//           <ListItemText
//             primary={fDate(order_date)}
//             secondary={fTime(created_at)}
//           />
//         </TableCell>

//         <TableCell align="center">{order_items?.length}</TableCell>

//         <TableCell>{fCurrency(total_amount)}</TableCell>

//         <TableCell>
//           <Label
//             variant="soft"
//             color={
//               (status === "completed" && "success") ||
//               (status === "pending" && "warning") ||
//               (status === "cancelled" && "error") ||
//               "default"
//             }
//           >
//             {status}
//           </Label>
//         </TableCell>

//         <TableCell align="right">
//           <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//             <Button component={RouterLink} href={detailsHref} variant="soft">
//               View
//             </Button>

//             <IconButton onClick={collapseRow.onToggle}>
//               <Iconify icon="eva:arrow-ios-downward-fill" />
//             </IconButton>

//             {!isOrderCancelledOrReturned && (
//               <IconButton onClick={menuActions.onOpen}>
//                 <Iconify icon="eva:more-vertical-fill" />
//               </IconButton>
//             )}
//           </Box>
//         </TableCell>
//       </TableRow>

//       {/* COLLAPSE */}
//       <TableRow>
//         <TableCell colSpan={8} sx={{ p: 0 }}>
//           <Collapse in={collapseRow.value} timeout="auto" unmountOnExit>
//             <Paper sx={{ m: 1.5 }}>
//               {order_items?.map((item) => (
//                 <Box
//                   key={item.order_item_id}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     p: 2,
//                     borderBottom: "1px dashed #eee",
//                   }}
//                 >
//                   <Avatar
//                     src={item.item_image}
//                     variant="rounded"
//                     sx={{ width: 48, height: 48, mr: 2 }}
//                   />

//                   <ListItemText
//                     primary={item.item_name}
//                     secondary={item.item_sku}
//                   />

//                   <Box>x{item.quantity}</Box>

//                   <Box sx={{ width: 110, textAlign: "right" }}>
//                     {fCurrency(item.price)}
//                   </Box>
//                 </Box>
//               ))}
//             </Paper>
//           </Collapse>
//         </TableCell>
//       </TableRow>

//       {/* MENU */}
//       <CustomPopover
//         open={menuActions.open}
//         anchorEl={menuActions.anchorEl}
//         onClose={menuActions.onClose}
//       >
//         <MenuList>
//           {!isOrderDeliveredOrCompleted && (
//             <MenuItem onClick={handleOrderAddressChange}>
//               Change address
//             </MenuItem>
//           )}

//           {isOrderDeliveredOrCompleted && (
//             <MenuItem
//               onClick={() => handleOrderReturn("returned")}
//               sx={{ color: "error.main" }}
//             >
//               Return
//             </MenuItem>
//           )}

//           <Divider />

//           {!isOrderDeliveredOrCompleted && (
//             <MenuItem
//               onClick={() => handleOrderReturn("cancelled")}
//               sx={{ color: "error.main" }}
//             >
//               Cancel
//             </MenuItem>
//           )}
//         </MenuList>
//       </CustomPopover>

//       {/* MODALS */}
//       {openOrderUpdateForm.value && (
//         <OrderUpdateForm
//           open={openOrderUpdateForm.value}
//           onClose={openOrderUpdateForm.onFalse}
//           orderUpdateData={{
//             id: numericOrderId,
//             status: updateStatus,
//           }}
//         />
//       )}

//       {openOrderAddressUpdateForm.value && (
//         <OrderAddressUpdateForm
//           open={openOrderAddressUpdateForm.value}
//           onClose={openOrderAddressUpdateForm.onFalse}
//           orderUpdateData={{ id: numericOrderId }}
//         />
//       )}
//     </>
//   );
// }
// import { useState } from "react";
// import { useBoolean, usePopover } from "minimal-shared/hooks";

// import { RouterLink } from "@/routes/components";
// import { fCurrency } from "@/utils/format-number";
// import { fDate, fTime } from "@/utils/format-time";

// import { OrderUpdateForm } from "./order-update-form";
// import { OrderAddressUpdateForm } from "./order-address-update-form";

// export function OrderTableRow({ row, detailsHref }) {
//   const {
//     order_date,
//     order_id,
//     id,
//     order_items = [],
//     status,
//     total_amount,
//     created_at,
//   } = row;

//   const collapseRow = useBoolean();
//   const openOrderUpdateForm = useBoolean();
//   const openOrderAddressUpdateForm = useBoolean();

//   const menuActions = usePopover();
//   const [updateStatus, setUpdateStatus] = useState("");

//   const numericOrderId = id ?? null;

//   const isFinalStatus = ["delivered", "completed"].includes(status);

//   const statusColor =
//     status === "completed"
//       ? "text-green-600 bg-green-50"
//       : status === "pending"
//         ? "text-yellow-600 bg-yellow-50"
//         : status === "cancelled"
//           ? "text-red-600 bg-red-50"
//           : "text-gray-600 bg-gray-100";

//   const handleAction = (newStatus) => {
//     setUpdateStatus(newStatus);
//     openOrderUpdateForm.onTrue();
//     menuActions.onClose();
//   };

//   return (
//     <>
//       {/* MAIN ROW */}
//       <tr className="border-b hover:bg-gray-50">
//         <td className="p-3">
//           <RouterLink
//             href={detailsHref}
//             className="text-blue-600 hover:underline"
//           >
//             {order_id}
//           </RouterLink>
//         </td>

//         <td className="p-3">
//           <div className="text-sm font-medium">{fDate(order_date)}</div>
//           <div className="text-xs text-gray-500">{fTime(created_at)}</div>
//         </td>

//         <td className="p-3 text-center">{order_items.length}</td>

//         <td className="p-3 font-medium">{fCurrency(total_amount)}</td>

//         <td className="p-3">
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
//           >
//             {status}
//           </span>
//         </td>

//         <td className="p-3">
//           <div className="flex justify-end gap-2">
//             <RouterLink
//               href={detailsHref}
//               className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
//             >
//               View
//             </RouterLink>

//             <button
//               onClick={collapseRow.onToggle}
//               className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
//             >
//               ⌄
//             </button>

//             {!isFinalStatus && (
//               <button
//                 onClick={menuActions.onOpen}
//                 className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
//               >
//                 ⋮
//               </button>
//             )}
//           </div>
//         </td>
//       </tr>

//       {/* COLLAPSE ROW */}
//       {collapseRow.value && (
//         <tr>
//           <td colSpan={6} className="p-0">
//             <div className="bg-gray-50 p-4">
//               {order_items.map((item) => (
//                 <div
//                   key={item.order_item_id ?? item.item_sku}
//                   className="flex items-center gap-3 p-3 border-b border-dashed"
//                 >
//                   <img
//                     src={item.item_image}
//                     className="w-12 h-12 rounded object-cover"
//                   />

//                   <div className="flex-1">
//                     <div className="text-sm font-medium">
//                       {item.item_name}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {item.item_sku}
//                     </div>
//                   </div>

//                   <div className="text-sm">x{item.quantity}</div>

//                   <div className="w-24 text-right text-sm font-medium">
//                     {fCurrency(Number(item.price) * Number(item.quantity))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </td>
//         </tr>
//       )}

//       {/* MENU */}
//       {menuActions.open && (
//         <div className="absolute right-10 mt-2 w-40 bg-white border rounded shadow-lg z-50">
//           <ul className="text-sm">
//             {!isFinalStatus && (
//               <li
//                 onClick={() => {
//                   openOrderAddressUpdateForm.onTrue();
//                   menuActions.onClose();
//                 }}
//                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 Change Address
//               </li>
//             )}

//             {isFinalStatus && (
//               <li
//                 onClick={() => handleAction("returned")}
//                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
//               >
//                 Return
//               </li>
//             )}

//             <hr />

//             {!isFinalStatus && (
//               <li
//                 onClick={() => handleAction("cancelled")}
//                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
//               >
//                 Cancel
//               </li>
//             )}
//           </ul>
//         </div>
//       )}

//       {/* MODALS (unchanged logic) */}
//       {openOrderUpdateForm.value && (
//         <OrderUpdateForm
//           open={openOrderUpdateForm.value}
//           onClose={openOrderUpdateForm.onFalse}
//           orderUpdateData={{
//             id: numericOrderId,
//             status: updateStatus,
//           }}
//         />
//       )}

//       {openOrderAddressUpdateForm.value && (
//         <OrderAddressUpdateForm
//           open={openOrderAddressUpdateForm.value}
//           onClose={openOrderAddressUpdateForm.onFalse}
//           orderUpdateData={{ id: numericOrderId }}
//         />
//       )}
//     </>
//   );
// }

import { useState } from "react";
import { useBoolean, usePopover } from "minimal-shared/hooks";

import { RouterLink } from "@/routes/components";
import { fCurrency } from "@/utils/format-number";
import { fDate, fTime } from "@/utils/format-time";

import { OrderUpdateForm } from "./order-update-form";
import { OrderAddressUpdateForm } from "./order-address-update-form";

// ----------------------------------------------------------------------

export function OrderTableRow({ row, detailsHref }) {
  const {
    order_date,
    order_id,
    id,
    order_items = [],
    status,
    total_amount,
    created_at,
  } = row;

  const collapseRow = useBoolean();
  const openOrderUpdateForm = useBoolean();
  const openOrderAddressUpdateForm = useBoolean();

  const menuActions = usePopover();
  const [updateStatus, setUpdateStatus] = useState("");

  const isFinalStatus = ["delivered", "completed"].includes(status);

  // ----------------------------------------------------------------------
  // STATUS STYLE (frontend friendly pills)
  // ----------------------------------------------------------------------

  const statusStyles = {
    completed: "bg-emerald-50 text-emerald-600",
    delivered: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    cancelled: "bg-red-50 text-red-600",
  };

  const statusColor =
    statusStyles[status] || "bg-gray-100 text-gray-600";

  const handleAction = (newStatus) => {
    setUpdateStatus(newStatus);
    openOrderUpdateForm.onTrue();
    menuActions.onClose();
  };

  // ----------------------------------------------------------------------

  return (
    <>
      {/* ROW */}
      <tr className="group border-b border-gray-100 transition hover:bg-gray-50/60">

        {/* ORDER ID */}
        <td className="px-4 py-3">
          {/* <RouterLink
            href={detailsHref}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            #{order_id}
          </RouterLink> */}
        </td>
        <td className="px-4 py-3">
          <RouterLink
            href={detailsHref}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            #{order_id}
          </RouterLink>
        </td>

        {/* DATE */}
        <td className="px-4 py-3">
          <div className="text-sm font-medium text-gray-900">
            {fDate(order_date)}
          </div>
          <div className="text-xs text-gray-500">
            {fTime(created_at)}
          </div>
        </td>

        {/* ITEMS */}
        <td className="px-4 py-3 text-center text-sm text-gray-600">
          {order_items.length}
        </td>

        {/* TOTAL */}
        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
          {fCurrency(total_amount)}
        </td>

        {/* STATUS */}
        <td className="px-4 py-3">
          <span
            className={[
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
              statusColor,
            ].join(" ")}
          >
            {status}
          </span>
        </td>

        {/* ACTIONS */}
        <td className="px-4 py-3">
          <div className="flex justify-end gap-2 opacity-70 transition group-hover:opacity-100">

            {/* VIEW */}
            <RouterLink
              href={detailsHref}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
            >
              View
            </RouterLink>

            {/* TOGGLE DETAILS */}
            <button
              onClick={collapseRow.onToggle}
              className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
            >
              Details
            </button>

            {/* MENU */}
            {!isFinalStatus && (
              <div className="relative">
                <button
                  onClick={menuActions.onOpen}
                  className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  ⋯
                </button>

                {/* FLOATING MENU (modern popover style) */}
                {menuActions.open && (
                  <div
                    className="
                      absolute right-0 mt-2 w-44
                      rounded-xl border border-gray-200
                      bg-white p-1
                      shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                      backdrop-blur
                      z-50
                    "
                  >
                    {!isFinalStatus && (
                      <button
                        onClick={() => {
                          openOrderAddressUpdateForm.onTrue();
                          menuActions.onClose();
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Change Address
                      </button>
                    )}

                    {isFinalStatus && (
                      <button
                        onClick={() => handleAction("returned")}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Return
                      </button>
                    )}

                    <div className="my-1 h-px bg-gray-100" />

                    {!isFinalStatus && (
                      <button
                        onClick={() => handleAction("cancelled")}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* COLLAPSE */}
      {collapseRow.value && (
        <tr>
          <td colSpan={6} className="bg-gray-50/60 px-4 py-3">
            <div className="space-y-2">
              {order_items.map((item) => (
                <div
                  key={item.order_item_id ?? item.item_sku}
                  className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm"
                >
                  <img
                    src={item.item_image}
                    className="h-10 w-10 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {item.item_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.item_sku}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    x{item.quantity}
                  </div>

                  <div className="w-24 text-right text-sm font-semibold text-gray-900">
                    {fCurrency(
                      Number(item.price) *
                      Number(item.quantity)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}

      {/* MODALS */}
      {openOrderUpdateForm.value && (
        <OrderUpdateForm
          open={openOrderUpdateForm.value}
          onClose={openOrderUpdateForm.onFalse}
          orderUpdateData={{
            id,
            status: updateStatus,
          }}
        />
      )}

      {openOrderAddressUpdateForm.value && (
        <OrderAddressUpdateForm
          open={openOrderAddressUpdateForm.value}
          onClose={openOrderAddressUpdateForm.onFalse}
          orderUpdateData={{ id }}
        />
      )}
    </>
  );
}