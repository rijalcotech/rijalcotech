// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Card, Typography } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { CONFIG } from "@/global-config";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { updateProfile } from "@/redux/actions";

// import { fData } from "@/utils/format-number";

// import { toast } from "@/components/snackbar";
// import { Form, Field } from "@/components/hook-form";

// import { updateProfileSchema } from "./profile-schema";

// import { updateProfile as updateUserProfile } from "@/api";

// // ----------------------------------------------------------------------

// export function ProfileGeneral() {
//   const dispatch = useAppDispatch();

//   const { profile } = useAppSelector((state) => state.profile);

//   const { addresses, full_name, phone_number, email, featured_image } = profile;

//   const currentUser = {
//     full_name: full_name,
//     email: email,
//     featured_image: featured_image,
//     phone_number: phone_number,
//     addresses: addresses,
//   };

//   const defaultValues = {
//     full_name: "",
//     email: "",
//     featured_image: null,
//     phone_number: "",
//     addresses: [],
//   };

//   const methods = useForm({
//     mode: "all",
//     resolver: zodResolver(updateProfileSchema),
//     defaultValues,
//     values: currentUser,
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const convertFileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       if (!(file instanceof File)) {
//         reject(new Error("Invalid file input"));
//         return;
//       }

//       const reader = new FileReader();

//       reader.onload = () => resolve(reader.result);

//       reader.onerror = (error) => reject(error);

//       reader.readAsDataURL(file);
//     });
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const updatedData = { ...data };

//       if (updatedData.featured_image instanceof File) {
//         updatedData.featured_image = await convertFileToBase64(
//           updatedData.featured_image
//         );
//       } else {
//         delete updatedData.featured_image;
//       }

//       const response = await updateUserProfile(updatedData);

//       dispatch(updateProfile(response[0]));

//       toast.success("Profile update success!");
//     } catch (error) {
//       toast.error("Couldn't update profile! Try again.");
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
//         <Typography variant="h6">General</Typography>

//         <Field.UploadAvatar
//           name="featured_image"
//           maxSize={3145728}
//           helperText={
//             <Typography
//               variant="caption"
//               sx={{
//                 mt: 3,
//                 mx: "auto",
//                 display: "block",
//                 textAlign: "center",
//                 color: "text.disabled",
//               }}
//             >
//               Allowed *.jpeg, *.jpg, *.png
//               <br /> max size of {fData(3145728)}
//             </Typography>
//           }
//         />

//         <Field.Text name="full_name" label="Name" />

//         <Field.Text name="email" label="Email address" />

//         <Field.Text name="phone_number" label="Contact" />

//         {addresses && addresses.length > 0 && (
//           <Card sx={{ p: 2, bgcolor: 'background.neutral' }}>
//             <Typography variant="subtitle2" sx={{ mb: 1 }}>
//               Address
//             </Typography>
//             {addresses.map((addr, index) => (
//               <Typography key={addr.address_id || index} variant="body2" sx={{ mb: 0.5 }}>
//                 {addr.address}
//                 {addr.district && `, ${addr.district.district_name}`}
//                 {addr.state && `, ${addr.state.state_name}`}
//               </Typography>
//             ))}
//           </Card>
//         )}

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CONFIG } from "@/global-config";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfile } from "@/redux/actions";

import { fData } from "@/utils/format-number";

import { toast } from "@/components/snackbar";
import { Form, Field } from "@/components/hook-form";

import { updateProfileSchema } from "./profile-schema";

import { updateProfile as updateUserProfile } from "@/api";

// ----------------------------------------------------------------------

export function ProfileGeneral() {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.profile);

  const { addresses, full_name, phone_number, email, featured_image } = profile;

  const currentUser = {
    full_name: full_name,
    email: email,
    featured_image: featured_image,
    phone_number: phone_number,
    addresses: addresses,
  };

  const defaultValues = {
    full_name: "",
    email: "",
    featured_image: null,
    phone_number: "",
    addresses: [],
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        reject(new Error("Invalid file input"));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = { ...data };

      if (updatedData.featured_image instanceof File) {
        updatedData.featured_image = await convertFileToBase64(
          updatedData.featured_image
        );
      } else {
        delete updatedData.featured_image;
      }

      const response = await updateUserProfile(updatedData);

      dispatch(updateProfile(response[0]));

      toast.success("Profile update success!");
    } catch (error) {
      toast.error("Couldn't update profile! Try again.");
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm p-3 lg:p-4 flex flex-col gap-3 mb-5 ">

        {/* Title */}
        <h2 className="text-lg font-semibold">General</h2>

        {/* Avatar Upload */}
        <Field.UploadAvatar
          name="featured_image"
          maxSize={3145728}
          helperText={
            <div className="mt-3 text-center text-xs text-gray-400 leading-relaxed">
              <p>Allowed *.jpeg, *.jpg, *.png</p>
              <p>max size of {fData(3145728)}</p>
            </div>
          }
        />

        {/* Fields */}
        <Field.Text name="full_name" label="Name" />

        <Field.Text name="email" label="Email address" />

        <Field.Text name="phone_number" label="Contact" />

        {/* Addresses */}
        {addresses && addresses.length > 0 && (
          <div className="bg-gray-100 rounded-xl p-2">
            <p className="text-sm font-semibold mb-1">Address</p>
            {addresses.map((addr, index) => (
              <p
                key={addr.address_id || index}
                className="text-sm text-gray-700 mb-0"
              >
                {addr.address}
                {addr.district && `, ${addr.district.district_name}`}
                {addr.state && `, ${addr.state.state_name}`}
              </p>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
    </Form>
  );
}