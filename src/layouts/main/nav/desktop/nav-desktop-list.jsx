// import { useBoolean, usePopoverHover } from "minimal-shared/hooks";
// import { useRef, useEffect, useCallback } from "react";
// import {
//   isEqualPath,
//   isActiveLink,
//   isExternalLink,
// } from "minimal-shared/utils";

// import {
//   useTheme,
//   Box,
//   Stack,
//   Typography,
//   MenuList,
//   MenuItem,
// } from "@mui/material";

// import { useAppDispatch } from "@/redux/hooks";
// import { setCategory, setBrand } from "@/redux/actions";

// import { paths } from "@/routes/paths";
// import { usePathname, useRouter } from "@/routes/hooks";

// import { Iconify } from "@/components/iconify";
// import { CustomPopover } from "@/components/custom-popover";

// import { NavItem } from "./nav-desktop-item";
// import { Nav, NavLi, NavUl, NavDropdown } from "../components";
// import { NavItemDashboard } from "./nav-desktop-item-dashboard";

// // ----------------------------------------------------------------------

// export function NavList({ data, sx, ...other }) {
//   const pathname = usePathname();
//   const navItemRef = useRef(null);

//   const isActive = isActiveLink(pathname, data.path, !!data.children);
//   const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

//   useEffect(() => {
//     if (open) {
//       onClose();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   const handleOpenMenu = useCallback(() => {
//     if (data.children) {
//       onOpen();
//     }
//   }, [data.children, onOpen]);

//   const renderNavItem = () => (
//     <NavItem
//       ref={navItemRef}
//       // slots
//       path={data.path}
//       title={data.title}
//       // state
//       open={open}
//       active={isActive}
//       // options
//       hasChild={!!data.children}
//       externalLink={isExternalLink(data.path)}
//       // action
//       onMouseEnter={handleOpenMenu}
//       onMouseLeave={onClose}
//     />
//   );

//   const renderDropdown = () =>
//     !!data.children && (
//       <NavDropdown
//         open={open}
//         onMouseEnter={handleOpenMenu}
//         onMouseLeave={onClose}
//       >
//         <Nav>
//           <NavUl sx={{ gap: 3, flexDirection: "row" }}>
//             {data.children.map((list) => (
//               <NavSubList
//                 key={list.subheader}
//                 subheader={list.subheader}
//                 data={list.items}
//               />
//             ))}
//           </NavUl>
//         </Nav>
//       </NavDropdown>
//     );

//   return (
//     <NavLi sx={sx} {...other}>
//       {renderNavItem()}
//       {renderDropdown()}
//     </NavLi>
//   );
// }

// // ----------------------------------------------------------------------

// function NavSubList({ data, subheader, sx, ...other }) {
//   const pathname = usePathname();

//   const isDashboard = subheader === "Dashboard";

//   return (
//     <NavLi
//       sx={[
//         () => ({
//           flexGrow: 1,
//           flexBasis: "auto",
//           flexShrink: isDashboard ? 1 : 0,
//           ...(isDashboard && { maxWidth: 560 }),
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <NavUl>
//         <NavLi
//           sx={(theme) => ({
//             mb: 0.75,
//             typography: "overline",
//             fontSize: theme.typography.pxToRem(11),
//           })}
//         >
//           {subheader}
//         </NavLi>

//         {data.map((item) =>
//           isDashboard ? (
//             <NavLi key={item.title} sx={{ mt: 0.75 }}>
//               <NavItemDashboard path={item.path} />
//             </NavLi>
//           ) : (
//             <NavLi key={item.title} sx={{ mt: 0.75 }}>
//               <NavItem
//                 subItem
//                 title={item.title}
//                 path={item.path}
//                 active={isEqualPath(item.path, pathname)}
//               />
//             </NavLi>
//           )
//         )}
//       </NavUl>
//     </NavLi>
//   );
// }

// export function NavCategoryList({ category }) {
//   const { category_id, name, has_sub_cat, show_in_home, subCategories } =
//     category;

//   const theme = useTheme();

//   const router = useRouter();

//   const dispatch = useAppDispatch();

//   const { open, onOpen, onClose, elementRef, anchorEl } = usePopoverHover();

//   const handleOpenMenu = useCallback(() => {
//     if (has_sub_cat) {
//       onOpen();
//     }
//   }, [has_sub_cat]);

//   const handleSelectCategory = (categoryId) => {
//     dispatch(setCategory(categoryId));
//     dispatch(setBrand([]));

//     router.push(paths.product.root);
//   };

//   const renderNavItem = () => (
//     <Box
//       ref={elementRef}
//       onMouseEnter={handleOpenMenu}
//       onMouseLeave={onClose}
//       onClick={() => handleSelectCategory(category_id)}
//       sx={{ cursor: "pointer", display: "flex", gap: 1 }}
//     >
//       <Typography
//         variant="body2"
//         sx={{
//           fontWeight: theme.typography.fontWeightMedium,
//         }}
//       >
//         {name}
//       </Typography>

//       {has_sub_cat && <Iconify icon="eva:arrow-ios-downward-fill" />}
//     </Box>
//   );

//   const renderDropdown = () =>
//     has_sub_cat &&
//     open && (
//       <CustomPopover
//         open={open}
//         anchorEl={anchorEl}
//         slotProps={{
//           arrow: { placement: "top-center", hide: true },
//           paper: {
//             onMouseEnter: onOpen,
//             onMouseLeave: onClose,
//             sx: { ...(open && { pointerEvents: "auto" }) },
//           },
//         }}
//         sx={{ pointerEvents: "none" }}
//       >
//         <MenuList>
//           {subCategories?.map((subCategory) => (
//             <MenuItem
//               key={subCategory.category_id}
//               onClick={() => handleSelectCategory(subCategory.category_id)}
//               sx={{ fontWeight: "fontWeightMedium" }}
//             >
//               {subCategory.name}
//             </MenuItem>
//           ))}
//         </MenuList>
//       </CustomPopover>
//     );

//   if (!show_in_home) return null;

//   return (
//     <NavLi>
//       {renderNavItem()}

//       {renderDropdown()}
//     </NavLi>
//   );
// }
import { useBoolean, usePopoverHover } from "minimal-shared/hooks";
import { useRef, useEffect, useCallback } from "react";
import {
  isEqualPath,
  isActiveLink,
  isExternalLink,
} from "minimal-shared/utils";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory, setBrand } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { usePathname, useRouter } from "@/routes/hooks";

import { Iconify } from "@/components/iconify";

import { NavItem } from "./nav-desktop-item";
import { Nav, NavLi, NavUl, NavDropdown } from "../components";
import { NavItemDashboard } from "./nav-desktop-item-dashboard";

// ----------------------------------------------------------------------

export function NavList({ data, sx, ...other }) {
  const pathname = usePathname();
  const navItemRef = useRef(null);

  const isActive = isActiveLink(pathname, data.path, !!data.children);
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      // slots
      path={data.path}
      title={data.title}
      // state
      open={open}
      active={isActive}
      // options
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown
        open={open}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={onClose}
      >
        <Nav>
          {/* gap-6 ≈ gap: 3 (3 * 8px = 24px), flex-row */}
          <NavUl className="flex flex-row gap-6">
            {data.children.map((list) => (
              <NavSubList
                key={list.subheader}
                subheader={list.subheader}
                data={list.items}
              />
            ))}
          </NavUl>
        </Nav>
      </NavDropdown>
    );

  return (
    <NavLi {...other}>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, subheader, ...other }) {
  const pathname = usePathname();

  const isDashboard = subheader === "Dashboard";

  return (
    <NavLi
      className={[
        "flex-auto",
        isDashboard ? "flex-shrink max-w-[560px]" : "flex-shrink-0",
      ].join(" ")}
      {...other}
    >
      <NavUl>
        {/* mb-[6px] ≈ mb: 0.75 (0.75 * 8px = 6px), overline style, text-[11px] */}
        <NavLi className="mb-[6px] text-[11px] font-semibold uppercase tracking-widest text-current opacity-60">
          {subheader}
        </NavLi>

        {data.map((item) =>
          isDashboard ? (
            // mt-[6px] ≈ mt: 0.75
            <NavLi key={item.title} className="mt-[6px]">
              <NavItemDashboard path={item.path} />
            </NavLi>
          ) : (
            <NavLi key={item.title} className="mt-[6px] gap-5">
              <NavItem
                subItem
                title={item.title}
                path={item.path}
                active={isEqualPath(item.path, pathname)}
              />
            </NavLi>
          )
        )}
      </NavUl>
    </NavLi>
  );
}

// ----------------------------------------------------------------------

export function NavCategoryList({ category }) {
  const { category_id, name, has_sub_cat, show_in_home, subCategories } =
    category;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { open, onOpen, onClose, elementRef, anchorEl } = usePopoverHover();

  const handleOpenMenu = useCallback(() => {
    if (has_sub_cat) {
      onOpen();
    }
  }, [has_sub_cat, onOpen]);

  const handleSelectCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
    dispatch(setBrand([]));
    router.push(paths.product.root);
  };

  const renderNavItem = () => (
    <div
      ref={elementRef}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
      onClick={() => handleSelectCategory(category_id)}
      className="flex cursor-pointer items-center"
    >
      {/* font-medium body2 ≈ text-sm font-medium */}
      <span className="text-sm font-medium text-[#000000]">{name}</span>

      {has_sub_cat && (
        <Iconify icon="eva:arrow-ios-downward-fill" className="text-[#000000]" />
      )}
    </div>
  );

  const renderDropdown = () =>
    has_sub_cat && open && (
      <CustomPopoverTailwind
        open={open}
        anchorEl={anchorEl}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <ul className="">
          {subCategories?.map((subCategory) => (
            <li
              key={subCategory.category_id}
              onClick={() => handleSelectCategory(subCategory.category_id)}
              className="cursor-pointer p-2 pb-1  text-sm font-medium hover:bg-white/10 transition-colors text-[#000000]"
            >
              {subCategory.name}
            </li>
          ))}
        </ul>
      </CustomPopoverTailwind>
    );

  if (!show_in_home) return null;

  return (
    <NavLi>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function CustomPopoverTailwind({ open, anchorEl, onMouseEnter, onMouseLeave, children }) {
  if (!open) return null;

  // Compute position from anchorEl (same pattern as MUI Popover)
  const rect = anchorEl?.getBoundingClientRect?.();
  const top = rect ? rect.bottom + window.scrollY : 0;
  const left = rect ? rect.left + rect.width / 2 + window.scrollX : 0;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top, left, transform: "translateX(-50%)" }}
      className={[
        "fixed z-[1300] min-w-[160px] rounded-lg",
        "bg-white bg-neutral-800",
        "shadow-[0_8px_16px_0_rgba(145,158,171,0.24)]",
        "border border-black/[0.06] dark:border-white/[0.08]",
        "pointer-events-auto",
        "overflow-hidden",
      ].join(" ")}
    >
      {children}
    </div>
  );
}