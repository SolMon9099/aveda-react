// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { desMoney, money } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFMoneyField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={money(field.value)}
          onChange={(e) => field.onChange(desMoney(e.target.value))}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
