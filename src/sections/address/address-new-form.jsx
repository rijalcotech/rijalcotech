// import { z as zod } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState, useEffect } from "react";

// import {
//   Box,
//   Stack,
//   Button,
//   Dialog,
//   MenuItem,
//   Divider,
//   Typography,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { Form, Field, schemaHelper } from "@/components/hook-form";
// import { toast } from "@/components/snackbar";

// import { useAppDispatch } from "@/redux/hooks";
// import { setProfileAddresses } from "@/redux/actions";

// import { addAddress } from "@/api/profile";

// // ----------------------------------------------------------------------

// export const NewAddressSchema = zod.object({
//   address: zod.string().min(1, { message: "Address is required!" }),

//   state_id: schemaHelper.nullableInput(
//     zod.string().min(1, { message: "State is required!" }),
//     {
//       message: "State is required!",
//     }
//   ),

//   district_id: schemaHelper.nullableInput(
//     zod.string().min(1, { message: "District is required!" }),
//     {
//       message: "District is required!",
//     }
//   ),
// });

// // ----------------------------------------------------------------------

// export function AddressNewForm({ open, onClose, states, isLogin = true, isInline = false, initialData = null, onAddressAddSuccess }) {
//   const dispatch = useAppDispatch();

//   const [districts, setDistricts] = useState([]);

//   const defaultValues = {
//     state_id: initialData?.state?.state_id ? String(initialData.state.state_id) : "",
//     district_id: initialData?.district?.district_id ? String(initialData.district.district_id) : "",
//     address: initialData?.address || "",
//   };

//   const methods = useForm({
//     mode: "all",
//     resolver: zodResolver(NewAddressSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = methods;

//   // Load districts when initialData has state
//   useEffect(() => {
//     if (initialData?.state?.districts) {
//       setDistricts(initialData.state.districts);
//     }
//   }, [initialData]);

//   const handleSelectState = (stateDistricts) => {
//     setDistricts(stateDistricts);
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       if (isLogin) {
//         // Logged-in user: save to backend
//         const response = await addAddress(data);

//         const addresses = response[0].addresses;

//         dispatch(setProfileAddresses(addresses));

//         reset();

//         onClose();

//         onAddressAddSuccess?.(addresses[addresses.length - 1]);

//         toast.success("Address added!");
//       } else {
//         // Guest user: skip API call, just pass data to callback
//         const selectedState = states.find(s => s.state_id === parseInt(data.state_id));
//         const selectedDistrict = districts.find(d => d.district_id === parseInt(data.district_id));

//         const guestAddressData = {
//           address_id: "guest-address",
//           address: data.address,
//           state: selectedState,
//           district: selectedDistrict,
//         };

//         reset();

//         onClose();

//         onAddressAddSuccess?.(guestAddressData);

//         toast.success(initialData ? "Order Details updated!" : "Order Details added!");
//       }
//     } catch (error) {
//       toast.error("Failed to add address!");

//       console.error(error);
//     }
//   });

//   const formContent = (
//     <Form methods={methods} onSubmit={onSubmit}>
//       <Stack spacing={3} sx={{ p: isInline ? 0 : 3 }}>
//         <Typography variant="h6"> {isInline ? "" : "Add a new address"} </Typography>

//         <Box
//           sx={{
//             rowGap: 3,
//             columnGap: 2,
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "repeat(1, 1fr)",
//               sm: "repeat(2, 1fr)",
//             },
//           }}
//         >
//           <Field.Select
//             name="state_id"
//             label="State"
//             placeholder="Choose a state"
//           >
//             <MenuItem
//               value=""
//               sx={{ fontStyle: "italic", color: "text.secondary" }}
//             >
//               None
//             </MenuItem>

//             <Divider sx={{ borderStyle: "dashed" }} />

//             {states?.map(({ state_id, state_name, districts }) => (
//               <MenuItem
//                 key={state_id}
//                 value={String(state_id)}
//                 onClick={() => handleSelectState(districts)}
//               >
//                 {state_name}
//               </MenuItem>
//             ))}
//           </Field.Select>

//           <Field.Select
//             name="district_id"
//             label="District"
//             placeholder="Choose a District"
//           >
//             <MenuItem
//               value=""
//               sx={{ fontStyle: "italic", color: "text.secondary" }}
//             >
//               None
//             </MenuItem>

//             <Divider sx={{ borderStyle: "dashed" }} />

//             {districts?.map(({ district_id, district_name }) => (
//               <MenuItem key={district_id} value={String(district_id)}>
//                 {district_name}
//               </MenuItem>
//             ))}
//           </Field.Select>
//         </Box>

//         <Field.Text name="address" label="Address" />

//         <Box sx={{ display: "flex", gap: 1, justifyContent: isInline ? "flex-start" : "flex-end" }}>
//           {!isInline && (
//             <Button color="inherit" variant="outlined" onClick={onClose}>
//               Cancel
//             </Button>
//           )}

//           <LoadingButton
//             type="submit"
//             variant="contained"
//             loading={isSubmitting}
//             fullWidth={isInline}
//             size={isInline ? "large" : "medium"}
//           >
//             {isInline ? "Continue" : "Add Address"}
//           </LoadingButton>
//         </Box>
//       </Stack>
//     </Form>
//   );

//   if (isInline) {
//     return formContent;
//   }

//   return (
//     <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
//       {formContent}
//     </Dialog>
//   );
// }
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import { Form, Field, schemaHelper } from "@/components/hook-form";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { useAppDispatch } from "@/redux/hooks";
import { setProfileAddresses } from "@/redux/actions";

import { addAddress } from "@/api/profile";

// ----------------------------------------------------------------------

export const NewAddressSchema = zod.object({
  address: zod.string().min(1, { message: "Address is required!" }),

  state_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "State is required!" }),
    { message: "State is required!" }
  ),

  district_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "District is required!" }),
    { message: "District is required!" }
  ),
});

// ----------------------------------------------------------------------

export function AddressNewForm({
  open,
  onClose,
  states,
  isLogin = true,
  isInline = false,
  initialData = null,
  onAddressAddSuccess,
}) {
  const dispatch = useAppDispatch();

  const [districts, setDistricts] = useState([]);

  const defaultValues = {
    state_id: initialData?.state?.state_id ? String(initialData.state.state_id) : "",
    district_id: initialData?.district?.district_id ? String(initialData.district.district_id) : "",
    address: initialData?.address || "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const selectedStateId = watch("state_id");

  useEffect(() => {
    if (selectedStateId && states) {
      const selectedState = states.find((s) => String(s.state_id) === selectedStateId);
      if (selectedState) {
        setDistricts(selectedState.districts || []);
      } else {
        setDistricts([]);
      }
    } else if (!initialData) {
      setDistricts([]);
    }
  }, [selectedStateId, states, initialData]);

  // Load districts when initialData has state
  useEffect(() => {
    if (initialData?.state?.districts) {
      setDistricts(initialData.state.districts);
    }
  }, [initialData]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isLogin) {
        const response = await addAddress(data);
        const addresses = response[0].addresses;

        dispatch(setProfileAddresses(addresses));
        reset();
        onClose();
        onAddressAddSuccess?.(addresses[addresses.length - 1]);
        toast.success("Address added!");
      } else {
        const selectedState = states.find((s) => s.state_id === parseInt(data.state_id));
        const selectedDistrict = districts.find((d) => d.district_id === parseInt(data.district_id));

        const guestAddressData = {
          address_id: "guest-address",
          address: data.address,
          state: selectedState,
          district: selectedDistrict,
        };

        reset();
        onClose();
        onAddressAddSuccess?.(guestAddressData);
        toast.success(initialData ? "Order Details updated!" : "Order Details added!");
      }
    } catch (error) {
      toast.error("Failed to add address!");
      console.error(error);
    }
  });

  const formContent = (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className={isInline ? "" : "p-6"}>
        <div className="flex flex-col gap-6">

          {/* Title */}
          {!isInline && (
            <h6 className="text-lg font-semibold text-gray-900">
              Add a new address
            </h6>
          )}

          {/* State + District grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            <Field.Select
              name="state_id"
              label="State"
              placeholder="Choose a state"
            >
              <option value="" className="italic text-gray-400">None</option>

              <hr className="border-dashed border-gray-300 my-1" />

              {states?.map(({ state_id, state_name }) => (
                <option
                  key={state_id}
                  value={String(state_id)}
                >
                  {state_name}
                </option>
              ))}
            </Field.Select>

            <Field.Select
              name="district_id"
              label="District"
              placeholder="Choose a District"
            >
              <option value="" className="italic text-gray-400">None</option>

              <hr className="border-dashed border-gray-300 my-1" />

              {districts?.map(({ district_id, district_name }) => (
                <option key={district_id} value={String(district_id)}>
                  {district_name}
                </option>
              ))}
            </Field.Select>
          </div>

          {/* Address text field */}
          <Field.Text name="address" label="Address" />

          {/* Actions */}
          <div
            className={`flex gap-2 ${isInline ? "justify-start" : "justify-end"}`}
          >
            {!isInline && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-150"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200
                ${isInline ? "w-full py-3 px-4 text-sm" : "px-4 py-2 text-sm"}`}
            >
              {isSubmitting ? (
                <>
                  <Iconify icon="svg-spinners:8-dots-rotate" className="w-4 h-4" />
                  {isInline ? "Continuing..." : "Adding..."}
                </>
              ) : (
                isInline ? "Continue" : "Add Address"
              )}
            </button>
          </div>

        </div>
      </div>
    </Form>
  );

  if (isInline) {
    return formContent;
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            {formContent}
          </div>
        </div>
      )}
    </>
  );
}