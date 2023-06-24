import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Dialog, DialogContent, Stack } from '@mui/material';
import { useState } from 'react';
import { Quill } from 'react-quill';
// components
import Iconify from '../Iconify';
//
import EditorToolbarStyle from './EditorToolbarStyle';

// ----------------------------------------------------------------------

const FONT_FAMILY = ['Arial', 'Tahoma', 'Georgia', 'Impact', 'Verdana'];

const FONT_SIZE = [
  '8px',
  '9px',
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '42px',
  '54px',
  '68px',
  '84px',
  '98px',
];

export function undoChange() {
  // @ts-ignore
  this.quill.history.undo();
}
export function redoChange() {
  // @ts-ignore
  this.quill.history.redo();
}

const Size = Quill.import('attributors/style/size');
Size.whitelist = FONT_SIZE;
Quill.register(Size, true);

const Font = Quill.import('attributors/style/font');
Font.whitelist = FONT_FAMILY;
Quill.register(Font, true);

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video',
];

type EditorToolbarProps = {
  id: string;
  isSimple?: boolean;
  images?: any[];
  setImages?: (v: any) => void;
  links?: any[];
  setLinks?: (v: any) => void;
};

export default function EditorToolbar({ id, isSimple, images, setImages, links, setLinks, ...other }: EditorToolbarProps) {
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const imageHandler = () => {
    const input = document.createElement('input');  
    
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'image/*');  
    input.click();
    
    input.onchange = async () => {
      // @ts-ignore  
      var file: any = input.files[0];  
      var formData = new FormData();
            
      formData.append('image', file);
      if(setImages && images){
        setImages([...images, file])
      }  
    };
  }

  const handleAddLink = () => {
    var urlNew;
    try{
      urlNew = new URL(link)
      console.log(urlNew)
      if(setLinks && links){
        setLinks([...links, link]);
      }
      setLink('');
      setOpen(false)
    }catch(e){
      console.log(e)
      setError('Adicione um link valido')
    }
  }

  const dialogVideo = () => {
    return(
      <Dialog fullWidth maxWidth='sm' open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Stack spacing={3}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='h6'>
                Link do Vídeo
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <Iconify width={24} height={24} icon='ph:x-fill'/>
              </IconButton>
            </Stack>
            <TextField
              value={link}
              onChange={(e) => {setError(''); setLink(e.target.value)}}
              label='Link'
              error={!!error}
              helperText={!!error && error}
            />
            <Stack direction='row'>
              <Box flexGrow={1}/>
              <Button variant='contained' onClick={() => handleAddLink()}>
                Adiconar
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <EditorToolbarStyle {...other}>
      <div id={id}>
        <div className="ql-formats">
          <button type="button" className="ql-bold" />
          {!isSimple &&
            <>
              <button type="button" className="ql-italic" />
              <button type="button" className="ql-underline" />
            </>
          }
        </div>

        {/* {!isSimple && (
          <div className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
          </div>
        )} */}

        {!isSimple &&
          <div className="ql-formats">
            <button type="button" className="ql-list" value="ordered" />
            <button type="button" className="ql-list" value="bullet" />
            {/* <button type="button" className="ql-indent" value="-1" />
            <button type="button" className="ql-indent" value="+1" /> */}
          </div>
        }

        {/* {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-script" value="super" />
            <button type="button" className="ql-script" value="sub" />
          </div>
        )} */}

        {/* {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-code-block" />
            <button type="button" className="ql-blockquote" />
          </div>
        )} */}

        <div className="ql-formats">
          <button type="button" className="ql-link" />
          {!isSimple &&
            <>
              <button type="button" onClick={() => imageHandler()}>
                <Iconify icon='bx:image' width={18} height={18} />
              </button>
              <button type="button" onClick={() => setOpen(true)}>
                <Iconify icon='bxs:film' width={18} height={18} />
              </button>
            </>
          }
        </div>

        {!isSimple && 
          <div className="ql-formats">
            {/* <button type="button" className="ql-formula" /> */}
            <button type="button" className="ql-clean" />
          </div>
        }    

        {/* {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-undo">
              <Iconify icon={'ic:round-undo'} width={18} height={18} />
            </button>
            <button type="button" className="ql-redo">
              <Iconify icon={'ic:round-redo'} width={18} height={18} />
            </button>
          </div>
        )} */}
      </div>
      {dialogVideo()}
    </EditorToolbarStyle>
  );
}
