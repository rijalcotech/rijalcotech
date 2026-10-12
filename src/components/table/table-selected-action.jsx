// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import Typography from '@mui/material/Typography';

// // ----------------------------------------------------------------------

// export function TableSelectedAction({
//   sx,
//   dense,
//   action,
//   rowCount,
//   numSelected,
//   onSelectAllRows,
//   ...other
// }) {
//   if (!numSelected) {
//     return null;
//   }

//   return (
//     <Box
//       sx={[
//         () => ({
//           pl: 1,
//           pr: 2,
//           top: 0,
//           left: 0,
//           width: 1,
//           zIndex: 9,
//           height: 58,
//           display: 'flex',
//           position: 'absolute',
//           alignItems: 'center',
//           bgcolor: 'primary.lighter',
//           ...(dense && { height: 38 }),
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Checkbox
//         indeterminate={!!numSelected && numSelected < rowCount}
//         checked={!!rowCount && numSelected === rowCount}
//         onChange={(event) => onSelectAllRows(event.target.checked)}
//         inputProps={{
//           id: 'deselect-all-checkbox',
//           'aria-label': 'Deselect all checkbox',
//         }}
//       />

//       <Typography
//         variant="subtitle2"
//         sx={{
//           ml: 2,
//           flexGrow: 1,
//           color: 'primary.main',
//           ...(dense && { ml: 3 }),
//         }}
//       >
//         {numSelected} selected
//       </Typography>

//       {action && action}
//     </Box>
//   );
// }
export function TableSelectedAction({
  dense,
  action,
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
  className = "",
}) {
  if (!numSelected) return null;

  const isAllSelected = !!rowCount && numSelected === rowCount;
  const isIndeterminate = !!numSelected && numSelected < rowCount;

  return (
    <div
      className={[
        "absolute top-0 left-0 z-10 w-full flex items-center",
        "bg-blue-50 px-3 pr-4",
        dense ? "h-[38px]" : "h-[58px]",
        className,
      ].join(" ")}
    >
      {/* Checkbox */}
      <input
        id="deselect-all-checkbox"
        type="checkbox"
        checked={isAllSelected}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate;
        }}
        onChange={(e) => onSelectAllRows?.(e.target.checked)}
        className="h-4 w-4 cursor-pointer accent-blue-600"
        aria-label="Deselect all checkbox"
      />

      {/* Selected text */}
      <span
        className={[
          "ml-4 flex-1 font-medium text-blue-600",
          dense ? "ml-6" : "",
        ].join(" ")}
      >
        {numSelected} selected
      </span>

      {/* Action buttons */}
      {action && <div>{action}</div>}
    </div>
  );
}