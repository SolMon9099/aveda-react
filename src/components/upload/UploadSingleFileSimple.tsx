import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography } from '@mui/material';
// type
import { UploadProps } from './type';
//
import RejectionFiles from './RejectionFiles';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

export default function UploadSingleFileSimple({
  error = false,
  file,
  helperText,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        {file ?
            <Stack sx={{px: 3}} direction='row' alignItems='center' justifyContent='space-between'>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Iconify width={30} height={30} color='secondary.main' icon='mdi:file-document'/>
                    <Typography variant='subtitle2' fontWeight='500'>
                        {file.name}
                    </Typography>
                </Stack>
                <IconButton
                    //@ts-ignore
                    onClick={(e) => {e.stopPropagation(); other.onDrop('')}}
                >
                    <Iconify icon='ph:x-circle-fill'/>
                </IconButton>
            </Stack>
            :
            <>
                <input {...getInputProps()} />

                <Box flexGrow={1} justifyContent='center' textAlign='center'>
                    <Typography variant='subtitle1' fontWeight='500'>
                        Arraste o arquivo ou clique aqui para fazer upload
                    </Typography>
                </Box>
            </>
        }
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </Box>
  );
}
