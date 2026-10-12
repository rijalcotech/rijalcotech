// import { forwardRef, useState } from "react";
// import { useBoolean } from "minimal-shared/hooks";
// import { mergeClasses } from "minimal-shared/utils";

// import { styled, Box, ButtonBase, Collapse, Typography } from "@mui/material";

// import { useAppDispatch } from "@/redux/hooks";
// import { setCategory, setBrand } from "@/redux/actions";

// import { RouterLink } from "@/routes/components";
// import { useRouter } from "@/routes/hooks";
// import { paths } from "@/routes/paths";

// import { Iconify } from "@/components/iconify";
// import { navItemStyles, navSectionClasses } from "@/components/nav-section";

// export function CategoryNavList({ data }) {
//   const { value: open, onToggle } = useBoolean();

//   const router = useRouter();

//   const dispatch = useAppDispatch();

//   const [openCategories, setOpenCategories] = useState({});

//   const toggleCategory = (categoryId) => {
//     setOpenCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   };

//   const handleClick = (event, id) => {
//     event.stopPropagation();

//     dispatch(setCategory(id));
//     dispatch(setBrand([]));

//     router.push(paths.product.root);
//   };

//   const renderNavItem = () => (
//     <CategoryNavItem
//       title={data.title}
//       icon={data.icon}
//       open={open}
//       onToggle={onToggle}
//     />
//   );

//   const renderCategories = (categories) => {
//     return categories?.map((category) => {
//       const isOpen = openCategories[category.category_id];

//       return (
//         <Box key={category.category_id}>
//           <ButtonBase
//             sx={{
//               width: "100%",
//               display: "flex",
//               gap: 1,
//               alignItems: "center",
//               justifyContent: "space-between",
//               cursor: category.has_sub_cat ? "pointer" : "default",
//             }}
//             onClick={() =>
//               category.has_sub_cat && toggleCategory(category.category_id)
//             }
//           >
//             <Typography
//               variant="body2"
//               onClick={(event) => handleClick(event, category.category_id)}
//               sx={[
//                 (theme) => ({
//                   ...theme.mixins.maxLine({ line: 1 }),
//                   py: 1,
//                   color: isOpen ? theme.palette.text.primary : "text.secondary",
//                   fontWeight: theme.typography.fontWeightMedium,
//                 }),
//               ]}
//             >
//               {category.name}
//             </Typography>

//             {category.has_sub_cat && (
//               <Iconify
//                 icon={
//                   isOpen
//                     ? "eva:arrow-ios-downward-fill"
//                     : "eva:arrow-ios-forward-fill"
//                 }
//                 width={16}
//                 sx={[
//                   (theme) => ({
//                     color: isOpen
//                       ? theme.palette.text.primary
//                       : "text.secondary",
//                   }),
//                 ]}
//               />
//             )}
//           </ButtonBase>

//           {isOpen && category.has_sub_cat && (
//             <Box sx={{ pl: 2 }}>{renderCategories(category.subCategories)}</Box>
//           )}
//         </Box>
//       );
//     });
//   };

//   const renderCollapse = () => (
//     <Collapse
//       in={open}
//       sx={[
//         (theme) => ({
//           pl: theme.spacing(2.5),
//           pr: theme.spacing(1.5),
//         }),
//       ]}
//     >
//       {renderCategories(data.categories)}
//     </Collapse>
//   );

//   return (
//     <>
//       {renderNavItem()}

//       {renderCollapse()}
//     </>
//   );
// }

// export const CategoryNavItem = forwardRef((props, ref) => {
//   const { icon, title, open, onToggle, ...other } = props;

//   const ownerState = { open };

//   const baseProps = {
//     component: RouterLink,
//     href: "/",
//     onClick: onToggle,
//   };

//   return (
//     <ItemRoot
//       ref={ref}
//       aria-label={title}
//       {...ownerState}
//       {...baseProps}
//       className={mergeClasses([
//         navSectionClasses.item.root,
//         "mobile-category-nav",
//       ])}
//       {...other}
//     >
//       <ItemIcon {...ownerState}> {icon}</ItemIcon>

//       <ItemTitle {...ownerState}>{title}</ItemTitle>

//       <ItemArrow
//         {...ownerState}
//         icon={
//           open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"
//         }
//       />
//     </ItemRoot>
//   );
// });

// const shouldForwardProp = (prop) => !["open", "active", "sx"].includes(prop);

// /**
//  * @slot root
//  */
// const ItemRoot = styled(ButtonBase, { shouldForwardProp })(({ theme }) => {
//   const openStyles = {
//     color: theme.vars.palette.text.primary,
//     backgroundColor: theme.vars.palette.action.hover,
//   };

//   return {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     gap: 16,
//     height: 48,
//     width: "100%",
//     paddingLeft: theme.spacing(2.5),
//     paddingRight: theme.spacing(1.5),
//     color: theme.vars.palette.text.secondary,

//     variants: [{ props: { open: true }, style: openStyles }],
//   };
// });

// /**
//  * @slot title
//  */
// const ItemTitle = styled("span", { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.title(theme),
//   ...theme.typography.body2,
//   fontWeight: theme.typography.fontWeightMedium,
//   variants: [
//     {
//       style: { fontWeight: theme.typography.fontWeightSemiBold },
//     },
//   ],
// }));

// /**
//  * @slot icon
//  */
// const ItemIcon = styled("span", { shouldForwardProp })(() => ({
//   ...navItemStyles.icon,
// }));

// /**
//  * @slot arrow
//  */
// const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.arrow(theme),
// }));
import { forwardRef, useState } from "react";
import { useBoolean } from "minimal-shared/hooks";
import { mergeClasses } from "minimal-shared/utils";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory, setBrand } from "@/redux/actions";

import { RouterLink } from "@/routes/components";
import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";
import { navSectionClasses } from "@/components/nav-section";

// ----------------------------------------------------------------------

export function CategoryNavList({ data }) {
  const { value: open, onToggle } = useBoolean();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleClick = (event, id) => {
    event.stopPropagation();
    dispatch(setCategory(id));
    dispatch(setBrand([]));
    router.push(paths.product.root);
  };

  const renderCategories = (categories) =>
    categories?.map((category) => {
      const isOpen = openCategories[category.category_id];

      return (
        <div key={category.category_id}>
          {/* Row: category name + arrow */}
          <button
            type="button"
            onClick={() =>
              category.has_sub_cat && toggleCategory(category.category_id)
            }
            className={mergeClasses([
              "w-full flex items-center justify-between gap-2 px-2",
              category.has_sub_cat ? "cursor-pointer" : "cursor-default",
              "bg-transparent border-none outline-none p-0",
            ])}
          >
            <span
              onClick={(e) => handleClick(e, category.category_id)}
              className={mergeClasses([
                "py-3 text-sm font-medium truncate max-w-full text-left",
                isOpen
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]",
              ])}
            >
              {category.name}
            </span>

            {category.has_sub_cat && (
              <Iconify
                icon={
                  isOpen
                    ? "eva:arrow-ios-downward-fill"
                    : "eva:arrow-ios-forward-fill"
                }
                width={16}
                className={
                  isOpen
                    ? "text-[var(--text-primary)] flex-shrink-0"
                    : "text-[var(--text-secondary)] flex-shrink-0"
                }
              />
            )}
          </button>

          {/* Sub-categories collapse */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isOpen && category.has_sub_cat ? "9999px" : "0px",
              opacity: isOpen && category.has_sub_cat ? 1 : 0,
            }}
          >
            <div className="pl-4">
              {renderCategories(category.subCategories)}
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {/* Main nav item toggle */}
      <CategoryNavItem
        title={data.title}
        icon={data.icon}
        open={open}
        onToggle={onToggle}
      />

      {/* Collapse: category list */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? "9999px" : "0px",
          opacity: open ? 1 : 0,
          paddingLeft: open ? "20px" : "20px",   // pl-[20px] = spacing(2.5)
          paddingRight: open ? "12px" : "12px",  // pr-[12px] = spacing(1.5)
        }}
      >
        {renderCategories(data.categories)}
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

export const CategoryNavItem = forwardRef((props, ref) => {
  const { icon, title, open, onToggle, className, ...other } = props;

  return (
    <RouterLink
      ref={ref}
      href="/"
      onClick={onToggle}
      aria-label={title}
      className={mergeClasses(
        [
          navSectionClasses.item.root,
          "mobile-category-nav",
          // Base layout
          "flex items-center justify-start gap-2 py-2",
          "px-5 w-full",
          "outline-none border-none",
          "transition-colors duration-200 cursor-pointer no-underline",
          // Default colour
          !open && "text-[var(--text-secondary)] bg-transparent hover:bg-[var(--action-hover)]",
          // Open colour
          open && "text-[var(--text-primary)] bg-[var(--action-hover)]",
        ],
        className
      )}
      {...other}
    >
      {/* Icon slot */}
      <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6">
        {icon}
      </span>

      {/* Title slot */}
      <span className="flex-1 text-left truncate text-sm font-semibold leading-snug px-2">
        {title}
      </span>

      {/* Arrow slot */}
      <Iconify
        icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
        className="w-4 h-4 flex-shrink-0 ml-auto opacity-60"
      />
    </RouterLink>
  );
});