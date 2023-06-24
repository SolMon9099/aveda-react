// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile,
  UploadProps,
  UploadMultiFileProps,
} from '../upload';
import UploadSingleFileSimple from '../upload/UploadSingleFileSimple';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  file? :any
}

export function RHFUploadAvatar({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar
              accept={{ 'image/*': [] }}
              error={checkError}
              {...other}
              file={field.value}
            />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadSingleFile({ name,file, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept={{ 'image/*': [] }}
            file={file}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadSingleFileSimple({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFileSimple
            accept={{ 'application/pdf': [] }}
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFUploadMultiFileProps extends Omit<UploadMultiFileProps, 'files'> {
  name: string;
}

export function RHFUploadMultiFile({ name, ...other }: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept={{ 'application/pdf': [] }}
            files={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
