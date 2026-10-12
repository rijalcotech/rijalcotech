// import { useBoolean } from "minimal-shared/hooks";

// import {
//   Stack,
//   Box,
//   Button,
//   Paper,
//   Typography,
//   ListItemText,
// } from "@mui/material";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setProfileAddresses } from "@/redux/actions";

// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";
// import { EmptyContent } from "@/components/empty-content";

// import { AddressNewForm } from "../address";

// import { useGetStates, removeAddress } from "@/api";

// export function ProfileAddress() {
//   const addressForm = useBoolean();

//   const dispatch = useAppDispatch();

//   const { addresses } = useAppSelector((state) => state.profile);

//   const { states } = useGetStates();

//   const handleDelete = async (id) => {
//     try {
//       await removeAddress(id);

//       const updatedAddresses = addresses.filter(
//         (address) => address.address_id !== id
//       );

//       dispatch(setProfileAddresses(updatedAddresses));

//       toast.success("Address deleted!");
//     } catch (error) {
//       toast.error("Couldn't remove address! Try again.");
//     }
//   };

//   const renderNoAddress = () => (
//     <EmptyContent
//       title="Address not found"
//       description="Please, add your address to proceed the checkout process!"
//       sx={{ py: 2 }}
//     />
//   );

//   return (
//     <>
//       <Stack spacing={3}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <ListItemText
//             primary="Your addresses"
//             secondary="Manage your shipping address"
//             slotProps={{
//               primary: { sx: { typography: "h4" } },
//               secondary: {
//                 sx: { mt: 0.5, typography: "body2", color: "text.secondary" },
//               },
//             }}
//           />

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={addressForm.onTrue}
//             startIcon={<Iconify icon="mingcute:add-line" />}
//           >
//             New address
//           </Button>
//         </Box>

//         <Box
//           sx={{
//             gap: 3,
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "repeat(1, 1fr)",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//               lg: "repeat(3, 1fr)",
//             },
//           }}
//         >
//           {!!addresses?.length
//             ? addresses.map((address) => (
//                 <AddressItem
//                   key={address.address_id}
//                   addressItem={address}
//                   action={
//                     <Button
//                       size="small"
//                       color="error"
//                       onClick={() => handleDelete(address.address_id)}
//                     >
//                       Delete
//                     </Button>
//                   }
//                   sx={[
//                     (theme) => ({
//                       p: 3,
//                       borderRadius: 2,
//                       boxShadow: theme.vars.customShadows.card,
//                     }),
//                   ]}
//                 />
//               ))
//             : renderNoAddress()}
//         </Box>
//       </Stack>

//       <AddressNewForm
//         open={addressForm.value}
//         onClose={addressForm.onFalse}
//         //
//         states={states}
//       />
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// export function AddressItem({ addressItem, action, sx, ...other }) {
//   const { address, district, state } = addressItem;

//   return (
//     <Paper
//       sx={[
//         () => ({
//           gap: 2,
//           display: "flex",
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Stack flexGrow={1} spacing={1}>
//         <Typography variant="subtitle2">
//           {address}, {district?.district_name}
//         </Typography>

//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {state?.state_name}
//         </Typography>
//       </Stack>

//       {action && action}
//     </Paper>
//   );
// }

import { useBoolean } from "minimal-shared/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProfileAddresses } from "@/redux/actions";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";
import { EmptyContent } from "@/components/empty-content";

import { AddressNewForm } from "../address";

import { useGetStates, removeAddress } from "@/api";

// ----------------------------------------------------------------------

export function ProfileAddress() {
  const addressForm = useBoolean();

  const dispatch = useAppDispatch();

  const { addresses } = useAppSelector((state) => state.profile);

  const { states } = useGetStates();

  const handleDelete = async (id) => {
    try {
      await removeAddress(id);

      const updatedAddresses = addresses.filter(
        (address) => address.address_id !== id
      );

      dispatch(setProfileAddresses(updatedAddresses));

      toast.success("Address deleted!");
    } catch (error) {
      toast.error("Couldn't remove address! Try again.");
    }
  };

  const renderNoAddress = () => (
    <EmptyContent
      title="Address not found"
      description="Please, add your address to proceed the checkout process!"
      sx={{ py: 2 }}
    />
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-bold">Your addresses</h4>
            <p className="mt-1 text-sm text-gray-500">
              Manage your shipping address
            </p>
          </div>

          <button
            onClick={addressForm.onTrue}
            className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Iconify icon="mingcute:add-line" className="w-4 h-4" />
            New address
          </button>
        </div>

        {/* Address Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5">
          {!!addresses?.length
            ? addresses.map((address) => (
              <AddressItem
                key={address.address_id}
                addressItem={address}
                action={
                  <button
                    onClick={() => handleDelete(address.address_id)}
                    className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                }
              />
            ))
            : renderNoAddress()}
        </div>
      </div>

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        states={states}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function AddressItem({ addressItem, action }) {
  const { address, district, state } = addressItem;

  return (
    <div className="flex gap-4 p-3 rounded-2xl shadow-md bg-white">
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {address}, {district?.district_name}
        </p>

        <p className="text-sm text-gray-500">{state?.state_name}</p>
      </div>

      {action && action}
    </div>
  );
}