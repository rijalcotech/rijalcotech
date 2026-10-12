// import { varAlpha } from "minimal-shared/utils";

// import { Link, Card, CardContent, Typography, Box, Stack, Chip, useTheme } from "@mui/material";

// import { CONFIG } from "@/global-config";

// import { useAppSelector } from "@/redux/hooks";

// import { RouterLink } from "@/routes/components";

// import { fDate } from "@/utils/format-time";

// import { Image } from "@/components/image";
// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function BlogItem({ blog, detailsHref }) {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);
//   const { title, featured_image, created_at, short_description, category, reading_time } = blog || {};

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;

//   return (
//     <Card
//       sx={{
//         position: "relative",
//         borderRadius: 3,
//         overflow: "hidden",
//         transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//         border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
//         "&:hover": {
//           transform: "translateY(-8px)",
//           boxShadow: `0 20px 40px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)}`,
//           "& .blog-image": {
//             transform: "scale(1.08)",
//           },
//           "& .blog-overlay": {
//             opacity: 0.5,
//           },
//           "& .read-more-btn": {
//             opacity: 1,
//             transform: "translateY(0)",
//           },
//         },
//       }}
//     >
//       {/* Image Container */}
//       <Box sx={{ position: "relative", overflow: "hidden" }}>
//         <Image
//           className="blog-image"
//           alt={title}
//           title={title}
//           src={`${featured_image}`}
//           ratio="16/10"
//           sx={{
//             transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         />

//         {/* Gradient Overlay */}
//         <Box
//           className="blog-overlay"
//           sx={{
//             position: "absolute",
//             inset: 0,
//             background: `linear-gradient(180deg, transparent 0%, ${varAlpha(theme.vars.palette.grey["900Channel"], 0.9)} 100%)`,
//             opacity: 0.7,
//             transition: "opacity 0.4s ease",
//           }}
//         />

//         {/* Category Badge */}
//         {category && (
//           <Chip
//             label={category.name || category}
//             size="small"
//             sx={{
//               position: "absolute",
//               top: 16,
//               left: 16,
//               bgcolor: primaryColor,
//               color: "common.white",
//               fontWeight: 600,
//               fontSize: "0.7rem",
//               height: 26,
//               boxShadow: `0 4px 12px ${varAlpha(theme.vars.palette.common.blackChannel, 0.3)}`,
//             }}
//           />
//         )}

//         {/* Reading Time Badge */}
//         {reading_time && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: 16,
//               right: 16,
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               px: 1.5,
//               py: 0.5,
//               borderRadius: 2,
//               bgcolor: varAlpha(theme.vars.palette.common.whiteChannel, 0.15),
//               backdropFilter: "blur(8px)",
//               color: "common.white",
//             }}
//           >
//             <Iconify icon="solar:clock-circle-bold" width={14} />
//             <Typography variant="caption" sx={{ fontWeight: 600 }}>
//               {reading_time} min
//             </Typography>
//           </Box>
//         )}

//         {/* Bottom Content Overlay */}
//         <CardContent
//           sx={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             zIndex: 9,
//             color: "common.white",
//             p: 3,
//           }}
//         >
//           {/* Date */}
//           <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
//             <Iconify icon="solar:calendar-bold" width={16} sx={{ opacity: 0.8 }} />
//             <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500 }}>
//               {fDate(created_at)}
//             </Typography>
//           </Stack>

//           {/* Title */}
//           <Link
//             component={RouterLink}
//             href={detailsHref}
//             color="inherit"
//             underline="none"
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 lineHeight: 1.4,
//                 display: "-webkit-box",
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: "vertical",
//                 overflow: "hidden",
//                 transition: "color 0.3s ease",
//                 "&:hover": {
//                   color: primaryColor,
//                 },
//               }}
//             >
//               {title}
//             </Typography>
//           </Link>
//         </CardContent>
//       </Box>

//       {/* Bottom Card Content */}
//       <CardContent sx={{ p: 3, pt: 2 }}>
//         {/* Description */}
//         {short_description && (
//           <Typography
//             variant="body2"
//             sx={{
//               color: "text.secondary",
//               lineHeight: 1.7,
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//               mb: 2,
//             }}
//           >
//             {short_description}
//           </Typography>
//         )}

//         {/* Read More Link */}
//         <Link
//           component={RouterLink}
//           href={detailsHref}
//           underline="none"
//           className="read-more-btn"
//           sx={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 0.5,
//             fontWeight: 700,
//             fontSize: "0.875rem",
//             color: primaryColor,
//             transition: "all 0.3s ease",
//             "&:hover": {
//               gap: 1,
//             },
//           }}
//         >
//           Read Article
//           <Iconify icon="solar:arrow-right-bold" width={18} />
//         </Link>
//       </CardContent>
//     </Card>
//   );
// }
import { CONFIG } from "@/global-config";

import { useAppSelector } from "@/redux/hooks";

import { RouterLink } from "@/routes/components";

import { fDate } from "@/utils/format-time";

import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function BlogItem({ blog, detailsHref }) {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { title, featured_image, created_at, short_description, category, reading_time } = blog || {};

  const primaryColor = vendor?.primary_color || "#1976d2";

  return (
    <div
      className="group relative flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 overflow-hidden"
    >
      {/* ── Image Container ── */}
      <div className="relative p-3 pb-0 h-[280px]">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm">
          <img
            alt={title}
            title={title}
            src={`${featured_image}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Pill */}
          {category && (
            <div
              className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-transform duration-300 group-hover:-translate-y-1"
              style={{ backgroundColor: "rgba(255,255,255,0.95)", color: primaryColor }}
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                {category.name || category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="flex flex-col flex-grow p-6 pt-5">
        {/* Meta (Date & Read Time) */}
        <div className="flex flex-row items-center gap-3 text-xs text-gray-400 font-medium mb-4 uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <Iconify icon="solar:calendar-bold" width={16} />
            <span>{fDate(created_at)}</span>
          </div>
          {reading_time && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Iconify icon="solar:clock-circle-bold" width={16} />
                <span>{reading_time} min</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <RouterLink href={detailsHref} className="no-underline">
          <h3
            className="text-[1.35rem] font-extrabold text-gray-900 leading-[1.35] mb-3 transition-colors duration-300"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = primaryColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
          >
            {title}
          </h3>
        </RouterLink>

        {/* Description */}
        {short_description && (
          <p
            className="text-gray-500 text-sm leading-relaxed mb-6"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {short_description}
          </p>
        )}

        {/* Footer Link */}
        <div className="mt-auto pt-2">
          <RouterLink
            href={detailsHref}
            className="inline-flex items-center gap-3 text-sm font-bold no-underline transition-all duration-300 group/link"
            style={{ color: primaryColor }}
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover/link:-translate-y-full">Read Article</span>
              <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0">Read Article</span>
            </span>
            <span 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:shadow-md"
              style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.firstChild.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)";
                e.currentTarget.firstChild.style.color = primaryColor;
              }}
            >
              <Iconify 
                icon="solar:arrow-right-bold" 
                width={16} 
                className="transition-colors duration-300"
                style={{ color: primaryColor }}
              />
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  );
}