// import { varAlpha } from "minimal-shared/utils";

// import Box from "@mui/material/Box";
// import { styled } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";

// // ----------------------------------------------------------------------

// export function EmptyContent({
//   sx,
//   imgUrl,
//   action,
//   filled,
//   slotProps,
//   description,
//   title = "No data",
//   ...other
// }) {
//   return (
//     <ContentRoot filled={filled} sx={sx} {...other}>
//       <Box
//         component="img"
//         alt="Empty content"
//         src={imgUrl ?? "/assets/icons/empty/ic-content.svg"}
//         {...slotProps?.img}
//         sx={[
//           {
//             width: 1,
//             maxWidth: 160,
//           },
//           ...(Array.isArray(slotProps?.img?.sx)
//             ? slotProps?.img?.sx ?? []
//             : [slotProps?.img?.sx]),
//         ]}
//       />

//       {title && (
//         <Typography
//           variant="h6"
//           {...slotProps?.title}
//           sx={[
//             {
//               mt: 1,
//               textAlign: "center",
//               color: "text.disabled",
//             },
//             ...(Array.isArray(slotProps?.title?.sx)
//               ? slotProps?.title?.sx ?? []
//               : [slotProps?.title?.sx]),
//           ]}
//         >
//           {title}
//         </Typography>
//       )}

//       {description && (
//         <Typography
//           variant="body2"
//           {...slotProps?.description}
//           sx={[
//             {
//               mt: 1,
//               textAlign: "center",
//               color: "text.disabled",
//             },
//             ...(Array.isArray(slotProps?.description?.sx)
//               ? slotProps?.description?.sx ?? []
//               : [slotProps?.description?.sx]),
//           ]}
//         >
//           {description}
//         </Typography>
//       )}

//       {action && action}
//     </ContentRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const ContentRoot = styled("div", {
//   shouldForwardProp: (prop) => !["filled", "sx"].includes(prop),
// })(({ filled, theme }) => ({
//   flexGrow: 1,
//   height: "100%",
//   display: "flex",
//   alignItems: "center",
//   flexDirection: "column",
//   justifyContent: "center",
//   padding: theme.spacing(0, 3),
//   ...(filled && {
//     borderRadius: theme.shape.borderRadius * 2,
//     backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//     border: `dashed 1px ${varAlpha(
//       theme.vars.palette.grey["500Channel"],
//       0.08
//     )}`,
//   }),
// }));
import clsx from "clsx";

export function EmptyContent({
  sx,
  imgUrl,
  action,
  filled = false,
  slotProps,
  description,
  title = "No data",
  className,
  ...other
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center flex-1 h-full px-6",
        filled &&
        "rounded-2xl bg-gray-50 border border-dashed border-gray-200",
        className
      )}
      {...other}
    >
      {/* Image */}
      <img
        alt="Empty content"
        src={imgUrl ?? "/assets/icons/empty/ic-content.svg"}
        className={clsx(
          "w-[100px] max-w-[160px]",
          slotProps?.img?.className
        )}
        {...slotProps?.img}
      />

      {/* Title */}
      {title && (
        <p
          className={clsx(
            "mt-2 text-center text-lg font-semibold text-gray-400",
            slotProps?.title?.className
          )}
          {...slotProps?.title}
        >
          {title}
        </p>
      )}

      {/* Description */}
      {description && (
        <p
          className={clsx(
            "mt-2 text-center text-sm text-gray-400",
            slotProps?.description?.className
          )}
          {...slotProps?.description}
        >
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}