import InputMask from 'react-input-mask';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  mask: string;
}

export default function RHFMaskField({ name, mask, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: {ref, ...field}, fieldState: { error } }) => (
        <InputMask  maskChar="" mask={mask} {...field}>
            {// @ts-ignore
            (inputProps: TextFieldProps) => <TextField error={!!error} ref={ref} helperText={error?.message} {...inputProps} fullWidth  {...other} />}
        </InputMask>
      )}
    />
  );
}
