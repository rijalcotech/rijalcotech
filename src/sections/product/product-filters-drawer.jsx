// import { useCallback } from "react";

// import {
//   Box,
//   Radio,
//   Stack,
//   Badge,
//   Drawer,
//   Rating,
//   Button,
//   Slider,
//   Divider,
//   Tooltip,
//   Checkbox,
//   IconButton,
//   Typography,
//   FormControlLabel,
// } from "@mui/material";
// import { inputBaseClasses } from "@mui/material/InputBase";

// import { useAppDispatch } from "@/redux/hooks";
// import { setCategory, setBrand } from "@/redux/actions";

// import { Iconify } from "@/components/iconify";
// import { Scrollbar } from "@/components/scrollbar";
// import { NumberInput } from "@/components/number-input";

// // ----------------------------------------------------------------------

// const MAX_AMOUNT = 200;

// const marksLabel = Array.from({ length: 21 }, (_, index) => {
//   const value = index * 10;
//   const firstValue = index === 0 ? `$${value}` : `${value}`;

//   return {
//     value,
//     label: index % 4 ? "" : firstValue,
//   };
// });

// export function ProductFiltersDrawer({
//   open,
//   onOpen,
//   onClose,
//   canReset,
//   filters,
//   priceLimit,
//   options,
// }) {
//   const dispatch = useAppDispatch();
//   const {
//     state: currentFilters,
//     setState: updateFilters,
//     resetState: resetFilters,
//   } = filters;

//   const handleFilterCategory = useCallback(
//     (newValue) => {
//       updateFilters({ category: newValue });
//       dispatch(setCategory(newValue));
//     },
//     [updateFilters, dispatch]
//   );

//   const handleFilterBrand = useCallback(
//     (newValue) => {
//       const checked = currentFilters.brand.includes(newValue)
//         ? currentFilters.brand.filter((value) => value !== newValue)
//         : [...currentFilters.brand, newValue];

//       updateFilters({ brand: checked });
//       dispatch(setBrand(checked));
//     },
//     [updateFilters, currentFilters.brand, dispatch]
//   );

//   const handleFilterPriceRange = useCallback(
//     (event, newValue) => {
//       updateFilters({ priceRange: newValue });
//     },
//     [updateFilters]
//   );

//   const renderHead = () => (
//     <>
//       <Box
//         sx={{
//           py: 2,
//           pr: 1,
//           pl: 2.5,
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Filters
//         </Typography>

//         <Tooltip title="Reset">
//           <IconButton onClick={() => resetFilters()}>
//             <Badge color="error" variant="dot" invisible={!canReset}>
//               <Iconify icon="solar:restart-bold" />
//             </Badge>
//           </IconButton>
//         </Tooltip>

//         <IconButton onClick={onClose}>
//           <Iconify icon="mingcute:close-line" />
//         </IconButton>
//       </Box>

//       <Divider sx={{ borderStyle: "dashed" }} />
//     </>
//   );

//   const renderBrand = () => (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <Typography variant="subtitle2" sx={{ mb: 1 }}>
//         Brand
//       </Typography>

//       {options.brands?.map((brand) => (
//         <FormControlLabel
//           key={brand.brand_id}
//           label={brand.brand_name}
//           control={
//             <Checkbox
//               checked={currentFilters.brand.includes(brand.brand_id)}
//               onClick={() => handleFilterBrand(brand.brand_id)}
//               inputProps={{ id: `${brand.brand_id}-radio` }}
//             />
//           }
//         />
//       ))}
//     </Box>
//   );

//   const renderCategories = (categories) => {
//     return categories.map((category) => (
//       <Box key={category.category_id}>
//         <FormControlLabel
//           label={category.name}
//           control={
//             <Radio
//               checked={category.category_id === currentFilters.category}
//               onClick={() => handleFilterCategory(category.category_id)}
//               inputProps={{ id: `${category.category_id}-radio` }}
//             />
//           }
//         />

//         {category.has_sub_cat && (
//           <Box sx={{ pl: 3 }}>{renderCategories(category.subCategories)}</Box>
//         )}
//       </Box>
//     ));
//   };

//   const renderCategory = () => (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <Typography variant="subtitle2" sx={{ mb: 1 }}>
//         Category
//       </Typography>

//       {renderCategories(options.categories)}
//     </Box>
//   );

//   const renderPrice = () => (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <Typography variant="subtitle2">Price</Typography>

//       <Box sx={{ my: 2, gap: 5, display: "flex" }}>
//         <InputRange
//           type="min"
//           value={currentFilters.priceRange}
//           onChange={updateFilters}
//           //
//           maxPrice={priceLimit.max}
//         />

//         <InputRange
//           type="max"
//           value={currentFilters.priceRange}
//           onChange={updateFilters}
//           //
//           maxPrice={priceLimit.max}
//         />
//       </Box>

//       <Slider
//         value={currentFilters.priceRange}
//         onChange={handleFilterPriceRange}
//         step={200}
//         min={priceLimit.min}
//         max={priceLimit.max}
//         marks={marksLabel}
//         getAriaValueText={(value) => `Rs. ${value}`}
//         valueLabelFormat={(value) => `Rs. ${value}`}
//         sx={{ alignSelf: "center", width: `calc(100% - 24px)` }}
//       />
//     </Box>
//   );

//   return (
//     <>
//       <Button
//         disableRipple
//         color="inherit"
//         endIcon={
//           <Badge color="error" variant="dot" invisible={!canReset}>
//             <Iconify icon="ic:round-filter-list" />
//           </Badge>
//         }
//         onClick={onOpen}
//       >
//         Filters
//       </Button>

//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={onClose}
//         slotProps={{ backdrop: { invisible: true } }}
//         PaperProps={{ sx: { width: 320 } }}
//       >
//         {renderHead()}

//         <Scrollbar sx={{ px: 2.5, py: 3 }}>
//           <Stack spacing={3}>
//             {renderBrand()}

//             {renderCategory()}

//             {renderPrice()}
//           </Stack>
//         </Scrollbar>
//       </Drawer>
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// function InputRange({ type, value, onChange: onFilters, maxPrice }) {
//   const minValue = value[0];
//   const maxValue = value[1];

//   const handleBlur = useCallback(() => {
//     const newMin = Math.max(0, Math.min(minValue, maxPrice));
//     const newMax = Math.max(0, Math.min(maxValue, maxPrice));

//     if (newMin !== minValue || newMax !== maxValue) {
//       onFilters({ priceRange: [newMin, newMax] });
//     }
//   }, [minValue, maxValue, onFilters]);

//   return (
//     <Box sx={{ width: 1, display: "flex", alignItems: "center" }}>
//       <Typography
//         variant="caption"
//         sx={{
//           flexGrow: 1,
//           color: "text.disabled",
//           textTransform: "capitalize",
//           fontWeight: "fontWeightSemiBold",
//         }}
//       >
//         {`${type} (Rs.)`}
//       </Typography>

//       <NumberInput
//         hideButtons
//         max={maxPrice}
//         value={type === "min" ? minValue : maxValue}
//         onChange={(event, newValue) =>
//           onFilters({
//             priceRange:
//               type === "min" ? [newValue, maxValue] : [minValue, newValue],
//           })
//         }
//         onBlur={handleBlur}
//         sx={{ maxWidth: 64 }}
//         slotProps={{
//           input: {
//             sx: {
//               [`& .${inputBaseClasses.input}`]: {
//                 pr: 1,
//                 textAlign: "right",
//               },
//             },
//           },
//         }}
//       />
//     </Box>
//   );
// }
import { useCallback } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory, setBrand } from "@/redux/actions";

import { Iconify } from "@/components/iconify";
import { Scrollbar } from "@/components/scrollbar";
import { NumberInput } from "@/components/number-input";

// ----------------------------------------------------------------------

const MAX_AMOUNT = 200;

const marksLabel = Array.from({ length: 21 }, (_, index) => {
  const value = index * 10;

  return {
    value,
    label: index % 4 ? "" : `${value}`,
  };
});

export function ProductFiltersDrawer({
  open,
  onOpen,
  onClose,
  canReset,
  filters,
  priceLimit,
  options,
}) {
  const dispatch = useAppDispatch();

  const {
    state: currentFilters,
    setState: updateFilters,
    resetState: resetFilters,
  } = filters;

  // ----------------------------------------------------------------------

  const handleFilterCategory = useCallback(
    (newValue) => {
      updateFilters({ category: newValue });
      dispatch(setCategory(newValue));
    },
    [updateFilters, dispatch]
  );

  const handleFilterBrand = useCallback(
    (newValue) => {
      const checked = currentFilters.brand.includes(newValue)
        ? currentFilters.brand.filter((value) => value !== newValue)
        : [...currentFilters.brand, newValue];

      updateFilters({ brand: checked });
      dispatch(setBrand(checked));
    },
    [updateFilters, currentFilters.brand, dispatch]
  );

  const handleFilterPriceRange = useCallback(
    (event) => {
      const value = Number(event.target.value);

      updateFilters({
        priceRange: [currentFilters.priceRange[0], value],
      });
    },
    [updateFilters, currentFilters.priceRange]
  );

  // ----------------------------------------------------------------------

  const renderHead = () => (
    <>
      <div className="flex items-center py-4 pr-2 pl-5 border-b border-dashed border-gray-200">
        <h6 className="flex-1 text-lg font-semibold text-gray-900">
          Filters
        </h6>

        <button
          type="button"
          onClick={() => resetFilters()}
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
        >
          {canReset && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}

          <Iconify icon="solar:restart-bold" width={20} />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Iconify icon="mingcute:close-line" width={20} />
        </button>
      </div>
    </>
  );

  // ----------------------------------------------------------------------

  const renderBrand = () => (
    <div className="flex flex-col">
      <h6 className="mb-3 text-sm font-semibold text-gray-900">Brand</h6>

      <div className="space-y-2">
        {options.brands?.map((brand) => (
          <label
            key={brand.brand_id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={currentFilters.brand.includes(brand.brand_id)}
              onChange={() => handleFilterBrand(brand.brand_id)}
              id={`${brand.brand_id}-checkbox`}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
            />

            <span className="text-sm text-gray-700">
              {brand.brand_name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  // ----------------------------------------------------------------------

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <div key={category.category_id}>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={category.category_id === currentFilters.category}
            onChange={() => handleFilterCategory(category.category_id)}
            id={`${category.category_id}-radio`}
            className="h-4 w-4 border-gray-300 text-black focus:ring-0"
          />

          <span className="text-sm text-gray-700">{category.name}</span>
        </label>

        {category.has_sub_cat && (
          <div className="pl-6 mt-2 space-y-2">
            {renderCategories(category.subCategories)}
          </div>
        )}
      </div>
    ));
  };

  // ----------------------------------------------------------------------

  const renderCategory = () => (
    <div className="flex flex-col">
      <h6 className="mb-3 text-sm font-semibold text-gray-900">
        Category
      </h6>

      <div className="space-y-2">
        {renderCategories(options.categories)}
      </div>
    </div>
  );

  // ----------------------------------------------------------------------

  const renderPrice = () => (
    <div className="flex flex-col">
      <h6 className="text-sm font-semibold text-gray-900">Price</h6>

      <div className="my-5 flex gap-5">
        <InputRange
          type="min"
          value={currentFilters.priceRange}
          onChange={updateFilters}
          maxPrice={priceLimit.max}
        />

        <InputRange
          type="max"
          value={currentFilters.priceRange}
          onChange={updateFilters}
          maxPrice={priceLimit.max}
        />
      </div>

      <input
        type="range"
        min={priceLimit.min}
        max={priceLimit.max}
        value={currentFilters.priceRange[1]}
        onChange={handleFilterPriceRange}
        className="w-full accent-black"
      />

      <div className="mt-2 flex justify-between text-[11px] text-gray-400">
        {marksLabel.map((mark) => (
          <span key={mark.value}>{mark.label}</span>
        ))}
      </div>
    </div>
  );

  // ----------------------------------------------------------------------

  return (
    <>
      {/* Filter Button */}

      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-800"
      >
        <div className="relative">
          {canReset && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          )}

          <Iconify icon="ic:round-filter-list" width={20} />
        </div>

        Filters
      </button>

      {/* Drawer */}

      <div
        className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"
          }`}
      >
        {/* Backdrop */}

        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/20 transition-opacity ${open ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Drawer Panel */}

        <div
          className={`absolute top-0 right-0 h-full w-[320px] bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {renderHead()}

          <Scrollbar className="h-full px-5 py-6">
            <div className="space-y-8 pb-20">
              {renderBrand()}

              {renderCategory()}

              {renderPrice()}
            </div>
          </Scrollbar>
        </div>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

function InputRange({ type, value, onChange: onFilters, maxPrice }) {
  const minValue = value[0];
  const maxValue = value[1];

  const handleBlur = useCallback(() => {
    const newMin = Math.max(0, Math.min(minValue, maxPrice));

    const newMax = Math.max(0, Math.min(maxValue, maxPrice));

    if (newMin !== minValue || newMax !== maxValue) {
      onFilters({ priceRange: [newMin, newMax] });
    }
  }, [minValue, maxValue, onFilters, maxPrice]);

  return (
    <div className="flex w-full items-center">
      <span className="flex-1 text-xs font-semibold capitalize text-gray-400">
        {type} (Rs.)
      </span>

      <NumberInput
        hideButtons
        max={maxPrice}
        value={type === "min" ? minValue : maxValue}
        onChange={(event, newValue) =>
          onFilters({
            priceRange:
              type === "min"
                ? [newValue, maxValue]
                : [minValue, newValue],
          })
        }
        onBlur={handleBlur}
        className="max-w-[64px]"
        slotProps={{
          input: {
            className: "pr-1 text-right",
          },
        }}
      />
    </div>
  );
}