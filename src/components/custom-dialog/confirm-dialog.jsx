// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// // ----------------------------------------------------------------------

// export function ConfirmDialog({ open, title, action, content, onClose, ...other }) {
//   return (
//     <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//       <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

//       {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

//       <DialogActions>
//         {action}

//         <Button variant="outlined" color="inherit" onClick={onClose}>
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
"use client";

export function ConfirmDialog({
  open,
  title,
  action,
  content,
  onClose,
  children,
  ...other
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center"
      {...other}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-xs mx-4 overflow-hidden rounded-[4px] bg-white shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]">
        {/* Title */}
        <div className="px-6 pt-5 pb-2">
          <h2 className="text-xl font-medium text-gray-900">
            {title}
          </h2>
        </div>

        {/* Content */}
        {content && (
          <div className="px-6 pb-5 text-sm text-gray-700">
            {content}
          </div>
        )}

        {children}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-6 py-2">
          {action}

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-[6px] text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}