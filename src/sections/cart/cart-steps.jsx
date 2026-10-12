// import Box from "@mui/material/Box";
// import Step from "@mui/material/Step";
// import Stepper from "@mui/material/Stepper";
// import { styled } from "@mui/material/styles";
// import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";
// import MuiStepConnector, {
//   stepConnectorClasses,
// } from "@mui/material/StepConnector";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function CartSteps({ steps, activeStep, sx, ...other }) {
//   return (
//     <Stepper
//       alternativeLabel
//       activeStep={activeStep}
//       connector={<StepConnector />}
//       sx={[{ mb: { xs: 3, md: 5 } }, ...(Array.isArray(sx) ? sx : [sx])]}
//       {...other}
//     >
//       {steps.map((label) => (
//         <Step key={label}>
//           <StepLabel
//             slots={{ stepIcon: StepIcon }}
//             sx={{
//               [`& .${stepLabelClasses.label}`]: {
//                 fontWeight: "fontWeightSemiBold",
//               },
//             }}
//           >
//             {label}
//           </StepLabel>
//         </Step>
//       ))}
//     </Stepper>
//   );
// }

// // ----------------------------------------------------------------------

// const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
//   top: 10,
//   left: "calc(-50% + 20px)",
//   right: "calc(50% + 20px)",
//   [`& .${stepConnectorClasses.line}`]: {
//     borderTopWidth: 2,
//     borderColor: theme.vars.palette.divider,
//   },
//   [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: theme.vars.palette.primary.main,
//     },
//   },
// }));

// function StepIcon({ active, completed }) {
//   return (
//     <Box
//       sx={{
//         width: 24,
//         height: 24,
//         display: "flex",
//         alignItems: "center",
//         color: "text.disabled",
//         justifyContent: "center",
//         ...(active && { color: "primary.main" }),
//       }}
//     >
//       {completed ? (
//         <Iconify icon="eva:checkmark-fill" sx={{ color: "primary.main" }} />
//       ) : (
//         <Box
//           sx={{
//             width: 8,
//             height: 8,
//             borderRadius: "50%",
//             backgroundColor: "currentColor",
//           }}
//         />
//       )}
//     </Box>
//   );
// }
"use client";

import { Iconify } from "@/components/iconify";

export function CartSteps({ steps = [], activeStep = 0, className = "" }) {
  return (
    <div className={`w-full mb-6 md:mb-10 ${className}`}>
      {/* STEP WRAPPER */}
      <div className="flex items-center justify-between relative">

        {/* CONNECTOR LINE */}
        <div className="absolute top-3 left-0 right-0 h-[2px] bg-gray-200 z-0" />

        {steps.map((label, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <div
              key={label}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              {/* ICON */}
              <div
                className={`
                  w-6 h-6 flex items-center justify-center rounded-full
                  transition-colors
                  ${isActive
                    ? "text-blue-600"
                    : isCompleted
                      ? "text-blue-600"
                      : "text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Iconify icon="eva:checkmark-fill" className="text-blue-600" />
                ) : (
                  <span
                    className={`
                      w-2 h-2 rounded-full
                      ${isActive ? "bg-blue-600" : "bg-gray-400"}
                    `}
                  />
                )}
              </div>

              {/* LABEL */}
              <span
                className={`
                  mt-2 text-sm font-semibold
                  ${isActive || isCompleted
                    ? "text-gray-900"
                    : "text-gray-400"
                  }
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}