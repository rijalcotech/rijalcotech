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
//   Typography,
//   Button,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setUser, getCartDataRequest } from "@/redux/actions";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { Iconify } from "@/components/iconify";
// import { Form, Field } from "@/components/hook-form";
// import { AnimateLogoRotate } from "@/components/animate";
// import { toast } from "@/components/snackbar";

// import { FormHead } from "../components/form-head";
// import { GoogleAuth } from "../components/google-auth";

// import { syncCartToServer, signIn, requestOtp, verifyOtp, resendOtp } from "@/api";

// // ----------------------------------------------------------------------

// export const SignInSchema = zod.object({
//   email: zod
//     .string()
//     .min(1, { message: "Email is required!" })
//     .email({ message: "Email must be a valid email address!" }),
//   password: zod
//     .string()
//     .min(1, { message: "Password is required!" })
//     .min(6, { message: "Password must be at least 6 characters!" }),
// });

// export const OtpSignInSchema = zod.object({
//   email: zod
//     .string()
//     .min(1, { message: "Email is required!" })
//     .email({ message: "Email must be a valid email address!" }),
// });

// // ----------------------------------------------------------------------

// export function SignInView() {
//   const vendor = useAppSelector((state) => state.vendor.vendor);
//   const router = useRouter();

//   const showPassword = useBoolean();
//   const [isOtpMode, setIsOtpMode] = useState(false);
//   const [otpDialogOpen, setOtpDialogOpen] = useState(false);
//   const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
//   const [userEmail, setUserEmail] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [resendCountdown, setResendCountdown] = useState(0);
//   const [isResending, setIsResending] = useState(false);
//   const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

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

//   // Countdown timer for resend OTP
//   useEffect(() => {
//     if (resendCountdown > 0) {
//       const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [resendCountdown]);

//   const defaultValues = {
//     email: "",
//     password: "",
//   };

//   const methods = useForm({
//     resolver: zodResolver(isOtpMode ? OtpSignInSchema : SignInSchema),
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

//       // If in OTP mode, request OTP instead of signing in
//       if (isOtpMode) {
//         const response = await requestOtp(data.email);

//         // Handle API response structure
//         if (response?.success && response?.data) {
//           const expiryMinutes = response.data.expires_in_minutes || 5;
//           setOtpExpiryMinutes(expiryMinutes);

//           toast.success(response.message || "OTP sent to your email!");
//           setUserEmail(data.email);
//           setOtpDialogOpen(true);
//           setResendCountdown(60); // Start 60 second countdown for resend
//         } else {
//           toast.error("Failed to send OTP. Please try again.");
//         }
//         return;
//       }

//       const user = await signIn(data);

//       // Store user data and token
//       dispatch(setUser(user));

//       // Sync cart items if any (non-critical - don't fail login if sync fails)
//       // Pass token explicitly to avoid 401 errors before redux-persist saves to localStorage
//       if (items?.length > 0) {
//         try {
//           // console.log("[SIGN IN] Syncing cart items:", items);
//           await syncCartToServer(items, user.token);
//           // console.log("[SIGN IN] Cart sync successful");
//         } catch (syncError) {
//           console.error("[SIGN IN] Cart sync failed (non-critical):", syncError);
//           // Don't show error to user - cart sync is not critical for login
//         }
//       }

//       // Delay cart refresh to allow auth token to be set in axios
//       setTimeout(() => {
//         dispatch(getCartDataRequest());
//       }, 300);

//       reset();

//       // Show different messages based on email verification status
//       if (user.customer?.email_verified === false) {
//         toast.success(
//           "Login successful! Please verify your email to access full features."
//         );
//       } else {
//         toast.success("Login successful!");
//       }

//       router.back();
//     } catch (error) {
//       console.error("Sign in error:", error);

//       // Handle specific error cases from documentation
//       if (error?.status === 401 || error?.status === 422 || error?.status === 400) {
//         // Check if message is an object containing validation errors
//         if (error?.message && typeof error.message === 'object') {
//           const errorMessages = Object.values(error.message)
//             .flat()
//             .filter(msg => typeof msg === 'string');
//           setErrorMessage(errorMessages.join(", "));
//         } else if (error?.errors && typeof error.errors === 'object') {
//           // Fallback to errors field
//           const errorMessages = Object.values(error.errors)
//             .flat()
//             .filter(msg => typeof msg === 'string');
//           setErrorMessage(errorMessages.join(", "));
//         } else if (error?.message && typeof error.message === 'string') {
//           setErrorMessage(error.message);
//         } else {
//           setErrorMessage("Invalid credentials. Please check your email and password.");
//         }
//       } else if (error?.status === 403) {
//         const messageStr = typeof error?.message === 'string' ? error.message : '';
//         if (messageStr.includes("verify your email")) {
//           setErrorMessage("Please verify your email before logging in. Check your inbox for the verification link.");
//         } else if (messageStr.includes("inactive")) {
//           setErrorMessage("Your account is inactive. Please contact support.");
//         } else {
//           setErrorMessage(messageStr || "Access forbidden.");
//         }
//       } else if (error?.message) {
//         setErrorMessage(typeof error.message === 'string' ? error.message : "Oops! Something went wrong. Please try again.");
//       } else {
//         setErrorMessage("Oops! Something went wrong. Please try again.");
//       }
//     }
//   });

//   const handleToggleAuthMode = () => {
//     setIsOtpMode(!isOtpMode);
//     setErrorMessage("");
//   };

//   const handleOtpChange = (index, value) => {
//     // Only allow numbers
//     if (value && !/^[0-9]$/.test(value)) return;

//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").trim();

//     // Only process if it's exactly 6 digits
//     if (/^\d{6}$/.test(pastedData)) {
//       const newOtpValues = pastedData.split("");
//       setOtpValues(newOtpValues);

//       // Focus the last input
//       const lastInput = document.getElementById("otp-input-5");
//       if (lastInput) lastInput.focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     // Handle backspace to move to previous input
//     if (e.key === "Backspace" && !otpValues[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-input-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       setIsVerifying(true);
//       setErrorMessage("");

//       const otp = otpValues.join("");
//       if (otp.length !== 6) {
//         toast.error("Please enter complete 6-digit OTP");
//         return;
//       }

//       const user = await verifyOtp(userEmail, otp);

//       // Store user data and token
//       dispatch(setUser(user));

//       // Sync cart items if any
//       if (items?.length > 0) {
//         try {
//           await syncCartToServer(items, user.token);
//         } catch (syncError) {
//           console.error("[OTP VERIFY] Cart sync failed (non-critical):", syncError);
//         }
//       }

//       // Delay cart refresh to allow auth token to be set in axios
//       setTimeout(() => {
//         dispatch(getCartDataRequest());
//       }, 300);

//       reset();
//       setOtpDialogOpen(false);
//       setOtpValues(["", "", "", "", "", ""]);

//       toast.success("Login successful!");
//       router.back();
//     } catch (error) {
//       console.error("OTP verification error:", error);

//       // Handle validation errors from API
//       if (error?.status === 422 || error?.status === 400) {
//         // Check if message is an object containing validation errors
//         if (error?.message && typeof error.message === 'object') {
//           const errorMessages = Object.values(error.message)
//             .flat()
//             .filter(msg => typeof msg === 'string');
//           setErrorMessage(errorMessages.join(", "));
//         } else if (error?.errors && typeof error.errors === 'object') {
//           // Fallback to errors field
//           const errorMessages = Object.values(error.errors)
//             .flat()
//             .filter(msg => typeof msg === 'string');
//           setErrorMessage(errorMessages.join(", "));
//         } else if (error?.message && typeof error.message === 'string') {
//           setErrorMessage(error.message);
//         } else {
//           setErrorMessage("Invalid OTP. Please try again.");
//         }
//       } else if (error?.message) {
//         setErrorMessage(typeof error.message === 'string' ? error.message : "Invalid OTP. Please try again.");
//       } else {
//         setErrorMessage("Invalid OTP. Please try again.");
//       }
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleCloseOtpDialog = () => {
//     setOtpDialogOpen(false);
//     setOtpValues(["", "", "", "", "", ""]);
//     setErrorMessage("");
//     setResendCountdown(0);
//   };

//   const handleResendOtp = async () => {
//     try {
//       setIsResending(true);
//       setErrorMessage("");

//       const response = await resendOtp(userEmail);

//       // Handle API response structure
//       if (response?.success) {
//         const expiryMinutes = response.data?.expires_in_minutes || 5;
//         setOtpExpiryMinutes(expiryMinutes);

//         toast.success(response.message || "OTP resent to your email!");

//         // Reset OTP values and start countdown
//         setOtpValues(["", "", "", "", "", ""]);
//         setResendCountdown(60); // 60 seconds countdown for resend

//         // Focus first input
//         const firstInput = document.getElementById("otp-input-0");
//         if (firstInput) firstInput.focus();
//       }
//     } catch (error) {
//       console.error("Resend OTP error:", error);
//       if (error?.message) {
//         toast.error(error.message);
//       } else {
//         toast.error("Failed to resend OTP. Please try again.");
//       }
//     } finally {
//       setIsResending(false);
//     }
//   };

//   const renderForm = () => (
//     <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
//       <Field.Text
//         name="email"
//         label="Email address"
//         slotProps={{ inputLabel: { shrink: true } }}
//       />

//       {!isOtpMode && (
//         <Field.Text
//           name="password"
//           label="Password"
//           type={showPassword.value ? "text" : "password"}
//           slotProps={{
//             inputLabel: { shrink: true },
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
//       )}

//       <LoadingButton
//         fullWidth
//         color="inherit"
//         size="large"
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//         loadingIndicator={isOtpMode ? "Requesting OTP..." : "Sign in..."}
//       >
//         {isOtpMode ? "Request OTP" : "Sign in"}
//       </LoadingButton>
//     </Box>
//   );

//   const renderFormFooter = () => (
//     <Box sx={{ gap: 1, display: "flex", alignItems: "center" }}>
//       <Typography variant="body" sx={{ color: "text.secondary" }}>
//         Don't have an account?
//       </Typography>

//       <Button
//         component={RouterLink}
//         href={paths.auth.signUp}
//         size="small"
//         variant="soft"
//         color="primary"
//       >
//         Get started
//       </Button>
//     </Box>
//   );

//   return (
//     <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             gap: 2,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             width: 1,
//             maxWidth: 420,
//           }}
//         >
//           <AnimateLogoRotate sx={{ mx: "auto" }} />

//           <Typography
//             variant="h1"
//             sx={{ textAlign: { xs: "center", md: "left" }, fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}
//           >
//             Sign in to your account
//           </Typography>
//           {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

//           <Form methods={methods} onSubmit={onSubmit}>
//             {renderForm()}
//           </Form>

//           <Divider sx={{ borderStyle: "dashed" }}>
//             <Typography variant="body2" sx={{ color: "text.secondary" }}>
//               or
//             </Typography>
//           </Divider>

//           <Button
//             onClick={handleToggleAuthMode}
//             variant="outlined"
//             startIcon={<Iconify icon={isOtpMode ? "mdi:lock-outline" : "mdi:email-lock-outline"} />}
//           >
//             {isOtpMode ? "Sign In with Password" : "Sign In with OTP"}
//           </Button>
//           {(vendor?.has_oauth) && (
//             <>
//               <GoogleAuth type="Sign in" />
//             </>
//           )}
//           {renderFormFooter()}
//         </Box>
//       </Box>

//       {/* OTP Dialog */}
//       <Dialog
//         open={otpDialogOpen}
//         onClose={handleCloseOtpDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           <Box sx={{ textAlign: "center" }}>
//             <Typography variant="h4">Verify OTP</Typography>
//             <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
//               Enter the 6-digit code sent to {userEmail}
//             </Typography>
//             <Typography variant="caption" sx={{ color: "warning.main", mt: 0.5, display: "block" }}>
//               OTP expires in {otpExpiryMinutes} {otpExpiryMinutes === 1 ? "minute" : "minutes"}
//             </Typography>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           {!!errorMessage && (
//             <Alert severity="error" sx={{ mb: 3 }}>
//               {errorMessage}
//             </Alert>
//           )}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 1.5,
//               justifyContent: "center",
//               mt: 2,
//             }}
//           >
//             {otpValues.map((value, index) => (
//               <TextField
//                 key={index}
//                 id={`otp-input-${index}`}
//                 value={value}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                 onPaste={handleOtpPaste}
//                 inputProps={{
//                   maxLength: 1,
//                   style: {
//                     textAlign: "center",
//                     fontSize: "1.5rem",
//                     fontWeight: "bold",
//                   },
//                 }}
//                 sx={{
//                   width: 56,
//                   "& input": {
//                     padding: "12px",
//                   },
//                 }}
//                 autoFocus={index === 0}
//               />
//             ))}
//           </Box>

//           {/* Resend OTP */}
//           <Box sx={{ textAlign: "center", mt: 3 }}>
//             {resendCountdown > 0 ? (
//               <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                 Resend OTP in {resendCountdown}s
//               </Typography>
//             ) : (
//               <Button
//                 variant="text"
//                 size="small"
//                 onClick={handleResendOtp}
//                 disabled={isResending}
//                 startIcon={isResending ? <Iconify icon="svg-spinners:8-dots-rotate" /> : <Iconify icon="mdi:email-fast-outline" />}
//               >
//                 {isResending ? "Resending..." : "Resend OTP"}
//               </Button>
//             )}
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
//           <LoadingButton
//             fullWidth
//             size="large"
//             variant="contained"
//             color="inherit"
//             onClick={handleVerifyOtp}
//             loading={isVerifying}
//             loadingIndicator="Verifying..."
//           >
//             Verify OTP
//           </LoadingButton>
//           <Button
//             fullWidth
//             size="large"
//             variant="outlined"
//             onClick={handleCloseOtpDialog}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, getCartDataRequest } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";
import { AnimateLogoRotate } from "@/components/animate";
import { toast } from "@/components/snackbar";

import { FormHead } from "../components/form-head";
import { GoogleAuth } from "../components/google-auth";

import { syncCartToServer, signIn, requestOtp, verifyOtp, resendOtp } from "@/api";

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export const OtpSignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
});

// ----------------------------------------------------------------------

export function SignInView() {
  const vendor = useAppSelector((state) => state.vendor.vendor);
  const router = useRouter();

  const showPassword = useBoolean();
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [userEmail, setUserEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

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

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(isOtpMode ? OtpSignInSchema : SignInSchema),
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

      if (isOtpMode) {
        const response = await requestOtp(data.email);

        if (response?.success && response?.data) {
          const expiryMinutes = response.data.expires_in_minutes || 5;
          setOtpExpiryMinutes(expiryMinutes);

          toast.success(response.message || "OTP sent to your email!");
          setUserEmail(data.email);
          setOtpDialogOpen(true);
          setResendCountdown(60);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
        return;
      }

      const user = await signIn(data);

      dispatch(setUser(user));

      if (items?.length > 0) {
        try {
          await syncCartToServer(items, user.token);
        } catch (syncError) {
          console.error("[SIGN IN] Cart sync failed (non-critical):", syncError);
        }
      }

      setTimeout(() => {
        dispatch(getCartDataRequest());
      }, 300);

      reset();

      if (user.customer?.email_verified === false) {
        toast.success("Login successful! Please verify your email to access full features.");
      } else {
        toast.success("Login successful!");
      }

      router.back();
    } catch (error) {
      console.error("Sign in error:", error);

      if (error?.status === 401 || error?.status === 422 || error?.status === 400) {
        if (error?.message && typeof error.message === "object") {
          const errorMessages = Object.values(error.message).flat().filter((msg) => typeof msg === "string");
          setErrorMessage(errorMessages.join(", "));
        } else if (error?.errors && typeof error.errors === "object") {
          const errorMessages = Object.values(error.errors).flat().filter((msg) => typeof msg === "string");
          setErrorMessage(errorMessages.join(", "));
        } else if (error?.message && typeof error.message === "string") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Invalid credentials. Please check your email and password.");
        }
      } else if (error?.status === 403) {
        const messageStr = typeof error?.message === "string" ? error.message : "";
        if (messageStr.includes("verify your email")) {
          setErrorMessage("Please verify your email before logging in. Check your inbox for the verification link.");
        } else if (messageStr.includes("inactive")) {
          setErrorMessage("Your account is inactive. Please contact support.");
        } else {
          setErrorMessage(messageStr || "Access forbidden.");
        }
      } else if (error?.message) {
        setErrorMessage(typeof error.message === "string" ? error.message : "Oops! Something went wrong. Please try again.");
      } else {
        setErrorMessage("Oops! Something went wrong. Please try again.");
      }
    }
  });

  const handleToggleAuthMode = () => {
    setIsOtpMode(!isOtpMode);
    setErrorMessage("");
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtpValues = pastedData.split("");
      setOtpValues(newOtpValues);

      const lastInput = document.getElementById("otp-input-5");
      if (lastInput) lastInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifying(true);
      setErrorMessage("");

      const otp = otpValues.join("");
      if (otp.length !== 6) {
        toast.error("Please enter complete 6-digit OTP");
        return;
      }

      const user = await verifyOtp(userEmail, otp);

      dispatch(setUser(user));

      if (items?.length > 0) {
        try {
          await syncCartToServer(items, user.token);
        } catch (syncError) {
          console.error("[OTP VERIFY] Cart sync failed (non-critical):", syncError);
        }
      }

      setTimeout(() => {
        dispatch(getCartDataRequest());
      }, 300);

      reset();
      setOtpDialogOpen(false);
      setOtpValues(["", "", "", "", "", ""]);

      toast.success("Login successful!");
      router.back();
    } catch (error) {
      console.error("OTP verification error:", error);

      if (error?.status === 422 || error?.status === 400) {
        if (error?.message && typeof error.message === "object") {
          const errorMessages = Object.values(error.message).flat().filter((msg) => typeof msg === "string");
          setErrorMessage(errorMessages.join(", "));
        } else if (error?.errors && typeof error.errors === "object") {
          const errorMessages = Object.values(error.errors).flat().filter((msg) => typeof msg === "string");
          setErrorMessage(errorMessages.join(", "));
        } else if (error?.message && typeof error.message === "string") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
        }
      } else if (error?.message) {
        setErrorMessage(typeof error.message === "string" ? error.message : "Invalid OTP. Please try again.");
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseOtpDialog = () => {
    setOtpDialogOpen(false);
    setOtpValues(["", "", "", "", "", ""]);
    setErrorMessage("");
    setResendCountdown(0);
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setErrorMessage("");

      const response = await resendOtp(userEmail);

      if (response?.success) {
        const expiryMinutes = response.data?.expires_in_minutes || 5;
        setOtpExpiryMinutes(expiryMinutes);

        toast.success(response.message || "OTP resent to your email!");

        setOtpValues(["", "", "", "", "", ""]);
        setResendCountdown(60);

        const firstInput = document.getElementById("otp-input-0");
        if (firstInput) firstInput.focus();
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const renderForm = () => (
    <div className="flex flex-col gap-2">
      <Field.Text
        name="email"
        label="Email address"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      {!isOtpMode && (
        <div className="relative">
          <Field.Text
            name="password"
            label="Password"
            type={showPassword.value ? "text" : "password"}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
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
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Iconify icon="svg-spinners:8-dots-rotate" className="w-4 h-4" />
            {isOtpMode ? "Requesting OTP..." : "Sign in..."}
          </>
        ) : (
          isOtpMode ? "Request OTP" : "Sign in"
        )}
      </button>
    </div>
  );

  const renderFormFooter = () => (
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-500">Don't have an account?</span>
      <RouterLink
        href={paths.auth.signUp}
        className="text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 py-1 rounded-md transition-colors duration-150"
      >
        Get started
      </RouterLink>
    </div>
  );

  return (
    <div className="container mx-auto max-w-screen-xl my-20 px-4">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-2 w-full max-w-[420px]">

          {/* Logo */}
          <AnimateLogoRotate className="mx-auto" />

          {/* Title */}
          <h1 className="text-center md:text-left font-bold text-xl sm:text-2xl md:text-2xl">
            Sign in to your account
          </h1>

          {/* Error Alert */}
          {!!errorMessage && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              <Iconify icon="mdi:alert-circle-outline" className="w-5 h-5 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <Form methods={methods} onSubmit={onSubmit}>
            {renderForm()}
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-dashed border-gray-300" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-dashed border-gray-300" />
          </div>

          {/* Toggle OTP / Password mode */}
          <button
            type="button"
            onClick={handleToggleAuthMode}
            className="w-full flex items-center justify-center gap-1 py-1 px-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-150"
          >
            <Iconify icon={isOtpMode ? "mdi:lock-outline" : "mdi:email-lock-outline"} className="w-5 h-5" />
            {isOtpMode ? "Sign In with Password" : "Sign In with OTP"}
          </button>

          {/* Google Auth */}
          {vendor?.has_oauth && (
            <GoogleAuth type="Sign in" />
          )}

          {/* Footer */}
          {renderFormFooter()}
        </div>
      </div>

      {/* OTP Dialog */}
      {otpDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseOtpDialog(); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

            {/* Dialog Title */}
            <div className="px-6 pt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter the 6-digit code sent to <span className="font-medium text-gray-700">{userEmail}</span>
              </p>
              <p className="text-xs text-amber-500 mt-1">
                OTP expires in {otpExpiryMinutes} {otpExpiryMinutes === 1 ? "minute" : "minutes"}
              </p>
            </div>

            {/* Dialog Content */}
            <div className="px-6 pt-4 pb-2">
              {/* Error Alert */}
              {!!errorMessage && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                  <Iconify icon="mdi:alert-circle-outline" className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* OTP Inputs */}
              <div className="flex gap-3 justify-center mt-2">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    autoFocus={index === 0}
                    className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-150"
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <div className="text-center mt-5">
                {resendCountdown > 0 ? (
                  <p className="text-sm text-gray-400">
                    Resend OTP in <span className="font-medium text-gray-600">{resendCountdown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Iconify
                      icon={isResending ? "svg-spinners:8-dots-rotate" : "mdi:email-fast-outline"}
                      className="w-4 h-4"
                    />
                    {isResending ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="w-full py-3 px-4 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Iconify icon="svg-spinners:8-dots-rotate" className="w-4 h-4" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <button
                type="button"
                onClick={handleCloseOtpDialog}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
