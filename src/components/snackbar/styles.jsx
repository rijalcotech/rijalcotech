// import { Toaster } from 'sonner';
// import { varAlpha } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// import { snackbarClasses } from './classes';

// // ----------------------------------------------------------------------

// export const SnackbarRoot = styled(Toaster)(({ theme }) => {
//   const baseStyles = {
//     toastDefault: {
//       padding: theme.spacing(1, 1, 1, 1.5),
//       boxShadow: theme.vars.customShadows.z8,
//       color: theme.vars.palette.text.black,
//       backgroundColor: theme.vars.palette.text.primary,
//     },
//     toastColor: {
//       padding: theme.spacing(0.5, 1, 0.5, 0.5),
//       boxShadow: theme.vars.customShadows.z8,
//       color: theme.vars.palette.text.black,
//       backgroundColor: theme.vars.palette.background.paper,
//     },
//     toastLoader: {
//       padding: theme.spacing(0.5, 1, 0.5, 0.5),
//       boxShadow: theme.vars.customShadows.z8,
//       color: theme.vars.palette.text.black,
//       backgroundColor: theme.vars.palette.background.paper,
//     },
//   };

//   const loadingStyles = {
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     display: 'none',
//     transform: 'none',
//     overflow: 'hidden',
//     alignItems: 'center',
//     position: 'relative',
//     borderRadius: 'inherit',
//     justifyContent: 'center',
//     background: theme.vars.palette.background.neutral,
//     [`& .${snackbarClasses.loadingIcon}`]: {
//       zIndex: 9,
//       width: 24,
//       height: 24,
//       borderRadius: '50%',
//       animation: 'rotate 3s infinite linear',
//       background: `conic-gradient(transparent, ${varAlpha(theme.vars.palette.text.disabledChannel, 0.64)})`,
//     },
//     [snackbarClasses.loaderVisible]: { display: 'flex' },
//   };

//   return {
//     width: 300,
//     [`& .${snackbarClasses.toast}`]: {
//       gap: 12,
//       width: '100%',
//       minHeight: 52,
//       display: 'flex',
//       borderRadius: 12,
//       alignItems: 'center',
//     },
//     /**
//      * Content
//      */
//     [`& .${snackbarClasses.content}`]: { gap: 0, flex: '1 1 auto' },
//     [`& .${snackbarClasses.title}`]: { fontSize: theme.typography.subtitle2.fontSize },
//     [`& .${snackbarClasses.description}`]: { ...theme.typography.caption, opacity: 0.64 },
//     /**
//      * Buttons
//      */
//     [`& .${snackbarClasses.actionButton}`]: {},
//     [`& .${snackbarClasses.cancelButton}`]: {},
//     [`& .${snackbarClasses.closeButton}`]: {
//       top: 0,
//       right: 0,
//       left: 'auto',
//       color: 'currentColor',
//       backgroundColor: 'transparent',
//       transform: 'translate(-6px, 6px)',
//       borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
//       transition: theme.transitions.create(['background-color', 'border-color']),
//       '&:hover': {
//         borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
//         backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//       },
//     },
//     /**
//      * Icon
//      */
//     [`& .${snackbarClasses.icon}`]: {
//       margin: 0,
//       width: 48,
//       height: 48,
//       alignItems: 'center',
//       borderRadius: 'inherit',
//       justifyContent: 'center',
//       alignSelf: 'flex-start',
//       [`& .${snackbarClasses.iconSvg}`]: { width: 24, height: 24, fontSize: 0 },
//     },

//     '@keyframes rotate': { to: { transform: 'rotate(1turn)' } },

//     /**
//      * @variant default
//      */
//     [`& .${snackbarClasses.default}`]: {
//       ...baseStyles.toastDefault,
//       [`&:has(${snackbarClasses.closeBtnVisible})`]: {
//         [`& .${snackbarClasses.content}`]: { paddingRight: 32 },
//       },
//       [`&:has(.${snackbarClasses.loader})`]: baseStyles.toastLoader,
//       /**
//        * @with loader
//        */
//       [`&:has(.${snackbarClasses.loader})`]: baseStyles.toastLoader,
//       [`& .${snackbarClasses.loader}`]: loadingStyles,
//     },
//     /**
//      * @variant error
//      */
//     [`& .${snackbarClasses.error}`]: {
//       ...baseStyles.toastColor,
//       [`& .${snackbarClasses.icon}`]: {
//         color: theme.vars.palette.error.main,
//         backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
//       },
//     },
//     /**
//      * @variant success
//      */
//     [`& .${snackbarClasses.success}`]: {
//       ...baseStyles.toastColor,
//       [`& .${snackbarClasses.icon}`]: {
//         color: 'var(--palette-success-main)',
//         backgroundColor: 'color-mix(in srgb, var(--palette-success-main, var(--palette-success-main)) 12%, transparent)',
//       },
//     },
//     /**
//      * @variant warning
//      */
//     [`& .${snackbarClasses.warning}`]: {
//       ...baseStyles.toastColor,
//       [`& .${snackbarClasses.icon}`]: {
//         color: theme.vars.palette.warning.main,
//         backgroundColor: varAlpha(theme.vars.palette.warning.mainChannel, 0.08),
//       },
//     },
//     /**
//      * @variant info
//      */
//     [`& .${snackbarClasses.info}`]: {
//       ...baseStyles.toastColor,
//       [`& .${snackbarClasses.icon}`]: {
//         color: 'var(--vendor-secondary-color, var(--palette-info-main))',
//         backgroundColor: 'color-mix(in srgb, var(--vendor-secondary-color, var(--palette-info-main)) 12%, transparent)',
//       },
//     },
//   };
// });
import { Toaster } from 'sonner';
import { snackbarClasses } from './classes';

// ----------------------------------------------------------------------
// Replaces styled(Toaster) — all theme.vars.* replaced with CSS variables
// defined in global.css

export function SnackbarRoot(props) {
  return (
    <>
      <style>{`
        /* ---- keyframes ---- */
        @keyframes snackbar-rotate { to { transform: rotate(1turn); } }

        /* ---- root width ---- */
        [data-sonner-toaster] { 
          width: 100% !important; 
          max-width: 300px !important; 
          right: 16px !important;
          left: auto !important;
        }

        /* ---- toast base ---- */
        [data-sonner-toaster] .${snackbarClasses.toast} {
          gap: 12px;
          width: 100%;
          min-height: 52px;
          display: flex;
          border-radius: 12px;
          align-items: center;
        }

        /* ---- content ---- */
        [data-sonner-toaster] .${snackbarClasses.content} { gap: 0; flex: 1 1 auto; }
        [data-sonner-toaster] .${snackbarClasses.title}   { font-size: 0.875rem; }
        [data-sonner-toaster] .${snackbarClasses.description} {
          font-size: 0.75rem;
          line-height: 1.5;
          opacity: 0.64;
        }

        /* ---- close button ---- */
        [data-sonner-toaster] .${snackbarClasses.closeButton} {
          top: 0;
          right: 0;
          left: auto;
          color: currentColor;
          background-color: transparent;
          transform: translate(-6px, 6px);
          border-color: color-mix(in srgb, var(--palette-grey-500) 16%, transparent);
          transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
        }
        [data-sonner-toaster] .${snackbarClasses.closeButton}:hover {
          border-color: color-mix(in srgb, var(--palette-grey-500) 24%, transparent);
          background-color: color-mix(in srgb, var(--palette-grey-500) 8%, transparent);
        }

        /* ---- icon ---- */
        [data-sonner-toaster] .${snackbarClasses.icon} {
          margin: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          border-radius: inherit;
          justify-content: center;
          align-self: flex-start;
        }
        [data-sonner-toaster] .${snackbarClasses.icon} .${snackbarClasses.iconSvg} {
          width: 24px;
          height: 24px;
          font-size: 0;
        }

        /* ---- @variant default ---- */
        [data-sonner-toaster] .${snackbarClasses.default} {
          padding: 8px 8px 8px 12px;
          box-shadow: var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16));
          color: #111827;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.default}:has(${snackbarClasses.closeBtnVisible}) .${snackbarClasses.content} {
          padding-right: 32px;
        }

        /* ---- @variant default with loader ---- */
        [data-sonner-toaster] .${snackbarClasses.default}:has(.${snackbarClasses.loader}) {
          padding: 4px 8px 4px 4px;
          box-shadow: var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16));
          color: #111827;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.loader} {
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: none;
          transform: none;
          overflow: hidden;
          align-items: center;
          position: relative;
          border-radius: inherit;
          justify-content: center;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.loader} .${snackbarClasses.loadingIcon} {
          z-index: 9;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          animation: snackbar-rotate 3s infinite linear;
          background: conic-gradient(transparent, color-mix(in srgb, #9ca3af 64%, transparent));
        }
        [data-sonner-toaster] ${snackbarClasses.loaderVisible} { display: flex; }

        /* ---- @variant error ---- */
        [data-sonner-toaster] .${snackbarClasses.error} {
          padding: 4px 8px 4px 4px;
          box-shadow: var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16));
          color: #111827;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.error} .${snackbarClasses.icon} {
          color: #ef4444;
          background-color: #fee2e2;
        }

        /* ---- @variant success ---- */
        [data-sonner-toaster] .${snackbarClasses.success} {
          padding: 4px 8px 4px 4px;
          box-shadow: var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16));
          color: #111827;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.success} .${snackbarClasses.icon} {
          color: #10b981;
          background-color: #d1fae5;
        }

        /* ---- @variant warning ---- */
        [data-sonner-toaster] .${snackbarClasses.warning} {
          padding: 4px 8px 4px 4px;
          box-shadow: var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16));
          color: #111827;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.warning} .${snackbarClasses.icon} {
          color: #f59e0b;
          background-color: #fef3c7;
        }

        /* ---- @variant info ---- */
        [data-sonner-toaster] .${snackbarClasses.info} {
          padding: 4px 8px 4px 4px;
          box-shadow: var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16));
          color: #111827;
          background-color: #ffffff;
        }
        [data-sonner-toaster] .${snackbarClasses.info} .${snackbarClasses.icon} {
          color: #3b82f6;
          background-color: #dbeafe;
        }
      `}</style>

      <Toaster {...props} />
    </>
  );
}