// import { createClasses } from "@/theme/create-classes";

// // ----------------------------------------------------------------------

// export const snackbarClasses = {
//   root: createClasses("snackbar__root"),
//   toast: createClasses("snackbar__toast"),
//   title: createClasses("snackbar__title"),
//   icon: createClasses("snackbar__icon"),
//   iconSvg: createClasses("snackbar__icon__svg"),
//   content: createClasses("snackbar__content"),
//   description: createClasses("snackbar__description"),
//   actionButton: createClasses("snackbar__action__button"),
//   cancelButton: createClasses("snackbar__cancel__button"),
//   closeButton: createClasses("snackbar__close_button"),
//   loadingIcon: createClasses("snackbar__loading_icon"),
//   /********/
//   default: createClasses("snackbar__default"),
//   error: createClasses("snackbar__error"),
//   success: createClasses("snackbar__success"),
//   warning: createClasses("snackbar__warning"),
//   info: createClasses("snackbar__info"),
//   /********/
//   loader: "sonner-loader",
//   loaderVisible: '&[data-visible="true"]',
//   closeBtnVisible: '[data-close-button="true"]',
// };
// classes.js
export const snackbarClasses = {
  root: 'fixed z-[9999] top-4 right-4 flex flex-col gap-3 pointer-events-none',
  toast: [
    'relative flex items-start gap-3 w-[360px] min-h-[56px]',
    'pointer-events-auto rounded-xl px-4 py-3',
    'shadow-lg border border-white/10',
    'bg-white ',
    'text-gray-900 ',
    'transition-all duration-300',
  ].join(' '),

  // icon
  icon: 'flex-shrink-0 flex items-center justify-center w-5 h-5 mt-0.5',
  iconSvg: 'w-5 h-5',
  loadingIcon: 'w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin',

  // content
  content: 'flex flex-col flex-1 min-w-0',
  title: 'text-sm font-semibold leading-snug truncate',
  description: 'text-xs text-gray-500 mt-0.5 leading-snug',

  // buttons
  actionButton: [
    'mt-2 inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium',
    'bg-gray-900 text-white ',
    'hover:opacity-80 transition-opacity',
  ].join(' '),
  cancelButton: [
    'mt-2 inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium',
    'bg-gray-100 text-gray-700 ',
    'hover:opacity-80 transition-opacity',
  ].join(' '),
  closeButton: [
    'absolute top-2 right-2 flex items-center justify-center',
    'w-5 h-5 rounded-full text-gray-400 hover:text-gray-600',
    ' transition-colors',
  ].join(' '),

  // states
  default: 'bg-white  border-gray-200',
  info: 'bg-blue-50 border-blue-200  [&_.snackbar-title]:text-blue-800 ',
  success: 'bg-green-50  border-green-200  [&_.snackbar-title]:text-green-800 ',
  warning: 'bg-yellow-50  border-yellow-200  [&_.snackbar-title]:text-yellow-800 ',
  error: 'bg-red-50  border-red-200 [&_.snackbar-title]:text-red-800 ',
}; 