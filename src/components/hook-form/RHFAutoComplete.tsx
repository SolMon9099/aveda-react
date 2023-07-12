// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, Autocomplete } from '@mui/material';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: {value: string, label: string}[];
  multiple: boolean;
  renderTags?: any,
  freeSolo?: boolean,
}

export default function RHFAutoComplete({ name, options, multiple, renderTags, freeSolo, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
            onChange={(_, data) => field.onChange(data)}
            // defaultValue={field.value}
            freeSolo={freeSolo}
            value={field.value}
            onBlur={() => field.onBlur()}
            multiple={multiple}
            fullWidth
            options={options}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option,value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} name={name} margin="none" error={!!error} helperText={error?.message} {...other}/>}
            renderTags={renderTags}
        />
      )}
    />
  );
}
