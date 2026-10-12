// import { Controller, useFormContext } from 'react-hook-form';
// import { transformValue, transformValueOnBlur, transformValueOnChange } from 'minimal-shared/utils';

// import TextField from '@mui/material/TextField';

// // ----------------------------------------------------------------------

// export function RHFTextField({ name, helperText, slotProps, type = 'text', ...other }) {
//   const { control } = useFormContext();

//   const isNumberType = type === 'number';

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <TextField
//           {...field}
//           fullWidth
//           value={isNumberType ? transformValue(field.value) : (field.value ?? '')}
//           onChange={(event) => {
//             const transformedValue = isNumberType
//               ? transformValueOnChange(event.target.value)
//               : event.target.value;

//             field.onChange(transformedValue);
//           }}
//           onBlur={(event) => {
//             const transformedValue = isNumberType
//               ? transformValueOnBlur(event.target.value)
//               : event.target.value;

//             field.onChange(transformedValue);
//           }}
//           type={isNumberType ? 'text' : type}
//           error={!!error}
//           helperText={error?.message ?? helperText}
//           slotProps={{
//             ...slotProps,
//             htmlInput: {
//               autoComplete: 'off',
//               ...slotProps?.htmlInput,
//               ...(isNumberType && { inputMode: 'decimal', pattern: '[0-9]*\\.?[0-9]*' }),
//             },
//           }}
//           {...other}
//         />
//       )}
//     />
//   );
// }
import { Controller, useFormContext } from 'react-hook-form';
import {
  transformValue,
  transformValueOnBlur,
  transformValueOnChange,
} from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export function RHFTextField({
  name,
  helperText,
  type = 'text',
  className = '',
  inputClassName = '',
  label,
  fullWidth,
  slotProps,
  InputProps,
  InputLabelProps,
  ...other
}) {
  const { control } = useFormContext();

  const isNumberType = type === 'number';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`w-full ${className}`}>
          {label && (
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {label}
            </label>
          )}

          <input
            {...field}
            type={isNumberType ? 'text' : type}
            value={
              isNumberType ? transformValue(field.value) : (field.value ?? '')
            }
            onChange={(event) => {
              const transformedValue = isNumberType
                ? transformValueOnChange(event.target.value)
                : event.target.value;

              field.onChange(transformedValue);
            }}
            onBlur={(event) => {
              const transformedValue = isNumberType
                ? transformValueOnBlur(event.target.value)
                : event.target.value;

              field.onChange(transformedValue);
            }}
            autoComplete="off"
            inputMode={isNumberType ? 'decimal' : undefined}
            pattern={isNumberType ? '[0-9]*\\.?[0-9]*' : undefined}
            className={[
              'w-full rounded-md border px-3 py-2 text-sm outline-none transition',
              'bg-white text-gray-900',
              'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '',
              inputClassName,
            ].join(' ')}
            {...other}
          />

          {(error?.message || helperText) && (
            <p
              className={`mt-1 text-xs ${error?.message ? 'text-red-500' : 'text-gray-500'
                }`}
            >
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}