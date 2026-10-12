"use client";

import { useScrollOffsetTop } from "minimal-shared/hooks";
import { mergeClasses } from "minimal-shared/utils";

import { layoutClasses } from "./classes";

// ----------------------------------------------------------------------

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = "md",
  ...other
}) {
  const { offsetTop: isOffset } = useScrollOffsetTop();

  return (
    <header
      className={mergeClasses([
        layoutClasses.header,
        "sticky top-0 z-[var(--layout-header-zIndex)]",
        "w-full bg-white text-[var(--color)] border-b border-gray-100",
        className,
      ])}
      // Pseudo-element effects (bg blur + shadow) are handled below via
      // sibling <span> elements since Tailwind can't do stateful ::before/::after
      style={{ position: "sticky" }}
      {...other}
    >
      {/* ::before — blurred background, fades in when offset */}
      {!disableOffset && (
        <span
          aria-hidden="true"
          className={[
            "absolute inset-0 w-full h-full z-[-1]",
            "transition-[opacity,visibility] duration-200 ease-in-out",
            // backdrop blur + semi-transparent bg
            "backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)]",
            "bg-[color-mix(in_srgb,var(--background-default)_80%,transparent)]",
            isOffset ? "opacity-100 visible" : "opacity-0 invisible",
          ].join(" ")}
        />
      )}

      {/* ::after — oval drop shadow, fades in when offset */}
      {!disableElevation && (
        <span
          aria-hidden="true"
          className={[
            "absolute bottom-0 left-0 right-0 mx-auto z-[-2]",
            "h-6 rounded-[50%]",
            "w-[calc(100%-48px)]",
            "shadow-[var(--custom-shadows-z8,0_8px_16px_0_rgba(145,158,171,0.16))]",
            "transition-[opacity,visibility] duration-200 ease-in-out",
            isOffset ? "opacity-[0.48] visible" : "opacity-0 invisible",
          ].join(" ")}
        />
      )}

      {slots?.topArea}

      {/* HeaderContainer */}
      <div
        className={[
          "mx-auto w-full px-4 max-w-[var(--max-w-xl,1536px)]",
          "flex items-center text-[var(--color)]",
          // Mobile height
          "h-[var(--layout-header-mobile-height)]",
          // Desktop height at layoutQuery breakpoint (default md = 768px)
          layoutQuery === "md"
            ? "md:h-[var(--layout-header-desktop-height)]"
            : layoutQuery === "lg"
              ? "lg:h-[var(--layout-header-desktop-height)]"
              : layoutQuery === "sm"
                ? "sm:h-[var(--layout-header-desktop-height)]"
                : "md:h-[var(--layout-header-desktop-height)]",
        ].join(" ")}
        {...slotProps?.container}
      >
        {slots?.leftArea}

        {/* HeaderCenterArea */}
        <div
          className="flex flex-[1_1_auto] justify-center"
          {...slotProps?.centerArea}
        >
          {slots?.centerArea}
        </div>

        {slots?.rightArea}
      </div>

      {/* Bottom area container */}
      <div className="mx-auto w-full px-4 max-w-[var(--max-w-xl,1536px)]">
        {slots?.bottomArea}
      </div>
    </header>
  );
}