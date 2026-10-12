// 'use client';

// import { Fragment } from 'react';

// import Portal from '@mui/material/Portal';
// import { styled } from '@mui/material/styles';
// import LinearProgress from '@mui/material/LinearProgress';

// // ----------------------------------------------------------------------

// export function LoadingScreen({ portal, sx, ...other }) {
//   const PortalWrapper = portal ? Portal : Fragment;

//   return (
//     <PortalWrapper>
//       <LoadingContent sx={sx} {...other}>
//         <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
//       </LoadingContent>
//     </PortalWrapper>
//   );
// }

// // ----------------------------------------------------------------------

// const LoadingContent = styled('div')(({ theme }) => ({
//   flexGrow: 1,
//   width: '100%',
//   display: 'flex',
//   minHeight: '100%',
//   alignItems: 'center',
//   justifyContent: 'center',
//   paddingLeft: theme.spacing(5),
//   paddingRight: theme.spacing(5),
// }));
'use client';

import { Fragment } from 'react';
import { createPortal } from 'react-dom';

export function LoadingScreen({ portal = false, className = '', ...other }) {
  const Wrapper = portal ? PortalWrapper : Fragment;

  return (
    <Wrapper>
      <div
        className={`flex flex-1 min-h-screen w-full items-center justify-center px-5 ${className}`}
        {...other}
      >
        <div className="w-full max-w-[360px]">
          <div className="h-1 w-full overflow-hidden rounded bg-gray-200">
            <div className="h-full w-1/2 animate-pulse bg-gray-500" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

// ------------------------------------------------------

function PortalWrapper({ children }) {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
}