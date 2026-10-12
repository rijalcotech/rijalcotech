
"use client";

import { useEffect, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { Iconify } from "@/components/iconify";

import { ProductItem } from "../product/product-item";

import { useGetProducts } from "@/api";



export function CategoryList({ categories, className = "", ...other }) {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const productFilterQuery = generateQueryParams();

  const { products } = useGetProducts(productFilterQuery);

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories]);

  function generateQueryParams() {
    const params = new URLSearchParams();

    if (selectedCategory?.category_id) {
      params.append("category", selectedCategory.category_id);
    }

    return params;
  }

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedCategories(categories);
  };

  const handleClick = (category) => {
    const { category_id, has_sub_cat, subCategories } = category;

    if (has_sub_cat) {
      setSelectedCategory(category);
      setSelectedCategories(subCategories);
    } else {
      dispatch(setCategory(category_id));
      router.push(paths.product.root);
    }
  };

  return (
    <div className={`space-y-6 ${className}`} {...other}>
      {selectedCategory && (
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Iconify icon="eva:arrow-ios-back-fill" />
          Back to Main Categories
        </button>
      )}

      {/* Categories Grid */}
      <div
        className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {selectedCategories?.map((category, index) => (
          <CategoryItem
            key={category.category_id}
            category={category}
            index={index}
            onClick={() => handleClick(category)}
          />
        ))}
      </div>

      {/* Products */}
      {selectedCategory && !!products?.length && (
        <>
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory.name} Products
          </h2>

          <div
            className="
              grid gap-6
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            "
          >
            {products?.map((product) => (
              <ProductItem
                key={product.product_id}
                product={product}
                detailsHref={paths.product.details(product.slug)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CategoryItem({ category, index = 0, onClick }) {
  const { name, web_image } = category;
  const ACCENT_COLORS = [
    { blob: "#d1fae5", ring: "from-green-300 to-teal-200" },
    { blob: "#ede9fe", ring: "from-purple-400 to-violet-300" },
    { blob: "#e0f2fe", ring: "from-cyan-300 to-blue-200" },
    { blob: "#fef9c3", ring: "from-yellow-300 to-amber-200" },
    { blob: "#fee2e2", ring: "from-red-300 to-pink-200" },
    { blob: "#dbeafe", ring: "from-blue-300 to-indigo-200" },
  ];
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-2xl p-3 flex flex-col items-center gap-4 shadow-sm border border-gray-100 cursor-pointer overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[120px]"
    >
      {/* Decorative background blob — top right */}
      <div
        className="absolute top-[-28px] right-[-28px] w-24 h-24 rounded-full opacity-60 pointer-events-none"
        style={{ backgroundColor: accent.blob }}
      />
      {/* Small secondary blob — bottom left */}
      <div
        className="absolute bottom-[-16px] left-[-16px] w-12 h-12 rounded-full opacity-30 pointer-events-none"
        style={{ backgroundColor: accent.blob }}
      />

      {/* Avatar with gradient ring */}
      <div className={`p-[3px] rounded-full bg-gradient-to-br ${accent.ring} shadow-md mt-2 relative z-10`}>
        <div className="bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center">
          <img
            alt={name}
            title={name}
            src={web_image}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-contain"
          />
        </div>
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-gray-800 text-center leading-snug line-clamp-2 relative z-10">
        {name}
      </p>
    </div>
  );
}