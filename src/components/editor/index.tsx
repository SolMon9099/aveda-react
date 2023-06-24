import { ReactNode } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
// @mui
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Card, IconButton } from '@mui/material';
//
import EditorToolbar, { formats, redoChange, undoChange } from './EditorToolbar';
import Iconify from '../Iconify';
import { Stack } from '@mui/material';
import TextMaxLine from '../TextMaxLine';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: 640,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

export interface Props extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: ReactNode;
  sx?: BoxProps;
  images?: any[];
  setImages?: (v: any) => void;
  links?: any[];
  setLinks?: (v: any) => void;
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  images,
  setImages,
  links,
  setLinks,
  sx,
  ...other
}: Props) {

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  const archive = (name: string, type: string, idx: number, onRemove: (idx: number) => void, ) => {
    return(
      <Card key={name+idx} sx={{ maxWidth: '600px', m: 2, bgcolor: (theme) => theme.palette.grey[100], border: '1px solid rgba(145, 158, 171, 0.32)', boxShadow: 'none'}}>
        <Box sx={{p: 2}}>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Stack direction='row' alignItems='center' spacing={1} sx={{overflow: 'auto'}}>
              <Box display='flex' sx={{color: (theme) => type === 'video' ? theme.palette.error.main : theme.palette.info.main}} >
                <Iconify width={18} height={18} icon={ type === 'video' ? 'bxs:film' : 'material-symbols:image'}/>
              </Box>
              <TextMaxLine line={1} variant='subtitle2' fontWeight='500'>
                {name}
              </TextMaxLine>
            </Stack>
            <IconButton onClick={() => onRemove(idx)}>
              <Iconify width={15} height={15} icon='ph:x-fill'/>
            </IconButton>
          </Stack>
        </Box>
      </Card>
    )
  }
  
  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} setImages={setImages} images={images} links={links} setLinks={setLinks}/>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Escrever..."
          {...other}
        />
        {images && setImages && images.length > 0 &&
          <Box>
            {images.map((img: any, idx) =>
              archive(img.name, 'image', idx, (idx: number) => {var aux = [...images]; aux.splice(idx, 1); setImages(aux)})
            )}
          </Box>
        }
        {links && setLinks && links.length > 0 &&
          <Box>
            {links.map((link: any, idx) =>
              archive(link, 'video', idx, (idx: number) => {var aux = [...links]; aux.splice(idx, 1); setLinks(aux)})
            )}
          </Box>
        }
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
