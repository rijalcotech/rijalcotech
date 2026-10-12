// import { useCallback } from "react";

// import { Chip } from "@mui/material";

// import { fDateRangeShortLabel } from "@/utils/format-time";

// import {
//   chipProps,
//   FiltersBlock,
//   FiltersResult,
// } from "@/components/filters-result";

// // ----------------------------------------------------------------------

// export function OrderTableFiltersResult({
//   filters,
//   totalResults,
//   onResetPage,
//   sx,
// }) {
//   const {
//     state: currentFilters,
//     setState: updateFilters,
//     resetState: resetFilters,
//   } = filters;

//   const handleRemoveKeyword = useCallback(() => {
//     onResetPage();
//     updateFilters({ name: "" });
//   }, [onResetPage, updateFilters]);

//   const handleRemoveStatus = useCallback(() => {
//     onResetPage();
//     updateFilters({ status: "all" });
//   }, [onResetPage, updateFilters]);

//   const handleRemoveDate = useCallback(() => {
//     onResetPage();
//     updateFilters({ startDate: null, endDate: null });
//   }, [onResetPage, updateFilters]);

//   const handleReset = useCallback(() => {
//     onResetPage();
//     resetFilters();
//   }, [onResetPage, resetFilters]);

//   return (
//     <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
//       <FiltersBlock label="Status:" isShow={currentFilters.status !== "all"}>
//         <Chip
//           {...chipProps}
//           label={currentFilters.status}
//           onDelete={handleRemoveStatus}
//           sx={{ textTransform: "capitalize" }}
//         />
//       </FiltersBlock>

//       <FiltersBlock
//         label="Date:"
//         isShow={Boolean(currentFilters.startDate && currentFilters.endDate)}
//       >
//         <Chip
//           {...chipProps}
//           label={fDateRangeShortLabel(
//             currentFilters.startDate,
//             currentFilters.endDate
//           )}
//           onDelete={handleRemoveDate}
//         />
//       </FiltersBlock>

//       <FiltersBlock label="Keyword:" isShow={!!currentFilters.name}>
//         <Chip
//           {...chipProps}
//           label={currentFilters.name}
//           onDelete={handleRemoveKeyword}
//         />
//       </FiltersBlock>
//     </FiltersResult>
//   );
// }
"use client";

import { useCallback } from "react";
import { fDateRangeShortLabel } from "@/utils/format-time";

export function OrderTableFiltersResult({
  filters,
  totalResults,
  onResetPage,
  className = "",
}) {
  const {
    state: currentFilters,
    setState: updateFilters,
    resetState: resetFilters,
  } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: "" });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: "all" });
  }, [onResetPage, updateFilters]);

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    updateFilters({ startDate: null, endDate: null });
  }, [onResetPage, updateFilters]);

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  const hasStatus = currentFilters.status !== "all";
  const hasDate = Boolean(currentFilters.startDate && currentFilters.endDate);
  const hasKeyword = Boolean(currentFilters.name);

  const activeCount =
    (hasStatus ? 1 : 0) + (hasDate ? 1 : 0) + (hasKeyword ? 1 : 0);

  if (!activeCount) return null;

  return (
    <div className={`mb-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          {totalResults} results
        </p>

        <button
          onClick={handleReset}
          className="text-sm text-red-500 hover:text-red-600 transition"
        >
          Reset all
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">

        {/* STATUS */}
        {hasStatus && (
          <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm gap-2">
            <span className="capitalize">
              Status: {currentFilters.status}
            </span>

            <button
              onClick={handleRemoveStatus}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        )}

        {/* DATE */}
        {hasDate && (
          <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm gap-2">
            <span>
              Date:{" "}
              {fDateRangeShortLabel(
                currentFilters.startDate,
                currentFilters.endDate
              )}
            </span>

            <button
              onClick={handleRemoveDate}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        )}

        {/* KEYWORD */}
        {hasKeyword && (
          <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm gap-2">
            <span>Keyword: {currentFilters.name}</span>

            <button
              onClick={handleRemoveKeyword}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}