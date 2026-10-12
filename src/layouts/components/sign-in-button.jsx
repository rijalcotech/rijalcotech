// import Button from "@mui/material/Button";

// import { RouterLink } from "@/routes/components";
// import { paths } from "@/routes/paths";

// import { useAppSelector } from "@/redux/hooks";

// // ----------------------------------------------------------------------

// export function SignInButton({ sx, ...other }) {
//   const { vendor } = useAppSelector((state) => state.vendor);

//   return (
//     <Button
//       component={RouterLink}
//       href={paths.auth.signIn}
//       variant="outlined"
//       sx={[
//         {
//           ...(vendor?.primary_color && {
//             borderColor: vendor.primary_color,
//             color: vendor.primary_color,
//             '&:hover': {
//               borderColor: vendor.primary_color,
//               backgroundColor: `${vendor.primary_color}14`,
//             },
//           }),
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       Sign in
//     </Button>
//   );
// }
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

export function SignInButton({ className, style, ...other }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color;

  return (
    <RouterLink
      href={paths.auth.signIn}
      className={`
        inline-flex items-center justify-center px-4 py-2 text-sm font-medium
        rounded-xl border border-1.5 transition-colors duration-200
        ${!primaryColor ? 'border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-800' : ''}
        ${className ?? ''}
      `}
      style={{
        ...(primaryColor && {
          borderColor: primaryColor,
          color: primaryColor,
        }),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (primaryColor) {
          e.currentTarget.style.backgroundColor = `${primaryColor}14`;
        }
      }}
      onMouseLeave={(e) => {
        if (primaryColor) {
          e.currentTarget.style.backgroundColor = '';
        }
      }}
      {...other}
    >
      Sign in
    </RouterLink>
  );
}