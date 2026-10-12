import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export const mainNavData = [
  {
    title: "Home",
    path: paths.home,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  {
    title: "About",
    path: paths.about,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  // {
  //   title: "Services",
  //   path: paths.service.root,
  //   icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  // },
  {
    title: "Contact",
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
];
