// "use client";

// import { useEffect, useState, useCallback } from "react";

// import { Container, Tabs, Tab, Button } from "@mui/material";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {
//   getProfileRequest,
//   clearUser,
//   resetCart,
//   resetProfile,
//   clearWishlist,
// } from "@/redux/actions";

// import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// import { EmailVerificationBanner } from "@/auth/components";

// import { ProfileAccount } from "../profile-account";
// import { ProfileAddress } from "../profile-address";
// import { OrderView } from "../../order/view";

// import { signOut } from "@/api/auth";

// // ----------------------------------------------------------------------

// const TABS = [
//   {
//     label: "Account",
//     value: "account",
//     icon: <Iconify width={24} icon="solar:user-id-bold" />,
//   },

//   {
//     label: "Order",
//     value: "order",
//     icon: <Iconify width={24} icon="solar:bill-list-bold" />,
//   },

//   {
//     label: "Address",
//     value: "address",
//     icon: <Iconify width={24} icon="mingcute:location-fill" />,
//   },
// ];

// // ----------------------------------------------------------------------

// export function ProfileView() {
//   const dispatch = useAppDispatch();

//   const { isLogin } = useAppSelector((state) => state.auth);

//   const router = useRouter();

//   const [selectedTab, setSelectedTab] = useState("account");

//   useEffect(() => {
//     if (isLogin) {
//       dispatch(getProfileRequest());
//     } else {
//       router.push(paths.auth.signIn);
//     }
//   }, [dispatch, isLogin]);

//   const handleTab = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleLogout = useCallback(async () => {
//     try {
//       // Attempt to logout on server, but don't block client-side logout if it fails
//       await signOut();
//     } catch (error) {
//       console.error("Server logout failed (non-critical):", error);
//       // Continue with client-side logout even if server logout fails
//     }

//     // Always clear user state and logout on client side
//     dispatch(clearUser());

//     dispatch(resetCart());

//     dispatch(resetProfile());

//     dispatch(clearWishlist());

//     router.push(paths.home);

//     toast.success("You have been logged out!");
//   }, [router, dispatch]);

//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "account":
//         return <ProfileAccount />;

//       case "order":
//         return <OrderView />;

//       case "address":
//         return <ProfileAddress />;
//     }
//   };

//   return (
//     <Container maxWidth="xl" sx={{ mt: 0, mb: 5 }}>
//       <CustomBreadcrumbs
//         heading="Profile"
//         links={[{ name: "Profile", href: paths.profile.root }, { name: "Account" }]}
//         action={
//           <Button
//             variant="soft"
//             color="error"
//             startIcon={<Iconify icon="solar:logout-3-bold" />}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         }
//         sx={{ mb: 3 }}
//       />

//       <EmailVerificationBanner />

//       <Tabs
//         value={selectedTab}
//         onChange={handleTab}
//         sx={{ mb: { xs: 3, md: 5 } }}
//       >
//         {TABS.map((tab) => (
//           <Tab
//             key={tab.value}
//             label={tab.label}
//             icon={tab.icon}
//             value={tab.value}
//           />
//         ))}
//       </Tabs>

//       {renderTabContent()}
//     </Container>
//   );
// }
"use client";

import { useEffect, useState, useCallback } from "react";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getProfileRequest,
  clearUser,
  resetCart,
  resetProfile,
  clearWishlist,
} from "@/redux/actions";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import { EmailVerificationBanner } from "@/auth/components";

import { ProfileAccount } from "../profile-account";
import { ProfileAddress } from "../profile-address";
import { OrderView } from "../../order/view";

import { signOut } from "@/api/auth";

// ----------------------------------------------------------------------

const TABS = [
  {
    label: "Account",
    value: "account",
    icon: <Iconify width={24} icon="solar:user-id-bold" />,
  },
  {
    label: "Order",
    value: "order",
    icon: <Iconify width={24} icon="solar:bill-list-bold" />,
  },
  {
    label: "Address",
    value: "address",
    icon: <Iconify width={24} icon="mingcute:location-fill" />,
  },
];

// ----------------------------------------------------------------------

export function ProfileView() {
  const dispatch = useAppDispatch();

  const { isLogin } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("account");

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfileRequest());
    } else {
      router.push(paths.auth.signIn);
    }
  }, [dispatch, isLogin]);

  const handleTab = (value) => {
    setSelectedTab(value);
  };

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Server logout failed (non-critical):", error);
    }

    dispatch(clearUser());
    dispatch(resetCart());
    dispatch(resetProfile());
    dispatch(clearWishlist());

    router.push(paths.home);

    toast.success("You have been logged out!");
  }, [router, dispatch]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "account":
        return <ProfileAccount />;
      case "order":
        return <OrderView />;
      case "address":
        return <ProfileAddress />;
    }
  };

  return (
    <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 my-5">
      {/* CustomBreadcrumbs with logout action */}
      <div className="mb-0">
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Breadcrumb */}
          <CustomBreadcrumbs
            heading="Profile"
            links={[
              { name: "Profile", href: paths.profile.root },
              { name: "Account" },
            ]}
          />

          {/* Action */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <Iconify icon="solar:logout-3-bold" className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <EmailVerificationBanner />

      {/* Tabs */}
      <div className="mb-2 md:mb-2">
        <div className="flex border-b border-gray-200 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTab(tab.value)}
              className={`inline-flex items-center gap-2 px-2 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${selectedTab === tab.value
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}