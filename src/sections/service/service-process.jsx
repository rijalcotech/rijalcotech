// "use client";

// import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// const PROCESS_STEPS = [
//   {
//     number: "01",
//     icon: "solar:magnifer-bold-duotone",
//     title: "Browse & Discover",
//     description: "Explore our vast collection of products and find exactly what you're looking for.",
//     color: "primary",
//   },
//   {
//     number: "02",
//     icon: "solar:cart-plus-bold-duotone",
//     title: "Add to Cart",
//     description: "Select your items, choose quantities, and add them to your shopping cart.",
//     color: "info",
//   },
//   {
//     number: "03",
//     icon: "solar:card-bold-duotone",
//     title: "Secure Checkout",
//     description: "Complete your purchase with our fast, secure, and hassle-free payment process.",
//     color: "warning",
//   },
//   {
//     number: "04",
//     icon: "solar:box-bold-duotone",
//     title: "Fast Delivery",
//     description: "Sit back and relax while we deliver your order right to your doorstep.",
//     color: "success",
//   },
// ];

// export function ServiceProcess() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor = vendor?.secondary_color || theme.palette.secondary.main;

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 6, md: 10 },
//         bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//       }}
//     >
//       <Container maxWidth="lg">
//         <Stack spacing={6}>
//           {/* Section Header */}
//           <Stack spacing={2} alignItems="center" textAlign="center">
//             <Typography
//               variant="overline"
//               sx={{
//                 color: "primary.main",
//                 fontWeight: 700,
//                 letterSpacing: 2,
//               }}
//             >
//               How It Works
//             </Typography>

//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 800,
//                 maxWidth: 500,
//               }}
//             >
//               Simple & Easy
//               <Box component="span" sx={{ color: "primary.main", ml: 1 }}>
//                 Shopping Process
//               </Box>
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 maxWidth: 500,
//                 lineHeight: 1.7,
//               }}
//             >
//               Get started in just a few simple steps and enjoy a seamless shopping experience.
//             </Typography>
//           </Stack>

//           {/* Process Steps */}
//           <Grid container spacing={4}>
//             {PROCESS_STEPS.map((step, index) => (
//               <Grid key={step.title} size={{ xs: 12, sm: 6, md: 3 }}>
//                 <Stack
//                   spacing={2}
//                   alignItems="center"
//                   textAlign="center"
//                   sx={{
//                     position: "relative",
//                     p: 3,
//                   }}
//                 >
//                   {/* Connector Line */}
//                   {index < PROCESS_STEPS.length - 1 && (
//                     <Box
//                       sx={{
//                         display: { xs: "none", md: "block" },
//                         position: "absolute",
//                         top: 50,
//                         right: -40,
//                         width: 80,
//                         height: 2,
//                         background: `linear-gradient(90deg, ${primaryColor} 0%, ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)} 100%)`,
//                         "&::after": {
//                           content: '""',
//                           position: "absolute",
//                           right: 0,
//                           top: -4,
//                           width: 10,
//                           height: 10,
//                           borderRadius: "50%",
//                           bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.2),
//                         },
//                       }}
//                     />
//                   )}

//                   {/* Step Number Badge */}
//                   <Box
//                     sx={{
//                       position: "relative",
//                       width: 100,
//                       height: 100,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       bgcolor: varAlpha(theme.vars.palette[step.color].mainChannel, 0.12),
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "scale(1.1)",
//                         bgcolor: `${step.color}.main`,
//                         boxShadow: `0 12px 24px ${varAlpha(theme.vars.palette[step.color].mainChannel, 0.3)}`,
//                         "& .step-icon": {
//                           color: "common.white",
//                         },
//                         "& .step-number": {
//                           bgcolor: "common.white",
//                           color: `${step.color}.main`,
//                         },
//                       },
//                     }}
//                   >
//                     <Iconify
//                       className="step-icon"
//                       icon={step.icon}
//                       width={40}
//                       sx={{
//                         color: `${step.color}.main`,
//                         transition: "color 0.3s ease",
//                       }}
//                     />

//                     {/* Step Number */}
//                     <Box
//                       className="step-number"
//                       sx={{
//                         position: "absolute",
//                         top: -5,
//                         right: -5,
//                         width: 32,
//                         height: 32,
//                         borderRadius: "50%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         bgcolor: `${step.color}.main`,
//                         color: "common.white",
//                         fontWeight: 800,
//                         fontSize: "0.75rem",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       {step.number}
//                     </Box>
//                   </Box>

//                   <Typography variant="h4" sx={{ fontWeight: 700, fontSize:{xs:"1rem", sm:"1.1rem", md:"1.2rem"} }}>
//                     {step.title}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "text.secondary",
//                       lineHeight: 1.7,
//                     }}
//                   >
//                     {step.description}
//                   </Typography>
//                 </Stack>
//               </Grid>
//             ))}
//           </Grid>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

const PROCESS_STEPS = [
  {
    number: "01",
    icon: "solar:magnifer-bold-duotone",
    title: "Browse & Discover",
    description:
      "Explore our vast collection of products and find exactly what you're looking for.",
    color: "blue",
  },
  {
    number: "02",
    icon: "solar:cart-plus-bold-duotone",
    title: "Add to Cart",
    description:
      "Select your items, choose quantities, and add them to your shopping cart.",
    color: "cyan",
  },
  {
    number: "03",
    icon: "solar:card-bold-duotone",
    title: "Secure Checkout",
    description:
      "Complete your purchase with our fast, secure, and hassle-free payment process.",
    color: "amber",
  },
  {
    number: "04",
    icon: "solar:box-bold-duotone",
    title: "Fast Delivery",
    description:
      "Sit back and relax while we deliver your order right to your doorstep.",
    color: "green",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    hoverBg: "group-hover:bg-blue-600",
    shadow: "group-hover:shadow-blue-300",
  },
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    hoverBg: "group-hover:bg-cyan-600",
    shadow: "group-hover:shadow-cyan-300",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    hoverBg: "group-hover:bg-amber-600",
    shadow: "group-hover:shadow-amber-300",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    hoverBg: "group-hover:bg-green-600",
    shadow: "group-hover:shadow-green-300",
  },
};

export function ServiceProcess() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#2563eb";

  return (
    <section className="bg-gray-50 py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <span
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: primaryColor }}
            >
              How It Works
            </span>

            <h2 className="mt-3 max-w-lg text-3xl font-extrabold md:text-5xl">
              Simple & Easy
              <span
                className="ml-2 inline-block"
                style={{ color: primaryColor }}
              >
                Shopping Process
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-gray-600 leading-7">
              Get started in just a few simple steps and enjoy a seamless
              shopping experience.
            </p>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => {
              const colors = colorClasses[step.color];

              return (
                <div
                  key={step.title}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Connector Line */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute left-[70%] top-12 hidden w-[80%] md:block">
                      <div
                        className="relative h-[2px]"
                        style={{
                          background: `linear-gradient(to right, ${primaryColor}, rgba(156,163,175,0.3))`,
                        }}
                      >
                        <span className="absolute right-0 top-[-4px] h-2.5 w-2.5 rounded-full bg-gray-300" />
                      </div>
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`
                      relative flex h-24 w-24 items-center justify-center rounded-full
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:shadow-xl
                      ${colors.bg}
                      ${colors.shadow}
                      ${colors.hoverBg}
                    `}
                  >
                    <Iconify
                      icon={step.icon}
                      width={40}
                      className={`${colors.text} transition-colors duration-300 group-hover:text-white`}
                    />

                    {/* Step Number */}
                    <div
                      className={`
                        absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center
                        rounded-full text-xs font-extrabold text-white
                        transition-all duration-300
                        ${colors.text.replace("text-", "bg-")}
                        group-hover:bg-white
                        ${colors.text}
                      `}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-base font-bold sm:text-lg md:text-xl">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}