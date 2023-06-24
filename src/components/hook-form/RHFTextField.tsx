// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  withCount?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, withCount, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            endAdornment: (
              withCount &&
              <InputAdornment position='end'>
                {field.value?.length ? field.value?.length : 0}/300
              </InputAdornment>
            )
          }}
          {...other}
        />
      )}
    />
  );
}
