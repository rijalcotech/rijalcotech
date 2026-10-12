// // "use client";

// // import { Fragment } from "react";

// // import Portal from "@mui/material/Portal";
// // import { styled } from "@mui/material/styles";

// // import { AnimateLogoZoom } from "@/components/animate";

// // // ----------------------------------------------------------------------

// // export function SplashScreen({ portal = true, slotProps, sx, ...other }) {
// //   const PortalWrapper = portal ? Portal : Fragment;

// //   return (
// //     <PortalWrapper>
// //       <LoadingWrapper {...slotProps?.wrapper}>
// //         <LoadingContent sx={sx} {...other}>
// //           <AnimateLogoZoom />
// //         </LoadingContent>
// //       </LoadingWrapper>
// //     </PortalWrapper>
// //   );
// // }

// // // ----------------------------------------------------------------------

// // const LoadingWrapper = styled("div")({
// //   flexGrow: 1,
// //   display: "flex",
// //   flexDirection: "column",
// // });

// // const LoadingContent = styled("div")(({ theme }) => ({
// //   right: 0,
// //   bottom: 0,
// //   zIndex: 9998,
// //   flexGrow: 1,
// //   width: "100%",
// //   height: "100%",
// //   display: "flex",
// //   position: "fixed",
// //   alignItems: "center",
// //   justifyContent: "center",
// //   backgroundColor: theme.vars.palette.background.default,
// // }));
// "use client";

// import { Fragment } from "react";

// import Portal from "@mui/material/Portal";
// import { styled } from "@mui/material/styles";

// import { AnimateLogoZoom } from "@/components/animate";

// // ----------------------------------------------------------------------

// export function SplashScreen({ portal = true, slotProps, sx, ...other }) {
//   const PortalWrapper = portal ? Portal : Fragment;

//   return (
//     <PortalWrapper>
//       <LoadingWrapper {...slotProps?.wrapper}>
//         <LoadingContent sx={sx} {...other}>
//           <AnimateLogoZoom />
//         </LoadingContent>
//       </LoadingWrapper>
//     </PortalWrapper>
//   );
// }

// // ----------------------------------------------------------------------

// const LoadingWrapper = styled("div")({
//   flexGrow: 1,
//   display: "flex",
//   flexDirection: "column",
// });

// const LoadingContent = styled("div")(({ theme }) => ({
//   right: 0,
//   bottom: 0,
//   zIndex: 9998,
//   flexGrow: 1,
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   position: "fixed",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: theme.vars?.palette.background.default ?? theme.palette.background.default,
// }));

'use client';

import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { AnimateLogoZoom } from '@/components/animate';

export function SplashScreen({
  portal = true,
  slotProps,
  className = '',
  ...other
}) {
  const Wrapper = portal ? PortalWrapper : Fragment;

  return (
    <Wrapper>
      <div
        className={`flex flex-1 flex-col ${className}`}
        {...slotProps?.wrapper}
      >
        <div
          className="fixed inset-0 z-[9998] flex h-full w-full items-center justify-center bg-white "
          {...other}
        >
          <AnimateLogoZoom />
        </div>
      </div>
    </Wrapper>
  );
}

// ------------------------------------------------------

function PortalWrapper({ children }) {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
}