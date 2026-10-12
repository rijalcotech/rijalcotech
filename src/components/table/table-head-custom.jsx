// import Box from '@mui/material/Box';
// import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import TableHead from '@mui/material/TableHead';
// import TableCell from '@mui/material/TableCell';
// import TableSortLabel from '@mui/material/TableSortLabel';

// // ----------------------------------------------------------------------

// const visuallyHidden = {
//   border: 0,
//   padding: 0,
//   width: '1px',
//   height: '1px',
//   margin: '-1px',
//   overflow: 'hidden',
//   position: 'absolute',
//   whiteSpace: 'nowrap',
//   clip: 'rect(0 0 0 0)',
// };

// // ----------------------------------------------------------------------

// export function TableHeadCustom({
//   sx,
//   order,
//   onSort,
//   orderBy,
//   headCells,
//   rowCount = 0,
//   numSelected = 0,
//   onSelectAllRows,
// }) {
//   return (
//     <TableHead sx={sx}>
//       <TableRow>
//         {onSelectAllRows && (
//           <TableCell padding="checkbox">
//             <Checkbox
//               indeterminate={!!numSelected && numSelected < rowCount}
//               checked={!!rowCount && numSelected === rowCount}
//               onChange={(event) => onSelectAllRows(event.target.checked)}
//               inputProps={{
//                 id: `all-row-checkbox`,
//                 'aria-label': `All row Checkbox`,
//               }}
//             />
//           </TableCell>
//         )}

//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.align || 'left'}
//             sortDirection={orderBy === headCell.id ? order : false}
//             sx={[
//               { width: headCell.width },
//               ...(Array.isArray(headCell.sx) ? headCell.sx : [headCell.sx]),
//             ]}
//           >
//             {onSort ? (
//               <TableSortLabel
//                 hideSortIcon
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : 'asc'}
//                 onClick={() => onSort(headCell.id)}
//               >
//                 {headCell.label}

//                 {orderBy === headCell.id ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                   </Box>
//                 ) : null}
//               </TableSortLabel>
//             ) : (
//               headCell.label
//             )}
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }
export function TableHeadCustom({
  order,
  onSort,
  orderBy,
  headCells,
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
}) {
  const isAllSelected = !!rowCount && numSelected === rowCount;
  const isIndeterminate = !!numSelected && numSelected < rowCount;

  return (
    <thead>
      <tr className="border-b border-gray-200 bg-white">
        {onSelectAllRows && (
          <th className="w-10 px-3 py-3 text-left">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate;
              }}
              onChange={(e) => onSelectAllRows(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-blue-600"
              aria-label="All row Checkbox"
              id="all-row-checkbox"
            />
          </th>
        )}

        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;

          return (
            <th
              key={headCell.id}
              style={{ width: headCell.width }}
              className={[
                "px-3 py-3 text-sm font-medium text-gray-700",
                headCell.align === "right" && "text-right",
                headCell.align === "center" && "text-center",
                headCell.align === "left" || !headCell.align
                  ? "text-left"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {onSort ? (
                <button
                  type="button"
                  onClick={() => onSort(headCell.id)}
                  className={[
                    "inline-flex items-center gap-1 select-none",
                    "hover:text-gray-900 transition",
                  ].join(" ")}
                >
                  <span>{headCell.label}</span>

                  {/* Sort indicator */}
                  {active && (
                    <span className="text-xs text-gray-500">
                      {order === "desc" ? "▼" : "▲"}
                    </span>
                  )}
                </button>
              ) : (
                headCell.label
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}