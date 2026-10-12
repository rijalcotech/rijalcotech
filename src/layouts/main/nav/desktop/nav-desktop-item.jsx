// import { forwardRef } from "react";
// import { varAlpha, mergeClasses } from "minimal-shared/utils";

// import { styled } from "@mui/material/styles";
// import ButtonBase from "@mui/material/ButtonBase";

// import { Iconify } from "@/components/iconify";
// import {
//   createNavItem,
//   navItemStyles,
//   navSectionClasses,
// } from "@/components/nav-section";

// // ----------------------------------------------------------------------

// export const NavItem = forwardRef((props, ref) => {
//   const {
//     title,
//     path,
//     /********/
//     open,
//     active,
//     /********/
//     subItem,
//     hasChild,
//     className,
//     externalLink,
//     ...other
//   } = props;

//   const navItem = createNavItem({ path, hasChild, externalLink });

//   const ownerState = {
//     open,
//     active,
//     variant: !subItem ? "rootItem" : "subItem",
//   };

//   return (
//     <ItemRoot
//       disableRipple
//       ref={ref}
//       aria-label={title}
//       {...ownerState}
//       {...navItem.baseProps}
//       className={mergeClasses([navSectionClasses.item.root, className], {
//         [navSectionClasses.state.open]: open,
//         [navSectionClasses.state.active]: active,
//       })}
//       {...other}
//     >
//       <ItemTitle {...ownerState}> {title}</ItemTitle>

//       {hasChild && (
//         <ItemArrow {...ownerState} icon="eva:arrow-ios-downward-fill" />
//       )}
//     </ItemRoot>
//   );
// });

// // ----------------------------------------------------------------------

// const shouldForwardProp = (prop) =>
//   !["open", "active", "variant", "sx"].includes(prop);

// /**
//  * @slot root
//  */
// const ItemRoot = styled(ButtonBase, { shouldForwardProp })(
//   ({ active, open, theme }) => {
//     const dotTransitions = {
//       in: { opacity: 0, scale: 0 },
//       out: { opacity: 1, scale: 1 },
//     };

//     // Use vendor primary color if available, otherwise fall back to theme primary
//     const activeColor = 'var(--vendor-primary-color, ' + theme.vars.palette.primary.main + ')';

//     const dotStyles = {
//       ...dotTransitions.in,
//       width: 6,
//       height: 6,
//       left: -12,
//       content: '""',
//       borderRadius: "50%",
//       position: "absolute",
//       backgroundColor: varAlpha(theme.vars.palette.text.disabledChannel, 0.64),
//       transition: theme.transitions.create(["opacity", "scale"], {
//         duration: theme.transitions.duration.shorter,
//       }),
//       ...(active && {
//         ...dotTransitions.out,
//         backgroundColor: activeColor,
//       }),
//     };

//     const rootItemStyles = {
//       ...(open && { "&::before": { ...dotTransitions.out } }),
//       ...(active && { color: activeColor }),
//     };

//     const subItemStyles = {
//       color: theme.vars.palette.text.secondary,
//       "&:hover": { color: theme.vars.palette.text.primary },
//       ...(active && { color: theme.vars.palette.text.primary }),
//     };

//     return {
//       transition: theme.transitions.create(["color"], {
//         duration: theme.transitions.duration.shorter,
//       }),
//       "&::before": dotStyles,
//       "&:hover::before": { ...dotTransitions.out },
//       variants: [
//         { props: { variant: "rootItem" }, style: rootItemStyles },
//         { props: { variant: "subItem" }, style: subItemStyles },
//       ],
//     };
//   }
// );

// /**
//  * @slot title
//  */
// const ItemTitle = styled("span", { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.title(theme),
//   ...theme.typography.body2,
//   fontWeight: theme.typography.fontWeightMedium,
//   variants: [
//     {
//       props: { variant: "subItem" },
//       style: { fontSize: theme.typography.pxToRem(13) },
//     },
//     {
//       props: { active: true },
//       style: { fontWeight: theme.typography.fontWeightSemiBold },
//     },
//   ],
// }));

// /**
//  * @slot arrow
//  */
// const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.arrow(theme),
// }));
import { forwardRef } from "react";
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "@/components/iconify";
import {
  createNavItem,
  navSectionClasses,
} from "@/components/nav-section";

// ----------------------------------------------------------------------

export const NavItem = forwardRef((props, ref) => {
  const {
    title,
    path,
    /********/
    open,
    active,
    /********/
    subItem,
    hasChild,
    className,
    externalLink,
    ...other
  } = props;

  const navItem = createNavItem({ path, hasChild, externalLink });

  return (
    <ItemRoot
      ref={ref}
      aria-label={title}
      open={open}
      active={active}
      subItem={subItem}
      {...navItem.baseProps}
      className={mergeClasses([navSectionClasses.item.root, className], {
        [navSectionClasses.state.open]: open,
        [navSectionClasses.state.active]: active,
      })}
      {...other}
    >
      <ItemTitle active={active} subItem={subItem}>
        {title}
      </ItemTitle>

      {hasChild && (
        <ItemArrow
          open={open}
          active={active}
          icon="eva:arrow-ios-downward-fill"
        />
      )}
    </ItemRoot>
  );
});

// ----------------------------------------------------------------------

/**
 * @slot root
 *
 * Replicates the MUI styled ButtonBase behaviour:
 * - Relative + inline-flex so the ::before pseudo dot can be positioned.
 * - The "dot" is built as a real <span> sibling because Tailwind can't
 *   drive pseudo-element opacity/scale transitions as richly as CSS-in-JS.
 * - transition-colors for the text color change.
 * - rootItem:  active → vendor/primary color; open → dot visible.
 * - subItem:   text-secondary by default; hover/active → text-primary.
 */
function ItemRoot({ ref, open, active, subItem, children, className, component, ...other }) {
  // Dot visibility:
  //   hidden (opacity-0 scale-0) by default
  //   visible (opacity-100 scale-100) when open OR active
  const dotVisible = open || active;

  const dotColor = active
    ? "var(--vendor-primary-color, var(--color-primary))" // active → primary
    : "rgba(var(--text-disabled-channel) / 0.64)";         // default muted dot

  const rootColorClass = active
    ? "" // colour set via inline style for CSS var support
    : open
      ? ""
      : "";

  const subItemColorClass = active
    ? "text-gray-900 text-gray-100"
    : "text-gray-500 text-gray-400 hover:text-gray-900 text-gray-100";

  const Component = component || "button";

  return (
    <Component
      ref={ref}
      {...(Component === "button" ? { type: "button" } : {})}
      className={[
        // layout
        "relative inline-flex cursor-pointer select-none appearance-none items-center",
        // reset ButtonBase
        "border-0 bg-transparent p-0 outline-none",
        // transition
        "transition-colors duration-200",
        // variant colour
        subItem ? subItemColorClass : rootColorClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        !subItem && active
          ? { color: "var(--vendor-primary-color, var(--color-primary))" }
          : undefined
      }
      {...other}
    >
      {/* Dot pseudo-element replacement — sits left of the item */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 h-1.5 w-1.5 rounded-full transition-[opacity,scale] duration-200"
        style={{
          backgroundColor: dotColor,
          opacity: dotVisible ? 1 : 0,
          scale: dotVisible ? 1 : 0,
        }}
      />

      {children}
    </Component>
  );
}

// ----------------------------------------------------------------------

/**
 * @slot title
 *
 * navItemStyles.title(theme) in the original adds:
 *   flexGrow: 1, whiteSpace: "nowrap"
 * body2 → text-sm (0.875rem / 14px)
 * fontWeightMedium → font-medium (500)
 * subItem  → text-[13px]
 * active   → font-semibold (600)
 */
function ItemTitle({ active, subItem, children }) {
  return (
    <span
      className={[
        "grow whitespace-nowrap text-sm text-[#000000]",
        subItem ? "text-[13px]" : "",
        active ? "font-semibold" : "font-medium",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------

/**
 * @slot arrow
 *
 * navItemStyles.arrow(theme) in the original adds:
 *   width: 16, height: 16, ml: 0.5, flexShrink: 0,
 *   transition on "transform", rotate 180° when open.
 */
function ItemArrow({ open, icon }) {
  return (
    <Iconify
      icon={icon}
      className={[
        "ml-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
    />
  );
}