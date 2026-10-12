// import { Box, Stack, Paper, Typography } from "@mui/material";

// import { Label } from "@/components/label";

// // ----------------------------------------------------------------------

// export function AddressItem({
//   addressItem,
//   selectedAddress,
//   action,
//   sx,
//   ...other
// }) {
//   const { address_id, address, district, state } = addressItem;

//   return (
//     <Paper
//       sx={[
//         () => ({
//           gap: 2,
//           display: "flex",
//           position: "relative",
//           alignItems: { md: "flex-end" },
//           flexDirection: { xs: "column", md: "row" },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Stack flexGrow={1} spacing={1}>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="subtitle2">
//             {address}, {district?.district_name}
//           </Typography>

//           {selectedAddress === address_id && (
//             <Label color="info" sx={{ ml: 1 }}>
//               Selected
//             </Label>
//           )}
//         </Box>

//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {state?.state_name}
//         </Typography>
//       </Stack>

//       {action && action}
//     </Paper>
//   );
// }

import { Label } from "@/components/label";

export function AddressItem({
  addressItem,
  selectedAddress,
  action,
  className = "",
  ...other
}) {
  const { address_id, address, district, state } = addressItem;

  const isSelected = selectedAddress === address_id;

  return (
    <div
      className={[
        "relative flex flex-col gap-2",
        "md:flex-row md:items-end",
        "p-4 rounded-lg border border-gray-200 bg-white",
        className,
      ].join(" ")}
      {...other}
    >
      {/* Left content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-900">
            {address}, {district?.district_name}
          </p>

          {isSelected && (
            <span className="ml-2">
              <Label color="info">Selected</Label>
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {state?.state_name}
        </p>
      </div>

      {/* Action slot */}
      {action && <div>{action}</div>}
    </div>
  );
}