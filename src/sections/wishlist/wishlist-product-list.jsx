// import { Table, TableBody } from "@mui/material";

// import { Scrollbar } from "@/components/scrollbar";
// import { TableHeadCustom } from "@/components/table";

// import { WishlistProduct } from "./wishlist-product";

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: "product", label: "Product" },
//   { id: "price", label: "Price" },
//   { id: "cartButton" },
//   { id: "deleteButton" },
// ];

// // ----------------------------------------------------------------------

// export function WishlistProductList({ items, onMoveToCart, onDelete }) {
//   return (
//     <Scrollbar>
//       <Table sx={{ minWidth: 720 }}>
//         <TableHeadCustom headCells={TABLE_HEAD} />

//         <TableBody>
//           {items?.map((row) => (
//             <WishlistProduct
//               key={row.wishlist_id}
//               //
//               row={row}
//               onMoveToCart={onMoveToCart}
//               onDelete={onDelete}
//             />
//           ))}
//         </TableBody>
//       </Table>
//     </Scrollbar>
//   );
// }
import { Scrollbar } from "@/components/scrollbar";

import { WishlistProduct } from "./wishlist-product";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "cartButton", label: "" },
  { id: "deleteButton", label: "" },
];

// ----------------------------------------------------------------------

export function WishlistProductList({ items, onMoveToCart, onDelete }) {
  return (
    <Scrollbar>
      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse">
          {/* TableHeadCustom */}
          <thead>
            <tr>
              {TABLE_HEAD.map((col) => (
                <th
                  key={col.id}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-50 border-b border-gray-200 first:pl-6 last:pr-6"
                >
                  {col.label ?? ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items?.map((row) => (
              <WishlistProduct
                key={row.wishlist_id}
                row={row}
                onMoveToCart={onMoveToCart}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Scrollbar>
  );
}