// "use client";

// import { z as zod } from "zod";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useBoolean } from "minimal-shared/hooks";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Box,
//   Container,
//   Link,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Divider,
//   Typography,
//   Button,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setUser } from "@/redux/actions";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { Iconify } from "@/components/iconify";
// import { Form, Field } from "@/components/hook-form";
// import { AnimateLogoRotate } from "@/components/animate";
// import { toast } from "@/components/snackbar";

// import { FormHead } from "../components/form-head";
// import { SignUpTerms } from "../components/sign-up-terms";
// import { GoogleAuth } from "../components/google-auth";

// import { AddressNewForm } from "@/sections/address";

// import { addProductToCart, signUp, useGetStates } from "@/api";

// // ----------------------------------------------------------------------

// export const SignUpSchema = zod
//   .object({
//     name: zod.string().min(1, { message: "Name is required!" }),

//     phone_number: zod
//       .string()
//       .min(1, { message: "Phone number is required!" })
//       .regex(/^\d{10}$/, {
//         message: "Phone number must be exactly 10 digits!",
//       }),

//     email: zod
//       .string()
//       .min(1, { message: "Email is required!" })
//       .email({ message: "Email must be a valid email address!" }),

//     password: zod
//       .string()
//       .min(1, { message: "Password is required!" })
//       .min(8, { message: "Password must be at least 8 characters!" }),

//     password_confirmation: zod
//       .string()
//       .min(1, { message: "Confirm password is required!" })
//       .min(8, { message: "Confirm password must be at least 8 characters!" }),
//   })
//   .refine((data) => data.password === data.password_confirmation, {
//     message: "Passwords don't match!",
//     path: ["password_confirmation"],
//   });

// // ----------------------------------------------------------------------

// export function SignUpView() {

//   const vendor = useAppSelector((state) => state.vendor.vendor);
//   const router = useRouter();

//   const showPassword = useBoolean();

//   const showConfirmPassword = useBoolean();

//   const showAddressForm = useBoolean();

//   const [isEmailVerificationPending, setIsEmailVerificationPending] =
//     useState(false);

//   const [registeredEmail, setRegisteredEmail] = useState("");

//   const dispatch = useAppDispatch();

//   const { items } = useAppSelector((state) => state.cart);
//   const { user, userToken } = useAppSelector((state) => state.auth);

//   const [errorMessage, setErrorMessage] = useState("");

//   // Redirect to profile if user is already logged in
//   useEffect(() => {
//     if (user?.customer?.id || userToken) {
//       router.push(paths.profile.root);
//     }
//   }, [user, userToken, router]);

//   const { states } = useGetStates();

//   const defaultValues = {
//     name: "",
//     phone_number: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//   };

//   const methods = useForm({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setErrorMessage("");

//       const response = await signUp(data);

//       // According to docs: Registration returns token immediately, user can login with email_verified: false
//       if (response.success && response.customer && response.token) {
//         // Store user data and token
//         dispatch(
//           setUser({
//             customer: response.customer,
//             token: response.token,
//             token_type: response.token_type,
//           })
//         );

//         // Sync cart items if any
//         if (items?.length > 0) {
//           await addProductToCart(items, response.token);
//         }

//         reset();

//         toast.success(
//           response.message ||
//           "Registration successful! Please verify your email to access full features."
//         );

//         // Show email verification pending state
//         setRegisteredEmail(data.email);
//         setIsEmailVerificationPending(true);

//         // Redirect to home after short delay
//         setTimeout(() => {
//           router.push(paths.home);
//         }, 2000);
//       }
//     } catch (error) {
//       // Handle validation errors and other errors
//       if (error?.email) {
//         setErrorMessage(error.email[0]);
//       } else if (error?.phone_number) {
//         setErrorMessage(error.phone_number[0]);
//       } else if (error?.password) {
//         setErrorMessage(error.password[0]);
//       } else if (error?.message) {
//         setErrorMessage(error.message);
//       } else {
//         setErrorMessage("Oops! Something went wrong. Please try again");
//       }
//     }
//   });

//   const renderForm = () => (
//     <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
//       <Box
//         sx={{
//           display: "flex",
//           gap: { xs: 3, sm: 2 },
//           flexDirection: { xs: "column", sm: "row" },
//         }}
//       >
//         <Field.Text
//           name="name"
//           label="Name"
//           slotProps={{ inputLabel: { shrink: true } }}
//         />

//         <Field.Text
//           name="phone_number"
//           label="Phone Number"
//           slotProps={{ inputLabel: { shrink: true } }}
//         />
//       </Box>

//       <Field.Text
//         name="email"
//         label="Email address"
//         slotProps={{ inputLabel: { shrink: true } }}
//       />

//       <Field.Text
//         name="password"
//         label="Password"
//         type={showPassword.value ? "text" : "password"}
//         slotProps={{
//           inputLabel: { shrink: true },
//           input: {
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={showPassword.onToggle} edge="end">
//                   <Iconify
//                     icon={
//                       showPassword.value
//                         ? "solar:eye-bold"
//                         : "solar:eye-closed-bold"
//                     }
//                   />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           },
//         }}
//       />

//       <Field.Text
//         name="password_confirmation"
//         label="Confirm Password"
//         type={showConfirmPassword.value ? "text" : "password"}
//         slotProps={{
//           inputLabel: { shrink: true },
//           input: {
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={showConfirmPassword.onToggle} edge="end">
//                   <Iconify
//                     icon={
//                       showConfirmPassword.value
//                         ? "solar:eye-bold"
//                         : "solar:eye-closed-bold"
//                     }
//                   />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           },
//         }}
//       />

//       <LoadingButton
//         fullWidth
//         color="inherit"
//         size="large"
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//         loadingIndicator="Create account..."
//       >
//         Create account
//       </LoadingButton>
//     </Box>
//   );

//   const renderEmailVerificationPending = () => (
//     <Box sx={{ textAlign: "center", py: 5 }}>
//       <Iconify
//         icon="eva:email-outline"
//         width={64}
//         sx={{ mx: "auto", mb: 3, color: "primary.main" }}
//       />
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Verify your email
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//         We've sent a verification link to
//       </Typography>
//       <Typography variant="subtitle1" sx={{ mb: 4 }}>
//         {registeredEmail}
//       </Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//         Please check your email and click on the verification link to activate
//         your account.
//       </Typography>
//       <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
//         <Button
//           component={RouterLink}
//           href={paths.auth.signIn}
//           variant="contained"
//           size="large"
//         >
//           Go to Login
//         </Button>
//         <Typography variant="caption" color="text.secondary">
//           Didn't receive the email? Check your spam folder.
//         </Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
//         <Box
//           component="main"
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {isEmailVerificationPending ? (
//             <Box
//               sx={{
//                 width: 1,
//                 maxWidth: 480,
//               }}
//             >
//               <AnimateLogoRotate sx={{ mx: "auto", mb: 3 }} />
//               {renderEmailVerificationPending()}
//             </Box>
//           ) : (
//             <Box
//               sx={{
//                 gap: 3,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 width: 1,
//                 maxWidth: 420,
//               }}
//             >
//               <AnimateLogoRotate sx={{ mx: "auto" }} />

//               <FormHead
//                 title="Create new account"
//                 description={
//                   <>
//                     {`Already have an account? `}
//                     <Link
//                       component={RouterLink}
//                       href={paths.auth.signIn}
//                       variant="subtitle2"
//                     >
//                       Get started
//                     </Link>
//                   </>
//                 }
//                 sx={{ textAlign: { xs: "center", md: "left" } }}
//               />

//               {!!errorMessage && (
//                 <Alert severity="error">{errorMessage}</Alert>
//               )}

//               <Form methods={methods} onSubmit={onSubmit}>
//                 {renderForm()}
//               </Form>
//               {(vendor?.has_oauth) && (
//                 <>
//                   <Divider sx={{ borderStyle: "dashed" }}>
//                     <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                       or
//                     </Typography>
//                   </Divider>

//                   <GoogleAuth type="Sign up" />
//                 </>
//               )}
//               <SignUpTerms />
//             </Box>
//           )}
//         </Box>
//       </Container>

//       <AddressNewForm
//         open={showAddressForm.value}
//         onClose={() => {
//           showAddressForm.onFalse();

//           router.push(paths.home);
//         }}
//         //
//         states={states}
//       />
//     </>
//   );
// }
"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";
import { AnimateLogoRotate } from "@/components/animate";
import { toast } from "@/components/snackbar";

import { FormHead } from "../components/form-head";
import { SignUpTerms } from "../components/sign-up-terms";
import { GoogleAuth } from "../components/google-auth";

import { AddressNewForm } from "@/sections/address";

import { addProductToCart, signUp, useGetStates } from "@/api";

// ----------------------------------------------------------------------

export const SignUpSchema = zod
  .object({
    name: zod.string().min(1, { message: "Name is required!" }),

    phone_number: zod
      .string()
      .min(1, { message: "Phone number is required!" })
      .regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits!",
      }),

    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),

    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(8, { message: "Password must be at least 8 characters!" }),

    password_confirmation: zod
      .string()
      .min(1, { message: "Confirm password is required!" })
      .min(8, { message: "Confirm password must be at least 8 characters!" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match!",
    path: ["password_confirmation"],
  });

// ----------------------------------------------------------------------

export function SignUpView() {
  const vendor = useAppSelector((state) => state.vendor.vendor);
  const router = useRouter();

  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();
  const showAddressForm = useBoolean();

  const [isEmailVerificationPending, setIsEmailVerificationPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cart);
  const { user, userToken } = useAppSelector((state) => state.auth);

  const [errorMessage, setErrorMessage] = useState("");

  // Redirect to profile if user is already logged in
  useEffect(() => {
    if (user?.customer?.id || userToken) {
      router.push(paths.profile.root);
    }
  }, [user, userToken, router]);

  const { states } = useGetStates();

  const defaultValues = {
    name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMessage("");

      const response = await signUp(data);

      if (response.success && response.customer && response.token) {
        dispatch(
          setUser({
            customer: response.customer,
            token: response.token,
            token_type: response.token_type,
          })
        );

        if (items?.length > 0) {
          await addProductToCart(items, response.token);
        }

        reset();

        toast.success(
          response.message ||
          "Registration successful! Please verify your email to access full features."
        );

        setRegisteredEmail(data.email);
        setIsEmailVerificationPending(true);

        setTimeout(() => {
          router.push(paths.home);
        }, 2000);
      }
    } catch (error) {
      if (error?.email) {
        setErrorMessage(error.email[0]);
      } else if (error?.phone_number) {
        setErrorMessage(error.phone_number[0]);
      } else if (error?.password) {
        setErrorMessage(error.password[0]);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Oops! Something went wrong. Please try again");
      }
    }
  });

  const renderForm = () => (
    <div className="flex flex-col gap-2">
      {/* Name + Phone row */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
        <Field.Text
          name="name"
          label="Name"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Field.Text
          name="phone_number"
          label="Phone Number"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </div>

      <Field.Text
        name="email"
        label="Email address"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      {/* Password */}
      <Field.Text
        name="password"
        label="Password"
        type={showPassword.value ? "text" : "password"}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={showPassword.onToggle}
                  className="p-1 rounded text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Iconify
                    icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"}
                  />
                </button>
              </div>
            ),
          },
        }}
      />

      {/* Confirm Password */}
      <Field.Text
        name="password_confirmation"
        label="Confirm Password"
        type={showConfirmPassword.value ? "text" : "password"}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={showConfirmPassword.onToggle}
                  className="p-1 rounded text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Iconify
                    icon={
                      showConfirmPassword.value
                        ? "solar:eye-bold"
                        : "solar:eye-closed-bold"
                    }
                  />
                </button>
              </div>
            ),
          },
        }}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Iconify icon="svg-spinners:8-dots-rotate" className="w-4 h-4" />
            Create account...
          </>
        ) : (
          "Create account"
        )}
      </button>
    </div>
  );

  const renderEmailVerificationPending = () => (
    <div className="text-center py-3">
      <Iconify
        icon="eva:email-outline"
        className="mx-auto mb-6 text-primary-600"
        style={{ width: 64, height: 64 }}
      />

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Verify your email
      </h2>

      <p className="text-sm text-gray-500 mb-1">
        We've sent a verification link to
      </p>

      <p className="text-base font-semibold text-gray-800 mb-4">
        {registeredEmail}
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Please check your email and click on the verification link to activate
        your account.
      </p>

      <div className="flex flex-col gap-3">
        <RouterLink
          href={paths.auth.signIn}
          className="w-full py-3 px-4 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 text-center transition-colors duration-200"
        >
          Go to Login
        </RouterLink>

        <p className="text-xs text-gray-400">
          Didn't receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="container mx-auto max-w-screen-xl mt-10 mb-10 px-4">
        <main className="flex justify-center items-center">
          {isEmailVerificationPending ? (
            <div className="w-full max-w-[500px]">
              <AnimateLogoRotate className="mx-auto" />
              {renderEmailVerificationPending()}
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full max-w-[420px]">
              <AnimateLogoRotate className="mx-auto" />

              <FormHead
                title="Create new account"
                description={
                  <>
                    {`Already have an account? `}
                    <RouterLink
                      href={paths.auth.signIn}
                      className="text-sm font-semibold text-gray-900 hover:underline"
                    >
                      Get started
                    </RouterLink>
                  </>
                }
                sx={{ textAlign: { xs: "center", md: "left" }, mb: 2 }}
              />

              {!!errorMessage && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  <Iconify
                    icon="mdi:alert-circle-outline"
                    className="w-5 h-5 mt-0.5 shrink-0"
                  />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Form methods={methods} onSubmit={onSubmit}>
                {renderForm()}
              </Form>

              {vendor?.has_oauth && (
                <>
                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-dashed border-gray-300" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="flex-1 border-t border-dashed border-gray-300" />
                  </div>

                  <GoogleAuth type="Sign up" />
                </>
              )}

              <SignUpTerms />
            </div>
          )}
        </main>
      </div>

      <AddressNewForm
        open={showAddressForm.value}
        onClose={() => {
          showAddressForm.onFalse();
          router.push(paths.home);
        }}
        states={states}
      />
    </>
  );
}