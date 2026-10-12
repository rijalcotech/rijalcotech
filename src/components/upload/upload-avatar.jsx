// import { useState, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { varAlpha, mergeClasses } from 'minimal-shared/utils';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// import { Image } from '../image';
// import { Iconify } from '../iconify';
// import { uploadClasses } from './classes';
// import { RejectionFiles } from './components/rejection-files';

// // ----------------------------------------------------------------------

// export function UploadAvatar({ sx, error, value, disabled, helperText, className, ...other }) {
//   const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
//     multiple: false,
//     disabled,
//     accept: { 'image/*': [] },
//     ...other,
//   });

//   const hasFile = !!value;

//   const hasError = isDragReject || !!error;

//   const [preview, setPreview] = useState('');

//   useEffect(() => {
//     if (typeof value === 'string') {
//       setPreview(value);
//     } else if (value instanceof File) {
//       setPreview(URL.createObjectURL(value));
//     }
//   }, [value]);

//   const renderPreview = () =>
//     hasFile && (
//       <Image alt="Avatar" src={preview} sx={{ width: 1, height: 1, borderRadius: '50%' }} />
//     );

//   const renderPlaceholder = () => (
//     <Box
//       className="upload-placeholder"
//       sx={(theme) => ({
//         top: 0,
//         gap: 1,
//         left: 0,
//         width: 1,
//         height: 1,
//         zIndex: 9,
//         display: 'flex',
//         borderRadius: '50%',
//         position: 'absolute',
//         alignItems: 'center',
//         color: 'text.disabled',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//         transition: theme.transitions.create(['opacity'], {
//           duration: theme.transitions.duration.shorter,
//         }),
//         '&:hover': { opacity: 0.72 },
//         ...(hasError && {
//           color: 'error.main',
//           bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
//         }),
//         ...(hasFile && {
//           zIndex: 9,
//           opacity: 0,
//           color: 'common.white',
//           bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.64),
//         }),
//       })}
//     >
//       <Iconify icon="solar:camera-add-bold" width={32} />

//       <Typography variant="caption">{hasFile ? 'Update photo' : 'Upload photo'}</Typography>
//     </Box>
//   );

//   const renderContent = () => (
//     <Box
//       sx={{
//         width: 1,
//         height: 1,
//         overflow: 'hidden',
//         borderRadius: '50%',
//         position: 'relative',
//       }}
//     >
//       {renderPreview()}
//       {renderPlaceholder()}
//     </Box>
//   );

//   return (
//     <>
//       <Box
//         {...getRootProps()}
//         className={mergeClasses([uploadClasses.uploadBox, className])}
//         sx={[
//           (theme) => ({
//             p: 1,
//             m: 'auto',
//             width: 144,
//             height: 144,
//             cursor: 'pointer',
//             overflow: 'hidden',
//             borderRadius: '50%',
//             border: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
//             ...(isDragActive && { opacity: 0.72 }),
//             ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
//             ...(hasError && { borderColor: 'error.main' }),
//             ...(hasFile && {
//               ...(hasError && { bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08) }),
//               '&:hover .upload-placeholder': { opacity: 1 },
//             }),
//           }),
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ]}
//       >
//         <input {...getInputProps()} />

//         {renderContent()}
//       </Box>

//       {helperText && helperText}

//       {!!fileRejections.length && <RejectionFiles files={fileRejections} />}
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { mergeClasses } from "minimal-shared/utils";

import { Image } from "../image";
import { Iconify } from "../iconify";
import { uploadClasses } from "./classes";
import { RejectionFiles } from "./components/rejection-files";

// ----------------------------------------------------------------------

export function UploadAvatar({
  error,
  value,
  disabled,
  helperText,
  className,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    disabled,
    accept: { "image/*": [] },
    ...other,
  });

  const hasFile = !!value;
  const hasError = isDragReject || !!error;

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  return (
    <>
      <div
        {...getRootProps()}
        className={mergeClasses([
          uploadClasses.uploadBox,
          "group relative mx-auto h-36 w-36 cursor-pointer overflow-hidden rounded-full border border-dashed p-1",
          hasError ? "border-red-500" : "border-gray-300",
          isDragActive && "opacity-70",
          disabled && "pointer-events-none opacity-50",
          className,
        ])}
      >
        <input {...getInputProps()} />

        <div className="relative h-full w-full overflow-hidden rounded-full">
          {/* Preview */}
          {hasFile && (
            <Image
              alt="Avatar"
              src={preview}
              className="h-full w-full rounded-full object-cover"
            />
          )}

          {/* Placeholder Overlay */}
          <div
            className={mergeClasses([
              "upload-placeholder absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-full transition-opacity duration-200",
              hasError
                ? "bg-red-500/10 text-red-500"
                : "bg-gray-500/10 text-gray-400",
              hasFile
                ? "bg-black/60 text-white opacity-0 group-hover:opacity-100"
                : "opacity-100 hover:opacity-70",
            ])}
          >
            <Iconify
              icon="solar:camera-add-bold"
              width={32}
            />

            <span className="text-xs">
              {hasFile ? "Update photo" : "Upload photo"}
            </span>
          </div>
        </div>
      </div>

      {helperText}

      {!!fileRejections.length && (
        <RejectionFiles files={fileRejections} />
      )}
    </>
  );
}