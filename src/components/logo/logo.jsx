import { useId, forwardRef } from "react";
import { mergeClasses } from "minimal-shared/utils";

import { CONFIG } from "@/global-config";

import { useAppSelector } from "@/redux/hooks";

import { RouterLink } from "@/routes/components";

import { Image } from "../image";

import { logoClasses } from "./classes";

// ----------------------------------------------------------------------

export const Logo = forwardRef((props, ref) => {
  const { vendor } = useAppSelector((state) => state.vendor);

  const {
    className,
    href = "/",
    isSingle = true,
    disabled,
    sx,
    ...other
  } = props;

  const logo = <Image alt="Logo" title="Logo" src={`${vendor?.logo}`} />;

  return (
    <RouterLink
      ref={ref}
      href={href}
      aria-label="Logo"
      className={mergeClasses([
        logoClasses.root,
        // Base styles (replaces LogoRoot styled(Link))
        "flex-shrink-0 text-transparent inline-flex align-middle no-underline",
        // Size: single = 40×40, full = 102×36
        isSingle ? "w-16 h-16" : "w-[120px] h-12",
        // Disabled
        disabled && "pointer-events-none",
        className,
      ])}
      {...other}
    >
      {logo}
    </RouterLink>
  );
});