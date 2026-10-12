// "use client";

// import { useEffect } from "react";

// import Grid from "@mui/material/Grid2";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { getProfileRequest } from "@/redux/actions";

// import { CartOverview } from "../cart-overview";
// import { CartSteps } from "../cart-steps";
// import { CartBillingAddress } from "../cart-billing-address";

// // ----------------------------------------------------------------------

// const CHECKOUT_STEPS = ["Cart", "Billing & address"];

// export function CartView() {
//   const dispatch = useAppDispatch();

//   const { activeStep } = useAppSelector((state) => state.cart);
//   const { isLogin } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     if (isLogin) {
//       dispatch(getProfileRequest());
//     }
//   }, [isLogin, dispatch]);

//   return (
//     <Container maxWidth="xl" sx={{ mt: 0, mb: 10 }}>
//       <Typography variant="h1" sx={{ my: { xs: 3, md: 5 }, fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}>
//         Cart
//       </Typography>

//       {/* <Grid container justifyContent={"flex-start"}>
//         <Grid size={{ xs: 12, md: 8 }}>
//           <CartSteps steps={CHECKOUT_STEPS} activeStep={activeStep} />
//         </Grid>
//       </Grid> */}

//       <>
//         {activeStep === 0 && <CartOverview />}

//         {activeStep === 1 && <CartBillingAddress />}
//       </>
//     </Container>
//   );
// }
"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileRequest } from "@/redux/actions";

import { CartOverview } from "../cart-overview";
import { CartSteps } from "../cart-steps";
import { CartBillingAddress } from "../cart-billing-address";

// ----------------------------------------------------------------------

const CHECKOUT_STEPS = ["Cart", "Billing & address"];

export function CartView() {
  const dispatch = useAppDispatch();

  const { activeStep } = useAppSelector((state) => state.cart);
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfileRequest());
    }
  }, [isLogin, dispatch]);

  return (
    <div className="container max-w-7xl mx-auto mt-0 mb-20">
      <h1 className="text-lg sm:text-xl md:text-2xl my-0 md:my-10 font-bold">
        Cart
      </h1>

      {/* <div className="flex justify-start">
        <div className="w-full md:w-2/3">
          <CartSteps steps={CHECKOUT_STEPS} activeStep={activeStep} />
        </div>
      </div> */}

      <>
        {activeStep === 0 && <CartOverview />}
        {activeStep === 1 && <CartBillingAddress />}
      </>
    </div>
  );
}