// import { Box, Stack, CardHeader } from "@mui/material";

// // ----------------------------------------------------------------------

// export function OrderDetailsShipping({ address }) {
//   return (
//     <>
//       <CardHeader title="Shipping" />

//       <Stack spacing={1.5} sx={{ p: 3, typography: "body2" }}>
//         <Box sx={{ display: "flex" }}>
//           <Box
//             component="span"
//             sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
//           >
//             Address
//           </Box>
//           {address?.address}, {address?.district}
//         </Box>

//         <Box sx={{ display: "flex" }}>
//           <Box
//             component="span"
//             sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
//           >
//             State
//           </Box>

//           {address?.state}
//         </Box>
//       </Stack>
//     </>
//   );
// }
"use client";

import { Iconify } from "@/components/iconify";

export function OrderDetailsShipping({ address }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header (CardHeader replacement) */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-base font-semibold text-gray-800">
          Shipping
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 text-sm text-gray-700">
        {/* Address */}
        <div className="flex">
          <span className="w-[120px] flex-shrink-0 text-gray-500">
            Address
          </span>
          <span className="text-gray-800">
            {address?.address}
            {address?.district && `, ${address?.district}`}
          </span>
        </div>

        {/* State */}
        <div className="flex">
          <span className="w-[120px] flex-shrink-0 text-gray-500">
            State
          </span>
          <span className="text-gray-800">
            {address?.state}
          </span>
        </div>
      </div>
    </div>
  );
}