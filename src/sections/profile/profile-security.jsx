// import { useForm } from "react-hook-form";
// import { useBoolean } from "minimal-shared/hooks";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Box,
//   Card,
//   Typography,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";
// import { Form, Field } from "@/components/hook-form";

// import { changePassWordSchema } from "./profile-schema";

// import { updatePassword } from "@/api";

// // ----------------------------------------------------------------------

// export function ProfileSecurity() {
//   const showPassword = useBoolean();

//   const defaultValues = {
//     old_password: "",
//     new_password: "",
//     confirm_new_password: "",
//   };

//   const methods = useForm({
//     mode: "all",
//     resolver: zodResolver(changePassWordSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await updatePassword(data);

//       reset();

//       toast.success("Password update success!");
//     } catch (error) {
//       toast.error("Couldn't update password! Try again.");
//     }
//   });

//   return (
//     <Form methods={methods} onSubmit={onSubmit}>
//       <Card
//         sx={{
//           p: 3,
//           gap: 3,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography variant="h6">Security</Typography>

//         <Field.Text
//           name="old_password"
//           type={showPassword.value ? "text" : "password"}
//           label="Old password"
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={showPassword.onToggle} edge="end">
//                     <Iconify
//                       icon={
//                         showPassword.value
//                           ? "solar:eye-bold"
//                           : "solar:eye-closed-bold"
//                       }
//                     />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />

//         <Field.Text
//           name="new_password"
//           label="New password"
//           type={showPassword.value ? "text" : "password"}
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={showPassword.onToggle} edge="end">
//                     <Iconify
//                       icon={
//                         showPassword.value
//                           ? "solar:eye-bold"
//                           : "solar:eye-closed-bold"
//                       }
//                     />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             },
//           }}
//           helperText={
//             <Box
//               component="span"
//               sx={{ gap: 0.5, display: "flex", alignItems: "center" }}
//             >
//               <Iconify icon="eva:info-fill" width={16} /> Password must be
//               minimum 8+
//             </Box>
//           }
//         />

//         <Field.Text
//           name="confirm_new_password"
//           type={showPassword.value ? "text" : "password"}
//           label="Confirm new password"
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={showPassword.onToggle} edge="end">
//                     <Iconify
//                       icon={
//                         showPassword.value
//                           ? "solar:eye-bold"
//                           : "solar:eye-closed-bold"
//                       }
//                     />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />

//         <LoadingButton
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//           sx={{ ml: "auto" }}
//         >
//           Save changes
//         </LoadingButton>
//       </Card>
//     </Form>
//   );
// }
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";

import { changePassWordSchema } from "./profile-schema";

import { updatePassword } from "@/api";

// ----------------------------------------------------------------------

export function ProfileSecurity() {
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(changePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePassword(data);

      reset();

      toast.success("Password update success!");
    } catch (error) {
      toast.error("Couldn't update password! Try again.");
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 rounded-2xl border-0  bg-white p-3 lg:p-4 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Security</h3>

        {/* Old Password */}
        <div className="relative">
          <Field.Text
            name="old_password"
            type={showPassword ? "text" : "password"}
            label="Old password"
            className="w-full"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
          >
            <Iconify
              icon={
                showPassword
                  ? "solar:eye-bold"
                  : "solar:eye-closed-bold"
              }
              width={20}
            />
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <Field.Text
            name="new_password"
            label="New password"
            type={showPassword ? "text" : "password"}
            className="w-full"
            helperText={
              <span className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <Iconify icon="eva:info-fill" width={16} />
                Password must be minimum 8+
              </span>
            }
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
          >
            <Iconify
              icon={
                showPassword
                  ? "solar:eye-bold"
                  : "solar:eye-closed-bold"
              }
              width={20}
            />
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Field.Text
            name="confirm_new_password"
            type={showPassword ? "text" : "password"}
            label="Confirm new password"
            className="w-full"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
          >
            <Iconify
              icon={
                showPassword
                  ? "solar:eye-bold"
                  : "solar:eye-closed-bold"
              }
              width={20}
            />
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </Form>
  );
}