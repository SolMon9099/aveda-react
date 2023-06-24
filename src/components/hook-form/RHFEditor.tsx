// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import Editor, { Props as EditorProps } from '../editor';

// ----------------------------------------------------------------------

interface Props extends EditorProps {
  name: string;
  images?: any[];
  setImages?: (v: any) => void;
  links?: any[];
  setLinks?: (v: any) => void;
}

export default function RHFEditor({ name, images, setImages, links, setLinks, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          error={!!error}
          images={images}
          setImages={setImages}
          links={links}
          setLinks={setLinks}
          {...field}
          helperText={
            <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
              {error?.message}
            </FormHelperText>
          }
          {...other}
        />
      )}
    />
  );
}
