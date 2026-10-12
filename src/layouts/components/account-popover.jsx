// import { usePopover } from "minimal-shared/hooks";

// import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
// import Divider from "@mui/material/Divider";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";

// import { CONFIG } from "@/global-config";

// import { useAppSelector } from "@/redux/hooks";

// import { RouterLink } from "@/routes/components";

// import { Label } from "@/components/label";
// import { CustomPopover } from "@/components/custom-popover";

// import { AccountButton } from "./account-button";
// import { SignOutButton } from "./sign-out-button";

// // ----------------------------------------------------------------------

// export function AccountPopover({ data = [], sx, ...other }) {
//   const { profile } = useAppSelector((state) => state.profile);

//   const { open, anchorEl, onClose, onOpen } = usePopover();

//   const renderMenuActions = () => (
//     <CustomPopover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       slotProps={{ paper: { sx: { p: 0, width: 200 } }, arrow: { offset: 20 } }}
//     >
//       <Box sx={{ p: 2, pb: 1.5 }}>
//         <Typography variant="subtitle2" noWrap>
//           {profile?.full_name}
//         </Typography>

//         <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
//           {profile?.email}
//         </Typography>
//       </Box>

//       <Divider sx={{ borderStyle: "dashed" }} />

//       <MenuList sx={{ p: 1, my: 1, "& li": { p: 0 } }}>
//         {data.map((option) => {
//           return (
//             <MenuItem key={option.label}>
//               <Link
//                 component={RouterLink}
//                 href={option.href}
//                 color="inherit"
//                 underline="none"
//                 onClick={onClose}
//                 sx={{
//                   px: 1,
//                   py: 0.75,
//                   width: 1,
//                   display: "flex",
//                   typography: "body2",
//                   alignItems: "center",
//                   color: "text.secondary",
//                   "& svg": { width: 24, height: 24 },
//                   "&:hover": { color: "text.primary" },
//                 }}
//               >
//                 {option.icon}

//                 <Box component="span" sx={{ ml: 2 }}>
//                   {option.label}
//                 </Box>

//                 {option.info && (
//                   <Label color="error" sx={{ ml: 1 }}>
//                     {option.info}
//                   </Label>
//                 )}
//               </Link>
//             </MenuItem>
//           );
//         })}
//       </MenuList>

//       <Divider sx={{ borderStyle: "dashed" }} />

//       <Box sx={{ p: 1 }}>
//         <SignOutButton
//           size="medium"
//           variant="text"
//           onClose={onClose}
//           sx={{ display: "block", textAlign: "left" }}
//         />
//       </Box>
//     </CustomPopover>
//   );

//   return (
//     <>
//       <AccountButton
//         onClick={onOpen}
//         photoURL={`${profile?.featured_image}`}
//         displayName={profile?.customer_name}
//         sx={sx}
//         {...other}
//       />

//       {renderMenuActions()}
//     </>
//   );
// }
// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import clsx from 'clsx';
// import { useAppSelector } from '@/redux/hooks';
// import { RouterLink } from '@/routes/components';

// import { AccountButton } from './account-button';
// import { SignOutButton } from './sign-out-button';

// // ------------------------------------------------------

// export function AccountPopover({ data = [], className = '', ...other }) {
//   const { profile } = useAppSelector((state) => state.profile);

//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   const onOpen = () => setOpen(true);
//   const onClose = () => setOpen(false);

//   // close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () =>
//       document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={ref} className={clsx('relative inline-block', className)} {...other}>
//       {/* BUTTON */}
//       <AccountButton
//         onClick={onOpen}
//         photoURL={profile?.featured_image}
//         displayName={profile?.customer_name}
//       />

//       {/* DROPDOWN */}
//       {open && (
//         <div
//           className="
//             absolute right-0 mt-2 w-52
//             rounded-xl border border-gray-200 
//             bg-white 
//             shadow-lg z-50
//           "
//         >
//           {/* USER INFO */}
//           <div className="p-3 pb-2">
//             <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
//               {profile?.full_name}
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//               {profile?.email}
//             </p>
//           </div>

//           {/* DIVIDER */}
//           <div className="border-t border-dashed border-gray-200 dark:border-gray-700" />

//           {/* MENU */}
//           <ul className="p-1 my-1 space-y-1">
//             {data.map((option) => (
//               <li key={option.label}>
//                 <RouterLink
//                   href={option.href}
//                   onClick={onClose}
//                   className="
//                     flex items-center w-full px-2 py-2 rounded-md
//                     text-sm text-gray-500 dark:text-gray-400
//                     hover:text-gray-900 dark:hover:text-white
//                     hover:bg-gray-100 dark:hover:bg-gray-800
//                     transition
//                   "
//                 >
//                   {/* ICON */}
//                   <span className="w-6 h-6 flex items-center justify-center">
//                     {option.icon}
//                   </span>

//                   {/* LABEL */}
//                   <span className="ml-3 flex-1">
//                     {option.label}
//                   </span>

//                   {/* BADGE */}
//                   {option.info && (
//                     <span
//                       className="
//                         ml-2 text-[10px] px-2 py-0.5
//                         rounded-full bg-red-500 text-white
//                       "
//                     >
//                       {option.info}
//                     </span>
//                   )}
//                 </RouterLink>
//               </li>
//             ))}
//           </ul>

//           {/* DIVIDER */}
//           <div className="border-t border-dashed border-gray-200 dark:border-gray-700" />

//           {/* SIGN OUT */}
//           <div className="p-2">
//             <SignOutButton
//               size="medium"
//               variant="text"
//               onClose={onClose}
//               className="w-full text-left text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";

import { AccountButton } from "./account-button";
import { SignOutButton } from "./sign-out-button";

// ----------------------------------------------------------------------

export function AccountPopover({
  data = [],
  className = "",
  ...other
}) {
  const { profile } = useAppSelector(
    (state) => state.profile
  );

  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  // ----------------------------------------------------------------------
  // Close on outside click
  // ----------------------------------------------------------------------

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ----------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative flex items-center",
        className
      )}
      {...other}
    >
      <AccountButton
        onClick={() =>
          setOpen((prev) => !prev)
        }
        photoURL={profile?.featured_image}
        displayName={
          profile?.customer_name ||
          profile?.full_name
        }
      />

      {open && (
        <div
          className="
            absolute right-0 top-full mt-3
            z-[9999]
            min-w-[260px]
            overflow-hidden
            rounded-2xl
            border border-gray-200
            bg-white
            shadow-[0_20px_50px_rgba(0,0,0,0.12)]
            animate-in fade-in zoom-in-95
            duration-150
          "
        >
          {/* Arrow */}
          <div
            className="
              absolute -top-2 right-6
              h-4 w-4
              rotate-45
              border-l border-t border-gray-200
              bg-white
            "
          />

          {/* User Info */}
          <div className="relative px-4 py-4">
            <p className="truncate text-sm font-semibold text-gray-900">
              {profile?.full_name || "User"}
            </p>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {profile?.email}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Menu */}
          <div className="p-2">
            {data.map((option) => (
              <RouterLink
                key={option.label}
                href={option.href}
                onClick={onClose}
                className="
                  group flex items-center
                  rounded-xl
                  px-3 py-2.5
                  text-sm font-medium
                  text-gray-600
                  transition-all duration-150
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                {/* Icon */}
                <span
                  className="
                    flex h-6 w-6 shrink-0
                    items-center justify-center
                    [&>svg]:h-6
                    [&>svg]:w-6
                  "
                >
                  {option.icon}
                </span>

                {/* Label */}
                <span className="ml-3 flex-1">
                  {option.label}
                </span>

                {/* Badge */}
                {option.info && (
                  <span
                    className="
                      ml-2
                      rounded-full
                      bg-red-500
                      px-2 py-0.5
                      text-[10px]
                      font-semibold
                      text-white
                    "
                  >
                    {option.info}
                  </span>
                )}
              </RouterLink>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Logout */}
          <div className="p-2">
            <div
              className="
                rounded-xl
                transition-colors
                hover:bg-gray-100
              "
            >
              <SignOutButton
                onClose={onClose}
                className="
                  flex w-full items-center
                  justify-start
                  px-3 py-2.5
                  text-sm font-medium
                  text-gray-600
                "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}