import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { useEffect } from 'react';

interface IProps {
  name: string;
  mask: string;
}

export default function RHFOAB({ name, mask, ...other }: IProps & TextFieldProps) {
  const { control, watch, setValue } = useFormContext();

  const watchField: string = watch(name);

  useEffect(() => {
    if (watchField.length > 0 ) {
      const formattedValue: string = watchField.replace(/\D/g, ''); 
      var formattedString = formattedValue.padStart(6, '0');
      if (formattedString.length > 6) formattedString = formattedString.substring(1);
      const formattedOutput = formattedString.replace(/(\d{3})(\d{3})/, '$1.$2');
      setValue(name, formattedOutput);
    }
  }, [name, setValue, watchField]);

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
          {...other}
        />
      )}
    />
  );
}
