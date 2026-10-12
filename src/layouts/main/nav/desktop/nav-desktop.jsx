import { Nav, NavUl } from "../components";
import { NavList, NavCategoryList } from "./nav-desktop-list";

import { CategoryPopover } from "../../../components/category-popover";

// ----------------------------------------------------------------------

export function NavDesktop({
  categories,
  mainNavData,
  secondaryNavData,
  className,
  ...other
}) {

  console.log(categories, 'flex cats')

  return (
    <Nav
      className={[
        // !important overrides any default flex-col the Nav component may apply
        "lg:!flex lg:!flex-row items-center justify-between hidden w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...other}
    >
      <CategoryPopover categories={categories} />

      {/* gap: 5 (5×8=40px), height: 1 (100%), flex-row, items-center */}
      <NavUl className="!flex !flex-row h-full items-center gap-10">
        {mainNavData.map((list) => (
          <NavList key={list.title} data={list} />
        ))}

        {categories?.filter((category) => category?.show_in_navbar === true)?.map((category) => (
          <NavCategoryList key={category.category_id} category={category} />
        ))}
      </NavUl>

      {/* Same layout as the main NavUl */}
      <NavUl className="!flex !flex-row h-full items-center !justify-center gap-10">
        {secondaryNavData.map((list) => (
          <NavList key={list.title} data={list} />
        ))}
      </NavUl>
    </Nav>
  );
}