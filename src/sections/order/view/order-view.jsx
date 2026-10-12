// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { varAlpha } from "minimal-shared/utils";
// import { useBoolean, useSetState } from "minimal-shared/hooks";

// import {
//   Tab,
//   Box,
//   Tabs,
//   Card,
//   Table,
//   Button,
//   Tooltip,
//   TableBody,
//   IconButton,
//   Container,
// } from "@mui/material";

// import { paths } from "@/routes/paths";

// import { fIsAfter, fIsBetween } from "@/utils/format-time";

// import { Label } from "@/components/label";
// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";
// import { Scrollbar } from "@/components/scrollbar";
// import { ConfirmDialog } from "@/components/custom-dialog";
// import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
// import {
//   useTable,
//   emptyRows,
//   rowInPage,
//   TableNoData,
//   getComparator,
//   TableEmptyRows,
//   TableHeadCustom,
//   TableSelectedAction,
//   TablePaginationCustom,
// } from "@/components/table";

// import { EmailVerificationBanner } from "@/auth/components";

// import { OrderTableRow } from "../order-table-row";
// import { OrderTableToolbar } from "../order-table-toolbar";
// import { OrderTableFiltersResult } from "../order-table-filters-result";

// import { useGetOrders } from "@/api";

// // ----------------------------------------------------------------------

// export const STATUS_OPTIONS = [
//   { value: "all", label: "All" },
//   { value: "pending", label: "Pending" },
//   { value: "confirmed", label: "Confirmed" },
//   { value: "processing", label: "Processing" },
//   { value: "delivered", label: "Delivered" },
//   { value: "cancelled", label: "Cancelled" },
//   { value: "returned", label: "Returned" },
//   { value: "completed", label: "Completed" },
// ];

// const TABLE_HEAD = [
//   { id: "order_id", label: "Order", width: 88 },
//   { id: "order_date", label: "Order Date", width: 140 },
//   { id: "items", label: "Products", width: 120, align: "center" },
//   { id: "total_amount", label: "Price", width: 140 },
//   { id: "status", label: "Status", width: 110 },
//   { id: "", width: 88 },
// ];

// // ----------------------------------------------------------------------

// export function OrderView() {
//   const table = useTable({ defaultOrderBy: "order_date", defaultOrder: "desc" });

//   const confirmDialog = useBoolean();

//   const {
//     orders,
//     emailVerified,
//     hasHiddenOrders,
//     hiddenOrdersCount,
//     visibleOrdersCount,
//     message
//   } = useGetOrders();

//   const [tableData, setTableData] = useState([]);

//   const filters = useSetState({
//     name: "",
//     status: "all",
//     startDate: null,
//     endDate: null,
//   });

//   useEffect(() => {
//     setTableData(orders);
//   }, [orders]);

//   const { state: currentFilters, setState: updateFilters } = filters;

//   const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);

//   const dataFiltered = applyFilter({
//     inputData: tableData,
//     comparator: getComparator(table.order, table.orderBy),
//     filters: currentFilters,
//     dateError,
//   });

//   const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

//   const canReset =
//     !!currentFilters.name ||
//     currentFilters.status !== "all" ||
//     (!!currentFilters.startDate && !!currentFilters.endDate);

//   const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

//   const handleDeleteRows = useCallback(() => {
//     const deleteRows = tableData.filter(
//       (row) => !table.selected.includes(row.id)
//     );

//     toast.success("Delete success!");

//     setTableData(deleteRows);

//     table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
//   }, [dataFiltered?.length, dataInPage.length, table, tableData]);

//   const handleFilterStatus = useCallback(
//     (event, newValue) => {
//       table.onResetPage();
//       updateFilters({ status: newValue });
//     },
//     [updateFilters, table]
//   );

//   const renderConfirmDialog = () => (
//     <ConfirmDialog
//       open={confirmDialog.value}
//       onClose={confirmDialog.onFalse}
//       title="Delete"
//       content={
//         <>
//           Are you sure want to delete <strong> {table.selected.length} </strong>{" "}
//           items?
//         </>
//       }
//       action={
//         <Button
//           variant="contained"
//           color="error"
//           onClick={() => {
//             handleDeleteRows();
//             confirmDialog.onFalse();
//           }}
//         >
//           Delete
//         </Button>
//       }
//     />
//   );

//   return (
//     <>
//       <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
//         <CustomBreadcrumbs
//           heading="List"
//           links={[{ name: "Order", href: paths.order.root }, { name: "List" }]}
//           sx={{ mb: { xs: 3, md: 5 } }}
//         />

//         <EmailVerificationBanner />

//         <Card>
//           <Tabs
//             value={currentFilters.status}
//             onChange={handleFilterStatus}
//             sx={[
//               (theme) => ({
//                 px: 2.5,
//                 boxShadow: `inset 0 -2px 0 0 ${varAlpha(
//                   theme.vars.palette.grey["500Channel"],
//                   0.08
//                 )}`,
//               }),
//             ]}
//           >
//             {STATUS_OPTIONS.map((tab) => (
//               <Tab
//                 key={tab.value}
//                 iconPosition="end"
//                 value={tab.value}
//                 label={tab.label}
//                 icon={
//                   <Label
//                     variant={
//                       ((tab.value === "all" ||
//                         tab.value === currentFilters.status) &&
//                         "filled") ||
//                       "soft"
//                     }
//                     color={
//                       (tab.value === "completed" && "success") ||
//                       (tab.value === "confirmed" && "success") ||
//                       (tab.value === "delivered" && "success") ||
//                       (tab.value === "pending" && "warning") ||
//                       (tab.value === "cancelled" && "error") ||
//                       (tab.value === "returned" && "error") ||
//                       (tab.value === "processing" && "info") ||
//                       "default"
//                     }
//                   >
//                     {tab.value !== "all"
//                       ? tableData?.filter((order) => order.status === tab.value)
//                         .length
//                       : orders.length}
//                   </Label>
//                 }
//               />
//             ))}
//           </Tabs>

//           <OrderTableToolbar
//             filters={filters}
//             onResetPage={table.onResetPage}
//             dateError={dateError}
//           />

//           {canReset && (
//             <OrderTableFiltersResult
//               filters={filters}
//               totalResults={dataFiltered?.length}
//               onResetPage={table.onResetPage}
//               sx={{ p: 2.5, pt: 0 }}
//             />
//           )}

//           <Box sx={{ position: "relative" }}>
//             <TableSelectedAction
//               dense={table.dense}
//               numSelected={table.selected.length}
//               rowCount={dataFiltered?.length}
//               onSelectAllRows={(checked) =>
//                 table.onSelectAllRows(
//                   checked,
//                   dataFiltered?.map((row) => row.id)
//                 )
//               }
//               action={
//                 <Tooltip title="Delete">
//                   <IconButton color="primary" onClick={confirmDialog.onTrue}>
//                     <Iconify icon="solar:trash-bin-trash-bold" />
//                   </IconButton>
//                 </Tooltip>
//               }
//             />

//             <Scrollbar>
//               <Table
//                 size={table.dense ? "small" : "medium"}
//                 sx={{ minWidth: 800 }}
//               >
//                 <TableHeadCustom
//                   order={table.order}
//                   orderBy={table.orderBy}
//                   headCells={TABLE_HEAD}
//                   rowCount={dataFiltered?.length}
//                   numSelected={table.selected.length}
//                   onSort={table.onSort}
//                 />

//                 <TableBody>
//                   {dataFiltered
//                     ?.slice(
//                       table.page * table.rowsPerPage,
//                       table.page * table.rowsPerPage + table.rowsPerPage
//                     )
//                     ?.map((row) => (
//                       <OrderTableRow
//                         key={row.order_id}
//                         row={row}
//                         selected={table.selected.includes(row.order_id)}
//                         detailsHref={paths.order.details(row.order_id)}
//                       />
//                     ))}

//                   <TableEmptyRows
//                     height={table.dense ? 56 : 56 + 20}
//                     emptyRows={emptyRows(
//                       table.page,
//                       table.rowsPerPage,
//                       dataFiltered?.length
//                     )}
//                   />

//                   <TableNoData notFound={notFound} />
//                 </TableBody>
//               </Table>
//             </Scrollbar>
//           </Box>

//           <TablePaginationCustom
//             page={table.page}
//             dense={table.dense}
//             count={dataFiltered?.length}
//             rowsPerPage={table.rowsPerPage}
//             onPageChange={table.onChangePage}
//             onChangeDense={table.onChangeDense}
//             onRowsPerPageChange={table.onChangeRowsPerPage}
//           />
//         </Card>
//       </Container>

//       {renderConfirmDialog()}
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// function applyFilter({ inputData, comparator, filters, dateError }) {
//   const { status, name, startDate, endDate } = filters;

//   const stabilizedThis = inputData?.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   inputData = stabilizedThis.map((el) => el[0]);

//   if (name) {
//     inputData = inputData.filter(({ order_id }) =>
//       String(order_id).toLowerCase().includes(name.toLowerCase())
//     );
//   }

//   if (status !== "all") {
//     inputData = inputData.filter((order) => order.status === status);
//   }

//   if (!dateError) {
//     if (startDate && endDate) {
//       inputData = inputData.filter((order) =>
//         fIsBetween(order.order_date, startDate, endDate)
//       );
//     }
//   }

//   return inputData;
// }
"use client";

import { useState, useCallback, useEffect } from "react";
import { useBoolean, useSetState } from "minimal-shared/hooks";

import { paths } from "@/routes/paths";

import { fIsAfter, fIsBetween } from "@/utils/format-time";

import { Label } from "@/components/label";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";
import { Scrollbar } from "@/components/scrollbar";
import { ConfirmDialog } from "@/components/custom-dialog";
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "@/components/table";

import { EmailVerificationBanner } from "@/auth/components";

import { OrderTableRow } from "../order-table-row";
import { OrderTableToolbar } from "../order-table-toolbar";
import { OrderTableFiltersResult } from "../order-table-filters-result";

import { useGetOrders } from "@/api";

// ----------------------------------------------------------------------

export const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
  { value: "completed", label: "Completed" },
];

const TABLE_HEAD = [
  { id: "order_id", label: "Order", width: 88 },
  { id: "order_date", label: "Order Date", width: 140 },
  { id: "items", label: "Products", width: 120, align: "center" },
  { id: "total_amount", label: "Price", width: 140 },
  { id: "status", label: "Status", width: 110 },
  { id: "", width: 88 },
];

// ----------------------------------------------------------------------

export function OrderView() {
  const table = useTable({ defaultOrderBy: "order_date", defaultOrder: "desc" });
  const confirmDialog = useBoolean();

  const {
    orders,
    emailVerified,
    hasHiddenOrders,
    hiddenOrdersCount,
    visibleOrdersCount,
    message,
  } = useGetOrders();

  const [tableData, setTableData] = useState([]);

  const filters = useSetState({
    name: "",
    status: "all",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setTableData(orders);
  }, [orders]);

  const { state: currentFilters, setState: updateFilters } = filters;

  const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name ||
    currentFilters.status !== "all" ||
    (!!currentFilters.startDate && !!currentFilters.endDate);

  const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );
    toast.success("Delete success!");
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered?.length, dataInPage.length, table, tableData]);

  const handleFilterStatus = useCallback(
    (newValue) => {
      table.onResetPage();
      updateFilters({ status: newValue });
    },
    [updateFilters, table]
  );

  const getTabLabelColor = (value) => {
    if (["completed", "confirmed", "delivered"].includes(value)) return "success";
    if (["pending"].includes(value)) return "warning";
    if (["cancelled", "returned"].includes(value)) return "error";
    if (["processing"].includes(value)) return "info";
    return "default";
  };

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong>{table.selected.length}</strong> items?
        </>
      }
      action={
        <button
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </button>
      }
    />
  );

  return (
    <>
      {/* Container */}
      <div className="container mx-auto mb-5">
        <CustomBreadcrumbs
          heading="List"
          links={[{ name: "Order", href: paths.order.root }, { name: "List" }]}
          className="mb-1 md:mb-0"
        />

        <EmailVerificationBanner />

        {/* Card */}
        <div className="rounded-2xl bg-white  shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="px-1 border-b border-gray-500/[0.08] overflow-x-auto overflow-y-hidden">
            <div className="flex flex-nowrap items-center gap-2 rounded-2xl bg-gray-50 p-2">
              {STATUS_OPTIONS.map((tab) => {
                const isActive =
                  currentFilters.status === tab.value;

                const count =
                  tab.value !== "all"
                    ? tableData?.filter(
                      (order) => order.status === tab.value
                    ).length
                    : orders.length;

                return (
                  <button
                    key={tab.value}
                    onClick={() =>
                      handleFilterStatus(tab.value)
                    }
                    className={[
                      "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                      "transition-all duration-200 whitespace-nowrap",
                      isActive
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:bg-white/70 hover:text-gray-900",
                    ].join(" ")}
                  >
                    {/* Label */}
                    <span>{tab.label}</span>

                    {/* Count badge */}
                    <span
                      className={[
                        "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                        isActive
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-600",
                      ].join(" ")}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toolbar */}
          <OrderTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {/* Filters result */}
          {canReset && (
            <div className="px-5 pb-0">
              <OrderTableFiltersResult
                filters={filters}
                totalResults={dataFiltered?.length}
                onResetPage={table.onResetPage}
              />
            </div>
          )}

          {/* Table area */}
          <div className="relative">
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered?.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered?.map((row) => row.id)
                )
              }
              action={
                <button
                  title="Delete"
                  className="p-2 rounded-full text-primary hover:bg-primary/8 transition-colors"
                  onClick={confirmDialog.onTrue}
                >
                  <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                </button>
              }
            />

            <Scrollbar>
              <table className="min-w-[800px] w-full border-collapse">
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={dataFiltered?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered?.map((row) => row.id)
                    )
                  }
                />

                <tbody>
                  {dataFiltered
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    ?.map((row) => (
                      <OrderTableRow
                        key={row.order_id}
                        row={row}
                        selected={table.selected.includes(row.order_id)}
                        onSelectRow={() => table.onSelectRow(row.order_id)}
                        detailsHref={paths.order.details(row.order_id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 76}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      dataFiltered?.length
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </tbody>
              </table>
            </Scrollbar>
          </div>

          {/* Pagination */}
          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered?.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </div>
      </div>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(({ order_id }) =>
      String(order_id).toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== "all") {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) =>
        fIsBetween(order.order_date, startDate, endDate)
      );
    }
  }

  return inputData;
}