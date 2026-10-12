// // import { forwardRef } from "react";
// // import { varAlpha, mergeClasses } from "minimal-shared/utils";

// // import { styled } from "@mui/material/styles";
// // import ButtonBase from "@mui/material/ButtonBase";

// // import { Iconify } from "@/components/iconify";
// // import {
// //   createNavItem,
// //   navItemStyles,
// //   navSectionClasses,
// // } from "@/components/nav-section";

// // // ----------------------------------------------------------------------

// // export const NavItem = forwardRef((props, ref) => {
// //   const {
// //     path,
// //     icon,
// //     title,
// //     /********/
// //     open,
// //     active,
// //     /********/
// //     hasChild,
// //     className,
// //     externalLink,
// //     ...other
// //   } = props;

// //   const navItem = createNavItem({
// //     path,
// //     icon,
// //     hasChild,
// //     externalLink,
// //   });

// //   const ownerState = { open, active };

// //   return (
// //     <ItemRoot
// //       ref={ref}
// //       aria-label={title}
// //       {...ownerState}
// //       {...navItem.baseProps}
// //       className={mergeClasses([navSectionClasses.item.root, className], {
// //         [navSectionClasses.state.open]: open,
// //         [navSectionClasses.state.active]: active,
// //       })}
// //       {...other}
// //     >
// //       <ItemIcon {...ownerState}> {navItem.renderIcon}</ItemIcon>

// //       <ItemTitle {...ownerState}>{title}</ItemTitle>

// //       {hasChild && (
// //         <ItemArrow
// //           {...ownerState}
// //           icon={
// //             open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"
// //           }
// //         />
// //       )}
// //     </ItemRoot>
// //   );
// // });

// // const shouldForwardProp = (prop) => !["open", "active", "sx"].includes(prop);

// // /**
// //  * @slot root
// //  */
// // const ItemRoot = styled(ButtonBase, { shouldForwardProp })(({ theme }) => {
// //   // Use vendor primary color if available, otherwise fall back to theme primary
// //   const vendorPrimaryColor = 'var(--vendor-primary-color, ' + theme.vars.palette.primary.main + ')';

// //   const openStyles = {
// //     color: theme.vars.palette.text.primary,
// //     backgroundColor: theme.vars.palette.action.hover,
// //   };

// //   const activeStyles = {
// //     color: vendorPrimaryColor,
// //     backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
// //     "&:hover": {
// //       backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
// //     },
// //   };

// //   return {
// //     gap: 16,
// //     height: 48,
// //     width: "100%",
// //     paddingLeft: theme.spacing(2.5),
// //     paddingRight: theme.spacing(1.5),
// //     color: theme.vars.palette.text.secondary,
// //     variants: [
// //       { props: { open: true }, style: openStyles },
// //       { props: { active: true }, style: activeStyles },
// //     ],
// //   };
// // });

// // /**
// //  * @slot icon
// //  */
// // const ItemIcon = styled("span", { shouldForwardProp })(() => ({
// //   ...navItemStyles.icon,
// // }));

// // /**
// //  * @slot title
// //  */
// // const ItemTitle = styled("span", { shouldForwardProp })(({ theme }) => ({
// //   ...navItemStyles.title(theme),
// //   ...theme.typography.body2,
// //   fontWeight: theme.typography.fontWeightMedium,
// //   variants: [
// //     {
// //       props: { active: true },
// //       style: { fontWeight: theme.typography.fontWeightSemiBold },
// //     },
// //   ],
// // }));

// // /**
// //  * @slot arrow
// //  */
// // const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
// //   ...navItemStyles.arrow(theme),
// // }));
// import { forwardRef } from "react";
// import { mergeClasses } from "minimal-shared/utils";

// import { Iconify } from "@/components/iconify";
// import { createNavItem, navSectionClasses } from "@/components/nav-section";

// // ----------------------------------------------------------------------

// export const NavItem = forwardRef((props, ref) => {
//   const {
//     path,
//     icon,
//     title,
//     open,
//     active,
//     hasChild,
//     className,
//     externalLink,
//     ...other
//   } = props;

//   const navItem = createNavItem({ path, icon, hasChild, externalLink });

//   return (
//     <button
//       ref={ref}
//       aria-label={title}
//       {...navItem.baseProps}
//       className={mergeClasses(
//         [
//           navSectionClasses.item.root,
//           // Base styles
//           "flex items-center w-full gap-2 px-1",
//           "text-sm font-medium",
//           "rounded-none outline-none border-none cursor-pointer",
//           "transition-colors duration-200",
//           // Default state`
//           !open && !active && "text-[var(--text-secondary)] bg-transparent hover:bg-[var(--action-hover)]",
//           // Open state
//           open && !active && "text-[var(--text-primary)] bg-[var(--action-hover)]",
//           // Active state
//           active && [
//             "font-semibold",
//             "text-[var(--vendor-primary-color,var(--palette-primary-main))]",
//             "bg-[color-mix(in_srgb,var(--palette-primary-main)_8%,transparent)]",
//             "hover:bg-[color-mix(in_srgb,var(--palette-primary-main)_16%,transparent)]",
//           ],
//           className,
//         ],
//         {
//           [navSectionClasses.state.open]: open,
//           [navSectionClasses.state.active]: active,
//         }
//       )}
//       {...other}
//     >
//       {/* Icon slot */}
//       <span
//         className={mergeClasses([
//           "inline-flex items-center justify-center flex-shrink-0",
//           "w-6 h-6",
//         ])}
//       >
//         {navItem.renderIcon}
//       </span>

//       {/* Title slot */}
//       <span
//         className={mergeClasses([
//           "flex-1 text-left truncate text-sm leading-snug",
//           active ? "font-semibold" : "font-medium",
//         ])}
//       >
//         {title}
//       </span>

//       {/* Arrow slot */}
//       {hasChild && (
//         <Iconify
//           icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
//           className="w-4 h-4 flex-shrink-0 ml-auto opacity-60"
//         />
//       )}
//     </button>
//   );
// });
import { forwardRef } from "react";
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "@/components/iconify";
import { createNavItem, navSectionClasses } from "@/components/nav-section";
import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

export const NavItem = forwardRef((props, ref) => {
  const {
    path,
    icon,
    title,
    open,
    active,
    hasChild,
    className,
    externalLink,
    ...other
  } = props;

  const navItem = createNavItem({ path, icon, hasChild, externalLink });

  // Extract `component` from baseProps so it never lands on a DOM element.
  // createNavItem sets component=RouterLink for internal links and
  // component="a" for external ones — we handle both cases ourselves.
  const { component: _component, ...safeBaseProps } = navItem.baseProps ?? {};

  const sharedClassName = mergeClasses(
    [
      navSectionClasses.item.root,
      "flex items-center w-full gap-4 h-12",
      "pl-[20px] pr-[12px]",
      "text-sm outline-none border-none cursor-pointer",
      "transition-colors duration-200",
      // Default
      !open && !active &&
      "text-[var(--text-secondary)] bg-transparent hover:bg-[var(--action-hover)]",
      // Open
      open && !active &&
      "text-[var(--text-primary)] bg-[var(--action-hover)]",
      // Active
      active && [
        "text-[var(--vendor-primary-color,var(--palette-primary-main))]",
        "bg-[color-mix(in_srgb,var(--palette-primary-main)_8%,transparent)]",
        "hover:bg-[color-mix(in_srgb,var(--palette-primary-main)_16%,transparent)]",
      ],
      className,
    ],
    {
      [navSectionClasses.state.open]: open,
      [navSectionClasses.state.active]: active,
    }
  );

  const children = (
    <>
      {/* Icon slot */}
      <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6">
        {navItem.renderIcon}
      </span>

      {/* Title slot */}
      <span
        className={[
          "flex-1 text-left truncate text-sm leading-snug",
          active ? "font-semibold" : "font-medium",
        ].join(" ")}
      >
        {title}
      </span>

      {/* Arrow slot */}
      {hasChild && (
        <Iconify
          icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
          className="w-4 h-4 flex-shrink-0 ml-auto opacity-60"
        />
      )}
    </>
  );

  // External link → plain <a>
  if (externalLink) {
    return (
      <a
        ref={ref}
        aria-label={title}
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
        {...other}
      >
        {children}
      </a>
    );
  }

  // Internal link → RouterLink (handles href natively, no component prop needed)
  if (path) {
    return (
      <RouterLink
        ref={ref}
        aria-label={title}
        href={path}
        className={sharedClassName}
        {...safeBaseProps}
        {...other}
      >
        {children}
      </RouterLink>
    );
  }

  // No path (toggle-only item, e.g. parent with children) → <button>
  return (
    <button
      ref={ref}
      type="button"
      aria-label={title}
      className={sharedClassName}
      {...other}
    >
      {children}
    </button>
  );
});